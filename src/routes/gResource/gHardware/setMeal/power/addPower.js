import React, {PureComponent} from 'react';
import styles from './Power.less'

import {connect} from 'dva';

import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Modal,
    message,
    Select,
    Switch
  } from 'antd';


const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const { TextArea } = Input;
const Option = Select.Option

@connect((props) => (props))

@Form.create()

export default class ADDpower extends PureComponent {
  
  state = {
    modalVisible: false,
    selectedGroupValue: {},
    enable : false
  };


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }



  handleAddIDC = (e) => {

    const form = this.props.form;

      e.preventDefault();
      form.validateFields((err, values) => {
      
      if (!err) {
        const fields = {
          'title': form.getFieldValue('title')? form.getFieldValue('title') :  '',
          'num': form.getFieldValue('num')? form.getFieldValue('num') :  '',
          'volume':form.getFieldValue('volume')? form.getFieldValue('volume') : "",
          'description':form.getFieldValue('description')? form.getFieldValue('description') : "",
          'componentname':'power',
         }
        //debugger
        console.log(fields)
        this.props.dispatch({
           type: 'ghardware/addHardwareComponents',
           payload: {
            description:fields
           }
         });
     
         message.success('添加成功');
         this.setState({
           modalVisible: false,
           enable: false
         });
     
      
         form.resetFields();
      };
    });
  
    
  }




  render() {
    const { getFieldDecorator } = this.props.form;
    const { form,dispatch } = this.props;
    
   console.log('getFieldDecorator+++',this.props)
    
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
      <div className={styles.tableListOperator} style={{float: 'left'}}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
             添加电源
        </Button>
        <Modal
          title="添加电源"
          visible={this.state.modalVisible}
          onOk={this.handleAddIDC}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入电源名称',
              }],
            })(
              <Input placeholder="请输入电源名称" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="数量"
          >
            {getFieldDecorator('num', {
              rules: [{
                required: true, message: '请输入电源数量',
              }],
            })(
              <Input placeholder="请输入电源数量" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="容量"
          >
            {getFieldDecorator('volume', {
              rules: [{
                required: true, message: '请输入电源容量',
              }],
            })(
              <Input placeholder="请输入电源容量" />
            )}
          </FormItem>
        
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('description')(
              <TextArea style={{ minHeight: 32 }} placeholder="电源描述" rows={4} />
            )}
          </FormItem>


        
        </Modal>
    </div>
    );
  }
}
