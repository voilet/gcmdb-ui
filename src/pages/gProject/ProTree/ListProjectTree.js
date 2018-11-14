import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import { Tree, Input,Card,Row,Col,Button,Divider,Tabs } from 'antd';

import { ModReleaseCode } from './listprojectModule/modReleaseCode';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const { TabPane } = Tabs;

import TreeTab from '@/components/ProjectTable/treeTab'
import SearchTree from './searchProTree'
import styles from './projectTree.less';


const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');



const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: node.title });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
/* 操作过滤项*/
const tabKeys = [
    {
        name:"主机",key:"host"
    },
    {
        name:"代码发布",key:"release"
    }
];
const tabPanels = ( data ) =>{
  let panels = [];
  console.log("data",data)
  data.forEach(function(item,idx){
    console.log(item)
      panels.push( <TabPane key={item.key} tab={item.name} /> );
  });
  return panels;
};

const getSubModule = ( operatorName )=>{
  switch( operatorName){
      case "release":
          return <ModReleaseCode />
  }
}
const getParentKey = (key, tree, id) => {
  let parentKey;
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

@connect((props) => (props))

export default class TableTree extends PureComponent {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    selectedKey:[],
    selectedRows: [],
      currentOperatorName:"release",
    treedata:[],
    hostdata: []
  }

  componentWillMount() {
    
    const {dispatch} = this.props;
    dispatch({
      type: 'gappmanage/getTree',
      payload: {
        callback: (data) => {
          this.setState({
            treedata: data
          })
        }
      }


    });
    dispatch({
      type: 'gappmanage/getAllTree',
      payload: {
        cb: (data) => {
          this.setState({
            hostdata: data
          })
        }
      }
    });    
  }


  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  
  onChange = (e) => {
    const treedata = this.state.treedata
    const value = e.target.value;
    generateList(treedata);
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, treedata);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }


  treeSelectClick = (selectedKey,e) => {
    console.log("selectedKey", selectedKey, e)
    if (selectedKey.toString().split("-")[0] == "3" && e.selected)
    {
      console.log("?gappmanage/getHostdatabyId")
      this.props.dispatch({
        type: 'gappmanage/getHostdatabyId',
        payload: {
          projectid: selectedKey.toString().split("-")[1],
          cb: (data) => {
              this.setState({
                hostdata: data
              })
          }
        }
      }); 
    }
 
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSelectOperator = ( key ) =>{
    this.setState({
        currentOperatorName:key
    })
  }


  render() {
    const { searchValue, expandedKeys, autoExpandParent, selectedKey,selectedRows } = this.state;

    const loop = data => data.map((item) => {

      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
 

      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode 
        key={item.key} title={title} id={item.id} data-key={item.id} />;
    });

  
    return (
      <Row gutter={24} style={{height:"100%"}}>
        <Col span={6} style={{paddingRight:0,height:"100%"}}>
          <Card style={{height:"100%"}}>
            <div>
             <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
              <Tree
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={this.treeSelectClick}
              >
                {loop(this.state.treedata)}
              </Tree>
            </div>
          </Card>
        </Col>
        <Col span={18} style={{paddingLeft:0,height:"100%"}}>
          <Card style={{height:"100%"}}>
            <Tabs activeKey={ this.state.currentOperatorName } onTabClick={ this.handleSelectOperator }>
                { tabPanels( tabKeys ) }
            </Tabs>
            <Divider> 服务器列表 </Divider>
              { getSubModule( this.state.currentOperatorName )}

            <Divider> old ui </Divider>
            <TreeTab 
              selectedKey={selectedKey}
              treeTabdata = {this.state.hostdata}
              selectedRows={selectedRows}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              dispatch = {this.props.dispatch}
            />

          </Card>
        </Col>
      </Row>
   
    );
  }
    

}
