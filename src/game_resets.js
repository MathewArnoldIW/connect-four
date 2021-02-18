async function resetDrawnGame(colorList, cellImageNames) {
    await drawAnimation(colorList, cellImageNames)

    const gameData = getGameData()
    gameData.newRound(-1)
    updateStorageObject(gameData)
}


function resetWonGame(colorList, cellImageNames, winningIndex) {
    await drawAnimation(colorList, cellImageNames)

    const gameData = getGameData()
    gameData.newRound(winningIndex)
    updateStorageObject(gameData)
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function drawAnimation(colorList, cellImageNames) {
    const delay = 1000

    await sleep(delay)
    await animateCheckerboard(colorList, cellImageNames, delay)
}


async function animateCheckerboard(checkerColors, imageNames, delayFactor) {
    const delayProportion = 0.5
    const delay = delayFactor * delayProportion

    for (let i = 0; i < checkerColors.length; i++) {
        const evenOrOdd = i % 2
        
        imageNames.filter(nameToCheck => imageNames.findIndex(name => name == nameToCheck) % 2 == evenOrOdd)
            .map(name => document.getElementById(name))
            .forEach(image => image.src = checkerColors[i])

        await sleep(delay)
    }
}


module.exports = {
    resetDrawnGame,
    resetWonGame,
    getTwoRandomColors,
    drawAnimation,
    animateCheckerboard
}
