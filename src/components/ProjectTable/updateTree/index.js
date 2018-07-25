import { Icon, Button, Tooltip } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

@connect(props => props)
class updateTree extends PureComponent {
  updateTree = () => {
    this.props.dispatch({
      type: 'gproline/updateTree',
    });
  };

  render() {
    return (
      <Fragment>
        <Tooltip title="更新产品树">
          <Button icon="bars" onClick={() => this.updateTree()} />
        </Tooltip>
      </Fragment>
    );
  }
}

export default updateTree;
