var e,n,t,o,r,_,l={},i=[],u=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,n){for(var t in n)e[t]=n[t];return e}function s(e){var n=e.parentNode;n&&n.removeChild(e)}function a(e,n,t){var o,r,_,l=arguments,i={};for(_ in n)"key"==_?o=n[_]:"ref"==_?r=n[_]:i[_]=n[_];if(arguments.length>3)for(t=[t],_=3;_<arguments.length;_++)t.push(l[_]);if(null!=t&&(i.children=t),"function"==typeof e&&null!=e.defaultProps)for(_ in e.defaultProps)void 0===i[_]&&(i[_]=e.defaultProps[_]);return f(e,i,o,r,null)}function f(n,t,o,r,_){var l={type:n,props:t,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==_?++e.__v:_};return null!=e.vnode&&e.vnode(l),l}function h(e){return e.children}function p(e,n){this.props=e,this.context=n}function d(e,n){if(null==n)return e.__?d(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?d(e):null}function v(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return v(e)}}function m(r){(!r.__d&&(r.__d=!0)&&n.push(r)&&!y.__r++||o!==e.debounceRendering)&&((o=e.debounceRendering)||t)(y)}function y(){for(var e;y.__r=n.length;)e=n.sort((function(e,n){return e.__v.__b-n.__v.__b})),n=[],e.some((function(e){var n,t,o,r,_,l;e.__d&&(_=(r=(n=e).__v).__e,(l=n.__P)&&(t=[],(o=c({},r)).__v=r.__v+1,S(l,r,o,n.__n,void 0!==l.ownerSVGElement,null!=r.__h?[_]:null,t,null==_?d(r):_,r.__h),x(t,r),r.__e!=_&&v(r)))}))}function g(e,n,t,o,r,_,u,c,a,p){var v,m,y,g,w,C,$,E=o&&o.__k||i,x=E.length;for(a==l&&(a=null!=u?u[0]:x?d(o,0):null),t.__k=[],v=0;v<n.length;v++)if(null!=(g=t.__k[v]=null==(g=n[v])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g?f(null,g,null,null,g):Array.isArray(g)?f(h,{children:g},null,null,null):g.__b>0?f(g.type,g.props,g.key,null,g.__v):g)){if(g.__=t,g.__b=t.__b+1,null===(y=E[v])||y&&g.key==y.key&&g.type===y.type)E[v]=void 0;else for(m=0;m<x;m++){if((y=E[m])&&g.key==y.key&&g.type===y.type){E[m]=void 0;break}y=null}S(e,g,y=y||l,r,_,u,c,a,p),w=g.__e,(m=g.ref)&&y.ref!=m&&($||($=[]),y.ref&&$.push(y.ref,null,g),$.push(m,g.__c||w,g)),null!=w?(null==C&&(C=w),"function"==typeof g.type&&g.__k===y.__k?g.__d=a=b(g,a,e):a=k(e,g,y,E,u,w,a),p||"option"!==t.type?"function"==typeof t.type&&(t.__d=a):e.value=""):a&&y.__e==a&&a.parentNode!=e&&(a=d(y))}if(t.__e=C,null!=u&&"function"!=typeof t.type)for(v=u.length;v--;)null!=u[v]&&s(u[v]);for(v=x;v--;)null!=E[v]&&("function"==typeof t.type&&null!=E[v].__e&&E[v].__e==t.__d&&(t.__d=d(o,v+1)),N(E[v],E[v]));if($)for(v=0;v<$.length;v++)H($[v],$[++v],$[++v])}function b(e,n,t){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,"function"==typeof r.type?b(r,n,t):n=k(t,r,r,e.__k,null,r.__e,n));return n}function k(e,n,t,o,r,_,l){var i,u,c;if(void 0!==n.__d)i=n.__d,n.__d=void 0;else if(r==t||_!=l||null==_.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(_),i=null;else{for(u=l,c=0;(u=u.nextSibling)&&c<o.length;c+=2)if(u==_)break e;e.insertBefore(_,l),i=l}return void 0!==i?i:_.nextSibling}function w(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||u.test(n)?t:t+"px"}function C(e,n,t,o,r){var _,l,i;if(r&&"className"==n&&(n="class"),"style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||w(e.style,n,"");if(t)for(n in t)o&&t[n]===o[n]||w(e.style,n,t[n])}else"o"===n[0]&&"n"===n[1]?(_=n!==(n=n.replace(/Capture$/,"")),(l=n.toLowerCase())in e&&(n=l),n=n.slice(2),e.l||(e.l={}),e.l[n+_]=t,i=_?E:$,t?o||e.addEventListener(n,i,_):e.removeEventListener(n,i,_)):"list"!==n&&"tagName"!==n&&"form"!==n&&"type"!==n&&"size"!==n&&"download"!==n&&"href"!==n&&!r&&n in e?e[n]=null==t?"":t:"function"!=typeof t&&"dangerouslySetInnerHTML"!==n&&(n!==(n=n.replace(/xlink:?/,""))?null==t||!1===t?e.removeAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase(),t):null==t||!1===t&&!/^ar/.test(n)?e.removeAttribute(n):e.setAttribute(n,t))}function $(n){this.l[n.type+!1](e.event?e.event(n):n)}function E(n){this.l[n.type+!0](e.event?e.event(n):n)}function S(n,t,o,r,_,l,i,u,s){var a,f,d,v,m,y,b,k,w,C,$,E=t.type;if(void 0!==t.constructor)return null;null!=o.__h&&(s=o.__h,u=t.__e=o.__e,t.__h=null,l=[u]),(a=e.__b)&&a(t);try{e:if("function"==typeof E){if(k=t.props,w=(a=E.contextType)&&r[a.__c],C=a?w?w.props.value:a.__:r,o.__c?b=(f=t.__c=o.__c).__=f.__E:("prototype"in E&&E.prototype.render?t.__c=f=new E(k,C):(t.__c=f=new p(k,C),f.constructor=E,f.render=L),w&&w.sub(f),f.props=k,f.state||(f.state={}),f.context=C,f.__n=r,d=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=E.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=c({},f.__s)),c(f.__s,E.getDerivedStateFromProps(k,f.__s))),v=f.props,m=f.state,d)null==E.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==E.getDerivedStateFromProps&&k!==v&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(k,C),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(k,f.__s,C)||t.__v===o.__v){f.props=k,f.state=f.__s,t.__v!==o.__v&&(f.__d=!1),f.__v=t,t.__e=o.__e,t.__k=o.__k,f.__h.length&&i.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(k,f.__s,C),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(v,m,y)}))}f.context=C,f.props=k,f.state=f.__s,(a=e.__r)&&a(t),f.__d=!1,f.__v=t,f.__P=n,a=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(r=c(c({},r),f.getChildContext())),d||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(v,m)),$=null!=a&&a.type===h&&null==a.key?a.props.children:a,g(n,Array.isArray($)?$:[$],t,o,r,_,l,i,u,s),f.base=t.__e,t.__h=null,f.__h.length&&i.push(f),b&&(f.__E=f.__=null),f.__e=!1}else null==l&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):t.__e=P(o.__e,t,o,r,_,l,i,s);(a=e.diffed)&&a(t)}catch(n){t.__v=null,(s||null!=l)&&(t.__e=u,t.__h=!!s,l[l.indexOf(u)]=null),e.__e(n,t,o)}}function x(n,t){e.__c&&e.__c(t,n),n.some((function(t){try{n=t.__h,t.__h=[],n.some((function(e){e.call(t)}))}catch(n){e.__e(n,t.__v)}}))}function P(e,n,t,o,r,_,u,c){var s,a,f,h,p,d=t.props,v=n.props;if(r="svg"===n.type||r,null!=_)for(s=0;s<_.length;s++)if(null!=(a=_[s])&&((null===n.type?3===a.nodeType:a.localName===n.type)||e==a)){e=a,_[s]=null;break}if(null==e){if(null===n.type)return document.createTextNode(v);e=r?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type,v.is&&{is:v.is}),_=null,c=!1}if(null===n.type)d===v||c&&e.data===v||(e.data=v);else{if(null!=_&&(_=i.slice.call(e.childNodes)),f=(d=t.props||l).dangerouslySetInnerHTML,h=v.dangerouslySetInnerHTML,!c){if(null!=_)for(d={},p=0;p<e.attributes.length;p++)d[e.attributes[p].name]=e.attributes[p].value;(h||f)&&(h&&(f&&h.__html==f.__html||h.__html===e.innerHTML)||(e.innerHTML=h&&h.__html||""))}(function(e,n,t,o,r){var _;for(_ in t)"children"===_||"key"===_||_ in n||C(e,_,null,t[_],o);for(_ in n)r&&"function"!=typeof n[_]||"children"===_||"key"===_||"value"===_||"checked"===_||t[_]===n[_]||C(e,_,n[_],t[_],o)})(e,v,d,r,c),h?n.__k=[]:(s=n.props.children,g(e,Array.isArray(s)?s:[s],n,t,o,"foreignObject"!==n.type&&r,_,u,l,c)),c||("value"in v&&void 0!==(s=v.value)&&(s!==e.value||"progress"===n.type&&!s)&&C(e,"value",s,d.value,!1),"checked"in v&&void 0!==(s=v.checked)&&s!==e.checked&&C(e,"checked",s,d.checked,!1))}return e}function H(n,t,o){try{"function"==typeof n?n(t):n.current=t}catch(n){e.__e(n,o)}}function N(n,t,o){var r,_,l;if(e.unmount&&e.unmount(n),(r=n.ref)&&(r.current&&r.current!==n.__e||H(r,null,t)),o||"function"==typeof n.type||(o=null!=(_=n.__e)),n.__e=n.__d=void 0,null!=(r=n.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(n){e.__e(n,t)}r.base=r.__P=null}if(r=n.__k)for(l=0;l<r.length;l++)r[l]&&N(r[l],t,o);null!=_&&s(_)}function L(e,n,t){return this.constructor(e,t)}function T(n,t,o){var _,u,c;e.__&&e.__(n,t),u=(_=o===r)?null:o&&o.__k||t.__k,n=a(h,null,[n]),c=[],S(t,(_?t:o||t).__k=n,u||l,l,void 0!==t.ownerSVGElement,o&&!_?[o]:u?null:t.childNodes.length?i.slice.call(t.childNodes):null,c,o||l,_),x(c,n)}function M(e,n,t){var o,r,_,l=arguments,i=c({},e.props);for(_ in n)"key"==_?o=n[_]:"ref"==_?r=n[_]:i[_]=n[_];if(arguments.length>3)for(t=[t],_=3;_<arguments.length;_++)t.push(l[_]);return null!=t&&(i.children=t),f(e.type,i,o||e.key,r||e.ref,null)}e={__e:function(e,n){for(var t,o,r,_=n.__h;n=n.__;)if((t=n.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(e)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(e),r=t.__d),r)return n.__h=_,t.__E=t}catch(n){e=n}throw e},__v:0},p.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},t),this.props)),e&&c(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),m(this))},p.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},p.prototype.render=h,n=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0,r=l,_=0;var D=function(e,n,t,o){var r;n[0]=0;for(var _=1;_<n.length;_++){var l=n[_++],i=n[_]?(n[0]|=l?1:2,t[n[_++]]):n[++_];3===l?o[0]=i:4===l?o[1]=Object.assign(o[1]||{},i):5===l?(o[1]=o[1]||{})[n[++_]]=i:6===l?o[1][n[++_]]+=i+"":l?(r=e.apply(i,D(e,i,t,["",null])),o.push(r),i[0]?n[0]|=2:(n[_-2]=0,n[_]=r)):o.push(i)}return o},A=new Map;var U=function(e){var n=A.get(this);return n||(n=new Map,A.set(this,n)),(n=D(this,n.get(e)||(n.set(e,n=function(e){for(var n,t,o=1,r="",_="",l=[0],i=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?l.push(0,e,r):3===o&&(e||r)?(l.push(3,e,r),o=2):2===o&&"..."===r&&e?l.push(4,e,0):2===o&&r&&!e?l.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(l.push(o,0,r,t),o=6),e&&(l.push(o,e,0,t),o=6)),r=""},u=0;u<e.length;u++){u&&(1===o&&i(),i(u));for(var c=0;c<e[u].length;c++)n=e[u][c],1===o?"<"===n?(i(),l=[l],o=3):r+=n:4===o?"--"===r&&">"===n?(o=1,r=""):r=n+r[0]:_?n===_?_="":r+=n:'"'===n||"'"===n?_=n:">"===n?(i(),o=1):o&&("="===n?(o=5,t=r,r=""):"/"===n&&(o<5||">"===e[u][c+1])?(i(),3===o&&(l=l[0]),o=l,(l=l[0]).push(2,0,o),o=0):" "===n||"\t"===n||"\n"===n||"\r"===n?(i(),o=2):r+=n),3===o&&"!--"===r&&(o=4,l=l[0])}return i(),l}(e)),n),arguments,[])).length>1?n:n[0]}.bind(a);let W;function q(e,n){if("undefined"==typeof window)return;let t=document.querySelector("script[type=isodata]");n=n||t&&t.parentNode||document.body,!W&&t?function(e,n){T(e,n,r)}(e,n):T(e,n),W=!0}var R,F,j,O=0,B=[],G=e.__b,I=e.__r,Z=e.diffed,z=e.__c,V=e.unmount;function J(n,t){e.__h&&e.__h(F,n,O||t),O=0;var o=F.__H||(F.__H={__:[],__h:[]});return n>=o.__.length&&o.__.push({}),o.__[n]}function K(e){return O=1,Q(le,e)}function Q(e,n,t){var o=J(R++,2);return o.t=e,o.__c||(o.__=[t?t(n):le(void 0,n),function(e){var n=o.t(o.__[0],e);o.__[0]!==n&&(o.__=[n,o.__[1]],o.__c.setState({}))}],o.__c=F),o.__}function X(n,t){var o=J(R++,3);!e.__s&&_e(o.__H,t)&&(o.__=n,o.__H=t,F.__H.__h.push(o))}function Y(e){return O=5,ee((function(){return{current:e}}),[])}function ee(e,n){var t=J(R++,7);return _e(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function ne(){B.forEach((function(t){if(t.__P)try{t.__H.__h.forEach(oe),t.__H.__h.forEach(re),t.__H.__h=[]}catch(n){t.__H.__h=[],e.__e(n,t.__v)}})),B=[]}e.__b=function(e){F=null,G&&G(e)},e.__r=function(e){I&&I(e),R=0;var n=(F=e.__c).__H;n&&(n.__h.forEach(oe),n.__h.forEach(re),n.__h=[])},e.diffed=function(n){Z&&Z(n);var t=n.__c;t&&t.__H&&t.__H.__h.length&&(1!==B.push(t)&&j===e.requestAnimationFrame||((j=e.requestAnimationFrame)||function(e){var n,t=function(){clearTimeout(o),te&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,100);te&&(n=requestAnimationFrame(t))})(ne)),F=void 0},e.__c=function(n,t){t.some((function(n){try{n.__h.forEach(oe),n.__h=n.__h.filter((function(e){return!e.__||re(e)}))}catch(_){t.some((function(e){e.__h&&(e.__h=[])})),t=[],e.__e(_,n.__v)}})),z&&z(n,t)},e.unmount=function(n){V&&V(n);var t=n.__c;if(t&&t.__H)try{t.__H.__.forEach(oe)}catch(n){e.__e(n,t.__v)}};var te="function"==typeof requestAnimationFrame;function oe(e){var n=F;"function"==typeof e.__c&&e.__c(),F=n}function re(e){var n=F;e.__c=e.__(),F=n}function _e(e,n){return!e||e.length!==n.length||n.some((function(n,t){return n!==e[t]}))}function le(e,n){return"function"==typeof n?n(e):n}const ie=(e,n,t)=>{if(n&&"click"===n.type){const o=n.target.closest("a[href]");if(!o||o.origin!=location.origin)return e;n.preventDefault(),t=!0,n=o.href.replace(location.origin,"")}else"string"!=typeof n&&(n=location.pathname+location.search);return!0===t?history.pushState(null,"",n):!1===t&&history.replaceState(null,"",n),n};function ue(e){const[n,t]=Q(ie,location.pathname+location.search),o=ee(()=>{const e=new URL(n,location.origin),o=e.pathname.replace(/(.)\/$/g,"$1");return{url:n,path:o,query:Object.fromEntries(e.searchParams),route:t}},[n]);return X(()=>(addEventListener("click",t),addEventListener("popstate",t),()=>{removeEventListener("click",t),removeEventListener("popstate",t)})),a(ue.ctx.Provider,{value:o},e.children)}function ce(e){const[,n]=Q(e=>e+1,0),t=se(),{url:o,path:r,query:_}=t,l=Y(t),i=Y(),u=Y(),c=Y(),s=Y();o!==l.current.url&&(s.current=null,i.current=l.current,c.current=u.current,l.current=t),this.componentDidCatch=e=>{e&&e.then&&(s.current=e)},X(()=>{let t=s.current;const r=()=>{l.current.url===o&&s.current===t&&(e.onLoadEnd&&e.onLoadEnd(o),i.current=c.current=null,n(0))};t?(e.onLoadStart&&e.onLoadStart(o),t.then(r)):r()},[o]);const a=[].concat(...e.children);let f=a.filter(e=>e.props.path===r);return 0==f.length&&(f=a.filter(e=>e.props.default)),u.current=f.map((e,n)=>M(e,{path:r,query:_})),u.current.concat(c.current||[])}ce.Provider=ue,ue.ctx=function(e,n){var t={__c:n="__cC"+_++,__:e,Consumer:function(e,n){return e.children(n)},Provider:function(e){var t,o;return this.getChildContext||(t=[],(o={})[n]=this,this.getChildContext=function(){return o},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&t.some(m)},this.sub=function(e){t.push(e);var n=e.componentWillUnmount;e.componentWillUnmount=function(){t.splice(t.indexOf(e),1),n&&n.call(e)}}),e.children}};return t.Provider.__=t.Consumer.contextType=t}({});const se=()=>function(e){var n=F.context[e.__c],t=J(R++,9);return t.__c=e,n?(null==t.__&&(t.__=!0,n.sub(F)),n.props.value):e.__}(ue.ctx);function ae(e){let n,t;return o=>{n||(n=e().then(e=>(t=e&&e.default||e,1)));const[,r]=K(0),_=Y(t);if(_.current||(_.current=n.then(r)),void 0===t)throw n;return a(t,o)}}function fe(e){return this.componentDidCatch=he,e.children}function he(e){e&&e.then?this.__d=!0:this.props.onError&&this.props.onError(e)}function pe(e){if(document.querySelector('link[rel=stylesheet][href="'+e+'"]'))return;const n=document.createElement("link");n.rel="stylesheet",n.href=e,document.head.appendChild(n)}null;const de="host_1vq48fc";null;const ve="host_1q8y6om";function me(){return U`<div class=${ve}>
      <a href="#maincontent">skip to main content</a>
    </div>`}null;const ye="host_216t9o";function ge(){return U`<div class=${ye}>
      <h2>
        <a href="/">
          Zhenyang Hua
        </a>
      </h2>
    </div>`}null;const be="host_m2uvri",ke="active_m2uvri";function we({activeClassName:e,...n}){const{path:t}=se();let o=n.class;return n.href===t&&(o=`${o} ${e}`),U`<a ...${n} class=${o}/>`}const Ce=[{url:"/",title:"Zhenyang Hua",label:"Tools",Route:ae(()=>(pe("/assets/style.module.ddcbed56.css"),import("./chunks/tools.a901e066.js")))},{url:"/writings",title:"Writings - Zhenyang Hua",label:"Writings",Route:ae(()=>import("./chunks/index.bb68af09.js"))}];function $e(){return U`<div class=${be}>
      <nav>
        <h2 class="hidden">Main Navigation</h2>
        <ul>
          ${Ce.map(e=>U`<li>
              <${we} href=${e.url} activeClassName=${ke}>${e.label}</${we}>
            </li>`)}
        </ul>
      </nav>
    </div>`}null;const Ee="host_1c336ft";function Se(){return U`<div class=${Ee}>
      <span>
        This is a space that holds a collection of my personal work and ideas
      </span>
    </div>`}function xe(e){return Math.floor(Math.random()*Math.floor(e))}function Pe(){return[xe(256),xe(256),xe(256)]}function He(e){const[n,t,o]=e.map(e=>e/255).map(e=>e<.03928?e/12.92:Math.pow((e+.055)/1.055,2.4));return.2126*n+.7152*t+.0722*o}function Ne(e,n){return(He(e)+.05)/(He(n)+.05)}function Le(){const e=function(e,n=7){let t=Pe(),o=Ne(t,e);for(;o<n&&1/o<n;)t=Pe(),o=Ne(t,e);const[r,_,l]=t;return`rgb(${r}, ${_}, ${l})`}([1,54,64]);return U`<div class=${de} style=${{backgroundColor:e}}>
      <header>
        <${me}/>
        <${ge}/>
        <${$e}/>
        <${Se}/>
      </header>
    </div>`}const Te=[{url:"/2020/12/scope-limited-codeblock-web-component",title:"Create a Scope limited Codeblock Web Component - Articles",date:"Wed Dec 30 2020 12:00:00 GMT-0500 (Eastern Standard Time)",label:"scope-limited-codeblock-web-component",summary:"Create a Scope limited Codeblock Web Component",Route:ae(()=>import("./chunks/index.21a96df2.js"))}];function Me(){return U`<${ue}>
      <div id="contentcontainer" className="shadow">
        <${Le}/>
        <main id="maincontent">
          <${fe}>
            <${ce}>
              ${Ce.concat(Te).map(({Route:e,url:n})=>U`<${e} path=${n}/>`)}
            </${ce}>
          </${fe}>
        </main>
      </div>
    </${ue}>`}function De(e,n=!0){return new Promise((t,o)=>{const r=document.createElement("script");r.async=n,r.src=e,r.onload=t,r.onerror=o,document.head.appendChild(r)})}if("undefined"!=typeof window&&(window.Prism=window.Prism||{},Prism.manual=!0),De("/prism.js").then((function(){["light","dark"].forEach(e=>{const n=document.createElement("template");n.innerHTML=`\n    <link rel="stylesheet" href="/prism-${e}.css" />\n    ${"dark"===e?'<style>\n      :not(pre) > code[class*="language-"], pre[class*="language-"] {\n        background: var(--deepBlue);\n      }\n    </style>':""}\n    <div class="codeblock"></div>\n    <slot style="display: none"></slot>\n  `,customElements.define("codeblock-"+e,class extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}).appendChild(n.content.cloneNode(!0))}highlight(e){const n=this.shadowRoot.querySelector(".codeblock");n.innerHTML="";for(const t of e.assignedNodes())n.appendChild(t.cloneNode(!0));for(const t of n.childNodes)"PRE"===t.nodeName&&Prism.highlightAllUnder(t)}connectedCallback(){const e=this.shadowRoot.querySelector("slot");e.addEventListener("slotchange",()=>{this.highlight(e),this.obs&&this.obs.disconnect(),this.obs=new MutationObserver(n=>{for(const t of n)"characterData"===t.type&&this.highlight(e)});for(const n of e.assignedNodes())["CODE","PRE"].includes(n.nodeName.toUpperCase())&&this.obs.observe(n,{subtree:!0,characterData:!0})})}disconnectedCallback(){this.obs&&this.obs.disconnect()}})})})),"undefined"!=typeof window){async function Ae(){await import("./chunks/houdini-leaf.f751fbe9.js"),q(U`<${Me}/>`)}self.CSS&&self.CSS.paintWorklet?Ae():import("./chunks/css-paint-polyfill.12d7a277.js").then(Ae)}async function Ue(e){const{default:n}=await import("./chunks/prerender.b02ce9ea.js");return n(U`<${Me} ...${e}/>`)}export{Y as a,Te as b,De as i,K as l,U as m,e as n,h as p,Ue as prerender,M as q,pe as s,a as v,X as y};