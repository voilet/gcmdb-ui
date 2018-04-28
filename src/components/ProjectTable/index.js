import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Icon } from 'antd';
import styles from './index.less';
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
    const { prodata, loading } = this.props;

    //debugger

    const columns = [
      {
        title: '项目',
        dataIndex: 'pro_title',
        key:'pro_title'
      },
      {
        title: '项目别名',
        dataIndex: 'pro_alias',
        key:'pro_alias'
      },
      {
        title: '项目组',
        dataIndex: 'group_title',
        key:'group_title'
      },
      {
        title: '产品线',
        dataIndex: 'line_title',
        key:'line_title'
      },
      {
        title: '业务说明',
        dataIndex: 'pro_remarks',
        key:'pro_remarks'
      },
      {
        title: '仓库路径',
        dataIndex: 'pro_code_url',
        key:'pro_code_url'
      },
      {
        title: '排序',
        dataIndex: 'pro_order',
        key:'pro_order'
      },
      {
        title: '状态',
        dataIndex: 'pro_enable',
        key: 'pro_enable',
      },

      {
        title: '操作',
        dataIndex: 'ID',
        key: 'ID',
        render: (val) => (
          <div>
            <a href= {"/#/assets/host/modify/" + val} > 编辑 <Icon type="edit" /></a>
            <Divider type="vertical" />
            <a href= {"/#/assets/host/delete/" + val} > 删除 <Icon type="delete" /></a>
          </div>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...prodata.pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
   // console.log('loading', loading)
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 个项目&nbsp;
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
          dataSource={prodata.data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
