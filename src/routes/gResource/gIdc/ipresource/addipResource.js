import React, {PureComponent} from 'react';
import styles from './ipresouce.less'

import {connect} from 'dva';
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Modal,
    message,
    Select
  } from 'antd';


const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const { TextArea } = Input;
@connect((props) => (props))

@Form.create()

export default class addipResource extends PureComponent {
  
  state = {
    modalVisible: false,
    result: ""
  };


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }



  handleAddipResource = (e) => {

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
          'ip_range':form.getFieldValue('phone')? form.getFieldValue('ip_range') : "",
          'remarks':form.getFieldValue('phone')? form.getFieldValue('remarks') : "",
          'enable':form.getFieldValue('enable')? form.getFieldValue('enable') : "",
         }
     
         this.props.dispatch({
           type: 'gidc/addIDC',
           payload: {
             description: fields,
           },
         });
     
         message.success('添加成功');
         this.setState({
           modalVisible: false,
         });
     
         this.props.dispatch({
             type: 'gidc/getIDCList',
             payload: '',
         });
         form.resetFields();
      };
    });
  
    
  }

  handleLineStatus = e => {
    //已上线
    if ( e.target.value == 1 ) {
      this.setState({
        showFormProline: false,
        valueProline: e.target.value
        })
    } else {
      this.setState({
        showFormProline: true,
        valueProline: e.target.value
      })
    } 
  }


  handleSelectLineValue = (value) => {
    this.setState({
      selectedLineValue: value,
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting,ipresource} = this.props;
    console.log('ADD.props',this.props)
    
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
            添加IP资源
        </Button>
        <Modal
          title="添加IP资源"
          visible={this.state.modalVisible}
          onOk={this.handleAddIDC}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="IP网段起始地址"
          >
            {getFieldDecorator('ipaddr_begin', {
              rules: [{
                required: true, message: '请输入IP起始地址',
              }],
            })(
              <Input placeholder="请输入IP起始地址" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="IP网段结束地址"
          >
            {getFieldDecorator('ipaddr_end', {
              rules: [{
                 message: '请输入IP段结束地址',
              }],
            })(
              <Input placeholder="不输入默认值等于IP段起始地址" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="掩码"
          >
            {getFieldDecorator('mask', {
              rules: [{
                required: true, message: '请输入网络地址掩码',
              }],
            })(
              <Input placeholder="请输入网络地址掩码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="网络类型"
          >
            {getFieldDecorator('typeid',{
              rules: [{
                required: true,
              }],
            }
            )(
              <Select
                showSearch
                placeholder="选择网络类型"
                style={{ width: 120 }}
                onChange = {this.handleSelectGroupValue} 
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                { ipresource.data.length > 0 && ipresource.data.map(post =>
                  <Option key={post.ID} value={post.ID} >{post.provider_name}</Option>
                )
              }

              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="用途"
          >
            {getFieldDecorator('purposeid',{
              rules: [{
                required: true,
              }],
            }
            )(
              <Select
                mode="multiple"
                placeholder="选择用途"
                style={{ width: 120 }}
                onChange = {this.handleSelectGroupValue} 
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                { ipresource.data.length > 0 && ipresource.data.map(post =>
                  <Option key={post.ID} value={post.ID} >{post.provider_name}</Option>
                )
              }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="检测ip段"
          >  
          <Button icon="check" onClick={() => this.handleCheckIp()}>
            检测IP段
          </Button>
             <span> {this.state.result} </span>
          </FormItem>
        </Modal>
    </div>
    );
  }
}
