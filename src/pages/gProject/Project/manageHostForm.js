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
  Popconfirm,
  Transfer,Row,Col
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

    hosts:{},//主机列表
    targetKeys:[],//右侧数据
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      tableData: nextProps.tableData ? nextProps.tableData : {},
    })
    if( nextProps.tableData ){
      this.updateHostData( nextProps.tableData );      
    }
    if (!nextProps.modalVisible) {
      this.setState({
        mode: 1
      })
    }
  }

  updateHostData = ( tableData )=>{
    //console.log("更新主机数据", tableData)
    if( tableData ){
      let allhosts = tableData.hosts;
      let hosts = [];
      let targetKeys = [];
      allhosts.carving_host && allhosts.carving_host.forEach( val =>{
        hosts.push( { ...val, key: val.ID  } )
      })
      allhosts.project_host && allhosts.project_host.forEach( val =>{
        hosts.push( { ...val, key: val.ID } )
        targetKeys.push( parseInt(val.ID) )
      })
      this.setState( { hosts, targetKeys } )
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
    let data = {};
    let hosts = this.state.hosts ||[];
    let targetKeys = this.state.targetKeys || [];
    let { tableData } = this.state;
    data.carving_host = [];
    data.project_host = [];


    for(var i=0;i<hosts.length;i++){
      if( targetKeys.indexOf( hosts[i].ID )!= -1){
        data.project_host.push( hosts[i] )
      }else{
        data.carving_host.push( hosts[i] )
      }
    }

    this.props.dispatch({
      type:'gproline/updateAllHostsByProId',
      payload:{
        ProId: tableData.ID, //所属于的项目id,必填
        data:data,
        callback:( data )=>{
          this.props.onUpdate && this.props.onUpdate( data );
        }
      }
    })

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
  

  handleChange = (targetKeys, direction, moveKeys) => {
    //console.log("change....",targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  }

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.eth1} - {item.fqdn}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {submitting, form, dispatch, gproline} = this.props;

    let {loading, tableData, formData} = this.state;
    
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
    var w = document.documentElement.clientWidth;
    if( w <= 1000 ){
      w = (w - 120 )/2
    }else{
      w = 450
    }
    return (
      <div>
        <Modal
          title="主机列表"
          visible={this.props.modalVisible}
          onOk={this.handleSubmit}
          width={1000}
          onCancel={() => this.handleCancel()}
          ref="a"
        >
          <Row gutter={24}>
            <Col xs={12}>发布项主机</Col>
            <Col xs={12}>项目主机</Col>
          </Row>
          <Transfer
            listStyle={{
              width: w,
              height: 300,
            }}
            dataSource={ this.state.hosts }
            targetKeys={ this.state.targetKeys }
            onChange={this.handleChange}
            render={this.renderItem}
          />
        </Modal>
      </div>
    );
  }
}
