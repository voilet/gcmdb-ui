import React, { PureComponent } from 'react';
import { connect } from 'dva';
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
  Divider,
} from 'antd';

import ProjectLine from '../../../components/ProjectTable/proLine';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './projectline.less';
import AddProline from './addProLine';

const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const { TextArea } = Input;

@connect(props => props)
export default class ProLineList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gproline/getProjectLine',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
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
      type: 'gproline/getProjectLine',
      payload: params,
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'gproline/getProjectLine',
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
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  //保存
  handleSaveData = val => {
    const { ID, title, alias, remarks, enable } = val;
    const params = {
      ID,
      title: title,
      alias: alias,
      remarks: remarks,
    };

    this.props.dispatch({
      type: 'gproline/modifyProjectLine',
      payload: params,
    });
  };

  handleDeleteData = val => {
    const { ID } = val;
    //false是逻辑删除  true是物理删除
    // infolist:{"componentname": "cpu", "ids": [1, 2]}
    let obj = {},
      ids = [];
    ids.push(ID);
    obj.ids = ids;
    this.props.dispatch({
      type: 'gproline/deleteProjectLine',
      payload: {
        tag: false,
        infolist: JSON.stringify(obj),
      },
    });
  };

  render() {
    const { selectedRows, modalVisible, addInputValue } = this.state;

    //const { submitting } = this.props;

    const { gproline, loading, submitting, dispatch } = this.props;

    //console.log('gproline.prolinedata', gproline.prolinedata)

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Row gutter={16}>
                <Col span={2}>
                  <AddProline />
                </Col>
                <Col span={2} />
              </Row>
            </div>
            <Divider> 产品线列表 </Divider>
            <ProjectLine
              selectedRows={selectedRows}
              // loading={loading}
              dispatch={dispatch}
              handleSaveData={this.handleSaveData}
              handleDeleteData={this.handleDeleteData}
              prolinedata={gproline.prolinedata}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
