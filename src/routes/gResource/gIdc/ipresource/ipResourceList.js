
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




import IpTable from '../../../../components/Resource/IpTable';


import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import AddResource from './addipResource'
import styles from './ipresouce.less'

const FormItem = Form.Item;
const Search = Input.Search;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect((props) => (props))

@Form.create()

export default class ipResourceList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    enable:false,
    data: [],
  };

  componentWillReceiveProps(nextProps) {
    // clean state
   
  }


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gidc/queryIpResource',
    });

    dispatch({
      type: 'gidc/queryIpClassify',
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
      type: 'gidc/queryIpResource',
      payload: params,
    });
  }

  
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
    
  }

  //保存编辑数据
  handleSaveData = (val) => {
    this.props.dispatch({
      type: 'gidc/modifyIpResource',
      payload: val 
    });
  }
  
  //删除单条数据
  handleDeleteData = (val,tag) => {
    let arr1 = new Array()
  
    if (!isNaN(val.ID)) {
      console.log("xxxxxxxx")
      arr1.push(val.ID)
    } else {
      arr1 = val
    }
 
    const fields = {
      "ipaddrlist": JSON.stringify({data: arr1}),
      "tag": val.tag
      }

    this.props.dispatch({
      type: 'gidc/deleteIpResource',
      payload: fields 
    });

  }

  handleMenuClick = (val) => {
     if (val == "remove") {
      handleDeleteData(this.state.selectedRows)
     }
  }
 
  render() {
    const { gidc } = this.props;
    const {selectedRows,enable} = this.state;
    
    if (gidc.ipcheck.data == "ok") {
        this.setState({enable : true}) 
    }

    console.log("this.props",this.props)
    
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">开启预留</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="ip资源列表">
        <Card bordered={false}>
          <div className={styles.tableList}>  
          <div style={{height:40}}>
            <AddResource 
            ipclassify = {gidc.ipclassify}
            ipcheck = {gidc.ipcheck}
            checkloading = {gidc.loading}
            enable = {enable}
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
               <Search
            placeholder="搜索ip"
            onSearch={value => console.log(value)}
            enterButton />  
          </div> 

            <Divider>  IP资源数据  </Divider>
            <IpTable
              selectedRows={selectedRows}
              ipresource={gidc.ipresource}
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
