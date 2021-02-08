function dropPieceIntoColumn(gameData, team, columnIndex) {
    //TODO: refactor to use gameData
    const column = board[columnIndex]
    const firstEmptyIndex = column.findIndex(cell => cell == null)

    if (firstEmptyIndex != -1) {
        column[firstEmptyIndex] = team
    } else {
        return null
    }

    return board
}


function checkWinner(teamToCheck, x, y) {

}