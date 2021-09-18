import{l as e,d as t,v as r,B as n}from"../index.a1f50232.js";var o=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i,a=/[&<>"]/;function i(e){var t=String(e);return a.test(t)?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):t}var l=function(e,t){return String(e).replace(/(\n+)/g,"$1"+(t||"\t"))},s=function(e,t,r){return String(e).length>(t||40)||!r&&-1!==String(e).indexOf("\n")||-1!==String(e).indexOf("<")},f={};function c(e){var t="";for(var r in e){var n=e[r];null!=n&&""!==n&&(t&&(t+=" "),t+="-"==r[0]?r:f[r]||(f[r]=r.replace(/([A-Z])/g,"-$1").toLowerCase()),t+=": ",t+=n,"number"==typeof n&&!1===o.test(r)&&(t+="px"),t+=";")}return t||void 0}function u(e,t){for(var r in t)e[r]=t[r];return e}function p(e,t){return Array.isArray(t)?t.reduce(p,e):null!=t&&!1!==t&&e.push(t),e}var _={shallow:!0},v=[],d=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,h=/[\s\n\\/='"\0<>]/,g=function(){};m.render=m;var y=[];function m(t,r,n){r=r||{},n=n||{};var o=e.__s;e.__s=!0;var a=x(t,r,n);return e.__c&&e.__c(t,y),y.length=0,e.__s=o,a}function x(r,n,o,a,f,_){if(null==r||"boolean"==typeof r)return"";if("object"!=typeof r)return i(r);var y=o.pretty,m=y&&"string"==typeof y?y:"\t";if(Array.isArray(r)){for(var b="",w=0;w<r.length;w++)y&&w>0&&(b+="\n"),b+=x(r[w],n,o,a,f,_);return b}var S,k=r.type,O=r.props,C=!1;if("function"==typeof k){if(C=!0,!o.shallow||!a&&!1!==o.renderRootComponent){if(k===t){var A=[];return p(A,r.props.children),x(A,n,o,!1!==o.shallowHighOrder,f,_)}var j,H=r.__c={__v:r,context:n,props:r.props,setState:g,forceUpdate:g,__h:[]};if(e.__b&&e.__b(r),e.__r&&e.__r(r),k.prototype&&"function"==typeof k.prototype.render){var F=k.contextType,$=F&&n[F.__c],L=null!=F?$?$.props.value:F.__:n;(H=r.__c=new k(O,L)).__v=r,H._dirty=H.__d=!0,H.props=O,null==H.state&&(H.state={}),null==H._nextState&&null==H.__s&&(H._nextState=H.__s=H.state),H.context=L,k.getDerivedStateFromProps?H.state=u(u({},H.state),k.getDerivedStateFromProps(H.props,H.state)):H.componentWillMount&&(H.componentWillMount(),H.state=H._nextState!==H.state?H._nextState:H.__s!==H.state?H.__s:H.state),j=H.render(H.props,H.state,H.context)}else{var M=k.contextType,T=M&&n[M.__c];j=k.call(r.__c,O,null!=M?T?T.props.value:M.__:n)}return H.getChildContext&&(n=u(u({},n),H.getChildContext())),e.diffed&&e.diffed(r),x(j,n,o,!1!==o.shallowHighOrder,f,_)}k=(S=k).displayName||S!==Function&&S.name||function(e){var t=(Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!t){for(var r=-1,n=v.length;n--;)if(v[n]===e){r=n;break}r<0&&(r=v.push(e)-1),t="UnnamedComponent"+r}return t}(S)}var D,E,N="<"+k;if(O){var P=Object.keys(O);o&&!0===o.sortAttributes&&P.sort();for(var R=0;R<P.length;R++){var U=P[R],W=O[U];if("children"!==U){if(!h.test(U)&&(o&&o.allAttributes||"key"!==U&&"ref"!==U&&"__self"!==U&&"__source"!==U&&"defaultValue"!==U)){if("className"===U){if(O.class)continue;U="class"}else f&&U.match(/^xlink:?./)&&(U=U.toLowerCase().replace(/^xlink:?/,"xlink:"));if("htmlFor"===U){if(O.for)continue;U="for"}"style"===U&&W&&"object"==typeof W&&(W=c(W)),"a"===U[0]&&"r"===U[1]&&"boolean"==typeof W&&(W=String(W));var q=o.attributeHook&&o.attributeHook(U,W,n,o,C);if(q||""===q)N+=q;else if("dangerouslySetInnerHTML"===U)E=W&&W.__html;else if("textarea"===k&&"value"===U)D=W;else if((W||0===W||""===W)&&"function"!=typeof W){if(!(!0!==W&&""!==W||(W=U,o&&o.xml))){N+=" "+U;continue}if("value"===U){if("select"===k){_=W;continue}"option"===k&&_==W&&(N+=" selected")}N+=" "+U+'="'+i(W)+'"'}}}else D=W}}if(y){var z=N.replace(/\n\s*/," ");z===N||~z.indexOf("\n")?y&&~N.indexOf("\n")&&(N+="\n"):N=z}if(N+=">",h.test(k))throw new Error(k+" is not a valid HTML tag name in "+N);var I,V=d.test(k)||o.voidElements&&o.voidElements.test(k),Z=[];if(E)y&&s(E)&&(E="\n"+m+l(E,m)),N+=E;else if(null!=D&&p(I=[],D).length){for(var B=y&&~N.indexOf("\n"),G=!1,J=0;J<I.length;J++){var K=I[J];if(null!=K&&!1!==K){var Q=x(K,n,o,!0,"svg"===k||"foreignObject"!==k&&f,_);if(y&&!B&&s(Q)&&(B=!0),Q)if(y){var X=Q.length>0&&"<"!=Q[0];G&&X?Z[Z.length-1]+=Q:Z.push(Q),G=X}else Z.push(Q)}}if(y&&B)for(var Y=Z.length;Y--;)Z[Y]="\n"+m+l(Z[Y],m)}if(Z.length||E)N+=Z.join("");else if(o&&o.xml)return N.substring(0,N.length-1)+" />";return!V||I||E?(y&&~N.indexOf("\n")&&(N+="\n"),N+="</"+k+">"):N=N.replace(/>$/," />"),N}let b;m.shallowRender=function(e,t){return m(e,t,_)};const w=e.vnode;e.vnode=e=>{w&&w(e),b&&b(e)};export default async function(e,t){const o=(t=t||{}).maxDepth||10,a=t.props;let i=0;"function"==typeof e?e=r(e,a):a&&(e=n(e,a));const l=()=>{if(!(++i>o))try{return m(e)}catch(t){if(t&&t.then)return t.then(l);throw t}};let s=new Set;b=({type:e,props:t})=>{"a"!==e||!t||!t.href||t.target&&"_self"!==t.target||s.add(t.href)};try{let e=await l();return e+='<script type="isodata"><\/script>',{html:e,links:s}}finally{b=null}}