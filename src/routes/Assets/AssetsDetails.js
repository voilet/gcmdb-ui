import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import pathToRegexp from 'path-to-regexp';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './AdvancedProfile.less';


const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const status = ['关闭', '运行中', '已上线', '异常', '装机中', '报废'];
const statusMap = ['default', 'processing', 'success', 'error', 'warning', "error"];


@connect(state => ({
  profile: state.profile,
}))

export default class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchDetails',
      payload: this.props.match.params.id,
    });
  }


  render() {
    const { stepDirection } = this.state;
    const { profile: { data } } = this.props;
    // console.warn(data);
    const action = (
      <div>
        <ButtonGroup>
          <a href="/#/assets/host/list/"><Button>资产列表</Button></a>
        </ButtonGroup>
        <a href={"/#/assets/host/modify/" + this.props.match.params.id} ><Button type="primary">修改</Button></a>
      </div>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="3">
        <Description term="网卡1">{data.eth1}</Description>
        <Description term="MAC">{data.mac}</Description>
        <Description term="远控">{data.internal_ip}</Description>
        <Description term="SN">{data.serialnumber}</Description>
        <Description term="快速服务编码">{data.service_code}</Description>
        <Description term="资产编号">{data.asset_number}</Description>
        <Description term="机器位置">{data.cabinet} - {data.server_cabinet_id}</Description>
        <Description term="交换机端口">{data.switch_port}</Description>
        <Description term="状态"><Badge status={statusMap[data.status]} text={status[data.status]} /></Description>
      </DescriptionList>
    );

    return (

      <PageHeaderLayout
        title={"主机名: " + data.fqdn }
        // logo={<img alt="" src="http://www.shejiye.com/uploadfile/icon/2017/0203/shejiyeicon1wc2fh5otzm.png" />}
        action={action}
        content={description}
        // extraContent={extra}
      >
        <Card title="基础信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }} col="4">

            <Description term="购买时间">{moment(data.start_guaratee).format('YYYY-MM-DD')}</Description>
            <Description term="保修时间">{moment(data.stop_guaratee).format('YYYY-MM-DD')}</Description>

            <Description term="备注">{data.remarks}</Description>
          </DescriptionList>

          <DescriptionList size="small" style={{ marginBottom: 16 }} title="机房信息" col="4" >
            <Description term="IDC">{data.idc.idc_name}</Description>
            <Description term="机房别名">{data.idc.alias}</Description>
            <Description term="机房带宽">{data.idc.band_width}</Description>
            <Description term="机房电话">{data.idc.phone}</Description>
            <Description term="ip段">{data.idc.ip_range}</Description>
            <Description term="机房地址">{data.idc.address}</Description>
            <Description term="机房备注信息">{data.idc.remarks}</Description>
          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList size="small" style={{ marginBottom: 16 }}>
            <Description term="硬件厂商">{data.hardware_vendor.title}</Description>
            <Description term="硬件类型">{data.hardware_type.title}</Description>
            <Description term="环境">{data.env.title}</Description>

          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList size="small" style={{ marginBottom: 16 }} title="CPU/内存/硬盘" col="4">
            <Description term="CPU">{data.cpu_model}</Description>
            <Description term="内存">{data.memory}</Description>
            <Description term="硬盘">{data.disk}</Description>
            <Description term="CPU核数">{data.num_cpus}</Description>
          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList size="small" title="系统信息">
            <Description term="系统">{data.os.title}</Description>
            <Description term="x86_64">{data.cpuarch}</Description>
            <Description term="系统版本">{data.osrelease}</Description>
          </DescriptionList>

          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList size="small" title="主板信息">
            <Description term="biosreleasedate">{data.biosreleasedate}</Description>
            <Description term="biosversion">{data.biosversion}</Description>
            <Description term="raid">{data.raid}</Description>
          </DescriptionList>
        </Card>
        <Card title="修改记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />暂无数据
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
