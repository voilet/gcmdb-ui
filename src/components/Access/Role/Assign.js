import React from 'react'
import { Modal, Table, Switch, Button,Tag,notification } from 'antd'
import PropTypes from 'prop-types'

import style from './assignModal.less'

const columns = [{
    title: '资源名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '类别',
    dataIndex: 'rtype',
    key: 'rtype',
    width: '100px',
    render: (text, record) =>{ 
        console.log("text",text)
        let val 
        if (text == 0) {
            val =  <Tag color="#108ee9">区域</Tag>
        } else if (text == 1) {
            val =  <Tag color="#009900">菜单</Tag>
        } else {
            val =  <Tag color="#944dff">按钮</Tag>
        }
        return(
        <div>
          {val}
        </div>
        )
      },
}, {
    title: '地址',
    dataIndex: 'link_url',
    width: '30%',
    key: 'link_url',
}]


const openNotificationWithIcon = (type,content) => {
    notification[type]({
      message: '通 知 栏',
      description: content,
    });
  };

class Assign extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpandAll: true,
            expandItem: [],
            selectedRowKeys: [],
            visible: false,
        }

        this.expandItem = []
        this.selectedRowKeys = []
        this.params = {}

        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                const resourceIds = selectedRows.map(row => row.ID)
                this.params.resourceIds = resourceIds
            },

            onSelect: (record, selected, selectedRows) => {
                const { selectedRowKeys } = this.state
                if (selected) {
                    selectedRowKeys.push(record.ID)
                } else {
                    const index = selectedRowKeys.indexOf(record.ID)
                    selectedRowKeys.splice(index, 1)
                }
                this.setState({
                    selectedRowKeys,
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                const { selectedRowKeys } = this.state
                if (selected) {
                    changeRows.forEach(row => {
                        selectedRowKeys.push(row.ID)
                    })
                } else {
                    selectedRowKeys.splice(0, selectedRowKeys.length)
                }
                this.setState({
                    selectedRowKeys,
                })
            },
            selectedRowKeys: this.state.selectedRowKeys,
        }
    }

    getExpandKeys = data => {
     
        data.forEach(item => {
            if (item.has_licence === 1) {
                this.selectedRowKeys.push(item.ID)
            }
            if (item.children) {
                this.expandItem.push(item.ID)
                this.getExpandKeys(item.children)
            }
        })

     
    }

    getAssingInfo = record => {
        const  roleId  = record
        const { dispatch } = this.props
 
        dispatch({
            type: 'grole/getRoleResource',
            payload: {
                roleid:roleId,
                cb: (val) => {
                    this.getExpandKeys(val.data)
                    this.initExpandItem()
                }
            },

        })


        this.setState({
            visible: true,
        })
        
        this.params.roleId = roleId
        this.params.resourceIds = this.selectedRowKeys
    }

    initExpandItem = () => {
        const { selectedRowKeys, expandItem } = this.state

        this.expandItem.forEach(item => {
            expandItem.push(item)
        })

        this.selectedRowKeys.forEach(item => {
            selectedRowKeys.push(item)
        })

    
        this.setState({
            expandItem,
            selectedRowKeys,
        })
    }

    submitAssign = () => {
        console.log('分配成功,请求参数为：', )
        const { dispatch } = this.props
 
        dispatch({
            type: 'grole/allocateRoleResource',
            payload: {
                description: this.params,
                cb: (info) => {
                    if (info.status == '200'){
                        openNotificationWithIcon('success',"分配权限成功!~ ~")
                      } else {
                        openNotificationWithIcon('error',"分配权限失败!~ ~")
                      }
                }
            },

        })

        this.setState({
            visible: true,
        })

        this.init()


    }

    cancelAssign = () => {
        this.init()
    }

    init = () => {
        const { selectedRowKeys } = this.state
        this.params = {}
        this.selectedRowKeys = []
        this.expandItem = []
        selectedRowKeys.splice(0, selectedRowKeys.length)
        this.setState({
            isExpandAll: true,
            visible: false,
            selectedRowKeys,
            expandItem: [],
        })
    }

    expandSwitch = isExpandAll => {
        const tempArr = []
        this.expandItem.forEach(item => {
            tempArr.push(item)
        })
        this.setState({
            isExpandAll,
            expandItem: isExpandAll ? tempArr : [],
        })
    }

    expandRow = (expanded, record) => {
        
        const { expandItem } = this.state

        if (expanded) {
            expandItem.push(record.ID)
        } else {
            const index = expandItem.indexOf(record.ID)
            expandItem.splice(index, 1)
        }

        this.setState({
            expandItem,
            isExpandAll: expandItem.length === this.expandItem.length,
        })
    }
 

    render() {
        const {
            assignInfo,
            record,
        } = this.props

        const { expandItem, isExpandAll, visible } = this.state

        return (
            <React.Fragment>
                <Button onClick={() => this.getAssingInfo(record)}>分配</Button>
                <Modal
                    title="选择资源"
                    visible={visible}
                    onOk={this.submitAssign}
                    onCancel={this.cancelAssign}
                    okText="保存"
                    width={1000}
                >
                    <div className={style['switch-btn-block']}>
                        <Switch checkedChildren="全部展开" unCheckedChildren="全部收缩" checked={isExpandAll} onChange={this.expandSwitch} />
                    </div>
                    <div className={style['table-block']}>
                        <Table
                            pagination={false}
                            columns={columns}
                            rowSelection={this.rowSelection}
                            dataSource={assignInfo.data}
                            expandedRowKeys={expandItem}
                            onExpand={this.expandRow}
                            rowKey={record => record.ID}
                        />
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Assign

// Assign.propTypes = {
//     record: PropTypes.object,
//     assignInfo: PropTypes.array,
// }

// Assign.defaultProps = {
//     record: {},
//     assignInfo: [],
// }
