import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tabs, Button, Form, Row, Col, Input, Select, InputNumber, DatePicker, Icon, message } from 'antd';
import isEqual from 'lodash/isEqual';
import DescriptionList from '../../../../components/DescriptionList';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

import styles from './hostDetail.less';
import { deepEqual } from 'assert';


const { Description } = DescriptionList;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};



Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}

//const panes = [];

let newTabIndex = 0
let uuid = 1;


@connect((props) => (props))
@Form.create()

export default class HostDetail extends Component {

 

  state = {
    activeKey: "",
    title: "",
    panes:[],
    headlist: [],
    idcdata: [],
    confirmDirty: false,
    autoCompleteResult: [],
   // idcdata:[{title:"请选择",ID:"-1"}],
  };

  

  componentDidMount() {
    //console.log("this.props.location.state+++++++++++",this.props.location.query.id)
    const { dispatch, location, gdevice } = this.props;
    const idcdata = this.state.idcdata
  
 
   

    dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=idc`
    })
 
    dispatch({
      type: 'gproline/getProjectLine',
    })

    dispatch({
      type: 'ghardware/queryHardwarePlan'
    })

    dispatch({
      type:'gdevice/queryUser'
    })
    
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
      message.error('最后维保时间必须大于购买时间!');
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
      message.error('最后维保时间必须大于购买时间');
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      this.setState({
        passwordStatus: false,
      });
      callback('两次密码不一致,请检查!');
    } else {
      this.setState({
        passwordStatus: true,
      });
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  handleIdcChange = value => {    
    this.props.dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=cabinet&id=${value}`,
    });

    this.props.form.setFieldsValue({
      cabinet_id : this.props.gidc.cabinet.data.map(post => {
        return post.title 
    }),
    });
  };

  handlecabinetChange = value => {
    this.props.dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=bays&id=${value}`,
    });


    this.props.form.setFieldsValue({
        bay_id : this.props.gidc.bays.data.map(post => {
        return post.title 
    }),
    });
  }

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


  
  reback = () => {
    const { dispatch, match} = this.props; 
    let activeKey = this.state.activeKey;
    const panes = this.state.panes.filter(pane => pane.key !== activeKey);
    this.setState({ panes });

    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/hardware/host/list',
            }
    ));
  }

  handleAdd = e => {
    e.preventDefault();
    const form = this.props.form;
    const { dateStatus, passwordStatus } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        if (!dateStatus) {
          message.error(
            '维保时间必须大于购买时间'
          );
        } else if (!passwordStatus) {
          message.error('两次输入密码不匹配~');

        } else if (dateStatus && passwordStatus) {
          const fields = {
            sn: form.getFieldValue('serialnumber') ? form.getFieldValue('serialnumber') : '',
            eth1: form.getFieldValue('eth1') ? form.getFieldValue('eth1') : '',
            eth2: form.getFieldValue('eth2') ? form.getFieldValue('eth2') : '',
            eth3: form.getFieldValue('eth3') ? form.getFieldValue('eth3') : '',
            eth4: form.getFieldValue('eth4') ? form.getFieldValue('eth4') : '',
            fqdn: form.getFieldValue('fqdn') ? form.getFieldValue('fqdn') : '',
            internal_ip: form.getFieldValue('internal_ip') ? form.getFieldValue('internal_ip') : '',
            mac: form.getFieldValue('mac') ? form.getFieldValue('mac') : '',
            switch_port: form.getFieldValue('switch_port') ? form.getFieldValue('switch_port') : '',
            start_guaratee: form.getFieldValue('start_guaratee')
            ? form.getFieldValue('start_guaratee').format('YYYY-MM-DD HH:mm:ss')
            : '',
            stop_guaratee: form.getFieldValue('stop_guaratee')
            ? form.getFieldValue('stop_guaratee').format('YYYY-MM-DD HH:mm:ss')
            : '',
            hardware_type: form.getFieldValue('hardware_type') ? form.getFieldValue('hardware_type') : '',
            hardware_vendor: form.getFieldValue('hardware_vendor') ? form.getFieldValue('hardware_vendor') : '',
            
            manufacturer: form.getFieldValue('manufacturer') ? form.getFieldValue('manufacturer') : '',
            cpu_model: form.getFieldValue('cpu_model') ? form.getFieldValue('cpu_model') : '',
            cpuarch: form.getFieldValue('cpuarch') ? form.getFieldValue('cpuarch') : '',
            num_cpus: form.getFieldValue('num_cpus') ? form.getFieldValue('num_cpus') : '',
            disk: form.getFieldValue('disk') ? form.getFieldValue('disk') : '',
            assets_number: form.getFieldValue('assets_number') ? form.getFieldValue('assets_number') : '',
            service_code: form.getFieldValue('service_code') ? form.getFieldValue('service_code') : '',
            memory: form.getFieldValue('memory') ? form.getFieldValue('memory') : '',

            idc_id: form.getFieldValue('idc_id') ? form.getFieldValue('idc_id') : '',
            cabinet_id: form.getFieldValue('cabinet_id') ? form.getFieldValue('cabinet_id') : '',
            bay_id: form.getFieldValue('bay_id') ? form.getFieldValue('bay_id') : '',
   
            osversion: form.getFieldValue('osversion') ? form.getFieldValue('osversion') : '',
            biosversion: form.getFieldValue('biosversion') ? form.getFieldValue('biosversion') : '',
            agentversion: form.getFieldValue('agentversion') ? form.getFieldValue('agentversion') : '',

            planversion: form.getFieldValue('planversion') ? form.getFieldValue('planversion') : '',
            password: form.getFieldValue('password') ? form.getFieldValue('password') : '',
   
            user_id: form.getFieldValue('user_id') ? form.getFieldValue('user_id') : '',
            statusid: form.getFieldValue('statusid') ? form.getFieldValue('statusid') : '',
            remarks: form.getFieldValue('remarks') ? form.getFieldValue('remarks') : '',
          };

          let project = [];
          for (let i = 0; i < uuid; i++) {
            project.push(
              form.getFieldValue(`project${i}`) ? form.getFieldValue(`project${i}`) : ''
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

          form.resetFields();
        }
      }
    });
  };

  handleReset =  () => {
    e.preventDefault();
    const form = this.props.form;
    form.resetFields();
  }

  tabcontent = (information, projectcolumns) => {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { gidc, gproline,gdevice,ghardware} = this.props
    let cabinetOptions,cabinetValue
  

    const idcOptions = this.props.gidc.idc.data.map(post => {
      return <Option key={post.ID} value={post.ID} >{post.title}</Option>
    })

   
    if  (gidc.cabinet.data.length == 0) {
      cabinetOptions = gidc.cabinet.data.map(post => {
        return <Option key='-1' value="-1" >请选择</Option>
      })
      cabinetValue = "请选择"
    } else {
      cabinetOptions = gidc.cabinet.data.map(post => {
        return <Option key={post.ID} value={post.ID} >{post.title}</Option>
      })
      
    }

    const baysOptions = gidc.bays.data.map(item => (
      <Option key={item.ID} value={item.ID}>
        {item.title}
      </Option>
      
    ))
    

    console.log("gdevice.user.data",gdevice.user.data)
    console.log("ghardware.composedata.data",ghardware.composedata.data.list)

    const userData = gdevice.user.data.map(item => {
     return(
      <Option key={item.ID} value={item.ID}>
      {item.title}
       </Option>
     )
     
  })

  const planData = ghardware.composedata.data.list.map(item => {
    return(
      <Option key={item.ID} value={item.ID}>
      {item.title}
       </Option>
     )
})
  

    //添加
   getFieldDecorator('keys', { initialValue: [0] });
   
   let keys = getFieldValue('keys');

    console.log("formItems+++++++++++++++++++",this.props)
    
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

    


    console.log("progroupOptions",gproline.progroupbylid)
    console.log("probygidOptions",gproline.probygid)

     return (
       <FormItem label={index == 0 ? '产品线' : ''} key={k}>
         <Col span={7}>
           <FormItem>
             {getFieldDecorator(`proline${k}`, {
               rules: [
                 {
                   requirerequired: true,
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
      <Fragment>
        <Card bordered={false}>
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleAdd}
          >
                
          <Row gutter={24}>
            <Col span={8}>
              <span>汇总信息</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="主机状态"  {...formItemLayout} >
                {getFieldDecorator('statusid',
                {
                  initialValue:"请选择",
                  rules: [
                    {
                      required: true,
                      message: 'Please select statusid!',
                    },
                  ],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">已上线</Option>
                    <Option value="1">已关机</Option>
                    <Option value="2">运行中</Option>
                    <Option value="3">已下线</Option>
                    <Option value="4">异常</Option>
                    <Option value="5">报废</Option>
                    <Option value="6">装机中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="主机类型"  {...formItemLayout} >
                {getFieldDecorator('hardware_type',
                {
                  initialValue:"请选择",
                  rules: [
                    {
                      required: true,
                      message: '请选择主机类型!',
                    },
                  ],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="1">物理机</Option>
                    <Option value="2">虚拟机</Option>
                    <Option value="3">交换机</Option>
                    <Option value="4">路由器</Option>
                    <Option value="5">防火墙</Option>
                    <Option value="6">存储</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="所属环境"  {...formItemLayout} >
                {getFieldDecorator('env',
                {
                  initialValue:"请选择",
                  rules: [
                    {
                      required: true,
                      message: '请选择所属环境!',
                    },
                  ],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="1">生产环境</Option>
                    <Option value="2">仿真环境</Option>
                    <Option value="3">测试环境</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
            <Divider style={{ marginBottom: 32 }} />
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
                  })(<Input placeholder="请输入" />)}
                </FormItem>

              </Col>
              <Col span={8}>
                <FormItem label="网卡2:" {...formItemLayout}>
                  {getFieldDecorator('eth2', {
                    rules: [
                      {
                        message: '请输入ip地址!',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
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
                  })(<Input placeholder="请输入" />)}
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
                <FormItem label="远程控制卡IP" {...formItemLayout}>
                  {getFieldDecorator('internal_ip')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="MAC地址: " {...formItemLayout}>
                  {getFieldDecorator('mac')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

             
              <Col span={8}>
                <FormItem label="所在交换机端口: " {...formItemLayout}>
                  {getFieldDecorator('switch_port')(<Input placeholder="请输入" />)}
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
                <FormItem label="序列号" {...formItemLayout}>
                  {getFieldDecorator('serialnumber', {
                    rules: [
                      {
                        required: true,
                        message: '请输入序列号!',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
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
                <FormItem label="机器最后维保" {...formItemLayout}>
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
               <Col span={8}>
                <FormItem label="机房选择" {...formItemLayout}>
                      {getFieldDecorator(`idc_id`, {
                        initialValue:"请选择",
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
                        initialValue:"请选择",
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
                        initialValue:"请选择",
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




            <Row>
              <Col span={8}>
                <FormItem label="生产商" {...formItemLayout}>
                  {getFieldDecorator('hardware_vendor')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="1">Dell</Option>
                    <Option value="2">Lenovo</Option>
                    <Option value="3">HP</Option>
                  </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="型号" {...formItemLayout}>
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
                  {getFieldDecorator('num_cpus')(<InputNumber style={{ marginRight: 150 }} min={1} max={100} />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="硬盘详情" {...formItemLayout}>
                  {getFieldDecorator('disk')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
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
              <Col span={8}>
                <FormItem label="内存详情" {...formItemLayout}>
                  {getFieldDecorator('memory')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>




           


            <Divider style={{ marginBottom: 32 }} />
            <Row gutter={24}>
              <Col span={8}>
                <span>权限信息</span>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
              <FormItem label="机器管理员"  {...formItemLayout}>
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
                    mode="multiple"
                    size='default'             
                    placeholder="请选择管理员"
                    // optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                  >
                    {userData}
                  </Select>
                )}
              </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem label="机器密码"  {...formItemLayout}>
                    {getFieldDecorator('password',
                    {
                      rules: [{
                        required: true, message: '请输入密码!~',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input
                        type="password"
                        placeholder="请输入密码"
                      />
                    )}
                  </FormItem>
              </Col>
              <Col span={8}>
              <FormItem label="确认密码"  {...formItemLayout}>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: '请输入确认密码!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    }
                  ],
                })(
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    onBlur={this.handleConfirmBlur}
                  />
             
                )}
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
                  {getFieldDecorator('osversion')(
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
                  {getFieldDecorator('biosversion')(<Input placeholder="请输入" />)}

                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="agent版本" {...formItemLayout}>
                  {getFieldDecorator('agentversion')(<Input placeholder="请输入" />)}

                </FormItem>
              </Col>
            </Row>


            <Row>

              <Col span={8}>
                <FormItem label="套餐信息" {...formItemLayout}>
                  {getFieldDecorator('planversion')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                        {planData}
                    </Select>
                  )}
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
                <Button type="dashed" onClick={this.addproject} style={{ width: '15%' }}>
                  <Icon type="plus" /> 添加项目
              </Button>
              </Col>
            </Row>


            <Divider style={{ marginBottom: 32 }} />

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
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">保存</Button>
                <Divider type="vertical" />
                <Button onClick= {() => this.reback()}>返回</Button>
              </Col>
            </Row>

          </Form>
        </Card>
      </Fragment>
    )
  }





  addproject = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

   





  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }


  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${newTabIndex++}`;
    panes.push({ title: '新主机',content: this.tabcontent, key: activeKey });
    this.setState({ panes, activeKey });
  }


  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;


    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });


    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      console.log("panes[lastIndex].key",panes[lastIndex].key)
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });

  }

  render() {
    // debugger

    const { gdevice, loading } = this.props;

    

    return (
      <Card bordered={false}>
        <Button icon="plus" type="primary" onClick={() => this.add()}>
          添加主机
        </Button>
        <Divider style={{ marginBottom: 32 }} />
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >

          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content()}</TabPane>)}

        </Tabs>
      </Card>
    );
  }
}
