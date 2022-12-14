!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="./",s(s.s=5)}([function(e,t,s){"use strict";try{self["workbox:core:6.5.3"]&&_()}catch(n){}},function(e,t,s){"use strict";try{self["workbox:precaching:6.5.3"]&&_()}catch(n){}},function(e,t,s){"use strict";try{self["workbox:routing:6.5.3"]&&_()}catch(n){}},function(e,t,s){"use strict";try{self["workbox:strategies:6.5.3"]&&_()}catch(n){}},function(e,t,s){"use strict";try{self["workbox:expiration:6.5.3"]&&_()}catch(n){}},function(e,t,s){"use strict";s.r(t);s(0);const n=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const r=new Set;const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},c=e=>[i.prefix,e,i.suffix].filter(e=>e&&e.length>0).join("-"),o=e=>e||c(i.precache),h=e=>e||c(i.runtime);function l(e,t){const s=new URL(e);for(const n of t)s.searchParams.delete(n);return s.href}let u;function d(e){e.then(()=>{})}class f{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const p=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");function g(e){return new Promise(t=>setTimeout(t,e))}function m(e,t){const s=t();return e.waitUntil(s),s}async function y(e,t){let s=null;if(e.url){s=new URL(e.url).origin}if(s!==self.location.origin)throw new a("cross-origin-copy-response",{origin:s});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=t?t(r):r,c=function(){if(void 0===u){const t=new Response("");if("body"in t)try{new Response(t.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,i)}let w,_;const v=new WeakMap,b=new WeakMap,R=new WeakMap,x=new WeakMap,C=new WeakMap;let L={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return b.get(e);if("objectStoreNames"===t)return e.objectStoreNames||R.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return D(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function E(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(_||(_=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(U(this),t),D(v.get(this))}:function(...t){return D(e.apply(U(this),t))}:function(t,...s){const n=e.call(U(this),t,...s);return R.set(n,t.sort?t.sort():[t]),D(n)}}function q(e){return"function"===typeof e?E(e):(e instanceof IDBTransaction&&function(e){if(b.has(e))return;const t=new Promise((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{t(),n()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)});b.set(e,t)}(e),t=e,(w||(w=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,L):e);var t}function D(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",r)},a=()=>{t(D(e.result)),n()},r=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",r)});return t.then(t=>{t instanceof IDBCursor&&v.set(t,e)}).catch(()=>{}),C.set(t,e),t}(e);if(x.has(e))return x.get(e);const t=q(e);return t!==e&&(x.set(e,t),C.set(t,e)),t}const U=e=>C.get(e);const T=["get","getKey","getAll","getAllKeys","count"],k=["put","add","delete","clear"],N=new Map;function I(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(N.get(t))return N.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=k.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!T.includes(s))return;const r=async function(e,...t){const r=this.transaction(e,a?"readwrite":"readonly");let i=r.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[s](...t),a&&r.done]))[0]};return N.set(t,r),r}L=(e=>({...e,get:(t,s,n)=>I(t,s)||e.get(t,s,n),has:(t,s)=>!!I(t,s)||e.has(t,s)}))(L);s(4);const M=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class K{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",e=>t(e.oldVersion,e)),D(s).then(()=>{})}(this._cacheName)}async setTimestamp(e,t){const s={url:e=M(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction("cache-entries","readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get("cache-entries",this._getId(e));return null===s||void 0===s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction("cache-entries").store.index("timestamp").openCursor(null,"prev");const a=[];let r=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&r>=t?a.push(n.value):r++),n=await n.continue()}const i=[];for(const c of a)await s.delete("cache-entries",c.id),i.push(c.url);return i}_getId(e){return this._cacheName+"|"+M(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:r}={}){const i=indexedDB.open(e,t),c=D(i);return n&&i.addEventListener("upgradeneeded",e=>{n(D(i.result),e.oldVersion,e.newVersion,D(i.transaction),e)}),s&&i.addEventListener("blocked",e=>s(e.oldVersion,e.newVersion,e)),c.then(e=>{r&&e.addEventListener("close",()=>r()),a&&e.addEventListener("versionchange",e=>a(e.oldVersion,e.newVersion,e))}).catch(()=>{}),c}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class P{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new K(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,d(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(1);function O(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:r.href}}class S{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class A{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null===t||void 0===t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}s(3);function W(e){return"string"===typeof e?new Request(e):e}class j{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new f,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=W(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(i){if(i instanceof Error)throw new a("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:t,request:r,response:e});return e}catch(c){throw n&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:n.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=W(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(r,i);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await c({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,t){const s=W(e);await g(0);const n=await this.getCacheKey(s,"write");if(!t)throw new a("cache-put-with-no-response",{url:p(n.url)});const i=await this._ensureResponseSafeToCache(t);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,n){const a=l(t.url,s);if(t.url===a)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,r);for(const c of i){if(a===l(c.url,s))return e.match(c,n)}}(h,n.clone(),["__WB_REVISION__"],o):null;try{await h.put(n,u?i.clone():i)}catch(f){if(f instanceof Error)throw"QuotaExceededError"===f.name&&await async function(){for(const e of r)await e()}(),f}for(const a of this.iterateCallbacks("cacheDidUpdate"))await a({cacheName:c,oldResponse:d,newResponse:i.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=W(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"===typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class B{constructor(e={}){this.cacheName=h(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"===typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new j(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let n=void 0;try{if(n=await this._handle(t,e),!n||"error"===n.type)throw new a("no-response",{url:t.url})}catch(r){if(r instanceof Error)for(const a of e.iterateCallbacks("handlerDidError"))if(n=await a({error:r,event:s,request:t}),n)break;if(!n)throw r}for(const a of e.iterateCallbacks("handlerWillRespond"))n=await a({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(r=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}class F extends B{constructor(e={}){e.cacheName=o(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(F.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(!this._fallbackToNetwork)throw new a("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const a=n.integrity,r=e.integrity,i=!r||r===a;if(s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||a:void 0})),a&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await t.cachePut(e,s.clone());0}}return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new a("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==F.copyRedirectedCacheableResponsesPlugin&&(n===F.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(F.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}F.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},F.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await y(e):e};class H{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new F({cacheName:o(e),plugins:[...t,new A({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){"string"===typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=O(s),r="string"!==typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!==typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return m(e,async()=>{const t=new S;this.strategy.plugins.push(t);for(const[a,r]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(r),s=this._urlsToCacheModes.get(a),n=new Request(a,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return m(e,async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new a("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let V;const $=()=>(V||(V=new H),V);s(2);const G=e=>e&&"object"===typeof e?e:{handle:e};class Q{constructor(e,t,s="GET"){this.handler=G(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=G(e)}}class J extends Q{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class z{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(t=>{"string"===typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return void 0;let o;try{o=i.handle({url:s,request:e,event:t,params:a})}catch(l){o=Promise.reject(l)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch(async n=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:a})}catch(r){r instanceof Error&&(n=r)}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n})),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(a)&&0===a.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"===typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,G(e))}setCatchHandler(e){this._catchHandler=G(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let X;const Y=()=>(X||(X=new z,X.addFetchListener(),X.addCacheListener()),X);function Z(e,t,s){let n;if("string"===typeof e){const a=new URL(e,location.href);0;n=new Q(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new J(e,t,s);else if("function"===typeof e)n=new Q(e,t,s);else{if(!(e instanceof Q))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return Y().registerRoute(n),n}class ee extends Q{constructor(e,t){super(({request:s})=>{const n=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(a);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}},e.strategy)}}const te={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};var se;self.addEventListener("activate",()=>self.clients.claim()),function(e){$().precache(e)}([{'revision':'3a2ba31570920eeb9b1d217cabe58315','url':'././fonts/AntDesign.ttf'},{'revision':'31b5ffea3daddc69dd01a1f3d6cf63c5','url':'././fonts/Entypo.ttf'},{'revision':'a76d309774d33d9856f650bed4292a23','url':'././fonts/Feather.ttf'},{'revision':'b06871f281fee6b241d60582ae9369b9','url':'././fonts/FontAwesome.ttf'},{'revision':'3b89dd103490708d19a95adcae52210e','url':'././fonts/FontAwesome5_Brands.ttf'},{'revision':'605ed7926cf39a2ad5ec2d1f9d391d3d','url':'././fonts/FontAwesome5_Solid.ttf'},{'revision':'b49ae8ab2dbccb02c4d11caaacf09eab','url':'././fonts/Fontisto.ttf'},{'revision':'e20945d7c929279ef7a6f1db184a4470','url':'././fonts/Foundation.ttf'},{'revision':'b3263095df30cb7db78c613e73f9499a','url':'././fonts/Ionicons.ttf'},{'revision':'b62641afc9ab487008e996a5c5865e56','url':'././fonts/MaterialCommunityIcons.ttf'},{'revision':'8ef52a15e44481b41e7db3c7eaf9bb83','url':'././fonts/MaterialIcons.ttf'},{'revision':'d2285965fe34b05465047401b8595dd0','url':'././fonts/SimpleLineIcons.ttf'},{'revision':'d2183373fef697282ae0793f0ea5e4c9','url':'./favicon-16.png'},{'revision':'ecdbac1dbab35fe39a08e28c6d0e74b2','url':'./favicon-32.png'},{'revision':'1b251890bf82c5dac7c800df1bf4a487','url':'./favicon.ico'},{'revision':'7a500d2a10802512b60b1f22f006dc4b','url':'./index.html'},{'revision':'19be0b6bbafdb564d446e3c669132a47','url':'./manifest.json'},{'revision':'ec543248d7b23864564429fc03837190','url':'./serve.json'},{'revision':null,'url':'./static/js/2.e6ea6340.chunk.js'},{'revision':null,'url':'./static/js/app.8590e500.chunk.js'},{'revision':null,'url':'./static/js/runtime~app.318494c4.js'}]),function(e){const t=$();Z(new ee(t,e))}(se);var ne,ae=new RegExp("/[^/?]+\\.[^/]+$");Z((function(e){var t=e.request,s=e.url;return"navigate"===t.mode&&(!s.pathname.startsWith("/_")&&!s.pathname.match(ae))}),(ne="./index.html",$().createHandlerBoundToURL(ne))),Z((function(e){var t=e.url;return t.origin===self.location.origin&&t.pathname.endsWith(".png")}),new class extends B{constructor(e={}){super(e),this.plugins.some(e=>"cacheWillUpdate"in e)||this.plugins.unshift(te)}async _handle(e,t){const s=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(s);let n,r=await t.cacheMatch(e);if(r)0;else{0;try{r=await s}catch(i){i instanceof Error&&(n=i)}}if(!r)throw new a("no-response",{url:e.url,error:n});return r}}({cacheName:"images",plugins:[new class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);d(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(c){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){r.add(e)}(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===h())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new P(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(function(e){e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}))}]);
//# sourceMappingURL=service-worker.js.map