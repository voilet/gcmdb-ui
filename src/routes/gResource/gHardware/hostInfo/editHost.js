import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import isEqual from 'lodash/isEqual';
import { Card, Divider, Tabs, Form, Row, Col, Input, Select, Button,DatePicker,InputNumber,Icon,message    } from 'antd';
 
import  CleanHost from './cleanHost'

import styles from './hostDetail.less';
import moment from 'moment';



const { TextArea } = Input;
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
const projectids = []
const deletedprojectids = []

@connect((props) => (props))
@Form.create()

export default class HostDetail extends Component {

  state = {
    activeKey: '-1',
    title: "",
    panes: [],
    headlist: [],
    dateStatus: true,
    cabinetData:[],
    idcData:[],
    BaysData:[],
    projectlist:[],
    hostid: 0,
    allprojectids: [],
    delprojectids:[],
  };


  componentWillMount() {
    //console.log("this.props.location.state+++++++++++",this.props.location.query.id)
    const { dispatch, location } = this.props;
    const {headlist,panes} = this.state

    if (location.hasOwnProperty('query')) {
      dispatch({
        type: 'gdevice/queryHostDetail',
        payload: {
          id: location.query.id,
          cb: (data) => {
            
       
            
            if (Object.keys(data).length !== 0) {

              const activeKey = `${data.detail_id}`
              const title = data.fqdn
      
              if (!this.isInArray(headlist, title)) {
                headlist.push(title)
                panes.push({ information: data, key: `${activeKey}`, title: title });
              }
      
              this.setState({ 
                panes, 
                headlist, 
                activeKey,
                projectlist: data.projectlists,
                hostid: this.props.location.query.id
               });
            }
          }
        },
      });

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


  isInArray = (arr, value) => {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
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

  handleSave = e => {
    e.preventDefault();
    const form = this.props.form;
    const { dateStatus } = this.state;

    form.validateFields((err, values) => {
      if (!err) {
        if (!dateStatus) {
          message.error(
            '维保时间必须大于购买时间'
          );
        } else if (dateStatus) {
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
            hardware_vendor: form.getFieldValue('hardware_vendor') ? form.getFieldValue('hardware_vendor') : '',
            manufacturer: form.getFieldValue('manufacturer') ? form.getFieldValue('manufacturer') : '',
            cpu_model: form.getFieldValue('cpu_model') ? form.getFieldValue('cpu_model') : '',
            cpuarch: form.getFieldValue('cpuarch') ? form.getFieldValue('cpuarch') : '',
            num_cpus: form.getFieldValue('num_cpus') ? form.getFieldValue('num_cpus') : '',
            disk: form.getFieldValue('disk') ? form.getFieldValue('disk') : '',
            assets_number: form.getFieldValue('assets_number') ? form.getFieldValue('assets_number') : '',
            assets_number: form.getFieldValue('service_code') ? form.getFieldValue('service_code') : '',
            assets_number: form.getFieldValue('memory') ? form.getFieldValue('memory') : '',

            idc_id: form.getFieldValue('idc_id') ? form.getFieldValue('idc_id') : '',
            cabinet_id: form.getFieldValue('cabinet_id') ? form.getFieldValue('cabinet_id') : '',
            bay_id: form.getFieldValue('bay_id') ? form.getFieldValue('bay_id') : '',
   
            osversion: form.getFieldValue('osversion') ? form.getFieldValue('osversion') : '',
            planversion: form.getFieldValue('planversion') ? form.getFieldValue('planversion') : '',
          
        
   
            user_id: form.getFieldValue('user_manger') ? form.getFieldValue('user_manger') : '',

            remarks: form.getFieldValue('remarks') ? form.getFieldValue('remarks') : '',
          };

         // console.log("this.state.uuid ", this.state.panes.information )
     

          switch (form.getFieldValue('statusid')) {
            case '已上线':
                fields.statusid = 0
                break
            case '已关机':
                fields.statusid = 1
                break
            case '运行中':
                fields.statusid = 2
                break
            case '已下线':
                fields.statusid = 3
                break
            case '异常':
                fields.statusid = 4
                break
            case '报废':
                fields.statusid = 5
                break
            case '装机中':
                fields.statusid = 6
                break
            default:
                fields.statusid = form.getFieldValue('statusid')
            }
          
          
          fields.project = this.state.allprojectids
          fields.delproject = this.state.delprojectids

          this.props.dispatch({
            type: 'gdevice/modifyHost',
            payload: {
              id: this.props.location.query.id,
              description: fields,
            },
          });

          message.success('修改成功');
 
        }
      }
    });
  }

  handleSaveProData = (value) => {
     const {project_id} = value 
     
     
     const index = deletedprojectids.indexOf(project_id)
     if (index > -1) {
      deletedprojectids.splice(index, 1);
     } 

     projectids.push(project_id) 

     this.setState({
      allprojectids: projectids,
      delprojectids: deletedprojectids
     })
  }

  handleDeleteProData = (value) => {

   
    const {ID} = value
    deletedprojectids.push(ID)


    const index = projectids.indexOf(ID)
    if (index > -1) {
      projectids.splice(index, 1);
    } 
  


    this.setState({ 
      allprojectids: projectids,
      delprojectids: deletedprojectids
     });

  }

  HandleSelectHostStatus = (value) => {
    this.props.form.setFieldsValue({
      statusid: `${value}`,
    });
}


  tabcontent = (information) => {

    const { getFieldDecorator } = this.props.form;
    const { gidc, gdevice,ghardware} = this.props

    let cabinetOptions

    const idcOptions = this.props.gidc.idc.data.map(post => {
      return <Option key={post.ID} value={post.ID} >{post.title}</Option>
    })

   
    if  (gidc.cabinet.data.length == 0) {
      cabinetOptions = gidc.cabinet.data.map(post => {
        return <Option key='-1' value="-1" >请选择</Option>
      })
   
    } else {
      cabinetOptions = (gidc.cabinet.data || []).map(post => {
        return <Option key={post.ID} value={post.ID} >{post.title}</Option>
      })
      
    }

    const baysOptions = gidc.bays.data.map(item => (
      <Option key={item.ID} value={item.ID}>
        {item.title}
      </Option>
    ))
    

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

    return (
      <Card bordered={false}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSave}
        >
        <Row>
            <Col span={8}>
              <FormItem label="主机状态"  {...formItemLayout} >
                {getFieldDecorator('statusid',
                {
                  initialValue: `${information.status_title}`,
                  rules: [
                    {
                      required: true,
                      message: '请 选择主机状态!',
                    },
                  ],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.HandleSelectHostStatus}>
                    <Option key="0" value="0">已上线</Option>
                    <Option key="1" value="1">已关机</Option>
                    <Option key="2" value="2">运行中</Option>
                    <Option key="3" value="3">已下线</Option>
                    <Option key="4" value="4">异常</Option>
                    <Option key="5" value="5">报废</Option>
                    <Option key="6" value="6">装机中</Option>
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
                    initialValue: `${information.eth1}`,
                  })(<Input placeholder={information.eth1} />)}
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
                  })(<Input placeholder={information.fqdn}  />)}
                </FormItem>

              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="网卡3:" {...formItemLayout}>
                  {getFieldDecorator('eth3',{initialValue: `${information.eth3}`}
                )(<Input placeholder={information.eth3} />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="网卡4:" {...formItemLayout}>
                  {getFieldDecorator('eth4',{initialValue: `${information.eth4}`})(<Input placeholder={information.eth4} />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="远程控制卡IP" {...formItemLayout}>
                  {getFieldDecorator('internal_ip',{rules:[{ initialValue: `${information.internal_ip}`}]})(<Input placeholder={information.internal_ip} />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="MAC地址: " {...formItemLayout}>
                  {getFieldDecorator('mac',{ initialValue: `${information.mac}`})(<Input placeholder={information.mac} />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="所在交换机端口: " {...formItemLayout}>
                  {getFieldDecorator('switch_port',{ initialValue: `${information.switch_port}`})(<Input placeholder={information.switch_port} />)}
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
                    initialValue: `${information.serialnumber}`
                  },
                  )(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>

              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem label="机器购买时间" {...formItemLayout}>
                
                  {
                    getFieldDecorator(`start_guaratee`,{
                      initialValue: moment(information.start_guaratee, dateFormat)
                    })(<DatePicker 
                      format={dateFormat}
                       onChange={this.newDateChange.bind(this)
                  } />)
                  } 
                </FormItem>
              </Col>

              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem label="机器最后维保" {...formItemLayout}>
                  {getFieldDecorator(`stop_guaratee`,{
                      initialValue: moment(`${information.stop_guaratee}`, dateFormat)
                    })(<DatePicker onChange={this.oldDateChange.bind(this)} />)}
                </FormItem>
              </Col>

            </Row>


            <Row>
              <Col span={8}>
                <FormItem label="服务器生产商" {...formItemLayout}>
                  {getFieldDecorator('hardware_vendor',{initialValue: `${information.hardware_vendor}`})(<Input  />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="服务器型号" {...formItemLayout}>
                {getFieldDecorator('manufacturer',{ initialValue: `${information.manufacturer}`})(<Input />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="CPU 参数" {...formItemLayout}>
                  {getFieldDecorator('cpu_model',{initialValue: `${information.cpu_model}`})(<Input />)}
                </FormItem>
              </Col>
            </Row>


            <Row>
              <Col span={8}>
                <FormItem label="CPU架构" {...formItemLayout}>
                  {getFieldDecorator('cpuarch',{initialValue: `${information.cpuarch}`})(<Input  />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="CPU核数" {...formItemLayout}>
                  {getFieldDecorator('num_cpus',{initialValue: `${information.num_cpus}`})(<InputNumber />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="硬盘详情" {...formItemLayout}>
                  {getFieldDecorator('disk',{ initialValue: `${information.disk}`})(<Input  />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="资产编号" {...formItemLayout}>
                  {getFieldDecorator('assets_number',{ initialValue: `${information.assets_number}`})(<Input />)}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="快速服务码" {...formItemLayout}>
                {getFieldDecorator('service_code',{ initialValue: `${information.service_code}`})(<Input  />)}
            
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="内存详情" {...formItemLayout}>
                {getFieldDecorator('memory',{ initialValue: `${information.memory}`})(<Input   />)}
                </FormItem>
              </Col>
            </Row>




            <Row gutter={24}>
               <Col span={8}>
                <FormItem label="机房选择" {...formItemLayout}>
                      {getFieldDecorator(`idc_id`,{ initialValue:`${information.idc_title}`})(
                        <Select
                          style={{ width: 200, marginRight: 40 }}
                          onChange={this.handleIdcChange}
                        >
                          {idcOptions}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="机柜选择" {...formItemLayout}>
                      {getFieldDecorator(`cabinet_id`, {
                        initialValue: `${information.cabinet_title }`,
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
                        initialValue: `${information.bays_title }`,
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
              {getFieldDecorator('osversion',{initialValue: `${information.osrelease }`})}
              {information.osrelease}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="bios版本" {...formItemLayout}>
                {information.biosversion}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="agent版本" {...formItemLayout}>
                {information.agent_version}
              </FormItem>
            </Col>
          </Row>


          <Row>

            <Col span={8}>
              <FormItem label="套餐信息" {...formItemLayout}>
                  
                   {getFieldDecorator(`planversion`,{ initialValue:`${information.composeplan}`})(
                        <Select
                          style={{ width: 200, marginRight: 40 }}
                        >
                          {planData}
                        </Select>
                    )}
       
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
                     {getFieldDecorator(`user_manger`,{ initialValue:`${information.user}`})(
                        <Select
                          style={{ width: 200, marginRight: 40 }}
                          //mode="multiple"
                          size='default'   
                        >
                          {userData}
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
          <Row gutter={24}>
             
              <CleanHost 
              hostid={this.state.hostid} 
              projectlist = {this.state.projectlist} 
              dispatch = {this.props.dispatch}
              gproline = {this.props.gproline}
              handleSaveProData = {this.handleSaveProData}
              handleDeleteProData = {this.handleDeleteProData}
              />
            </Row>

            <Divider style={{ marginBottom: 32 }} />

            <Row gutter={24}>
              <Col>
                <FormItem label="备注">
                  {getFieldDecorator('remarks',{ initialValue:`${information.remarks}`})(
                    <TextArea style={{ minHeight: 32 }} placeholder="备注描述" rows={4} />
                  )}

                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">提交</Button>
                <Divider type="vertical" />
                <Button onClick= {() => this.reback()}>返回</Button>
              </Col>
            </Row>

        </Form>
      </Card>
    )



    }
   
  

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

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
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }


  render() {
    // debugger
    return (

      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >

        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{this.tabcontent(pane.information)}</TabPane>)}

      </Tabs>

    );
  }
}
