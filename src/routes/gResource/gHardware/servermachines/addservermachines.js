import React, { PureComponent } from 'react';
import styles from './servermachines.less';

import { connect } from 'dva';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  Modal,
  message,
  Row,
  Col,
  Select,
  Switch,
  Divider,
  DatePicker,
} from 'antd';

const { TextArea } = Input;

const Option = Select.Option;

const FormItem = Form.Item;

let uuid = 1;

@Form.create()
export default class Addservermachines extends PureComponent {
  state = {
    modalVisible: false,
    userData: [],
    prolinedata: [],
    progroupbylid: [],
    probygid: [],
    idcData: [],
    cabinetData: [],
    baysData: [],
    hardwareData: [],
    passwordStatus: false,
    dateStatus: false,
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        userData: nextProps.user.data,
      });
    }
    if (nextProps.gproline) {
      this.setState({
        prolinedata: nextProps.gproline.prolinedata,
        progroupbylid: nextProps.gproline.progroupbylid,
        probygid: nextProps.gproline.probygid,
      });
    }
    if (nextProps.gidc.idc.data) {
      this.setState({
        idcData: nextProps.gidc.idc.data,
        cabinetData: nextProps.gidc.cabinet.data == null ? [] : nextProps.gidc.cabinet.data,
        baysData:
          nextProps.gidc.bays.data == undefined || nextProps.gidc.bays.data == null
            ? []
            : nextProps.gidc.bays.data,
      });
    }
    if (nextProps.ghardware) {
      this.setState({
        hardwareData: nextProps.ghardware.data.list,
      });
    }
  }

  HandleAddPlan = e => {
    e.preventDefault();
    const form = this.props.form;
    const { dateStatus, passwordStatus } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        if (!dateStatus) {
          message.error(
            'Please confirm that the maintenance time is greater than the purchase time!'
          );
        } else if (!passwordStatus) {
          message.error('The two input passwords do not match!');
        } else if (dateStatus && passwordStatus) {
          const fields = {
            sn: form.getFieldValue('sn') ? form.getFieldValue('sn') : '',
            ipaddress: form.getFieldValue('ipaddress') ? form.getFieldValue('ipaddress') : '',
            idc_id: form.getFieldValue('idc_id') ? form.getFieldValue('idc_id') : '',
            cabinet_id: form.getFieldValue('cabinet_id') ? form.getFieldValue('cabinet_id') : '',
            plan_id: form.getFieldValue('plan_id') ? form.getFieldValue('plan_id') : '',
            guardblock: form.getFieldValue('guardblock') ? form.getFieldValue('guardblock') : '',
            password: form.getFieldValue('password') ? form.getFieldValue('password') : '',
            start_guaratee: form.getFieldValue('start_guaratee')
              ? form.getFieldValue('start_guaratee')
              : '',
            stop_guaratee: form.getFieldValue('stop_guaratee')
              ? form.getFieldValue('stop_guaratee')
              : '',
            user_id: form.getFieldValue('user_id') ? form.getFieldValue('user_id') : '',
            status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
            bay_id: form.getFieldValue('bay_id') ? form.getFieldValue('bay_id') : '',
            remarks: form.getFieldValue('remarks') ? form.getFieldValue('remarks') : '',
          };

          let project = [];
          for (let i = 0; i < uuid; i++) {
            project.push(
              form.getFieldValue(`probygid${i}`) ? form.getFieldValue(`probygid${i}`) : ''
            );
          }
          fields.project = project;

          this.props.dispatch({
            type: 'gdevice/addHost',
            payload: {
              description: fields,
            },
          });

          message.success('添加成功');

          this.setState({
            modalVisible: false,
          });

          form.resetFields();
        }
      }
    });
  };

  handleProvinceChange = value => {
    this.props.dispatch({
      type: 'gproline/getProjectGroupbyId',
      payload: value,
    });
  };
  handleIdcChange = value => {
    this.props.dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=cabinet&id=${value}`,
    });
  };
  handlecabinetChange(value) {
    this.props.dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=bays&id=${value}`,
    });
  }
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
  passwordBlur() {
    const { form } = this.props;
    const password = form.getFieldValue('password') ? form.getFieldValue('password') : '';
    const surePwd = form.getFieldValue('surePwd') ? form.getFieldValue('surePwd') : '';
    if (password != '' && password != surePwd && surePwd != '') {
      this.setState({
        passwordStatus: false,
      });
      message.error('The two input passwords do not match!');
    } else {
      this.setState({
        passwordStatus: true,
      });
    }
  }

  onprogroupbylidChange = value => {
    this.props.dispatch({
      type: 'gproline/getProjectbyId',
      payload: value,
    });
  };

  addSelect = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  render() {
    const { submitting, form, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {
      prolinedata,
      progroupbylid,
      probygid,
      idcData,
      hardwareData,
      cabinetData,
      baysData,
      userData,
    } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 24 },
        sm: { span: 24, offset: 24 },
      },
    };
    //产品线列表
    const prolineOptions = prolinedata.map(proline => (
      <Option key={proline.ID} value={proline.ID}>
        {proline.title}
      </Option>
    ));
    const progroupOptions = progroupbylid.map(item => (
      <Option key={item.ID} value={item.ID}>
        {item.title}
      </Option>
    ));
    const probygidArr = probygid.map(obj => obj);
    const probygidOptions = probygidArr.map(probygidItem => (
      <Option key={probygidItem.ID} value={probygidItem.ID}>
        {probygidItem.title}
      </Option>
    ));
    //机架机房
    const idcOptions =
      idcData.length == undefined
        ? []
        : idcData.map(item => (
            <Option key={item.ID} value={item.ID}>
              {item.Title}
            </Option>
          ));
    const cabinetOptions =
      cabinetData.length == undefined
        ? []
        : cabinetData.map(item => (
            <Option key={item.ID} value={item.ID}>
              {item.Title}
            </Option>
          ));
    const baysOptions = baysData.map(item => (
      <Option key={item.ID} value={item.ID}>
        {item.Title}
      </Option>
    ));

    //添加
    getFieldDecorator('keys', { initialValue: [0] });
    let keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem label={index == 0 ? '产品线' : ''} key={k}>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`proline${k}`, {
                rules: [
                  {
                    required: true,
                    message: 'Please select productline!',
                  },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 100, marginRight: 30 }}
                  optionFilterProp="children"
                  onChange={this.handleProvinceChange}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {prolineOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator(`progroupbylid${k}`, {
                rules: [
                  {
                    required: true,
                    message: 'Please select progroupbylid!',
                  },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 100, marginRight: 30 }}
                  onChange={this.onprogroupbylidChange}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {progroupOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`probygid${k}`, {
                rules: [
                  {
                    required: true,
                    message: 'Please select probygid!',
                  },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 100, marginRight: 30 }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
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
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <div className={styles.tableListOperator} style={{ float: 'left' }}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
          添加主机
        </Button>

        <Modal
          maskClosable={false}
          wrapClassName={styles.web}
          width="800"
          visible={this.state.modalVisible}
          onOk={this.HandleAddPlan}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <Row>
            <Divider> 主 机 </Divider>
          </Row>

          <Row gutter={24}>
            <Col span={12} key={1} style={{ display: 'block' }}>
              <FormItem label="SN(序列号)">
                {getFieldDecorator(`sn`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter SN (serial number)!',
                    },
                  ],
                })(<Input placeholder="请输入SN序列号" />)}
              </FormItem>
            </Col>

            <Col span={12} key={2} style={{ display: 'block' }}>
              <FormItem label="ip">
                {getFieldDecorator(`ipaddress`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter IP address!',
                    },
                  ],
                })(<Input placeholder="请输入IP" />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12} key={1} style={{ display: 'block' }}>
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
            <Col span={12} key={2} style={{ display: 'block' }}>
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
            <Col span={12} key={1} style={{ display: 'block' }}>
              <FormItem label="套餐">
                {getFieldDecorator(`plan_id`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please select machine final maintenance time!',
                    },
                  ],
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择套餐"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {hardwareData == undefined
                      ? []
                      : hardwareData.map(obj => {
                          return (
                            <Option key={obj.ID} value={obj.ID}>
                              {obj.title}
                            </Option>
                          );
                        })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12} key={2} style={{ display: 'block' }}>
              <FormItem label="容灾">
                {getFieldDecorator(`guardblock`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please input disaster!',
                    },
                  ],
                })(<Input placeholder="请输入容灾" />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12} key={1} style={{ display: 'block' }}>
              <FormItem label="管理员">
                {getFieldDecorator(`user_id`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please select user!',
                    },
                  ],
                })(
                  <Select
                    style={{ width: 200 }}
                    placeholder="请选择管理员"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {userData.map(item => {
                      return (
                        <Option key={item.ID} value={item.ID}>
                          {item.Title}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12} key={2} style={{ display: 'block' }}>
              <FormItem label="机器状态">
                {getFieldDecorator(`status`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please input machineStatus!',
                    },
                  ],
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择机器状态"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="1" value="1">
                      开机
                    </Option>
                    <Option key="0" value="0">
                      关机
                    </Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12} key={1} style={{ display: 'block' }}>
              <FormItem label="机器密码">
                {getFieldDecorator(`password`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter the machine password!',
                    },
                  ],
                })(
                  <Input
                    type="password"
                    placeholder="请输入机器密码"
                    onBlur={this.passwordBlur.bind(this)}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12} key={2} style={{ display: 'block' }}>
              <FormItem label="确认机器密码">
                {getFieldDecorator(`surePwd`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter the confirmation machine password!',
                    },
                  ],
                })(
                  <Input
                    type="password"
                    placeholder="请输入确认机器密码"
                    onBlur={this.passwordBlur.bind(this)}
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} key={1} style={{ display: 'block' }}>
              {formItems}
            </Col>
            <Col span={24} key={2} style={{ display: 'block' }}>
              <Button type="dashed" onClick={this.addSelect} style={{ width: '30%' }}>
                <Icon type="plus" />Select
              </Button>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} key={1} style={{ display: 'block' }}>
              <FormItem label="机房机柜机架选择">
                <Col span={8}>
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
                        style={{ width: 120, marginRight: 40 }}
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
                <Col span={8}>
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
                        style={{ width: 120, marginRight: 40 }}
                        onChange={this.handlecabinetChange.bind(this)}
                      >
                        {cabinetOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem>
                    {getFieldDecorator(`bay_id`, {
                      rules: [
                        {
                          required: true,
                          message: 'Please select Bays!',
                        },
                      ],
                    })(<Select style={{ width: 120, marginRight: 40 }}>{baysOptions}</Select>)}
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
        </Modal>
      </div>
    );
  }
}
