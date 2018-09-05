import React, {PureComponent} from 'react';
import styles from './provider.less'

import {connect} from 'dva';
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Modal,
    message,
  } from 'antd';


const FormItem = Form.Item;


const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const { TextArea } = Input;

@connect((props) => (props))
@Form.create()

class PhoneNumberInput extends PureComponent {
 
  // const { value } = this.props.value || {};

  state = {
    number: 0,
  };

componentWillReceiveProps(nextProps) {
  // Should be a controlled component.
  if ('value' in nextProps) {
    const value = nextProps.value;
    this.setState(value);
  }
}
handleNumberChange = (e) => {
  const number = parseInt(e.target.value || 0, 10);
  if (isNaN(number)) {
    return;
  }
  if (!('value' in this.props)) {
    this.setState({ number });
  }
  this.triggerChange({ number });
}

triggerChange = (changedValue) => {
  // Should provide an event to pass value to Form.
  const onChange = this.props.onChange;
  if (onChange) {
    onChange(Object.assign({}, this.state, changedValue));
  }
}
render() {
  const { size } = this.props;
  const state = this.state;

  return (
      <Input
        placeholder="请输入手机号" 
        type="text"
        size={size}
        value={state.number}
        onChange={this.handleNumberChange}
      />
  );
}
}


export default  class AddProvider extends PureComponent {
  
  state = {
    modalVisible: false,
  };


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }



  handleAddProvider = (e) => {

    const form = this.props.form;


    e.preventDefault();
      form.validateFields((err, values) => {
      
      if (!err) {
        const fields = {
          'provider_name': form.getFieldValue('provider_name')? form.getFieldValue('provider_name') :  '',
          'phone': form.getFieldValue('phone')? form.getFieldValue('phone') :  '',
          'email':form.getFieldValue('email')? form.getFieldValue('email') : "",
          'phone':form.getFieldValue('phone')? form.getFieldValue('phone') : "",
          'remarks':form.getFieldValue('remarks')? form.getFieldValue('remarks') : "",
         }


         
         this.props.dispatch({
           type: 'gidc/addProvider',
           payload: {
             description: fields,
           },
         });
     
         message.success('添加成功');
         this.setState({
           modalVisible: false,
         });
     
         this.props.dispatch({
             type: 'gidc/queryProvider',
             payload: '',
         });
         form.resetFields();
      };
    });
  
    
  }

  render() {
    
    const { getFieldDecorator } = this.props.form;
    const { form,dispatch} = this.props;
    
    
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
      <div className={styles.tableListOperator} style={{float: 'left'}}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
             添加运营商
        </Button>
        <Modal
          title="添加运营商"
          visible={this.state.modalVisible}
          onOk={this.handleAddProvider}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="运营商名称"
          >
            {getFieldDecorator('provider_name', {
              rules: [{
                required: true, message: '请输入运营商名称',
              }],
            })(
              <Input placeholder="请输入运营商名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: '请输入手机号',
                pattern: /^[0-9]*$/, message: '数字',
              }],
            })(
              <Input placeholder="请输入手机号" />
             //<PhoneNumberInput onClose={this.onClose}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: '请输入邮件地址',
              },{
                type: 'email', message: '非法 E-mail!',
              }],
            })(
              <Input placeholder="请输入E-mail 邮件地址" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {getFieldDecorator('remarks', {
              rules: [{
                required: true, message: '备注',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="机房描述" rows={4} />
            )}
          </FormItem>
        </Modal>
    </div>
    );
  }
}
//export default Form.create()(AddProvider);


