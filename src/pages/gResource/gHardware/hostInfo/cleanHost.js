import React, { Component, Fragment } from 'react';

import { Card, Badge, Table, Divider, Form,  Select, Button,Popconfirm     } from 'antd';




const Option = Select.Option;



let uuid = 10000;


@Form.create()

export default class cleanHost extends Component {

  state = {
    totalCallNo: 0,
    data:[],
    selectedLine:false,
    hasAdd: false,
  };



  componentDidMount () {

    const { projectlist } = this.props; //父组件传递
    if (projectlist.length > 0) {
       this.setState({
         data: projectlist.map((obj)=> {
            obj.selectStatus = true  //初始化后不可编辑
            return obj
         })
       })

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


  //保存
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0]

    if (target) {
      target.saveStatus = true  //保存按钮不可重复点击
      target.selectStatus = true  
      target.status = "true"

      this.setState({ 
        data: newData 
      }) 

      this.props.handleSaveProData(target,newData)
    }
  }


  //取消
  cancle(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.saveStatus
      target.status = "false"
      target.addable = false
      this.setState({ 
        data: newData
     });
    }
  }

  //编辑
  edit(key) {    
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target.addable = true
      target.selectStatus = false

      this.setState({ 
          data: newData,
         });
    }
  }

  
  //删除
  confirmdelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
        const index = newData.indexOf(target)
        if (index > -1) {
        newData.splice(index, 1);
        }
    
    this.setState({ data: newData });

    this.props.handleDeleteProData(target,newData)
    }
   
  }


  handleAdd = () => {
    const { data } = this.state;
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
    target.project_id = value
    this.setState({ 
      data: newData,
    });
  }
}
  
  render() {
    // debugger
    const { data } = this.state;
    const {  gproline } = this.props;

    const columns = [{
      title: '产品线名称',
      dataIndex: 'proline_title',
      key:'proline_title',
      width:'120px',
      render: (text, record) =>{
        
        let prolineOptions =  gproline.prolinedata.data.map(post => {
        return <Option key={post.ID} value={post.ID} >{post.title}</Option>
        })
        
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
        render: (text,record) => {
        

          if (record.status === 'true') {
             return(<Badge status="success" text="已上线" />)
          } else if (record.status === 'false') {
            return( <Badge status="error" text="已下线" />)
          } else {
            return( <Badge status="error" text="未处理" />)
          }
        } 
      },
      {
        title: '负责人',
        width:'100px',
        dataIndex: 'user',
        key: 'user',
      },  {
        title: '操作',
        dataIndex: 'ID',
        key: 'ID',
        width:'300px',
        render: (text, record) => {
          const { addable } = record;
          return (
          <div className="editable-row-operations">
      
            {
              addable ?
              <span style={{marginLeft: 20}}>
                <a onClick={() => this.save(record.ID)}><Button disabled={record.saveStatus}>保存</Button></a>
                </span>
              : 
              <span style={{marginLeft: 20}}>
              <a onClick={() => this.edit(record.ID)}><Button>编辑</Button></a>
              </span>
            }
              
              {

              addable ?
              <span style={{marginLeft: 20}}>
              <a onClick={() => this.cancle(record.ID)}><Button>取消</Button></a>
              </span>
              : 
              <span>
                <Popconfirm title="确定删除?" onConfirm={() => this.confirmdelete(record.ID)}>
                    <a style={{marginLeft: 20}} ><Button type="danger">删除</Button></a>
                </Popconfirm>
              </span>

            }
          </div>
          );
      },
    }];


    return (
       <Fragment>
        <Card>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
           添加项目关系
        </Button>
        <Divider>  主机项目关系  </Divider>
        <Table 
        bordered 
        rowKey={record => record.ID}
        dataSource={data} 
        columns={columns}
         />
       </Card> 
      </Fragment>

    );
  }
}
