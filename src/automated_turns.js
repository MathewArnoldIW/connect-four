function automatedTurnRandom(gameData) {
    const playablePositions = getPlayablePositions(gameData)
    const randomPlayablePosition = chooseRandomPosition(playablePositions)
    const positionAs2DCoordinates = gameData.get2DCoordinates(randomPlayablePosition)
    gameData.takeTurn(positionAs2DCoordinates[0])
    updateStorageObject(gameData)

    console.log(`Playable positions for the AI player: ${playablePositions}`)
    console.log(`Randomly selected position for the AI player: ${randomPlayablePosition}`)

}


function getPlayablePositions(gameData) {
    let playablePositions = []

    for (let i = 0; i < gameData._gridWidth; i++) {
        const emptyIndex = gameData.getFirstEmptyColumnIndex(i)
        const emptyBoardPosition = gameData.getBoardIndex(i, emptyIndex)

        if (emptyIndex != -1) {
            playablePositions.push(emptyBoardPosition)
        }
    }

    return playablePositions
}


function chooseRandomPosition(boardIndexes) {
    const randomIndex = Math.floor(Math.random() * boardIndexes.length)
    return boardIndexes[randomIndex]
}
