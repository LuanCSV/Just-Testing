
URL = 'http://ddragon.leagueoflegends.com/cdn/10.19.1/data/en_US/champion.json'

const main = document.querySelector('#main');
const searchBar = document.querySelector("#searchBar");

function callAPI() {
    
    fetch(URL).catch(err => {
        console.log('Não foi possível acessar o link', err);
        const alertError = document.createElement('div');
        alertError.setAttribute('class','col-12');
        alertError.innerHTML += `
            <p style='color:red;font-size:40px;'>
                Não nao foi possível acessar o banco de informações!
            </p>
        `
    }).then(res => {
        return res.json() 
    }).then(data => {
        const champions = data.data;
        // Percorre todo objeto data e retorna cada campeão unicamente
        getChampInfos(champions);

        // Chamando searchbar aqui, pois já traz todas as articles criadas, 
        // se eu chamasse dentro do cardPerChampion, ele entraria no loop do getChampInfos
        // E não chamo dentro do getChampInfos fora do Loop pq não faz muito sentido => na minha cabeça 
    });
}

function getChampInfos(list) {
    // console.log(list)
    for (let i in list) {
        const campeao = list[i]
        cardPerChampion(campeao.name, campeao.title, campeao.id);
        // console.log(campeao.name +" - " + campeao.title)
    }
    
}
//.../100px180/
function cardPerChampion(name, title, id){
    const card = document.createElement('article');
    card.setAttribute('class','card');
    card.innerHTML += `
        <img class="card-img-top" src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg" alt="Imagem de capa do card">
        <div class="card-body position-relative">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2">${title}</h6>
        <a href="https://universe.leagueoflegends.com/pt_BR/champion/${id}/" target="_blank" class="btn btn-outline-danger mx-auto mt-2">More info</a>
        </div>
    `;
    main.appendChild(card)
    
}

callAPI();

function searchChampions() {
    
    const filter = searchBar.value.toLowerCase().split("")
    console.log(filter)
    let cards = main.querySelectorAll('article');
    for (let i = 0; i < cards.length; i++) {
        const searchedName = cards[i].getElementsByTagName("h5")[0];
        const nameValue = (searchedName.innerText || searchedName.textContent).toLowerCase().split("")
        const valor = nameValue.some(le => filter.includes(le));
        if (valor || filter.length === 0) {
            cards[i].style.display = ""
        } else {
            cards[i].style.display = "none"
        }   
    }
    // const searchTool = cards.getElementByTag('h5')
    // let filter = searchBar.value.toUpperCase();
    // console.log(searchTool)

} 

document.querySelector('#searchButton').addEventListener('click', (event) => {
    event.preventDefault()
    searchChampions();
})


