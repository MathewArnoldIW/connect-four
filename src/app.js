function initializeGame() {
    console.log(`---INITIALIZATION BEGINS---`)

    let newGameData = new LocalGameData()
    newGameData.initializeNewGameData()

    const gameDataWithGrid = initializeGrid(newGameData)
    bindGridInteractionEvents(gameDataWithGrid)
    gameDataWithGrid.drawGrid()
    updateStorageObject(gameDataWithGrid)

    bindColorSelectEvents()
    bindButtons()

    apiCallTesting()

    if (false) {
        gameDataWithGrid.boardState = ["playerTwo", "playerOne", "playerTwo", "playerOne", "playerOne", "playerTwo", "playerOne", "playerOne", "playerTwo", "playerOne", "playerTwo", "playerTwo", "playerOne", "playerTwo", "playerOne", null, "playerTwo", "playerOne", "playerOne", "playerTwo", null, null, null, "playerTwo", "playerTwo", null, null, null, null, null, "playerOne", null, null, null, null, null, null, null, null, null, null, null]
        gameDataWithGrid.drawGrid()
    }

    console.log(`---INITIALIZATION ENDS---`)
}


function apiCallTesting() {
    fetch('http://localhost:8080/hello')
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data)
                })
        }, error => {
            console.log("there was an error: " + error)
        })
}
