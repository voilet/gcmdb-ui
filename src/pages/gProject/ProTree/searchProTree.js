import React, {PureComponent} from 'react';

import styles from './projectTree.less'

import { Form, Row, Col, Input, Button, Icon, Select, message } from 'antd';

const FormItem = Form.Item;
const { Option } = Select

@Form.create()

export default class SearchServermachines extends PureComponent {
  
  state = {
    idcData: []
  };

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.gidc.data)
    // if(nextProps.gidc.data){
    //   this.setState({
    //     idcData: nextProps.gidc.data
    //   })
    // }
  }

  searchClick = (e) =>{

    const form = this.props.form;
    e.preventDefault();

    form.validateFields((err, values) => {
        const fields = {
          'name1': form.getFieldValue('name1')? form.getFieldValue('name1') :  '',
          'name2': form.getFieldValue('name2')? form.getFieldValue('name2') :  '',
          'name3':form.getFieldValue('name3')? form.getFieldValue('name3') : "",
          'name4':form.getFieldValue('name4')? form.getFieldValue('name4') : "",
          'name5':form.getFieldValue('name5')? form.getFieldValue('name5') : "",
          'name6':form.getFieldValue('name6')? form.getFieldValue('name6') : "",
          'name7':form.getFieldValue('name7')? form.getFieldValue('name7') : "",
          'name8':form.getFieldValue('name8')? form.getFieldValue('name8') : "",
          'name9':form.getFieldValue('name9')? form.getFieldValue('name9') : "",
          }
          // this.props.dispatch({
          //   type: 'gidc/addIDC',
          //   payload: {
          //     description: fields,
          //   },
          // });
         // console.log(fields)
          message.success('查询成功');
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }
  
  render(){
    const { getFieldDecorator } = this.props.form;
    const { idcData } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div >
          <Row gutter={24}>
            <Col span={8}  style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label='ip'>
                {getFieldDecorator(`name1`)(
                  <Input placeholder="请输入ip" />
                )}
              </FormItem>
            </Col>
            <Col span={8}  style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label='项目名'>
                {getFieldDecorator(`name2`)(
                  <Input placeholder="请输入项目名" />
                )}
              </FormItem>
            </Col>
            <Col span={8}  style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label='使用状态'>
                {getFieldDecorator(`name3`)(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择使用状态"
                  >
                    <Option key='1' value='1'>开机</Option>
                    <Option key='0' value='0'>关机</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}  style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label='值班组'>
                {getFieldDecorator(`name4`)(
                  <Select
                  style={{ width: '100%' }}
                    placeholder="请选择值班组"
                  >
                    {
                      idcData.map((item)=>{
                        return (<Option key={item.ID} value={item.ID}>{item.idc_name}</Option>)
                      })
                    }
                    
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}  style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label='服务ID'>
                {getFieldDecorator(`name2`)(
                  <Input placeholder="请输入服务ID" />
                )}
              </FormItem>
            </Col>
            <Col span={8}  style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label='负责人员模糊查询'>
                {getFieldDecorator(`name2`)(
                  <Input placeholder="请输入负责人员" />
                )}
              </FormItem>
            </Col>
            <Col span={8}  style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label='域名'>
                {getFieldDecorator(`name7`)(
                  <Input placeholder="请输入域名" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" onClick={this.searchClick} >Search</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
            </Col>
          </Row>
      </div>
    );
  }
}