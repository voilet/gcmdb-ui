(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[40],{"70nd":function(e,t,a){e.exports={tableList:"antd-pro-pages-g-project-progroup-projectgroup-tableList",tableListOperator:"antd-pro-pages-g-project-progroup-projectgroup-tableListOperator",tableListForm:"antd-pro-pages-g-project-progroup-projectgroup-tableListForm",submitButtons:"antd-pro-pages-g-project-progroup-projectgroup-submitButtons"}},Dk8d:function(e,t,a){"use strict";var l=a("GyWo"),r=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("z4Cl");var s=r(a("L9Tq"));a("fr3b");var d=r(a("Bziu"));a("jYJC");var i=r(a("47AH"));a("9E1Q");var n=r(a("VtQk")),o=r(a("OjS7"));a("oeOs");var u=r(a("AXz3"));a("B5iR");var c=r(a("c0J2")),p=l(a("ZS5U")),h=(r(a("I9Uw")),r(a("ugpy"))),f=c.default.Option,m=e=>{var t=e.editable,a=e.value,l=e.onChange;return p.default.createElement("div",null,t?p.default.createElement(u.default,{style:{margin:"-5px 0"},value:a,onChange:e=>l(e.target.value)}):a)};class g extends p.PureComponent{constructor(){super(...arguments),this.state={selectedRowKeys:[],totalCallNo:0,data:[]},this.handleRowSelectChange=((e,t)=>{var a=t.reduce((e,t)=>{return e+parseFloat(t.callNo,10)},0);this.props.onSelectRow&&this.props.onSelectRow(t),this.setState({selectedRowKeys:e,totalCallNo:a})}),this.handleTableChange=((e,t,a)=>{this.props.onChange(e,t,a)}),this.cleanSelectedKeys=(()=>{this.handleRowSelectChange([],[])})}componentWillReceiveProps(e){0===e.selectedRows.length&&this.setState({selectedRowKeys:[],totalCallNo:0}),this.setState({data:e.progroupdata.data.map(e=>{return void 0==e.selectStatus&&(e.selectStatus=!0),e})})}renderColumns(e,t,a){return p.default.createElement(m,{editable:t.editable,value:e,onChange:e=>this.handleChange(e,t.ID,a)})}edit(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.editable=!0,this.setState({data:t.map(t=>{return e==t.ID&&(t.selectStatus=!1),t}),disabled:!1}))}save(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(delete a.editable,a.enable=this.state.status,this.setState({data:t.map(t=>{return e==t.ID&&(t.selectStatus=!0),t}),disabled:!0}),this.cacheData=t.map(e=>(0,o.default)({},e)),this.props.handleSaveData(a))}cancel(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.editable,this.setState({data:t.map(t=>{return e==t.ID&&(t.selectStatus=!0),t}),disabled:!0}))}askdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(a.deleteable=!0,this.setState({data:t}))}confirmdelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];if(a){var l=t.indexOf(a);l>-1&&t.splice(l,1),a.tag=!1,this.setState({data:t}),this.cacheData=t.map(e=>(0,o.default)({},e)),this.props.handleDeleteData(a)}}handleChange(e,t,a){var l=[...this.state.data],r=l.filter(e=>t===e.ID)[0];r&&(r[a]=e,this.setState({data:l,disabled:!1}))}handleSelectLineValue(e,t,a){var l=[...this.state.data],r=l.filter(e=>t===e.ID)[0];r&&(r[a]=e,this.setState({data:l,disabled:!1}),this.props.dispatch({type:"gproline/getProjectGroupbyId",payload:e}))}canceldelete(e){var t=[...this.state.data],a=t.filter(t=>e===t.ID)[0];a&&(Object.assign(a,this.cacheData.filter(t=>e===t.ID)[0]),delete a.deleteable,this.setState({data:t}))}render(){var e=this.state,t=e.selectedRowKeys,a=(e.totalCallNo,e.data),l=this.props,r=l.loading,u=l.prolinedata,m=[{title:"\u9879\u76ee\u7ec4\u522b\u540d(\u82f1\u6587)",dataIndex:"alias",key:"alias",width:"120px",render:(e,t)=>this.renderColumns(e,t,"alias")},{title:"\u9879\u76ee\u7ec4\u540d\u79f0(\u4e2d\u6587)",dataIndex:"title",key:"title",width:"200px",render:(e,t)=>this.renderColumns(e,t,"title")},{title:"\u4ea7\u54c1\u7ebf\u540d\u79f0(\u4e2d\u6587)",dataIndex:"line_title",key:"line_title",width:"120px",render:(e,t)=>{var a=u.data.map(e=>{return p.default.createElement(f,{key:e.ID,value:e.ID},e.title)});return p.default.createElement(c.default,{defaultValue:t.line.title,disabled:t.selectStatus,style:{width:"100%"},onChange:e=>this.handleSelectLineValue(e,t.ID,"line_id")},a)}},{title:"\u5360\u7528\u670d\u52a1\u5668\u6570\u91cf",dataIndex:"host_nums",key:"host_nums",width:"200px",render:(e,t)=>{t.created_at;var a={color:"#4B0082",textAlign:"center"};return p.default.createElement("div",{style:a},t.host_nums)}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"created_at",width:"8%",render:(e,t)=>{var a=t.created_at,l={color:"red"};return p.default.createElement("div",{style:l},a.substr(0,10))}},{title:"\u6700\u8fd1\u66f4\u65b0",dataIndex:"updated_at",width:"8%",render:(e,t)=>{var a=t.updated_at,l={color:"red"};return p.default.createElement("div",{style:l},a.substr(0,10))}},{title:"\u7b80\u8981\u8bf4\u660e",dataIndex:"remarks",key:"remarks",width:"200px",render:(e,t)=>this.renderColumns(e,t,"remarks")},{title:"\u64cd\u4f5c",dataIndex:"ID",key:"ID",width:"200px",render:(e,t)=>{var a=t.editable,l=t.deleteable;return p.default.createElement("div",{className:"editable-row-operations"},!l&&(a?p.default.createElement("span",null,p.default.createElement("a",{onClick:()=>this.save(t.ID)},"\u4fdd\u5b58"),p.default.createElement(n.default,{type:"vertical"}),p.default.createElement(i.default,{title:"\u786e\u5b9a\u53d6\u6d88?",onConfirm:()=>this.cancel(t.ID)},p.default.createElement("a",null,"\u53d6\u6d88"))):p.default.createElement("span",null,p.default.createElement("a",{onClick:()=>this.edit(t.ID)},"\u7f16\u8f91"))),!a&&(l?p.default.createElement("span",null,p.default.createElement(i.default,{title:"\u786e\u5b9a\u5220\u9664?",onConfirm:()=>this.confirmdelete(t.ID)},p.default.createElement("a",null,"\u63d0\u4ea4")),p.default.createElement(n.default,{type:"vertical"}),p.default.createElement("a",{onClick:()=>this.canceldelete(t.ID)},"\u53d6\u6d88")):p.default.createElement("span",{style:{marginLeft:10}},p.default.createElement("a",{onClick:()=>this.askdelete(t.ID)},"\u5220\u9664"))))}}],g={showSizeChanger:!0,showQuickJumper:!0},v={selectedRowKeys:t,onChange:this.handleRowSelectChange,getCheckboxProps:e=>({disabled:e.disabled})};return this.cacheData=this.state.data.map(e=>(0,o.default)({},e)),p.default.createElement("div",{className:h.default.standardTable},p.default.createElement("div",{className:h.default.tableAlert},p.default.createElement(d.default,{message:p.default.createElement("div",null,"\u5df2\u9009\u62e9 ",p.default.createElement("a",{style:{fontWeight:600}},t.length)," \u4e2a\u9879\u76ee\xa0",p.default.createElement("a",{onClick:this.cleanSelectedKeys,style:{marginLeft:24}},"\u53d6\u6d88\u52fe\u9009")),type:"info",showIcon:!0})),p.default.createElement(s.default,{loading:r,rowKey:e=>e.ID,rowSelection:v,dataSource:a,columns:m,pagination:g,onChange:this.handleTableChange}))}}var v=g;t.default=v},JrKA:function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5QNv");var s=l(a("XRPJ")),d=l(a("RSNA"));a("qhfc");var i=l(a("aEti"));a("aslW");var n=l(a("b+b+"));a("oeOs");var o=l(a("AXz3"));a("B5iR");var u=l(a("c0J2"));a("62OL");var c,p,h,f=l(a("lZ5B")),m=r(a("ZS5U")),g=a("rAnT"),v=(l(a("70nd")),f.default.Item),b=u.default.Option,y=o.default.TextArea,S=(n.default.Group,c=(0,g.connect)(e=>e),p=f.default.create(),c(h=p(h=class extends m.PureComponent{constructor(){super(...arguments),this.state={modalVisible:this.props.visible,showFormProline:!0,valueProline:2,selectedLineValue:"\u9009\u62e9\u4ea7\u54c1\u7ebf"},this.handleModalVisible=(e=>{this.setState({modalVisible:!!e})}),this.handleAdd=(()=>{var e=this.props.form;e.validateFields(e=>{});var t=null;t=this.state.selectedLineValue,console.log("lineid:",t);var a={title:e.getFieldValue("title")?e.getFieldValue("title"):"",alias:e.getFieldValue("alias")?e.getFieldValue("alias"):"",remarks:e.getFieldValue("remarks")?e.getFieldValue("remarks"):"",line:t};this.props.dispatch({type:"gproline/addProjectgroup",payload:{description:a}}),this.setState({modalVisible:!1}),e.resetFields()}),this.handleLineStatus=(e=>{1==e.target.value?this.setState({showFormProline:!1,valueProline:e.target.value}):this.setState({showFormProline:!0,valueProline:e.target.value})}),this.handleSelectLineValue=(e=>{this.setState({selectedLineValue:e})})}componentDidMount(){var e=this.props.dispatch;e({type:"gproline/getProjectLine"})}render(){var e=this.props.form.getFieldDecorator,t=this.props,a=(t.submitting,t.form,t.dispatch,t.gproline),l={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}};return m.default.createElement("div",{style:{float:"left"}},m.default.createElement(i.default,{type:"primary",icon:"plus",onClick:()=>this.handleModalVisible(!0)},"\u6dfb\u52a0\u9879\u76ee\u7ec4"),m.default.createElement(s.default,{title:"\u6dfb\u52a0\u4ea7\u54c1\u7ebf",visible:this.state.modalVisible,onOk:this.handleAdd,width:600,onCancel:()=>this.handleModalVisible()},m.default.createElement(v,(0,d.default)({},l,{label:"\u6240\u5c5e\u4ea7\u54c1\u7ebf"}),e("selectline")(m.default.createElement(u.default,{style:{width:120},showSearch:!0,placeholder:"\u9009\u62e9\u4ea7\u54c1\u7ebf",onChange:this.handleSelectLineValue,optionFilterProp:"children",filterOption:(e,t)=>t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},a.prolinedata.data.length>0&&a.prolinedata.data.map(e=>{return m.default.createElement(b,{key:e.ID,value:e.ID},e.title)})))),m.default.createElement(v,(0,d.default)({},l,{label:"\u9879\u76ee\u7ec4\u540d\u79f0"}),e("title",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9879\u76ee\u7ec4\u540d\u79f0"}]})(m.default.createElement(o.default,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u7ec4\u540d\u79f0"}))),m.default.createElement(v,(0,d.default)({},l,{label:"\u9879\u76ee\u7ec4\u522b\u540d"}),e("alias",{rules:[{}]})(m.default.createElement(o.default,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u7ec4\u522b\u540d\uff0c\u4f7f\u7528saltstack\u65f6\u9700\u4f7f\u7528\uff0c\u8bf7\u4f7f\u7528\u82f1\u6587"}))),m.default.createElement(v,(0,d.default)({},l,{label:"\u9879\u76ee\u7ec4\u7528\u9014\u63cf\u8ff0"}),e("remarks",{rules:[{required:!0,message:"\u8bf7\u7b80\u8981\u63cf\u8ff0\u9879\u76ee\u7ec4\u7528\u9014"}]})(m.default.createElement(y,{style:{minHeight:32},placeholder:"",rows:4}))),m.default.createElement(v,(0,d.default)({},l,{label:"\u6392\u5e8f"}),e("order",{rules:[{}]})(m.default.createElement(o.default,{placeholder:"-99\u6392\u5e8f\u4e3a\u6700\u9ad8\uff0c\u751f\u6210tree\u65f6\u4f7f\u7528"})))))}})||h)||h);t.default=S},YNqp:function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var s=l(a("ivY1"));a("9E1Q");var d=l(a("VtQk"));a("P7WH");var i=l(a("KVOY"));a("sXvm");var n=l(a("0WXq")),o=l(a("OjS7"));a("oeOs");var u=l(a("AXz3"));a("B5iR");var c,p,h=l(a("c0J2")),f=r(a("ZS5U")),m=a("rAnT"),g=l(a("Dk8d")),v=l(a("70nd")),b=l(a("JrKA")),y=(h.default.Option,e=>Object.keys(e).map(t=>e[t]).join(",")),S=(u.default.TextArea,c=(0,m.connect)(e=>e),c(p=class extends f.PureComponent{constructor(){super(...arguments),this.state={expandForm:!1,selectedRows:[],formValues:{}},this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,r=this.state.formValues,s=Object.keys(t).reduce((e,a)=>{var l=(0,o.default)({},e);return l[a]=y(t[a]),l},{}),d=(0,o.default)({currentPage:e.current,pageSize:e.pageSize},r,s);a.field&&(d.sorter=`${a.field}_${a.order}`),l({type:"gproline/getProjectGroup"})}),this.toggleForm=(()=>{this.setState({expandForm:!this.state.expandForm})}),this.handleMenuClick=(e=>{var t=this.props.dispatch,a=this.state.selectedRows;if(a)switch(e.key){case"remove":t({type:"gproline/getProjectGroup",payload:{no:a.map(e=>e.no).join(",")},callback:()=>{this.setState({selectedRows:[]})}});break;default:break}}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleSaveData=(e=>{var t=e.ID,a=e.title,l=e.alias,r=e.remarks,s=e.line_id,d={ID:t,title:a,alias:l,remarks:r,line_id:s};this.props.dispatch({type:"gproline/modifyProjectgroup",payload:d})}),this.handleDeleteData=(e=>{console.log(e);var t=e.ID,a={},l=[];l.push(t),a.ids=l,this.props.dispatch({type:"gproline/deleteProjectgroup",payload:{tag:!1,infolist:JSON.stringify(a)}})})}componentDidMount(){var e=this.props.dispatch;e({type:"gproline/getProjectGroup"}),e({type:"gproline/getProjectLine"})}render(){var e=this.state,t=e.selectedRows,a=(e.modalVisible,e.addInputValue,this.props),l=a.gproline,r=(a.loading,a.submitting,a.dispatch);return f.default.createElement(s.default,{bordered:!1},f.default.createElement("div",{className:v.default.tableList},f.default.createElement("div",{className:v.default.tableListOperator},f.default.createElement(i.default,{gutter:16},f.default.createElement(n.default,{span:2},f.default.createElement(b.default,null)),f.default.createElement(n.default,{span:2}))),f.default.createElement(d.default,null," \u9879\u76ee\u7ec4\u5217\u8868 "),f.default.createElement(g.default,{selectedRows:t,dispatch:r,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData,progroupdata:l.progroupdata,prolinedata:l.prolinedata,onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange})))}})||p);t.default=S},ugpy:function(e,t,a){e.exports={standardTable:"antd-pro-components-project-table-pro-group-index-standardTable",tableAlert:"antd-pro-components-project-table-pro-group-index-tableAlert"}}}]);