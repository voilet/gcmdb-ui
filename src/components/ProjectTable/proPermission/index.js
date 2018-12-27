import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Icon, Input, Popconfirm, Select, Switch, Button, message } from 'antd';
import styles from './index.less';



class proPermissionTable extends PureComponent {
    state = {
        selectedRowKeys: [],
        totalCallNo: 0,
        data:[]
    };

    componentWillReceiveProps(nextProps) {
        // clean state
        

    }

    renderColumns(text, record, column){
        return (
            <div>{text}</div>
        );
    }

   
    handleTableChange = ()=>{

    }
    handleModify = ( record )=>{
        if( !record || !record.ID  ){
            message.error("异常记录,修改失败");
            return;
        }
        if( this.props.onModify ){
            this.props.onModify( record );
        }
    }
    handleDelete = ( record )=>{
        if( !record || !record.ID  ){
            message.error("异常记录,删除失败");
            return;
        }
        if( this.props.onDelete ){
            this.props.onDelete( record );
        }
    }

    render() {


        const { selectedRowKeys, totalCallNo } = this.state;
        const { loading, dataSource } = this.props;
        const columns = [
            {
                title: '权限名',
                dataIndex: 'title',
                key:'title',
                width:'pro',
                render: (text, record) => this.renderColumns(text, record, 'ip'),
            },
            {
                title: '权限别名',
                dataIndex: 'remarks',
                key:'remarks',
                width:'pro',
                className:'xs-hide',
                render: (text, record) => this.renderColumns(text, record, 'fqdn'),
            },
            {
                title: '更新时间',
                dataIndex: 'updated_at',
                key:'updated_at',
                width: 'pro',
                render: (text, record) => {
                    const { updated_at } = record;
                    var divStyle = {
                        color: 'red',
                    };
                    return <div style={divStyle}>{updated_at.substr(0,10)}</div>;
                },
            },            
            {
                title: '操作',
                dataIndex: 'option',
                width: '180px',
                render: (text, record) => {
                    return (
                        <div>
                            <Button onClick={()=> this.handleModify( record )}>修改</Button>
                            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete ( record )}>
                              <Button>删除</Button>
                          </Popconfirm>
                        </div>
                    )                    
                },
            }];

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            //...hostdata.pagination,
        };

        let data = dataSource || [];
        return (
            <div className={styles.standardTable}>                
                <Table
                    loading={loading}
                    rowKey={record => record.ID}
                    dataSource={data}
                    columns={columns}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default proPermissionTable;
