function initializeGame() {
    console.log(`---INITIALIZATION BEGINS---`)

    let newGameData = new LocalGameData()
    newGameData.initializeNewGameData()

    const gameDataWithGrid = initializeGrid(newGameData)
    bindClickEvents(gameDataWithGrid)
    drawGrid(gameDataWithGrid)
    updateStorageObject(gameDataWithGrid)
    
    console.log(`---INITIALIZATION ENDS---`)
}