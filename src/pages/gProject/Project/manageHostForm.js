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
    formData: {}, //当前编辑数据
    currentEditId: 0, //无id，添加，否则修改
  };

  componentWillReceiveProps(nextProps) {
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
        mode: 1
      })
    } else {
      this.props.onCancel()
    }
  }

  handleSubmit = () => {
    // do nothing
  }

 
  /* 
  * @param record{Object} 版本记录数据
  */
  handlerDelete = ( record) =>{    
    let { tableData } = this.state;
    console.log("删除数据", record,"项目ID", tableData.ID );
    this.props.dispatch({
      type: 'gproline/deleteVersionById',
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
  }

  renderColumns(text, record, column) {
    return <div>{text}</div>
  }

  handleStatusChange=(e)=>{

  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {submitting, form, dispatch, progroupdata, gproline} = this.props;
    let {loading, tableData, formData} = this.state;
    let versions = tableData.hosts;
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
        title: '主机名',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => this.renderColumns(text, record, 'title'),
      },
      {
        title: '主机IP',
        dataIndex: 'task_type',
        width:"pro",
        key: 'task_type',
        render: (button, record) => {
          return this.renderColumns( text,record, "host" )
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
      /*
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
        
      },*/
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
            title= { formData.ID ? "修改主机":"添加主机" }
            visible={this.props.modalVisible}
            onOk={this.handleSubmit}
            width={600}
            onCancel={() => this.handleCancel()}
          >
            <div>nonthing</div>
          </Modal>
        </div>
      )
    }
    return (
      <div>
        <Modal
          title="主机列表"
          visible={this.props.modalVisible}
          onOk={this.handleSubmit}
          width={1000}
          onCancel={() => this.handleCancel()}
        >

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
