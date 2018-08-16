
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
  DatePicker,
  message,
  Divider
} from 'antd';

import CabTable from '../../../../components/Resource/Idc';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import AddIDC from './addIDC'
import styles from './IDC.less'

const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class Listidc extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gidc/queryIDC',
      payload: ""
    });

    dispatch({
      type: 'gidc/queryProvider',
      payload: ""
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
      type: 'gidc/queryIDC',
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
      type: 'gidc/modifyIDC',
      payload: val 
    });
  }
  
  //删除单条数据
  handleDeleteData = (val) => {
    this.props.dispatch({
      type: 'gidc/deleteIDC',
      payload: val 
    });
}


//批量开启机房 
// handleOpenAllstatus = (val) => {

// }

// handleMenuClick = (val) => {
//    if (val.key == "approval") {
       
//    } 
// }
 
  render() {
    const { gidc } = this.props;
    const {selectedRows} = this.state;
    console.log("this.props",this.props)

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="approval">批量开启</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="机房列表">
        <Card bordered={false}>
          <div className={styles.tableList}>  
          <div style={{height:40}}>
            <AddIDC
              //dispatch = {this.props.dispatch}
              providerdata = {gidc.provider}
              />
              {
                selectedRows.length > 0 && (
                  <div >
                    <Dropdown overlay={menu} >
                      <Button >
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </div>
                )
              }  
          </div> 
          <Divider>  机房数据  </Divider>
            <CabTable
              selectedRows={selectedRows}
              //loading={ruleLoading}
              gidc={gidc.idc}
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
