import{y as e,m as n}from"../index.688d9b75.js";import"./time.daaab1ba.js";import{P as t}from"./index.441ff0d7.js";const o=["function injectScript(url, async = true) {\n    return new Promise((resolve, reject) => {\n      const script = document.createElement('script');\n      script.async = async;\n      script.src = url;\n      script.onload = resolve;\n      script.onerror = reject;\n      document.head.appendChild(script);\n    });\n  }\n  async function load() {\n    const exampleUrl = 'https://gist.githubusercontent.com/mbostock/3a87eff4c752341faa485a29d4459b52/raw/910e72da4e154ed95d69e76ca763f383b2888c34/package-lock.json';\n    await Promise.all([\n      injectScript(\"https://unpkg.com/d3@6.3.1/dist/d3.min.js\"),\n      injectScript(\"https://www.unpkg.com/dagre-d3@0.6.4/dist/dagre-d3.js\"),\n      injectScript(\"https://cdn.jsdelivr.net/gh/zhenyanghua/node-semver@browser/semver.min.js\")\n    ]);\n    const root = await fetch(exampleUrl).then(res => res.json());\n    const g = new dagreD3.graphlib.Graph({ directed: true, compound: true, multigraph: true })\n      .setGraph({ rankdir: 'LR' })\n      .setDefaultEdgeLabel(() => ({}));\n    const ancestors = [root];\n    function resolve(name, range) {\n      for (const module of ancestors) {\n        if (!module.dependencies) continue;\n        const dependency = module.dependencies[name];\n        if (dependency && SemVer.satisfies(dependency.version, range)) {\n          return dependency;\n        }\n      }\n    }\n    function define(name, module) {\n      const key = \\`${name}@${module.version}\\`;\n      ancestors.unshift(module);\n      if (g.node(key)) return;\n      g.setNode(key, { label: key });\n      if (module.dependencies) {\n        for (const [subname, submodule] of Object.entries(module.dependencies)) {\n          define(subname, submodule);\n        }\n      }\n      if (module.requires) {\n        for (const [subname, range] of Object.entries(module.requires)) {\n          const dependency = resolve(subname, range);\n          if (!dependency) continue;\n          const subkey = \\`${subname}@${dependency.version}\\`;\n          if (g.edge(key, subkey)) continue;\n          g.setEdge(key, subkey, { curve: d3.curveBasis });\n        }\n      }\n      ancestors.shift();\n    }\n    for (const [name, module] of Object.entries(root.dependencies)) {\n      define(name, module);\n    }\n    if (containerRef.current) {\n      const svg = d3.select(containerRef.current)\n        .append('svg');\n      const group = d3.select('svg').append('g');\n      const render = new dagreD3.render();\n      render(group, g);\n      group.attr('transform', \\`translate(0, 100)\\`);\n      const w = g.graph().width + 40;\n      const h = g.graph().height + 40;\n      svg.attr('viewBox', [0, 0, w, h]);\n      svg.call(d3.zoom().extent([[0, 0], [w, h]])\n        .scaleExtent([0.3, 3])\n        .on(\"zoom\", zoomed));\n      function zoomed({transform}) {\n        group.attr(\"transform\", transform);\n      }\n    }\n  }"];export default function(){return e(()=>{o.forEach(e=>new Function(e)())},[]),n`<${t} ...${{title:"Package-lock.json Exaplained",date:"2021-01-18 17:00:00"}} summary=${"<p>Since the introduction of the <code>package-lock.json</code> file from NPM, I never had a good grasp of it which leads to my\nconfusion of when resolving a merge conflict that is due to the <code>package-lock.json</code> file. This is the first thing on my\nnew years resolution list. <em>This is the way</em> how I find managed to get myself cleared with the <code>package-lock.json</code> file.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:`<h2>\n  <a id="package-lock-json-visualizer" class="anchor" aria-hidden="true" href="#package-lock-json-visualizer">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Package-lock.json visualizer</h2><style>\ntext {\n    font-weight: 300;\n    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n    font-size: 14px;\n}\n\nrect {\n    stroke: #999;\n    fill: #fff;\n    stroke-width: 1px;\n    pointer-events: none;\n}\n\npath {\n    stroke: #333;\n    stroke-width: 1px;\n}\n</style>\n<div id="visualizer">\n</div>\n<button id="draw" onClick="load">Draw</button>\n<script>\n  function injectScript(url, async = true) {\n    return new Promise((resolve, reject) => {\n      const script = document.createElement('script');\n      script.async = async;\n      script.src = url;\n      script.onload = resolve;\n      script.onerror = reject;\n      document.head.appendChild(script);\n    });\n  }\n  async function load() {\n    const exampleUrl = 'https://gist.githubusercontent.com/mbostock/3a87eff4c752341faa485a29d4459b52/raw/910e72da4e154ed95d69e76ca763f383b2888c34/package-lock.json';\n    await Promise.all([\n      injectScript("https://unpkg.com/d3@6.3.1/dist/d3.min.js"),\n      injectScript("https://www.unpkg.com/dagre-d3@0.6.4/dist/dagre-d3.js"),\n      injectScript("https://cdn.jsdelivr.net/gh/zhenyanghua/node-semver@browser/semver.min.js")\n    ]);\n    const root = await fetch(exampleUrl).then(res => res.json());\n    const g = new dagreD3.graphlib.Graph({ directed: true, compound: true, multigraph: true })\n      .setGraph({ rankdir: 'LR' })\n      .setDefaultEdgeLabel(() => ({}));\n    const ancestors = [root];\n    function resolve(name, range) {\n      for (const module of ancestors) {\n        if (!module.dependencies) continue;\n        const dependency = module.dependencies[name];\n        if (dependency && SemVer.satisfies(dependency.version, range)) {\n          return dependency;\n        }\n      }\n    }\n    function define(name, module) {\n      const key = \`${name}@${module.version}\`;\n      ancestors.unshift(module);\n      if (g.node(key)) return;\n      g.setNode(key, { label: key });\n      if (module.dependencies) {\n        for (const [subname, submodule] of Object.entries(module.dependencies)) {\n          define(subname, submodule);\n        }\n      }\n      if (module.requires) {\n        for (const [subname, range] of Object.entries(module.requires)) {\n          const dependency = resolve(subname, range);\n          if (!dependency) continue;\n          const subkey = \`${subname}@${dependency.version}\`;\n          if (g.edge(key, subkey)) continue;\n          g.setEdge(key, subkey, { curve: d3.curveBasis });\n        }\n      }\n      ancestors.shift();\n    }\n    for (const [name, module] of Object.entries(root.dependencies)) {\n      define(name, module);\n    }\n    if (containerRef.current) {\n      const svg = d3.select(containerRef.current)\n        .append('svg');\n      const group = d3.select('svg').append('g');\n      const render = new dagreD3.render();\n      render(group, g);\n      group.attr('transform', \`translate(0, 100)\`);\n      const w = g.graph().width + 40;\n      const h = g.graph().height + 40;\n      svg.attr('viewBox', [0, 0, w, h]);\n      svg.call(d3.zoom().extent([[0, 0], [w, h]])\n        .scaleExtent([0.3, 3])\n        .on("zoom", zoomed));\n      function zoomed({transform}) {\n        group.attr("transform", transform);\n      }\n    }\n  }\n<\/script>\n\n\n\n`}}/>
    </${t}>`}
function $w_s$(e,t){document.querySelector('link[rel=stylesheet][href="'+e+'"]')||((t=document.createElement("link")).rel="stylesheet",t.href=e,document.head.appendChild(t))}
$w_s$("/assets/style.module.184703f0.css");