import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu,Row, Col, Card, Form, Button,Progress, Input,Radio, Select, Popover, message } from 'antd';
import Link from 'umi/link';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

import {QRCode} from '@/utils/utils';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Item } = Menu;
const openMessage = ( type, content ) =>{
  message[type](content, 2)
};
const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

export default
@connect(({ user }) => ({
    currentUser: user.currentUser,
    userInfo:user.userInfo
}))
@Form.create()
class InfoModify extends PureComponent {
    state = {
      help: '',
      helpVisible:false,
    };
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
    getPasswordStatus = () => {
      const { form } = this.props;
      const value = form.getFieldValue('password1');
      if (value && value.length > 9) {
        return 'ok';
      }
      if (value && value.length > 5) {
        return 'pass';
      }
      return 'poor';
    };
    checkConfirm = (rule, value, callback) => {
      if( !value ){
        //密码为空时不处理
        callback();
        return;
      }
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password1')) {
        callback('两次输入的密码不匹配!');
      } else {
        callback();
      }
    };

    checkPassword = (rule, value, callback) => {
      const { visible, confirmDirty } = this.state;
      if( !value ){
        //密码为空时不处理
        callback();
        return;
      }
      if (!value) {
        this.setState({
          help: '请输入密码！',
          helpVisible: !!value,
        });
        callback('error');
      } else {
        this.setState({
          help: '',
        });
        if (!visible) {
          this.setState({
            helpVisible: !!value,
          });
        }
        if (value.length < 6) {
          callback('error');
        } else {
          const { form } = this.props;
          if (value && confirmDirty) {
            form.validateFields(['password2'], { force: true });
          }
          callback();
        }
      }
    };

    changePrefix = value => {
      this.setState({
        prefix: value,
      });
    };
    renderPasswordProgress = () => {
      const { form } = this.props;
      const value = form.getFieldValue('password1');
      const passwordStatus = this.getPasswordStatus();
      return value && value.length ? (
        <div className={styles[`progress-${passwordStatus}`]}>
          <Progress
            status={passwordProgressMap[passwordStatus]}
            className={styles.progress}
            strokeWidth={6}
            percent={value.length * 10 > 100 ? 100 : value.length * 10}
            showInfo={false}
          />
        </div>
      ) : null;
    };
    render() {
        const { form, submitting ,userInfo} = this.props;
        const { help, helpVisible } = this.state;
        console.log("this.prop:", this.props);
        let token = '';
        if( userInfo ){
            token = userInfo.google_token || location.href.toString();
        }
        console.log("token", token)
        const { getFieldDecorator } = form;
        const formItemLayout = {
          labelCol:{
            span:6
          },
          wrapperCol:{
            span:18
          }
        };
        return (
            <Card className={styles.userInfo}>
                <div>
                    <h3>{ userInfo.first_name }的个人信息</h3>
                    <Row gutter={24}>
                        <Col xs={24} md={16}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="用户名：" {...formItemLayout } >
                                  <Input size="large" placeholder="用户名" value={ userInfo.username } disabled={true} />
                                </FormItem>
                              <FormItem label="姓名" required={false} {...formItemLayout }>
                                {getFieldDecorator('first_name', { initialValue:userInfo.first_name })(<Input size="large" placeholder="姓名" />)}
                              </FormItem>


                              <FormItem label="密码" required={false} help={help}  {...formItemLayout }>
                                <Popover
                                  content={
                                    <div style={{ padding: '4px 0' }}>
                                      {passwordStatusMap[this.getPasswordStatus()]}
                                      {this.renderPasswordProgress()}
                                      <div style={{ marginTop: 10 }}>
                                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                                      </div>
                                    </div>
                                  }
                                  overlayStyle={{ width: 240 }}
                                  placement="right"
                                  visible={helpVisible}
                                >
                                  {getFieldDecorator('password1', {
                                    initialValue:'',
                                    rules: [
                                      {
                                        validator: this.checkPassword,
                                      },
                                    ],
                                  })(<Input size="large" type="password" placeholder="至少6位密码，区分大小写" />)}
                                </Popover>
                              </FormItem>
                              <FormItem label="确认密码"  required={false} {...formItemLayout } >
                                {getFieldDecorator('password2', {
                                  initialValue:'',
                                  rules: [
                                    {
                                      required: false,
                                      message: '请确认密码！',
                                    },
                                    {
                                      validator: this.checkConfirm,
                                    },
                                  ],
                                })(<Input size="large" type="password" placeholder="确认密码" />)}
                              </FormItem>
                              <FormItem label="SSH公钥" {...formItemLayout } >
                                {getFieldDecorator('ssh_pub', {
                                  initialValue:userInfo.ssh_pub||"",
                                  rules: [
                                    {
                                      required: false
                                    }
                                  ],
                                })(<TextArea rows={4} />)}
                              </FormItem>
                              <FormItem label="邮箱" {...formItemLayout } >
                                {getFieldDecorator('email', {
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
                                <FormItem label="手机号" {...formItemLayout } >
                                    <InputGroup compact>
                                        <Select
                                            size="large"
                                            value={"86"}
                                            onChange={this.changePrefix}
                                            style={{ width: '25%' }}
                                        >
                                            <Option value="86">+86</Option>
                                        </Select>
                                        {getFieldDecorator('phone', {
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
                                        })(<Input size="large" style={{ width: '75%' }} placeholder="11位手机号" />)}
                                    </InputGroup>
                                </FormItem>

                                <FormItem label="堡垒机" name="token_password" {...formItemLayout } >
                                  { getFieldDecorator('token_password',{
                                    initialValue:userInfo.token_passwd ? 1: 0
                                  })(
                                      <RadioGroup compact >
                                          <Radio value={ 1 }>password+token</Radio>
                                          <Radio value={ 0 }>token&&password</Radio>
                                      </RadioGroup>
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout } >
                                    <Button
                                        size="large"
                                        loading={submitting}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        保存
                                    </Button>

                                </FormItem>
                            </Form>
                        </Col>
                        <Col xs={24} md={8}>
                            <div style={{textAlign:'center'}} dangerouslySetInnerHTML={ {__html:QRCode({text: token }) }}>
                            </div>
                        </Col>
                    </Row>

                </div>
            </Card>

        )
    }
}
