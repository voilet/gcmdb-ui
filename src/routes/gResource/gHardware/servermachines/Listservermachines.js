import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Icon, Tabs, Button, Dropdown, Menu, DatePicker, Divider } from 'antd';

import CabTable from '../../../../components/Resource/Servermachines';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import AddSMC from './addservermachines';
import AlertInfo from './AlertInfo';
import Searchservermachines from './searchServermachines';
import DetailsTab from '../../../../components/Resource/Servermachines/detailsTab';
import styles from './servermachines.less';

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(props => props)
@Form.create()
export default class ListServermachines extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    numId: '1',
    alertStatus: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gproline/getProjectLine',
    });
    dispatch({
      type: 'gdevice/queryHost',
      payload: `?currentPage=${1}&pageSize=${20}`,
    });
    dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=idc&id=1`,
    });
    dispatch({
      type: 'ghardware/queryHardwarePlan',
    });
    dispatch({
      type: 'gdevice/queryUser',
    });
    dispatch({
      type: 'gidc/queryIDC',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    console.log(pagination, filtersArg, sorter);
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
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
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  //编辑
  alertInfoChange(id, val) {
    console.log(id, val);
    this.state({
      alertStatus: val,
    });
  }

  //保存编辑数据
  handleSaveData = val => {
    // this.props.dispatch({
    //   type: 'ghardware/modifyHardwareComponents',
    //   payload: val
    // });
  };

  handleDeleteData = val => {
    console.log(val);
    const { ID } = val;
    let ids = [];
    ids.push(ID);
    this.props.dispatch({
      type: 'gdevice/deleteHost',
      payload: {
        tag: false,
        infolist: JSON.stringify({ ids }),
      },
    });
  };

  tabOnChange(id) {
    this.setState({
      numId: '2',
    });
    this.props.dispatch({
      type: 'gdevice/queryHostDetail',
      payload: id,
    });
  }
  tabClickFn(val) {
    this.setState({
      numId: val,
    });
  }
  passwordSeeFn(val) {
    this.props.dispatch({
      type: 'gdevice/queryHostPassword',
      payload: val,
    });
  }
  render() {
    const { gproline, gdevice, gidc, ghardware } = this.props;
    const { selectedRows, alertStatus } = this.state;

    return (
      <PageHeaderLayout title="主机管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div style={{ height: 40 }}>
              <div style={{ paddingBottom: '20px' }}>
                <Searchservermachines gidc={gidc.idc} />
              </div>
              <AddSMC
                dispatch={this.props.dispatch}
                gproline={gproline}
                gidc={gidc}
                user={gdevice.user}
                ghardware={ghardware.composedata}
              />
            </div>
            <Divider> 主机管理 </Divider>
            <Tabs
              defaultActiveKey={this.state.numId}
              activeKey={this.state.numId}
              onTabClick={val => {
                this.tabClickFn(val);
              }}
              animated={false}
            >
              <TabPane tab="主机列表" key="1">
                <div>
                  <CabTable
                    //selectedRows={selectedRows}
                    //loading={ruleLoading}
                    gdevice={gdevice}
                    tabOnChange={this.tabOnChange.bind(this)}
                    passwordSeeFn={this.passwordSeeFn.bind(this)}
                    handleSaveData={this.handleSaveData}
                    handleDeleteData={this.handleDeleteData}
                    alertInfoChange={this.alertInfoChange.bind(this)}
                    //handleSelectRows={this.handleSelectRows}
                    //onChange={this.handleStandardTableChange}
                  />
                  <AlertInfo alertStatus={alertStatus} />
                </div>
              </TabPane>
              <TabPane tab="详情列表" key="2">
                <DetailsTab gdevice={gdevice.hostdetail} />
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
