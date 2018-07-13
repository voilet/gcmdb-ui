import React, { PureComponent, Fragment } from 'react';
import { routerRedux } from 'dva/router';

import moment from 'moment';
import { Table, Alert, Badge, Divider, Icon, Input, Popconfirm, Select } from 'antd';
import styles from './index.less';
//import HostDetail from './hostDetail'

const {Option} = Select;

const HostStatusMap = ['online','poweroff','processing','offline','outdate', 'error','installing'];
const HostStatus = ['已上线', '已关机','运行中','已下线','已过保', '异常','装机中'];

const AgentStatusMap = ['processing','error'];
const AgentStatus = ['运行中','异常'];





class hostOffLine extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data:[],
    status: false,
    disabled: true
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }

    if (nextProps.gdevice.host.data) {
          
        let content = '',id = '';
        if(nextProps.gdevice.password.data){
          content=nextProps.gdevice.password.data.password
          id=nextProps.gdevice.password.data.ID
        }
          this.setState({
              data: nextProps.gdevice.host.data.map((obj)=>{
                let pwd = true
                if( obj.ID == id ){
                  pwd=content
                }
                obj.password = pwd
                obj.selectStatus = true
                return obj;
              }),
          })
      }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, totalCallNo });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }


  edit(key) {    
    const { dispatch, match} = this.props; 
    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/hardware/host/edit',
                query:{id: key}
            }
    ));
  }

  show(key) {   
    const { dispatch, match} = this.props; 
    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/hardware/host/detail',
                query:{id: key}
            }
    ));
    
  }
  

  clean(key) {   
    const { dispatch, match} = this.props; 
    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/hardware/host/clean',
                query:{id: key}
            }
    ));
    
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      target.enable = this.state.status
      this.setState({ 
        data: newData.map((obj)=>{
          if(key == obj.ID){
            obj.selectStatus=true
          }
          return obj;
        }),
          disabled: true
         });
      this.cacheData = newData.map(item => ({ ...item }));
   
      this.props.handleSaveData(target)
    }
  }
  
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.editable;
      this.setState({ 
        data: newData.map((obj)=>{
          if(key == obj.ID){
            obj.selectStatus=true
          }
          return obj;
        }),
        disabled: true
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

    this.cacheData = newData.map(item => ({ ...item }));   
    this.props.handleDeleteData(target)
    }
   
  }

  handleChange(value, key, column) {
    
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    
    if (target) {
      target[column] = value;
      this.setState({ 
        data: newData,
        disabled:false
      });
    }
  }


  handleGroupValue(value, key, column) {
    
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    
    if (target) {
      target[column] = value.split(",")[0];
      target["group_title"] = value.split(",")[1];

      this.setState({ 
        data: newData,
        disabled:false
      });
    }
  }

  handleSelectLineValue(value, key, column){
   // console.log(value, key, column)
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    
    if (target) {
      target[column] = value;
      target["group_title"] = "请选择"
      target["group_id"] = "-1"

      this.props.dispatch({
        type: 'gproline/getProjectGroupbyId',
        payload: value
      });

      this.setState({ 
        data: newData,
        disabled:false,
        selectedLine: true
      });
    }
  
  }
  canceldelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.deleteable;
      this.setState({ data: newData });
    }
  }

  handleProlist = (value) => {
     return  value.map(i => <div>{i.title}<hr /></div>) 
  }

  render() {
    

    const { selectedRowKeys, totalCallNo, data} = this.state;
    const { gdevice  } = this.props;
    //console.log("this.props",this.props)
    //debugger

    const columns = [
      {
        title: '服务器 ip(网络地址)',
        dataIndex: 'ipsummary',
        key:'ipsummary',
        width:'150px',
        render: (text, record) => {
            var divStyle = {
                color: 'blue',
              };
            return <div style={divStyle}>
                 {text.split(",")[0]},<br></br> {text.split(",")[1]}
                </div>;
          }
      },
      {
        title: '所在产品线',
        dataIndex: 'projects',
        key:'projects',
        width:'150px',
        sorter: true,

        render: (text, record) => {
          console.log("record",record)
          var divStyle = {
              color: 'blue',
            };
          return <div style={divStyle}>
                 {record.projectlists ? this.handleProlist(record.projectlists) : ""}
              </div>;
        }
      },
      {
        title: '所在机柜机架',
        dataIndex: 'idc_title',
        key:'idc_title',
        width:'120px',
      },
      {
        title: '过保状态',
        dataIndex: 'stop_guaratee',
        key:'stop_guaratee',
        width:'120px',
        render: (text, record) =>{
           const time = new Date(text) - new Date()
           let statusText = time < 0 ? "过保" : "未过保"
           var divStyle = {
            color: 'red',
          };
          return <div style={divStyle}>{statusText}</div>;
        },
      },
      {
        title: '机器名称(fqdn)',
        dataIndex: 'fqdn',
        key:'fqdn',
        width:'200px'
      },
      {
        title: '机器密码',
        dataIndex: 'password',
        width: "120px",
        key: 'password',
        render: (text, record) => {
          return (
            <div>
               {text} 
            {/* {  
                showPassword ? 
                <Fragment>
                <Button onClick={()=>{this.passwordClick(record.ID)}}> 隐藏密码 </Button> 
                <span style={{marginRight:"10px"}}>{ text }</span>
                </Fragment>
                :
                <Fragment> 
                <Button onClick={()=>{this.passwordClick(record.ID)}}>查看密码</Button>
                <span style={{marginRight:"10px"}}>{ text === true ? '******' : text }</span>
                </Fragment>
            }   */}
            </div>
          )
        },
      },{
        title: '套餐',
        dataIndex: 'composeplan_title',
        width: "120px",
        key: 'composeplan_title',
    },{
        title: '容灾块',
        dataIndex: 'guardblock',
        width: "120px",
        key: 'guardblock'
    }, {
        title: '负责人',
        dataIndex: 'user',
        width: "120px",
        key: 'user'
    },{
        title: '机器状态',
        dataIndex: 'status',
        width: "120px",
        key: 'status',
        filters: [
            {
              text: HostStatusMap[0],
              value: 0,
            },
            {
              text: HostStatusMap[1],
              value: 1,
            },
            {
              text: HostStatusMap[2],
              value: 2,
            },
            {
              text: HostStatusMap[3],
              value: 3,
            },
            {
                text: HostStatusMap[4],
                value: 4,
            },
            {
                text: HostStatusMap[5],
                value: 5,
            },
            {
                text: HostStatusMap[6],
                value: 6,
            },
          ],
          onFilter: (value, record) => record.status.toString() === value,
          render(val) {
            return <Badge status={HostStatusMap[val]} text={HostStatus[val]} />;
          },
    },{
        title: 'agent',
        dataIndex: 'agent_survival',
        width: "120px",
        key: 'agent_survival',
        filters: [
            {
              text: AgentStatus[0],
              value: 0,
            },
            {
              text: AgentStatus[1],
              value: 1,
            },
          ],
          onFilter: (value, record) => record.status.toString() === value,
          render(val) {
            return <Badge status={AgentStatusMap[val]} text={AgentStatus[val]} />;
          },
    },
      {
        title: '操作',
        dataIndex: 'ID',
        key: 'ID',
        width:'200px',
        render: (text, record) => {
          const { editable,deleteable } = record;
          return (
          <div className="editable-row-operations">
            {
                <Popconfirm title="确定重装?">
                   <a>重装系统</a>
                 </Popconfirm>
            }
                 <Divider type="vertical" />
                 <a onClick={() => this.show(record.ID)}>删除机器</a>
          </div>
          );
      },
    }];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...gdevice.pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    
    this.cacheData =  this.state.data.map(item => ({ ...item }));     
   console.log('data+++', data)

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
     
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 个主机&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>取消勾选</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          //loading={loading}
          rowKey={record => record.ID}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default hostOffLine;
