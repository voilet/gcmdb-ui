import { Table, Input, Popconfirm, Alert, Badge, Divider, Icon, Switch } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styles from './index.less';
import { stat } from 'fs';

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

class Idc extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data: [],
    status: false,
    disabled: true,
  };

  columns = [
    {
      title: '机房名称',
      dataIndex: 'idc_name',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'idc_name'),
    },
    {
      title: '运营商',
      dataIndex: 'provider_name',
      width: '8%',
      render: (text, record) => {
        const { provider_name } = record;
        var divStyle = {
          color: 'red',
        };
        return <div style={divStyle}>{provider_name}</div>;
      },
    },
    {
      title: '带宽',
      dataIndex: 'band_width',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'band_width'),
    },
    {
      title: '地址范围',
      dataIndex: 'ip_range',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'ip_range'),
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'phone'),
    },
    {
      title: '位置',
      dataIndex: 'address',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    },
    {
      title: '机柜名称',
      dataIndex: 'cabinet_name',
      width: '10%',
      render: (text, record) => {
        const { cabinet_name } = record;
        var divStyle = {
          color: 'red',
        };
        return <div style={divStyle}>{cabinet_name}</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'enable',
      width: '5%',
      render: (text, record) => {
        const { enable } = record;
        return (
          <div>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={enable}
              onChange={e => this.handleStatusChange(record.ID, e)}
              disabled={this.state.disabled}
            />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'ID',
      width: '20%',
      render: (text, record) => {
        const { editable, deleteable } = record;
        return (
          <div className="editable-row-operations">
            {!deleteable &&
              (editable ? (
                <span>
                  <a onClick={() => this.save(record.ID)}>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.ID)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a onClick={() => this.edit(record.ID)}>编辑</a>
                </span>
              ))}
            {!editable &&
              (deleteable ? (
                <span>
                  <Popconfirm title="确定删除?" onConfirm={() => this.confirmdelete(record.ID)}>
                    <a>提交</a>
                  </Popconfirm>
                  <Divider type="vertical" />
                  <a onClick={() => this.canceldelete(record.ID)}>取消</a>
                </span>
              ) : (
                <span style={{ marginLeft: 10 }}>
                  <a onClick={() => this.askdelete(record.ID)}>删除</a>
                </span>
              ))}
          </div>
        );
      },
    },
  ];

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
    if (nextProps.gidc.data) {
      this.setState({
        data: nextProps.gidc.data,
      });
    }
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.ID, column)}
      />
    );
  }

  handleStatusChange = (key, e) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      target.enable = e;
      this.setState({
        data: newData,
      });
    }
    console.log('data', this.state.data);
  };

  handleTableChange = (filters, sorter) => {
    this.props.onChange(filters, sorter);
  };

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, totalCallNo });

    this.props.handleSelectRows(selectedRowKeys);
  };

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target[column] = value;
      this.setState({
        data: newData,
        disabled: false,
      });
    }

    console.log('handleChange', value);
    console.log('handleChange', value);
  }

  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target.editable = true;
      this.setState({
        data: newData,
        disabled: false,
      });
    }
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      target.enable = this.state.status;
      this.setState({
        data: newData,
        disabled: true,
      });
      this.cacheData = newData.map(item => ({ ...item }));
      console.log('target', target);
      this.props.handleSaveData(target);
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.editable;
      this.setState({
        data: newData,
        disabled: true,
      });
    }
  }

  askdelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target.deleteable = true;
      this.setState({ data: newData });
    }
  }

  confirmdelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      const index = newData.indexOf(target);
      if (index > -1) {
        newData.splice(index, 1);
      }

      target.tag = false;
      this.setState({ data: newData });

      this.cacheData = newData.map(item => ({ ...item }));
      this.props.handleDeleteData(target);
    }
  }

  canceldelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.deleteable;
      this.setState({ data: newData });
    }
  }

  render() {
    const { selectedRowKeys, totalCallNo } = this.state;
    const { gidc, loading } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    this.cacheData = this.state.data.map(item => ({ ...item }));
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 台&nbsp;
                {/* {selectedRowKeys.length > 0 && <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>批量删除</a>} */}
              </div>
            }
            type="info"
            showIcon
          />
        </div>

        <Table
          bordered
          rowKey={record => record.ID}
          rowSelection={rowSelection}
          dataSource={this.state.data}
          columns={this.columns}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default Idc;
