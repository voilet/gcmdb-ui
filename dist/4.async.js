(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{ONMc:function(e,t,a){"use strict";var r=a("0ZgE");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("U2oY")),u=r(a("0pfo")),s=a("tZOl"),c={namespace:"gappmanage",state:{treedata:{data:[]},hostdata:{data:[]}},effects:{getHostdatabyId:u.default.mark(function e(t,a){var r,n,c,p;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(s.queryHostbyPid,r);case 4:return p=e.sent,e.next=7,c({type:"probyidSave",payload:p,cb:r.cb});case 7:case"end":return e.stop()}},e,this)}),getTree:u.default.mark(function e(t,a){var r,n,c,p;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(s.queryTree,r);case 4:if(p=e.sent,200!=p.status){e.next=8;break}return e.next=8,c({type:"saveTree",payload:p,callback:r.callback});case 8:case"end":return e.stop()}},e,this)}),getAllTree:u.default.mark(function e(t,a){var r,n,c,p;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(s.queryAllTree,r);case 4:if(p=e.sent,200!=p.status){e.next=8;break}return e.next=8,c({type:"probyidSave",payload:p,cb:r.cb});case 8:case"end":return e.stop()}},e,this)}),updateTree:u.default.mark(function e(t,a){var r,n,c;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,c=a.put,e.next=4,n(s.updateprojectTree,r);case 4:return e.next=6,c({type:"getTree"});case 6:case"end":return e.stop()}},e,this)})},reducers:{probyidSave:function(e,t){return null===t.payload.data&&(t.payload.data=[]),t.cb&&t.cb(t.payload.data),(0,n.default)({},e,{hostdata:t.payload})},saveTree:function(e,t){return null===t.payload.data&&(t.payload.data=[]),t.callback&&t.callback(t.payload.data),(0,n.default)({},e,{treedata:t.payload})}}};t.default=c},tZOl:function(e,t,a){"use strict";function r(){return n.apply(this,arguments)}function n(){return n=(0,y.default)(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,h.default)("/v1/assets/tree"));case 1:case"end":return e.stop()}},e,this)})),n.apply(this,arguments)}function u(e){return s.apply(this,arguments)}function s(){return s=(0,y.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,h.default)("/v1/assets/appmange/querytree/",{method:"POST",body:(0,f.default)({},t,{method:"post"})}));case 1:case"end":return e.stop()}},e,this)})),s.apply(this,arguments)}function c(){return p.apply(this,arguments)}function p(){return p=(0,y.default)(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,h.default)("/v1/assets/tree?active=update"));case 1:case"end":return e.stop()}},e,this)})),p.apply(this,arguments)}function d(){return l.apply(this,arguments)}function l(){return l=(0,y.default)(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,h.default)("/v1/assets/appmange/queryalltree"));case 1:case"end":return e.stop()}},e,this)})),l.apply(this,arguments)}var o=a("0ZgE");Object.defineProperty(t,"__esModule",{value:!0}),t.queryTree=r,t.queryHostbyPid=u,t.updateprojectTree=c,t.queryAllTree=d;var f=o(a("U2oY")),i=o(a("0pfo")),y=o(a("PU+s")),h=(a("Dk/q"),o(a("t3Un")))}}]);