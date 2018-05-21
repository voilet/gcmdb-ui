import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
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

class StandardTable extends PureComponent {
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
    if(nextProps.prodata.data){
      this.setState({
        data:nextProps.prodata.data.map((obj)=>{
          if(obj.selectStatus == undefined){
            obj.selectStatus=true
          }
          
          return obj;
        })
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
      this.cacheData = newData.map(item => ({ ...item }));
      console.log('target',target)
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
  handSelectChange=(value)=>{
    console.log(value)
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
    const { prodata, loading, progroupdata, prolinedata  } = this.props;

    //debugger

    const columns = [
      {
        title: '项目',
        dataIndex: 'pro_title',
        key:'pro_title',
        width:'120px',
        render: (text, record) => this.renderColumns(text, record, 'pro_title'),
      },
      {
        title: '项目别名',
        dataIndex: 'pro_alias',
        key:'pro_alias',
        width:'120px',
        render: (text, record) => this.renderColumns(text, record, 'pro_alias'),
      },
      {
        title: '产品线',
        dataIndex: 'line_title',
        key:'line_title',
        width:'120px',
        render: (text, record) =>{
          const prolineOptions = prolinedata.map(post => {
                return <Option key={post.ID} value={post.ID} >{post.title}</Option>
                })
          // const key = record.ID
          // //console.log(key)
          return(
            <Select 
              defaultValue={text} 
              disabled={record.selectStatus} 
              style={{ width: 'auto' }} 
              onChange={(value)=>this.handleSelectLineValue(value, record.ID, 'line_title')}
            >
              {prolineOptions}
            </Select>)
        },
      },
      {
        title: '项目组',
        dataIndex: 'group_title',
        key:'group_title',
        width:'120px',
        render: (text, record) =>{
          const progroupOptions = progroupdata.map(post =>
            <Option key={post.ID} value={post.ID} >{post.title}</Option>
          )
          return(
            <Select 
              defaultValue={text} 
              disabled={record.selectStatus} 
              style={{ width: 'auto' }} 
              onChange={(value)=>{this.handleChange(value,record.ID,'group_title')}}
            >
              { progroupOptions }
            </Select>)
        },
      },
      {
        title: '业务说明',
        dataIndex: 'pro_remarks',
        key:'pro_remarks',
        width:'200px',
        render: (text, record) => this.renderColumns(text, record, 'pro_remarks'),
      },
      {
        title: '仓库路径',
        dataIndex: 'pro_code_url',
        key:'pro_code_url',
        width:'150px',
        render: (text, record) => this.renderColumns(text, record, 'pro_code_url'),
      },
      {
        title: '排序',
        dataIndex: 'pro_order',
        key:'pro_order',
        width:'100px',
        render: (text, record) => this.renderColumns(text, record, 'pro_order'),
      },
      {
        title: '状态',
        dataIndex: 'pro_enable',
        key: 'pro_enable',
        width:'150px',
        render: (text, record) => {
          return (
          <Switch 
            checkedChildren="开启" 
            unCheckedChildren="关闭" 
            value={text} 
            disabled={record.selectStatus}   
            onChange={(value)=>{this.handleChange(value,record.ID,'pro_enable')}}
          />)
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
              !deleteable && (editable ?
                  <span>
                  <a onClick={() => this.save(record.ID)}>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.ID)}>
                      <a>取消</a>
                  </Popconfirm>
                  </span>
                  : 
                  <span>
                  <a onClick={() => this.edit(record.ID)}>编辑</a>
                  </span>)
              }
               {
               !editable && (deleteable ?
                  <span>
                  <Popconfirm title="确定删除?" onConfirm={() => this.confirmdelete(record.ID)}>
                      <a>提交</a>
                  </Popconfirm>
                  <Divider type="vertical" />
                  <a onClick={() => this.canceldelete(record.ID)}>取消</a>
                  </span>
                  : 
                  <span style={{marginLeft: 10}}>
                  <a onClick={() => this.askdelete(record.ID)}>删除</a>
                  </span>)
              }
          </div>
          );
      },
    }];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...prodata.pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    
    this.cacheData =  this.state.data.map(item => ({ ...item }));     
   // console.log('loading', loading)
    return (
      <div className={styles.standardTable}>
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
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
