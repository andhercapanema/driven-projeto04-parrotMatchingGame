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
    const game = document.querySelector('.c-matchingGame');
    rightAmountOfCards.forEach(card => {
        game.innerHTML += card;
    })
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
        alert(`Você ganhou em ${moves} jogadas!`);
    }
}

const checkCards = function () {
    const firstCardElement = document.querySelector(`.${firstCard}.is-flipped`);
    const secondCardElement = document.querySelector(`.${secondCard}.is-flipped`);

    if (firstCard !== secondCard) {
        firstCardElement.classList.remove('is-flipped');
        secondCardElement.classList.remove('is-flipped');

        unlockCard(firstCardElement);

    } else {
        lockCard(secondCardElement);
        checkEndGame();
    }

    firstCard = '';
    secondCard = '';
}

let firstCard = '';
let secondCard = '';
let moves = 0;

const turnCard = function (card) {
    card.classList.toggle('is-flipped');

    if (firstCard === '') {
        firstCard = card.classList[0];
        lockCard(card);
    } else if (secondCard === '') {
        secondCard = card.classList[0];

        setTimeout(checkCards, 1000);
    }

    moves++;
}

startGame();