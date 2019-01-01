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

import ProPermissionTable from "@/components/ProjectTable/proPermission"
import styles from './resourceList.less';
import ForthostPermissionEditor from './ForthostPermissionEditor';
@connect((props) => (props))


export default class forthostPermissionList extends PureComponent {
    state = {        
        modalVisible: false, //编辑机板是否显示      
        currentPermssion:null, //当前选中行的数据权限
    };

    componentDidMount() {
        const {dispatch} = this.props;
        //查询所有用户
        dispatch({
            type:"guser/fetchSSHRoleList"
        })
    }
    handleEditPermissonShow = ( record )=>{
        this.setState({
            currentPermssion:record,
            modalVisible:true
        })
    }
    handleEditPermissonHide = ()=>{
        this.setState({
            modalVisible:false
        })
    }
    handleEditPermisson = ( record )=>{
        this.props.dispatch({
            type:"gforthost/editForthostPermssionGroup",
            payload:{
                ID:record ? record.ID : "" ,
                field:{
                    title:record.title,
                    remarks:record.remarks,    
                }
                                
            }
        })
        
    }
    handleDeletePermisson = ( record )=>{
        if( !record || !record.ID ){
            message.error("删除失败，找不到ID");
            return;
        }
        this.props.dispatch({
            type:"gforthost/deleteForthostPermssionGroup",
            payload:{
                ID:record.ID ,                                
            }
        })
    }




    render() {
        let { dispatch , guser } = this.props;
        let dataSource = guser.ssh_role || [];
        console.log("forthostPermissionList Render:",this.props)
        console.log("currentPermssion", this.state.currentPermssion)
        return (
            <div>
                
                <ForthostPermissionEditor
                    modalVisible={ this.state.modalVisible }
                    formData={ this.state.currentPermssion }
                    onSubmit = { this.handleEditPermissonHide }
                    onCancel = { this.handleEditPermissonHide }
                >
                </ForthostPermissionEditor>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Button type="primary" icon="plus"  onClick={() => this.handleEditPermissonShow()}>
                            添加权限组
                        </Button>
                        <Divider style={{paddingTop:10}}> 权限组列表 </Divider>
                        <ProPermissionTable
                            dispatch = {dispatch}                    
                            dataSource = { dataSource }                            
                            onDelete = { this.handleDeletePermisson }
                            onModify = { ( record )=>{
                                console.log("show", record)
                                this.handleEditPermissonShow( record );
                            } }
                        ></ProPermissionTable>
                    </div>
                </Card>
                
            </div>

        );
    }
}
