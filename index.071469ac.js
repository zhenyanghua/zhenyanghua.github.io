var e,n,t,o,r,l={},i=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,n){for(var t in n)e[t]=n[t];return e}function c(e){var n=e.parentNode;n&&n.removeChild(e)}function _(e,n,t){var o,r,l,i=arguments,s={};for(l in n)"key"==l?o=n[l]:"ref"==l?r=n[l]:s[l]=n[l];if(arguments.length>3)for(t=[t],l=3;l<arguments.length;l++)t.push(i[l]);if(null!=t&&(s.children=t),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===s[l]&&(s[l]=e.defaultProps[l]);return u(e,s,o,r,null)}function u(n,t,o,r,l){var i={type:n,props:t,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++e.__v:l};return null!=e.vnode&&e.vnode(i),i}function d(e){return e.children}function h(e,n){this.props=e,this.context=n}function f(e,n){if(null==n)return e.__?f(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?f(e):null}function p(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return p(e)}}function m(r){(!r.__d&&(r.__d=!0)&&n.push(r)&&!v.__r++||o!==e.debounceRendering)&&((o=e.debounceRendering)||t)(v)}function v(){for(var e;v.__r=n.length;)e=n.sort((function(e,n){return e.__v.__b-n.__v.__b})),n=[],e.some((function(e){var n,t,o,r,l,i,s;e.__d&&(i=(l=(n=e).__v).__e,(s=n.__P)&&(t=[],(o=a({},l)).__v=l.__v+1,r=x(s,l,o,n.__n,void 0!==s.ownerSVGElement,null!=l.__h?[i]:null,t,null==i?f(l):i,l.__h),C(t,l),r!=i&&p(l)))}))}function g(e,n,t,o,r,s,a,_,h,p){var m,v,g,b,k,w,$,S=o&&o.__k||i,C=S.length;for(h==l&&(h=null!=a?a[0]:C?f(o,0):null),t.__k=[],m=0;m<n.length;m++)if(null!=(b=t.__k[m]=null==(b=n[m])||"boolean"==typeof b?null:"string"==typeof b||"number"==typeof b?u(null,b,null,null,b):Array.isArray(b)?u(d,{children:b},null,null,null):null!=b.__e||null!=b.__c?u(b.type,b.props,b.key,null,b.__v):b)){if(b.__=t,b.__b=t.__b+1,null===(g=S[m])||g&&b.key==g.key&&b.type===g.type)S[m]=void 0;else for(v=0;v<C;v++){if((g=S[v])&&b.key==g.key&&b.type===g.type){S[v]=void 0;break}g=null}k=x(e,b,g=g||l,r,s,a,_,h,p),(v=b.ref)&&g.ref!=v&&($||($=[]),g.ref&&$.push(g.ref,null,b),$.push(v,b.__c||k,b)),null!=k?(null==w&&(w=k),h=y(e,b,g,S,a,k,h),p||"option"!=t.type?"function"==typeof t.type&&(t.__d=h):e.value=""):h&&g.__e==h&&h.parentNode!=e&&(h=f(g))}if(t.__e=w,null!=a&&"function"!=typeof t.type)for(m=a.length;m--;)null!=a[m]&&c(a[m]);for(m=C;m--;)null!=S[m]&&T(S[m],S[m]);if($)for(m=0;m<$.length;m++)M($[m],$[++m],$[++m])}function y(e,n,t,o,r,l,i){var s,a,c;if(void 0!==n.__d)s=n.__d,n.__d=void 0;else if(r==t||l!=i||null==l.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(l),s=null;else{for(a=i,c=0;(a=a.nextSibling)&&c<o.length;c+=2)if(a==l)break e;e.insertBefore(l,i),s=i}return void 0!==s?s:l.nextSibling}function b(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||s.test(n)?t:t+"px"}function k(e,n,t,o,r){var l,i,s;if(r&&"className"==n&&(n="class"),"style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||b(e.style,n,"");if(t)for(n in t)o&&t[n]===o[n]||b(e.style,n,t[n])}else"o"===n[0]&&"n"===n[1]?(l=n!==(n=n.replace(/Capture$/,"")),(i=n.toLowerCase())in e&&(n=i),n=n.slice(2),e.l||(e.l={}),e.l[n+l]=t,s=l?$:w,t?o||e.addEventListener(n,s,l):e.removeEventListener(n,s,l)):"list"!==n&&"tagName"!==n&&"form"!==n&&"type"!==n&&"size"!==n&&"download"!==n&&"href"!==n&&!r&&n in e?e[n]=null==t?"":t:"function"!=typeof t&&"dangerouslySetInnerHTML"!==n&&(n!==(n=n.replace(/xlink:?/,""))?null==t||!1===t?e.removeAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase(),t):null==t||!1===t&&!/^ar/.test(n)?e.removeAttribute(n):e.setAttribute(n,t))}function w(n){this.l[n.type+!1](e.event?e.event(n):n)}function $(n){this.l[n.type+!0](e.event?e.event(n):n)}function S(e,n,t){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,r.__e&&("function"==typeof r.type&&r.__k.length>1&&S(r,n,t),n=y(t,r,r,e.__k,null,r.__e,n),"function"==typeof e.type&&(e.__d=n)))}function x(n,t,o,r,l,i,s,c,_){var u,f,p,m,v,y,b,k,w,$,x,C=t.type;if(void 0!==t.constructor)return null;null!=o.__h&&(_=o.__h,c=t.__e=o.__e,t.__h=null,i=[c]),(u=e.__b)&&u(t);try{e:if("function"==typeof C){if(k=t.props,w=(u=C.contextType)&&r[u.__c],$=u?w?w.props.value:u.__:r,o.__c?b=(f=t.__c=o.__c).__=f.__E:("prototype"in C&&C.prototype.render?t.__c=f=new C(k,$):(t.__c=f=new h(k,$),f.constructor=C,f.render=A),w&&w.sub(f),f.props=k,f.state||(f.state={}),f.context=$,f.__n=r,p=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=C.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=a({},f.__s)),a(f.__s,C.getDerivedStateFromProps(k,f.__s))),m=f.props,v=f.state,p)null==C.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==C.getDerivedStateFromProps&&k!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(k,$),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(k,f.__s,$)||t.__v===o.__v){f.props=k,f.state=f.__s,t.__v!==o.__v&&(f.__d=!1),f.__v=t,t.__e=o.__e,t.__k=o.__k,f.__h.length&&s.push(f),S(t,c,n);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(k,f.__s,$),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,y)}))}f.context=$,f.props=k,f.state=f.__s,(u=e.__r)&&u(t),f.__d=!1,f.__v=t,f.__P=n,u=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(r=a(a({},r),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(m,v)),x=null!=u&&u.type==d&&null==u.key?u.props.children:u,g(n,Array.isArray(x)?x:[x],t,o,r,l,i,s,c,_),f.base=t.__e,t.__h=null,f.__h.length&&s.push(f),b&&(f.__E=f.__=null),f.__e=!1}else null==i&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):t.__e=E(o.__e,t,o,r,l,i,s,_);(u=e.diffed)&&u(t)}catch(n){t.__v=null,(_||null!=i)&&(t.__e=c,t.__h=!!_,i[i.indexOf(c)]=null),e.__e(n,t,o)}return t.__e}function C(n,t){e.__c&&e.__c(t,n),n.some((function(t){try{n=t.__h,t.__h=[],n.some((function(e){e.call(t)}))}catch(n){e.__e(n,t.__v)}}))}function E(e,n,t,o,r,s,a,c){var _,u,d,h,f,p=t.props,m=n.props;if(r="svg"===n.type||r,null!=s)for(_=0;_<s.length;_++)if(null!=(u=s[_])&&((null===n.type?3===u.nodeType:u.localName===n.type)||e==u)){e=u,s[_]=null;break}if(null==e){if(null===n.type)return document.createTextNode(m);e=r?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type,m.is&&{is:m.is}),s=null,c=!1}if(null===n.type)p===m||c&&e.data===m||(e.data=m);else{if(null!=s&&(s=i.slice.call(e.childNodes)),d=(p=t.props||l).dangerouslySetInnerHTML,h=m.dangerouslySetInnerHTML,!c){if(null!=s)for(p={},f=0;f<e.attributes.length;f++)p[e.attributes[f].name]=e.attributes[f].value;(h||d)&&(h&&(d&&h.__html==d.__html||h.__html===e.innerHTML)||(e.innerHTML=h&&h.__html||""))}(function(e,n,t,o,r){var l;for(l in t)"children"===l||"key"===l||l in n||k(e,l,null,t[l],o);for(l in n)r&&"function"!=typeof n[l]||"children"===l||"key"===l||"value"===l||"checked"===l||t[l]===n[l]||k(e,l,n[l],t[l],o)})(e,m,p,r,c),h?n.__k=[]:(_=n.props.children,g(e,Array.isArray(_)?_:[_],n,t,o,"foreignObject"!==n.type&&r,s,a,l,c)),c||("value"in m&&void 0!==(_=m.value)&&(_!==e.value||"progress"===n.type&&!_)&&k(e,"value",_,p.value,!1),"checked"in m&&void 0!==(_=m.checked)&&_!==e.checked&&k(e,"checked",_,p.checked,!1))}return e}function M(n,t,o){try{"function"==typeof n?n(t):n.current=t}catch(n){e.__e(n,o)}}function T(n,t,o){var r,l,i;if(e.unmount&&e.unmount(n),(r=n.ref)&&(r.current&&r.current!==n.__e||M(r,null,t)),o||"function"==typeof n.type||(o=null!=(l=n.__e)),n.__e=n.__d=void 0,null!=(r=n.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(n){e.__e(n,t)}r.base=r.__P=null}if(r=n.__k)for(i=0;i<r.length;i++)r[i]&&T(r[i],t,o);null!=l&&c(l)}function A(e,n,t){return this.constructor(e,t)}e={__e:function(e,n){for(var t,o,r,l=n.__h;n=n.__;)if((t=n.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(e)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(e),r=t.__d),r)return n.__h=l,t.__E=t}catch(n){e=n}throw e},__v:0},h.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},t),this.props)),e&&a(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),m(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},h.prototype.render=d,n=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,v.__r=0,r=l;var P=function(e,n,t,o){var r;n[0]=0;for(var l=1;l<n.length;l++){var i=n[l++],s=n[l]?(n[0]|=i?1:2,t[n[l++]]):n[++l];3===i?o[0]=s:4===i?o[1]=Object.assign(o[1]||{},s):5===i?(o[1]=o[1]||{})[n[++l]]=s:6===i?o[1][n[++l]]+=s+"":i?(r=e.apply(s,P(e,s,t,["",null])),o.push(r),s[0]?n[0]|=2:(n[l-2]=0,n[l]=r)):o.push(s)}return o},H=new Map;var N=function(e){var n=H.get(this);return n||(n=new Map,H.set(this,n)),(n=P(this,n.get(e)||(n.set(e,n=function(e){for(var n,t,o=1,r="",l="",i=[0],s=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?i.push(0,e,r):3===o&&(e||r)?(i.push(3,e,r),o=2):2===o&&"..."===r&&e?i.push(4,e,0):2===o&&r&&!e?i.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(i.push(o,0,r,t),o=6),e&&(i.push(o,e,0,t),o=6)),r=""},a=0;a<e.length;a++){a&&(1===o&&s(),s(a));for(var c=0;c<e[a].length;c++)n=e[a][c],1===o?"<"===n?(s(),i=[i],o=3):r+=n:4===o?"--"===r&&">"===n?(o=1,r=""):r=n+r[0]:l?n===l?l="":r+=n:'"'===n||"'"===n?l=n:">"===n?(s(),o=1):o&&("="===n?(o=5,t=r,r=""):"/"===n&&(o<5||">"===e[a][c+1])?(s(),3===o&&(i=i[0]),o=i,(i=i[0]).push(2,0,o),o=0):" "===n||"\t"===n||"\n"===n||"\r"===n?(s(),o=2):r+=n),3===o&&"!--"===r&&(o=4,i=i[0])}return s(),i}(e)),n),arguments,[])).length>1?n:n[0]}.bind(_);function L(e){if(document.querySelector('link[rel=stylesheet][href="'+e+'"]'))return;const n=document.createElement("link");n.rel="stylesheet",n.href=e,document.head.appendChild(n)}null;const D="host_1vq48fc";null;const F="host_1q8y6om";function j(){return N`<div class=${F}>
      <a href="#maincontent">skip to main content</a>
    </div>`}null;const q="host_216t9o";function I(){return N`<div class=${q}>
      <h2>
        <a href="/">
          Zhenyang Hua
        </a>
      </h2>
    </div>`}null;const U="host_m2uvri";function z(){return N`<div class=${U}>
      <nav>
        <h2 class="hidden">Main Navigation</h2>
        <ul>
          <li>
            <a target="_blank" href="https://www.leafyjava.com">LeafyJava</a>
          </li>
        </ul>
      </nav>
    </div>`}null;const W="host_1c336ft";function R(){return N`<div class=${W}>
      <span>
        This is a space that holds a collection of my personal work and ideas
      </span>
    </div>`}function O(e){return Math.floor(Math.random()*Math.floor(e))}function G(){return[O(256),O(256),O(256)]}function B(e){const[n,t,o]=e.map(e=>e/255).map(e=>e<.03928?e/12.92:Math.pow((e+.055)/1.055,2.4));return.2126*n+.7152*t+.0722*o}function J(e,n){return(B(e)+.05)/(B(n)+.05)}function V(){const e=function(e,n=7){let t=G(),o=J(t,e);for(;o<n&&1/o<n;)t=G(),o=J(t,e);const[r,l,i]=t;return`rgb(${r}, ${l}, ${i})`}([1,54,64]);return N`<div class=${D} style=${{backgroundColor:e}}>
      <header>
        <${j}/>
        <${I}/>
        <${z}/>
        <${R}/>
      </header>
    </div>`}null;const Z="host_utq90y",K="snowbox_utq90y";var Q,X,Y,ee=0,ne=[],te=e.__b,oe=e.__r,re=e.diffed,le=e.__c,ie=e.unmount;function se(n,t){e.__h&&e.__h(X,n,ee||t),ee=0;var o=X.__H||(X.__H={__:[],__h:[]});return n>=o.__.length&&o.__.push({}),o.__[n]}function ae(e){return ee=1,function(e,n,t){var o=se(Q++,2);return o.t=e,o.__c||(o.__=[t?t(n):me(void 0,n),function(e){var n=o.t(o.__[0],e);o.__[0]!==n&&(o.__=[n,o.__[1]],o.__c.setState({}))}],o.__c=X),o.__}(me,e)}function ce(n,t){var o=se(Q++,3);!e.__s&&pe(o.__H,t)&&(o.__=n,o.__H=t,X.__H.__h.push(o))}function _e(e){return ee=5,function(e,n){var t=se(Q++,7);return pe(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}((function(){return{current:e}}),[])}function ue(){ne.forEach((function(t){if(t.__P)try{t.__H.__h.forEach(he),t.__H.__h.forEach(fe),t.__H.__h=[]}catch(n){t.__H.__h=[],e.__e(n,t.__v)}})),ne=[]}e.__b=function(e){X=null,te&&te(e)},e.__r=function(e){oe&&oe(e),Q=0;var n=(X=e.__c).__H;n&&(n.__h.forEach(he),n.__h.forEach(fe),n.__h=[])},e.diffed=function(n){re&&re(n);var t=n.__c;t&&t.__H&&t.__H.__h.length&&(1!==ne.push(t)&&Y===e.requestAnimationFrame||((Y=e.requestAnimationFrame)||function(e){var n,t=function(){clearTimeout(o),de&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,100);de&&(n=requestAnimationFrame(t))})(ue)),X=void 0},e.__c=function(n,t){t.some((function(n){try{n.__h.forEach(he),n.__h=n.__h.filter((function(e){return!e.__||fe(e)}))}catch(o){t.some((function(e){e.__h&&(e.__h=[])})),t=[],e.__e(o,n.__v)}})),le&&le(n,t)},e.unmount=function(n){ie&&ie(n);var t=n.__c;if(t&&t.__H)try{t.__H.__.forEach(he)}catch(n){e.__e(n,t.__v)}};var de="function"==typeof requestAnimationFrame;function he(e){var n=X;"function"==typeof e.__c&&e.__c(),X=n}function fe(e){var n=X;e.__c=e.__(),X=n}function pe(e,n){return!e||e.length!==n.length||n.some((function(n,t){return n!==e[t]}))}function me(e,n){return"function"==typeof n?n(e):n}function ve(){const e=_e(null),n=_e(null),t=_e(null),o=()=>{n.current&&n.current.stop()},r=()=>{n.current&&(n.current.start(),t.current&&clearTimeout(t.current),t.current=setTimeout(()=>{o(),t.current=null},3e4))};return ce(()=>{let t;if(e.current){import("./chunks/snow.esm.ef27fa79.js").then(({default:t})=>{n.current=new t(e.current)});t=new IntersectionObserver(e=>{for(const n of e)n.isIntersecting?r():o()},{root:null,rootMargin:"0px",threshold:.8}),t.observe(e.current)}return()=>{o(),t&&t.disconnect()}},[]),N`<section class=${Z}>
      <div class=${K} ref=${e}>
        <div>
          <h2>
            <a target="_blank" href="https://github.com/zhenyanghua/effects/tree/main/snow">
              Snow Effect Overlay
            </a>
          </h2>
          <p>
            Try the snow effect in your site with
            three lines of code
          </p>
          <div class="button-group">
            <button class="inverted" onClick=${r}>start the snow</button>
            <button class="inverted" onClick=${o}>stop the snow</button>
          </div>
        </div>
        <codeblock-dark>
          <style>${"\npre {\n  contain: content;\n  margin-left: -20px !important;\n  margin-right: -20px !important;\n  background-color: var(--deepBlue) !important;\n  font-size: 1.2rem !important;\n}\n\n@media (min-width: 462px) {\n  pre {\n    display: flex !important;\n    justify-content: center !important;\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }\n}"}</style>
          <pre>
            <code class="lang-js">${"\n// Create a snow scene instance and\n// mount it to the container element\nconst snow = new Snow(containerElement);\n// To start\nsnow.start();\n// To stop\nsnow.stop();\n"}</code>
          </pre>
        </codeblock-dark>
      </div>
    </section>`}null;const ge={host:"host_1ey0ie1",control:"control_1ey0ie1","radio-group":"radio-group_1ey0ie1"};function ye(){const[e,n]=ae("left"),[t,o]=ae(16),[r,l]=ae("#73CE8F"),i=e=>{n(e.target.value)};return N`<section class=${ge.host} style=${{"--leaf-variance":e,"--leaf-size":t,"--leaf-color":r}}>
      <div>
        <h2>
          <a target="_blank" href="https://github.com/zhenyanghua/houdini/tree/master/leaf">
            CSS Houdini Leaf Effect
          </a>
        </h2>
        <p>
          Leaf effect is a decorative border that uses CSS Houdini Paint API to bring special effect through background
          image or any where an image could be used. Try it out without writing any JavaScript!
        </p>
        <div>
          <div class=${`${ge.control} ${ge.radioGroup}`}>
            <label htmlFor="controls"><code class="lang-css">--leaf-variance</code></label>
            <div>
              <div class="radio">
                <input type="radio" id="left" name="variance" value="left" checked=${"left"===e} onChange=${i}/>
                <label htmlFor="left">left</label>
              </div>
              <div class="radio">
                <input type="radio" id="around" name="variance" value="around" checked=${"around"===e} onChange=${i}/>
                <label htmlFor="around">around</label>
              </div>
            </div>
          </div>
          <div class=${ge.control}>
            <label htmlFor="size"><code class="lang-css">--leaf-size</code></label>
            <input type="range" min="10" max="32" id="size" name="size" value=${t} onChange=${e=>o(e.target.value)}/>
          </div>
          <div class=${ge.control}>
            <label htmlFor="color"><code class="lang-css">--leaf-color</code></label>
            <input type="color" id="color" name="color" value=${r} onInput=${e=>l(e.target.value)}/>
          </div>
        </div>
      </div>
      <codeblock-light>
        <style>${s=t,`\npre {\n  margin-left: -${5*s}px !important;\n  margin-right: -${5*s}px !important;\n}\n@media (min-width: 768px) {\n  pre {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }  \n}\n`}</style>
        <pre>
          <code class="lang-html">${'\n\x3c!-- html --\x3e\n<script src="https://unpkg.com/houdini-leaf"><\/script>'}</code>
          <code class="lang-css">${`\n/* CSS */\n.element {\n  --leaf-variance: ${e};\n  --leaf-size: ${t};\n  --leaf-color: ${r};\n  background-image: paint(leaf);\n}`}</code>
        </pre>
      </codeblock-light>
    </section>`;var s}null;const be="host_12vkevj",ke="mapsection_12vkevj",we="map_12vkevj",$e="instruction_12vkevj",Se="codeblock_12vkevj";function xe(e,n=!0){return new Promise((t,o)=>{const r=document.createElement("script");r.async=n,r.src=e,r.onload=t,r.onerror=o,document.head.appendChild(r)})}const Ce="AIzaSyBTdH3AFSWLD3SrgbNqTGoRsg3U6W0qAAg",Ee={lat:41.7,lng:-71.47},Me=[{lat:41.69547509615208,lng:-71.36993408203125},{lat:41.434490308949215,lng:-71.3671875},{lat:41.50857729743936,lng:-71.20513916015625},{lat:41.66923209813446,lng:-71.18435546874998},{lat:41.80245339578072,lng:-71.34365722656248},{lat:41.910875425626266,lng:-71.39034912109373},{lat:42.01299182987659,lng:-71.38760253906248},{lat:42.01299182987659,lng:-71.80508300781248},{lat:41.69957665997156,lng:-71.795654296875},{lat:41.3566211272796,lng:-71.82156249999998},{lat:41.37723402378496,lng:-71.49471923828123},{lat:41.6154423246811,lng:-71.48529052734375},{lat:41.69547509615208,lng:-71.36993408203125}];function Te(){const e=_e(null),n=_e(null);return ce(()=>{let t,o;const r=async()=>{Array.from(document.head.querySelectorAll("script")).some(e=>e.src.includes(Ce))||(await xe(`https://maps.googleapis.com/maps/api/js?key=${Ce}&libraries=geometry`),await xe("https://unpkg.com/measuretool-googlemaps-v3")),o||(o=new window.google.maps.Map(e.current,{center:Ee,zoom:9,clickableIcons:!1,disableDefaultUI:!0,disableDoubleClickZoom:!0,gestureHandling:"none",draggable:!1}),n.current=new window.MeasureTool(o,{contextMenu:!1,unit:"IMPERIAL"}),n.current.start(Me),setTimeout(()=>{let n=Array.from(e.current.querySelectorAll("a"));n=n.concat(Array.from(e.current.querySelectorAll('[tabindex="0"]'))),n.forEach(e=>e.setAttribute("tabindex","-1"))},2e3))};if(e.current){t=new IntersectionObserver(e=>{for(const n of e)n.isIntersecting&&r()},{root:null,rootMargin:"0px",threshold:.25}),t.observe(e.current)}return()=>{t&&t.disconnect(),n.current&&n.current.end()}},[]),N`<section class=${be}>
      <div class=${ke} tab-index="-1">
        <div class=${we} ref=${e}/>
      </div>
      <div class=${$e}>
        <h2>
          <a target="_blank" href="https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3">
            Measurement Tool for Google Maps JS API
          </a>
        </h2>
        <p>
          A handy measurement widget for Google Maps API v3.
          The functionalities are implemented as close as to what current Google Maps offers.
        </p>
        <div>
          <button onClick=${()=>{n.current&&n.current.start([Ee])}}>start</button>
          <button onClick=${()=>{n.current&&n.current.end()}}>stop</button>
        </div>
        <codeblock-light class=${Se}>
          <style>${"\npre {\n  margin-left: -20px !important;\n  margin-right: -20px !important;\n}\n@media (min-width: 768px) {\n  pre {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }  \n}\n"}</style>
          <pre>
            <code class="lang-html">${'\x3c!-- html --\x3e\n<script src="https://unpkg.com/measuretool-googlemaps-v3"><\/script>\n'}</code>
            <code class="lang-js">${"\n// Pass in the google maps instance to create the measure tool\nconst measureTool = new MeasureTool(map);"}</code>
          </pre>
        </codeblock-light>
      </div>
    </section>`}function Ae(){return N`<div id="contentcontainer" class="shadow">
      <${V}/>
      <main id="maincontent">
        <${Te}/>
        <${ve}/>
        <${ye}/>
      </main>
    </div>`}if(window.Prism=window.Prism||{},Prism.manual=!0,xe("/prism.js").then((function(){["light","dark"].forEach(e=>{const n=document.createElement("template");n.innerHTML=`\n    <link rel="stylesheet" href="/prism-${e}.css" />\n    ${"dark"===e?'<style>\n      :not(pre) > code[class*="language-"], pre[class*="language-"] {\n        background: var(--deepBlue);\n      }\n    </style>':""}\n    <div class="codeblock"></div>\n    <slot style="display: none"></slot>\n  `,customElements.define("codeblock-"+e,class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(n.content.cloneNode(!0))}highlight(e){const n=this.shadowRoot.querySelector(".codeblock");n.innerHTML="";for(const t of e.assignedNodes())n.appendChild(t.cloneNode(!0));for(const t of n.childNodes)"PRE"===t.nodeName&&Prism.highlightAllUnder(t)}connectedCallback(){const e=this.shadowRoot.querySelector("slot");e.addEventListener("slotchange",()=>{this.highlight(e),this.obs&&this.obs.disconnect(),this.obs=new MutationObserver(n=>{for(const t of n)"characterData"===t.type&&this.highlight(e)});for(const n of e.assignedNodes())["CODE","PRE"].includes(n.nodeName.toUpperCase())&&this.obs.observe(n,{subtree:!0,characterData:!0})})}disconnectedCallback(){this.obs&&this.obs.disconnect()}})})})),"undefined"!=typeof window){async function Pe(){await import("./chunks/houdini-leaf.f751fbe9.js"),function(n,t,o){var s,a,c;e.__&&e.__(n,t),a=(s=o===r)?null:o&&o.__k||t.__k,n=_(d,null,[n]),c=[],x(t,(s?t:o||t).__k=n,a||l,l,void 0!==t.ownerSVGElement,o&&!s?[o]:a?null:t.childNodes.length?i.slice.call(t.childNodes):null,c,o||l,s),C(c,n)}(N`<${Ae}/>`,document.body)}self.CSS&&self.CSS.paintWorklet?Pe():import("./chunks/css-paint-polyfill.12d7a277.js").then(Pe)}