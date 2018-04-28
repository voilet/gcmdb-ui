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
  message,
  Radio,
} from 'antd';
import ProjectTable from '../../components/ProjectTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './project.less';
import AddProline from  './addProLine'
import AddProgroup from './addProGroup'
import AddProject  from './addProject'


const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { TextArea } = Input;
const RadioGroup = Radio.Group;




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
      type: 'gproline/getProjectLine',
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
      type: 'gproline/getProjectLine',
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
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const {dispatch, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        active: 'search',
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'gproline/getProjectLine',
        payload: values,
      });
    });
  }


  renderSimpleForm() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="项目列表">
              {getFieldDecorator('project_list')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
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
      <PageHeaderLayout title= "产品列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>

              <AddProline 
                refreshTable = {this.handleRefreshTableChange}
                dispatch = {dispatch}
              /> 

              <AddProgroup 
                refreshTable = {this.handleRefreshTableChange}
                prolinedata = {gproline.prolinedata}
                dispatch = {dispatch}
              /> 

              <AddProject 
                refreshTable = {this.handleRefreshTableChange}
                prolinedata = {gproline.prolinedata}
                progroupdata = {gproline.progroupdatabyid}
                dispatch = {dispatch}
              /> 

              {
                selectedRows.length > 0 && (
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <ProjectTable
              selectedRows={selectedRows}
              // loading={loading}
              prodata={this.props.gproline.projectdata }
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
