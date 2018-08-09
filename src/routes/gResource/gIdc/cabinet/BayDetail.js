import React, {PureComponent} from 'react';
import styles from './cabinet.less'
import isEqual from 'lodash/isEqual';
import { routerRedux } from 'dva/router';
import DescriptionList from '../../../../components/DescriptionList';

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
  } from 'antd';

  const { Description } = DescriptionList;
  
@connect((props) => (props))
@Form.create()

export default class BayDetail extends PureComponent {
  
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
              disabled
            />
          </div>
          )   
      }
    }];

    return (
       <Card bordered={false}>
   
        <DescriptionList size="large" title="机柜信息" style={{ marginBottom: 32 }}>
          <Description term="机柜名称">{information.cabinet_name}</Description>
          <Description term="机柜电量">{information.power}</Description>
          <Description term="所属机房">{information.idcname}</Description>
          <Description term="网口数">{information.cableport}</Description>
          <Description term="机柜容量">{information.fqdn}</Description>
          <Description term="机柜状态">{information.mac}</Description>
          <Description term="空闲机架">{information.freecapacity}</Description>
          <Description term="空闲网口"></Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="机柜信息" style={{ marginBottom: 32 }}>

        <Row>
          <Table
           rowKey={record => record.ID}
          style={{ marginBottom: 24 }}
          bordered
          dataSource={this.state.baydata}
          columns={columns}
        />
           
        </Row>
         
          </DescriptionList>
          <Row gutter={24} style={{ marginBottom: 32 }}>
         <Col span={24} style={{ textAlign: 'left' }}>
          <Button onClick= {() => this.reback()}>返回</Button>
        </Col>
          </Row>
          </Card>
    );
  }
}
