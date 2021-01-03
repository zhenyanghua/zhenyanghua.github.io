import{s as e,a as t,y as n,m as o,i as a,l as r}from"../index.da321a88.js";e("/assets/style.module.ddcbed56.css");const l="host_12vkevj",s="mapsection_12vkevj",i="map_12vkevj",c="instruction_12vkevj",u="codeblock_12vkevj",d="AIzaSyBTdH3AFSWLD3SrgbNqTGoRsg3U6W0qAAg",p={lat:41.7,lng:-71.47},g=[{lat:41.69547509615208,lng:-71.36993408203125},{lat:41.434490308949215,lng:-71.3671875},{lat:41.50857729743936,lng:-71.20513916015625},{lat:41.66923209813446,lng:-71.18435546874998},{lat:41.80245339578072,lng:-71.34365722656248},{lat:41.910875425626266,lng:-71.39034912109373},{lat:42.01299182987659,lng:-71.38760253906248},{lat:42.01299182987659,lng:-71.80508300781248},{lat:41.69957665997156,lng:-71.795654296875},{lat:41.3566211272796,lng:-71.82156249999998},{lat:41.37723402378496,lng:-71.49471923828123},{lat:41.6154423246811,lng:-71.48529052734375},{lat:41.69547509615208,lng:-71.36993408203125}];function m(){const e=t(null),r=t(null);return n(()=>{let t,n;const o=async()=>{Array.from(document.head.querySelectorAll("script")).some(e=>e.src.includes(d))||(await a(`https://maps.googleapis.com/maps/api/js?key=${d}&libraries=geometry`),await a("https://unpkg.com/measuretool-googlemaps-v3")),n||(n=new window.google.maps.Map(e.current,{center:p,zoom:9,clickableIcons:!1,disableDefaultUI:!0,disableDoubleClickZoom:!0,gestureHandling:"none",draggable:!1}),r.current=new window.MeasureTool(n,{contextMenu:!1,unit:"IMPERIAL"}),r.current.start(g),setTimeout(()=>{let t=Array.from(e.current.querySelectorAll("a"));t=t.concat(Array.from(e.current.querySelectorAll('[tabindex="0"]'))),t.forEach(e=>e.setAttribute("tabindex","-1"))},2e3))};if(e.current){t=new IntersectionObserver(e=>{for(const t of e)t.isIntersecting&&o()},{root:null,rootMargin:"0px",threshold:.25}),t.observe(e.current)}return()=>{t&&t.disconnect(),r.current&&r.current.end()}},[]),o`<section class=${l}>
      <div class=${s} tab-index="-1">
        <div class=${i} ref=${e}/>
      </div>
      <div class=${c}>
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
          <button onClick=${()=>{r.current&&r.current.start([p])}}>start</button>
          <button onClick=${()=>{r.current&&r.current.end()}}>stop</button>
        </div>
        <codeblock-light class=${u}>
          <style>${"\npre {\n  margin-left: -20px !important;\n  margin-right: -20px !important;\n}\n@media (min-width: 768px) {\n  pre {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }  \n}\n"}</style>
          <pre>
            <code class="lang-html">${'\x3c!-- html --\x3e\n<script src="https://unpkg.com/measuretool-googlemaps-v3"><\/script>\n'}</code>
            <code class="lang-js">${"\n// Pass in the google maps instance to create the measure tool\nconst measureTool = new MeasureTool(map);"}</code>
          </pre>
        </codeblock-light>
      </div>
    </section>`}null;const h="host_utq90y",f="snowbox_utq90y";function v(){const e=t(null),a=t(null),r=t(null),l=()=>{a.current&&a.current.stop()},s=()=>{a.current&&(a.current.start(),r.current&&clearTimeout(r.current),r.current=setTimeout(()=>{l(),r.current=null},3e4))};return n(()=>{let t;if(e.current){import("./snow.esm.ef27fa79.js").then(({default:t})=>{a.current=new t(e.current)});t=new IntersectionObserver(e=>{for(const t of e)t.isIntersecting?s():l()},{root:null,rootMargin:"0px",threshold:.8}),t.observe(e.current)}return()=>{l(),t&&t.disconnect()}},[]),o`<section class=${h}>
      <div class=${f} ref=${e}>
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
    </section>`}null;const b={host:"host_1ey0ie1",control:"control_1ey0ie1","radio-group":"radio-group_1ey0ie1"};function $(){const[e,t]=r("left"),[n,a]=r(16),[l,s]=r("#73CE8F"),i=e=>{t(e.target.value)};return o`<section class=${b.host} style=${{"--leaf-variance":e,"--leaf-size":n,"--leaf-color":l}}>
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
          <div class=${`${b.control} ${b.radioGroup}`}>
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
          <div class=${b.control}>
            <label htmlFor="size"><code class="lang-css">--leaf-size</code></label>
            <input type="range" min="10" max="32" id="size" name="size" value=${n} onChange=${e=>a(e.target.value)}/>
          </div>
          <div class=${b.control}>
            <label htmlFor="color"><code class="lang-css">--leaf-color</code></label>
            <input type="color" id="color" name="color" value=${l} onInput=${e=>s(e.target.value)}/>
          </div>
        </div>
      </div>
      <codeblock-light>
        <style>${c=n,`\npre {\n  margin-left: -${5*c}px !important;\n  margin-right: -${5*c}px !important;\n}\n@media (min-width: 768px) {\n  pre {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }  \n}\n`}</style>
        <pre>
          <code class="lang-html">${'\n\x3c!-- html --\x3e\n<script src="https://unpkg.com/houdini-leaf"><\/script>'}</code>
          <code class="lang-css">${`\n/* CSS */\n.element {\n  --leaf-variance: ${e};\n  --leaf-size: ${n};\n  --leaf-color: ${l};\n  background-image: paint(leaf);\n}`}</code>
        </pre>
      </codeblock-light>
    </section>`;var c}export default function(){return o`
      <${m}/>
      <${v}/>
      <${$}/>
    `}