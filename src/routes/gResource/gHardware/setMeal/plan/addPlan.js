import React, { PureComponent } from 'react';

import styles from './Meal.less'

import {connect} from 'dva';

import {
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

const { TextArea } = Input;

const Option = Select.Option

@connect((props) => (props))

@Form.create()

export default class Addplan extends PureComponent {
  
  state = {
    modalVisible: false,
    selectedGroupValue: {},
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
          'title': form.getFieldValue('title') ? form.getFieldValue('title') : "",
          'cpu_id': form.getFieldValue('cpu_id') ? form.getFieldValue('cpu_id') :  '',
          'mem_id': form.getFieldValue('mem_id') ? form.getFieldValue('mem_id') : "",
          'disk_id': form.getFieldValue('disk_id') ? form.getFieldValue('disk_id') :  '',
          'power_id': form.getFieldValue('power_id') ? form.getFieldValue('power_id') : "",
          'adaptor_id': form.getFieldValue('adaptor_id') ? form.getFieldValue('adaptor_id') : "",
          'comment': form.getFieldValue('comment') ? form.getFieldValue('comment') : "",
        }

        this.props.dispatch({
          type: 'ghardware/addHardwarePlan',
          payload: fields
        });
     
        message.success('添加成功');

        this.setState({
          modalVisible: false
        });
     
        form.resetFields();

      };

    });
  
    
  }




  render() {
    const { getFieldDecorator } = this.props.form;
    const { hardwaredata } = this.props;
    
    const cpu_plan_category = hardwaredata.data.cpu_plan_category == undefined ? [] : hardwaredata.data.cpu_plan_category
    const mem_plan_category = hardwaredata.data.mem_plan_category == undefined ? [] : hardwaredata.data.mem_plan_category
    const disk_plan_category = hardwaredata.data.disk_plan_category == undefined ? [] : hardwaredata.data.disk_plan_category
    const adaptor_plan_category = hardwaredata.data.adaptor_plan_category == undefined ? [] : hardwaredata.data.adaptor_plan_category
    const power_plan_category = hardwaredata.data.power_plan_category == undefined ? [] : hardwaredata.data.power_plan_category
  
    
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
        <Button 
          icon="plus" 
          type="primary" 
          onClick={() => this.handleModalVisible(true)}
        >
          添加套餐
        </Button>
        <Modal
          title="添加套餐"
          visible={this.state.modalVisible}
          onOk={this.handleAddIDC}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="套餐名称"
          >
            {
              getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入套餐名称',
                }],
              })(
                <Input placeholder="请输入套餐名称" />
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="cpu套餐"
          >
            {
              getFieldDecorator('cpu_id', {
                rules: [{
                  required: true, message: '请选择cpu套餐',
                }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择cpu套餐"
                >
                  {cpu_plan_category.map(item=>(<Option key={item.id} value={item.id}>{item.title}</Option>))}
                </Select>
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="内存套餐"
          >
            {
              getFieldDecorator('mem_id', {
                rules: [{
                  required: true, message: '请选择内存套餐',
                }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择内存套餐"
                >
                  {mem_plan_category.map(item=>(<Option key={item.id} value={item.id}>{item.title}</Option>))}
                </Select>
              )
            }
          </FormItem>
          
          <FormItem
            {...formItemLayout}
            label="硬盘套餐"
          >
            {
              getFieldDecorator('disk_id', {
                rules: [{
                  required: true, message: '请选择硬盘套餐',
                }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择硬盘套餐"
                >
                  {disk_plan_category.map(item=>(<Option key={item.id} value={item.id}>{item.title}</Option>))}
                </Select>
              )
            }
          </FormItem>
            

          <FormItem
            {...formItemLayout}
            label="电源套餐"
          >
            {
              getFieldDecorator('power_id', {
                rules: [{
                  required: true, message: '请选择电源套餐',
                }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择电源套餐"
                >
                  {power_plan_category.map(item=>(<Option key={item.id} value={item.id}>{item.title}</Option>))}
                </Select>
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="网卡套餐"
          >
            {
              getFieldDecorator('adaptor_id')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择电源套餐"
                >
                  {adaptor_plan_category.map(item=>(<Option key={item.id} value={item.id}>{item.title}</Option>))}
                </Select>
              )
            }
          </FormItem>
         
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {
              getFieldDecorator('comment')(
                <TextArea style={{ minHeight: 32 }} placeholder="套餐备注" rows={4} />
              )
            }
          </FormItem>

        </Modal>
    </div>
    );
  }
}
