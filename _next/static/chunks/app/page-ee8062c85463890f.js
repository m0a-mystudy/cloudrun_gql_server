(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{342:function(e,t,n){Promise.resolve().then(n.bind(n,5857))},5857:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var r=n(7437),o=n(2265);function s(){let[e,t]=(0,o.useState)([{id:"1",text:"Learn Next.js",done:!1},{id:"2",text:"Build an awesome app",done:!1}]),n=n=>{console.log("addTodo",n);let r={id:e.length?"".concat(parseInt(e[e.length-1].id)+1):"1",text:n,done:!1};t([...e,r])},s=n=>{t(e.map(e=>e.id===n?{...e,done:!e.done}:e))},l=n=>{t(e.filter(e=>e.id!==n))};return(0,r.jsxs)("main",{className:"flex flex-col items-center justify-center p-24 bg-gray-100",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold mb-8",children:"TODO List"}),(0,r.jsx)("ul",{className:"w-full max-w-md",children:e.map(e=>(0,r.jsxs)("li",{className:"flex items-center justify-between p-4 mb-2 bg-white rounded shadow",children:[(0,r.jsx)("span",{className:"text-lg ".concat(e.done?"line-through text-gray-400":""),children:e.text}),(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{className:"mx-2 text-white bg-blue-500 px-4 py-2 rounded",onClick:()=>s(e.id),children:"Toggle"}),(0,r.jsx)("button",{className:"mx-2 text-white bg-red-500 px-4 py-2 rounded",onClick:()=>l(e.id),children:"Delete"})]})]},e.id))}),(0,r.jsx)("button",{className:"mt-4 text-white bg-green-500 px-4 py-2 rounded",onClick:()=>{console.log("addtodo"),n("New Task")},children:"Add New Task"})]})}},622:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(2265),o=Symbol.for("react.element"),s=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function d(e,t,n){var r,d={},a=null,c=null;for(r in void 0!==n&&(a=""+n),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(c=t.ref),t)s.call(t,r)&&!i.hasOwnProperty(r)&&(d[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===d[r]&&(d[r]=t[r]);return{$$typeof:o,type:e,key:a,ref:c,props:d,_owner:l.current}}t.jsx=d,t.jsxs=d},7437:function(e,t,n){"use strict";e.exports=n(622)}},function(e){e.O(0,[971,596,744],function(){return e(e.s=342)}),_N_E=e.O()}]);