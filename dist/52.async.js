(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[52],{GsTM:function(e,t,r){"use strict";var a=r("4Gf+"),i=r("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("DxMX");var n=a(r("ivY1"));r("I7Sj");var l=a(r("VQNI"));r("qhfc");var o,s,d=a(r("aEti")),u=i(r("ZS5U")),g=r("rAnT"),c=a(r("uUKN")),p=(o=(0,g.connect)(e=>({isloading:e.error.isloading})),o(s=class extends u.PureComponent{constructor(){super(...arguments),this.state={isloading:!1},this.triggerError=(e=>{this.setState({isloading:!0});var t=this.props.dispatch;t({type:"error/query",payload:{code:e}})})}render(){var e=this.state.isloading;return u.default.createElement(n.default,null,u.default.createElement(l.default,{spinning:e,wrapperClassName:c.default.trigger},u.default.createElement(d.default,{type:"danger",onClick:()=>this.triggerError(401)},"\u89e6\u53d1401"),u.default.createElement(d.default,{type:"danger",onClick:()=>this.triggerError(403)},"\u89e6\u53d1403"),u.default.createElement(d.default,{type:"danger",onClick:()=>this.triggerError(500)},"\u89e6\u53d1500"),u.default.createElement(d.default,{type:"danger",onClick:()=>this.triggerError(404)},"\u89e6\u53d1404")))}})||s);t.default=p},uUKN:function(e,t,r){e.exports={trigger:"antd-pro-pages-exception-style-trigger"}}}]);