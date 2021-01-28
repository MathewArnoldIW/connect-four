board = createEmptyBoard()


function createEmptyBoard() {
    let newBoard = []
    
    for (let i = 0; i < gridSize; i++) {
        let row = []

        for (let j = 0; j < gridSize; j++) {
            row.push(null)
        }

        newBoard.push(row)
    }

    return newBoard
}


function dropPieceIntoColumn(team, columnIndex) {
    const column = board[columnIndex]
    const firstEmptyIndex = column.findIndex(cell => cell == null)

    if (firstEmptyIndex != -1) {
        column[firstEmptyIndex] = team
    }
}