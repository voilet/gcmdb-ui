
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Divider
} from 'antd';

import CabTable from '../../../../../components/Resource/Plan';
import PageHeaderLayout from '../../../../../layouts/PageHeaderLayout';
import AddPlan from './addPlan';
import styles from './Plan.less';



const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class Listplan extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ghardware/queryHardwarePlan',
    });

  }

  

  
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
    
  }

  //保存编辑数据
  handleSaveData = (val) => {
    const { 
      title,
      comment,
      cpu_info,
      mem_info,
      power_info,
      disk_info,
      adaptor_info
    } = val
    let params = {
      ID: val.ID,
      cpu_id: cpu_info.newId == undefined ? cpu_info.ID : cpu_info.newId,
      mem_id: mem_info.newId == undefined ? mem_info.ID : mem_info.newId,
      disk_id: disk_info.newId == undefined ? disk_info.ID : disk_info.newId,
      power_id: power_info.newId == undefined ? power_info.ID : power_info.newId,
      adaptor_id: adaptor_info.newId == undefined ? adaptor_info.ID : adaptor_info.newId,
      title,
      comment
    }
    this.props.dispatch({
      type: 'ghardware/modifyHardwarePlan',
      payload: params 
    });
  }
  
  //删除单条数据
  handleDeleteData = (val) => {
    const { ID } = val
    let ids = []
    ids.push(ID)
    this.props.dispatch({
      type: 'ghardware/deleteHardwarePlan',
      payload: {
        tag: false,
        infolist: JSON.stringify({ids})
      }
    });
  }


  render() {
    const { ghardware } = this.props;
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="approval">批量开启</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="套餐列表">
        <Card bordered={false}>
          <div className={styles.tableList}>  
            <div style={{height:40}}>
              <AddPlan
                dispatch = {this.props.dispatch}
                hardwaredata = {ghardware.composedata}
              />
              {
                selectedRows.length > 0 && (
                  <div >
                    <Dropdown overlay={menu} >
                      <Button >
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </div>
                )
              }  
            </div> 
            <Divider>  套餐数据  </Divider>
            <CabTable
              ghardware={ghardware.composedata}
              handleSaveData = {this.handleSaveData}
              handleDeleteData = {this.handleDeleteData}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
