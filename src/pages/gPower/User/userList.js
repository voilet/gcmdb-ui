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
import ProjectTable from '../../../components/ProjectTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './project.less';
import AddProject from  './addProject'


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
  };



  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gproline/getProjectList',
    });

    dispatch({
      type: 'gproline/getProjectLine',
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

  handleMenuClick = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;
    console.log(selectedRows)
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
    const { ID, group_id, pro_title, line_id, pro_alias, pro_code_url, pro_enable, pro_remarks} = val

    if (group_id != "-1") {
      const params = {
        ID,
        title:pro_title,
        alias:pro_alias,
        remarks:pro_remarks,
        code_url:pro_code_url,
        enable:pro_enable,
        groupid:group_id,
        lineid:line_id,
      }
  
      this.props.dispatch({
        type: 'gproline/modifyProject',
        payload: params 
      });
    } else {
      this.props.dispatch({
        type: 'gproline/getProjectList',
      });
    } 

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
  
    const { gproline,loading,submitting,dispatch } = this.props;
    
    console.log('Parent,props', this.props)
    
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
                  <AddProject 
                  /> 
                </Col>
              </Row>
              </div>
            <Divider> 项目列表 </Divider>

            <ProjectTable
              selectedRows={selectedRows}
              // loading={loading}
              dispatch = {dispatch}
              handleSaveData={this.handleSaveData}
              handleDeleteData={this.handleDeleteData}
              prolinedata = {gproline.prolinedata}
              progroupbylid = {gproline.progroupbylid}
              prodata={this.props.gproline.projectdata }
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />

          </div>
        </Card>
    
    );
  }
}
