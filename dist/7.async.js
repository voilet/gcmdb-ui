(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"3hpP":function(e,t,r){"use strict";var a=r("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(r("OjS7")),u=a(r("BZ3U")),s=r("FEA4"),c={namespace:"gresource",state:{data:[],parentdata:[],link:[]},effects:{getResourcelist:u.default.mark(function e(t,r){var a,n,c;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,a=r.call,n=r.put,e.next=4,a(s.queryResourcelist);case 4:return c=e.sent,e.next=7,n({type:"saveResource",payload:c});case 7:case"end":return e.stop()}},e,this)}),modifyResourcelist:u.default.mark(function e(t,r){var a,n,c,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,c=r.put,e.next=4,n(s.modifyResourcelist,a);case 4:return o=e.sent,e.next=7,c({type:"saveResponse",payload:o,cb:a.cb});case 7:return e.next=9,c({type:"reloadResource"});case 9:case"end":return e.stop()}},e,this)}),modifyResourceSeq:u.default.mark(function e(t,r){var a,n,c,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,c=r.put,e.next=4,n(s.modifyResourceSeq,a.description);case 4:return o=e.sent,e.next=7,c({type:"saveResponse",payload:o,cb:a.cb});case 7:return e.next=9,c({type:"reloadResource"});case 9:case"end":return e.stop()}},e,this)}),addResourcelist:u.default.mark(function e(t,r){var a,n,c,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,c=r.put,e.next=4,n(s.addResourcelist,a.description);case 4:return o=e.sent,e.next=7,c({type:"saveResponse",payload:o,cb:a.cb});case 7:return e.next=9,c({type:"reloadResource"});case 9:case"end":return e.stop()}},e,this)}),deleteResourcelist:u.default.mark(function e(t,r){var a,n,c,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,c=r.put,e.next=4,n(s.deleteResourcelist,a);case 4:return o=e.sent,e.next=7,c({type:"saveResponse",payload:o,cb:a.cb});case 7:return e.next=9,c({type:"reloadResource"});case 9:case"end":return e.stop()}},e,this)}),getResourceTreeForparent:u.default.mark(function e(t,r){var a,n,c,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,c=r.put,e.next=4,n(s.getResourceTreeForparent,a);case 4:return o=e.sent,e.next=7,c({type:"saveParentResource",payload:o,cb:a.cb});case 7:case"end":return e.stop()}},e,this)}),getURLforLink:u.default.mark(function e(t,r){var a,n,c,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,c=r.put,e.next=4,n(s.queryURLforLink,a);case 4:return o=e.sent,e.next=7,c({type:"saveURLforLink",payload:o,cb:a.cb});case 7:case"end":return e.stop()}},e,this)}),reloadResource:u.default.mark(function e(t,r){var a;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=r.put,r.select,e.next=3,a({type:"getResourcelist"});case 3:case"end":return e.stop()}},e,this)})},reducers:{save(e,t){return(0,n.default)({},e,{list:t.payload})},saveResponse(e,t){return t.cb&&t.cb(t.payload),(0,n.default)({},e,{response:t.payload})},saveParentResource(e,t){return t.cb&&t.cb(t.payload),(0,n.default)({},e,{parentdata:t.payload})},saveResource(e,t){return(0,n.default)({},e,t.payload)},saveURLforLink(e,t){return t.cb&&t.cb(t.payload),(0,n.default)({},e,{link:t.payload})},changeNotifyCount(e,t){return(0,n.default)({},e,{currentUser:(0,n.default)({},e.currentUser,{notifyCount:t.payload})})}}};t.default=c},FEA4:function(e,t,r){"use strict";var a=r("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.queryResourcelist=o,t.addResourcelist=d,t.modifyResourcelist=i,t.modifyResourceSeq=h,t.deleteResourcelist=w,t.queryURLforLink=v,t.getResourceTreeForparent=b;var n=a(r("OjS7")),u=a(r("BZ3U")),s=a(r("2gP4")),c=(r("Dk/q"),a(r("t3Un")));function o(){return l.apply(this,arguments)}function l(){return l=(0,s.default)(u.default.mark(function e(){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/manage/auth/resource/allinfo"));case 1:case"end":return e.stop()}},e,this)})),l.apply(this,arguments)}function d(e){return p.apply(this,arguments)}function p(){return p=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/manage/auth/resource/add",{method:"POST",body:(0,n.default)({},t,{method:"post"})}));case 1:case"end":return e.stop()}},e,this)})),p.apply(this,arguments)}function i(e){return f.apply(this,arguments)}function f(){return f=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/manage/auth/resource/modify",{method:"POST",body:(0,n.default)({},t,{method:"post"})}));case 1:case"end":return e.stop()}},e,this)})),f.apply(this,arguments)}function h(e){return y.apply(this,arguments)}function y(){return y=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/manage/auth/resource/modifyseq",{method:"POST",body:(0,n.default)({},t,{method:"post"})}));case 1:case"end":return e.stop()}},e,this)})),y.apply(this,arguments)}function w(e){return m.apply(this,arguments)}function m(){return m=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/manage/auth/resource/delete",{method:"POST",body:(0,n.default)({},t,{method:"post"})}));case 1:case"end":return e.stop()}},e,this)})),m.apply(this,arguments)}function v(e){return R.apply(this,arguments)}function R(){return R=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/manage/auth/resource/queryurl",{method:"POST",body:(0,n.default)({},t,{method:"post"})}));case 1:case"end":return e.stop()}},e,this)})),R.apply(this,arguments)}function b(e){return x.apply(this,arguments)}function x(){return x=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/manage/auth/resource/parentinfo",{method:"POST",body:(0,n.default)({},t,{method:"post"})}));case 1:case"end":return e.stop()}},e,this)})),x.apply(this,arguments)}}}]);