import React, {PureComponent} from 'react';
import {connect} from 'dva';
import styles from './project.less';
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

export default class editVersionForm  extends PureComponent {

  state = {
    modalVisible: this.props.visible,
    enable: 1,
    auto:0,
    reset:0
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      enable: nextProps.formData ? nextProps.formData.enable: 1,
      modalVisible:nextProps.modalVisible
    })
  }



  handleAdd = () => {
    const form = this.props.form;
    if( ! this.props.formData || !this.props.formData.ID ){
      message.error("找不到发布项ID");
      return;
    }
    form.validateFields((err, values) => {
      console.log("values", values);
      if (err) return;
      values.ID = this.props.formData.ID;
      this.props.dispatch({
        type: 'gproline/addConfigVersion',
        payload: {
          fields: values,
          callback:()=>{
            this.props.onSubmit && this.props.onSubmit( groupfields );
            message.success('添加成功');
            this.setState({
              modalVisible: false,
            });

            form.resetFields();
          }
        },
      });

    });
    return;
    const groupfields = {
      'title': form.getFieldValue('title')? form.getFieldValue('title') :  '',
      'code': form.getFieldValue('code')? form.getFieldValue('code') :  ''
    }




  }


  handleSelectLineValue = (value) => {
    console.log(value)

    this.props.dispatch({
      type: 'gproline/getProjectGroupbyId',
      payload: value
    });

  }

  handleSelectGroupValue = (value) => {
    this.setState({
      selectedGroupValue: value,
    });
  }

  handleAutoChange = (value) => {
    this.setState({ auto : value})

  }
  handleEnableChange = (value)=>{
    this.setState({ enable: value });
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
    let formData = this.props.formData || {};
    let { enable } = this.state;
    return (
      <div>
        <Modal
          title="添加版本"
          visible={ this.props.modalVisible }
          onOk={this.handleAdd}
          width={600}
          onCancel={() => this.props.onCancel() }
        >

         {/* <FormItem visible={false}> {getFieldDecorator('ID',{initialValue:formData.ID })(<Input type="hidden" /> )}</FormItem>*/}
          <FormItem
            {...formItemLayout}
            label="版本号"
          >
            {getFieldDecorator('release', {
              initialValue: formData.release,
              rules: [{
                required: true, message: '请填写版本号',
              }],
            })(
              <Input placeholder="Git的HASH值或项目版本号" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="当前版本是否可用"
          >
            {getFieldDecorator('enable',{
              initialValue: formData.enable?1:0
            })(
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                checked = { formData.enable }
                onChange={(e) => this.handleEnableChange(e)} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="更新方式"
          >
            {getFieldDecorator('auto',{
              initialValue:formData.auto
            })(
              <RadioGroup compact >
                <Radio value={0}>手动</Radio>
                <Radio value={1}>自动</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="脚本类型" name="token_password" {...formItemLayout } >
            { getFieldDecorator('reset',{
              initialValue: formData.reset ? formData.reset:0
            })(
              <RadioGroup compact >
                <Radio value={0}>回滚</Radio>
                <Radio value={1}>发布</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="更新说明"
          >
            {getFieldDecorator('remark', {
              initialValue: formData.remark
            })(
              <TextArea style={{minHeight: 32}} placeholder="" rows={4}/>
            )
            }

          </FormItem>
        </Modal>
      </div>
    );
  }
}
