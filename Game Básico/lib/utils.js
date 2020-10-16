
function interseccaoPixels(matriz, x, y, objeto = player) {
    for (let i = 0; i < matriz.length; i++) {
        const bloco = matriz[i];

        if (
            (
                (x >= bloco.x && (x + objeto.w) <= (bloco.x + bloco.w))
                &&
                (y >= bloco.y && (y + objeto.h) <= (bloco.y + bloco.h))
            )
        ) {
            return true;
        }
    }
    return false;
}

function random(min, max) {
    return min + Math.floor((max - min) * Math.random());
}