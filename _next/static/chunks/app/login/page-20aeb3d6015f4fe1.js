(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{8878:function(e,n,i){Promise.resolve().then(i.bind(i,7997))},5869:function(e,n,i){"use strict";function a(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}i.d(n,{Y:function(){return o},B:function(){return u}});var l=i(8398),t=i(9109);let d={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"signup"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"email"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"username"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"signup"},arguments:[{kind:"Argument",name:{kind:"Name",value:"email"},value:{kind:"Variable",name:{kind:"Name",value:"email"}}},{kind:"Argument",name:{kind:"Name",value:"password"},value:{kind:"Variable",name:{kind:"Name",value:"password"}}},{kind:"Argument",name:{kind:"Name",value:"username"},value:{kind:"Variable",name:{kind:"Name",value:"username"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"token"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"username"}}]}}]}}]}}]},m={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"login"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"email"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"login"},arguments:[{kind:"Argument",name:{kind:"Name",value:"email"},value:{kind:"Variable",name:{kind:"Name",value:"email"}}},{kind:"Argument",name:{kind:"Name",value:"password"},value:{kind:"Variable",name:{kind:"Name",value:"password"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"token"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"username"}}]}}]}}]}}]};function r(){let e=a(["\nmutation signup(\n  $email: String!, \n  $password: String!, \n  $username: String!\n) {\n  signup(email: $email, password: $password, username: $username) {\n    token\n    user {\n      id\n      email\n      username\n    }\n  }\n}\n"]);return r=function(){return e},e}function s(){let e=a(["\nmutation login($email:String!, $password: String! ){\n  login(email: $email, password: $password) {\n    token\n    user {\n      id\n      email\n      username\n    }\n  }\n}\n"]);return s=function(){return e},e}(0,l.Ps)(r());let u=()=>(0,t.Db)(d);(0,l.Ps)(s());let o=()=>(0,t.Db)(m)},7997:function(e,n,i){"use strict";i.r(n);var a=i(7437),l=i(2265),t=i(5869);n.default=()=>{let[e,n]=(0,l.useState)(""),[i,d]=(0,l.useState)(""),[,m]=(0,t.Y)(),r=async n=>{var a,l;n.preventDefault(),console.log("Email: ".concat(e,", Password: ").concat(i));let t=await m({email:e,password:i});if(t.error){console.error(t.error);return}(null===(a=t.data)||void 0===a?void 0:a.login.token)&&(localStorage.setItem("token",null===(l=t.data)||void 0===l?void 0:l.login.token),alert("Login Success!"))};return(0,a.jsx)("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:(0,a.jsxs)("div",{className:"p-8 bg-white rounded shadow-md w-96",children:[(0,a.jsx)("h1",{className:"text-2xl font-semibold mb-4",children:"Login"}),(0,a.jsxs)("form",{onSubmit:r,children:[(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-600",children:"Email"}),(0,a.jsx)("input",{type:"email",className:"mt-1 p-2 w-full border rounded",value:e,onChange:e=>n(e.target.value)})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-600",children:"Password"}),(0,a.jsx)("input",{type:"password",className:"mt-1 p-2 w-full border rounded",value:i,onChange:e=>d(e.target.value)})]}),(0,a.jsx)("button",{type:"submit",className:"w-full bg-blue-500 text-white p-2 rounded",children:"Login"})]})]})})}}},function(e){e.O(0,[210,971,596,744],function(){return e(e.s=8878)}),_N_E=e.O()}]);