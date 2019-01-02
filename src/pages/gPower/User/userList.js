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
  DatePicker,
  Modal,
  Divider
} from 'antd';
import UserTable from '@/components/Access/User';

//import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './userList.less';
import UserAdd from  './userAdd'

const InputGroup = Input.Group

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { TextArea } = Input;




@connect((props) => (props))

@Form.create()

export default class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    userdata: [],
    roledata: []
  };



  componentDidMount() {
    const {dispatch} = this.props;
    
    dispatch({
      type: 'guser/fetch',
      // payload: {
      //   cb: (info) => {
      //     this.setState({
      //       userdata : info.data.user_infos,
      //       roledata:  info.data.role_list,
      //       pagination: info.pagination
      //     })
      //   }
      // }
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
      type: 'gproline/getUserlist',
      payload: params,
    });
  }

  // handleRefreshTableChange = () => {
  //   const {dispatch} = this.props;
  //   dispatch({
  //     type: 'gproline/getProjectLine',
  //     payload: '',
  //   });
  // }



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

  handleMenuClick = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;
   
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'gproline/getProjectLine',
          payload: {
            ID: selectedRows.map(row => row.ID).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      case  'approval':
          dispatch({
            type: 'gproline/getProjectLine',
            payload: {
              ID: selectedRows.map(row => row.ID).join(','),
            },
            callback: () => {
              this.setState({
                selectedRows: [],
              });
            },
          });
      case  'stop':
          dispatch({
            type: 'gproline/getProjectLine',
            payload: {
              ID: selectedRows.map(row => row.ID).join(','),
            },
            callback: () => {
              this.setState({
                selectedRows: [],
              });
            },
          });
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  //保存
  handleSaveData = (val) => {
    let value = "on"

    console.log("val",val)
    const { ID, email, enable, phone, real_name, role,username,password} = val
  
    if( enable ){
        value = "on"
    } else {
        value = "off"
    }

    const userinfo = {
      ID,
      enable:enable,
      role:role,
      username:username,
      enable:value,
      email:email,
      real_name:real_name,
      phone:phone, 
    }

    this.props.dispatch({
      type: 'guser/modifyUser',
      payload: userinfo 
    }) 
    
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
    
    const {selectedRows, userdata, roledata,pagination} = this.state;
    const { getFieldDecorator } = this.props.form;
    //const { submitting } = this.props;
  
    const { guser,dispatch } = this.props;
    
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量删除</Menu.Item>
        <Menu.Item key="approval">批量启用</Menu.Item>
        <Menu.Item key="stop">批量禁用</Menu.Item>
      </Menu>
    );
    let guserdata = guser.data.data || {};
    return (
    
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Row gutter={16}>
               <Col span={2}>
                  <UserAdd
                   roledata = { guserdata.role_list }
                  /> 
                </Col>
              </Row>
            </div>
            
          
            <Divider> 用户列表 </Divider>

            <UserTable
              selectedRows={selectedRows}
              // loading={loading}
              dispatch = {dispatch}
              handleSaveData={this.handleSaveData}
              handleDeleteData={this.handleDeleteData}
              userdata = {guserdata.user_infos}
              roledata = {guserdata.role_list || {guserdata:[]}}
              pagination = {guser.data.pagination || {}}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />

          </div>
        </Card>
    
    );
  }
}
