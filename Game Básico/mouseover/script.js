
var canvas = document.querySelector('#canvas');

var context = canvas.getContext("2d");
var wCanvas = canvas.clientWidth;
var hCanvas = canvas.clientHeight;

canvas.addEventListener("mousemove", logMouse)

function logMouse(e) {
    const { offsetX, offsetY } = e;
    console.log(e.offsetX, e.offsetY)
    interceccaoElementomatrix(offsetX, offsetY)
}

// var matriz = [
//     [1,1,1,1,1],
//     [1,0,0,0,1],
//     [1,0,0,0,1],
//     [1,1,0,0,1],
//     [1,1,1,1,1]
// ]

var  matriz = [];
for (let x = 0; x < 10; x++) {
    matriz[x] = Array(10).fill(0)
}

function desenhaMatriz() {
    // randomizarPreenchimento()
    context.clearRect(0, 0, wCanvas, hCanvas)
    
    for (let x = 0; x < matriz.length; x++) {
        for (let y = 0; y < matriz[x].length; y++) {
            context.beginPath();
            if (matriz[x][y] === 0) {
                context.fillStyle = "#FFF"    
            }else{
                context.fillStyle = "#000"    
            }
            context.fillRect(
                x * (wCanvas / matriz.length), 
                y * (hCanvas / matriz[x].length),
                (wCanvas / matriz[x].length),
                (hCanvas / matriz.length));
        }   
    }
    requestAnimationFrame(desenhaMatriz);
}

function interceccaoElementomatrix(mouseX, mouseY) {
    for (let x = 0; x < matriz.length; x++) {
        for (let y = 0; y < matriz[x].length; y++) {
            const eleX = x * (wCanvas / matriz.length);
            const eleY = y * (hCanvas / matriz[x].length);
            const eleW = (wCanvas / matriz[x].length)
            const eleH = (hCanvas / matriz.length)
            
            if (
                (mouseX >= eleX && mouseX <= (eleX + eleW))
                &&
                (mouseY >= eleY && mouseY <= (eleY + eleH))
            ) {
                matriz[x][y] = 1;
                // context.beginPath();
                // context.rect(eleX, eleY, eleW, eleH);
                // context.fill();
            } else {
                matriz[x][y] = 0;
                // context.beginPath();
                // context.rect(eleX, eleY, eleW, eleH);
                // context.fillStyle = "#AAA"
                // context.fill();
                // context.stroke();
            }
        }   
    }
}

function randomizarPreenchimento() {
    for (let x = 0; x < matriz.length; x++) {
        for (let y = 0; y < matriz[x].length; y++) {
            matriz[x][y] = Math.round(Math.random())   
        }    
    }
}


function desenha() {
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(250,250);
    context.stroke();
}

function desenhaQuadrado(){

}

function aleatorio(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

// function loop() {
//     console.log(new Date());
// }

// // var timeInterval;
// // var timeTimeout;

// // timeInterval = setInterval(loop, 1000 / 60);
// // timeTimeout = setTimeout(loop, 5000);

// // setTimeout(()=>{
// //     clearTimeout(timeTimeout());
// //     console.log('Passou no timeout de 4000');
// // }, 6000)

// var animate = requestAnimationFrame(loop);

// function pararLoop() {
//     clearInterval(timeInterval);
//     console.log('Parando setInterval');
// }

desenhaMatriz();