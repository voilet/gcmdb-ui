import React from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends React.Component {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    console.log("Authorized++++++++++++++")
    console.log(authority)
    console.log(childrenRender)
    console.log(noMatch)
    console.log( CheckPermissions(authority, childrenRender, noMatch))
    console.log("Authorized**************")
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
