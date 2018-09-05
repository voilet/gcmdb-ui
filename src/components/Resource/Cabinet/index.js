import { Table, Popconfirm, Divider } from 'antd';
import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';

import styles from './index.less';



class CabTable extends PureComponent {
  state = {
    data: [],
    oldParentData: [],
    status: false,
    disabled: true,
    rateValue: 3,
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'num',
      width: '20px',
      render (text, record, index) {
         return index
       } 
    },
    {
      title: '机柜名称',
      dataIndex: 'cabinet_name',
      width: '100px',
    },
    {
      title: '电量',
      dataIndex: 'power',
      width: '100px',
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      width: '100px',
    },
    {
      title: '空闲机架',
      dataIndex: 'cableport',
      width: '100px',
    },
    {
      title: '详情',
      dataIndex: 'bay_details',
      width: '100px',
      render: (text,record) => {
        var divStyle = {
          color: 'red',
          textAlign:'center'
        };
        return(
          <span>
            <a onClick={() => this.show(record.ID)} style={divStyle}>机柜详情</a>
          </span>
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: '100px',
    },
    {
      title: '操作',
      dataIndex: 'idcname',
      width: '200px',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            {
               <span>
               <a onClick={() => this.edit(record.ID)}>编辑机柜</a>
               </span>
            }
            <Divider  type="vertical"/>
            {
              <Popconfirm title="确定删除?" onConfirm={() => this.confirmdelete(record.ID)}>
              <a>删除机柜</a>  
              </Popconfirm> 
            }
          </div>
        );
      },
    },
  ];

  componentWillReceiveProps(nextProps) {
    if (nextProps.cabinet.data) {
      this.setState({
        data: nextProps.cabinet.data
      });
    }
  }
 
  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }


 
  confirmdelete(key) {

    const { data } = this.state;
    const newData = [...data];

    const target = newData.filter(item => key === item.ID)[0];

    console.log("target",target)

    if (target) {
      const index = newData.indexOf(target);
      if (index > -1) {
        newData.splice(index, 1);
      }
      target.tag = false;

            

      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
      this.handleDelete(key);
    }
  }

  handleDelete = (key) => {
    console.log("key",key)
    const {dispatch} = this.props
    dispatch({
      type: 'gidc/deleteCabinet',
      payload: key,
    });   
  }

  edit(key) {    
    console.log("edit key",key)
    const { dispatch} = this.props; 
    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/idc/cabinet/edit',
                query:{id: key}
            }
    ));
  }

  show(key) {   
    const { dispatch} = this.props; 
    dispatch(
        routerRedux.push(
            {
                pathname: '/resource/idc/cabinet/detail',
                query:{id: key}
            }
    ));
    
  }

  render() {



    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
     // ...gdevice.pagination,
    };


    return (
      <div className={styles.standardTable}>
        <Table
          bordered
          rowKey={record => record.ID}
          dataSource={this.state.data}
          columns={this.columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default CabTable;
