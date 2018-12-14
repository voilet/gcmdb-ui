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
  Table,
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
    mode:1, //1显示,2:编辑
    loading:false,
    tableData:[],
    formData:{}, //当前编辑数据
    currentEditId:0, //无id，添加，否则修改
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible:nextProps.modalVisible,
      tableData: nextProps.tableData ? nextProps.tableData :{},
    })
    if( !nextProps.modalVisible ){
      this.setState({
        mode:1
      })
    }
  }

  handleCancel = () =>{
    if( this.state.mode == 2){
      this.setState({
        mode:1
      })
    }else{
      this.props.onCancel()
    }
  }

  handleSubmit = () => {
    const form = this.props.form;  
    const { dispatch } = this.props;
    let { tableData } = this.state;
    let versions = tableData.versions;
    if( this.state.mode == 1){
      //关闭
      this.setState({
        modalVisible:false
      })
    }else{
      form.validateFields((err, values) => {
        console.log("values", values)
        if (err) return;
        dispatch({
          type:'gproline/addConfigVersion',
          payload:{
            fields:values,
            ID:tableData.ID,
            callback:( data )=>{
              versions.push( data );
              this.setState({
                mode:1,
                tableData:tableData
              })
              this.forceUpdate();
            }
          }
        })
      });
      ;
    }
  }

  handlerModify = ( record )=>{
    console.log("修改数据:", record)
    this.setState({
      mode:2,
      formData: record
    })
  }

  renderColumns(text, record, column){
    return <div>{ text }</div>
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting,form,dispatch,progroupdata,gproline } = this.props;
    let { loading, tableData, formData } = this.state;
    let versions = tableData.versions;
    if( !formData || !formData.ID ){
      formData = {
        title:"",
        enable: 1,
        auto:0,
        reset:0,
        remarks:""
      }
    }
    const columnsConfig = [
    {
      title: '版本号',
      dataIndex: 'title',
      key:'title',
      render: (text, record) => this.renderColumns(text, record, 'title'),
    },
    {
      title: '是否可用',
      dataIndex: 'enable',
      key:'enable',
      render: (text, record) => {
        return record.enable ? "可用":"不可用"
      },
    },
    {
      title: '更新方式',
      dataIndex: 'pro',
      key:'task',
      width:'pro',
      render: (text, record) => this.renderColumns(text, record, 'pro')
    },
    {
      title: '脚本类型',
      dataIndex: 'versions',
      key:'versions',
      width:'pro',
      render: (text, record) => this.renderColumns(text, record, 'pro')
    },
    {
      title: '说明',
      dataIndex: 'remarks',
      key:'remarks',
      render: (text, record) => {
        return (
          <div>{text}</div>
        )
      },
    },
    ];
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
    //this.state.mode = 2;
    console.log("render..........", formData)
    if( this.state.mode != 1 ){      
      return (
        <div>
          <Modal
            title="添加版本"
            visible={ this.props.modalVisible }
            onOk={this.handleSubmit}
            width={600}
            onCancel={() => this.handleCancel() }
          >
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                initialValue: formData.release_version,
                rules: [{
                  required: true, message: '请填写标题',
                }],
              })(
                <Input placeholder="一句话标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="版本号"
            >
              {getFieldDecorator('release', {
                initialValue: formData.release_version,
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
                  unCheckedChildren="关闭"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="更新方式"
            >
              {getFieldDecorator('auto',{
                initialValue:formData.auto?1:0
              })(
                <RadioGroup compact >
                  <Radio value={0}>手动</Radio>
                  <Radio value={1}>自动</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="脚本类型" name="token_password" {...formItemLayout } >
              { getFieldDecorator('reset',{
                initialValue: formData.reset ? 0:1
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
              {getFieldDecorator('remarks', {
                initialValue: formData.remarks
              })(
                <TextArea style={{minHeight: 32}} placeholder="" rows={4}/>
              )
              }

            </FormItem>
           
          </Modal>
        </div>
      )
    }
    return (
      <div>
        <Modal
          title="修改版本"
          visible={ this.props.modalVisible }
          onOk={this.handleSubmit}
          width={800}
          onCancel={() => this.handleCancel() }
        >
          <Button onClick={()=>{
            this.handlerModify()
          }}>添加版本</Button>
         <Table
            loading={loading}
            rowKey={record => record.ID}
            dataSource={ versions }
            columns={columnsConfig}
            pagination={true}
          />
        </Modal>
      </div>
    );
  }
}
