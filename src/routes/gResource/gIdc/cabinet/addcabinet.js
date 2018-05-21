import React, {PureComponent} from 'react';
import styles from './cabinet.less'

import {connect} from 'dva';
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Modal,
    message,
    Row,
    Col,
    Select,
    Switch,
    Divider
  } from 'antd';


  const Option = Select.Option
const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const { TextArea } = Input;

let uuid = 0;

@Form.create()


export default class Addcabinet extends PureComponent {
  
  state = {
    modalVisible: false,
    enable: true,
    bay_heights:[],
    idc_info_lets:[]
  };


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.cabinet.data) {
        this.setState({
          bay_heights:nextProps.cabinet.data.bay_heights == undefined ? [] : nextProps.cabinet.data.bay_heights,
          idc_info_lets:nextProps.cabinet.data.idc_info_lets == undefined ? [] : nextProps.cabinet.data.idc_info_lets
        })
    }
  }

  handleAddIDC = (e) => {

    const form = this.props.form;
    console.log(form)
    // form.validateFields((err) => {
    //     if (err) return;
    //     console.log("err-------------------------------",err)
    // });
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

  getFields() {
    const count = this.state.expand ? 10 : 8;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={12} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  emptyClick = (k) =>{
    const { form } = this.props;
    const names = form.getFieldValue('names');
    const selectprovider = form.getFieldValue('selectprovider');
    // let selectproviderNewObj = {}
    // for(const key in selectprovider){
    //   if( key == "" )
    //   if( key == k ){
    //     selectproviderNewObj[key] = ''
    //   }else{
    //     selectproviderNewObj[key] = selectprovider[key]
    //   }
    // }
    form.setFieldsValue({
      names: names.map((key,ind)=>{
        if(ind==k){
          return '';
        }else{
          return key;
        }     
      })
    });
    console.log(form.getFieldValue('names'))
    console.log(form.getFieldValue('selectprovider'))

  }

  render() {
    const { submitting,form,dispatch} = this.props;
    const {enable} = this.state
    const { getFieldDecorator, getFieldValue } = this.props.form;
    console.log('dispatch',this.props)
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 0 },
      },
    };
    
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        // label={index === 0 ? 'Passengers' : ''}
        required={false}
        key={k}
       >
        <Col>
        one 
        </Col>
        <Row type="flex" justify="start" >
          <Col>
          {getFieldDecorator(`names[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              }],
            })(
              <Input placeholder="passenger name" style={{ width: '70%', marginRight: 8 }} />
            )}
        
          </Col>
          <Col>
          {getFieldDecorator(`selectprovider[${k}]`,{
                  rules: [{
                    required: true,
                  }],
                }
                )(
                  <Select
                  // mode="multiple"
                    placeholder="选择运营商"
                    style={{ width: 120 }}
                    //onChange = {this.handleSelectGroupValue} 
                    //optionFilterProp="children"
                  // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  {
                    this.state.bay_heights.map((obj)=>{
                      return (<Option key={obj.ID} value={obj.height}>{obj.height}</Option>)
                    })
                  }
                    
                  </Select>

                )}

          </Col>
          <Col offset={2}>
            {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              ) : null}
          </Col>
          <Col offset={2}>
            <Button size="small" type="default" onClick={()=>{this.emptyClick(k)}}>
                empty
            </Button>
          </Col>
        </Row>
      </FormItem>
      )
       
     
     

         
        
       
    
        
    });



    return (
      <div className={styles.tableListOperator} style={{float: 'left'}}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
             添加机柜
        </Button>
        <Modal
          maskClosable = {false}
          wrapClassName = {styles.web}
          width= "800"
          visible={this.state.modalVisible}
          onOk={this.handleAddIDC}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
        <Row>
            <Divider> 机 柜 </Divider>
        </Row>
        <Row gutter={24}>    
          <Col span={12} key ={1} style={{ display: 'block' }}>
          <FormItem label= "机柜名称">
            {getFieldDecorator(`field-${0}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
        <Col span={12} key ={2} style={{ display: 'block' }}>
          <FormItem label="机柜容量">
            {getFieldDecorator(`field-${1}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
        </Row>

        <Row gutter={24}>    
          <Col span={12} key ={1} style={{ display: 'block' }}>
          <FormItem label="所属机房">
          {getFieldDecorator('selectprovider',{
              rules: [{
                required: true
              }],
            }
            )(<Select 
                style={{ width: 264 }} //onChange={handleChange}
                placeholder="所属机房"
                >
                {
                  this.state.idc_info_lets.map((obj,ind)=>{
                    return (<Option key={obj.idc_id} value={obj.idc_name}>{obj.idc_id}</Option>)
                  })
                }
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={12} key ={2} style={{ display: 'block' }}>
        <FormItem label="网口数">
            {getFieldDecorator(`field-${1}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
        </Row>

      <Row gutter={24}>    
          <Col span={12} key ={1} style={{ display: 'block' }}>
          <FormItem label="机柜容量">
            {getFieldDecorator(`field-${0}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
        <Col span={12} key ={2} style={{ display: 'block' }}>
          <FormItem label="机柜状态">
          <Switch 
                    checkedChildren="通电" 
                    unCheckedChildren="未通电" 
                    checked={enable} 
                    onChange={(e) => this.handleStatusChange(record.ID,e)} 
                    disabled={this.state.disabled} />
          </FormItem>
        </Col>
        </Row>

     <Row gutter={24}>    
          <Col span={12} key ={1} style={{ display: 'block' }}>
          <FormItem label="空闲机架">
            ddddddd xxxx
          </FormItem>
        </Col>
        <Col span={12} key ={2} style={{ display: 'block' }}>
          <FormItem label="空闲网口">
              sxxxxx
          </FormItem>
        </Col>
        </Row>

        <Row>
            <Divider>bays</Divider>
        </Row>

        <Row gutter={24}>     
          <Form >
            {formItems}
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> 添加机架
              </Button>
            </FormItem>
          </Form>
        </Row>
          {/* <FormItem
            {...formItemLayout}
            label="名称"
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
            label="描述"
          >
            {getFieldDecorator('remarks', {
              rules: [{
                required: true, message: '描述',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="机房描述" rows={4} />
            )}
          </FormItem> */}
        </Modal>
    </div>
    );
  }
}
