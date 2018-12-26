import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Icon, Input, Popconfirm, Select, Switch, Button } from 'antd';
import styles from './index.less';


const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

/**
 * 自持自定义option的表格
 * @author wangxk@fun.tv
 * class proHostTable 

 * OptionElementObject virtual Type ,定义每一个操作选项
 * @typedef {Object} OptionElementObject 
 * @property {String} tag - 操作按纽的标签 
 * @property {Object} [props=null] - 标签的属性列表（不支持onClick属性)
 * @property {Object} [childs=*] -子节点数据,参考:React.createElement
 /
/*
 * @property {Array} hostdata - 设置表格数据
 * @property {Object} option - 配置编辑项 
 * @exmaple
 * {
        more:OptionElementObject{
            tag:"Button",
            childs:"详情"
        }
   }
 * @property {Array} auths - 权限列表
 * @property {Function} onSelectAuth - 修改权限调用，参数( rowdata, permisionid )
*/
class proHostTable extends PureComponent {
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
        this.setState({
            data: nextProps.hostdata.map((obj)=>{
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
        this.props.onChange && this.props.onChange(pagination, filters, sorter);
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
            ></EditableCell>
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



    render() {


        const { selectedRowKeys, totalCallNo, data} = this.state;
        const { loading, hostdata  } = this.props;
        console.log("render....", data, hostdata)
        const columns = [
            {
                title: '主机IP',
                dataIndex: 'ip',
                key:'ip',
                width:'pro',
                render: (text, record) => this.renderColumns(text, record, 'ip'),
            },
            {
                title: 'FQDN',
                dataIndex: 'fqdn',
                key:'fqdn',
                width:'pro',
                render: (text, record) => this.renderColumns(text, record, 'fqdn'),
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                width: 'pro',
                render: (text, record) => {
                    const { created_at } = record;
                    var divStyle = {
                        color: 'red',
                    };
                    return <div style={divStyle}>{created_at.substr(0,10)}</div>;
                },
            },
            {
                title: '权限',
                dataIndex: 'auth',
                width: 'pro',
                render: (text, record) => {
                    let auths = this.props.auths || [];
                    let defaultVal = parseInt(record.permissionid) >0 ? parseInt(record.permissionid) :"修改权限"
                    return (
                        <Select style={{width:100}} defaultValue="修改权限" value={ defaultVal } 
                            onSelect={( val )=>{
                                if( this.props.onSelectAuth ){
                                    this.props.onSelectAuth( [record], val );
                                }
                            }}
                        >
                            { auths.map( (value) => (                                
                                <Select.Option value={value.ID}>{value.title}</Select.Option>
                            ) )}
                        </Select>
                    )
                },
            },
            {
                title: '操作',
                dataIndex: 'option',
                width: '180px',
                render: (text, record) => {
                    let opt = this.props.option;
                    if( opt ){
                        var tpl = [];
                        for(var i in opt ){
                            var option = opt[i];
                            var p = option.props||{}
                            var props = { ...p };
                            props.onClick = function( option ){
                                return function( ){
                                    if( option.onClick ){
                                        option.onClick( data, record );
                                    }  
                                }                                
                            }( option );
                            var childs = [];
                            if( typeof option.childs == "function"){
                                childs = option.childs( data, record );
                            }else{
                                childs = option.childs;
                            }
                            var visible = option.visible ? option.visible( data, record ): true;                    
                            var ele = React.createElement( option.tag, props , childs )
                            if( visible ){
                                tpl.push( ele );
                            }
                            
                        }
                        return <div> { tpl }</div>;
                    }else{
                        return <div></div>
                    }              
                    
                },
            }];

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            //...hostdata.pagination,
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

export default proHostTable;
