import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Badge,
  Table,
  Divider,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  InputNumber,
} from 'antd';
import DescriptionList from '../../../../components/DescriptionList';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

import styles from './hostDetail.less';
import moment from 'moment';

const { Description } = DescriptionList;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const projectColumns = [
  {
    title: '项目路径',
    dataIndex: 'title',
    key: 'title',
    // render: (text, record) => {
    //     const dataText = text == undefined ? [] : text
    //     return (
    //       <Select
    //         showSearch
    //         defaultValue={dataText[0]}
    //         style={{ width: 'auto' }}
    //         onChange={(e)=>{this.handSelectChange(e.target.value)}}
    //         disabled={record.selectStatus}
    //       >
    //         {
    //           dataText.map((item,ind)=>{
    //             return (<Option label="projects" key={record.ID+ind} value={item}>{item}</Option>)
    //           })
    //         }
    //       </Select>)
    //   },
  },
  {
    title: '项目状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'true' ? (
        <Badge status="success" text="运行中" />
      ) : (
        <Badge status="error" text="已下线" />
      ),
  },
  {
    title: '负责人',
    dataIndex: 'user',
    key: 'user',
  },
];

let newTabIndex = 0;

@connect(props => props)
@Form.create()
export default class HostDetail extends Component {
  state = {
    activeKey: '-1',
    title: '',
    panes: [],
    headlist: [],
  };

  componentDidMount() {
    //console.log("this.props.location.state+++++++++++",this.props.location.query.id)
    const { dispatch, location, gdevice } = this.props;
    if (location.query !== undefined) {
      dispatch({
        type: 'gdevice/queryHostDetail',
        payload: location.query.id,
      });

      dispatch({
        type: 'gidc/queryIdcRelation',
        payload: `?tag=idc`,
      });

      dispatch({
        type: 'gproline/getProjectLine',
      });

      dispatch({
        type: 'ghardware/queryHardwarePlan',
      });

      dispatch({
        type: 'gdevice/queryUser',
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    const { gdevice } = this.props;
    const { panes, headlist } = this.state;

    console.log('gdevice.hostdetail.props', this.props);

    console.log('gdevice.hostdetail.nextProps', nextProps);

    if (gdevice.hostdetail.data.length) {
      const activeKey = `${gdevice.hostdetail.data[0].detail_id}`;
      const title = gdevice.hostdetail.data[0].fqdn;

      console.log('headlist++++++++++++', headlist);

      if (!this.isInArray(headlist, title)) {
        headlist.push(title);
        panes.push({ information: gdevice.hostdetail.data, key: `${activeKey}`, title: title });
      }
      this.setState({ panes, headlist, activeKey });
    }
  };

  handleIdcChange = value => {
    this.props.dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=cabinet&id=${value}`,
    });

    this.props.form.setFieldsValue({
      cabinet_id: this.props.gidc.cabinet.data.map(post => {
        return post.title;
      }),
    });
  };

  handlecabinetChange = value => {
    this.props.dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=bays&id=${value}`,
    });

    this.props.form.setFieldsValue({
      bay_id: this.props.gidc.bays.data.map(post => {
        return post.title;
      }),
    });
  };

  handleProjectLine = value => {
    this.props.dispatch({
      type: 'gproline/getProjectGroupbyId',
      payload: value,
    });
  };

  handleProjectGroup = value => {
    this.props.dispatch({
      type: 'gproline/getProjectbyId',
      payload: value,
    });
  };

  projectRemove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  isInArray = (arr, value) => {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
  };

  newDateChange(date, dateString) {
    const { form } = this.props;
    const oldDate = new Date(
      form.getFieldValue('stop_guaratee') ? form.getFieldValue('stop_guaratee') : ''
    );
    const dateVal = new Date(dateString);
    if (oldDate != 'Invalid Date' && oldDate - dateVal > 0) {
      this.setState({
        dateStatus: true,
      });
    } else if (oldDate != 'Invalid Date' && oldDate - dateVal < 0) {
      this.setState({
        dateStatus: false,
      });
      message.error('Please confirm that the maintenance time is greater than the purchase time!');
    }
  }
  oldDateChange(date, dateString) {
    const { form } = this.props;
    const newDate = new Date(
      form.getFieldValue('start_guaratee') ? form.getFieldValue('start_guaratee') : ''
    );
    const dateVal = new Date(dateString);
    if (newDate != 'Invalid Date' && dateVal - newDate > 0) {
      this.setState({
        dateStatus: true,
      });
    } else if (newDate != 'Invalid Date' && dateVal - newDate < 0) {
      this.setState({
        dateStatus: false,
      });
      message.error('Please confirm that the maintenance time is greater than the purchase time!');
    }
  }

  tabcontent = (information, projectcolumns) => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { gidc, gproline, gdevice, ghardware } = this.props;
    let cabinetOptions, cabinetValue;

    const idcOptions = this.props.gidc.idc.data.map(post => {
      return (
        <Option key={post.ID} value={post.ID}>
          {post.title}
        </Option>
      );
    });

    if (gidc.cabinet.data.length == 0) {
      cabinetOptions = gidc.cabinet.data.map(post => {
        return (
          <Option key="-1" value="-1">
            请选择
          </Option>
        );
      });
      cabinetValue = '请选择';
    } else {
      cabinetOptions = gidc.cabinet.data.map(post => {
        return (
          <Option key={post.ID} value={post.ID}>
            {post.title}
          </Option>
        );
      });
    }

    const baysOptions = gidc.bays.data.map(item => (
      <Option key={item.ID} value={item.ID}>
        {item.title}
      </Option>
    ));

    const userData = gdevice.user.data.map(item => {
      return (
        <Option key={item.ID} value={item.ID}>
          {item.title}
        </Option>
      );
    });

    const planData = ghardware.composedata.data.list.map(item => {
      return (
        <Option key={item.ID} value={item.ID}>
          {item.title}
        </Option>
      );
    });
    const x = moment('2018-06-07T11:08:45+08:00', dateFormat);
    console.log('++++++++++', x);
    //添加
    getFieldDecorator('keys', { initialValue: [0] });

    let keys = getFieldValue('keys');

    console.log('formItems+++++++++++++++++++', this.props);

    const formItems = keys.map((k, index) => {
      //产品线列表
      const prolineOptions = gproline.prolinedata.data.map(proline => (
        <Option key={proline.ID} value={proline.ID}>
          {proline.title}
        </Option>
      ));

      const progroupOptions = gproline.progroupbylid.map(item => (
        <Option key={item.ID} value={item.ID}>
          {item.title}
        </Option>
      ));

      // const probygidArr = probygid.map(obj => obj);

      const probygidOptions = gproline.probygid.map(probygidItem => (
        <Option key={probygidItem.ID} value={probygidItem.ID}>
          {probygidItem.title}
        </Option>
      ));
      return (
        <FormItem label={index == 0 ? '产品线' : ''} key={k}>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`proline${k}`, {
                rules: [
                  {
                    required: true,
                    message: '请选择产品线!',
                  },
                ],
              })(
                <Select
                  //showSearch
                  style={{ width: 200, marginRight: 40 }}
                  onChange={this.handleProjectLine}
                  //  optionFilterProp="children"
                  //
                  //  filterOption={(input, option) =>
                  //    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  //  }
                >
                  {prolineOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`progroup${k}`, {
                rules: [
                  {
                    required: true,
                    message: '请选择项目组!',
                  },
                ],
              })(
                <Select
                  //showSearch
                  style={{ width: 200, marginRight: 40 }}
                  onChange={this.handleProjectGroup}
                  //  optionFilterProp="children"
                  //  filterOption={(input, option) =>
                  //    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  //  }
                >
                  {progroupOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`project${k}`, {
                rules: [
                  {
                    required: true,
                    message: '请选择项目!',
                  },
                ],
              })(
                <Select
                  //    showSearch
                  style={{ width: 200, marginRight: 40 }}
                  //  optionFilterProp="children"
                  //  filterOption={(input, option) =>
                  //    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  //  }
                >
                  {probygidOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.projectRemove(k)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <Card bordered={false}>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={8}>
              <span>网络信息</span>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="网卡1:" {...formItemLayout}>
                {getFieldDecorator('eth1', {
                  rules: [
                    {
                      required: true,
                      message: '请输入ip地址!',
                    },
                  ],
                  initialValue: `${information.eth1}`,
                })(<Input placeholder={information.eth1} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="网卡2:" {...formItemLayout}>
                {getFieldDecorator('eth2', {
                  rules: [
                    {
                      required: true,
                      message: '请输入ip地址!',
                    },
                  ],
                  initialValue: `${information.eth2}`,
                })(<Input placeholder={information.eth2} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="主机名(fqdn)" {...formItemLayout}>
                {getFieldDecorator('fqdn', {
                  rules: [
                    {
                      required: true,
                      message: '请输入主机名!',
                    },
                  ],
                  initialValue: `${information.fqdn}`,
                })(<Input placeholder={information.fqdn} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="网卡3:" {...formItemLayout}>
                {getFieldDecorator('eth3', { initialValue: `${information.eth3}` })(
                  <Input placeholder={information.eth3} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="网卡4:" {...formItemLayout}>
                {getFieldDecorator('eth4', { rules: [{ initialValue: `${information.eth4}` }] })(
                  <Input placeholder={information.eth4} />
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="远程控制卡IP" {...formItemLayout}>
                {getFieldDecorator('internal_ip', {
                  rules: [{ initialValue: `${information.internal_ip}` }],
                })(<Input placeholder={information.internal_ip} />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="MAC地址: " {...formItemLayout}>
                {getFieldDecorator('mac', { rules: [{ initialValue: `${information.mac}` }] })(
                  <Input placeholder={information.mac} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Divider style={{ marginBottom: 32 }} />

          <Row gutter={24}>
            <Col span={8}>
              <span>硬件信息</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="服务器序列号" {...formItemLayout}>
                {getFieldDecorator('serialnumber', {
                  rules: [
                    {
                      required: true,
                      message: '请输入序列号!',
                    },
                  ],
                  initialValue: `${information.serialnumber}`,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>

            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem label="机器购买时间" {...formItemLayout}>
                {getFieldDecorator(`start_guaratee`, {
                  initialValue: moment('2015/01/01', dateFormat),
                })(<DatePicker format={dateFormat} onChange={this.newDateChange.bind(this)} />)}
              </FormItem>
            </Col>

            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem label="机器最后维保" {...formItemLayout}>
                {getFieldDecorator(`stop_guaratee`, {
                  rules: [
                    {
                      required: true,
                      message: '请选择最后维保日期',
                      initialValue: `${information.stop_guaratee}`,
                    },
                  ],
                })(<DatePicker onChange={this.oldDateChange.bind(this)} />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="服务器生产商" {...formItemLayout}>
                {getFieldDecorator('hardware_vendor', {
                  rules: [{ initialValue: `${information.hardware_vendor}` }],
                })(<Input placeholder={information.hardware_vendor} />)}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="服务器型号" {...formItemLayout}>
                {getFieldDecorator('manufacturer', {
                  rules: [{ initialValue: `${information.manufacturer}` }],
                })(<Input placeholder={information.manufacturer} />)}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="CPU 参数" {...formItemLayout}>
                {getFieldDecorator('cpu_model', {
                  rules: [{ initialValue: `${information.cpu_model}` }],
                })(<Input placeholder={information.cpu_model} />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="CPU架构" {...formItemLayout}>
                {getFieldDecorator('cpuarch', {
                  rules: [{ initialValue: `${information.cpuarch}` }],
                })(<Input placeholder={information.cpuarch} />)}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="CPU核数" {...formItemLayout}>
                {getFieldDecorator('num_cpus', {
                  rules: [{ initialValue: `${information.num_cpus}` }],
                })(<InputNumber placeholder={information.num_cpus} />)}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="硬盘详情" {...formItemLayout}>
                {getFieldDecorator('disk', { rules: [{ initialValue: `${information.disk}` }] })(
                  <Input placeholder={information.disk} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="资产编号" {...formItemLayout}>
                {getFieldDecorator('assets_number', {
                  rules: [{ initialValue: `${information.assets_number}` }],
                })(<Input placeholder={information.assets_number} />)}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="快速服务码" {...formItemLayout}>
                {getFieldDecorator('service_code', {
                  rules: [{ initialValue: `${information.service_code}` }],
                })(<Input placeholder={information.service_code} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="内存详情" {...formItemLayout}>
                {getFieldDecorator('memory', {
                  rules: [{ initialValue: `${information.memory}` }],
                })(<Input placeholder={information.memory} />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="机房选择" {...formItemLayout}>
                {getFieldDecorator(`idc_id`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please select Idc!',
                    },
                  ],
                })(
                  <Select
                    //   showSearch
                    style={{ width: 200, marginRight: 40 }}
                    onChange={this.handleIdcChange}
                    // optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                  >
                    {idcOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="机柜选择" {...formItemLayout}>
                {getFieldDecorator(`cabinet_id`, {
                  initialValue: '请选择',
                  rules: [
                    {
                      required: true,
                      message: 'Please select Cabinet!',
                    },
                  ],
                })(
                  <Select
                    style={{ width: 200, marginRight: 40 }}
                    onChange={this.handlecabinetChange}
                  >
                    {cabinetOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="机架选择" {...formItemLayout}>
                {getFieldDecorator(`bay_id`, {
                  initialValue: '请选择',
                  rules: [
                    {
                      required: true,
                      message: 'Please select Bays!',
                    },
                  ],
                })(<Select style={{ width: 200, marginRight: 40 }}>{baysOptions}</Select>)}
              </FormItem>
            </Col>
          </Row>

          <Divider style={{ marginBottom: 32 }} />

          <Row gutter={24}>
            <Col span={8}>
              <span>软件信息</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="操作系统版本" {...formItemLayout}>
                {getFieldDecorator('os')(
                  <Select placeholder={information.os} style={{ width: '100%' }}>
                    <Option value="1">Centos6.9</Option>
                    <Option value="2">Centos7.2</Option>
                    <Option value="3">Windows2003</Option>
                    <Option value="4">Windows2008</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="bios版本" {...formItemLayout}>
                {information.hardware_vendor}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="agent版本" {...formItemLayout}>
                {information.hardware_vendor}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="套餐信息" {...formItemLayout}>
                {getFieldDecorator('status')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">已上线</Option>
                    <Option value="1">已关机</Option>
                    <Option value="2">运行中</Option>
                    <Option value="3">已下线</Option>
                    <Option value="4">异常</Option>
                    <Option value="5">已过保</Option>
                    <Option value="6">装机中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="密码" {...formItemLayout}>
                *******(请单独修改)
              </FormItem>
            </Col>
          </Row>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>项目信息</div>

          <Table
            rowKey={information.detail_id}
            style={{ marginBottom: 24 }}
            pagination={false}
            //loading={loading}
            dataSource={information.projectlists}
            columns={projectcolumns}
            rowKey="id"
          />

          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  };

  render() {
    // debugger

    const { gdevice, loading } = this.props;

    // if( gdevice.hostdetail.data.length == 0) {
    //   gdevice.hostdetail.data.push(hostdetailInit)
    // }

    // const  information =  gdevice.hostdetail.data[0]

    //console.log("this.prop--------------",gdevice)

    console.log('this.state.panes', this.state.panes);

    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {this.tabcontent(pane.information[0], projectColumns)}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
