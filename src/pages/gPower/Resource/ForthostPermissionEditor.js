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
  Switch
} from 'antd';


const FormItem = Form.Item;
const {Option} = Select;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const { TextArea } = Input;
const RadioGroup = Radio.Group;


@connect((props) => (props))
@Form.create()

export default class ForthostPermissionEditor  extends PureComponent {

  state = {
    modalVisible: this.props.visible,
    enable: undefined,
    auto:0,
    reset:0
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      formData: nextProps.formData,
      modalVisible:nextProps.modalVisible
    })
    if( nextProps.formData ){
      this.state.enable = nextProps.formData.enable
    }
  }

  handleStatusChange = (e)=>{
    this.setState({
      enable:!this.state.enable
    })
  }

  handleAdd = () => {
    const form = this.props.form;
    let id = this.props.formData ? this.props.formData.ID : ""
    form.validateFields((err, values) => {
      console.log("values", values, err);
      values.enable = values.enable ? 1: 0;
      if (err) return;
      this.props.dispatch({
        type: 'gforthost/editForthostPermssionGroup',
        payload: {
          ID:id,
          fields: values,
          callback:( data )=>{
            message.success( id ? "修改成功":"成功添加");
            this.props.onSubmit && this.props.onSubmit( data );
            form.resetFields();
          }
        },
      });
    });

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting,form,dispatch,progroupdata,gproline } = this.props;
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
    let formData = this.state.formData || {};
    let enable = ( typeof this.state.enable == "undefined") ? formData.enable: this.state.enable;
    let isEditMode = formData && formData.ID;
    console.log("enabled", enable, this.state.enable)
    return (
      <div>
        <Modal
            title= "编辑权限组"
            visible={this.state.modalVisible}
            onOk={()=> this.handleAdd() }
            width={600}                
            onCancel={() => ( this.props.onCancel && this.props.onCancel()) }
        >
        <FormItem
            {...formItemLayout}
            label="权限组名"
          >
            {getFieldDecorator('title', {
              initialValue: formData.title,
              rules: [{
                required: true, message: '权限组名',
              }],
            })(
              <Input placeholder="权限组名" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注名"
          >
            {getFieldDecorator('remarks', {
              initialValue: formData.remarks,
              rules: [{
                required: true, message: '权限组备注名',
              }],
            })(
              <Input placeholder="权限组备注名" />
            )}
          </FormItem>
          { 
          !isEditMode?(
          <FormItem
            {...formItemLayout}
            label="用户私钥"
          >
            {getFieldDecorator('rsa', {
              initialValue:formData.rsa||"",
              rules: [{
                required: isEditMode? false:true, message: '用户私钥必填',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="用户私钥" rows={4} />
            )}
          </FormItem>
          ):(<div></div>)
          }
          <FormItem
            {...formItemLayout}
            label="是否可用"
          >
            {getFieldDecorator('enable',{
              initialValue: formData.enable?1:0
            })(
              <Switch
                checkedChildren="可用"
                unCheckedChildren="不可用"
                checked={enable}
                onChange={(e) => this.handleStatusChange(e)} />
            )}
          </FormItem>
          </Modal>
      </div>
    );
  }
}
