(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[33],{Hm5a:function(e,t,a){e.exports={standardTable:"antd-pro-components-resource-cpu-index-standardTable",tableAlert:"antd-pro-components-resource-cpu-index-tableAlert"}},QfGk:function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var d=l(a("ivY1"));a("9E1Q");var s=l(a("VtQk"));a("sbpV");var i=l(a("yPMy"));a("qhfc");var n=l(a("aEti"));a("CKBq");var u=l(a("nvQ8"));a("cqzp");var c=l(a("fMIj")),o=l(a("OjS7"));a("62OL");var h,f,p,m=l(a("lZ5B")),b=r(a("ZS5U")),v=a("rAnT"),g=l(a("uSNO")),D=l(a("zHco")),y=l(a("xvEd")),C=l(a("yThs")),E=(m.default.Item,e=>Object.keys(e).map(t=>e[t]).join(",")),w=(h=(0,v.connect)(e=>e),f=m.default.create(),h(p=f(p=class extends b.PureComponent{constructor(){super(...arguments),this.state={selectedRows:[],formValues:{}},this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,r=this.state.formValues,d=Object.keys(t).reduce((e,a)=>{var l=(0,o.default)({},e);return l[a]=E(t[a]),l},{}),s=(0,o.default)({currentPage:e.current,pageSize:e.pageSize},r,d);a.field&&(s.sorter=`${a.field}_${a.order}`),l({type:"ghardware/queryHardwareComponents",payload:"cpu"})}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleSaveData=(e=>{this.props.dispatch({type:"ghardware/modifyHardwareComponents",payload:(0,o.default)({componentname:"cpu",category:void 0==e.categorycpuinfo.newId?e.categorycpuinfo.ID:e.categorycpuinfo.newId},e)})}),this.handleDeleteData=(e=>{var t=e.ID,a=[];a.push(t),this.props.dispatch({type:"ghardware/deleteHardwareComponents",payload:{tag:!1,infolist:JSON.stringify({componentname:"cpu",ids:a})}})})}componentDidMount(){var e=this.props.dispatch;e({type:"ghardware/queryHardwareComponentCpu",payload:"cpu"})}render(){var e=this.props.ghardware,t=this.state.selectedRows,a=b.default.createElement(c.default,{onClick:this.handleMenuClick,selectedKeys:[]},b.default.createElement(c.default.Item,{key:"approval"},"\u6279\u91cf\u5f00\u542f"));return b.default.createElement(D.default,{title:"CPU\u5957\u9910"},b.default.createElement(d.default,{bordered:!1},b.default.createElement("div",{className:C.default.tableList},b.default.createElement("div",{style:{height:40}},b.default.createElement(y.default,{dispatch:this.props.dispatch,hardwaredata:e.cpuInfo}),t.length>0&&b.default.createElement("div",null,b.default.createElement(i.default,{overlay:a},b.default.createElement(n.default,null,"\u66f4\u591a\u64cd\u4f5c ",b.default.createElement(u.default,{type:"down"}))))),b.default.createElement(s.default,null,"  CPU\u6570\u636e  "),b.default.createElement(g.default,{ghardware:e.cpuInfo,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData}))))}})||p)||p);t.default=w},uSNO:function(e,t,a){"use strict";var l=a("GyWo"),r=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("z4Cl");var d=r(a("L9Tq")),s=r(a("OjS7"));a("jYJC");var i=r(a("47AH"));a("9E1Q");var n=r(a("VtQk"));a("oeOs");var u=r(a("AXz3"));a("B5iR");var c=r(a("c0J2")),o=l(a("ZS5U")),h=(r(a("I9Uw")),r(a("Hm5a"))),f=(a("gr65"),c.default.Option),p=e=>{var t=e.editable,a=e.value,l=e.onChange;return o.default.createElement("div",null,t?o.default.createElement(u.default,{style:{margin:"-5px 0"},value:a,onChange:e=>l(e.target.value)}):a)};class m extends o.PureComponent{constructor(){super(...arguments),this.state={data:{},tabListData:[],status:!1,disabled:!0},this.columns=[{title:"\u540d\u79f0",dataIndex:"title",width:"10%",render:(e,t)=>this.renderColumns(e,t,"title")},{title:"\u6570\u91cf",dataIndex:"num",width:"15%",render:(e,t)=>this.renderColumns(e,t,"num")},{title:"\u9891\u7387",dataIndex:"mainfrequency",width:"15%",render:(e,t)=>this.renderColumns(e,t,"mainfrequency")},{title:"\u6838\u6570",dataIndex:"cores",width:"15%",render:(e,t)=>this.renderColumns(e,t,"cores")},{title:"\u7c7b\u578b",dataIndex:"categorycpuinfo",width:"15%",render:(e,t)=>this.renderSelect(e,t,"categorycpuinfo",this.state.data.category)},{title:"\u63cf\u8ff0",dataIndex:"description",width:"10%",render:(e,t)=>this.renderColumns(e,t,"description")},{title:"\u64cd\u4f5c",dataIndex:"ID",width:"20%",render:(e,t)=>{var a=t.editable,l=t.deleteable;return o.default.createElement("div",{className:"editable-row-operations"},!l&&(a?o.default.createElement("span",null,o.default.createElement("a",{onClick:()=>this.save(t.ID)},"\u4fdd\u5b58"),o.default.createElement(n.default,{type:"vertical"}),o.default.createElement(i.default,{title:"\u786e\u5b9a\u53d6\u6d88?",onConfirm:()=>this.cancel(t.ID)},o.default.createElement("a",null,"\u53d6\u6d88"))):o.default.createElement("span",null,o.default.createElement("a",{onClick:()=>this.edit(t.ID)},"\u7f16\u8f91"))),!a&&(l?o.default.createElement("span",null,o.default.createElement(i.default,{title:"\u786e\u5b9a\u5220\u9664?",onConfirm:()=>this.confirmdelete(t.ID)},o.default.createElement("a",null,"\u63d0\u4ea4")),o.default.createElement(n.default,{type:"vertical"}),o.default.createElement("a",{onClick:()=>this.canceldelete(t.ID)},"\u53d6\u6d88")):o.default.createElement("span",{style:{marginLeft:10}},o.default.createElement("a",{onClick:()=>this.askdelete(t.ID)},"\u5220\u9664"))))}}],this.handleTableChange=((e,t)=>{this.props.onChange(e,t)})}componentWillReceiveProps(e){e.ghardware.data.list&&this.setState({data:e.ghardware.data,tabListData:e.ghardware.data.list.map(e=>{return void 0==e.tabStatus&&(e.tabStatus=!0),e})})}renderColumns(e,t,a){return o.default.createElement(p,{editable:t.editable,value:e,onChange:e=>this.handleChange(e,t.ID,a)})}renderSelect(e,t,a,l){return o.default.createElement(c.default,{defaultValue:void 0==e?"":e.title,disabled:t.tabStatus,style:{width:"auto"},onChange:l=>{this.handSelectChange(l,t.ID,a,e.title)}},void 0==l?[]:l.map(e=>{return o.default.createElement(f,{key:e.ID,value:e.ID},e.title)}))}handSelectChange(e,t,a,l){var r=[...this.state.tabListData],d=r.filter(e=>t===e.ID)[0];d&&(d[a]=(0,s.default)({},d[a],{title:l,newId:e}),this.setState({tabListData:r,disabled:!1}))}handleChange(e,t,a){var l=[...this.state.tabListData],r=l.filter(e=>t===e.ID)[0];r&&(r[a]=e,this.setState({tabListData:l,disabled:!1}))}edit(e){var t=[...this.state.tabListData],a=t.filter(t=>e===t.ID)[0];a&&(a.editable=!0,this.setState({tabListData:t.map(t=>{return t.ID==e&&(t.tabStatus=!1),t}),disabled:!1}))}save(e){var t=[...this.state.tabListData],a=t.filter(t=>e===t.ID)[0];a&&(delete a.editable,a.enable=this.state.status,this.setState({tabListData:t.map(t=>{return t.ID==e&&(t.tabStatus=!0),t}),disabled:!0}),this.cacheData=t.map(e=>(0,s.default)({},e)),this.props.handleSaveData(a))}cancel(e){var t=[...this.state.tabListData],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.editable,this.setState({tabListData:t.map(t=>{return t.ID==e&&(t.tabStatus=!0),t}),disabled:!0}))}askdelete(e){var t=[...this.state.tabListData],a=t.filter(t=>e===t.ID)[0];a&&(a.deleteable=!0,this.setState({tabListData:t}))}confirmdelete(e){var t=[...this.state.tabListData],a=t.filter(t=>e===t.ID)[0];if(a){var l=t.indexOf(a);l>-1&&t.splice(l,1),a.tag=!1,this.setState({tabListData:t}),this.cacheData=t.map(e=>(0,s.default)({},e)),this.props.handleDeleteData(a)}}canceldelete(e){var t=[...this.state.tabListData],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.deleteable,this.setState({tabListData:t}))}render(){this.props.loading;return this.cacheData=this.state.tabListData.map(e=>(0,s.default)({},e)),o.default.createElement("div",{className:h.default.standardTable},o.default.createElement(d.default,{bordered:!0,rowKey:e=>e.ID,dataSource:this.state.tabListData,columns:this.columns,onChange:this.handleTableChange}))}}var b=m;t.default=b},xvEd:function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5QNv");var d=l(a("XRPJ")),s=l(a("RSNA"));a("qhfc");var i=l(a("aEti"));a("Vvjs");var n=l(a("66S2"));a("B5iR");var u=l(a("c0J2"));a("oeOs");var c=l(a("AXz3"));a("62OL");var o,h,f,p=l(a("lZ5B")),m=r(a("ZS5U")),b=l(a("yThs")),v=a("rAnT"),g=p.default.Item,D=c.default.TextArea,y=u.default.Option,C=(o=(0,v.connect)(e=>e),h=p.default.create(),o(f=h(f=class extends m.PureComponent{constructor(){super(...arguments),this.state={modalVisible:!1,selectedGroupValue:{}},this.handleModalVisible=(e=>{this.setState({modalVisible:!!e})}),this.handleAddIDC=(e=>{var t=this.props.form;e.preventDefault(),t.validateFields((e,a)=>{if(!e){var l={title:t.getFieldValue("title")?t.getFieldValue("title"):"",num:t.getFieldValue("num")?t.getFieldValue("num"):"",mainfrequency:t.getFieldValue("mainfrequency")?t.getFieldValue("mainfrequency"):"",cores:t.getFieldValue("cores")?t.getFieldValue("cores"):"",description:t.getFieldValue("description")?t.getFieldValue("description"):"",category:t.getFieldValue("category")?t.getFieldValue("category"):"",componentname:"cpu"};this.props.dispatch({type:"ghardware/addHardwareComponents",payload:{description:l}}),n.default.success("\u6dfb\u52a0\u6210\u529f"),this.setState({modalVisible:!1}),t.resetFields()}})})}render(){var e=this.props.form.getFieldDecorator,t=this.props,a=(t.form,t.dispatch,t.hardwaredata),l=void 0==a.data.category?[]:a.data.category,r={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}};return m.default.createElement("div",{className:b.default.tableListOperator,style:{float:"left"}},m.default.createElement(i.default,{icon:"plus",type:"primary",onClick:()=>this.handleModalVisible(!0)},"\u6dfb\u52a0CPU"),m.default.createElement(d.default,{title:"\u6dfb\u52a0CPU",visible:this.state.modalVisible,onOk:this.handleAddIDC,width:600,onCancel:()=>this.handleModalVisible()},m.default.createElement(g,(0,s.default)({},r,{label:"\u540d\u79f0"}),e("title",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165CPU\u540d\u79f0"}]})(m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165CPU\u540d\u79f0"}))),m.default.createElement(g,(0,s.default)({},r,{label:"\u6570\u91cf"}),e("num",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165CPU\u6570\u91cf"}]})(m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165CPU\u6570\u91cf"}))),m.default.createElement(g,(0,s.default)({},r,{label:"\u9891\u7387"}),e("mainfrequency",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165CPU\u9891\u7387"}]})(m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165CPU\u9891\u7387"}))),m.default.createElement(g,(0,s.default)({},r,{label:"\u6838\u6570"}),e("cores",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165CPU\u6838\u6570"}]})(m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165CPU\u6838\u6570"}))),m.default.createElement(g,(0,s.default)({},r,{label:"\u7c7b\u578b"}),e("category",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9CPU\u7c7b\u578b"}]})(m.default.createElement(u.default,{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9CPU\u7c7b\u578b"},l.map(e=>m.default.createElement(y,{key:e.ID,value:Number(e.ID)},e.title))))),m.default.createElement(g,(0,s.default)({},r,{label:"\u63cf\u8ff0"}),e("description")(m.default.createElement(D,{style:{minHeight:32},placeholder:"CPU\u63cf\u8ff0",rows:4})))))}})||f)||f);t.default=C},yThs:function(e,t,a){e.exports={tableList:"antd-pro-pages-g-resource-g-hardware-set-meal-cpu-c-p-u-tableList",tableListOperator:"antd-pro-pages-g-resource-g-hardware-set-meal-cpu-c-p-u-tableListOperator",tableListForm:"antd-pro-pages-g-resource-g-hardware-set-meal-cpu-c-p-u-tableListForm",submitButtons:"antd-pro-pages-g-resource-g-hardware-set-meal-cpu-c-p-u-submitButtons"}}}]);