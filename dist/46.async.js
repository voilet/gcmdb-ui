(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{"1F+3":function(e,t,a){e.exports={"edit-option":"antd-pro-components-access-resource-edit-modal-edit-option","edit-option-text":"antd-pro-components-access-resource-edit-modal-edit-option-text","icon-divide":"antd-pro-components-access-resource-edit-modal-icon-divide","item-text":"antd-pro-components-access-resource-edit-modal-item-text","form-item-left":"antd-pro-components-access-resource-edit-modal-form-item-left","form-item-right":"antd-pro-components-access-resource-edit-modal-form-item-right","input-value":"antd-pro-components-access-resource-edit-modal-input-value"}},BZLa:function(e,t,a){"use strict";var l=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("z4Cl");var s=l(a("L9Tq"));a("9E1Q");var r=l(a("VtQk"));a("8hBZ");var i=l(a("JCpk"));a("qhfc");var d=l(a("aEti")),n=l(a("ZS5U")),o=(l(a("T9cD")),l(a("osMj"))),u=l(a("bghI")),c=l(a("Iq4F")),p=d.default.Group;class f extends n.default.Component{constructor(e){super(e),this.componentWillReceiveProps=(()=>{this.props.resourcedata}),this.getExpandKeys=(e=>{e.forEach(e=>{1===e.has_licence&&this.selectedRowKeys.push(e.ID),e.children&&(this.expandItem.push(e.ID),this.getExpandKeys(e.children))})}),this.initExpandItem=(()=>{var e=this.state,t=e.selectedRowKeys,a=e.expandItem;this.expandItem.forEach(e=>{a.push(e)}),this.selectedRowKeys.forEach(e=>{t.push(e)}),this.setState({expandItem:a,selectedRowKeys:t})}),this.submitAssign=(()=>{this.init()}),this.cancelAssign=(()=>{this.init()}),this.init=(()=>{var e=this.state.selectedRowKeys;this.params={},this.selectedRowKeys=[],this.expandItem=[],e.splice(0,e.length),this.setState({isExpandAll:!0,visible:!1,selectedRowKeys:e,expandItem:[]})}),this.expandSwitch=(e=>{var t=[];this.expandItem.forEach(e=>{t.push(e)}),this.setState({isExpandAll:e,expandItem:e?t:[]})}),this.expandAll=(()=>{var e=this.props.resourcedata;this.getExpandKeys(e),this.initExpandItem();var t=[];this.expandItem.forEach(e=>{t.push(e)}),this.setState({isExpandAll:!0,expandItem:t})}),this.lessenAll=(()=>{this.setState({isExpandAll:!1,expandItem:[]})}),this.expandRow=((e,t)=>{var a=this.state.expandItem;if(e)a.push(t.ID);else{var l=a.indexOf(t.ID);a.splice(l,1)}this.setState({expandItem:a,isExpandAll:a.length===this.expandItem.length})}),this.state={isExpandAll:!0,expandItem:[],selectedRowKeys:[],visible:!1},this.expandItem=[],this.selectedRowKeys=[],this.params={},this.columns=[{title:"\u8d44\u6e90\u540d\u79f0",dataIndex:"name",key:"name",width:"150px"},{title:"\u7c7b\u522b",dataIndex:"rtype",key:"rtype",width:"100px",render:(e,t)=>{var a;return a=0==e?n.default.createElement(i.default,{color:"#108ee9"},"\u533a\u57df"):1==e?n.default.createElement(i.default,{color:"#009900"},"\u83dc\u5355"):n.default.createElement(i.default,{color:"#944dff"},"\u6309\u94ae"),n.default.createElement("div",null,a)}},{title:"\u5730\u5740",dataIndex:"link_url",width:"100px",key:"link_url"},{title:"\u987a\u5e8f",dataIndex:"seq",key:"seq",width:"100px",render:(e,t)=>{var a=t.seq?n.default.createElement(c.default,{seq:t.seq,dispatch:this.props.dispatch,resId:t.ID,key:t.ID}):n.default.createElement("span",null);return a}},{title:"\u64cd\u4f5c",dataIndex:"operation",key:"operation",width:"200px",render:(e,t)=>{var a=this.props,l=a.dispatch,s=a.resourcedata,r=void 0===s?[]:s,i=n.default.createElement(u.default,{dispatch:l,record:t,resource:r,key:t.ID});return i}}]}render(){var e=this.props,t=e.resourcedata,a=(e.record,this.state),l=a.expandItem;a.isExpandAll,a.visible;return n.default.createElement(n.default.Fragment,null,n.default.createElement("div",{className:o.default["switch-btn-block"]},n.default.createElement(p,null,n.default.createElement(d.default,{type:"primary",onClick:this.expandAll},"\u5168\u90e8\u5c55\u5f00"),n.default.createElement(d.default,{onClick:this.lessenAll},"\u5168\u90e8\u6536\u7f29")),n.default.createElement(r.default,null)),n.default.createElement("div",{className:o.default["table-block"]},n.default.createElement(s.default,{pagination:!1,columns:this.columns,dataSource:t,expandedRowKeys:l,onExpand:this.expandRow,rowKey:e=>e.ID,scroll:{y:960}})))}}var m=f;t.default=m},Iq4F:function(e,t,a){"use strict";var l=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("CKBq");var s=l(a("nvQ8"));a("V1iB");var r=l(a("O2EK")),i=l(a("ZS5U")),d=l(a("LNNb")),n=(e,t)=>{r.default[e]({message:"\u901a \u77e5 \u680f",description:t})};class o extends i.default.Component{constructor(e){super(e),this.showPopEdit=(()=>{this.setState({editState:!0})}),this.seqChange=(e=>{this.setState({seqValue:e.target.value})}),this.submitSeq=(()=>{var e=this.props,t=e.dispatch,a=e.seq,l=e.resId,s={seq:this.state.seqValue||a,ID:l};t({type:"gresource/modifyResourceSeq",payload:{description:s,cb:e=>{"200"==e.status?n("success","\u4fee\u6539\u8d44\u6e90\u987a\u5e8f\u6210\u529f!~ ~"):n("error","\u4fee\u6539\u8d44\u6e90\u987a\u5e8f\u5931\u8d25!~ ~")}}}),this.setState({editState:!1})}),this.cancel=(()=>{this.setState({editState:!1,seqValue:this.props.seq})}),this.state={editState:!1,seqValue:this.props.seq}}render(){var e=this.state,t=e.editState,a=e.seqValue,l=this.props.seq;return i.default.createElement("div",null,!t&&i.default.createElement("span",{onClick:this.showPopEdit,className:d.default["seq-text"]},l),t&&i.default.createElement("div",{className:d.default["pop-edit"]},i.default.createElement("input",{value:a,onChange:this.seqChange,className:d.default["pop-edit-input"]}),i.default.createElement("button",{className:d.default["btn-ok"],onClick:this.submitSeq},i.default.createElement(s.default,{type:"check",theme:"outlined"})),i.default.createElement("button",{className:d.default["btn-cancel"],onClick:this.cancel},i.default.createElement(s.default,{type:"close",theme:"outlined"}))))}}var u=o;t.default=u},LNNb:function(e,t,a){e.exports={"seq-text":"antd-pro-components-access-resource-pop-edit-seq-text","pop-edit":"antd-pro-components-access-resource-pop-edit-pop-edit","btn-ok":"antd-pro-components-access-resource-pop-edit-btn-ok","btn-cancel":"antd-pro-components-access-resource-pop-edit-btn-cancel","pop-edit-input":"antd-pro-components-access-resource-pop-edit-pop-edit-input"}},NPSK:function(e,t,a){e.exports={tableList:"antd-pro-pages-g-power-resource-resource-list-tableList",tableListOperator:"antd-pro-pages-g-power-resource-resource-list-tableListOperator",tableListForm:"antd-pro-pages-g-power-resource-resource-list-tableListForm",submitButtons:"antd-pro-pages-g-power-resource-resource-list-submitButtons"}},bghI:function(e,t,a){"use strict";var l=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("qhfc");var s=l(a("aEti"));a("P7WH");var r=l(a("KVOY"));a("vGLs");var i=l(a("wm6W"));a("sXvm");var d=l(a("0WXq"));a("5QNv");var n=l(a("XRPJ"));a("oeOs");var o=l(a("AXz3"));a("B5iR");var u=l(a("c0J2"));a("62OL");var c=l(a("lZ5B")),p=l(a("ZS5U")),f=l(a("1F+3")),m=c.default.Item,h=u.default.Option,v=(o.default.Search,n.default.confirm),E="\u533a\u57df\u53ea\u80fd\u662f\u4e00\u7ea7\u8282\u70b9\uff0c\u4e0d\u80fd\u6709\u7236\u8282\u70b9",b=(e,t)=>{notification[e]({message:"\u901a \u77e5 \u680f",description:t})};class g extends p.default.Component{constructor(e){super(e),this.initTreeSelect=((e,t,a)=>{(t||[]).forEach(t=>{var l={title:t.name,value:t.ID,key:t.ID};t.ID!==e&&t.children_id!==e||(l.disabled=!0),t.children&&(l.children=[],this.initTreeSelect(e,t.children,l.children)),a.push(l)})}),this.showEditModal=(()=>{this.setState({visible:!0})}),this.submitEdit=(()=>{var e=this.props.form,t=e.validateFields,a=e.getFieldsValue,l=e.setFields,s=e.getFieldValue,r=e.resetFields,i=s("type"),d=s("fatherNode"),n=this.props.dispatch,o="";if(o="area"===i?"\u533a\u57df":"menu"===i?"\u83dc\u5355":"\u6309\u94ae","area"===i&&"no_parent"!==d)l({type:{value:o,errors:[new Error(E)]}});else{var u=a();t(Object.keys(u),(e,t)=>{e||(t.url||(t.url=""),t.icon||(t.icon=""),n({type:"gresource/modifyResourcelist",payload:{description:t,cb:e=>{"200"==e.status?b("success","\u4fee\u6539\u8d44\u6e90\u6210\u529f!~ ~"):b("error","\u4fee\u6539\u8d44\u6e90\u5931\u8d25!~ ~")}}}),r(),this.closeEdit())})}}),this.closeEdit=(()=>{var e=this.props.form.resetFields;this.setState({visible:!1},()=>{e()})}),this.initType=(e=>{var t="area";return e&&0===e?t="area":e&&1===e?t="menu":e&&2===e&&(t="button"),t}),this.deleteRes=(()=>{v({title:"\u8bf7\u786e\u8ba4",content:"\u60a8\u662f\u5426\u8981\u5220\u9664\u6240\u9009\u7684\u9879\u53ca\u5176\u5b50\u9879\uff1f",okText:"\u786e\u5b9a",okType:"danger",cancelText:"\u53d6\u6d88",onOk:()=>{this.props.dispatch;console.log("\u5220\u9664\u6210\u529f")}})}),this.onSearch=(e=>{var t=this.props.form,a=t.getFieldValue,l=t.setFieldsValue,s=a("url"),r=this.props.dispatch;r({type:"gresource/getURLforLink",payload:{UrlFor:s,cb:e=>{var t=e.data.link_url;console.log(t),l({afterUrl:t})}}})}),this.state={visible:!1,treeData:[],newurl:""}}componentDidMount(){var e=this.props,t=e.resource,a=e.record.ID,l=[],s={title:"--\u65e0--",value:"no_parent",key:"no_parent"};l.push(s),this.initTreeSelect(a,t,l),this.setState({treeData:l})}render(){var e=this.state,t=e.visible,a=e.treeData,l=this.props,v=l.form.getFieldDecorator,E=l.record,b=E.name,g=E.rtype,x=(E.link_url,E.seq),y=E.children_id;this.state.newurl;return p.default.createElement("div",null,p.default.createElement("div",{className:f.default["edit-option"]},p.default.createElement("span",{onClick:this.showEditModal,className:f.default["edit-option-text"]},"\u7f16\u8f91"),p.default.createElement("div",{className:f.default["icon-divide"]}),p.default.createElement("span",{onClick:this.deleteRes,className:f.default["edit-option-text"]},"\u5220\u9664")),p.default.createElement(n.default,{title:"\u7f16\u8f91\u8d44\u6e90",visible:t,onOk:this.submitEdit,onCancel:this.closeEdit,width:800},p.default.createElement("div",null,p.default.createElement(c.default,{onSubmit:this.submitEdit},p.default.createElement(r.default,null,p.default.createElement(d.default,{span:12},p.default.createElement(m,{label:"\u540d\u79f0",className:f.default["form-item-left"]},v("name",{rules:[{required:!0,message:"\u540d\u79f0\u5fc5\u586b"},{max:32,message:"\u6700\u591a\u53ef\u8f93\u516532\u4e2a\u5b57\u7b26"}],initialValue:b||""})(p.default.createElement(o.default,{placeholder:"\u957f\u5ea6\u4e0d\u8d85\u8fc732\u4e2a\u5b57\u6bb5"})))),p.default.createElement(d.default,{span:12},p.default.createElement(m,{label:"\u7236\u8282\u70b9",className:f.default["form-item-right"]},v("fatherNode",{initialValue:y&&0!==y?y:"no_parent"})(p.default.createElement(i.default,{treeDefaultExpandAll:!0,treeData:a}))))),p.default.createElement(r.default,null,p.default.createElement(d.default,{span:12},p.default.createElement(m,{label:"\u7c7b\u578b",className:f.default["form-item-left"]},v("type",{initialValue:this.initType(g)})(p.default.createElement(u.default,null,p.default.createElement(h,{value:"area"},"\u533a\u57df"),p.default.createElement(h,{value:"menu"},"\u83dc\u5355"),p.default.createElement(h,{value:"button"},"\u6309\u94ae"))))),p.default.createElement(d.default,{span:12},p.default.createElement(m,{label:"\u56fe\u6807",className:f.default["form-item-right"]},v("icon",{rules:[{max:32,message:"\u6700\u591a\u53ef\u8f93\u516532\u4e2a\u5b57\u7b26"}]})(p.default.createElement(o.default,{placeholder:"\u957f\u5ea6\u4e0d\u8d85\u8fc732\u4e2a\u5b57\u6bb5"}))))),p.default.createElement(r.default,null,p.default.createElement(d.default,{span:12},p.default.createElement(m,{label:"UrlFor",className:f.default["form-item-left"]},v("url",{})(p.default.createElement(o.default,null)))),p.default.createElement(d.default,{span:12},p.default.createElement(m,{label:"\u987a\u5e8f",className:f.default["form-item-right"]},v("sequence",{rules:[{required:!0,message:"\u987a\u5e8f\u5fc5\u586b"}],initialValue:x||0})(p.default.createElement(o.default,null))))),p.default.createElement(r.default,null,p.default.createElement(d.default,{span:12},p.default.createElement(m,{label:"\u7531UrlFor\u7684\u503c\u7ecf\u8fc7\u8def\u7531\u89c4\u5219\u5904\u7406\u540e\u7684\u5730\u5740",className:f.default["form-item-left"]},v("afterUrl",{initialValue:""})(p.default.createElement(o.default,{disabled:!0,className:f.default["input-value"]})),p.default.createElement(s.default,{onClick:this.onSearch,type:"primary"}," \u9a8c\u8bc1"))))))))}}var x=c.default.create({})(g);t.default=x},cjay:function(e,t,a){e.exports={"edit-option":"antd-pro-pages-g-power-resource-resource-add-edit-option","edit-option-text":"antd-pro-pages-g-power-resource-resource-add-edit-option-text","icon-divide":"antd-pro-pages-g-power-resource-resource-add-icon-divide","item-text":"antd-pro-pages-g-power-resource-resource-add-item-text","form-item-left":"antd-pro-pages-g-power-resource-resource-add-form-item-left","form-item-right":"antd-pro-pages-g-power-resource-resource-add-form-item-right"}},npf6:function(e,t,a){"use strict";var l=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5QNv");var s=l(a("XRPJ"));a("P7WH");var r=l(a("KVOY"));a("vGLs");var i=l(a("wm6W"));a("sXvm");var d=l(a("0WXq"));a("qhfc");var n=l(a("aEti"));a("V1iB");var o=l(a("O2EK"));a("oeOs");var u=l(a("AXz3"));a("B5iR");var c=l(a("c0J2"));a("62OL");var p=l(a("lZ5B")),f=l(a("ZS5U")),m=l(a("cjay")),h=p.default.Item,v=c.default.Option,E=(u.default.Search,"\u533a\u57df\u53ea\u80fd\u662f\u4e00\u7ea7\u8282\u70b9\uff0c\u4e0d\u80fd\u6709\u7236\u8282\u70b9"),b=(e,t)=>{o.default[e]({message:"\u901a \u77e5 \u680f",description:t})};class g extends f.default.Component{constructor(e){super(e),this.initTreeSelect=((e,t)=>{(e||[]).forEach(e=>{var a={title:e.name,value:e.ID,key:e.ID};e.children&&(a.children=[],this.initTreeSelect(e.children,a.children)),t.push(a)})}),this.showAddModal=(()=>{var e=this.state.treeData,t=[],a={title:"--\u65e0--",value:"no_parent",key:"no_parent"};t.push(a),this.initTreeSelect(e,t),this.setState({treeVar:t,visible:!0})}),this.submitEdit=(()=>{var e=this.props.form,t=e.validateFields,a=e.getFieldsValue,l=e.setFields,s=e.getFieldValue,r=e.resetFields,i=s("type"),d=s("fatherNode"),n="";if(n="area"===i?"\u533a\u57df":"menu"===i?"\u83dc\u5355":"\u6309\u94ae","area"!==i&&"no_parent"===d)l({type:{value:n,errors:[new Error(E)]}});else{var o=a();t(Object.keys(o),(e,t)=>{e||(t.url||(t.url=""),t.icon||(t.icon=""),this.props.dispatch({type:"gresource/addResourcelist",payload:{description:t,cb:e=>{"200"==e.status?b("success","\u6dfb\u52a0\u8d44\u6e90\u6210\u529f!~ ~"):b("error","\u6dfb\u52a0\u8d44\u6e90\u5931\u8d25!~ ~")}}}),r(),this.closeEdit())})}}),this.closeEdit=(()=>{var e=this.props.form.resetFields;this.setState({visible:!1},()=>{e()})}),this.initType=(e=>{var t="area";return e&&0===e?t="area":e&&1===e?t="menu":e&&2===e&&(t="button"),t}),this.onSearch=(e=>{var t=this.props.form,a=t.getFieldValue,l=t.setFieldsValue,s=a("url"),r=this.props.dispatch;r({type:"gresource/getURLforLink",payload:{UrlFor:s,cb:e=>{var t=e.data.link_url;l({afterUrl:t})}}})}),this.state={visible:!1,treeData:[],treeVar:[]}}static getDerivedStateFromProps(e,t){return e.resource===t.resource?{}:{treeData:e.resource}}render(){var e=this.state,t=e.visible,a=e.treeVar,l=this.props.form.getFieldDecorator;return f.default.createElement("div",null,f.default.createElement(n.default,{onClick:this.showAddModal,type:"primary",size:"large"}," \u6dfb \u52a0 \u8d44 \u6e90"),f.default.createElement(s.default,{title:"\u6dfb\u52a0\u8d44\u6e90",visible:t,onOk:this.submitEdit,onCancel:this.closeEdit,width:800},f.default.createElement("div",null,f.default.createElement(p.default,{onSubmit:this.submitEdit},f.default.createElement(r.default,null,f.default.createElement(d.default,{span:12},f.default.createElement(h,{label:"\u540d\u79f0",className:m.default["form-item-left"]},l("name",{rules:[{required:!0,message:"\u540d\u79f0\u5fc5\u586b"},{max:32,message:"\u6700\u591a\u53ef\u8f93\u516532\u4e2a\u5b57\u7b26"}],initialValue:name||""})(f.default.createElement(u.default,{placeholder:"\u957f\u5ea6\u4e0d\u8d85\u8fc732\u4e2a\u5b57\u6bb5"})))),f.default.createElement(d.default,{span:12},f.default.createElement(h,{label:"\u7236\u8282\u70b9",className:m.default["form-item-right"]},l("fatherNode",{initialValue:"no_parent"})(f.default.createElement(i.default,{treeDefaultExpandAll:!0,treeData:a}))))),f.default.createElement(r.default,null,f.default.createElement(d.default,{span:12},f.default.createElement(h,{label:"\u7c7b\u578b",className:m.default["form-item-left"]},l("type",{initialValue:""})(f.default.createElement(c.default,null,f.default.createElement(v,{value:"area"},"\u533a\u57df"),f.default.createElement(v,{value:"menu"},"\u83dc\u5355"),f.default.createElement(v,{value:"button"},"\u6309\u94ae"))))),f.default.createElement(d.default,{span:12},f.default.createElement(h,{label:"\u56fe\u6807",className:m.default["form-item-right"]},l("icon",{rules:[{max:32,message:"\u6700\u591a\u53ef\u8f93\u516532\u4e2a\u5b57\u7b26"}]})(f.default.createElement(u.default,{placeholder:"\u957f\u5ea6\u4e0d\u8d85\u8fc732\u4e2a\u5b57\u6bb5"}))))),f.default.createElement(r.default,null,f.default.createElement(d.default,{span:12},f.default.createElement(h,{label:"UrlFor",className:m.default["form-item-left"]},l("url",{})(f.default.createElement(u.default,null)))),f.default.createElement(d.default,{span:12},f.default.createElement(h,{label:"\u987a\u5e8f",className:m.default["form-item-right"]},l("sequence",{rules:[{required:!0,message:"\u987a\u5e8f\u5fc5\u586b"}],initialValue:0})(f.default.createElement(u.default,null))))),f.default.createElement(r.default,null,f.default.createElement(d.default,{span:12},f.default.createElement(h,{label:"\u7531UrlFor\u7684\u503c\u7ecf\u8fc7\u8def\u7531\u89c4\u5219\u5904\u7406\u540e\u7684\u5730\u5740",className:m.default["form-item-left"]},l("afterUrl",{initialValue:""})(f.default.createElement(u.default,{disabled:!0,className:m.default["input-value"]})),f.default.createElement(n.default,{onClick:this.onSearch,type:"primary"}," \u9a8c\u8bc1"))))))))}}var x=p.default.create({})(g);t.default=x},osMj:function(e,t,a){e.exports={activeChart:"antd-pro-components-access-resource-index-activeChart",activeChartGrid:"antd-pro-components-access-resource-index-activeChartGrid",activeChartLegend:"antd-pro-components-access-resource-index-activeChartLegend","seq-text":"antd-pro-components-access-resource-index-seq-text","switch-btn-block":"antd-pro-components-access-resource-index-switch-btn-block"}},ty3j:function(e,t,a){"use strict";var l=a("4Gf+"),s=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var r=l(a("ivY1"));a("9E1Q");var i=l(a("VtQk"));a("P7WH");var d=l(a("KVOY"));a("sXvm");var n,o,u=l(a("0WXq")),c=s(a("ZS5U")),p=a("rAnT"),f=l(a("BZLa")),m=l(a("npf6")),h=l(a("NPSK")),v=(n=(0,p.connect)(e=>e),n(o=class extends c.PureComponent{constructor(){super(...arguments),this.state={expandForm:!1,selectedRows:[],formValues:{},resourcedata:[],parentdata:[]},this.handleRefreshTableChange=(()=>{var e=this.props.dispatch;e({type:"gproline/getProjectLine",payload:""})}),this.toggleForm=(()=>{this.setState({expandForm:!this.state.expandForm})}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})})}componentDidMount(){var e=this.props.dispatch;e({type:"gresource/getResourcelist"}),e({type:"gresource/getResourceTreeForparent",payload:{cb:e=>{this.setState({parentdata:e.data})}}})}render(){var e=this.state,t=e.selectedRows,a=e.parentdata,l=this.props,s=l.gresource,n=l.dispatch;return console.log("this.props",this.props),c.default.createElement(r.default,{bordered:!1},c.default.createElement("div",{className:h.default.tableList},c.default.createElement("div",{className:h.default.tableListOperator},c.default.createElement(d.default,{gutter:16},c.default.createElement(u.default,{span:2},c.default.createElement(m.default,{dispatch:n,resource:a})))),c.default.createElement(i.default,null," \u8d44\u6e90\u5217\u8868 "),c.default.createElement(f.default,{selectedRows:t,dispatch:n,handleSaveData:this.handleSaveData,handleDeleteData:this.handleDeleteData,resourcedata:s.data,onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange})))}})||o);t.default=v}}]);