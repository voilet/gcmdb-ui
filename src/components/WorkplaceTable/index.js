import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Icon } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error', 'warning', "info"];
class StandardTable extends PureComponent {
  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }
  render() {
    const { data: { data, pagination }, loading } = this.props;

    const status = ['关闭', '运行中', '已上线', '异常', '装机中', '报废'];

    const columns = [
      {
        title: '主机名',
        dataIndex: 'fqdn',
      },
      {
        title: '网卡1',
        dataIndex: 'eth1',
      },
      {
        title: 'idc',
        dataIndex: 'idc.idc_name',

      },
      {
        title: '机柜',
        dataIndex: 'cabinet',

      },
      {
        title: '位置',
        dataIndex: 'server_cabinet_id',

      },
      {
        title: 'sn',
        dataIndex: 'serialnumber',

      },

      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
          {
            text: status[4],
            value: 4,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },

      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    return (
      <div className={styles.standardTable}>
        <Table
          style={{ margin: 16 }}
          loading={loading}
          rowKey={record => record.ID}
          dataSource={data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
