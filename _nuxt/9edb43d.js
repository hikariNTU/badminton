(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{206:function(e,t,n){var content=n(278);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(11).default)("7388ab72",content,!0,{sourceMap:!1})},238:function(e,t,n){"use strict";var r={data:function(){return{clipped:!0,drawer:!1,fixed:!0,items:[{icon:"mdi-badminton",title:"Welcome",to:"/"},{icon:"mdi-scoreboard",title:"Score",to:"/score"},{icon:"mdi-book-open-outline",title:"Laws",to:"/laws"}],miniVariant:!0,right:!0,rightDrawer:!1,title:"Badminton Scoring App"}}},o=n(55),c=n(72),l=n.n(c),f=n(356),v=n(361),d=n(357),m=n(240),h=n(363),S=n(358),w=n(161),O=n(162),_=n(103),j=n(163),P=n(70),V=n(359),G=n(362),k=n(360),x=n(235),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-navigation-drawer",{attrs:{"mini-variant":e.miniVariant,fixed:"",app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",e._l(e.items,(function(t,i){return n("v-list-item",{key:i,attrs:{to:t.to,router:"",exact:""}},[n("v-list-item-action",[n("v-icon",[e._v(e._s(t.icon))])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.title)}})],1)],1)})),1)],1),e._v(" "),n("v-app-bar",{attrs:{fixed:"",app:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(t){t.stopPropagation(),e.miniVariant=!e.miniVariant}}},[n("v-icon",[e._v("mdi-"+e._s("chevron-"+(e.miniVariant?"right":"left")))])],1),e._v(" "),n("v-toolbar-title",{domProps:{textContent:e._s(e.title)}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(t){t.stopPropagation(),e.$vuetify.theme.dark^=!0}}},[n("v-icon",[e._v("mdi-theme-light-dark")])],1)],1),e._v(" "),n("v-main",[n("v-container",{attrs:{"fill-height":"",fluid:"","ma-0":"","pa-0":""}},[n("Nuxt")],1)],1),e._v(" "),n("v-footer",{attrs:{absolute:!e.fixed,app:""}},[n("span",[e._v("Chung, Lian © "+e._s((new Date).getFullYear()))])])],1)}),[],!1,null,null,null);t.a=component.exports;l()(component,{VApp:f.a,VAppBar:v.a,VAppBarNavIcon:d.a,VBtn:m.a,VContainer:h.a,VFooter:S.a,VIcon:w.a,VList:O.a,VListItem:_.a,VListItemAction:j.a,VListItemContent:P.a,VListItemTitle:P.b,VMain:V.a,VNavigationDrawer:G.a,VSpacer:k.a,VToolbarTitle:x.a})},239:function(e,t,n){"use strict";var r={},o=n(55),c=n(72),l=n.n(c),f=n(356),v=n(359),component=Object(o.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("v-app",{attrs:{dark:""}},[t("v-main",[t("Nuxt")],1)],1)}),[],!1,null,null,null);t.a=component.exports;l()(component,{VApp:f.a,VMain:v.a})},251:function(e,t,n){n(252),e.exports=n(253)},277:function(e,t,n){"use strict";n(206)},278:function(e,t,n){(t=n(10)(!1)).push([e.i,"h1[data-v-bfedb7fe]{font-size:20px}",""]),e.exports=t},341:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return l})),n.d(t,"getters",(function(){return S})),n.d(t,"mutations",(function(){return w})),n.d(t,"actions",(function(){return O}));n(16),n(27),n(89),n(126),n(32);var r=n(29),o=n(2),c=n(42),l=function(){return{first:{name:["綠第一人","綠第二人"],team:"Green College",reversed:!1},second:{name:["紅首發","紅二發"],team:"Orange Apple",reversed:!1},isSingle:!1,gender:"M",limit:21,deuceGap:1,deuceLimit:30,swapCourt:!1,firstServe:-1,prevGames:[],score:[]}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?t?"lb":"rt":t?"rb":"lt"},v=function(e){return function(t){return function(n,r,o,c){r===e&&((o?c[o-1]:t)===r&&(n^=1));return n}}},d=[v(0),v(1)],m=d[0],h=d[1],S={generalSetting:function(e){return{isSingle:e.isSingle,gender:e.gender,limit:e.limit,deuceGap:e.deuceGap,deuceLimit:e.deuceLimit,swapCourt:e.swapCourt,firstServe:e.firstServe}},len:function(e){return e.score.length},secondPoint:function(e){var t;return null==e||null===(t=e.score)||void 0===t?void 0:t.reduce((function(a,b){return a+b}),0)},firstPoint:function(e,t){return t.len-t.secondPoint},firstGamePoint:function(e,t){return e.prevGames.reduce((function(e,t){return 0===t.winner&&(e+=1),e}),0)},secondGamePoint:function(e,t){return e.prevGames.length-t.firstGamePoint},firstSwap:function(e){return e.score.reduce(m(e.firstServe),0)},secondSwap:function(e){return e.score.reduce(h(e.firstServe),0)},servingSide:function(e,t){return t.len?e.score[t.len-1]:e.firstServe},posName:function(e,t){var n,r,l=e.isSingle,v=e.swapCourt,d=e.first,m=e.second,h=(e.firstServe,Object(c.a)(e,["isSingle","swapCourt","first","second","firstServe"]),{}),S=t.servingSide,w=0;(0===S?w=t.firstPoint:1===S&&(w=t.secondPoint),-1!==S&&(h.serve=f(w%2,v^S)),l)?Object.assign(h,(n={},Object(o.a)(n,f(w%2,v),d.name[0]),Object(o.a)(n,f(w%2,!v),m.name[0]),n)):Object.assign(h,(r={},Object(o.a)(r,f(t.firstSwap,v),d.name[0^d.reversed]),Object(o.a)(r,f(!t.firstSwap,v),d.name[1^d.reversed]),Object(o.a)(r,f(t.secondSwap,!v),m.name[0^m.reversed]),Object(o.a)(r,f(!t.secondSwap,!v),m.name[1^m.reversed]),r));return h}},w={swap:function(e){e.swapCourt=!e.swapCourt},switchPos:function(e,t){switch(t){case"first":case 0:e.first.reversed^=1;break;case"second":case 1:e.second.reversed^=1;break;default:return void console.warn("[".concat(t,"] is not valid argv for switch position."))}},writeScore:function(e,t){e.score.push(t)},deleteScore:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t?e.score.splice(0):e.score.pop()},saveGame:function(e,t){e.prevGames.push(t)},deleteGame:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t?e.prevGames.splice(0):e.prevGames.pop()},applyMatch:function(e,t){var n,o,l=t.first,f=t.second,v=Object(c.a)(t,["first","second"]),d=l.name,m=Object(c.a)(l,["name"]),h=f.name,S=Object(c.a)(f,["name"]);Object.assign(e,v),Object.assign(e.first,m),e.first.name.splice(0),(n=e.first.name).push.apply(n,Object(r.a)(d)),Object.assign(e.second,S),e.second.name.splice(0),(o=e.second.name).push.apply(o,Object(r.a)(h))},mergePlayer:function(e,t){var n=t.target,o=t.payload;if(["first","second"].includes(n)){var l,f=o.name,v=void 0===f?null:f,d=Object(c.a)(o,["name"]);if(null!==v)e[n].name.splice(0),(l=e[n].name).push.apply(l,Object(r.a)(v));Object.assign(e[n],d)}},mergeSetting:function(e,t){Object.assign(e,t)},mergeScoring:function(e,t){var n;e.score.splice(0),(n=e.score).push.apply(n,Object(r.a)(t))},mergePrevGames:function(e,t){var n;e.prevGames.splice(0),(n=e.prevGames).push.apply(n,Object(r.a)(t))},setFirstServe:function(e,t){switch(t){case"first":case 0:e.firstServe=0;break;case"second":case 1:e.firstServe=1;break;case"unset":case-1:e.firstServe=-1;break;default:return void console.warn("[".concat(t,"] is not valid argv for serving."))}}},O={clearWho:function(e,t){var n=e.commit;"all"===t&&(n("deleteScore",!0),n("deleteGame",!0),n("setFirstServe",-1))},saveCurrentGame:function(){},gainScore:function(e,t){var n=e.commit,r=e.getters,o=e.state;switch(t){case"first":n("writeScore",0);break;case"second":n("writeScore",1);break;default:return void console.warn("[".concat(t,"] is not valid argv for gain score."))}console.log("1: ".concat(r.firstPoint,", 2: ").concat(r.secondPoint));var c=Math.max(r.firstPoint,r.secondPoint);if(c>=o.limit&&Math.abs(r.firstPoint-r.secondPoint)>o.deuceGap||c>=o.deuceLimit){var l={score:o.score,firstServe:o.firstServe,winner:r.firstPoint>r.secondPoint?0:1};console.log(JSON.parse(JSON.stringify(l))),n("saveGame",JSON.parse(JSON.stringify(l))),n("deleteScore",!0)}},submitMatch:function(e,t){var n=e.commit;t.isSingle&&(t.first.name.splice(1),t.second.name.splice(1)),n("applyMatch",t)}}},65:function(e,t,n){"use strict";var r={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(n(277),n(55)),c=n(72),l=n.n(c),f=n(356),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:""}},[404===e.error.statusCode?n("h1",[e._v("\n    "+e._s(e.pageNotFound)+"\n  ")]):n("h1",[e._v("\n    "+e._s(e.otherError)+"\n  ")]),e._v(" "),n("NuxtLink",{attrs:{to:"/"}},[e._v("\n    Home page\n  ")])],1)}),[],!1,null,"bfedb7fe",null);t.a=component.exports;l()(component,{VApp:f.a})}},[[251,7,2,8]]]);