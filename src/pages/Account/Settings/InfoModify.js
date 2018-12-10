import React, {Component, PureComponent} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {FormattedMessage} from 'umi/locale';
import {Menu, Row, Col, Card, Form, Button, Input, Radio, Select, Popover} from 'antd';
import Link from 'umi/link';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

import {QRCode} from '@/utils/utils';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const {Item} = Menu;

export default @connect(({user}) => ({
  currentUser: user.currentUser,
}))

@Form.create()
class InfoModify extends PureComponent {
  constructor(props) {
    super(props)
    console.log("props", this.props);
  }

  handleSubmit = e => {
    e.preventDefault();
    const {form, dispatch} = this.props;
    form.validateFields({force: true}, (err, values) => {
      console.log(err);
      if (!err) {
        const {prefix} = this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix,
          },
        });
      }
    });
  };

  render() {
    const {form, submitting} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Card>
        <div>
          <h3>完善个人信息</h3>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form onSubmit={this.handleSubmit} layout="vertical">
                <FormItem label="姓名：" required={true}>
                  {getFieldDecorator('first_name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名！',
                      },
                    ],
                  })(<Input size="large" placeholder="姓名"/>)}
                </FormItem>
                <FormItem label="邮箱">
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: '请输入邮箱地址！',
                      },
                      {
                        type: 'email',
                        message: '邮箱地址格式错误！',
                      },
                    ],
                  })(<Input size="large" placeholder="邮箱"/>)}
                </FormItem>

                <FormItem label="手机号">
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号！',
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: '手机号格式错误！',
                      },
                    ],
                  })(<Input size="large" placeholder="11位手机号"/>)}
                </FormItem>
                <FormItem label="ssh公钥">
                  {getFieldDecorator('ssh_pub', {

                  })(
                    <Input.TextArea
                      placeholder="登录堡垒机使用"
                      rows={4}
                    />
                  )}
                </FormItem>

                <FormItem label="堡垒机登录方式">
                  {getFieldDecorator('token_password', {

                  })(
                    <RadioGroup compact defaultValue={1}>
                      <Radio value={1}>password+token</Radio>
                      <Radio value={2}>token&&password</Radio>
                    </RadioGroup>
                  )}

                </FormItem>

                <FormItem>
                  <Button
                    size="large"
                    loading={submitting}
                    type="primary"
                    htmlType="submit"
                  >
                    修改
                  </Button>

                </FormItem>
              </Form>
            </Col>
            <Col xs={24} md={12}>
              <div style={{textAlign: 'right'}} dangerouslySetInnerHTML={{__html: QRCode({text: "abc"})}}>
              </div>
            </Col>
          </Row>

        </div>
      </Card>

    )
  }
}
