(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"3F5S":function(e,a,r){"use strict";var t=r("4Gf+");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=t(r("OjS7")),o=t(r("BZ3U"));r("Vvjs");var d=t(r("66S2")),u=r("/m4F"),p={namespace:"ghardware",state:{cpuInfo:{data:{list:[],category:[]},pagination:{}},memInfo:{data:{list:[],category:[]},pagination:{}},diskInfo:{data:{list:[],category:[]},pagination:{}},powerInfo:{data:{list:[],category:[]},pagination:{}},adaptorInfo:{data:{list:[],category:[]},pagination:{}},composedata:{data:{},pagination:{}},loading:!1},effects:{queryHardwareComponentCpu:o.default.mark(function e(a,r){var t,n,p,s;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,p=r.put,e.next=4,n(u.queryHardwareComponents,t);case 4:if(s=e.sent,200!=s.status){e.next=10;break}return e.next=8,p({type:"HardwareComponentCpuSave",payload:s});case 8:e.next=11;break;case 10:d.default.error(s.data);case 11:case"end":return e.stop()}},e,this)}),queryHardwareComponentMem:o.default.mark(function e(a,r){var t,n,p,s;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,p=r.put,e.next=4,n(u.queryHardwareComponents,t);case 4:if(s=e.sent,200!=s.status){e.next=10;break}return e.next=8,p({type:"HardwareComponentMemSave",payload:s});case 8:e.next=11;break;case 10:d.default.error(s.data);case 11:case"end":return e.stop()}},e,this)}),queryHardwareComponentDisk:o.default.mark(function e(a,r){var t,n,p,s;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,p=r.put,e.next=4,n(u.queryHardwareComponents,t);case 4:if(s=e.sent,200!=s.status){e.next=10;break}return e.next=8,p({type:"HardwareComponentDiskSave",payload:s});case 8:e.next=11;break;case 10:d.default.error(s.data);case 11:case"end":return e.stop()}},e,this)}),queryHardwareComponentPower:o.default.mark(function e(a,r){var t,n,p,s;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,p=r.put,e.next=4,n(u.queryHardwareComponents,t);case 4:if(s=e.sent,200!=s.status){e.next=10;break}return e.next=8,p({type:"HardwareComponentPowerSave",payload:s});case 8:e.next=11;break;case 10:d.default.error(s.data);case 11:case"end":return e.stop()}},e,this)}),queryHardwareComponentAdaptor:o.default.mark(function e(a,r){var t,n,p,s;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,p=r.put,e.next=4,n(u.queryHardwareComponents,t);case 4:if(s=e.sent,200!=s.status){e.next=10;break}return e.next=8,p({type:"HardwareComponentAdaptorSave",payload:s});case 8:e.next=11;break;case 10:d.default.error(s.data);case 11:case"end":return e.stop()}},e,this)}),addHardwareComponents:o.default.mark(function e(a,r){var t,n,d;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,d=r.put,e.next=4,n(u.addHardwareComponents,t.description);case 4:return e.next=6,d({type:"reloadHardwareComponents",payload:t.description.componentname});case 6:case"end":return e.stop()}},e,this)}),modifyHardwareComponents:o.default.mark(function e(a,r){var t,n,d;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,d=r.put,e.next=4,n(u.modifyHardwareComponents,t);case 4:return e.next=6,d({type:"queryHardwarePlan",payload:t.description.componentname});case 6:case"end":return e.stop()}},e,this)}),deleteHardwareComponents:o.default.mark(function e(a,r){var t,n,d,p;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,d=r.put,p=JSON.parse(t.infolist).componentname,e.next=5,n(u.deleteHardwareComponents,t);case 5:return e.next=7,d({type:"reloadHardwareComponents",payload:p});case 7:case"end":return e.stop()}},e,this)}),modifyComponents:o.default.mark(function e(a,r){var t,n,d;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,d=r.put,e.next=4,n(u.modifyComponents,t);case 4:return e.next=6,d({type:"reloadHardwareComponents",payload:t.componentname});case 6:case"end":return e.stop()}},e,this)}),reloadHardwareComponents:o.default.mark(function e(a,r){var t,n;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=a.payload,n=r.put,e.t0=t,e.next="cpu"===e.t0?5:"mem"===e.t0?8:"disk"===e.t0?11:"power"===e.t0?14:"adaptor"===e.t0?17:20;break;case 5:return e.next=7,n({type:"queryHardwareComponentCpu",payload:t});case 7:return e.abrupt("break",20);case 8:return e.next=10,n({type:"queryHardwareComponentMem",payload:t});case 10:return e.abrupt("break",20);case 11:return e.next=13,n({type:"queryHardwareComponentDisk",payload:t});case 13:return e.abrupt("break",20);case 14:return e.next=16,n({type:"queryHardwareComponentPower",payload:t});case 16:return e.abrupt("break",20);case 17:return e.next=19,n({type:"queryHardwareComponentAdaptor",payload:t});case 19:return e.abrupt("break",20);case 20:case"end":return e.stop()}},e,this)}),queryHardwarePlan:o.default.mark(function e(a,r){var t,n,p,s;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,p=r.put,e.next=4,n(u.queryHardwarePlan,t);case 4:if(s=e.sent,200!=s.status){e.next=10;break}return e.next=8,p({type:"HardwarePlanSave",payload:s});case 8:e.next=11;break;case 10:d.default.error(s.data);case 11:case"end":return e.stop()}},e,this)}),addHardwarePlan:o.default.mark(function e(a,r){var t,n,d;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,d=r.put,e.next=4,n(u.addHardwarePlan,t);case 4:return e.next=6,d({type:"reloadhardwarePlan"});case 6:case"end":return e.stop()}},e,this)}),modifyHardwarePlan:o.default.mark(function e(a,r){var t,n,d;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,d=r.put,e.next=4,n(u.modifyHardwarePlan,t);case 4:return e.next=6,d({type:"reloadhardwarePlan"});case 6:case"end":return e.stop()}},e,this)}),deleteHardwarePlan:o.default.mark(function e(a,r){var t,n,d;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.call,d=r.put,e.next=4,n(u.deleteHardwarePlan,t);case 4:return e.next=6,d({type:"reloadhardwarePlan"});case 6:case"end":return e.stop()}},e,this)}),reloadhardwarePlan:o.default.mark(function e(a,r){var t,n;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,n=r.put,e.next=4,n({type:"queryHardwarePlan",payload:t});case 4:case"end":return e.stop()}},e,this)})},reducers:{HardwareComponentCpuSave(e,a){return(0,n.default)({},e,{cpuInfo:a.payload})},HardwareComponentMemSave(e,a){return(0,n.default)({},e,{memInfo:a.payload})},HardwareComponentDiskSave(e,a){return(0,n.default)({},e,{diskInfo:a.payload})},HardwareComponentPowerSave(e,a){return(0,n.default)({},e,{powerInfo:a.payload})},HardwareComponentAdaptorSave(e,a){return(0,n.default)({},e,{adaptorInfo:a.payload})},HardwarePlanSave(e,a){return(0,n.default)({},e,{composedata:a.payload})}}};a.default=p}}]);