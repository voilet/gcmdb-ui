import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD 00:00:00';
@connect(state => ({
  submitting: state.form.submitCreateCase,
  rule: state.form,
}))

@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitCreateCase',
          payload: values,
        });
      }
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'form/userGroupList',
    });
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { rule: { usergroup } } = this.props;
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
      <PageHeaderLayout title="添加工单" content="工单系统使流程更加顺畅">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="请输入标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="申请说明"
            >
              {getFieldDecorator('content', {
                rules: [{
                  required: true, message: '申请说明',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="期望处理时间"
            >
              {getFieldDecorator('expect_time',{
                rules: [{ required: true, message: '必选' }],
              })(
                <DatePicker style={{ width: '100%' }} placeholder={'期望处理时间'} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="审批部门"
            >{getFieldDecorator('group_id',{
              rules: [{ required: true, message: '必选' }],
            })(
              <Select
                showSearch
                placeholder="审批部门"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {usergroup.data.map(post =>
                  <Option key={post.ID}>{post.group_name}</Option>
                )}
              </Select>
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
