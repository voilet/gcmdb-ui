import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Select, Icon, Button, Dropdown, Menu } from 'antd';

import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import { getRoutes } from '../../../../utils/utils';

import styles from './hostInfo.less';

const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(props => props)
export default class HostHeader extends PureComponent {
  state = {
    activekey: 'list',
    title: '主机列表页',
  };

  componentWillReceiveProps = nextProps => {
    const { location: { pathname } } = this.props;
    const { location: { pathname: nextPathName } } = nextProps;
    if (nextPathName === '/resource/hardware/host/detail' && nextPathName !== pathname) {
      this.setState({
        activekey: 'detail',
        title: '主机详情页',
      });
    }

    if (nextPathName === '/resource/hardware/host/edit' && nextPathName !== pathname) {
      this.setState({
        activekey: 'detail',
        title: '主机详情页',
      });
    }

    if (nextPathName === '/resource/hardware/host/add' && nextPathName !== pathname) {
      this.setState({
        activekey: 'add',
        title: '添加主机',
      });
    }
  };

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'list':
        dispatch(routerRedux.push(`${match.url}/list`));
        this.setState({
          activekey: 'list',
          title: '主机列表页',
        });
        break;
      case 'detail':
        dispatch(routerRedux.push(`${match.url}/detail`));
        this.setState({
          activekey: 'detail',
          title: '主机详情页',
        });
        break;
      case 'add':
        dispatch(routerRedux.push(`${match.url}/add`));
        this.setState({
          activekey: 'add',
          title: '添加主机',
        });
        break;

      case 'deleted':
        dispatch(routerRedux.push(`${match.url}/deleted`));
        this.setState({
          activekey: 'deleted',
          title: '已删除主机列表',
        });
        break;
      default:
        break;
    }
  };

  render() {
    console.log('this.props', this.props);
    const { activekey, title } = this.state;
    const { match, routerData, location, loading } = this.props;

    const routes = getRoutes(match.path, routerData);

    const tabList = [
      {
        key: 'list',
        tab: '主机列表',
      },
      {
        key: 'detail',
        tab: '主机详情',
      },
      {
        key: 'deleted',
        tab: '已删除主机',
      },
      {
        key: 'add',
        tab: '添加主机',
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
