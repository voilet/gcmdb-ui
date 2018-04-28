import React, {PureComponent} from 'react';
import styles from './IDC.less'

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

export default class AddIDC extends PureComponent {
  
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
          'idc_name': form.getFieldValue('idc_name')? form.getFieldValue('idc_name') :  '',
          'alias': form.getFieldValue('alias')? form.getFieldValue('alias') :  '',
          'band_width':form.getFieldValue('band_width')? form.getFieldValue('band_width') : "",
          'phone':form.getFieldValue('phone')? form.getFieldValue('phone') : "",
          'addresses':form.getFieldValue('addresses')? form.getFieldValue('addresses') : "",
          'ip_range':form.getFieldValue('ip_range')? form.getFieldValue('ip_range') : "",
          'remarks':form.getFieldValue('remarks')? form.getFieldValue('remarks') : "",
          'enable':form.getFieldValue('enable')? form.getFieldValue('enable') : "",
          'providerids': JSON.stringify(this.state.selectedGroupValue)
         }
        // debugger
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


  handleSelectGroupValue = (value) => {
  
    this.setState({
        selectedGroupValue: {"data":value},
      });
  }

  handleStatusChange = (value) => {
      this.setState({ enable : value})
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting,form,dispatch,providerdata} = this.props;
    
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
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    
    return (
      <div className={styles.tableListOperator} style={{float: 'left'}}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
             添加机房
        </Button>
        <Modal
          title="添加机房"
          visible={this.state.modalVisible}
          onOk={this.handleAddIDC}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="机房名称"
          >
            {getFieldDecorator('idc_name', {
              rules: [{
                required: true, message: '请输入机房名称',
              }],
            })(
              <Input placeholder="请输入机房名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="机房别名"
          >
            {getFieldDecorator('alias', {
              rules: [{
                required: true, message: '请输入机房别名',
              }],
            })(
              <Input placeholder="请输入机房别名，主机名使用" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="运营商"
          >
            {getFieldDecorator('selectprovider',{
              rules: [{
                required: true,
              }],
            }
            )(
              <Select
                mode="multiple"
                placeholder="选择运营商"
                style={{ width: 120 }}
                onChange = {this.handleSelectGroupValue} 
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                { providerdata.data.length > 0 && providerdata.data.map(post =>
                  <Option key={post.ID} value={post.ID} >{post.provider_name}</Option>
                )
              }

              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="带宽"
          >
            {getFieldDecorator('band_width', {
              rules: [{
                required: true, message: '请输入机房带宽',
              }],
            })(
              <Input placeholder="请输入机房带宽" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系电话"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: '请输入机房联系电话',
              }],
            })(
              <Input placeholder="请输入机房联系电话" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="地址"
          >
            {getFieldDecorator('addresses', {
              rules: [{
                required: true, message: '请输入机房地址',
              }],
            })(
              <Input placeholder="请输入机房地址" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="ip地址段"
          >
            {getFieldDecorator('ip_range', {
              rules: [{
                required: true, message: '描述',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="ip地址段 10.1.0.0/16" rows={4} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开启使用机房"
          >
            {getFieldDecorator('enable')(
              <Switch 
              checkedChildren="开" 
              unCheckedChildren="关" 
              checked = {this.state.enable} 
              onChange={(e) => this.handleStatusChange(e)} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('remarks')(
              <TextArea style={{ minHeight: 32 }} placeholder="机房描述" rows={4} />
            )}
          </FormItem>


        
        </Modal>
    </div>
    );
  }
}
