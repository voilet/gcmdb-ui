import { Table, Input, Popconfirm, Alert, Badge, Divider, Icon, Switch, Rate, Select } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styles from './index.less';
import { stat } from 'fs';

const { Option } = Select;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

class CabTable extends PureComponent {
  state = {
    data: {},
    oldParentData: [],
    cabinetdata: [],
    status: false,
    disabled: true,
    rateValue: 3,
  };

  columns = [
    {
      title: '机柜名称',
      dataIndex: 'cabinet_name',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'cabinet_name'),
    },
    {
      title: '电量',
      dataIndex: 'power',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'power'),
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      width: '100px',
      render: (text, record) => this.renderColumns(text, record, 'capacity'),
    },
    {
      title: '空闲机架',
      dataIndex: 'cableport',
      width: '100px',
      render: (text, record) => this.renderColumns(text, record, 'cableport'),
    },
    {
      title: '详情',
      dataIndex: 'bay_details',
      width: '300px',
      render: (bayData, parentRecord) => {
        let columnsNextTab = [
          {
            dataIndex: 'bay_name',
            width: '20%',
            render: (text, childRecord) =>
              this.renderChangeTab(text, childRecord, parentRecord, 'bay_name'),
          },
          {
            dataIndex: 'height',
            width: '15%',
            render: (text, childRecord) =>
              this.renderChangeSel(text, childRecord, parentRecord, 'height'),
          },
          {
            dataIndex: 'status',
            width: '20%',
            render: (value, childRecord) => {
              return (
                <Switch
                  checked={value}
                  disabled={!parentRecord.tabStatus}
                  checkedChildren="占用"
                  unCheckedChildren="空闲"
                  onChange={value => {
                    this.swithChange(value, childRecord, parentRecord, 'status');
                  }}
                />
              );
            },
          },
        ];

        return (
          <div>
            <Table
              showHeader={false}
              bordered={false}
              rowKey={record => record.ID}
              pagination={{ hideOnSinglePage: true }}
              dataSource={bayData}
              columns={columnsNextTab}
            />
          </div>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: '100px',
      render: (text, record) => this.renderColumns(text, record, 'remarks'),
    },
    {
      title: '操作',
      dataIndex: 'idcname',
      width: '150px',
      render: (text, record) => {
        const { editable, deleteable } = record;
        return (
          <div className="editable-row-operations">
            {!deleteable &&
              (editable ? (
                <span>
                  <a onClick={() => this.save(record.ID)}>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.ID)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a onClick={() => this.edit(record.ID)}>编辑</a>
                </span>
              ))}
            {!editable &&
              (deleteable ? (
                <span>
                  <Popconfirm title="确定删除?" onConfirm={() => this.confirmdelete(record.ID)}>
                    <a>提交</a>
                  </Popconfirm>
                  <Divider type="vertical" />
                  <a onClick={() => this.canceldelete(record.ID)}>取消</a>
                </span>
              ) : (
                <span style={{ marginLeft: 10 }}>
                  <a onClick={() => this.askdelete(record.ID)}>删除</a>
                </span>
              ))}
          </div>
        );
      },
    },
  ];

  componentWillReceiveProps(nextProps) {
    if (nextProps.cabinet.data) {
      this.setState({
        data: nextProps.cabinet.data,
        cabinetdata:
          nextProps.cabinet.data.cabinetdata == undefined
            ? []
            : nextProps.cabinet.data.cabinetdata.map((obj, inx) => {
                obj.tabStatus = false;
                return obj;
              }),
      });
    }
  }
  renderChangeSel(text, childRecord, parentRecord, tabNodeName) {
    const { tabStatus, data } = this.state;
    const bay_heights = data.bay_heights;
    let optionEL = bay_heights.map(obj => {
      return (
        <Option label="bay_heights" key={obj.ID} value={obj.height}>
          {obj.height}
        </Option>
      );
    });
    return (
      <Select
        size="small"
        defaultValue={text}
        disabled={!parentRecord.tabStatus}
        optionFilterProp="children"
        onChange={value => {
          this.slelctChangeTab(value, childRecord, parentRecord, tabNodeName);
        }}
      >
        {optionEL}
      </Select>
    );
  }
  renderChangeTab(text, childRecord, parentRecord, tabNodeName) {
    return parentRecord.tabStatus ? (
      <div className="editable-cell-input-wrapper">
        <Input
          size="small"
          value={text}
          onChange={e => {
            this.handleChangeTab(e, childRecord, parentRecord, tabNodeName);
          }}
        />
      </div>
    ) : (
      <div className="editable-cell-text-wrapper">{text || ' '}</div>
    );
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.ID, column)}
      />
    );
  }
  slelctChangeTab(value, childRecord, parentRecord, tabNodeName) {
    let newData = childRecord;
    newData[tabNodeName] = value;
    this.dataChangeFN(newData, parentRecord, tabNodeName);
  }
  handleChangeTab(e, childRecord, parentRecord, tabNodeName) {
    let newData = childRecord;
    newData[tabNodeName] = e.target.value;
    this.dataChangeFN(newData, parentRecord, tabNodeName);
  }
  swithChange(value, childRecord, parentRecord, tabNodeName) {
    let newData = childRecord;
    newData[tabNodeName] = value;
    this.dataChangeFN(newData, parentRecord, tabNodeName);
  }
  dataChangeFN(newData, parentRecord, tabNodeName) {
    const { cabinetdata } = this.state;
    this.setState({
      cabinetdata: cabinetdata.map(obj => {
        if (obj.ID == parentRecord.ID) {
          let newChildObj = {};
          for (let childKey in parentRecord) {
            if (childKey == tabNodeName) {
              newChildObj[childKey] = parentRecord[childKey].map(childObj => {
                if (childObj.ID == newData.ID) {
                  return newData;
                } else {
                  return childObj;
                }
              });
            } else {
              newChildObj[childKey] = parentRecord[childKey];
            }
          }
          return newChildObj;
        } else {
          return obj;
        }
      }),
    });
  }

  handleChange(value, key, column) {
    const { cabinetdata } = this.state;
    const newData = [...cabinetdata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      target[column] = value;
      this.setState({
        cabinetdata: newData,
        disabled: false,
      });
    }
  }

  edit(key) {
    const { cabinetdata } = this.state;
    const newData = [...cabinetdata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      target.editable = true;
      this.setState({
        disabled: false,
        cabinetdata: newData.map((obj, ind) => {
          if (obj.ID == key) {
            obj.tabStatus = true;
          }
          return obj;
        }),
      });
    }
  }

  save(key) {
    const { cabinetdata } = this.state;
    const newData = [...cabinetdata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      target.enable = this.state.status;
      this.setState({
        cabinetdata: newData.map((obj, ind) => {
          if (obj.ID == key) {
            obj.tabStatus = true;
          }
          return obj;
        }),
        disabled: true,
      });
      this.cacheData = newData.map(item => ({ ...item }));
      this.props.handleSaveData(target);
    }
  }

  cancel(key) {
    const { cabinetdata } = this.state;
    const newData = [...cabinetdata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.editable;
      this.setState({
        cabinetdata: newData.map((obj, ind) => {
          if (obj.ID == key) {
            obj.tabStatus = false;
          }
          return obj;
        }),
        disabled: true,
      });
    }
  }

  askdelete(key) {
    const { cabinetdata } = this.state;
    const newData = [...cabinetdata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      target.deleteable = true;
      this.setState({ cabinetdata: newData });
    }
  }

  confirmdelete(key) {
    const { cabinetdata } = this.state;
    const newData = [...cabinetdata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      const index = newData.indexOf(target);
      if (index > -1) {
        newData.splice(index, 1);
      }
      target.tag = false;

      this.setState({ cabinetdata: newData });
      this.cacheData = newData.map(item => ({ ...item }));
      this.props.handleDeleteData(target);
    }
  }

  canceldelete(key) {
    const { cabinetdata } = this.state;
    const newData = [...cabinetdata];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.deleteable;
      this.setState({ cabinetdata: newData });
    }
  }

  render() {
    const { cabinet, loading } = this.props;
    const { data } = this.state;
    this.cacheData =
      data.cabinetdata == undefined ? [] : data.cabinetdata.map(item => ({ ...item }));
    return (
      <div className={styles.standardTable}>
        <Table
          bordered
          rowKey={record => record.ID}
          dataSource={this.state.cabinetdata}
          columns={this.columns}
          //onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default CabTable;
