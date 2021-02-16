function clickGridCell(x, y, event) {
    console.log(`Called clickGridCell() - Clicked (${x}, ${y})`)
    
    const gameData = getGameData()

    if (!gameData.isGameInSession) {
        return
    }

    attemptToPlacePiece(x, gameData)
}


function attemptToPlacePiece(x, gameData) {
    console.log(`Called attemptToPlacePiece()`)

    const isColumnFull = findIsColumnFull(x, gameData)

    if (isColumnFull) {
        //tell the user!
    }
    else {
        gameData.takeTurn(x)
    }
}


function findIsColumnFull(x, gameData) {
    console.log(`Called findIsColumnFull()`)
    const columnValues = gameData.getLineOfValues(x, 0, 0, 1)

    isFull = columnValues.includes(null) ? false : true
    return isFull
}


module.exports = {
    clickGridCell,
    attemptToPlacePiece,
    findIsColumnFull,
    drawGrid
}