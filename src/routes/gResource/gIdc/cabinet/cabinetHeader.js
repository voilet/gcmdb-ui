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



const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect((props) => (props))




export default class cabinetHeader extends PureComponent {
  state = {
     activekey: "list",
     title: "机柜列表"
  };


  componentWillReceiveProps = nextProps => {
    const { location: { pathname } } = this.props
    const { location: { pathname: nextPathName } } = nextProps


    if(nextPathName === '/resource/idc/cabinet/list' && nextPathName !== pathname) {
      this.setState({
        activekey: 'list',
        title: "机柜列表"
      })
    }


    if(nextPathName === '/resource/idc/cabinet/detail' && nextPathName !== pathname) {
      this.setState({
        activekey: 'detail',
        title: "查看机柜信息"
      })
    }

    if(nextPathName === '/resource/idc/cabinet/edit' && nextPathName !== pathname) {
      this.setState({
        activekey: 'edit',
        title: "编辑机柜信息"
      })
    }

    if(nextPathName === '/resource/idc/cabinet/add' && nextPathName !== pathname) {
      this.setState({
        activekey: 'add',
        title: "添加机柜信息"
      })
    }
  }

  handleTabChange = key => {
    const { dispatch, match} = this.props;
    switch (key) {
      case 'detail':
        dispatch(routerRedux.push(`${match.url}/detail`));
        this.setState({
          activekey : "detail",
          title: "查看机柜信息"
        })
        break;
      case 'edit':
        dispatch(routerRedux.push(`${match.url}/edit`));
        this.setState({
          activekey : "edit",
          title: "编辑机柜信息"
        })
        break;
      case 'add':
        dispatch(routerRedux.push(`${match.url}/add`));
        this.setState({
          activekey : "add",
          title: "添加机柜信息"
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
        key: 'add',
        tab: '添加机柜信息',
      },
      {
        key: 'detail',
        tab: '查看机柜信息',
        disabled: true,
      },
      {
        key: 'edit',
        tab: '编辑机柜信息',
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
