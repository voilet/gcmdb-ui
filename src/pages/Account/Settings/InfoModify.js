import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu,Row, Col, Card, Form, Button, Input,Radio, Select, Popover, message } from 'antd';
import Link from 'umi/link';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

import {QRCode} from '@/utils/utils';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const { Item } = Menu;
const openMessage = ( type, content ) =>{
  message[type](content, 2)
}


export default
@connect(({ user }) => ({
    currentUser: user.currentUser,
    userInfo:user.userInfo
}))
@Form.create()
class InfoModify extends PureComponent {
    constructor(props) {
        super(props)
        console.log("props", this.props);
    }
  componentWillMount() {
        const {dispatch} = this.props;
        dispatch({
          type: 'user/fetchUserInfo',
          payload: {
            callback: (data) => {
              console.log("data...",data)
            }
          }


        });
      }
    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch,userInfo } = this.props;
        form.validateFields({ force: true }, (err, values) => {
            console.log("values:",values)
            if (!err) {
                dispatch({
                    type: 'user/modifyUserInfo',
                    payload: {
                        ...values,
                      callback:(e=>{
                        openMessage("success","修改成功");
                        setTimeout(()=>{
                          dispatch(routerRedux.push({
                            pathname : '/account/info',
                          }))
                        },200)
                      })
                    },
                });
            }
        });
    };
    render() {
        const { form, submitting ,userInfo} = this.props;
        console.log("this.prop:", this.props);
        let token = '';
        if( userInfo ){
            token = userInfo.google_token || location.href.toString();
        }
        console.log("token", token)
        const { getFieldDecorator } = form;
        return (
            <Card>
                <div>
                    <h3>{ userInfo.first_name }的个人信息</h3>
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form onSubmit={this.handleSubmit} layout="vertical">
                                <FormItem label="用户名：">
                                  <Input size="large" placeholder="用户名" value={ userInfo.username } disabled={true} />
                                </FormItem>
                              <FormItem label="姓名" required={false}>
                                {getFieldDecorator('nickname', { initialValue:userInfo.first_name })(<Input size="large" placeholder="姓名" />)}
                              </FormItem>
                                <FormItem label="邮箱">
                                    {getFieldDecorator('mail', {
                                        initialValue:userInfo.email,
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
                                    })(<Input size="large" placeholder="邮箱" />)}
                                </FormItem>


                                <FormItem label="手机号">
                                    <InputGroup compact>
                                        <Select
                                            size="large"
                                            value={"86"}
                                            onChange={this.changePrefix}
                                            style={{ width: '20%' }}
                                        >
                                            <Option value="86">+86</Option>
                                        </Select>
                                        {getFieldDecorator('mobile', {
                                            initialValue:userInfo.mobile,
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
                                        })(<Input size="large" style={{ width: '80%' }} placeholder="11位手机号" />)}
                                    </InputGroup>
                                </FormItem>

                                <FormItem label="堡垒机" name="token_passwd">
                                  { getFieldDecorator('token_passwd',{
                                    initialValue:userInfo.token_passwd
                                  })(
                                      <RadioGroup compact >
                                          <Radio value={ true }>password+token</Radio>
                                          <Radio value={ false }>token&&password</Radio>
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
                            <div style={{textAlign:'right'}} dangerouslySetInnerHTML={ {__html:QRCode({text: token }) }}>
                            </div>
                        </Col>
                    </Row>

                </div>
            </Card>

        )
    }
}
