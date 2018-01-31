import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Tree, Input  } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';
import WorkplaceTable from '../../components/WorkplaceTable';

import styles from './Workplace.less';
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

@connect(({ project, activities, chart, rule, loading }) => ({
  project,
  activities,
  chart,
  rule,
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))


export default class Workplace extends PureComponent {
  state = {
    formValues: {},
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
    dispatch({
      type: 'rule/assetsList',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/assetsList',
      payload: params,
    });
  }

  render() {
    const { rule: { loading: ruleLoading, data } } = this.props;
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>友情提示：谨慎操作，规避风险</div>
          <div>如有任何系统问题，请随时联系运维人员 | 运维邮箱op@fun.tv </div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>8<span> / 24</span></p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="产品线"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Tree
                showLine
                defaultExpandedKeys={['0-0-0']}
                onSelect={this.onSelect}
              >
                <TreeNode title="parent 1" key="0-0">
                  <TreeNode title="parent 1-0" key="0-0-0">
                    <TreeNode title="leaf" key="0-0-0-0" />
                    <TreeNode title="leaf" key="0-0-0-1" />
                    <TreeNode title="leaf" key="0-0-0-2" />
                  </TreeNode>
                  <TreeNode title="parent 1-1" key="0-0-1">
                    <TreeNode title="leaf" key="0-0-1-0" />
                  </TreeNode>
                  <TreeNode title="parent 1-2" key="0-0-2">
                    <TreeNode title="leaf" key="0-0-2-0" />
                    <TreeNode title="leaf" key="0-0-2-1" />
                  </TreeNode>
                </TreeNode>
              </Tree>
            </Card>
          </Col>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="服务器列表"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <WorkplaceTable
                style={{ margin: 10 }}
                loading={ruleLoading}
                data={data}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
