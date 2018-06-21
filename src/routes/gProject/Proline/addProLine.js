import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Icon, Button, Modal, message, Radio } from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;

@connect(props => props)
@Form.create()
export default class AddProline extends PureComponent {
  state = {
    modalVisible: this.props.visible,
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'gproline/getProjectLine',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAddLine = () => {
    const form = this.props.form;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
    });

    const fields = {
      title: form.getFieldValue('title') ? form.getFieldValue('title') : '',
      alias: form.getFieldValue('alias') ? form.getFieldValue('alias') : '',
      order: form.getFieldValue('order') ? form.getFieldValue('order') : '',
      remark: form.getFieldValue('remarks') ? form.getFieldValue('remarks') : '',
    };

    this.props.dispatch({
      type: 'gproline/addProjectLine',
      payload: {
        description: fields,
      },
    });

    form.resetFields();

    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting, form, dispatch } = this.props;

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

    return (
      <div style={{ float: 'left' }}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
          添加产品线
        </Button>
        <Modal
          title="添加产品线"
          visible={this.state.modalVisible}
          onOk={this.handleAddLine}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem {...formItemLayout} label="产品线中文名称">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入产品线中文名称',
                },
              ],
            })(<Input placeholder="请输入产品线中文名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="产品英文名称">
            {getFieldDecorator('alias', {
              rules: [{}],
            })(<Input placeholder="请输入产品线英文名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="业务描述">
            {getFieldDecorator('remarks', {
              rules: [
                {
                  required: true,
                  message: '请简要描述业务',
                },
              ],
            })(<TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="优先级">
            {getFieldDecorator('order', {
              rules: [{}],
            })(<Input placeholder="-99优先级为最高，生成tree时使用" />)}
          </FormItem>
        </Modal>
      </div>
    );
  }
}
