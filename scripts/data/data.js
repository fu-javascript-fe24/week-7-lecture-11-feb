const oGameData = {
    pokemonImages : [],
    nmbrOfCaughtPokemons : 0,
    startTime : 0,
    endTime : 0,
};

function init() {
    oGameData.pokemonImages = [];
    oGameData.nmbrOfCaughtPokemons = 0;
    oGameData.startTime = 0;
    oGameData.endTime = 0;
}

function getLeftPosition() {
    let nmbr = Math.round(Math.random() * ( window.innerWidth - 300)) + 1;
    return nmbr;
}

function getTopPosition() {
    let nmbr = Math.round(Math.random() * ( window.innerHeight - 300)) + 1;
    return nmbr;
}

//Metod som hämtar antalet millisekunder sedan 1 januari 1970 och placerar värdet i beginning attributet.
function startTimeInMilliseconds() {
    oGameData.startTime =  Date.now();
}

//Metod som hämtar antalet millisekunder sedan 1 januari 1970 och placerar värdet i ending attributet.
function endTimeInMilliseconds() {
    oGameData.endTime = Date.now();
}

//Metod som räknar ut och returnerar antalet millisekunder det tog att fånga tio spöken.
function nmbrOfMilliseconds() {
    return oGameData.endTime - oGameData.startTime;
}

export default oGameData;
export { init, getLeftPosition, getTopPosition, startTimeInMilliseconds, endTimeInMilliseconds, nmbrOfMilliseconds };