function automatedTurnRandom(gameData) {
    const playablePositions = getPlayablePositions(gameData)
    const randomPlayablePosition = chooseRandomPosition(playablePositions)
    gameData.takeTurn(randomPlayablePosition[0])
    updateStorageObject(gameData)

    console.log(`Playable positions for the AI player: ${playablePositions}`)
    console.log(`Randomly selected position for the AI player: ${randomPlayablePosition}`)

}


function automatedTurnReasoned(realGameData) {
    const playablePositions = getPlayablePositions(realGameData)
    const availableWinColumn = checkForAvailableWin(realGameData, playablePositions)

    if (availableWinColumn != null) {
        realGameData.takeTurn(availableWinColumn)
        updateStorageObject(realGameData)
        return
    }

    const bestPlayablePositions = findPositionsThatResultInLoss(realGameData, playablePositions)

    automatedTurnRandom(realGameData)
}


function getPlayablePositions(gameData) {
    let playablePositions = []

    for (let i = 0; i < gameData._gridWidth; i++) {
        const emptyIndex = gameData.getFirstEmptyColumnIndex(i)

        if (emptyIndex != -1) {
            playablePositions.push([i, emptyIndex])
        }
    }

    return playablePositions
}


function chooseRandomPosition(boardIndexes) {
    const randomIndex = Math.floor(Math.random() * boardIndexes.length)
    return boardIndexes[randomIndex]
}


function checkForAvailableWin(realGameData, playablePositions) {
    for (const position of playablePositions) {
        const positionAsBoardIndex = realGameData.getBoardIndex(...position)
        
        let cloneGameData = new LocalGameData()
        cloneGameData.boardState = [...realGameData.boardState]
        cloneGameData.teams = [...realGameData.teams]
        const isCurrentPlayerWin = checkWinAtPosition(cloneGameData, positionAsBoardIndex)
        
        cloneGameData.currentTurn++
        const isOpponentWin = checkWinAtPosition(cloneGameData, positionAsBoardIndex)

        if (isCurrentPlayerWin || isOpponentWin) {
            return position[0]
        } 
    }

    return null
}


function checkWinAtPosition(cloneGameData, boardIndex) {
    cloneGameData.boardState[boardIndex] = cloneGameData.getCurrentTeam()
    const coordinatesAs2D = cloneGameData.get2DCoordinates(boardIndex)
    const isWin = cloneGameData.checkWinner(...coordinatesAs2D)

    return isWin
}


function findPositionsThatResultInLoss(realGameData, playablePositions) {
    let lossPositionsForCurrentPlayer = []
    let lossPositionsForOpponent = []

    for (let position of playablePositions) {
        const positionAsBoardIndex = realGameData.getBoardIndex(...position)
        const positionAbove = [position[0], position[1] + 1]
        const positionAboveAsBoardIndex = realGameData.getBoardIndex(...positionAbove)
        const isTopOfBoard = checkIfPositionIsAtTopOfBoard(realGameData, position)

        if (isTopOfBoard) {
            continue
        }

        let cloneGameData = new LocalGameData()
        cloneGameData.boardState = [...realGameData.boardState]
        cloneGameData.teams = [...realGameData.teams]

        cloneGameData.boardState[positionAsBoardIndex] = cloneGameData.getCurrentTeam()
        cloneGameData.currentTurn++
        const isOpponentWin = checkWinAtPosition(cloneGameData, positionAboveAsBoardIndex)

        if (isOpponentWin) {
            lossPositionsForCurrentPlayer.push(position)
        }

        cloneGameData.boardState[positionAsBoardIndex] = cloneGameData.getCurrentTeam()
        cloneGameData.currentTurn++
        const isCurrentPlayerWin = checkWinAtPosition(cloneGameData, positionAboveAsBoardIndex)

        if (isCurrentPlayerWin) {
            lossPositionsForOpponent.push()
        }
    }

    console.log(`Positions in which the opponent wins next turn: ${lossPositionsForCurrentPlayer}`)
    console.log(`Positions in which I win next turn: ${lossPositionsForOpponent}`)

    return assessLossPositions(playablePositions, lossPositionsForCurrentPlayer, lossPositionsForOpponent)
}


function checkIfPositionIsAtTopOfBoard(realGameData, position) {
    return position[1] == (realGameData._gridHeight - 1)
}


function assessLossPositions(playablePositions, lossPositionsForCurrentPlayer, lossPositionsForOpponent) {
    
}
