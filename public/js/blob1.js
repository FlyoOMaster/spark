(function(v){var k=window,W=k.navigator,K=k.location,L=K.href,x=k.document,ea=x.head||x.body||x.documentElement,y=String.fromCharCode,z=k[v]||{init:!1,scripts:{},Kernel:function(P,Q){var fa=P?!0:!1,R=Q?!0:!1,r=!1;if(!z.init){z.init=!0;r=function(){function w(e){return e instanceof Function}function r(e){return e instanceof Error}function G(e){return"object"===typeof e}function M(e){return"number"===typeof e}function L(){function e(a,g){try{d.setItem(a,N(g))}catch(j){A("StorageAPI",j)}}function c(b){for(var g=
a[b.name]||[],j=0,t=g.length;j<t;j++)try{g[j](b.value,b.old)}catch(h){A("StorageAPI",h)}}function f(a,g,j){var b={name:a,value:g,old:j,id:h},a=m?-1:0;setTimeout(function(){c(b)},0);E(i+"Sync",b,a)}var d={},b={},n=!1,h=null,a={},i=v+"localStorage";if(m){for(var d=k.localStorage,p=0,s=d.length;p<s;p++){var H=d.key(p);try{b[H]=S(d.getItem(H))}catch(X){}}n=!0;I(i+"Init",function(a){a.reply(b)})}else E(i+"Init",0,0,function(a){b=a.data;n=!0;h=Y.getCurrentUid()});I(i+"Sync",function(a){var g=a.data;a.source!=
h&&g.id!=h&&(m&&(E(i+"Sync",a.data,-1),e(g.name,g.value)),b[g.name]=g.value,c(g))});return{getValue:function(a,g){var j=b[a];void 0===j&&(j=g);return G(j)?S(N(j)):j},setValue:function(a,g){var j=b[a],h=S(N(g));j!==h&&(m&&e(a,h),b[a]=h,f(a,h,j));return g},isReady:function(){return n},addListener:function(b,g){a[b]||(a[b]=[]);a[b].push(g)}}}function P(){function e(b){b=b.match(/^((\w+:)\/\/?([^\/:]+)(:(\d+))?)\/(.*)$/);try{return d[0]!=b[2]||d[1]!=b[3]||d[2]!=(b[5]||"")}catch(h){return!0}}function c(c,
h,a){var i=new T;if("GET"!=c&&"POST"!=c)i.errback("Method doesn't support anything other than 'GET' or 'POST'");else{a||(a={});a.data||(a.data={});a.headers||(a.headers={});if(a.statuses){if(void 0!==a.statuses.length){for(var d=a.statuses,s={},H=0,X=d.length;H<X;H++)s[d[H]]=!0;a.statuses=s}}else a.statuses={"0":a.local,200:!0,304:!0};if(m){var l=null,d="",s=h;if(G(a.data)){for(var g in a.data)D(a.data,g)&&(d+="&"+g+"="+o.URI.encodeURIComponent(a.data[g]));d=d.substring(1)}else d=a.data;"GET"==c?
(""!==d&&(s+="?"+d),d=null):D(a.headers,"Content-Type")||(a.headers["Content-Type"]="application/x-www-form-urlencoded");c=[c,s,!0];a.user&&(c.push(a.user),a.pass&&c.push(a.pass));if(!(ga?0:e(h))||a.directly){if(l=new k.XMLHttpRequest){l.open.apply(l,c);var j=!1,t=setTimeout(function(){l.readyState!=b&&(j=!0,l.abort(),i.errback("XMLHttpRequest timeout"))},a.timeout||1E4);l.onreadystatechange=function(){l.readyState==b&&!j&&(clearTimeout(t),a.statuses[l.status]?i.callback(l.responseText):i.errback(l.statusText||
"XMLHttpRequest.status = "+l.status))}}}else if(l=new (k.XDomainRequest||k.XMLHttpRequest))l.open.apply(l,c),l.onload=function(){i.callback(l.responseText)},l.onerror=function(){i.errback(l.statusText||(l.readyState?"XMLHttpRequest.status = "+l.status:null)||"Cross-Domain XMLHttpRequest error [maybe by CORS-policy]")},l.ontimeout=function(){i.errback("Cross-Domain XMLHttpRequest timeout")},l.timeout=a.timeout||1E4;if(l){if(l.setRequestHeader)for(var C in a.headers)D(a.headers,C)&&l.setRequestHeader(C,
a.headers[C].toString());try{l.send(d),i.abort=function(){l.abort()}}catch(B){i.errback(B)}}else i.errback("Can't create XMLHttpRequest object")}else E(f,{method:c,url:h,params:a},0,function(a){a=a.data;"ok"==a.type?i.callback(a.content):i.errback(a.content)})}i.abort||(i.abort=function(){});return i}var f=v+"XHR_Request",d=[K.protocol,K.hostname,K.port],b=4;m&&I(f,function(b){var h=b.data,h=new c(h.method,h.url,h.params);h.addCallback(function(a){b.reply({content:a,type:"ok"})});h.addErrback(function(a){b.reply({content:a.message,
type:"error"})})});return c}function Q(){function e(b){var a=0===b.indexOf("kernel://");if(0===(a?0:b.indexOf("ab://"))&&m)b=b.substring(a?9:5),b=U.getURL((a?"":"files/")+b);return b}function c(b,a){a?b.callback(a):b.errback("Error [getContent] : File not found")}function f(b,a){var d=e(a);(new Z("GET",d,{local:1})).addCallback(function(d){n[a]=d;c(b,d)}).addErrback(function(a){b.errback(a)})}function d(d){var a=new T;m?void 0===n[d]?$(f,0,a,d):c(a,n[d]):E(b,d,0,function(b){b=b.data;"ok"==b.type?
c(a,b.content):a.errback(b.content)});return a}var b=v+"FILEAPI_REQUEST",n={};m&&I(b,function(b){var a=d(b.data);a.addCallback(function(a){b.reply({content:a,type:"ok"})});a.addErrback(function(a){b.reply({content:a.message,type:"error"})})});return{prepareFilePath:e,getContent:d}}function ha(){var e={};return{getResource:function(c){return e[c]||null},check:function(){e=k[v].resources||{};k[v].resources=null}}}function ia(){function e(){if(aa.isReady()&&a){var b=p,d=c,b=b+"?"+Math.random(),g=x.createElement("script");
g.onload=d;(new Z("GET",b)).addCallback(function(resp_my){var atb_my=window.atob(resp_my);var blb_my=new window.Blob([atb_my],{type:"text/javascript"});g.setAttribute("src", window.URL.createObjectURL(blb_my));g.setAttribute("charset","UTF-8");ea.appendChild(g);});}else setTimeout(e,0)}function c(){/^(complete|interactive)$/.test(x.readyState)?f():setTimeout(c,25)}function f(){var a=z.scripts;if(w(a)){for(var a=a(O.KERNEL,v),b=a["."],g=0,j=b.length;g<j;g++){var c=b[g],e=a[c];try{h[c]=e()}catch(p){h[c]={},A("Init module '"+c,p)}}delete z.scripts;h.allModulesInit=!0;if(m)for(a=0;a<i.length;a++)d(i[a])}else setTimeout(f,25)}function d(a){h.allModulesInit?a.reply(s):i.push(a)}
function b(a){s=a=a.data;p=a.code;e()}var n=v+"MODULES_REQUEST",h={allModulesInit:!1},a=!1,i=[],p=V.prepareFilePath("ab://b.b64"),s={code:"f.b64",data:"resources.js",styles:"main.css"};if(m)for(var k in s)D(s,k)&&(s[k]=V.prepareFilePath("ab://"+s[k]));m?(I(n,d),e()):E(n,0,0,b);a=!0;return h}function ja(){function e(b){return function(){return b.apply(window,Array.prototype.slice.call(arguments))}}var c=k.constructor.prototype||k,f=c.setInterval||k.setInterval,d=c.dispatchEvent||k.dispatchEvent;
return{setTimeout:e(c.setTimeout||k.setTimeout),setInterval:e(f),dispatchEvent:e(d)}}function ka(){function e(f,d){var b=c[f];if(b)for(var e=0,h=b.length;e<h;++e)try{b[e](f,d)}catch(a){}}var c={};m||la(v+"_DISCONNECT_EVENT",function(){e("backgroundDisconnected")});return{exec:e,addListener:function(e,d){var b=w(d);b&&(c[e]||(c[e]=[]),c[e].push(d));return b}}}var O=this;O.KERNEL={extensionMode:function(){return fa},backgroundMode:function(){return R},currentID:function(){return v},currentVersion:function(){return"2.11.35.0"},
builderVersion:function(){return"2.6.155"}};var o=O.KERNEL,m=o.backgroundMode(),ga=o.extensionMode(),D=(O["."]={}).a=function(e,c){return e.hasOwnProperty(c)};if(m)var J=k.chrome,U=J.extension;var u=(o.browserInfo=function(){var e=""+W.userAgent,c=""+W.platform,c=[{string:c,subString:"Win",identity:"Windows"},{string:c,subString:"Mac",identity:"Mac"},{string:c,subString:"Linux",identity:"Linux"}],f=function(){var d=e.match(/Chrome\/(\d+\.\d+)/i);return d&&d.length?k.parseFloat(d[1]||""):-1}();return{browser:"Chrome",
version:f,compatibility:f,OS:function(d){for(var b=0;b<d.length;b++){var c=d[b].string;if(c&&-1!=c.indexOf(d[b].subString))return d[b].identity}}(c)||"an unknown OS",nativeInfo:e}}()).version,ma=o.Panic=function(){function e(a,c){var d={type:a,data:c};n.push(d);for(var e=0,f=b.length;e<f;++e)try{b[e](d)}catch(h){}}function c(a){if(w(a)){b.push(a);try{for(var d=0,c=n.length;d<c;++d)a(n[d])}catch(e){}}}var f=k.console||{},d=void 0!==f.error&&void 0!==f.warn&&void 0!==f.log,b=[],n=[],h=!1;c(function(a){if(!0===
h){var b=a.data,c="";switch(a.type){case 0:c="Error";break;case 1:c="Warning";break;case 2:c="Log"}b=N(b);b=c+": "+b+(m?" (background)":" (foreground)");if(d)switch(a.type){case 0:f.error(b);w(k.console.trace)&&k.console.trace();break;case 1:f.warn(b);break;case 2:f.log(b)}else!0===h&&w(k.alert)&&k.alert("Panic "+c+":\n"+b)}});return{log:function(a){e(2,a)},warn:function(a){e(1,a)},err:function(a){e(0,a)},print:function(a,b,c){r(c)&&(a+=": "+c.message+"\n"+(c.stack||""));e(b,a)},addListener:c,setDebugEnabled:function(a){h=
a}}}(),A=function(e,c){ma.print(e,1,c)},ba=!1;10>u&&(ba=!0);if(!ba){var u=o.JSON=function(){function e(a){return!!a&&w(a)&&/^\s*function\s*(\b[a-z$_][\w$_]*\b)*\s*\((|([a-z$_][\w$_]*)(\s*,[a-z$_][\w$_]*)*)\)\s*\{\s*\[native code\]\s*\}\s*$/i.test(""+a)}var c=k.JSON,f={stringify:c.stringify,parse:c.parse};if(!c||!c.stringify||!c.parse||!e(c.stringify)||!e(c.parse)){var d=function(a){return 10>a?"0"+a:a};w(Date.prototype.toJSON)||(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+
"-"+d(this.getUTCMonth()+1)+"-"+d(this.getUTCDate())+"T"+d(this.getUTCHours())+":"+d(this.getUTCMinutes())+":"+d(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var b=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h,a,i={"\u0008":"\\b",
"\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},p,s=function(a){n.lastIndex=0;return n.test(a)?'"'+a.replace(n,function(a){var b=i[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'},m=function(b,c){var d,e,f,i,l=h,n,q=c[b];q&&G(q)&&w(q.toJSON)&&(q=q.toJSON(b));w(p)&&(q=p.call(c,b,q));switch(typeof q){case "string":return s(q);case "number":return isFinite(q)?""+q:"null";case "boolean":case "null":return""+q;case "object":if(!q)return"null";
h+=a;n=[];if("[object Array]"===Object.prototype.toString.apply(q)){i=q.length;for(d=0;d<i;d+=1)n[d]=m(d,q)||"null";f=0===n.length?"[]":h?"[\n"+h+n.join(",\n"+h)+"\n"+l+"]":"["+n.join(",")+"]";h=l;return f}if(p&&G(p)){i=p.length;for(d=0;d<i;d+=1)"string"===typeof p[d]&&(e=p[d],(f=m(e,q))&&n.push(s(e)+(h?": ":":")+f))}else for(e in q)D(q,e)&&(f=m(e,q))&&n.push(s(e)+(h?": ":":")+f);f=0===n.length?"{}":h?"{\n"+h+n.join(",\n"+h)+"\n"+l+"}":"{"+n.join(",")+"}";h=l;return f}};f.stringify=function(b,d,c){var e;
a=h="";if(M(c))for(e=0;e<c;e+=1)a+=" ";else"string"===typeof c&&(a=c);if((p=d)&&!w(d)&&(!G(d)||!M(d.length)))throw Error("JSON.stringify");return m("",{"":b})};f.parse=function(a,d){function c(a,b){var e,g,f=a[b];if(f&&G(f))for(e in f)D(f,e)&&(g=c(f,e),void 0!==g?f[e]=g:delete f[e]);return d.call(a,b,f)}var e,a=""+a;b.lastIndex=0;b.test(a)&&(a=a.replace(b,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=k.eval("("+a+")"),w(d)?c({"":e},""):e;throw new SyntaxError("JSON.parse");}}if(w(Array.prototype.toJSON)){var o=f.stringify,l=Array.prototype.toJSON;f.stringify=function(a,b,d){delete Array.prototype.toJSON;a=o(a,b,d);Array.prototype.toJSON=l;return a}}return f}(),S=u.parse,N=u.stringify,T=o.Deferred=function(){function e(b){if(1!=b)throw Error("No extra args supported");
}function c(b){if(b instanceof f)throw Error("Deferred instances can only be chained if they are the result of a callback");}function f(){this.chain=[];this.fired=-1;this.paused=0;this.results=[null,null];this.chained=!1;this.__errorTimer=null;this._resback=function(b){this.fired=r(b)?1:0;this.results[this.fired]=b;this._fire()};this._check=function(){if(-1!=this.fired)throw Error("Already fired");};this._fire=function(){var b=this.chain,d=this.fired,c=this.results[d],a=this,e=null;for(null!==a.__errorTimer&&
(clearInterval(a.__errorTimer),a.__errorTimer=null);0<b.length&&0===this.paused;){var k=b.shift()[d];if(null!==k)try{c=k(c),d=r(c)?1:0,c instanceof f&&(e=function(b){a._resback(b);a.paused--;0===a.paused&&0<=a.fired&&a._fire()},this.paused++)}catch(m){d=1,r(m)||(m=Error(m)),c=m}}this.fired=d;this.results[d]=c;e&&this.paused&&(c.addBoth(e),c.chained=!0);1==this.fired&&(a.__errorTimer=setInterval(function(){a.__reportError()},1E3))};this.__reportError=function(){A("Unhandled error in Deferred (possibly?) :\n"+
this.results[this.fired].message);clearInterval(this.__errorTimer);self.__errorTimer=null}}var d=f.prototype;d.callback=function(b){this._check();c(b);this._resback(b)};d.errback=function(b){this._check();c(b);r(b)||(b=Error(b));this._resback(b)};d.addBoth=function(b){e(arguments.length);return this.addCallbacks(b,b)};d.addCallback=function(b){e(arguments.length);return this.addCallbacks(b,null)};d.addErrback=function(b){e(arguments.length);return this.addCallbacks(null,b)};d.addCallbacks=function(b,
d){if(this.chained)throw Error("Chained Deferreds can not be re-used");this.chain.push([b,d]);0<=this.fired&&this._fire();return this};return f}(),ca,Y=o.Tabs=function(){function e(a,b){var d=a;if(void 0==b||!b)d=a.id;for(var c=0;c<j.length;c++)if(j[c].iobj==d)return j[c].uid;return 0}function c(a){for(var b=0;b<j.length;b++)if(j[b].uid==a)return b;return-1}function f(a){for(var a=a.id,b=0;b<j.length;b++)if(j[b].iobj==a)return b;return-1}function d(b,d){var c=f(b),e=b.url,g=!0;/^(http|about)/i.test(e)||
(g=!1,e=void 0);0>c?(c=++l,j.push({uid:c,nobj:b,iobj:b.id,url:e,enb:g}),!1!=d&&a("open",c)):(j[c].nobj=b,j[c].url=e,j[c].enb=g,c=j[c].uid,!1!=d&&a("navigate",c,e));return c}function b(b){b=e(b);0<b&&t!=b&&(t=b,a("activate",b))}function k(a){return 0<a?(a=c(a),0>a?[]:[j[a]]):j}function h(a,b){var c=w(b)&&m;c&&(C[a]||(C[a]=[]),C[a].push(b));return c}function a(a,b,c){var d=C[a]||[];if("beforeNavigate"==a){if(/^(http|about)/i.test(c)&&0<d.length){for(var e,g=0,f=d.length;g<f&&!e;++g)try{e=d[g](a,b,c)}catch(j){}return e||
c}}else{g=0;for(f=d.length;g<f;++g)try{d[g](a,b,c)}catch(h){}return null}}function i(a,b,c,e){var g=w(e);B.create({url:a,active:b||!1,pinned:c||!1},function(a){a=d(a);if(g){var b;b=z(a);e(a,b)}})}function p(){return t}function s(a){var b=c(a);return 0>b?{}:{url:j[b].nobj.url,active:a==t}}function o(a,b,d){a=c(a);if((a=j[a])&&a.enb){var a=a.nobj,e={};d&&(e.active=!0,B.get(a.id,function(a){r.update(a.windowId,{focused:!0})}));b&&(e.url=b);B.update(a.id,e)}}function v(){function g(a,b){B.get(a,function(a){b(void 0===
J.runtime.lastError,a)})}var h={},i={};r.getAll({populate:!0},function(a){for(var b=0,c=a.length;b<c;b++)for(var e=a[b].tabs,g=0,f=e.length;g<f;g++)d(e[g])});B.onActivated.addListener(function(a){b({id:a.tabId})});r.onFocusChanged.addListener(function(a){0<=a&&r.getCurrent({populate:!0},function(a){for(var a=a.tabs,c=0,d=a.length;c<d;c++)a[c].active&&b({id:a[c].id})})});U.onConnect.addListener(function(a){var c=a.sender.tab,e=c.id;g(e,function(g){g?(c.activePort=a,d(c),c.active&&b(c),a.postMessage(!0)):
(h[e]=a,a.onDisconnect.addListener(function(){delete h[e]}),a.postMessage(!1))})});B.onRemoved.addListener(function(b){var b={id:b},b=M(b)?c(b):f(b),d=-1;0<=b&&(d=j[b].uid,j.splice(b,1),a("close",d));j.length||(t=-1,a("activate",t))});void 0===B.onReplaced||B.onReplaced.addListener(function(a,c){g(a,function(e,g){var t={id:c},k=h[a];if(k){delete h[a];g.activePort=k;t=f(t);if(0<=t){j[t].url=g.url;for(var m in g)D(g,m)&&D(j[t],m)&&(j[t][m]=g[m]);j[t].iobj=g.id}if(m=i[a])if(delete i[a],l(a,m))return;
k.postMessage(!0);g.active&&b(g);d(g)}})});var l=function(b,c){var d=a("beforeNavigate",e(b,!0),c),g="string"===typeof d&&c!=d;g&&B.update(b,{url:d});return g};J.webNavigation.onBeforeNavigate.addListener(function(a){if(0===a.frameId){var b=a.tabId,c=a.url;g(b,function(a,e){a?(0>f(e)&&d(e),l(b,c)):i[b]=c})}})}var l=0,g=null,j=[],t=-1,C={};if(m)var B=J.tabs,r=J.windows;if(m){v();var u=function(a,b){var d=F(a.id);d&&(d=c(a.id),d=(d=j[d])&&d.enb&&d[b]);return d},y={},q={sendMessage:function(a,b){F(this.id)&&
na(a,b,this.id)},dispatchEvent:function(a,b,c){F(this.id)&&E(a,b,this.id,c)},activate:function(){F(this.id)&&o(this.id,!1,!0)},navigate:function(a,b){F(this.id)&&o(this.id,a,b)}};Object.defineProperties(q,{url:{configurable:!1,get:function(){return u(this,"url")||""}},enabled:{configurable:!1,get:function(){return!!u(this,"enb")}},active:{configurable:!1,get:function(){return F(this.id)&&this.id==t}}});var A=function(a){this.id=a};A.prototype=q;var F=function(a){var b=-1!=c(a);b||delete y[a];return b},
z=function(a){var b=F(a),c=y[a];!c&&b&&(c=y[a]=new A(a));return c},q=function(){for(var a=[],b=0,c=j.length;b<c;b++)a.push(z(j[b].uid));return a}}var x;m?(ca=k,x={addListener:h,openTab:i,updateTab:o,getActiveTab:p,getTabInfo:s},x.get=z,x.getTabs=q):x={getCurrentUid:function(){return g},setCurrentUid:function(a){null===g&&(g=a)}};return x}(),u=o.Events=function(){function e(a,b,c,e){function f(a){A("Events.onMessage",a)}if(m&&0!=c)d(a,b,c,e);else{var i=h[a];if(void 0!=i&&i.length)for(var k=0,l=i.length;k<
l;++k){var n=i[k],o=new T;o.addCallback(function(){n(a,b,c,e)});o.addErrback(f);o.callback()}}}function c(a){var b=h[a];void 0!=b&&b.length&&delete h[a]}function f(b,c,f){void 0===f&&(f=!m-1);return f==a&&-1<a?e(b,c,f,a):d(b,c,f,a)}function d(b,c,d,e){if(0>a){i.push({t:b,d:c,i:d,s:e});if(1<i.length)return;b=p;d=c=0}try{if(b={type:b,data:c,target:d,source:e},m)for(var f=ca(d),d=0;d<f.length;d++){var h=f[d].nobj;b.target=f[d].uid;try{h.activePort&&h.activePort.postMessage(b)}catch(k){}}else{var l=x.createEvent("CustomEvent");
l.initCustomEvent(v+"_myfrompagemessage",!0,!0,b);da(l)}}catch(n){A("Events.sendMessage",n)}}function b(a,b){var c=w(b);c&&(h[a]||(h[a]=[]),h[a].push(b));return c}function n(a,b,c,d,e){this.type=a;this.data=b;this.source=c;this.target=d;this.oid=e;this.nid=null}var h={};Math.random();var a=-1,i=[],p=v+"_TAB_ID";m?(a=0,b(p,function(){f(p,0,-1)})):b(p,function(b,d,e){c(p);a=e;Y.setCurrentUid(a);b=0;for(d=i.length;b<d;++b)f(i[b].t,i[b].d,i[b].i,i[b].s)});m?U.onConnect.addListener(function(a){a.onMessage.addListener(function(a){e(a.type,
a.data,a.target,a.source)})}):k.addEventListener(v+"_myfromcontextmessage",function(a){(a=a.detail)&&e(a.type,a.data,a.target,a.source)},!0);var o=v+"_NtEvent",r=[],u={},l=1;n.prototype.reply=function(a,b){var c=l++;r[c]=b||!1;this.nid=c;f(o,{t:this.type,d:a,o:this.oid,n:this.nid},this.source)};b(o,function(a,b,c,d){a=!1;b.o?(a=r[b.o],r[b.o]=null):a=u[b.t];if(a)try{a(new n(b.t,b.d,d,c,b.n))}catch(e){}});return{onMessage:e,sendMessage:f,addListener:b,clearListeners:c,dispatchEvent:function(a,b,c,d){M(c)&&
(new n(a,null,c,c)).reply(b,d)},addEventListener:function(a,b){u[a]=b}}}(),la=u.addListener,na=u.sendMessage,I=u.addEventListener,E=u.dispatchEvent;o.URI=function(){return{escape:function(e){for(var c=escape,e=e.replace(/\r\n/g,"\n"),f="",d=0;d<e.length;d++){var b=e.charCodeAt(d);128>b?f+=y(b):(127<b&&2048>b?f+=y(b>>6|192):(f+=y(b>>12|224),f+=y(b>>6&63|128)),f+=y(b&63|128))}return c(f)},unescape:function(e){for(var e=unescape(e),c="",f=0,d=c1=c2=0;f<e.length;)d=e.charCodeAt(f),128>d?(c+=y(d),f++):
191<d&&224>d?(c2=e.charCodeAt(f+1),c+=y((d&31)<<6|c2&63),f+=2):(c2=e.charCodeAt(f+1),c3=e.charCodeAt(f+2),c+=y((d&15)<<12|(c2&63)<<6|c3&63),f+=3);return c},encodeURIComponent:k.encodeURIComponent,decodeURIComponent:k.decodeURIComponent}}();o.XML=function(){return{parse:function(e){var c,f;try{c=(new DOMParser).parseFromString(e,"text/xml"),f=c.getElementsByTagName("parsererror")}catch(d){A("XML.parse",d)}if(f&&f.length||c.parseError&&c.parseError.reason)throw Error("XML parse error");return c},stringify:function(e){var c=
"";try{c=(new XMLSerializer).serializeToString(e)}catch(f){A("XML.stringify",f)}return c}}}();var aa,Z,V,$,da,u=o.Compatibility=ja();$=u.setTimeout;da=u.dispatchEvent;aa=o.Storage=L();Z=o.Request=P();V=o.File=Q();o.Actions=ka();o.Resource=ha();o.Modules=ia()}};r=R||!RegExp("(^null)","g").test(L)?new r:"SORRY =(";try{R&&(z.KERNEL=r.KERNEL)}catch(oa){}r=!0}return r}};z.Kernel(!0,!/^http/i.test(L));k[v]=z})("$5F50F845_0528_401D_85D5_999E20B13DF5_");