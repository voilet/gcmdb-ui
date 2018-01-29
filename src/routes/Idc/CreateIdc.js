import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Idc.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitAddIdc',
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
      <PageHeaderLayout title="添加机房" content="完善机房信息，网络问题可快速处理。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="机房名称"
            >
              {getFieldDecorator('idc_name', {
                rules: [{
                  required: true, message: '请输入机房名称',
                }],
              })(
                <Input placeholder="请输入机房名称" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="机房别名"
            >
              {getFieldDecorator('alias', {
                rules: [{
                  required: true, message: '请输入机房别名',
                }],
              })(
                <Input placeholder="请输入机房别名，主机名使用" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="带宽"
            >
              {getFieldDecorator('band_width', {
                rules: [{
                  required: true, message: '请输入机房带宽',
                }],
              })(
                <Input placeholder="请输入机房带宽" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('phone', {
                rules: [{
                  required: true, message: '请输入机房联系电话',
                }],
              })(
                <Input placeholder="请输入机房联系电话" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator('addresses', {
                rules: [{
                  required: true, message: '请输入机房地址',
                }],
              })(
                <Input placeholder="请输入机房地址" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="ip地址段"
            >
              {getFieldDecorator('ip_range', {
                rules: [{
                  required: true, message: '描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="ip地址段 10.1.0.0/16" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="描述"
            >
              {getFieldDecorator('remarks', {
                rules: [{
                  required: true, message: '描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="机房描述" rows={4} />
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
