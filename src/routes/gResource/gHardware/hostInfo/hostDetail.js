import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tabs } from 'antd';
import isEqual from 'lodash/isEqual';
import DescriptionList from '../../../../components/DescriptionList';
 

import styles from './hostDetail.less';

const { Description } = DescriptionList;
const TabPane = Tabs.TabPane;


const projectColumns = [
  {
    title: '产品线',
    dataIndex: 'proline_title',
    key: 'proline_title',
    width:'120px',
  },
  {
    title: '项目组',
    dataIndex: 'progroup_title',
    key: 'progroup_title',
    width:'120px',
  },
  {
    title: '项目',
    dataIndex: 'project_title',
    key: 'project_title',
    width:'120px',
  },
  {
    title: '项目状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'true' ? (
        <Badge status="success" text="运行中" />
      ) : (
          <Badge status="error" text="已下线" />
        ),
  },
  {
    title: '负责人',
    dataIndex: 'user',
    key: 'user',
  },
];


Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}



let newTabIndex = 0

let panes = new Array()
let headlist = new Array()

@connect((props) => (props))

export default class HostDetail extends Component {

  state = {
    activeKey: '-1',
    title: "",
    panes: [],
    headlist: [],
    dateStatus: true,
    cabinetData:[],
    idcData:[],
    BaysData:[],
    projectlist:[],
    hostid: 0,
  };


  componentDidMount() {

    //console.log("this.props.location.state+++++++++++",this.props.location.query.id)
    const { dispatch, location } = this.props;
    const {headlist,panes} = this.state

    if(panes && panes.length > 0) {
      this.setState({
        panes,
        activeKey: panes[0].key,
      })
    }
    
    if (location.hasOwnProperty('query')) {
      dispatch({
        type: 'gdevice/queryHostDetail',
        payload: {
          id: location.query.id,
          cb: (data) => {
            
       
            
            if (Object.keys(data).length !== 0) {

              const activeKey = `${data.detail_id}`
              const title = data.fqdn
      
              if (!this.isInArray(headlist, title)) {
                headlist.push(title)
                panes.push({ information: data, key: `${activeKey}`, title: title });
              }
      
              this.setState({ 
                panes, 
                headlist, 
                activeKey,
                projectlist: data.projectlists,
                hostid: this.props.location.query.id
               });
            }
          }
        },
      });

    } 
  }


  componentWillUnmount = 　() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'gdevice/empty',
    });
  }


  isInArray = (arr, value) => {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
  }

  tabcontent = (information, projectcolumns) => {
    return (
      <Fragment>
        <DescriptionList size="large" title="主机状态信息" style={{ marginBottom: 32 }}>
          <Description term="主机状态">{information.status_title}</Description>
        </DescriptionList>

        <DescriptionList size="large" title="网络详情" style={{ marginBottom: 32 }}>
          <Description term="网卡1">{information.eth1}</Description>
          <Description term="网卡2">{information.eth2}</Description>
          <Description term="网卡3">{information.eth3}</Description>
          <Description term="网卡4">{information.eth4}</Description>
          <Description term="主机名(fqdn)">{information.fqdn}</Description>
          <Description term="MAC地址">{information.mac}</Description>
          <Description term="远程控制卡IP">{information.internal_ip}</Description>
          <Description term="所在交换机端口">{information.switch_port}</Description>
        </DescriptionList>


        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="硬件信息" style={{ marginBottom: 32 }}>
          <Description term="服务器序列号">{information.serialnumber}</Description>
          <Description term="所在机房">{information.idc_title+"/"+information.cabinet_title+"/"+information.bays_title}</Description>
          <Description term="机器购买时间">{information.start_guaratee}</Description>
          <Description term="机器最后维保时间">{information.stop_guaratee}</Description>
          <Description term="资产编号">{information.assets_number}</Description>
          <Description term="快速服务码">{information.service_code}</Description>
          <Description term="服务器生产商">{information.hardware_vendor}</Description>
          <Description term="服务器型号">{information.manufacturer}</Description>
          <Description term="CPU参数">{information.cpu_model}</Description>
          <Description term="CPU架构">{information.cpuarch}</Description>
          <Description term="CPU核数">{information.num_cpus}</Description>
          <Description term="硬盘详情">{information.disk}</Description>
          <Description term="内存详情">{information.memory}</Description>
        </DescriptionList>

        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="软件信息" style={{ marginBottom: 32 }}>
          <Description term="操作系统版本">{information.osrelease}</Description>
          <Description term="bios版本">{information.biosversion}</Description>
          <Description term="agent版本">{information.agent_version}</Description>
          <Description term="套餐信息">{information.composeplan}</Description>
        </DescriptionList>


        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="权限信息" style={{ marginBottom: 32 }}>
          <Description term="机器管理员">{information.user}</Description>
          <Description term="密码">*******(请单独查看)</Description>
        </DescriptionList>

        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>项目信息</div>


        <Table
          rowKey={information.detail_id}
          style={{ marginBottom: 24 }}
          pagination={false}
          //loading={loading}
          dataSource={information.projectlists}
          columns={projectcolumns}
          rowKey="id"
        />
      </Fragment>
    )
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }



  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;


    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    panes.map(function (value, index, array) {
      if (value.key == targetKey) {
        headlist.remove(value.information[0].fqdn)
      }
    })

    panes = panes.filter(pane => pane.key !== targetKey);
    // gdevice.panes =  panes

    //pane = panes.filter(pane => pane.key !== targetKey)
    console.log("panespanespanespanespanes1", headlist)
    //console.log("this.props.panespanespanespanespanes1",.panes)

    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }

    this.setState({ panes, headlist, activeKey });

  }

  render() {
    // debugger

    const { gdevice, loading } = this.props;


    return (
      <Card bordered={false}>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >

          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{this.tabcontent(pane.information, projectColumns)}</TabPane>)}

        </Tabs>
      </Card>
    );
  }
}
