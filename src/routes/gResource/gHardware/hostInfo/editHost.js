import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tabs, Form, Row, Col, Input, Select, Button,DatePicker,InputNumber,Icon    } from 'antd';
import DescriptionList from '../../../../components/DescriptionList';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

import styles from './hostDetail.less';
import moment from 'moment';

const { Description } = DescriptionList;

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

let newTabIndex = 0

let uuid = 10000;

@connect((props) => (props))
@Form.create()

export default class HostDetail extends Component {

  state = {
    activeKey: '-1',
    title: "",
    panes: [],
    headlist: []
  };


  componentDidMount() {
    //console.log("this.props.location.state+++++++++++",this.props.location.query.id)
    const { dispatch, location, gdevice } = this.props;
    if (location.query !== undefined) {
      dispatch({
        type: 'gdevice/queryHostDetail',
        payload: location.query.id
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

  componentWillReceiveProps = nextProps => {
    const { gdevice } = this.props;
    const { panes, headlist } = this.state;



    console.log('gdevice.hostdetail.props', this.props)

    console.log('gdevice.hostdetail.nextProps', nextProps)

    if (gdevice.hostdetail.data.length) {

      const activeKey = `${gdevice.hostdetail.data[0].detail_id}`
      const title = gdevice.hostdetail.data[0].fqdn

      console.log("headlist++++++++++++", headlist)

      if (!this.isInArray(headlist, title)) {
        headlist.push(title)
        panes.push({ information: gdevice.hostdetail.data, key: `${activeKey}`, title: title });
      }
      this.setState({ panes, headlist, activeKey });
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

   let initValue = new Array()

   if (information.projectlists.length > 0 ) {
      for(let i=0; i < information.projectlists.length ;i++) {
         initValue.push(i)         
      }
   }
   
    //添加
   getFieldDecorator('keys', { initialValue: initValue});
   
   let keys = getFieldValue('keys');

    //console.log("formItems+++++++++++++++++++",this.props)
   // console.log("formItems+++++++++++++++++++",information.stop_guaratee)


     const formItems = (keys,information) => {
       
      return  (
      keys.map((k, index) => { 
        //产品线列表
        console.log("++++++++++++++",k)
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
                {getFieldDecorator(`proline${k}`,{initialValue: `${information[k].proline_title}`})(
                  
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
                {getFieldDecorator(`progroup${k}`,{initialValue: `${information[k].progroup_title}`})(
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
                {getFieldDecorator(`project${k}`,{initialValue: `${information[k].project_title}`})(
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
      }));
      
     } 

    return (
      <Card bordered={false}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
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
              {getFieldDecorator('os',{initialValue: `${information.osrelease }`})}
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
                {/* {getFieldDecorator(`user_manger`, {
                    initialValue:`${information.user}`
                  })(
                    
                    <Select
                      style={{ width: 200 }}
                      mode="multiple"
                      size='default'            
                    >
                      {userData}
                    </Select>
                  )} */}
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
              <Col span={24} key={1} style={{ display: 'block' }}>
              {formItems(keys,information.projectlists)}
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


  addproject = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  render() {
    // debugger

    const { gdevice, loading } = this.props;



    // if( gdevice.hostdetail.data.length == 0) {
    //   gdevice.hostdetail.data.push(hostdetailInit)
    // }

    // const  information =  gdevice.hostdetail.data[0]

    //console.log("this.prop--------------",gdevice)

    console.log('this.state.panes', this.state.panes)

    return (

      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >

        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{this.tabcontent(pane.information[0], projectColumns)}</TabPane>)}

      </Tabs>

    );
  }
}
