(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1683:function(e,t,r){"use strict";r.d(t,{BH:function(){return E},LL:function(){return P},ZR:function(){return O},tV:function(){return c},L:function(){return h},Sg:function(){return _},ne:function(){return F},vZ:function(){return function e(t,r){if(t===r)return!0;let n=Object.keys(t),i=Object.keys(r);for(let s of n){if(!i.includes(s))return!1;let n=t[s],a=r[s];if(x(n)&&x(a)){if(!e(n,a))return!1}else if(n!==a)return!1}for(let e of i)if(!n.includes(e))return!1;return!0}},pd:function(){return V},aH:function(){return v},q4:function(){return m},P0:function(){return y},Pz:function(){return w},m9:function(){return z},z$:function(){return b},ru:function(){return S},L_:function(){return I},xb:function(){return L},w1:function(){return A},hl:function(){return R},uI:function(){return T},b$:function(){return C},G6:function(){return k},xO:function(){return M},zd:function(){return U},eu:function(){return N}});let n=()=>void 0;var i=r(3454);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s=function(e){let t=[],r=0;for(let n=0;n<e.length;n++){let i=e.charCodeAt(n);i<128?t[r++]=i:(i<2048?t[r++]=i>>6|192:((64512&i)==55296&&n+1<e.length&&(64512&e.charCodeAt(n+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++n)),t[r++]=i>>18|240,t[r++]=i>>12&63|128):t[r++]=i>>12|224,t[r++]=i>>6&63|128),t[r++]=63&i|128)}return t},a=function(e){let t=[],r=0,n=0;for(;r<e.length;){let i=e[r++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[r++];t[n++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let s=e[r++],a=e[r++],o=e[r++],l=((7&i)<<18|(63&s)<<12|(63&a)<<6|63&o)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(1023&l))}else{let s=e[r++],a=e[r++];t[n++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return t.join("")},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){let i=e[t],s=t+1<e.length,a=s?e[t+1]:0,o=t+2<e.length,l=o?e[t+2]:0,u=i>>2,h=(3&i)<<4|a>>4,c=(15&a)<<2|l>>6,d=63&l;o||(d=64,s||(c=64)),n.push(r[u],r[h],r[c],r[d])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(s(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):a(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){let i=r[e.charAt(t++)],s=t<e.length,a=s?r[e.charAt(t)]:0;++t;let o=t<e.length,u=o?r[e.charAt(t)]:64;++t;let h=t<e.length,c=h?r[e.charAt(t)]:64;if(++t,null==i||null==a||null==u||null==c)throw new l;let d=i<<2|a>>4;if(n.push(d),64!==u){let e=a<<4&240|u>>2;if(n.push(e),64!==c){let e=u<<6&192|c;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class l extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let u=function(e){let t=s(e);return o.encodeByteArray(t,!0)},h=function(e){return u(e).replace(/\./g,"")},c=function(e){try{return o.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},d=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,f=()=>{if(void 0===i||void 0===i.env)return;let e=i.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},p=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&c(e[1]);return t&&JSON.parse(t)},g=()=>{try{return n()||d()||f()||p()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},m=e=>{var t,r;return null===(r=null===(t=g())||void 0===t?void 0:t.emulatorHosts)||void 0===r?void 0:r[e]},y=e=>{let t=m(e);if(!t)return;let r=t.lastIndexOf(":");if(r<=0||r+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let n=parseInt(t.substring(r+1),10);return"["===t[0]?[t.substring(1,r-1),n]:[t.substring(0,r),n]},v=()=>{var e;return null===(e=g())||void 0===e?void 0:e.config},w=e=>{var t;return null===(t=g())||void 0===t?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let r=t||"demo-project",n=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:n,exp:n+3600,auth_time:n,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[h(JSON.stringify({alg:"none",type:"JWT"})),h(JSON.stringify(s)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function T(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(b())}function I(){return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function S(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function C(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function A(){let e=b();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function k(){return!function(){var e;let t=null===(e=g())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(r.g.process)}catch(e){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function R(){try{return"object"==typeof indexedDB}catch(e){return!1}}function N(){return new Promise((e,t)=>{try{let r=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},i.onupgradeneeded=()=>{r=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}class O extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,O.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,P.prototype.create)}}class P{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},n=`${this.service}/${e}`,i=this.errors[e],s=i?i.replace(D,(e,t)=>{let n=r[t];return null!=n?String(n):`<${t}?>`}):"Error",a=`${this.serviceName}: ${s} (${n}).`,o=new O(n,a,r);return o}}let D=/\{\$([^}]+)}/g;function L(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function x(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e){let t=[];for(let[r,n]of Object.entries(e))Array.isArray(n)?n.forEach(e=>{t.push(encodeURIComponent(r)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(r)+"="+encodeURIComponent(n));return t.length?"&"+t.join("&"):""}function U(e){let t={},r=e.replace(/^\?/,"").split("&");return r.forEach(e=>{if(e){let[r,n]=e.split("=");t[decodeURIComponent(r)]=decodeURIComponent(n)}}),t}function V(e){let t=e.indexOf("?");if(!t)return"";let r=e.indexOf("#",t);return e.substring(t,r>0?r:void 0)}function F(e,t){let r=new j(e,t);return r.subscribe.bind(r)}class j{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let n;if(void 0===e&&void 0===t&&void 0===r)throw Error("Missing Observer.");void 0===(n=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let r of t)if(r in e&&"function"==typeof e[r])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:r}:e).next&&(n.next=B),void 0===n.error&&(n.error=B),void 0===n.complete&&(n.complete=B);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?n.error(this.finalError):n.complete()}catch(e){}}),this.observers.push(n),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function B(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(e){return e&&e._delegate?e._delegate:e}},3454:function(e,t,r){"use strict";var n,i;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(i=r.g.process)?void 0:i.env)?r.g.process:r(7663)},1118:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(5417)}])},2537:function(e,t,r){"use strict";r.d(t,{H:function(){return sH},a:function(){return sK}});var n,i,s,a,o,l,u,h,c,d,f,p,g,m,y=r(5893),v=r(7294),w=r(1163),E=r(8346),_=r(5816),b=r(8463),T=r(3333),I=r(1683),S="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},C={};(function(){function e(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function t(e,t,r){r||(r=0);var n=Array(16);if("string"==typeof t)for(var i=0;16>i;++i)n[i]=t.charCodeAt(r++)|t.charCodeAt(r++)<<8|t.charCodeAt(r++)<<16|t.charCodeAt(r++)<<24;else for(i=0;16>i;++i)n[i]=t[r++]|t[r++]<<8|t[r++]<<16|t[r++]<<24;t=e.g[0],r=e.g[1],i=e.g[2];var s=e.g[3],a=t+(s^r&(i^s))+n[0]+3614090360&4294967295;a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[1]+3905402710&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[2]+606105819&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[3]+3250441966&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[4]+4118548399&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[5]+1200080426&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[6]+2821735955&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[7]+4249261313&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[8]+1770035416&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[9]+2336552879&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[10]+4294925233&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[11]+2304563134&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[12]+1804603682&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[13]+4254626195&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[14]+2792965006&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[15]+1236535329&4294967295,r=i+(a<<22&4294967295|a>>>10),a=t+(i^s&(r^i))+n[1]+4129170786&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[6]+3225465664&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[11]+643717713&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[0]+3921069994&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[5]+3593408605&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[10]+38016083&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[15]+3634488961&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[4]+3889429448&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[9]+568446438&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[14]+3275163606&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[3]+4107603335&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[8]+1163531501&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[13]+2850285829&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[2]+4243563512&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[7]+1735328473&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[12]+2368359562&4294967295,a=t+((r=i+(a<<20&4294967295|a>>>12))^i^s)+n[5]+4294588738&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[8]+2272392833&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[11]+1839030562&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[14]+4259657740&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[1]+2763975236&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[4]+1272893353&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[7]+4139469664&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[10]+3200236656&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[13]+681279174&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[0]+3936430074&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[3]+3572445317&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[6]+76029189&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[9]+3654602809&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[12]+3873151461&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[15]+530742520&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[2]+3299628645&4294967295,r=i+(a<<23&4294967295|a>>>9),a=t+(i^(r|~s))+n[0]+4096336452&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[7]+1126891415&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[14]+2878612391&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[5]+4237533241&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[12]+1700485571&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[3]+2399980690&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[10]+4293915773&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[1]+2240044497&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[8]+1873313359&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[15]+4264355552&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[6]+2734768916&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[13]+1309151649&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[4]+4149444226&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[11]+3174756917&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[2]+718787259&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(a<<21&4294967295|a>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function r(e,t){this.h=t;for(var r=[],n=!0,i=e.length-1;0<=i;i--){var s=0|e[i];n&&s==t||(r[i]=s,n=!1)}this.g=r}!function(e,t){function r(){}r.prototype=t.prototype,e.D=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.C=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(e,r){void 0===r&&(r=e.length);for(var n=r-this.blockSize,i=this.B,s=this.h,a=0;a<r;){if(0==s)for(;a<=n;)t(this,e,a),a+=this.blockSize;if("string"==typeof e){for(;a<r;)if(i[s++]=e.charCodeAt(a++),s==this.blockSize){t(this,i),s=0;break}}else for(;a<r;)if(i[s++]=e[a++],s==this.blockSize){t(this,i),s=0;break}}this.h=s,this.o+=r},e.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var r=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&r,r/=256;for(this.u(e),e=Array(16),t=r=0;4>t;++t)for(var n=0;32>n;n+=8)e[r++]=this.g[t]>>>n&255;return e};var s,a={};function o(e){return -128<=e&&128>e?Object.prototype.hasOwnProperty.call(a,e)?a[e]:a[e]=new r([0|e],0>e?-1:0):new r([0|e],0>e?-1:0)}function l(e){if(isNaN(e)||!isFinite(e))return u;if(0>e)return p(l(-e));for(var t=[],n=1,i=0;e>=n;i++)t[i]=e/n|0,n*=4294967296;return new r(t,0)}var u=o(0),h=o(1),c=o(16777216);function d(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function f(e){return -1==e.h}function p(e){for(var t=e.g.length,n=[],i=0;i<t;i++)n[i]=~e.g[i];return new r(n,~e.h).add(h)}function g(e,t){return e.add(p(t))}function m(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function y(e,t){this.g=e,this.h=t}function v(e,t){if(d(t))throw Error("division by zero");if(d(e))return new y(u,u);if(f(e))return t=v(p(e),t),new y(p(t.g),p(t.h));if(f(t))return t=v(e,p(t)),new y(p(t.g),t.h);if(30<e.g.length){if(f(e)||f(t))throw Error("slowDivide_ only works with positive integers.");for(var r=h,n=t;0>=n.l(e);)r=w(r),n=w(n);var i=E(r,1),s=E(n,1);for(n=E(n,2),r=E(r,2);!d(n);){var a=s.add(n);0>=a.l(e)&&(i=i.add(r),s=a),n=E(n,1),r=E(r,1)}return t=g(e,i.j(t)),new y(i,t)}for(i=u;0<=e.l(t);){for(n=48>=(n=Math.ceil(Math.log(r=Math.max(1,Math.floor(e.m()/t.m())))/Math.LN2))?1:Math.pow(2,n-48),a=(s=l(r)).j(t);f(a)||0<a.l(e);)r-=n,a=(s=l(r)).j(t);d(s)&&(s=h),i=i.add(s),e=g(e,a)}return new y(i,e)}function w(e){for(var t=e.g.length+1,n=[],i=0;i<t;i++)n[i]=e.i(i)<<1|e.i(i-1)>>>31;return new r(n,e.h)}function E(e,t){var n=t>>5;t%=32;for(var i=e.g.length-n,s=[],a=0;a<i;a++)s[a]=0<t?e.i(a+n)>>>t|e.i(a+n+1)<<32-t:e.i(a+n);return new r(s,e.h)}(s=r.prototype).m=function(){if(f(this))return-p(this).m();for(var e=0,t=1,r=0;r<this.g.length;r++){var n=this.i(r);e+=(0<=n?n:4294967296+n)*t,t*=4294967296}return e},s.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(d(this))return"0";if(f(this))return"-"+p(this).toString(e);for(var t=l(Math.pow(e,6)),r=this,n="";;){var i=v(r,t).g,s=((0<(r=g(r,i.j(t))).g.length?r.g[0]:r.h)>>>0).toString(e);if(d(r=i))return s+n;for(;6>s.length;)s="0"+s;n=s+n}},s.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},s.l=function(e){return f(e=g(this,e))?-1:d(e)?0:1},s.abs=function(){return f(this)?p(this):this},s.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0,s=0;s<=t;s++){var a=i+(65535&this.i(s))+(65535&e.i(s)),o=(a>>>16)+(this.i(s)>>>16)+(e.i(s)>>>16);i=o>>>16,a&=65535,o&=65535,n[s]=o<<16|a}return new r(n,-2147483648&n[n.length-1]?-1:0)},s.j=function(e){if(d(this)||d(e))return u;if(f(this))return f(e)?p(this).j(p(e)):p(p(this).j(e));if(f(e))return p(this.j(p(e)));if(0>this.l(c)&&0>e.l(c))return l(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(var s=0;s<e.g.length;s++){var a=this.i(i)>>>16,o=65535&this.i(i),h=e.i(s)>>>16,g=65535&e.i(s);n[2*i+2*s]+=o*g,m(n,2*i+2*s),n[2*i+2*s+1]+=a*g,m(n,2*i+2*s+1),n[2*i+2*s+1]+=o*h,m(n,2*i+2*s+1),n[2*i+2*s+2]+=a*h,m(n,2*i+2*s+2)}for(i=0;i<t;i++)n[i]=n[2*i+1]<<16|n[2*i];for(i=t;i<2*t;i++)n[i]=0;return new r(n,0)},s.A=function(e){return v(this,e).h},s.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)&e.i(i);return new r(n,this.h&e.h)},s.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)|e.i(i);return new r(n,this.h|e.h)},s.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)^e.i(i);return new r(n,this.h^e.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,i=C.Md5=e,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=l,r.fromString=function e(t,r){if(0==t.length)throw Error("number format error: empty string");if(2>(r=r||10)||36<r)throw Error("radix out of range: "+r);if("-"==t.charAt(0))return p(e(t.substring(1),r));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=l(Math.pow(r,8)),i=u,s=0;s<t.length;s+=8){var a=Math.min(8,t.length-s),o=parseInt(t.substring(s,s+a),r);8>a?(a=l(Math.pow(r,a)),i=i.j(a).add(l(o))):i=(i=i.j(n)).add(l(o))}return i},n=C.Integer=r}).apply(void 0!==S?S:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var A="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},k={};(function(){var e,t,r,n="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,r){return e==Array.prototype||e==Object.prototype||(e[t]=r.value),e},i=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof A&&A];for(var t=0;t<e.length;++t){var r=e[t];if(r&&r.Math==Math)return r}throw Error("Cannot find global object")}(this);!function(e,t){if(t)e:{var r=i;e=e.split(".");for(var s=0;s<e.length-1;s++){var a=e[s];if(!(a in r))break e;r=r[a]}(t=t(s=r[e=e[e.length-1]]))!=s&&null!=t&&n(r,e,{configurable:!0,writable:!0,value:t})}}("Array.prototype.values",function(e){return e||function(){var e,t,r,n;return e=this,e instanceof String&&(e+=""),t=0,r=!1,(n={next:function(){if(!r&&t<e.length)return{value:e[t++],done:!1};return r=!0,{done:!0,value:void 0}}})[Symbol.iterator]=function(){return n},n}});var f=f||{},p=this||self;function g(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function m(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function y(e,t,r){return e.call.apply(e.bind,arguments)}function v(e,t,r){if(!e)throw Error();if(2<arguments.length){var n=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,n),e.apply(t,r)}}return function(){return e.apply(t,arguments)}}function w(e,t,r){return(w=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?y:v).apply(null,arguments)}function E(e,t){var r=Array.prototype.slice.call(arguments,1);return function(){var t=r.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function _(e,t){function r(){}r.prototype=t.prototype,e.aa=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.Qb=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}}function b(e){let t=e.length;if(0<t){let r=Array(t);for(let n=0;n<t;n++)r[n]=e[n];return r}return[]}function T(e,t){for(let t=1;t<arguments.length;t++){let r=arguments[t];if(g(r)){let t=e.length||0,n=r.length||0;e.length=t+n;for(let i=0;i<n;i++)e[t+i]=r[i]}else e.push(r)}}function I(e){return/^[\s\xa0]*$/.test(e)}function S(){var e=p.navigator;return e&&(e=e.userAgent)?e:""}function C(e){return C[" "](e),e}C[" "]=function(){};var R=-1!=S().indexOf("Gecko")&&!(-1!=S().toLowerCase().indexOf("webkit")&&-1==S().indexOf("Edge"))&&!(-1!=S().indexOf("Trident")||-1!=S().indexOf("MSIE"))&&-1==S().indexOf("Edge");function N(e,t,r){for(let n in e)t.call(r,e[n],n,e)}function O(e){let t={};for(let r in e)t[r]=e[r];return t}let P="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function D(e,t){let r,n;for(let t=1;t<arguments.length;t++){for(r in n=arguments[t])e[r]=n[r];for(let t=0;t<P.length;t++)r=P[t],Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}}var L=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new x,e=>e.reset());class x{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let M,U=!1,V=new class{constructor(){this.h=this.g=null}add(e,t){let r=L.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}},F=()=>{let e=p.Promise.resolve(void 0);M=()=>{e.then(j)}};var j=()=>{let e;for(var t;e=null,V.g&&(e=V.g,V.g=V.g.next,V.g||(V.h=null),e.next=null),t=e;){try{t.h.call(t.g)}catch(e){!function(e){p.setTimeout(()=>{throw e},0)}(e)}L.j(t),100>L.h&&(L.h++,t.next=L.g,L.g=t)}U=!1};function B(){this.s=this.s,this.C=this.C}function z(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}B.prototype.s=!1,B.prototype.ma=function(){this.s||(this.s=!0,this.N())},B.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},z.prototype.h=function(){this.defaultPrevented=!0};var $=function(){if(!p.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{let e=()=>{};p.addEventListener("test",e,t),p.removeEventListener("test",e,t)}catch(e){}return e}();function q(e,t){if(z.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var r=this.type=e.type,n=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(R){e:{try{C(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==r?t=e.fromElement:"mouseout"==r&&(t=e.toElement);this.relatedTarget=t,n?(this.clientX=void 0!==n.clientX?n.clientX:n.pageX,this.clientY=void 0!==n.clientY?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:H[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&q.aa.h.call(this)}}_(q,z);var H={2:"touch",3:"pen",4:"mouse"};q.prototype.h=function(){q.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var K="closure_listenable_"+(1e6*Math.random()|0),G=0;function W(e,t,r,n,i){this.listener=e,this.proxy=null,this.src=t,this.type=r,this.capture=!!n,this.ha=i,this.key=++G,this.da=this.fa=!1}function Q(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function J(e){this.src=e,this.g={},this.h=0}function Y(e,t){var r=t.type;if(r in e.g){var n,i=e.g[r],s=Array.prototype.indexOf.call(i,t,void 0);(n=0<=s)&&Array.prototype.splice.call(i,s,1),n&&(Q(t),0==e.g[r].length&&(delete e.g[r],e.h--))}}function X(e,t,r,n){for(var i=0;i<e.length;++i){var s=e[i];if(!s.da&&s.listener==t&&!!r==s.capture&&s.ha==n)return i}return -1}J.prototype.add=function(e,t,r,n,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var a=X(e,t,n,i);return -1<a?(t=e[a],r||(t.fa=!1)):((t=new W(t,this.src,s,!!n,i)).fa=r,e.push(t)),t};var Z="closure_lm_"+(1e6*Math.random()|0),ee={};function et(e,t,r,n,i,s){if(!t)throw Error("Invalid event type");var a=m(i)?!!i.capture:!!i,o=es(e);if(o||(e[Z]=o=new J(e)),(r=o.add(t,r,n,a,s)).proxy)return r;if(n=function e(t){return ei.call(e.src,e.listener,t)},r.proxy=n,n.src=e,n.listener=r,e.addEventListener)$||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),n,i);else if(e.attachEvent)e.attachEvent(en(t.toString()),n);else if(e.addListener&&e.removeListener)e.addListener(n);else throw Error("addEventListener and attachEvent are unavailable.");return r}function er(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[K])Y(t.i,e);else{var r=e.type,n=e.proxy;t.removeEventListener?t.removeEventListener(r,n,e.capture):t.detachEvent?t.detachEvent(en(r),n):t.addListener&&t.removeListener&&t.removeListener(n),(r=es(t))?(Y(r,e),0==r.h&&(r.src=null,t[Z]=null)):Q(e)}}}function en(e){return e in ee?ee[e]:ee[e]="on"+e}function ei(e,t){if(e.da)e=!0;else{t=new q(t,this);var r=e.listener,n=e.ha||e.src;e.fa&&er(e),e=r.call(n,t)}return e}function es(e){return(e=e[Z])instanceof J?e:null}var ea="__closure_events_fn_"+(1e9*Math.random()>>>0);function eo(e){return"function"==typeof e?e:(e[ea]||(e[ea]=function(t){return e.handleEvent(t)}),e[ea])}function el(){B.call(this),this.i=new J(this),this.M=this,this.F=null}function eu(e,t){var r,n=e.F;if(n)for(r=[];n;n=n.F)r.push(n);if(e=e.M,n=t.type||t,"string"==typeof t)t=new z(t,e);else if(t instanceof z)t.target=t.target||e;else{var i=t;D(t=new z(n,e),i)}if(i=!0,r)for(var s=r.length-1;0<=s;s--){var a=t.g=r[s];i=eh(a,n,!0,t)&&i}if(i=eh(a=t.g=e,n,!0,t)&&i,i=eh(a,n,!1,t)&&i,r)for(s=0;s<r.length;s++)i=eh(a=t.g=r[s],n,!1,t)&&i}function eh(e,t,r,n){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var a=t[s];if(a&&!a.da&&a.capture==r){var o=a.listener,l=a.ha||a.src;a.fa&&Y(e.i,a),i=!1!==o.call(l,n)&&i}}return i&&!n.defaultPrevented}function ec(e,t,r){if("function"==typeof e)r&&(e=w(e,r));else if(e&&"function"==typeof e.handleEvent)e=w(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:p.setTimeout(e,t||0)}_(el,B),el.prototype[K]=!0,el.prototype.removeEventListener=function(e,t,r,n){!function e(t,r,n,i,s){if(Array.isArray(r))for(var a=0;a<r.length;a++)e(t,r[a],n,i,s);else(i=m(i)?!!i.capture:!!i,n=eo(n),t&&t[K])?(t=t.i,(r=String(r).toString())in t.g&&-1<(n=X(a=t.g[r],n,i,s))&&(Q(a[n]),Array.prototype.splice.call(a,n,1),0==a.length&&(delete t.g[r],t.h--))):t&&(t=es(t))&&(r=t.g[r.toString()],t=-1,r&&(t=X(r,n,i,s)),(n=-1<t?r[t]:null)&&er(n))}(this,e,t,r,n)},el.prototype.N=function(){if(el.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var r=t.g[e],n=0;n<r.length;n++)Q(r[n]);delete t.g[e],t.h--}}this.F=null},el.prototype.K=function(e,t,r,n){return this.i.add(String(e),t,!1,r,n)},el.prototype.L=function(e,t,r,n){return this.i.add(String(e),t,!0,r,n)};class ed extends B{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=ec(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.l);let r=t.h;t.h=null,t.m.apply(null,r)}(this)}N(){super.N(),this.g&&(p.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ef(e){B.call(this),this.h=e,this.g={}}_(ef,B);var ep=[];function eg(e){N(e.g,function(e,t){this.g.hasOwnProperty(t)&&er(e)},e),e.g={}}ef.prototype.N=function(){ef.aa.N.call(this),eg(this)},ef.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var em=p.JSON.stringify,ey=p.JSON.parse,ev=class{stringify(e){return p.JSON.stringify(e,void 0)}parse(e){return p.JSON.parse(e,void 0)}};function ew(){}function eE(e){return e.h||(e.h=e.i())}function e_(){}ew.prototype.h=null;var eb={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function eT(){z.call(this,"d")}function eI(){z.call(this,"c")}_(eT,z),_(eI,z);var eS={},eC=null;function eA(){return eC=eC||new el}function ek(e){z.call(this,eS.La,e)}function eR(e){let t=eA();eu(t,new ek(t))}function eN(e,t){z.call(this,eS.STAT_EVENT,e),this.stat=t}function eO(e){let t=eA();eu(t,new eN(t,e))}function eP(e,t){z.call(this,eS.Ma,e),this.size=t}function eD(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return p.setTimeout(function(){e()},t)}function eL(){this.g=!0}function ex(e,t,r,n){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var r=JSON.parse(t);if(r){for(e=0;e<r.length;e++)if(Array.isArray(r[e])){var n=r[e];if(!(2>n.length)){var i=n[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var a=1;a<i.length;a++)i[a]=""}}}}return em(r)}catch(e){return t}}(e,r)+(n?" "+n:"")})}eS.La="serverreachability",_(ek,z),eS.STAT_EVENT="statevent",_(eN,z),eS.Ma="timingevent",_(eP,z),eL.prototype.xa=function(){this.g=!1},eL.prototype.info=function(){};var eM={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eU={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function eV(){}function eF(e,t,r,n){this.j=e,this.i=t,this.l=r,this.R=n||1,this.U=new ef(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ej}function ej(){this.i=null,this.g="",this.h=!1}_(eV,ew),eV.prototype.g=function(){return new XMLHttpRequest},eV.prototype.i=function(){return{}},t=new eV;var eB={},ez={};function e$(e,t,r){e.L=1,e.v=ti(e7(t)),e.m=r,e.P=!0,eq(e,null)}function eq(e,t){e.F=Date.now(),eK(e),e.A=e7(e.v);var r=e.A,n=e.R;Array.isArray(n)||(n=[String(n)]),ty(r.i,"t",n),e.C=0,r=e.j.J,e.h=new ej,e.g=t4(e.j,r?t:null,!e.m),0<e.O&&(e.M=new ed(w(e.Y,e,e.g),e.O)),t=e.U,r=e.g,n=e.ca;var i="readystatechange";Array.isArray(i)||(i&&(ep[0]=i.toString()),i=ep);for(var s=0;s<i.length;s++){var a=function e(t,r,n,i,s){if(i&&i.once)return function e(t,r,n,i,s){if(Array.isArray(r)){for(var a=0;a<r.length;a++)e(t,r[a],n,i,s);return null}return n=eo(n),t&&t[K]?t.L(r,n,m(i)?!!i.capture:!!i,s):et(t,r,n,!0,i,s)}(t,r,n,i,s);if(Array.isArray(r)){for(var a=0;a<r.length;a++)e(t,r[a],n,i,s);return null}return n=eo(n),t&&t[K]?t.K(r,n,m(i)?!!i.capture:!!i,s):et(t,r,n,!1,i,s)}(r,i[s],n||t.handleEvent,!1,t.h||t);if(!a)break;t.g[a.key]=a}t=e.H?O(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),eR(),function(e,t,r,n,i,s){e.info(function(){if(e.g){if(s)for(var a="",o=s.split("&"),l=0;l<o.length;l++){var u=o[l].split("=");if(1<u.length){var h=u[0];u=u[1];var c=h.split("_");a=2<=c.length&&"type"==c[1]?a+(h+"=")+u+"&":a+(h+"=redacted&")}}else a=null}else a=s;return"XMLHTTP REQ ("+n+") [attempt "+i+"]: "+t+"\n"+r+"\n"+a})}(e.i,e.u,e.A,e.l,e.R,e.m)}function eH(e){return!!e.g&&"GET"==e.u&&2!=e.L&&e.j.Ca}function eK(e){e.S=Date.now()+e.I,eG(e,e.I)}function eG(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=eD(w(e.ba,e),t)}function eW(e){e.B&&(p.clearTimeout(e.B),e.B=null)}function eQ(e){0==e.j.G||e.J||tX(e.j,e)}function eJ(e){eW(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,eg(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function eY(e,t){try{var r=e.j;if(0!=r.G&&(r.g==e||e2(r.h,e))){if(!e.K&&e2(r.h,e)&&3==r.G){try{var n=r.Da.g.parse(t)}catch(e){n=null}if(Array.isArray(n)&&3==n.length){var i=n;if(0==i[0]){e:if(!r.u){if(r.g){if(r.g.F+3e3<e.F)tY(r),tB(r);else break e}tW(r),eO(18)}}else r.za=i[1],0<r.za-r.T&&37500>i[2]&&r.F&&0==r.v&&!r.C&&(r.C=eD(w(r.Za,r),6e3));if(1>=e1(r.h)&&r.ca){try{r.ca()}catch(e){}r.ca=void 0}}else t0(r,11)}else if((e.K||r.g==e)&&tY(r),!I(t))for(i=r.Da.g.parse(t),t=0;t<i.length;t++){let o=i[t];if(r.T=o[0],o=o[1],2==r.G){if("c"==o[0]){r.K=o[1],r.ia=o[2];let t=o[3];null!=t&&(r.la=t,r.j.info("VER="+r.la));let i=o[4];null!=i&&(r.Aa=i,r.j.info("SVER="+r.Aa));let l=o[5];null!=l&&"number"==typeof l&&0<l&&(n=1.5*l,r.L=n,r.j.info("backChannelRequestTimeoutMs_="+n)),n=r;let u=e.g;if(u){let e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=n.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(e4(s,s.h),s.h=null))}if(n.D){let e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(n.ya=e,tn(n.I,n.D,e))}}if(r.G=3,r.l&&r.l.ua(),r.ba&&(r.R=Date.now()-e.F,r.j.info("Handshake RTT: "+r.R+"ms")),(n=r).qa=t2(n,n.J?n.ia:null,n.W),e.K){e9(n.h,e);var a=n.L;a&&(e.I=a),e.B&&(eW(e),eK(e)),n.g=e}else tG(n);0<r.i.length&&t$(r)}else"stop"!=o[0]&&"close"!=o[0]||t0(r,7)}else 3==r.G&&("stop"==o[0]||"close"==o[0]?"stop"==o[0]?t0(r,7):tj(r):"noop"!=o[0]&&r.l&&r.l.ta(o),r.v=0)}}eR(4)}catch(e){}}eF.prototype.ca=function(e){e=e.target;let t=this.M;t&&3==tM(e)?t.j():this.Y(e)},eF.prototype.Y=function(e){try{if(e==this.g)e:{let c=tM(this.g);var t=this.g.Ba();let d=this.g.Z();if(!(3>c)&&(3!=c||this.g&&(this.h.h||this.g.oa()||tU(this.g)))){this.J||4!=c||7==t||(8==t||0>=d?eR(3):eR(2)),eW(this);var r=this.g.Z();this.X=r;t:if(eH(this)){var n=tU(this.g);e="";var i=n.length,s=4==tM(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){eJ(this),eQ(this);var a="";break t}this.h.i=new p.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(n[t],{stream:!(s&&t==i-1)});n.length=0,this.h.g+=e,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==r,function(e,t,r,n,i,s,a){e.info(function(){return"XMLHTTP RESP ("+n+") [ attempt "+i+"]: "+t+"\n"+r+"\n"+s+" "+a})}(this.i,this.u,this.A,this.l,this.R,c,r),this.o){if(this.T&&!this.K){t:{if(this.g){var o,l=this.g;if((o=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(o)){var u=o;break t}}u=null}if(r=u)ex(this.i,this.l,r,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,eY(this,r);else{this.o=!1,this.s=3,eO(12),eJ(this),eQ(this);break e}}if(this.P){let e;for(r=!0;!this.J&&this.C<a.length;)if((e=function(e,t){var r=e.C,n=t.indexOf("\n",r);return -1==n?ez:isNaN(r=Number(t.substring(r,n)))?eB:(n+=1)+r>t.length?ez:(t=t.slice(n,n+r),e.C=n+r,t)}(this,a))==ez){4==c&&(this.s=4,eO(14),r=!1),ex(this.i,this.l,null,"[Incomplete Response]");break}else if(e==eB){this.s=4,eO(15),ex(this.i,this.l,a,"[Invalid Chunk]"),r=!1;break}else ex(this.i,this.l,e,null),eY(this,e);if(eH(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=a.length||this.h.h||(this.s=1,eO(16),r=!1),this.o=this.o&&r,r){if(0<a.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),tQ(h),h.M=!0,eO(11))}}else ex(this.i,this.l,a,"[Invalid Chunked Response]"),eJ(this),eQ(this)}else ex(this.i,this.l,a,null),eY(this,a);4==c&&eJ(this),this.o&&!this.J&&(4==c?tX(this.j,this):(this.o=!1,eK(this)))}else(function(e){let t={};e=(e.g&&2<=tM(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let n=0;n<e.length;n++){if(I(e[n]))continue;var r=function(e){var t=1;e=e.split(":");let r=[];for(;0<t&&e.length;)r.push(e.shift()),t--;return e.length&&r.push(e.join(":")),r}(e[n]);let i=r[0];if("string"!=typeof(r=r[1]))continue;r=r.trim();let s=t[i]||[];t[i]=s,s.push(r)}!function(e,t){for(let r in e)t.call(void 0,e[r],r,e)}(t,function(e){return e.join(", ")})})(this.g),400==r&&0<a.indexOf("Unknown SID")?(this.s=3,eO(12)):(this.s=0,eO(13)),eJ(this),eQ(this)}}}catch(e){}finally{}},eF.prototype.cancel=function(){this.J=!0,eJ(this)},eF.prototype.ba=function(){this.B=null;let e=Date.now();0<=e-this.S?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.A),2!=this.L&&(eR(),eO(17)),eJ(this),this.s=2,eQ(this)):eG(this,this.S-e)};var eX=class{constructor(e,t){this.g=e,this.map=t}};function eZ(e){this.l=e||10,e=p.PerformanceNavigationTiming?0<(e=p.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(p.chrome&&p.chrome.loadTimes&&p.chrome.loadTimes()&&p.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function e0(e){return!!e.h||!!e.g&&e.g.size>=e.j}function e1(e){return e.h?1:e.g?e.g.size:0}function e2(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function e4(e,t){e.g?e.g.add(t):e.h=t}function e9(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function e6(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let r of e.g.values())t=t.concat(r.D);return t}return b(e.i)}function e5(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(g(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var r=function(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(g(e)||"string"==typeof e){var t=[];e=e.length;for(var r=0;r<e;r++)t.push(r);return t}for(let n in t=[],r=0,e)t[r++]=n;return t}}}(e),n=function(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(g(e)){for(var t=[],r=e.length,n=0;n<r;n++)t.push(e[n]);return t}for(n in t=[],r=0,e)t[r++]=e[n];return t}(e),i=n.length,s=0;s<i;s++)t.call(void 0,n[s],r&&r[s],e)}eZ.prototype.cancel=function(){if(this.i=e6(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var e3=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function e8(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof e8){this.h=e.h,te(this,e.j),this.o=e.o,this.g=e.g,tt(this,e.s),this.l=e.l;var t=e.i,r=new tf;r.i=t.i,t.g&&(r.g=new Map(t.g),r.h=t.h),tr(this,r),this.m=e.m}else e&&(t=String(e).match(e3))?(this.h=!1,te(this,t[1]||"",!0),this.o=ts(t[2]||""),this.g=ts(t[3]||"",!0),tt(this,t[4]),this.l=ts(t[5]||"",!0),tr(this,t[6]||"",!0),this.m=ts(t[7]||"")):(this.h=!1,this.i=new tf(null,this.h))}function e7(e){return new e8(e)}function te(e,t,r){e.j=r?ts(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function tt(e,t){if(t){if(isNaN(t=Number(t))||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function tr(e,t,r){var n,i;t instanceof tf?(e.i=t,n=e.i,(i=e.h)&&!n.j&&(tp(n),n.i=null,n.g.forEach(function(e,t){var r=t.toLowerCase();t!=r&&(tg(this,t),ty(this,r,e))},n)),n.j=i):(r||(t=ta(t,tc)),e.i=new tf(t,e.h))}function tn(e,t,r){e.i.set(t,r)}function ti(e){return tn(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function ts(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ta(e,t,r){return"string"==typeof e?(e=encodeURI(e).replace(t,to),r&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function to(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}e8.prototype.toString=function(){var e=[],t=this.j;t&&e.push(ta(t,tl,!0),":");var r=this.g;return(r||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(ta(t,tl,!0),"@"),e.push(encodeURIComponent(String(r)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(r=this.s)&&e.push(":",String(r))),(r=this.l)&&(this.g&&"/"!=r.charAt(0)&&e.push("/"),e.push(ta(r,"/"==r.charAt(0)?th:tu,!0))),(r=this.i.toString())&&e.push("?",r),(r=this.m)&&e.push("#",ta(r,td)),e.join("")};var tl=/[#\/\?@]/g,tu=/[#\?:]/g,th=/[#\?]/g,tc=/[#\?@]/g,td=/#/g;function tf(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function tp(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var r=0;r<e.length;r++){var n=e[r].indexOf("="),i=null;if(0<=n){var s=e[r].substring(0,n);i=e[r].substring(n+1)}else s=e[r];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,r){e.add(decodeURIComponent(t.replace(/\+/g," ")),r)}))}function tg(e,t){tp(e),t=tv(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tm(e,t){return tp(e),t=tv(e,t),e.g.has(t)}function ty(e,t,r){tg(e,t),0<r.length&&(e.i=null,e.g.set(tv(e,t),b(r)),e.h+=r.length)}function tv(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function tw(e,t,r,n,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),n(r)}catch(e){}}function tE(){this.g=new ev}function t_(e){this.l=e.Ub||null,this.j=e.eb||!1}function tb(e,t){el.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function tT(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function tI(e){e.readyState=4,e.l=null,e.j=null,e.v=null,tS(e)}function tS(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function tC(e){let t="";return N(e,function(e,r){t+=r+":"+e+"\r\n"}),t}function tA(e,t,r){e:{for(n in r){var n=!1;break e}n=!0}n||(r=tC(r),"string"==typeof e?null!=r&&encodeURIComponent(String(r)):tn(e,t,r))}function tk(e){el.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(r=tf.prototype).add=function(e,t){tp(this),this.i=null,e=tv(this,e);var r=this.g.get(e);return r||this.g.set(e,r=[]),r.push(t),this.h+=1,this},r.forEach=function(e,t){tp(this),this.g.forEach(function(r,n){r.forEach(function(r){e.call(t,r,n,this)},this)},this)},r.na=function(){tp(this);let e=Array.from(this.g.values()),t=Array.from(this.g.keys()),r=[];for(let n=0;n<t.length;n++){let i=e[n];for(let e=0;e<i.length;e++)r.push(t[n])}return r},r.V=function(e){tp(this);let t=[];if("string"==typeof e)tm(this,e)&&(t=t.concat(this.g.get(tv(this,e))));else{e=Array.from(this.g.values());for(let r=0;r<e.length;r++)t=t.concat(e[r])}return t},r.set=function(e,t){return tp(this),this.i=null,tm(this,e=tv(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},r.get=function(e,t){return e&&0<(e=this.V(e)).length?String(e[0]):t},r.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(var r=0;r<t.length;r++){var n=t[r];let s=encodeURIComponent(String(n)),a=this.V(n);for(n=0;n<a.length;n++){var i=s;""!==a[n]&&(i+="="+encodeURIComponent(String(a[n]))),e.push(i)}}return this.i=e.join("&")},_(t_,ew),t_.prototype.g=function(){return new tb(this.l,this.j)},t_.prototype.i=(e={},function(){return e}),_(tb,el),(r=tb.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,tS(this)},r.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;let t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||p).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,tI(this)),this.readyState=0},r.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,tS(this)),this.g&&(this.readyState=3,tS(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==p.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;tT(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))}},r.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?tI(this):tS(this),3==this.readyState&&tT(this)}},r.Ra=function(e){this.g&&(this.response=this.responseText=e,tI(this))},r.Qa=function(e){this.g&&(this.response=e,tI(this))},r.ga=function(){this.g&&tI(this)},r.setRequestHeader=function(e,t){this.u.append(e,t)},r.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var r=t.next();!r.done;)e.push((r=r.value)[0]+": "+r[1]),r=t.next();return e.join("\r\n")},Object.defineProperty(tb.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),_(tk,el);var tR=/^https?$/i,tN=["POST","PUT"];function tO(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,tP(e),tL(e)}function tP(e){e.A||(e.A=!0,eu(e,"complete"),eu(e,"error"))}function tD(e){if(e.h&&void 0!==f&&(!e.v[1]||4!=tM(e)||2!=e.Z())){if(e.u&&4==tM(e))ec(e.Ea,0,e);else if(eu(e,"readystatechange"),4==tM(e)){e.h=!1;try{let a=e.Z();switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t,r,n=!0;break;default:n=!1}if(!(t=n)){if(r=0===a){var i=String(e.D).match(e3)[1]||null;!i&&p.self&&p.self.location&&(i=p.self.location.protocol.slice(0,-1)),r=!tR.test(i?i.toLowerCase():"")}t=r}if(t)eu(e,"complete"),eu(e,"success");else{e.m=6;try{var s=2<tM(e)?e.g.statusText:""}catch(e){s=""}e.l=s+" ["+e.Z()+"]",tP(e)}}finally{tL(e)}}}}function tL(e,t){if(e.g){tx(e);let r=e.g,n=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||eu(e,"ready");try{r.onreadystatechange=n}catch(e){}}}function tx(e){e.I&&(p.clearTimeout(e.I),e.I=null)}function tM(e){return e.g?e.g.readyState:0}function tU(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function tV(e,t,r){return r&&r.internalChannelParams&&r.internalChannelParams[e]||t}function tF(e){this.Aa=0,this.i=[],this.j=new eL,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=tV("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=tV("baseRetryDelayMs",5e3,e),this.cb=tV("retryDelaySeedMs",1e4,e),this.Wa=tV("forwardChannelMaxRetries",2,e),this.wa=tV("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new eZ(e&&e.concurrentRequestLimit),this.Da=new tE,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function tj(e){if(tz(e),3==e.G){var t=e.U++,r=e7(e.I);if(tn(r,"SID",e.K),tn(r,"RID",t),tn(r,"TYPE","terminate"),tH(e,r),(t=new eF(e,e.j,t)).L=2,t.v=ti(e7(r)),r=!1,p.navigator&&p.navigator.sendBeacon)try{r=p.navigator.sendBeacon(t.v.toString(),"")}catch(e){}!r&&p.Image&&((new Image).src=t.v,r=!0),r||(t.g=t4(t.j,null),t.g.ea(t.v)),t.F=Date.now(),eK(t)}t1(e)}function tB(e){e.g&&(tQ(e),e.g.cancel(),e.g=null)}function tz(e){tB(e),e.u&&(p.clearTimeout(e.u),e.u=null),tY(e),e.h.cancel(),e.s&&("number"==typeof e.s&&p.clearTimeout(e.s),e.s=null)}function t$(e){if(!e0(e.h)&&!e.s){e.s=!0;var t=e.Ga;M||F(),U||(M(),U=!0),V.add(t,e),e.B=0}}function tq(e,t){var r;r=t?t.l:e.U++;let n=e7(e.I);tn(n,"SID",e.K),tn(n,"RID",r),tn(n,"AID",e.T),tH(e,n),e.m&&e.o&&tA(n,e.m,e.o),r=new eF(e,e.j,r,e.B+1),null===e.m&&(r.H=e.o),t&&(e.i=t.D.concat(e.i)),t=tK(e,r,1e3),r.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),e4(e.h,r),e$(r,n,t)}function tH(e,t){e.H&&N(e.H,function(e,r){tn(t,r,e)}),e.l&&e5({},function(e,r){tn(t,r,e)})}function tK(e,t,r){r=Math.min(e.i.length,r);var n=e.l?w(e.l.Na,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){let e=["count="+r];-1==t?0<r?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let a=0;a<r;a++){let r=i[a].g,o=i[a].map;if(0>(r-=t))t=Math.max(0,i[a].g-100),s=!1;else try{!function(e,t,r){let n=r||"";try{e5(e,function(e,r){let i=e;m(e)&&(i=em(e)),t.push(n+r+"="+encodeURIComponent(i))})}catch(e){throw t.push(n+"type="+encodeURIComponent("_badmap")),e}}(o,e,"req"+r+"_")}catch(e){n&&n(o)}}if(s){n=e.join("&");break e}}}return e=e.i.splice(0,r),t.D=e,n}function tG(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;M||F(),U||(M(),U=!0),V.add(t,e),e.v=0}}function tW(e){return!e.g&&!e.u&&!(3<=e.v)&&(e.Y++,e.u=eD(w(e.Fa,e),tZ(e,e.v)),e.v++,!0)}function tQ(e){null!=e.A&&(p.clearTimeout(e.A),e.A=null)}function tJ(e){e.g=new eF(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=e7(e.qa);tn(t,"RID","rpc"),tn(t,"SID",e.K),tn(t,"AID",e.T),tn(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&tn(t,"TO",e.ja),tn(t,"TYPE","xmlhttp"),tH(e,t),e.m&&e.o&&tA(t,e.m,e.o),e.L&&(e.g.I=e.L);var r=e.g;e=e.ia,r.L=1,r.v=ti(e7(t)),r.m=null,r.P=!0,eq(r,e)}function tY(e){null!=e.C&&(p.clearTimeout(e.C),e.C=null)}function tX(e,t){var r=null;if(e.g==t){tY(e),tQ(e),e.g=null;var n=2}else{if(!e2(e.h,t))return;r=t.D,e9(e.h,t),n=1}if(0!=e.G){if(t.o){if(1==n){r=t.m?t.m.length:0,t=Date.now()-t.F;var i,s=e.B;eu(n=eA(),new eP(n,r)),t$(e)}else tG(e)}else if(3==(s=t.s)||0==s&&0<t.X||!(1==n&&(i=t,!(e1(e.h)>=e.h.j-(e.s?1:0))&&(e.s?(e.i=i.D.concat(e.i),!0):1!=e.G&&2!=e.G&&!(e.B>=(e.Va?0:e.Wa))&&(e.s=eD(w(e.Ga,e,i),tZ(e,e.B)),e.B++,!0)))||2==n&&tW(e)))switch(r&&0<r.length&&((t=e.h).i=t.i.concat(r)),s){case 1:t0(e,5);break;case 4:t0(e,10);break;case 3:t0(e,6);break;default:t0(e,2)}}}function tZ(e,t){let r=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(r*=2),r*t}function t0(e,t){if(e.j.info("Error code "+t),2==t){var r=w(e.fb,e),n=e.Xa;let t=!n;n=new e8(n||"//www.google.com/images/cleardot.gif"),p.location&&"http"==p.location.protocol||te(n,"https"),ti(n),t?function(e,t){let r=new eL;if(p.Image){let n=new Image;n.onload=E(tw,r,"TestLoadImage: loaded",!0,t,n),n.onerror=E(tw,r,"TestLoadImage: error",!1,t,n),n.onabort=E(tw,r,"TestLoadImage: abort",!1,t,n),n.ontimeout=E(tw,r,"TestLoadImage: timeout",!1,t,n),p.setTimeout(function(){n.ontimeout&&n.ontimeout()},1e4),n.src=e}else t(!1)}(n.toString(),r):function(e,t){let r=new eL,n=new AbortController,i=setTimeout(()=>{n.abort(),tw(r,"TestPingServer: timeout",!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(i),e.ok?tw(r,"TestPingServer: ok",!0,t):tw(r,"TestPingServer: server error",!1,t)}).catch(()=>{clearTimeout(i),tw(r,"TestPingServer: error",!1,t)})}(n.toString(),r)}else eO(2);e.G=0,e.l&&e.l.sa(t),t1(e),tz(e)}function t1(e){if(e.G=0,e.ka=[],e.l){let t=e6(e.h);(0!=t.length||0!=e.i.length)&&(T(e.ka,t),T(e.ka,e.i),e.h.i.length=0,b(e.i),e.i.length=0),e.l.ra()}}function t2(e,t,r){var n=r instanceof e8?e7(r):new e8(r);if(""!=n.g)t&&(n.g=t+"."+n.g),tt(n,n.s);else{var i=p.location;n=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new e8(null);n&&te(s,n),t&&(s.g=t),i&&tt(s,i),r&&(s.l=r),n=s}return r=e.D,t=e.ya,r&&t&&tn(n,r,t),tn(n,"VER",e.la),tH(e,n),n}function t4(e,t,r){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new tk(e.Ca&&!e.pa?new t_({eb:r}):e.pa)).Ha(e.J),t}function t9(){}function t6(){}function t5(e,t){el.call(this),this.g=new tF(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!I(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!I(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new t7(this)}function t3(e){eT.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(let r in t){e=r;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function t8(){eI.call(this),this.status=1}function t7(e){this.g=e}(r=tk.prototype).Ha=function(e){this.J=e},r.ea=function(e,r,n,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);r=r?r.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():t.g(),this.v=this.o?eE(this.o):eE(t),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(r,String(e),!0),this.B=!1}catch(e){tO(this,e);return}if(e=n||"",n=new Map(this.headers),i){if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)n.set(s,i[s]);else if("function"==typeof i.keys&&"function"==typeof i.get)for(let e of i.keys())n.set(e,i.get(e));else throw Error("Unknown input type for opt_headers: "+String(i))}for(let[t,a]of(i=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=p.FormData&&e instanceof p.FormData,!(0<=Array.prototype.indexOf.call(tN,r,void 0))||i||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),n))this.g.setRequestHeader(t,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{tx(this),this.u=!0,this.g.send(e),this.u=!1}catch(e){tO(this,e)}},r.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,eu(this,"complete"),eu(this,"abort"),tL(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),tL(this,!0)),tk.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?tD(this):this.bb())},r.bb=function(){tD(this)},r.isActive=function(){return!!this.g},r.Z=function(){try{return 2<tM(this)?this.g.status:-1}catch(e){return -1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},r.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),ey(t)}},r.Ba=function(){return this.m},r.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(r=tF.prototype).la=8,r.G=1,r.connect=function(e,t,r,n){eO(0),this.W=e,this.H=t||{},r&&void 0!==n&&(this.H.OSID=r,this.H.OAID=n),this.F=this.X,this.I=t2(this,null,this.W),t$(this)},r.Ga=function(e){if(this.s){if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;let i=new eF(this,this.j,e),s=this.o;if(this.S&&(s?D(s=O(s),this.S):s=this.S),null!==this.m||this.O||(i.H=s,s=null),this.P)e:{for(var t=0,r=0;r<this.i.length;r++){t:{var n=this.i[r];if("__data__"in n.map&&"string"==typeof(n=n.map.__data__)){n=n.length;break t}n=void 0}if(void 0===n)break;if(4096<(t+=n)){t=r;break e}if(4096===t||r===this.i.length-1){t=r+1;break e}}t=1e3}else t=1e3;t=tK(this,i,t),tn(r=e7(this.I),"RID",e),tn(r,"CVER",22),this.D&&tn(r,"X-HTTP-Session-Id",this.D),tH(this,r),s&&(this.O?t="headers="+encodeURIComponent(String(tC(s)))+"&"+t:this.m&&tA(r,this.m,s)),e4(this.h,i),this.Ua&&tn(r,"TYPE","init"),this.P?(tn(r,"$req",t),tn(r,"SID","null"),i.T=!0,e$(i,r,null)):e$(i,r,t),this.G=2}}else 3==this.G&&(e?tq(this,e):0==this.i.length||e0(this.h)||tq(this))}},r.Fa=function(){if(this.u=null,tJ(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=eD(w(this.ab,this),e)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,eO(10),tB(this),tJ(this))},r.Za=function(){null!=this.C&&(this.C=null,tB(this),tW(this),eO(19))},r.fb=function(e){e?(this.j.info("Successfully pinged google.com"),eO(2)):(this.j.info("Failed to ping google.com"),eO(1))},r.isActive=function(){return!!this.l&&this.l.isActive(this)},(r=t9.prototype).ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){},t6.prototype.g=function(e,t){return new t5(e,t)},_(t5,el),t5.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},t5.prototype.close=function(){tj(this.g)},t5.prototype.o=function(e){var t=this.g;if("string"==typeof e){var r={};r.__data__=e,e=r}else this.u&&((r={}).__data__=em(e),e=r);t.i.push(new eX(t.Ya++,e)),3==t.G&&t$(t)},t5.prototype.N=function(){this.g.l=null,delete this.j,tj(this.g),delete this.g,t5.aa.N.call(this)},_(t3,eT),_(t8,eI),_(t7,t9),t7.prototype.ua=function(){eu(this.g,"a")},t7.prototype.ta=function(e){eu(this.g,new t3(e))},t7.prototype.sa=function(e){eu(this.g,new t8)},t7.prototype.ra=function(){eu(this.g,"b")},t6.prototype.createWebChannel=t6.prototype.g,t5.prototype.send=t5.prototype.o,t5.prototype.open=t5.prototype.m,t5.prototype.close=t5.prototype.close,d=k.createWebChannelTransport=function(){return new t6},c=k.getStatEventTarget=function(){return eA()},h=k.Event=eS,u=k.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},eM.NO_ERROR=0,eM.TIMEOUT=8,eM.HTTP_ERROR=6,l=k.ErrorCode=eM,eU.COMPLETE="complete",o=k.EventType=eU,e_.EventType=eb,eb.OPEN="a",eb.CLOSE="b",eb.ERROR="c",eb.MESSAGE="d",el.prototype.listen=el.prototype.K,a=k.WebChannel=e_,k.FetchXmlHttpFactory=t_,tk.prototype.listenOnce=tk.prototype.L,tk.prototype.getLastError=tk.prototype.Ka,tk.prototype.getLastErrorCode=tk.prototype.Ba,tk.prototype.getStatus=tk.prototype.Z,tk.prototype.getResponseJson=tk.prototype.Oa,tk.prototype.getResponseText=tk.prototype.oa,tk.prototype.send=tk.prototype.ea,tk.prototype.setWithCredentials=tk.prototype.Ha,s=k.XhrIo=tk}).apply(void 0!==A?A:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{}),r(3454);var R=r(1876).Buffer;let N="@firebase/firestore",O="4.7.11";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}P.UNAUTHENTICATED=new P(null),P.GOOGLE_CREDENTIALS=new P("google-credentials-uid"),P.FIRST_PARTY=new P("first-party-uid"),P.MOCK_USER=new P("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let D="11.6.1",L=new T.Yd("@firebase/firestore");function x(){return L.logLevel}function M(e,...t){if(L.logLevel<=T.in.DEBUG){let r=t.map(F);L.debug(`Firestore (${D}): ${e}`,...r)}}function U(e,...t){if(L.logLevel<=T.in.ERROR){let r=t.map(F);L.error(`Firestore (${D}): ${e}`,...r)}}function V(e,...t){if(L.logLevel<=T.in.WARN){let r=t.map(F);L.warn(`Firestore (${D}): ${e}`,...r)}}function F(e){if("string"==typeof e)return e;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e,t,r){let n="Unexpected state";"string"==typeof t?n=t:r=t,B(e,n,r)}function B(e,t,r){let n=`FIRESTORE (${D}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==r)try{n+=" CONTEXT: "+JSON.stringify(r)}catch(e){n+=" CONTEXT: "+r}throw U(n),Error(n)}function z(e,t,r,n){let i="Unexpected state";"string"==typeof r?i=r:n=r,e||B(t,i,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends I.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class G{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(P.UNAUTHENTICATED))}shutdown(){}}class W{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Q{constructor(e){this.t=e,this.currentUser=P.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){z(void 0===this.o,42304);let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),i=new H;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new H,e.enqueueRetryable(()=>n(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new H)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(z("string"==typeof t.accessToken,31837,{l:t}),new K(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return z(null===e||"string"==typeof e,2055,{h:e}),new P(e)}}class J{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=P.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Y{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new J(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(P.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class X{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Z{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,_.rh)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){z(void 0===this.o,3512);let r=e=>{null!=e.error&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let r=e.token!==this.m;return this.m=e.token,M("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};let n=e=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.V.getImmediate({optional:!0});e?n(e):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new X(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(z("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new X(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{static newId(){let e=62*Math.floor(256/62),t="";for(;t.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let t=0;t<e;t++)r[t]=Math.floor(256*Math.random());return r}(40);for(let n=0;n<r.length;++n)t.length<20&&r[n]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(r[n]%62))}return t}}function er(e,t){return e<t?-1:e>t?1:0}function en(e,t){let r=0;for(;r<e.length&&r<t.length;){let n=e.codePointAt(r),i=t.codePointAt(r);if(n!==i){if(n<128&&i<128)return er(n,i);{let s=ee(),a=function(e,t){for(let r=0;r<e.length&&r<t.length;++r)if(e[r]!==t[r])return er(e[r],t[r]);return er(e.length,t.length)}(s.encode(ei(e,r)),s.encode(ei(t,r)));return 0!==a?a:er(n,i)}}r+=n>65535?2:1}return er(e.length,t.length)}function ei(e,t){return e.codePointAt(t)>65535?e.substring(t,t+2):e.substring(t,t+1)}function es(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}class ea{static now(){return ea.fromMillis(Date.now())}static fromDate(e){return ea.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*1e6);return new ea(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new q($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new q($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?er(this.nanoseconds,e.nanoseconds):er(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{static fromTimestamp(e){return new eo(e)}static min(){return new eo(new ea(0,0))}static max(){return new eo(new ea(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let el="__name__";class eu{constructor(e,t,r){void 0===t?t=0:t>e.length&&j(637,{offset:t,range:e.length}),void 0===r?r=e.length-t:r>e.length-t&&j(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===eu.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof eu?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=eu.compareSegments(e.get(n),t.get(n));if(0!==r)return r}return er(e.length,t.length)}static compareSegments(e,t){let r=eu.isNumericId(e),n=eu.isNumericId(t);return r&&!n?-1:!r&&n?1:r&&n?eu.extractNumericId(e).compare(eu.extractNumericId(t)):en(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return n.fromString(e.substring(4,e.length-2))}}class eh extends eu{construct(e,t,r){return new eh(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new q($.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new eh(t)}static emptyPath(){return new eh([])}}let ec=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ed extends eu{construct(e,t,r){return new ed(e,t,r)}static isValidIdentifier(e){return ec.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ed.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===el}static keyField(){return new ed([el])}static fromServerFormat(e){let t=[],r="",n=0,i=()=>{if(0===r.length)throw new q($.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},s=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new q($.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new q($.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?s=!s:"."!==t||s?r+=t:i(),n++}if(i(),s)throw new q($.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ed(t)}static emptyPath(){return new ed([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e){this.path=e}static fromPath(e){return new ef(eh.fromString(e))}static fromName(e){return new ef(eh.fromString(e).popFirst(5))}static empty(){return new ef(eh.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===eh.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return eh.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ef(new eh(e.slice()))}}class ep{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ep(eo.min(),ef.empty(),-1)}static max(){return new ep(eo.max(),ef.empty(),-1)}}class eg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function em(e){if(e.code!==$.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ey((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof ey?t:ey.resolve(t)}catch(e){return ey.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ey.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ey.reject(t)}static resolve(e){return new ey((t,r)=>{t(e)})}static reject(e){return new ey((t,r)=>{r(e)})}static waitFor(e){return new ey((t,r)=>{let n=0,i=0,s=!1;e.forEach(e=>{++n,e.next(()=>{++i,s&&i===n&&t()},e=>r(e))}),s=!0,i===n&&t()})}static or(e){let t=ey.resolve(!1);for(let r of e)t=t.next(e=>e?ey.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new ey((r,n)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&r(s)},e=>n(e))}})}static doWhile(e,t){return new ey((r,n)=>{let i=()=>{!0===e()?t().next(()=>{i()},n):r()};i()})}}function ev(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ue(e),this.ce=e=>t.writeSequenceNumber(e))}ue(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ce&&this.ce(e),e}}function eE(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e_(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function eb(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function eT(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}ew.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,t){this.comparator=e,this.root=t||eC.EMPTY}insert(e,t){return new eI(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,eC.BLACK,null,null))}remove(e){return new eI(this.comparator,this.root.remove(e,this.comparator).copy(null,null,eC.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eS(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eS(this.root,e,this.comparator,!1)}getReverseIterator(){return new eS(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eS(this.root,e,this.comparator,!0)}}class eS{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&n&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class eC{constructor(e,t,r,n,i){this.key=e,this.value=t,this.color=null!=r?r:eC.RED,this.left=null!=n?n:eC.EMPTY,this.right=null!=i?i:eC.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,i){return new eC(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,i=r(e,n.key);return(n=i<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===i?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return eC.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return eC.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,eC.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,eC.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw j(43730,{key:this.key,value:this.value});if(this.right.isRed())throw j(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw j(27949);return e+(this.isRed()?0:1)}}eC.EMPTY=null,eC.RED=!0,eC.BLACK=!1,eC.EMPTY=new class{constructor(){this.size=0}get key(){throw j(57766)}get value(){throw j(16141)}get color(){throw j(16727)}get left(){throw j(29726)}get right(){throw j(36894)}copy(e,t,r,n,i){return this}insert(e,t,r){return new eC(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e){this.comparator=e,this.data=new eI(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ek(this.data.getIterator())}getIteratorFrom(e){return new ek(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof eA)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new eA(this.comparator);return t.data=e,t}}class ek{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eR{constructor(e){this.fields=e,e.sort(ed.comparator)}static empty(){return new eR([])}unionWith(e){let t=new eA(ed.comparator);for(let e of this.fields)t=t.add(e);for(let r of e)t=t.add(r);return new eR(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return es(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eN extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eO{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new eN("Invalid base64 string: "+e):e}}(e);return new eO(t)}static fromUint8Array(e){let t=function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e);return new eO(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return er(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}eO.EMPTY_BYTE_STRING=new eO("");let eP=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function eD(e){if(z(!!e,39018),"string"==typeof e){let t=0,r=eP.exec(e);if(z(!!r,46558,{timestamp:e}),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}let n=new Date(e);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:eL(e.seconds),nanos:eL(e.nanos)}}function eL(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function ex(e){return"string"==typeof e?eO.fromBase64String(e):eO.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eM="server_timestamp",eU="__type__",eV="__previous_value__",eF="__local_write_time__";function ej(e){var t,r;return(null===(r=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{})[eU])||void 0===r?void 0:r.stringValue)===eM}function eB(e){let t=e.mapValue.fields[eV];return ej(t)?eB(t):t}function ez(e){let t=eD(e.mapValue.fields[eF].timestampValue);return new ea(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e${constructor(e,t,r,n,i,s,a,o,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l}}let eq="(default)";class eH{constructor(e,t){this.projectId=e,this.database=t||eq}static empty(){return new eH("","")}get isDefaultDatabase(){return this.database===eq}isEqual(e){return e instanceof eH&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eK="__type__",eG="__max__",eW={mapValue:{fields:{__type__:{stringValue:eG}}}},eQ="__vector__",eJ="value";function eY(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ej(e)?4:tt(e)?9007199254740991:e7(e)?10:11:j(28295,{value:e})}function eX(e,t){if(e===t)return!0;let r=eY(e);if(r!==eY(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return ez(e).isEqual(ez(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=eD(e.timestampValue),n=eD(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return ex(e.bytesValue).isEqual(ex(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return eL(e.geoPointValue.latitude)===eL(t.geoPointValue.latitude)&&eL(e.geoPointValue.longitude)===eL(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return eL(e.integerValue)===eL(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let r=eL(e.doubleValue),n=eL(t.doubleValue);return r===n?eE(r)===eE(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return es(e.arrayValue.values||[],t.arrayValue.values||[],eX);case 10:case 11:return function(e,t){let r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(e_(r)!==e_(n))return!1;for(let e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!eX(r[e],n[e])))return!1;return!0}(e,t);default:return j(52216,{left:e})}}function eZ(e,t){return void 0!==(e.values||[]).find(e=>eX(e,t))}function e0(e,t){if(e===t)return 0;let r=eY(e),n=eY(t);if(r!==n)return er(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return er(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=eL(e.integerValue||e.doubleValue),n=eL(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return e1(e.timestampValue,t.timestampValue);case 4:return e1(ez(e),ez(t));case 5:return en(e.stringValue,t.stringValue);case 6:return function(e,t){let r=ex(e),n=ex(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=er(r[e],n[e]);if(0!==t)return t}return er(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=er(eL(e.latitude),eL(t.latitude));return 0!==r?r:er(eL(e.longitude),eL(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return e2(e.arrayValue,t.arrayValue);case 10:return function(e,t){var r,n,i,s;let a=e.fields||{},o=t.fields||{},l=null===(r=a[eJ])||void 0===r?void 0:r.arrayValue,u=null===(n=o[eJ])||void 0===n?void 0:n.arrayValue,h=er((null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0,(null===(s=null==u?void 0:u.values)||void 0===s?void 0:s.length)||0);return 0!==h?h:e2(l,u)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===eW.mapValue&&t===eW.mapValue)return 0;if(e===eW.mapValue)return 1;if(t===eW.mapValue)return -1;let r=e.fields||{},n=Object.keys(r),i=t.fields||{},s=Object.keys(i);n.sort(),s.sort();for(let e=0;e<n.length&&e<s.length;++e){let t=en(n[e],s[e]);if(0!==t)return t;let a=e0(r[n[e]],i[s[e]]);if(0!==a)return a}return er(n.length,s.length)}(e.mapValue,t.mapValue);default:throw j(23264,{Pe:r})}}function e1(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return er(e,t);let r=eD(e),n=eD(t),i=er(r.seconds,n.seconds);return 0!==i?i:er(r.nanos,n.nanos)}function e2(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=e0(r[e],n[e]);if(t)return t}return er(r.length,n.length)}function e4(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=eD(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?ex(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,ef.fromName(t).toString()):"geoPointValue"in e?(r=e.geoPointValue,`geo(${r.latitude},${r.longitude})`):"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=e4(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let i of t)n?n=!1:r+=",",r+=`${i}:${e4(e.fields[i])}`;return r+"}"}(e.mapValue):j(61005,{value:e})}function e9(e){return!!e&&"integerValue"in e}function e6(e){return!!e&&"arrayValue"in e}function e5(e){return!!e&&"nullValue"in e}function e3(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function e8(e){return!!e&&"mapValue"in e}function e7(e){var t,r;return(null===(r=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{})[eK])||void 0===r?void 0:r.stringValue)===eQ}function te(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return eb(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=te(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=te(e.arrayValue.values[r]);return t}return Object.assign({},e)}function tt(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===eG}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this.value=e}static empty(){return new tr({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!e8(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=te(t)}setAll(e){let t=ed.emptyPath(),r={},n=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=i.popLast()}e?r[i.lastSegment()]=te(e):n.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,n)}delete(e){let t=this.field(e.popLast());e8(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return eX(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];e8(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(eb(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new tr(te(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,t,r,n,i,s,a){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new tn(e,0,eo.min(),eo.min(),eo.min(),tr.empty(),0)}static newFoundDocument(e,t,r,n){return new tn(e,1,t,eo.min(),r,n,0)}static newNoDocument(e,t){return new tn(e,2,t,eo.min(),eo.min(),tr.empty(),0)}static newUnknownDocument(e,t){return new tn(e,3,t,eo.min(),eo.min(),tr.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(eo.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tr.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=eo.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof tn&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new tn(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e,t){this.position=e,this.inclusive=t}}function ts(e,t,r){let n=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(n=s.field.isKeyField()?ef.comparator(ef.fromName(a.referenceValue),r.key):e0(a,r.data.field(s.field)),"desc"===s.dir&&(n*=-1),0!==n)break}return n}function ta(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!eX(e.position[r],t.position[r]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{}class tu extends tl{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new tf(e,t,r):"array-contains"===t?new ty(e,r):"in"===t?new tv(e,r):"not-in"===t?new tw(e,r):"array-contains-any"===t?new tE(e,r):new tu(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new tp(e,r):new tg(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(e0(t,this.value)):null!==t&&eY(this.value)===eY(t)&&this.matchesComparison(e0(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return j(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class th extends tl{constructor(e,t){super(),this.filters=e,this.op=t,this.Te=null}static create(e,t){return new th(e,t)}matches(e){return tc(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Te||(this.Te=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function tc(e){return"and"===e.op}function td(e){for(let t of e.filters)if(t instanceof th)return!1;return!0}class tf extends tu{constructor(e,t,r){super(e,t,r),this.key=ef.fromName(r.referenceValue)}matches(e){let t=ef.comparator(e.key,this.key);return this.matchesComparison(t)}}class tp extends tu{constructor(e,t){super(e,"in",t),this.keys=tm("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class tg extends tu{constructor(e,t){super(e,"not-in",t),this.keys=tm("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function tm(e,t){var r;return((null===(r=t.arrayValue)||void 0===r?void 0:r.values)||[]).map(e=>ef.fromName(e.referenceValue))}class ty extends tu{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return e6(t)&&eZ(t.arrayValue,this.value)}}class tv extends tu{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eZ(this.value.arrayValue,t)}}class tw extends tu{constructor(e,t){super(e,"not-in",t)}matches(e){if(eZ(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!eZ(this.value.arrayValue,t)}}class tE extends tu{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!e6(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eZ(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,t=null,r=[],n=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=i,this.startAt=s,this.endAt=a,this.Ie=null}}function tb(e,t=null,r=[],n=[],i=null,s=null,a=null){return new t_(e,t,r,n,i,s,a)}function tT(e){if(null===e.Ie){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof tu)return t.field.canonicalString()+t.op.toString()+e4(t.value);if(td(t)&&tc(t))return t.filters.map(t=>e(t)).join(",");{let r=t.filters.map(t=>e(t)).join(",");return`${t.op}(${r})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>e4(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>e4(e)).join(",")),e.Ie=t}return e.Ie}function tI(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var r,n;if(r=e.orderBy[i],n=t.orderBy[i],!(r.dir===n.dir&&r.field.isEqual(n.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!function e(t,r){return t instanceof tu?r instanceof tu&&t.op===r.op&&t.field.isEqual(r.field)&&eX(t.value,r.value):t instanceof th?r instanceof th&&t.op===r.op&&t.filters.length===r.filters.length&&t.filters.reduce((t,n,i)=>t&&e(n,r.filters[i]),!0):void j(19439)}(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!ta(e.startAt,t.startAt)&&ta(e.endAt,t.endAt)}function tS(e){return ef.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,t=null,r=[],n=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function tA(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function tk(e){if(null===e.Ee){let t;e.Ee=[];let r=new Set;for(let t of e.explicitOrderBy)e.Ee.push(t),r.add(t.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc",i=(t=new eA(ed.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t);i.forEach(t=>{r.has(t.canonicalString())||t.isKeyField()||e.Ee.push(new to(t,n))}),r.has(ed.keyField().canonicalString())||e.Ee.push(new to(ed.keyField(),n))}return e.Ee}function tR(e){return e.de||(e.de=function(e,t){if("F"===e.limitType)return tb(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new to(e.field,t)});let r=e.endAt?new ti(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new ti(e.startAt.position,e.startAt.inclusive):null;return tb(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}(e,tk(e))),e.de}function tN(e,t,r){return new tC(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function tO(e,t){return tI(tR(e),tR(t))&&e.limitType===t.limitType}function tP(e){return`${tT(tR(e))}|lt:${e.limitType}`}function tD(e){var t;let r;return`Query(target=${r=(t=tR(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof tu?`${t.field.canonicalString()} ${t.op} ${e4(t.value)}`:t instanceof th?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>e4(e)).join(",")),t.endAt&&(r+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>e4(e)).join(",")),`Target(${r})`}; limitType=${e.limitType})`}function tL(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):ef.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of tk(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,r){let n=ts(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,tk(e),t))&&(!e.endAt||!!function(e,t,r){let n=ts(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,tk(e),t))}function tx(e){return(t,r)=>{let n=!1;for(let i of tk(e)){let e=function(e,t,r){let n=e.field.isKeyField()?ef.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),i=r.data.field(e);return null!==n&&null!==i?e0(n,i):j(42886)}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return j(19790,{direction:e.dir})}}(i,t,r);if(0!==e)return e;n=n||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tM{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){eb(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return eT(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tU=new eI(ef.comparator),tV=new eI(ef.comparator);function tF(...e){let t=tV;for(let r of e)t=t.insert(r.key,r);return t}function tj(e){let t=tV;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function tB(){return new tM(e=>e.toString(),(e,t)=>e.isEqual(t))}let tz=new eI(ef.comparator),t$=new eA(ef.comparator);function tq(...e){let t=t$;for(let r of e)t=t.add(r);return t}let tH=new eA(er);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tK(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eE(t)?"-0":t}}function tG(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tW{constructor(){this._=void 0}}function tQ(e,t){return e instanceof t1?e9(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class tJ extends tW{}class tY extends tW{constructor(e){super(),this.elements=e}}function tX(e,t){let r=t4(t);for(let t of e.elements)r.some(e=>eX(e,t))||r.push(t);return{arrayValue:{values:r}}}class tZ extends tW{constructor(e){super(),this.elements=e}}function t0(e,t){let r=t4(t);for(let t of e.elements)r=r.filter(e=>!eX(e,t));return{arrayValue:{values:r}}}class t1 extends tW{constructor(e,t){super(),this.serializer=e,this.Re=t}}function t2(e){return eL(e.integerValue||e.doubleValue)}function t4(e){return e6(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class t9{constructor(e,t){this.version=e,this.transformResults=t}}class t6{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new t6}static exists(e){return new t6(void 0,e)}static updateTime(e){return new t6(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function t5(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class t3{}function t8(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new ra(e.key,t6.none()):new rt(e.key,e.data,t6.none());{let r=e.data,n=tr.empty(),i=new eA(ed.comparator);for(let e of t.fields)if(!i.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),i=i.add(e)}return new rr(e.key,n,new eR(i.toArray()),t6.none())}}function t7(e,t,r,n){return e instanceof rt?function(e,t,r,n){if(!t5(e.precondition,t))return r;let i=e.value.clone(),s=rs(e.fieldTransforms,n,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,r,n):e instanceof rr?function(e,t,r,n){if(!t5(e.precondition,t))return r;let i=rs(e.fieldTransforms,n,t),s=t.data;return(s.setAll(rn(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===r)?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):t5(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}function re(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&es(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof tY&&n instanceof tY||r instanceof tZ&&n instanceof tZ?es(r.elements,n.elements,eX):r instanceof t1&&n instanceof t1?eX(r.Re,n.Re):r instanceof tJ&&n instanceof tJ)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class rt extends t3{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class rr extends t3{constructor(e,t,r,n,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function rn(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function ri(e,t,r){let n=new Map;z(e.length===r.length,32656,{Ve:r.length,me:e.length});for(let s=0;s<r.length;s++){var i;let a=e[s],o=a.transform,l=t.data.field(a.field);n.set(a.field,(i=r[s],o instanceof tY?tX(o,l):o instanceof tZ?t0(o,l):i))}return n}function rs(e,t,r){let n=new Map;for(let i of e){let e=i.transform,s=r.data.field(i.field);n.set(i.field,e instanceof tJ?function(e,t){let r={fields:{[eU]:{stringValue:eM},[eF]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&ej(t)&&(t=eB(t)),t&&(r.fields[eV]=t),{mapValue:r}}(t,s):e instanceof tY?tX(e,s):e instanceof tZ?t0(e,s):function(e,t){let r=tQ(e,t),n=t2(r)+t2(e.Re);return e9(r)&&e9(e.Re)?tG(n):tK(e.serializer,n)}(e,s))}return n}class ra extends t3{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ro extends t3{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var n;n=r[t],i instanceof rt?function(e,t,r){let n=e.value.clone(),i=ri(e.fieldTransforms,t,r.transformResults);n.setAll(i),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(i,e,n):i instanceof rr?function(e,t,r){if(!t5(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=ri(e.fieldTransforms,t,r.transformResults),i=t.data;i.setAll(rn(e)),i.setAll(n),t.convertToFoundDocument(r.version,i).setHasCommittedMutations()}(i,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=t7(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=t7(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=tB();return this.mutations.forEach(n=>{let i=e.get(n.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields);a=t.has(n.key)?null:a;let o=t8(s,a);null!==o&&r.set(n.key,o),s.isValidDocument()||s.convertToNoDocument(eo.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tq())}isEqual(e){return this.batchId===e.batchId&&es(this.mutations,e.mutations,(e,t)=>re(e,t))&&es(this.baseMutations,e.baseMutations,(e,t)=>re(e,t))}}class ru{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){z(e.mutations.length===r.length,58842,{fe:e.mutations.length,ge:r.length});let n=tz,i=e.mutations;for(let e=0;e<i.length;e++)n=n.insert(i[e].key,r[e].version);return new ru(e,t,r,n)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t){this.count=e,this.unchangedNames=t}}function rd(e){if(void 0===e)return U("GRPC error has no .code"),$.UNKNOWN;switch(e){case f.OK:return $.OK;case f.CANCELLED:return $.CANCELLED;case f.UNKNOWN:return $.UNKNOWN;case f.DEADLINE_EXCEEDED:return $.DEADLINE_EXCEEDED;case f.RESOURCE_EXHAUSTED:return $.RESOURCE_EXHAUSTED;case f.INTERNAL:return $.INTERNAL;case f.UNAVAILABLE:return $.UNAVAILABLE;case f.UNAUTHENTICATED:return $.UNAUTHENTICATED;case f.INVALID_ARGUMENT:return $.INVALID_ARGUMENT;case f.NOT_FOUND:return $.NOT_FOUND;case f.ALREADY_EXISTS:return $.ALREADY_EXISTS;case f.PERMISSION_DENIED:return $.PERMISSION_DENIED;case f.FAILED_PRECONDITION:return $.FAILED_PRECONDITION;case f.ABORTED:return $.ABORTED;case f.OUT_OF_RANGE:return $.OUT_OF_RANGE;case f.UNIMPLEMENTED:return $.UNIMPLEMENTED;case f.DATA_LOSS:return $.DATA_LOSS;default:return j(39323,{code:e})}}(p=f||(f={}))[p.OK=0]="OK",p[p.CANCELLED=1]="CANCELLED",p[p.UNKNOWN=2]="UNKNOWN",p[p.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",p[p.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",p[p.NOT_FOUND=5]="NOT_FOUND",p[p.ALREADY_EXISTS=6]="ALREADY_EXISTS",p[p.PERMISSION_DENIED=7]="PERMISSION_DENIED",p[p.UNAUTHENTICATED=16]="UNAUTHENTICATED",p[p.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",p[p.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",p[p.ABORTED=10]="ABORTED",p[p.OUT_OF_RANGE=11]="OUT_OF_RANGE",p[p.UNIMPLEMENTED=12]="UNIMPLEMENTED",p[p.INTERNAL=13]="INTERNAL",p[p.UNAVAILABLE=14]="UNAVAILABLE",p[p.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rf=new n([4294967295,4294967295],0);function rp(e){let t=ee().encode(e),r=new i;return r.update(t),new Uint8Array(r.digest())}function rg(e){let t=new DataView(e.buffer),r=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),a=t.getUint32(12,!0);return[new n([r,i],0),new n([s,a],0)]}class rm{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ry(`Invalid padding: ${t}`);if(r<0||e.length>0&&0===this.hashCount)throw new ry(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new ry(`Invalid padding when bitmap length is 0: ${t}`);this.pe=8*e.length-t,this.ye=n.fromNumber(this.pe)}we(e,t,r){let i=e.add(t.multiply(n.fromNumber(r)));return 1===i.compare(rf)&&(i=new n([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.pe)return!1;let t=rp(e),[r,n]=rg(t);for(let e=0;e<this.hashCount;e++){let t=this.we(r,n,e);if(!this.be(t))return!1}return!0}static create(e,t,r){let n=new Uint8Array(Math.ceil(e/8)),i=new rm(n,e%8==0?0:8-e%8,t);return r.forEach(e=>i.insert(e)),i}insert(e){if(0===this.pe)return;let t=rp(e),[r,n]=rg(t);for(let e=0;e<this.hashCount;e++){let t=this.we(r,n,e);this.Se(t)}}Se(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class ry extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e,t,r,n,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let n=new Map;return n.set(e,rw.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new rv(eo.min(),n,new eI(er),tU,tq())}}class rw{constructor(e,t,r,n,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new rw(r,t,tq(),tq(),tq())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e,t,r,n){this.De=e,this.removedTargetIds=t,this.key=r,this.ve=n}}class r_{constructor(e,t){this.targetId=e,this.Ce=t}}class rb{constructor(e,t,r=eO.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class rT{constructor(){this.Fe=0,this.Me=rC(),this.xe=eO.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return 0!==this.Fe}get Le(){return this.Ne}ke(e){e.approximateByteSize()>0&&(this.Ne=!0,this.xe=e)}qe(){let e=tq(),t=tq(),r=tq();return this.Me.forEach((n,i)=>{switch(i){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:j(38017,{changeType:i})}}),new rw(this.xe,this.Oe,e,t,r)}Qe(){this.Ne=!1,this.Me=rC()}$e(e,t){this.Ne=!0,this.Me=this.Me.insert(e,t)}Ue(e){this.Ne=!0,this.Me=this.Me.remove(e)}Ke(){this.Fe+=1}We(){this.Fe-=1,z(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class rI{constructor(e){this.ze=e,this.je=new Map,this.He=tU,this.Je=rS(),this.Ye=rS(),this.Ze=new eI(er)}Xe(e){for(let t of e.De)e.ve&&e.ve.isFoundDocument()?this.et(t,e.ve):this.tt(t,e.key,e.ve);for(let t of e.removedTargetIds)this.tt(t,e.key,e.ve)}nt(e){this.forEachTarget(e,t=>{let r=this.rt(t);switch(e.state){case 0:this.it(t)&&r.ke(e.resumeToken);break;case 1:r.We(),r.Be||r.Qe(),r.ke(e.resumeToken);break;case 2:r.We(),r.Be||this.removeTarget(t);break;case 3:this.it(t)&&(r.Ge(),r.ke(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),r.ke(e.resumeToken));break;default:j(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((e,r)=>{this.it(r)&&t(r)})}ot(e){let t=e.targetId,r=e.Ce.count,n=this._t(t);if(n){let i=n.target;if(tS(i)){if(0===r){let e=new ef(i.path);this.tt(t,e,tn.newNoDocument(e,eo.min()))}else z(1===r,20013,{expectedCount:r})}else{let n=this.ut(t);if(n!==r){let r=this.ct(e),i=r?this.lt(r,e,n):1;0!==i&&(this.st(t),this.Ze=this.Ze.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}ct(e){let t,r;let n=e.Ce.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=n;try{t=ex(i).toUint8Array()}catch(e){if(e instanceof eN)return V("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{r=new rm(t,s,a)}catch(e){return V(e instanceof ry?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===r.pe?null:r}lt(e,t,r){return t.Ce.count===r-this.Tt(e,t.targetId)?0:2}Tt(e,t){let r=this.ze.getRemoteKeysForTarget(t),n=0;return r.forEach(r=>{let i=this.ze.Pt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${r.path.canonicalString()}`;e.mightContain(s)||(this.tt(t,r,null),n++)}),n}It(e){let t=new Map;this.je.forEach((r,n)=>{let i=this._t(n);if(i){if(r.current&&tS(i.target)){let t=new ef(i.target.path);this.Et(t).has(n)||this.dt(n,t)||this.tt(n,t,tn.newNoDocument(t,e))}r.Le&&(t.set(n,r.qe()),r.Qe())}});let r=tq();this.Ye.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this._t(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.He.forEach((t,r)=>r.setReadTime(e));let n=new rv(e,t,this.Ze,this.He,r);return this.He=tU,this.Je=rS(),this.Ye=rS(),this.Ze=new eI(er),n}et(e,t){if(!this.it(e))return;let r=this.dt(e,t.key)?2:0;this.rt(e).$e(t.key,r),this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.Ye=this.Ye.insert(t.key,this.At(t.key).add(e))}tt(e,t,r){if(!this.it(e))return;let n=this.rt(e);this.dt(e,t)?n.$e(t,1):n.Ue(t),this.Ye=this.Ye.insert(t,this.At(t).delete(e)),this.Ye=this.Ye.insert(t,this.At(t).add(e)),r&&(this.He=this.He.insert(t,r))}removeTarget(e){this.je.delete(e)}ut(e){let t=this.rt(e).qe();return this.ze.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ke(e){this.rt(e).Ke()}rt(e){let t=this.je.get(e);return t||(t=new rT,this.je.set(e,t)),t}At(e){let t=this.Ye.get(e);return t||(t=new eA(er),this.Ye=this.Ye.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new eA(er),this.Je=this.Je.insert(e,t)),t}it(e){let t=null!==this._t(e);return t||M("WatchChangeAggregator","Detected inactive target",e),t}_t(e){let t=this.je.get(e);return t&&t.Be?null:this.ze.Rt(e)}st(e){this.je.set(e,new rT),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.tt(e,t,null)})}dt(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function rS(){return new eI(ef.comparator)}function rC(){return new eI(ef.comparator)}let rA={asc:"ASCENDING",desc:"DESCENDING"},rk={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rR={and:"AND",or:"OR"};class rN{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function rO(e,t){return e.useProto3Json||null==t?t:{value:t}}function rP(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function rD(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function rL(e){return z(!!e,49232),eo.fromTimestamp(function(e){let t=eD(e);return new ea(t.seconds,t.nanos)}(e))}function rx(e,t){return rM(e,t).canonicalString()}function rM(e,t){let r=new eh(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?r:r.child(t)}function rU(e){let t=eh.fromString(e);return z(rK(t),10190,{key:t.toString()}),t}function rV(e,t){return rx(e.databaseId,t.path)}function rF(e,t){let r=rU(t);if(r.get(1)!==e.databaseId.projectId)throw new q($.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new q($.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new ef(rz(r))}function rj(e,t){return rx(e.databaseId,t)}function rB(e){return new eh(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function rz(e){return z(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function r$(e,t,r){return{name:rV(e,t),fields:r.value.mapValue.fields}}function rq(e){return{fieldPath:e.canonicalString()}}function rH(e){return ed.fromServerFormat(e.fieldPath)}function rK(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rG{constructor(e,t,r,n,i=eo.min(),s=eo.min(),a=eO.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new rG(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rG(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rG(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rG(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rW{constructor(e){this.wt=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rQ{constructor(){}vt(e,t){this.Ct(e,t),t.Ft()}Ct(e,t){if("nullValue"in e)this.Mt(t,5);else if("booleanValue"in e)this.Mt(t,10),t.xt(e.booleanValue?1:0);else if("integerValue"in e)this.Mt(t,15),t.xt(eL(e.integerValue));else if("doubleValue"in e){let r=eL(e.doubleValue);isNaN(r)?this.Mt(t,13):(this.Mt(t,15),eE(r)?t.xt(0):t.xt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Mt(t,20),"string"==typeof r&&(r=eD(r)),t.Ot(`${r.seconds||""}`),t.xt(r.nanos||0)}else if("stringValue"in e)this.Nt(e.stringValue,t),this.Bt(t);else if("bytesValue"in e)this.Mt(t,30),t.Lt(ex(e.bytesValue)),this.Bt(t);else if("referenceValue"in e)this.kt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Mt(t,45),t.xt(r.latitude||0),t.xt(r.longitude||0)}else"mapValue"in e?tt(e)?this.Mt(t,Number.MAX_SAFE_INTEGER):e7(e)?this.qt(e.mapValue,t):(this.Qt(e.mapValue,t),this.Bt(t)):"arrayValue"in e?(this.$t(e.arrayValue,t),this.Bt(t)):j(19022,{Ut:e})}Nt(e,t){this.Mt(t,25),this.Kt(e,t)}Kt(e,t){t.Ot(e)}Qt(e,t){let r=e.fields||{};for(let e of(this.Mt(t,55),Object.keys(r)))this.Nt(e,t),this.Ct(r[e],t)}qt(e,t){var r,n;let i=e.fields||{};this.Mt(t,53);let s=(null===(n=null===(r=i[eJ].arrayValue)||void 0===r?void 0:r.values)||void 0===n?void 0:n.length)||0;this.Mt(t,15),t.xt(eL(s)),this.Nt(eJ,t),this.Ct(i[eJ],t)}$t(e,t){let r=e.values||[];for(let e of(this.Mt(t,50),r))this.Ct(e,t)}kt(e,t){this.Mt(t,37),ef.fromName(e).path.forEach(e=>{this.Mt(t,60),this.Kt(e,t)})}Mt(e,t){e.xt(t)}Bt(e){e.xt(2)}}rQ.Wt=new rQ;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rJ{constructor(){this.yn=new rY}addToCollectionParentIndex(e,t){return this.yn.add(t),ey.resolve()}getCollectionParents(e,t){return ey.resolve(this.yn.getEntries(t))}addFieldIndex(e,t){return ey.resolve()}deleteFieldIndex(e,t){return ey.resolve()}deleteAllFieldIndexes(e){return ey.resolve()}createTargetIndexes(e,t){return ey.resolve()}getDocumentsMatchingTarget(e,t){return ey.resolve(null)}getIndexType(e,t){return ey.resolve(0)}getFieldIndexes(e,t){return ey.resolve([])}getNextCollectionGroupToUpdate(e){return ey.resolve(null)}getMinOffset(e,t){return ey.resolve(ep.min())}getMinOffsetFromCollectionGroup(e,t){return ey.resolve(ep.min())}updateCollectionGroup(e,t,r){return ey.resolve()}updateIndexEntries(e,t){return ey.resolve()}}class rY{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new eA(eh.comparator),i=!n.has(r);return this.index[t]=n.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new eA(eh.comparator)).toArray()}}new Uint8Array(0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rX={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class rZ{static withCacheSize(e){return new rZ(e,rZ.DEFAULT_COLLECTION_PERCENTILE,rZ.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rZ.DEFAULT_COLLECTION_PERCENTILE=10,rZ.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rZ.DEFAULT=new rZ(41943040,rZ.DEFAULT_COLLECTION_PERCENTILE,rZ.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rZ.DISABLED=new rZ(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r0{constructor(e){this.nr=e}next(){return this.nr+=2,this.nr}static rr(){return new r0(0)}static ir(){return new r0(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r1="LruGarbageCollector";function r2([e,t],[r,n]){let i=er(e,r);return 0===i?er(t,n):i}class r4{constructor(e){this.cr=e,this.buffer=new eA(r2),this.lr=0}hr(){return++this.lr}Pr(e){let t=[e,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>r2(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class r9{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Tr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return null!==this.Tr}Ir(e){M(r1,`Garbage collection scheduled in ${e}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ev(e)?M(r1,"Ignoring IndexedDB error during garbage collection: ",e):await em(e)}await this.Ir(3e5)})}}class r6{constructor(e,t){this.Er=e,this.params=t}calculateTargetCount(e,t){return this.Er.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ey.resolve(ew.le);let r=new r4(t);return this.Er.forEachTarget(e,e=>r.Pr(e.sequenceNumber)).next(()=>this.Er.Ar(e,e=>r.Pr(e))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Er.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Er.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector","Garbage collection skipped; disabled"),ey.resolve(rX)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),rX):this.Rr(e,t))}getCacheSize(e){return this.Er.getCacheSize(e)}Rr(e,t){let r,n,i,s,a,o,l;let u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),n=this.params.maximumSequenceNumbersToCollect):n=t,s=Date.now(),this.nthSequenceNumber(e,n))).next(n=>(r=n,a=Date.now(),this.removeTargets(e,r,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,r))).next(e=>(l=Date.now(),x()<=T.in.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-u}ms
	Determined least recently used ${n} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(l-o)+"ms\n"+`Total Duration: ${l-u}ms`),ey.resolve({didRun:!0,sequenceNumbersCollected:n,targetsRemoved:i,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r5{constructor(){this.changes=new tM(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,tn.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?ey.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r3{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r8{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&t7(r.mutation,e,eR.empty(),ea.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tq()).next(()=>t))}getLocalViewOfDocuments(e,t,r=tq()){let n=tB();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=tF();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let r=tB();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,tq()))}populateOverlays(e,t,r){let n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let i=tU,s=tB(),a=tB();return t.forEach((e,t)=>{let a=r.get(t.key);n.has(t.key)&&(void 0===a||a.mutation instanceof rr)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),t7(a.mutation,t,a.mutation.getFieldMask(),ea.now())):s.set(t.key,eR.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var r;return a.set(e,new r3(t,null!==(r=s.get(e))&&void 0!==r?r:null))}),a))}recalculateAndSaveOverlays(e,t){let r=tB(),n=new eI((e,t)=>e-t),i=tq();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=r.get(e)||eR.empty();a=i.applyToLocalView(s,a),r.set(e,a);let o=(n.get(i.batchId)||tq()).add(e);n=n.insert(i.batchId,o)})}).next(()=>{let s=[],a=n.getReverseIterator();for(;a.hasNext();){let n=a.getNext(),o=n.key,l=n.value,u=tB();l.forEach(e=>{if(!i.has(e)){let n=t8(t.get(e),r.get(e));null!==n&&u.set(e,n),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return ey.waitFor(s)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return ef.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):null!==t.collectionGroup?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(i=>{let s=n-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-i.size):ey.resolve(tB()),a=-1,o=i;return s.next(t=>ey.forEach(t,(t,r)=>(a<r.largestBatchId&&(a=r.largestBatchId),i.get(t)?ey.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,tq())).next(e=>({batchId:a,changes:tj(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ef(t)).next(e=>{let t=tF();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){let i=t.collectionGroup,s=tF();return this.indexManager.getCollectionParents(e,i).next(a=>ey.forEach(a,a=>{var o;let l=(o=a.child(i),new tC(o,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt));return this.getDocumentsMatchingCollectionQuery(e,l,r,n).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r,n){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,n))).next(e=>{i.forEach((t,r)=>{let n=r.getKey();null===e.get(n)&&(e=e.insert(n,tn.newInvalidDocument(n)))});let r=tF();return e.forEach((e,n)=>{let s=i.get(e);void 0!==s&&t7(s.mutation,n,eR.empty(),ea.now()),tL(t,n)&&(r=r.insert(e,n))}),r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r7{constructor(e){this.serializer=e,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(e,t){return ey.resolve(this.Fr.get(t))}saveBundleMetadata(e,t){return this.Fr.set(t.id,{id:t.id,version:t.version,createTime:rL(t.createTime)}),ey.resolve()}getNamedQuery(e,t){return ey.resolve(this.Mr.get(t))}saveNamedQuery(e,t){return this.Mr.set(t.name,{name:t.name,query:function(e){let t=function(e){var t,r,n,i,s,a,o,l;let u,h=function(e){let t=rU(e);return 4===t.length?eh.emptyPath():rz(t)}(e.parent),c=e.structuredQuery,d=c.from?c.from.length:0,f=null;if(d>0){z(1===d,65062);let e=c.from[0];e.allDescendants?f=e.collectionId:h=h.child(e.collectionId)}let p=[];c.where&&(p=function(e){var t;let r=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=rH(e.unaryFilter.field);return tu.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=rH(e.unaryFilter.field);return tu.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=rH(e.unaryFilter.field);return tu.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=rH(e.unaryFilter.field);return tu.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return j(61313);default:return j(60726)}}(t):void 0!==t.fieldFilter?tu.create(rH(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return j(58110);default:return j(50506)}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?th.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return j(1026)}}(t.compositeFilter.op)):j(30097,{filter:t})}(e);return r instanceof th&&td(t=r)&&tc(t)?r.getFilters():[r]}(c.where));let g=[];c.orderBy&&(g=c.orderBy.map(e=>new to(rH(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let m=null;c.limit&&(m=null==(u="object"==typeof(t=c.limit)?t.value:t)?null:u);let y=null;c.startAt&&(y=function(e){let t=!!e.before,r=e.values||[];return new ti(r,t)}(c.startAt));let v=null;return c.endAt&&(v=function(e){let t=!e.before,r=e.values||[];return new ti(r,t)}(c.endAt)),r=h,n=f,i=g,s=p,a=m,o=y,l=v,new tC(r,n,i,s,a,"F",o,l)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?tN(t,t.limit,"L"):t}(t.bundledQuery),readTime:rL(t.readTime)}),ey.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(){this.overlays=new eI(ef.comparator),this.Or=new Map}getOverlay(e,t){return ey.resolve(this.overlays.get(t))}getOverlays(e,t){let r=tB();return ey.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.St(e,t,n)}),ey.resolve()}removeOverlaysForBatchId(e,t,r){let n=this.Or.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.Or.delete(r)),ey.resolve()}getOverlaysForCollection(e,t,r){let n=tB(),i=t.length+1,s=new ef(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>r&&n.set(e.getKey(),e)}return ey.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let i=new eI((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=i.get(e.largestBatchId);null===t&&(t=tB(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=tB(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=n)););return ey.resolve(a)}St(e,t,r){let n=this.overlays.get(r.key);if(null!==n){let e=this.Or.get(n.largestBatchId).delete(r.key);this.Or.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new rh(t,r));let i=this.Or.get(t);void 0===i&&(i=tq(),this.Or.set(t,i)),this.Or.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(){this.sessionToken=eO.EMPTY_BYTE_STRING}getSessionToken(e){return ey.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ey.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(){this.Nr=new eA(nn.Br),this.Lr=new eA(nn.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(e,t){let r=new nn(e,t);this.Nr=this.Nr.add(r),this.Lr=this.Lr.add(r)}qr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Qr(new nn(e,t))}$r(e,t){e.forEach(e=>this.removeReference(e,t))}Ur(e){let t=new ef(new eh([])),r=new nn(t,e),n=new nn(t,e+1),i=[];return this.Lr.forEachInRange([r,n],e=>{this.Qr(e),i.push(e.key)}),i}Kr(){this.Nr.forEach(e=>this.Qr(e))}Qr(e){this.Nr=this.Nr.delete(e),this.Lr=this.Lr.delete(e)}Wr(e){let t=new ef(new eh([])),r=new nn(t,e),n=new nn(t,e+1),i=tq();return this.Lr.forEachInRange([r,n],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new nn(e,0),r=this.Nr.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class nn{constructor(e,t){this.key=e,this.Gr=t}static Br(e,t){return ef.comparator(e.key,t.key)||er(e.Gr,t.Gr)}static kr(e,t){return er(e.Gr,t.Gr)||ef.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Jn=1,this.zr=new eA(nn.Br)}checkEmpty(e){return ey.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){let i=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new rl(i,t,r,n);for(let t of(this.mutationQueue.push(s),n))this.zr=this.zr.add(new nn(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return ey.resolve(s)}lookupMutationBatch(e,t){return ey.resolve(this.jr(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.Hr(t+1),n=r<0?0:r;return ey.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return ey.resolve(0===this.mutationQueue.length?-1:this.Jn-1)}getAllMutationBatches(e){return ey.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new nn(t,0),n=new nn(t,Number.POSITIVE_INFINITY),i=[];return this.zr.forEachInRange([r,n],e=>{let t=this.jr(e.Gr);i.push(t)}),ey.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new eA(er);return t.forEach(e=>{let t=new nn(e,0),n=new nn(e,Number.POSITIVE_INFINITY);this.zr.forEachInRange([t,n],e=>{r=r.add(e.Gr)})}),ey.resolve(this.Jr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,i=r;ef.isDocumentKey(i)||(i=i.child(""));let s=new nn(new ef(i),0),a=new eA(er);return this.zr.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(a=a.add(e.Gr)),!0)},s),ey.resolve(this.Jr(a))}Jr(e){let t=[];return e.forEach(e=>{let r=this.jr(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){z(0===this.Yr(t.batchId,"removed"),55003),this.mutationQueue.shift();let r=this.zr;return ey.forEach(t.mutations,n=>{let i=new nn(n.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.zr=r})}Xn(e){}containsKey(e,t){let r=new nn(t,0),n=this.zr.firstAfterOrEqual(r);return ey.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,ey.resolve()}Yr(e,t){return this.Hr(e)}Hr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}jr(e){let t=this.Hr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e){this.Zr=e,this.docs=new eI(ef.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,n=this.docs.get(r),i=n?n.size:0,s=this.Zr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return ey.resolve(r?r.document.mutableCopy():tn.newInvalidDocument(t))}getEntries(e,t){let r=tU;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():tn.newInvalidDocument(e))}),ey.resolve(r)}getDocumentsMatchingQuery(e,t,r,n){let i=tU,s=t.path,a=new ef(s.child("__id-9223372036854775808__")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:0!==(r=ef.comparator(e.documentKey,t.documentKey))?r:er(e.largestBatchId,t.largestBatchId)}(new ep(a.readTime,a.key,-1),r)||(n.has(a.key)||tL(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return ey.resolve(i)}getAllFromCollectionGroup(e,t,r,n){j(9500)}Xr(e,t){return ey.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new na(this)}getSize(e){return ey.resolve(this.size)}}class na extends r5{constructor(e){super(),this.vr=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.vr.addEntry(e,n)):this.vr.removeEntry(r)}),ey.waitFor(t)}getFromCache(e,t){return this.vr.getEntry(e,t)}getAllFromCache(e,t){return this.vr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this.persistence=e,this.ei=new tM(e=>tT(e),tI),this.lastRemoteSnapshotVersion=eo.min(),this.highestTargetId=0,this.ti=0,this.ni=new nr,this.targetCount=0,this.ri=r0.rr()}forEachTarget(e,t){return this.ei.forEach((e,r)=>t(r)),ey.resolve()}getLastRemoteSnapshotVersion(e){return ey.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ey.resolve(this.ti)}allocateTargetId(e){return this.highestTargetId=this.ri.next(),ey.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ti&&(this.ti=t),ey.resolve()}ar(e){this.ei.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.ri=new r0(t),this.highestTargetId=t),e.sequenceNumber>this.ti&&(this.ti=e.sequenceNumber)}addTargetData(e,t){return this.ar(t),this.targetCount+=1,ey.resolve()}updateTargetData(e,t){return this.ar(t),ey.resolve()}removeTargetData(e,t){return this.ei.delete(t.target),this.ni.Ur(t.targetId),this.targetCount-=1,ey.resolve()}removeTargets(e,t,r){let n=0,i=[];return this.ei.forEach((s,a)=>{a.sequenceNumber<=t&&null===r.get(a.targetId)&&(this.ei.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),ey.waitFor(i).next(()=>n)}getTargetCount(e){return ey.resolve(this.targetCount)}getTargetData(e,t){let r=this.ei.get(t)||null;return ey.resolve(r)}addMatchingKeys(e,t,r){return this.ni.qr(t,r),ey.resolve()}removeMatchingKeys(e,t,r){this.ni.$r(t,r);let n=this.persistence.referenceDelegate,i=[];return n&&t.forEach(t=>{i.push(n.markPotentiallyOrphaned(e,t))}),ey.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ni.Ur(t),ey.resolve()}getMatchingKeysForTargetId(e,t){let r=this.ni.Wr(t);return ey.resolve(r)}containsKey(e,t){return ey.resolve(this.ni.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t){this.ii={},this.overlays={},this.si=new ew(0),this.oi=!1,this.oi=!0,this._i=new nt,this.referenceDelegate=e(this),this.ai=new no(this),this.indexManager=new rJ,this.remoteDocumentCache=new ns(e=>this.referenceDelegate.ui(e)),this.serializer=new rW(t),this.ci=new r7(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ne,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ii[e.toKey()];return r||(r=new ni(t,this.referenceDelegate),this.ii[e.toKey()]=r),r}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);let n=new nu(this.si.next());return this.referenceDelegate.li(),r(n).next(e=>this.referenceDelegate.hi(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Pi(e,t){return ey.or(Object.values(this.ii).map(r=>()=>r.containsKey(e,t)))}}class nu extends eg{constructor(e){super(),this.currentSequenceNumber=e}}class nh{constructor(e){this.persistence=e,this.Ti=new nr,this.Ii=null}static Ei(e){return new nh(e)}get di(){if(this.Ii)return this.Ii;throw j(60996)}addReference(e,t,r){return this.Ti.addReference(r,t),this.di.delete(r.toString()),ey.resolve()}removeReference(e,t,r){return this.Ti.removeReference(r,t),this.di.add(r.toString()),ey.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),ey.resolve()}removeTarget(e,t){this.Ti.Ur(t.targetId).forEach(e=>this.di.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}li(){this.Ii=new Set}hi(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ey.forEach(this.di,r=>{let n=ef.fromPath(r);return this.Ai(e,n).next(e=>{e||t.removeEntry(n,eo.min())})}).next(()=>(this.Ii=null,t.apply(e)))}updateLimboDocument(e,t){return this.Ai(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}ui(e){return 0}Ai(e,t){return ey.or([()=>ey.resolve(this.Ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Pi(e,t)])}}class nc{constructor(e,t){this.persistence=e,this.Ri=new tM(e=>(function(e){var t,r;let n="";for(let t=0;t<e.length;t++)n.length>0&&(n=n+"\x01\x01"),n=function(e,t){let r=t,n=e.length;for(let t=0;t<n;t++){let n=e.charAt(t);switch(n){case"\x00":r+="\x01\x10";break;case"\x01":r+="\x01\x11";break;default:r+=n}}return r}(e.get(t),n);return n+"\x01\x01"})(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=new r6(this,t)}static Ei(e,t){return new nc(e,t)}li(){}hi(e){return ey.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){let t=this.Vr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Vr(e){let t=0;return this.Ar(e,e=>{t++}).next(()=>t)}Ar(e,t){return ey.forEach(this.Ri,(r,n)=>this.gr(e,r,n).next(e=>e?ey.resolve():t(n)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,n=this.persistence.getRemoteDocumentCache(),i=n.newChangeBuffer();return n.Xr(e,n=>this.gr(e,n,t).next(e=>{e||(r++,i.removeEntry(n,eo.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.Ri.set(t,e.currentSequenceNumber),ey.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.Ri.set(r,e.currentSequenceNumber),ey.resolve()}removeReference(e,t,r){return this.Ri.set(r,e.currentSequenceNumber),ey.resolve()}updateLimboDocument(e,t){return this.Ri.set(t,e.currentSequenceNumber),ey.resolve()}ui(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=function e(t){switch(eY(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let r=eB(t);return r?16+e(r):16;case 5:return 2*t.stringValue.length;case 6:return ex(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,r)=>t+e(r),0);case 10:case 11:var n;let i;return n=t.mapValue,i=0,eb(n.fields,(t,r)=>{i+=t.length+e(r)}),i;default:throw j(13486,{value:t})}}(e.data.value)),t}gr(e,t,r){return ey.or([()=>this.persistence.Pi(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let e=this.Ri.get(t);return ey.resolve(void 0!==e&&e>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.ls=r,this.hs=n}static Ps(e,t){let r=tq(),n=tq();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new nd(e,t.fromCache,r,n)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=(0,I.G6)()?8:function(e){let t=e.match(/Android ([\d.]+)/i),r=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(r)}((0,I.z$)())>0?6:4}initialize(e,t){this.As=e,this.indexManager=t,this.Ts=!0}getDocumentsMatchingQuery(e,t,r,n){let i={result:null};return this.Rs(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Vs(e,t,n,r).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let r=new nf;return this.fs(e,t,r).next(n=>{if(i.result=n,this.Is)return this.gs(e,t,r,n.size)})}).next(()=>i.result)}gs(e,t,r,n){return r.documentReadCount<this.Es?(x()<=T.in.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",tD(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),ey.resolve()):(x()<=T.in.DEBUG&&M("QueryEngine","Query:",tD(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.ds*n?(x()<=T.in.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",tD(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tR(t))):ey.resolve())}Rs(e,t){if(tA(t))return ey.resolve(null);let r=tR(t);return this.indexManager.getIndexType(e,r).next(n=>0===n?null:(null!==t.limit&&1===n&&(r=tR(t=tN(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,r).next(n=>{let i=tq(...n);return this.As.getDocuments(e,i).next(n=>this.indexManager.getMinOffset(e,r).next(r=>{let s=this.ps(t,n);return this.ys(t,s,i,r.readTime)?this.Rs(e,tN(t,null,"F")):this.ws(e,s,t,r)}))})))}Vs(e,t,r,n){return tA(t)||n.isEqual(eo.min())?ey.resolve(null):this.As.getDocuments(e,r).next(i=>{let s=this.ps(t,i);return this.ys(t,s,r,n)?ey.resolve(null):(x()<=T.in.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),tD(t)),this.ws(e,s,t,function(e,t){let r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1,i=eo.fromTimestamp(1e9===n?new ea(r+1,0):new ea(r,n));return new ep(i,ef.empty(),-1)}(n,0)).next(e=>e))})}ps(e,t){let r=new eA(tx(e));return t.forEach((t,n)=>{tL(e,n)&&(r=r.add(n))}),r}ys(e,t,r,n){if(null===e.limit)return!1;if(r.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(n)>0)}fs(e,t,r){return x()<=T.in.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",tD(t)),this.As.getDocumentsMatchingQuery(e,t,ep.min(),r)}ws(e,t,r,n){return this.As.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ng="LocalStore";class nm{constructor(e,t,r,n){this.persistence=e,this.bs=t,this.serializer=n,this.Ss=new eI(er),this.Ds=new tM(e=>tT(e),tI),this.vs=new Map,this.Cs=e.getRemoteDocumentCache(),this.ai=e.getTargetCache(),this.ci=e.getBundleCache(),this.Fs(r)}Fs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new r8(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ss))}}async function ny(e,t){return await e.persistence.runTransaction("Handle user change","readonly",r=>{let n;return e.mutationQueue.getAllMutationBatches(r).next(i=>(n=i,e.Fs(t),e.mutationQueue.getAllMutationBatches(r))).next(t=>{let i=[],s=[],a=tq();for(let e of n)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(r,a).next(e=>({Ms:e,removedBatchIds:i,addedBatchIds:s}))})})}function nv(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ai.getLastRemoteSnapshotVersion(t))}async function nw(e,t,r){let n=e.Ss.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!ev(e))throw e;M(ng,`Failed to update sequence numbers for target ${t}: ${e}`)}e.Ss=e.Ss.remove(t),e.Ds.delete(n.target)}function nE(e,t,r){let n=eo.min(),i=tq();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,r){let n=e.Ds.get(r);return void 0!==n?ey.resolve(e.Ss.get(n)):e.ai.getTargetData(t,r)})(e,s,tR(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.ai.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.bs.getDocumentsMatchingQuery(s,t,r?n:eo.min(),r?i:tq())).next(r=>{var n;let s;return n=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),s=e.vs.get(n)||eo.min(),r.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.vs.set(n,s),{documents:r,Ns:i}}))}class n_{constructor(){this.activeTargetIds=tH}$s(e){this.activeTargetIds=this.activeTargetIds.add(e)}Us(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Qs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class nb{constructor(){this.So=new n_,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.So.$s(e),this.Do[e]||"not-current"}updateQueryState(e,t,r){this.Do[e]=t}removeLocalQueryTarget(e){this.So.Us(e)}isLocalQueryTarget(e){return this.So.activeTargetIds.has(e)}clearQueryState(e){delete this.Do[e]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(e){return this.So.activeTargetIds.has(e)}start(){return this.So=new n_,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{vo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nI="ConnectivityMonitor";class nS{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(e){this.Oo.push(e)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){for(let e of(M(nI,"Network connectivity changed: AVAILABLE"),this.Oo))e(0)}xo(){for(let e of(M(nI,"Network connectivity changed: UNAVAILABLE"),this.Oo))e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nC=null;function nA(){return null===nC?nC=268435456+Math.round(2147483648*Math.random()):nC++,"0x"+nC.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nk="RestConnection",nR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class nN{get Bo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.Lo=t+"://"+e.host,this.ko=`projects/${r}/databases/${n}`,this.qo=this.databaseId.database===eq?`project_id=${r}`:`project_id=${r}&database_id=${n}`}Qo(e,t,r,n,i){let s=nA(),a=this.$o(e,t.toUriEncodedString());M(nk,`Sending RPC '${e}' ${s}:`,a,r);let o={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(o,n,i),this.Ko(e,a,o,r).then(t=>(M(nk,`Received RPC '${e}' ${s}: `,t),t),t=>{throw V(nk,`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",r),t})}Wo(e,t,r,n,i,s){return this.Qo(e,t,r,n,i)}Uo(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+D,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}$o(e,t){let r=nR[e];return`${this.Lo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{constructor(e){this.Go=e.Go,this.zo=e.zo}jo(e){this.Ho=e}Jo(e){this.Yo=e}Zo(e){this.Xo=e}onMessage(e){this.e_=e}close(){this.zo()}send(e){this.Go(e)}t_(){this.Ho()}n_(){this.Yo()}r_(e){this.Xo(e)}i_(e){this.e_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nP="WebChannelConnection";class nD extends nN{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ko(e,t,r,n){let i=nA();return new Promise((a,u)=>{let h=new s;h.setWithCredentials(!0),h.listenOnce(o.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case l.NO_ERROR:let t=h.getResponseJson();M(nP,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),a(t);break;case l.TIMEOUT:M(nP,`RPC '${e}' ${i} timed out`),u(new q($.DEADLINE_EXCEEDED,"Request time out"));break;case l.HTTP_ERROR:let r=h.getStatus();if(M(nP,`RPC '${e}' ${i} failed with status:`,r,"response text:",h.getResponseText()),r>0){let e=h.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values($).indexOf(t)>=0?t:$.UNKNOWN}(t.status);u(new q(e,t.message))}else u(new q($.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new q($.UNAVAILABLE,"Connection failed."));break;default:j(9055,{s_:e,streamId:i,o_:h.getLastErrorCode(),__:h.getLastError()})}}finally{M(nP,`RPC '${e}' ${i} completed.`)}});let c=JSON.stringify(n);M(nP,`RPC '${e}' ${i} sending request:`,n),h.send(t,"POST",c,r,15)})}a_(e,t,r){let n=nA(),i=[this.Lo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=d(),o=c(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},p=this.longPollingOptions.timeoutSeconds;void 0!==p&&(l.longPollingTimeout=Math.round(1e3*p)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Uo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let g=i.join("");M(nP,`Creating RPC '${e}' stream ${n}: ${g}`,l);let m=s.createWebChannel(g,l),y=!1,v=!1,w=new nO({Go:t=>{v?M(nP,`Not sending because RPC '${e}' stream ${n} is closed:`,t):(y||(M(nP,`Opening RPC '${e}' stream ${n} transport.`),m.open(),y=!0),M(nP,`RPC '${e}' stream ${n} sending:`,t),m.send(t))},zo:()=>m.close()}),E=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};return E(m,a.EventType.OPEN,()=>{v||(M(nP,`RPC '${e}' stream ${n} transport opened.`),w.t_())}),E(m,a.EventType.CLOSE,()=>{v||(v=!0,M(nP,`RPC '${e}' stream ${n} transport closed`),w.r_())}),E(m,a.EventType.ERROR,t=>{v||(v=!0,V(nP,`RPC '${e}' stream ${n} transport errored. Name:`,t.name,"Message:",t.message),w.r_(new q($.UNAVAILABLE,"The operation could not be completed")))}),E(m,a.EventType.MESSAGE,t=>{var r;if(!v){let i=t.data[0];z(!!i,16349);let s=(null==i?void 0:i.error)||(null===(r=i[0])||void 0===r?void 0:r.error);if(s){M(nP,`RPC '${e}' stream ${n} received error:`,s);let t=s.status,r=function(e){let t=f[e];if(void 0!==t)return rd(t)}(t),i=s.message;void 0===r&&(r=$.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),v=!0,w.r_(new q(r,i)),m.close()}else M(nP,`RPC '${e}' stream ${n} received:`,i),w.i_(i)}}),E(o,h.STAT_EVENT,t=>{t.stat===u.PROXY?M(nP,`RPC '${e}' stream ${n} detected buffering proxy`):t.stat===u.NOPROXY&&M(nP,`RPC '${e}' stream ${n} detected no buffering proxy`)}),setTimeout(()=>{w.n_()},0),w}}function nL(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nx(e){return new rN(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nM{constructor(e,t,r=1e3,n=1.5,i=6e4){this.bi=e,this.timerId=t,this.u_=r,this.c_=n,this.l_=i,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(e){this.cancel();let t=Math.floor(this.h_+this.d_()),r=Math.max(0,Date.now()-this.T_),n=Math.max(0,t-r);n>0&&M("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.h_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,n,()=>(this.T_=Date.now(),e())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){null!==this.P_&&(this.P_.skipDelay(),this.P_=null)}cancel(){null!==this.P_&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nU="PersistentStream";class nV{constructor(e,t,r,n,i,s,a,o){this.bi=e,this.R_=r,this.V_=n,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new nM(e,t)}w_(){return 1===this.state||5===this.state||this.b_()}b_(){return 2===this.state||3===this.state}start(){this.p_=0,4!==this.state?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&null===this.f_&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(e){this.M_(),this.stream.send(e)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(e,t){this.M_(),this.x_(),this.y_.cancel(),this.m_++,4!==e?this.y_.reset():t&&t.code===$.RESOURCE_EXHAUSTED?(U(t.toString()),U("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):t&&t.code===$.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.O_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zo(t)}O_(){}auth(){this.state=1;let e=this.N_(this.m_),t=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.m_===t&&this.B_(e,r)},t=>{e(()=>{let e=new q($.UNKNOWN,"Fetching auth token failed: "+t.message);return this.L_(e)})})}B_(e,t){let r=this.N_(this.m_);this.stream=this.k_(e,t),this.stream.jo(()=>{r(()=>this.listener.jo())}),this.stream.Jo(()=>{r(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(e=>{r(()=>this.L_(e))}),this.stream.onMessage(e=>{r(()=>1==++this.p_?this.q_(e):this.onNext(e))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(e){return M(nU,`close with error: ${e}`),this.stream=null,this.close(4,e)}N_(e){return t=>{this.bi.enqueueAndForget(()=>this.m_===e?t():(M(nU,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class nF extends nV{constructor(e,t,r,n,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}k_(e,t){return this.connection.a_("Listen",e,t)}q_(e){return this.onNext(e)}onNext(e){this.y_.reset();let t=function(e,t){let r;if("targetChange"in t){var n,i;t.targetChange;let s="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:j(39313,{state:n}),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(z(void 0===i||"string"==typeof i,58123),eO.fromBase64String(i||"")):(z(void 0===i||i instanceof R||i instanceof Uint8Array,16193),eO.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause,u=l&&function(e){let t=void 0===e.code?$.UNKNOWN:rd(e.code);return new q(t,e.message||"")}(l);r=new rb(s,a,o,u||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let i=rF(e,n.document.name),s=rL(n.document.updateTime),a=n.document.createTime?rL(n.document.createTime):eo.min(),o=new tr({mapValue:{fields:n.document.fields}}),l=tn.newFoundDocument(i,s,a,o),u=n.targetIds||[],h=n.removedTargetIds||[];r=new rE(u,h,l.key,l)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let i=rF(e,n.document),s=n.readTime?rL(n.readTime):eo.min(),a=tn.newNoDocument(i,s),o=n.removedTargetIds||[];r=new rE([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let i=rF(e,n.document),s=n.removedTargetIds||[];r=new rE([],s,i,null)}else{if(!("filter"in t))return j(11601,{Vt:t});{t.filter;let e=t.filter;e.targetId;let{count:n=0,unchangedNames:i}=e,s=new rc(n,i),a=e.targetId;r=new r_(a,s)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return eo.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?eo.min():t.readTime?rL(t.readTime):eo.min()}(e);return this.listener.Q_(t,r)}U_(e){let t={};t.database=rB(this.serializer),t.addTarget=function(e,t){let r;let n=t.target;if((r=tS(n)?{documents:{documents:[rj(e,n.path)]}}:{query:function(e,t){var r,n;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=rj(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof tu?function(e){if("=="===e.op){if(e3(e.value))return{unaryFilter:{field:rq(e.field),op:"IS_NAN"}};if(e5(e.value))return{unaryFilter:{field:rq(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(e3(e.value))return{unaryFilter:{field:rq(e.field),op:"IS_NOT_NAN"}};if(e5(e.value))return{unaryFilter:{field:rq(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rq(e.field),op:rk[e.op],value:e.value}}}(t):t instanceof th?function(t){let r=t.getFilters().map(t=>e(t));return 1===r.length?r[0]:{compositeFilter:{op:rR[t.op],filters:r}}}(t):j(54877,{filter:t})}(th.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:rq(e.field),direction:rA[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=rO(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(r=t.startAt).inclusive,values:r.position}),t.endAt&&(s.structuredQuery.endAt={before:!(n=t.endAt).inclusive,values:n.position}),{gt:s,parent:i}}(e,n).gt}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=rD(e,t.resumeToken);let n=rO(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(eo.min())>0){r.readTime=rP(e,t.snapshotVersion.toTimestamp());let n=rO(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);let r=function(e,t){let r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j(28987,{purpose:e})}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.serializer,e);r&&(t.labels=r),this.F_(t)}K_(e){let t={};t.database=rB(this.serializer),t.removeTarget=e,this.F_(t)}}class nj extends nV{constructor(e,t,r,n,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(e,t){return this.connection.a_("Write",e,t)}q_(e){return z(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,z(!e.writeResults||0===e.writeResults.length,55816),this.listener.z_()}onNext(e){var t,r;z(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.y_.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(z(void 0!==r,14353),t.map(e=>{let t;return(t=e.updateTime?rL(e.updateTime):rL(r)).isEqual(eo.min())&&(t=rL(r)),new t9(t,e.transformResults||[])})):[]),i=rL(e.commitTime);return this.listener.j_(i,n)}H_(){let e={};e.database=rB(this.serializer),this.F_(e)}G_(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var r;let n;if(t instanceof rt)n={update:r$(e,t.key,t.value)};else if(t instanceof ra)n={delete:rV(e,t.key)};else if(t instanceof rr)n={update:r$(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof ro))return j(16599,{ft:t.type});n={verify:rV(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof tJ)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof tY)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof tZ)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof t1)return{fieldPath:t.field.canonicalString(),increment:r.Re};throw j(20930,{transform:t.transform})})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:rP(e,r.updateTime.toTimestamp())}:void 0!==r.exists?{exists:r.exists}:j(27497)),n})(this.serializer,e))};this.F_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nB{}class nz extends nB{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.J_=!1}Y_(){if(this.J_)throw new q($.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(e,t,r,n){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Qo(e,rM(t,r),n,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new q($.UNKNOWN,e.toString())})}Wo(e,t,r,n,i){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,rM(t,r),n,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new q($.UNKNOWN,e.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class n${constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){0===this.Z_&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(e){"Online"===this.state?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.na("Offline")))}set(e){this.sa(),this.Z_=0,"Online"===e&&(this.ea=!1),this.na(e)}na(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ra(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(U(t),this.ea=!1):M("OnlineStateTracker",t)}sa(){null!==this.X_&&(this.X_.cancel(),this.X_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nq="RemoteStore";class nH{constructor(e,t,r,n,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=i,this.ca.vo(e=>{r.enqueueAndForget(async()=>{n0(this)&&(M(nq,"Restarting streams for network reachability change."),await async function(e){e.aa.add(4),await nG(e),e.la.set("Unknown"),e.aa.delete(4),await nK(e)}(this))})}),this.la=new n$(r,n)}}async function nK(e){if(n0(e))for(let t of e.ua)await t(!0)}async function nG(e){for(let t of e.ua)await t(!1)}function nW(e,t){e._a.has(t.targetId)||(e._a.set(t.targetId,t),nZ(e)?nX(e):io(e).b_()&&nJ(e,t))}function nQ(e,t){let r=io(e);e._a.delete(t),r.b_()&&nY(e,t),0===e._a.size&&(r.b_()?r.v_():n0(e)&&e.la.set("Unknown"))}function nJ(e,t){if(e.ha.Ke(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(eo.min())>0){let r=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(r)}io(e).U_(t)}function nY(e,t){e.ha.Ke(t),io(e).K_(t)}function nX(e){e.ha=new rI({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),Rt:t=>e._a.get(t)||null,Pt:()=>e.datastore.serializer.databaseId}),io(e).start(),e.la.ta()}function nZ(e){return n0(e)&&!io(e).w_()&&e._a.size>0}function n0(e){return 0===e.aa.size}async function n1(e){e.la.set("Online")}async function n2(e){e._a.forEach((t,r)=>{nJ(e,t)})}async function n4(e,t){e.ha=void 0,nZ(e)?(e.la.ia(t),nX(e)):e.la.set("Unknown")}async function n9(e,t,r){if(e.la.set("Online"),t instanceof rb&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds)e._a.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e._a.delete(n),e.ha.removeTarget(n))}(e,t)}catch(r){M(nq,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await n6(e,r)}else if(t instanceof rE?e.ha.Xe(t):t instanceof r_?e.ha.ot(t):e.ha.nt(t),!r.isEqual(eo.min()))try{let t=await nv(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.ha.It(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let i=e._a.get(n);i&&e._a.set(n,i.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{let n=e._a.get(t);if(!n)return;e._a.set(t,n.withResumeToken(eO.EMPTY_BYTE_STRING,n.snapshotVersion)),nY(e,t);let i=new rG(n.target,t,r,n.sequenceNumber);nJ(e,i)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){M(nq,"Failed to raise snapshot:",t),await n6(e,t)}}async function n6(e,t,r){if(!ev(t))throw t;e.aa.add(1),await nG(e),e.la.set("Offline"),r||(r=()=>nv(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{M(nq,"Retrying IndexedDB access"),await r(),e.aa.delete(1),await nK(e)})}function n5(e,t){return t().catch(r=>n6(e,r,t))}async function n3(e){let t=il(e),r=e.oa.length>0?e.oa[e.oa.length-1].batchId:-1;for(;n0(e)&&e.oa.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.oa.length&&t.v_();break}r=n.batchId,function(e,t){e.oa.push(t);let r=il(e);r.b_()&&r.W_&&r.G_(t.mutations)}(e,n)}catch(t){await n6(e,t)}n8(e)&&n7(e)}function n8(e){return n0(e)&&!il(e).w_()&&e.oa.length>0}function n7(e){il(e).start()}async function ie(e){il(e).H_()}async function it(e){let t=il(e);for(let r of e.oa)t.G_(r.mutations)}async function ir(e,t,r){let n=e.oa.shift(),i=ru.from(n,t,r);await n5(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await n3(e)}async function ii(e,t){t&&il(e).W_&&await async function(e,t){var r;if(function(e){switch(e){case $.OK:return j(64938);case $.CANCELLED:case $.UNKNOWN:case $.DEADLINE_EXCEEDED:case $.RESOURCE_EXHAUSTED:case $.INTERNAL:case $.UNAVAILABLE:case $.UNAUTHENTICATED:return!1;case $.INVALID_ARGUMENT:case $.NOT_FOUND:case $.ALREADY_EXISTS:case $.PERMISSION_DENIED:case $.FAILED_PRECONDITION:case $.ABORTED:case $.OUT_OF_RANGE:case $.UNIMPLEMENTED:case $.DATA_LOSS:return!0;default:return j(15467,{code:e})}}(r=t.code)&&r!==$.ABORTED){let r=e.oa.shift();il(e).D_(),await n5(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await n3(e)}}(e,t),n8(e)&&n7(e)}async function is(e,t){e.asyncQueue.verifyOperationInProgress(),M(nq,"RemoteStore received new credentials");let r=n0(e);e.aa.add(3),await nG(e),r&&e.la.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.aa.delete(3),await nK(e)}async function ia(e,t){t?(e.aa.delete(2),await nK(e)):t||(e.aa.add(2),await nG(e),e.la.set("Unknown"))}function io(e){var t,r,n;return e.Pa||(e.Pa=(t=e.datastore,r=e.asyncQueue,n={jo:n1.bind(null,e),Jo:n2.bind(null,e),Zo:n4.bind(null,e),Q_:n9.bind(null,e)},t.Y_(),new nF(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.ua.push(async t=>{t?(e.Pa.D_(),nZ(e)?nX(e):e.la.set("Unknown")):(await e.Pa.stop(),e.ha=void 0)})),e.Pa}function il(e){var t,r,n;return e.Ta||(e.Ta=(t=e.datastore,r=e.asyncQueue,n={jo:()=>Promise.resolve(),Jo:ie.bind(null,e),Zo:ii.bind(null,e),z_:it.bind(null,e),j_:ir.bind(null,e)},t.Y_(),new nj(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.ua.push(async t=>{t?(e.Ta.D_(),await n3(e)):(await e.Ta.stop(),e.oa.length>0&&(M(nq,`Stopping write stream with ${e.oa.length} pending writes`),e.oa=[]))})),e.Ta}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e,t,r,n,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=i,this.deferred=new H,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,i){let s=Date.now()+r,a=new iu(e,t,s,n,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new q($.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ih(e,t){if(U("AsyncQueue",`${t}: ${e}`),ev(e))return new q($.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{static emptySet(e){return new ic(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||ef.comparator(t.key,r.key):(e,t)=>ef.comparator(e.key,t.key),this.keyedMap=tF(),this.sortedSet=new eI(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ic)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new ic;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(){this.Ia=new eI(ef.comparator)}track(e){let t=e.doc.key,r=this.Ia.get(t);r?0!==e.type&&3===r.type?this.Ia=this.Ia.insert(t,e):3===e.type&&1!==r.type?this.Ia=this.Ia.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.Ia=this.Ia.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.Ia=this.Ia.remove(t):1===e.type&&2===r.type?this.Ia=this.Ia.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):j(63341,{Vt:e,Ea:r}):this.Ia=this.Ia.insert(t,e)}da(){let e=[];return this.Ia.inorderTraversal((t,r)=>{e.push(r)}),e}}class ip{constructor(e,t,r,n,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,n,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new ip(e,t,ic.emptySet(t),s,r,n,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&tO(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(e=>e.ma())}}class im{constructor(){this.queries=iy(),this.onlineState="Unknown",this.fa=new Set}terminate(){!function(e,t){let r=e.queries;e.queries=iy(),r.forEach((e,r)=>{for(let e of r.Ra)e.onError(t)})}(this,new q($.ABORTED,"Firestore shutting down"))}}function iy(){return new tM(e=>tP(e),tO)}async function iv(e,t){let r=3,n=t.query,i=e.queries.get(n);i?!i.Va()&&t.ma()&&(r=2):(i=new ig,r=t.ma()?0:1);try{switch(r){case 0:i.Aa=await e.onListen(n,!0);break;case 1:i.Aa=await e.onListen(n,!1);break;case 2:await e.onFirstRemoteStoreListen(n)}}catch(r){let e=ih(r,`Initialization of query '${tD(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,i),i.Ra.push(t),t.ga(e.onlineState),i.Aa&&t.pa(i.Aa)&&ib(e)}async function iw(e,t){let r=t.query,n=3,i=e.queries.get(r);if(i){let e=i.Ra.indexOf(t);e>=0&&(i.Ra.splice(e,1),0===i.Ra.length?n=t.ma()?0:1:!i.Va()&&t.ma()&&(n=2))}switch(n){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function iE(e,t){let r=!1;for(let n of t){let t=n.query,i=e.queries.get(t);if(i){for(let e of i.Ra)e.pa(n)&&(r=!0);i.Aa=n}}r&&ib(e)}function i_(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.Ra)e.onError(r);e.queries.delete(t)}function ib(e){e.fa.forEach(e=>{e.next()})}(m=g||(g={})).ya="default",m.Cache="cache";class iT{constructor(e,t,r){this.query=e,this.wa=t,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=r||{}}pa(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new ip(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ba?this.Da(e)&&(this.wa.next(e),t=!0):this.va(e,this.onlineState)&&(this.Ca(e),t=!0),this.Sa=e,t}onError(e){this.wa.error(e)}ga(e){this.onlineState=e;let t=!1;return this.Sa&&!this.ba&&this.va(this.Sa,e)&&(this.Ca(this.Sa),t=!0),t}va(e,t){return!(e.fromCache&&this.ma())||(!this.options.Fa||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Da(e){if(e.docChanges.length>0)return!0;let t=this.Sa&&this.Sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}Ca(e){e=ip.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ba=!0,this.wa.next(e)}ma(){return this.options.source!==g.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e){this.key=e}}class iS{constructor(e){this.key=e}}class iC{constructor(e,t){this.query=e,this.qa=t,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=tq(),this.mutatedKeys=tq(),this.Ua=tx(e),this.Ka=new ic(this.Ua)}get Wa(){return this.qa}Ga(e,t){let r=t?t.za:new id,n=t?t.Ka:this.Ka,i=t?t.mutatedKeys:this.mutatedKeys,s=n,a=!1,o="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,l="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=tL(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(r.track({type:3,doc:h}),f=!0):this.ja(u,h)||(r.track({type:2,doc:h}),f=!0,(o&&this.Ua(h,o)>0||l&&0>this.Ua(h,l))&&(a=!0)):!u&&h?(r.track({type:0,doc:h}),f=!0):u&&!h&&(r.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),r.track({type:1,doc:e})}return{Ka:s,za:r,ys:a,mutatedKeys:i}}ja(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){let i=this.Ka;this.Ka=e.Ka,this.mutatedKeys=e.mutatedKeys;let s=e.za.da();s.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j(20277,{Vt:e})}};return r(e)-r(t)})(e.type,t.type)||this.Ua(e.doc,t.doc)),this.Ha(r),n=null!=n&&n;let a=t&&!n?this.Ja():[],o=0===this.$a.size&&this.current&&!n?1:0,l=o!==this.Qa;return(this.Qa=o,0!==s.length||l)?{snapshot:new ip(this.query,e.Ka,i,s,e.mutatedKeys,0===o,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ya:a}:{Ya:a}}ga(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new id,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(e){return!this.qa.has(e)&&!!this.Ka.has(e)&&!this.Ka.get(e).hasLocalMutations}Ha(e){e&&(e.addedDocuments.forEach(e=>this.qa=this.qa.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.qa=this.qa.delete(e)),this.current=e.current)}Ja(){if(!this.current)return[];let e=this.$a;this.$a=tq(),this.Ka.forEach(e=>{this.Za(e.key)&&(this.$a=this.$a.add(e.key))});let t=[];return e.forEach(e=>{this.$a.has(e)||t.push(new iS(e))}),this.$a.forEach(r=>{e.has(r)||t.push(new iI(r))}),t}Xa(e){this.qa=e.Ns,this.$a=tq();let t=this.Ga(e.documents);return this.applyChanges(t,!0)}eu(){return ip.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,0===this.Qa,this.hasCachedResults)}}let iA="SyncEngine";class ik{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class iR{constructor(e){this.key=e,this.tu=!1}}class iN{constructor(e,t,r,n,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.nu={},this.ru=new tM(e=>tP(e),tO),this.iu=new Map,this.su=new Set,this.ou=new eI(ef.comparator),this._u=new Map,this.au=new nr,this.uu={},this.cu=new Map,this.lu=r0.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return!0===this.hu}}async function iO(e,t,r=!0){let n;let i=iX(e),s=i.ru.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),n=s.view.eu()):n=await iD(i,t,r,!0),n}async function iP(e,t){let r=iX(e);await iD(r,t,!0,!1)}async function iD(e,t,r,n){var i,s;let a;let o=await (i=e.localStore,s=tR(t),i.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return i.ai.getTargetData(e,s).next(r=>r?(t=r,ey.resolve(t)):i.ai.allocateTargetId(e).next(r=>(t=new rG(s,r,"TargetPurposeListen",e.currentSequenceNumber),i.ai.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=i.Ss.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(i.Ss=i.Ss.insert(e.targetId,e),i.Ds.set(s,e.targetId)),e})),l=o.targetId,u=e.sharedClientState.addLocalQueryTarget(l,r);return n&&(a=await iL(e,t,l,"current"===u,o.resumeToken)),e.isPrimaryClient&&r&&nW(e.remoteStore,o),a}async function iL(e,t,r,n,i){e.Pu=(t,r,n)=>(async function(e,t,r,n){let i=t.view.Ga(r);i.ys&&(i=await nE(e.localStore,t.query,!1).then(({documents:e})=>t.view.Ga(e,i)));let s=n&&n.targetChanges.get(t.targetId),a=n&&null!=n.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return iG(e,t.targetId,o.Ya),o.snapshot})(e,t,r,n);let s=await nE(e.localStore,t,!0),a=new iC(t,s.Ns),o=a.Ga(s.documents),l=rw.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);iG(e,r,u.Ya);let h=new ik(t,r,a);return e.ru.set(t,h),e.iu.has(r)?e.iu.get(r).push(t):e.iu.set(r,[t]),u.snapshot}async function ix(e,t,r){let n=e.ru.get(t),i=e.iu.get(n.targetId);if(i.length>1)return e.iu.set(n.targetId,i.filter(e=>!tO(e,t))),void e.ru.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await nw(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),r&&nQ(e.remoteStore,n.targetId),iH(e,n.targetId)}).catch(em)):(iH(e,n.targetId),await nw(e.localStore,n.targetId,!0))}async function iM(e,t){let r=e.ru.get(t),n=e.iu.get(r.targetId);e.isPrimaryClient&&1===n.length&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),nQ(e.remoteStore,r.targetId))}async function iU(e,t,r){var n;let i=(e.remoteStore.remoteSyncer.applySuccessfulWrite=iB.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=iz.bind(null,e),e);try{let e;let s=await function(e,t){let r,n;let i=ea.now(),s=t.reduce((e,t)=>e.add(t.key),tq());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=tU,l=tq();return e.Cs.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(n=>{r=n;let s=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),i=tQ(n.transform,e||null);null!=i&&(null===r&&(r=tr.empty()),r.set(n.field,i))}return r||null}(e,r.get(e.key).overlayedDocument);null!=t&&s.push(new rr(e.key,t,function e(t){let r=[];return eb(t.fields,(t,n)=>{let i=new ed([t]);if(e8(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(i);else for(let e of t)r.push(i.child(e))}else r.push(i)}),new eR(r)}(t.value.mapValue),t6.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{n=t;let i=t.applyToLocalDocumentSet(r,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:n.batchId,changes:tj(r)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),n=s.batchId,(e=i.uu[i.currentUser.toKey()])||(e=new eI(er)),e=e.insert(n,r),i.uu[i.currentUser.toKey()]=e,await iQ(i,s.changes),await n3(i.remoteStore)}catch(t){let e=ih(t,"Failed to persist write");r.reject(e)}}async function iV(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.Ss;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{var s;let a,o;let l=e.Cs.newChangeBuffer({trackRemovals:!0});n=e.Ss;let u=[];t.targetChanges.forEach((s,a)=>{let o=n.get(a);if(!o)return;u.push(e.ai.removeMatchingKeys(i,s.removedDocuments,a).next(()=>e.ai.addMatchingKeys(i,s.addedDocuments,a)));let l=o.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(a)?l=l.withResumeToken(eO.EMPTY_BYTE_STRING,eo.min()).withLastLimboFreeSnapshotVersion(eo.min()):s.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(s.resumeToken,r)),n=n.insert(a,l),function(e,t,r){if(0===e.resumeToken.approximateByteSize())return!0;let n=t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds();if(n>=3e8)return!0;let i=r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size;return i>0}(o,l,s)&&u.push(e.ai.updateTargetData(i,l))});let h=tU,c=tq();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,r))}),u.push((s=t.documentUpdates,a=tq(),o=tq(),s.forEach(e=>a=a.add(e)),l.getEntries(i,a).next(e=>{let t=tU;return s.forEach((r,n)=>{let i=e.get(r);n.isFoundDocument()!==i.isFoundDocument()&&(o=o.add(r)),n.isNoDocument()&&n.version.isEqual(eo.min())?(l.removeEntry(r,n.readTime),t=t.insert(r,n)):!i.isValidDocument()||n.version.compareTo(i.version)>0||0===n.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(n),t=t.insert(r,n)):M(ng,"Ignoring outdated watch update for ",r,". Current version:",i.version," Watch version:",n.version)}),{xs:t,Os:o}})).next(e=>{h=e.xs,c=e.Os})),!r.isEqual(eo.min())){let t=e.ai.getLastRemoteSnapshotVersion(i).next(t=>e.ai.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(t)}return ey.waitFor(u).next(()=>l.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,h,c)).next(()=>h)}).then(t=>(e.Ss=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e._u.get(r);n&&(z(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?n.tu=!0:t.modifiedDocuments.size>0?z(n.tu,14607):t.removedDocuments.size>0&&(z(n.tu,42227),n.tu=!1))}),await iQ(e,r,t)}catch(e){await em(e)}}function iF(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let i=[];e.ru.forEach((e,r)=>{let n=r.view.ga(t);n.snapshot&&i.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.Ra)e.ga(t)&&(r=!0)}),r&&ib(n),i.length&&e.nu.Q_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function ij(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e._u.get(t),i=n&&n.key;if(i){let r=new eI(ef.comparator);r=r.insert(i,tn.newNoDocument(i,eo.min()));let n=tq().add(i),s=new rv(eo.min(),new Map,new eI(er),r,n);await iV(e,s),e.ou=e.ou.remove(i),e._u.delete(t),iW(e)}else await nw(e.localStore,t,!1).then(()=>iH(e,t,r)).catch(em)}async function iB(e,t){var r;let n=t.batch.batchId;try{let i=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),i=r.Cs.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let i=r.batch,s=i.keys(),a=ey.resolve();return s.forEach(e=>{a=a.next(()=>n.getEntry(t,e)).next(t=>{let s=r.docVersions.get(e);z(null!==s,48541),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(r,e,t,i).next(()=>i.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=tq();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))});iq(e,n,null),i$(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await iQ(e,i)}catch(e){await em(e)}}async function iz(e,t,r){var n;try{let i=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(z(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))});iq(e,t,r),i$(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await iQ(e,i)}catch(e){await em(e)}}function i$(e,t){(e.cu.get(t)||[]).forEach(e=>{e.resolve()}),e.cu.delete(t)}function iq(e,t,r){let n=e.uu[e.currentUser.toKey()];if(n){let i=n.get(t);i&&(r?i.reject(r):i.resolve(),n=n.remove(t)),e.uu[e.currentUser.toKey()]=n}}function iH(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.iu.get(t)))e.ru.delete(n),r&&e.nu.Tu(n,r);e.iu.delete(t),e.isPrimaryClient&&e.au.Ur(t).forEach(t=>{e.au.containsKey(t)||iK(e,t)})}function iK(e,t){e.su.delete(t.path.canonicalString());let r=e.ou.get(t);null!==r&&(nQ(e.remoteStore,r),e.ou=e.ou.remove(t),e._u.delete(r),iW(e))}function iG(e,t,r){for(let n of r)n instanceof iI?(e.au.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.ou.get(r)||e.su.has(n)||(M(iA,"New document in limbo: "+r),e.su.add(n),iW(e))}(e,n)):n instanceof iS?(M(iA,"Document no longer in limbo: "+n.key),e.au.removeReference(n.key,t),e.au.containsKey(n.key)||iK(e,n.key)):j(19791,{Iu:n})}function iW(e){for(;e.su.size>0&&e.ou.size<e.maxConcurrentLimboResolutions;){var t;let r=e.su.values().next().value;e.su.delete(r);let n=new ef(eh.fromString(r)),i=e.lu.next();e._u.set(i,new iR(n)),e.ou=e.ou.insert(n,i),nW(e.remoteStore,new rG(tR((t=n.path,new tC(t))),i,"TargetPurposeLimboResolution",ew.le))}}async function iQ(e,t,r){let n=[],i=[],s=[];e.ru.isEmpty()||(e.ru.forEach((a,o)=>{s.push(e.Pu(o,t,r).then(t=>{var s;if((t||r)&&e.isPrimaryClient){let n=t?!t.fromCache:null===(s=null==r?void 0:r.targetChanges.get(o.targetId))||void 0===s?void 0:s.current;e.sharedClientState.updateQueryState(o.targetId,n?"current":"not-current")}if(t){n.push(t);let e=nd.Ps(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.nu.Q_(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>ey.forEach(t,t=>ey.forEach(t.ls,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>ey.forEach(t.hs,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!ev(e))throw e;M(ng,"Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.Ss.get(t),n=r.snapshotVersion,i=r.withLastLimboFreeSnapshotVersion(n);e.Ss=e.Ss.insert(t,i)}}}(e.localStore,i))}async function iJ(e,t){if(!e.currentUser.isEqual(t)){M(iA,"User change. New user:",t.toKey());let r=await ny(e.localStore,t);e.currentUser=t,e.cu.forEach(e=>{e.forEach(e=>{e.reject(new q($.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.cu.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await iQ(e,r.Ms)}}function iY(e,t){let r=e._u.get(t);if(r&&r.tu)return tq().add(r.key);{let r=tq(),n=e.iu.get(t);if(!n)return r;for(let t of n){let n=e.ru.get(t);r=r.unionWith(n.view.Wa)}return r}}function iX(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=iV.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iY.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ij.bind(null,e),e.nu.Q_=iE.bind(null,e.eventManager),e.nu.Tu=i_.bind(null,e.eventManager),e}class iZ{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=nx(e.databaseInfo.databaseId),this.sharedClientState=this.Au(e),this.persistence=this.Ru(e),await this.persistence.start(),this.localStore=this.Vu(e),this.gcScheduler=this.mu(e,this.localStore),this.indexBackfillerScheduler=this.fu(e,this.localStore)}mu(e,t){return null}fu(e,t){return null}Vu(e){var t,r,n,i;return t=this.persistence,r=new np,n=e.initialUser,i=this.serializer,new nm(t,r,n,i)}Ru(e){return new nl(nh.Ei,this.serializer)}Au(e){return new nb}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}iZ.provider={build:()=>new iZ};class i0 extends iZ{constructor(e){super(),this.cacheSizeBytes=e}mu(e,t){z(this.persistence.referenceDelegate instanceof nc,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new r9(r,e.asyncQueue,t)}Ru(e){let t=void 0!==this.cacheSizeBytes?rZ.withCacheSize(this.cacheSizeBytes):rZ.DEFAULT;return new nl(e=>nc.Ei(e,t),this.serializer)}}class i1{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>iF(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=iJ.bind(null,this.syncEngine),await ia(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new im}createDatastore(e){var t,r,n;let i=nx(e.databaseInfo.databaseId),s=(t=e.databaseInfo,new nD(t));return r=e.authCredentials,n=e.appCheckCredentials,new nz(r,n,s,i)}createRemoteStore(e){var t,r,n,i;return t=this.localStore,r=this.datastore,n=e.asyncQueue,i=nS.C()?new nS:new nT,new nH(t,r,n,e=>iF(this.syncEngine,e,0),i)}createSyncEngine(e,t){return function(e,t,r,n,i,s,a){let o=new iN(e,t,r,n,i,s);return a&&(o.hu=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){M(nq,"RemoteStore shutting down."),e.aa.add(5),await nG(e),e.ca.shutdown(),e.la.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate(),null===(t=this.eventManager)||void 0===t||t.terminate()}}i1.provider={build:()=>new i1};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.pu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.pu(this.observer.error,e):U("Uncaught Error in snapshot listener:",e.toString()))}yu(){this.muted=!0}pu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i4="FirestoreClient";class i9{constructor(e,t,r,n,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=n,this.user=P.UNAUTHENTICATED,this.clientId=et.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async e=>{M(i4,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(M(i4,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new H;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=ih(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function i6(e,t){e.asyncQueue.verifyOperationInProgress(),M(i4,"Initializing OfflineComponentProvider");let r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await ny(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function i5(e,t){e.asyncQueue.verifyOperationInProgress();let r=await i3(e);M(i4,"Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>is(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>is(t.remoteStore,r)),e._onlineComponents=t}async function i3(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){M(i4,"Using user provided OfflineComponentProvider");try{await i6(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===$.FAILED_PRECONDITION||t.code===$.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;V("Error using user provided cache. Falling back to memory cache: "+t),await i6(e,new iZ)}}else M(i4,"Using default OfflineComponentProvider"),await i6(e,new i0(void 0))}return e._offlineComponents}async function i8(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(M(i4,"Using user provided OnlineComponentProvider"),await i5(e,e._uninitializedComponentsProvider._online)):(M(i4,"Using default OnlineComponentProvider"),await i5(e,new i1))),e._onlineComponents}async function i7(e){let t=await i8(e),r=t.eventManager;return r.onListen=iO.bind(null,t.syncEngine),r.onUnlisten=ix.bind(null,t.syncEngine),r.onFirstRemoteStoreListen=iP.bind(null,t.syncEngine),r.onLastRemoteStoreUnlisten=iM.bind(null,t.syncEngine),r}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let st=new Map;function sr(e){if(!ef.isDocumentKey(e))throw new q($.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function sn(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":j(12329,{type:typeof e})}function si(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new q($.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=sn(e);throw new q($.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss="firestore.googleapis.com";class sa{constructor(e){var t,r;if(void 0===e.host){if(void 0!==e.ssl)throw new q($.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ss,this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new q($.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,r,n){if(!0===t&&!0===n)throw new q($.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=se(null!==(r=e.experimentalLongPollingOptions)&&void 0!==r?r:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new q($.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new q($.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new q($.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,r;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class so{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sa({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new q($.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new q($.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sa(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new G;switch(e.type){case"firstParty":return new Y(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new q($.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=st.get(e);t&&(M("ComponentProvider","Removing Datastore"),st.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new sl(this.firestore,e,this._query)}}class su{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new sh(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new su(this.firestore,e,this._key)}}class sh extends sl{constructor(e,t,r){super(e,t,new tC(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new su(this.firestore,null,new ef(e))}withConverter(e){return new sh(this.firestore,e,this._path)}}function sc(e,t,...r){if(e=(0,I.m9)(e),1==arguments.length&&(t=et.newId()),/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,r){if(!r)throw new q($.INVALID_ARGUMENT,`Function doc() cannot be called with an empty ${t}.`)}(0,"path",t),e instanceof so){let n=eh.fromString(t,...r);return sr(n),new su(e,null,new ef(n))}{if(!(e instanceof su||e instanceof sh))throw new q($.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(eh.fromString(t,...r));return sr(n),new su(e.firestore,e instanceof sh?e.converter:null,new ef(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sd="AsyncQueue";class sf{constructor(e=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new nM(this,"async_queue_retry"),this.ju=()=>{let e=nL();e&&M(sd,"Visibility state changed to "+e.visibilityState),this.y_.A_()},this.Hu=e;let t=nL();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Ju(),this.Yu(e)}enterRestrictedMode(e){if(!this.$u){this.$u=!0,this.Gu=e||!1;let t=nL();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.ju)}}enqueue(e){if(this.Ju(),this.$u)return new Promise(()=>{});let t=new H;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qu.push(e),this.Zu()))}async Zu(){if(0!==this.Qu.length){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(e){if(!ev(e))throw e;M(sd,"Operation failed with retryable error: "+e)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(e){let t=this.Hu.then(()=>(this.Wu=!0,e().catch(e=>{throw this.Ku=e,this.Wu=!1,U("INTERNAL UNHANDLED ERROR: ",sp(e)),e}).then(e=>(this.Wu=!1,e))));return this.Hu=t,t}enqueueAfterDelay(e,t,r){this.Ju(),this.zu.indexOf(e)>-1&&(t=0);let n=iu.createAndSchedule(this,e,t,r,e=>this.Xu(e));return this.Uu.push(n),n}Ju(){this.Ku&&j(47125,{ec:sp(this.Ku)})}verifyOperationInProgress(){}async tc(){let e;do e=this.Hu,await e;while(e!==this.Hu)}nc(e){for(let t of this.Uu)if(t.timerId===e)return!0;return!1}rc(e){return this.tc().then(()=>{for(let t of(this.Uu.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.Uu))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.tc()})}sc(e){this.zu.push(e)}Xu(e){let t=this.Uu.indexOf(e);this.Uu.splice(t,1)}}function sp(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class sg extends so{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new sf,this._persistenceKey=(null==n?void 0:n.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new sf(e),this._firestoreClient=void 0,await e}}}function sm(e){if(e._terminated)throw new q($.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,r,n,i,s,a;let o=e._freezeSettings(),l=(i=e._databaseId,s=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",a=e._persistenceKey,new e$(i,s,a,o.host,o.ssl,o.experimentalForceLongPolling,o.experimentalAutoDetectLongPolling,se(o.experimentalLongPollingOptions),o.useFetchStreams));e._componentsProvider||(null===(r=o.localCache)||void 0===r?void 0:r._offlineComponentProvider)&&(null===(n=o.localCache)||void 0===n?void 0:n._onlineComponentProvider)&&(e._componentsProvider={_offline:o.localCache._offlineComponentProvider,_online:o.localCache._onlineComponentProvider}),e._firestoreClient=new i9(e._authCredentials,e._appCheckCredentials,e._queue,l,e._componentsProvider&&function(e){let t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}(e),e._firestoreClient}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e){this._byteString=e}static fromBase64String(e){try{return new sy(eO.fromBase64String(e))}catch(e){throw new q($.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new sy(eO.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new q($.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ed(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new q($.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new q($.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return er(this._lat,e._lat)||er(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sb=/^__.*__$/;class sT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new rr(e,this.data,this.fieldMask,t,this.fieldTransforms):new rt(e,this.data,t,this.fieldTransforms)}}function sI(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j(40011,{oc:e})}}class sS{constructor(e,t,r,n,i,s){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===i&&this._c(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(e){return new sS(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.ac({path:r,cc:!1});return n.lc(e),n}hc(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.ac({path:r,cc:!1});return n._c(),n}Pc(e){return this.ac({path:void 0,cc:!0})}Tc(e){return sO(e,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}_c(){if(this.path)for(let e=0;e<this.path.length;e++)this.lc(this.path.get(e))}lc(e){if(0===e.length)throw this.Tc("Document fields must not be empty");if(sI(this.oc)&&sb.test(e))throw this.Tc('Document fields cannot begin and end with "__"')}}class sC{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||nx(e)}dc(e,t,r,n=!1){return new sS({oc:e,methodName:t,Ec:r,path:ed.emptyPath(),cc:!1,Ic:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sA(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ea||e instanceof sE||e instanceof sy||e instanceof su||e instanceof sw||e instanceof s_)}function sk(e,t,r){if(!sA(r)||!("object"==typeof r&&null!==r&&(Object.getPrototypeOf(r)===Object.prototype||null===Object.getPrototypeOf(r)))){let n=sn(r);throw"an object"===n?t.Tc(e+" a custom object"):t.Tc(e+" "+n)}}let sR=RegExp("[~\\*/\\[\\]]");function sN(e,t,r){if(t.search(sR)>=0)throw sO(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new sv(...t.split("."))._internalPath}catch(n){throw sO(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function sO(e,t,r,n,i){let s=n&&!n.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;r&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${n}`),a&&(l+=` in document ${i}`),l+=")"),new q($.INVALID_ARGUMENT,o+e+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sP{constructor(e,t,r,n,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new su(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new sD(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(sL("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class sD extends sP{data(){return super.data()}}function sL(e,t){return"string"==typeof t?sN(e,t):t instanceof sv?t._internalPath:t._delegate._internalPath}class sx{convertValue(e,t="none"){switch(eY(e)){case 0:return null;case 1:return e.booleanValue;case 2:return eL(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ex(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw j(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return eb(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertVectorValue(e){var t,r,n;let i=null===(n=null===(r=null===(t=e.fields)||void 0===t?void 0:t[eJ].arrayValue)||void 0===r?void 0:r.values)||void 0===n?void 0:n.map(e=>eL(e.doubleValue));return new s_(i)}convertGeoPoint(e){return new sE(eL(e.latitude),eL(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=eB(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ez(e));default:return null}}convertTimestamp(e){let t=eD(e);return new ea(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=eh.fromString(e);z(rK(r),9688,{name:e});let n=new eH(r.get(1),r.get(3)),i=new ef(r.popFirst(5));return n.isEqual(t)||U(`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sM{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sU extends sP{constructor(e,t,r,n,i,s){super(e,t,r,n,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new sV(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(sL("DocumentSnapshot.get",e));if(null!==r)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class sV extends sU{data(e={}){return super.data(e)}}class sF extends sx{constructor(e){super(),this.firestore=e}convertBytes(e){return new sy(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new su(this.firestore,null,t)}}function sj(e,t,r){var n,i;e=si(e,su);let s=si(e.firestore,sg),a=(n=e.converter)?r&&(r.merge||r.mergeFields)?n.toFirestore(t,r):n.toFirestore(t):t;return i=[(function(e,t,r,n,i,s={}){let a,o;let l=e.dc(s.merge||s.mergeFields?2:0,t,r,i);sk("Data must be an object, but it was:",l,n);let u=function e(t,r){let n={};return eT(t)?r.path&&r.path.length>0&&r.fieldMask.push(r.path):eb(t,(t,i)=>{let s=function t(r,n){if(sA(r=(0,I.m9)(r)))return sk("Unsupported field value:",n,r),e(r,n);if(r instanceof sw)return function(e,t){if(!sI(t.oc))throw t.Tc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Tc(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(r,n),null;if(void 0===r&&n.ignoreUndefinedProperties)return null;if(n.path&&n.fieldMask.push(n.path),r instanceof Array){if(n.settings.cc&&4!==n.oc)throw n.Tc("Nested arrays are not supported");return function(e,r){let n=[],i=0;for(let s of e){let e=t(s,r.Pc(i));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),i++}return{arrayValue:{values:n}}}(r,n)}return function(e,t){if(null===(e=(0,I.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e){var r,n,i;return r=t.serializer,"number"==typeof(i=n=e)&&Number.isInteger(i)&&!eE(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER?tG(n):tK(r,n)}if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=ea.fromDate(e);return{timestampValue:rP(t.serializer,r)}}if(e instanceof ea){let r=new ea(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rP(t.serializer,r)}}if(e instanceof sE)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof sy)return{bytesValue:rD(t.serializer,e._byteString)};if(e instanceof su){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.Tc(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:rx(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof s_)return function(e,t){let r={fields:{[eK]:{stringValue:eQ},[eJ]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Tc("VectorValues must only contain numeric values.");return tK(t.serializer,e)})}}}};return{mapValue:r}}(e,t);throw t.Tc(`Unsupported field value: ${sn(e)}`)}(r,n)}(i,r.uc(t));null!=s&&(n[t]=s)}),{mapValue:{fields:n}}}(n,l);if(s.merge)a=new eR(l.fieldMask),o=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let n of s.mergeFields){let i=function(e,t,r){if((t=(0,I.m9)(t))instanceof sv)return t._internalPath;if("string"==typeof t)return sN(e,t);throw sO("Field path arguments must be of type string or ",e,!1,void 0,r)}(t,n,r);if(!l.contains(i))throw new q($.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);(function(e,t){return e.some(e=>e.isEqual(t))})(e,i)||e.push(i)}a=new eR(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new sT(new tr(u),a,o)})(function(e){let t=e._freezeSettings(),r=nx(e._databaseId);return new sC(e._databaseId,!!t.ignoreUndefinedProperties,r)}(s),"setDoc",e._key,a,null!==e.converter,r).toMutation(e._key,t6.none())],function(e,t){let r=new H;return e.asyncQueue.enqueueAndForget(async()=>iU(await i8(e).then(e=>e.syncEngine),t,r)),r.promise}(sm(s),i)}new WeakMap,function(e=!0){D=_.Jn,(0,_.Xd)(new b.wA("firestore",(t,{instanceIdentifier:r,options:n})=>{let i=t.getProvider("app").getImmediate(),s=new sg(new Q(t.getProvider("auth-internal")),new Z(i,t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new q($.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eH(e.options.projectId,t)}(i,r),i);return n=Object.assign({useFetchStreams:e},n),s._setSettings(n),s},"PUBLIC").setMultipleInstances(!0)),(0,_.KN)(N,O,void 0),(0,_.KN)(N,O,"esm2017")}(),/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,_.KN)("firebase","11.6.1","app");let sB=(0,_.ZF)({apiKey:"AIzaSyCvk6kAr9te18YP3ds_jiQc6VZnH7xBN6c",authDomain:"moneymanager-f7891.firebaseapp.com",projectId:"moneymanager-f7891",storageBucket:"moneymanager-f7891.firebasestorage.app",messagingSenderId:"650200368987",appId:"1:650200368987:web:85a5e54d41f90fa95d3c7e"}),sz=(0,E.v0)(sB),s$=function(e,t){let r="object"==typeof e?e:(0,_.Mq)(),n=(0,_.qX)(r,"firestore").getImmediate({identifier:"string"==typeof e?e:eq});if(!n._initialized){let e=(0,I.P0)("firestore");e&&function(e,t,r,n={}){var i;let s=(e=si(e,so))._getSettings(),a=Object.assign(Object.assign({},s),{emulatorOptions:e._getEmulatorOptions()}),o=`${t}:${r}`;s.host!==ss&&s.host!==o&&V("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let l=Object.assign(Object.assign({},s),{host:o,ssl:!1,emulatorOptions:n});if(!(0,I.vZ)(l,a)&&(e._setSettings(l),n.mockUserToken)){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=P.MOCK_USER;else{t=(0,I.Sg)(n.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=n.mockUserToken.sub||n.mockUserToken.user_id;if(!s)throw new q($.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new P(s)}e._authCredentials=new W(new K(t,r))}}(n,...e)}return n}(sB),sq=(0,v.createContext)();function sH(e){let{children:t}=e,[r,n]=(0,v.useState)(null),[i,s]=(0,v.useState)(!0),[a,o]=(0,v.useState)(null),l=(0,w.useRouter)();(0,v.useEffect)(()=>{let e=(0,E.Aj)(sz,async e=>{if(e){try{let t=await e.getIdToken();console.log("[AuthContext] Got Firebase ID token, storing in localStorage"),localStorage.setItem("token",t)}catch(e){console.error("[AuthContext] Error getting Firebase ID token:",e)}n({id:e.uid,email:e.email||"",displayName:e.displayName||void 0,photoURL:e.photoURL||void 0})}else localStorage.removeItem("token"),n(null);s(!1)});return e},[]);let u=e=>{console.error("Auth error:",e);let t="An error occurred during authentication";switch(e.code){case"auth/user-not-found":t="No user found with this email";break;case"auth/wrong-password":t="Invalid password";break;case"auth/email-already-in-use":t="Email already registered";break;case"auth/invalid-email":t="Invalid email address";break;case"auth/weak-password":t="Password should be at least 6 characters";break;case"auth/popup-closed-by-user":t="Google sign-in was cancelled";break;case"auth/operation-not-allowed":t="Google sign-in is not enabled in Firebase. Please enable it in the Firebase console.";break;case"auth/unauthorized-domain":t="This domain is not authorized for OAuth operations. Please add it in the Firebase console.";break;case"permission-denied":case"missing-or-insufficient-permissions":t="Missing or insufficient permissions to access Firestore. Please check your security rules.";break;default:t=e.message||"An unknown error occurred"}return o(t),t},h=async(e,t)=>{try{o(null);let r=await (0,E.e5)(sz,e,t);return r}catch(t){let e=u(t);throw Error(e)}},c=async()=>{try{o(null);let e=new E.hJ;e.setCustomParameters({prompt:"select_account"}),console.log("Starting Google sign-in...");let t=await (0,E.rh)(sz,e);console.log("Google sign-in successful:",t.user.uid);try{let e=sc(s$,"users",t.user.uid),r=await /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){e=si(e,su);let t=si(e.firestore,sg);return(function(e,t,r={}){let n=new H;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){var s;let a=new i2({next:s=>{a.yu(),t.enqueueAndForget(()=>iw(e,o));let l=s.docs.has(r);!l&&s.fromCache?i.reject(new q($.UNAVAILABLE,"Failed to get document because the client is offline.")):l&&s.fromCache&&n&&"server"===n.source?i.reject(new q($.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),o=new iT((s=r.path,new tC(s)),a,{includeMetadataChanges:!0,Fa:!0});return iv(e,o)})(await i7(e),e.asyncQueue,t,r,n)),n.promise})(sm(t),e._key).then(r=>(function(e,t,r){let n=r.docs.get(t._key),i=new sF(e);return new sU(e,i,t._key,n,new sM(r.hasPendingWrites,r.fromCache),t.converter)})(t,e,r))}(e);r.exists()?(console.log("Updating existing user document..."),await sj(e,{lastLogin:new Date().toISOString()},{merge:!0}),console.log("User document updated successfully")):(console.log("Creating new user document..."),await sj(e,{email:t.user.email,displayName:t.user.displayName||null,photoURL:t.user.photoURL||null,createdAt:new Date().toISOString(),lastLogin:new Date().toISOString()}),console.log("User document created successfully"))}catch(e){console.error("Firestore error:",e),o("Authentication successful, but there was an error updating user data: "+e.message)}return t}catch(t){console.error("Google sign-in error:",t);let e=u(t);throw Error(e)}},d=async(e,t)=>{try{o(null);let r=await (0,E.Xb)(sz,e,t);try{let e=sc(s$,"users",r.user.uid);await sj(e,{email:r.user.email,displayName:r.user.displayName||null,photoURL:r.user.photoURL||null,createdAt:new Date().toISOString()},{merge:!0})}catch(e){console.error("Firestore error during signup:",e)}return r}catch(t){let e=u(t);throw Error(e)}},f=async()=>{try{o(null),await (0,E.w7)(sz),n(null),l.push("/")}catch(e){u(e)}},p=()=>!!r,g=(0,v.useMemo)(()=>({user:r,loading:i,error:a,signInWithGoogle:c,logout:f,signInWithEmail:h,signUp:d,isAuthenticated:p,setError:o}),[r,i,a,c,f,h,d,p,o]);return(0,y.jsx)(sq.Provider,{value:g,children:t})}function sK(){return(0,v.useContext)(sq)}},8086:function(e,t,r){"use strict";r.d(t,{MG:function(){return c},e0:function(){return d}});var n=r(5893),i=r(7294);let s=null,a=null,o=async()=>{let e=Date.now();if(s&&a&&e-a<3e5)return console.log("Using cached tags data"),s;try{let t=localStorage.getItem("token");console.log("[tagsService] Token from localStorage for /api/tags/ fetch:",t);let r={"Content-Type":"application/json"};t&&(r.Authorization="Bearer ".concat(t));let n=await fetch("".concat("https://moneymanager-backend-qwbwl7ldoa-oa.a.run.app","/api/tags/"),{headers:r});if(401===n.status)throw console.error("Unauthorized fetching tags. Token might be invalid or expired."),Error("Authentication failed");if(!n.ok)throw Error("Failed to fetch tags: ".concat(n.status," ").concat(n.statusText));let i=await n.json();return s=i,a=e,console.log("Fetched and cached new tags data:",i),i}catch(e){if(console.error("Error fetching tags:",e.message),s)return console.warn("Returning (potentially stale) cached tags due to fetch error."),s;throw e}},l=async()=>(console.log("Force refreshing tags cache..."),s=null,a=null,o());var u=r(2537);let h=(0,i.createContext)();function c(e){let{children:t}=e,{user:r,loading:s}=(0,u.a)(),[a,c]=(0,i.useState)([]),[d,f]=(0,i.useState)(!0),[p,g]=(0,i.useState)(null),[m,y]=(0,i.useState)({}),[v,w]=(0,i.useState)({}),E=(0,i.useCallback)(async()=>{console.log("[TagsContext] Attempting to load tags..."),f(!0),g(null);try{let e=await o();c(e||[]),f(!1),console.log("[TagsContext] Tags loaded successfully.")}catch(e){console.error("[TagsContext] Error loading tags:",e),g(e.message||"Failed to load tags. Please try again later."),c([]),f(!1)}},[]);(0,i.useEffect)(()=>{s||(r?(console.log("[TagsContext] User authenticated, proceeding to load tags."),E()):(console.log("[TagsContext] User not authenticated or logged out, clearing tags."),c([]),w({}),y({}),f(!1),g(null)))},[r,s,E]),(0,i.useEffect)(()=>{if(a.length>0){console.log("[TagsContext] Processing loaded tags into map and facets.");let e=a.reduce((e,t)=>(e[t.tag_id]=t,e),{}),t=a.reduce((e,t)=>(t.facet&&(e[t.facet]||(e[t.facet]=[]),e[t.facet].push(t)),e),{});w(e),y(t)}else w({}),y({})},[a]);let _=(0,i.useCallback)(async()=>{if(!r)return console.warn("[TagsContext] refreshAllTags called but user is not authenticated. Aborting."),g("User not authenticated. Cannot refresh tags."),a;console.log("[TagsContext] Force refreshing tags..."),f(!0),g(null);try{let e=await l();return c(e||[]),f(!1),console.log("[TagsContext] Tags refreshed successfully."),e||[]}catch(e){return console.error("[TagsContext] Error refreshing tags:",e),g(e.message||"Failed to refresh tags. Please try again later."),f(!1),a}},[r,a]),b=(0,i.useCallback)(e=>e&&v[e]||null,[v]),T=(0,i.useCallback)(e=>e&&Array.isArray(e)&&0!==e.length?e.map(e=>v[e]).filter(e=>null!=e):[],[v]),I=(0,i.useCallback)(e=>e&&m[e]||[],[m]);return(0,n.jsx)(h.Provider,{value:{tags:a,loading:d,error:p,tagsByFacet:m,getTag:b,getMultipleTags:T,getTagsInFacet:I,refreshTags:_},children:t})}function d(){let e=(0,i.useContext)(h);if(void 0===e)throw Error("useTags must be used within a TagsProvider");return e}},5417:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Q}});var n=r(5893);r(5303);var i=r(7294);r(1688);let s=()=>{},a=s(),o=Object,l=e=>e===a,u=e=>"function"==typeof e,h=(e,t)=>({...e,...t}),c=e=>u(e.then),d=new WeakMap,f=0,p=e=>{let t,r;let n=typeof e,i=e&&e.constructor,s=i==Date;if(o(e)!==e||s||i==RegExp)t=s?e.toJSON():"symbol"==n?e.toString():"string"==n?JSON.stringify(e):""+e;else{if(t=d.get(e))return t;if(t=++f+"~",d.set(e,t),i==Array){for(r=0,t="@";r<e.length;r++)t+=p(e[r])+",";d.set(e,t)}if(i==o){t="#";let n=o.keys(e).sort();for(;!l(r=n.pop());)l(e[r])||(t+=r+":"+p(e[r])+",");d.set(e,t)}}return t},g=new WeakMap,m={},y={},v="undefined",w=typeof window!=v,E=typeof document!=v,_=()=>w&&typeof window.requestAnimationFrame!=v,b=(e,t)=>{let r=g.get(e);return[()=>!l(t)&&e.get(t)||m,n=>{if(!l(t)){let i=e.get(t);t in y||(y[t]=i),r[5](t,h(i,n),i||m)}},r[6],()=>!l(t)&&t in y?y[t]:!l(t)&&e.get(t)||m]},T=!0,[I,S]=w&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[s,s],C={initFocus:e=>(E&&document.addEventListener("visibilitychange",e),I("focus",e),()=>{E&&document.removeEventListener("visibilitychange",e),S("focus",e)}),initReconnect:e=>{let t=()=>{T=!0,e()},r=()=>{T=!1};return I("online",t),I("offline",r),()=>{S("online",t),S("offline",r)}}},A=(i.useId,!w||"Deno"in window),k=A?i.useEffect:i.useLayoutEffect,R="undefined"!=typeof navigator&&navigator.connection,N=!A&&R&&(["slow-2g","2g"].includes(R.effectiveType)||R.saveData),O=e=>{if(u(e))try{e=e()}catch(t){e=""}let t=e;return[e="string"==typeof e?e:(Array.isArray(e)?e.length:e)?p(e):"",t]},P=0,D=()=>++P;async function L(...e){let[t,r,n,i]=e,s=h({populateCache:!0,throwOnError:!0},"boolean"==typeof i?{revalidate:i}:i||{}),o=s.populateCache,d=s.rollbackOnError,f=s.optimisticData,p=!1!==s.revalidate,m=e=>"function"==typeof d?d(e):!1!==d,y=s.throwOnError;if(u(r)){let e=[],n=t.keys();for(let i of n)!/^\$(inf|sub)\$/.test(i)&&r(t.get(i)._k)&&e.push(i);return Promise.all(e.map(v))}return v(r);async function v(r){let i;let[s]=O(r);if(!s)return;let[h,d]=b(t,s),[v,w,E,_]=g.get(t),T=v[s],I=()=>p&&(delete E[s],delete _[s],T&&T[0])?T[0](2).then(()=>h().data):h().data;if(e.length<3)return I();let S=n,C=D();w[s]=[C,0];let A=!l(f),k=h(),R=k.data,N=k._c,P=l(N)?R:N;if(A&&d({data:f=u(f)?f(P,R):f,_c:P}),u(S))try{S=S(P)}catch(e){i=e}if(S&&c(S)){if(S=await S.catch(e=>{i=e}),C!==w[s][0]){if(i)throw i;return S}i&&A&&m(i)&&(o=!0,d({data:S=P,_c:a}))}o&&!i&&(u(o)&&(S=o(S,P)),d({data:S,error:a,_c:a})),w[s][1]=D();let L=await I();if(d({_c:a}),i){if(y)throw i;return}return o?L:S}}let x=(e,t)=>{for(let r in e)e[r][0]&&e[r][0](t)},M=(e,t)=>{if(!g.has(e)){let r=h(C,t),n={},i=L.bind(a,e),o=s,l={},u=(e,t)=>{let r=l[e]||[];return l[e]=r,r.push(t),()=>r.splice(r.indexOf(t),1)},c=(t,r,n)=>{e.set(t,r);let i=l[t];if(i)for(let e of i)e(r,n)},d=()=>{if(!g.has(e)&&(g.set(e,[n,{},{},{},i,c,u]),!A)){let t=r.initFocus(setTimeout.bind(a,x.bind(a,n,0))),i=r.initReconnect(setTimeout.bind(a,x.bind(a,n,1)));o=()=>{t&&t(),i&&i(),g.delete(e)}}};return d(),[e,i,d,o]}return[e,g.get(e)[4]]},[U,V]=M(new Map),F=h({onLoadingSlow:s,onSuccess:s,onError:s,onErrorRetry:(e,t,r,n,i)=>{let s=r.errorRetryCount,a=i.retryCount,o=~~((Math.random()+.5)*(1<<(a<8?a:8)))*r.errorRetryInterval;(l(s)||!(a>s))&&setTimeout(n,o,i)},onDiscarded:s,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:N?1e4:5e3,focusThrottleInterval:5e3,dedupingInterval:2e3,loadingTimeout:N?5e3:3e3,compare:(e,t)=>p(e)==p(t),isPaused:()=>!1,cache:U,mutate:V,fallback:{}},{isOnline:()=>T,isVisible:()=>{let e=E&&document.visibilityState;return l(e)||"hidden"!==e}}),j=(e,t)=>{let r=h(e,t);if(t){let{use:n,fallback:i}=e,{use:s,fallback:a}=t;n&&s&&(r.use=n.concat(s)),i&&a&&(r.fallback=h(i,a))}return r},B=(0,i.createContext)({}),z=w&&window.__SWR_DEVTOOLS_USE__,$=z?window.__SWR_DEVTOOLS_USE__:[];$.concat(e=>(t,r,n)=>{let i=r&&((...e)=>{let[n]=O(t),[,,,i]=g.get(U),s=i[n];return l(s)?r(...e):(delete i[n],s)});return e(t,i,n)}),z&&(window.__SWR_DEVTOOLS_REACT__=i),i.use||(e=>{if("pending"===e.status)throw e;if("fulfilled"===e.status)return e.value;if("rejected"===e.status)throw e.reason;throw e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e});let q=o.defineProperty(e=>{let{value:t}=e,r=(0,i.useContext)(B),n=u(t),s=(0,i.useMemo)(()=>n?t(r):t,[n,r,t]),o=(0,i.useMemo)(()=>n?s:j(r,s),[n,r,s]),l=s&&s.provider,c=(0,i.useRef)(a);l&&!c.current&&(c.current=M(l(o.cache||U),s));let d=c.current;return d&&(o.cache=d[0],o.mutate=d[1]),k(()=>{if(d)return d[2]&&d[2](),d[3]},[]),(0,i.createElement)(B.Provider,h(e,{value:o}))},"defaultValue",{value:F});var H=r(2537),K=r(8086),G=r(9008),W=r.n(G),Q=function(e){let{Component:t,pageProps:r}=e;return(0,n.jsx)(H.H,{children:(0,n.jsxs)(K.MG,{children:[(0,n.jsxs)(W(),{children:[(0,n.jsx)("title",{children:"MoneyManager - Track Your Expenses"}),(0,n.jsx)("meta",{name:"description",content:"A modern expense tracking application"})]}),(0,n.jsx)(q,{value:{fetcher:(e,t)=>{let r=localStorage.getItem("token"),n={"Content-Type":"application/json",...r&&{Authorization:"Bearer ".concat(r)}};return fetch("".concat("https://moneymanager-backend-qwbwl7ldoa-oa.a.run.app").concat(e),{...t,headers:{...n,...(null==t?void 0:t.headers)||{}}}).then(e=>401===e.status?(localStorage.removeItem("token"),window.location.href="/",Promise.reject("Unauthorized")):e.json())}},children:(0,n.jsx)(t,{...r})})]})})}},1876:function(e){!function(){var t={675:function(e,t){"use strict";t.byteLength=function(e){var t=l(e),r=t[0],n=t[1];return(r+n)*3/4-n},t.toByteArray=function(e){var t,r,s=l(e),a=s[0],o=s[1],u=new i((a+o)*3/4-o),h=0,c=o>0?a-4:a;for(r=0;r<c;r+=4)t=n[e.charCodeAt(r)]<<18|n[e.charCodeAt(r+1)]<<12|n[e.charCodeAt(r+2)]<<6|n[e.charCodeAt(r+3)],u[h++]=t>>16&255,u[h++]=t>>8&255,u[h++]=255&t;return 2===o&&(t=n[e.charCodeAt(r)]<<2|n[e.charCodeAt(r+1)]>>4,u[h++]=255&t),1===o&&(t=n[e.charCodeAt(r)]<<10|n[e.charCodeAt(r+1)]<<4|n[e.charCodeAt(r+2)]>>2,u[h++]=t>>8&255,u[h++]=255&t),u},t.fromByteArray=function(e){for(var t,n=e.length,i=n%3,s=[],a=0,o=n-i;a<o;a+=16383)s.push(function(e,t,n){for(var i,s=[],a=t;a<n;a+=3)s.push(r[(i=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]))>>18&63]+r[i>>12&63]+r[i>>6&63]+r[63&i]);return s.join("")}(e,a,a+16383>o?o:a+16383));return 1===i?s.push(r[(t=e[n-1])>>2]+r[t<<4&63]+"=="):2===i&&s.push(r[(t=(e[n-2]<<8)+e[n-1])>>10]+r[t>>4&63]+r[t<<2&63]+"="),s.join("")};for(var r=[],n=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,o=s.length;a<o;++a)r[a]=s[a],n[s.charCodeAt(a)]=a;function l(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");-1===r&&(r=t);var n=r===t?0:4-r%4;return[r,n]}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},72:function(e,t,r){"use strict";/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var n=r(675),i=r(783),s="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function a(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return Object.setPrototypeOf(t,o.prototype),t}function o(e,t,r){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return h(e)}return l(e,t,r)}function l(e,t,r){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!o.isEncoding(t))throw TypeError("Unknown encoding: "+t);var r=0|f(e,t),n=a(r),i=n.write(e,t);return i!==r&&(n=n.slice(0,i)),n}(e,t);if(ArrayBuffer.isView(e))return c(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(R(e,ArrayBuffer)||e&&R(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(R(e,SharedArrayBuffer)||e&&R(e.buffer,SharedArrayBuffer)))return function(e,t,r){var n;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),o.prototype),n}(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');var n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return o.from(n,t,r);var i=function(e){if(o.isBuffer(e)){var t,r=0|d(e.length),n=a(r);return 0===n.length||e.copy(n,0,0,r),n}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t?a(0):c(e):"Buffer"===e.type&&Array.isArray(e.data)?c(e.data):void 0}(e);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return o.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function u(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function h(e){return u(e),a(e<0?0:0|d(e))}function c(e){for(var t=e.length<0?0:0|d(e.length),r=a(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function d(e){if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function f(e,t){if(o.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||R(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var i=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return S(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return A(e).length;default:if(i)return n?-1:S(e).length;t=(""+t).toLowerCase(),i=!0}}function p(e,t,r){var i,s,a=!1;if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var i="",s=t;s<r;++s)i+=N[e[s]];return i}(this,t,r);case"utf8":case"utf-8":return v(this,t,r);case"ascii":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(127&e[i]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}(this,t,r);case"base64":return i=t,s=r,0===i&&s===this.length?n.fromByteArray(this):n.fromByteArray(this.slice(i,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){for(var n=e.slice(t,r),i="",s=0;s<n.length;s+=2)i+=String.fromCharCode(n[s]+256*n[s+1]);return i}(this,t,r);default:if(a)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),a=!0}}function g(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function m(e,t,r,n,i){var s;if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),(s=r=+r)!=s&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return -1;r=e.length-1}else if(r<0){if(!i)return -1;r=0}if("string"==typeof t&&(t=o.from(t,n)),o.isBuffer(t))return 0===t.length?-1:y(e,t,r,n,i);if("number"==typeof t)return(t&=255,"function"==typeof Uint8Array.prototype.indexOf)?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):y(e,[t],r,n,i);throw TypeError("val must be string, number or Buffer")}function y(e,t,r,n,i){var s,a=1,o=e.length,l=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;a=2,o/=2,l/=2,r/=2}function u(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}if(i){var h=-1;for(s=r;s<o;s++)if(u(e,s)===u(t,-1===h?0:s-h)){if(-1===h&&(h=s),s-h+1===l)return h*a}else -1!==h&&(s-=s-h),h=-1}else for(r+l>o&&(r=o-l),s=r;s>=0;s--){for(var c=!0,d=0;d<l;d++)if(u(e,s+d)!==u(t,d)){c=!1;break}if(c)return s}return -1}function v(e,t,r){r=Math.min(e.length,r);for(var n=[],i=t;i<r;){var s,a,o,l,u=e[i],h=null,c=u>239?4:u>223?3:u>191?2:1;if(i+c<=r)switch(c){case 1:u<128&&(h=u);break;case 2:(192&(s=e[i+1]))==128&&(l=(31&u)<<6|63&s)>127&&(h=l);break;case 3:s=e[i+1],a=e[i+2],(192&s)==128&&(192&a)==128&&(l=(15&u)<<12|(63&s)<<6|63&a)>2047&&(l<55296||l>57343)&&(h=l);break;case 4:s=e[i+1],a=e[i+2],o=e[i+3],(192&s)==128&&(192&a)==128&&(192&o)==128&&(l=(15&u)<<18|(63&s)<<12|(63&a)<<6|63&o)>65535&&l<1114112&&(h=l)}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=c}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);for(var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}function w(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function E(e,t,r,n,i,s){if(!o.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<s)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function _(e,t,r,n,i,s){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function b(e,t,r,n,s){return t=+t,r>>>=0,s||_(e,t,r,4,34028234663852886e22,-34028234663852886e22),i.write(e,t,r,n,23,4),r+4}function T(e,t,r,n,s){return t=+t,r>>>=0,s||_(e,t,r,8,17976931348623157e292,-17976931348623157e292),i.write(e,t,r,n,52,8),r+8}t.Buffer=o,t.SlowBuffer=function(e){return+e!=e&&(e=0),o.alloc(+e)},t.INSPECT_MAX_BYTES=50,t.kMaxLength=2147483647,o.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),o.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}}),o.poolSize=8192,o.from=function(e,t,r){return l(e,t,r)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array),o.alloc=function(e,t,r){return(u(e),e<=0)?a(e):void 0!==t?"string"==typeof r?a(e).fill(t,r):a(e).fill(t):a(e)},o.allocUnsafe=function(e){return h(e)},o.allocUnsafeSlow=function(e){return h(e)},o.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==o.prototype},o.compare=function(e,t){if(R(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),R(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),!o.isBuffer(e)||!o.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,n=t.length,i=0,s=Math.min(r,n);i<s;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0},o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(e,t){if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return o.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;var r,n=o.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){var s=e[r];if(R(s,Uint8Array)&&(s=o.from(s)),!o.isBuffer(s))throw TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},o.byteLength=f,o.prototype._isBuffer=!0,o.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)g(this,t,t+1);return this},o.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this},o.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this},o.prototype.toString=function(){var e=this.length;return 0===e?"":0==arguments.length?v(this,0,e):p.apply(this,arguments)},o.prototype.toLocaleString=o.prototype.toString,o.prototype.equals=function(e){if(!o.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===o.compare(this,e)},o.prototype.inspect=function(){var e="",r=t.INSPECT_MAX_BYTES;return e=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(e+=" ... "),"<Buffer "+e+">"},s&&(o.prototype[s]=o.prototype.inspect),o.prototype.compare=function(e,t,r,n,i){if(R(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),!o.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),t<0||r>e.length||n<0||i>this.length)throw RangeError("out of range index");if(n>=i&&t>=r)return 0;if(n>=i)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,i>>>=0,this===e)return 0;for(var s=i-n,a=r-t,l=Math.min(s,a),u=this.slice(n,i),h=e.slice(t,r),c=0;c<l;++c)if(u[c]!==h[c]){s=u[c],a=h[c];break}return s<a?-1:a<s?1:0},o.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},o.prototype.indexOf=function(e,t,r){return m(this,e,t,r,!0)},o.prototype.lastIndexOf=function(e,t,r){return m(this,e,t,r,!1)},o.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var i,s,a,o,l,u,h,c,d,f,p,g,m=this.length-t;if((void 0===r||r>m)&&(r=m),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var y=!1;;)switch(n){case"hex":return function(e,t,r,n){r=Number(r)||0;var i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;var s=t.length;n>s/2&&(n=s/2);for(var a=0;a<n;++a){var o=parseInt(t.substr(2*a,2),16);if(o!=o)break;e[r+a]=o}return a}(this,e,t,r);case"utf8":case"utf-8":return l=t,u=r,k(S(e,this.length-l),this,l,u);case"ascii":return h=t,c=r,k(C(e),this,h,c);case"latin1":case"binary":return i=this,s=e,a=t,o=r,k(C(s),i,a,o);case"base64":return d=t,f=r,k(A(e),this,d,f);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return p=t,g=r,k(function(e,t){for(var r,n,i=[],s=0;s<e.length&&!((t-=2)<0);++s)n=(r=e.charCodeAt(s))>>8,i.push(r%256),i.push(n);return i}(e,this.length-p),this,p,g);default:if(y)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),y=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.slice=function(e,t){var r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return Object.setPrototypeOf(n,o.prototype),n},o.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return n},o.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e+--t],i=1;t>0&&(i*=256);)n+=this[e+--t]*i;return n},o.prototype.readUInt8=function(e,t){return e>>>=0,t||w(e,1,this.length),this[e]},o.prototype.readUInt16LE=function(e,t){return e>>>=0,t||w(e,2,this.length),this[e]|this[e+1]<<8},o.prototype.readUInt16BE=function(e,t){return e>>>=0,t||w(e,2,this.length),this[e]<<8|this[e+1]},o.prototype.readUInt32LE=function(e,t){return e>>>=0,t||w(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},o.prototype.readUInt32BE=function(e,t){return e>>>=0,t||w(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},o.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*t)),n},o.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=t,i=1,s=this[e+--n];n>0&&(i*=256);)s+=this[e+--n]*i;return s>=(i*=128)&&(s-=Math.pow(2,8*t)),s},o.prototype.readInt8=function(e,t){return(e>>>=0,t||w(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},o.prototype.readInt16LE=function(e,t){e>>>=0,t||w(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt16BE=function(e,t){e>>>=0,t||w(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt32LE=function(e,t){return e>>>=0,t||w(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},o.prototype.readInt32BE=function(e,t){return e>>>=0,t||w(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},o.prototype.readFloatLE=function(e,t){return e>>>=0,t||w(e,4,this.length),i.read(this,e,!0,23,4)},o.prototype.readFloatBE=function(e,t){return e>>>=0,t||w(e,4,this.length),i.read(this,e,!1,23,4)},o.prototype.readDoubleLE=function(e,t){return e>>>=0,t||w(e,8,this.length),i.read(this,e,!0,52,8)},o.prototype.readDoubleBE=function(e,t){return e>>>=0,t||w(e,8,this.length),i.read(this,e,!1,52,8)},o.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var i=Math.pow(2,8*r)-1;E(this,e,t,r,i,0)}var s=1,a=0;for(this[t]=255&e;++a<r&&(s*=256);)this[t+a]=e/s&255;return t+r},o.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var i=Math.pow(2,8*r)-1;E(this,e,t,r,i,0)}var s=r-1,a=1;for(this[t+s]=255&e;--s>=0&&(a*=256);)this[t+s]=e/a&255;return t+r},o.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,1,255,0),this[t]=255&e,t+1},o.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},o.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},o.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},o.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},o.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);E(this,e,t,r,i-1,-i)}var s=0,a=1,o=0;for(this[t]=255&e;++s<r&&(a*=256);)e<0&&0===o&&0!==this[t+s-1]&&(o=1),this[t+s]=(e/a>>0)-o&255;return t+r},o.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);E(this,e,t,r,i-1,-i)}var s=r-1,a=1,o=0;for(this[t+s]=255&e;--s>=0&&(a*=256);)e<0&&0===o&&0!==this[t+s+1]&&(o=1),this[t+s]=(e/a>>0)-o&255;return t+r},o.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},o.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},o.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},o.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},o.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},o.prototype.writeFloatLE=function(e,t,r){return b(this,e,t,!0,r)},o.prototype.writeFloatBE=function(e,t,r){return b(this,e,t,!1,r)},o.prototype.writeDoubleLE=function(e,t,r){return T(this,e,t,!0,r)},o.prototype.writeDoubleBE=function(e,t,r){return T(this,e,t,!1,r)},o.prototype.copy=function(e,t,r,n){if(!o.isBuffer(e))throw TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var i=n-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,n);else if(this===e&&r<t&&t<n)for(var s=i-1;s>=0;--s)e[s+t]=this[s+r];else Uint8Array.prototype.set.call(e,this.subarray(r,n),t);return i},o.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!o.isEncoding(n))throw TypeError("Unknown encoding: "+n);if(1===e.length){var i,s=e.charCodeAt(0);("utf8"===n&&s<128||"latin1"===n)&&(e=s)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{var a=o.isBuffer(e)?e:o.from(e,n),l=a.length;if(0===l)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=a[i%l]}return this};var I=/[^+/0-9A-Za-z-_]/g;function S(e,t){t=t||1/0;for(var r,n=e.length,i=null,s=[],a=0;a<n;++a){if((r=e.charCodeAt(a))>55295&&r<57344){if(!i){if(r>56319||a+1===n){(t-=3)>-1&&s.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&s.push(239,191,189),i=r;continue}r=(i-55296<<10|r-56320)+65536}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;s.push(r)}else if(r<2048){if((t-=2)<0)break;s.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;s.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return s}function C(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function A(e){return n.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(I,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function k(e,t,r,n){for(var i=0;i<n&&!(i+r>=t.length)&&!(i>=e.length);++i)t[i+r]=e[i];return i}function R(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}var N=function(){for(var e="0123456789abcdef",t=Array(256),r=0;r<16;++r)for(var n=16*r,i=0;i<16;++i)t[n+i]=e[r]+e[i];return t}()},783:function(e,t){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */t.read=function(e,t,r,n,i){var s,a,o=8*i-n-1,l=(1<<o)-1,u=l>>1,h=-7,c=r?i-1:0,d=r?-1:1,f=e[t+c];for(c+=d,s=f&(1<<-h)-1,f>>=-h,h+=o;h>0;s=256*s+e[t+c],c+=d,h-=8);for(a=s&(1<<-h)-1,s>>=-h,h+=n;h>0;a=256*a+e[t+c],c+=d,h-=8);if(0===s)s=1-u;else{if(s===l)return a?NaN:(f?-1:1)*(1/0);a+=Math.pow(2,n),s-=u}return(f?-1:1)*a*Math.pow(2,s-n)},t.write=function(e,t,r,n,i,s){var a,o,l,u=8*s-i-1,h=(1<<u)-1,c=h>>1,d=23===i?5960464477539062e-23:0,f=n?0:s-1,p=n?1:-1,g=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(o=isNaN(t)?1:0,a=h):(a=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-a))<1&&(a--,l*=2),a+c>=1?t+=d/l:t+=d*Math.pow(2,1-c),t*l>=2&&(a++,l/=2),a+c>=h?(o=0,a=h):a+c>=1?(o=(t*l-1)*Math.pow(2,i),a+=c):(o=t*Math.pow(2,c-1)*Math.pow(2,i),a=0));i>=8;e[r+f]=255&o,f+=p,o/=256,i-=8);for(a=a<<i|o,u+=i;u>0;e[r+f]=255&a,f+=p,a/=256,u-=8);e[r+f-p]|=128*g}}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var s=r[e]={exports:{}},a=!0;try{t[e](s,s.exports,n),a=!1}finally{a&&delete r[e]}return s.exports}n.ab="//";var i=n(72);e.exports=i}()},5303:function(){},7663:function(e){!function(){var t={229:function(e){var t,r,n,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var l=[],u=!1,h=-1;function c(){u&&n&&(u=!1,n.length?l=n.concat(l):h=-1,l.length&&d())}function d(){if(!u){var e=o(c);u=!0;for(var t=l.length;t;){for(n=l,l=[];++h<t;)n&&n[h].run();h=-1,t=l.length}n=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function p(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new f(e,t)),1!==l.length||u||o(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var s=r[e]={exports:{}},a=!0;try{t[e](s,s.exports,n),a=!1}finally{a&&delete r[e]}return s.exports}n.ab="//";var i=n(229);e.exports=i}()},9008:function(e,t,r){e.exports=r(4605)},1163:function(e,t,r){e.exports=r(8355)},83:function(e,t,r){"use strict";/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(7294),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=n.useState,a=n.useEffect,o=n.useLayoutEffect,l=n.useDebugValue;function u(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!i(e,r)}catch(e){return!0}}var h="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),n=s({inst:{value:r,getSnapshot:t}}),i=n[0].inst,h=n[1];return o(function(){i.value=r,i.getSnapshot=t,u(i)&&h({inst:i})},[e,r,t]),a(function(){return u(i)&&h({inst:i}),e(function(){u(i)&&h({inst:i})})},[e]),l(r),r};t.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:h},1688:function(e,t,r){"use strict";e.exports=r(83)},5816:function(e,t,r){"use strict";let n,i;r.d(t,{Jn:function(){return U},qX:function(){return D},rh:function(){return L},Xd:function(){return P},Mq:function(){return F},ZF:function(){return V},KN:function(){return j}});var s,a=r(8463),o=r(3333),l=r(1683);let u=(e,t)=>t.some(t=>e instanceof t),h=new WeakMap,c=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,g={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return c.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return m(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function m(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(m(e.result)),n()},s=()=>{r(e.error),n()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&h.set(t,e)}).catch(()=>{}),p.set(t,e),t}(e);if(f.has(e))return f.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(y(this),e),m(h.get(this))}:function(...e){return m(t.apply(y(this),e))}:function(e,...r){let n=t.call(y(this),e,...r);return d.set(n,e.sort?e.sort():[e]),m(n)}:(t instanceof IDBTransaction&&function(e){if(c.has(e))return;let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),n()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});c.set(e,t)}(t),u(t,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,g):t;return r!==e&&(f.set(e,r),p.set(r,e)),r}let y=e=>p.get(e),v=["get","getKey","getAll","getAllKeys","count"],w=["put","add","delete","clear"],E=new Map;function _(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(E.get(t))return E.get(t);let r=t.replace(/FromIndex$/,""),n=t!==r,i=w.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(i||v.includes(r)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),a=s.store;return n&&(a=a.index(t.shift())),(await Promise.all([a[r](...t),i&&s.done]))[0]};return E.set(t,s),s}g={...s=g,get:(e,t,r)=>_(e,t)||s.get(e,t,r),has:(e,t)=>!!_(e,t)||s.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let T="@firebase/app",I="0.11.5",S=new o.Yd("@firebase/app"),C="[DEFAULT]",A={[T]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/data-connect":"fire-data-connect","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/vertexai":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},k=new Map,R=new Map,N=new Map;function O(e,t){try{e.container.addComponent(t)}catch(r){S.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}function P(e){let t=e.name;if(N.has(t))return S.debug(`There were multiple attempts to register component ${t}.`),!1;for(let r of(N.set(t,e),k.values()))O(r,e);for(let t of R.values())O(t,e);return!0}function D(e,t){let r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(t)}function L(e){return null!=e&&void 0!==e.settings}let x=new l.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new a.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw x.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let U="11.6.1";function V(e,t={}){let r=e;if("object"!=typeof t){let e=t;t={name:e}}let n=Object.assign({name:C,automaticDataCollectionEnabled:!1},t),i=n.name;if("string"!=typeof i||!i)throw x.create("bad-app-name",{appName:String(i)});if(r||(r=(0,l.aH)()),!r)throw x.create("no-options");let s=k.get(i);if(s){if((0,l.vZ)(r,s.options)&&(0,l.vZ)(n,s.config))return s;throw x.create("duplicate-app",{appName:i})}let o=new a.H0(i);for(let e of N.values())o.addComponent(e);let u=new M(r,n,o);return k.set(i,u),u}function F(e=C){let t=k.get(e);if(!t&&e===C&&(0,l.aH)())return V();if(!t)throw x.create("no-app",{appName:e});return t}function j(e,t,r){var n;let i=null!==(n=A[e])&&void 0!==n?n:e;r&&(i+=`-${r}`);let s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){let e=[`Unable to register library "${i}" with version "${t}":`];s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),S.warn(e.join(" "));return}P(new a.wA(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}let B="firebase-heartbeat-store",z=null;function $(){return z||(z=(function(e,t,{blocked:r,upgrade:n,blocking:i,terminated:s}={}){let a=indexedDB.open(e,1),o=m(a);return n&&a.addEventListener("upgradeneeded",e=>{n(m(a.result),e.oldVersion,e.newVersion,m(a.transaction),e)}),r&&a.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),o.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),o})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(B)}catch(e){console.warn(e)}}}).catch(e=>{throw x.create("idb-open",{originalErrorMessage:e.message})})),z}async function q(e){try{let t=await $(),r=t.transaction(B),n=await r.objectStore(B).get(K(e));return await r.done,n}catch(e){if(e instanceof l.ZR)S.warn(e.message);else{let t=x.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});S.warn(t.message)}}}async function H(e,t){try{let r=await $(),n=r.transaction(B,"readwrite"),i=n.objectStore(B);await i.put(t,K(e)),await n.done}catch(e){if(e instanceof l.ZR)S.warn(e.message);else{let t=x.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});S.warn(t.message)}}}function K(e){return`${e.name}!${e.options.appId}`}class G{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Q(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{let r=this.container.getProvider("platform-logger").getImmediate(),n=r.getPlatformInfoString(),i=W();if((null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(e=>e.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>30){let e=function(e){if(0===e.length)return -1;let t=0,r=e[0].date;for(let n=1;n<e.length;n++)e[n].date<r&&(r=e[n].date,t=n);return t}(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){S.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null||0===this._heartbeatsCache.heartbeats.length)return"";let t=W(),{heartbeatsToSend:r,unsentEntries:n}=function(e,t=1024){let r=[],n=e.slice();for(let i of e){let e=r.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),J(r)>t){e.dates.pop();break}}else if(r.push({agent:i.agent,dates:[i.date]}),J(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}(this._heartbeatsCache.heartbeats),i=(0,l.L)(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return S.warn(e),""}}}function W(){let e=new Date;return e.toISOString().substring(0,10)}class Q{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,l.hl)()&&(0,l.eu)().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let e=await q(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}}async overwrite(e){var t;let r=await this._canUseIndexedDBPromise;if(r){let r=await this.read();return H(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;let r=await this._canUseIndexedDBPromise;if(r){let r=await this.read();return H(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}}}function J(e){return(0,l.L)(JSON.stringify({version:2,heartbeats:e})).length}P(new a.wA("platform-logger",e=>new b(e),"PRIVATE")),P(new a.wA("heartbeat",e=>new G(e),"PRIVATE")),j(T,I,""),j(T,I,"esm2017"),j("fire-js","")},8463:function(e,t,r){"use strict";r.d(t,{H0:function(){return o},wA:function(){return i}});var n=r(1683);class i{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new n.BH;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(e){if(n)return null;throw e}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:s})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch(e){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[e,t]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(e);r===i&&t.resolve(n)}return n}onInit(e,t){var r;let n=this.normalizeInstanceIdentifier(t),i=null!==(r=this.onInitCallbacks.get(n))&&void 0!==r?r:new Set;i.add(e),this.onInitCallbacks.set(n,i);let s=this.instances.get(n);return s&&e(s,n),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let n of r)try{n(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e===s?void 0:e,options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(e){}return r||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){let t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new a(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},3333:function(e,t,r){"use strict";var n,i;r.d(t,{Yd:function(){return h},in:function(){return n}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s=[];(i=n||(n={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";let a={debug:n.DEBUG,verbose:n.VERBOSE,info:n.INFO,warn:n.WARN,error:n.ERROR,silent:n.SILENT},o=n.INFO,l={[n.DEBUG]:"log",[n.VERBOSE]:"log",[n.INFO]:"info",[n.WARN]:"warn",[n.ERROR]:"error"},u=(e,t,...r)=>{if(t<e.logLevel)return;let n=new Date().toISOString(),i=l[t];if(i)console[i](`[${n}]  ${e.name}:`,...r);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class h{constructor(e){this.name=e,this._logLevel=o,this._logHandler=u,this._userLogHandler=null,s.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in n))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?a[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,n.DEBUG,...e),this._logHandler(this,n.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,n.VERBOSE,...e),this._logHandler(this,n.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,n.INFO,...e),this._logHandler(this,n.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,n.WARN,...e),this._logHandler(this,n.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,n.ERROR,...e),this._logHandler(this,n.ERROR,...e)}}},8346:function(e,t,r){"use strict";r.d(t,{hJ:function(){return e0},Xb:function(){return tn},v0:function(){return rp},Aj:function(){return ts},e5:function(){return ti},rh:function(){return tj},w7:function(){return ta}});var n,i=r(5816),s=r(1683),a=r(3333),o=r(7582),l=r(8463);function u(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let h=new s.LL("auth","Firebase",u()),c=new a.Yd("@firebase/auth");function d(e,...t){c.logLevel<=a.in.ERROR&&c.error(`Auth (${i.Jn}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,...t){throw y(e,...t)}function p(e,...t){return y(e,...t)}function g(e,t,r){let n=Object.assign(Object.assign({},u()),{[t]:r}),i=new s.LL("auth","Firebase",n);return i.create(t,{appName:e.name})}function m(e){return g(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function y(e,...t){if("string"!=typeof e){let r=t[0],n=[...t.slice(1)];return n[0]&&(n[0].appName=e.name),e._errorFactory.create(r,...n)}return h.create(e,...t)}function v(e,t,...r){if(!e)throw y(t,...r)}function w(e){let t="INTERNAL ASSERTION FAILED: "+e;throw d(t),Error(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function _(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e,t){this.shortDelay=e,this.longDelay=t,t>e||w("Short delay should be less than long delay!"),this.isMobile=(0,s.uI)()||(0,s.b$)()}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===_()||"https:"===_()||(0,s.ru)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e,t){e.emulator||w("Emulator should always be set here");let{url:r}=e.emulator;return t?`${r}${t.startsWith("/")?t.slice(1):t}`:r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void w("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void w("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void w("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let S={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},C=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],A=new b(3e4,6e4);function k(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function R(e,t,r,n,i={}){return N(e,i,async()=>{let i={},a={};n&&("GET"===t?a=n:i={body:JSON.stringify(n)});let o=(0,s.xO)(Object.assign({key:e.config.apiKey},a)).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);let u=Object.assign({method:t,headers:l},i);return(0,s.L_)()||(u.referrerPolicy="no-referrer"),I.fetch()(await P(e,e.config.apiHost,r,o),u)})}async function N(e,t,r){e._canInitEmulator=!1;let n=Object.assign(Object.assign({},S),t);try{let t=new D(e),i=await Promise.race([r(),t.promise]);t.clearNetworkTimeout();let s=await i.json();if("needConfirmation"in s)throw L(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{let t=i.ok?s.errorMessage:s.error.message,[r,a]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===r)throw L(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===r)throw L(e,"email-already-in-use",s);if("USER_DISABLED"===r)throw L(e,"user-disabled",s);let o=n[r]||r.toLowerCase().replace(/[_\s]+/g,"-");if(a)throw g(e,o,a);f(e,o)}}catch(t){if(t instanceof s.ZR)throw t;f(e,"network-request-failed",{message:String(t)})}}async function O(e,t,r,n,i={}){let s=await R(e,t,r,n,i);return"mfaPendingCredential"in s&&f(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function P(e,t,r,n){let i=`${t}${r}?${n}`,s=e.config.emulator?T(e.config,i):`${e.config.apiScheme}://${i}`;if(C.includes(r)&&(await e._persistenceManagerAvailable,"COOKIE"===e._getPersistenceType())){let t=e._getPersistence();return t._getFinalTarget(s).toString()}return s}class D{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(p(this.auth,"network-request-failed")),A.get())})}}function L(e,t,r){let n={appName:e.name};r.email&&(n.email=r.email),r.phoneNumber&&(n.phoneNumber=r.phoneNumber);let i=p(e,t,n);return i.customData._tokenResponse=r,i}function x(e){return void 0!==e&&void 0!==e.enterprise}class M{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function U(e,t){return R(e,"GET","/v2/recaptchaConfig",k(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function V(e,t){return R(e,"POST","/v1/accounts:delete",t)}async function F(e,t){return R(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}async function B(e,t=!1){let r=(0,s.m9)(e),n=await r.getIdToken(t),i=$(n);v(i&&i.exp&&i.auth_time&&i.iat,r.auth,"internal-error");let a="object"==typeof i.firebase?i.firebase:void 0,o=null==a?void 0:a.sign_in_provider;return{claims:i,token:n,authTime:j(z(i.auth_time)),issuedAtTime:j(z(i.iat)),expirationTime:j(z(i.exp)),signInProvider:o||null,signInSecondFactor:(null==a?void 0:a.sign_in_second_factor)||null}}function z(e){return 1e3*Number(e)}function $(e){let[t,r,n]=e.split(".");if(void 0===t||void 0===r||void 0===n)return d("JWT malformed, contained fewer than 3 sections"),null;try{let e=(0,s.tV)(r);if(!e)return d("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return d("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}function q(e){let t=$(e);return v(t,"internal-error"),v(void 0!==t.exp,"internal-error"),v(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H(e,t,r=!1){if(r)return t;try{return await t}catch(t){throw t instanceof s.ZR&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;let e=null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0,r=e-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(null==e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=j(this.lastLoginAt),this.creationTime=j(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W(e){var t;let r=e.auth,n=await e.getIdToken(),i=await H(e,F(r,{idToken:n}));v(null==i?void 0:i.users.length,r,"internal-error");let s=i.users[0];e._notifyReloadListener(s);let a=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?J(s.providerUserInfo):[],o=function(e,t){let r=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...r,...t]}(e.providerData,a),l=e.isAnonymous,u=!(e.email&&s.passwordHash)&&!(null==o?void 0:o.length),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new G(s.createdAt,s.lastLoginAt),isAnonymous:!!l&&u};Object.assign(e,h)}async function Q(e){let t=(0,s.m9)(e);await W(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function J(e){return e.map(e=>{var{providerId:t}=e,r=(0,o._T)(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y(e,t){let r=await N(e,{},async()=>{let r=(0,s.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:n,apiKey:i}=e.config,a=await P(e,n,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",I.fetch()(a,{method:"POST",headers:o,body:r})});return{accessToken:r.access_token,expiresIn:r.expires_in,refreshToken:r.refresh_token}}async function X(e,t){return R(e,"POST","/v2/accounts:revokeToken",k(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v(void 0!==e.idToken,"internal-error"),v(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):q(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){v(0!==e.length,"internal-error");let t=q(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(v(this.refreshToken,e,"user-token-expired"),this.refreshToken)?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:n,expiresIn:i}=await Y(e,t);this.updateTokensAndExpiration(r,n,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*r}static fromJSON(e,t){let{refreshToken:r,accessToken:n,expirationTime:i}=t,s=new Z;return r&&(v("string"==typeof r,"internal-error",{appName:e}),s.refreshToken=r),n&&(v("string"==typeof n,"internal-error",{appName:e}),s.accessToken=n),i&&(v("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Z,this.toJSON())}_performRefresh(){return w("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(e,t){v("string"==typeof e||void 0===e,"internal-error",{appName:t})}class et{constructor(e){var{uid:t,auth:r,stsTokenManager:n}=e,i=(0,o._T)(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new K(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new G(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await H(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return B(this,e)}reload(){return Q(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new et(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await W(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,i.rh)(this.auth.app))return Promise.reject(m(this.auth));let e=await this.getIdToken();return await H(this,V(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,n,i,s,a,o,l,u;let h=null!==(r=t.displayName)&&void 0!==r?r:void 0,c=null!==(n=t.email)&&void 0!==n?n:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(a=t.tenantId)&&void 0!==a?a:void 0,g=null!==(o=t._redirectEventId)&&void 0!==o?o:void 0,m=null!==(l=t.createdAt)&&void 0!==l?l:void 0,y=null!==(u=t.lastLoginAt)&&void 0!==u?u:void 0,{uid:w,emailVerified:E,isAnonymous:_,providerData:b,stsTokenManager:T}=t;v(w&&T,e,"internal-error");let I=Z.fromJSON(this.name,T);v("string"==typeof w,e,"internal-error"),ee(h,e.name),ee(c,e.name),v("boolean"==typeof E,e,"internal-error"),v("boolean"==typeof _,e,"internal-error"),ee(d,e.name),ee(f,e.name),ee(p,e.name),ee(g,e.name),ee(m,e.name),ee(y,e.name);let S=new et({uid:w,auth:e,email:c,emailVerified:E,displayName:h,isAnonymous:_,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:I,createdAt:m,lastLoginAt:y});return b&&Array.isArray(b)&&(S.providerData=b.map(e=>Object.assign({},e))),g&&(S._redirectEventId=g),S}static async _fromIdTokenResponse(e,t,r=!1){let n=new Z;n.updateFromServerResponse(t);let i=new et({uid:t.localId,auth:e,stsTokenManager:n,isAnonymous:r});return await W(i),i}static async _fromGetAccountInfoResponse(e,t,r){let n=t.users[0];v(void 0!==n.localId,"internal-error");let i=void 0!==n.providerUserInfo?J(n.providerUserInfo):[],s=!(n.email&&n.passwordHash)&&!(null==i?void 0:i.length),a=new Z;a.updateFromIdToken(r);let o=new et({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s}),l={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:i,metadata:new G(n.createdAt,n.lastLoginAt),isAnonymous:!(n.email&&n.passwordHash)&&!(null==i?void 0:i.length)};return Object.assign(o,l),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let er=new Map;function en(e){e instanceof Function||w("Expected a class definition");let t=er.get(e);return t?t instanceof e||w("Instance stored in cache mismatched with class"):(t=new e,er.set(e,t)),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(e,t,r){return`firebase:${e}:${t}:${r}`}ei.type="NONE";class ea{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:n,name:i}=this.auth;this.fullUserKey=es(this.userKey,n.apiKey,i),this.fullPersistenceKey=es("persistence",n.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){let t=await F(this.auth,{idToken:e}).catch(()=>void 0);return t?et._fromGetAccountInfoResponse(this.auth,t,e):null}return et._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new ea(en(ei),e,r);let n=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=n[0]||en(ei),s=es(r,e.config.apiKey,e.name),a=null;for(let r of t)try{let t=await r._get(s);if(t){let n;if("string"==typeof t){let r=await F(e,{idToken:t}).catch(()=>void 0);if(!r)break;n=await et._fromGetAccountInfoResponse(e,r,t)}else n=et._fromJSON(e,t);r!==i&&(a=n),i=r;break}}catch(e){}let o=n.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&o.length&&(i=o[0],a&&await i._set(s,a.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch(e){}}))),new ea(i,e,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ec(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";{if(t.includes("edge/"))return"Edge";if(el(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ef(t))return"Blackberry";if(ep(t))return"Webos";if(eu(t))return"Safari";if((t.includes("chrome/")||eh(t))&&!t.includes("edge/"))return"Chrome";if(ed(t))return"Android";let r=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==r?void 0:r.length)===2)return r[1]}return"Other"}function el(e=(0,s.z$)()){return/firefox\//i.test(e)}function eu(e=(0,s.z$)()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function eh(e=(0,s.z$)()){return/crios\//i.test(e)}function ec(e=(0,s.z$)()){return/iemobile/i.test(e)}function ed(e=(0,s.z$)()){return/android/i.test(e)}function ef(e=(0,s.z$)()){return/blackberry/i.test(e)}function ep(e=(0,s.z$)()){return/webos/i.test(e)}function eg(e=(0,s.z$)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function em(e=(0,s.z$)()){return eg(e)||ed(e)||ep(e)||ef(e)||/windows phone/i.test(e)||ec(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(e,t=[]){let r;switch(e){case"Browser":r=eo((0,s.z$)());break;case"Worker":r=`${eo((0,s.z$)())}-${e}`;break;default:r=e}let n=t.length?t.join(","):"FirebaseCore-web";return`${r}/JsCore/${i.Jn}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=t=>new Promise((r,n)=>{try{let n=e(t);r(n)}catch(e){n(e)}});r.onAbort=t,this.queue.push(r);let n=this.queue.length-1;return()=>{this.queue[n]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ew(e,t={}){return R(e,"GET","/v2/passwordPolicy",k(e,t))}class eE{constructor(e){var t,r,n,i;let s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=s.minPasswordLength)&&void 0!==t?t:6,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),void 0!==s.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),void 0!==s.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),void 0!==s.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),void 0!==s.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(n=null===(r=e.allowedNonAlphanumericCharacters)||void 0===r?void 0:r.join(""))&&void 0!==n?n:"",this.forceUpgradeOnSignin=null!==(i=e.forceUpgradeOnSignin)&&void 0!==i&&i,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,n,i,s,a;let o={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,o),this.validatePasswordCharacterOptions(e,o),o.isValid&&(o.isValid=null===(t=o.meetsMinPasswordLength)||void 0===t||t),o.isValid&&(o.isValid=null===(r=o.meetsMaxPasswordLength)||void 0===r||r),o.isValid&&(o.isValid=null===(n=o.containsLowercaseLetter)||void 0===n||n),o.isValid&&(o.isValid=null===(i=o.containsUppercaseLetter)||void 0===i||i),o.isValid&&(o.isValid=null===(s=o.containsNumericCharacter)||void 0===s||s),o.isValid&&(o.isValid=null===(a=o.containsNonAlphanumericCharacter)||void 0===a||a),o}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,n=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),n&&(t.meetsMaxPasswordLength=e.length<=n)}validatePasswordCharacterOptions(e,t){let r;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let n=0;n<e.length;n++)r=e.charAt(n),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,n,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=n)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t,r,n){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eT(this),this.idTokenSubscription=new eT(this),this.beforeStateQueue=new ev(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=h,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=en(t)),this._initializationPromise=this.queue(async()=>{var r,n,i;if(!this._deleted&&(this.persistenceManager=await ea.create(this,e),null===(r=this._resolvePersistenceManagerAvailable)||void 0===r||r.call(this),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(i=this.currentUser)||void 0===i?void 0:i.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await F(this,{idToken:e}),r=await et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if((0,i.rh)(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),n=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let r=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,i=null==n?void 0:n._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===i)&&(null==a?void 0:a.user)&&(n=a.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return(v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId)?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await W(e)}catch(e){if((null==e?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,i.rh)(this.app))return Promise.reject(m(this));let t=e?(0,s.m9)(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,i.rh)(this.app)?Promise.reject(m(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,i.rh)(this.app)?Promise.reject(m(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(en(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await ew(this),t=new eE(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new s.LL("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};null!=this.tenantId&&(r.tenantId=this.tenantId),await X(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return null===e?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&en(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await ea.create(this,[en(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(r=this.redirectUser)||void 0===r?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,n){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),s=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(a,this,"internal-error"),a.then(()=>{s||i(this.currentUser)}),"function"==typeof t){let i=e.addObserver(t,r,n);return()=>{s=!0,i()}}{let r=e.addObserver(t);return()=>{s=!0,r()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ey(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let n=await this._getAppCheckToken();return n&&(t["X-Firebase-AppCheck"]=n),t}async _getAppCheckToken(){var e;if((0,i.rh)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let t=await (null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){c.logLevel<=a.in.WARN&&c.warn(`Auth (${i.Jn}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function eb(e){return(0,s.m9)(e)}class eT{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,s.ne)(e=>this.observer=e)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eI={async loadJS(){throw Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eS(e){return`__${e}${Math.floor(1e6*Math.random())}`}class eC{constructor(){this.enterprise=new eA}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class eA{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}let ek="NO_RECAPTCHA";class eR{constructor(e){this.type="recaptcha-enterprise",this.auth=eb(e)}async verify(e="verify",t=!1){async function r(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,r)=>{U(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(n=>{if(void 0===n.recaptchaKey)r(Error("recaptcha Enterprise site key undefined"));else{let r=new M(n);return null==e.tenantId?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,t(r.siteKey)}}).catch(e=>{r(e)})})}function n(t,r,n){let i=window.grecaptcha;x(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{r(e)}).catch(()=>{r(ek)})}):n(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){let e=new eC;return e.execute("siteKey",{action:"verify"})}return new Promise((e,i)=>{r(this.auth).then(r=>{if(!t&&x(window.grecaptcha))n(r,e,i);else{var s;if("undefined"==typeof window){i(Error("RecaptchaVerifier is only supported in browser"));return}let t=eI.recaptchaEnterpriseScript;0!==t.length&&(t+=r),(s=t,eI.loadJS(s)).then(()=>{n(r,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function eN(e,t,r,n=!1,i=!1){let s;let a=new eR(e);if(i)s=ek;else try{s=await a.verify(r)}catch(e){s=await a.verify(r,!0)}let o=Object.assign({},t);if("mfaSmsEnrollment"===r||"mfaSmsSignIn"===r){if("phoneEnrollmentInfo"in o){let e=o.phoneEnrollmentInfo.phoneNumber,t=o.phoneEnrollmentInfo.recaptchaToken;Object.assign(o,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in o){let e=o.phoneSignInInfo.recaptchaToken;Object.assign(o,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return o}return n?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function eO(e,t,r,n,i){var s,a;if("EMAIL_PASSWORD_PROVIDER"===i){if(null===(s=e._getRecaptchaConfig())||void 0===s||!s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return n(e,t).catch(async i=>{if("auth/missing-recaptcha-token"!==i.code)return Promise.reject(i);{console.log(`${r} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await eN(e,t,r,"getOobCode"===r);return n(e,i)}});{let i=await eN(e,t,r,"getOobCode"===r);return n(e,i)}}if("PHONE_PROVIDER"!==i)return Promise.reject(i+" provider is not supported.");if(null===(a=e._getRecaptchaConfig())||void 0===a?void 0:a.isProviderEnabled("PHONE_PROVIDER")){let i=await eN(e,t,r);return n(e,i).catch(async i=>{var s;if((null===(s=e._getRecaptchaConfig())||void 0===s?void 0:s.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${r} flow.`);let i=await eN(e,t,r,!1,!0);return n(e,i)}return Promise.reject(i)})}{let i=await eN(e,t,r,!1,!0);return n(e,i)}}async function eP(e){let t=eb(e),r=await U(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new M(r);if(null==t.tenantId?t._agentRecaptchaConfig=n:t._tenantRecaptchaConfigs[t.tenantId]=n,n.isAnyProviderEnabled()){let e=new eR(t);e.verify()}}function eD(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function eL(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ex{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return w("not implemented")}_getIdTokenResponse(e){return w("not implemented")}_linkToIdToken(e,t){return w("not implemented")}_getReauthenticationResolver(e){return w("not implemented")}}async function eM(e,t){return R(e,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eU(e,t){return O(e,"POST","/v1/accounts:signInWithPassword",k(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eV(e,t){return O(e,"POST","/v1/accounts:signInWithEmailLink",k(e,t))}async function eF(e,t){return O(e,"POST","/v1/accounts:signInWithEmailLink",k(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ej extends ex{constructor(e,t,r,n=null){super("password",r),this._email=e,this._password=t,this._tenantId=n}static _fromEmailAndPassword(e,t){return new ej(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ej(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eO(e,t,"signInWithPassword",eU,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return eV(e,{email:this._email,oobCode:this._password});default:f(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eO(e,r,"signUpPassword",eM,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return eF(e,{idToken:t,email:this._email,oobCode:this._password});default:f(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eB(e,t){return O(e,"POST","/v1/accounts:signInWithIdp",k(e,t))}class ez extends ex{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new ez(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):f("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:r,signInMethod:n}=t,i=(0,o._T)(t,["providerId","signInMethod"]);if(!r||!n)return null;let s=new ez(r,n);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){let t=this.buildRequest();return eB(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,eB(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,eB(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,s.xO)(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e$(e,t){return R(e,"POST","/v1/accounts:sendVerificationCode",k(e,t))}async function eq(e,t){return O(e,"POST","/v1/accounts:signInWithPhoneNumber",k(e,t))}async function eH(e,t){let r=await O(e,"POST","/v1/accounts:signInWithPhoneNumber",k(e,t));if(r.temporaryProof)throw L(e,"account-exists-with-different-credential",r);return r}let eK={USER_NOT_FOUND:"user-not-found"};async function eG(e,t){let r=Object.assign(Object.assign({},t),{operation:"REAUTH"});return O(e,"POST","/v1/accounts:signInWithPhoneNumber",k(e,r),eK)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eW extends ex{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new eW({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new eW({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return eq(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return eH(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return eG(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:n}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:n}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}=e;return r||t||n||i?new eW({verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}):null}}class eQ{constructor(e){var t,r,n,i,a,o;let l=(0,s.zd)((0,s.pd)(e)),u=null!==(t=l.apiKey)&&void 0!==t?t:null,h=null!==(r=l.oobCode)&&void 0!==r?r:null,c=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(n=l.mode)&&void 0!==n?n:null);v(u&&h&&c,"argument-error"),this.apiKey=u,this.operation=c,this.code=h,this.continueUrl=null!==(i=l.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(a=l.lang)&&void 0!==a?a:null,this.tenantId=null!==(o=l.tenantId)&&void 0!==o?o:null}static parseLink(e){let t=function(e){let t=(0,s.zd)((0,s.pd)(e)).link,r=t?(0,s.zd)((0,s.pd)(t)).deep_link_id:null,n=(0,s.zd)((0,s.pd)(e)).deep_link_id,i=n?(0,s.zd)((0,s.pd)(n)).link:null;return i||n||r||t||e}(e);try{return new eQ(t)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eJ{constructor(){this.providerId=eJ.PROVIDER_ID}static credential(e,t){return ej._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=eQ.parseLink(t);return v(r,"argument-error"),ej._fromEmailAndCode(e,r.code,r.tenantId)}}eJ.PROVIDER_ID="password",eJ.EMAIL_PASSWORD_SIGN_IN_METHOD="password",eJ.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eY{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eX extends eY{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eZ extends eX{constructor(){super("facebook.com")}static credential(e){return ez._fromParams({providerId:eZ.PROVIDER_ID,signInMethod:eZ.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return eZ.credentialFromTaggedObject(e)}static credentialFromError(e){return eZ.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return eZ.credential(e.oauthAccessToken)}catch(e){return null}}}eZ.FACEBOOK_SIGN_IN_METHOD="facebook.com",eZ.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0 extends eX{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ez._fromParams({providerId:e0.PROVIDER_ID,signInMethod:e0.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return e0.credentialFromTaggedObject(e)}static credentialFromError(e){return e0.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return e0.credential(t,r)}catch(e){return null}}}e0.GOOGLE_SIGN_IN_METHOD="google.com",e0.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e1 extends eX{constructor(){super("github.com")}static credential(e){return ez._fromParams({providerId:e1.PROVIDER_ID,signInMethod:e1.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return e1.credentialFromTaggedObject(e)}static credentialFromError(e){return e1.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return e1.credential(e.oauthAccessToken)}catch(e){return null}}}e1.GITHUB_SIGN_IN_METHOD="github.com",e1.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e2 extends eX{constructor(){super("twitter.com")}static credential(e,t){return ez._fromParams({providerId:e2.PROVIDER_ID,signInMethod:e2.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return e2.credentialFromTaggedObject(e)}static credentialFromError(e){return e2.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return e2.credential(t,r)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e4(e,t){return O(e,"POST","/v1/accounts:signUp",k(e,t))}e2.TWITTER_SIGN_IN_METHOD="twitter.com",e2.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e9{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,n=!1){let i=await et._fromIdTokenResponse(e,r,n),s=e6(r),a=new e9({user:i,providerId:s,_tokenResponse:r,operationType:t});return a}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let n=e6(r);return new e9({user:e,providerId:n,_tokenResponse:r,operationType:t})}}function e6(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e5 extends s.ZR{constructor(e,t,r,n){var i;super(t.code,t.message),this.operationType=r,this.user=n,Object.setPrototypeOf(this,e5.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,n){return new e5(e,t,r,n)}}function e3(e,t,r,n){let i="reauthenticate"===t?r._getReauthenticationResolver(e):r._getIdTokenResponse(e);return i.catch(r=>{if("auth/multi-factor-auth-required"===r.code)throw e5._fromErrorAndOperation(e,r,t,n);throw r})}async function e8(e,t,r=!1){let n=await H(e,t._linkToIdToken(e.auth,await e.getIdToken()),r);return e9._forOperation(e,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e7(e,t,r=!1){let{auth:n}=e;if((0,i.rh)(n.app))return Promise.reject(m(n));let s="reauthenticate";try{let i=await H(e,e3(n,s,t,e),r);v(i.idToken,n,"internal-error");let a=$(i.idToken);v(a,n,"internal-error");let{sub:o}=a;return v(e.uid===o,n,"user-mismatch"),e9._forOperation(e,s,i)}catch(e){throw(null==e?void 0:e.code)==="auth/user-not-found"&&f(n,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function te(e,t,r=!1){if((0,i.rh)(e.app))return Promise.reject(m(e));let n="signIn",s=await e3(e,n,t),a=await e9._fromIdTokenResponse(e,n,s);return r||await e._updateCurrentUser(a.user),a}async function tt(e,t){return te(eb(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(e){let t=eb(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function tn(e,t,r){if((0,i.rh)(e.app))return Promise.reject(m(e));let n=eb(e),s=eO(n,{returnSecureToken:!0,email:t,password:r,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",e4,"EMAIL_PASSWORD_PROVIDER"),a=await s.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tr(e),t}),o=await e9._fromIdTokenResponse(n,"signIn",a);return await n._updateCurrentUser(o.user),o}function ti(e,t,r){return(0,i.rh)(e.app)?Promise.reject(m(e)):tt((0,s.m9)(e),eJ.credential(t,r)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tr(e),t})}function ts(e,t,r,n){return(0,s.m9)(e).onAuthStateChanged(t,r,n)}function ta(e){return(0,s.m9)(e).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(e,t){return R(e,"POST","/v2/accounts/mfaEnrollment:start",k(e,t))}new WeakMap;let tl="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(tl,"1"),this.storage.removeItem(tl),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class th extends tu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=em(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),n=this.localCache[t];r!==n&&e(t,n,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,r)=>{this.notifyListeners(e,r)});return}let r=e.key;t?this.detachListener():this.stopPolling();let n=()=>{let e=this.storage.getItem(r);(t||this.localCache[r]!==e)&&this.notifyListeners(r,e)},i=this.storage.getItem(r);(0,s.w1)()&&10===document.documentMode&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(n,10):n()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}th.type="LOCAL";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc extends tu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tc.type="SESSION";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let r=new td(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:r,data:n}=e.data,i=this.handlersMap[r];if(!(null==i?void 0:i.size))return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:r});let s=Array.from(i).map(async t=>t(e.origin,n)),a=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tf(e="",t=10){let r="";for(let e=0;e<t;e++)r+=Math.floor(10*Math.random());return e+r}td.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let n,i;let s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((a,o)=>{let l=tf("",20);s.port1.start();let u=setTimeout(()=>{o(Error("unsupported_event"))},r);i={messageChannel:s,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(u),n=setTimeout(()=>{o(Error("timeout"))},3e3);break;case"done":clearTimeout(n),a(e.data.response);break;default:clearTimeout(u),clearTimeout(n),o(Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tg(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(){return void 0!==tg().WorkerGlobalScope&&"function"==typeof tg().importScripts}async function ty(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{let e=await navigator.serviceWorker.ready;return e.active}catch(e){return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tv="firebaseLocalStorageDb",tw="firebaseLocalStorage",tE="fbase_key";class t_{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tb(e,t){return e.transaction([tw],t?"readwrite":"readonly").objectStore(tw)}function tT(){let e=indexedDB.open(tv,1);return new Promise((t,r)=>{e.addEventListener("error",()=>{r(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(tw,{keyPath:tE})}catch(e){r(e)}}),e.addEventListener("success",async()=>{let r=e.result;r.objectStoreNames.contains(tw)?t(r):(r.close(),await function(){let e=indexedDB.deleteDatabase(tv);return new t_(e).toPromise()}(),t(await tT()))})})}async function tI(e,t,r){let n=tb(e,!0).put({[tE]:t,value:r});return new t_(n).toPromise()}async function tS(e,t){let r=tb(e,!1).get(t),n=await new t_(r).toPromise();return void 0===n?null:n.value}function tC(e,t){let r=tb(e,!0).delete(t);return new t_(r).toPromise()}class tA{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await tT()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=td._getInstance(tm()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>{let r=await this._poll();return{keyProcessed:r.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ty(),!this.activeServiceWorker)return;this.sender=new tp(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&(null===(e=r[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=r[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await tT();return await tI(e,tl,"1"),await tC(e,tl),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>tI(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>tS(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tC(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>{let t=tb(e,!1).getAll();return new t_(t).toPromise()});if(!e||0!==this.pendingWrites)return[];let t=[],r=new Set;if(0!==e.length)for(let{fbase_key:n,value:i}of e)r.add(n),JSON.stringify(this.localCache[n])!==JSON.stringify(i)&&(this.notifyListeners(n,i),t.push(n));for(let e of Object.keys(this.localCache))this.localCache[e]&&!r.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tk(e,t){return R(e,"POST","/v2/accounts/mfaSignIn:start",k(e,t))}tA.type="LOCAL",eS("rcb"),new b(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tR="recaptcha";async function tN(e,t,r){var n;if(!e._getRecaptchaConfig())try{await eP(e)}catch(e){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(i="string"==typeof t?{phoneNumber:t}:t,"session"in i){let t=i.session;if("phoneNumber"in i){v("enroll"===t.type,e,"internal-error");let n={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===ek){v((null==r?void 0:r.type)===tR,e,"argument-error");let n=await tO(e,t,r);return to(e,n)}return to(e,t)},a=eO(e,n,"mfaSmsEnrollment",s,"PHONE_PROVIDER"),o=await a.catch(e=>Promise.reject(e));return o.phoneSessionInfo.sessionInfo}{v("signin"===t.type,e,"internal-error");let s=(null===(n=i.multiFactorHint)||void 0===n?void 0:n.uid)||i.multiFactorUid;v(s,e,"missing-multi-factor-info");let a={mfaPendingCredential:t.credential,mfaEnrollmentId:s,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},o=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===ek){v((null==r?void 0:r.type)===tR,e,"argument-error");let n=await tO(e,t,r);return tk(e,n)}return tk(e,t)},l=eO(e,a,"mfaSmsSignIn",o,"PHONE_PROVIDER"),u=await l.catch(e=>Promise.reject(e));return u.phoneResponseInfo.sessionInfo}}{let t={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"},n=async(e,t)=>{if(t.captchaResponse===ek){v((null==r?void 0:r.type)===tR,e,"argument-error");let n=await tO(e,t,r);return e$(e,n)}return e$(e,t)},s=eO(e,t,"sendVerificationCode",n,"PHONE_PROVIDER"),a=await s.catch(e=>Promise.reject(e));return a.sessionInfo}}finally{null==r||r._reset()}}async function tO(e,t,r){v(r.type===tR,e,"argument-error");let n=await r.verify();v("string"==typeof n,e,"argument-error");let i=Object.assign({},t);if("phoneEnrollmentInfo"in i){let e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,r=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:n,captchaResponse:t,clientType:r,recaptchaVersion:s}}),i}if(!("phoneSignInInfo"in i))return Object.assign(i,{recaptchaToken:n}),i;{let e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,r=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:n,captchaResponse:e,clientType:t,recaptchaVersion:r}}),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tP{constructor(e){this.providerId=tP.PROVIDER_ID,this.auth=eb(e)}verifyPhoneNumber(e,t){return tN(this.auth,e,(0,s.m9)(t))}static credential(e,t){return eW._fromVerification(e,t)}static credentialFromResult(e){return tP.credentialFromTaggedObject(e)}static credentialFromError(e){return tP.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?eW._fromTokenResponse(t,r):null}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tD(e,t){return t?en(t):(v(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}tP.PROVIDER_ID="phone",tP.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tL extends ex{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return eB(e,this._buildIdpRequest())}_linkToIdToken(e,t){return eB(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return eB(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tx(e){return te(e.auth,new tL(e),e.bypassAuthState)}function tM(e){let{auth:t,user:r}=e;return v(r,t,"internal-error"),e7(r,new tL(e),e.bypassAuthState)}async function tU(e){let{auth:t,user:r}=e;return v(r,t,"internal-error"),e8(r,new tL(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tV{constructor(e,t,r,n,i=!1){this.auth=e,this.resolver=r,this.user=n,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:n,tenantId:i,error:s,type:a}=e;if(s){this.reject(s);return}let o={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:n||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tx;case"linkViaPopup":case"linkViaRedirect":return tU;case"reauthViaPopup":case"reauthViaRedirect":return tM;default:f(this.auth,"internal-error")}}resolve(e){this.pendingPromise||w("Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){this.pendingPromise||w("Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tF=new b(2e3,1e4);async function tj(e,t,r){if((0,i.rh)(e.app))return Promise.reject(p(e,"operation-not-supported-in-this-environment"));let n=eb(e);!function(e,t,r){if(!(t instanceof r))throw r.name!==t.constructor.name&&f(e,"argument-error"),g(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,eY);let s=tD(n,r),a=new tB(n,"signInViaPopup",t,s);return a.executeNotNull()}class tB extends tV{constructor(e,t,r,n,i){super(e,t,n,i),this.provider=r,this.authWindow=null,this.pollId=null,tB.currentPopupAction&&tB.currentPopupAction.cancel(),tB.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){1===this.filter.length||w("Popup operations only handle one event");let e=tf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,tB.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(null===(r=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===r?void 0:r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tF.get())};e()}}tB.currentPopupAction=null;let tz=new Map;class t$ extends tV{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=tz.get(this.auth._key());if(!e){try{let t=await tq(this.resolver,this.auth),r=t?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}tz.set(this.auth._key(),e)}return this.bypassAuthState||tz.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tq(e,t){let r=es("pendingRedirect",t.config.apiKey,t.name),n=en(e._redirectPersistence);if(!await n._isAvailable())return!1;let i=await n._get(r)==="true";return await n._remove(r),i}function tH(e,t){tz.set(e._key(),t)}async function tK(e,t,r=!1){if((0,i.rh)(e.app))return Promise.reject(m(e));let n=eb(e),s=tD(n,t),a=new t$(n,s,r),o=await a.execute();return o&&!r&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,t)),o}class tG{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tQ(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!tQ(e)){let n=(null===(r=e.error.code)||void 0===r?void 0:r.split("auth/")[1])||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(tW(e))}saveEventToCache(e){this.cachedEventUids.add(tW(e)),this.lastProcessedEventTime=Date.now()}}function tW(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function tQ({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tJ(e,t={}){return R(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tY=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,tX=/^https?/;async function tZ(e){if(e.config.emulator)return;let{authorizedDomains:t}=await tJ(e);for(let e of t)try{if(function(e){let t=E(),{protocol:r,hostname:n}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===n?"chrome-extension:"===r&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===r&&i.hostname===n}if(!tX.test(r))return!1;if(tY.test(e))return n===e;let i=e.replace(/\./g,"\\."),s=RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(n)}(e))return}catch(e){}f(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t0=new b(3e4,6e4);function t1(){let e=tg().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let t2=null,t4=new b(5e3,15e3),t9={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},t6=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function t5(e){let t=await (t2=t2||new Promise((t,r)=>{var n,i,s,a;function o(){t1(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{t1(),r(p(e,"network-request-failed"))},timeout:t0.get()})}if(null===(i=null===(n=tg().gapi)||void 0===n?void 0:n.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else if(null===(s=tg().gapi)||void 0===s?void 0:s.load)o();else{let t=eS("iframefcb");return tg()[t]=()=>{gapi.load?o():r(p(e,"network-request-failed"))},(a=`${eI.gapiScript}?onload=${t}`,eI.loadJS(a)).catch(e=>r(e))}}).catch(e=>{throw t2=null,e})),r=tg().gapi;return v(r,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;v(t.authDomain,e,"auth-domain-config-required");let r=t.emulator?T(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,n={apiKey:t.apiKey,appName:e.name,v:i.Jn},a=t6.get(e.config.apiHost);a&&(n.eid=a);let o=e._getFrameworks();return o.length&&(n.fw=o.join(",")),`${r}?${(0,s.xO)(n).slice(1)}`}(e),messageHandlersFilter:r.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:t9,dontclear:!0},t=>new Promise(async(r,n)=>{await t.restyle({setHideOnLeave:!1});let i=p(e,"network-request-failed"),s=tg().setTimeout(()=>{n(i)},t4.get());function a(){tg().clearTimeout(s),r(t)}t.ping(a).then(a,()=>{n(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t3={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class t8{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}let t7=encodeURIComponent("fac");async function re(e,t,r,n,a,o){v(e.config.authDomain,e,"auth-domain-config-required"),v(e.config.apiKey,e,"invalid-api-key");let l={apiKey:e.config.apiKey,appName:e.name,authType:r,redirectUrl:n,v:i.Jn,eventId:a};if(t instanceof eY)for(let[r,n]of(t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,s.xb)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(o||{})))l[r]=n;if(t instanceof eX){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(l.scopes=e.join(","))}for(let t of(e.tenantId&&(l.tid=e.tenantId),Object.keys(l)))void 0===l[t]&&delete l[t];let u=await e._getAppCheckToken(),h=u?`#${t7}=${encodeURIComponent(u)}`:"";return`${function({config:e}){return e.emulator?T(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${(0,s.xO)(l).slice(1)}${h}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rt="webStorageSupport",rr=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=tc,this._completeRedirectFn=tK,this._overrideRedirectResult=tH}async _openPopup(e,t,r,n){var i;(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager)||w("_initialize() not called before _openPopup()");let a=await re(e,t,r,E(),n);return function(e,t,r,n=500,i=600){let a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString(),l="",u=Object.assign(Object.assign({},t3),{width:n.toString(),height:i.toString(),top:a,left:o}),h=(0,s.z$)().toLowerCase();r&&(l=eh(h)?"_blank":r),el(h)&&(t=t||"http://localhost",u.scrollbars="yes");let c=Object.entries(u).reduce((e,[t,r])=>`${e}${t}=${r},`,"");if(function(e=(0,s.z$)()){var t;return eg(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(h)&&"_self"!==l)return function(e,t){let r=document.createElement("a");r.href=e,r.target=t;let n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),r.dispatchEvent(n)}(t||"",l),new t8(null);let d=window.open(t||"",l,c);v(d,e,"popup-blocked");try{d.focus()}catch(e){}return new t8(d)}(e,a,tf())}async _openRedirect(e,t,r,n){await this._originValidation(e);let i=await re(e,t,r,E(),n);return tg().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:r}=this.eventManagers[t];return e?Promise.resolve(e):(r||w("If manager is not set, promise should be"),r)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await t5(e),r=new tG(e);return t.register("authEvent",t=>{v(null==t?void 0:t.authEvent,e,"invalid-auth-event");let n=r.onEvent(t.authEvent);return{status:n?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){let r=this.iframes[e._key()];r.send(rt,{type:rt},r=>{var n;let i=null===(n=null==r?void 0:r[0])||void 0===n?void 0:n[rt];void 0!==i&&t(!!i),f(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=tZ(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return em()||eu()||eg()}};class rn{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return w("unexpected MultiFactorSessionType")}}}class ri extends rn{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new ri(e)}_finalizeEnroll(e,t,r){return R(e,"POST","/v2/accounts/mfaEnrollment:finalize",k(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return R(e,"POST","/v2/accounts/mfaSignIn:finalize",k(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class rs extends rn{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new rs(t,void 0,e)}static _fromEnrollmentId(e,t){return new rs(t,e)}async _finalizeEnroll(e,t,r){return v(void 0!==this.secret,e,"argument-error"),R(e,"POST","/v2/accounts/mfaEnrollment:finalize",k(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){v(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let r={verificationCode:this.otp};return R(e,"POST","/v2/accounts/mfaSignIn:finalize",k(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r}))}}class ra{constructor(e,t,r,n,i,s,a){this.sessionInfo=s,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=n,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new ra(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let n=!1;return(ro(e)||ro(t))&&(n=!0),n&&(ro(e)&&(e=(null===(r=this.auth.currentUser)||void 0===r?void 0:r.email)||"unknownuser"),ro(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function ro(e){return void 0===e||(null==e?void 0:e.length)===0}var rl="@firebase/auth",ru="1.10.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;let t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}let rc=(0,s.Pz)("authIdTokenMaxAge")||300,rd=null,rf=e=>async t=>{let r=t&&await t.getIdTokenResult(),n=r&&(new Date().getTime()-Date.parse(r.issuedAtTime))/1e3;if(n&&n>rc)return;let i=null==r?void 0:r.token;rd!==i&&(rd=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function rp(e=(0,i.Mq)()){let t=(0,i.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let r=(0,i.qX)(e,"auth");if(r.isInitialized()){let e=r.getImmediate(),n=r.getOptions();if((0,s.vZ)(n,null!=t?t:{}))return e;f(e,"already-initialized")}let n=r.initialize({options:t});return n}(e,{popupRedirectResolver:rr,persistence:[tA,th,tc]}),n=(0,s.Pz)("authTokenSyncURL");if(n&&"boolean"==typeof isSecureContext&&isSecureContext){let e=new URL(n,location.origin);if(location.origin===e.origin){let t=rf(e.toString());(0,s.m9)(r).beforeAuthStateChanged(t,()=>t(r.currentUser)),(0,s.m9)(r).onIdTokenChanged(e=>t(e),void 0,void 0)}}let a=(0,s.q4)("auth");return a&&function(e,t,r){let n=eb(e);v(/^https?:\/\//.test(t),n,"invalid-emulator-scheme");let i=!!(null==r?void 0:r.disableWarnings),a=eD(t),{host:o,port:l}=function(e){let t=eD(e),r=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!r)return{host:"",port:null};let n=r[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){let e=i[1];return{host:e,port:eL(n.substr(e.length+1))}}{let[e,t]=n.split(":");return{host:e,port:eL(t)}}}(t),u=null===l?"":`:${l}`,h={url:`${a}//${o}${u}/`},c=Object.freeze({host:o,port:l,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!n._canInitEmulator){v(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),v((0,s.vZ)(h,n.config.emulator)&&(0,s.vZ)(c,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=c,n.settings.appVerificationDisabledForTesting=!0,i||function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(r,`http://${a}`),r}eI={loadJS:e=>new Promise((t,r)=>{var n,i;let s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{let t=p("internal-error");t.customData=e,r(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(i=null===(n=document.getElementsByTagName("head"))||void 0===n?void 0:n[0])&&void 0!==i?i:document).appendChild(s)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},n="Browser",(0,i.Xd)(new l.wA("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=r.options;v(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ey(n)},u=new e_(r,i,s,l);return function(e,t){let r=(null==t?void 0:t.persistence)||[],n=(Array.isArray(r)?r:[r]).map(en);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(n,null==t?void 0:t.popupRedirectResolver)}(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{let n=e.getProvider("auth-internal");n.initialize()})),(0,i.Xd)(new l.wA("auth-internal",e=>{let t=eb(e.getProvider("auth").getImmediate());return new rh(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),(0,i.KN)(rl,ru,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(n)),(0,i.KN)(rl,ru,"esm2017")},7582:function(e,t,r){"use strict";r.d(t,{ZT:function(){return i},_T:function(){return a},pi:function(){return s}});var n=function(e,t){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function i(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var s=function(){return(s=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function a(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)0>t.indexOf(n[i])&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r}"function"==typeof SuppressedError&&SuppressedError}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1118),t(8355)}),_N_E=e.O()}]);