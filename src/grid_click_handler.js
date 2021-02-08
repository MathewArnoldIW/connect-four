function clickGridCell(x, y, event) {
    console.log(`Called clickGridCell() - Clicked (${x}, ${y})`)

    const gameData = getGameData()
    currentTeam = gameData.getCurrentTeam()

    // let board = dropPieceIntoColumn(currentTeam, y)
    // let piecePlacedSuccess = board == null ? false : true

    // if (piecePlacedSuccess != null) {
    //     currentTurn++

    //     checkWinner(currentTeam, x, y)
    //     drawGrid()
    // }
}


function drawGrid() {
    console.log("Called drawGrid()")
    return null
}