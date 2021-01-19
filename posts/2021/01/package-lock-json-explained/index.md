---
title: 'Package-lock.json Exaplained' 
date: '2021-01-18 17:00:00'
---
Since the introduction of the `package-lock.json` file from NPM, I never had a good grasp of it which lead to my
confusion when resolving a merge conflict that is due to the `package-lock.json` file. To understand it clearly becomes the first thing on my
new year's resolution list. *This is the way* how I managed to get myself understood with the `package-lock.json` file.
<!-- Excerpt End -->

## Fields explained

|Field|Description|
|---|---|
|`name`|the name of the installed module|
|`version`|the fixed version of the installed module|
|`dependencies`|a list of modules that are installed in the `node_modules` folder|
|`requires`|a list of module requirements, this is a list of key-value pairs where key is the module name and value is the semantic version range|

## Package-lock.json visualizer

<style>
.control {
  display: flex;
}
.control label {
  margin-right: 10px;
}
.control input {
  flex: 1 1 auto;
}
#visualizer {
  position: relative;
  border: brown solid 2px;
}
#zoom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
}
text {
	font-weight: 300;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
}

rect {
	stroke: #999;
	fill: #fff;
	stroke-width: 1px;
	pointer-events: none;
}

path {
	stroke: #333;
	stroke-width: 1px;
}
</style>
<div class="control">
  <label for="url">Package-lock.json URL</label>
  <input id="url" type="text" value="https://gist.githubusercontent.com/mbostock/3a87eff4c752341faa485a29d4459b52/raw/910e72da4e154ed95d69e76ca763f383b2888c34/package-lock.json"/>
</div>
<button id="draw">Draw</button>
<div id="visualizer"></div>
<script>
(function(){
  function injectScript(url, async = true) {
    if (!window.injected) window.injected = {};
    if (window.injected && window.injected[url]) return Promise.resolve();
    const p = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = async;
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    window.injected[url] = p;
    return p;
  }
  async function draw() {
    await Promise.all([
      injectScript("https://unpkg.com/d3@6.3.1/dist/d3.min.js"),
      injectScript("https://www.unpkg.com/dagre-d3@0.6.4/dist/dagre-d3.js"),
      injectScript("https://cdn.jsdelivr.net/gh/zhenyanghua/node-semver@browser/semver.min.js")
    ]);
    const root = await fetch(document.querySelector('#url').value).then(res => res.json());
    const g = new dagreD3.graphlib.Graph({ directed: true, compound: true, multigraph: true })
      .setGraph({ rankdir: 'LR' })
      .setDefaultEdgeLabel(() => ({}));
    const ancestors = [root];
    function resolve(name, range) {
      for (const module of ancestors) {
        if (!module.dependencies) continue;
        const dependency = module.dependencies[name];
        if (dependency && SemVer.satisfies(dependency.version, range)) {
          return dependency;
        }
      }
    }
    function define(name, module) {
      const key = name + '@' + module.version;
      ancestors.unshift(module);
      if (g.node(key)) return;
      g.setNode(key, { label: key });
      if (module.dependencies) {
        for (const [subname, submodule] of Object.entries(module.dependencies)) {
          define(subname, submodule);
        }
      }
      if (module.requires) {
        for (const [subname, range] of Object.entries(module.requires)) {
          const dependency = resolve(subname, range);
          if (!dependency) continue;
          const subkey = subname + '@' + dependency.version;
          if (g.edge(key, subkey)) continue;
          g.setEdge(key, subkey, { curve: d3.curveBasis });
        }
      }
      ancestors.shift();
    }
    for (const [name, module] of Object.entries(root.dependencies)) {
      define(name, module);
    }
    d3.select('#visualizer svg').remove();
    d3.select('#visualizer').append('div').attr('id', 'zoom').text('Click to enable zoom');
    const svg = d3.select('#visualizer').append('svg').attr('tabindex', '0')
      .on('click', zoom)
      .on('keydown', e => { if (['Enter', ' '].includes(e.key)) zoom() });
    const group = svg.append('g');
    const render = new dagreD3.render();
    render(group, g);
    group.attr('transform', 'translate(0, 100)');
    const w = g.graph().width + 40;
    const h = g.graph().height + 40;
    svg.attr('viewBox', [0, 0, w, h]);
    function zoom() {
      d3.select('#zoom').remove();
      svg.call(d3.zoom().extent([[0, 0], [w, h]])
        .scaleExtent([1, 3])
        .on("zoom", ({transform}) => {
          group.attr("transform", transform);
        }));
    }
  }
  document.querySelector('#draw').addEventListener('click', draw);
})();
</script>



