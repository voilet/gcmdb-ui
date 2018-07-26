import React, { PureComponent, Fragment } from 'react';
import { routerRedux } from 'dva/router';

import moment from 'moment';
import DescriptionList from '../../DescriptionList';
import {
  Table,
  Alert,
  Badge,
  Divider,
  Icon,
  Input,
  Popconfirm,
  Select,
  Button,
  Modal,
  Form,
  notification,
} from 'antd';
import styles from './index.less';
//import HostDetail from './hostDetail'
import ModifyPw from './ModifyPw';
import ShowPw from './showPw';

const { Option } = Select;
const FormItem = Form.Item;
const { Description } = DescriptionList;

const HostStatusMap = [
  'online',
  'poweroff',
  'processing',
  'offline',
  'outdate',
  'error',
  'installing',
];
const HostStatus = ['已上线', '已关机', '运行中', '已下线', '已过保', '异常', '装机中'];

const AgentStatusMap = ['processing', 'error'];
const AgentStatus = ['运行中', '异常'];

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const openNotificationWithIcon = type => {
  notification[type]({
    message: '错误提示:',
    description: '存在未解除的项目关系,请先解除项目关系',
  });
};

const PasswordForm = Form.create()(props => {
  console.log('props', props);
  const { visible, onCancel, form, data, passwd } = props;
  const { getFieldDecorator } = form;

  return (
    <Modal
      visible={visible}
      title="查看密码"
      okText="确定"
      cancelText="返回"
      onCancel={onCancel}
      onOk={onCancel}
      maskClosable={false}
    >
      <Form layout="vertical">
        <FormItem label="服务器IP地址">
          {data.ipsummary.split(',').map((i, index) => <div style={{ color: 'red' }}> {i}</div>)}
        </FormItem>
        <FormItem label="服务器密码">
          <font size="6" color="blue">
            {passwd.data ? passwd.data.password : '查询失败'}{' '}
          </font>
        </FormItem>
      </Form>
    </Modal>
  );
});

class HostTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
    data: [],
    status: false,
    disabled: true,
    modalVisible: false,
    confirmDirty: false,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }

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

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const currentPw = this.props.form.getFieldValue('password');
    debugger;
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码必须一致');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, totalCallNo });
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  edit(key) {
    const { dispatch, match } = this.props;
    dispatch(
      routerRedux.push({
        pathname: '/resource/hardware/host/edit',
        query: { id: key },
      })
    );
  }

  show(key) {
    const { dispatch, match } = this.props;
    dispatch(
      routerRedux.push({
        pathname: '/resource/hardware/host/detail',
        query: { id: key },
      })
    );
  }

  clean(key) {
    const { dispatch, match } = this.props;
    dispatch(
      routerRedux.push({
        pathname: '/resource/hardware/host/clean',
        query: { id: key },
      })
    );
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      target.enable = this.state.status;
      this.setState({
        data: newData.map(obj => {
          if (key == obj.ID) {
            obj.selectStatus = true;
          }
          return obj;
        }),
        disabled: true,
      });
      this.cacheData = newData.map(item => ({ ...item }));

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
          if (key == obj.ID) {
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
  }

  handleGroupValue(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];

    if (target) {
      target[column] = value.split(',')[0];
      target['group_title'] = value.split(',')[1];

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
      target['group_title'] = '请选择';
      target['group_id'] = '-1';

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
      this.setState({ data: newData });
    }
  }

  handleProlist = value => {
    return value.map(i => (
      <div>
        {i.proline_title}->{i.progroup_title}->{i.project_title}
        <hr />
      </div>
    ));
  };

  passwordClick = (val, password) => {
    this.setState({
      modalVisible: true,
    });

    this.props.dispatch({
      type: 'gdevice/queryHostPassword',
      payload: val,
    });
  };

  handleModalVisible = () => {
    this.setState({
      modalVisible: false,
    });
  };

  onSave = (ID, passwd) => {
    this.props.dispatch({
      type: 'gdevice/modifyHostPassword',
      payload: { id: ID, passwd: passwd },
    });
  };

  ChangePassword = () => {
    this.setState({
      modalVisibleEdit: true,
    });
  };

  deleteHost = hostid => {
    let ids = new Array();
    ids.push(hostid);

    this.props.dispatch({
      type: 'gdevice/deleteHost',
      payload: {
        tag: true,
        infolist: JSON.stringify({ ids }),
      },
    });

    console.log('deleteHost id', ids);
    //console.log("this.props.repsonse",this.props)

    let response = this.props.gdevice.response;

    if (response.status == '200') {
      const newData = [...this.state.data];

      const target = newData.filter(item => ids === item.ID)[0];

      console.log('deleteHost target', target);

      if (target) {
        const index = newData.indexOf(target);
        if (index > -1) {
          newData.splice(index, 1);
        }

        console.log('deleteHost data', newData);
        this.setState({ data: newData });

        //this.cacheData = newData.map(item => ({ ...item }));
      }
    } else {
      openNotificationWithIcon('error');
    }
  };

  render() {
    const { selectedRowKeys, totalCallNo, data } = this.state;
    const { gdevice } = this.props;
    //console.log("this.props",this.props)
    //debugger

    const columns = [
      {
        title: '服务器 ip(网络地址)',
        dataIndex: 'ipsummary',
        key: 'ipsummary',
        width: '150px',
        render: (text, record) => {
          var divStyle = {
            color: 'blue',
          };
          return text.split(',').map((i, index) => <div style={{ color: 'blue' }}> {i}</div>);
        },
      },
      {
        title: '所在产品线',
        dataIndex: 'projectlists',
        key: 'projectlists',
        width: '150px',
        sorter: true,

        render: (text, record) => {
          console.log('所在产品线所在产品线', record);
          var divStyle = {
            color: 'blue',
          };
          return (
            <div style={divStyle}>
              {record.projectlists ? this.handleProlist(record.projectlists) : ''}
            </div>
          );
        },
      },
      {
        title: '所在机柜机架',
        dataIndex: 'idc_title',
        key: 'idc_title',
        width: '120px',
      },
      {
        title: '过保状态',
        dataIndex: 'stop_guaratee',
        key: 'stop_guaratee',
        width: '120px',
        render: (text, record) => {
          const time = new Date(text) - new Date();
          let statusText = time < 0 ? '过保' : '未过保';
          var divStyle = {
            color: 'red',
          };
          return <div style={divStyle}>{statusText}</div>;
        },
      },
      {
        title: '机器名称(fqdn)',
        dataIndex: 'fqdn',
        key: 'fqdn',
        width: '200px',
      },
      {
        title: '机器密码',
        dataIndex: 'password',
        width: '120px',
        key: 'password',
        render: (text, record) => {
          const { password } = this.props.gdevice;
          let pass = password;
          console.log('this.props.gdevice.password', pass);
          // const {ipsummary}   =  this.props.gdevice.host.data.ipsummary
          return (
            <div>
              <ShowPw data={record} />

              {/* <PasswordForm
                ref={form=>{
                  this.passwordForm = this.passwordForm || {};
                  this.passwordForm[record.shiftId] = form;
                }}
                visible={this.state.modalVisible}
                data = {record}
                passwd = {pass}
                onCancel={()=>{
                let modalVisible = this.state.modalVisible;
                modalVisible = false;
                this.setState({modalVisible});
               }} 
               /> */}
            </div>
          );
        },
      },
      {
        title: '套餐',
        dataIndex: 'composeplan_title',
        width: '120px',
        key: 'composeplan_title',
      },
      {
        title: '容灾块',
        dataIndex: 'guardblock',
        width: '120px',
        key: 'guardblock',
      },
      {
        title: '负责人',
        dataIndex: 'user',
        width: '120px',
        key: 'user',
      },
      {
        title: '机器状态',
        dataIndex: 'status',
        width: '120px',
        key: 'status',
        filters: [
          {
            text: HostStatusMap[0],
            value: 0,
          },
          {
            text: HostStatusMap[1],
            value: 1,
          },
          {
            text: HostStatusMap[2],
            value: 2,
          },
          {
            text: HostStatusMap[3],
            value: 3,
          },
          {
            text: HostStatusMap[4],
            value: 4,
          },
          {
            text: HostStatusMap[5],
            value: 5,
          },
          {
            text: HostStatusMap[6],
            value: 6,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={HostStatusMap[val]} text={HostStatus[val]} />;
        },
      },
      {
        title: 'agent',
        dataIndex: 'agent_survival',
        width: '120px',
        key: 'agent_survival',
        filters: [
          {
            text: AgentStatus[0],
            value: 0,
          },
          {
            text: AgentStatus[1],
            value: 1,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={AgentStatusMap[val]} text={AgentStatus[val]} />;
        },
      },
      {
        title: '操作',
        dataIndex: 'ID',
        key: 'ID',
        width: '200px',
        render: (text, record) => {
          const { editable, deleteable } = record;
          return (
            <div className="editable-row-operations">
              <a onClick={() => this.edit(record.ID)}>编辑</a>

              <Divider type="vertical" />
              <a onClick={() => this.show(record.ID)}>详情</a>

              <Divider type="vertical" />
              <a onClick={() => this.clean(record.ID)}>关系</a>

              <Divider type="vertical" />
              {/* <a onClick={() => this.ChangePassword(record.ID)}>修改密码</a> */}
              <ModifyPw data={record} />

              <Divider type="vertical" />

              {
                <Popconfirm title="确定删除?" onConfirm={() => this.deleteHost(record.ID)}>
                  <a>删除</a>
                </Popconfirm>
              }
            </div>
          );
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...gdevice.pagination,
    };

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
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 个主机&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  取消勾选
                </a>
              </div>
            }
            type="info"
            showIcon
          />
        </div>

        <Table
          //loading={loading}
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

export default HostTable;
