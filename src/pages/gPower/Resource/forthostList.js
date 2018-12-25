import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Radio,
    Button,
    Dropdown,
    Menu,
    Modal,
    message,
    Divider
} from 'antd';

const {Option} = Select;
const RadioGroup = Radio.Group;
import ProjectHost from '@/components/ProjectTable/proHost';
import HostDetail from '@/components/Resource/HostTable/HostDetail';
import ResourceAdd from  './ResourceAdd'

import styles from './resourceList.less';


@connect((props) => (props))


export default class forthostList extends PureComponent {
    state = {
        expandForm: false,
        selectedRows: [],
        formValues: {},
        resourcedata:[],

        modalVisible: false, //主机详情是否显示
        modalAuthVisible: false, 

        selectedUserInfo:null, //当前选中的用户

        currentHostInfo:{},
        //过滤条件
        filters:{
        },
        parentdata:[]
    };

    componentDidMount() {
        const {dispatch} = this.props;
        //查询所有用户
        dispatch({
          type: 'guser/fetch',
        });
        dispatch({
            type:'gforthost/getProjects'
        })
    }




    handleRefreshTableChange = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'gproline/getProjectLine',
            payload: '',
        });
    }


    queryHosts = ( ) =>{
        console.log("查询主机");
        return;
        this.props.dispatch({
            type: ''
        })
    }

    getFirstPermssionId = ()=>{
        const { guser } = this.props;
        let permisions = guser.ssh_role;
        if( permisions && permisions.length ){
            return permisions[0].ID;
        }
        return 0;
    }

    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    }

    /** 下拉框选择 **/
    handlerSelect = (type, val )=>{
        console.log("val", val)
        const { guser, dispatch } = this.props;
        let users = [];
        try{
            users = guser.data.data.user_infos || [];
        }catch(e){}
        //this.queryHosts();
        switch( type ){
            case "user":
                let user = users.filter((value)=>{
                    return value.ID == val
                });
                if( user.length ){
                    this.setState({
                        selectedUserInfo: user[0]
                    })                    
                }
                break;
        }
    }

    handleModalInfoHide = ()=>{
        this.setState({
            modalVisible:false
        })
    }
    handleModalInfoShow = ( data )=>{
        console.log("data",data)
        if( data ){
            this.setState({
                currentHostInfo: data,
                modalVisible:true
            })
        }
    }
    handleAuthorizeShow = ( permisions )=>{
        let { selectedUserInfo  } = this.state;
        let { dispatch } = this.props;
        if( !selectedUserInfo || !selectedUserInfo.ID ){
            message.error( "请选择一个用户" );
        }else{
            if( this.getFirstPermssionId() ){
                this.setState({
                    permisionId: this.getFirstPermssionId(),
                    modalAuthVisible:true
                })
            }else{
                dispatch({
                    type:"guser/fetchSSHRoleList",
                    payload:{
                        callback:( data )=>{
                            alert(this.getFirstPermssionId())
                            this.setState({
                                permisionId: this.getFirstPermssionId(),
                                modalAuthVisible:true
                            })
                        }
                    }
                })
            }
        }
    }
    handleAuthorizeCancel = ()=>{
        this.setState({
            modalAuthVisible:false
        })
    }

    //执行授权操作
    handleAuthorize = ()=>{

    }

    handlePermisionChange = ( e )=>{
        this.setState({
            permisionId: e.target.value
        })
    }


    render() {

        const {selectedRows,parentdata } = this.state;

        const { gresource, guser, gforthost, dispatch } = this.props;

        let users = [];
        let projects = [];
        let hosts = gforthost.hosts.data || [];
        let username = this.state.selectedUserInfo ? this.state.selectedUserInfo.username:"";
        let permisions = guser.ssh_role || [];
        try{
            users = guser.data.data.user_infos;
        }catch(e){}
        try{
            projects = gforthost.projectlist.data;
        }catch(e){}
        console.log("ForthostList Render:",this.props)
        let getSelectorFilter = ( arr, type )=>{
            arr = arr || [];
            if( type == "projects"){
                return arr.map(( value )=>( <Select.Option value={ value.ID }>{ value.pro_title } </Select.Option> ))           
            }
            return arr.map(( value )=>( <Select.Option value={ value.ID }>{ value.title || value.username || value.remarks } </Select.Option> ))           
        }
        let isAuthorButtonEnabled = true;
        return (
            <div>
            <Modal
                title= "查看主机详情"
                visible={this.state.modalVisible}
                onOk={()=> this.handleModalInfoHide() }
                width={600}                
                onCancel={() => this.handleModalInfoHide()}
              >
                <HostDetail 
                    info={ this.state.currentHostInfo }
            　　></HostDetail>
            </Modal>
            <Modal
                title = { `修改用户" ${username}"的权限` } 
                visible={ this.state.modalAuthVisible }
                onCancel = { ()=> this.handleAuthorizeCancel() }
                onOk = {()=> this.handleAuthorize() }
            >
                <div>
                    <RadioGroup onChange={this.handlePermisionChange} value={ this.state.permisionId }>      
                    {
                        permisions.map((value)=>{
                            return (
                                <Radio value={ value.ID }>{ value.remarks + "("+value.title + ")" }</Radio>
                            )
                        })
                    }
                    </RadioGroup>
                </div>
            </Modal>
            <Card bordered={false}>
                <div className={styles.tableList}>
                    <Select style={{marginRight:10}}  defaultValue="选择用户" onSelect={( val )=>{ this.handlerSelect("user", val)}}>
                        { getSelectorFilter( users, "role" ) }
                    </Select>
                    <Select style={{marginRight:10}}  defaultValue="选择项目" onSelect={( val )=>{ this.handlerSelect("project", val)}}>
                        { getSelectorFilter( projects, "projects" ) }
                    </Select>
                    
                    <Divider> 资源列表 </Divider>

                    <ProjectHost
                        selectedRows={selectedRows}
                        // loading={loading}
                        dispatch = {dispatch}
                        handleSaveData={this.handleSaveData}
                        handleDeleteData={this.handleDeleteData}
                        hostdata = { hosts }
                        option={{
                            onShowMore:( rowdata )=>{
                                this.handleModalInfoShow( rowdata )
                            }
                        }}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                    />

                </div>
                <div>
                    <Button type="primary" disabled={ !isAuthorButtonEnabled }  onClick={() => this.handleAuthorizeShow()}>
                      对选中的主机进行授权
                    </Button>
                </div>
            </Card>
            </div>

        );
    }
}
