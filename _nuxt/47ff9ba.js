(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{365:function(e,t,r){var content=r(376);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(11).default)("3f382e11",content,!0,{sourceMap:!1})},366:function(e,t,r){var content=r(378);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(11).default)("863c9e9e",content,!0,{sourceMap:!1})},367:function(e,t,r){var content=r(380);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(11).default)("45b3ce31",content,!0,{sourceMap:!1})},368:function(e,t,r){"use strict";r.r(t);var n=r(2),o=r(91);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var l={name:"ScoringTab",props:{readOnly:{default:!1,type:Boolean},opaque:{default:!0,type:Boolean}},data:function(){return{}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({first:function(){return this.$store.state.current.first},second:function(){return this.$store.state.current.second}},Object(o.b)("current",["len","firstPoint","secondPoint","firstGamePoint","secondGamePoint","servingSide"])),methods:{dispatchScore:function(e){0===this.len&&-1===this.servingSide&&this.$emit("request-serving-side"),this.$store.dispatch("current/gainScore",e)},deleteScore:function(){this.$store.commit("current/deleteScore")}}},d=(r(375),r(55)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:{"score-container":!0,opaque:e.opaque}},[e._l({first:e.first,second:e.second},(function(t,n){return[r("div",{key:n+"-name",staticClass:"name"},[r("div",[e._v(e._s(t.name.join(" | ")))]),e._v(" "),r("div",[e._v(e._s(t.subName))]),e._v(" "),r("div",[e._v(e._s(t.team))])]),e._v(" "),r("div",{key:n+"-game",staticClass:"game"},[e._v("\n      "+e._s("first"===n?e.firstGamePoint:e.secondGamePoint)+"\n    ")]),e._v(" "),r("div",{key:n+"-score",staticClass:"score",attrs:{active:e.servingSide===("first"===n?0:1),controllable:!e.readOnly||null},on:{click:function(t){!e.readOnly&&e.dispatchScore(n,1)},contextmenu:function(t){t.preventDefault(),!e.readOnly&&e.deleteScore()}}},[e._v("\n      "+e._s("first"===n?e.firstPoint:e.secondPoint)+"\n    ")])]}))],2)}),[],!1,null,null,null);t.default=component.exports},369:function(e,t,r){"use strict";r.r(t);r(50),r(27),r(44),r(20),r(49),r(88);var n=r(2),o=r(29);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={lt:{default:"6(lt)"},lb:{default:"16(lb)"},rt:{default:"7(rt)"},rb:{default:"17(rb)"}},v={functional:!0,name:"FPCourt",props:l(l({double:{default:!1,type:Boolean}},d),{},{serve:{default:"",type:String},serveColor:{default:"#922",type:String},courtColor:{default:"#262",type:String},noNumber:{default:!1,type:Boolean},height:{default:"95vh",type:String},reversed:{default:!1,type:Boolean}}),render:function(e,t){var r,n,c=t.props,l=(r=1,n=22,Object(o.a)(Array(n+1).keys()).filter((function(e){return n>=e&&r<=e}))),v=function(e){return c.noNumber&&c[e]===d[e].default?"":c[e]},f=l.map((function(e,t){switch(e){case 6:return v("lt");case 7:return v("rt");case 16:return v("lb");case 17:return v("rb");default:return c.noNumber?"":e}})).map((function(t,r){return function(e){switch(c.serve){case"lt":return(c.double?[5,6]:[2,6]).includes(e);case"rt":return(c.double?[7,8]:[3,7]).includes(e);case"lb":return(c.double?[15,16]:[16,20]).includes(e);case"rb":return(c.double?[17,18]:[17,21]).includes(e);default:return!1}}(r+1)?e("div",{class:"serve"},t):e("div",t)}));return c.reversed&&f.reverse(),e("div",{class:"court",style:{"--serve-color":c.serveColor,"--court-color":c.courtColor,"--height":c.height}},f)}},f=(r(377),r(55)),component=Object(f.a)(v,void 0,void 0,!1,null,null,null);t.default=component.exports},375:function(e,t,r){"use strict";r(365)},376:function(e,t,r){(t=r(10)(!1)).push([e.i,".score-container{width:100%;height:100%;background:rgba(34,34,34,.06667);color:green;display:grid;grid-template-columns:2.5fr .5fr 2fr;grid-template-rows:1fr 1fr}.score-container.opaque{background:#222;color:#adff2f}.score-container>div{display:flex;justify-content:center;align-items:center}.score-container>div:nth-last-child(-n+3){color:#ff4500}.score-container>div:nth-child(3)[active]{color:#000;background:#adff2f}.score-container>div:nth-child(3)[active][controllable]:hover{background:#cefb8a}.score-container>div:nth-child(6)[active]{color:#000;background:#ff4500}.score-container>div:nth-child(6)[active][controllable]:hover{background:#ff9873}@media screen and (max-width:900px){.score-container>div:nth-child(3),.score-container>div:nth-child(6){grid-column:span 2}.score-container>div:first-child,.score-container>div:nth-child(4){align-items:center;grid-column:span 3}}.score-container>hr{margin:0;box-sizing:border-box;grid-column:span 3;border:none;background:#000;width:100%;height:100%}.score-container>.game{font-size:12.5vh;line-height:0}.score-container>.score{font-size:33.3333333333vh;line-height:33.3333333333vh;transition:background-color .15s}.score-container>.score[controllable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.score-container>.score[controllable]:hover{background-color:hsla(0,0%,40%,.33333)}.score-container>.score[controllable]:hover:active{background-color:rgba(0,0,0,.33333)}.score-container>.name{flex-direction:column;padding:2vh;align-items:start;justify-content:center;text-align:left;font-size:4.1666666667vh}.score-container>.name>div:last-child{margin-top:4.1666666667vh}",""]),e.exports=t},377:function(e,t,r){"use strict";r(366)},378:function(e,t,r){(t=r(10)(!1)).push([e.i,".court{--height:95vh;--len:calc(var(--height)/1420);--gap:calc(var(--len)*4);all:unset;position:relative;display:grid;width:calc(var(--len)*610 - var(--gap)*2);height:calc(var(--len)*1340 - var(--gap)*2);background:#fff;box-sizing:content-box;padding:var(--gap);border:calc(var(--len)*40) solid var(--court-color,#262);grid-template-columns:calc(var(--len)*42) calc(var(--len)*253) calc(var(--len)*253) calc(var(--len)*42);grid-template-rows:calc(var(--len)*72) calc(var(--len)*388) calc(var(--len)*196) calc(var(--len)*196) calc(var(--len)*388) calc(var(--len)*72);grid-gap:var(--gap)}.court :nth-child(10),.court :nth-child(13){grid-column:span 2}.court :nth-child(6),.court :nth-child(7),.court :nth-child(16),.court :nth-child(17){font-size:1.5em}.court>div{color:#fff;display:flex;justify-content:center;align-items:center;background:#262;background:var(--court-color,#262);box-sizing:border-box}.court>div.serve{background:#922;background:var(--serve-color,#922);color:#000;font-weight:700}",""]),e.exports=t},379:function(e,t,r){"use strict";r(367)},380:function(e,t,r){(t=r(10)(!1)).push([e.i,".court-wrapper{position:relative}.court-wrapper:hover .overlay-control,.court-wrapper[focus-within] .overlay-control{opacity:1}.court-wrapper:focus-within .overlay-control,.court-wrapper:hover .overlay-control{opacity:1}.court-wrapper .overlay-control{position:absolute;top:50%;left:50%;height:60%;display:flex;flex-direction:column;justify-content:space-between;align-items:center;opacity:0;transition:opacity .2s;transform:translate(-50%,-50%)}.court-wrapper .overlay-control[display]{justify-content:center}",""]),e.exports=t},381:function(e,t){e.exports=function(component,e){var t="function"==typeof component.exports?component.exports.extendOptions:component.options;for(var i in"function"==typeof component.exports&&(t.directives=component.exports.options.directives),t.directives=t.directives||{},e)t.directives[i]=t.directives[i]||e[i]}},382:function(e,t,r){"use strict";var n=r(2),o=r(369),c=r(91);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={name:"court-vis",components:{Court:o.default},props:{displayOnly:{default:!1,type:Boolean}},data:function(){return{reversed:!1}},computed:d(d({},Object(c.b)("current",["servingSide","posName","len"])),{},{serveColor:function(){return 0===this.servingSide?"greenyellow":"orangered"}},Object(c.c)("current",["isSingle","swapCourt"])),methods:{swap:function(){this.$store.commit("current/swap")},switchPos:function(e){this.$store.commit("current/switchPos",e)},setFirstServe:function(e){this.$store.commit("current/setFirstServe",e)}}},f=(r(379),r(55)),h=r(72),y=r.n(h),m=r(240),w=r(161),component=Object(f.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"court-wrapper"},[r("Court",e._b({attrs:{"toogle-reversed":function(){e.reversed=!e.reversed},reversed:e.reversed,"serve-color":e.serveColor,double:!e.isSingle}},"Court",Object.assign({},e.$attrs,e.posName),!1)),e._v(" "),r("div",{staticClass:"overlay-control",attrs:{display:!!e.displayOnly||null}},[e.displayOnly?[r("v-btn",{attrs:{fab:"",color:"grey lighten-2 black--text"},on:{click:function(t){e.reversed=!e.reversed}}},[r("v-icon",[e._v("mdi-rotate-3d-variant")])],1)]:[r("v-btn",{attrs:{fab:"",disabled:e.isSingle},on:{click:function(t){return e.switchPos(0^e.swapCourt)}}},[r("v-icon",[e._v("mdi-swap-horizontal")])],1),e._v(" "),0===e.len?r("v-btn",{attrs:{fab:""},on:{click:function(t){return e.setFirstServe(0^e.swapCourt)}}},[r("v-icon",[e._v("mdi-badminton")])],1):e._e(),e._v(" "),r("v-btn",{attrs:{fab:""},on:{click:e.swap}},[r("v-icon",[e._v("mdi-swap-vertical-variant")])],1),e._v(" "),0===e.len?r("v-btn",{attrs:{fab:""},on:{click:function(t){return e.setFirstServe(1^e.swapCourt)}}},[r("v-icon",[e._v("mdi-badminton")])],1):e._e(),e._v(" "),r("v-btn",{attrs:{fab:"",disabled:e.isSingle},on:{click:function(t){return e.switchPos(1^e.swapCourt)}}},[r("v-icon",[e._v("mdi-swap-horizontal")])],1)]],2)],1)}),[],!1,null,null,null);t.a=component.exports;y()(component,{Court:r(369).default}),y()(component,{VBtn:m.a,VIcon:w.a})},393:function(e,t,r){var content=r(442);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(11).default)("1f61de68",content,!0,{sourceMap:!1})},441:function(e,t,r){"use strict";r(393)},442:function(e,t,r){(t=r(10)(!1)).push([e.i,".broadcast-screen[data-v-12bac6ae]{margin:0;padding:0;display:flex;align-items:center;width:100%;height:100%}@media screen and (max-width:900px){.broadcast-screen[data-v-12bac6ae]{flex-direction:column-reverse}}",""]),e.exports=t},464:function(e,t,r){"use strict";r.r(t);r(27),r(18),r(49),r(36);var n=r(7),o=r(368),c=r(382),l={components:{Score:o.default,CourtVis:c.a},layout:"minimal",head:{title:"Broadcast Screen"},props:{debug:!1},data:function(){return{height:"100vh",broadcaster:null,recieved:[],showGrid:!0}},mounted:function(){var e=this;this.getHeight(),this.broadcaster=new BroadcastChannel("BMT_scoring_channel"),this.broadcaster.onmessage=function(t){console.log(t.data),e.recieved.push(t.data),e.handleMessage(t.data)},this.requestSync()},methods:{getHeight:function(){this.height="calc(".concat(window.innerHeight,"px)")},handleMessage:function(data){var e=data.type,t=void 0===e?"":e,r=data.action,o=void 0===r?"":r,c=data.payload,l=void 0===c?null:c;switch(t){case"SYNC":if(o.includes("/")){var d=o.split("/"),v=Object(n.a)(d,2),f=v[0],h=v[1];this.$store.commit("current/".concat(f),{target:h,payload:l})}else this.$store.commit("current/".concat(o),l);break;case"SRV_EST":this.requestSync();break;case"DISPLAY":switch(o){case"show grid":this.showGrid=Boolean(l);break;default:console.log("DISPLAY Unknown?",data)}break;default:console.log("Reciever Unknown?",data)}},requestSync:function(){this.broadcaster.postMessage({type:"REQUEST_SYNC"})}},destroyed:function(){this.broadcaster.close()}},d=(r(441),r(55)),v=r(72),f=r.n(v),h=r(363),y=r(381),m=r.n(y),w=r(174),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{directives:[{name:"resize",rawName:"v-resize",value:e.getHeight,expression:"getHeight"}],staticClass:"broadcast-screen",attrs:{fluid:""}},[e.showGrid?r("CourtVis",{attrs:{height:e.height,"display-only":""}}):e._e(),e._v(" "),r("Score",{attrs:{"read-only":""}}),e._v(" "),e.debug?[r("div",{staticClass:"d-flex flex-column-reverse justify-center align-stretch pa-2"},e._l(e.recieved,(function(t,n){return r("pre",{key:n,staticClass:"blue-grey darken-2 pa-1 rounded-lg my-1"},[e._v(e._s(t))])})),0),e._v(" "),r("pre",{staticClass:"ml-auto mb-auto grey"},[e._v(e._s(e.$store.state.current))])]:e._e()],2)}),[],!1,null,"12bac6ae",null);t.default=component.exports;f()(component,{Score:r(368).default}),f()(component,{VContainer:h.a}),m()(component,{Resize:w.a})}}]);