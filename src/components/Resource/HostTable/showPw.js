import { Form, Modal, Input } from 'antd'
import React, { PureComponent, Fragment } from 'react';
import { Button } from 'antd/lib/radio';

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6 ,
  },
  wrapperCol: {
    span: 18 ,
  },
};


class ShowPw extends PureComponent {
    state = {
      visible: false,
      confirmDirty: false,
    };

    showModal =  _ => {

      this.setState({
        visible: true,
      })
    }

    onCancel = _ => {
      this.setState({
        visible: false,
      })
      this.props.form.resetFields()
    }

    onSave = (ID,passwd) => {
        this.setState({
            visible: false,
            })
        this.props.form.resetFields()    
    }


    render() {
      const { visible } = this.state
      const { form: { getFieldDecorator }, data } = this.props
      return (
        <span>
          <a onClick={this.showModal}>查看密码</a>
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
                {
                  data.ipsummary.split(',').map((i,index)=> <div style={{ color: 'red'}}> {i}</div>)
                }
                
              </FormItem>
              <FormItem
              {...formItemLayout}
              label="密码:"
            >
            
             {/* <font size="6" color="blue">{passwd.data ? passwd.data.password : "查询失败"} </font> */}
            
            </FormItem>
            </Form>
          </Modal>
        </span>
      );
    }
  }
  
  export default Form.create()(ShowPw);