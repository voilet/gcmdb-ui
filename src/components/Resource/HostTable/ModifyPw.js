import { Form, Modal, Input } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

@connect(props => props)
class ModifyPw extends PureComponent {
  state = {
    visible: false,
    confirmDirty: false,
  };

  showModal = _ => {
    this.setState({
      visible: true,
    });
  };

  onCancel = _ => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  };

  onSave = (ID, passwd) => {
    this.props.dispatch({
      type: 'gdevice/modifyHostPassword',
      payload: { id: ID, passwd: passwd },
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码必须一致');
    } else {
      callback();
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { visible } = this.state;
    const { form: { getFieldDecorator }, data } = this.props;
    return (
      <span>
        <a onClick={this.showModal}>修改密码</a>
        <Modal
          visible={visible}
          title="修改密码"
          okText="确定"
          cancelText="返回"
          onCancel={this.onCancel}
          onOk={this.onSave}
          maskClosable={false}
        >
          <Form layout="vertical">
            <FormItem label="服务器IP地址">
              {data.ipsummary
                .split(',')
                .map((i, index) => <div style={{ color: 'red' }}> {i}</div>)}
            </FormItem>
            <FormItem {...formItemLayout} label="新密码:">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input type="password" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="确认新密码: ">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ModifyPw);
