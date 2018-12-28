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
        title: 'ip',
        dataIndex: 'ipsummary',
        key:'ipsummary',
        // width:'150px',
        render: (text, record) => {
            var divStyle = {
                color: '#108ee9',
                fontWeight: 600,
              };
            return<div style={divStyle}> <a onClick={() => this.show(record.ID)}>{text}</a></div>
          },
      },
      {
        title: 'fqdn',
        dataIndex: 'fqdn',
        key:'fqdn',
        // width:'200px',
      },
      {
        title: '所在产品线',
        dataIndex: 'projectlists',
        key:'projectlists',
        // width:'150px',
        sorter: true,

        render: (text, record) => {
          var divStyle = {
              color: '#108ee9',
              fontWeight: 600,
            };
          return <div style={divStyle}>{record.projectlists ? this.handleProlist(record.projectlists) : ""}</div>;
        },
      },
      {
        title: '机柜机架',
        dataIndex: 'idc_title',
        key:'idc_title',
        // width:'200px',
      },

      {
        title: '硬件信息',
        dataIndex: 'summary',
        key:'summary',
        // width:'200px',
        render: (text,record) => {
          var divStyle = {
            color: '#108ee9',
            // fontWeight: 600,
          };
          return(
            <div style={divStyle}>
              <Row gutter={24}>
                <Col span={24} >
                  cpu信息: {text.cpu_info}
                </Col>

              </Row>
              <Row gutter={24}>
                <Col span={24} >
                  内存信息: {text.mem_info}
                </Col>

              </Row>
              <Row gutter={24}>
                <Col span={24} >
                  磁盘信息: {text.disk_info}
                </Col>
              </Row>
            </div>
          )
        },
      },
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

      {
        title: '操作',
        dataIndex: 'ID',
        key: 'ID',
        // width:'200px',
        render: (text, record) => {
          return (
          <div className="editable-row-operations">
            <a onClick={() => this.edit(record.ID)}>编辑</a>  
                 <Divider type="vertical" />
                 <a onClick={() => this.show(record.ID)} >详情</a>
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
