(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[44],{"36K2":function(e,t,a){e.exports={tableList:"antd-pro-pages-g-power-user-user-list-tableList",tableListOperator:"antd-pro-pages-g-power-user-user-list-tableListOperator",tableListForm:"antd-pro-pages-g-power-user-user-list-tableListForm",submitButtons:"antd-pro-pages-g-power-user-user-list-submitButtons"}},"7TQl":function(e,t,a){"use strict";var l=a("4Gf+"),s=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5QNv");var r=l(a("XRPJ"));a("PRxM");var d=l(a("C5on")),n=l(a("RSNA"));a("qhfc");var i=l(a("aEti"));a("V1iB");var o=l(a("O2EK"));a("oeOs");var u=l(a("AXz3"));a("B5iR");var c=l(a("c0J2"));a("62OL");var h,p,f,m=l(a("lZ5B")),v=s(a("ZS5U")),g=a("rAnT"),b=m.default.Item,y=c.default.Option,E=(u.default.TextArea,(e,t)=>{o.default[e]({message:"\u901a \u77e5 \u680f",description:t})}),C=(h=(0,g.connect)(e=>e),p=m.default.create(),h(f=p(f=class extends v.PureComponent{constructor(){super(...arguments),this.state={modalVisible:this.props.visible,showFormProline:!0,selectedGroupValue:0,enable:!0},this.handleModalVisible=(e=>{var t=this.props.form;t.resetFields(),this.setState({modalVisible:!!e})}),this.handleAdd=(()=>{var e=this.props.form;e.validateFields(e=>{});var t={username:e.getFieldValue("username")?e.getFieldValue("username"):"",password:e.getFieldValue("password")?e.getFieldValue("password"):"",role:e.getFieldValue("role")?e.getFieldValue("role"):"",realname:e.getFieldValue("realname")?e.getFieldValue("realname"):"",email:e.getFieldValue("email")?e.getFieldValue("email"):"",phone:e.getFieldValue("phone")?e.getFieldValue("phone"):"",enable:this.state.enable};this.props.dispatch({type:"guser/addUser",payload:{description:t,cb:e=>{"200"==e.status?E("success","\u6dfb\u52a0\u7528\u6237\u6210\u529f!~ ~"):E("error","\u6dfb\u52a0\u7528\u6237\u5931\u8d25!~ ~")}}}),this.setState({modalVisible:!1}),e.resetFields()}),this.handleSelectLineValue=(e=>{console.log(e),this.props.dispatch({type:"gproline/getProjectGroupbyId",payload:e})}),this.handleSelectGroupValue=(e=>{this.setState({selectedGroupValue:e})}),this.handleStatusChange=(e=>{e?this.setState({enable:"on"}):this.setState({enable:"off"})})}render(){var e=this.props.form.getFieldDecorator,t=this.props,a=(t.submitting,t.form,t.dispatch,t.progroupdata,t.roledata),l={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}};return v.default.createElement("div",null,v.default.createElement(i.default,{type:"primary",icon:"plus",onClick:()=>this.handleModalVisible(!0)},"\u6dfb\u52a0\u7528\u6237"),v.default.createElement(r.default,{title:"\u6dfb\u52a0\u7528\u6237",visible:this.state.modalVisible,onOk:this.handleAdd,width:600,onCancel:()=>this.handleModalVisible()},v.default.createElement(b,(0,n.default)({},l,{label:"\u7528\u6237\u540d"}),e("username",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}]})(v.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}))),v.default.createElement(b,(0,n.default)({},l,{label:"\u7528\u6237\u5bc6\u7801"}),e("password",{rules:[{required:!0,message:"\u7528\u6237\u5bc6\u7801"}]})(v.default.createElement(u.default,{placeholder:"\u7528\u6237\u5bc6\u7801"}))),v.default.createElement(b,(0,n.default)({},l,{label:"\u89d2\u8272"}),e("role")(v.default.createElement(c.default,{style:{width:120},showSearch:!0,placeholder:"\u89d2\u8272",onChange:this.handleSelectLineValue,optionFilterProp:"children",filterOption:(e,t)=>t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},a.map(e=>{return v.default.createElement(y,{key:e.ID,value:e.ID},e.title)})))),v.default.createElement(b,(0,n.default)({},l,{label:"\u90ae\u7bb1"}),e("email",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u90ae\u7bb1"}]})(v.default.createElement(u.default,{placeholder:"\u90ae\u7bb1"}))),v.default.createElement(b,(0,n.default)({},l,{label:"\u771f\u5b9e\u59d3\u540d"}),e("realname",{rules:[{}]})(v.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"}))),v.default.createElement(b,(0,n.default)({},l,{label:"\u624b\u673a\u53f7"}),e("phone",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}]})(v.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}))),v.default.createElement(b,(0,n.default)({},l,{label:"\u7528\u6237\u72b6\u6001"}),e("enable")(v.default.createElement(d.default,{checkedChildren:"\u5f00\u542f",unCheckedChildren:"\u5173\u95ed",checked:this.state.enable,onChange:e=>this.handleStatusChange(e)})))))}})||f)||f);t.default=C},H8Ab:function(e,t,a){"use strict";var l=a("4Gf+"),s=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var r=l(a("ivY1"));a("9E1Q");var d=l(a("VtQk"));a("P7WH");var n=l(a("KVOY"));a("sXvm");var i=l(a("0WXq"));a("cqzp");var o=l(a("fMIj")),u=l(a("OjS7"));a("B5iR");var c=l(a("c0J2"));a("62OL");var h=l(a("lZ5B"));a("oeOs");var p,f,m,v=l(a("AXz3")),g=s(a("ZS5U")),b=a("rAnT"),y=l(a("vtht")),E=l(a("36K2")),C=l(a("7TQl")),S=(v.default.Group,h.default.Item,c.default.Option,e=>Object.keys(e).map(t=>e[t]).join(",")),w=(v.default.TextArea,p=(0,b.connect)(e=>e),f=h.default.create(),p(m=f(m=class extends g.PureComponent{constructor(){super(...arguments),this.state={expandForm:!1,selectedRows:[],formValues:{},userdata:[],roledata:[]},this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,s=this.state.formValues,r=Object.keys(t).reduce((e,a)=>{var l=(0,u.default)({},e);return l[a]=S(t[a]),l},{}),d=(0,u.default)({currentPage:e.current,pageSize:e.pageSize},s,r);a.field&&(d.sorter=`${a.field}_${a.order}`),l({type:"gproline/getUserlist",payload:d})}),this.handleFormReset=(()=>{var e=this.props,t=e.form,a=e.dispatch;t.resetFields(),this.setState({formValues:{}}),a({type:"gproline/getProjectList",payload:{}})}),this.toggleForm=(()=>{this.setState({expandForm:!this.state.expandForm})}),this.handleMenuClick=(e=>{var t=this.props.dispatch,a=this.state.selectedRows;if(a)switch(e.key){case"remove":t({type:"gproline/getProjectLine",payload:{ID:a.map(e=>e.ID).join(",")},callback:()=>{this.setState({selectedRows:[]})}});break;case"approval":t({type:"gproline/getProjectLine",payload:{ID:a.map(e=>e.ID).join(",")},callback:()=>{this.setState({selectedRows:[]})}});case"stop":t({type:"gproline/getProjectLine",payload:{ID:a.map(e=>e.ID).join(",")},callback:()=>{this.setState({selectedRows:[]})}});default:break}}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleSaveData=(e=>{var t="on";console.log("val",e);var a=e.ID,l=e.email,s=e.enable,r=e.phone,d=e.real_name,n=e.role,i=e.username;e.password;t=s?"on":"off";var o={ID:a,enable:s,role:n,username:i,enable:t,email:l,real_name:d,phone:r};this.props.dispatch({type:"guser/modifyUser",payload:o})}),this.handleDeleteData=(e=>{var t=e.ID,a={},l=[];l.push(t),a.ids=l,this.props.dispatch({type:"gproline/deleteProject",payload:{tag:!1,infolist:JSON.stringify(a)}})})}componentDidMount(){var e=this.props.dispatch;e({type:"guser/getUserlist"})}render(){var e=this.state,t=e.selectedRows,a=(e.userdata,e.roledata,e.pagination,this.props.form.getFieldDecorator,this.props),l=a.guser,s=a.dispatch;console.log("guser",l);g.default.createElement(o.default,{onClick:this.handleMenuClick,selectedKeys:[]},g.default.createElement(o.default.Item,{key:"remove"},"\u6279\u91cf\u5220\u9664"),g.default.createElement(o.default.Item,{key:"approval"},"\u6279\u91cf\u542f\u7528"),g.default.createElement(o.default.Item,{key:"stop"},"\u6279\u91cf\u7981\u7528"));return g.default.createElement(r.default,{bordered:!1},g.default.createElement("div",{className:E.default.tableList},g.default.createElement("div",{className:E.default.tableListOperator},g.default.createElement(n.default,{gutter:16},g.default.createElement(i.default,{span:2},g.default.createElement(C.default,{roledata:l.data.data.role_list})))),g.default.createElement(d.default,null," \u7528\u6237\u5217\u8868 "),g.default.createElement(y.default,{selectedRows:t,dispatch:s,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData,userdata:l.data.data.user_infos,roledata:l.data.data.role_list,pagination:l.data.pagination,onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange})))}})||m)||m);t.default=w},X6dz:function(e,t,a){e.exports={activeChart:"antd-pro-components-access-user-index-activeChart",activeChartGrid:"antd-pro-components-access-user-index-activeChartGrid",activeChartLegend:"antd-pro-components-access-user-index-activeChartLegend"}},vtht:function(e,t,a){"use strict";var l=a("GyWo"),s=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("z4Cl");var r=s(a("L9Tq"));a("fr3b");var d=s(a("Bziu"));a("jYJC");var n=s(a("47AH"));a("9E1Q");var i=s(a("VtQk"));a("PRxM");var o=s(a("C5on")),u=s(a("OjS7"));a("oeOs");var c=s(a("AXz3"));a("B5iR");var h=s(a("c0J2")),p=l(a("ZS5U")),f=(s(a("I9Uw")),s(a("X6dz"))),m=h.default.Option,v=e=>{var t=e.editable,a=e.value,l=e.onChange;return p.default.createElement("div",null,t?p.default.createElement(c.default,{style:{margin:"-5px 0"},value:a,onChange:e=>l(e.target.value)}):a)};class g extends p.PureComponent{constructor(){super(...arguments),this.state={selectedRowKeys:[],totalCallNo:0,data:[],selectedLine:!1},this.handleRowSelectChange=((e,t)=>{var a=t.reduce((e,t)=>{return e+parseFloat(t.callNo,10)},0);this.props.onSelectRow&&this.props.onSelectRow(t),this.setState({selectedRowKeys:e,totalCallNo:a})}),this.handleTableChange=((e,t,a)=>{this.props.onChange(e,t,a)}),this.cleanSelectedKeys=(()=>{this.handleRowSelectChange([],[])})}componentWillReceiveProps(e){0===e.selectedRows.length&&this.setState({selectedRowKeys:[],totalCallNo:0}),e.userdata&&this.setState({data:e.userdata.map(e=>{return void 0==e.selectStatus&&(e.selectStatus=!0),e})})}renderColumns(e,t,a){return p.default.createElement(v,{editable:t.editable,value:e,onChange:e=>this.handleChange(e,t.ID,a)})}edit(e){console.log("key",e);var t=[...this.state.data];console.log("newData",t);var a=t.filter(t=>e===t.ID)[0];a&&(console.log("target",a),a.editable=!0,this.setState({data:t.map(t=>{return e==t.ID&&(t.selectStatus=!1),t})}))}save(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(delete a.editable,"undefined"===typeof a.role&&(a.role=a.title_id),this.setState({data:t}),this.props.handleSaveData(a))}cancel(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(delete a.editable,this.setState({data:t.map(t=>{return e==t.ID&&(t.selectStatus=!0),t})}))}askdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.deleteable=!0,this.setState({data:t}))}confirmdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];if(a){var l=t.indexOf(a);l>-1&&t.splice(l,1),a.tag=!1,this.setState({data:t}),this.cacheData=t.map(e=>(0,u.default)({},e)),this.props.handleDeleteData(a)}}handleChange(e,t,a){var l=[...this.state.data],s=l.filter(e=>t===e.ID)[0];s&&(s[a]=e,this.setState({data:l}))}handleRoleValue(e,t,a){var l=[...this.state.data],s=l.filter(e=>t===e.ID)[0];s&&(s[a]=e,this.setState({data:l,disabled:!1}))}handleSelectLineValue(e,t,a){var l=[...this.state.data],s=l.filter(e=>t===e.ID)[0];s&&(s[a]=e,s["group_title"]="\u8bf7\u9009\u62e9",s["group_id"]="-1",this.props.dispatch({type:"gproline/getProjectGroupbyId",payload:e}),this.setState({data:l,disabled:!1,selectedLine:!0}))}canceldelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.deleteable,this.setState({data:t}))}render(){var e=this.state,t=e.selectedRowKeys,a=(e.totalCallNo,e.data,this.props),l=a.roledata,s=a.userdata;console.log("console roledata",l);var u=[{title:"\u7528\u6237ID",dataIndex:"ID",key:"ID",width:"120px"},{title:"\u7528\u6237\u540d",dataIndex:"username",key:"username",width:"120px",render:(e,t)=>this.renderColumns(e,t,"username")},{title:"\u771f\u5b9e\u59d3\u540d",dataIndex:"real_name",key:"real_name",width:"120px",render:(e,t)=>this.renderColumns(e,t,"real_name")},{title:"\u516c\u53f8\u90ae\u7bb1",dataIndex:"email",key:"email",width:"120px",render:(e,t)=>this.renderColumns(e,t,"email")},{title:"\u624b\u673a\u53f7",dataIndex:"phone",key:"phone",width:"200px",render:(e,t)=>this.renderColumns(e,t,"phone")},{title:"\u89d2\u8272",dataIndex:"title",key:"title",width:"150px",render:(e,t)=>{var a=p.default.createElement(m,{value:"disabled",disabled:!0},"Disabled");return l.length>0&&(a=l.map(e=>p.default.createElement(m,{key:e.ID,value:e.ID},e.title))),p.default.createElement(h.default,{defaultValue:t.title,disabled:t.selectStatus,style:{width:"auto"},onChange:e=>{this.handleRoleValue(e,t.ID,"role")}},a)}},{title:"\u72b6\u6001",dataIndex:"enable",key:"enable",width:"150px",render:(e,t)=>{var a=t.enable;return p.default.createElement("div",null,p.default.createElement(o.default,{checkedChildren:"\u542f\u7528",unCheckedChildren:"\u7981\u7528",checked:a,onChange:e=>{this.handleChange(e,t.ID,"enable")},disabled:t.selectStatus}))}},{title:"\u64cd\u4f5c",dataIndex:"operation",key:"operation",width:"200px",render:(e,t)=>{var a=t.editable;t.deleteable;return p.default.createElement("div",{className:"editable-row-operations"},a?p.default.createElement("span",null,p.default.createElement("a",{onClick:()=>this.save(t.ID)},"\u4fdd\u5b58"),p.default.createElement(i.default,{type:"vertical"}),p.default.createElement(n.default,{title:"\u786e\u5b9a\u53d6\u6d88?",onConfirm:()=>this.cancel(t.ID)},p.default.createElement("a",null,"\u53d6\u6d88"))):p.default.createElement("span",null,p.default.createElement("a",{onClick:()=>this.edit(t.ID)},"\u4fee\u6539"),p.default.createElement(i.default,{type:"vertical"})),a?p.default.createElement("span",null):p.default.createElement("span",null,p.default.createElement(n.default,{title:"\u786e\u5b9a\u5220\u9664?",onConfirm:()=>this.confirmdelete(t.ID)},p.default.createElement("a",null,"\u5220\u9664")),p.default.createElement("span",null,p.default.createElement(i.default,{type:"vertical"}),p.default.createElement("a",null,"\u67e5\u770b\u5bc6\u7801")),p.default.createElement("span",null,p.default.createElement(i.default,{type:"vertical"}),p.default.createElement("a",null,"\u4fee\u6539\u5bc6\u7801"))))}}],c={showSizeChanger:!0,showQuickJumper:!0},v={selectedRowKeys:t,onChange:this.handleRowSelectChange,getCheckboxProps:e=>({disabled:e.disabled})};return p.default.createElement("div",{className:f.default.standardTable},p.default.createElement("div",{className:f.default.tableAlert},p.default.createElement(d.default,{message:p.default.createElement("div",null,"\u5df2\u9009\u62e9 ",p.default.createElement("a",{style:{fontWeight:600}},t.length)," \u4e2a\u7528\u6237\xa0",p.default.createElement("a",{onClick:this.cleanSelectedKeys,style:{marginLeft:24}},"\u53d6\u6d88\u52fe\u9009")),type:"info",showIcon:!0})),p.default.createElement(r.default,{rowKey:e=>e.ID,rowSelection:v,dataSource:s,columns:u,pagination:c,onChange:this.handleTableChange}))}}var b=g;t.default=b}}]);