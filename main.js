const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
const enemypositions = [];



// Add event listeners

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', moveByKeys);

buttonUp.addEventListener('click', moveUp);
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
buttonDown.addEventListener('click', moveDown);


// funciones principales

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

function startGame() {
   // console.log({canvasSize, elementSize, level});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[level]; // elegir uno de los tres mapas

    if (!map) {
        gameWin();
        return;
    }

    const mapRows = map.trim().split(`\n`); // quitar los espacios con trim y convertir los strings en arrays cada salto de línea
    const mapColums = mapRows.map(row => row.trim().split('')); // crear un array dentro de los arrays que contiene por separado cada letra de los arrays originales

    if (enemypositions) {
        enemypositions.splice(0, enemypositions.length);
    }
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
            } else if (col == 'I') {
                if (!giftPosition.x && !giftPosition.y) {
                    giftPosition.x = xAxis;
                    giftPosition.y = yAxis;
                }
            } else if (col == 'X') {
                enemypositions.push({
                    x: xAxis,
                    y: yAxis,
                })
            }

            game.fillText(emoji, xAxis, yAxis);
        });       
    });

    movePlayer();
}

// funciones de apoyo

function movePlayer() {
    
    const gift = giftPosition.x.toFixed(3) === playerPosition.x.toFixed(3) && giftPosition.y.toFixed(3) === playerPosition.y.toFixed(3);

    const enemy = enemypositions.find(element => {
        const enemyX = element.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyY = element.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyX && enemyY;
    });


    if (gift) {
        levelWin();
        return;
    }
    if (enemy) {
        console.log('ouch!!!, un cocazo');
        levelFail();
    }


    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('llegaste a la playa');
    level++;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    giftPosition.x = undefined;
    giftPosition.y = undefined;
    startGame();
}

function levelFail() {
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    if (lives > 0) {
        lives--;
    } else {
        level = 0;
        lives =3;
        giftPosition.x = 0;
        giftPosition.y = 0;
    }
    console.log(lives);
    startGame();
}

function gameWin() {
    console.log('terminaste el juego');
}

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



