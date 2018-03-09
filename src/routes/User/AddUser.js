import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, Switch } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './UserList.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ rule, loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  rule,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'rule/userCreateAdd',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="添加新用户" content="添加用户信息。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
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

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
