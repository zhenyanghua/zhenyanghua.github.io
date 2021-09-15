---
title: 'Implement the Lightning Algorithm'
date: '2021-09-15 09:27:00'
---
I was entertaining myself with the excellent video interviews from the NumberPhile project, a lightning algorithm interview from the creator of the visualization of the algorithm clearly explained the techniques used behind the scene. The explanation was so clear and the visualization was so satisfying that I felt impetuous to implement it. A few hours later, the moment of thought became realized. Here sharing a few steps that I learned from the interview and while implementing it. 
<!-- Excerpt End -->

## The Demo
<style>
    #demo-canvas {
        background: #020c21;
    }
</style>

<canvas id="demo-canvas" width="500px" height="500px"></canvas>
<div>
<button id="demo-reset">New Maze</button>
<button id="demo-solve">Solve</button>
<button id="demo-animate">Animate</button>
</div>

<script>
(function() {
const CELL_SIZE = 10;
const GRID_WIDTH = 48;
const GRID_HEIGHT = 48;
const TEMPO = 20;
const BACKGROUND = '#020c21';
const FOREGROUND = '#FFFF96';
const MAX_LAST_STEPS = 10;
const OFFSET = CELL_SIZE;

const canvas = document.getElementById('demo-canvas');
const btnReset = document.getElementById('demo-reset');
const btnSolve = document.getElementById('demo-solve');
const btnAnimate = document.getElementById('demo-animate');
const ctx = canvas.getContext('2d');

let walls;
let path = [];

walls = generateMaze();

btnReset.addEventListener('click', () => {
    clear();
    walls = generateMaze();
});

btnSolve.addEventListener('click', () => {
    run();
})

btnAnimate.addEventListener('click', () => {
    run(true)
})

// Generate a maze
function generateMaze() {
    path = [];
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

async function solve(animate) {
    clearAllNodes();
    const visited = new Map();
    let lastStep = 1;
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
            queue.push(node);
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
                lastStep = await drawNodes(visited);
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

async function run(animate) {
    clearPath(path);
    let winningNode = await solve(animate);
    if (winningNode) {
        path = [];
        while (winningNode) {
            path.push([winningNode.x, winningNode.y]);
            winningNode = winningNode.parent;
        }
        drawCenterLine(path)
    } else {
        warn();
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(OFFSET + x1 * CELL_SIZE, OFFSET + y1 * CELL_SIZE);
    ctx.lineTo(OFFSET + x2 * CELL_SIZE, OFFSET + y2 * CELL_SIZE);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function drawCenterLine(path, clear = false) {
    ctx.beginPath();
    for (let i = 0; i < path.length; i++) {
        const point = [OFFSET + (path[i][0] + 1 / 2) * CELL_SIZE, OFFSET + (path[i][1] + 1 / 2) * CELL_SIZE];
        if (i === 0) {
            ctx.moveTo(...point);
        } else {
            ctx.lineTo(...point);
        }
    }
    ctx.lineWidth = 4;
    ctx.strokeStyle = clear ? BACKGROUND : FOREGROUND;
    ctx.stroke();
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