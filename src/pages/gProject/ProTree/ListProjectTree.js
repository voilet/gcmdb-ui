import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import { Tree, Input,Card,Row,Col,Button,Divider,Tabs } from 'antd';

import ModReleaseCode from './listprojectModule/modReleaseCode';
import ModHostList from './listprojectModule/modHostList';

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
  data.forEach(function(item,idx){
      panels.push( <TabPane key={item.key} tab={item.name} /> );
  });
  return panels;
};

/* 已经被 umi封装至model*/
/*
function mapDispatchToProps(dispatch, ownProps) {
    console.log("mapDispatchToProps@@@@@@@@");
    return {
        onClick: () => {
            console.log(".........click")
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            });
        }
    }
}
*/

let hostConnect = ( state, ownProps )=>{
    const { hostdata } = state.gappmanage;
    console.log("mapStateToProps@@@@@@@@@@@", state, "props", ownProps);
    console.log("###host", hostdata);
    return {
      hostdata:hostdata
    }
}

/*
@connect( props, function( dispatch, ownProps ){
  console.log("mapDispatchToProps@@@@@@@@@@@", dispatch, "props", ownProps);
  return {
      ...props
  }
})
*/
/*
@connect(( state, ownProps ) => {
    console.log("mapStateToProps@@@@@@@@@@@", state, "props", ownProps);
  return {
      selectedProjectId: state.selectedProjectId
  }
},(dispatch, ownProps)=>{
  return {
    onFetchAutoHost:function( projectId ){
        console.log("onFetchAutoHost...", projectId);
        dispatch({
            type: 'gappmanage/getAutoHostdatabyId',
            payload: {
                projectId:projectId
            }


        });
    },
    onSubmit:function(){
      console.log("onModSubmit...");
    }
  }
})
class ConnectModReleaseCode extends ModReleaseCode{}
*/


//@connect(hostConnect)
@connect(hostConnect)
class ConnectModHostList extends ModHostList{}

const getSubModule = ( state )=>{
  switch( state.currentOperatorName ){
      case "host":
          return <ConnectModHostList >1</ConnectModHostList>
          break;
      case "release":
        return <ModReleaseCode selectedProjectId={ state.selectedProjectId }/>;
        break;
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
      selectedProjectId:0,
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
          console.log("getTree data:", data)
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
            console.log("getAllTree data:", data)
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
      let projectId = selectedKey.toString().split("-")[1];
      console.log(this.props, this.state)
      //level 为第三级
    if (selectedKey.toString().split("-")[0] == "3" && e.selected)
    {
      console.log("?gappmanage/getHostdatabyId")
        this.setState({
            selectedProjectId:projectId
        });
      this.props.dispatch({
        type: 'gappmanage/getHostdatabyId',
        payload: {
          projectid: projectId,
          cb: (data) => {
              console.log("?gappmanage/getHostdatabyId:res", data )
              this.setState({
                hostdata: data
              })
          }
        }
      }); 
    }

    setTimeout(()=>{
        console.log("@@@@@@@@@@@@", this.state, this.props)
    },1000)
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
        <Col xs={24} md={6} style={{paddingRight:0,height:"100%"}}>
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
        <Col xs={24} md={18} style={{paddingLeft:0,height:"100%"}}>
          <Card style={{height:"100%"}}>
            <Tabs activeKey={ this.state.currentOperatorName } onTabClick={ this.handleSelectOperator }>
                { tabPanels( tabKeys ) }
            </Tabs>
            <Divider> 服务器列表 </Divider>
              { getSubModule( this.state )}

          </Card>
        </Col>
      </Row>
   
    );
  }
    

}
