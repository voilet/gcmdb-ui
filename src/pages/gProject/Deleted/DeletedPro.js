import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Modal,
  message,
} from 'antd';

import ProGroup from '@/components/ProjectTable/proGroup';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

import styles from './deletedpro.less';
import addProGroup from  './addProGroup'



const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const { TextArea } = Input;



@connect((props) => (props))


export default class ProGroupList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };



  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gproline/getProjectGroup',
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
      type: 'gproline/getProjectGroup',
      payload: params,
    });
  }

  handleRefreshTableChange = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'gproline/getProjectGroup',
      payload: '',
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'gproline/getProjectGroup',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  //保存
  handleSaveData = (val) => {
    console.log(val)
    const { ID, group_id, group_title, line_id, pro_alias, pro_code_url, pro_enable, pro_remarks} = val
    const params = {
      ID,
      title:group_title,
      alias:pro_alias,
      remarks:pro_remarks,
      code_url:pro_code_url,
      enable:pro_enable,
      groupid:group_id,
      lineid:line_id,
    }

    this.props.dispatch({
      type: 'gproline/modifyProject',
      payload: params 
    });
  }

  handleDeleteData = (val) => {
    console.log(val)
    const { ID } = val
    //false是逻辑删除  true是物理删除
    // infolist:{"componentname": "cpu", "ids": [1, 2]}
    let obj = {},ids=[]
    ids.push(ID)
    obj.ids=ids
    this.props.dispatch({
      type: 'gproline/deleteProject',
      payload: {
        tag:false,
        infolist:JSON.stringify(obj)
      }
    });
}


  render() {  
    const {selectedRows, modalVisible, addInputValue} = this.state;
  
    //const { submitting } = this.props;
  
    const { gproline,loading,submitting,dispatch } = this.props;
    
    //console.log('gproline.prolinedata', gproline.prolinedata)
    
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    
    return (
      <PageHeaderLayout title= "项目组列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>

              {/* <AddProline 
                refreshTable = {this.handleRefreshTableChange}
                dispatch = {dispatch}
              />  */}
            </div>
            <ProGroup
              selectedRows={selectedRows}
              // loading={loading}
              dispatch = {dispatch}
              handleSaveData={this.handleSaveData}
              handleDeleteData={this.handleDeleteData}
              progroupdata = {gproline.progroupdata}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
