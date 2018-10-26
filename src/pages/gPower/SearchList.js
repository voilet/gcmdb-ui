import React, {PureComponent} from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import {connect} from 'dva';
import {
  Input,
  Select,
} from 'antd';


import PageHeaderWrapper from '@/components/PageHeaderWrapper';

 
const {Option} = Select;
const InputGroup = Input.Group


@connect((props) => (props))


export default class SearchList extends PureComponent {
  state = {
     activekey: "user",
     selectKey: "user"
  };

  componentDidMount() {
    // const  searchResult = this.props.gproline
    
    // if (searchResult.prolinedata.data.length > 0) {
    //   this.setState({
    //     activekey : "projectline"
    //   })
    // } else {
    //   if (searchResult.progroupdata.data.length > 0) {
    //     this.setState({
    //       activekey : "projectgroup"
    //     })
    //   } else {
    //     this.setState({
    //       activekey : "project"
    //     })
    //   }
    // }
  }

  handleTabChange = key => {
    const { dispatch, match, } = this.props;
    switch (key) {
      case 'user':
        dispatch(routerRedux.push(`${match.url}/list`));
        this.setState({
          activekey : "user"
        })
        break;
      case 'role':
        dispatch(routerRedux.push(`${match.url}/rolelist`));
        this.setState({
          activekey : "role"
        })
        break;
      case 'resource':
        dispatch(routerRedux.push(`${match.url}/resourcelist`));
        this.setState({
          activekey : "resource"
        })
        break;
      default:
        break;
    }
  }

  handleSearch = (value) => {
    //  e.preventDefault();
    const { dispatch, } = this.props;

     if ( this.state.selectKey == "user" ) {
       dispatch({
         type: 'guser/searchUser', 
         payload: {
            destination: { "content":value }
           },
       });
     }

   }

  changeTable = () => {
    const { dispatch, match, } = this.props;
    
    dispatch(routerRedux.push(`${match.url}/list`));
     this.setState({
       activekey : "user"
     })
  }
 

  handleChange = (value) => {

    console.log("value",value)

    if (value == "user") {
      this.changeTable()
    }
    this.setState({
      selectKey: value
    })
  }

  render() {
    
    const {activekey} = this.state;     
    const { children } = this.props;
    
     
    const tabList = [
      {
        key: 'user',
        tab: '用户管理',
      },
      {
        key: 'role',
        tab: '角色管理',
      },
      {
        key: 'resource',
        tab: '资源管理',
      }
    ];


    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
       <InputGroup compact>
          <Select size="large" defaultValue="请选择"  onChange={this.handleChange}>
            <Option value="user">搜索用户</Option>
          </Select>
          <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleSearch}
          style={{ width: 522 }}
        />
        </InputGroup> 
      </div>
    );

    return (
      <PageHeaderWrapper
        title="权限管理"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={activekey}
        onTabChange={this.handleTabChange}
      >
       {children}
      </PageHeaderWrapper>
    );
  }
}
