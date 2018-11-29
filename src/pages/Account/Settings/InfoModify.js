import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu,Row, Col, Card, Form, Button, Input,Radio, Select, Popover } from 'antd';
import Link from 'umi/link';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

import {QRCode} from '@/utils/utils';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const { Item } = Menu;

export default
@connect(({ user }) => ({
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
        const { form, dispatch } = this.props;
        form.validateFields({ force: true }, (err, values) => {
            console.log("values:",values)
            if (!err) {
                const { prefix } = this.state;
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
        const { form, submitting } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Card>
                <div>
                    <h3>XXX的个人信息</h3>
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form onSubmit={this.handleSubmit} layout="vertical">
                                <FormItem label="用户名：" required={true}>
                                    {getFieldDecorator('username', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入用户名！',
                                            },
                                        ],
                                    })(<Input size="large" placeholder="用户名" />)}
                                </FormItem>
                                <FormItem label="邮箱">
                                    {getFieldDecorator('mail', {
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
                                <FormItem label="用户名" required={false}>
                                    {getFieldDecorator('nickname', {})(<Input size="large" placeholder="姓名" />)}
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

                                <FormItem label="堡垒机">
                                    <RadioGroup compact defaultValue={1}>
                                        <Radio value={1}>password+token</Radio>
                                        <Radio value={2}>token&&password</Radio>
                                    </RadioGroup>
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
                            <div style={{textAlign:'right'}} dangerouslySetInnerHTML={ {__html:QRCode({text:"abc"}) }}>
                            </div>
                        </Col>
                    </Row>

                </div>
            </Card>

        )
    }
}
