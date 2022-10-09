const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');

let canvasSize;
let elementSize;
let randomN = Math.floor(Math.random() * (3-0));

const playerPosition = {
    x: undefined,
    y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', moveByKeys);

buttonUp.addEventListener('click', moveUp);
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
buttonDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowUp': moveUp();
            break;
        case 'ArrowLeft': moveLeft();
            break;
        case 'ArrowRight': moveRight();
            break;
        case 'ArrowDown': moveDown();
            break;
    }
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp() {
    if ((playerPosition.y - elementSize) < 0) {
        console.log('cristo Lord');
    } else {
        playerPosition.y -= elementSize;
        startGame()
    }
}
function moveLeft() {
    if ((playerPosition.x - elementSize) < elementSize) {
        console.log('muy mamerto');
    } else {
        playerPosition.x -= elementSize;
        startGame()
    }
}
function moveRight() {
    if ((playerPosition.x + elementSize) > canvasSize + elementSize) {
        console.log('muy paraco');
        
    } else {
        playerPosition.x += elementSize;
        startGame()
    }
}
function moveDown() {
    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log('er diablo');
    } else {
        playerPosition.y += elementSize;
        startGame()
    }
}


function randomNumber() {
    randomN = Math.floor(Math.random() * 3);
    console.log(randomN);
    setCanvasSize();
}

function startGame() {
    console.log({canvasSize, elementSize, randomN});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[randomN]; // elegir uno de los tres mapas
    const mapRows = map.trim().split(`\n`); // quitar los espacios con trim y convertir los strings en arrays cada salto de línea

    const mapColums = mapRows.map(row => row.trim().split('')); // crear un array dentro de los arrays que contiene por separado cada letra de los arrays originales

    game.clearRect(0,0, canvasSize, canvasSize);
    mapColums.forEach((row, rowIndex) => {
        row.forEach((col, colINdex) => {
            const emoji = emojis[col];
            const xAxis = elementSize * (colINdex + 1.2);
            const yAxis = elementSize * (rowIndex + 0.9);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = xAxis;
                    playerPosition.y = yAxis;
                }
            }

            game.fillText(emoji, xAxis, yAxis);
        });       
    });

    movePlayer();
};

function setCanvasSize() {

    if(window.innerHeight > innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10.1;

    startGame();
}