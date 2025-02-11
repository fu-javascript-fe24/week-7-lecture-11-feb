import log from './utils/logger.js';
import { shuffle } from './utils/utils.js';
import { getElement, createElement, appendElement, addClass, removeClass, setDataSrc, getDataSrc } from './utils/domUtils.js';
import oGameData, { init, getLeftPosition, getTopPosition, startTimeInMilliseconds, nmbrOfMilliseconds, endTimeInMilliseconds } from './data/data.js';
import fetchPokemonImages from './modules/api.js';
import { getHighscore, updateHighscore } from './modules/localStorage.js';
import validateForm from './modules/validation.js';

prepGame();

log.logger('Hejsan');
log.helloWorld();

function prepGame() {
    removeClass(getElement('#formWrapper'), 'd-none');
    addClass(getElement('#gameField'), 'd-none');
    addClass(getElement('#highScore'), 'd-none');

    getElement('#form').addEventListener('submit', (event) => {
        event.preventDefault();
        if(validateForm()) {
            initGame()
        } else {
            logger('ajja bajja');
        }
    });
}

async function initGame() {
    logger('init');
    addClass(getElement('#formWrapper'), 'd-none');
    removeClass(getElement('#gameField'), 'd-none');
    let images = await fetchPokemonImages();
    oGameData.pokemonImages = shuffle(images).slice(0, 10);
    createPokemons();
}

function createPokemons() {
    const gameFieldRef = getElement('#gameField');
    gameFieldRef.querySelectorAll('img').forEach(img => img.remove());
    oGameData.nmbrOfCaughtPokemons = 0;
    for(let pokemon of oGameData.pokemonImages) {
        const imgRef = createElement('img');
        imgRef.alt = 'Pokemon';
        imgRef.src = pokemon.url;
        setDataSrc(imgRef, pokemon.url);
        imgRef.style.position = 'absolute';
        movePokemon(imgRef);
        appendElement(gameFieldRef, imgRef);

        setInterval(() => {
            movePokemon(imgRef);
        }, 3000);

        setTimeout(() => {
            startTimeInMilliseconds();
            imgRef.addEventListener('mouseenter', handleMouseEnterEvent);
        }, 3000);
    }
}

function movePokemon(ref) {
    ref.style.left = `${getLeftPosition()}px`;
    ref.style.top = `${getTopPosition()}px`;
}

function handleMouseEnterEvent(event) {
    if(event.target.alt === 'Pokemon') {
        event.target.alt = 'Ball';
        event.target.src = './assets/Ball.webp';
        oGameData.nmbrOfCaughtPokemons++;
    } else if(event.target.alt === 'Ball') {
        event.target.alt = 'Pokemon';
        event.target.src = getDataSrc(event.target);
        oGameData.nmbrOfCaughtPokemons--;
    }
    checkForGameOver();
}

function checkForGameOver() {
    if(oGameData.nmbrOfCaughtPokemons === 10) {
        endTimeInMilliseconds();
        document.querySelectorAll('img').forEach(img => img.remove());
        updateHighscore({
            nick : getElement('#nick').value,
            time : nmbrOfMilliseconds() 
        });
        removeClass(getElement('#highScore'), 'd-none');
        renderHighScores();
        getElement('#playAgainBtn').addEventListener('click', prepGame);
    }
}

function renderHighScores() {
    const highscoreRef = getElement('#highscoreList');
    highscoreRef.innerHTML = '';
    const highscore = getHighscore();
    for(let i = 0; i < highscore.length; i++) {
        if(i === 10) break;
        const liRef = createElement('li');
        liRef.textContent = `Player: ${highscore[i].nick}, Time: ${highscore[i].time}`;
        appendElement(highscoreRef, liRef);
    }
}


