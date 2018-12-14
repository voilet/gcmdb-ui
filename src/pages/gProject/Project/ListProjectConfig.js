import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Modal,
  message,
  Table,
  Divider
} from 'antd';
import ProjectTable from '@/components/ProjectTable';
import EditProjectForm from './editProjectForm';
import EditVersionForm from './editVersionForm';
import styles from './project.less';


const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { TextArea } = Input;




@connect((state, ownProps) => {
  return state;
})


@Form.create()

export default class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},

    isEditing:false, //是否编辑中
    isVersingAdding:false, //是否添加版本中

    gprolineId:0,
    gprogroupId:0,
    gproId:0,

    isLoadingVersions:false,
    configVersions:{},
    proconfigbypid:{  //列表数据
      data:[]
    }
  };



  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gproline/getProjectLine',
    });
  }


  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'gproline/getProjectList',
      payload: params,
    });
  }

  handleRefreshTableChange = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'gproline/getProjectLine',
      payload: '',
    });
  }



  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'gproline/getProjectList',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;
    console.log(selectedRows)
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'gproline/getProjectLine',
          payload: {
            ID: selectedRows.map(row => row.ID).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      case  'approval':
        dispatch({
          type: 'gproline/getProjectLine',
          payload: {
            ID: selectedRows.map(row => row.ID).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
      case  'stop':
        dispatch({
          type: 'gproline/getProjectLine',
          payload: {
            ID: selectedRows.map(row => row.ID).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  //保存
  handleSaveData = (val) => {
    console.log("val",val)
    const { ID, group_id, pro_title, line_id, pro_alias, pro_code_url, pro_enable, pro_remarks} = val

    if (group_id != "-1") {
      const params = {
        ID,
        title:pro_title,
        alias:pro_alias,
        remarks:pro_remarks,
        code_url:pro_code_url,
        enable:pro_enable,
        groupid:group_id,
        lineid:line_id,
      }

      this.props.dispatch({
        type: 'gproline/modifyProject',
        payload: params
      });
    } else {
      this.props.dispatch({
        type: 'gproline/getProjectList',
      });
    }

  }

  handleDeleteData = (val) => {
    console.log(val)
    const { ID } = val
    //false是逻辑删除  true是物理删除
    // infolist:{"componentname": "cpu", "ids": [1, 2]}
    let obj = {},ids=[]
    ids.push(ID)
    obj.ids=ids
    this.props.dispatch({
      type: 'gproline/deleteProject',
      payload: {
        tag:false,
        infolist:JSON.stringify(obj)
      }
    });
  }

  handleEditConfig = ( id, record )=>{
    console.log("edit", id, record );
    let editInfo = {};

    let { gprogroupInfo, gproInfo} = this.getCurrentProInfo();
    if( !gproInfo ) gproInfo = {};
    if( !record ){
      //new
      editInfo.title = "";
      editInfo.projectTitle = gproInfo.title;
    }else{

    }
    console.log("编辑信息:", record)
    this.setState({
      isEditing:true,
      editInfo:record
    });
  };
  handleEditVersion = ( id, record )=>{
    let editInfo = record;
    console.log("编辑配置信息:", record)
    this.setState({
      isVersingAdding:true,
      editVersionInfo:editInfo,
    })
  }
  handleCancelEdit = ( id, record )=>{
    console.log("cacnel...")
    this.setState({
      isEditing:false
    })
  };
  handleCancelVersionEdit = ()=>{
    this.setState({
      isVersingAdding:false
    })
  };
  handlerSelect = ( type, val, e ) =>{
    const { dispatch } = this.props;
    let state = { ...this.state };
    console.log("val",val)
    if( !val ) return;
    switch( type ){
      case "gproline":
        //通过产品线查项目组
        this.setState({ gprolineId: val });
        dispatch({
          type:'gproline/getProjectGroupbyId',
          payload:val
        });
        break;
      case "gprogroup":
        //通过产品线查项目
        this.setState({ gprogroupId: val });
        dispatch({
          type:'gproline/getProjectbyId',
          payload:val
        });
        break;
      case "gpro":
        //通过产品线查项目
        this.forceRefreshConfigVersions();
        this.setState({ gproId: val });
        dispatch({
          type:'gproline/getConfigListById',
          payload:{
            ID:val
          }
        });
        break;
    }
  };
  handleAddVersion = ()=>{

  }
  /*当项目发成变化时，强制列新版本列表*/
  forceRefreshConfigVersions(){
    this.state.isLoadingVersions = false;
  }
  getCurrentProInfo(){
    const { gproline } = this.props;
    let gprogroupInfo = gproline.progroupbylid.find(( item, idx )=>{
      return item.ID == this.state.gprolineId;
    });
    let gproInfo = gproline.probygid.find(( item, idx )=>{
      return item.ID == this.state.gproId;
    });
    return { gprogroupInfo,gproInfo };
  }
  renderColumns(text, record, column){
    return (
      <div>{text}</div>
    );
  }
  renderOptions( text, record, colume ){
    return (
      <div>
        <Button onClick={(e)=>{ this.handleEditConfig( record.ID, record )}} style={{marginRight:10}}>修改</Button>
        <Button onClick={()=>{
        this.handleEditVersion( record.ID, record );
      }}>添加版本</Button>
      </div>
    )
  }


  render() {

    const {selectedRows, modalVisible, addInputValue} = this.state;
    const { getFieldDecorator } = this.props.form;
    //const { submitting } = this.props;
    const { children } = this.props;
    const { gproline ,submitting,dispatch } = this.props;
    let loading = false;
    let proconfigbypid = gproline.proconfigbypid || [];
    let { gprogroupInfo, gproInfo} = this.getCurrentProInfo();
    for( let i=0;i< proconfigbypid.length;i++){
      proconfigbypid[i].pro = gproInfo ? gproInfo.title :'';
      proconfigbypid[i].progroup = gprogroupInfo.title;
      proconfigbypid[i].versions = this.state.configVersions[ proconfigbypid[i].ID ] || [];
    }
    console.log('Parent,props', this.props )
    if( ! this.state.isLoadingVersions ){
      let configLen = proconfigbypid.length;
      for(let i=0;i<configLen;i++){
        console.log("......loadversions");
        dispatch({
          type:'gproline/getVersionsById',
          payload:{
            ID:proconfigbypid[i].ID,
            callback:(data)=>{
              let state = { ...this.state };
              state.configVersions[ proconfigbypid[i].ID ] = data;
              console.log("version:", data, proconfigbypid[i].ID)
              this.setState( state );
            }
          }
        });
      }
      if( configLen ){
        this.state.isLoadingVersions = true;
      }
    }
    const getFilters = ( type ) =>{
      let arr =[];
      try{
        switch( type ){
          case "gproline":
            arr = this.props.gproline.prolinedata.data;
            break;
          case "gprogroup":
            arr = this.props.gproline.progroupbylid;
            break;
          case "gpro":
            arr = this.props.gproline.probygid;
            break;
        }
      }catch(e){}

      let items = [];
      if( !arr ){
        console.log('arr', arr)
        return;
      }
      for (var i = 0; i < arr.length ; i++) {
        items.push(<Select.Option value={arr[i].ID} title={arr[i].title}>{arr[i].title}</Select.Option>);
      }
      return items;
    };
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
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量启用</Menu.Item>
        <Menu.Item key="stop">批量暂停</Menu.Item>
      </Menu>
    );
    const columnsConfig = [
      {
        title: '配置名称',
        dataIndex: 'title',
        key:'title',
        width:'120px',
        render: (text, record) => this.renderColumns(text, record, 'title'),
      },
      {
        title: '所属项目组',
        dataIndex: 'progroup',
        key:'progroup',
        width:'120px',
        render: (text, record) => this.renderColumns(text, record, 'progroup'),
      },
      {
        title: '所属项目',
        dataIndex: 'pro',
        key:'task',
        width:'pro',
        render: (text, record) => this.renderColumns(text, record, 'pro')
      },
      {
        title: '版本列表',
        dataIndex: 'versions',
        key:'versions',
        width:'120px',
        render: (text, record) => {
          let versions = text || [];
          if( !versions.length ){
            return (
              <div>暂无版本</div>
            )
          }
          return (
            <Select onSelect={()=>{}} defaultValue={1}>
              {
                versions.map(function(item,index){
                  return (<Select.Option value={ item.ID }>{ item.title }</Select.Option>)
                })
              }
            </Select>
          )
          return (
            <div>
              {
                versions.map(function(item,index){
                  return (<div>index</div>)
                })
              }
            </div>
          )
        }

      },
      {
        title: '操作',
        dataIndex: 'status',
        key:'status',
        width:'200px',
        render: (text, record) => this.renderOptions(text, record, 'status'),
      }];
    return (
      <div>
      <EditProjectForm a="1" modalVisible={ this.state.isEditing } formData={ this.state.editInfo } onCancel={ this.handleCancelEdit }></EditProjectForm>
        <EditVersionForm modalVisible={ this.state.isVersingAdding } formData={ this.state.editVersionInfo } onCancel={ this.handleCancelVersionEdit }></EditVersionForm>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListOperator}>
            <Row gutter={16} className={styles.filterList}>
              <Col>
                <Select defaultValue="" onSelect={( val )=>{ this.handlerSelect("gproline", val)}}>
                  <Select.Option value="">所有产品线</Select.Option>
                  { getFilters( 'gproline' ) }
                </Select>
                <Select defaultValue="" onSelect={( val )=>{ this.handlerSelect("gprogroup", val)}}>
                  <Select.Option value="">所有项目组</Select.Option>
                  { getFilters( 'gprogroup' ) }
                </Select>
                <Select defaultValue="" onSelect={( val )=>{ this.handlerSelect("gpro", val)}}>
                  <Select.Option value="">所有项目</Select.Option>
                  { getFilters( 'gpro' ) }
                </Select>
                <Button type="primary" icon="plus"  onClick={() => this.handleEditConfig( 0, null )}>
                  添加发布配置
                </Button>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={2}>

              </Col>
              <Col span={2}>
                {
                  selectedRows.length > 0 && (
                    <span>
                      <Dropdown overlay={menu}>
                        <Button>
                          更多操作 <Icon type="down"/>
                        </Button>
                      </Dropdown>
                    </span>
                  )
                }
              </Col>
            </Row>
          </div>
          <Divider> 发布项列表 </Divider>
          <Table
            loading={loading}
            rowKey={record => record.ID}
            dataSource={ proconfigbypid }
            columns={columnsConfig}
            pagination={false}
          />
        </div>
      </Card>
      </div>

    );
  }
}
