(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"0evu":function(e,t,n){e.exports={main:"antd-pro-gcmdb-ui-src-pages-account-settings-info-main",leftmenu:"antd-pro-gcmdb-ui-src-pages-account-settings-info-leftmenu",right:"antd-pro-gcmdb-ui-src-pages-account-settings-info-right",title:"antd-pro-gcmdb-ui-src-pages-account-settings-info-title"}},"N01/":function(e,t,n){"use strict";var a=n("0ZgE"),i=n("VY4n");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(n("TFzq")),u=a(n("DEU0")),r=a(n("+hkI")),c=a(n("54rf")),l=a(n("oHNe"));n("wPR8");var o,d,f=a(n("cmPo")),m=i(n("bRCM")),p=n("rAnT"),g=a(n("YTOD")),h=n("zccq"),v=a(n("v99g")),y=a(n("0evu")),M=f.default.Item,b=(o=(0,p.connect)(function(e){return{currentUser:e.user.currentUser}}))(d=function(e){function t(e){var n;(0,s.default)(this,t),n=(0,r.default)(this,(0,c.default)(t).call(this,e)),n.getmenu=function(){var e=n.state.menuMap;return Object.keys(e).map(function(t){return m.default.createElement(M,{key:t},e[t])})},n.getRightTitle=function(){var e=n.state,t=e.selectKey;return e.menuMap[t]},n.selectKey=function(e){var t=e.key;g.default.push("/account/settings/".concat(t)),n.setState({selectKey:t})},n.resize=function(){n.main&&requestAnimationFrame(function(){var e="inline",t=n.main.offsetWidth;n.main.offsetWidth<641&&t>400&&(e="horizontal"),window.innerWidth<768&&t>400&&(e="horizontal"),n.setState({mode:e})})};var a=e.match,i=e.location,u={base:m.default.createElement(h.FormattedMessage,{id:"app.settings.menuMap.basic",defaultMessage:"Basic Settings"}),security:m.default.createElement(h.FormattedMessage,{id:"app.settings.menuMap.security",defaultMessage:"Security Settings"}),binding:m.default.createElement(h.FormattedMessage,{id:"app.settings.menuMap.binding",defaultMessage:"Account Binding"}),notification:m.default.createElement(h.FormattedMessage,{id:"app.settings.menuMap.notification",defaultMessage:"New Message Notification"})},l=i.pathname.replace("".concat(a.path,"/"),"");return n.state={mode:"inline",menuMap:u,selectKey:u[l]?l:"base"},n}return(0,l.default)(t,e),(0,u.default)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.resize),this.resize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resize)}},{key:"render",value:function(){var e=this,t=this.props,n=t.children;if(!t.currentUser.userid)return"";var a=this.state,i=a.mode,s=a.selectKey;return m.default.createElement(v.default,null,m.default.createElement("div",{className:y.default.main,ref:function(t){e.main=t}},m.default.createElement("div",{className:y.default.leftmenu},m.default.createElement(f.default,{mode:i,selectedKeys:[s],onClick:this.selectKey},this.getmenu())),m.default.createElement("div",{className:y.default.right},m.default.createElement("div",{className:y.default.title},this.getRightTitle()),n)))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.match,a=e.location,i=a.pathname.replace("".concat(n.path,"/"),"");return i=t.menuMap[i]?i:"base",i!==t.selectKey?{selectKey:i}:null}}]),t}(m.Component))||d;t.default=b}}]);