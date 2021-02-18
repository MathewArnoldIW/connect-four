const { updateStorageObject } = require("./storage")

function resetDrawnGame(gameData) {
    gameData.newRound(-1)
    drawAnimation(gameData)
    updateStorageObject(gameData)
}


function resetWonGame() {

}


function drawAnimation(gameData) {
    const checkerColors = getTwoRandomColors(gameData)
    
}


function getTwoRandomColors(gameData) {
    const evenCheckerColor = gameData.pickRandomColor(gameData.teamColors)
    const oddCheckerColor = gameData.pickRandomColor(gameData.teamColors.concat([evenCheckerColor]))
    const evenCheckerTokenFile = gameData.getTokenFileName(evenCheckerColor)
    const oddCheckerTokenFile = gameData.getTokenFileName(oddCheckerColor)

    return [evenCheckerTokenFile, oddCheckerTokenFile]
}