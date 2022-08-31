const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const button = document.querySelector('#up');

let canvasSize;
let elementSize;
let randomN = Math.floor(Math.random() * (3-0));

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
button.addEventListener('click', randomNumber);


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
            console.log({row, rowIndex, col, colINdex, emoji});
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