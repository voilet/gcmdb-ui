import { Table, Input, Popconfirm, Alert, Badge, Divider, Icon,Switch,Rate,Select} from 'antd';
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styles from './ip.less';
import { stat } from 'fs';

const Option = Select.Option


const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class IpTable extends PureComponent {
    
     state = {
        selectedRowKeys: [],
        totalCallNo: 0,
        data: [],
        status: false,
        disabled: true,
        rateValue: 3
      };

    columns = [{
        title: 'IP名称',
        dataIndex: 'ipaddress',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'ipaddress'),
    },{
        title: '类型',
        dataIndex: 'iptype',
        width: '15%',
        render: (text, record) => {
          const {iptype} = this.props.ipresource.data
         // this.setState({ selectedTypeValue: record.typeid });
         // console.log(" this.props.ipresource", this.props.ipresource.data)
        //  console.log(" this.props.ipresource++++", this.props.ipresource.data.iptype.length)
        //  console.log(" this.props.ipresource++++", iptype.length)
          return(
            <Select
            disabled = {this.state.disabled}
            placeholder={text}
            style={{ width: 120 }}
            onChange = {this.handleSelectPurposeValue} 
            >
            {
              iptype.length && iptype.map(post =>
              <Option key={post.ID} value={post.ID}>{post.iptype}</Option>
            )
          }
          </Select>
          )
        }
    },
     {
        title: '用途',
        dataIndex: 'iptitle',
        width: '15%',
        render: (text, record) => {
          const {ippurpose} = this.props.ipresource.data
         // this.setState({ SelectPurposeValue: record.purposeid });
          return(
            <Select
            disabled = {this.state.disabled}
            placeholder={text}
            style={{ width: 120 }}
            onChange = {this.handleSelectPurposeValue} 
            >
            {
              ippurpose.length && ippurpose.map(post =>
              <Option key={post.ID} value={post.ID}>{post.iptitle}</Option>
            )
          }
          </Select>
          )
        }
    }, {
        title: '掩码',
        dataIndex: 'mask',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'mask'),
    }, {
        title: '状态',
        dataIndex: 'status',
        width: '15%',
        filters: [
          { text: '未使用', value: 1 },
          { text: '已使用', value: 2 },
          { text: '预留', value: 3 },
        ],
        render: (text, record) => {
          const { status } = record
          var divStyle = {
            color: 'red',
          };
          return (
          <div style={divStyle}>
               {status}
          </div>
          )
        }
    },{
      title: '备注',
      dataIndex: 'remarks',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'remarks'),
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
                    <a onClick={() => this.save(record.ID,record.typeid,record.purposeid)}>保存</a>
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
        if (nextProps.ipresource.data) {
            this.setState({
                data: nextProps.ipresource.data.ipresourcelist,
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

      handleCommentChange = (key,e) => {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.ID)[0];
   
        if (target) {
          target.comment = e;
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


      handleSelectTypeValue = (value) => {
        this.setState({
            selectedTypeValue: value,
          });
      }

      handleSelectPurposeValue = (value) => {
        this.setState({
            SelectPurposeValue: value,
          });
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

      save(key,typeid,purposeid) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.ID)[0];

        if (target) {
          delete target.editable
       
          if (typeof this.state.selectedTypeValue === 'undefined') {
            target.typeid    = typeid
          } else {   
            target.typeid    = this.state.selectedTypeValue
          }

          if(typeof this.state.SelectPurposeValue == 'undefined') {
            target.purposeid = purposeid
          } else {
            target.purposeid = this.state.SelectPurposeValue
          }

         // console.log(" this.state.SelectPurposeValue",this.state.SelectPurposeValue)
          
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
        
        target.tag = true;
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
        const { ipresource, loading} = this.props;
        const { selectedRowKeys, totalCallNo } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.handleRowSelectChange,
          getCheckboxProps: record => ({
            disabled: record.disabled,
          }),
        };

        this.cacheData =  this.state.data.map(item => ({ ...item }));           
        return  (
        <div className={styles.standardTable}>
              <Table
                bordered 
                rowSelection={rowSelection}
                rowKey={record => record.ID}
                dataSource={this.state.data} 
                columns={this.columns} 
                onChange={this.handleTableChange}
                />
          </div>)
            
  }
}

export default IpTable;