import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tree, Input, Card, Row, Col } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TreeTab from '../../components/ProjectTable/treeTab';
import styles from './project.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const { TextArea } = Input;

@connect(props => props)
export default class TableTree extends PureComponent {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gproline/getTree',
    });
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onChange = e => {
    const value = e.target.value;
    const expandedKeys = dataList
      .map(item => {
        if (item.key.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const { gproline } = this.props;
    console.log(this.props);
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={title} id={item.id} data-key={item.id} />;
      });
    return (
      <Row gutter={24}>
        <Col span={6} style={{ paddingRight: 0 }}>
          <Card>
            <div>
              <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
              <Tree
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
              >
                {loop(gproline.treedata.data)}
              </Tree>
            </div>
          </Card>
        </Col>
        <Col span={18} style={{ paddingLeft: 0 }}>
          <Card>
            <TreeTab />
          </Card>
        </Col>
      </Row>
    );
  }
}
