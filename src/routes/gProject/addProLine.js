import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Modal,
    message,
    Radio,
  } from 'antd';


const FormItem = Form.Item;
const {Option} = Select;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const { TextArea } = Input;
const RadioGroup = Radio.Group;


@Form.create()

export default class AddProline extends PureComponent {
  
  state = {
    modalVisible: this.props.visible,
    selectedLineValue: "选择产品线",
  };


  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'gproline/getProjectLine',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }



  handleAddLine = () => {
    const form = this.props.form;

    form.validateFields((err, fieldsValue) => {
        if (err) return;
    });

    const fields = {
     'title': form.getFieldValue('title')? form.getFieldValue('title') :  '',
     'alias': form.getFieldValue('alias')? form.getFieldValue('alias') :  '',
     'order':form.getFieldValue('order')? form.getFieldValue('order') : "",
     'remark':form.getFieldValue('remark')? form.getFieldValue('remark') : "",
    }

    this.props.dispatch({
      type: 'gproline/addProjectLine',
      payload: {
        description: fields,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
    this.props.dispatch({
        type: 'gproline/getProjectLine',
        payload: '',
    });
    form.resetFields();
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
    const { submitting,form,dispatch} = this.props;

    
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
      <div style={{float: 'left'}}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
             添加产品线
        </Button>
        <Modal
          title="添加产品线"
          visible={this.state.modalVisible}
          onOk={this.handleAddLine}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >


         
           <FormItem
            {...formItemLayout}
            label="产品线名称"
            >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入产品线名称',
              }],
            })(
              <Input placeholder="请输入产品线名称" />
            )}
          </FormItem>
          

      
          <FormItem
            {...formItemLayout}
            label="产品别名"
          >
            {getFieldDecorator('alias', {
              rules: [{
              }],
            })(
              <Input placeholder="请输入项目别名，使用saltstack时需使用，请使用英文" />
            )}
          </FormItem> 
        

        <FormItem
            {...formItemLayout}
            label="产品线业务描述"
          >
            {getFieldDecorator('remarks', {
              rules: [{
                required: true, message: '请简要描述业务',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
            )}
        </FormItem>
        
        <FormItem
            {...formItemLayout}
            label="优先级"
          >
            {getFieldDecorator('order', {
              rules: [{

              }],
            })(
              <Input placeholder="-99优先级为最高，生成tree时使用" />
            )}
          </FormItem>
        </Modal>
    </div>
    );
  }
}
