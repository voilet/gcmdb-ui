(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[34],{"0/CR":function(e,t,a){"use strict";var r=a("TqRt"),c=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=r(a("lwsE")),o=r(a("W8MJ")),n=r(a("a1gu")),s=r(a("Nsbk")),i=r(a("7W2i"));a("0lkx");var u=r(a("gEKc"));a("6ASg");var p,d,h=r(a("pKc7")),g=c(a("q1tI")),f=a("7DNP"),y=a("MuoO"),b=r(a("zHco")),k=a("+n12"),v=(r(a("pTAx")),h.default.Option),m=(u.default.TextArea,u.default.Group),j=(p=(0,y.connect)(function(e){return e}),p(d=function(e){function t(){var e,a;(0,l.default)(this,t);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return a=(0,n.default)(this,(e=(0,s.default)(t)).call.apply(e,[this].concat(c))),a.state={activekey:"projectline",selectKey:"exsited"},a.handleTabChange=function(e){var t=a.props,r=t.dispatch,c=t.match;switch(e){case"project":r(f.routerRedux.push("".concat(c.url,"/prolist"))),a.setState({activekey:"project"});break;case"projectgroup":r(f.routerRedux.push("".concat(c.url,"/grouplist"))),a.setState({activekey:"projectgroup"});break;case"projectline":r(f.routerRedux.push("".concat(c.url,"/linelist"))),a.setState({activekey:"projectline"});break;case"deletedlist":r(f.routerRedux.push("".concat(c.url,"/deletedlist"))),a.setState({activekey:"deletedlist"});break;default:break}},a.handleSearch=function(e){var t=a.props.dispatch;"exsited"==a.state.selectKey&&t({type:"gproline/SearchProjectList",payload:{content:e,key:"exsited"}}),"deleted"==a.state.selectKey&&t({type:"gproline/SearchProjectList",payload:{content:e,key:"deleted"}})},a.handleChange=function(e){a.setState({selectKey:e})},a}return(0,i.default)(t,e),(0,o.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.gproline;console.log("searchResult",e),e.prolinedata.data.length>0?this.setState({activekey:"projectline"}):e.progroupdata.data.length>0?this.setState({activekey:"projectgroup"}):this.setState({activekey:"project"})}},{key:"render",value:function(){var e=this.state.activekey,t=this.props,a=t.match,r=t.route,c=(t.location,t.loading,(0,k.getRoutes)(a.path,r));console.log(this.props);var l=[{key:"project",tab:"\u9879\u76ee\u5217\u8868"},{key:"projectgroup",tab:"\u9879\u76ee\u7ec4\u5217\u8868"},{key:"projectline",tab:"\u4ea7\u54c1\u7ebf\u5217\u8868"},{key:"deletedlist",tab:"\u5df2\u5220\u9664\u7684\u9879\u76ee"}],o=g.default.createElement("div",{style:{textAlign:"center"}},g.default.createElement(m,{compact:!0},g.default.createElement(h.default,{size:"large",defaultValue:"\u641c\u7d22\u9879\u76ee",onChange:this.handleChange},g.default.createElement(v,{value:"exsited"},"\u641c\u7d22\u9879\u76ee"),g.default.createElement(v,{value:"deleted"},"\u641c\u7d22\u5220\u9664")),g.default.createElement(u.default.Search,{placeholder:"\u8bf7\u8f93\u5165",enterButton:"\u641c\u7d22",size:"large",onSearch:this.handleSearch,style:{width:522}})));return g.default.createElement(b.default,{title:"\u641c\u7d22\u4e1a\u52a1\u7ebf",content:o,tabList:l,tabActiveKey:e,onTabChange:this.handleTabChange},g.default.createElement(f.Switch,null,c.map(function(e){return g.default.createElement(f.Route,{key:e.key,path:e.path,component:e.component,exact:e.exact})})))}}]),t}(g.PureComponent))||d);t.default=j},pTAx:function(e,t,a){e.exports={tableList:"antd-pro-gcmdb-ui-src-pages-g-project-search-list-tableList",tableListOperator:"antd-pro-gcmdb-ui-src-pages-g-project-search-list-tableListOperator",tableListForm:"antd-pro-gcmdb-ui-src-pages-g-project-search-list-tableListForm",submitButtons:"antd-pro-gcmdb-ui-src-pages-g-project-search-list-submitButtons"}}}]);