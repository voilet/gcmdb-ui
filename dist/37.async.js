(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"3mvc":function(e,t,a){"use strict";var n=a("0ZgE"),l=a("VY4n");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("NG6T");var r=n(a("uZXS")),d=n(a("+wDg"));a("3PXm");var u=n(a("m2aW"));a("s/1u");var o=n(a("TMZs")),i=n(a("TFzq")),c=n(a("DEU0")),s=n(a("+hkI")),f=n(a("54rf")),p=n(a("oHNe"));a("6ASg");var h=n(a("pKc7"));a("0lkx");var m=n(a("gEKc"));a("M50D");var g,v,b,y=n(a("5Zb7")),D=l(a("bRCM")),w=n(a("GjlV")),E=a("rAnT"),I=y.default.Item,C=m.default.TextArea,S=h.default.Option,k=(g=(0,E.connect)(function(e){return e}),v=y.default.create(),g(b=v(b=function(e){function t(){var e,a;(0,i.default)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=(0,s.default)(this,(e=(0,f.default)(t)).call.apply(e,[this].concat(l))),a.state={modalVisible:!1,selectedGroupValue:{}},a.handleModalVisible=function(e){a.setState({modalVisible:!!e})},a.handleAddIDC=function(e){var t=a.props.form;e.preventDefault(),t.validateFields(function(e,n){if(!e){var l={title:t.getFieldValue("title")?t.getFieldValue("title"):"",num:t.getFieldValue("num")?t.getFieldValue("num"):"",category:t.getFieldValue("category")?t.getFieldValue("category"):"",description:t.getFieldValue("description")?t.getFieldValue("description"):"",componentname:"adaptor"};a.props.dispatch({type:"ghardware/addHardwareComponents",payload:{description:l}}),o.default.success("添加成功"),a.setState({modalVisible:!1,enable:!1}),t.resetFields()}})},a}return(0,p.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.props.hardwaredata,n=void 0==a.data.category?[]:a.data.category,l={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}};return D.default.createElement("div",{className:w.default.tableListOperator,style:{float:"left"}},D.default.createElement(u.default,{icon:"plus",type:"primary",onClick:function(){return e.handleModalVisible(!0)}},"添加网卡"),D.default.createElement(r.default,{title:"添加网卡",visible:this.state.modalVisible,onOk:this.handleAddIDC,width:600,onCancel:function(){return e.handleModalVisible()}},D.default.createElement(I,(0,d.default)({},l,{label:"名称"}),t("title",{rules:[{required:!0,message:"请输入网卡名称"}]})(D.default.createElement(m.default,{placeholder:"请输入网卡名称"}))),D.default.createElement(I,(0,d.default)({},l,{label:"数量"}),t("num",{rules:[{required:!0,message:"请输入网卡数量"}]})(D.default.createElement(m.default,{placeholder:"请输入网卡数量"}))),D.default.createElement(I,(0,d.default)({},l,{label:"类型"}),t("category",{rules:[{required:!0,message:"请选择网卡类型"}]})(D.default.createElement(h.default,{style:{width:"100%"},placeholder:"请选择网卡类型"},n.map(function(e){return D.default.createElement(S,{key:e.ID,value:Number(e.ID)},e.title)})))),D.default.createElement(I,(0,d.default)({},l,{label:"描述"}),t("description")(D.default.createElement(C,{style:{minHeight:32},placeholder:"网卡描述",rows:4})))))}}]),t}(D.PureComponent))||b)||b);t.default=k},DcMT:function(e,t,a){e.exports={standardTable:"antd-pro-gcmdb-ui-src-components-resource-adaptor-index-standardTable",tableAlert:"antd-pro-gcmdb-ui-src-components-resource-adaptor-index-tableAlert"}},GjlV:function(e,t,a){e.exports={tableList:"antd-pro-gcmdb-ui-src-pages-g-resource-g-hardware-set-meal-adaptor-adaptor-tableList",tableListOperator:"antd-pro-gcmdb-ui-src-pages-g-resource-g-hardware-set-meal-adaptor-adaptor-tableListOperator",tableListForm:"antd-pro-gcmdb-ui-src-pages-g-resource-g-hardware-set-meal-adaptor-adaptor-tableListForm",submitButtons:"antd-pro-gcmdb-ui-src-pages-g-resource-g-hardware-set-meal-adaptor-adaptor-submitButtons"}},"qO/k":function(e,t,a){"use strict";var n=a("0ZgE"),l=a("VY4n");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("UsS6");var r=n(a("xqAZ"));a("pdEl");var d=n(a("0Hx8"));a("1Y2U");var u=n(a("c8pg"));a("3PXm");var o=n(a("m2aW"));a("xzRB");var i=n(a("TOEs"));a("wPR8");var c=n(a("cmPo")),s=n(a("U2oY")),f=n(a("TFzq")),p=n(a("DEU0")),h=n(a("+hkI")),m=n(a("54rf")),g=n(a("oHNe"));a("M50D");var v,b,y,D=n(a("5Zb7")),w=l(a("bRCM")),E=a("rAnT"),I=n(a("tkzF")),C=n(a("zHco")),S=n(a("3mvc")),k=n(a("GjlV")),V=(D.default.Item,function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")}),x=(v=(0,E.connect)(function(e){return e}),b=D.default.create(),v(y=b(y=function(e){function t(){var e,a;(0,f.default)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=(0,h.default)(this,(e=(0,m.default)(t)).call.apply(e,[this].concat(l))),a.state={selectedRows:[],formValues:{}},a.handleStandardTableChange=function(e,t,n){var l=a.props.dispatch,r=a.state.formValues,d=Object.keys(t).reduce(function(e,a){var n=(0,s.default)({},e);return n[a]=V(t[a]),n},{}),u=(0,s.default)({currentPage:e.current,pageSize:e.pageSize},r,d);n.field&&(u.sorter="".concat(n.field,"_").concat(n.order)),l({type:"ghardware/queryHardwareComponentAdaptor",payload:"adaptor"})},a.handleSelectRows=function(e){a.setState({selectedRows:e})},a.handleSaveData=function(e){var t=e.ID,n=e.description,l=e.num,r=e.title;e.categoryadaptorinfo;a.props.dispatch({type:"ghardware/modifyHardwareComponents",payload:{ID:t,componentname:"adaptor",description:n,category:void 0==e.categoryadaptorinfo.newId?e.categoryadaptorinfo.ID:e.categoryadaptorinfo.newId,num:l,title:r}})},a.handleDeleteData=function(e){var t=e.ID,n=[];n.push(t),a.props.dispatch({type:"ghardware/deleteHardwareComponents",payload:{tag:!1,infolist:JSON.stringify({componentname:"adaptor",ids:n})}})},a}return(0,g.default)(t,e),(0,p.default)(t,[{key:"componentDidMount",value:function(){(0,this.props.dispatch)({type:"ghardware/queryHardwareComponentAdaptor",payload:"adaptor"})}},{key:"render",value:function(){var e=this.props.ghardware,t=this.state.selectedRows,a=w.default.createElement(c.default,{onClick:this.handleMenuClick,selectedKeys:[]},w.default.createElement(c.default.Item,{key:"approval"},"批量开启"));return w.default.createElement(C.default,{title:"网卡套餐"},w.default.createElement(r.default,{bordered:!1},w.default.createElement("div",{className:k.default.tableList},w.default.createElement("div",{style:{height:40}},w.default.createElement(S.default,{hardwaredata:e.adaptorInfo}),t.length>0&&w.default.createElement("div",null,w.default.createElement(u.default,{overlay:a},w.default.createElement(o.default,null,"更多操作 ",w.default.createElement(i.default,{type:"down"}))))),w.default.createElement(d.default,null,"  网卡数据  "),w.default.createElement(I.default,{ghardware:e.adaptorInfo,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData}))))}}]),t}(w.PureComponent))||y)||y);t.default=x},tkzF:function(e,t,a){"use strict";var n=a("VY4n"),l=a("0ZgE");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("ggfa");var r=l(a("M+wZ")),d=l(a("U2oY")),u=l(a("bVKW"));a("8EHj");var o=l(a("6xKx"));a("pdEl");var i=l(a("0Hx8")),c=l(a("TFzq")),s=l(a("DEU0")),f=l(a("+hkI")),p=l(a("54rf")),h=l(a("oHNe"));a("0lkx");var m=l(a("gEKc"));a("6ASg");var g=l(a("pKc7")),v=n(a("bRCM")),b=(l(a("I9Uw")),l(a("DcMT"))),y=(a("gr65"),g.default.Option),D=function(e){var t=e.editable,a=e.value,n=e.onChange;return v.default.createElement("div",null,t?v.default.createElement(m.default,{style:{margin:"-5px 0"},value:a,onChange:function(e){return n(e.target.value)}}):a)},w=function(e){function t(){var e,a;(0,c.default)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=(0,f.default)(this,(e=(0,p.default)(t)).call.apply(e,[this].concat(l))),a.state={selectedRowKeys:[],totalCallNo:0,data:[],category:[],status:!1,disabled:!0},a.columns=[{title:"名称",dataIndex:"title",width:"10%",render:function(e,t){return a.renderColumns(e,t,"title")}},{title:"数量",dataIndex:"num",width:"15%",render:function(e,t){return a.renderColumns(e,t,"num")}},{title:"类型",dataIndex:"categoryadaptorinfo",width:"15%",render:function(e,t){return a.renderSelect(e,t,"categoryadaptorinfo",a.state.category)}},{title:"描述",dataIndex:"description",width:"10%",render:function(e,t){return a.renderColumns(e,t,"description")}},{title:"操作",dataIndex:"ID",width:"20%",render:function(e,t){var n=t.editable,l=t.deleteable;return v.default.createElement("div",{className:"editable-row-operations"},!l&&(n?v.default.createElement("span",null,v.default.createElement("a",{onClick:function(){return a.save(t.ID)}},"保存"),v.default.createElement(i.default,{type:"vertical"}),v.default.createElement(o.default,{title:"确定取消?",onConfirm:function(){return a.cancel(t.ID)}},v.default.createElement("a",null,"取消"))):v.default.createElement("span",null,v.default.createElement("a",{onClick:function(){return a.edit(t.ID)}},"编辑"))),!n&&(l?v.default.createElement("span",null,v.default.createElement(o.default,{title:"确定删除?",onConfirm:function(){return a.confirmdelete(t.ID)}},v.default.createElement("a",null,"提交")),v.default.createElement(i.default,{type:"vertical"}),v.default.createElement("a",{onClick:function(){return a.canceldelete(t.ID)}},"取消")):v.default.createElement("span",{style:{marginLeft:10}},v.default.createElement("a",{onClick:function(){return a.askdelete(t.ID)}},"删除"))))}}],a.handleStatusChange=function(e,t){var n=(0,u.default)(a.state.data),l=n.filter(function(t){return e===t.ID})[0];l&&(l.enable=t,a.setState({data:n})),console.log("data",a.state.data)},a.handleTableChange=function(e,t){a.props.onChange(e,t)},a.handleRowSelectChange=function(e,t){var n=t.reduce(function(e,t){return e+parseFloat(t.callNo,10)},0);a.props.onSelectRow&&a.props.onSelectRow(t),a.setState({selectedRowKeys:e,totalCallNo:n}),a.props.handleSelectRows(e)},a}return(0,h.default)(t,e),(0,s.default)(t,[{key:"componentWillReceiveProps",value:function(e){e.ghardware.data&&this.setState({data:e.ghardware.data.list.map(function(e){return void 0==e.tabStatus&&(e.tabStatus=!0),e}),category:e.ghardware.data.category})}},{key:"renderColumns",value:function(e,t,a){var n=this;return v.default.createElement(D,{editable:t.editable,value:e,onChange:function(e){return n.handleChange(e,t.ID,a)}})}},{key:"renderSelect",value:function(e,t,a,n){var l=this;return console.log(e),v.default.createElement(g.default,{defaultValue:void 0==e?"":e.title,disabled:t.tabStatus,style:{width:"auto"},onChange:function(n){l.handSelectChange(n,t.ID,a,e.title)}},void 0==n?[]:n.map(function(e){return v.default.createElement(y,{key:e.ID,value:e.ID},e.title)}))}},{key:"handSelectChange",value:function(e,t,a,n){var l=(0,u.default)(this.state.data),r=l.filter(function(e){return t===e.ID})[0];r&&(r[a]=(0,d.default)({},r[a],{title:n,newId:e}),this.setState({data:l,disabled:!1})),console.log(r),console.log(e,t,a,n)}},{key:"handleChange",value:function(e,t,a){var n=(0,u.default)(this.state.data),l=n.filter(function(e){return t===e.ID})[0];l&&(l[a]=e,this.setState({data:n,disabled:!1})),console.log("handleChange",e),console.log("handleChange",e)}},{key:"edit",value:function(e){var t=(0,u.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(a.editable=!0,this.setState({data:t.map(function(t){return t.ID==e&&(t.tabStatus=!1),t}),disabled:!1}))}},{key:"save",value:function(e){var t=(0,u.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(delete a.editable,a.enable=this.state.status,this.setState({data:t.map(function(t){return t.ID==e&&(t.tabStatus=!0),t}),disabled:!0}),this.cacheData=t.map(function(e){return(0,d.default)({},e)}),console.log("target",a),this.props.handleSaveData(a))}},{key:"cancel",value:function(e){var t=(0,u.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(Object.assign(a,this.cacheData.filter(function(t){return e===t.ID})[0]),delete a.editable,this.setState({data:t.map(function(t){return t.ID==e&&(t.tabStatus=!0),t}),disabled:!0}))}},{key:"askdelete",value:function(e){var t=(0,u.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(a.deleteable=!0,this.setState({data:t}))}},{key:"confirmdelete",value:function(e){var t=(0,u.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];if(a){var n=t.indexOf(a);n>-1&&t.splice(n,1),a.tag=!1,this.setState({data:t}),this.cacheData=t.map(function(e){return(0,d.default)({},e)}),this.props.handleDeleteData(a)}}},{key:"canceldelete",value:function(e){var t=(0,u.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(Object.assign(a,this.cacheData.filter(function(t){return e===t.ID})[0]),delete a.deleteable,this.setState({data:t}))}},{key:"render",value:function(){var e=this.state,t=(e.selectedRowKeys,e.totalCallNo,this.props);t.gidc,t.loading;return this.cacheData=this.state.data.map(function(e){return(0,d.default)({},e)}),v.default.createElement("div",{className:b.default.standardTable},v.default.createElement(r.default,{bordered:!0,rowKey:function(e){return e.ID},dataSource:this.state.data,columns:this.columns,onChange:this.handleTableChange}))}}]),t}(v.PureComponent),E=w;t.default=E}}]);