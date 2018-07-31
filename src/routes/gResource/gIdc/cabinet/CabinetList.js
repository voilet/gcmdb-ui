
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Divider
} from 'antd';

import IdcTable from '../../../../components/Resource/Cabinet';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import Addcabinet from './addcabinet'
import styles from './cabinet.less'

const FormItem = Form.Item;

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

 
  render() {
    const { gidc } = this.props;
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="机柜管理">
        <Card bordered={false}>
          <div className={styles.tableList}>  
            <div style={{height:40}}>
              <Addcabinet
                cabinet={gidc.cabinet}
                dispatch={this.props.dispatch}             
              />
    
            </div> 
            <Divider>  机柜数据  </Divider>
            <IdcTable
              //selectedRows={selectedRows}
              //loading={ruleLoading}
              cabinet={gidc.cabinet}
              handleSaveData = {this.handleSaveData}
              handleDeleteData = {this.handleDeleteData}
              //handleSelectRows={this.handleSelectRows}
              //onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
