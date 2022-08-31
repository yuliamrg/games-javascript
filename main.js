const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


function startGame() {

    console.log({canvasSize, elementSize});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            const array = maps[Math.floor(Math.random() * (3-1) + 1)];
            console.log(array);
            game.fillText (emojis['X'], elementSize * j * 1.26, elementSize * i - 3);
        }
    }
    
    

//     // game.fillRect(0,0,100,100);
//     game.fillRect(0,0,100,100);
//     game.clearRect(50,500,50,50);
//     game.font = '25px Verdana';
//     game.fillStyle = 'purple';
//     game.textAlign = 'center';
//     game.fillText('Platzi', 25, 25);
};

function setCanvasSize() {

    if(window.innerHeight > innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    startGame();
}