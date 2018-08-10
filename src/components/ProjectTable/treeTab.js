import React, { PureComponent, Fragment } from 'react';
import { routerRedux } from 'dva/router';


import { Table, Alert, Badge, Divider, Icon, Input, Popconfirm, Select, Switch } from 'antd';
import styles from './index.less';


const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class TreeTab extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data:[]
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
   
    console.log("nextProps.treeTabdata.data",nextProps.treeTabdata.data)

    this.setState({
      data: nextProps.treeTabdata.data
    })
    
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

  renderColumns(text, record, column){
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.ID, column)}
      />
    );
  }

  edit(key) {    
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target.editable = true;
      this.setState({ 
          data: newData.map((obj)=>{
            if(key == obj.ID){
              obj.selectStatus=false
            }
            return obj;
          }),
          disabled: false
         });
    }
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
      // this.cacheData = newData.map(item => ({ ...item }));
      //console.log('target',target)
      this.props.handleSaveData(target)
    }console.logconsole.log
  }
  
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      //Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
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

    //this.cacheData = newData.map(item => ({ ...item }));   
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

    console.log('handleChange',value,key,column)
  }

  handleSelectLineValue(value, key, column){
    console.log(value, key, column)
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    
    if (target) {
      target[column] = value;
      this.setState({ 
        data: newData,
        disabled:false
      });
      this.props.dispatch({
        type: 'gproline/getProjectGroupbyId',
        payload: value
      });
    }
  
  }
  // canceldelete(key) {
  //   const newData = [...this.state.data];
  //   const target = newData.filter(item => key === item.ID)[0];
  //   if (target) {
  //   //  Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
  //     delete target.deleteable;
  //     this.setState({ data: newData });
  //   }
  // }

  // ToHostTable(pid) {
  //   console.log("ToHostTable", this.props)
  //   const { dispatch, match} = this.props; 
  //   dispatch(
  //       routerRedux.push(
  //           {
  //               pathname: '/resource/hardware/host/list',
  //               query:{projectid: pid}
  //           }
  //   ));
  // }


  render() {
    

    const { selectedRowKeys, totalCallNo,data} = this.state;
    const {  loading } = this.props;

    //debugger

    const columns = [
      {
        title: '项目ID',
        dataIndex: 'project_id',
        key:'project_id',
        width:'120px',
        render: (text, record) => this.renderColumns(text, record, 'project_id'),
      },
      {
        title: '项目名',
        dataIndex: 'project_title',
        key:'project_title',
        width:'120px',
        render: (text, record) => this.renderColumns(text, record, 'project_title'),
      },
      {
        title: '全路径',
        dataIndex: 'line_title',
        key:'line_title',
        width:'120px',
      },
      {
        title: 'IP地址',
        dataIndex: 'hostsip',
        key:'hostsip',
        width:'200px',
        render: (text, record) => {
          console.log("host ip record",record)
          const divStyle = {
            color: 'red',
            cursor: 'pointer',
            fontFamily: 'Verdana',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
          };

          return(
            <span onClick={() => this.ToHostTable(record.project_id)} style={divStyle }>
             {  record.hostsip.map(ip=>{
              return <div> {ip} </div>
            })}
            </span>
            
          )
        },
      },
      {
        title: '运行模式',
        dataIndex: 'host_model',
        key:'host_model',
        width:'100px',
        render: (text, record) => this.renderColumns(text, record, 'host_model'),
      },
      {
        title: '域名',
        dataIndex: 'host_domain',
        key: 'host_domain',
        width:'150px',
        render: (text, record) => this.renderColumns(text, record, 'host_domain'),
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
             
          </div>
          );
      },
    }];

    // const paginationProps = {
    //   showSizeChanger: true,
    //   showQuickJumper: true,
    //   ...prodata.pagination,
    // };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    
   // this.cacheData =  this.state.data.map(item => ({ ...item }));     
   // console.log('loading', loading)
    return (
      <div className={styles.TreeTab}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 个项目&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.ID}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          //pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default TreeTab;
