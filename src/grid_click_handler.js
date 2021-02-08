function clickGridCell(x, y, gameData, event) {
    console.log(`Called clickGridCell() - Clicked (${x}, ${y})`)

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