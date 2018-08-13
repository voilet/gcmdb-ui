import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import { Tree, Input,Card,Row,Col,Button,Divider  } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;


import TreeTab from '../../../components/ProjectTable/treeTab'
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
    treedata:[],
    hostdata: []
  }

  componentWillMount() {
    
    const {dispatch} = this.props;
    dispatch({
      type: 'gappmanage/getTree',
    });
    dispatch({
      type: 'gappmanage/getAllTree',
      payload: {
        cb: (data) => {
          console.log("getAllTree+++",data)
        }
      }
    });

    
  }

  componentWillReceiveProps(nextProps) {
     
      if ( nextProps.gappmanage.treedata) {
        this.setState({
          treedata: nextProps.gappmanage.treedata.data,
          hostdata:  nextProps.gappmanage.hostdata.data
        }) 
    }
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
    if (selectedKey.toString().split("-")[0] == "3" && e.selected)
    {
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



  render() {

    // const action = (
    //   <Fragment style={{text-align:left}}>
    //     <Button type="primary" >更新树</Button>
    //   </Fragment>
    // );

    console.log("treedata",this.state.treedata)
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
            <SearchTree />
            <Divider> </Divider>
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
