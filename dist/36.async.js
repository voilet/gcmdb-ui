(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[36],{"2Ak+":function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5QNv");var d=l(a("XRPJ")),s=l(a("RSNA"));a("qhfc");var n=l(a("aEti"));a("Vvjs");var i=l(a("66S2"));a("B5iR");var o=l(a("c0J2"));a("oeOs");var u=l(a("AXz3"));a("62OL");var c,h,p,f=l(a("lZ5B")),m=r(a("ZS5U")),v=l(a("8+Ik")),g=a("rAnT"),w=f.default.Item,b=u.default.TextArea,E=(o.default.Option,c=(0,g.connect)(e=>e),h=f.default.create(),c(p=h(p=class extends m.PureComponent{constructor(){super(...arguments),this.state={modalVisible:!1,selectedGroupValue:{}},this.handleModalVisible=(e=>{this.setState({modalVisible:!!e})}),this.handleAddIDC=(e=>{var t=this.props.form;e.preventDefault(),t.validateFields((e,a)=>{if(!e){var l={title:t.getFieldValue("title")?t.getFieldValue("title"):"",num:t.getFieldValue("num")?t.getFieldValue("num"):"",volume:t.getFieldValue("volume")?t.getFieldValue("volume"):"",description:t.getFieldValue("description")?t.getFieldValue("description"):"",componentname:"power"};this.props.dispatch({type:"ghardware/addHardwareComponents",payload:{description:l}}),i.default.success("\u6dfb\u52a0\u6210\u529f"),this.setState({modalVisible:!1}),t.resetFields()}})})}render(){var e=this.props.form.getFieldDecorator,t=this.props,a=(t.form,t.dispatch,{labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}});return m.default.createElement("div",{className:v.default.tableListOperator,style:{float:"left"}},m.default.createElement(n.default,{icon:"plus",type:"primary",onClick:()=>this.handleModalVisible(!0)},"\u6dfb\u52a0\u7535\u6e90"),m.default.createElement(d.default,{title:"\u6dfb\u52a0\u7535\u6e90",visible:this.state.modalVisible,onOk:this.handleAddIDC,width:600,onCancel:()=>this.handleModalVisible()},m.default.createElement(w,(0,s.default)({},a,{label:"\u540d\u79f0"}),e("title",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7535\u6e90\u540d\u79f0"}]})(m.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u7535\u6e90\u540d\u79f0"}))),m.default.createElement(w,(0,s.default)({},a,{label:"\u6570\u91cf"}),e("num",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7535\u6e90\u6570\u91cf"}]})(m.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u7535\u6e90\u6570\u91cf"}))),m.default.createElement(w,(0,s.default)({},a,{label:"\u5bb9\u91cf"}),e("volume",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7535\u6e90\u5bb9\u91cf"}]})(m.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u7535\u6e90\u5bb9\u91cf"}))),m.default.createElement(w,(0,s.default)({},a,{label:"\u63cf\u8ff0"}),e("description")(m.default.createElement(b,{style:{minHeight:32},placeholder:"\u7535\u6e90\u63cf\u8ff0",rows:4})))))}})||p)||p);t.default=E},"8+Ik":function(e,t,a){e.exports={tableList:"antd-pro-pages-g-resource-g-hardware-set-meal-power-power-tableList",tableListOperator:"antd-pro-pages-g-resource-g-hardware-set-meal-power-power-tableListOperator",tableListForm:"antd-pro-pages-g-resource-g-hardware-set-meal-power-power-tableListForm",submitButtons:"antd-pro-pages-g-resource-g-hardware-set-meal-power-power-submitButtons"}},HQ5V:function(e,t,a){e.exports={standardTable:"antd-pro-components-resource-power-index-standardTable",tableAlert:"antd-pro-components-resource-power-index-tableAlert"}},RaDr:function(e,t,a){"use strict";var l=a("GyWo"),r=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("z4Cl");var d=r(a("L9Tq")),s=r(a("OjS7"));a("jYJC");var n=r(a("47AH"));a("9E1Q");var i=r(a("VtQk"));a("oeOs");var o=r(a("AXz3")),u=l(a("ZS5U")),c=(r(a("I9Uw")),r(a("HQ5V"))),h=(a("gr65"),e=>{var t=e.editable,a=e.value,l=e.onChange;return u.default.createElement("div",null,t?u.default.createElement(o.default,{style:{margin:"-5px 0"},value:a,onChange:e=>l(e.target.value)}):a)});class p extends u.PureComponent{constructor(){super(...arguments),this.state={selectedRowKeys:[],totalCallNo:0,data:[],status:!1,disabled:!0},this.columns=[{title:"\u540d\u79f0",dataIndex:"title",width:"10%",render:(e,t)=>this.renderColumns(e,t,"title")},{title:"\u6570\u91cf",dataIndex:"num",width:"15%",render:(e,t)=>this.renderColumns(e,t,"num")},{title:"\u5bb9\u91cf",dataIndex:"volume",width:"15%",render:(e,t)=>this.renderColumns(e,t,"volume")},{title:"\u63cf\u8ff0",dataIndex:"description",width:"15%",render:(e,t)=>this.renderColumns(e,t,"description")},{title:"\u64cd\u4f5c",dataIndex:"ID",width:"20%",render:(e,t)=>{var a=t.editable,l=t.deleteable;return u.default.createElement("div",{className:"editable-row-operations"},!l&&(a?u.default.createElement("span",null,u.default.createElement("a",{onClick:()=>this.save(t.ID)},"\u4fdd\u5b58"),u.default.createElement(i.default,{type:"vertical"}),u.default.createElement(n.default,{title:"\u786e\u5b9a\u53d6\u6d88?",onConfirm:()=>this.cancel(t.ID)},u.default.createElement("a",null,"\u53d6\u6d88"))):u.default.createElement("span",null,u.default.createElement("a",{onClick:()=>this.edit(t.ID)},"\u7f16\u8f91"))),!a&&(l?u.default.createElement("span",null,u.default.createElement(n.default,{title:"\u786e\u5b9a\u5220\u9664?",onConfirm:()=>this.confirmdelete(t.ID)},u.default.createElement("a",null,"\u63d0\u4ea4")),u.default.createElement(i.default,{type:"vertical"}),u.default.createElement("a",{onClick:()=>this.canceldelete(t.ID)},"\u53d6\u6d88")):u.default.createElement("span",{style:{marginLeft:10}},u.default.createElement("a",{onClick:()=>this.askdelete(t.ID)},"\u5220\u9664"))))}}],this.handleStatusChange=((e,t)=>{var a=[...this.state.data],l=a.filter(t=>e===t.ID)[0];l&&(l.enable=t,this.setState({data:a})),console.log("data",this.state.data)}),this.handleTableChange=((e,t)=>{this.props.onChange(e,t)}),this.handleRowSelectChange=((e,t)=>{var a=t.reduce((e,t)=>{return e+parseFloat(t.callNo,10)},0);this.props.onSelectRow&&this.props.onSelectRow(t),this.setState({selectedRowKeys:e,totalCallNo:a}),this.props.handleSelectRows(e)})}componentWillReceiveProps(e){console.log(e.ghardware),e.ghardware.data&&this.setState({data:e.ghardware.data.list})}renderColumns(e,t,a){return u.default.createElement(h,{editable:t.editable,value:e,onChange:e=>this.handleChange(e,t.ID,a)})}handleChange(e,t,a){var l=[...this.state.data],r=l.filter(e=>t===e.ID)[0];r&&(r[a]=e,this.setState({data:l,disabled:!1})),console.log("handleChange",e),console.log("handleChange",e)}edit(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.editable=!0,this.setState({data:t,disabled:!1}))}save(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(delete a.editable,a.enable=this.state.status,this.setState({data:t,disabled:!0}),this.cacheData=t.map(e=>(0,s.default)({},e)),console.log("target",a),this.props.handleSaveData(a))}cancel(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.editable,this.setState({data:t,disabled:!0}))}askdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.deleteable=!0,this.setState({data:t}))}confirmdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];if(a){var l=t.indexOf(a);l>-1&&t.splice(l,1),a.tag=!1,this.setState({data:t}),this.cacheData=t.map(e=>(0,s.default)({},e)),this.props.handleDeleteData(a)}}canceldelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.deleteable,this.setState({data:t}))}render(){var e=this.state,t=(e.selectedRowKeys,e.totalCallNo,this.props);t.gidc,t.loading;return this.cacheData=this.state.data.map(e=>(0,s.default)({},e)),u.default.createElement("div",{className:c.default.standardTable},u.default.createElement(d.default,{bordered:!0,rowKey:e=>e.ID,dataSource:this.state.data,columns:this.columns,onChange:this.handleTableChange}))}}var f=p;t.default=f},s2i2:function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var d=l(a("ivY1"));a("9E1Q");var s=l(a("VtQk"));a("sbpV");var n=l(a("yPMy"));a("qhfc");var i=l(a("aEti"));a("CKBq");var o=l(a("nvQ8"));a("cqzp");var u=l(a("fMIj")),c=l(a("OjS7"));a("62OL");var h,p,f,m=l(a("lZ5B")),v=r(a("ZS5U")),g=a("rAnT"),w=l(a("RaDr")),b=l(a("zHco")),E=l(a("2Ak+")),C=l(a("8+Ik")),D=(m.default.Item,e=>Object.keys(e).map(t=>e[t]).join(",")),y=(h=(0,g.connect)(e=>e),p=m.default.create(),h(f=p(f=class extends v.PureComponent{constructor(){super(...arguments),this.state={selectedRows:[],formValues:{}},this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,r=this.state.formValues,d=Object.keys(t).reduce((e,a)=>{var l=(0,c.default)({},e);return l[a]=D(t[a]),l},{}),s=(0,c.default)({currentPage:e.current,pageSize:e.pageSize},r,d);a.field&&(s.sorter=`${a.field}_${a.order}`),l({type:"ghardware/queryHardwareComponentPower",payload:"power"})}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleSaveData=(e=>{var t=e.ID,a=e.description,l=e.num,r=e.title,d=e.volume;this.props.dispatch({type:"ghardware/modifyHardwareComponents",payload:{ID:t,componentname:"power",description:a,num:l,title:r,volume:d}})}),this.handleDeleteData=(e=>{var t=e.ID,a=[];a.push(t),this.props.dispatch({type:"ghardware/deleteHardwareComponents",payload:{tag:!1,infolist:JSON.stringify({ids:a,componentname:"power"})}})})}componentDidMount(){var e=this.props.dispatch;e({type:"ghardware/queryHardwareComponentPower",payload:"power"})}render(){var e=this.props.ghardware,t=this.state.selectedRows,a=v.default.createElement(u.default,{onClick:this.handleMenuClick,selectedKeys:[]},v.default.createElement(u.default.Item,{key:"approval"},"\u6279\u91cf\u5f00\u542f"));return v.default.createElement(b.default,{title:"\u7535\u6e90\u5957\u9910"},v.default.createElement(d.default,{bordered:!1},v.default.createElement("div",{className:C.default.tableList},v.default.createElement("div",{style:{height:40}},v.default.createElement(E.default,{dispatch:this.props.dispatch,providerdata:e.powerInfo}),t.length>0&&v.default.createElement("div",null,v.default.createElement(n.default,{overlay:a},v.default.createElement(i.default,null,"\u66f4\u591a\u64cd\u4f5c ",v.default.createElement(o.default,{type:"down"}))))),v.default.createElement(s.default,null,"  \u7535\u6e90\u6570\u636e  "),v.default.createElement(w.default,{ghardware:e.powerInfo,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData}))))}})||f)||f);t.default=y}}]);