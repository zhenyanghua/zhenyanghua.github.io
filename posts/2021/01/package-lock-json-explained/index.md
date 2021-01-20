---
title: 'Package-lock.json Explained' 
date: '2021-01-18 17:00:00'
---
Since the introduction of the `package-lock.json` file from NPM, I never had a good grasp of it which lead to my
confusion when resolving a merge conflict that is due to the `package-lock.json` file. To understand it clearly becomes the first thing on my
new year's resolution list. *This is the way* how I managed to get myself understood with the `package-lock.json` file.
<!-- Excerpt End -->

## Fields explained

These are the fields I found most important when I resolve a merge conflicts in the `package-lock.json` file. They provide me with the 
minimal information I need to identify what has been changed that is directly related to the version of the dependencies. 

|Field|Description|
|---|---|
|`name`|the name of the installed module|
|`version`|the fixed version of the installed module|
|`dependencies`|a list of modules that are installed in the `node_modules` folder|
|`requires`|a list of module requirements, this is a list of key-value pairs where key is the module name and value is the semantic version range|

## Benefits of package-lock.json

Here are the four quoted benefits from the official <a target="_blank" href="https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json">NPM document</a> 
with my interpretation:

> Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are guaranteed to install exactly the same dependencies.

Unless the application author specifies the fixed version, it is not enough to control what exact version will be installed across the team. 
What's defined in the `package.json` only describes the version requirement, often time each dependency is provided with a version range instead of 
a specific fixed version. When running the `npm install` command, the version that is tagged as the `@latest` that satisfies the semantic version rules
will be installed and its version is then captured in the `package-lock.json` file. The same logic is recursively applied to the dependencies of the
dependencies. Now with the `package-lock.json`, when running the `npm install`, the exact version that is previously captured in the lock file will be 
used instead of the version tagged as the `@latest`. This guarantees the exact same versions of the dependencies are installed across the team. 

> Provide a facility for users to "time-travel" to previous states of node_modules without having to commit the directory itself.

Now that `package-lock.json` captures the exact versions that are installed for all dependencies, if this file is then committed to a version
control system, it is now possible to check out any previous version of `package-lock.json` from the version control history and then will be able
to find out any previously installed versions of the dependencies. A single file avoids the need to version control the `package.json` files from
all the dependencies in the `node_modules`.

> To facilitate greater visibility of tree changes through readable source control diffs.

Even though it is still possible to compare the diffs of `package.json` from each dependency in the `node_modules` if we choose to commit them,
it is hard to find the relations between these dependencies without rebuild the dependencies graph from all the installed `package.json` file. 
With a single `package-lock.json` file providing the dependencies tree that captures what versions are installed, it takes comparatively less effort for us to
find all the changes in one place. Note that it is also possible to traverse the single tree to build the dependencies graph, which I have a demo
about it in the final section. 

> And optimize the installation process by allowing npm to skip repeated metadata resolutions for previously-installed packages.

There are a few metadata attributes also captured during the `npm install` process. For example, the `bundled` metadata makes it possible to 
skip installing the dependencies that are already installed from another dependency by the parent module that is declared as `bundled: true`. 
There are some more metadata attributes that provide other useful information during the installation.


## Package-lock.json visualizer

With a single dependencies tree provided by the `package-lock.json` file, it is possible to traverse it and build the dependencies graph
based on the previously mentioned key attributes. We can start from the root module and do a depth first traversal, and for each node we visit,
add them to the node definition, and after visiting each node and its descendents, add the node-descendent relation to the edge definition. 

The graph layout algorithm is done by using <a target="_blank" href="https://github.com/dagrejs/dagre">Dagre</a>,
the renderer is done by using <a target="_blank" href="https://github.com/dagrejs/dagre-d3">DagreD3</a>,
and the zoom is done by using <a target="_blank" href="https://github.com/d3/d3-zoom">d3-zoom</a>.

The original algorithm is from the 
<a target="_blank" href="https://observablehq.com/@mbostock/package-lock-json-visualizer">Package-lock.json Visualizer</a> by 
<a target="_blank" href="https://observablehq.com/@mbostock">Mike Bostock</a>.

<style>
.control {
  display: flex;
  flex-direction: column;
}
.control > * {
  margin-bottom: 10px;
}
.control label {
  margin-right: 10px;
}
.control input {
  flex: 1 1 auto;
  font-size: 1rem;
}
#draw {
  max-width: 375px;
}
#visualizer {
  position: relative;
  background-color: aliceblue;
  border-radius: 4px;
}
#zoom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: yellow;
}
#loading {
  padding: 20px;
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
  <input id="url" type="text" value="https://raw.githubusercontent.com/zhenyanghua/zhenyanghua.github.io/master/package-lock.json"/>
  <small>If the size of the package-lock.json file is greater than 300KB, it may take a while for this renderer to draw all the SVG out. This is just for demonstration purpose, not meant for production.</small>
  <button id="draw">Draw the dependencies graph</button>
</div>
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
    const loading = document.createElement('div');    
    loading.setAttribute('id', 'loading');
    loading.innerHTML = 'Loading';
    const visualizer = document.querySelector('#visualizer');
    visualizer.innerHTML = '';
    visualizer.append(loading);
    await Promise.all([
      injectScript("https://unpkg.com/d3@6.3.1/dist/d3.min.js"),
      injectScript("https://www.unpkg.com/dagre-d3@0.6.4/dist/dagre-d3.min.js"),
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
    let svg;
    noZoom();
    svg = d3.select(visualizer).append('svg').attr('tabindex', '0')
      .on('click', zoom)
      .on('keydown', e => { if (['Enter', ' '].includes(e.key)) zoom() })
      .on('blur', noZoom)
      .on('keydown', e => { if (e.key === 'Escape') noZoom() });
    const group = svg.append('g');
    const render = new dagreD3.render();
    render(group, g);
    d3.selectAll('#loading').remove();
    group.attr('transform', 'translate(0, 100)');
    const w = g.graph().width + 40;
    const h = g.graph().height + 40;
    svg.attr('viewBox', [0, 0, w, h]);
    function zoom() {
      d3.selectAll('#zoom').remove();
      svg.call(d3.zoom().extent([[0, 0], [w, h]])
        .scaleExtent([1, 3])
        .on("zoom", ({transform}) => {
          group.attr("transform", transform);
        }));
    }
    function noZoom() {
      if (!document.getElementById('zoom')) {
        d3.select(visualizer).insert('div', ':first-child').attr('id', 'zoom').text('Click or tap to enable zoom');
      }
      if (svg) {
        svg.on('.zoom', null);
      }
    }
  }
  document.querySelector('#draw').addEventListener('click', draw);
})();
</script>



