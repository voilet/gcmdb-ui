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

class CpuTab extends PureComponent {
    
     state = {
        data: [],
        tabListData:[],
        status: false,
        disabled: true
      };

    columns = [{
        title: '名称',
        dataIndex: 'title',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'title'),
    }, {
        title: '数量',
        dataIndex: 'num',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'num'),
    }, {
        title: '频率',
        dataIndex: 'mainfrequency',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'mainfrequency'),
    }, {
        title: '核数',
        dataIndex: 'cores',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'cores'),
    },{
        title: '类型',
        dataIndex: 'categorycpuinfo',
        width: '15%',
        render: (text, record) => {
          //this.renderColumns(text.title, record, 'Categorycpuinfo')
          console.log(text)
          const title = text == undefined ? "" : text.title
          return (
            <EditableCell
              editable={record.editable}
              value={title}
              onChange={value => this.handleChange(value, record.ID, column)}
            />
          )
        },
    }, {
        title: '描述',
        dataIndex: 'description',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'description'),
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
        if (nextProps.ghardware.data) {
          //nextProps.ghardware.data
            this.setState({
                data: nextProps.ghardware.data,
                tabListData:nextProps.ghardware.data.list
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


      handleTableChange = ( filters, sorter) => {
        this.props.onChange( filters, sorter);
      }

      handleChange(value, key, column) {
        const newData = [...this.state.tabListData];
        const target = newData.filter(item => key === item.ID)[0];
        
        if (target) {
          target[column] = value;
          this.setState({ tabListData: newData,
            disabled:false
                         });
        }

        console.log('handleChange',value)
        console.log('handleChange',value)
      }

      edit(key) {    
        const newData = [...this.state.tabListData];
        const target = newData.filter(item => key === item.ID)[0];
   
        if (target) {
          target.editable = true;
          this.setState({ 
              tabListData: newData,
              disabled: false
             });
        }
      }

      save(key) {
        const newData = [...this.state.tabListData];
        const target = newData.filter(item => key === item.ID)[0];
        if (target) {
          delete target.editable;
          target.enable = this.state.status
          this.setState({ 
            tabListData: newData,
              disabled: true
             });
          this.cacheData = newData.map(item => ({ ...item }));
          console.log('target',target)
          this.props.handleSaveData(target)
        }
      }
      
      cancel(key) {
        const newData = [...this.state.tabListData];
        const target = newData.filter(item => key === item.ID)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
          delete target.editable;
          this.setState({ 
            tabListData: newData,
            disabled: true
         });
        }
      }

      askdelete(key) {
        const newData = [...this.state.tabListData];
        const target = newData.filter(item => key === item.ID)[0];
   
        if (target) {
          target.deleteable = true;
          this.setState({ tabListData: newData });
        }
      }

      confirmdelete(key) {
        const newData = [...this.state.tabListData];
        const target = newData.filter(item => key === item.ID)[0];
        if (target) {
            const index = newData.indexOf(target)
            if (index > -1) {
            newData.splice(index, 1);
            }
        
        target.tag = false;
        this.setState({ tabListData: newData });

        this.cacheData = newData.map(item => ({ ...item }));   
        this.props.handleDeleteData(target)
        }
       
      }


      canceldelete(key) {
        const newData = [...this.state.tabListData];
        const target = newData.filter(item => key === item.ID)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
          delete target.deleteable;
          this.setState({ tabListData: newData });
        }
      }
      
    render() {
        const { loading } = this.props;
        

            this.cacheData =  this.state.tabListData.map(item => ({ ...item }));           
            return  (
            <div className={styles.standardTable}>
                 <Table
                    bordered 
                    rowKey={record => record.ID}
                    //rowSelection={rowSelection}
                    dataSource={this.state.tabListData} 
                    columns={this.columns} 
                    onChange={this.handleTableChange}
                    />
              </div>)
            
  }
}

export default CpuTab;