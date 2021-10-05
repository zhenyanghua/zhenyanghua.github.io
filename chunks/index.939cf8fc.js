import{y as e,m as n}from"../index.f2c6e336.js";import"./time.daaab1ba.js";import{P as t}from"./index.5fd436ca.js";const o=["(function(){\n  function injectScript(url, async = true) {\n    if (!window.injected) window.injected = {};\n    if (window.injected && window.injected[url]) return Promise.resolve();\n    const p = new Promise((resolve, reject) => {\n      const script = document.createElement('script');\n      script.async = async;\n      script.src = url;\n      script.onload = resolve;\n      script.onerror = reject;\n      document.head.appendChild(script);\n    });\n    window.injected[url] = p;\n    return p;\n  }\n  async function draw() {\n    const loading = document.createElement('div');    \n    loading.setAttribute('id', 'loading');\n    loading.innerHTML = 'Loading';\n    const visualizer = document.querySelector('#visualizer');\n    visualizer.innerHTML = '';\n    visualizer.append(loading);\n    await Promise.all([\n      injectScript(\"https://unpkg.com/d3@6.3.1/dist/d3.min.js\"),\n      injectScript(\"https://www.unpkg.com/dagre-d3@0.6.4/dist/dagre-d3.min.js\"),\n      injectScript(\"https://cdn.jsdelivr.net/gh/zhenyanghua/node-semver@browser/semver.min.js\")\n    ]);\n    const root = await fetch(document.querySelector('#url').value).then(res => res.json());\n    const g = new dagreD3.graphlib.Graph({ directed: true, compound: true, multigraph: true })\n      .setGraph({ rankdir: 'LR' })\n      .setDefaultEdgeLabel(() => ({}));\n    const ancestors = [root];\n    function resolve(name, range) {\n      for (const module of ancestors) {\n        if (!module.dependencies) continue;\n        const dependency = module.dependencies[name];\n        if (dependency && SemVer.satisfies(dependency.version, range)) {\n          return dependency;\n        }\n      }\n    }\n    function define(name, module) {\n      const key = name + '@' + module.version;\n      ancestors.unshift(module);\n      if (g.node(key)) return;\n      g.setNode(key, { label: key });\n      if (module.dependencies) {\n        for (const [subname, submodule] of Object.entries(module.dependencies)) {\n          define(subname, submodule);\n        }\n      }\n      if (module.requires) {\n        for (const [subname, range] of Object.entries(module.requires)) {\n          const dependency = resolve(subname, range);\n          if (!dependency) continue;\n          const subkey = subname + '@' + dependency.version;\n          if (g.edge(key, subkey)) continue;\n          g.setEdge(key, subkey, { curve: d3.curveBasis });\n        }\n      }\n      ancestors.shift();\n    }\n    for (const [name, module] of Object.entries(root.dependencies)) {\n      define(name, module);\n    }\n    let svg;\n    noZoom();\n    svg = d3.select(visualizer).append('svg').attr('tabindex', '0')\n      .on('click', zoom)\n      .on('keydown', e => { if (['Enter', ' '].includes(e.key)) zoom() })\n      .on('blur', noZoom)\n      .on('keydown', e => { if (e.key === 'Escape') noZoom() });\n    const group = svg.append('g');\n    const render = new dagreD3.render();\n    render(group, g);\n    d3.selectAll('#loading').remove();\n    group.attr('transform', 'translate(0, 100)');\n    const w = g.graph().width + 40;\n    const h = g.graph().height + 40;\n    svg.attr('viewBox', [0, 0, w, h]);\n    function zoom() {\n      d3.selectAll('#zoom').remove();\n      svg.call(d3.zoom().extent([[0, 0], [w, h]])\n        .scaleExtent([1, 3])\n        .on(\"zoom\", ({transform}) => {\n          group.attr(\"transform\", transform);\n        }));\n    }\n    function noZoom() {\n      if (!document.getElementById('zoom')) {\n        d3.select(visualizer).insert('div', ':first-child').attr('id', 'zoom').text('Click or tap to enable zoom');\n      }\n      if (svg) {\n        svg.on('.zoom', null);\n      }\n    }\n  }\n  document.querySelector('#draw').addEventListener('click', draw);\n})();"];export default function(){return e(()=>{o.forEach(e=>new Function(e)())},[]),n`<${t} ...${{title:"Package-lock.json Explained",date:"2021-01-18 17:00:00"}} summary=${"<p>Since the introduction of the <code>package-lock.json</code> file from NPM, I never had a good grasp of it which lead to my\nconfusion when resolving a merge conflict that is due to the <code>package-lock.json</code> file. To understand it clearly becomes the first thing on my\nnew year&#39;s resolution list. <em>This is the way</em> how I managed to get myself understood with the <code>package-lock.json</code> file.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="fields-explained" class="anchor" aria-hidden="true" href="#fields-explained">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Fields explained</h2><p>These are the fields I found most important when I resolve a merge conflicts in the <code>package-lock.json</code> file. They provide me with the \nminimal information I need to identify what has been changed that is directly related to the version of the dependencies. </p>\n<table>\n<thead>\n<tr>\n<th>Field</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>name</code></td>\n<td>the name of the installed module</td>\n</tr>\n<tr>\n<td><code>version</code></td>\n<td>the fixed version of the installed module</td>\n</tr>\n<tr>\n<td><code>dependencies</code></td>\n<td>a list of modules that are installed in the <code>node_modules</code> folder</td>\n</tr>\n<tr>\n<td><code>requires</code></td>\n<td>a list of module requirements, this is a list of key-value pairs where key is the module name and value is the semantic version range</td>\n</tr>\n</tbody></table>\n<h2>\n  <a id="benefits-of-package-lock-json" class="anchor" aria-hidden="true" href="#benefits-of-package-lock-json">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Benefits of package-lock.json</h2><p>Here are the four quoted benefits from the official <a target="_blank" href="https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json">NPM document</a> \nwith my interpretation:</p>\n<blockquote>\n<p>Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are guaranteed to install exactly the same dependencies.</p>\n</blockquote>\n<p>Unless the application author specifies the fixed version, it is not enough to control what exact version will be installed across the team. \nWhat&#39;s defined in the <code>package.json</code> only describes the version requirement, often time each dependency is provided with a version range instead of \na specific fixed version. When running the <code>npm install</code> command, the version that is tagged as the <code>@latest</code> that satisfies the semantic version rules\nwill be installed and its version is then captured in the <code>package-lock.json</code> file. The same logic is recursively applied to the dependencies of the\ndependencies. Now with the <code>package-lock.json</code>, when running the <code>npm install</code>, the exact version that is previously captured in the lock file will be \nused instead of the version tagged as the <code>@latest</code>. This guarantees the exact same versions of the dependencies are installed across the team. </p>\n<blockquote>\n<p>Provide a facility for users to &quot;time-travel&quot; to previous states of node_modules without having to commit the directory itself.</p>\n</blockquote>\n<p>Now that <code>package-lock.json</code> captures the exact versions that are installed for all dependencies, if this file is then committed to a version\ncontrol system, it is now possible to check out any previous version of <code>package-lock.json</code> from the version control history and then will be able\nto find out any previously installed versions of the dependencies. A single file avoids the need to version control the <code>package.json</code> files from\nall the dependencies in the <code>node_modules</code>.</p>\n<blockquote>\n<p>To facilitate greater visibility of tree changes through readable source control diffs.</p>\n</blockquote>\n<p>Even though it is still possible to compare the diffs of <code>package.json</code> from each dependency in the <code>node_modules</code> if we choose to commit them,\nit is hard to find the relations between these dependencies without rebuild the dependencies graph from all the installed <code>package.json</code> file. \nWith a single <code>package-lock.json</code> file providing the dependencies tree that captures what versions are installed, it takes comparatively less effort for us to\nfind all the changes in one place. Note that it is also possible to traverse the single tree to build the dependencies graph, which I have a demo\nabout it in the final section. </p>\n<blockquote>\n<p>And optimize the installation process by allowing npm to skip repeated metadata resolutions for previously-installed packages.</p>\n</blockquote>\n<p>There are a few metadata attributes also captured during the <code>npm install</code> process. For example, the <code>bundled</code> metadata makes it possible to \nskip installing the dependencies that are already installed from another dependency by the parent module that is declared as <code>bundled: true</code>. \nThere are some more metadata attributes that provide other useful information during the installation.</p>\n<h2>\n  <a id="package-lock-json-visualizer" class="anchor" aria-hidden="true" href="#package-lock-json-visualizer">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Package-lock.json visualizer</h2><p>With a single dependencies tree provided by the <code>package-lock.json</code> file, it is possible to traverse it and build the dependencies graph\nbased on the previously mentioned key attributes. We can start from the root module and do a depth first traversal, and for each node we visit,\nadd them to the node definition, and after visiting each node and its descendents, add the node-descendent relation to the edge definition. </p>\n<p>The graph layout algorithm is done by using <a target="_blank" href="https://github.com/dagrejs/dagre">Dagre</a>,\nthe renderer is done by using <a target="_blank" href="https://github.com/dagrejs/dagre-d3">DagreD3</a>,\nand the zoom is done by using <a target="_blank" href="https://github.com/d3/d3-zoom">d3-zoom</a>.</p>\n<p>The original algorithm is from the \n<a target="_blank" href="https://observablehq.com/@mbostock/package-lock-json-visualizer">Package-lock.json Visualizer</a> by \n<a target="_blank" href="https://observablehq.com/@mbostock">Mike Bostock</a>.</p>\n<style>\n.control {\n  display: flex;\n  flex-direction: column;\n}\n.control > * {\n  margin-bottom: 10px;\n}\n.control label {\n  margin-right: 10px;\n}\n.control input {\n  flex: 1 1 auto;\n  font-size: 1rem;\n}\n#draw {\n  max-width: 375px;\n}\n#visualizer {\n  position: relative;\n  background-color: aliceblue;\n  border-radius: 4px;\n}\n#zoom {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  background-color: yellow;\n}\n#loading {\n  padding: 20px;\n}\ntext {\n    font-weight: 300;\n    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n    font-size: 14px;\n}\n\nrect {\n    stroke: #999;\n    fill: #fff;\n    stroke-width: 1px;\n    pointer-events: none;\n}\n\npath {\n    stroke: #333;\n    stroke-width: 1px;\n}\n</style>\n<div class="control">\n  <label for="url">Package-lock.json URL</label>\n  <input id="url" type="text" value="https://raw.githubusercontent.com/zhenyanghua/zhenyanghua.github.io/master/package-lock.json"/>\n  <small>If the size of the package-lock.json file is greater than 300KB, it may take a while for this renderer to draw all the SVG out. This is just for demonstration purpose, not meant for production.</small>\n  <button id="draw">Draw the dependencies graph</button>\n</div>\n<div id="visualizer"></div>\n<script>\n(function(){\n  function injectScript(url, async = true) {\n    if (!window.injected) window.injected = {};\n    if (window.injected && window.injected[url]) return Promise.resolve();\n    const p = new Promise((resolve, reject) => {\n      const script = document.createElement(\'script\');\n      script.async = async;\n      script.src = url;\n      script.onload = resolve;\n      script.onerror = reject;\n      document.head.appendChild(script);\n    });\n    window.injected[url] = p;\n    return p;\n  }\n  async function draw() {\n    const loading = document.createElement(\'div\');    \n    loading.setAttribute(\'id\', \'loading\');\n    loading.innerHTML = \'Loading\';\n    const visualizer = document.querySelector(\'#visualizer\');\n    visualizer.innerHTML = \'\';\n    visualizer.append(loading);\n    await Promise.all([\n      injectScript("https://unpkg.com/d3@6.3.1/dist/d3.min.js"),\n      injectScript("https://www.unpkg.com/dagre-d3@0.6.4/dist/dagre-d3.min.js"),\n      injectScript("https://cdn.jsdelivr.net/gh/zhenyanghua/node-semver@browser/semver.min.js")\n    ]);\n    const root = await fetch(document.querySelector(\'#url\').value).then(res => res.json());\n    const g = new dagreD3.graphlib.Graph({ directed: true, compound: true, multigraph: true })\n      .setGraph({ rankdir: \'LR\' })\n      .setDefaultEdgeLabel(() => ({}));\n    const ancestors = [root];\n    function resolve(name, range) {\n      for (const module of ancestors) {\n        if (!module.dependencies) continue;\n        const dependency = module.dependencies[name];\n        if (dependency && SemVer.satisfies(dependency.version, range)) {\n          return dependency;\n        }\n      }\n    }\n    function define(name, module) {\n      const key = name + \'@\' + module.version;\n      ancestors.unshift(module);\n      if (g.node(key)) return;\n      g.setNode(key, { label: key });\n      if (module.dependencies) {\n        for (const [subname, submodule] of Object.entries(module.dependencies)) {\n          define(subname, submodule);\n        }\n      }\n      if (module.requires) {\n        for (const [subname, range] of Object.entries(module.requires)) {\n          const dependency = resolve(subname, range);\n          if (!dependency) continue;\n          const subkey = subname + \'@\' + dependency.version;\n          if (g.edge(key, subkey)) continue;\n          g.setEdge(key, subkey, { curve: d3.curveBasis });\n        }\n      }\n      ancestors.shift();\n    }\n    for (const [name, module] of Object.entries(root.dependencies)) {\n      define(name, module);\n    }\n    let svg;\n    noZoom();\n    svg = d3.select(visualizer).append(\'svg\').attr(\'tabindex\', \'0\')\n      .on(\'click\', zoom)\n      .on(\'keydown\', e => { if ([\'Enter\', \' \'].includes(e.key)) zoom() })\n      .on(\'blur\', noZoom)\n      .on(\'keydown\', e => { if (e.key === \'Escape\') noZoom() });\n    const group = svg.append(\'g\');\n    const render = new dagreD3.render();\n    render(group, g);\n    d3.selectAll(\'#loading\').remove();\n    group.attr(\'transform\', \'translate(0, 100)\');\n    const w = g.graph().width + 40;\n    const h = g.graph().height + 40;\n    svg.attr(\'viewBox\', [0, 0, w, h]);\n    function zoom() {\n      d3.selectAll(\'#zoom\').remove();\n      svg.call(d3.zoom().extent([[0, 0], [w, h]])\n        .scaleExtent([1, 3])\n        .on("zoom", ({transform}) => {\n          group.attr("transform", transform);\n        }));\n    }\n    function noZoom() {\n      if (!document.getElementById(\'zoom\')) {\n        d3.select(visualizer).insert(\'div\', \':first-child\').attr(\'id\', \'zoom\').text(\'Click or tap to enable zoom\');\n      }\n      if (svg) {\n        svg.on(\'.zoom\', null);\n      }\n    }\n  }\n  document.querySelector(\'#draw\').addEventListener(\'click\', draw);\n})();\n<\/script>\n\n\n\n'}}/>
    </${t}>`}