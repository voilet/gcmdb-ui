import React, {PureComponent} from 'react';
import {connect} from 'dva';

import {
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Modal,
  notification,
  Switch,
} from 'antd';



const FormItem = Form.Item;
const {Option} = Select;

 

const { TextArea } = Input;
 

const openNotificationWithIcon = (type,content) => {
  notification[type]({
    message: '通 知 栏',
    description: content,
  });
};


// @connect(({groline, loading}) => ({
//   groline,
//   loading: loading.models.groline,
// }))
@connect((props) => (props))

@Form.create()



export default class AddProject   extends PureComponent {
  
  state = {
    modalVisible: this.props.visible,
    showFormProline: true,
    selectedGroupValue: 0,
    enable: true,
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
      'username': form.getFieldValue('username')? form.getFieldValue('username') :  '',
      'password': form.getFieldValue('password')? form.getFieldValue('password') :  '',
      'role':form.getFieldValue('role')? form.getFieldValue('role') : "",
      'realname':form.getFieldValue('realname')? form.getFieldValue('realname') : "",
      'email':form.getFieldValue('email')? form.getFieldValue('email') : "",
      'phone':form.getFieldValue('phone')? form.getFieldValue('phone') : "",
      'enable': this.state.enable,
    }


    this.props.dispatch({
      type: 'guser/addUser',
      payload: {
        description: fields,
        cb: (info) => {
          if (info.status == '200'){
            openNotificationWithIcon('success',"添加用户成功!~ ~")
          } else {
            openNotificationWithIcon('error',"添加用户失败!~ ~")
          }
        }
      },
    });

     
    this.setState({
      modalVisible: false,
    });

    form.resetFields();
  }


  handleSelectLineValue = (value) => {
    console.log(value)
    
    this.props.dispatch({
      type: 'gproline/getProjectGroupbyId',
      payload: value
    });
    
  }

  handleSelectGroupValue = (value) => {
    this.setState({
        selectedGroupValue: value,
      });
  }

  handleStatusChange = (value) => {
    if(value){
      this.setState({ enable : "on"})
    } else {
      this.setState({ enable : "off"})
    }
  }    



  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting,form,dispatch,progroupdata,roledata } = this.props;


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
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    
    return (
      <div>
        <Button type="primary" icon="plus"  onClick={() => this.handleModalVisible(true)}>
             添加用户
        </Button>
        <Modal
          title="添加用户"
          visible={this.state.modalVisible}
          onOk={this.handleAdd}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >     


        <FormItem
            {...formItemLayout}
            label="用户名"
            >
            {getFieldDecorator('username', {
                rules: [{
                required: true, message: '请输入用户名',
                }],
            })(
                <Input placeholder="请输入用户名" />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="用户密码"
            >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '用户密码',
              }],
            })(
              <Input placeholder="用户密码" />
            )}
        </FormItem>
          
        <FormItem
        {...formItemLayout}
        label="角色"
        >

        {getFieldDecorator('role')(

            <Select
            style={{ width: 120 }}
            showSearch
            placeholder="角色"
            onChange = {this.handleSelectLineValue} 
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            {  roledata.map(post => {
                return <Option key={post.ID} value={post.ID} >{post.title}</Option>
            }
            )
            }

            </Select>
        )}
        </FormItem>

       
      
        <FormItem
            {...formItemLayout}
            label="邮箱"
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: '请输入用户邮箱',
              }],
            })(
              <Input placeholder="邮箱" />
            )}
        </FormItem> 


        <FormItem
          {...formItemLayout}
          label="真实姓名"
        >
          {getFieldDecorator('realname', {
            rules: [{

            }],
          })(
            <Input placeholder="请输入真实姓名" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [{
              required: true, message: '请输入手机号',
            }],
          })(
             <Input placeholder="请输入手机号" />
          )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="用户状态"
          >
            {getFieldDecorator('enable')(
              <Switch 
              checkedChildren="开启" 
              unCheckedChildren="关闭" 
              checked = {this.state.enable} 
              onChange={(e) => this.handleStatusChange(e)} />
            )}
        </FormItem>

        </Modal>
    </div>
    );
  }
}
