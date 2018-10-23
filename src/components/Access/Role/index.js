import React, { PureComponent } from 'react';
 
import { Table, Alert, Divider, Input, Popconfirm, Button,Modal  } from 'antd';
import styles from './index.less';
import Assign from './Assign'
 
const { confirm } = Modal

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class RoleTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data:[],
    selectedLine:false
  };

  
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.resource === prevState.resource)
    {
        return {}
    }
    else {
       return {data: nextProps.roledata}
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
      this.setState({ data: newData})
      }
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      this.setState({data: newData})
      this.props.handleSaveData(target)
    }
  }
  
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData })
    }
  }


  confirmdelete(value) {
    const { dispatch } = this.props
 
    const { ID:delete_id  } = value

    confirm({
        title: '请确认',
        content: '您是否要删除所选的项？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
            // 确认删除，发送请求
            // 删除成功，则重新load列表
            dispatch({
                type: 'grole/deleteRole',
                payload: {
                    description: {
                        ID: delete_id
                    },
                    cb: (info) => {
                        if (info.status == '200'){
                            openNotificationWithIcon('success',"删除角色成功!~ ~")
                        } else {
                            openNotificationWithIcon('error',"删除角色失败!~ ~")
                        }
                        // 刷新页面

                    }
                },
            })
        },
    })
  }

  handleChange(value, key, column) {    
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    
    if (target) {
      target[column] = value;
      this.setState({ 
        data: newData,
      });
    }
  }


  handleRoleValue(value, key, column) {
    
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


  render() {
    const { selectedRowKeys, totalCallNo, data} = this.state;
    const { roledata,assignInfo } = this.props;

    const columns = [
      {
        title: '角色ID',
        dataIndex: 'ID',
        key:'ID',
        width:'120px',
      },
      {
        title: '角色名称',
        dataIndex: 'title',
        key:'title',
        width:'120px',
        render: (text, record) => this.renderColumns(text, record, 'title'),
      },
      {
        title: '用户数',
        dataIndex: 'user_nums',
        key:'user_nums',
        width:'150px',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width:'200px',
        render: (text, record) => {
          const { editable,deleteable } = record;
          return (
          <div className="editable-row-operations">
              {
               editable ?
                  <span>
                  <a onClick={() => this.save(record.ID)}>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm title="确定取消?" onClick={() => this.cancel(record.ID)}>
                      <a>取消</a>
                  </Popconfirm>
                  </span>
                  : 
                  <span>
                   <Button onClick={() => this.edit(record.ID)}>修改</Button>
                  <Divider type="vertical" />
                  </span>
              }
               {
                 !editable ?
                  <span>
                 
                  <Button onClick = { ()=> this.confirmdelete(record)}>删除</Button>
                   
                  <span>
                      <Divider type="vertical" />
                      <Assign record={record.ID} assignInfo={assignInfo} dispatch={this.props.dispatch} />
                       
                  </span>
                  </span>
                : 
                <span>
                </span>
              }
          </div>
          );
      },
    }];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
     // ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    
    
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 个用户&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>取消勾选</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        
        <Table
         // loading={loading}
          rowKey={record => record.ID}
          rowSelection={rowSelection}
          dataSource={roledata}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default RoleTable;
