function initializeGame() {
    console.log(`---INITIALIZATION BEGINS---`)

    let newGameData = new LocalGameData()
    newGameData.initializeNewGameData()

    const gameDataWithGrid = initializeGrid(newGameData)
    bindClickEvents(gameDataWithGrid)
    gameDataWithGrid.drawGrid()
    updateStorageObject(gameDataWithGrid)
    
    console.log(`---INITIALIZATION ENDS---`)
}