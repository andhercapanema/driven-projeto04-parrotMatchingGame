const oneOfEachCard = [
    `bobrossparrot`,
    `explodyparrot`,
    `fiestaparrot`,
    `metalparrot`,
    `revertitparrot`,
    `tripletsparrot`,
    `unicornparrot`,
    `astronautparrot`,
    `beerparrot`,
    `birthdaypartyparrot`,
    `ceilingparrot`,
    `christmasparrot`,
    `congaparrot`,
    `discoparrot`,
    `everythingsfineparrot`,
    `exceptionallyfastparrot`,
    `githubparrot`,
    `glimpseparrot`,
    `headbangingparrot`,
    `headingparrot`,
    `hmmparrot`,
    `hypnoparrotlight`,
    `invisibleparrot`,
    `jediparrot`,
    `jumpingparrot`,
    `laptop_parrot`,
    `moonparrot`,
    `partyparrot`,
    `pirateparrot`,
    `popcornparrot`,
    `portalblueparrot`,
    `pumpkinparrot`,
    `quadparrot`,
    `sherlockholmesparrot`,
    `sidewaysparrot`,
    `sithparrot`,
    `wineparrot`
];

const shuffle = function () {
    return Math.random() - 0.5;
};

let min = 0, sec = 0, dec = 0;
const displayedCounter = document.querySelector('.c-counter');

const countOneHundredthSec = function () {
    dec++;
    sec = dec / 100;
    const convertedSec = sec % 60;
    min = sec / 60;

    const displayedMinute = ("00" + Math.floor(min).toFixed(0)).slice(-2);
    const displayedSecond = ("00" + Math.floor(convertedSec).toFixed(0)).slice(-2);
    const displayedHundredth = ("00" + Math.floor(dec).toFixed(0)).slice(-2);

    displayedCounter.innerHTML = `${displayedMinute}:${displayedSecond}:${displayedHundredth}`;
};

let numberOfCards = 0;
let counterId = "";
const game = document.querySelector('.c-matchingGame');
const flippedCardsClass = 'is-flipped';

const startGame = function () {
    // resetar variáveis no caso de restartGame
    numberOfCards = 0;
    game.innerHTML = '';
    [min, sec, dec] = [0, 0, 0];
    [firstCard, secondCard, moves] = ['', '', 0];
    displayedCounter.innerHTML = '00:00:00';

    // registrar número de cartas que o jogador quer
    while (isNaN(numberOfCards) || numberOfCards % 2 === 1 || numberOfCards < 4 || numberOfCards > 40) {
        numberOfCards = Number(prompt(`Com quantas cartas você quer jogar?
Insira um número par de 4 a 40!`));
    }

    // registrar o nível de dificuldade do jogo
    let difficulty = '';
    while (difficulty !== 'f' && difficulty !== 'm' && difficulty !== 'd') {
        difficulty = prompt(`Quer jogar em qual dificuldade?
Insira "f" para fácil, "m" para médio ou "d" para difícil!`);
    }

    let flippedTime = 0;
    switch (difficulty) {
        case 'd':
            flippedTime = 1500;
            break;
        case 'm':
            flippedTime = 3000;
            break;
        case 'f':
            flippedTime = 4500;
            break;
        default:
            startGame();
    }

    // distribuir as cartas em no mínimo duas linhas iguais
    var root = document.documentElement;
    root.style.setProperty('--cContentMaxWidth', `${numberOfCards / 2 * 151}px`);

    // embaralhar set de cartas, para não serem sempre as mesmas cartas quando o jogador inserir valores abaixo do máximo
    oneOfEachCard.sort(shuffle);

    // selecionar quantidade certa de cartas
    const rightAmountOfCards = oneOfEachCard.slice(0, numberOfCards / 2);

    // pegar um par de cada carta e embaralhar
    Array.prototype.push.apply(rightAmountOfCards, rightAmountOfCards);
    rightAmountOfCards.sort(shuffle);

    // colocar cartas no html
    rightAmountOfCards.forEach(card => {
        game.innerHTML += `<button class="${card} c-card" onclick='turnCard(this)'>
    <img class="c-card__back" src="./img/back.png" alt="">
    <img class="c-card__front" src="./gifs/${card}.gif" alt="">
</button>`;
    });

    // virar todas as cartas no início e iniciar contador
    allCards = document.querySelectorAll('.c-card');

    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.toggle(flippedCardsClass);
        });

        setTimeout(() => {
            allCards.forEach(card => {
                card.classList.toggle(flippedCardsClass);
            });

            //iniciar contador
            setTimeout(() => {
                counterId = setInterval(countOneHundredthSec, 10);
            }, 900);
        }, flippedTime);
    }, 400);
    allCards = Array.from(allCards);
};

const lockCard = function (card) {
    card.removeAttribute('onclick');
};

const unlockCard = function (card) {
    card.setAttribute('onclick', 'turnCard(this)');
};

const checkEndGame = function () {
    const turnedCards = document.querySelectorAll('.is-flipped');

    if (turnedCards.length === numberOfCards) {
        clearInterval(counterId);

        const oneOrMoreMinute = (displayedCounter.innerHTML.slice(0, 2) === '01') ? 'minuto' : 'minutos';

        alert(`Você ganhou em ${moves} jogadas!
Seu tempo foi de ${displayedCounter.innerHTML.slice(0, 2)} ${(oneOrMoreMinute)} e ${displayedCounter.innerHTML.slice(3, 5)},${displayedCounter.innerHTML.slice(6, 8)} segundos!`);

        let playAgain = "";
        while (playAgain !== 'sim' && playAgain !== 'não') {
            playAgain = prompt(`Gostaria de jogar novamente?
Insira "sim" ou "não"`);
            if (playAgain === 'sim') {
                startGame();
            }
        }
    }
};

const checkCards = function () {
    const firstCardElement = document.querySelector(`.${firstCard}.is-flipped`);
    const secondCardElement = document.querySelector(`.${secondCard}.is-flipped`);

    if (firstCard !== secondCard) {
        firstCardElement.classList.remove(flippedCardsClass);
        secondCardElement.classList.remove(flippedCardsClass);

        unlockCard(firstCardElement);
        unlockCard(secondCardElement);
    } else {
        checkEndGame();
    }

    firstCard = '';
    secondCard = '';
};

let firstCard = '';
let secondCard = '';
let moves = 0;

let allCards = [];

const lockBoard = function () {
    allCards.forEach(card => {
        lockCard(card);
    });
};

let flippedCards;

const unlockBoard = function () {
    flippedCards = Array.from(document.querySelectorAll('.is-flipped'));
    const unflippedCards = allCards;

    allCards.forEach(card => {
        flippedCards.forEach(flipped => {
            if (card === flipped) {
                unflippedCards.splice(unflippedCards.indexOf(flipped), 1);
            }
        });
    });

    unflippedCards.forEach(card => {
        unlockCard(card);
    });
};

const turnCard = function (card) {
    card.classList.toggle(flippedCardsClass);

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