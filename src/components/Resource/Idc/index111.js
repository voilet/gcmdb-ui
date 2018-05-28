import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Icon } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error', 'warning', 'error'];

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
  };

  handleTableChange = (filters, sorter) => {
    this.props.onChange(filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, totalCallNo } = this.state;
    const { gidc, loading } = this.props;

    const columns = [
      {
        title: '机房名称',
        dataIndex: 'idc_name',
      },
      {
        title: '带宽',
        dataIndex: 'band_width',
      },
      {
        title: '地址范围',
        dataIndex: 'ip_range',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
      },
      {
        title: '位置',
        dataIndex: 'addresses',
      },
      {
        title: '别名',
        dataIndex: 'alias',
      },

      {
        title: '操作',
        dataIndex: 'ID',

        render: val => (
          <div>
            <a href={'/#/assets/host/modify/' + val}>
              {' '}
              <Icon type="edit" />
            </a>
            <Divider type="vertical" />
            <a href={'/#/assets/host/delete/' + val}>
              <Icon type="delete" />
            </a>
          </div>
        ),
      },
    ];

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
            message={
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 台&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </div>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.ID}
          rowSelection={rowSelection}
          dataSource={gidc.data}
          columns={columns}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
