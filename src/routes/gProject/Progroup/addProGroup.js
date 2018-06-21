import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './projectgroup.less';
import { Card, Form, Input, Select, Icon, Button, Modal, message, Radio } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const { TextArea } = Input;
const RadioGroup = Radio.Group;

@connect(props => props)
@Form.create()
export default class AddProgroup extends PureComponent {
  state = {
    modalVisible: this.props.visible,
    showFormProline: true,
    valueProline: 2,
    selectedLineValue: '选择产品线',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gproline/getProjectLine',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = () => {
    const form = this.props.form;

    form.validateFields(err => {
      if (err) return;
    });

    let lineid = null;

    lineid = this.state.selectedLineValue;
    console.log('lineid:', lineid);

    const groupfields = {
      title: form.getFieldValue('title') ? form.getFieldValue('title') : '',
      alias: form.getFieldValue('alias') ? form.getFieldValue('alias') : '',
      remarks: form.getFieldValue('remarks') ? form.getFieldValue('remarks') : '',
      line: lineid,
    };

    this.props.dispatch({
      type: 'gproline/addProjectgroup',
      payload: {
        description: groupfields,
      },
    });

    this.setState({
      modalVisible: false,
    });

    form.resetFields();
  };

  handleLineStatus = e => {
    //已上线
    if (e.target.value == 1) {
      this.setState({
        showFormProline: false,
        valueProline: e.target.value,
      });
    } else {
      this.setState({
        showFormProline: true,
        valueProline: e.target.value,
      });
    }
  };

  handleSelectLineValue = value => {
    this.setState({
      selectedLineValue: value,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting, form, dispatch, gproline } = this.props;

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
      <div style={{ float: 'left' }}>
        <Button type="primary" icon="plus" onClick={() => this.handleModalVisible(true)}>
          添加项目组
        </Button>
        <Modal
          title="添加产品线"
          visible={this.state.modalVisible}
          onOk={this.handleAdd}
          width={600}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem {...formItemLayout} label="所属产品线">
            {getFieldDecorator('selectline')(
              <Select
                style={{ width: 120 }}
                showSearch
                placeholder="选择产品线"
                onChange={this.handleSelectLineValue}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {gproline.prolinedata.data.length > 0 &&
                  gproline.prolinedata.data.map(post => {
                    return (
                      <Option key={post.ID} value={post.ID}>
                        {post.title}
                      </Option>
                    );
                  })}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="项目组名称">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入项目组名称',
                },
              ],
            })(<Input placeholder="请输入项目组名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="项目组别名">
            {getFieldDecorator('alias', {
              rules: [{}],
            })(<Input placeholder="请输入项目组别名，使用saltstack时需使用，请使用英文" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="项目组用途描述">
            {getFieldDecorator('remarks', {
              rules: [
                {
                  required: true,
                  message: '请简要描述项目组用途',
                },
              ],
            })(<TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="排序">
            {getFieldDecorator('order', {
              rules: [{}],
            })(<Input placeholder="-99排序为最高，生成tree时使用" />)}
          </FormItem>
        </Modal>
      </div>
    );
  }
}
