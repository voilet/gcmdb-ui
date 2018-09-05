
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  Menu,
  Divider
} from 'antd';

import IdcTable from '@/components/Resource/Cabinet';
import styles from './cabinet.less'

const InputGroup = Input.Group

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class CabinetList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gidc/queryCabinet',
    });
  }

  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'gidc/empty',
    });
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

    dispatch({
      type: 'gidc/queryCabinet',
      payload: params,
    });
  }

  
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
    
  }

  //保存编辑数据
  handleSaveData = (val) => {
    const { bay_details } = val
    
    this.props.dispatch({
      type: 'gidc/modifyCabinet',
      payload: {
        ...val,
        bay_details:JSON.stringify({data:bay_details})
      }
    });
  }
  
  //删除单条数据
  handleDeleteData = (val) => {
    this.props.dispatch({
      type: 'gidc/deleteCabinet',
      payload: val 
    });
}
  
  handleAdd = () => {
    const { dispatch} = this.props; 
    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/idc/cabinet/add',
            }
    ));
  }
 
  render() {
    const { gidc } = this.props;
    console.log("gidc++++++++++++++++++",gidc)
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    )

    return (
  
        <Card bordered={false}>
          <div className={styles.tableList}>
          <Button type="primary" onClick={ ()=> this.handleAdd()}>
          <Icon type="plus" /> 添加机柜
          </Button>  
            <div style={{height:40, textAlign:"center",}}>     
          <InputGroup compact>
          <Button size="large" style={{color: "blue"}}>机柜名称</Button>
              <Input.Search
              placeholder="请输入机柜名称"
              enterButton="搜索"
              size="large"
              onSearch={this.handleSearch}
              style={{ width: 522 }}
            />
        </InputGroup> 
    
            </div> 
            <Divider>  机柜数据  </Divider>
            <IdcTable
              dispatch = {this.props.dispatch}
              cabinet={gidc.cabinet}
              handleSaveData = {this.handleSaveData}
              handleDeleteData = {this.handleDeleteData}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
    
    );
  }
}
