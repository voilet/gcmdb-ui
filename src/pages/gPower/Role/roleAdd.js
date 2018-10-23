import React, {PureComponent} from 'react';
import {connect} from 'dva';

import {
  Form,
  Input,
  notification,
  Button,
  Modal 
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
 
const openNotificationWithIcon = (type,content) => {
  notification[type]({
    message: '通 知 栏',
    description: content,
  });
};


 
@connect((props) => (props))

@Form.create()



export default class AddRole  extends PureComponent {
  state = {
    modalVisible: false
  };

  handleModalVisible = (flag) => {
    const form = this.props.form;
    form.resetFields();
    this.setState({
      modalVisible: !!flag,
    });

  }

  handleAdd = () => {
    const form = this.props.form;
    form.validateFields((err) => {
        if (err) return;
    });
    
    const  fields = {
      'rolename': form.getFieldValue('rolename')? form.getFieldValue('rolename') :  '',
      'remarks': form.getFieldValue('remarks')? form.getFieldValue('remarks') :  '',
    }


    this.props.dispatch({
      type: 'grole/addRole',
      payload: {
        description: fields,
        cb: (info) => {
          if (info.status == '200'){
            openNotificationWithIcon('success',"添加角色成功!~ ~")
          } else {
            openNotificationWithIcon('error',"添加角色失败!~ ~")
          }
        }
      },
    });

    this.setState({
      modalVisible: false,
    });

    form.resetFields();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
 
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };
 
    
    return (
      <div>
        <Button type="primary" icon="plus"  onClick={() => this.handleModalVisible(true)}>
             添加角色
        </Button>

        <Modal
          title="添加角色"
          visible={this.state.modalVisible}
          onOk={this.handleAdd}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >     


        <FormItem
            {...formItemLayout}
            label="角色名"
            >
            {getFieldDecorator('rolename', {
                rules: [{
                required: true, message: '请输入角色名',
                }],
            })(
                <Input placeholder="请输入角色名" />
            )}
        </FormItem>

          <FormItem
            {...formItemLayout}
            label="角色描述"
          >
            {getFieldDecorator('remarks', {
              rules: [{
                required: true, message: '角色描述',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="角色描述" rows={4} />
            )}
          </FormItem>

        </Modal>
    </div>
    );
  }
}
