function clickGridCell(x, y, event) {
    console.log(`Called clickGridCell() - Clicked (${x}, ${y})`)

    currentTeam = getCurrentTeam()

    let board = dropPieceIntoColumn(currentTeam, y)
    let piecePlacedSuccess = board == null ? false : true

    if (piecePlacedSuccess != null) {
        currentTurn++

        checkWinner(currentTeam, x, y)
        drawGrid()
    }
}


function getCurrentTeam() {
    //TODO move to class
    console.log("Called getCurrentTeam()")
    currentTeam = teams[currentTurn % 2]

    console.log(`Current team is ${currentTeam}`)
    return currentTeam
}


function drawGrid() {
    console.log("Called drawGrid()")
    return null
}