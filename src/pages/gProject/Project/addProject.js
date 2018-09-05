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

export default class AddProject   extends PureComponent {
  
  state = {
    modalVisible: this.props.visible,
    showFormProline: true,
    selectedGroupValue: 0,
    enable: true,
  };


 

  handleModalVisible = (flag) => {
    const form = this.props.form;
    form.resetFields();
    this.setState({
      modalVisible: !!flag,
    });

  }



  handleAdd = () => {
    const form = this.props.form;
    
    form.validateFields((err) => {
        if (err) return;
    });
    
  
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
    
    return (
      <div>
        <Button type="primary" icon="plus"  onClick={() => this.handleModalVisible(true)}>
             添加项目
        </Button>
        <Modal
          title="添加项目"
          visible={this.state.modalVisible}
          onOk={this.handleAdd}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >     


         <FormItem
            {...formItemLayout}
            label="所属产品线"
          >
            {getFieldDecorator('selectline')(
              <Select
                style={{ width: 120 }}
                showSearch
                placeholder="选择产品线"
                onChange = {this.handleSelectLineValue} 
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                { gproline.prolinedata.data.length > 0 && gproline.prolinedata.data.map(post => {
                  return <Option key={post.ID} value={post.ID} >{post.title}</Option>
                }
                )
              }

              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属项目组"
          >
            {getFieldDecorator('selectgroup')(
              <Select
                showSearch
                placeholder="选择项目组"
                style={{ width: 120 }}
                onSelect = {this.handleSelectGroupValue} 
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                { gproline.progroupbylid.length > 0 && gproline.progroupbylid.map(post =>
                  <Option key={post.ID} value={post.ID} >{post.title}</Option>
                )
              }

              </Select>
            )}
          </FormItem>
        
        
        <FormItem
            {...formItemLayout}
            label="项目名称"
            >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入项目名称',
              }],
            })(
              <Input placeholder="请输入项目名称" />
            )}
          </FormItem>
          

      
          <FormItem
            {...formItemLayout}
            label="项目别名"
          >
            {getFieldDecorator('alias', {
              rules: [{
                required: true, message: '请输入项目别名',
              }],
            })(
              <Input placeholder="请输入项目别名，使用saltstack时需使用，请使用英文" />
            )}
          </FormItem> 


        <FormItem
          {...formItemLayout}
          label="代码仓库"
        >
          {getFieldDecorator('code_url', {
            rules: [{

            }],
          })(
            <Input placeholder="请输入git或svn地址" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="业务相关描述"
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
            label="项目状态"
          >
            {getFieldDecorator('enable')(
              <Switch 
              checkedChildren="开启" 
              unCheckedChildren="关闭" 
              checked = {this.state.enable} 
              onChange={(e) => this.handleStatusChange(e)} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="排序"
          >
            {getFieldDecorator('order', {
              rules: [{

              }],
            })(
              <Input placeholder="-99排序为最高，生成tree时使用" />
            )}
          </FormItem>
        </Modal>
    </div>
    );
  }
}
