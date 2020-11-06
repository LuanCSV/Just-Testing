import Fruit from "./Fruits.js";
import Player from "./Player.js";

var canvas = document.querySelector('#screen');
var remainingMovesEle = document.querySelector('#remaining_moves');
var pointsEle = document.querySelector('#points');
var generationEle = document.querySelector('#generation');

var ctx = canvas.getContext("2d");
var player = new Player('orange', 20, 30);
var fruits = [];
var qtyFruits = 5;
var nearestFruit = null;

var limitMoves = 20;
var generation = 0;

document.addEventListener('keydown', keyBoardEvent);

function init() {

    startGame();
    animate();
}

function startGame() {
    fruits = [];
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);    
    player = new Player('orange', x, y);
    generation++;

    addFruits();
    checkFruitsPosition();
}

function addFruits() {
    for (let x = 0; x < qtyFruits; x++) {
        addFruit();
    }
}

function addFruit() {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    const fruit = new Fruit('green', x, y);
    fruits.push(fruit);
}

function checkFruitsPosition() {
    player.sensor.fruits = [];
    for (const f of fruits) {
        const fruit = { ...f };
        const {x:px, y:py} = player;
        const {x:fx, y:fy} = fruit;
        //fazendo calculo dentro da fruta, criando um atributo dentro do fruit
        fruit["sensor"] = {};
        // crianjdo um atributo dentro de um atributo
        fruit["sensor"]["x"] = (px-fx);
        fruit["sensor"]["y"] = (py-fy);
        //Math.abs transforma o negativo em positivo
        fruit["sensor"]["distance"] = Math.abs(fruit["sensor"]["x"]) + Math.abs(fruit["sensor"]["y"]);
        player.sensor.fruits.push(fruit);
    }
    nearestFruit = getNearestFruit();
}

function getNearestFruit() {
    const fruits = [ ...player.sensor.fruits];
    fruits.sort(sortFruitsByDistance);

    function sortFruitsByDistance(a,b) {
        return (a.sensor.distance > b.sensor.distance) ?
         1 : ((b.sensor.distance > a.sensor.distance) ? -1 : 0);
    }

    return fruits[0];
}

function keyBoardEvent(e) {
    if (player && player.isAlive) {
        const key = e.code;
        const moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (moves[moves.indexOf(key)]) {
            movePlayer({ keyPressed: key})
        }
    }
}

function movePlayer(cmd) {
    const execution = {
        ArrowUp() {
            if (player.y - 1 >= 0) {
                player.y -= 1;
            }
        },
        ArrowDown() {
            if (player.y + 1 < canvas.height) {
                player.y += 1;
            }
        },
        ArrowLeft() {
            if (player.x - 1 >= 0) {
                player.x -= 1;
            }
        },
        ArrowRight() {
            if (player.x + 1 < canvas.width) {
                player.x += 1;
            }
        }
    }
    const move = execution[cmd.keyPressed];
    if (player && move) {
        move();
        
        updatePlayerAttributes();
        checkIsPlayerAlive();
    }

}

function updatePlayerAttributes() {
    player.moves++;
    console.log(player.moves);
    checkCollisionFruit();
    checkFruitsPosition();
}

function checkCollisionFruit() {
    for (const fruit of fruits) {
        if (fruit.x === player.x && fruit.y === player.y) {
            player.hitFruits++;
            player.moves = 0;
            removeFruit(fruit);
        }
    }
}

function checkIsPlayerAlive() {
    if (player.moves >= limitMoves) {
        player.isAlive = false;
        console.log('morreu');
    }
}

function removeFruit(fruit) {
    let index = null;
    for (const i in fruits) {
        let f = fruits[i];
        if (fruit.id === f.id) {
            index = i;
        }
    }
    fruits.splice(index, 1);
}

function gameHasFinished() {
    if (!player.isAlive) {
        startGame();
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, 1, 1);
    ctx.closePath();
}

function drawFruits() {
    ctx.beginPath();
    for (const f of fruits) {
        ctx.fillStyle = f.color;

        //comparando id, nearestfruits ja foi populado, e o f.id vai 
        if (nearestFruit.id === f.id) {
            ctx.fillStyle = 'yellowgreen'
        }

        ctx.fillRect(f.x, f.y, 1, 1);
    }
    ctx.closePath();
}

function animate() {
    requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawPlayer();
        drawFruits();
        gameHasFinished();

        pointsEle.innerText = player.hitFruits;
        remainingMovesEle.innerText = (limitMoves - player.moves);
        generationEle.innerText = generation;
        // loop
        animate();
    });

}

init();
