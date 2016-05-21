//atd.js
'use strict';
var atd={};
console.log('--== ATD JS Kits v 0.1 ==--');
atd.version=0.1;
atd.doc=document;
atd.style=document.body.style;
atd.css_prefix = function() {
  var styles = window.getComputedStyle(document.documentElement, '');
  var core = (
    Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms|)-/) || (styles.OLink === '' && ['', 'o'])
  )[1];
  return '-' + core + '-';
}();