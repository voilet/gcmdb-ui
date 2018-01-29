import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(state => ({
  submitting: state.form.regularFormSubmitting,
  rule: state.form,
  profile: state.profile,
}))



class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'form/getIdcQuery',
    });

    dispatch({
      type: 'form/getProject',
    });

    dispatch({
      type: 'form/getEnv',
    });
    dispatch({
      type: 'form/getOs',
    });
    dispatch({
      type: 'form/getEquipment',
    });
    dispatch({
      type: 'form/getHardware',
    });

    dispatch({
      type: 'profile/fetchDetails',
      payload: this.props.match.params.id,
    });

    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = this.props.form;
    const { rule: { idc ,project, env, os, equipment, hardware } } = this.props;
    const { profile: { data } } = this.props;

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <PageHeaderLayout
        title="添加资产"
        content="收集整理线上所有服务器资产表"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="基础数据" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="主机名">
                  {getFieldDecorator('fqdn', {
                    initialValue: data.fqdn, //默认值
                    rules: [{
                      required: true, message: '主机名必填',
                    }],
                  })(
                    <Input placeholder="输入主机名，主机名会和以后自动化相关联" />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="网卡1">
                  {getFieldDecorator('eth1', {
                    initialValue: data.eth1, //默认值
                    rules: [{
                      required: true, message: 'ip地址必填',
                    }],
                  })(
                    <Input placeholder="请输入第一块网卡ip地址或pxe网卡的ip地址" />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label="MAC">
                  {getFieldDecorator('mac', {
                    initialValue: data.mac, //默认值
                    rules: [{
                      required: true, message: 'mac必填，装机需使用',
                    }],
                  })(
                    <Input placeholder="请输入pxe网卡的mac地址"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="远控卡">
                  {getFieldDecorator('internal_ip', {
                    initialValue: data.internal_ip, //默认值
                  })(
                    <Input placeholder="请输入远控卡地址"/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="资产编号">
                  {getFieldDecorator('asset_number', {
                    initialValue: data.asset_number, //默认值
                  })(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label="SN编号">
                  {getFieldDecorator('serialnumber', {
                    initialValue: data.serialnumber, //默认值
                  })(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="快速服务编码">
                  {getFieldDecorator('service_code', {
                    initialValue: data.service_code, //默认值
                  })(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="购买时间">
                  {getFieldDecorator('start_guaratee', {

                  })(
                    <DatePicker style={{ width: '100%' }} placeholder={'购买时间'} />
                  )}
                </Form.Item>
              </Col>

              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label="保修时间">
                  {getFieldDecorator('stop_guaratee', {
                    // initialValue: data.stop_guaratee,
                  })(
                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} placeholder={'保修结止日期'} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="设备状态">
                  {getFieldDecorator('status', {
                    initialValue: data.status, //默认值
                    rules: [{ required: true, message: '设备状态必选' }],
                  })(
                    <Select
                      showSearch
                      placeholder="设备状态"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="0">关闭</Option>
                      <Option value="1">运行中</Option>
                      <Option value="2">已上线</Option>
                      <Option value="3">异常</Option>
                      <Option value="4">安装系统中</Option>
                      <Option value="5">报废</Option>

                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>

              </Col>

              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="硬件情况" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="所属机房">
                  {getFieldDecorator('idc', {
                    initialValue: data.idc.idc_name, //默认值
                    rules: [{ required: true, message: '机房必选' }],
                  })(
                    <Select
                      showSearch
                      placeholder="选择机房"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {idc.data.map(post =>
                        <Option key={post.ID}>{post.idc_name}</Option>
                      )}

                    </Select>
                  )}
                </Form.Item>
              </Col>


              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="所属业务">
                  {getFieldDecorator('project', {
                    rules: [{ required: true, message: '必选' }],
                  })(
                    <Select
                      showSearch
                      placeholder="选择业务"
                      optionFilterProp="children"
                      mode="multiple"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {project.data.map(post =>
                        <Option key={post.ID}>{post.title}</Option>
                      )}

                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label="所属环境">
                  {getFieldDecorator('env', {
                    initialValue: data.env.title, //默认值
                    rules: [{ required: true, message: '必选' }],
                  })(
                    <Select
                      showSearch
                      placeholder="选择业务环境"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {env.data.map(post =>
                        <Option key={post.ID}>{post.title}</Option>
                      )}

                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="硬件厂商">
                  {getFieldDecorator('hardware', {
                    initialValue: data.hardware_vendor.title, //默认值
                    rules: [{ required: true, message: '必选' }],
                  })(
                    <Select
                      showSearch
                      placeholder="选择硬件厂商"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {hardware.data.map(post =>
                        <Option key={post.ID}>{post.title}</Option>
                      )}

                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="硬件类型">
                  {getFieldDecorator('equipment', {
                    initialValue: data.hardware_type.title, //默认值
                    rules: [{ required: true, message: '必选' }],
                  })(
                    <Select
                      showSearch
                      placeholder="选择硬件类型"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {equipment.data.map(post =>
                        <Option key={post.ID}>{post.title}</Option>
                      )}

                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label="所属系统">
                  {getFieldDecorator('os', {
                    initialValue: data.os.title, //默认值
                    rules: [{ required: true, message: '必选' }],
                  })(
                    <Select
                      showSearch
                      placeholder="选择系统"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {os.data.map(post =>
                        <Option key={post.ID}>{post.title}</Option>
                      )}

                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="机柜信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="所属机柜">
                  {getFieldDecorator('cabinet',{
                    initialValue: data.cabinet, //默认值
                  })(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="机位号">
                  {getFieldDecorator('server_cabinet_id', {initialValue: data.server_cabinet_id})(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label="交换机端口">
                  {getFieldDecorator('switch_port', {initialValue: data.switch_port})(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
  submitting: state.form.advancedFormSubmitting,
}))(Form.create()(AdvancedForm));
