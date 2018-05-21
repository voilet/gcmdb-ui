import { Table, Input, Popconfirm, Alert, Badge, Divider, Icon,Switch, Select} from 'antd';
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

class PlanTab extends PureComponent {
    
     state = {
        selectedRowKeys: [],
        totalCallNo: 0,
        data: [],
        status: false,
        disabled: true
      };

    columns = [{
        title: '套餐名称',
        dataIndex: 'title',
        width: '100',
        key: '1',
        render: (text, record) => {
          return (
            <EditableCell
              editable={record.editable}
              value={text}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          );
        },
    }, {
        title: 'cpu套餐',
        dataIndex: 'cpu_info',
        width: '100',
        key: '2',
        render: (text, record) => this.renderSelect(text, record, 'cpu_info'),
    }, {
        title: 'cpu详细',
        dataIndex: 'cpu_info',
        width: '100',
        key: '3',
        render: (text, record) =>{
          const Allstr = `数量: ${text.num == "" ? "无" : text.num}, 频率: ${text.mainfrequency == "" ? "无" : text.mainfrequency}, 核数: ${text.cores == "" ? "无" : text.cores}, 类型: ${text.categorycpuinfo.title  == "" ? "无" : text.categorycpuinfo.title}`
          return (
            <EditableCell
              editable={record.editable}
              value={Allstr}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          );
        },
    }, {
        title: '内存套餐',
        dataIndex: 'mem_info',
        width: '100',
        key: '4',
        render: (text, record) => this.renderSelect(text, record, 'mem_info'),
    }, {
        title: '内存详细',
        dataIndex: 'mem_info',
        width: '100',
        key: '5',
        render: (text, record) =>{
          
          const Allstr = `数量: ${text.num   == "" ? "无" :  text.num}, 频率: ${text.mainfrequency  == "" ? "无" :  text.mainfrequency}, 类型:  ${text.categorymeminfo.title == "" ? "无" : text.categorymeminfo.title}, 内存：${text.volume == "" ? "无" : text.volume}`
          return (
            <EditableCell
              editable={record.editable}
              value={Allstr}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          );
        },
    },{
        title: '硬盘套餐',
        dataIndex: 'disk_info',
        width: '100',
        key: '6',
        render: (text, record) => this.renderSelect(text, record, 'disk_info'),
    }, {
        title: '硬盘详细',
        dataIndex: 'disk_info',
        width: '100',
        key: '7',
        render: (text, record) =>{
          const Allstr = `数量: ${text.num == "" ? "无" : text.num}, 转数: ${text.rpm == "" ? "无" : text.rpm}, 类型:  ${text.categorydiskinfo.title == "" ? "无" : text.categorydiskinfo.title},  内存：${text.volume == "" ? "无" : text.volume}`
          return (
            <EditableCell
              editable={record.editable}
              value={Allstr}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          );
        },
    },{
        title: '电源套餐',
        dataIndex: 'power_info',
        width: '100',
        key: '8',
        render: (text, record) => this.renderSelect(text, record, 'power_info'),
    }, {
        title: '电源详细',
        dataIndex: 'power_info',
        width: '100',
        key: '9',
        render: (text, record) =>{
          const Allstr = `数量: ${text.num == "" ? "无" : text.num}, 内存：${text.volume == "" ? "无" : text.volume}`
          return (
            <EditableCell
              editable={record.editable}
              value={Allstr}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          );
        },
    },{
        title: '网卡套餐',
        dataIndex: 'adaptor_info',
        width: '100',
        key: '10',
        render: (text, record) => this.renderSelect(text, record, 'adaptor_info'),
    }, {
        title: '网卡详细',
        dataIndex: 'adaptor_info',
        width: '100',
        key: '11',
        render: (text, record) =>{
          //
          const Allstr = `数量: ${text.num == "" ? "无" : text.num}, 类型:  ${text.categoryadaptorinfo.title == "" ? "无" : text.categoryadaptorinfo.title} `
          return (
            <EditableCell
              editable={record.editable}
              value={Allstr}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          );
        },
    },{
        title: '备注',
        dataIndex: 'comment',
        width: '100',
        key: '12',
        render: (text, record) => {

          return (
            <EditableCell
              editable={record.editable}
              value={text}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          );
        },
    },{
        title: '操作',
        dataIndex: 'ID',
        width: 'auto',
        fixed: 'right',
        key: 'operation',
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
        // if (nextProps.selectedRows.length === 0) {
        //   this.setState({
        //     selectedRowKeys: [],
        //     totalCallNo: 0,
        //   });
        // }
        console.log("plannnnnnnnnnnnnn",nextProps.ghardware)
        if (nextProps.ghardware.data) {
            this.setState({
                data: nextProps.ghardware.data.list
            })
        }
      }
    renderSelect(text, record, column) {
    
      return (
        <Select defaultValue={text.title} disabled={this.state.disabled} style={{ width: 'auto' }} onChange={()=>{this.handSelectChange()}}>
          <Option key={text.title} value={text.title}>{text.title}</Option>
        </Select>
      );
    }
    handSelectChange(){
      
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
        console.log(target)
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
            this.cacheData = this.state.data == undefined ? [] : this.state.data.map(item => ({ ...item }));           
            return  (
            <div className={styles.standardTable}>
                 <Table
                    bordered 
                    scroll={{ x: 2200 }}
                    rowKey={record => record.ID}
                    //rowSelection={rowSelection}
                    dataSource={this.state.data} 
                    columns={this.columns} 
                    onChange={this.handleTableChange}
                    />
              </div>)
            
  }
}

export default PlanTab;