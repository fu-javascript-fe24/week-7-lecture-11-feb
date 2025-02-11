function getHighscore() {
    return JSON.parse(localStorage.getItem('highscore')) || [];
}

function updateHighscore(data) {
    const highscore = getHighscore();
    highscore.push(data)
    highscore.sort((a, b) => a.time - b.time);
    localStorage.setItem('highscore', JSON.stringify(highscore));
}

export { getHighscore, updateHighscore };