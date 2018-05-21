import { Table, Input, Popconfirm, Alert, Badge, Divider, Icon,Switch} from 'antd';
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styles from './index.less';
import { stat } from 'fs';



const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class SamePlan extends PureComponent {
    
     state = {
        selectedRowKeys: [],
        totalCallNo: 0,
        data: [],
        status: false,
        disabled: true
      };

    columns = [{
        title: 'cpu名称',
        dataIndex: 'idc_name',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'idc_name'),
    }, {
        title: 'cpu数量',
        dataIndex: 'provider_name',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'ip_range'),
    }, {
        title: 'cpu核数',
        dataIndex: 'address',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'ip_range'),
    }, {
        title: 'cpu类型',
        dataIndex: 'ip_range',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'ip_range'),
    }, {
        title: 'cpu描述',
        dataIndex: 'phone',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'phone'),
    },{
        title: '操作',
        dataIndex: 'ID',
        width: '20%',
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
    
      componentWillReceiveProps(nextProps) {
        // clean state
        if (nextProps.selectedRows.length === 0) {
          this.setState({
            selectedRowKeys: [],
            totalCallNo: 0,
          });
        }
        if (nextProps.gidc.data) {
            this.setState({
                data: nextProps.gidc.data,
            })
        }
      }

    renderColumns(text, record, column) {
     
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.ID, column)}
          />
        );
      }

      handleStatusChange = (key,e) => {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.ID)[0];
        if (target) {
          target.enable = e;
          this.setState({ 
              data: newData,
             });
        }
        console.log("data",this.state.data)
      }


      handleTableChange = ( filters, sorter) => {
        this.props.onChange( filters, sorter);
      }

      handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        const totalCallNo = selectedRows.reduce((sum, val) => {
          return sum + parseFloat(val.callNo, 10);
        }, 0);
    
        if (this.props.onSelectRow) {
          this.props.onSelectRow(selectedRows);
        }
    
        this.setState({ selectedRowKeys, totalCallNo });

        this.props.handleSelectRows(selectedRowKeys)
      }

      handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.ID)[0];
        
        if (target) {
          target[column] = value;
          this.setState({ data: newData,
            disabled:false
                         });
        }

        console.log('handleChange',value)
        console.log('handleChange',value)
      }

      edit(key) {    
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.ID)[0];
   
        if (target) {
          target.editable = true;
          this.setState({ 
              data: newData,
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
              data: newData,
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
            data: newData,
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
        const { selectedRowKeys, totalCallNo } = this.state;
        const { gidc, loading } = this.props;
        
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.handleRowSelectChange,
        //     getCheckboxProps: record => ({
        //       disabled: record.disabled,
        //     }),
        //   };
            this.cacheData =  this.state.data.map(item => ({ ...item }));           
            return  (
            <div className={styles.standardTable}>
                 <Table
                    bordered 
                    rowKey={record => record.ID}
                    //rowSelection={rowSelection}
                    dataSource={this.state.data} 
                    columns={this.columns} 
                    onChange={this.handleTableChange}
                    />;
              </div>)
            
  }
}

export default SamePlan;