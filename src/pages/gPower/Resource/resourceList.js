import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  Divider
} from 'antd';


import ResourceTable from '@/components/Access/Resource';

import Addresource from  './resourceAdd'

import styles from './resourceList.less';


@connect((props) => (props))


export default class ResourceList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    resourcedata:[]
  };

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'gresource/getResourcelist',
      payload: {
        cb: (val) => {
           this.setState({
              resourcedata:val.data
           })
        }
      }
    });   
  }



  handleRefreshTableChange = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'gproline/getProjectLine',
      payload: '',
    });
  }



  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'gproline/getProjectList',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }


  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

 


  render() {
    
    const {selectedRows,resourcedata} = this.state;

    const { gresource,dispatch } = this.props;
    
    return (
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Row gutter={16}>
               <Col span={2}>
                  {/* <Addrole 
                  />  */}
                </Col>
              </Row>
              </div>
            <Divider> 资源列表 </Divider>
       
          
          <ResourceTable
              selectedRows={selectedRows}
              // loading={loading}
              dispatch = {dispatch}
              handleSaveData={this.handleSaveData}
              handleDeleteData={this.handleDeleteData}
              resourcedata = {resourcedata}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
            
          </div>
        </Card>
    
    );
  }
}
