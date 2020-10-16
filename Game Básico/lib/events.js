document.body.addEventListener("keyup", eventoTeclado);
canvas.addEventListener("mousedown", eventoMouse);

function eventoTeclado(e) {
    const teclaPressionada = e.key;
    const teclasPermitidas = [
        "ArrowUp",
        "ArrowLeft",
        "ArrowDown",
        "ArrowRight"
    ];

    if(teclasPermitidas.includes(teclaPressionada)) {
        movimenta(teclaPressionada);

    }else{
        console.log("Tecla não permitida: " + teclaPressionada);
    }
}

function eventoMouse(e) {
    const {offsetX, offsetY} = e;
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
                    const possivelBloco = {
                        w: tamanhos.w,
                        h: tamanhos.h,
                        x: rangePosicoesX[x],
                        y: rangePosicoesY[y]
                    };
                    if (!interseccaoPixels(matrizAreaJogo, possivelBloco.x, possivelBloco.y, possivelBloco)) {
                        matrizAreaJogo.push(possivelBloco);
                    }else{
                        retirarItemMatrizAreaJogo(possivelBloco);
                    }
            }  
        } 
    }
}