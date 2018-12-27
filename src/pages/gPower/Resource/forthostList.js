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
const InputGroup = Input.Group
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
        selectedProjectInfo:null, //当前选中的项目
        filterIp:"",
        currentHostInfo:{},
        permissionid:-1,//当前选中行的数据权限
       
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
        dispatch({
            type:"guser/fetchSSHRoleList"
        })
        this.queryHosts();
    }




    handleRefreshTableChange = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'gproline/getProjectLine',
            payload: '',
        });
    }


    queryHosts = ( ) =>{
       let params = {
            ip:this.state.filterIp,
            user_id:this.state.selectedUserInfo ? this.state.selectedUserInfo.ID : "",
            project_id:this.state.selectedProjectInfo ? this.state.selectedProjectInfo.ID : ""
       }
       console.log("查询主机", params);
       this.props.dispatch({
            type:"gforthost/searchHost",
            payload:{
                params:params
            }
       })
    }

    getFirstPermssionId = ()=>{
        const { guser } = this.props;
        let Permissions = guser.ssh_role;
        if( Permissions && Permissions.length ){
            return Permissions[0].ID;
        }
        return 0;
    }
    //检查是否选择了主机或者host
    /* 
     *  @param {Object} hostData - 每一行的host数据 
     *  @return {Boolean} 是否选择了
     *  
     */
    checkUserAndHost = ( hostData )=>{
        let { selectedUserInfo  } = this.state;
        let { selectedRows } = this.state;
        let hasUser = true, hasHost = true;
        console.log("checkUserAndHost", selectedUserInfo, selectedRows, hostData)
        if( !selectedUserInfo || !selectedUserInfo.ID ){
            hasUser = false;
        }
        if( !hostData || !hostData.length ){
            if( !selectedRows || !selectedRows.length ){
                hasHost = false;
            }
        }
        
        if( !hasUser ){
            message.error("请选择一个用户");
            return false;
        }
        if( !hasHost ){
            message.error("请选择一个台主机");
            return false;
        }
        return true;
    }

    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
        
    }

    handleSearchIP = ( ip )=>{
        this.state.filterIp = ip;
        this.queryHosts();
    }

    /** 下拉框选择 **/
    handlerSelect = (type, val )=>{
        console.log("val", val)
        const { guser, gforthost, dispatch } = this.props;
        let users = [], projects = [];
        try{
            users = guser.data.data.user_infos || [];
        }catch(e){}
        try{
            projects = gforthost.projectlist.data;
        }catch(e){}
        //this.queryHosts();
        switch( type ){
            case "user":
                let user = users.filter((value)=>{
                    return value.ID == val
                });
                if( user.length ){
                    this.state.selectedUserInfo = user[0];
                }
                break;
            case "project":
                let project = projects.filter((value)=>{
                    return value.ID == val
                });
                if( project.length ){
                    this.state.selectedUserInfo = project[0];                                   
                }
                break;
        }
        this.queryHosts();
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
    handleAuthorizeShow = ( Permissions )=>{
        let { selectedUserInfo  } = this.state;
        let { dispatch } = this.props;
        let isCheckUserHost = this.checkUserAndHost();

        //更新当前选中的权限项
        let selectedRows = this.state.selectedRows;
        if( selectedRows && selectedRows.length == 1){
            this.state.permisionid = selectedRows[0].permisionid
            this.setState({
                permisionid:selectedRows[0].permisionid
            })
            alert(selectedRows[0].permisionid)
        }
        //
        if( !isCheckUserHost ){
            return;
        }else{
            if( this.getFirstPermssionId() ){
                this.setState({
                    permissionid: this.getFirstPermssionId(),
                    modalAuthVisible:true
                })
            }else{
                dispatch({
                    type:"guser/fetchSSHRoleList",
                    payload:{
                        callback:( data )=>{
                            this.setState({
                                permissionid: this.getFirstPermssionId(),
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
    //删除用户的主机权限
    handleAuthorizeDelete = ( rowdatas )=>{        
        let isCheckUserHost = this.checkUserAndHost( rowdatas );
        if( !isCheckUserHost ){
            return;
        }
        let hostData = [];
        if( !rowdatas || !rowdatas.length ){
            hostData = this.state.selectedRows;
        }else{
            hostData = rowdatas.concat();
        }
        let user = this.state.selectedUserInfo;
        let hosts = hostData.map( val => val.id ).join(",");
        console.log("执行删除授权操作",user, hosts, hostData )
        this.props.dispatch({
            type:'guser/deleteSSHPermission',
            payload:{
                params:{
                    ID:user.ID,
                    hosts:hosts 
                },
                callback:()=>{
                    message.success("操作成功")
                    this.handleAuthorizeCancel();
                }
                
            }
        })
    }

    //执行授权操作
    /**
     * @param {Array} [rowdatas=] - 多行数据 
     * @praam {Number} permissionid - 当前权限权id
     */
    handleAuthorize = ( rowdatas, permissionid )=>{
        let isCheckUserHost = this.checkUserAndHost( rowdatas );
        if( !isCheckUserHost ){
            return;
        }
        let hostData = [];
        if( !rowdatas || !rowdatas.length ){
            hostData = this.state.selectedRows;
        }else{
            hostData = rowdatas.concat();
        }
        let user = this.state.selectedUserInfo;
        let hosts = hostData.map( val => val.id ).join(",");
        console.log("执行授权操作", user, hosts, hostData )
        if( ! permissionid ){
            permissionid = this.state.permissionid;
        }
        if( isNaN( permissionid )){
            message.error("更新权限出错，参数异常");
            return
        }
        this.props.dispatch({
            type:'guser/modifySSHPermission',
            payload:{
                params:{
                    ID:user.ID,
                    hosts:hosts,
                    permissionid:permissionid
                },
                callback:()=>{
                    message.success("操作成功")
                    this.handleAuthorizeCancel();
                }
            }
        })
    }
    //权限弹窗口,radiogroup change
    handlePermissionChange = ( e )=>{
        this.state.permissionid = e.target.value;
    }


    render() {

        const {selectedRows,parentdata } = this.state;

        const { gresource, guser, gforthost, dispatch } = this.props;

        let users = [];
        let projects = [];
        let hosts = gforthost.hosts.data || [];
        let username = this.state.selectedUserInfo ? this.state.selectedUserInfo.username:"";
        let Permissions = guser.ssh_role || [];
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
                    <RadioGroup onChange={this.handlePermissionChange} >      
                    {
                        Permissions.map((value)=>{
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
                    <div>
                        <Select 
                            showSearch 
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            style={{marginRight:10,marginBottom:10,width:100,float:"left"}}  
                            defaultValue="选择用户" 
                            onSelect={( val )=>{ this.handlerSelect("user", val)}}>
                            { getSelectorFilter( users, "role" ) }
                        </Select>
                        <Select 
                            showSearch 
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            style={{marginRight:10,marginBottom:10,width:150,float:"left"}} 
                            defaultValue="选择项目" 
                            onSelect={( val )=>{ this.handlerSelect("project", val)}}>
                            { getSelectorFilter( projects, "projects" ) }
                        </Select>
                        <InputGroup compact={false} style={{display:"inline-block",width:"auto",float:"left"}}>
                          <Input.Search
                            placeholder="请输入ip进行模糊搜索"
                            enterButton="搜索"
                            onSearch={ this.handleSearchIP }
                            style={{width: 300}}
                          />
                        </InputGroup>
                    </div>
                    
                    <Divider style={{paddingTop:10}}> 主机列表 </Divider>

                    <ProjectHost
                        selectedRows={selectedRows}
                        // loading={loading}
                        dispatch = {dispatch}
                        handleSaveData={this.handleSaveData}
                        handleDeleteData={this.handleDeleteData}

                        onSelectAuth = { this.handleAuthorize }
                        auths = { Permissions }
                        hostdata = { hosts }
                        option={{
                            "more":{
                                tag:'Button',
                                props:{
                                    type:"button", className:"ant-btn"
                                },
                                onClick:( tabledata, rowdata )=>{
                                    console.log("rowdtaa", rowdata)
                                    this.handleModalInfoShow( rowdata )
                                },
                                childs:"详情"
                            },
                            "auth_delete":{
                                tag:"Button",
                                props:{
                                    type:"button", className:"ant-btn"
                                },
                                onClick:( tabledata, rowdata )=>{
                                    this.handleAuthorizeDelete( [rowdata] );
                                },
                                //是否可见
                                visible:( tabledata, rowdata )=>{
                                    return rowdata.permissionid != -1;
                                },
                                childs:()=>{
                                    return "删除权限"
                                }
                            }
                        }}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                    />

                </div>
                <div>
                    <Button type="primary" disabled={ !isAuthorButtonEnabled }  onClick={() => this.handleAuthorizeShow()}
                    style={{marginRight:10}}
                    >
                      批量授权
                    </Button>

                    <Button type="danger" disabled={ !isAuthorButtonEnabled }  onClick={() => this.handleAuthorizeDelete()}>
                      批量删除授权
                    </Button>
                </div>
            </Card>
            </div>

        );
    }
}
