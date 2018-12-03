import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Button,Select, Input} from 'antd';

import TreeTab from '@/components/ProjectTable/treeTab';
export default class ModHostList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedKey:[],
            selectedRows: [],
            ...props
        }
        console.log("*** ModHostList init...", this.props, this.state)

    }



    componentWillReceiveProps(nextProps) {
        console.log("ModHostList receiveProps", nextProps)
        this.setState({
            ...this.state, ...nextProps
        })
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

    render(){
        const {  selectedRows, selectedKey } = this.state;
        // hostdata由外层connect而来
        let hostdata = this.state.hostdata ? this.state.hostdata.data : [];
        console.log("!!!!!!!!!Rende ModHostListr", hostdata);
        return (

            <div key="1">
                <Row gutter={24}>
                    <TreeTab
                        selectedKey={selectedKey}
                        treeTabdata = { hostdata }
                        selectedRows={selectedRows}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                        //下面这个不知道干嘛
                        dispatch = {this.props.dispatch}
                    />
                </Row>
            </div>


        )
    }
}