webpackJsonp([4],{13:function(t,e,n){function o(t){n(51),n(50)}var a=n(5)(n(21),n(57),o,null,null);t.exports=a.exports},19:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(16),a=n(17),s=n.n(a),i=n(15),r=n(14),u=n(0),c=n(12),l=n.n(c),d=n(13),p=n.n(d),h=function(t){return n.e(2).then(function(){var e=[n(55)];t.apply(null,e)}.bind(this)).catch(n.oe)},f=function(t){return n.e(1).then(function(){var e=[n(56)];t.apply(null,e)}.bind(this)).catch(n.oe)},v=function(t){return n.e(0).then(function(){var e=[n(54)];t.apply(null,e)}.bind(this)).catch(n.oe)};o.a.use(s.a),o.a.use(i.a),o.a.use(r.a),o.a.use(u.a),o.a.config.productionTip=!1,l.a.setOptions({gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!0,smartLists:!0,smartypants:!1}),o.a.directive("markdown",{bind:function(t,e,n){t.innerHTML=l()(e.value)},update:function(t,e,n){t.innerHTML=l()(e.value)}});var m=new i.a({routes:[{path:"/",name:"home",component:h},{path:"/post/:hash",name:"post",component:f},{path:"/create",name:"create",component:v}]}),g=new u.a.Store({state:{node:"uspeak.io",message:"a nice person",snaker:{x:"left",y:"top",timeout:3e3,show:!1,msg:""}},getters:{x:function(t){return t.snaker.x},y:function(t){return t.snaker.y},timeout:function(t){return t.snaker.timeout},show:function(t){return t.snaker.show},msg:function(t){return t.snaker.msg},node:function(t){return t.node}},mutations:{setX:function(t,e){t.snaker.x=e},setY:function(t,e){t.snaker.y=e},setTimeout:function(t,e){t.snaker.timeout=e},setShow:function(t,e){t.snaker.show=e},inform:function(t,e){var n=t.snaker;n.msg=e,n.show=!0},setNode:function(t,e){t.node=e}},actions:{notify:function(t,e){var n=t.commit;e.x&&n("setX",e.x),e.y&&n("setY",e.y),e.timeout&&n("setTimeout",e.timeout),e.msg&&n("inform",e.msg)}}});o.a.prototype.$bus=new o.a({}),new o.a({router:m,store:g,template:"<PageUspeak/>",components:{PageUspeak:p.a}}).$mount("#app")},20:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"page-header",methods:{search:function(t){this.$bus.$emit("search",t)},changeNode:function(t){var e=this;this.$store.commit("setNode",t),this.$http.get("https://"+this.$store.getters.node+"/api/v1/status").then(function(t){var n=t.headers.map["x-server-message"];e.$store.state.message=void 0!==n?n[0]:"a nice person"}),this.$bus.$emit("refresh")},goHome:function(){"/"===this.$route.path?this.$bus.$emit("refresh"):this.$router.push({path:"/"})}}}},21:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(18),a=n.n(o),s=n(53),i=n.n(s),r=n(0);e.default={name:"page-uspeak",data:function(){return{dialog:!1,error:{title:"",text:""}}},components:{PageHeader:i.a},created:function(){var t=this;this.$bus.$on("error",function(e){!1===e?t.dialog=!1:"CVF"===e&&(t.error={title:"Chain validation failed",text:"Looks like the node you tried to connect to has been modified! You should switch node"},t.dialog=!0)})},computed:a()({},n.i(r.c)(["x","y","show","msg","timeout"])),methods:a()({},n.i(r.d)(["setShow"]),{snakerChange:function(t){t!==this.show&&this.setShow(t)}})}},50:function(t,e){},51:function(t,e){},52:function(t,e){},53:function(t,e,n){function o(t){n(52)}var a=n(5)(n(20),n(58),o,null,null);t.exports=a.exports},57:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:"",id:"e3",toolbar:""}},[n("div",{attrs:{id:"app"}},[n("page-header"),t._v(" "),n("main",[n("v-container",[n("v-dialog",{attrs:{persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v(t._s(t.error.title))]),t._v(" "),n("v-card-text",[t._v(t._s(t.error.text))]),t._v(" "),n("v-card-actions",[n("v-spacer")],1)],1)],1),t._v(" "),n("transition",{attrs:{appear:""}},[n("router-view")],1)],1)],1),t._v(" "),n("v-btn",{attrs:{id:"btn-add",color:"pink",fab:"",bottom:"",right:"",fixed:"",light:"",to:"/create"}},[n("v-icon",[t._v("add")])],1),t._v(" "),n("v-snackbar",{attrs:{timeout:t.timeout,top:"top"===t.y,bottom:"bottom"===t.y,right:"right"===t.x,left:"left"===t.x},on:{input:t.snakerChange},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[t._v("\n    "+t._s(t.msg)+"\n    "),n("v-btn",{staticClass:"pink--text",attrs:{icon:"icon",flat:""},nativeOn:{click:function(e){t.setShow(!1)}}},[n("v-icon",[t._v("close")])],1)],1)],1),t._v(" "),n("v-footer",{attrs:{app:"",fixed:""}},[n("div",[t._v("Brought to you by: "+t._s(t.$store.state.message))]),t._v(" "),n("v-spacer"),t._v(" "),n("div",[t._v("Connected to: "+t._s(t.$store.getters.node))])],1)],1)},staticRenderFns:[]}},58:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-toolbar",{attrs:{fixed:""}},[n("v-toolbar-title",[n("v-btn",{attrs:{flat:"",icon:""},on:{click:t.goHome}},[n("v-icon",[t._v("home")])],1),t._v("\n    uspeak\n  ")],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-text-field",{attrs:{label:"Node","single-line":"","hide-details":""},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.changeNode(e.target.value)}}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-text-field",{attrs:{label:"Search...","single-line":"","append-icon":"search","hide-details":""},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.search(e.target.value)}}})],1)},staticRenderFns:[]}},60:function(t,e){}},[19]);
//# sourceMappingURL=app.afa4894bdd16e65dd36d.js.map