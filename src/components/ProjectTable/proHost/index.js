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

class proLineTable extends PureComponent {
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

        console.log("nextProps.prolinedata.data",nextProps.prolinedata)
        return;
        this.setState({
            data: nextProps.prolinedata.data.map((obj)=>{
                if(obj.selectStatus == undefined){
                    obj.selectStatus=true
                }
                return obj;
            })
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
            this.handleDeleteData(key)
        }

    }

    handleDeleteData = (key) => {
        this.props.dispatch({
            type: 'gproline/deleteProjectLine',
            payload: key
        });
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

    }

    handleSelectLineValue(value, key, column){

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
        const { loading, prolinedata  } = this.props;

        const columns = [
            {
                title: '主机名',
                dataIndex: 'title',
                key:'title',
                width:'120px',
                render: (text, record) => this.renderColumns(text, record, 'alias'),
            },
            {
                title: '主机IP',
                dataIndex: 'hostsip',
                key:'hostsip',
                width:'200px',
                render: (text, record) => this.renderColumns(text, record, 'title'),
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                width: '8%',
                render: (text, record) => {
                    const { created_at } = record;
                    var divStyle = {
                        color: 'red',
                    };
                    return <div style={divStyle}>{created_at.substr(0,10)}</div>;
                },
            }];

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...prolinedata.pagination,
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
                                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>取消勾选</a>
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

export default proLineTable;
