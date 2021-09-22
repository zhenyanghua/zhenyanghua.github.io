---
title: 'Implement the Lightning Algorithm'
date: '2021-09-15 09:27:00'
---
I was entertaining myself with the excellent video interviews from the Numberphile project, a lightning algorithm interview from the creator of the visualization of the algorithm clearly explained the techniques used behind the scene. The explanation was so clear and the visualization was so satisfying that I felt impetuous to implement it. A few hours later, the moment of thought became realized. Here sharing a few steps that I learned from the interview and while implementing it. 
<!-- Excerpt End -->

<style>
    .slide:fullscreen .flex {
        display: flex;
    }

    .slide:fullscreen .flex > * {
        margin: 0 20px;
    }
</style>

!---

## The Demo
<style>
    #demo-canvas {
        background: #020c21;
    }
    #demo-buttons button {
        width: 100px;
        font-size: 1em;
    }
</style>

<canvas id="demo-canvas" width="500px" height="500px"></canvas>
<div id="demo-buttons">
    <button id="demo-reset">New Maze</button>
    <button id="demo-solve">Solve</button>
    <button id="demo-resume">Resume</button>
    <button id="demo-pause" hidden>Pause</button>
    <button id="demo-step">Step Over</button>
</div>

<script>
(function() {
const CELL_SIZE = 10;
const GRID_WIDTH = 48;
const GRID_HEIGHT = 48;
const TEMPO = 20;
const BACKGROUND = '#020c21';
const FOREGROUND = '#FFFF96';
const MAX_LAST_STEPS = 15;
const OFFSET = CELL_SIZE;

const canvas = document.getElementById('demo-canvas');
const btnReset = document.getElementById('demo-reset');
const btnSolve = document.getElementById('demo-solve');
const btnResume = document.getElementById('demo-resume');
const btnPause = document.getElementById('demo-pause');
const btnStep = document.getElementById('demo-step');
const ctx = canvas.getContext('2d');

let path = [];
let solver;
let timer;
let walls = generateMaze();

btnReset.addEventListener('click', () => {
    btnPause.click();
    clear();
    walls = generateMaze();
});

btnSolve.addEventListener('click', () => {
    solve();
});

btnResume.addEventListener('click', () => {
    btnResume.hidden = true;
    btnPause.hidden = false;
    resume();
});

btnPause.addEventListener('click', () => {
    btnPause.hidden = true;
    btnResume.hidden = false;
    pause();
});

btnStep.addEventListener('click', () => {
    stepOver();
});

// Generate a maze
function generateMaze() {
    path = [];
    solver = undefined;
    const set = new Set();
    for (let y = 0; y <= GRID_HEIGHT; y++) {
        for (let x = 0; x <= GRID_WIDTH; x++) {
            // drawPoint(x, y);
            if (x < GRID_WIDTH && !lucky()) {
                drawLine(x, y, x + 1, y);
                set.add(buildKey(x, y, x + 1, y));
            }
            if (y < GRID_HEIGHT && !lucky(true)) {
                drawLine(x, y, x, y + 1);
                set.add(buildKey(x, y, x, y + 1));
            }
        }
    }
    return set;
}

function* doSolve(animate) {
    clearAllNodes();
    const visited = new Map();
    let lastStep = 0;
    // solve the maze - BFS
    const queue = [];
    // 1. pretend there is a root node that is just one row above the first row,
    // all nodes on the first row that doesn't have the top wall should be added to
    // the queue.
    for (let x = 0; x < GRID_WIDTH; x++) {
        if (!hasWall(x, 0, x + 1, 0)) {
            const node = {
                x,
                y: 0,
                step: 1,
                parent: undefined,
                parentEdge: buildKey(x, 0, x + 1, 0)
            };
            // queue.push(node);
            createNodeIfNotVisited(node);
        }
    }

    // 2. For each node in the queue,
    // to determine whether a node has any children, check the walls set to see if
    // three other sides have walls, for each side that doesn't have a wall, create
    // a new node for the adjacent cell and add it to the queue.
    while (queue.length > 0) {
        const node = queue.shift();
        if (animate) {
            // when it gets to the next depth, redraw all nodes based on classification
            if (lastStep < node.step) {
                // lastStep = await drawNodes(visited);
                lastStep = [...visited.values()]
                    .map(node => node.step)
                    .reduce((prev, curr) => curr > prev ? curr : prev, 0);
                yield { lastStep, visited };
            }
        }
        const {x, y, step, parentEdge} = node;
        // reach the last row and if bottom is open
        if (y === GRID_HEIGHT - 1 && !hasWall(x, y + 1, x + 1, y + 1)) {
            clearNodes(visited);
            return node;
        }
        //top
        if (!hasWall(x, y, x + 1, y)
            && y > 0
            && buildKey(x, y, x + 1, y) !== parentEdge) {
            const child = {
                x,
                y: y - 1,
                step: step + 1,
                parent: node,
                parentEdge: buildKey(x, y, x + 1, y)
            };
            createNodeIfNotVisited(child);
        }
        //right
        if (!hasWall(x + 1, y, x + 1, y + 1)
            && x + 1 < GRID_WIDTH
            && buildKey(x + 1, y, x + 1, y + 1) !== parentEdge) {
            const child = {
                x: x + 1,
                y: y,
                step: step + 1,
                parent: node,
                parentEdge: buildKey(x + 1, y, x + 1, y + 1)
            };
            createNodeIfNotVisited(child);
        }
        //bottom
        if (!hasWall(x, y + 1, x + 1, y + 1)
            && y + 1 < GRID_HEIGHT
            && buildKey(x, y + 1, x + 1, y + 1) !== parentEdge) {
            const child = {
                x: x,
                y: y + 1,
                step: step + 1,
                parent: node,
                parentEdge: buildKey(x, y + 1, x + 1, y + 1)
            };
            createNodeIfNotVisited(child);
        }
        //left
        if (!hasWall(x, y, x, y + 1)
            && x > 0
            && buildKey(x, y, x, y + 1) !== parentEdge) {
            const child = {
                x: x - 1,
                y: y,
                step: step + 1,
                parent: node,
                parentEdge: buildKey(x, y, x, y + 1)
            };
            createNodeIfNotVisited(child);
        }
    }

    clearNodes(visited);

    function createNodeIfNotVisited(node) {
        const key = "[" + node.x + ", " + node.y + "]";
        if (!visited.has(key)) {
            visited.set(key, node);
            queue.push(node);
        }
    }

// 3. this algo should stop whenever the first node that has reached the bottom
// row, or when the queue is empty.
// when bottom is reached, back track the path of the current node.
// when queue is empty, restart the program.
}

/**
 * The solver generator consumer that does the drawing for each yield 
 * and relay the generator state.
 * @returns if the generator is done.
 */
async function doStepOver() {
    const result = solver.next();
    if (!result.done) {
        if (result.value) {
            const { visited, lastStep } = result.value;
            visited.forEach(node => {
                drawNodeByStep(node, lastStep);
            })
        }
    } else {
        btnReset.disabled = true;
        await drawPathBackTrack(result.value);
        // dispose
        solver = undefined;
        timer = undefined;
        // restore UI state
        btnPause.hidden = true;
        btnResume.hidden = false;
    }
    return result.done;
}

async function run(animate) {
    if (!solver) {
        clearPath(path);
        solver = doSolve(animate);
    }
    if (!(await doStepOver())) {
        timer = setTimeout(async () => { await run(animate) }, TEMPO);
    }
}

async function solve() {
    btnSolve.disabled = true;
    btnReset.disabled = true;
    pause();
    clearPath(path);
    solver = doSolve(false);
    await doStepOver();
    btnSolve.disabled = false;
    btnReset.disabled = false;
}

function resume() {
    // disallow resume when it is not paused.
    if (!timer) {
        run(true);
    }
}

function pause() {
    if (timer) {
        clearTimeout(timer);
        timer = undefined;
    }
}

async function stepOver() {
    if (!solver) {
        clearPath(path);
        solver = doSolve(true);
    }
    // disallow step over when is not paused.
    if (!timer) {
        btnStep.disabled = true;
        await doStepOver();
        btnStep.disabled = false;
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(OFFSET + x1 * CELL_SIZE, OFFSET + y1 * CELL_SIZE);
    ctx.lineTo(OFFSET + x2 * CELL_SIZE, OFFSET + y2 * CELL_SIZE);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

async function drawCenterLine(path, clear = false) {
    // draw the path from bottom to top
    ctx.lineWidth = 4;
    ctx.strokeStyle = clear ? BACKGROUND : FOREGROUND;
    ctx.beginPath();
    for (let i = 0; i < path.length; i++) {
        const point = [OFFSET + (path[i][0] + 1 / 2) * CELL_SIZE, OFFSET + (path[i][1] + 1 / 2) * CELL_SIZE];
        if (i === 0) {
            // draw the bottom end
            ctx.moveTo(point[0], point[1] + CELL_SIZE / 2);
        }

        if (clear) {
            ctx.lineTo(...point)
            ctx.stroke();
        } else {
            // animate the lightening travel from ground back to the sky
            await new Promise(resolve => {
                setTimeout(() => {
                    ctx.lineTo(...point)
                    ctx.stroke();
                    resolve();
                }, TEMPO / 1000);
            });
        }

        // draw the top end
        if (i === path.length - 1) {
            ctx.lineTo(point[0], point[1] - CELL_SIZE / 2)
            ctx.stroke();
        }
    }

    ctx.lineWidth = 1;
}

/**
 *
 * @param nodes
 * @return {Promise<*>} the current max step
 */
async function drawNodes(nodes) {
    return new Promise(resolve => {
        setTimeout(() => {
            const maxStep = [...nodes.values()]
                .map(node => node.step)
                .reduce((prev, curr) => curr > prev ? curr : prev, 0);
            // do the drawing here
            nodes.forEach(node => {
                drawNodeByStep(node, maxStep);
            })
            resolve(maxStep);
        }, TEMPO);
    });
}

function drawNodeByStep(node, maxStep) {
    ctx.beginPath()
    ctx.rect(OFFSET + node.x * CELL_SIZE + 2, OFFSET + node.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    // clear
    ctx.fillStyle = BACKGROUND;
    ctx.fill();
    // draw new - only color the last 5 steps.
    ctx.fillStyle = maxStep - node.step < MAX_LAST_STEPS ? "rgba(255, 255, 150, " + (1 - (maxStep - node.step) / MAX_LAST_STEPS) + ")" : BACKGROUND;
    ctx.fill();
    ctx.fillStyle = 'white';
}

async function drawPathBackTrack(node) {
    let winningNode = node
    
    if (winningNode) {
        path = [];
        while (winningNode) {
            path.push([winningNode.x, winningNode.y]);
            winningNode = winningNode.parent;
        }
        await drawCenterLine(path)
        clearPath(path);
        await drawCenterLine(path)
    } else {
        warn();
    }
}

function clearNodes(nodes) {
    nodes.forEach(clearNode);
}

function clearNode(node) {
    ctx.beginPath()
    ctx.rect(OFFSET + node.x * CELL_SIZE + 2, OFFSET + node.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    // clear
    ctx.fillStyle = BACKGROUND;
    ctx.fill();
    ctx.fillStyle = 'white';
}

// repaint all nodes but leave maze alone
function clearAllNodes() {
    for (let y = 0; y < GRID_HEIGHT - 1; y++) {
        for (let x = 0; x < GRID_WIDTH - 1; x++) {
            clearNode({x, y});
        }
    }
}

function clearPath(path) {
    drawCenterLine(path, true);
}

function buildKey(x1, y1, x2, y2) {
    return "[" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + "]";
}

/**
 * Predicate function that is determined by probability.
 * @param very {boolean}
 *  indicates a higher probability when true
 * @return {boolean}
 */
function lucky(very = false) {
    return Math.floor(Math.random() * (very ? 8 : 6)) + 1 <= 4;
}

function hasWall(x1, y1, x2, y2) {
    return walls.has(buildKey(x1, y1, x2, y2));
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function warn() {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.fillStyle = 'white';
}
})()
</script>

!---

!---

## Generate a maze

We start by creating a grid that shows only points so that we could connect them based on a certain probability.

![Grid base](!grid-base.png)

!---

!---

We will then create walls in the grid. The lightning algorithm is to mimic how a lightning strike travels - from top to bottom. To make sure in most of the time, our maze provides a path from top to bottom, horizontal walls should be fewer than the vertical walls. To get there, we need to create a utility function to control the probability interval.

```javascript
/**
 * Predicate function that is determined by probability.
 * @param very {boolean}
 *  indicates a higher probability when true
 * @return {boolean}
 */
function lucky(very = false) {
    return Math.floor(Math.random() * (very ? 8 : 6)) + 1 <= 4;
}
```

<div class="flex">

In the above `lucky(very)` function, we create probability that is 4/8 when low and 4/6 when high;

![There are more vertical walls then horizontal walls](!generate-walls.png)

</div>

!---

!---

## Solve a maze

Solving a maze is as simple as a breadth first search algorithm. With the use of a queue, we could carry out the search one level at a time. We can imagine there is a pseudo root node above the first row with `step = 0`, for each adjacent cell that is not blocked by walls, we could mark them as the next step until we get to the bottom of the maze if the bottom doesn't have a wall. 

![Maze with steps marked](!walls-steps-marked.png)

!---

!---

Finally we backtrack the path:

<div class="flex">

![Backtracked path](!backtracked.png)

![Solved path](!solved.png)

</div>

!---

!---

## Animate it

We could fill visited cells by classification based on the steps it takes to get to them (the depth of the node), but if the maze is very long, the screen will eventually and most likely full of colored cells. In the original algorithm, only the most recent few steps are shown and this is what we will be doing here as well. We create a color ramp that shows only the last few steps with gradience. When we get to the bottom of it, clear all the transitional cells and draw the lightning bolt with some cool color. 

<div class="flex">

![Lightning moving downwards](!moving.png)

![Lightning touches ground](!bolt.png)

</div>
!---

!---

## Lightning algorithm video interview

To get inspired, try the Numberphile project which hosts [the original interview](https://youtu.be/akZ8JJ4gGLs).

!---


!--!