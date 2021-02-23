function initializeGame() {
    console.log(`---INITIALIZATION BEGINS---`)

    let newGameData = new LocalGameData()
    newGameData.initializeNewGameData()

    const gameDataWithGrid = initializeGrid(newGameData)
    bindGridInteractionEvents(gameDataWithGrid)
    gameDataWithGrid.drawGrid()
    updateStorageObject(gameDataWithGrid)

    bindColorSelectEvents()
    bindButtonRandom()

    console.log(`---INITIALIZATION ENDS---`)
}
