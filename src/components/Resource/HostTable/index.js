import React, { PureComponent, Fragment } from 'react';
import { routerRedux } from 'dva/router';


import { Table, Alert, Icon, Badge,Divider, Popconfirm,Tag,notification,Row,Col  } from 'antd';
import styles from './index.less';
//import HostDetail from './hostDetail'
import ModifyPw from './ModifyPw'
import ShowPw from './showPw'




const Status = ['agent异常',
                'agent运行中',
                'host运行中', 
                'host已关机',
                'host已下线',
                'host系统异常',
                'host已过保', 
                'host装机中',
                'host未处理',
                'host未下线',
                'host已上线',
                'host网络中断',
                'host网络异常',
                'host未过保'
              ];


const openNotificationWithIcon = (type) => {
  notification[type]({
    message: '错误提示:',
    description: '存在未解除的项目关系,请先解除项目关系',
  });
};



class HostTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data:[],
    status: false,
    confirmDirty: false,
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
    if (nextProps.gdevice.host.data) {
      this.setState({ data: nextProps.gdevice.host.data })
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
  

  handleProlist = (value) => {
     return  value.map(i => <div>{i.proline_title}->{i.progroup_title}->{i.project_title}<hr /></div>) 
  }

  deleteHost = (hostid) => {
    let ids = new Array()
    ids.push(hostid)

    this.props.dispatch({
      type: 'gdevice/deleteHost',
      payload: {
        tag:true,
        infolist:JSON.stringify({ ids })
      }
    });


    //console.log("this.props.repsonse",this.props)

    let response = this.props.gdevice.response

    if(response.status == "200") {
      const newData = [...this.state.data];

      const target = newData.filter(item => ids === item.ID)[0];
      

      
      if (target) {
          const index = newData.indexOf(target)
          if (index > -1) {
          newData.splice(index, 1);
          }
 
      this.setState({ data: newData });

    }} else {
      openNotificationWithIcon('error')
    }
  }

  editPass = () => {
    <ModifyPw />
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
                color: '#108ee9',
                fontWeight: 600
              };
            return(
              text.split(',').map((i,index)=> <div style={divStyle}> {i}</div>) 
            )
          }
      },
      {
        title: '所在产品线',
        dataIndex: 'projectlists',
        key:'projectlists',
        width:'150px',
        sorter: true,

        render: (text, record) => {
          var divStyle = {
              color: '#108ee9',
              fontWeight: 600
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
        title: '机器名称(fqdn)',
        dataIndex: 'fqdn',
        key:'fqdn',
        width:'200px'
      },
      {
        title: '机器简要信息',
        dataIndex: 'summary',
        key:'summary',
        width:'200px',
        render: (text,record) => {
            var divStyle = {
            color: '#108ee9',
            fontWeight: 600
            };
            return(
              <div style={divStyle}>
                <Row gutter={24}>
                <Col span={12} >
                   cpu核数:
                </Col>
                <Col span={12} >
                   {text.cpu_info}
                </Col>
                </Row>
                <Row gutter={24}>
                <Col span={12} >
                    内存信息:
                </Col>
                <Col span={12} >
                    {text.mem_info.split("|")[0]}
                </Col>
                </Row>
                <Row gutter={24}>
                <Col span={12} >
                    磁盘信息:
                </Col>
                <Col span={12} >
                    {text.disk_info}
                </Col>
                </Row>
              </div>
            )
        }
      }
      // {
      //   title: '机器密码',
      //   dataIndex: 'password',
      //   width: "120px",
      //   key: 'password',
      //   render: (text, record) => {
      //     const {password}  = this.props.gdevice
      //     let  pass = password
 

      //     return (
      //       <div>
      //          <ShowPw
      //             data={record}
      //           />
                          
      //       </div>
      //     )
      //   },
       ,{
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
        title: '状态信息',
        dataIndex: 'status',
        width: "150px",
        key: 'status',
        filters: [
            {
              text: Status[0],
              value: 0,
            },
            {
              text: Status[1],
              value: 1,
            },
            {
              text: Status[2],
              value: 2,
            },
            {
              text: Status[3],
              value: 3,
            },
            {
                text: Status[4],
                value: 4,
            },
            {
                text: Status[5],
                value: 5,
            },
            {
                text: Status[6],
                value: 6,
            },
            {
              text: Status[7],
              value: 7,
          },
          {
            text: Status[8],
            value: 8,
        },
          ],
          onFilter: (value, record) => {
            if (record.status.host_status_id.toString() == value) {
                return true 
            } else if (record.status.agent_status_id.toString() == value) {
                return true 
            } else {
              return false 
            }
          },
    
          render(text) {
 
            let agentstatus 

      
            if (text.agent_status_id === 1)  {
              agentstatus = "success"
            } else {
              agentstatus = "error"
            }
   
 
            return (
              <div>
                  <Row gutter={16}  style={{  marginBottom: '8px',marginLeft: '16px'}}>
                  <Col span={6} >
                    <Badge status={agentstatus} />
                  </Col>
                    <Col span={6} >
                      <Tag color="#108ee9">
                        {Status[text.host_business_status_id]}
                      </Tag>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{  marginBottom: '8px',marginLeft: '46px'}}>
                    <Col span={6} >
                      <Tag color="#9F79EE" >
                        {Status[text.host_status_id]}
                      </Tag>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{  marginBottom: '8px',marginLeft: '46px'}}>
                    <Col span={6} >
                      <Tag color="#EE9A00" >
                        {Status[text.host_maintain_status_id]}
                      </Tag>
                    </Col>
                  </Row>
              </div>
            )
           
          },
    },
      {
        title: '操作',
        dataIndex: 'ID',
        key: 'ID',
        width:'200px',
        render: (text, record) => {
          return (
          <div className="editable-row-operations">
            <a onClick={() => this.edit(record.ID)}>编辑</a>  
                 <Divider type="vertical" />
                 <a onClick={() => this.show(record.ID)}>详情</a>
                 <Divider type="vertical" />
                {
                <Popconfirm title="确定删除?" onConfirm={() => this.deleteHost(record.ID)}>
                  <a>删除</a>  
                 </Popconfirm>
                }
                <Divider type="vertical" />
                {/* <a onClick={() => this.editPass(record.ID)}>修改密码</a> */}

          </div>
          );
      },
    }];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...gdevice.host.pagination,
    };
  

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    
   // this.cacheData =  this.state.data.map(item => ({ ...item }));     
  

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                目前共有 <a style={{ fontWeight: 600 }}>{paginationProps.total}</a> 个主机&nbsp;
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

export default HostTable;
