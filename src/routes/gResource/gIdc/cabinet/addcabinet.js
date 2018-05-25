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
    if (nextProps.cabinet.data) {
        this.setState({
          bay_heights: nextProps.cabinet.data.bay_heights == undefined ? [] : nextProps.cabinet.data.bay_heights,
          idc_info_lets: nextProps.cabinet.data.idc_info_lets == undefined ? [] : nextProps.cabinet.data.idc_info_lets
        })
    }
  }

  handleAddIDC = (e) => {

    const form = this.props.form;
    const { enable } = this.state
    e.preventDefault();
      form.validateFields((err, values) => {
      
      if (!err) {
        if(uuid>0){
        const names = form.getFieldValue('names') ? form.getFieldValue('names') : ""
        const selectprovider = form.getFieldValue('selectprovider') ? form.getFieldValue('selectprovider') : ""
        let data = selectprovider.map((item,index)=>{
          return {
            bay_name:`bay${index+1}`,
            height_id:item
          }
        })
        const fields = {
          'cabinet_name': form.getFieldValue('cabinet_name')? form.getFieldValue('cabinet_name') :  '',
          'power': form.getFieldValue('power')? form.getFieldValue('power') :  '',
          'idcid':form.getFieldValue('idcid')? form.getFieldValue('idcid') : "",
          'cableport':form.getFieldValue('cableport')? form.getFieldValue('cableport') : "",
          'capacity':form.getFieldValue('capacity')? form.getFieldValue('capacity') : "",
          'status':enable,
          'bay_details':JSON.stringify({data})
         }
     
        this.props.dispatch({
          type: 'gidc/addCabinet',
          payload: {
            description: fields,
          },
        });

        message.success('添加成功');

        this.setState({
          modalVisible: false,
        });
    
        uuid=0;

        form.resetFields();

        }else{
          message.error('请至少添加一个bays信息');
        }
      };
    });
  
    
  }



  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    uuid--;
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  emptyClick = (k) =>{
    const { form } = this.props;
    const selectprovider = form.getFieldValue('selectprovider');
    form.setFieldsValue({
      selectprovider: selectprovider.map((item,key)=>{
        if(key==k){
          return '';
        }
        return item;
      })
    });

  }
  handleStatusChange(val){
    this.setState({
      enable:val
    })
  }

  render() {
    const { submitting,form,dispatch} = this.props;
    const {enable} = this.state
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
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
          required={false}
          key={k}
       >
        <Row type="flex" justify="start" >
        
          <Col>
            <FormItem >
              {
                getFieldDecorator(`names[${k}]`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue:`bay${k+1}`,
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: "Please input passenger's name or delete this field.",
                  }],
                })(
                  <Input placeholder="请输入bay名" disabled style={{ width: '70%', marginRight: 8 }} />
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem >
              {
                getFieldDecorator(`selectprovider[${k}]`,{
                  rules: [{
                    required: true,
                  }],
                })(
                  <Select
                    placeholder="选择高度"
                    style={{ width: 120 }}
                  >
                  {
                    this.state.bay_heights.map((obj)=>{
                      return (<Option key={obj.ID} value={obj.ID}>{obj.height}</Option>)
                    })
                  }
                  </Select>
                )
              }
            </FormItem>      
          </Col>
          <Col offset={2}>
            {
              keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              ) : null
            }
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
                {
                  getFieldDecorator(`cabinet_name`, {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="请输入机柜名称" />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12} key ={2} style={{ display: 'block' }}>
              <FormItem label="机柜电量">
                {
                  getFieldDecorator(`power`, {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="请输入机柜电量" />
                  )
                }
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>    
            <Col span={12} key ={1} style={{ display: 'block' }}>
              <FormItem label="所属机房">
              {getFieldDecorator('idcid',{
                  rules: [{
                    required: true
                  }],
                }
                )(<Select 
                    style={{ width: 264 }} 
                    placeholder="请选择所属机房"
                  >
                    {
                      this.state.idc_info_lets.map((obj,ind)=>{
                        return (<Option key={ind} value={obj.idc_id}>{obj.idc_name}</Option>)
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12} key ={2} style={{ display: 'block' }}>
              <FormItem label="网口数">
                {
                  getFieldDecorator(`cableport`, {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="请输入网口数" />
                  )
                }
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>    
            <Col span={12} key ={1} style={{ display: 'block' }}>
              <FormItem label="机柜容量">
                {
                  getFieldDecorator(`capacity`, {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="请输入机柜容量" />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12} key ={2} style={{ display: 'block' }}>
              <FormItem label="机柜状态">
                <Switch 
                  checkedChildren="通电" 
                  unCheckedChildren="未通电" 
                  checked={enable} 
                  onChange={(value) => this.handleStatusChange(value)} 
                  disabled={this.state.disabled} 
                />
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
        </Modal>
    </div>
    );
  }
}
