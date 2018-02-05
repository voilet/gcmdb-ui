import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


@connect(state => ({
  submitting: state.form.regularFormSubmitting,
  rule: state.form,
}))

@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'form/getOps',
    });

    dispatch({
      type: 'form/getDev',
    });
    dispatch({
      type: 'form/getProjectGroup',
    });
    window.addEventListener('resize', this.resizeFooterToolbar);
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { rule: { ops, dev, project_group } } = this.props;
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
      <PageHeaderLayout title="添加项目" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="项目名称"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入项目名',
                }],
              })(
                <Input placeholder="请输入项目名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目别名"
            >
              {getFieldDecorator('alias', {
                rules: [{
                }],
              })(
                <Input placeholder="请输入项目别名，使用saltstack时需使用，请使用英文" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="代码仓库"
            >
              {getFieldDecorator('code_url', {
                rules: [{

                }],
              })(
                <Input placeholder="请输入git或svn地址" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目描述"
            >
              {getFieldDecorator('remarks', {
                rules: [{
                  required: true, message: '请输入项目描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator('order', {
                rules: [{

                }],
              })(
                <Input placeholder="-99排序为最高，生成tree时使用" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属项目组"
            >
              {getFieldDecorator('group')(
                <Select
                  showSearch
                  placeholder="选择项目组"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {project_group.data.map(post =>
                    <Option key={post.ID}>{post.title}</Option>
                  )}

                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="运维人员"
            >
              {getFieldDecorator('ops_group', {
                rules: [{
                  required: true, message: '选择运维人员',
                }],
              })(

                <Select
                  showSearch
                  placeholder="选择运维人员"
                  optionFilterProp="children"
                  mode="multiple"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {ops.data.map(post =>
                    <Option key={post.ID}>{post.first_name}</Option>
                  )}

                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="开发人员"
            >
              {getFieldDecorator('dev_group', {
                rules: [{
                  required: true, message: '开发人员必选',
                }],
              })(
                <Select
                  showSearch
                  placeholder="选择开发人员"
                  optionFilterProp="children"
                  mode="multiple"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {dev.data.map(post =>
                    <Option key={post.ID}>{post.first_name}</Option>
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
