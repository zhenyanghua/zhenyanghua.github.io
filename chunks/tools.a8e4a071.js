import{s as e,a as t,b as n,m as a,y as o,i as r,u as l,c as s}from"../index.a27d4465.js";e("/assets/style.module.b5184acb.css");const i="host_12vkevj",c="mapsection_12vkevj",d="map_12vkevj",u="instruction_12vkevj",m="codeblock_12vkevj";null;const p="container_fv3rl4",g="background_fv3rl4",h="dashed_fv3rl4",v="loader_fv3rl4",f="loadingText_fv3rl4",b="button_fv3rl4";function $({onClick:e}){const o=t(null),[r,l]=n(!1);return a`<div ref=${o} class=${p}>
      <div role="region" aria-live="assertive" className="hidden" tabIndex="-1">
        <h2 tabIndex="-1">${r?"Loading measure tool demo":""}</h2>
      </div>
      <div class=${g}/>
      <div class=${h}>
        ${r?a`<div class=${v}>
            <div class="ripple" role="img" aria-label="loading measure tool demo"><div/><div/></div>
            <p class=${f}>Loading measure tool demo</p></div>`:a`<button class=${b} onClick=${()=>{l(!0),e(),o.current&&o.current.parentElement.parentElement.focus()}}>Click here to load measure tool demo</button>`}
      </div>
    </div>`}const y="AIzaSyBTdH3AFSWLD3SrgbNqTGoRsg3U6W0qAAg",k={lat:41.7,lng:-71.47},w=[{lat:41.69547509615208,lng:-71.36993408203125},{lat:41.434490308949215,lng:-71.3671875},{lat:41.50857729743936,lng:-71.20513916015625},{lat:41.66923209813446,lng:-71.18435546874998},{lat:41.80245339578072,lng:-71.34365722656248},{lat:41.910875425626266,lng:-71.39034912109373},{lat:42.01299182987659,lng:-71.38760253906248},{lat:42.01299182987659,lng:-71.80508300781248},{lat:41.69957665997156,lng:-71.795654296875},{lat:41.3566211272796,lng:-71.82156249999998},{lat:41.37723402378496,lng:-71.49471923828123},{lat:41.6154423246811,lng:-71.48529052734375},{lat:41.69547509615208,lng:-71.36993408203125}];function x(){const e=t(null),l=t(null),[s,p]=n(!1),[g,h]=n(!1),v=async()=>{s||(await(async()=>{Array.from(document.head.querySelectorAll("script")).some(e=>e.src.includes(y))||(await r(`https://maps.googleapis.com/maps/api/js?key=${y}&libraries=geometry`),await r("https://unpkg.com/measuretool-googlemaps-v3"));const t=new window.google.maps.Map(e.current,{center:k,zoom:9,clickableIcons:!1,disableDefaultUI:!0,disableDoubleClickZoom:!0,gestureHandling:"none",draggable:!1});l.current=new window.MeasureTool(t,{contextMenu:!1,unit:"IMPERIAL"}),l.current.start(w),setTimeout(()=>{let t=Array.from(e.current.querySelectorAll("a"));t=t.concat(Array.from(e.current.querySelectorAll('[tabindex="0"]'))),t.forEach(e=>e.setAttribute("tabindex","-1"))},2e3)})(),p(!0)),l.current&&(l.current.start(w),h(!0))},f=()=>{l.current&&(l.current.end(),h(!1))};return o(()=>()=>{f()},[]),a`<section id="measure" class=${i}>
      <div class=${c} tab-index="-1">
        <div class=${d} ref=${e}>
          ${!s&&a`<${$} onClick=${v}/>`}
        </div>
      </div>
      <div class=${u}>
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
          ${g?a`<button onClick=${f}>stop the measure</button>`:a`<button onClick=${v}>start the measure</button>`}
        </div>
        <codeblock-light class=${m}>
          <style>${"\npre {\n  margin-left: -20px !important;\n  margin-right: -20px !important;\n}\n@media (min-width: 768px) {\n  pre {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }  \n}\n"}</style>
          <pre>
            <code class="lang-html">${'\x3c!-- html --\x3e\n<script src="https://unpkg.com/measuretool-googlemaps-v3"><\/script>\n'}</code>
            <code class="lang-js">${"\n// Pass in the google maps instance to create the measure tool\nconst measureTool = new MeasureTool(map);"}</code>
          </pre>
        </codeblock-light>
      </div>
    </section>`}null;const _="host_utq90y",C="snowbox_utq90y";function A(){const e=t(null),n=t(null),r=t(null),l=()=>{n.current&&n.current.stop()},s=()=>{n.current&&(n.current.start(),r.current&&clearTimeout(r.current),r.current=setTimeout(()=>{l(),r.current=null},3e4))};return o(()=>{let t;if(e.current){import("./snow.esm.ef27fa79.js").then(({default:t})=>{n.current=new t(e.current)});t=new IntersectionObserver(e=>{for(const t of e)t.isIntersecting?s():l()},{root:null,rootMargin:"0px",threshold:.8}),t.observe(e.current)}return()=>{l(),t&&t.disconnect()}},[]),a`<section id="snow" class=${_}>
      <div class=${C} ref=${e}>
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
            <button class="inverted" onClick=${s}>start the snow</button>
            <button class="inverted" onClick=${l}>stop the snow</button>
          </div>
        </div>
        <codeblock-dark>
          <style>${"\npre {\n  contain: content;\n  margin-left: -20px !important;\n  margin-right: -20px !important;\n  background-color: var(--deepBlue) !important;\n  font-size: 1.2rem !important;\n}\n\n@media (min-width: 462px) {\n  pre {\n    display: flex !important;\n    justify-content: center !important;\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }\n}"}</style>
          <pre>
            <code class="lang-js">${"\n// Create a snow scene instance and\n// mount it to the container element\nconst snow = new Snow(containerElement);\n// To start\nsnow.start();\n// To stop\nsnow.stop();\n"}</code>
          </pre>
        </codeblock-dark>
      </div>
    </section>`}null;const S={host:"host_1ey0ie1",control:"control_1ey0ie1","radio-group":"radio-group_1ey0ie1"};function T(){const[e,t]=n("left"),[o,r]=n(16),[l,s]=n("#73CE8F"),i=e=>{t(e.target.value)};return a`<section id="leaf" class=${S.host} style=${{"--leaf-variance":e,"--leaf-size":o,"--leaf-color":l}}>
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
          <div class=${`${S.control} ${S.radioGroup}`}>
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
          <div class=${S.control}>
            <label htmlFor="size"><code class="lang-css">--leaf-size</code></label>
            <input type="range" min="10" max="32" id="size" name="size" value=${o} onChange=${e=>r(e.target.value)}/>
          </div>
          <div class=${S.control}>
            <label htmlFor="color"><code class="lang-css">--leaf-color</code></label>
            <input type="color" id="color" name="color" value=${l} onInput=${e=>s(e.target.value)}/>
          </div>
        </div>
      </div>
      <codeblock-light>
        <style>${c=o,`\npre {\n  margin-left: -${5*c}px !important;\n  margin-right: -${5*c}px !important;\n}\n@media (min-width: 768px) {\n  pre {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }  \n}\n`}</style>
        <pre>
          <code class="lang-html">${'\n\x3c!-- html --\x3e\n<script src="https://unpkg.com/houdini-leaf"><\/script>'}</code>
          <code class="lang-css">${`\n/* CSS */\n.element {\n  --leaf-variance: ${e};\n  --leaf-size: ${o};\n  --leaf-color: ${l};\n  background-image: paint(leaf);\n}`}</code>
        </pre>
      </codeblock-light>
    </section>`;var c}export default function(){return l(),s(),a`
      <${x}/>
      <${A}/>
      <${T}/>
    `}