import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import { Tree, Input,Card,Row,Col,Button,Divider  } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import TreeTab from '../../../components/ProjectTable/treeTab'
import SearchTree from './searchProTree'
import styles from './projectTree.less';


const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { TextArea } = Input;


@connect((props) => (props))

export default class TableTree extends PureComponent {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    selectedKey:[],
    selectedRows: [],
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gappmanage/getTree',
    });
    dispatch({
      type: 'gappmanage/getAllTree',
    });

    
  }

 
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  
   getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = this.props.gappmanage.treedata.data.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return this.getParentKey(item.key, this.props.gappmanage.treedata.data);
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
      console.log("treeSelectClick")
      this.props.dispatch({
        type: 'gappmanage/getHostdatabyId',
        payload: {projectid: selectedKey.toString().split("-")[1]}
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


    const { searchValue, expandedKeys, autoExpandParent, selectedKey,selectedRows } = this.state;
    const {gappmanage} = this.props
    console.log("searchValue+++++++++++",this.props)




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
    const treeEl = ''
  
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
                {loop(gappmanage.treedata.data)}
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
              treeTabdata = {gappmanage.hostdata}
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
