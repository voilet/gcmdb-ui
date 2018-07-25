import { Table, Row, Col } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styles from './index.less';

class detailsTab extends PureComponent {
  state = {
    data: {},
  };
  columns = [
    {
      title: '详情名字',
      dataIndex: 'name',
      width: '140',
      render: text => {
        return <span>{text}</span>;
      },
    },
    {
      title: '详情内容',
      dataIndex: 'title',
      width: '140',
      render: text => {
        if (typeof text == 'string') {
          return <span>{text}</span>;
        } else {
          return <span>{text.title}</span>;
        }
      },
    },
  ];

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.gdevice.data);
    if (nextProps.gdevice.data) {
      this.setState({
        data: nextProps.gdevice.data,
      });
    }
  }
  tabArrRenderEl(key) {
    const { data } = this.state;
    // 主机名 网卡1 网卡2 网卡3 网卡4 网卡bond 地址，第一块网卡pxe  远控卡ip 硬件厂家 硬件厂商 硬件类型 Cpu 型号 x86_64 and i386 cpu核数 系统版本 硬盘 内存 资产编号 交换机端口 快速服务编号 SN编号 bios 日期 bios 版本 备注说明 系统环境agent版本
    const nameStr =
      '主机名 网卡1 网卡2 网卡3 网卡4 网卡bond 地址,第一块网卡pxe 远控卡ip 硬件厂家 硬件厂商 硬件类型 Cpu型号 x86_64andi386 cpu核数 系统版本 硬盘 内存 资产编号 交换机端口 快速服务编号 SN编号 bios日期 bios版本 备注说明 系统环境 agent版本';
    const nameArr = nameStr.split(' ');
    let dataArr = [];
    for (let key in data) {
      if (!(key == 'created_at' || key == 'updated_at' || key == 'ID')) {
        dataArr.push(data[key]);
      }
    }
    dataArr = dataArr.map((val, ind) => {
      let obj = {};
      obj.ID = ind;
      obj.name = nameArr[ind];
      obj.title = val;

      return obj;
    });
    const tabData = dataArr.slice((key - 1) * 9, key * 9);
    return (
      <Table
        bordered
        rowKey={record => record.ID}
        pagination={false}
        dataSource={tabData}
        columns={this.columns}
      />
    );
  }

  render() {
    return (
      <div className={styles.standardTable}>
        <Row gutter={24}>
          <Col span={8} key={1} style={{ display: 'block' }}>
            {this.tabArrRenderEl(1)}
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            {this.tabArrRenderEl(2)}
          </Col>
          <Col span={8} key={3} style={{ display: 'block' }}>
            {this.tabArrRenderEl(3)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default detailsTab;
