// sketch.js

const tiles = [];
const Wtile = 100;
const DIM = 5;
let isMouseDown = false;

function preload() {
    tiles[0] = loadImage("blank.png");
    tiles[1] = loadImage("up.png");
    tiles[2] = loadImage("right.png");
    tiles[3] = loadImage("down.png");
    tiles[4] = loadImage("left.png");
}

function setup() {
    createCanvas(DIM * Wtile, DIM * Wtile);
    grid = createGrid(DIM);
}

function draw() {
    background(0);
    for (let i = 0; i < 5; i++) {
        image(tiles[i], Wtile * i);
    }

    canvas.mousePressed = () => {
        isMouseDown = true;
    };
    canvas.mouseReleased = () => {
        if (isMouseDown) {
            printGrid(grid);
            isMouseDown = false;
        }
    };
}

function createGrid(size) {
    const grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = [0,1,2,3,4];
        }
    }
}

function entropy(grid) {
    let totalEntropy = 0;
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const cellEntropy = calculateCellEntropy(grid[i][j]);
            totalEntropy += cellEntropy;
        }
    }
    return totalEntropy;
}

function calculateCellEntropy(possibleTiles) {
    const totalTiles = possibleTiles.length;
    let entropy = 0;

    for (const tile of possibleTiles) {
        const probability = 1 / totalTiles; // Assuming equal probability for each tile
        entropy -= probability * Math.log2(probability);
    }

    return entropy;
}

function printGrid(grid) {
    console.table(grid);
}