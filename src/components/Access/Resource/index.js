import React from 'react'
import { Tag, Table, Divider , Button } from 'antd'
import PropTypes from 'prop-types'

import style from './index.less'
import EditModal from './EditModal'

const ButtonGroup = Button.Group

class ResourceTable extends React.Component {
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
        this.columns = [{
            title: '资源名称',
            dataIndex: 'name',
            key: 'name',
            width: '150px',
        }, {
            title: '类别',
            dataIndex: 'rtype',
            key: 'rtype',
            width: '100px',
            render: (text, record) =>{ 
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
            width: '100px',
            key: 'link_url',
        },
        {
            title: '顺序',
            dataIndex: 'seq',
            key: 'seq',
            width: '100px',
            render: (text, record) => {
              const seqText = record.seq ? <span className={style['seq-text']}>{record.seq}</span> : <span />
              return seqText
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:'200px',
            render: (text, record) => {
              const { dispatch, resourcedata = [] } = this.props
              const optionItem = (<EditModal dispatch={dispatch} record={record} resource={resourcedata} key={record.ID} />)
              return optionItem
          },
        }]    
    }

    componentWillReceiveProps = () => {
        const {resourcedata} = this.props 
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
        // console.log('分配成功,请求参数为：', this.params)
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

    expandAll = () => {
        const  {resourcedata} = this.props
        this.getExpandKeys(resourcedata)
        this.initExpandItem()


        const tempArr = []
        this.expandItem.forEach(item => {
            tempArr.push(item)
        })
        this.setState({
            isExpandAll: true,
            expandItem: tempArr,
        })
        // console.log("isExpandAll",this.state.isExpandAll)
        // console.log("expandItem",this.state.expandItem)
    }

    lessenAll = () => {
        this.setState({
            isExpandAll: false,
            expandItem: [],
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
            resourcedata,
            record,
        } = this.props

        const { expandItem, isExpandAll, visible } = this.state

        return (
            <React.Fragment>
                
              <div className={style['switch-btn-block']}>
                      {/* <Switch checkedChildren="全部展开" unCheckedChildren="全部收缩" checked={isExpandAll} onChange={this.expandSwitch} /> */}
              <ButtonGroup>
                <Button type="primary" onClick={this.expandAll}>全部展开</Button>
                <Button onClick={this.lessenAll}>全部收缩</Button>
              </ButtonGroup>
              <Divider />

            </div>
            <div className={style['table-block']}>
                <Table
                    pagination={false}
                    columns={this.columns}
                    dataSource={resourcedata}
                    expandedRowKeys={expandItem}
                    onExpand={this.expandRow}
                    rowKey={record => record.ID}
                    scroll={{ y: 960 }} 
                />
            </div>      
            </React.Fragment>
        )
    }
}

export default ResourceTable

// Assign.propTypes = {
//     record: PropTypes.object,
//     assignInfo: PropTypes.array,
// }

// Assign.defaultProps = {
//     record: {},
//     assignInfo: [],
// }
