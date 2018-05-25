import React, {PureComponent} from 'react';
import styles from './Adaptor.less'
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

export default class Addadaptor extends PureComponent {
  
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
          'title': form.getFieldValue('title') ? form.getFieldValue('title') :  '',
          'num': form.getFieldValue('num') ? form.getFieldValue('num') :  '',
          'category': form.getFieldValue('category') ? form.getFieldValue('category') : "",
          'description': form.getFieldValue('description') ? form.getFieldValue('description') : "",
          'componentname': 'adaptor',
        }

        this.props.dispatch({
          type: 'ghardware/addHardwareComponents',
          payload: {
            description: fields
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
             添加网卡
        </Button>
        <Modal
          title="添加网卡"
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
                  required: true, message: '请输入网卡名称',
                }],
              })(
                <Input placeholder="请输入网卡名称" />
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
                  required: true, message: '请输入网卡数量',
                }],
              })(
                <Input placeholder="请输入网卡数量" />
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
                  required: true, message: '请选择网卡类型',
                }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择网卡类型"
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
                <TextArea style={{ minHeight: 32 }} placeholder="网卡描述" rows={4} />
              )
            }
          </FormItem>

        </Modal>
    </div>
    );
  }
}
