
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Divider
} from 'antd';

import CabTable from '../../../../../components/Resource/Adaptor';
import PageHeaderLayout from '../../../../../layouts/PageHeaderLayout';
import AddAdaptor from './addAdaptor'
import styles from './Adaptor.less'

const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class ListAdaptor extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'ghardware/queryHardwareComponentAdaptor',
      payload: `adaptor`
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
      type: 'ghardware/queryHardwareComponentAdaptor',
      payload: `adaptor`
    });
  }

  
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
    
  }

  //保存编辑数据
  handleSaveData = (val) => {
    const { ID, description, num, title, categoryadaptorinfo } = val
    this.props.dispatch({
      type: 'ghardware/modifyHardwareComponents',
      payload: {
        ID,
        componentname: 'adaptor',
        description,
        category: val.categoryadaptorinfo.newId == undefined ? val.categoryadaptorinfo.ID : val.categoryadaptorinfo.newId ,
        num,
        title
      } 
    });
  }
  
  //删除单条数据
  handleDeleteData = (val) => {
    const { ID } = val
    let ids=[]
    ids.push(ID)

    this.props.dispatch({
      type: 'ghardware/deleteHardwareComponents',
      payload: {
        tag:false,
        infolist:JSON.stringify({
          componentname: 'adaptor',
          ids
        })
      }
    });
  }
 
  render() {
    const { ghardware } = this.props;
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="approval">批量开启</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="网卡套餐">
        <Card bordered={false}>
          <div className={styles.tableList}>  
            <div style={{height:40}}>
              <AddAdaptor
                //dispatch = {this.props.dispatch}
                hardwaredata = {ghardware.adaptorInfo}
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
            <Divider>  网卡数据  </Divider>
            <CabTable
              //selectedRows={selectedRows}
              //loading={ruleLoading}
              ghardware={ghardware.adaptorInfo}
              handleSaveData = {this.handleSaveData}
              handleDeleteData = {this.handleDeleteData}
              //handleSelectRows={this.handleSelectRows}
              //onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
