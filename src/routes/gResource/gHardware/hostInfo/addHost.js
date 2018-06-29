import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tabs } from 'antd';
import isEqual from 'lodash/isEqual';
import DescriptionList from '../../../../components/DescriptionList';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

import styles from './hostDetail.less';

const { Description } = DescriptionList;
const TabPane = Tabs.TabPane;

const projectColumns = [
  {
    title: '项目路径',
    dataIndex: 'title',
    key: 'title',
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

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

let newTabIndex = 0;

let panes = new Array();
let headlist = new Array();

@connect(props => props)
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
    }
  }

  componentWillReceiveProps = nextProps => {
    const { gdevice } = nextProps;
    //const headlist = gdevice.headlist

    //const panes = gdevice.panes

    console.log('nextProps.gdevice.hostdetail', nextProps.gdevice.hostdetail);
    console.log('nextProps.gdevice.hostdetail', this.props.gdevice.hostdetail);
    console.log('panes', panes);

    if (gdevice.hostdetail.data.length) {
      if (!this.isInArray(headlist, title)) {
        headlist.push(title);
        panes.push({ key: `${activeKey}`, title: title });
      }
      this.setState({ panes, headlist, activeKey });
    }
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
    return (
      <Fragment>
        <Card bordered={false}>
          <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
            <Row gutter={24}>
              <Col span={8}>
                <span>网络信息</span>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="远程控制卡IP" {...formItemLayout}>
                  {getFieldDecorator('internal_ip')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="网卡1:" {...formItemLayout}>
                  {getFieldDecorator('eth1')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="网卡2:" {...formItemLayout}>
                  {getFieldDecorator('eth2')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="网卡3:" {...formItemLayout}>
                  {getFieldDecorator('eth3')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="网卡4:" {...formItemLayout}>
                  {getFieldDecorator('eth4')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="主机名(fqdn)" {...formItemLayout}>
                  {getFieldDecorator('fqdn')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="MAC地址: " {...formItemLayout}>
                  {getFieldDecorator('ma')(<Input placeholder="请输入" />)}
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
                  {getFieldDecorator('serialnumber')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="资产编号" {...formItemLayout}>
                  {getFieldDecorator('assets_number')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="快速服务码" {...formItemLayout}>
                  {getFieldDecorator('service_code')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <FormItem label="服务器生产商" {...formItemLayout}>
                  {getFieldDecorator('hardware_vendor')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="服务器型号" {...formItemLayout}>
                  {getFieldDecorator('manufacturer')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="CPU 参数" {...formItemLayout}>
                  {getFieldDecorator('cpu_model')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <FormItem label="CPU架构" {...formItemLayout}>
                  {getFieldDecorator('cpuarch')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="CPU核数" {...formItemLayout}>
                  {getFieldDecorator('num_cpus')(
                    <InputNumber min={1} max={100} defaultValue={2} />
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="硬盘详情" {...formItemLayout}>
                  {getFieldDecorator('disk')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem label="机器购买时间">
                  {getFieldDecorator(`start_guaratee`, {
                    rules: [
                      {
                        required: true,
                        message: 'Please select machine purchase date!',
                      },
                    ],
                  })(<DatePicker onChange={this.newDateChange.bind(this)} />)}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem label="机器最后维保">
                  {getFieldDecorator(`stop_guaratee`, {
                    rules: [
                      {
                        required: true,
                        message: 'Please select machine final maintenance time!',
                      },
                    ],
                  })(<DatePicker onChange={this.oldDateChange.bind(this)} />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24} key={1} style={{ display: 'block' }}>
                <FormItem label="机房机柜机架选择">
                  <Col span={7}>
                    <FormItem>
                      {getFieldDecorator(`idc_id`, {
                        rules: [
                          {
                            required: true,
                            message: 'Please select Idc!',
                          },
                        ],
                      })(
                        <Select
                          showSearch
                          style={{ width: 200, marginRight: 40 }}
                          onChange={this.handleIdcChange}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {idcOptions}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={7}>
                    <FormItem>
                      {getFieldDecorator(`cabinet_id`, {
                        rules: [
                          {
                            required: true,
                            message: 'Please select Cabinet!',
                          },
                        ],
                      })(
                        <Select
                          style={{ width: 200, marginRight: 40 }}
                          onChange={this.handlecabinetChange.bind(this)}
                        >
                          {cabinetOptions}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={7}>
                    <FormItem>
                      {getFieldDecorator(`bay_id`, {
                        rules: [
                          {
                            required: true,
                            message: 'Please select Bays!',
                          },
                        ],
                      })(<Select style={{ width: 200, marginRight: 40 }}>{baysOptions}</Select>)}
                    </FormItem>
                  </Col>
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col>
                <FormItem label="备注">
                  {getFieldDecorator('remarks')(
                    <TextArea style={{ minHeight: 32 }} placeholder="备注描述" rows={4} />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <FormItem label="内存详情" {...formItemLayout}>
                  {getFieldDecorator('memory')(<Input placeholder="请输入" />)}
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
                    <Select placeholder="请选择" style={{ width: '100%' }}>
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
                  {getFieldDecorator('memory')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="agent版本" {...formItemLayout}>
                  {getFieldDecorator('memory')(<Input placeholder="请输入" />)}
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
                  {getFieldDecorator('memory')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>

            <Divider style={{ marginBottom: 32 }} />
            <div className={styles.title}>项目信息</div>

            <Row gutter={24}>
              <Col span={24} key={1} style={{ display: 'block' }}>
                {formItems}
              </Col>
              <Col span={24} key={2} style={{ display: 'block' }}>
                <Button type="dashed" onClick={this.addSelect} style={{ width: '15%' }}>
                  <Icon type="plus" /> Select
                </Button>
              </Col>
            </Row>

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
      </Fragment>
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

    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    console.log('panes', panes);

    panes.map(function(value, index, array) {
      if (value.key == targetKey) {
        console.log('value.information[0].fqdn', value.information[0].fqdn);

        headlist.remove(value.information[0].fqdn);

        console.log('headlist', headlist);
      }
    });

    panes = panes.filter(pane => pane.key !== targetKey);
    // gdevice.panes =  panes

    //pane = panes.filter(pane => pane.key !== targetKey)
    console.log('panespanespanespanespanes1', headlist);
    //console.log("this.props.panespanespanespanespanes1",.panes)

    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }

    this.setState({ panes, headlist, activeKey });
  };

  render() {
    // debugger

    const { gdevice, loading } = this.props;

    return (
      <Card bordered={false}>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              {this.tabcontent(projectColumns)}
            </TabPane>
          ))}
        </Tabs>
      </Card>
    );
  }
}
