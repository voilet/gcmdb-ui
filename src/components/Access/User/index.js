import React, {PureComponent, Fragment} from 'react';
import moment from 'moment';
import {Table, Alert, Badge, Divider, Icon, Input, Popconfirm, Select, Switch} from 'antd';
import styles from './index.less';

const {Option} = Select;


const EditableCell = ({editable, value, onChange}) => (
  <div>
    {editable
      ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
      : value
    }
  </div>
);

class UserTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data: [],
    selectedLine: false
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }

    if (nextProps.userdata) {
      this.setState({
        data: nextProps.userdata.map((obj) => {
          if (obj.selectStatus == undefined) {
            obj.selectStatus = true
          }
          return obj;
        })
      })
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({selectedRowKeys, totalCallNo});
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
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

  edit(key) {
    console.log("key", key)

    const newData = [...this.state.data];


    console.log("newData", newData)

    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target.editable = true;
      this.setState({
        data: newData.map((obj) => {
          if (key == obj.ID) {
            obj.selectStatus = false
          }
          return obj;
        }),
      });
    }
  }

  save(key) {


    const newData = [...this.state.data];

    const target = newData.filter(item => key === item.ID)[0];


    if (target) {
      delete target.editable;

      if (typeof(target.role) === "undefined") {
        target.role = target.title_id
      }


      this.setState({data: newData})

      this.props.handleSaveData(target)
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      this.setState({
        data: newData.map((obj) => {
          if (key == obj.ID) {
            obj.selectStatus = true
          }
          return obj;
        }),
      });
    }
  }

  askdelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target.deleteable = true;
      this.setState({data: newData});
    }
  }

  confirmdelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      const index = newData.indexOf(target)
      if (index > -1) {
        newData.splice(index, 1);
      }

      target.tag = false;
      this.setState({data: newData});

      this.cacheData = newData.map(item => ({...item}));
      this.props.handleDeleteData(target)
    }

  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target[column] = value;
      this.setState({
        data: newData,
      });
    }
  }


  handleRoleValue(value, key, column) {

    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target[column] = value;

      this.setState({
        data: newData,
        disabled: false,
      });
    }
  }

  handleSelectLineValue(value, key, column) {
    // console.log(value, key, column)
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target[column] = value;
      target["group_title"] = "请选择";
      target["group_id"] = "-1";

      this.props.dispatch({
        type: 'gproline/getProjectGroupbyId',
        payload: value,
      });

      this.setState({
        data: newData,
        disabled: false,
        selectedLine: true,
      });
    }

  }

  canceldelete(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.deleteable;
      this.setState({data: newData});
    }
  }


  render() {
    const {selectedRowKeys, totalCallNo, data} = this.state;
    const {roledata, userdata} = this.props;


    const columns = [
      {
        title: '用户ID',
        dataIndex: 'ID',
        key: 'ID',
        width: '120px',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: '120px',
        render: (text, record) => this.renderColumns(text, record, 'username'),
      },
      {
        title: '真实姓名',
        dataIndex: 'first_name',
        key: 'first_name',
        width: '120px',
        render: (text, record) => this.renderColumns(text, record, 'first_name'),
      },
      {
        title: '公司邮箱',
        dataIndex: 'email',
        key: 'email',
        width: '120px',
        render: (text, record) => this.renderColumns(text, record, 'email'),
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: '200px',
        render: (text, record) => this.renderColumns(text, record, 'phone'),
      },
      {
        title: '角色',
        dataIndex: 'roleinfos',
        key: 'roleinfos',
        width: '150px',
        render: (text, record) => {

          let roleOptions = <Option value="disabled" disabled>Disabled</Option>

          if (roledata.length > 0) {
            roleOptions = roledata.map(post =>
              <Option key={post.ID} value={post.ID}>{post.title}</Option>
            )
          }
          return (
            <Select
              defaultValue={record.roleinfos}
              disabled={record.selectStatus}
              style={{width: 'auto'}}
              onChange={(value) => {
                this.handleRoleValue(value, record.ID, 'role')
              }}
            >
              {roleOptions}
            </Select>)
        },
      },

      {
        title: '状态',
        dataIndex: 'enable',
        key: 'enable',
        width: '150px',
        render: (text, record) => {
          const {enable} = record;
          return (
            <div>
              <Switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
                checked={enable}
                onChange={(value) => {
                  this.handleChange(value, record.ID, 'enable')
                }}
                disabled={record.selectStatus}
              />
            </div>
          )
        },
      },

      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: '200px',
        render: (text, record) => {
          const {editable, deleteable} = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                  <a onClick={() => this.save(record.ID)}>保存</a>
                    <Divider type="vertical"></Divider>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.ID)} ><a>取消</a></Popconfirm>
                  </span>:<span>
                  <a onClick={() => this.edit(record.ID)}>修改</a>
                    <Divider type="vertical"></Divider>
                  </span>
              }
              {
                !editable ?
                  <span>
                  <Popconfirm title="确定删除?" onConfirm={() => this.confirmdelete(record.ID)}>
                  <a>删除</a>
                  </Popconfirm>
                  <span>
                      <Divider type="vertical"/>
                      <a>查看密码</a>
                  </span>
                  <span>
                      <Divider type="vertical"/>
                      <a>修改密码</a>
                  </span>
                  </span>
                  :
                  <span>
                </span>
              }
            </div>
          );
        },
      }];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      // ...pagination,
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
                已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 个用户&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>取消勾选</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>

        <Table
          // loading={loading}
          rowKey={record => record.ID}
          rowSelection={rowSelection}
          dataSource={userdata}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default UserTable;
