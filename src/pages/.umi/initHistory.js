// create history
// add by wangxk 20181122
// 修改路由根为#
window.routerBase = "#";
window.g_history = require('umi/_createHistory').default({
  basename: window.routerBase,
});
