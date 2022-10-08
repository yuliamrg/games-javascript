const canvas = document.querySelector('#game');
debugger
const game = canvas.getContext('2d');
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');

let canvasSize;
let elementSize;
let randomN = Math.floor(Math.random() * (3-0));

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', moveByKeys);

buttonUp.addEventListener('click', moveUp);
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
buttonDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    
        default:
            break;
    }
}

function moveUp() {
    console.log('arriba');
}
function moveLeft() {
    console.log('izquierda');
}
function moveRight() {
    console.log('derecha');
}
function moveDown() {
    console.log('abajo');
}


function randomNumber() {
    console.log('log');
    randomN = Math.floor(Math.random() * (3-0));
    setCanvasSize();
}

function startGame() {

    console.log({canvasSize, elementSize, randomN});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[randomN]; // elegir uno de los tres mapas
    const mapRows = map.trim().split(`\n`); // quitar los espacios con trim y convertir los strings en arrays cada salto de línea

    const mapColums = mapRows.map(row => row.trim().split('')); // crear un array dentro de los arrays que contiene por separado cada letra de los arrays originales

    mapColums.forEach((row, rowIndex) => {
        row.forEach((col, colINdex) => {
            const emoji = emojis[col];
            const xAxis = elementSize * (colINdex + 1) * 1.26
            const yAxis = elementSize * (rowIndex + 1) - 3;
            game.fillText(emoji, xAxis, yAxis);
        });       
    });
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