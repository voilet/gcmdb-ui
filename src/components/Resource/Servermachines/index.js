import {
  Table,
  Input,
  Popconfirm,
  Alert,
  Badge,
  Divider,
  Icon,
  Switch,
  Select,
  Tooltip,
} from 'antd';
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styles from './index.less';
import { stat } from 'fs';

const { Option } = Select;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

class SamePlan extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data: [],
    status: false,
    disabled: true,
  };

  columns = [
    {
      title: 'ip类型',
      dataIndex: 'ipaddress',
      width: '120px',
      key: '1',
      render: (text, record) => this.renderColumns(text, record, 'ipaddress'),
    },
    {
      title: '所在产品线',
      dataIndex: 'projects',
      width: '120px',
      key: '2',
      render: (text, record) => {
        return (
          <Select
            showSearch
            defaultValue={text[0]}
            style={{ width: 'auto' }}
            onChange={e => {
              this.handSelectChange(e.target.value);
            }}
            disabled={record.selectStatus}
          >
            {text.map((item, ind) => {
              return (
                <Option label="projects" key={record.ID + ind} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      title: '所在机柜机架',
      dataIndex: 'idc_title',
      width: '120px',
      key: '3',
      render: (text, record) => this.renderColumns(text, record, 'idc_title'),
    },
    {
      title: '过保状态',
      dataIndex: 'stop_guaratee',
      width: '120px',
      key: '4',
      render: (text, record) => {
        const time = new Date(text) - new Date();
        let statusText = time < 0 ? '过保' : '在保';

        return (
          <Select
            defaultValue={statusText}
            style={{ width: 'auto' }}
            onChange={e => {
              this.handSelectChange(e.target.value);
            }}
            disabled={record.selectStatus}
          >
            <Option key="stop1" value="1">
              在保
            </Option>
            <Option key="stop2" value="0">
              过保
            </Option>
          </Select>
        );
      },
    },
    {
      title: '机器名称',
      dataIndex: 'fqdn',
      width: '120px',
      key: '5',
      render: (text, record) => this.renderColumns(text, record, 'fqdn'),
    },
    {
      title: '机器密码',
      dataIndex: 'password',
      width: '120px',
      key: '6',
      render: (text, record) => {
        return (
          <div>
            <span style={{ marginRight: '10px' }}>{text === true ? '******' : text}</span>
            <span>
              <Tooltip placement="topLeft" title="点击查看密码" arrowPointAtCenter>
                <Icon
                  type="unlock"
                  style={{ fontSize: 16, color: '#08c' }}
                  onClick={() => {
                    this.passwordClick(record.ID);
                  }}
                />
              </Tooltip>
            </span>
          </div>
        );
      },
    },
    {
      title: '套餐',
      dataIndex: 'composeplan_title',
      width: '120px',
      key: '7',
      render: (text, record) => this.renderColumns(text, record, 'composeplan_title'),
    },
    {
      title: '容灾块',
      dataIndex: 'guardblock',
      width: '120px',
      key: '8',
      render: (text, record) => this.renderColumns(text, record, 'guardblock'),
    },
    {
      title: '负责人',
      dataIndex: 'user',
      width: '120px',
      key: '9',
      render: (text, record) => this.renderColumns(text, record, 'user'),
    },
    {
      title: '机器状态',
      dataIndex: 'status',
      width: '120px',
      key: '10',
      render: (text, record) => {
        return (
          <Select
            defaultValue={text == '0' ? '关机' : '开机'}
            style={{ width: 'auto' }}
            onChange={e => {
              this.handSelectChange(e.target.value);
            }}
            disabled={record.selectStatus}
          >
            <Option key="1" value="1">
              开机
            </Option>
            <Option key="0" value="0">
              关机
            </Option>
          </Select>
        );
      },
    },
    {
      title: 'agent状态',
      dataIndex: 'agent_survival',
      width: '120px',
      key: '11',
      render: (text, record) => this.renderColumns(text, record, 'agent_survival'),
    },
    {
      title: '操作',
      dataIndex: 'ID',
      width: '205px',
      fixed: 'right',
      key: 'operation',
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
            {
              <span style={{ marginLeft: 10 }}>
                <a
                  onClick={() => {
                    this.detailClick(record.ID);
                  }}
                >
                  详情
                </a>
              </span>
            }
          </div>
        );
      },
    },
  ];

  componentWillReceiveProps(nextProps) {
    // clean state
    // if (nextProps.selectedRows.length === 0) {
    //   this.setState({
    //     selectedRowKeys: [],
    //     totalCallNo: 0,
    //   });
    // }
    //console.log(nextProps.gdevice)
    if (nextProps.gdevice.host.data) {
      let content = '',
        id = '';
      if (nextProps.gdevice.password.data) {
        content = nextProps.gdevice.password.data.password;
        id = nextProps.gdevice.password.data.ID;
      }
      this.setState({
        data: nextProps.gdevice.host.data.map(obj => {
          let pwd = true;
          if (obj.ID == id) {
            pwd = content;
          }
          obj.password = pwd;
          obj.selectStatus = true;
          return obj;
        }),
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
  renderSelect(text, record, column) {
    return (
      <Select
        defaultValue="lucy"
        style={{ width: 'auto' }}
        onChange={e => {
          this.handSelectChange(e.target.value);
        }}
        disabled={record.selectStatus}
      >
        <Option key={text + 'jack'} value="jack">
          Jack
        </Option>
      </Select>
    );
  }
  handSelectChange = val => {
    console.log(val);
  };
  detailClick(id) {
    console.log(id);
    this.props.tabOnChange(id);
  }
  passwordClick(id) {
    this.props.passwordSeeFn(id);
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
    console.log(filters, sorter);
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
        data: newData.map(obj => {
          if (obj.ID === key) {
            obj.selectStatus = false;
          }
          return obj;
        }),
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
        data: newData.map(obj => {
          if (obj.ID === key) {
            obj.selectStatus = true;
          }
          return obj;
        }),
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
        data: newData.map(obj => {
          if (obj.ID === key) {
            obj.selectStatus = true;
          }
          return obj;
        }),
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
    const paginationMod = {
      total: 0,
      pageSize: 20,
      current: 1,
      showSizeChanger: true,
      showQuickJumper: true,
    };
    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: this.handleRowSelectChange,
    //     getCheckboxProps: record => ({
    //       disabled: record.disabled,
    //     }),
    //   };
    this.cacheData = this.state.data.map(item => ({ ...item }));
    return (
      <div className={styles.standardTable}>
        <Table
          scroll={{ x: 1600 }}
          rowKey={record => record.ID}
          //rowSelection={rowSelection}
          pagination={paginationMod}
          dataSource={this.state.data}
          columns={this.columns}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default SamePlan;
