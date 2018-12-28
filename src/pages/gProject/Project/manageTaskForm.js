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
  Switch,
  InputNumber,
  Popconfirm
} from 'antd';


const FormItem = Form.Item;
const {Option} = Select;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const {TextArea} = Input;
const RadioGroup = Radio.Group;


@connect((props) => (props))
@Form.create()

export default class manageTaskForm extends PureComponent {

  state = {
    modalVisible: this.props.visible,
    mode: 1, //1显示,2:编辑
    loading: false,
    tableData: [],
    formData: null, //当前编辑数据
    currentEditId: 0, //无id，添加，否则修改
    enable:0,
  };

  componentWillReceiveProps(nextProps) {
    if( !this.state.formData && nextProps.formData  ){
      this.setState({
        formData:{ ...nextProps.formData },
        enable:nextProps.formData.enable

      })
    }else{
      console.log("formData???",  this.state.formData)
    }
    this.setState({
      modalVisible: nextProps.modalVisible,
      tableData: nextProps.tableData ? nextProps.tableData : {},
    })
    if (!nextProps.modalVisible) {
      this.setState({
        mode: 1
      })
    }
  }

  handleCancel = () => {
    if (this.state.mode == 2) {
      this.setState({
        mode: 1,
        formData:null
      })
    } else {
      this.props.onCancel()
    }
  }

  handleSubmit = () => {
    const form = this.props.form;
    const {dispatch} = this.props;
    let {tableData} = this.state;
    let versions = tableData.tasks;
    if (this.state.mode == 1) {
      //关闭
      this.setState({
        modalVisible: false
      })
      this.props.onCancel()

    } else {
      form.validateFields((err, values) => {
        console.log("values", values)
        if (err) return;
        values.enable = values.enable ? 1:0;
        if( this.state.currentEditId ){
          //修改操作
          values.ID = this.state.currentEditId
          dispatch({
            type: 'gproline/modifyProjectTask',
            payload: {
              fields: values,
              ProId: tableData.ID,
              ID: values.ID,
              callback: (data) => {
                this.setState({
                  mode: 1
                })
                
              }
            }
          })
        }else{
          dispatch({
            type: 'gproline/addProjectTask',
            payload: {
              fields: values,
              ProId: tableData.ID,
              callback: (data) => {
                this.setState({
                  mode: 1
                })
                
              }
            }
          })
        }
        
      });
      ;
    }
  }

 
  /* 
  * @param record{Object} 版本记录数据
  */
  handlerDelete = ( record) =>{    
    let { tableData } = this.state;
    console.log("删除数据", record,"项目ID", tableData.ID );
    this.props.dispatch({
      type: 'gproline/deleteProjectTask',
      payload: {
        ProId: tableData.ID, //所属于的项目id,必填
        ID: record.ID,
        callback: (data) => {
          this.props.onUpdate && this.props.onUpdate( tableData )
        }
      }
    })
  }
  handlerModify = ( record ) =>{
    console.log("修改数据:", record)    
    this.setState({
      currentEditId: record ? record.ID : undefined,
      mode: 2,
      enable: record.enable,
      formData: {...record}
    })
  }

  renderColumns(text, record, column) {
    return <div>{text}</div>
  }

  handleStatusChange=(e)=>{
    this.setState({
      enable:!this.state.enable
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {submitting, form, dispatch, progroupdata, gproline} = this.props;
    let {loading, tableData, formData} = this.state;
    let versions = tableData.tasks;
    if (!formData || !formData.ID) {
      formData = {
        title: "",
        enable: 1,
        auto: 0,
        reset: 0,
        remarks: ""
      }
    }
    const columnsConfig = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => this.renderColumns(text, record, 'title'),
      },
      {
        title: '发布/回退',
        dataIndex: 'task_type',
        key: 'task_type',
        render: (button, record) => {
          return record.task_type ? <Icon type="like" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="dislike" theme="twoTone" twoToneColor="#eb2f96" />
        },
      },
      {
        title: '状态',
        dataIndex: 'enable',
        key: 'enable',
        render: (button, record) => {
          return record.enable ? <Icon type="check" /> : <Icon type="stop" />
        },
      },

      {
        title: '说明',
        dataIndex: 'remarks',
        key: 'remarks',
        render: (text, record) => {
          return (
            <div>{text}</div>
          )
        },
      },
      {
        title: '操作',
        dataIndex: 'utils',
        key: 'utils',
        render: (text, record ) => {
          return  (
            <div>
              <Popconfirm title="您真的要删除这条记录吗?" 
                onConfirm={ ()=>{ this.handlerDelete( record ) } } 
                onCancel={(e)=>{}} okText="是" cancelText="否">
                <Icon type="delete" theme="twoTone" twoToneColor="#f35553"/>
              </Popconfirm>
              
              <Icon style={{marginLeft:10}} type="edit" theme="twoTone" onClick={()=>{ this.handlerModify( record ) }} twoToneColor="#f35553"/>
            </div>
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
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    if (this.state.mode != 1) {
      return (
        <div>
          <Modal
            title= { formData.ID ? "修改任务":"添加任务" }
            visible={this.props.modalVisible}
            onOk={this.handleSubmit}
            width={600}
            onCancel={() => this.handleCancel()}
          >
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                initialValue: formData.title,
                rules: [{
                  required: true, message: '请填写任务标题',
                }],
              })(
                <Input placeholder="任务标题"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="发布脚本"
            >
              {getFieldDecorator('release_shell', {
                initialValue:formData.release_shell||"",
                rules: [{
                  required: false, message: '发布脚本',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="回退脚本"
            >
              {getFieldDecorator('reset_shell', {
                initialValue:formData.reset_shell||"",
                rules: [{
                  required: false, message: '发布脚本',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="脚本超时时间">
              {getFieldDecorator('timeout', {
                initialValue:formData.bash_timeout||10,
                rules: [{
                  required: false, message: '发布脚本',
                }],
              })(
                <div><InputNumber min={1} max={600} defaultValue={formData.bash_timeout||10} />（单位: 秒）</div>
              )}              
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="任务主机"
            >
              {getFieldDecorator('task_host', {
                initialValue:formData.task_host||"",
                rules: [{
                  required: false, message: '任务主机',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="多条主机以换行输入" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否启用"
            >
              {getFieldDecorator('enable',{
                initialValue:formData.enable?1:0
              })(
                <Switch
                  checkedChildren="开启"
                  unCheckedChildren="关闭"
                  checked={ this.state.enable }
                  onChange={(e) => this.handleStatusChange(e)} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="任务类型"
            >
              {getFieldDecorator('task_type', {
                initialValue: formData.task_type ? 1 : 0
              })(
                <RadioGroup compact>
                  <Radio value={0}>发布</Radio>
                  <Radio value={1}>回执</Radio>
                </RadioGroup>
              )}
            </FormItem>
            
            <FormItem
              {...formItemLayout}
              label="任务说明"
            >
              {getFieldDecorator('remarks', {
                initialValue: formData.remarks
              })(
                <TextArea style={{minHeight: 32}} placeholder="" rows={4}/>
              )
              }

            </FormItem>
            <FormItem {...formItemLayout} label="脚本排序值">
              {getFieldDecorator('order', {
                initialValue:formData.order||100,
                rules: [{
                  required: true, message: '脚本排序值',
                }],
              })(
                <InputNumber min={1} max={6000} />
              )}              
            </FormItem>
          </Modal>
        </div>
      )
    }
    return (
      <div>
        <Modal
          title="管理项目的任务"
          visible={this.props.modalVisible}
          onOk={this.handleSubmit}
          width={1000}
          onCancel={() => this.handleCancel()}
        >
          <Button onClick={() => {
            this.handlerModify()
          }}>添加任务</Button>
          <Table
            loading={loading}
            rowKey={record => record.ID}
            dataSource={versions}
            columns={columnsConfig}
            pagination={true}
          />
        </Modal>
      </div>
    );
  }
}
