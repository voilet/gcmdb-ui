import React, { PureComponent } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input, Select, Icon, Button, Dropdown, Menu } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

import styles from './SearchList.less';

const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const { TextArea } = Input;
const InputGroup = Input.Group;

@connect(props => props)
export default class SearchList extends PureComponent {
  state = {
    activekey: 'projectline',
    selectKey: 'exsited',
  };

  componentDidMount() {
    const searchResult = this.props.gproline;

    console.log('searchResult', searchResult);
    if (searchResult.prolinedata.data.length > 0) {
      this.setState({
        activekey: 'projectline',
      });
    } else {
      if (searchResult.progroupdata.data.length > 0) {
        this.setState({
          activekey: 'projectgroup',
        });
      } else {
        this.setState({
          activekey: 'project',
        });
      }
    }
  }

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'project':
        dispatch(routerRedux.push(`${match.url}/prolist`));
        this.setState({
          activekey: 'project',
        });
        break;
      case 'projectgroup':
        dispatch(routerRedux.push(`${match.url}/grouplist`));
        this.setState({
          activekey: 'projectgroup',
        });
        break;
      case 'projectline':
        dispatch(routerRedux.push(`${match.url}/linelist`));
        this.setState({
          activekey: 'projectline',
        });
        break;
      case 'deletedlist':
        dispatch(routerRedux.push(`${match.url}/deletedlist`));
        this.setState({
          activekey: 'deletedlist',
        });
        break;
      default:
        break;
    }
  };

  handleSearch = value => {
    //  e.preventDefault();
    const { dispatch } = this.props;
    if (this.state.selectKey == 'exsited') {
      dispatch({
        type: 'gproline/SearchProjectList',
        payload: {
          content: value,
          key: 'exsited',
        },
      });
    }

    if (this.state.selectKey == 'deleted') {
      dispatch({
        type: 'gproline/SearchProjectList',
        payload: {
          content: value,
          key: 'deleted',
        },
      });
    }
  };

  handleChange = value => {
    this.setState({
      selectKey: value,
    });
  };

  render() {
    const { activekey } = this.state;
    const { match, routerData, location, loading } = this.props;
    debugger;
    const routes = getRoutes(match.path, routerData);

    console.log(this.props);

    const tabList = [
      {
        key: 'project',
        tab: '项目列表',
      },
      {
        key: 'projectgroup',
        tab: '项目组列表',
      },
      {
        key: 'projectline',
        tab: '产品线列表',
      },
      {
        key: 'deletedlist',
        tab: '已删除的项目',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <InputGroup compact>
          <Select size="large" defaultValue="搜索项目" onChange={this.handleChange}>
            <Option value="exsited">搜索项目</Option>
            <Option value="deleted">搜索删除</Option>
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
      <PageHeaderLayout
        title="搜索业务线"
        content={mainSearch}
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
