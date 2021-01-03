import{n as t,v as e,p as r,q as n}from"../index.17bd8bac.js";var a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function o(t){"string"!=typeof t&&(t=String(t));for(var e="",r=0;r<t.length;r++){var n=t[r];switch(n){case"<":e+="&lt;";break;case">":e+="&gt;";break;case'"':e+="&quot;";break;case"&":e+="&amp;";break;default:e+=n}}return e}var i=function(t,e){return String(t).replace(/(\n+)/g,"$1"+(e||"\t"))},l=function(t,e,r){return String(t).length>(e||40)||!r&&-1!==String(t).indexOf("\n")||-1!==String(t).indexOf("<")},s={};function f(t){var e="";for(var r in t){var n=t[r];null!=n&&(e&&(e+=" "),e+="-"==r[0]?r:s[r]||(s[r]=r.replace(/([A-Z])/g,"-$1").toLowerCase()),e+=": ",e+=n,"number"==typeof n&&!1===a.test(r)&&(e+="px"),e+=";")}return e||void 0}function c(t,e){for(var r in e)t[r]=e[r];return t}function u(t,e){return Array.isArray(e)?e.reduce(u,t):null!=e&&!1!==e&&t.push(e),t}var p={shallow:!0},_=[],h=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,d=function(){};g.render=g;var v=[];function g(n,a,s){var p=function n(a,s,p,v,g,m){if(null==a||"boolean"==typeof a)return"";Array.isArray(a)&&(a=e(r,null,a));var y=a.type,x=a.props,b=!1;s=s||{};var S,w=(p=p||{}).pretty,k=w&&"string"==typeof w?w:"\t";if("object"!=typeof a&&!y)return o(a);if("function"==typeof y){if(b=!0,!p.shallow||!v&&!1!==p.renderRootComponent){if(y===r){var O="",C=[];u(C,a.props.children);for(var A=0;A<C.length;A++)O+=(A>0&&w?"\n":"")+n(C[A],s,p,!1!==p.shallowHighOrder,g,m);return O}var j,H=a.__c={__v:a,context:s,props:a.props,setState:d,forceUpdate:d,__h:[]};if(t.__b&&t.__b(a),t.__r&&t.__r(a),y.prototype&&"function"==typeof y.prototype.render){var F=y.contextType,$=F&&s[F.__c],L=null!=F?$?$.props.value:F.__:s;(H=a.__c=new y(x,L)).__v=a,H._dirty=H.__d=!0,H.props=x,null==H.state&&(H.state={}),null==H._nextState&&null==H.__s&&(H._nextState=H.__s=H.state),H.context=L,y.getDerivedStateFromProps?H.state=c(c({},H.state),y.getDerivedStateFromProps(H.props,H.state)):H.componentWillMount&&(H.componentWillMount(),H.state=H._nextState!==H.state?H._nextState:H.__s!==H.state?H.__s:H.state),j=H.render(H.props,H.state,H.context)}else{var M=y.contextType,T=M&&s[M.__c],D=null!=M?T?T.props.value:M.__:s;j=y.call(a.__c,x,D)}return H.getChildContext&&(s=c(c({},s),H.getChildContext())),t.diffed&&t.diffed(a),n(j,s,p,!1!==p.shallowHighOrder,g,m)}y=(S=y).displayName||S!==Function&&S.name||function(t){var e=(Function.prototype.toString.call(t).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!e){for(var r=-1,n=_.length;n--;)if(_[n]===t){r=n;break}r<0&&(r=_.push(t)-1),e="UnnamedComponent"+r}return e}(S)}var E,N,P="";if(x){var R=Object.keys(x);p&&!0===p.sortAttributes&&R.sort();for(var U=0;U<R.length;U++){var W=R[U],q=x[W];if("children"!==W){if(!W.match(/[\s\n\\/='"\0<>]/)&&(p&&p.allAttributes||"key"!==W&&"ref"!==W&&"__self"!==W&&"__source"!==W&&"defaultValue"!==W)){if("className"===W){if(x.class)continue;W="class"}else g&&W.match(/^xlink:?./)&&(W=W.toLowerCase().replace(/^xlink:?/,"xlink:"));if("htmlFor"===W){if(x.for)continue;W="for"}"style"===W&&q&&"object"==typeof q&&(q=f(q)),"a"===W[0]&&"r"===W[1]&&"boolean"==typeof q&&(q=String(q));var z=p.attributeHook&&p.attributeHook(W,q,s,p,b);if(z||""===z)P+=z;else if("dangerouslySetInnerHTML"===W)N=q&&q.__html;else if("textarea"===y&&"value"===W)E=q;else if((q||0===q||""===q)&&"function"!=typeof q){if(!(!0!==q&&""!==q||(q=W,p&&p.xml))){P+=" "+W;continue}if("value"===W){if("select"===y){m=q;continue}"option"===y&&m==q&&(P+=" selected")}P+=" "+W+'="'+o(q)+'"'}}}else E=q}}if(w){var I=P.replace(/^\n\s*/," ");I===P||~I.indexOf("\n")?w&&~P.indexOf("\n")&&(P+="\n"):P=I}if(P="<"+y+P+">",String(y).match(/[\s\n\\/='"\0<>]/))throw new Error(y+" is not a valid HTML tag name in "+P);var V,Z=String(y).match(h)||p.voidElements&&String(y).match(p.voidElements),B=[];if(N)w&&l(N)&&(N="\n"+k+i(N,k)),P+=N;else if(null!=E&&u(V=[],E).length){for(var G=w&&~P.indexOf("\n"),J=!1,K=0;K<V.length;K++){var Q=V[K];if(null!=Q&&!1!==Q){var X=n(Q,s,p,!0,"svg"===y||"foreignObject"!==y&&g,m);if(w&&!G&&l(X)&&(G=!0),X)if(w){var Y=X.length>0&&"<"!=X[0];J&&Y?B[B.length-1]+=X:B.push(X),J=Y}else B.push(X)}}if(w&&G)for(var tt=B.length;tt--;)B[tt]="\n"+k+i(B[tt],k)}if(B.length||N)P+=B.join("");else if(p&&p.xml)return P.substring(0,P.length-1)+" />";return!Z||V||N?(w&&~P.indexOf("\n")&&(P+="\n"),P+="</"+y+">"):P=P.replace(/>$/," />"),P}(n,a,s);return t.__c&&t.__c(n,v),p}let m;g.shallowRender=function(t,e){return g(t,e,p)};const y=t.vnode;t.vnode=t=>{y&&y(t),m&&m(t)};export default async function(t,r){const a=(r=r||{}).maxDepth||10,o=r.props;let i=0;"function"==typeof t?t=e(t,o):o&&(t=n(t,o));const l=()=>{if(!(++i>a))try{return g(t)}catch(e){if(e&&e.then)return e.then(l);throw e}};let s=new Set;m=({type:t,props:e})=>{"a"!==t||!e||!e.href||e.target&&"_self"!==e.target||s.add(e.href)};try{let t=await l();return t+='<script type="isodata"><\/script>',{html:t,links:s}}finally{m=null}}