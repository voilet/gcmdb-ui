(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{AZKq:function(e,t,a){"use strict";var l=a("4Gf+"),d=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var s=l(a("ivY1"));a("9E1Q");var r=l(a("VtQk"));a("sbpV");var i=l(a("yPMy"));a("qhfc");var n=l(a("aEti"));a("CKBq");var o=l(a("nvQ8"));a("cqzp");var c=l(a("fMIj")),u=l(a("OjS7"));a("62OL");var h,p,f,m=l(a("lZ5B")),g=d(a("ZS5U")),v=a("rAnT"),b=l(a("ocqY")),C=l(a("zHco")),E=l(a("ePAC")),w=l(a("b3Yo")),y=(m.default.Item,e=>Object.keys(e).map(t=>e[t]).join(",")),D=(h=(0,v.connect)(e=>e),p=m.default.create(),h(f=p(f=class extends g.PureComponent{constructor(){super(...arguments),this.state={selectedRows:[],formValues:{}},this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,d=this.state.formValues,s=Object.keys(t).reduce((e,a)=>{var l=(0,u.default)({},e);return l[a]=y(t[a]),l},{}),r=(0,u.default)({currentPage:e.current,pageSize:e.pageSize},d,s);a.field&&(r.sorter=`${a.field}_${a.order}`),l({type:"gidc/queryIDC",payload:r})}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleSaveData=(e=>{this.props.dispatch({type:"gidc/modifyIDC",payload:e})}),this.handleDeleteData=(e=>{this.props.dispatch({type:"gidc/deleteIDC",payload:e})})}componentDidMount(){var e=this.props.dispatch;e({type:"gidc/queryIDC",payload:""}),e({type:"gidc/queryProvider",payload:""})}render(){var e=this.props.gidc,t=this.state.selectedRows;console.log("this.props",this.props);var a=g.default.createElement(c.default,{onClick:this.handleMenuClick,selectedKeys:[]},g.default.createElement(c.default.Item,{key:"approval"},"\u6279\u91cf\u5f00\u542f"));return g.default.createElement(C.default,{title:"\u673a\u623f\u5217\u8868"},g.default.createElement(s.default,{bordered:!1},g.default.createElement("div",{className:w.default.tableList},g.default.createElement("div",{style:{height:40}},g.default.createElement(E.default,{providerdata:e.provider}),t.length>0&&g.default.createElement("div",null,g.default.createElement(i.default,{overlay:a},g.default.createElement(n.default,null,"\u66f4\u591a\u64cd\u4f5c ",g.default.createElement(o.default,{type:"down"}))))),g.default.createElement(r.default,null,"  \u673a\u623f\u6570\u636e  "),g.default.createElement(b.default,{selectedRows:t,gidc:e.idc,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData,handleSelectRows:this.handleSelectRows,onChange:this.handleStandardTableChange}))))}})||f)||f);t.default=D},ZzYc:function(e,t,a){e.exports={standardTable:"antd-pro-components-resource-idc-index-standardTable",tableAlert:"antd-pro-components-resource-idc-index-tableAlert"}},b3Yo:function(e,t,a){e.exports={tableList:"antd-pro-pages-g-resource-g-idc-idc-i-d-c-tableList",tableListOperator:"antd-pro-pages-g-resource-g-idc-idc-i-d-c-tableListOperator",tableListForm:"antd-pro-pages-g-resource-g-idc-idc-i-d-c-tableListForm",submitButtons:"antd-pro-pages-g-resource-g-idc-idc-i-d-c-submitButtons"}},ePAC:function(e,t,a){"use strict";var l=a("4Gf+"),d=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5QNv");var s=l(a("XRPJ"));a("PRxM");var r=l(a("C5on")),i=l(a("RSNA"));a("qhfc");var n=l(a("aEti"));a("Vvjs");var o=l(a("66S2"));a("B5iR");var c=l(a("c0J2"));a("oeOs");var u=l(a("AXz3"));a("62OL");var h,p,f,m=l(a("lZ5B")),g=d(a("ZS5U")),v=l(a("b3Yo")),b=a("rAnT"),C=m.default.Item,E=u.default.TextArea,w=c.default.Option,y=(h=(0,b.connect)(e=>e),p=m.default.create(),h(f=p(f=class extends g.PureComponent{constructor(){super(...arguments),this.state={modalVisible:!1,selectedGroupValue:{},enable:!1},this.handleModalVisible=(e=>{this.setState({modalVisible:!!e})}),this.handleAddIDC=(e=>{var t=this.props.form;e.preventDefault(),t.validateFields((e,a)=>{if(!e){var l={idc_name:t.getFieldValue("idc_name")?t.getFieldValue("idc_name"):"",alias:t.getFieldValue("alias")?t.getFieldValue("alias"):"",band_width:t.getFieldValue("band_width")?t.getFieldValue("band_width"):"",phone:t.getFieldValue("phone")?t.getFieldValue("phone"):"",addresses:t.getFieldValue("addresses")?t.getFieldValue("addresses"):"",ip_range:t.getFieldValue("ip_range")?t.getFieldValue("ip_range"):"",remarks:t.getFieldValue("remarks")?t.getFieldValue("remarks"):"",enable:t.getFieldValue("enable")?t.getFieldValue("enable"):"",providerids:JSON.stringify(this.state.selectedGroupValue)};this.props.dispatch({type:"gidc/addIDC",payload:{description:l}}),o.default.success("\u6dfb\u52a0\u6210\u529f"),this.setState({modalVisible:!1,enable:!1}),t.resetFields()}})}),this.handleSelectGroupValue=(e=>{this.setState({selectedGroupValue:{data:e}})}),this.handleStatusChange=(e=>{this.setState({enable:e})})}render(){var e=this.props.form.getFieldDecorator,t=this.props,a=(t.submitting,t.form,t.dispatch,t.providerdata);console.log("getFieldDecorator+++",this.props);var l={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}};return g.default.createElement("div",{className:v.default.tableListOperator,style:{float:"left"}},g.default.createElement(n.default,{icon:"plus",type:"primary",onClick:()=>this.handleModalVisible(!0)},"\u6dfb\u52a0\u673a\u623f"),g.default.createElement(s.default,{title:"\u6dfb\u52a0\u673a\u623f",visible:this.state.modalVisible,onOk:this.handleAddIDC,width:600,onCancel:()=>this.handleModalVisible()},g.default.createElement(C,(0,i.default)({},l,{label:"\u673a\u623f\u540d\u79f0"}),e("idc_name",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u673a\u623f\u540d\u79f0"}]})(g.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u673a\u623f\u540d\u79f0"}))),g.default.createElement(C,(0,i.default)({},l,{label:"\u673a\u623f\u522b\u540d"}),e("alias",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u673a\u623f\u522b\u540d"}]})(g.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u673a\u623f\u522b\u540d\uff0c\u4e3b\u673a\u540d\u4f7f\u7528"}))),g.default.createElement(C,(0,i.default)({},l,{label:"\u8fd0\u8425\u5546"}),e("selectprovider",{rules:[{required:!0}]})(g.default.createElement(c.default,{mode:"multiple",placeholder:"\u9009\u62e9\u8fd0\u8425\u5546",style:{width:120},onChange:this.handleSelectGroupValue,optionFilterProp:"children",filterOption:(e,t)=>t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},a.data.length>0&&a.data.map(e=>g.default.createElement(w,{key:e.ID,value:e.ID},e.provider_name))))),g.default.createElement(C,(0,i.default)({},l,{label:"\u5e26\u5bbd"}),e("band_width",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u673a\u623f\u5e26\u5bbd"}]})(g.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u673a\u623f\u5e26\u5bbd"}))),g.default.createElement(C,(0,i.default)({},l,{label:"\u8054\u7cfb\u7535\u8bdd"}),e("phone",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u673a\u623f\u8054\u7cfb\u7535\u8bdd"}]})(g.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u673a\u623f\u8054\u7cfb\u7535\u8bdd"}))),g.default.createElement(C,(0,i.default)({},l,{label:"\u5730\u5740"}),e("addresses",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u673a\u623f\u5730\u5740"}]})(g.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u673a\u623f\u5730\u5740"}))),g.default.createElement(C,(0,i.default)({},l,{label:"ip\u5730\u5740\u6bb5"}),e("ip_range",{rules:[{required:!0,message:"\u63cf\u8ff0"}]})(g.default.createElement(E,{style:{minHeight:32},placeholder:"ip\u5730\u5740\u6bb5 10.1.0.0/16",rows:4}))),g.default.createElement(C,(0,i.default)({},l,{label:"\u5f00\u542f\u4f7f\u7528\u673a\u623f"}),e("enable")(g.default.createElement(r.default,{checkedChildren:"\u5f00",unCheckedChildren:"\u5173",checked:this.state.enable,onChange:e=>this.handleStatusChange(e)}))),g.default.createElement(C,(0,i.default)({},l,{label:"\u63cf\u8ff0"}),e("remarks")(g.default.createElement(E,{style:{minHeight:32},placeholder:"\u673a\u623f\u63cf\u8ff0",rows:4})))))}})||f)||f);t.default=y},ocqY:function(e,t,a){"use strict";var l=a("GyWo"),d=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("z4Cl");var s=d(a("L9Tq"));a("fr3b");var r=d(a("Bziu")),i=d(a("OjS7"));a("jYJC");var n=d(a("47AH"));a("9E1Q");var o=d(a("VtQk"));a("PRxM");var c=d(a("C5on"));a("oeOs");var u=d(a("AXz3")),h=l(a("ZS5U")),p=(d(a("I9Uw")),d(a("ZzYc"))),f=(a("gr65"),e=>{var t=e.editable,a=e.value,l=e.onChange;return h.default.createElement("div",null,t?h.default.createElement(u.default,{style:{margin:"-5px 0"},value:a,onChange:e=>l(e.target.value)}):a)});class m extends h.PureComponent{constructor(){super(...arguments),this.state={selectedRowKeys:[],totalCallNo:0,data:[],status:!1,disabled:!0},this.columns=[{title:"\u673a\u623f\u540d\u79f0",dataIndex:"idc_name",width:"10%",render:(e,t)=>this.renderColumns(e,t,"idc_name")},{title:"\u8fd0\u8425\u5546",dataIndex:"provider_name",width:"8%",render:(e,t)=>{var a={color:"red"};return h.default.createElement("div",{style:a},t.provider_name)}},{title:"\u5e26\u5bbd",dataIndex:"band_width",width:"10%",render:(e,t)=>this.renderColumns(e,t,"band_width")},{title:"\u5730\u5740\u8303\u56f4",dataIndex:"ip_range",width:"15%",render:(e,t)=>this.renderColumns(e,t,"ip_range")},{title:"\u8054\u7cfb\u7535\u8bdd",dataIndex:"phone",width:"10%",render:(e,t)=>this.renderColumns(e,t,"phone")},{title:"\u4f4d\u7f6e",dataIndex:"addresses",width:"15%",render:(e,t)=>this.renderColumns(e,t,"addresses")},{title:"\u673a\u67dc\u540d\u79f0",dataIndex:"cabinet_name",width:"10%",render:(e,t)=>{var a=t.cabinets;if(a){var l={color:"red"};return a.map(e=>h.default.createElement("div",{style:l},e.cabinet_name))}}},{title:"\u72b6\u6001",dataIndex:"enable",width:"5%",render:(e,t)=>{var a=t.enable;return h.default.createElement("div",null,h.default.createElement(c.default,{checkedChildren:"\u5f00",unCheckedChildren:"\u5173",checked:a,onChange:e=>this.handleStatusChange(t.ID,e),disabled:this.state.disabled}))}},{title:"\u64cd\u4f5c",dataIndex:"ID",width:"20%",render:(e,t)=>{var a=t.editable,l=t.deleteable;return h.default.createElement("div",{className:"editable-row-operations"},!l&&(a?h.default.createElement("span",null,h.default.createElement("a",{onClick:()=>this.save(t.ID)},"\u4fdd\u5b58"),h.default.createElement(o.default,{type:"vertical"}),h.default.createElement(n.default,{title:"\u786e\u5b9a\u53d6\u6d88?",onConfirm:()=>this.cancel(t.ID)},h.default.createElement("a",null,"\u53d6\u6d88"))):h.default.createElement("span",null,h.default.createElement("a",{onClick:()=>this.edit(t.ID)},"\u7f16\u8f91"))),!a&&(l?h.default.createElement("span",null,h.default.createElement(n.default,{title:"\u786e\u5b9a\u5220\u9664?",onConfirm:()=>this.confirmdelete(t.ID)},h.default.createElement("a",null,"\u63d0\u4ea4")),h.default.createElement(o.default,{type:"vertical"}),h.default.createElement("a",{onClick:()=>this.canceldelete(t.ID)},"\u53d6\u6d88")):h.default.createElement("span",{style:{marginLeft:10}},h.default.createElement("a",{onClick:()=>this.askdelete(t.ID)},"\u5220\u9664"))))}}],this.handleStatusChange=((e,t)=>{var a=[...this.state.data],l=a.filter(t=>e===t.ID)[0];l&&(l.enable=t,this.setState({data:a})),console.log("data",this.state.data)}),this.handleTableChange=((e,t)=>{this.props.onChange(e,t)}),this.handleRowSelectChange=((e,t)=>{var a=t.reduce((e,t)=>{return e+parseFloat(t.callNo,10)},0);this.props.onSelectRow&&this.props.onSelectRow(t),this.setState({selectedRowKeys:e,totalCallNo:a}),this.props.handleSelectRows(e)})}componentWillReceiveProps(e){0===e.selectedRows.length&&this.setState({selectedRowKeys:[],totalCallNo:0}),e.gidc.data&&this.setState({data:e.gidc.data})}renderColumns(e,t,a){return h.default.createElement(f,{editable:t.editable,value:e,onChange:e=>this.handleChange(e,t.ID,a)})}handleChange(e,t,a){var l=[...this.state.data],d=l.filter(e=>t===e.ID)[0];d&&(d[a]=e,this.setState({data:l,disabled:!1})),console.log("handleChange",e),console.log("handleChange",e)}edit(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.editable=!0,this.setState({data:t,disabled:!1}))}save(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(delete a.editable,a.enable=this.state.status,this.setState({data:t,disabled:!0}),this.cacheData=t.map(e=>(0,i.default)({},e)),console.log("target",a),this.props.handleSaveData(a))}cancel(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.editable,this.setState({data:t,disabled:!0}))}askdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.deleteable=!0,this.setState({data:t}))}confirmdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];if(a){var l=t.indexOf(a);l>-1&&t.splice(l,1),a.tag=!1,this.setState({data:t}),this.cacheData=t.map(e=>(0,i.default)({},e)),this.props.handleDeleteData(a)}}canceldelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.deleteable,this.setState({data:t}))}render(){var e=this.state,t=e.selectedRowKeys,a=(e.totalCallNo,this.props),l=a.gidc,d=(a.loading,{selectedRowKeys:t,onChange:this.handleRowSelectChange,getCheckboxProps:e=>({disabled:e.disabled})});console.log("gidc.pagination",l.pagination);var n=(0,i.default)({showSizeChanger:!0,showQuickJumper:!0},l.pagination);return this.cacheData=this.state.data.map(e=>(0,i.default)({},e)),h.default.createElement("div",{className:p.default.standardTable},h.default.createElement("div",{className:p.default.tableAlert},h.default.createElement(r.default,{message:h.default.createElement("div",null,"\u5df2\u9009\u62e9 ",h.default.createElement("a",{style:{fontWeight:600}},t.length)," \u53f0\xa0"),type:"info",showIcon:!0})),h.default.createElement(s.default,{bordered:!0,rowKey:e=>e.ID,rowSelection:d,dataSource:this.state.data,columns:this.columns,onChange:this.handleTableChange,pagination:n}))}}var g=m;t.default=g}}]);