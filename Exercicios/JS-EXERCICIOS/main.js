
    const $ = (selection) => {
        return document.querySelectorAll(selection).length === 1
        ? document.querySelector(selection)
        : document.querySelectorAll(selection)
    };

    let position = 1;
    

    $('#main').innerHTML += `
        <div class="bg-light p-3 row">
            <input type="text" id="nome" class="col-6  mx-auto my-2 form-control" placeholder="Nome" >
            <button id="addBotao" type="button" onclick="getName()" class="btn btn-primary col-5 mx-1 my-2">Adicionar nome</button> 
            <ul id="lista" class="col-12">
            </ul>
        </div>
    `;

    function getName(){
        let nomeDigitado = $('#nome').value
        let contadorEspaço = 0;
        let whiteSpaces = nomeDigitado.indexOf(" ");
        while ( whiteSpaces != -1 ) {
            contadorEspaço++;
            whiteSpaces = nomeDigitado.indexOf(" ",whiteSpaces + 1 );
         }
        $('#lista').innerHTML += `
            <li class="row my-2"> `
            if(nomeDigitado.length === 0 || nomeDigitado.length === contadorEspaço){ 
                $('#lista').innerHTML += `
                    Não foi digitado nenhum nome
                </li>
                `
            }else{
                $('#lista').innerHTML += ` 
                    ${position++}º nome: ${nomeDigitado} || ${nomeDigitado.length - contadorEspaço} letras
                </li>`
            }
    };
    // console.log($('#nome'))
    // $('#addBotao').addEventListener("click", () => {
    //     const nome = $('#nome').value;
    //     $('#lista').innerHTML += `
    //         <li class="row">
    //             ${position++}º nome: ${nome}
    //         </li>
    //     `
    //     console.log('nome');
        // console.log(position);
    // })

    $('#main').innerHTML += `
    <img id="lampada" onclick="switchLampada()" src="https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada.jpg?raw=true" width="100">
    `;
    let aceso = false;

    function switchLampada(){
        if(aceso !== true) {
            // $('#lampada').setAttribute('src', 'https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada-on.jpg?raw=true')
            $('#lampada').src = 'https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada-on.jpg?raw=true'
            console.log('acendeu')
            aceso = true;
        } else if(aceso === true){
            // $('#lampada').setAttribute('src', 'https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada.jpg?raw=true')
            $('#lampada').src = 'https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada.jpg?raw=true'
            console.log('apagou');
            aceso = false;
        }
    }

    $('#main').innerHTML += `
    <img id="lampada2" onmouseover="lampadaIn()" onmouseout="lampadOut()" src="https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada.jpg?raw=true" width="100">
    `;
    function lampadaIn() {
        $('#lampada2').src = 'https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada-on.jpg?raw=true';
    }
    function lampadOut() {
        $('#lampada2').src = 'https://github.com/gabrieldarezzo/helpjs-ravi/blob/master/images/lampada.jpg?raw=true'
    }

