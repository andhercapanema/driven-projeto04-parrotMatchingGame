const oneOfEachCard = [
    `<button class="bobross c-card" onclick='turnCard(this)'>
        <img class="c-card__back" src="./img/back.png" alt="">
        <img class="c-card__front" src="./gifs/bobrossparrot.gif" alt="">
    </button>`,
    `<button class="explody c-card" onclick='turnCard(this)'>
        <img class="c-card__back" src="./img/back.png" alt="">
        <img class="c-card__front" src="./gifs/explodyparrot.gif" alt="">
    </button>`,
    `<button class="fiesta c-card" onclick='turnCard(this)'>
        <img class="c-card__back" src="./img/back.png" alt="">
        <img class="c-card__front" src="./gifs/fiestaparrot.gif" alt="">
    </button>`,
    `<button class="metal c-card" onclick='turnCard(this)'>
        <img class="c-card__back" src="./img/back.png" alt="">
        <img class="c-card__front" src="./gifs/metalparrot.gif" alt="">
    </button>`,
    `<button class="revertit c-card" onclick='turnCard(this)'>
        <img class="c-card__back" src="./img/back.png" alt="">
        <img class="c-card__front" src="./gifs/revertitparrot.gif" alt="">
    </button>`,
    `<button class="triplets c-card" onclick='turnCard(this)'>
        <img class="c-card__back" src="./img/back.png" alt="">
        <img class="c-card__front" src="./gifs/tripletsparrot.gif" alt="">
    </button>`,
    `<button class="unicorn c-card" onclick='turnCard(this)'>
        <img class="c-card__back" src="./img/back.png" alt="">
        <img class="c-card__front" src="./gifs/unicornparrot.gif" alt="">
    </button>`
]

let numberOfCards = 0;

const shuffle = function () {
    return Math.random() - 0.5;
}

let min = 0, sec = 0, dec = 0;
const displayedCounter = document.querySelector('.c-counter');

const countOneHundredthSec = function () {
    dec++;
    sec = dec / 100;
    const convertedSec = sec % 60;
    min = sec / 60;

    displayedCounter.innerHTML = `${("00" + Math.floor(min).toFixed(0)).slice(-2)}:${("00" + Math.floor(convertedSec).toFixed(0)).slice(-2)}:${("00" + Math.floor(dec).toFixed(0)).slice(-2)}`;
}

let counterId = "";
const game = document.querySelector('.c-matchingGame');

const startGame = function () {
    // registrar número de cartas que o jogador quer
    while (numberOfCards % 2 === 1 || numberOfCards < 4 || numberOfCards > 14) {
        numberOfCards = Number(prompt(`Com quantas cartas você quer jogar?
Insira um número par de 4 a 14!`));
    }

    // distribuir as cartas em no mínimo duas linhas iguais
    var root = document.documentElement;
    root.style.setProperty('--cContentMaxWidth', `${numberOfCards / 2 * 151}px`)

    // embaralhar set de cartas, para não serem sempre as mesmas cartas quando o jogador inserir valores abaixo do máximo
    oneOfEachCard.sort(shuffle);

    // selecionar quantidade certa de cartas
    const rightAmountOfCards = oneOfEachCard.slice(0, numberOfCards / 2)

    // pegar um par de cada carta e embaralhar
    // console.log(rightAmountOfCards);
    Array.prototype.push.apply(rightAmountOfCards, rightAmountOfCards);
    // console.log(rightAmountOfCards);
    rightAmountOfCards.sort(shuffle);
    // console.log(rightAmountOfCards);

    // colocar cartas no html
    rightAmountOfCards.forEach(card => {
        game.innerHTML += card;
    })

    // virar todas as cartas no início e iniciar contador
    allCards = document.querySelectorAll('.c-card');
    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.toggle('is-flipped');
        });

        setTimeout(() => {
            allCards.forEach(card => {
                card.classList.toggle('is-flipped');
            });

            //iniciar contador
            setTimeout(()=>{
                counterId = setInterval(countOneHundredthSec, 10);
            }, 900);
        }, 1500);
    }, 400);
    allCards = Array.from(allCards);
}

const lockCard = function (card) {
    card.removeAttribute('onclick');
}

const unlockCard = function (card) {
    card.setAttribute('onclick', 'turnCard(this)');
}

const checkEndGame = function () {
    const turnedCards = document.querySelectorAll('.is-flipped');

    if (turnedCards.length === numberOfCards) {
        clearInterval(counterId);

        alert(`Você ganhou em ${moves} jogadas!
Seu tempo foi de ${displayedCounter.innerHTML.slice(0, 2)} minutos e ${displayedCounter.innerHTML.slice(3, 5)},${displayedCounter.innerHTML.slice(6, 8)} segundos!`);

        let playAgain = "";
        while (playAgain !== 'sim' && playAgain !== 'não') {
            playAgain = prompt(`Gostaria de jogar novamente?
Insira "sim" ou "não"`)
            if (playAgain === 'sim') {
                numberOfCards = 0;
                game.innerHTML = '';
                min = 0, sec = 0, dec = 0;
                firstCard = '', secondCard = '', moves = 0;
                displayedCounter.innerHTML = '00:00:00';
                startGame();
            }
        }
    }
}

const checkCards = function () {
    const firstCardElement = document.querySelector(`.${firstCard}.is-flipped`);
    const secondCardElement = document.querySelector(`.${secondCard}.is-flipped`);

    if (firstCard !== secondCard) {
        firstCardElement.classList.remove('is-flipped');
        secondCardElement.classList.remove('is-flipped');

        unlockCard(firstCardElement);
        unlockCard(secondCardElement);
    } else {
        checkEndGame();
    }

    firstCard = '';
    secondCard = '';
}

let firstCard = '';
let secondCard = '';
let moves = 0;

let allCards = [];

const lockBoard = function () {
    allCards.forEach(card => {
        lockCard(card);
    })
}

let flippedCards;

const unlockBoard = function () {
    flippedCards = Array.from(document.querySelectorAll('.is-flipped'));
    const unflippedCards = allCards;

    allCards.forEach(card => {
        flippedCards.forEach(flipped => {
            if (card === flipped) {
                unflippedCards.splice(unflippedCards.indexOf(flipped), 1);
            }
        })
    })

    unflippedCards.forEach(card => {
        unlockCard(card);
    })
}

const turnCard = function (card) {
    card.classList.toggle('is-flipped');

    if (firstCard === '') {
        firstCard = card.classList[0];
        lockCard(card);
    } else if (secondCard === '') {
        secondCard = card.classList[0];
        lockCard(card);

        lockBoard();
        setTimeout(checkCards, 1000);
        setTimeout(unlockBoard, 1000);
    }

    moves++;
}

startGame();