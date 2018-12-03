import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Button,Select, Icon, Input, Table, notification, message} from 'antd';
import { routerRedux } from 'dva/router';

import TreeTab from '@/components/ProjectTable/treeTab';
import funsocket from '@/utils/socket';

import styles from './modCommon.less';

/*funsocket("gcmdb.fun.tv",{
    onmessage:function(){
        console.log("message:", arguments);
    },
    onerror:function(){
        console.log("error", arguments);
    }
})*/

const openNotificationWithIcon = (type,content) => {
    notification[type]({
        message: '通 知 栏',
        description: content,
    });
};
const openMessage = ( type, content ) =>{
    message[type](content, 2)
}

@connect((state, ownProps) => {
    console.log("***********************connect", state, ownProps)
    console.log(state.gappmanage)
    const { autohostdata } = state.gappmanage;
    return {
        autohostdata:autohostdata,
    }
})



export default class ModReleaseCode extends PureComponent {
    constructor(props) {
        super(props)
        this.sockets = null;
        this.state = {
            selectedKey:[],
            selectedRows: [],
            selectedProjectId:0, //当前projectid
            autohostdata:{},
            filter_type:"all",
            filter_version:"",
            filter_service:"",
            filter_version_default:"abc",
            //过滤项列表
            filters:{
                //服务过滤
                service:[],
                //版本过滤
                version:[]
            },
            ...props
        }
        console.log("*** ModReleaseCode init...props", this.props, this.state)
    }

    componentWillReceiveProps(nextProps) {
        console.log("setAttribute_________", nextProps)

        if( nextProps.selectedProjectId != this.state.selectedProjectId ){
            console.log("changeHost........")
            this.state.selectedProjectId = nextProps.selectedProjectId;
            this.queryHost( nextProps.selectedProjectId );
        }

    }
    componentWillMount() {
        const { dispatch,} = this.props;
        this.queryHost( this.props.selectedProjectId );
    }
    queryHost( projectid ){
        //this.props.onFetchAutoHost( projectid )
        /*
        不太会用，此处会报 Reducers may not dispatch actions
        const {dispatch} = this.props;
        console.log("~~~queryHost:", projectid)
        if( projectid ){
            dispatch({
                type: 'gappmanage/aaa',
                payload: {
                    ID: projectid
                }
            });
        }
        */
        const {dispatch} = this.props;
        let state = this.state;
        state.filters.version = [];
        this.setState( state );
        if( projectid ){
            dispatch({
                type: 'gappmanage/getAutoHostdatabyId',
                payload: {
                    ID: projectid,
                    callback:(data)=>{
                        let state = this.state;
                        state.autohostdata = data;
                        let autohost = data.data ? data.data : [];
                        let task = [];
                        let host = [];
                        for( let i=0;i<autohost.length;i++){
                            let obj = autohost[i];
                            if( obj.task ){
                                for( let j=0;j<obj.task.length;j++){
                                    task.push({
                                        ID:obj.ID,
                                        key:"task_" + obj.task[j],
                                        hostsip: obj.task[j],
                                        msg:"",
                                        status:200,
                                        releaseStatus:''
                                    })
                                }
                            }
                            if( obj.hosts ){
                                for( let j=0;j<obj.hosts.length;j++){
                                    host.push({
                                        ID:obj.ID,
                                        key:"host_" + obj.hosts[j],
                                        hostsip: obj.hosts[j],
                                        msg:"",
                                        status:200,
                                        releaseStatus:''
                                    })
                                }
                            }
                        }
                        state.autohostdata.task = task;
                        state.autohostdata.host = host;
                        state.filters.service = data.data || [];
                        this.setState( state );
                    }
                }
            });

        }

    }

    handlerSocketMessage = ( e) => {
        let data = JSON.parse( e.data );
        console.log("onMessage", data)
        if( data && data.Data ){
            this.updateAutoHostData( data );
        }
    }

    handlerSocketError =( e ) => {
        console.log("onError.")
    }

    handlerSelect = (type, value ,e) =>{
        this.closeSocket();
        let key = `filter_${type}`;
        let state = this.state;
        state[key] = value;
        console.log("option select", state, type);
        this.setState( state );

        const {dispatch} = this.props;
        //服务切换，版本刷新

        if( type == 'service'){
            this.setState({
                filter_version:""
            });
            if( value && !isNaN( Number(value) )){
                dispatch({
                    type: 'gappmanage/getAutoHostVersions',
                    payload: {
                        ID: value,
                        callback:(data)=>{
                            let state = this.state;
                            state.filters.version = data;
                            this.setState( state );
                            console.log("...........",state, data)
                            this.forceUpdate();
                        }
                    },

                });

                console.log("ref=", this.refs);
                //搞不懂, 组件无法刷新
                //this.refs.version.title = "请选择版本";
                //this.refs.version.forceUpdate();
            }
        }
        this.forceUpdate();

    }

    closeSocket = () =>{
        if( this.sockets ){
            try{
                this.sockets.close();
            }catch (e){}
        }
        this.sockets = null;
    }

    handlerSubmit = ( e ) => {
        let self = this;
        if( !this.state.filter_service || !this.state.filter_version ){
            openMessage('error',"请选择服务以及版本信息!~ ~")
            return;
        }
        this.closeSocket();
        this.sockets = funsocket("gcmdb.fun.tv",{
            onmessage:function( e ){
                self.handlerSocketMessage( e );
            },
            onerror:function( e ){
                self.handlerSocketError( e )
            },
            onopen:(e)=>{
                this.props.dispatch({
                    type: 'gappmanage/getReleaseHosts',
                    payload: {
                        active:this.state.filter_type,
                        ID:this.state.filter_version, //服务id
                        APPID:this.state.selectedProjectId,
                        callback:( data )=>{
                            if( data.status != 200 ){
                                openMessage("error","发布出错："+ data.msg +"，CODE：" + data.status );
                            }
                        }
                    },

                });
            }
        })();
    }
    /* 选择选中的行*/
    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    }
    /* 发生分页等事件*/
    handleStandardTableChange = (pagination, filtersArg, sorter) => {

    }

    updateAutoHostData = ( bigData ) =>{
        if( bigData && bigData.Data){
            let skey = bigData.active == "CallBackTask" ? "task_" + bigData.Data.ip : "host_" + bigData.Data.ip;
            let autohost = this.state.autohostdata || { data:[], task:[], host:[] };
            let task = autohost.task;
            let host = autohost.host;
            for( let i=0;i<task.length;i++){
                let key = "task_" + task[i].hostsip;
                if( key == skey ){
                    task[i].msg = bigData.Data.msg || bigData.msg;
                    task[i].releaseStatus = bigData.Data.status || bigData.code;
                }
            }
            for( let i=0;i<host.length;i++){
                let key = "host_" + host[i].hostsip;
                if( key == skey ){
                    host[i].msg = bigData.Data.msg || bigData.msg;
                    host[i].releaseStatus = bigData.Data.status || bigData.code;
                }
            }
            this.state.autohostdata = autohost;
            this.setState( this.state );
            this.forceUpdate();
        }

    }
    ToHostTable = (key) => {
        const { dispatch,} = this.props;
        dispatch(
            routerRedux.push(
                {
                    pathname: '/resource/hardware/host/list',
                    query:{projectid: key}
                }
            ));
    }
    renderColumns(text, record, column){
        return (
            <div>{text}</div>
        );
    }

    render(){
        const {  selectedRows, selectedKey } = this.state;
        const {  loading } = this.props;
        // hostdata由外层connect而来
        console.log("modReleaseCode render", this.state, this.props)
        const { autohostdata } = this.state;
        let hostdata = autohostdata.data ? autohostdata.data:[];
        hostdata = hostdata.filter( (item,i,arr)=>{
            if( this.state.filter_service ){
                if( this.state.filter_service == item.ID ){
                    return item;
                }
            }else{
                return item;
            }
        });
        console.log("hostdata", hostdata)
        let task = autohostdata.task.filter((item)=>{
            return item.ID == this.state.filter_service;
        });
        let host = autohostdata.host.filter((item)=>{
            return item.ID == this.state.filter_service;
        });

        const columns = [
            {
                title: '服务名称',
                dataIndex: 'title',
                key:'title',
                width:'120px',
                render: (text, record) => this.renderColumns(text, record, 'title'),
            },

            {
                title: '任务IP',
                dataIndex: 'task',
                key:'task',
                width:'200px',
                render: (text, record) => {
                    console.log("record", record)
                    const divStyle = {
                        color: 'red',
                        cursor: 'pointer',
                        fontFamily: 'Verdana',
                        WebkitTransition: 'all', // note the capital 'W' here
                        msTransition: 'all' // 'ms' is the only lowercase vendor prefix
                    };
                    return(
                        <span style={divStyle }>
                            {
                                record.task.map(function(hostsip){
                                    return (<div>
                                        <a onClick={() => this.ToHostTable( this.state.selectedProjectId )}>{hostsip}</a>
                                    </div>)
                                })
                            }
                        </span>

                    )
                },
            },
            {
                title: '运行状态',
                dataIndex: 'status',
                key:'status',
                width:'100px',
                render: (text, record) => this.renderColumns(text, record, 'status'),
            },
            {
                title: '发布状态',
                dataIndex: 'msg',
                key: 'msg',
                width:'200px',
                render: (text, record) => {
                    return <div>{text}</div>
                },
            }];

        const columnsip = [
            {
                title: 'IP地址',
                dataIndex: 'hostsip',
                key:'hostsip',
                width:'200px',
                render: (text, record) => {
                    console.log("record", record)
                    const divStyle = {
                        color: 'red',
                        cursor: 'pointer',
                        fontFamily: 'Verdana',
                        WebkitTransition: 'all', // note the capital 'W' here
                        msTransition: 'all' // 'ms' is the only lowercase vendor prefix
                    };
                    return(
                        <span style={divStyle }>
                            {
                                (()=>{
                                    return (<div>
                                        <a onClick={() => this.ToHostTable( this.state.selectedProjectId )}>{record.hostsip}</a>
                                    </div>)
                                })()
                            }
                        </span>

                    )
                },
            },
            {
                title: '发布状态',
                dataIndex: 'msg',
                key: 'msg',
                width:'200px',
                render: (text, record) => {
                    return <div>{text}</div>
                },
            },


            {
                title: '运行状态',
                dataIndex: 'releaseStatus',
                key:'releaseStatus',
                width:'100px',
                render: (text, record) => this.renderColumns(text, record, 'releaseStatus'),
            } ,
            {
                title: '',
                dataIndex: 'releaseStatus',
                key:'status_',
                width:'120px',
                render: (text, record) => {
                    if( !record.releaseStatus ){
                        return '';
                    }
                    if( record.releaseStatus !=200 ){
                        return <Icon type="close-circle" style={{color:"#FF0000"}}></Icon>
                    }
                    return <Icon type="check-circle" style={{color:"#00cc00"}}></Icon>
                },
            }
            ];
        if( ! this.state.selectedProjectId ){
            return (
                <div>请选择左边的子项目</div>
            )
        }
        const filterVersion = [];
        let getFilters = ( arr )=>{
            console.log("renderFilter:", arr)
            arr = arr || [];
            let items = [];
            for (var i = 0; i < arr.length ; i++) {
                items.push(<Select.Option value={arr[i].ID} title={arr[i].title}>{arr[i].title}</Select.Option>);
            }
            return items;
        };
        let renderTable = ()=>{
            if( !this.state.filter_version ){
                return (
                    <Row gutter={24}>
                        <Table
                            loading={loading}
                            rowKey={record => record.ID}
                            dataSource={ hostdata }
                            columns={columns}
                            pagination={false}
                        />
                    </Row>
                )
            }else{
                return (
                    <Row gutter={24}>
                        <Table
                            loading={loading}
                            rowKey={record => record.ID}
                            dataSource={ task }
                            columns={columnsip}
                            pagination={false}
                        />
                        <div style={{marginTop:25,marginBottom:5,fontWeight:'bold',paddingLeft:15}}>服务器更新状态</div>
                        <Table
                            loading={loading}
                            rowKey={record => record.ID}
                            dataSource={ host }
                            columns={columnsip}
                        />
                    </Row>
                )
            }
        }
        return (
            <div>
            <Row gutter={24} style={{"margin-bottom":10}}>
                <Col>
                    <div className={styles.buttonList}>
                    <Select defaultValue="" onSelect={( val )=>{ this.handlerSelect("service", val)}}>
                        <Select.Option value="">所有服务</Select.Option>
                        { getFilters( this.state.filters.service ) }
                    </Select>
                    <Select ref='version' defaultValue="请选择版本" onSelect={( val )=>{ this.handlerSelect("version", val)}}>
                        { getFilters( this.state.filters.version ) }
                    </Select>
                    <Select defaultValue="" onSelect={( val )=>{ this.handlerSelect("type", val)}}>
                        <Select.Option value="">请选择</Select.Option>
                        <Select.Option value="all">all</Select.Option>
                        <Select.Option value="single">single</Select.Option>
                    </Select>

                    <Input.Group>
                        <Button onClick={ this.handlerSubmit}>发布</Button>
                    </Input.Group>
                    </div>
                </Col>
                <Col>

                </Col>
            </Row>
                { renderTable() }
            </div>


        )
    }
}