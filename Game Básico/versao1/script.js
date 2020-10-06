
var canvas = document.querySelector('#canvas');
var context = canvas.getContext("2d");
var wCanvas = canvas.clientWidth;
var hCanvas = canvas.clientHeight;

var pontuacao = 0;
var pontuacaoEl = document.querySelector('#pontuacao');
var posicaoXelemento = document.querySelector('#posicaoX');
var posicaoYelemento = document.querySelector('#posicaoY');

document.body.addEventListener("keyup", eventoTeclado)

var matrizAreaJogo = [];

var rangePosicoes = Array(10).fill(0).map((v, i) => {
    return i * 50;
})

// for (let x = 0; x < rangePosicoes.length; x++) {
//     rangePosicoes[x] = x * 50;
// }

// Definindo area do topo
for(let x = 0; x < 10; x++){
    matrizAreaJogo.push(
        {
            y: 0,
            x: (x * 50),
            w: 50,
            h: 50
        }
    )
}

//Definindo area da esquerda
for (let x = 0; x < 10; x++) {
    matrizAreaJogo.push(
        {
            y: (x * 50),
            x: 0,
            w: 50,
            h: 50
        }
    )
    
}

//Definindo area da direita
for (let x = 0; x < 10; x++) {
    matrizAreaJogo.push(
        {
            y: (x * 50),
            x: 450,
            w: 50,
            h: 50
        }
    )
    
}

// Definindo area da base
for(let x = 0; x < 10; x++){
    matrizAreaJogo.push(
        {
            y: 450,
            x: (x * 50),
            w: 50,
            h: 50
        }
    )
}

//Definindo o Player
const player = {
    x: 200,
    y: 200,
    w: 50, 
    h: 50,
    color: "#F05"
}

//Definindo a comida
const comida = {
    x: 300,
    y: 200,
    w: 50, 
    h: 50, 
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

function movimenta(tecladaDigitada) {
    const movimentos = {
        ArrowUp(){
            if (player.y > 0) {
                // player.y -= 50;
                movimentaPlayer(player.x, player.y - 50);
            }  
        },
        ArrowLeft(){
            if (player.x > 0){
                movimentaPlayer(player.x - 50, player.y);
            }
        },
        ArrowDown(){
            if (player.y < hCanvas - player.h) {
                movimentaPlayer(player.x, player.y + 50);
            }
        },
        ArrowRight(){
            if (player.x < wCanvas - player.w) {
                movimentaPlayer(player.x + 50, player.y);
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
    let x = rangePosicoes[random(0,10)];
    let y = rangePosicoes[random(0,10)];
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
            (x >= bloco.x && (x + player.w) <= (bloco.x + bloco.w))
            &&
            (y >= bloco.y && (y + player.h) <= (bloco.y + bloco.h))
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
