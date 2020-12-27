var e,n,t,o,r,l={},_=[],i=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(e,n){for(var t in n)e[t]=n[t];return e}function c(e){var n=e.parentNode;n&&n.removeChild(e)}function a(e,n,t){var o,r,l,_=arguments,i={};for(l in n)"key"==l?o=n[l]:"ref"==l?r=n[l]:i[l]=n[l];if(arguments.length>3)for(t=[t],l=3;l<arguments.length;l++)t.push(_[l]);if(null!=t&&(i.children=t),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===i[l]&&(i[l]=e.defaultProps[l]);return u(e,i,o,r,null)}function u(n,t,o,r,l){var _={type:n,props:t,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++e.__v:l};return null!=e.vnode&&e.vnode(_),_}function d(e){return e.children}function f(e,n){this.props=e,this.context=n}function h(e,n){if(null==n)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?h(e):null}function p(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return p(e)}}function v(r){(!r.__d&&(r.__d=!0)&&n.push(r)&&!m.__r++||o!==e.debounceRendering)&&((o=e.debounceRendering)||t)(m)}function m(){for(var e;m.__r=n.length;)e=n.sort((function(e,n){return e.__v.__b-n.__v.__b})),n=[],e.some((function(e){var n,t,o,r,l,_,i;e.__d&&(_=(l=(n=e).__v).__e,(i=n.__P)&&(t=[],(o=s({},l)).__v=l.__v+1,r=C(i,l,o,n.__n,void 0!==i.ownerSVGElement,null!=l.__h?[_]:null,t,null==_?h(l):_,l.__h),E(t,l),r!=_&&p(l)))}))}function y(e,n,t,o,r,i,s,a,f,p){var v,m,y,b,k,w,$,S=o&&o.__k||_,E=S.length;for(f==l&&(f=null!=s?s[0]:E?h(o,0):null),t.__k=[],v=0;v<n.length;v++)if(null!=(b=t.__k[v]=null==(b=n[v])||"boolean"==typeof b?null:"string"==typeof b||"number"==typeof b?u(null,b,null,null,b):Array.isArray(b)?u(d,{children:b},null,null,null):null!=b.__e||null!=b.__c?u(b.type,b.props,b.key,null,b.__v):b)){if(b.__=t,b.__b=t.__b+1,null===(y=S[v])||y&&b.key==y.key&&b.type===y.type)S[v]=void 0;else for(m=0;m<E;m++){if((y=S[m])&&b.key==y.key&&b.type===y.type){S[m]=void 0;break}y=null}k=C(e,b,y=y||l,r,i,s,a,f,p),(m=b.ref)&&y.ref!=m&&($||($=[]),y.ref&&$.push(y.ref,null,b),$.push(m,b.__c||k,b)),null!=k?(null==w&&(w=k),f=g(e,b,y,S,s,k,f),p||"option"!=t.type?"function"==typeof t.type&&(t.__d=f):e.value=""):f&&y.__e==f&&f.parentNode!=e&&(f=h(y))}if(t.__e=w,null!=s&&"function"!=typeof t.type)for(v=s.length;v--;)null!=s[v]&&c(s[v]);for(v=E;v--;)null!=S[v]&&T(S[v],S[v]);if($)for(v=0;v<$.length;v++)x($[v],$[++v],$[++v])}function g(e,n,t,o,r,l,_){var i,s,c;if(void 0!==n.__d)i=n.__d,n.__d=void 0;else if(r==t||l!=_||null==l.parentNode)e:if(null==_||_.parentNode!==e)e.appendChild(l),i=null;else{for(s=_,c=0;(s=s.nextSibling)&&c<o.length;c+=2)if(s==l)break e;e.insertBefore(l,_),i=_}return void 0!==i?i:l.nextSibling}function b(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||i.test(n)?t:t+"px"}function k(e,n,t,o,r){var l,_,i;if(r&&"className"==n&&(n="class"),"style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||b(e.style,n,"");if(t)for(n in t)o&&t[n]===o[n]||b(e.style,n,t[n])}else"o"===n[0]&&"n"===n[1]?(l=n!==(n=n.replace(/Capture$/,"")),(_=n.toLowerCase())in e&&(n=_),n=n.slice(2),e.l||(e.l={}),e.l[n+l]=t,i=l?$:w,t?o||e.addEventListener(n,i,l):e.removeEventListener(n,i,l)):"list"!==n&&"tagName"!==n&&"form"!==n&&"type"!==n&&"size"!==n&&"download"!==n&&"href"!==n&&!r&&n in e?e[n]=null==t?"":t:"function"!=typeof t&&"dangerouslySetInnerHTML"!==n&&(n!==(n=n.replace(/xlink:?/,""))?null==t||!1===t?e.removeAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase(),t):null==t||!1===t&&!/^ar/.test(n)?e.removeAttribute(n):e.setAttribute(n,t))}function w(n){this.l[n.type+!1](e.event?e.event(n):n)}function $(n){this.l[n.type+!0](e.event?e.event(n):n)}function S(e,n,t){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,r.__e&&("function"==typeof r.type&&r.__k.length>1&&S(r,n,t),n=g(t,r,r,e.__k,null,r.__e,n),"function"==typeof e.type&&(e.__d=n)))}function C(n,t,o,r,l,_,i,c,a){var u,h,p,v,m,g,b,k,w,$,C,E=t.type;if(void 0!==t.constructor)return null;null!=o.__h&&(a=o.__h,c=t.__e=o.__e,t.__h=null,_=[c]),(u=e.__b)&&u(t);try{e:if("function"==typeof E){if(k=t.props,w=(u=E.contextType)&&r[u.__c],$=u?w?w.props.value:u.__:r,o.__c?b=(h=t.__c=o.__c).__=h.__E:("prototype"in E&&E.prototype.render?t.__c=h=new E(k,$):(t.__c=h=new f(k,$),h.constructor=E,h.render=P),w&&w.sub(h),h.props=k,h.state||(h.state={}),h.context=$,h.__n=r,p=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=E.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s({},h.__s)),s(h.__s,E.getDerivedStateFromProps(k,h.__s))),v=h.props,m=h.state,p)null==E.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==E.getDerivedStateFromProps&&k!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(k,$),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(k,h.__s,$)||t.__v===o.__v){h.props=k,h.state=h.__s,t.__v!==o.__v&&(h.__d=!1),h.__v=t,t.__e=o.__e,t.__k=o.__k,h.__h.length&&i.push(h),S(t,c,n);break e}null!=h.componentWillUpdate&&h.componentWillUpdate(k,h.__s,$),null!=h.componentDidUpdate&&h.__h.push((function(){h.componentDidUpdate(v,m,g)}))}h.context=$,h.props=k,h.state=h.__s,(u=e.__r)&&u(t),h.__d=!1,h.__v=t,h.__P=n,u=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(r=s(s({},r),h.getChildContext())),p||null==h.getSnapshotBeforeUpdate||(g=h.getSnapshotBeforeUpdate(v,m)),C=null!=u&&u.type==d&&null==u.key?u.props.children:u,y(n,Array.isArray(C)?C:[C],t,o,r,l,_,i,c,a),h.base=t.__e,t.__h=null,h.__h.length&&i.push(h),b&&(h.__E=h.__=null),h.__e=!1}else null==_&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):t.__e=H(o.__e,t,o,r,l,_,i,a);(u=e.diffed)&&u(t)}catch(n){t.__v=null,(a||null!=_)&&(t.__e=c,t.__h=!!a,_[_.indexOf(c)]=null),e.__e(n,t,o)}return t.__e}function E(n,t){e.__c&&e.__c(t,n),n.some((function(t){try{n=t.__h,t.__h=[],n.some((function(e){e.call(t)}))}catch(n){e.__e(n,t.__v)}}))}function H(e,n,t,o,r,i,s,c){var a,u,d,f,h,p=t.props,v=n.props;if(r="svg"===n.type||r,null!=i)for(a=0;a<i.length;a++)if(null!=(u=i[a])&&((null===n.type?3===u.nodeType:u.localName===n.type)||e==u)){e=u,i[a]=null;break}if(null==e){if(null===n.type)return document.createTextNode(v);e=r?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type,v.is&&{is:v.is}),i=null,c=!1}if(null===n.type)p===v||c&&e.data===v||(e.data=v);else{if(null!=i&&(i=_.slice.call(e.childNodes)),d=(p=t.props||l).dangerouslySetInnerHTML,f=v.dangerouslySetInnerHTML,!c){if(null!=i)for(p={},h=0;h<e.attributes.length;h++)p[e.attributes[h].name]=e.attributes[h].value;(f||d)&&(f&&(d&&f.__html==d.__html||f.__html===e.innerHTML)||(e.innerHTML=f&&f.__html||""))}(function(e,n,t,o,r){var l;for(l in t)"children"===l||"key"===l||l in n||k(e,l,null,t[l],o);for(l in n)r&&"function"!=typeof n[l]||"children"===l||"key"===l||"value"===l||"checked"===l||t[l]===n[l]||k(e,l,n[l],t[l],o)})(e,v,p,r,c),f?n.__k=[]:(a=n.props.children,y(e,Array.isArray(a)?a:[a],n,t,o,"foreignObject"!==n.type&&r,i,s,l,c)),c||("value"in v&&void 0!==(a=v.value)&&(a!==e.value||"progress"===n.type&&!a)&&k(e,"value",a,p.value,!1),"checked"in v&&void 0!==(a=v.checked)&&a!==e.checked&&k(e,"checked",a,p.checked,!1))}return e}function x(n,t,o){try{"function"==typeof n?n(t):n.current=t}catch(n){e.__e(n,o)}}function T(n,t,o){var r,l,_;if(e.unmount&&e.unmount(n),(r=n.ref)&&(r.current&&r.current!==n.__e||x(r,null,t)),o||"function"==typeof n.type||(o=null!=(l=n.__e)),n.__e=n.__d=void 0,null!=(r=n.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(n){e.__e(n,t)}r.base=r.__P=null}if(r=n.__k)for(_=0;_<r.length;_++)r[_]&&T(r[_],t,o);null!=l&&c(l)}function P(e,n,t){return this.constructor(e,t)}e={__e:function(e,n){for(var t,o,r,l=n.__h;n=n.__;)if((t=n.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(e)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(e),r=t.__d),r)return n.__h=l,t.__E=t}catch(n){e=n}throw e},__v:0},f.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof e&&(e=e(s({},t),this.props)),e&&s(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),v(this))},f.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},f.prototype.render=d,n=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,m.__r=0,r=l;var N=function(e,n,t,o){var r;n[0]=0;for(var l=1;l<n.length;l++){var _=n[l++],i=n[l]?(n[0]|=_?1:2,t[n[l++]]):n[++l];3===_?o[0]=i:4===_?o[1]=Object.assign(o[1]||{},i):5===_?(o[1]=o[1]||{})[n[++l]]=i:6===_?o[1][n[++l]]+=i+"":_?(r=e.apply(i,N(e,i,t,["",null])),o.push(r),i[0]?n[0]|=2:(n[l-2]=0,n[l]=r)):o.push(i)}return o},M=new Map;var A=function(e){var n=M.get(this);return n||(n=new Map,M.set(this,n)),(n=N(this,n.get(e)||(n.set(e,n=function(e){for(var n,t,o=1,r="",l="",_=[0],i=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?_.push(0,e,r):3===o&&(e||r)?(_.push(3,e,r),o=2):2===o&&"..."===r&&e?_.push(4,e,0):2===o&&r&&!e?_.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(_.push(o,0,r,t),o=6),e&&(_.push(o,e,0,t),o=6)),r=""},s=0;s<e.length;s++){s&&(1===o&&i(),i(s));for(var c=0;c<e[s].length;c++)n=e[s][c],1===o?"<"===n?(i(),_=[_],o=3):r+=n:4===o?"--"===r&&">"===n?(o=1,r=""):r=n+r[0]:l?n===l?l="":r+=n:'"'===n||"'"===n?l=n:">"===n?(i(),o=1):o&&("="===n?(o=5,t=r,r=""):"/"===n&&(o<5||">"===e[s][c+1])?(i(),3===o&&(_=_[0]),o=_,(_=_[0]).push(2,0,o),o=0):" "===n||"\t"===n||"\n"===n||"\r"===n?(i(),o=2):r+=n),3===o&&"!--"===r&&(o=4,_=_[0])}return i(),_}(e)),n),arguments,[])).length>1?n:n[0]}.bind(a);function F(e){if(document.querySelector('link[rel=stylesheet][href="'+e+'"]'))return;const n=document.createElement("link");n.rel="stylesheet",n.href=e,document.head.appendChild(n)}null;const L="host_1vq48fc";null;const D="host_1q8y6om";function U(){return A`<div class=${D}>
      <a href="#maincontent">skip to main content</a>
    </div>`}null;const q="host_216t9o";function z(){return A`<div class=${q}>
      <h2>
        <a href="/">
          Zhenyang Hua
        </a>
      </h2>
    </div>`}null;const j="host_m2uvri";function W(){return A`<div class=${j}>
      <nav>
        <h2 class="hidden">Main Navigation</h2>
        <ul>
          <li>
            <a target="_blank" href="https://www.leafyjava.com">LeafyJava</a>
          </li>
        </ul>
      </nav>
    </div>`}null;const R="host_1c336ft";function O(){return A`<div class=${R}>
      <span>
        This is a space that holds a collection of my personal work and ideas
      </span>
    </div>`}function B(e){return Math.floor(Math.random()*Math.floor(e))}function I(){return[B(256),B(256),B(256)]}function G(e){const[n,t,o]=e.map(e=>e/255).map(e=>e<.03928?e/12.92:Math.pow((e+.055)/1.055,2.4));return.2126*n+.7152*t+.0722*o}function J(e,n){return(G(e)+.05)/(G(n)+.05)}function V(){const e=function(e,n=7){let t=I(),o=J(t,e);for(;o<n&&1/o<n;)t=I(),o=J(t,e);const[r,l,_]=t;return`rgb(${r}, ${l}, ${_})`}([1,54,64]);return A`<div class=${L} style=${{backgroundColor:e}}>
      <header>
        <${U}/>
        <${z}/>
        <${W}/>
        <${O}/>
      </header>
    </div>`}null;const Z="host_utq90y",K="snowbox_utq90y";var Q,X,Y,ee=0,ne=[],te=e.__b,oe=e.__r,re=e.diffed,le=e.__c,_e=e.unmount;function ie(n,t){e.__h&&e.__h(X,n,ee||t),ee=0;var o=X.__H||(X.__H={__:[],__h:[]});return n>=o.__.length&&o.__.push({}),o.__[n]}function se(e){return ee=1,function(e,n,t){var o=ie(Q++,2);return o.t=e,o.__c||(o.__=[t?t(n):pe(void 0,n),function(e){var n=o.t(o.__[0],e);o.__[0]!==n&&(o.__=[n,o.__[1]],o.__c.setState({}))}],o.__c=X),o.__}(pe,e)}function ce(e){return ee=5,function(e,n){var t=ie(Q++,7);return he(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}((function(){return{current:e}}),[])}function ae(){ne.forEach((function(t){if(t.__P)try{t.__H.__h.forEach(de),t.__H.__h.forEach(fe),t.__H.__h=[]}catch(n){t.__H.__h=[],e.__e(n,t.__v)}})),ne=[]}e.__b=function(e){X=null,te&&te(e)},e.__r=function(e){oe&&oe(e),Q=0;var n=(X=e.__c).__H;n&&(n.__h.forEach(de),n.__h.forEach(fe),n.__h=[])},e.diffed=function(n){re&&re(n);var t=n.__c;t&&t.__H&&t.__H.__h.length&&(1!==ne.push(t)&&Y===e.requestAnimationFrame||((Y=e.requestAnimationFrame)||function(e){var n,t=function(){clearTimeout(o),ue&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,100);ue&&(n=requestAnimationFrame(t))})(ae)),X=void 0},e.__c=function(n,t){t.some((function(n){try{n.__h.forEach(de),n.__h=n.__h.filter((function(e){return!e.__||fe(e)}))}catch(o){t.some((function(e){e.__h&&(e.__h=[])})),t=[],e.__e(o,n.__v)}})),le&&le(n,t)},e.unmount=function(n){_e&&_e(n);var t=n.__c;if(t&&t.__H)try{t.__H.__.forEach(de)}catch(n){e.__e(n,t.__v)}};var ue="function"==typeof requestAnimationFrame;function de(e){var n=X;"function"==typeof e.__c&&e.__c(),X=n}function fe(e){var n=X;e.__c=e.__(),X=n}function he(e,n){return!e||e.length!==n.length||n.some((function(n,t){return n!==e[t]}))}function pe(e,n){return"function"==typeof n?n(e):n}function ve(){const n=ce(null),t=ce(null),o=ce(null),r=()=>{t.current&&t.current.stop()};return function(n,t){var o=ie(Q++,3);!e.__s&&he(o.__H,t)&&(o.__=n,o.__H=t,X.__H.__h.push(o))}(()=>(n.current&&import("./chunks/snow.esm.c2220083.js").then(({default:e})=>{t.current=new e(n.current)}),()=>{r()}),[]),A`<div class=${Z}>
      <div class=${K} ref=${n}>
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
            <button class="inverted" onClick=${()=>{t.current&&(t.current.start(),o.current&&clearTimeout(o.current),o.current=setTimeout(()=>{r(),o.current=null},12e4))}}>start the snow</button>
            <button class="inverted" onClick=${r}>stop the snow</button>
          </div>
        </div>
        <codeblock-dark>
          <style>${"\npre {\n  contain: content;\n  margin: 0 !important;\n  padding: 0 !important;\n  background-color: var(--deepBlue) !important;\n  font-size: 1.2rem !important;\n}\n\n@media (min-width: 462px) {\n  pre {\n    display: flex !important;\n    justify-content: center !important;\n  }\n}"}</style>
          <pre>
            <code class="lang-js">${"\n// Create a snow scene instance and\n// mount it to the container element\nconst snow = new Snow(containerElement);\n// To start\nsnow.start();\n// To stop\nsnow.stop();\n"}</code>
          </pre>
        </codeblock-dark>
      </div>
    </div>`}null;const me={host:"host_1ey0ie1",control:"control_1ey0ie1","radio-group":"radio-group_1ey0ie1"};function ye(){const[e,n]=se("left"),[t,o]=se(12),[r,l]=se("#73CE8F"),_=e=>{n(e.target.value)};return A`<div class=${me.host} style=${{"--leaf-variance":e,"--leaf-size":t,"--leaf-color":r}}>
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
          <div class=${`${me.control} ${me.radioGroup}`}>
            <label htmlFor="controls"><code class="lang-css">--leaf-variance</code></label>
            <div>
              <div class="radio">
                <input type="radio" id="left" name="variance" value="left" checked=${"left"===e} onChange=${_}/>
                <label htmlFor="left">left</label>
              </div>
              <div class="radio">
                <input type="radio" id="around" name="variance" value="around" checked=${"around"===e} onChange=${_}/>
                <label htmlFor="around">around</label>
              </div>
            </div>
          </div>
          <div class=${me.control}>
            <label htmlFor="size"><code class="lang-css">--leaf-size</code></label>
            <input type="range" min="10" max="32" id="size" name="size" value=${t} onChange=${e=>o(e.target.value)}/>
          </div>
          <div class=${me.control}>
            <label htmlFor="color"><code class="lang-css">--leaf-color</code></label>
            <input type="color" id="color" name="color" value=${r} onInput=${e=>l(e.target.value)}/>
          </div>
        </div>
      </div>
      <codeblock-light>
        <pre>
          <code class="lang-html">${'\n\x3c!-- html --\x3e\n<script src="https://unpkg.com/houdini-leaf"><\/script>'}</code>
          <code class="lang-css">${`\n/* CSS */\n.element {\n  --leaf-variance: ${e};\n  --leaf-size: ${t};\n  --leaf-color: ${r};\n  background-image: paint(leaf);\n}`}</code>
        </pre>
      </codeblock-light>
    </div>`}function ge(){return A`<div id="contentcontainer" class="shadow">
      <${V}/>
      <main id="maincontent">
        <${ve}/>
        <${ye}/>
      </main>
    </div>`}if(["light","dark"].forEach(e=>{const n=document.createElement("template");n.innerHTML=`\n    <link rel="stylesheet" href="/prism-${e}.css" />\n    ${"dark"===e?'<style>\n      :not(pre) > code[class*="language-"], pre[class*="language-"] {\n        background: var(--deepBlue);\n      }\n    </style>':""}\n    <div class="codeblock"></div>\n    <slot style="display: none"></slot>\n  `,customElements.define("codeblock-"+e,class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(n.content.cloneNode(!0))}highlight(e){const n=this.shadowRoot.querySelector(".codeblock");n.innerHTML="";for(const t of e.assignedNodes())n.appendChild(t.cloneNode(!0));for(const t of n.childNodes)"PRE"===t.nodeName&&Prism.highlightAllUnder(t)}connectedCallback(){const e=this.shadowRoot.querySelector("slot");e.addEventListener("slotchange",()=>{this.highlight(e),this.obs&&this.obs.disconnect(),this.obs=new MutationObserver(n=>{for(const t of n)"characterData"===t.type&&this.highlight(e)});for(const n of e.assignedNodes())this.obs.observe(n,{subtree:!0,characterData:!0})})}disconnectedCallback(){this.obs&&this.obs.disconnect()}})}),"undefined"!=typeof window){async function be(){await function(e,n=!0){return new Promise((t,o)=>{const r=document.createElement("script");r.async=n,r.src=e,r.onload=t,r.onerror=o,document.head.appendChild(r)})}("prism.js"),await import("./chunks/houdini-leaf.f751fbe9.js"),function(n,t,o){var i,s,c;e.__&&e.__(n,t),s=(i=o===r)?null:o&&o.__k||t.__k,n=a(d,null,[n]),c=[],C(t,(i?t:o||t).__k=n,s||l,l,void 0!==t.ownerSVGElement,o&&!i?[o]:s?null:t.childNodes.length?_.slice.call(t.childNodes):null,c,o||l,i),E(c,n)}(A`<${ge}/>`,document.body)}self.CSS&&self.CSS.paintWorklet?be():import("./chunks/css-paint-polyfill.12d7a277.js").then(be)}