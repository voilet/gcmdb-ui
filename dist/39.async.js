(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{"/SrW":function(e,t,a){"use strict";var l=a("0ZgE"),n=a("VY4n");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("UsS6");var r=l(a("xqAZ"));a("pdEl");var d=l(a("0Hx8"));a("sL9k");var o=l(a("BlmP"));a("1Y2U");var u=l(a("c8pg"));a("3PXm");var i=l(a("m2aW"));a("xzRB");var s=l(a("TOEs"));a("hjcW");var c=l(a("Tmqy"));a("wPR8");var p=l(a("cmPo")),f=l(a("U2oY")),h=l(a("TFzq")),m=l(a("DEU0")),g=l(a("+hkI")),v=l(a("54rf")),b=l(a("oHNe"));a("0lkx");var y=l(a("gEKc"));a("6ASg");var E=l(a("pKc7"));a("M50D");var k,D,S,C=l(a("5Zb7")),I=n(a("bRCM")),w=a("rAnT"),_=l(a("pexS")),x=l(a("mR73")),j=l(a("21Zr")),V=(C.default.Item,E.default.Option,function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")}),R=(y.default.TextArea,k=(0,w.connect)(function(e){return e}),D=C.default.create(),k(S=D(S=function(e){function t(){var e,a;(0,h.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,g.default)(this,(e=(0,v.default)(t)).call.apply(e,[this].concat(n))),a.state={expandForm:!1,selectedRows:[],formValues:{}},a.handleStandardTableChange=function(e,t,l){var n=a.props.dispatch,r=a.state.formValues,d=Object.keys(t).reduce(function(e,a){var l=(0,f.default)({},e);return l[a]=V(t[a]),l},{}),o=(0,f.default)({currentPage:e.current,pageSize:e.pageSize},r,d);l.field&&(o.sorter="".concat(l.field,"_").concat(l.order)),n({type:"gproline/getProjectList",payload:o})},a.handleRefreshTableChange=function(){(0,a.props.dispatch)({type:"gproline/getProjectLine",payload:""})},a.handleFormReset=function(){var e=a.props,t=e.form,l=e.dispatch;t.resetFields(),a.setState({formValues:{}}),l({type:"gproline/getProjectList",payload:{}})},a.toggleForm=function(){a.setState({expandForm:!a.state.expandForm})},a.handleMenuClick=function(e){var t=a.props.dispatch,l=a.state.selectedRows;if(l)switch(console.log(l),e.key){case"remove":t({type:"gproline/getProjectLine",payload:{ID:l.map(function(e){return e.ID}).join(",")},callback:function(){a.setState({selectedRows:[]})}});break;case"approval":t({type:"gproline/getProjectLine",payload:{ID:l.map(function(e){return e.ID}).join(",")},callback:function(){a.setState({selectedRows:[]})}});case"stop":t({type:"gproline/getProjectLine",payload:{ID:l.map(function(e){return e.ID}).join(",")},callback:function(){a.setState({selectedRows:[]})}})}},a.handleSelectRows=function(e){a.setState({selectedRows:e})},a.handleSaveData=function(e){console.log("val",e);var t=e.ID,l=e.group_id,n=e.pro_title,r=e.line_id,d=e.pro_alias,o=e.pro_code_url,u=e.pro_enable,i=e.pro_remarks;if("-1"!=l){var s={ID:t,title:n,alias:d,remarks:i,code_url:o,enable:u,groupid:l,lineid:r};a.props.dispatch({type:"gproline/modifyProject",payload:s})}else a.props.dispatch({type:"gproline/getProjectList"})},a.handleDeleteData=function(e){console.log(e);var t=e.ID,l={},n=[];n.push(t),l.ids=n,a.props.dispatch({type:"gproline/deleteProject",payload:{tag:!1,infolist:JSON.stringify(l)}})},a}return(0,b.default)(t,e),(0,m.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"gproline/getProjectList"}),e({type:"gproline/getProjectLine"})}},{key:"render",value:function(){var e=this.state,t=e.selectedRows,a=(e.modalVisible,e.addInputValue,this.props.form.getFieldDecorator,this.props),l=a.gproline,n=(a.loading,a.submitting,a.dispatch);console.log("Parent,props",this.props);var f=I.default.createElement(p.default,{onClick:this.handleMenuClick,selectedKeys:[]},I.default.createElement(p.default.Item,{key:"remove"},"删除"),I.default.createElement(p.default.Item,{key:"approval"},"批量启用"),I.default.createElement(p.default.Item,{key:"stop"},"批量暂停"));return I.default.createElement(r.default,{bordered:!1},I.default.createElement("div",{className:x.default.tableList},I.default.createElement("div",{className:x.default.tableListOperator},I.default.createElement(o.default,{gutter:16},I.default.createElement(c.default,{span:2},I.default.createElement(j.default,null)),I.default.createElement(c.default,{span:2},t.length>0&&I.default.createElement("span",null,I.default.createElement(u.default,{overlay:f},I.default.createElement(i.default,null,"更多操作 ",I.default.createElement(s.default,{type:"down"}))))))),I.default.createElement(d.default,null," 项目列表 "),I.default.createElement(_.default,{selectedRows:t,dispatch:n,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData,prolinedata:l.prolinedata,progroupbylid:l.progroupbylid,prodata:this.props.gproline.projectdata,onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange})))}}]),t}(I.PureComponent))||S)||S);t.default=R},"21Zr":function(e,t,a){"use strict";var l=a("0ZgE"),n=a("VY4n");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("NG6T");var r=l(a("uZXS"));a("9sh3");var d=l(a("r3sT")),o=l(a("+wDg"));a("3PXm");var u=l(a("m2aW"));a("s/1u");var i=l(a("TMZs")),s=l(a("TFzq")),c=l(a("DEU0")),p=l(a("+hkI")),f=l(a("54rf")),h=l(a("oHNe"));a("YJ5n");var m=l(a("Vb+q"));a("0lkx");var g=l(a("gEKc"));a("6ASg");var v=l(a("pKc7"));a("M50D");var b,y,E,k=l(a("5Zb7")),D=n(a("bRCM")),S=a("rAnT"),C=(l(a("mR73")),k.default.Item),I=v.default.Option,w=g.default.TextArea,_=(m.default.Group,b=(0,S.connect)(function(e){return e}),y=k.default.create(),b(E=y(E=function(e){function t(){var e,a;(0,s.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,p.default)(this,(e=(0,f.default)(t)).call.apply(e,[this].concat(n))),a.state={modalVisible:a.props.visible,showFormProline:!0,selectedGroupValue:0,enable:!0},a.handleModalVisible=function(e){a.props.form.resetFields(),a.setState({modalVisible:!!e})},a.handleAdd=function(){var e=a.props.form;e.validateFields(function(e){});var t={title:e.getFieldValue("title")?e.getFieldValue("title"):"",alias:e.getFieldValue("alias")?e.getFieldValue("alias"):"",order:e.getFieldValue("order")?e.getFieldValue("order"):"",code_url:e.getFieldValue("code_url")?e.getFieldValue("code_url"):"",remarks:e.getFieldValue("remarks")?e.getFieldValue("remarks"):"",enable:a.state.enable,group:a.state.selectedGroupValue};a.props.dispatch({type:"gproline/addProject",payload:{description:t}}),i.default.success("添加成功"),a.setState({modalVisible:!1}),e.resetFields()},a.handleSelectLineValue=function(e){console.log(e),a.props.dispatch({type:"gproline/getProjectGroupbyId",payload:e})},a.handleSelectGroupValue=function(e){a.setState({selectedGroupValue:e})},a.handleStatusChange=function(e){a.setState({enable:e})},a}return(0,h.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.props,l=(a.submitting,a.form,a.dispatch,a.progroupdata,a.gproline);console.log("addproject",this.props.gproline);var n={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}};return D.default.createElement("div",null,D.default.createElement(u.default,{type:"primary",icon:"plus",onClick:function(){return e.handleModalVisible(!0)}},"添加项目"),D.default.createElement(r.default,{title:"添加项目",visible:this.state.modalVisible,onOk:this.handleAdd,width:600,onCancel:function(){return e.handleModalVisible()}},D.default.createElement(C,(0,o.default)({},n,{label:"所属产品线"}),t("selectline")(D.default.createElement(v.default,{style:{width:120},showSearch:!0,placeholder:"选择产品线",onChange:this.handleSelectLineValue,optionFilterProp:"children",filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},l.prolinedata.data.length>0&&l.prolinedata.data.map(function(e){return D.default.createElement(I,{key:e.ID,value:e.ID},e.title)})))),D.default.createElement(C,(0,o.default)({},n,{label:"所属项目组"}),t("selectgroup")(D.default.createElement(v.default,{showSearch:!0,placeholder:"选择项目组",style:{width:120},onSelect:this.handleSelectGroupValue,optionFilterProp:"children",filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},l.progroupbylid.length>0&&l.progroupbylid.map(function(e){return D.default.createElement(I,{key:e.ID,value:e.ID},e.title)})))),D.default.createElement(C,(0,o.default)({},n,{label:"项目名称"}),t("title",{rules:[{required:!0,message:"请输入项目名称"}]})(D.default.createElement(g.default,{placeholder:"请输入项目名称"}))),D.default.createElement(C,(0,o.default)({},n,{label:"项目别名"}),t("alias",{rules:[{required:!0,message:"请输入项目别名"}]})(D.default.createElement(g.default,{placeholder:"请输入项目别名，使用saltstack时需使用，请使用英文"}))),D.default.createElement(C,(0,o.default)({},n,{label:"代码仓库"}),t("code_url",{rules:[{}]})(D.default.createElement(g.default,{placeholder:"请输入git或svn地址"}))),D.default.createElement(C,(0,o.default)({},n,{label:"业务相关描述"}),t("remarks",{rules:[{required:!0,message:"请简要描述业务"}]})(D.default.createElement(w,{style:{minHeight:32},placeholder:"",rows:4}))),D.default.createElement(C,(0,o.default)({},n,{label:"项目状态"}),t("enable")(D.default.createElement(d.default,{checkedChildren:"开启",unCheckedChildren:"关闭",checked:this.state.enable,onChange:function(t){return e.handleStatusChange(t)}}))),D.default.createElement(C,(0,o.default)({},n,{label:"排序"}),t("order",{rules:[{}]})(D.default.createElement(g.default,{placeholder:"-99排序为最高，生成tree时使用"})))))}}]),t}(D.PureComponent))||E)||E);t.default=_},mR73:function(e,t,a){e.exports={tableList:"antd-pro-gcmdb-ui-src-pages-g-project-project-project-tableList",tableListOperator:"antd-pro-gcmdb-ui-src-pages-g-project-project-project-tableListOperator",tableListForm:"antd-pro-gcmdb-ui-src-pages-g-project-project-project-tableListForm",submitButtons:"antd-pro-gcmdb-ui-src-pages-g-project-project-project-submitButtons"}},pexS:function(e,t,a){"use strict";var l=a("VY4n"),n=a("0ZgE");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("ggfa");var r=n(a("M+wZ"));a("840F");var d=n(a("6eYs"));a("8EHj");var o=n(a("6xKx"));a("pdEl");var u=n(a("0Hx8"));a("9sh3");var i=n(a("r3sT")),s=n(a("U2oY")),c=n(a("bVKW")),p=n(a("TFzq")),f=n(a("DEU0")),h=n(a("+hkI")),m=n(a("54rf")),g=n(a("oHNe"));a("0lkx");var v=n(a("gEKc"));a("6ASg");var b=n(a("pKc7")),y=l(a("bRCM")),E=(n(a("I9Uw")),n(a("vIdK"))),k=b.default.Option,D=function(e){var t=e.editable,a=e.value,l=e.onChange;return y.default.createElement("div",null,t?y.default.createElement(v.default,{style:{margin:"-5px 0"},value:a,onChange:function(e){return l(e.target.value)}}):a)},S=function(e){function t(){var e,a;(0,p.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,h.default)(this,(e=(0,m.default)(t)).call.apply(e,[this].concat(n))),a.state={selectedRowKeys:[],totalCallNo:0,data:[],selectedLine:!1},a.handleRowSelectChange=function(e,t){var l=t.reduce(function(e,t){return e+parseFloat(t.callNo,10)},0);a.props.onSelectRow&&a.props.onSelectRow(t),a.setState({selectedRowKeys:e,totalCallNo:l})},a.handleTableChange=function(e,t,l){a.props.onChange(e,t,l)},a.cleanSelectedKeys=function(){a.handleRowSelectChange([],[])},a}return(0,g.default)(t,e),(0,f.default)(t,[{key:"componentWillReceiveProps",value:function(e){0===e.selectedRows.length&&this.setState({selectedRowKeys:[],totalCallNo:0}),e.prodata.data&&this.setState({data:e.prodata.data.map(function(e){return void 0==e.selectStatus&&(e.selectStatus=!0),e})})}},{key:"renderColumns",value:function(e,t,a){var l=this;return y.default.createElement(D,{editable:t.editable,value:e,onChange:function(e){return l.handleChange(e,t.ID,a)}})}},{key:"edit",value:function(e){var t=(0,c.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(a.editable=!0,this.setState({data:t.map(function(t){return e==t.ID&&(t.selectStatus=!1),t}),disabled:!1}))}},{key:"save",value:function(e){var t=(0,c.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(delete a.editable,a.enable=this.state.status,this.setState({data:t.map(function(t){return e==t.ID&&(t.selectStatus=!0),t}),disabled:!0}),this.cacheData=t.map(function(e){return(0,s.default)({},e)}),this.props.handleSaveData(a))}},{key:"cancel",value:function(e){var t=(0,c.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(Object.assign(a,this.cacheData.filter(function(t){return e===t.ID})[0]),delete a.editable,this.setState({data:t.map(function(t){return e==t.ID&&(t.selectStatus=!0),t}),disabled:!0}))}},{key:"askdelete",value:function(e){var t=(0,c.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(a.deleteable=!0,this.setState({data:t}))}},{key:"confirmdelete",value:function(e){var t=(0,c.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];if(a){var l=t.indexOf(a);l>-1&&t.splice(l,1),a.tag=!1,this.setState({data:t}),this.cacheData=t.map(function(e){return(0,s.default)({},e)}),this.props.handleDeleteData(a)}}},{key:"handleChange",value:function(e,t,a){var l=(0,c.default)(this.state.data),n=l.filter(function(e){return t===e.ID})[0];n&&(n[a]=e,this.setState({data:l,disabled:!1}))}},{key:"handleGroupValue",value:function(e,t,a){var l=(0,c.default)(this.state.data),n=l.filter(function(e){return t===e.ID})[0];n&&(n[a]=e.split(",")[0],n.group_title=e.split(",")[1],this.setState({data:l,disabled:!1}))}},{key:"handleSelectLineValue",value:function(e,t,a){var l=(0,c.default)(this.state.data),n=l.filter(function(e){return t===e.ID})[0];n&&(n[a]=e,n.group_title="请选择",n.group_id="-1",this.props.dispatch({type:"gproline/getProjectGroupbyId",payload:e}),this.setState({data:l,disabled:!1,selectedLine:!0}))}},{key:"canceldelete",value:function(e){var t=(0,c.default)(this.state.data),a=t.filter(function(t){return e===t.ID})[0];a&&(Object.assign(a,this.cacheData.filter(function(t){return e===t.ID})[0]),delete a.deleteable,this.setState({data:t}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRowKeys,l=(t.totalCallNo,t.data),n=this.props,c=n.prodata,p=n.loading,f=n.progroupbylid,h=n.prolinedata,m=[{title:"项目名称(中文)",dataIndex:"pro_title",key:"pro_title",width:"120px",render:function(t,a){return e.renderColumns(t,a,"pro_title")}},{title:"项目别名(英文)",dataIndex:"pro_alias",key:"pro_alias",width:"120px",render:function(t,a){return e.renderColumns(t,a,"pro_alias")}},{title:"产品线名称(中文)",dataIndex:"line_title",key:"line_title",width:"120px",render:function(t,a){var l=h.data.map(function(e){return y.default.createElement(k,{key:e.ID,value:e.ID},e.title)});return y.default.createElement(b.default,{defaultValue:t,disabled:a.selectStatus,style:{width:"auto"},onChange:function(t){return e.handleSelectLineValue(t,a.ID,"line_id")}},l)}},{title:"项目组名称(中文)",dataIndex:"group_title",key:"group_title",width:"120px",render:function(t,a){var l=y.default.createElement(k,{value:"disabled",disabled:!0},"Disabled");return f.length>0&&(l=f.map(function(e){return y.default.createElement(k,{key:e.ID,value:e.ID+","+e.title},e.title)})),y.default.createElement(b.default,{value:a.group_title,disabled:a.selectStatus,style:{width:"auto"},onChange:function(t){e.handleGroupValue(t,a.ID,"group_id")}},l)}},{title:"业务说明",dataIndex:"pro_remarks",key:"pro_remarks",width:"200px",render:function(t,a){return e.renderColumns(t,a,"pro_remarks")}},{title:"仓库路径",dataIndex:"pro_code_url",key:"pro_code_url",width:"150px",render:function(t,a){return e.renderColumns(t,a,"pro_code_url")}},{title:"排序",dataIndex:"pro_order",key:"pro_order",width:"100px",render:function(t,a){return e.renderColumns(t,a,"pro_order")}},{title:"状态",dataIndex:"pro_enable",key:"pro_enable",width:"150px",render:function(t,a){var l=a.pro_enable;return y.default.createElement("div",null,y.default.createElement(i.default,{checkedChildren:"开启",unCheckedChildren:"下线",checked:l,onChange:function(t){e.handleChange(t,a.ID,"pro_enable")},disabled:a.selectStatus}))}},{title:"操作",dataIndex:"ID",key:"ID",width:"200px",render:function(t,a){var l=a.editable,n=a.deleteable;return y.default.createElement("div",{className:"editable-row-operations"},!n&&(l?y.default.createElement("span",null,y.default.createElement("a",{onClick:function(){return e.save(a.ID)}},"保存"),y.default.createElement(u.default,{type:"vertical"}),y.default.createElement(o.default,{title:"确定取消?",onConfirm:function(){return e.cancel(a.ID)}},y.default.createElement("a",null,"取消"))):y.default.createElement("span",null,y.default.createElement("a",{onClick:function(){return e.edit(a.ID)}},"编辑"))),!l&&(n?y.default.createElement("span",null,y.default.createElement(o.default,{title:"确定删除?",onConfirm:function(){return e.confirmdelete(a.ID)}},y.default.createElement("a",null,"提交")),y.default.createElement(u.default,{type:"vertical"}),y.default.createElement("a",{onClick:function(){return e.canceldelete(a.ID)}},"取消")):y.default.createElement("span",{style:{marginLeft:10}},y.default.createElement("a",{onClick:function(){return e.askdelete(a.ID)}},"删除"))))}}],g=(0,s.default)({showSizeChanger:!0,showQuickJumper:!0},c.pagination),v={selectedRowKeys:a,onChange:this.handleRowSelectChange,getCheckboxProps:function(e){return{disabled:e.disabled}}};return this.cacheData=this.state.data.map(function(e){return(0,s.default)({},e)}),y.default.createElement("div",{className:E.default.standardTable},y.default.createElement("div",{className:E.default.tableAlert},y.default.createElement(d.default,{message:y.default.createElement("div",null,"已选择 ",y.default.createElement("a",{style:{fontWeight:600}},a.length)," 个项目 ",y.default.createElement("a",{onClick:this.cleanSelectedKeys,style:{marginLeft:24}},"取消勾选")),type:"info",showIcon:!0})),y.default.createElement(r.default,{loading:p,rowKey:function(e){return e.ID},rowSelection:v,dataSource:l,columns:m,pagination:g,onChange:this.handleTableChange}))}}]),t}(y.PureComponent),C=S;t.default=C}}]);