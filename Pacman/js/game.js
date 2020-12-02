import Fruit from "./Fruits.js";
import Player from "./Player.js";

var canvas = document.querySelector('#screen');
var remainingMovesEle = document.querySelector('#remaining_moves');
var pointsEle = document.querySelector('#points');
var generationEle = document.querySelector('#generation');
var genomeEle = document.querySelector('#genome');

var ctx = canvas.getContext("2d");
var player = new Player('orange', 20, 30);
var fruits = [];
var qtyFruits = 5;
var nearestFruit = null;

var limitMoves = 60;
var generation = 0;

var tAutoPlay = null;
var timeRepeatAutoPlay = 50;
var datasetTraining = {i:[], o:[]};
var genome = null;

document.addEventListener('keydown', keyBoardEvent);
document.querySelector('#startAutoPlay').addEventListener('click', startAutoPlay);
document.querySelector('#stopAutoPlay').addEventListener('click', stopAutoPlay);
document.querySelector('#loadGenome').addEventListener('click', loadGenome);

function init() {
    animate();
    startGame();
}


function loadGenome(){
    let genomeString = document.querySelector('#genome').value;
    if (player.isAlive){
        let genome = JSON.parse(genomeString);
        Object.keys(genome).forEach((key) => {
            player.brain[key] = genome[key]
        })
    }
}

function startAutoPlay(){
    tAutoPlay = setInterval(()=>{
        autoMovePlayer();
        if(fruits.length === 0){
            addFruits();
            checkFruitsPosition();
        }
    },timeRepeatAutoPlay);
}

function stopAutoPlay(){
    clearInterval(tAutoPlay);
}

function startGame() {
    fruits = [];   
    generation++;
    addPlayer();
    addFruits();
    checkFruitsPosition();
}

function addPlayer(){
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    player = new Player('orange',x,y);
    if(genome) {
        player.brain = genome;
    }
    genomeEle.innerHTML = JSON.stringify(player.brain);
    for(const index in datasetTraining.i){
        player.brain.train(datasetTraining.i[index], datasetTraining.o[index]);
    } 
}

function addFruits() {
    for (let x = 0; x < qtyFruits; x++) {
        addFruit();
    }
}

function autoMovePlayer(){
    const moves = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
    if (player.isAlive && nearestFruit){
        const inputNN = [nearestFruit.sensor.x, nearestFruit.sensor.y];
        const resultNN = player.brain.predict(inputNN);
        const resultNNIndexMax = resultNN.indexOf(Math.max(...resultNN))

        let outputNN = [];
        if (resultNNIndexMax === 0){
            outputNN = [1,0,0,0];
        } else if (resultNNIndexMax === 1){
            outputNN = [0,1,0,0];
        } else if (resultNNIndexMax === 2){
            outputNN = [0,0,1,0];
        } else if (resultNNIndexMax === 3){
            outputNN = [0,0,0,1];
        }

        movePlayer({keyPressed: moves[resultNNIndexMax]});
        player.dataset.i.push(inputNN);
        player.dataset.o.push(outputNN);
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
        genome = player.brain;
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

        datasetTraining = {i:[], o:[]};
        const inputsRepeat = [];
        for (const x in player.dataset.i){
            const dx = player.dataset.i[x][0];
            const moveX = (dx < 0) ? [0,1,0,0] : [0,0,0,1];
            const dy = player.dataset.i[x][1];
            const moveY = (dy < 0) ? [0,0,1,0] : [1,0,0,0];

            const valuesXYabs = [Math.abs(dx), Math.abs(dy)];
            const maxIndex = valuesXYabs.indexOf(Math.max(...valuesXYabs));
            const outputs = [moveX, moveY];

            if(inputsRepeat.indexOf(player.dataset.i[x].join(',')) === -1){
                inputsRepeat.push(player.dataset.i[x].join(','));
                datasetTraining.i.push(player.dataset.i[x]);
                datasetTraining.o.push(outputs[maxIndex]);
            }
        }
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
        if (nearestFruit && nearestFruit.id === f.id) {
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
