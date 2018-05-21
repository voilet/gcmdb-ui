import { Table, Input, Popconfirm, Alert, Badge, Divider, Icon,Switch,Rate} from 'antd';
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

class IpTable extends PureComponent {
    
     state = {
        data: [],
        status: false,
        disabled: true,
        rateValue: 3
      };

    columns = [{
        title: '运营商名称',
        dataIndex: 'provider_name',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'provider_name'),
    },{
        title: '运营商电话',
        dataIndex: 'phone',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'phone'),
    },
     {
        title: '邮件',
        dataIndex: 'email',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'email'),
    }, {
        title: '备注',
        dataIndex: 'remarks',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'remarks'),
    }, {
        title: '评分',
        dataIndex: 'comment',
        width: '15%',
        render: (text, record) => {
          const {comment} = record 
          //this.setState({ rateValue: comment})
          return (
            <div>
                <Rate 
                allowHalf 
                count= {6}
                value={comment}
                onChange={(e) => this.handleCommentChange(record.ID,e)}
                disabled={this.state.disabled} 
                />
            </div>
            )
        }
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
        if (nextProps.gprovider.data) {
            this.setState({
                data: nextProps.gprovider.data,
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


      // handleTableChange = ( filters, sorter) => {
      //   this.props.onChange( filters, sorter);
      // }

      // handleRowSelectChange = (selectedRowKeys, selectedRows) => {
      //   const totalCallNo = selectedRows.reduce((sum, val) => {
      //     return sum + parseFloat(val.callNo, 10);
      //   }, 0);
    
      //   if (this.props.onSelectRow) {
      //     this.props.onSelectRow(selectedRows);
      //   }
    
      //   this.setState({ selectedRowKeys, totalCallNo });

      //   this.props.handleSelectRows(selectedRowKeys)
      // }

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
        const { gprovider, loading } = this.props;

        
            this.cacheData =  this.state.data.map(item => ({ ...item }));           
            return  (
            <div className={styles.standardTable}>
                 <Table
                    bordered 
                    rowKey={record => record.ID}
                    dataSource={this.state.data} 
                    columns={this.columns} 
                  //  onChange={this.handleTableChange}
                    />;
              </div>)
            
  }
}

export default IpTable;