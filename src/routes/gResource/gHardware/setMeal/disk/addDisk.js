import React, {PureComponent} from 'react';

import styles from './Disk.less'

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

const { TextArea } = Input;

const Option = Select.Option

@connect((props) => (props))

@Form.create()

export default class Adddisk extends PureComponent {
  
  state = {
    modalVisible: false,
    selectedGroupValue: {}
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
          'title': form.getFieldValue('title') ? form.getFieldValue('title') :  '',
          'num': form.getFieldValue('num') ? form.getFieldValue('num') :  '',
          'rpm': form.getFieldValue('rpm') ? form.getFieldValue('rpm') : "",  
          'volume': form.getFieldValue('volume') ? form.getFieldValue('volume') : "",
          'category': form.getFieldValue('category') ? form.getFieldValue('category') : "",
          'description': form.getFieldValue('description') ? form.getFieldValue('description') : "",
          'componentname': 'disk',
        }

        this.props.dispatch({
          type: 'ghardware/addHardwareComponents',
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
    const { hardwaredata } = this.props;
    const categoryData = hardwaredata.data.category == undefined ? [] : hardwaredata.data.category
    
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
             添加硬盘
        </Button>
        <Modal
          title="添加硬盘"
          visible={this.state.modalVisible}
          onOk={this.handleAddIDC}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {
              getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入硬盘名称',
                }],
              })(
                <Input placeholder="请输入硬盘名称" />
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="数量"
          >
            {
              getFieldDecorator('num', {
                rules: [{
                  required: true, message: '请输入硬盘数量',
                }],
              })(
                <Input placeholder="请输入硬盘数量" />
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="容量"
          >
            {
              getFieldDecorator('volume', {
                rules: [{
                  required: true, message: '请输入硬盘核数',
                }],
              })(
                <Input placeholder="请输入硬盘核数" />
              )
            }
          </FormItem>
          
          <FormItem
            {...formItemLayout}
            label="转数"
          >
            {
              getFieldDecorator('rpm', {
                rules: [{
                  required: true, message: '请输入硬盘类型',
                }],
              })(
                <Input placeholder="请输入硬盘类型" />
              )
            }
          </FormItem>
          
          <FormItem
            {...formItemLayout}
            label="类型"
          >
            {
              getFieldDecorator('category', {
                rules: [{
                  required: true, message: '请选择硬盘类型',
                }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择硬盘类型"
                >
                  {categoryData.map(item=>(<Option key={item.ID} value={Number(item.ID)}>{item.title}</Option>))}
                </Select>
              )
            }
          </FormItem>
         
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {
              getFieldDecorator('description')(
                <TextArea style={{ minHeight: 32 }} placeholder="硬盘描述" rows={4} />
              )
            }
          </FormItem>

        </Modal>
    </div>
    );
  }
}
