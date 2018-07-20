import React, {PureComponent} from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import {connect} from 'dva';
import {
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
} from 'antd';



import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import { getRoutes } from '../../../../utils/utils';



import styles from './hostInfo.less';

const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect((props) => (props))




export default class HostHeader extends PureComponent {
  state = {
     activekey: "list",
     title: "主机列表页"
  };


  componentWillReceiveProps = nextProps => {
    const { location: { pathname } } = this.props
    const { location: { pathname: nextPathName } } = nextProps

    if(nextPathName === '/resource/hardware/host/list' && nextPathName !== pathname) {
      this.setState({
        activekey: 'list',
        title: "主机列表"
      })
    }

    if(nextPathName === '/resource/hardware/host/detail' && nextPathName !== pathname) {
      this.setState({
        activekey: 'detail',
        title: "查看主机信息"
      })
    }

    if(nextPathName === '/resource/hardware/host/edit' && nextPathName !== pathname) {
      this.setState({
        activekey: 'edit',
        title: "编辑主机信息"
      })
    }

    if(nextPathName === '/resource/hardware/host/add' && nextPathName !== pathname) {
      this.setState({
        activekey: 'add',
        title: "添加主机信息"
      })
    }

    if(nextPathName === '/resource/hardware/host/clean' && nextPathName !== pathname) {
      this.setState({
        activekey: 'clean',
        title: "主机项目关系列表"
      })
    }

    if(nextPathName === '/resource/hardware/host/offline' && nextPathName !== pathname) {
      this.setState({
        activekey: 'offline',
        title: "已下线主机列表"
      })
    }
  }

  handleTabChange = key => {
    const { dispatch, match} = this.props;
    switch (key) {
      case 'list':
        dispatch(routerRedux.push(`${match.url}/list`));
        this.setState({
          activekey : "list",
          title: "主机列表页"
        })
        break;
      case 'detail':
        dispatch(routerRedux.push(`${match.url}/detail`));
        this.setState({
          activekey : "detail",
          title: "查询主机信息"
        })
        break;
      case 'edit':
        dispatch(routerRedux.push(`${match.url}/edit`));
        this.setState({
          activekey : "edit",
          title: "编辑主机信息"
        })
        break;
      case 'add':
        dispatch(routerRedux.push(`${match.url}/add`));
        this.setState({
          activekey : "add",
          title: "添加主机"
        })
        break;

      case 'offline':
      dispatch(routerRedux.push(`${match.url}/offline`));
      this.setState({
        activekey : "offline",
        title: "已下线主机列表"
      })
      break;

      case 'clean':
      dispatch(routerRedux.push(`${match.url}/clean`));
      this.setState({
        activekey : "clean",
        title: "主机项目关系列表"
      })
      break;

      default:
        break;
    }
  }

  render() {
    console.log("this.props",this.props)
    const {activekey,title} = this.state;     
    const { match, routerData, location,loading } = this.props;
    
    const routes = getRoutes(match.path, routerData);

    

    
    const tabList = [
      {
        key: 'list',
        tab: '主机列表',
      },
      {
        key: 'add',
        tab: '添加主机',
      },
      {
        key: 'offline',
        tab: '已下线主机列表',
      },
      {
        key: 'clean',
        tab: '主机项目关系',
        disabled: true,
      },
      {
        key: 'detail',
        tab: '查看主机信息',
        disabled: true,
      },
      {
        key: 'edit',
        tab: '编辑主机信息',
        disabled: true,
      },
    ];



    return (
      <PageHeaderLayout
        title={title}
        tabList={tabList}
        tabActiveKey={activekey}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
