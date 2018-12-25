import { Table, Row, Col } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styles from './index.less';


/* 主机详情 */
class HostDetail extends PureComponent {
  state = {
    lng:{}, //中文表,TODO
    info: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.info) {
      this.setState({
        ...this.state, info: { ...nextProps.info }
      });
    }
    if( nextProps.langMap ){
      this.setState({
        ...this.state, lng: { ...nextProps.langMap }
      });
    }
  }
  

  render() {
    const {info} = this.props;
    let mapKeyVal = ( key, val )=> ( 
      <Row gutter={24}>
        <Col span={8} key={1} style={{ display: 'block' }}>
          {key}
        </Col>
        <Col span={16} key={1} style={{ display: 'block' }}>
          {val}
        </Col>
      </Row>
    )
    
    let mapObject = ( obj )=>{
      let res = [];
      for(var i in obj){
        res.push( mapKeyVal(i,obj[i] ) )
      }
      return res
    }
    return (
      <div className={styles.standardTable}>
        <div>
          { mapObject({"属性":"值"})}
        </div>
        <div>
          { mapObject( info )}
        </div>
      </div>
    );
  }
}

export default HostDetail;
