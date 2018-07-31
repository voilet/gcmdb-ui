import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tabs, Form, Row, Col, Input, Select, Button,Popconfirm ,Icon,message    } from 'antd';
import DescriptionList from '../../../../components/DescriptionList';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import isEqual from 'lodash/isEqual';

import styles from './cleanHost.less';
import moment from 'moment';

const { Description } = DescriptionList;

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

let newTabIndex = 0

let uuid = 10000;

@connect((props) => (props))
@Form.create()

export default class cleanHost extends Component {

  state = {
    totalCallNo: 0,
    data:[],
    selectedLine:false,
    dataSource:[],
    hasAdd: false
  };


  componentDidMount() {
    //console.log("this.props.location.state+++++++++++",this.props.location.query.id)
    const { dispatch, location, gdevice } = this.props;
    if (location.query !== undefined) {
      dispatch({
        type: 'gdevice/queryHostDetail',
        payload: location.query.id
      });
     
      dispatch({
        type: 'gproline/getProjectLine',
      })
    }
  }

  componentWillReceiveProps = nextProps => {
    const { gdevice } = nextProps;
    if (!isEqual(nextProps.gdevice.hostdetail.time4Update, this.props.gdevice.hostdetail.time4Update)) {
      if (gdevice.hostdetail.data.length) {
        this.setState({
          data:(nextProps.gdevice.hostdetail.data[0].projectlists || []).map((obj)=>{          
            if(obj.selectStatus == undefined){
              obj.selectStatus=true
            }
            return obj;
          })
        })
      }
    }
  }
  
  handleProjectLine = value => {
    this.props.dispatch({
      type: 'gproline/getProjectGroupbyId',
      payload: value,
    });
  };

  handleProjectGroup = value => {
    this.props.dispatch({
      type: 'gproline/getProjectbyId',
      payload: value,
    });
  };

  projectRemove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };


  isInArray = (arr, value) => {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
  }




  handleSave = e => {
    e.preventDefault();
    const form = this.props.form;
    const { dateStatus } = this.state;

    form.validateFields((err, values) => {
      if (!err) {
          const fields = { };
  
          let project = [];
          for (let i = 0; i < this.state.panes[0].information[0].projectlists.length; i++) {
            project.push(
              form.getFieldValue(`project${i}`) ? form.getFieldValue(`project${i}`) : ''
            );
          }

          fields.project = project;

          this.props.dispatch({
            type: 'gdevice/modifyHost',
            payload: {
              id: this.props.location.query.id,
              description: fields,
            },
          });

          message.success('修改成功');
 
        }
      })
    };


  reback = () => {
    const { dispatch, match} = this.props; 
    let activeKey = this.state.activeKey;
    const panes = this.state.panes.filter(pane => pane.key !== activeKey);
    this.setState({ panes });

    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/hardware/host/list',
            }
    ));
  }
   
  edit(key) {    
    const newData = [...this.state.data];

    const target = newData.filter(item => key === item.ID)[0];

    console.log("key",key)
    console.log("target",target)

    if (target) {
      target.editable = true;
      target.selectStatus = false
      this.setState({ 
          data: newData,
         });
    }
  }

  save(key) {
    console.log("savekey",key)
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      delete target.editable;
      target.selectStatus = true
      this.setState({ 
        data: newData 
      })      
      this.handleSaveData(target)
    }
  }

  savenew(key) {
   

    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    console.log("target",target)

    if (target) {
      delete target.editable;
      if (this.state.project_id) {
        target.ID =  this.state.project_id
      }
      target.selectStatus = true
      this.setState({ 
        data: newData 
      })      
      this.handleSaveData(target)
    }
  }
  
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      target.selectStatus =true
      this.setState({ 
        data: newData
     });
    }
  }

  askdelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target.deleteable = true;
      this.setState({ data: newData });
    }
  }



  confirmdelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
        const index = newData.indexOf(target)
        if (index > -1) {
        newData.splice(index, 1);
        }
    
    target.tag = false;
    this.setState({ data: newData });

    //this.cacheData = newData.map(item => ({ ...item }));   
    this.handleDeleteData(target)
    }
   
  }


  canclesave(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
        const index = newData.indexOf(target)
        if (index > -1) {
        newData.splice(index, 1);
        }
    
    target.tag = false;
    this.setState({ data: newData });
    }
   
  }

  canceldelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.deleteable;
      this.setState({ data: newData });
    }
  }

  handleAdd = () => {
    const { count, data } = this.state;
    const newData = {
      "ID": uuid++,
      "proline_title": "",
      "progroup_title": "",
      "project_title": "",
      "status": "new",
      "user": "未知",
      "addable": true
    }
    this.setState({
      data: [...data, newData],
      hasAdd: true
    });

  }

  handleSaveData = (val) => { 
     const { ID } = val
    const fields = {proid: ID}
    this.props.dispatch({
      type: 'gproline/hostproModify',
      payload: {
        description: fields,
        id: this.props.location.query.id,
      } 
    });
    
  }

  handleDeleteData = (val) => {
   const { ID } = val  
   
   const fields = {proid: ID}
    
    this.props.dispatch({
      type: 'gproline/hostproDelete',
      payload: {
        description: fields,
        id: this.props.location.query.id,
      }
    });

   
    this.props.dispatch({
      type: 'gdevice/queryHostDetail',
      payload: this.props.location.query.id
    });
}


handleSelectLineValue(value, key, column){
   
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.ID)[0];
   
   if (target) {
     target[column] = value;
     target["progroup_title"] = undefined
     target["project_title"] = undefined


     this.props.dispatch({
       type: 'gproline/getProjectGroupbyId',
       payload: value
     });

     this.setState({ 
       data: newData,
       disabled:false,
     });
   }
 
 }
  
 handleGroupValue(value, key, column) {
  
  const newData = [...this.state.data];
  const target = newData.filter(item => key === item.ID)[0];
  
  if (target) {
    target[column] = value
    target["project_title"] = undefined

    this.props.dispatch({
      type: 'gproline/getProjectbyId',
      payload: value,
    });

    this.setState({ 
      data: newData,
      disabled:false
    });
  }
}

handleProjectValue(value, key, column) {

  const newData = [...this.state.data];
  const target = newData.filter(item => key === item.ID)[0];
  
  if (target) {  
    this.setState({ 
      project_id: value
    });
  }
}
  
  render() {
    // debugger
    const { data } = this.state;
    const { gdevice, gproline } = this.props;
  //  console.log("dataSource123",dataSource)

    console.log("this.props+++++",this.props)

    const columns = [{
      title: '产品线名称',
      dataIndex: 'proline_title',
      key:'proline_title',
      width:'120px',
      render: (text, record) =>{
        let prolineOptions
        console.log("prolinedata",gproline.prolinedata)
        if (gproline.prolinedata.data) {
           prolineOptions = gproline.prolinedata.data.map(post => {
            return <Option key={post.ID} value={post.ID} >{post.title}</Option>
            })
        }
        return(
          <Select 
          defaultValue = {text} 
            disabled={record.selectStatus} 
            style={{ width: '150px' }} 
            onChange={(value)=>this.handleSelectLineValue(value, record.ID, 'line_id')}
          >
            {prolineOptions}
          </Select>)
      },
    },{
      title: '项目组名称',
      dataIndex: 'progroup_title',
      key:'progroup_title',
      width:'120px',
      render: (text, record) =>{
       

        let  progroupOptions
        console.log("prolinedata",gproline.progroupbylid)
        if (gproline.progroupbylid ) {
           progroupOptions = gproline.progroupbylid.map(post =>
            <Option key={post.ID} value={post.ID} >{post.title}</Option>
          )
        }
        
        return(
          
          <Select 
           defaultValue = {text} 
            //value={record.progroup_title} 
            disabled={record.selectStatus} 
            style={{ width: '150px' }}
            placeholder="请选择"
            onChange={(value)=>{this.handleGroupValue(value,record.ID,'group_id')}}
          >
            { progroupOptions }
          </Select>)
      },
    },{
      title: '项目名称',
      dataIndex: 'project_title',
      key:'project_title',
      width:'120px',
      render: (text, record) =>{
      
        let  projectOptions

        if (gproline.probygid ) {
          projectOptions = gproline.probygid.map(post =>
            <Option key={post.ID} value={post.ID} >{post.title}</Option>
          )
        }
        
        return(
          <Select 
            defaultValue = {text} 
            //value={record.title?record.title:record.project_title} 
            disabled={record.selectStatus} 
            style={{ width: '150px' }} 
            onChange={(value)=>{this.handleProjectValue(value,record.ID,'project_id')}}
            placeholder="请选择"
          >
            { projectOptions }
          </Select>)
      },
    },{
        title: '项目状态',
        dataIndex: 'status',
        key: 'status',
        width:'150px',
        render: (text) => {
          if (text === 'true') {
             return(<Badge status="success" text="运行中" />)
          } else if (text === 'false') {
            return( <Badge status="error" text="已下线" />)
          } else {
            return( <Badge status="error" text="未处理" />)
          }
        } 
      },  {
        title: '操作',
        dataIndex: 'ID',
        key: 'ID',
        width:'200px',
        render: (text, record) => {
          const { editable,deleteable,addable } = record;
          console.log("record+++",record)
          return (
          <div className="editable-row-operations">
          
              {
              !deleteable && (editable ?
                  <span >
                  <a style={{marginLeft: 20}} onClick={() => this.save(record.ID)}>保存</a>
               
               
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.ID)}>
            
                       <a style={{marginLeft: 50}}>取消</a>
                   
                  </Popconfirm>
                  </span>
                  : 
                  <span style={{marginLeft: 20}}>
                    {addable ?<a onClick={() => this.savenew(record.ID)}><Button  >保存</Button></a>:<a onClick={() => this.edit(record.ID)}><Button  >编辑</Button></a>}
                  </span>)
              }
               
               {
               !editable && (deleteable ?
                  <span>
                  <Popconfirm title="确定解除?" onConfirm={() => this.confirmdelete(record.ID)}>
                      <a style={{marginLeft: 20}} ><Button type="danger">确定</Button></a>
                  </Popconfirm>
                 
                  <a style={{marginLeft: 50}} onClick={() => this.canceldelete(record.ID)}>取消</a>
                  </span>
                  : 
                  <span >
                     {addable ?<a style={{marginLeft: 50}} onClick={() => this.canclesave(record.ID)}><Button type="danger">取消</Button></a>:
                     <a style={{marginLeft: 50}} onClick={() => this.askdelete(record.ID)}><Button type="danger">下线</Button></a>}
                  
                  </span>)
              }
          </div>
          );
      },
    }];


    return (
       <div>
        <Card>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
           添加项目关系
        </Button>
        <Divider>  主机项目关系  </Divider>
        <Table bordered dataSource={data} columns={columns} />
        </Card>
      </div>

    );
  }
}
