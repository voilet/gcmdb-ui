import React, { Component, PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu,Row, Col, Card ,Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

const { Item } = Menu;

export default
@connect(({ user }) => ({
  userInfo:user.userInfo
}))
class Info extends PureComponent {

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type:'user/fetchUserInfo'
      });
    }
    onModifyHandler = (e)=>{
        const {dispatch } = this.props;
        dispatch(routerRedux.push({
          pathname : '/account/settings',
        }))
    }
    render() {
        const { form, submitting ,userInfo} = this.props;
        console.log("userInfo", userInfo)
        return (
            <div>
              <Card className={styles.userInfo}>
                <h3>{ userInfo.first_name }的个人信息</h3>
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <img src={ userInfo.avator } style={{ width:200, height:200 }} />
                  </Col>
                </Row>
                <Row gutter={24} style={{marginTop:10}}>
                  <Col xs={24} md={12}>
                    用户名：{ userInfo.username }
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    姓名：{ userInfo.first_name }
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    邮箱：{ userInfo.email }
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    电话：{ userInfo.mobile }
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Button type="submit" onClick={ this.onModifyHandler } className="ant-btn ant-btn-primary ant-btn-lg"><span>修 改</span></Button>
                  </Col>
                </Row>
              </Card>
            </div>
        )
    }
}
