
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Tabs,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  message,
  Divider
} from 'antd';

import CabTable from '../../../../components/Resource/Servermachines';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import AddSMC from './addservermachines'
import DetailsTab from '../../../../components/Resource/Servermachines/detailsTab'
import styles from './servermachines.less'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class ListServermachines extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    numId:'1'
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gproline/getProjectLine',  
    });
    dispatch({
      type: 'gdevice/queryHost',  
      payload:`?currentPage=${1}&pageSize=${20}`
    });
    dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=idc&id=1`
    });
    dispatch({
      type: 'ghardware/queryHardwarePlan'
    })
    dispatch({
      type:'gdevice/queryUser'
    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;
    console.log(pagination, filtersArg, sorter)
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    // dispatch({
    //   type: 'ghardware/queryHardwareComponents',
    //   payload:`cpu`
    // });
  }

  
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
    
  }



  //保存编辑数据
  handleSaveData = (val) => {
    // this.props.dispatch({
    //   type: 'ghardware/modifyHardwareComponents',
    //   payload: val 
    // });
  }
  
  //删除单条数据
//   handleDeleteData = (val) => {

//     console.log(val)
//     this.props.dispatch({
//       type: 'gdevice/deleteHost',
//       payload: val 
//     });
// }
handleDeleteData = (val) => {
  console.log(val)
  const { ID } = val
  //false是逻辑删除  true是物理删除
  // infolist:{"componentname": "cpu", "ids": [1, 2]}
  let obj = {},ids=[]
  ids.push(ID)
  obj.ids=ids
  this.props.dispatch({
    type: 'gdevice/deleteHost',
    payload: {
      tag:false,
      infolist:JSON.stringify(obj)
    }
  });
}


//批量开启机房 
// handleOpenAllstatus = (val) => {

// }

// handleMenuClick = (val) => {
//    if (val.key == "approval") {
       
//    } 
// }
  tabOnChange(id){
    console.log(id)
    this.setState({
      numId:'2'
    })
    this.props.dispatch({
      type: 'gdevice/queryHostDetail',
      payload: id
    })
  }
  tabClickFn(val){
    this.setState({
      numId:val
    })
  }
  passwordSeeFn(val){
    this.props.dispatch({
      type: 'gdevice/queryHostPassword',
      payload: val
    })
  }
  render() {
    const { gproline, gdevice, gidc, ghardware } = this.props;
    const {selectedRows} = this.state;
    //console.log(gdevice)
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="approval">批量开启</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="主机管理">
      <Card bordered={true}>
        <div className={styles.tableList}>  
        <div>search查询管理 待定</div>
        </div>
      </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>  
          <div style={{height:40}}>
            <AddSMC
              dispatch = {this.props.dispatch}
              gproline = {gproline}
              gidc = {gidc}
              user={gdevice.user}
              ghardware = {ghardware.composedata}
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
          <Divider>  主机管理  </Divider>
          <Tabs 
            defaultActiveKey={this.state.numId} 
            activeKey={this.state.numId}
            onTabClick={(val)=>{this.tabClickFn(val)}}
            animated={false}
          >
            <TabPane tab="主机列表" key="1">
              <CabTable
                selectedRows={selectedRows}
                //loading={ruleLoading}
                gdevice={gdevice}
                tabOnChange={this.tabOnChange.bind(this)}
                passwordSeeFn={this.passwordSeeFn.bind(this)}
                handleSaveData = {this.handleSaveData}
                handleDeleteData = {this.handleDeleteData}
                handleSelectRows={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </TabPane>
            <TabPane tab="详情列表" key="2">
              <DetailsTab 
                gdevice={gdevice.hostdetail}
              />
            </TabPane>
          </Tabs>

            
        </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
