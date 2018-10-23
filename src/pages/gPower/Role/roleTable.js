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


import styles from './roleList.less';
import AddRole from './roleAdd'
import RolesTable from '@/components/Access/Role';
 

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
 
@connect((props) => (props))
@Form.create()

export default class RoleList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };



  componentDidMount() {
    const {dispatch} = this.props;
    
    dispatch({
      type: 'grole/getRolelist',
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
      type: 'gproline/getProjectList',
      payload: params,
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

  //保存
  handleSaveData = (val) => {
    const { ID, title} = val
    const params = {
        ID,
        title:title,
    }

    this.props.dispatch({
        type: 'grole/modifyRole',
        payload: {
          description: params,
          cb: (info) => {
              if (info.status == '200'){
                  openNotificationWithIcon('success',"分配权限成功!~ ~")
                } else {
                  openNotificationWithIcon('error',"分配权限失败!~ ~")
                }
          }
      },
      });
    
  }

  handleDeleteData = (val) => {
    const { ID } = val
    //false是逻辑删除  true是物理删除
    // infolist:{"componentname": "cpu", "ids": [1, 2]}
    let obj = {},ids=[]
    ids.push(ID)
    obj.ids=ids
    this.props.dispatch({
      type: 'gproline/deleteProject',
      payload: {
        tag:false,
        infolist:JSON.stringify(obj)
      }
    });
}


 

  render() {
    
    const {selectedRows, modalVisible, addInputValue} = this.state;
    const { getFieldDecorator } = this.props.form;
    //const { submitting } = this.props;
  
    const { grole,loading,submitting,dispatch } = this.props;
    
    console.log('grole', grole)
    


    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量启用</Menu.Item>
        <Menu.Item key="stop">批量暂停</Menu.Item>
      </Menu>
    );

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
            <AddRole dispatch = {this.props.dispatch} />
            <Divider> 角色列表 </Divider>
            <RolesTable
              selectedRows={selectedRows}
              // loading={loading}
              dispatch = {dispatch}
              handleSaveData={this.handleSaveData}
              handleDeleteData={this.handleDeleteData}
              roledata = {grole.data}
              assignInfo = {grole.assignInfo}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
        
          </div>
        </Card>
    
    );
  }
}
