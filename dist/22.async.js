(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[22],{"6UrX":function(e,t,a){"use strict";var l=a("4Gf+"),s=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var d=l(a("ivY1"));a("9E1Q");var r=l(a("VtQk"));a("sbpV");var i=l(a("yPMy"));a("CKBq");var n=l(a("nvQ8"));a("qhfc");var u=l(a("aEti"));a("cqzp");var o=l(a("fMIj")),p=l(a("OjS7"));a("oeOs");var c=l(a("AXz3"));a("62OL");var h,f,m,g=l(a("lZ5B")),v=s(a("ZS5U")),b=a("rAnT"),y=l(a("W5rP")),S=l(a("zHco")),I=l(a("BRcq")),E=l(a("q5xv")),k=(g.default.Item,c.default.Search,c.default.Group),C=e=>Object.keys(e).map(t=>e[t]).join(","),D=(h=(0,b.connect)(e=>e),f=g.default.create(),h(m=f(m=class extends v.PureComponent{constructor(){super(...arguments),this.state={selectedRows:[],formValues:{},enable:!1,data:[]},this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,s=this.state.formValues,d=Object.keys(t).reduce((e,a)=>{var l=(0,p.default)({},e);return l[a]=C(t[a]),l},{}),r=(0,p.default)({currentPage:e.current,pageSize:e.pageSize},s,d);a.field&&(r.sorter=`${a.field}_${a.order}`),l({type:"gidc/queryIpResource",payload:r})}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleSaveData=(e=>{this.props.dispatch({type:"gidc/modifyIpResource",payload:e})}),this.handleDeleteData=((e,t)=>{var a=new Array;isNaN(e.ID)?a=e:a.push(e.ID);var l={ipaddrlist:JSON.stringify({data:a}),tag:e.tag};this.props.dispatch({type:"gidc/deleteIpResource",payload:l})}),this.handleMenuClick=(e=>{"remove"==e&&handleDeleteData(this.state.selectedRows)}),this.handleSearch=((e,t)=>{if(e=e.replace(/\s+/g,""),e.length>0){var a=this.props.dispatch;a({type:"gidc/searchIpResource",payload:{ipaddress:e}})}})}componentWillReceiveProps(e){}componentDidMount(){var e=this.props.dispatch;e({type:"gidc/queryIpResource"}),e({type:"gidc/queryIpClassify"})}render(){var e=this.props.gidc,t=this.state,a=t.selectedRows,l=t.enable;"ok"==e.ipcheck.data&&this.setState({enable:!0}),console.log("this.props",this.props);var s=v.default.createElement(o.default,{onClick:this.handleMenuClick,selectedKeys:[]},v.default.createElement(o.default.Item,{key:"remove"},"\u5220\u9664"),v.default.createElement(o.default.Item,{key:"approval"},"\u5f00\u542f\u9884\u7559")),p=v.default.createElement("div",{style:{textAlign:"center"}},v.default.createElement(k,{compact:!0},v.default.createElement(u.default,{size:"large",style:{color:"blue"}},"ipAddress"),v.default.createElement(c.default.Search,{placeholder:"\u8bf7\u8f93\u5165ip \u5730\u5740",enterButton:"\u641c\u7d22",size:"large",onSearch:this.handleSearch,style:{width:522}})));return v.default.createElement(S.default,{title:"ip\u8d44\u6e90\u5217\u8868",content:p},v.default.createElement(d.default,{bordered:!1},v.default.createElement("div",{className:E.default.tableList},v.default.createElement("div",{style:{height:40}},v.default.createElement(I.default,{ipclassify:e.ipclassify,ipcheck:e.ipcheck,checkloading:e.loading,enable:l}),a.length>0&&v.default.createElement("div",null,v.default.createElement(i.default,{overlay:s},v.default.createElement(u.default,null,"\u66f4\u591a\u64cd\u4f5c ",v.default.createElement(n.default,{type:"down"}))))),v.default.createElement(r.default,null,"  IP\u8d44\u6e90\u6570\u636e  "),v.default.createElement(y.default,{selectedRows:a,ipresource:e.ipresource,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData,handleSelectRows:this.handleSelectRows,onChange:this.handleStandardTableChange}))))}})||m)||m);t.default=D},BRcq:function(e,t,a){"use strict";var l=a("4Gf+"),s=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5QNv");var d=l(a("XRPJ")),r=l(a("RSNA"));a("qhfc");var i=l(a("aEti"));a("Vvjs");var n=l(a("66S2"));a("oeOs");var u=l(a("AXz3"));a("62OL");var o=l(a("lZ5B"));a("B5iR");var p,c,h,f=l(a("c0J2")),m=s(a("ZS5U")),g=l(a("q5xv")),v=a("rAnT"),b=f.default.Option,y=o.default.Item,S=u.default.TextArea,I=(p=(0,v.connect)(e=>e),c=o.default.create(),p(h=c(h=class extends m.PureComponent{constructor(){super(...arguments),this.state={modalVisible:!1,result:"",data:[],loading:this.props.checkloading,enable:!1},this.handleModalVisible=(e=>{this.setState({modalVisible:!!e})}),this.ip2int=(e=>{var t=0;return e=e.split("."),t=256*Number(e[0])*256*256+256*Number(e[1])*256+256*Number(e[2])+Number(e[3]),t>>>=0,t}),this.int2iP=(e=>{var t,a=new Array;return a[0]=e>>>24>>>0,a[1]=e<<8>>>24>>>0,a[2]=e<<16>>>24,a[3]=e<<24>>>24,t=String(a[0])+"."+String(a[1])+"."+String(a[2])+"."+String(a[3]),t}),this.isEqualIPAddress=((e,t,a)=>{if(!e||!t||!a)return this.setState({result:"\u5404\u53c2\u6570\u4e0d\u80fd\u4e3a\u7a7a"}),!1;var l=[],s=[];e=e.split("."),t=t.split("."),a=a.split(".");for(var d=0,r=e.length;d<r;d+=1)l.push(parseInt(e[d])&parseInt(a[d])),s.push(parseInt(t[d])&parseInt(a[d]));return l.join(".")==s.join(".")?(this.setState({result:"\u5728\u540c\u4e00\u4e2a\u7f51\u6bb5"}),!0):(this.setState({result:"\u4e0d\u5728\u540c\u4e00\u4e2a\u7f51\u6bb5"}),!1)}),this.handleAddipResource=(e=>{var t=this.props.form;e.preventDefault(),t.validateFields((e,a)=>{if(!e){var l={ipaddress:JSON.stringify({data:this.state.data}),mask:t.getFieldValue("mask")?t.getFieldValue("mask"):"",remarks:t.getFieldValue("remarks")?t.getFieldValue("remarks"):"",typeid:this.state.selectedTypeValue,purposeid:this.state.SelectPurposeValue};this.props.dispatch({type:"gidc/addIpResource",payload:l}),n.default.success("\u6dfb\u52a0\u6210\u529f"),this.setState({modalVisible:!1}),t.resetFields()}})}),this.handleLineStatus=(e=>{1==e.target.value?this.setState({showFormProline:!1,valueProline:e.target.value}):this.setState({showFormProline:!0,valueProline:e.target.value})}),this.handleSelectLineValue=(e=>{this.setState({selectedLineValue:e})}),this.handleSelectTypeValue=(e=>{this.setState({selectedTypeValue:e})}),this.handleSelectPurposeValue=(e=>{this.setState({SelectPurposeValue:e})}),this.handleCheckIp=(e=>{var t=this.props.form;e.preventDefault();var a={ipaddr_begin:t.getFieldValue("ipaddr_begin")?t.getFieldValue("ipaddr_begin"):"",ipaddr_end:t.getFieldValue("ipaddr_end")?t.getFieldValue("ipaddr_end"):"",mask:t.getFieldValue("mask")?t.getFieldValue("mask"):""};this.isEqualIPAddress(a.ipaddr_begin,a.ipaddr_end,a.mask)&&this.handleCheckIpRequest(a.ipaddr_begin,a.ipaddr_end)}),this.handleCheckIpRequest=((e,t)=>{var a=new Array,l=this.ip2int(e),s=this.ip2int(t);if(s-l>255)this.setState({result:"\u8f93\u5165\u7684\u7f51\u6bb5\u5305\u542bip\u6570\u91cf\u8fc7\u5927."});else{for(var d=l;d<=s;d++)a.push(this.int2iP(d));this.setState({loading:!0}),this.props.dispatch({type:"gidc/checkIpResource",payload:{ipaddress:JSON.stringify({data:a})}}),this.props.enable?this.setState({result:"ip\u53ef\u4ee5\u6b63\u5e38\u4f7f\u7528",data:a,enable:!0}):this.setState({result:""})}})}render(){var e=this.props.form.getFieldDecorator,t=this.props,a=(t.submitting,t.ipclassify),l=t.checkloading,s=this.state.enable;console.log("ADD.props",this.props);var n={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}};return m.default.createElement("div",{className:g.default.tableListOperator,style:{float:"left"}},m.default.createElement(i.default,{icon:"plus",type:"primary",onClick:()=>this.handleModalVisible(!0)},"\u6dfb\u52a0IP\u8d44\u6e90"),m.default.createElement(d.default,{title:"\u6dfb\u52a0IP\u8d44\u6e90",visible:this.state.modalVisible,onOk:this.handleAddipResource,width:600,confirmLoading:!s,onCancel:()=>this.handleModalVisible()},m.default.createElement(y,(0,r.default)({},n,{label:"IP\u7f51\u6bb5\u8d77\u59cb\u5730\u5740"}),e("ipaddr_begin",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165IP\u8d77\u59cb\u5730\u5740",pattern:/^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,message:"\u8bf7\u8f93\u5165\u6b63\u786eip\u5730\u5740"}]})(m.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165IP\u8d77\u59cb\u5730\u5740"}))),m.default.createElement(y,(0,r.default)({},n,{label:"IP\u7f51\u6bb5\u7ed3\u675f\u5730\u5740"}),e("ipaddr_end",{rules:[{message:"\u8bf7\u8f93\u5165IP\u6bb5\u7ed3\u675f\u5730\u5740",pattern:/^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,message:"\u8bf7\u8f93\u5165\u6b63\u786eip\u5730\u5740"}]})(m.default.createElement(u.default,{placeholder:"\u4e0d\u8f93\u5165\u9ed8\u8ba4\u503c\u7b49\u4e8eIP\u6bb5\u8d77\u59cb\u5730\u5740"}))),m.default.createElement(y,(0,r.default)({},n,{label:"\u63a9\u7801"}),e("mask",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7f51\u7edc\u5730\u5740\u63a9\u7801",pattern:/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/,message:"\u8bf7\u8f93\u5165\u6b63\u786e\u63a9\u7801"}]})(m.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u7f51\u7edc\u5730\u5740\u63a9\u7801"}))),m.default.createElement(y,(0,r.default)({},n,{label:"\u7f51\u7edc\u7c7b\u578b"}),e("typeid",{rules:[{required:!0}]})(m.default.createElement(f.default,{placeholder:"\u9009\u62e9\u7f51\u7edc\u7c7b\u578b",style:{width:120},onChange:this.handleSelectTypeValue},a.data.iptype.length>0&&a.data.iptype.map(e=>m.default.createElement(b,{key:e.ID,value:e.ID},e.iptype))))),m.default.createElement(y,(0,r.default)({},n,{label:"\u7528\u9014"}),e("purposeid",{rules:[{required:!0}]})(m.default.createElement(f.default,{placeholder:"\u9009\u62e9\u7528\u9014",style:{width:120},onChange:this.handleSelectPurposeValue},a.data.ippurpose.length>0&&a.data.ippurpose.map(e=>m.default.createElement(b,{key:e.ID,value:e.ID},e.iptitle))))),m.default.createElement(y,(0,r.default)({},n,{label:"\u5907\u6ce8"}),e("remarks",{rules:[{required:!0,message:"\u5907\u6ce8"}]})(m.default.createElement(S,{style:{minHeight:32},placeholder:"\u673a\u623f\u63cf\u8ff0",rows:4}))),m.default.createElement(y,(0,r.default)({},n,{label:"\u68c0\u6d4bip\u6bb5"}),m.default.createElement(i.default,{icon:"check",loading:l,onClick:e=>this.handleCheckIp(e)},"\u68c0\u6d4bIP\u6bb5"),m.default.createElement("br",null),m.default.createElement("span",{style:{color:"#F00",font:"bold"}}," ",this.state.result," "))))}})||h)||h);t.default=I},RQNy:function(e,t,a){e.exports={standardTable:"antd-pro-components-resource-ip-table-ip-standardTable",tableAlert:"antd-pro-components-resource-ip-table-ip-tableAlert"}},W5rP:function(e,t,a){"use strict";var l=a("GyWo"),s=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("z4Cl");var d=s(a("L9Tq")),r=s(a("OjS7"));a("jYJC");var i=s(a("47AH"));a("9E1Q");var n=s(a("VtQk"));a("oeOs");var u=s(a("AXz3"));a("B5iR");var o=s(a("c0J2")),p=l(a("ZS5U")),c=(s(a("I9Uw")),s(a("RQNy"))),h=(a("gr65"),o.default.Option),f=e=>{var t=e.editable,a=e.value,l=e.onChange;return p.default.createElement("div",null,t?p.default.createElement(u.default,{style:{margin:"-5px 0"},value:a,onChange:e=>l(e.target.value)}):a)};class m extends p.PureComponent{constructor(){super(...arguments),this.state={selectedRowKeys:[],totalCallNo:0,data:[],status:!1,disabled:!0,rateValue:3},this.columns=[{title:"IP\u540d\u79f0",dataIndex:"ipaddress",width:"15%",render:(e,t)=>this.renderColumns(e,t,"ipaddress")},{title:"\u7c7b\u578b",dataIndex:"iptype",width:"15%",render:(e,t)=>{var a=this.props.ipresource.data.iptype;return p.default.createElement(o.default,{disabled:this.state.disabled,placeholder:e,style:{width:120},onChange:this.handleSelectPurposeValue},a.length&&a.map(e=>p.default.createElement(h,{key:e.ID,value:e.ID},e.iptype)))}},{title:"\u7528\u9014",dataIndex:"iptitle",width:"15%",render:(e,t)=>{var a=this.props.ipresource.data.ippurpose;return p.default.createElement(o.default,{disabled:this.state.disabled,placeholder:e,style:{width:120},onChange:this.handleSelectPurposeValue},a.length&&a.map(e=>p.default.createElement(h,{key:e.ID,value:e.ID},e.iptitle)))}},{title:"\u63a9\u7801",dataIndex:"mask",width:"15%",render:(e,t)=>this.renderColumns(e,t,"mask")},{title:"\u72b6\u6001",dataIndex:"status",width:"15%",filters:[{text:"\u672a\u4f7f\u7528",value:1},{text:"\u5df2\u4f7f\u7528",value:2},{text:"\u9884\u7559",value:3}],render:(e,t)=>{var a=t.status,l={color:"red"};return p.default.createElement("div",{style:l},a)}},{title:"\u5907\u6ce8",dataIndex:"remarks",width:"15%",render:(e,t)=>this.renderColumns(e,t,"remarks")},{title:"\u64cd\u4f5c",dataIndex:"ID",width:"20%",render:(e,t)=>{var a=t.editable,l=t.deleteable;return p.default.createElement("div",{className:"editable-row-operations"},!l&&(a?p.default.createElement("span",null,p.default.createElement("a",{onClick:()=>this.save(t.ID,t.typeid,t.purposeid)},"\u4fdd\u5b58"),p.default.createElement(n.default,{type:"vertical"}),p.default.createElement(i.default,{title:"\u786e\u5b9a\u53d6\u6d88?",onConfirm:()=>this.cancel(t.ID)},p.default.createElement("a",null,"\u53d6\u6d88"))):p.default.createElement("span",null,p.default.createElement("a",{onClick:()=>this.edit(t.ID)},"\u7f16\u8f91"))),!a&&(l?p.default.createElement("span",null,p.default.createElement(i.default,{title:"\u786e\u5b9a\u5220\u9664?",onConfirm:()=>this.confirmdelete(t.ID)},p.default.createElement("a",null,"\u63d0\u4ea4")),p.default.createElement(n.default,{type:"vertical"}),p.default.createElement("a",{onClick:()=>this.canceldelete(t.ID)},"\u53d6\u6d88")):p.default.createElement("span",{style:{marginLeft:10}},p.default.createElement("a",{onClick:()=>this.askdelete(t.ID)},"\u5220\u9664"))))}}],this.handleCommentChange=((e,t)=>{var a=[...this.state.data],l=a.filter(t=>e===t.ID)[0];l&&(l.comment=t,this.setState({data:a}))}),this.handleTableChange=((e,t,a)=>{this.props.onChange(e,t,a)}),this.handleRowSelectChange=((e,t)=>{var a=t.reduce((e,t)=>{return e+parseFloat(t.callNo,10)},0);this.props.onSelectRow&&this.props.onSelectRow(t),this.setState({selectedRowKeys:e,totalCallNo:a}),this.props.handleSelectRows(e)}),this.handleSelectTypeValue=(e=>{this.setState({selectedTypeValue:e})}),this.handleSelectPurposeValue=(e=>{this.setState({SelectPurposeValue:e})})}componentWillReceiveProps(e){console.log("Iptable componentWillReceiveProps",e),e.ipresource.data.ipresourcelist?this.setState({data:e.ipresource.data.ipresourcelist}):this.setState({data:e.ipresource.data})}renderColumns(e,t,a){return p.default.createElement(f,{editable:t.editable,value:e,onChange:e=>this.handleChange(e,t.ID,a)})}handleChange(e,t,a){var l=[...this.state.data],s=l.filter(e=>t===e.ID)[0];s&&(s[a]=e,this.setState({data:l,disabled:!1}))}edit(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.editable=!0,this.setState({data:t,disabled:!1}))}save(e,t,a){var l=[...this.state.data],s=l.filter(t=>e===t.ID)[0];s&&(delete s.editable,"undefined"===typeof this.state.selectedTypeValue?s.typeid=t:s.typeid=this.state.selectedTypeValue,"undefined"==typeof this.state.SelectPurposeValue?s.purposeid=a:s.purposeid=this.state.SelectPurposeValue,this.setState({data:l,disabled:!0}),this.cacheData=l.map(e=>(0,r.default)({},e)),this.props.handleSaveData(s))}cancel(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.editable,this.setState({data:t,disabled:!0}))}askdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.deleteable=!0,this.setState({data:t}))}confirmdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];if(a){var l=t.indexOf(a);l>-1&&t.splice(l,1),a.tag=!0,this.setState({data:t}),this.cacheData=t.map(e=>(0,r.default)({},e)),this.props.handleDeleteData(a)}}canceldelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.deleteable,this.setState({data:t}))}render(){var e=this.props,t=e.ipresource,a=(e.loading,this.state),l=a.selectedRowKeys,s=(a.totalCallNo,{selectedRowKeys:l,onChange:this.handleRowSelectChange,getCheckboxProps:e=>({disabled:e.disabled})}),i=(0,r.default)({showSizeChanger:!0,showQuickJumper:!0},t.pagination);return this.cacheData=this.state.data.map(e=>(0,r.default)({},e)),p.default.createElement("div",{className:c.default.standardTable},p.default.createElement(d.default,{bordered:!0,rowSelection:s,pagination:i,rowKey:e=>e.ID,dataSource:this.state.data,columns:this.columns,onChange:this.handleTableChange}))}}var g=m;t.default=g},q5xv:function(e,t,a){e.exports={tableList:"antd-pro-pages-g-resource-g-idc-ipresource-ipresouce-tableList",tableListOperator:"antd-pro-pages-g-resource-g-idc-ipresource-ipresouce-tableListOperator",tableListForm:"antd-pro-pages-g-resource-g-idc-ipresource-ipresouce-tableListForm",submitButtons:"antd-pro-pages-g-resource-g-idc-ipresource-ipresouce-submitButtons"}}}]);