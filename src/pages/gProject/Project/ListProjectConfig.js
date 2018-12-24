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
import EditVersionForm from './manageVersionForm';
import EditTaskForm from './manageTaskForm';

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
    isTaskAdding:false, //是否添加任务中

    gprolineId:0,
    gprogroupId:0,
    gproId:0,

    isAddConfigEnabled: false, //添加配置是否可用
    isLoadingVersions:false,
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
    console.log("currentProjectInfo", gproInfo)
    if( !gproInfo ) gproInfo = {};
    if( !record ){
      //new
      editInfo.pro = gproInfo.title || "";
      editInfo.ID = gproInfo.ID;
      editInfo.projectTitle = "";
      record = editInfo;
    }else{

    }
    console.log("编辑信息:", record)
    this.setState({
      isEditing:true,
      editInfo:record
    });
  };

  //version edit start 
  handleEditVersion = ( id, record )=>{
    let editInfo = record;
    console.log("编辑配置信息:", record);
    this.props.dispatch({
      type:'gproline/getVersionsById',
      payload:{
        ID:id,
        callback:(data)=>{
          record.versions = data;
          this.setState({
            editVersionInfo: record,
            isVersingAdding:true,
          })
        }
      }
    });    
  }
  //版本面板数据更新
  handleUpdateVersion = ( tableData )=>{
    this.forceUpdate();
  };
  handleCancelVersionEdit = ()=>{
    this.setState({
      isVersingAdding:false
    })
  };
  //version edit end 

  // task start
  handleEditTask = ( id, record )=>{
    let editInfo = record;
    this.props.dispatch({
      type:'gproline/getTasksById',
      payload:{
        ID:id,
        callback:(data)=>{
          record.tasks = data;
          this.setState({
            editTaskInfo: record,
            isTaskAdding:true
          })
        }
      }
    });  
  }
  handleCancelTaskEdit = ( )=>{
    this.setState({
      isTaskAdding:false
    })
  }
  handleUpdateTask = ( formData ) =>{
    this.setState({
      isTaskAdding:false
    })
  }
  //task end

  //提交了配置编辑
  handleSubmitEdit = ( record )=>{
    console.log("成功添加:", record)
    this.setState({
      isEditing:false
    })
  }
  handleCancelEdit = ( id, record )=>{
    console.log("cacnel...")
    this.setState({
      isEditing:false
    })
  };
  handleUpdateProject = ( formData )=>{
    this.setState({
      isEditing:false
    })
  }
  
  handlerSelect = ( type, val, e ) =>{
    const { dispatch } = this.props;
    let state = { ...this.state };
    console.log("val",val)
    if( !val ) return;
    //清空列表
    dispatch({
      type:'gproline/clearConfigList',
      payload:{}
    });

    switch( type ){
      case "gproline":
        //通过产品线查项目组
        this.setState({ gprolineId: val, gprogroupId:0, gproId:0 });
        dispatch({
          type:'gproline/getProjectGroupbyId',
          payload:val
        });
        break;
      case "gprogroup":
        //通过产品线查项目
        this.setState({ gprogroupId: val, gproId:0 });
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
  handlerSelectBlur = ( type, val, e ) =>{
    switch( type ){
      case "gpro":
        handlerSelect( type, val, e );
        break;
    }
  };
  
  /** 更新某一个项目的版本列表数据 */
  updateProVersion = ( proId ) =>{
    this.props.dispatch({
      type:'gproline/getVersionsById',
      payload:{
        ID:proId
      }
    });
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
        <Button onClick={(e)=>{ this.handleEditConfig( record.ID, record )}} style={{marginRight:10}}>修改配置</Button>
        <Button onClick={()=>{
        this.handleEditVersion( record.ID, record );
      }}>版本管理</Button>
        <Button onClick={()=>{
        this.handleEditTask( record.ID, record );
      }}>任务管理</Button>
      <Button onClick={()=>{
        this.handleEditHost( record.ID, record );
      }}>主机列表</Button>
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
    let block_versions = gproline.block_versions;
    let block_tasks = gproline.block_tasks;
    let block_hosts = gproline.block_hosts;
    let { gprogroupInfo, gproInfo} = this.getCurrentProInfo();


    for( let i=0;i< proconfigbypid.length;i++){
      proconfigbypid[i].pro = gproInfo ? gproInfo.title :'';
      proconfigbypid[i].progroup = gprogroupInfo ? gprogroupInfo.title : '';
      proconfigbypid[i].versions = block_versions[ proconfigbypid[i].ID ] || [];     
      proconfigbypid[i].tasks =  block_tasks[ proconfigbypid[i].ID ] || [];
      proconfigbypid[i].hosts =  block_hosts[ proconfigbypid[i].ID ] || []
    }
    //是否可以添加配置
    let isAddConfigEnabled = false;
    if( this.state.gproId ){
      isAddConfigEnabled = true;
    }else{
      isAddConfigEnabled = false;
    }

    console.log('{ListProject}Parent,props', this.props, this.state )
    /*
    if( ! this.state.isLoadingVersions ){
      let configLen = proconfigbypid.length;
      for(let i=0;i<configLen;i++){
        console.log("......loadversions");
        dispatch({
          type:'gproline/getVersionsById',
          payload:{
            ID:proconfigbypid[i].ID,
            callback:(data)=>{
             
            }
          }
        });
      }
      if( configLen ){
        this.state.isLoadingVersions = true;
      }
    }
    */

    // songxs add   
    function handleBlur(value) {
      console.log(`selected ${value}`);
    }

    function handleFocus() {
      console.log('focus');
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
        width:'pro',
        render: (text, record) => this.renderColumns(text, record, 'title'),
      },
      {
        title: '所属项目组',
        dataIndex: 'progroup',
        width:'pro',
        key:'progroup',
        render: (text, record) => this.renderColumns(text, record, 'progroup'),
      },
      {
        title: '所属项目',
        dataIndex: 'pro',
        key:'project',
        width:'pro',
        render: (text, record) => this.renderColumns(text, record, 'pro')
      },
      {
        title: '操作',
        dataIndex: 'status',
        key:'status',
        width:'100px',
        render: (text, record) => this.renderOptions(text, record, 'status'),
      }];
    return (
      <div>
      <EditProjectForm 
        modalVisible={ this.state.isEditing } 
        formData={ this.state.editInfo } 
        onSubmit={ this.handleSubmitEdit } 
        onCancel={ this.handleCancelEdit }
        onUpdate={ this.handleUpdateProject }
      ></EditProjectForm>

      <EditVersionForm
        modalVisible={ this.state.isVersingAdding } 
        tableData ={ this.state.editVersionInfo } 
        onCancel={ this.handleCancelVersionEdit }
        onUpdate= { this.handleUpdateVersion }
      ></EditVersionForm>
      //编辑版本
      <EditTaskForm
        modalVisible={ this.state.isTaskAdding } 
        tableData ={ this.state.editTaskInfo } 
        onCancel={ this.handleCancelTaskEdit }
        onUpdate= { this.handleUpdateTask }
      ></EditTaskForm>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListOperator}>
            <Row gutter={16} className={styles.filterList}>
              <Col>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="所有产品线"
                  optionFilterProp="children"
                  onChange={( val )=>{
                    this.handlerSelect("gproline", val )
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  { getFilters( 'gproline' ) }
                </Select>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="所有项目组"
                  optionFilterProp="children"
                  onChange={( val )=>{
                    this.handlerSelect("gprogroup", val )
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  { getFilters( 'gprogroup' ) }
                </Select>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="所有项目"
                  optionFilterProp="children"
                  onChange={( val )=>{
                    this.handlerSelect("gpro", val )
                  }}
                  onFocus={handleFocus}
                  onBlur={( val )=>{
                    var pro = this.props.gproline.probygid || [];
                    if( pro.length == 1 ){
                      //fix
                      //一条记录无法触发change，只能用blur临时替换
                      this.handlerSelect("gpro", val )
                    }
                    //
                  }}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  { getFilters( 'gpro' ) }
                </Select>
                {/*<Select defaultValue="" onSelect={( val )=>{ this.handlerSelect("gproline", val)}}>
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
                </Select>*/}
                <Button type="primary" icon="plus" disabled={ !isAddConfigEnabled }  onClick={() => this.handleEditConfig( 0, null )}>
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
