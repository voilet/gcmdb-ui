import React, {PureComponent} from 'react';
import styles from './Meal.less'

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

export default class AddCPU extends PureComponent {
  
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
          'cpu_name': form.getFieldValue('cpu_name')? form.getFieldValue('cpu_name') :  '',
          'cpu_num': form.getFieldValue('cpu_num')? form.getFieldValue('cpu_num') :  '',
          'cpu_clear':form.getFieldValue('cpu_clear')? form.getFieldValue('cpu_clear') : "",
          'cpu_type':form.getFieldValue('cpu_type')? form.getFieldValue('cpu_type') : "",
          'details':form.getFieldValue('details')? form.getFieldValue('details') : "",
         }
        debugger
         this.props.dispatch({
           type: 'gidc/addIDC',
           payload: {
             description: fields,
           },
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
             添加CPU
        </Button>
        <Modal
          title="添加CPU"
          visible={this.state.modalVisible}
          onOk={this.handleAddIDC}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('cpu_name', {
              rules: [{
                required: true, message: '请输入CPU名称',
              }],
            })(
              <Input placeholder="请输入CPU名称" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="数量"
          >
            {getFieldDecorator('cpu_num', {
              rules: [{
                required: true, message: '请输入CPU数量',
              }],
            })(
              <Input placeholder="请输入CPU数量" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="核数"
          >
            {getFieldDecorator('cpu_clear', {
              rules: [{
                required: true, message: '请输入CPU核数',
              }],
            })(
              <Input placeholder="请输入CPU核数" />
            )}
          </FormItem>
          
          <FormItem
            {...formItemLayout}
            label="类型"
          >
            {getFieldDecorator('cpu_type')(
              <Input placeholder="请输入CPU类型" />
            )}
          </FormItem>
         
         
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('details')(
              <TextArea style={{ minHeight: 32 }} placeholder="CPU描述" rows={4} />
            )}
          </FormItem>


        
        </Modal>
    </div>
    );
  }
}
