
var canvas = document.querySelector('#canvas');
var context = canvas.getContext("2d");
var wCanvas = canvas.clientWidth;
var hCanvas = canvas.clientHeight;

var pontuacao = 0;
var pontuacaoEl = document.querySelector('#pontuacao');
var posicaoXelemento = document.querySelector('#posicaoX');
var posicaoYelemento = document.querySelector('#posicaoY');

document.body.addEventListener("keyup", eventoTeclado);
canvas.addEventListener("mousedown", eventoMouse);

var matrizAreaJogo = [];

var tamanhos = {
    w: 20,
    h: 20
}

var rangePosicoesX = Array(wCanvas/tamanhos.w).fill(0).map((v, i) => {
    return i * tamanhos.w;
})
var rangePosicoesY = [...rangePosicoesX];


// Definindo area do labirinto


//Definindo o Player
const player = {
    x: 200,
    y: 200,
    w: tamanhos.w, 
    h: tamanhos.h, 
    color: "#F05"
}

//Definindo a comida
const comida = {
    x: 300,
    y: 200,
    w: tamanhos.w, 
    h: tamanhos.h, 
    color: "#D0F"
}

function eventoTeclado(e) {
    const teclaPressionada = e.key;
    const teclasPermitidas = [
        "ArrowUp",
        "ArrowLeft",
        "ArrowDown",
        "ArrowRight"
    ];

    if(teclasPermitidas.includes(teclaPressionada)) {
        // console.log(teclaPressionada, "- Ok");
        movimenta(teclaPressionada);
        // switch (teclaPressionada) {
        //     case "ArrowUp":
        //         if (player.y > 50) {
        //             player.y -= 50;
        //         }
        //         break;
        //     case "ArrowDown":
        //         if (player.y < 400) {
        //             player.y += 50;
        //         }
        //         break;
        //     case "ArrowLeft":
        //         if (player.x > 50) {
        //             player.x -= 50;
        //         }
        //         break;
        //     case "ArrowRight":
        //         if (player.x < 400) {
        //             player.x += 50;
        //         }
        //         break;
        //     default:
        //         break;
        // }
    }else{
        console.log("Tecla não permitida: " + teclaPressionada);
    }
}

function eventoMouse(e) {
    const {offsetX, offsetY} = e;
    console.log(e.offsetX)
    console.log(e.offsetY)
    for (let x = 0; x < rangePosicoesX.length; x++) {
        for (let y = 0; y < rangePosicoesY.length; y++) {
            if (
                    (offsetX >= rangePosicoesX[x] 
                    && 
                    offsetX <= (rangePosicoesX[x] + tamanhos.w))
                    &&
                    (offsetY >= rangePosicoesY[y]
                    &&    
                    offsetY <= (rangePosicoesY[y]+ tamanhos.h))
                ) {
                matrizAreaJogo.push({
                    w: tamanhos.w,
                    h: tamanhos.h,
                    x: rangePosicoesX[x],
                    y: rangePosicoesY[y]
                })
            }
            
        }
        
    }
}

labirinto = `"[{"w":20,"h":20,"x":100,"y":100},{"w":20,"h":20,"x":100,"y":140},{"w":20,"h":20,"x":240,"y":100},{"w":20,"h":20,"x":200,"y":140},{"w":20,"h":20,"x":140,"y":80},{"w":20,"h":20,"x":140,"y":100},{"w":20,"h":20,"x":160,"y":140},{"w":20,"h":20,"x":140,"y":120},{"w":20,"h":20,"x":140,"y":140},{"w":20,"h":20,"x":240,"y":140},{"w":20,"h":20,"x":340,"y":140},{"w":20,"h":20,"x":360,"y":200},{"w":20,"h":20,"x":0,"y":40},{"w":20,"h":20,"x":40,"y":40},{"w":20,"h":20,"x":20,"y":40},{"w":20,"h":20,"x":80,"y":40},{"w":20,"h":20,"x":60,"y":40},{"w":20,"h":20,"x":120,"y":40},{"w":20,"h":20,"x":120,"y":20},{"w":20,"h":20,"x":140,"y":20},{"w":20,"h":20,"x":160,"y":20},{"w":20,"h":20,"x":200,"y":0},{"w":20,"h":20,"x":200,"y":20},{"w":20,"h":20,"x":200,"y":40},{"w":20,"h":20,"x":200,"y":60},{"w":20,"h":20,"x":200,"y":80},{"w":20,"h":20,"x":180,"y":80},{"w":20,"h":20,"x":160,"y":40},{"w":20,"h":20,"x":140,"y":40},{"w":20,"h":20,"x":140,"y":60},{"w":20,"h":20,"x":180,"y":120},{"w":20,"h":20,"x":180,"y":140},{"w":20,"h":20,"x":240,"y":120},{"w":20,"h":20,"x":240,"y":80},{"w":20,"h":20,"x":240,"y":40},{"w":20,"h":20,"x":240,"y":0},{"w":20,"h":20,"x":260,"y":40},{"w":20,"h":20,"x":280,"y":40},{"w":20,"h":20,"x":280,"y":20},{"w":20,"h":20,"x":280,"y":0},{"w":20,"h":20,"x":260,"y":0},{"w":20,"h":20,"x":260,"y":80},{"w":20,"h":20,"x":280,"y":80},{"w":20,"h":20,"x":320,"y":80},{"w":20,"h":20,"x":320,"y":40},{"w":20,"h":20,"x":300,"y":40},{"w":20,"h":20,"x":320,"y":20},{"w":20,"h":20,"x":360,"y":0},{"w":20,"h":20,"x":360,"y":20},{"w":20,"h":20,"x":360,"y":40},{"w":20,"h":20,"x":400,"y":40},{"w":20,"h":20,"x":380,"y":40},{"w":20,"h":20,"x":380,"y":0},{"w":20,"h":20,"x":400,"y":0},{"w":20,"h":20,"x":420,"y":0},{"w":20,"h":20,"x":440,"y":20},{"w":20,"h":20,"x":440,"y":0},{"w":20,"h":20,"x":420,"y":40},{"w":20,"h":20,"x":440,"y":20},{"w":20,"h":20,"x":460,"y":20},{"w":20,"h":20,"x":460,"y":40},{"w":20,"h":20,"x":460,"y":60},{"w":20,"h":20,"x":460,"y":80},{"w":20,"h":20,"x":440,"y":80},{"w":20,"h":20,"x":460,"y":100},{"w":20,"h":20,"x":460,"y":140},{"w":20,"h":20,"x":440,"y":140},{"w":20,"h":20,"x":420,"y":100},{"w":20,"h":20,"x":400,"y":100},{"w":20,"h":20,"x":400,"y":80},{"w":20,"h":20,"x":360,"y":100},{"w":20,"h":20,"x":360,"y":80},{"w":20,"h":20,"x":360,"y":120},{"w":20,"h":20,"x":380,"y":140},{"w":20,"h":20,"x":420,"y":140},{"w":20,"h":20,"x":360,"y":140},{"w":20,"h":20,"x":300,"y":140},{"w":20,"h":20,"x":300,"y":120},{"w":20,"h":20,"x":280,"y":120},{"w":20,"h":20,"x":280,"y":140},{"w":20,"h":20,"x":100,"y":120},{"w":20,"h":20,"x":60,"y":140},{"w":20,"h":20,"x":60,"y":120},{"w":20,"h":20,"x":60,"y":100},{"w":20,"h":20,"x":20,"y":140},{"w":20,"h":20,"x":20,"y":120},{"w":20,"h":20,"x":20,"y":100},{"w":20,"h":20,"x":40,"y":80},{"w":20,"h":20,"x":20,"y":80},{"w":20,"h":20,"x":80,"y":180},{"w":20,"h":20,"x":60,"y":180},{"w":20,"h":20,"x":40,"y":180},{"w":20,"h":20,"x":20,"y":180},{"w":20,"h":20,"x":0,"y":180},{"w":20,"h":20,"x":120,"y":180},{"w":20,"h":20,"x":160,"y":180},{"w":20,"h":20,"x":120,"y":200},{"w":20,"h":20,"x":120,"y":220},{"w":20,"h":20,"x":80,"y":220},{"w":20,"h":20,"x":60,"y":220},{"w":20,"h":20,"x":20,"y":220},{"w":20,"h":20,"x":40,"y":220},{"w":20,"h":20,"x":120,"y":240},{"w":20,"h":20,"x":120,"y":260},{"w":20,"h":20,"x":100,"y":260},{"w":20,"h":20,"x":60,"y":260},{"w":20,"h":20,"x":80,"y":260},{"w":20,"h":20,"x":20,"y":260},{"w":20,"h":20,"x":20,"y":280},{"w":20,"h":20,"x":0,"y":220},{"w":20,"h":20,"x":0,"y":200},{"w":20,"h":20,"x":80,"y":140},{"w":20,"h":20,"x":60,"y":80},{"w":20,"h":20,"x":100,"y":80},{"w":20,"h":20,"x":140,"y":180},{"w":20,"h":20,"x":180,"y":180},{"w":20,"h":20,"x":180,"y":200},{"w":20,"h":20,"x":180,"y":220},{"w":20,"h":20,"x":160,"y":220},{"w":20,"h":20,"x":160,"y":260},{"w":20,"h":20,"x":180,"y":260},{"w":20,"h":20,"x":140,"y":260},{"w":20,"h":20,"x":180,"y":280},{"w":20,"h":20,"x":180,"y":300},{"w":20,"h":20,"x":180,"y":320},{"w":20,"h":20,"x":160,"y":320},{"w":20,"h":20,"x":120,"y":320},{"w":20,"h":20,"x":140,"y":320},{"w":20,"h":20,"x":140,"y":300},{"w":20,"h":20,"x":80,"y":320},{"w":20,"h":20,"x":80,"y":300},{"w":20,"h":20,"x":120,"y":300},{"w":20,"h":20,"x":60,"y":320},{"w":20,"h":20,"x":40,"y":320},{"w":20,"h":20,"x":20,"y":320},{"w":20,"h":20,"x":20,"y":300},{"w":20,"h":20,"x":0,"y":320},{"w":20,"h":20,"x":60,"y":300},{"w":20,"h":20,"x":180,"y":340},{"w":20,"h":20,"x":180,"y":360},{"w":20,"h":20,"x":160,"y":360},{"w":20,"h":20,"x":100,"y":360},{"w":20,"h":20,"x":80,"y":360},{"w":20,"h":20,"x":60,"y":360},{"w":20,"h":20,"x":40,"y":360},{"w":20,"h":20,"x":20,"y":360},{"w":20,"h":20,"x":20,"y":380},{"w":20,"h":20,"x":20,"y":460},{"w":20,"h":20,"x":20,"y":440},{"w":20,"h":20,"x":40,"y":440},{"w":20,"h":20,"x":40,"y":400},{"w":20,"h":20,"x":20,"y":400},{"w":20,"h":20,"x":60,"y":400},{"w":20,"h":20,"x":80,"y":400},{"w":20,"h":20,"x":80,"y":420},{"w":20,"h":20,"x":80,"y":420},{"w":20,"h":20,"x":80,"y":440},{"w":20,"h":20,"x":80,"y":460},{"w":20,"h":20,"x":60,"y":460},{"w":20,"h":20,"x":40,"y":460},{"w":20,"h":20,"x":20,"y":480},{"w":20,"h":20,"x":0,"y":0},{"w":20,"h":20,"x":20,"y":0},{"w":20,"h":20,"x":20,"y":0},{"w":20,"h":20,"x":40,"y":0},{"w":20,"h":20,"x":60,"y":0},{"w":20,"h":20,"x":80,"y":0},{"w":20,"h":20,"x":120,"y":480},{"w":20,"h":20,"x":120,"y":460},{"w":20,"h":20,"x":120,"y":440},{"w":20,"h":20,"x":120,"y":420},{"w":20,"h":20,"x":140,"y":400},{"w":20,"h":20,"x":120,"y":400},{"w":20,"h":20,"x":160,"y":400},{"w":20,"h":20,"x":200,"y":400},{"w":20,"h":20,"x":220,"y":400},{"w":20,"h":20,"x":220,"y":380},{"w":20,"h":20,"x":220,"y":360},{"w":20,"h":20,"x":220,"y":320},{"w":20,"h":20,"x":220,"y":300},{"w":20,"h":20,"x":220,"y":280},{"w":20,"h":20,"x":260,"y":280},{"w":20,"h":20,"x":240,"y":280},{"w":20,"h":20,"x":280,"y":280},{"w":20,"h":20,"x":300,"y":280},{"w":20,"h":20,"x":300,"y":260},{"w":20,"h":20,"x":300,"y":220},{"w":20,"h":20,"x":300,"y":180},{"w":20,"h":20,"x":320,"y":220},{"w":20,"h":20,"x":340,"y":220},{"w":20,"h":20,"x":320,"y":180},{"w":20,"h":20,"x":360,"y":180},{"w":20,"h":20,"x":360,"y":220},{"w":20,"h":20,"x":360,"y":160},{"w":20,"h":20,"x":320,"y":160},{"w":20,"h":20,"x":320,"y":140},{"w":20,"h":20,"x":320,"y":100},{"w":20,"h":20,"x":320,"y":120},{"w":20,"h":20,"x":260,"y":180},{"w":20,"h":20,"x":280,"y":180},{"w":20,"h":20,"x":220,"y":180},{"w":20,"h":20,"x":200,"y":180},{"w":20,"h":20,"x":400,"y":480},{"w":20,"h":20,"x":400,"y":460},{"w":20,"h":20,"x":400,"y":440},{"w":20,"h":20,"x":400,"y":420},{"w":20,"h":20,"x":440,"y":420},{"w":20,"h":20,"x":460,"y":420},{"w":20,"h":20,"x":480,"y":420},{"w":20,"h":20,"x":440,"y":400},{"w":20,"h":20,"x":440,"y":380},{"w":20,"h":20,"x":440,"y":340},{"w":20,"h":20,"x":440,"y":360},{"w":20,"h":20,"x":480,"y":340},{"w":20,"h":20,"x":480,"y":360},{"w":20,"h":20,"x":480,"y":380},{"w":20,"h":20,"x":480,"y":400},{"w":20,"h":20,"x":420,"y":320},{"w":20,"h":20,"x":440,"y":320},{"w":20,"h":20,"x":440,"y":280},{"w":20,"h":20,"x":420,"y":280},{"w":20,"h":20,"x":460,"y":280},{"w":20,"h":20,"x":460,"y":260},{"w":20,"h":20,"x":460,"y":240},{"w":20,"h":20,"x":480,"y":320},{"w":20,"h":20,"x":460,"y":220},{"w":20,"h":20,"x":460,"y":200},{"w":20,"h":20,"x":440,"y":200},{"w":20,"h":20,"x":420,"y":200},{"w":20,"h":20,"x":420,"y":180},{"w":20,"h":20,"x":420,"y":160},{"w":20,"h":20,"x":480,"y":140},{"w":20,"h":20,"x":460,"y":180},{"w":20,"h":20,"x":400,"y":320},{"w":20,"h":20,"x":400,"y":280},{"w":20,"h":20,"x":360,"y":280},{"w":20,"h":20,"x":400,"y":260},{"w":20,"h":20,"x":400,"y":240},{"w":20,"h":20,"x":420,"y":240},{"w":20,"h":20,"x":400,"y":200},{"w":20,"h":20,"x":400,"y":180},{"w":20,"h":20,"x":160,"y":440},{"w":20,"h":20,"x":160,"y":460},{"w":20,"h":20,"x":160,"y":480},{"w":20,"h":20,"x":180,"y":440},{"w":20,"h":20,"x":220,"y":440},{"w":20,"h":20,"x":220,"y":460},{"w":20,"h":20,"x":200,"y":480},{"w":20,"h":20,"x":220,"y":480},{"w":20,"h":20,"x":180,"y":480},{"w":20,"h":20,"x":260,"y":440},{"w":20,"h":20,"x":260,"y":460},{"w":20,"h":20,"x":260,"y":480},{"w":20,"h":20,"x":260,"y":400},{"w":20,"h":20,"x":280,"y":400},{"w":20,"h":20,"x":300,"y":400},{"w":20,"h":20,"x":320,"y":400},{"w":20,"h":20,"x":300,"y":420},{"w":20,"h":20,"x":300,"y":440},{"w":20,"h":20,"x":300,"y":460},{"w":20,"h":20,"x":300,"y":480},{"w":20,"h":20,"x":280,"y":480},{"w":20,"h":20,"x":320,"y":440},{"w":20,"h":20,"x":340,"y":440},{"w":20,"h":20,"x":340,"y":460},{"w":20,"h":20,"x":360,"y":440},{"w":20,"h":20,"x":380,"y":440},{"w":20,"h":20,"x":380,"y":420},{"w":20,"h":20,"x":360,"y":420},{"w":20,"h":20,"x":360,"y":400},{"w":20,"h":20,"x":360,"y":380},{"w":20,"h":20,"x":360,"y":360},{"w":20,"h":20,"x":360,"y":360},{"w":20,"h":20,"x":360,"y":340},{"w":20,"h":20,"x":340,"y":340},{"w":20,"h":20,"x":320,"y":340},{"w":20,"h":20,"x":280,"y":340},{"w":20,"h":20,"x":260,"y":340},{"w":20,"h":20,"x":300,"y":340},{"w":20,"h":20,"x":240,"y":340},{"w":20,"h":20,"x":220,"y":340},{"w":20,"h":20,"x":280,"y":320},{"w":20,"h":20,"x":260,"y":300},{"w":20,"h":20,"x":260,"y":320},{"w":20,"h":20,"x":240,"y":320},{"w":20,"h":20,"x":240,"y":300},{"w":20,"h":20,"x":340,"y":280},{"w":20,"h":20,"x":420,"y":380},{"w":20,"h":20,"x":400,"y":380},{"w":20,"h":20,"x":400,"y":340},{"w":20,"h":20,"x":440,"y":420},{"w":20,"h":20,"x":440,"y":440},{"w":20,"h":20,"x":440,"y":440},{"w":20,"h":20,"x":440,"y":460},{"w":20,"h":20,"x":460,"y":460},{"w":20,"h":20,"x":320,"y":320},{"w":20,"h":20,"x":240,"y":260},{"w":20,"h":20,"x":240,"y":240},{"w":20,"h":20,"x":240,"y":220},{"w":20,"h":20,"x":220,"y":220},{"w":20,"h":20,"x":260,"y":240}]"`

function movimenta(tecladaDigitada) {
    const movimentos = {
        ArrowUp(){
            if (player.y > 0) {
                // player.y -= 50;
                movimentaPlayer(player.x, player.y - player.h);
            }  
        },
        ArrowLeft(){
            if (player.x > 0){
                movimentaPlayer(player.x - player.w, player.y);
            }
        },
        ArrowDown(){
            if (player.y < hCanvas - player.h) {
                movimentaPlayer(player.x, player.y + player.h);
            }
        },
        ArrowRight(){
            if (player.x < wCanvas - player.w) {
                movimentaPlayer(player.x + player.w, player.y);
            }
        }
    };

    const acao = movimentos[tecladaDigitada]
    acao();
}

function movimentaPlayer(x,y) {
    if(interseccaoPixels(matrizAreaJogo, x, y)){
        return;
    }
    player.x = x;
    player.y = y;

    if (interseccaoPixels([comida], x , y)) {
        pontuacao++;
        const posicaoComida = defineNovaPosicaoComida();
        comida.x = posicaoComida.x;
        comida.y = posicaoComida.y;
    }
}

function defineNovaPosicaoComida() {
    let x = rangePosicoesX[random(0,rangePosicoesX.length)];
    let y = rangePosicoesY[random(0,rangePosicoesY.length)];
    // return {x, y};

    const objeto = {
        x: x,
        y: y
    }
    if (
        interseccaoPixels(matrizAreaJogo, x, y, comida) 
        || 
        interseccaoPixels([player], x, y, comida)
    ) {
        return defineNovaPosicaoComida();
    }
    return objeto;
}

function interseccaoPixels(matriz, x, y, objeto = player) {
    for (let i = 0; i < matriz.length; i++) {
        const bloco = matriz[i];

        if (
            (
                (x >= bloco.x && (x + player.w) <= (bloco.x + bloco.w))
                &&
                (y >= bloco.y && (y + player.h) <= (bloco.y + bloco.h))
            )
        ) {
            return true;
        }
    }
    return false;
}

function renderizarJogo() {
    // Reseta o canvas (folha em branco)
    context.clearRect(0, 0, wCanvas, hCanvas)
    
    // Desenha área do jogo
    for (let x = 0; x < matrizAreaJogo.length; x++) {
       context.beginPath();
       context.fillStyle = "orange"
       context.fillRect(
           matrizAreaJogo[x].x,
           matrizAreaJogo[x].y,
           matrizAreaJogo[x].w,
           matrizAreaJogo[x].h
           )
    }
    // Desenha o player
    context.beginPath();
    context.fillStyle = player.color
    context.fillRect(
        player.x,
        player.y,
        player.w,
        player.h
    )

    // Desenha A COMIDA
    context.beginPath();
    context.fillStyle = comida.color
    context.fillRect(
        comida.x,
        comida.y,
        comida.w,
        comida.h
    )
    
    //Atribui novos valores aos elementos html
    pontuacaoEl.innerText = pontuacao;
    posicaoXelemento.innerText = player.x;
    posicaoYelemento.innerText = player.y;
    // redesenha o canvas em 60fps
    requestAnimationFrame(renderizarJogo);
}

function random(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

renderizarJogo();
