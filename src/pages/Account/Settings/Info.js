import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu,Row, Col, Card } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

const { Item } = Menu;

export default
@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Info extends PureComponent {
    render() {
        return (
            <div>
              <Row>
                <Col>
                  <Card></Card>
                </Col>
              </Row>
            </div>
        )
    }
}
