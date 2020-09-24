const body = document.querySelector('body');
const days = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];

const month = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]

const dateNow = new Date();
// dateNow.setMonth()
const currentMonth = dateNow.getMonth();
const firstDayWeek = dateNow.getDay();


function getMonthDays(month) {
    let year = dateNow.getFullYear();
    return new Date(year, month + 1, 0);
    
}

function createAndAppend(element, father) {
    const el = document.createElement(element);
    father.appendChild(el);
    return el;
}

function renderCalendar() {

    const table = createAndAppend('table', body);
    table.setAttribute('border', '1');
    table.setAttribute('width', '400');
    const thead = createAndAppend('thead', table);
    const tbody = createAndAppend('tbody', table);
    const trMonth  = createAndAppend('tr', thead);
    const thMonth = createAndAppend('th', trMonth);
    thMonth.setAttribute('colspan', '7');
    thMonth.innerText = month[currentMonth] + " em Javascript";

    renderDaysHead(thead);
    renderDaysBody(tbody);
}

function renderDaysHead(thead) {
    const tr = document.createElement('tr');
    for (let i = 0; i < days.length; i++) {
        const th = document.createElement("th");
        th.innerText = days[i];
        tr.appendChild(th);
    }  
    thead.appendChild(tr);
}

function renderDaysBody(tbody) {
    
    let tr;//= document.createElement('tr');
    // tbody.appendChild(tr);
    let repeat = 0;
    let day = getMonthDays(currentMonth);
    let qtdDay = day.getDate() - 1;
    while (repeat <= qtdDay + firstDayWeek) {
        if (repeat % 7 === 0) {
            tr = document.createElement("tr");
            tbody.appendChild(tr);
        }
        let day = (repeat+1) - firstDayWeek;
        const td = document.createElement('td');
        td.innerText = repeat >= firstDayWeek ? day : ' ';
        tr.appendChild(td);
        repeat++;
    }
}

renderCalendar();


// const divCriada = document.createElement("div");
// divCriada.innerHTML = "Div Criada"
// divCriada.setAttribute('class', 'estilosCSS2');
// body.appendChild(divCriada);
// console.log(divCriada)

// const div = document.querySelectorAll(".estilosCSS2");
// console.log(div)

// for (let x = 0; x < 2; x++) {
//     div[x].innerHTML = `${x} texto trocado`;
// }
// div[0].innerHTML = `asdad asdasd`;
// div[1].innerHTML = `aa trddasdocado`;