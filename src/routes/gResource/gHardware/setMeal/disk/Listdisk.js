
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  message,
  Divider
} from 'antd';

import CabTable from '../../../../../components/Resource/Disk';
import PageHeaderLayout from '../../../../../layouts/PageHeaderLayout';
import AddDisk from './addDisk'
import styles from './Disk.less'
import ghardware from '../../../../../models/ghardware';

const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class Listdisk extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'ghardware/queryHardwareComponents',
      payload:`disk`
    });

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
      type: 'ghardware/queryHardwareComponents',
      payload:`disk`
    });
  }

  
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
    
  }

  //保存编辑数据
  handleSaveData = (val) => {
    // this.props.dispatch({
    //   type: 'ghardware/modifyHardwareComponents',
    //   payload: val 
    // });
  }
  
  //删除单条数据
  handleDeleteData = (val) => {
    console.log(val)
    const { ID } = val
    //false是逻辑删除  true是物理删除
    // infolist:{"componentname": "cpu", "ids": [1, 2]}
    let obj = {},ids=[]
    obj.componentname='disk'
    ids.push(ID)
    obj.ids=ids
    this.props.dispatch({
      type: 'ghardware/deleteHardwareComponents',
      payload: {
        tag:false,
        infolist:JSON.stringify(obj)
      }
    });
}


//批量开启机房 
// handleOpenAllstatus = (val) => {

// }

// handleMenuClick = (val) => {
//    if (val.key == "approval") {
       
//    } 
// }
 
  render() {
    const { ghardware } = this.props;
    const {selectedRows} = this.state;
    console.log("this.props",this.props)

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="approval">批量开启</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="硬盘套餐">
        <Card bordered={false}>
          <div className={styles.tableList}>  
          <div style={{height:40}}>
            <AddDisk
              //dispatch = {this.props.dispatch}
              hardwaredata = {ghardware.allinfo}
              />
              {
                selectedRows.length > 0 && (
                  <div >
                    <Dropdown overlay={menu} >
                      <Button >
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </div>
                )
              }  
          </div> 
          <Divider>  硬盘数据  </Divider>
            <CabTable
              selectedRows={selectedRows}
              //loading={ruleLoading}
              ghardware={ghardware.allinfo}
              handleSaveData = {this.handleSaveData}
              handleDeleteData = {this.handleDeleteData}
              handleSelectRows={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
        </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
