import Images from './Images.js';
import Player from './Player.js';


var canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext('2d');
var players = [];
var playerSelected;
var frame = 0;
var gravity = 0.4;
var friction = 0.2;

document.querySelector('#startGame').addEventListener('click', createControlPlayer);
// Images
const { ImgBackground, ImgBase } = Images;

function init() {
    animate();
}

function createControlPlayer() {
    playerSelected = createPlayer();
}

function createPlayer() {
    const p = new Player();
    players.push(p);
    return p;
}

function drawBackground() {
    ctx.beginPath();
    ctx.drawImage(ImgBackground, 0, 0, 288, 512);
    ctx.closePath();
}

function drawFloor() {
    ctx.beginPath();
    ctx.drawImage(ImgBase, 0, (canvas.height - 112), 336, 112);
    ctx.closePath();
}

function drawPlayers() {
    for(const i in players){
        const p = players[i];
        
        // Asas animadas
        if (frame % 5 === 0) {
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

function animate() {
    requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(`ok`);
        activateGravity();
        drawBackground();
        drawFloor();
        drawPlayers();





        // loop
        frame++;
        animate();
    })
}

init();