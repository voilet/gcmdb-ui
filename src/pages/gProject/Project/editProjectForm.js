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



// @connect(({groline, loading}) => ({
//   groline,
//   loading: loading.models.groline,
// }))
@connect((props) => (props))

@Form.create()

export default class editProjectForm  extends PureComponent {

  state = {
    modalVisible: this.props.visible,
    showFormProline: true,
    selectedGroupValue: 0,

    currentVersion:"",
    enable: true,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible:nextProps.modalVisible
    })
  }



  handleAdd = () => {
    const form = this.props.form;

    form.validateFields((er, values) => {
      console.log("values", values)
      if (err) return;
    });
    return;

    const groupfields = {
      'title': form.getFieldValue('title')? form.getFieldValue('title') :  '',
      'alias': form.getFieldValue('alias')? form.getFieldValue('alias') :  '',
      'order':form.getFieldValue('order')? form.getFieldValue('order') : "",
      'code_url':form.getFieldValue('code_url')? form.getFieldValue('code_url') : "",
      'remarks':form.getFieldValue('remarks')? form.getFieldValue('remarks') : "",
      'enable': this.state.enable,
      'group': this.state.selectedGroupValue
    }


    this.props.dispatch({
      type: 'gproline/addProject',
      payload: {
        description: groupfields,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });

    form.resetFields();
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

  handleStatusChange = (value) => {
    this.setState({ enable : value})

  }
  handleVersoinChange = ( e )=>{
    return;
    var arr = e || [];
    console.log("ar-----------",arr)
    var val = arr.pop();
    this.setState({
      currentVersion:val
    })


  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting,form,dispatch,progroupdata,gproline } = this.props;
    console.log("addproject",this.props.gproline)

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
    let selectorVersion = ()=>{
      console.log("Form versions", formData.versions )
      return (formData.versions||[]).map((item)=>{
        return (
          <Option value={ item.title }>{ item.title }</Option>
        )
      })
    }
    let version = "";
    if( this.state.currentVersion ){
      version = [this.state.currentVersion];
    }else{
      version = ["abc"];//为空竟然会报错
    }
    console.log("version..............",version)
    return (
      <div>
        <Modal
          title="添加项目"
          visible={ this.props.modalVisible }
          onOk={this.handleAdd}
          width={600}
          onCancel={() => this.props.onCancel() }
        >




          <FormItem
            {...formItemLayout}
            label="项目名称"
          >
            {getFieldDecorator('title', {
              initialValue:formData.pro,
              rules: [{
                required: true, message: '项目名称',
              }],
            })(
              <Input placeholder="项目名称"　disabled={true} />
            )}
          </FormItem>



          <FormItem
            {...formItemLayout}
            label="发布项名称"
          >
            {getFieldDecorator('alias', {
              initialValue: formData.title,
              rules: [{
                required: true, message: '请输入发布项标题',
              }],
            })(
              <Input placeholder="请输入发布项标题" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发布项版本"
          >
            {getFieldDecorator('version', {
              initialValue:version,
              rules: [{
                required: true, message: '请输入发布项版本',
              }],
            })(
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                onChange={ this.handleVersoinChange }
              >
                { selectorVersion() }
              </Select>
            )}
          </FormItem>
          <FormItem label="脚本类型" name="token_password" {...formItemLayout } >
            { getFieldDecorator('token_password',{
              initialValue: formData.remarks ? formData.remarks:"后台"
            })(
              <RadioGroup compact >
                <Radio value={ '后台'}>后端脚本</Radio>
                <Radio value={ '前台' }>前端脚本</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发布脚本"
          >
            {getFieldDecorator('release', {
              initialValue:formData.release,
              rules: [{
                required: true, message: '发布脚本',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="脚本参数">
            <Input placeholder="请输入发布脚本参数" value={ formData.release_args } />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="回退脚本"
          >
            {getFieldDecorator('rollback', {
              initialValue:formData.rollback,
              rules: [{
                required: true, message: '回退脚本',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="脚本参数">
            <Input placeholder="请输入回退脚本参数" value={ formData.rollback_args } />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否启用"
          >
            {getFieldDecorator('enable',{
              initialValue:formData.enable
            })(
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                onChange={(e) => this.handleStatusChange(e)} />
            )}
          </FormItem>
        </Modal>
      </div>
    );
  }
}
