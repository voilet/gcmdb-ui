(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"6bXN":function(e,t,n){"use strict";var a=n("0ZgE");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("U2oY")),u=a(n("0pfo")),c=n("KE/+"),i={namespace:"geographic",state:{province:[],city:[],isLoading:!1},effects:{fetchProvince:u.default.mark(function e(t,n){var a,r,i;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.call,r=n.put,e.next=3,r({type:"changeLoading",payload:!0});case 3:return e.next=5,a(c.queryProvince);case 5:return i=e.sent,e.next=8,r({type:"setProvince",payload:i});case 8:return e.next=10,r({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)}),fetchCity:u.default.mark(function e(t,n){var a,r,i,o;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,r=n.call,i=n.put,e.next=4,i({type:"changeLoading",payload:!0});case 4:return e.next=6,r(c.queryCity,a);case 6:return o=e.sent,e.next=9,i({type:"setCity",payload:o});case 9:return e.next=11,i({type:"changeLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)})},reducers:{setProvince:function(e,t){return(0,r.default)({},e,{province:t.payload})},setCity:function(e,t){return(0,r.default)({},e,{city:t.payload})},changeLoading:function(e,t){return(0,r.default)({},e,{isLoading:t.payload})}}};t.default=i},"KE/+":function(e,t,n){"use strict";function a(){return r.apply(this,arguments)}function r(){return r=(0,p.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.default)("/api/geographic/province"));case 1:case"end":return e.stop()}},e,this)})),r.apply(this,arguments)}function u(e){return c.apply(this,arguments)}function c(){return c=(0,p.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.default)("/api/geographic/city/".concat(t)));case 1:case"end":return e.stop()}},e,this)})),c.apply(this,arguments)}var i=n("0ZgE");Object.defineProperty(t,"__esModule",{value:!0}),t.queryProvince=a,t.queryCity=u;var o=i(n("0pfo")),p=i(n("PU+s")),s=i(n("t3Un"))}}]);