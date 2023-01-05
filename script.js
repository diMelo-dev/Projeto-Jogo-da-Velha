//Dados iniciais
let square = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
};
let player = '';
let resultado = '';
let playing = true;

document.querySelector(".vez").innerHTML = randomPlayer();//Randomize the first player
document.querySelector(".resultado").innerHTML = '';

//Eventos
document.querySelectorAll(".item").forEach(element => {
    element.addEventListener('click', clickItem);
});

document.querySelector(".reset").addEventListener("click", reset);


//Funções
function clickItem(event) {
    let key = event.target;
    
    if (playing && key.innerHTML === "") {
        square[key.getAttribute("data-item")] = player;
        if(checkGame()) {
            playing = false;
        };
        nextPlayer();
    } 

    renderSquare();
}

function renderSquare() {
    
    for (i in square) {
        document.querySelector(`div[data-item="${i}"]`).innerHTML = square[i];
    }
    renderInfo();
}

function renderInfo() {
    document.querySelector(".vez").innerHTML = player;
    document.querySelector(".resultado").innerHTML = resultado;
}

function checkGame() {

    let possibleWins = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (pWins of possibleWins) {
        let keysWin = pWins.split(",");

        if (square[keysWin[0]] === player && square[keysWin[1]] === player && square[keysWin[2]] === player) {
            resultado = `"${player}" ganhou`;
            document.querySelector(`div[data-item="${keysWin[0]}"]`).style.backgroundColor = "yellow";
            document.querySelector(`div[data-item="${keysWin[1]}"]`).style.backgroundColor = "yellow";
            document.querySelector(`div[data-item="${keysWin[2]}"]`).style.backgroundColor = "yellow";
            return true;
        }
    } 

    for (item in square) {
        if (square[item] === "") {
            resultado = "";
            return false;
        } else {
            resultado = "Empate";
        }
    }

    return true;

}

function reset() {
    square = {
        a1:'', a2:'', a3:'',
        b1:'', b2:'', b3:'',
        c1:'', c2:'', c3:''
    };

    document.querySelectorAll(".item").forEach((item) => {
        item.style.backgroundColor = "";
    });

    resultado = "";
    renderSquare();
    randomPlayer();
    playing = true;
}

function randomPlayer() {
    player = Math.floor(Math.random() * 2);
    if (player === 0) {
        player = 'X'
    } else {
        player = 'O'
    }

    return player;
}

function nextPlayer() {
    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
}