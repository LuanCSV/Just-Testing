
var canvas = document.querySelector('#canvas');
var context = canvas.getContext("2d");
var wCanvas = canvas.clientWidth;
var hCanvas = canvas.clientHeight;

document.body.addEventListener("keyup", movimentaPlayer)

var matrizAreaJogo = [];

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
    h: 50
}

function movimentaPlayer(e) {
    const teclaPressionada = e.key;
    const teclasPermitidas = [
        "ArrowUp",
        "ArrowLeft",
        "ArrowDown",
        "ArrowRight"
    ];

    if(teclasPermitidas.includes(teclaPressionada)) {
        console.log(teclaPressionada, "- Ok");
        switch (teclaPressionada) {
            case "ArrowUp":
                player.y -= 50;
                break;
            case "ArrowDown":
                player.y += 50;
                break;
            case "ArrowLeft":
                player.x -= 50;
                break;
            case "ArrowRight":
                player.x += 50;
                break;
        
            default:
                break;
        }
    }else{
        console.log("Tecla não permitida: " + teclaPressionada);
    }
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
    context.fillStyle = "#F05"
    context.fillRect(
        player.x,
        player.y,
        player.w,
        player.h
    )

    // redesenha o canvas em 60fps
    requestAnimationFrame(renderizarJogo);
}

function random(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

renderizarJogo();