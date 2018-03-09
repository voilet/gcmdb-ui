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
  Switch,
} from 'antd';
import UsersTable from '../../components/UsersTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './UserList.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { TextArea } = Input;

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="添加用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="描述"
      >
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({rule, loading}) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'rule/userCreateAdd',
          payload: values,
        });
      }
      message.success('添加成功');

    });
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'rule/userList',
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
      type: 'rule/userList',
      payload: params,
    });
  }

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/userList',
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
          type: 'rule/userList',
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

    const { dispatch, form } = this.props;

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
        type: 'rule/userList',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }


  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('user_name')(
                <Input placeholder="请输入" />
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
    const { rule: { loading: ruleLoading, data } } = this.props;
    const { selectedRows, modalVisible, addInputValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.props;
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
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="用户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                添加用户
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <UsersTable
              selectedRows={selectedRows}
              loading={ruleLoading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="添加用户"
          visible={modalVisible}
          onOk={this.handleSubmit}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('user_name', {
            rules: [{
              required: true, message: '请输入用户名',
            }],
          })(
            <Input placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('first_name', {
            rules: [{
              required: true, message: '请输入用户姓名',
            }],
          })(
            <Input placeholder="请输入用户姓名" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Email"
        >
          {getFieldDecorator('email', {
            rules: [{
              required: true, message: '邮箱必填',
            }],
          })(
            <Input placeholder="请输入邮箱" />
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="团队管理"
        >
          {getFieldDecorator('leader', {

          })(
            <Switch  checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="是否启用"
        >
          {getFieldDecorator('enable', {
          })(
            <Switch checkedChildren="是" unCheckedChildren="否" checked  />
          )}
        </FormItem>

        </Modal>
      </PageHeaderLayout>
    );
  }
}
