
function começarNovoJogo() {
    player.x = 200;
    player.y = 200;
    matrizAreaJogo = JSON.parse(labirintoString);

    posicaoComidaInicial = defineNovaPosicaoComida();
    comida.x = posicaoComidaInicial.x;
    comida.y = posicaoComidaInicial.y;

    pontuacao = 0;
    movimentos = 0;
    movimentosTotais = 0;
    movimentosRestantes = 25;
}

function retirarItemMatrizAreaJogo(bloco) {
    let indiceMatrizAreaJogo = null;
    for (let i = 0; i < matrizAreaJogo.length; i++) {
        if (
            bloco.x === matrizAreaJogo[i].x &&
            bloco.y === matrizAreaJogo[i].y
            ) 
        {
            indiceMatrizAreaJogo = i;
            break;    
        }
    }
    matrizAreaJogo.splice(indiceMatrizAreaJogo, 1);
    console.log("Indice", indiceMatrizAreaJogo);
}


function movimenta(tecladaDigitada) {
    const movimentosPossiveis = {
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

    const acao = movimentosPossiveis[tecladaDigitada]
    acao();
    
}

function movimentaPlayer(x,y) {
    if(interseccaoPixels(matrizAreaJogo, x, y)){
        return;
    }
    player.x = x;
    player.y = y;
    movimentos++;
    movimentosTotais++;
    movimentosRestantes--;
    colidiuComComida();
    emJogo();
}

function colidiuComComida() {
    if (interseccaoPixels([comida], player.x , player.y)) {
        pontuacao++;
        const posicaoComida = defineNovaPosicaoComida();
        comida.x = posicaoComida.x;
        comida.y = posicaoComida.y;
        movimentos = 0;
        movimentosRestantes += movimentosIniciais;
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

function gameOver() {
    alert('Game Over');
    começarNovoJogo();
}

function emJogo() {
    if( movimentosRestantes < 0 ) {
        gameOver();
    }
}
