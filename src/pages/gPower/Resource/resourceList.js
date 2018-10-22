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

import ResourceAdd from  './ResourceAdd'

import styles from './resourceList.less';


@connect((props) => (props))


export default class ResourceList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    resourcedata:[],
    parentdata:[]
  };

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'gresource/getResourcelist'
    });   

    dispatch({
      type: 'gresource/getResourceTreeForparent',
      payload: {
        cb: (val) => {
           this.setState({
              parentdata:val.data
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
    
    const {selectedRows,parentdata } = this.state;

    const { gresource,dispatch } = this.props;
    
    console.log("this.props",this.props)
    // console.log("resourcedata",gresource.parentdata.data ? gresource.parentdata.data : [])

    return (
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Row gutter={16}>
               <Col span={2}>
                  <ResourceAdd dispatch={dispatch} resource={parentdata}/>
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
              resourcedata = {gresource.data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
            
          </div>
        </Card>
    
    );
  }
}
