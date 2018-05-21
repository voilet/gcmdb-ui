
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Dropdown,
  Menu,
  message,
  Divider
} from 'antd';

import Provider from '../../../../components/Resource/Provider';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import AddProvider from './addprovider'
import styles from './provider.less'

const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class ProviderList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gidc/queryProvider',
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
      type: 'gidc/queryProvider',
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
    this.props.dispatch({
      type: 'gidc/modifyProvider',
      payload: val 
    });
  }
  
  //删除单条数据
  handleDeleteData = (val) => {
    this.props.dispatch({
      type: 'gidc/deleteProvider',
      payload: val 
    });
}

 
  render() {
    const { gidc } = this.props;
    const {selectedRows} = this.state;


    
    return (
      <PageHeaderLayout title="运营商列表">
        <Card bordered={false}>
          <div className={styles.tableList}>  
          <div style={{height:40}}>
            <AddProvider
              dispatch = {this.props.dispatch}
              form = {this.props.form}
              /> 
          </div> 
          <Divider>  运营商数据  </Divider>
            <Provider
              selectedRows={selectedRows}
              //loading={ruleLoading}
              gprovider={gidc.provider}
              handleSaveData = {this.handleSaveData}
              handleDeleteData = {this.handleDeleteData}
              handleSelectRows={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
        </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
