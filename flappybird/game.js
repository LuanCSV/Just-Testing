import Images from './Images.js';
import Pipe from './Pipe.js';
import Player from './Player.js';

var canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext('2d');
var players = [];
var playersDead = [];
var pipes = [];
var playerSelected;
var frame = 0;
var gravity = 0.4;
var speedGame = 0;
var speedGameOff = 0;
var xBack = 0;
var xFloor = 0;
var playersAlive;
var friction = 0.2;

var speedGameOn = 3;
var JumpPower = 7;
var spaceBetwwenPipes = 110;

var points = document.getElementById('points');
var pontos = 0;


var lineGapPipeY = 0;
var lineGapPipeX = 0;

var numPlayers = 200;
var autoMove = false;

document.querySelector('#startGame').addEventListener('click', createControlPlayer);
document.querySelector('#startPopulation').addEventListener('click', createPlayers);
// document.querySelector('#addPipe').addEventListener('click', createPipe);
document.addEventListener('keydown', sendCommandToPlayer);
// Images
const { ImgBackground, ImgBase } = Images;

function init() {
    animate();
}

function startGame() {
    players = [];
    playersDead = [];
    pipes = [];
    pontos = 0;
}

function createControlPlayer() {
    autoMove = false;
    startGame();
    playerSelected = createPlayer();
}


function sendCommandToPlayer(e) {
    if(playerSelected && playerSelected.alive) {
        const key = e.code;
        const keysAccepted = ["ArrowUp", "KeyW"];
        const command = keysAccepted[keysAccepted.indexOf(key)];
        if (command) {
            const execution = {
                ArrowUp(){
                    playerSelected.jump(JumpPower);
                },
                KeyW(){
                    playerSelected.jump(JumpPower);
                }
            }
            execution[command]();
        }
    }
}

function createPlayer() {
    const p = new Player();
    players.push(p);

    return p;
}

function createPlayers() {
    startGame();
    autoMove = true;
    for (let x = 0; x < numPlayers; x++) {
        createPlayer();
        
    }
}


function createPipe() {
    let p = new Pipe();
    pipes.push(p);

    //  Add Mirror to pipe
    let p2 = new Pipe();
    p2.x = p.x;
    p2.y = p.y;
    p2.mirror = true;
    p2.y -= [p.h + spaceBetwwenPipes];
    pipes.push(p2);
}

function drawBackground() {
    ctx.beginPath();
    for (let x = 0; x < 3 +(xBack / 288 * -1); x++) {
        ctx.drawImage(ImgBackground, xBack + (288*x), 0, 288, 512);
    }

    ctx.closePath(); 
    xBack -= speedGame / 3;
}

function drawFloor() {
    ctx.beginPath();
    for (let x = 0; x < 3 + (xFloor / 336 * -1); x++) {
        ctx.drawImage(ImgBase, xFloor + (336 * x), (canvas.height - 112), 336, 112);
    }
    ctx.closePath();
    xFloor -= speedGame;
}

function drawPlayers() {
    for(const i in players){
        const p = players[i];
        if (p.alive) {
            p.distance += speedGame;
        }
        
        // Asas animadas
        if (frame % 5 === 0 && p.alive) {
            if (p.spriteActive+1 > p.sprites[p.spriteSelected].length-1) {
                p.spriteActive = 0;
            } else {
                p.spriteActive ++;
            }
        }  
        const img = p.sprites[p.spriteSelected][p.spriteActive];

        ctx.beginPath();
        ctx.drawImage(img, p.x, p.y, p.w, p.h);
        ctx.closePath();

        // Remove players
        if (!p.alive) {
            p.x -= speedGame;
            if (p.x + p.w < -10) {
                playersDead.push(p);
                players.splice(i, 1);
            }
        }
    }
}

function drawPipes() {
    for (const i in pipes) {
        let p = pipes[i];
        p.x -= speedGame;
        const img = p.sprites[p.spriteActive];
        ctx.beginPath();
        if (p.mirror) {
            ctx.save();
            ctx.scale(1, -1);
            ctx.drawImage(img, p.x, (p.y *-1) - p.h, p.w, p.h);
            ctx.restore();
        }else{
            ctx.drawImage(img, p.x, p.y, p.w, p.h);
        }
        ctx.closePath();
    }
}

function verifyCollisions() {
    playersAlive = 0;
    for (const p of players) {
        if (p.alive) {
            playersAlive++;
            if ((p.y + p.h) > canvas.height - 112) {
                p.alive = false;

                
            } else {
                
                const pipe = getNextPipe(p);
                if (pipe) {
                    const cPipe0 = collisionPipe(p, pipe[0]);
                    const cPipe1 = collisionPipe(p, pipe[1]);
                    if (cPipe0 || cPipe1) {
                        p.alive = false;

                    }
                }
            }
        }
    }
}

function collisionPipe(player, pipe) {
    const {x, y, w ,h} = player;
    if (y < 0) {
        return true;
    }
    const px = pipe.x;
    const py = pipe.y;
    const pw = pipe.w;
    const ph = pipe.h;

    const intersectX = intersect(x + w, px, (px+ pw)) || intersect(x, px, (px+pw));
    const intersectY = intersect(y + h, py, (py+ ph)) || intersect(y, py, (py+ph));

    if (intersectX && intersectY) {
        return true;
    }
    return false;
}

function intersect(num, start, end) {
    return (num >= start && num <= end);
}

function getNextPipe(player) {
    let pipeReturn = null;
    let index = null;
    for (const i in pipes) {
        let p = pipes[i];
        if (!p.mirror) {
            if ((player.x < (p.x + p.w))) {
                if (!pipeReturn) {
                  pipeReturn = p;
                  index = i;
                }
                if ( ( (p.x + p.w) < (pipeReturn.x + pipeReturn.w) ) ) {
                    pipeReturn = p;
                    index = i;
                }
            }
        }
    }

    if (pipeReturn) {
        return [pipeReturn, pipes[parseInt(index)+ 1]];
    }else {
        return null;
    }
}

function activateGravity() {
    for (const p of players) {
        if ((p.y + p.h + p.dy) > canvas.height - 112) {
            p.dy = -p.dy;
            p.dy = p.dy * friction;
        } else {
            p.dy += gravity;
        }
        p.y += p.dy;
    }
}

function isRunning() {
    if (playersAlive > 0) {
        speedGame = speedGameOn;
        
        if (frame % 70 === 0) {
            pontos++;
            createPipe();
        }
    } else {
        if (autoMove) {
            generateNewPopulation(playersDead);
        }
        speedGame = speedGameOff;
    }
}

function generateNewPopulation(playersDead) {
    if (speedGame !== speedGameOff) {
        // const clone = [...playersDead];
        // console.log(clone);
        let bestPlayers = playersDead.sort(dynamicSort("distance", "desc"));
        if (bestPlayers.length > 0) {
            startGame();
            for (let x = 0; x < numPlayers/2; x++) {
                let p = createPlayer();
                p.brain = bestPlayers[0].brain;
                p.brain.mutation(0.05);
            }
            for (let x = 0; x < numPlayers/2; x++) {
                createPlayer();
            }
        }
    }
}

function dynamicSort(property, order) {
    var sort_order = 1;
    if (order === "desc") {
        sort_order = -1;
    }
    return (a,b) => {
        if (a[property] < b[property]) {
            return -1 * sort_order;
        } else if (a[property] > b[property]){
            return 1 * sort_order;
        } else {
            return 0 * sort_order;
        }
    }
}

function calculatePlayersPositions() {
    for (const i in players) {
        let p = players [i];
        let pipe = getNextPipe(p);

        if (pipe) {
            let gap = (pipe[0].y - (pipe[1].y + pipe[1].h));
            ctx.beginPath();
            let targetY = pipe[0].y - ((gap/2)-10) -(p.h/2);
            let targetX = pipe[0].x - (pipe[0].w/2) + (p.w);
            lineGapPipeY = targetY;
            lineGapPipeX = targetX;
            p.sensor.x = Math.ceil(p.x - targetX);
            p.sensor.y = Math.ceil(p.y - targetY);

        }
    }
}

function drawLine() {
    ctx.beginPath();
    ctx.fillStyle = '#f00'
    ctx.fillRect(0, lineGapPipeY, 288, 2);
    ctx.fillRect(lineGapPipeX, 0, 2, 580);
    ctx.closePath();
}

function autoMovePlayers() {
    for (const i in players) {
        let p = players[i];
        if(p.alive){
            let input = [p.sensor.x, p.sensor.y];
            let resultNN = p.brain.predict(input, 'reLU');

            if (resultNN[0] > 0) {
                p.jump(JumpPower);
            }
        }
    }
}

function animate() {
    requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        activateGravity();
        calculatePlayersPositions();
        if (autoMove) {
            autoMovePlayers();
        }
        verifyCollisions();
        drawBackground();
        drawPipes();
        drawFloor();
        drawPlayers();
        isRunning();
        drawLine();


        points.innerText = pontos;
        // loop
        frame++;
        animate();
    })
}

init();