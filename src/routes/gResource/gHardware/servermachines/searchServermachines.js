import React, { PureComponent } from 'react';

import styles from './servermachines.less';

import { Form, Row, Col, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class SearchServermachines extends PureComponent {
  state = {
    expand: false,
  };

  componentWillReceiveProps(nextProps) {}

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    //this.props.form.resetFields();
    console.log('123');
  };

  getFields() {
    const count = this.state.expand ? 10 : 8;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  render() {
    return (
      <div className={styles.tableListOperator} style={{ float: 'left' }}>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
