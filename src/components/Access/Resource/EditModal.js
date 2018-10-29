import React from 'react'
import { Modal, Form, Input, Select, Row, Col, TreeSelect,Button  } from 'antd'

import style from './editModal.less'

const FormItem = Form.Item
const { Option } = Select
const { Search } = Input
const { confirm } = Modal
const typeError = '区域只能是一级节点，不能有父节点'

const openNotificationWithIcon = (type,content) => {
    notification[type]({
      message: '通 知 栏',
      description: content,
    });
  };



class EditModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            treeData: [],
            newurl: ""
        }
    }

    componentDidMount() {
        const {
            resource,
            record: {
                ID,
            },
        } = this.props
        const treeData = []
        const treeNode = {
            title: '--无--',
            value: 'no_parent',
            key: 'no_parent'
        }
        treeData.push(treeNode)
        this.initTreeSelect(ID, resource, treeData)
        this.setState({
            treeData,
        })
    }

    initTreeSelect = (id, data, treeData) => {
        (data || []).forEach(item => {
            const treeNode = {
                title: item.name,
                value: item.ID,
                key: item.ID
            }
            if (item.ID === id || item.children_id === id) {
                treeNode.disabled = true
            }
            if (item.children) {
                treeNode.children = []
                this.initTreeSelect(id, item.children, treeNode.children)
            }
            treeData.push(treeNode)
        })
    }

    showEditModal = () => {
        this.setState({
            visible: true,
        })
    }

    submitEdit = () => {
        const {
            form: {
                validateFields,
                getFieldsValue,
                setFields,
                getFieldValue,
                resetFields,
            },
        } = this.props

        const type = getFieldValue('type')
        const fatherNode = getFieldValue('fatherNode')
        const {dispatch} = this.props
        

        let typeText = ''
        if (type === 'area') {
            typeText = '区域'
        } else if (type === 'menu') {
            typeText = '菜单'
        } else {
            typeText = '按钮'
        }
        
        if (type !== 'area' && fatherNode === 'no_parent') {
            setFields({
                type: {
                    value: typeText,
                    errors: [new Error(typeError)]
                }
            })
        } else {
            const validateFieldsValue = getFieldsValue()
            validateFields(Object.keys(validateFieldsValue), (err, values) => {
                if (!err) {
                    // 参数正确，发送请求，重置表单
                    if (!values.url) {
                        values.url = ""
                    }

                    if (!values.icon) {
                        values.icon = ""
                    }
                
                    dispatch({
                        type: 'gresource/modifyResourcelist',
                        payload: {
                            description: values,
                            cb: (info) => {
                                if (info.status == '200'){
                                    openNotificationWithIcon('success',"修改资源成功!~ ~")
                                  } else {
                                    openNotificationWithIcon('error',"修改资源失败!~ ~")
                                  }
                            }
                        },
                    })  
                    resetFields()
                    this.closeEdit()
                }
            })
        }
    }

    closeEdit = () => {
        const {
            form: {
                resetFields,
            },
        } = this.props
        this.setState({
            visible: false,
        }, () => {
            resetFields()
        })
    }

    initType = rtype => {
        let type = 'area'
        if (rtype && rtype === 0) {
            type = 'area'
        } else if (rtype && rtype === 1) {
            type = 'menu'
        } else if (rtype && rtype === 2) {
            type = 'button'
        }
        return type
    }

    deleteRes = () => {
        console.log("deleteRes",)
        const { dispatch,
            record:{
                ID: delete_id
            }} = this.props

        confirm({
            title: '请确认',
            content: '您是否要删除所选的项？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                // 确认删除，发送请求
                // 删除成功，则重新load列表
            
                dispatch({
                    type: 'gresource/deleteResourcelist',
                    payload: {
                        description: {
                            resourceid: delete_id
                        },
                        cb: (info) => {
                            if (info.status == '200'){
                                openNotificationWithIcon('success',"删除资源成功!~ ~")
                            } else {
                                openNotificationWithIcon('error',"删除资源失败!~ ~")
                            }
                            // 刷新页面

                        }
                    },
                })
            },
          })
    }


    onSearch = (val) => {
        const {
            form: {
                getFieldValue,
                setFieldsValue,
            }, 
        } = this.props

        const urlfor = getFieldValue('url')

        const {dispatch} = this.props
        dispatch({
            type: 'gresource/getURLforLink',
            payload: {
                UrlFor: urlfor,
                cb: _val => {
                    const {
                        data: {
                            link_url,
                        },
                    } = _val
                    console.log(link_url)
                    setFieldsValue({'afterUrl': link_url})
                }
            },
        })  
    }


    render() {
        const {
            visible,
            treeData,
        } = this.state
        const {
            form: {
                getFieldDecorator,
            },
            record: {
                name,
                rtype,
                link_url,
                seq,
                children_id,
            },
        } = this.props

        let {newurl} = this.state

        return (
            <div>
                <div className={style['edit-option']}>
                    <span onClick={this.showEditModal} className={style['edit-option-text']}>编辑</span>
                    <div className={style['icon-divide']} />
                    <span onClick={this.deleteRes} className={style['edit-option-text']}>删除</span>
                </div>
                <Modal
                    title="编辑资源"
                    visible={visible}
                    onOk={this.submitEdit}
                    onCancel={this.closeEdit}
                    width={800}
                >
                    <div>
                        <Form
                            onSubmit={this.submitEdit}
                        >
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                       label="名称"
                                       className={style['form-item-left']}
                                    >
                                    {
                                        getFieldDecorator('name', {
                                            rules: [{
                                                required: true, message: '名称必填'
                                            }, {
                                                max: 32, message: '最多可输入32个字符',
                                            }],
                                            initialValue: name ? name : '',
                                        })(
                                            <Input placeholder="长度不超过32个字段" />,
                                        )
                                    }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                       label="父节点"
                                       className={style['form-item-right']}
                                    >
                                    {
                                        getFieldDecorator('fatherNode', {
                                            initialValue: children_id && children_id !== 0 ? children_id : 'no_parent',
                                        })(
                                            <TreeSelect
                                                treeDefaultExpandAll={true}
                                                treeData={treeData}
                                            />,
                                        )
                                    }
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="类型"
                                        className={style['form-item-left']}
                                    >
                                    {
                                        getFieldDecorator('type', {
                                            initialValue: this.initType(rtype),
                                        })(
                                            <Select>
                                                <Option value="area">区域</Option>
                                                <Option value="menu">菜单</Option>
                                                <Option value="button">按钮</Option>
                                            </Select>,
                                        )
                                    }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="图标"
                                        className={style['form-item-right']}
                                    >
                                    {
                                        getFieldDecorator('icon', {
                                            rules: [{
                                                max: 32, message: '最多可输入32个字符',
                                            }],
                                        })(
                                            <Input placeholder="长度不超过32个字段" />,
                                        )
                                    }
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="UrlFor"
                                        className={style['form-item-left']}
                                    >
                                    {
                                        getFieldDecorator('url', {
                                        })(
                                            <Input />,
                                        )
                                    }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="顺序"
                                        className={style['form-item-right']}
                                    >
                                    {
                                        getFieldDecorator('sequence', {
                                            rules: [{ required: true, message: '顺序必填' }],
                                            initialValue: seq ? seq : 0,
                                        })(
                                            <Input />,
                                        )
                                    }
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="由UrlFor的值经过路由规则处理后的地址"
                                        className={style['form-item-left']}
                                    >
                                    {
                                        getFieldDecorator('afterUrl', {
                                            initialValue: '',
                                        })(
                                            <Input disabled  className={style['input-value']}/>
                                        )
                                    }
                                        <Button onClick={this.onSearch} type= "primary"> 验证</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Form.create({})(EditModal)
