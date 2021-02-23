function clickGridCell(x, y, event) {
    console.log(`Called clickGridCell() - Clicked (${x}, ${y})`)
    
    const gameData = getGameData()

    if (!gameData.isGameInSession) {
        return
    }

    attemptToPlacePiece(x, gameData)
    updateStorageObject(gameData)
}


function mouseOverGridCell(cellName, event) {
    const cell = document.getElementById(cellName)
    const cellImage = cell.children[0]
    cellImage.style.filter = `brightness(90%)`
}


function mouseOutGridCell(cellName, event) {
    const cell = document.getElementById(cellName)
    const cellImage = cell.children[0]
    cellImage.style.filter = `brightness(100%)`
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


function changePlayerColor(playerIndex, event) {
    console.log(`Called changePlayerColor()`)
    
    const gameData = getGameData()
    
    const optionIndex = event.target.options.selectedIndex
    const selectElement = event.path[0]
    const colorChosen = selectElement.options[optionIndex].text.toLowerCase()

    if (!gameData.isGameInSession || colorChosen == "choose a new colour...") {
        populateColorSelects(gameData.allTeamColors, gameData.teamColors)
    } else {
        gameData.updateTeamColor(playerIndex, colorChosen)
        gameData.drawGrid()
        updateStorageObject(gameData)
    }
}


function clickButtonRandom() {
    console.log(`Called clickButtonRandom()`)

    const gameData = getGameData()

    if (!gameData.isGameInSession) {
        return
    }

    automatedTurnRandom(gameData)
}


module.exports = {
    clickGridCell,
    attemptToPlacePiece,
    findIsColumnFull,
    clickButtonRandom
}
