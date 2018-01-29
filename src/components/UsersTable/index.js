import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Icon } from 'antd';
import styles from './index.less';
const statusMap = ['default', 'processing', 'success', 'error', 'warning', "error"];


class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, totalCallNo });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys, totalCallNo } = this.state;
    const { data: { data, pagination }, loading } = this.props;
    const status = ['禁用', '启用'];
    const columns = [
      {
        title: '姓名',
        dataIndex: 'nick_name',
      },
      {
        title: '用户组',
        key: 'user_group',
        render: (json, record) => (
          <span>
            {record.title}
          </span>
        ),
      },
      {
        title: '权限组',
        dataIndex: 'user_auth_group',

      },
      {
        title: '状态',
        dataIndex: 'enable',
        filters: [
          {
            text: '启用',
            value: true,
          },
          {
            text: '禁用',
            value: false,
          },
        ],
        render(val) {
          // alert(val);
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '邮箱',
        dataIndex: 'email',

      },
      {
        title: '头像',
        dataIndex: 'avatar',

      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 台&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.ID}
          rowSelection={rowSelection}
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
