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
} from 'antd';
import DescriptionList from '../../../../components/DescriptionList';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

import styles from './hostDetail.less';

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
    const { getFieldDecorator } = this.props.form;
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
              <FormItem label="远程控制卡IP" {...formItemLayout}>
                {getFieldDecorator('internal_ip')(<Input placeholder={information.internal_ip} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="网卡1:" {...formItemLayout}>
                {information.eth1}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="网卡2:" {...formItemLayout}>
                {information.eth2}
              </FormItem>
              {/* <span> 网卡2: {information.eth2}</span> */}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="网卡3:" {...formItemLayout}>
                {information.eth3}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="网卡4:" {...formItemLayout}>
                {information.eth4}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="主机名(fqdn)" {...formItemLayout}>
                {information.fqdn}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="MAC地址: " {...formItemLayout}>
                {information.mac}
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
                {getFieldDecorator('serialnumber')(
                  <Input placeholder={information.serialnumber} />
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="资产编号" {...formItemLayout}>
                {getFieldDecorator('assets_number')(
                  <Input placeholder={information.assets_number} />
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="快速服务码" {...formItemLayout}>
                {getFieldDecorator('service_code')(
                  <Input placeholder={information.service_code} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="服务器生产商" {...formItemLayout}>
                {information.hardware_vendor}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="服务器型号" {...formItemLayout}>
                {information.manufacturer}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="CPU参数" {...formItemLayout}>
                {information.cpu_model}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="CPU架构" {...formItemLayout}>
                {information.cpuarch}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="CPU核数" {...formItemLayout}>
                {information.num_cpus}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="硬盘详情" {...formItemLayout}>
                {information.disk}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="内存详情" {...formItemLayout}>
                {information.memory}
              </FormItem>
            </Col>

            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem label="机器购买时间" {...formItemLayout}>
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
              <FormItem label="机器最后维保时间" {...formItemLayout}>
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
