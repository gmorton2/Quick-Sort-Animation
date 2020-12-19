let inputs = [];
let w = 10;

let states = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    inputs = new Array(floor(width / w));

    for (let i = 0; i < inputs.length; i++) {
        inputs[i] = random(height);
        states[i] = -1;
    }
    quickSort(inputs, 0, inputs.length - 1);
}

async function quickSort(a, begin, end) {
    if (begin >= end) {
        return;
    }
    let index = await partition(a, begin, end);
    states[index] = -1;

    await Promise.all([
        quickSort(a, begin, index - 1),
        quickSort(a, index + 1, end)
    ]);
}

async function partition(a, begin, end) {
    for (let i = begin; i < end; i++) {
        states[i] = 1;
    }

    let pivotValue = a[end];
    let pivotIndex = begin;
    states[pivotIndex] = 0;
    for (let i = begin; i < end; i++) {
        if (a[i] < pivotValue) {
            await swap(a, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swap(a, pivotIndex, end);

    for (let i = begin; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }

    return pivotIndex;
}

function draw() {
    background(0);

    for (let i = 0; i < inputs.length; i++) {
        noStroke();
        if (states[i] == 0) {
            fill('#E0777D');
        }
        else if (states[i] == 1) {
            fill('#D6FFB7');
        }
        else {
            fill(255);
        }
        rect(i * w, height - inputs[i], w, inputs[i]);
    }
}

async function swap(arr, a, b) {
    await sleep(50);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}