import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import pathToRegexp from 'path-to-regexp';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './Info.less';


import QRCode from 'qrcode.react';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

@connect(state => ({
  profile: state.profile,
}))

export default class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchDetailsInfo',
    });
  }


  render() {
    const { stepDirection } = this.state;
    const { profile: { data } } = this.props;
    const action = (
      <div>
        <ButtonGroup>
          <a href={"/#/cuser/modify/" + data.ID}><Button>修改信息</Button></a>
        </ButtonGroup>
      </div>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="4">
        <Description term="用户名">{data.username}</Description>
        <Description term="姓 名">{data.first_name}</Description>
        <Description term="邮箱">{data.email}</Description>
        <Description term="leader">{data.leader}</Description>
        <Description ><QRCode value="http://blog.kukafei520.net/" /></Description>
      </DescriptionList>

    );

    return (

      <PageHeaderLayout
        title={"主机名: " }
        action={action}
        content={description}
      >
      </PageHeaderLayout>
    );
  }
}
