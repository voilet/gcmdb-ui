import { routerRedux, Route, Switch } from 'dva/router';
import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import {
  Card,
  Form,
  Input,
  Icon,
  Tabs,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Divider,
  Row,
  Col,
  Select,
} from 'antd';


import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

import isEqual from 'lodash/isEqual';
import HostTable from '../../../../components/Resource/HostTable'



import HostHeader from './hostHeader'
import AddHost  from './addHost'
import styles from './hostInfo.less'

const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


const formItemLayout = {
  labelCol: {
    span: 6 ,
  },
  wrapperCol: {
    span: 18 ,
  },
};


@connect((props) => (props))

@Form.create()

export default class HostList extends PureComponent {
  state = {
    selectedRows: [],
    expandForm: false,
    formValues: {},
    numId:'1'
  };

  componentDidMount() {
    const {dispatch, location} = this.props;

    dispatch({
      type: 'gproline/getProjectLine',  
    });
    dispatch({
      type: 'gidc/queryIdcRelation',
      payload: `?tag=idc&id=1`
    });
    dispatch({
      type: 'ghardware/queryHardwarePlan'
    })
    dispatch({
      type:'gdevice/queryUser'
    })
    dispatch({
      type: 'gidc/queryIDC',
    });

  
      if (location.query && location.query.projectid) {
        dispatch({
          type: 'gdevice/queryHostsByPid',  
          payload: { projectid: location.query.projectid}
        });
    } else {
      
      dispatch({
        type: 'gdevice/queryHost',  
        payload: ""
      });
    }
  }



  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;
     

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

     dispatch({
        type: 'gdevice/queryHost',  
        payload: params
      });

  
  }
 
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
    
  }

  openNotificationWithIcon = (type,content) => {
    notification[type]({
      message: '通  知  栏',
      description: content
    });
  };
  


  handleDeleteData = (val) => {
 
    const { ID } = val
    let ids=[]
    ids.push(ID)
    this.props.dispatch({
      type: 'gdevice/deleteHost',
      payload: {
        tag:false,
        infolist:JSON.stringify({ids})
      }
    });
  
    const {gdevice} = this.props
    if (gdevice.response.status == "200")
    {
      this.openNotificationWithIcon('success',gdevice.response.message)
    }else {
      this.openNotificationWithIcon('error',gdevice.response.message)
    }
  }


handleMenuClick = (e) => {
  const {dispatch} = this.props;
  const {selectedRows} = this.state;

  if (!selectedRows) return;
 
  switch (e.key) {
    case 'remove':
      dispatch({
        type: 'gproline/getProjectLine',
        payload: {
          ID: selectedRows.map(row => row.ID).join(','),
        },
        callback: () => {
          this.setState({
            selectedRows: [],
          });
        },
      });
      break;

    case  'offline':
        dispatch({
          type: 'gproline/getProjectLine',
          payload: {
            ID: selectedRows.map(row => row.ID).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
    case  'stop':
        dispatch({
          type: 'gproline/getProjectLine',
          payload: {
            ID: selectedRows.map(row => row.ID).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
    default:
      break;
  }
}

  tabOnChange(id){
    this.setState({
      numId:'2'
    })
    this.props.dispatch({
      type: 'gdevice/queryHostDetail',
      payload: id
    })
  }
  tabClickFn(val){
    this.setState({
      numId:val
    })
  }
 
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

 
  
  Add = () => {
    const { dispatch, match} = this.props; 
    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/hardware/host/add',
            }
    ));
  }

  handleSearch = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        const fields = {
          ipadds: form.getFieldValue('ipadds') ? form.getFieldValue('ipadds') : '',
          fqdn: form.getFieldValue('fqdn') ? form.getFieldValue('fqdn') : '',
          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
          sn: form.getFieldValue('serialnumber') ? form.getFieldValue('serialnumber') : '',
          idctitle:form.getFieldValue('idc') ? form.getFieldValue('idc') : '',
          equipment_type: form.getFieldValue('equipment_type') ? form.getFieldValue('equipment_type') : '',
          assets_number: form.getFieldValue('assets_number') ? form.getFieldValue('assets_number') : '',
          osversion: form.getFieldValue('osversion') ? form.getFieldValue('osversion') : '',
          search_target: '0'
        }

        this.props.dispatch({
          type: 'gdevice/searchOnlineHost',
          payload:  fields,
        }); 

      }
    })
  }
 

  handleFormReset = () => {
    const form = this.props.form;

    this.props.dispatch({
      type: 'gdevice/queryHost',
      payload: ""
    })

    form.resetFields();
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSearch}>
        <Row  gutter={24}>
          <Col span={8}>
            <FormItem label="主机ip"  {...formItemLayout}>
              {getFieldDecorator('ipadds')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label="主机名"  {...formItemLayout}>
                {getFieldDecorator('fqdn')(<Input placeholder="请输入" />)}
              </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="主机状态"  {...formItemLayout} >
                {getFieldDecorator('status')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">运行中</Option>
                    <Option value="1">已关机</Option>
                    <Option value="3">异常中</Option>
                  </Select>
                )}
              </FormItem>
          </Col>
        </Row>
        <Row  gutter={24}>
            <Col span={24} style={{ textAlign: 'right' }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
        </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
   // console.log("this.props.gidc.idc.data",this.props.gidc.idc.data)
    
    const idcOptions = this.props.gidc.idc.data.map(post => {
      return <Option key={post.ID} value={post.idc_name} >{post.idc_name}</Option>
    })
    return (
      <Form onSubmit={this.handleSearch}>
        <Row >
          <Col span={8}>
            <FormItem label="主机ip" {...formItemLayout}>
              {getFieldDecorator('ipadds')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="主机名" {...formItemLayout}>
                {getFieldDecorator('fqdn')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="主机状态" {...formItemLayout}>
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">运行中</Option>
                    <Option value="1">已关机</Option>
                    <Option value="3">异常中</Option>
                    <Option value="4">已过保</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="序列号" {...formItemLayout}>
              {getFieldDecorator('serialnumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label='机房' {...formItemLayout}>
                {getFieldDecorator(`idc`)(
                  <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  >
                    {
                      idcOptions
                    }
                    
                  </Select>
                )}
              </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label='硬件类型' {...formItemLayout}>
                {getFieldDecorator(`equipment_type`)(
                  <Select
                  style={{ width: '100%' }}
                    placeholder="请选择"
                  >
                    <Option  value='1'>物理机</Option>
                    <Option  value='2'>虚拟机</Option>
                    <Option  value='3'>交换机</Option>
                    <Option  value='4'>路由器</Option>
                    <Option  value='5'>防火墙</Option>
                    <Option  value='6'>存储</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
        </Row>

        <Row>
          <Col span={8}>
            <FormItem label="资产编号" {...formItemLayout}>
              {getFieldDecorator('assets_number')(
                 <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="容灾块" {...formItemLayout}>
              {getFieldDecorator('guard')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label='操作系统类型' {...formItemLayout}>
                {getFieldDecorator(`osversion`)(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="1">Centos6.9</Option>
                      <Option value="2">Centos7.2</Option>
                      <Option value="3">Windows2003</Option>
                      <Option value="4">Windows2008</Option>
                  </Select>
                )}
              </FormItem>
          </Col>
        </Row>

        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }



  render() {
    const { gproline, gdevice, gidc, ghardware } = this.props;
    const {selectedRows} = this.state;
 

    return (
      // <PageHeaderLayout title="查询主机(支持批量查询,数据请用逗号分开)" >
        <Card bordered={false}>
          
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
          

            <Divider>  主机管理  </Divider>
            
            <HostTable
              selectedRows={selectedRows}
             // loading={loading}
              gdevice={gdevice}
              onRoute={this.onRoute}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onEdit = {this.handleEdit}
              onShow = {this.handleShow}
              handleDeleteData={this.handleDeleteData}
              passwordClick={this.passwordClick}
              {...this.props}
            />



          </div>
        </Card>
        // </PageHeaderLayout>
    );
  }
}
