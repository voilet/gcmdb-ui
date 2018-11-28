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
    Button,
    Dropdown,
    Menu,
    Modal,
    Divider
} from 'antd';


import ProjectHost from '@/components/ProjectTable/proHost';

import ResourceAdd from  './ResourceAdd'

import styles from './resourceList.less';


@connect((props) => (props))


export default class forthostList extends PureComponent {
    state = {
        expandForm: false,
        selectedRows: [],
        formValues: {},
        resourcedata:[],
        filters:{
            users:[],
            projects:[],
            authorities:[]
        },
        parentdata:[]
    };

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'gresource/getResourcelist'
        });

        dispatch({
            type: 'gresource/getResourceTreeForparent',
            payload: {
                cb: (val) => {
                    this.setState({
                        parentdata:val.data
                    })
                }
            }
        });
    }



    handleRefreshTableChange = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'gproline/getProjectLine',
            payload: '',
        });
    }


    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    }


    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    }

    /** 下拉框选择 **/
    handleSelect = (type, val )=>{

    }


    render() {

        const {selectedRows,parentdata } = this.state;

        const { gresource,dispatch } = this.props;

        console.log("this.props",this.props)
        // console.log("resourcedata",gresource.parentdata.data ? gresource.parentdata.data : [])

        let getSelectorFilter = ( arr )=>{

        }
        return (
            <Card bordered={false}>
                <div className={styles.tableList}>
                    <Select style={{marginRight:10}}  defaultValue="选择用户" onSelect={( val )=>{ this.handlerSelect("user", val)}}>
                        { getSelectorFilter( this.state.filters.users ) }
                    </Select>
                    <Select style={{marginRight:10}}  defaultValue="选择项目" onSelect={( val )=>{ this.handlerSelect("project", val)}}>
                        { getSelectorFilter( this.state.filters.projects ) }
                    </Select>
                    <Select style={{marginRight:10}}  defaultValue="权限组" onSelect={( val )=>{ this.handlerSelect("authority", val)}}>
                        { getSelectorFilter( this.state.filters.authorities ) }
                    </Select>
                    <Divider> 资源列表 </Divider>

                    <ProjectHost
                        selectedRows={selectedRows}
                        // loading={loading}
                        dispatch = {dispatch}
                        handleSaveData={this.handleSaveData}
                        handleDeleteData={this.handleDeleteData}
                        prolinedata = {[]}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                    />

                </div>
            </Card>

        );
    }
}
