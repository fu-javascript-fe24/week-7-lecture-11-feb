import logger from '../utils/logger.js';

async function fetchPokemonImages() {
    return fetch('https://santosnr6.github.io/Data/pokemonimages.json')
        .then(response => response.json())
        .then(data => { return data; })
        .catch(error => logger(error.message));
}

export default fetchPokemonImages;