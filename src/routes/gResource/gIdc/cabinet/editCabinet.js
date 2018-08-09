import React, {PureComponent} from 'react';
import styles from './cabinet.less'
import isEqual from 'lodash/isEqual';
import { routerRedux } from 'dva/router';

import {connect} from 'dva';
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Row,
    Col,
    Select,
    Switch,
    Divider,
    Table,
     Popconfirm,
     InputNumber
  } from 'antd';


const Option = Select.Option

const FormItem = Form.Item;

let count = 0 
let uuid 


@connect((props) => (props))
@Form.create()

export default class editCabinet extends PureComponent {
  
  state = {
    modalVisible: false,
    disabled: true,
    cabinetdata:[],
    baydata:[],
    idc:[],
    haspower: false,
    addable: false,
    baystatus: false
  };


  componentWillMount() {
    const { dispatch, location } = this.props;


    if (location.query !== undefined) {
      dispatch({
        type: 'gidc/queryCabinetDetail',
        payload: location.query.id
      });
    
    dispatch({
      type: 'gidc/queryIDC',
    });
    uuid = this.props.gidc.cabinetdetail.bay_max_id+1;
  }
  }

 

  componentWillReceiveProps(nextProps) {
   
    if (!isEqual(nextProps.gidc.cabinetdetail.time4Update, this.props.gidc.cabinetdetail.time4Update)) {

      if ( nextProps.gidc.cabinetdetail) {
        if (nextProps.gidc.cabinetdetail.status == 0) {
          this.setState({
            haspower: true 
          })
        }

        if (nextProps.gidc.cabinetdetail.bay_details)  {
          this.setState({
            baydata: nextProps.gidc.cabinetdetail.bay_details.map((object)=>{
              object.checked = true

              return object
        }),
          })
        }

        this.setState({
          cabinetdata: nextProps.gidc.cabinetdetail,
          idc:  nextProps.gidc.idc.data
        })
    }

    }
   
  }

  handleSubmit = (e) => {
    const { dispatch, location } = this.props;

    const form = this.props.form;
    const {baydata} = this.state
    e.preventDefault();

      form.validateFields((err, values) => {
      
      if (!err) {
   
        const fields = {
          'title': form.getFieldValue('title')? form.getFieldValue('title') :  '',
          'power': form.getFieldValue('power')? form.getFieldValue('power') :  '',
          'idcid':form.getFieldValue('idcid')? form.getFieldValue('idcid') : "",
          'cableport':form.getFieldValue('cableport')? form.getFieldValue('cableport') : "",
          'capacity':form.getFieldValue('capacity')? form.getFieldValue('capacity') : "",
          'status': !!this.state.haspower? "1": "0",
          'bay_details':JSON.stringify(baydata)
         }

     
        dispatch({
          type: 'gidc/modifyCabinet',
          payload: {
            ID: location.query.id,    
            description:  fields,
          },
        });

      };
    });
  
    
  }

  handleAdd = () => {
    console.log("uuid",uuid)
    const { baydata } = this.state;
    const newData = {
      "ID": ++uuid,
      "bay_name": "bay"+ count++,
      "host_ip": "空 (无法直接修改,请在主机列表关联修改)",
      "host_sn": "空",
      "height": "2U",
      "height_id": 2,
      "status": false,
      "checked":false
    }

    
    this.setState({
      baydata: [...baydata, newData],
      addable: true
    });

  }



  handleStatusChange = (val) =>{
    this.setState({
      haspower:val
    })
  }

  handleBayStatusChange = (value, key, column) => {

    const newData = [...this.state.baydata];
    const target = newData.filter(item => key === item.ID)[0];
    
    if (target) {
      target[column] = value;
      this.setState({ 
        data: newData,
      });
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

 
  handleSelectLineValue = (value, key, column) => {
    const newData = [...this.state.baydata];
    const target = newData.filter(item => key === item.ID)[0];
    
    if (target) {
      target[column] = value;

      this.setState({ 
        data: newData,
      });
    }
  }

  confirmDelete = (key) => {
    const newData = [...this.state.baydata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
        const index = newData.indexOf(target)
        if (index > -1) {
        newData.splice(index, 1);
        }
    
    target.tag = false;
    this.setState({ baydata: newData });
    this.cacheData = newData.map(item => ({ ...item }));   
    }
  }

  confirmSave = (key) => {
    const newData = [...this.state.baydata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      target['checked'] = true;
      this.setState({ 
        data: newData
         });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  reback = () => {
    
    const {dispatch} = this.props

    dispatch({
      type: 'gidc/empty',
    });

    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/idc/cabinet/list',
            }
    ));
  }

  handleSelectChange = (value) => {
    console.log("value",value)
    this.props.form.setFieldsValue({
      idcid: value,
    });
  }


  render() {
   
    let information = this.state.cabinetdata

    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 0 },
      },
    };
    
 
    
    const columns = [{
      title: '机架名称',
      dataIndex: 'bay_name',
      width: '100px',
      editable: true,
    }, {
      title: '机架高度',
      dataIndex: 'height',
      width:'50px',
      render: (text, record) => {
        return(
          <Select 
            defaultValue = {text} 
            disabled={record.selectStatus} 
            style={{ width: '150px' }} 
            onChange={(value)=>this.handleSelectLineValue(value, record.ID, 'height_id')}
          >
            <Option key="1" value="1">1U</Option>
            <Option key="2" value="2">2U</Option>
            <Option key="3"  value="3">4U</Option>
            <Option key="4" value="4">8U</Option>
          </Select>
        )
      },
    },{
      title: '服务器IP',
      dataIndex: 'host_ip',
      width: '100px',
      render: (text, record) => {
        const { host_ip } = record;
        var divStyle = {
          color: 'red',
        };
        return <div style={divStyle}>{host_ip}</div>;
      }
    },{
      title: '服务器序列号',
      dataIndex: 'host_sn',
      width: '100px',
      render: (text, record) => {
        const { host_sn } = record;
        var divStyle = {
          color: 'red',
        };
        return <div style={divStyle}>{host_sn}</div>;
      }
    },{
      title: '状态',
      dataIndex: 'checked',
      width:'50px',
      render: (text, record) => {
        return(
          record.checked ? <Icon type="check" style={{ fontSize: 16,color: '#228B22' }}/> : <Icon type="close" style={{fontSize: 16 ,color: '#FF0000' }}/>
        )
      },
    }, {
      title: '机架空闲状态',
      dataIndex: 'status',
      width: '50px',
     render: (text, record) => {
 
          const { status } = record;
          console.log(status)
          return(
            <div>
            <Switch
              checkedChildren="占用"
              unCheckedChildren="空闲"
              checked={ status}
              onChange={(value) => this.handleBayStatusChange(value,record.ID,'status')} 
            />
          </div>
          )   
      }
    }, {
      title: '操作',
      dataIndex: 'ID',
      key: 'ID',
      className:`${styles.tableOperation}`,
      width:'200px',
      render: (text, record) => {

        return (
        <div className="editable-row-operations">
        
            {
                <span style={{marginLeft: 20}}>
                { <a onClick={() => this.confirmSave(record.ID)}><Button  >保存</Button></a>}
                </span>
            }
             
             {
              
                <span>
                <Popconfirm title="确定删除?" onConfirm={() => this.confirmDelete(record.ID)}>
                    <a style={{marginLeft: 20}} ><Button type="danger">删除</Button></a>
                </Popconfirm>
                </span>       
            }
        </div>
        );
    },
  }];

    return (
       <Card bordered={false}>
   
      <Row gutter={24} style={{ marginBottom: 32 }}>
      <Col span={24} key={2} style={{ display: 'block' ,fontSize: 20 }}>
      机柜信息
      </Col>
      </Row>

        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSubmit}
        >
        <Row gutter={24}> 
            <Col span={12}>
              <FormItem label="机柜名称"  {...formItemLayout} >
                  {getFieldDecorator('title',{ initialValue: `${information.cabinet_name?information.cabinet_name:""}`})(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="机柜电量"  {...formItemLayout} >
                  {getFieldDecorator('power',{ initialValue: `${information.power?information.power:""}`})(<Input />)}
              </FormItem>
            </Col>
        </Row>

        <Row gutter={24}> 
            <Col span={12}>
              <FormItem label="所属机房"  {...formItemLayout} >
                {getFieldDecorator('idcid',{ initialValue:`${information.idcname?information.idcname:""}`}
                  )(<Select 
                      style={{ width: 264 }} 
                      onChange={this.handleSelectChange}
                    >
                      {
                        this.state.idc.map((item,ind)=>{
                          return (<Option key={ind} value={item.ID}>{item.idc_name}</Option>)
                        })
                      }
                    </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="网口数"  {...formItemLayout} >
                {getFieldDecorator('cableport', { initialValue: `${information.cableport?information.cableport:""}`})(
                  <InputNumber min={1} max={100} />
                )}
              </FormItem>
            </Col>
        </Row>
      
        <Row gutter={24}> 
            <Col span={12}>
              <FormItem label="机柜容量"  {...formItemLayout} >
                  {getFieldDecorator('capacity', { initialValue: `${information.capacity?information.capacity:""}`})(
                  <InputNumber min={1} max={100} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="机柜状态"  {...formItemLayout} >
                <Switch 
                    checkedChildren="通电" 
                    unCheckedChildren="未通电" 
                    checked={this.state.haspower} 
                    onChange={(value) => this.handleStatusChange(value)} 
                  />
              </FormItem>
            </Col>
        </Row>


        <Row gutter={24}> 
            <Col span={12}>
              <FormItem label="空闲机架"  {...formItemLayout} >
                  
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="空闲网口"  {...formItemLayout} >
                
              </FormItem>
            </Col>
        </Row>

        <Divider style={{ marginBottom: 32 }} />
      

      <Row gutter={24} style={{ marginBottom: 32 }}>
      <Col span={24} key={2} style={{ display: 'block' ,fontSize: 20 }}>
      机架信息
      </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24} key={2} style={{ display: 'block' }}>
            <Button type="danger" onClick={this.handleAdd} style={{ width: '15%' }}>
              <Icon type="plus-square" /> 添加机架
          </Button>
      </Col>

        </Row>
       
        <Row>
          <Table
           rowKey={record => record.ID}
          style={{ marginBottom: 24 }}
//          rowClassName={() => 'editable-row'}
          bordered
          dataSource={this.state.baydata}
          columns={columns}
        />
           
            </Row>
            <Row gutter={24} style={{ marginBottom: 32 }}>
         
         <Col span={24} style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Divider type="vertical" />
          <Button onClick= {() => this.reback()}>返回</Button>
        </Col>
          </Row>
          </Form>
          </Card>
    );
  }
}
