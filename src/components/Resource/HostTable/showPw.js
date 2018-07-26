import { Form, Modal, Input, Button } from 'antd';
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
class ShowPw extends PureComponent {
  state = {
    visible: false,
    confirmDirty: false,
  };

  showModal = id => {
    {
      console.log('xxxx', this.props);
    }

    this.props.dispatch({
      type: 'gdevice/queryHostPassword',
      payload: id,
    });

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
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  };

  render() {
    console.log('ShowPw', this.props.data);
    const { visible } = this.state;
    const { form: { getFieldDecorator }, data } = this.props;
    return (
      <span>
        <Button onClick={() => this.showModal(data.ID)}>查看密码 </Button>
        <Modal
          visible={visible}
          title="查看密码"
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
            <FormItem {...formItemLayout} label="密码:">
              <font size="6" color="blue">
                {data.password ? data.password : '查询失败'}{' '}
              </font>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ShowPw);
