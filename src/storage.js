class LocalGameData {
    _gridWidth = 7
    _gridHeight = 6
    boardState
    cellNames = []
    cellImageNames = []

    playerOneName = "playerOne"
    playerTwoName = "playerTwo"
    playerOneScore = 0
    playerTwoScore = 0
    currentTurn = 0
    teams
    
    playerOneFirst
    playerTwoFirst

    constructor() {
        console.log(`New instance of LocalGameData created`)
        this.generateTeamOrderArrays()
    }

    initializeNewGameData() {
        console.log(`Called initializeGameData()`)
        this.generateEmptyBoardArray()
        this.chooseTeamOrder()
    }

    generateEmptyBoardArray() {
        console.log(`Called generateEmptyBoardArray()`)
        let emptyBoardState = []
        
        for (let i = 0; i < (this._gridWidth * this._gridHeight); i++) {
            emptyBoardState.push(null)
        }

        this.boardState = emptyBoardState
    }

    generateTeamOrderArrays() {
        console.log(`Called generateTeamOrderArrays()`)
        this.playerOneFirst = [this.playerOneName, this.playerTwoName]
        this.playerTwoFirst = [this.playerTwoName, this.playerOneName]
    }

    chooseTeamOrder() {
        console.log(`Called chooseTeamOrder()`)
        
        if (this.playerOneScore !== this.playerTwoScore) {
            this.teams = this.playerOneScore > this.playerTwoScore ? this.playerTwoFirst : this.playerOneFirst
        } else {
            this.teams = Math.random() >= 0.5 ? this.playerOneFirst : this.playerTwoFirst
        }
    }

    pushNewCellElement(cellName, cellImageName) {
        console.log(`Called pushNewCellElement()`)
        this.cellNames.push(cellName)
        this.cellImageNames.push(cellImageName)
    }

    getCellValue(x, y) {
        console.log(`Called getCellValue()`)
        const yHorizontalValue = y * this._gridWidth
        const horizontalCoordinate = x + yHorizontalValue

        return this.boardState[horizontalCoordinate]
    }

    getCurrentTeam() {
        const teamIndex = this.currentTurn % this.teams.length
        return this.teams[teamIndex]
    }
}


function updateStorageObject(localGameData) {
    console.log(`Called updateStorageObject()`)

    const stringifiedData = JSON.stringify(localGameData)
    sessionStorage.setItem("gamedata", stringifiedData) //deal with this magic string?
}


function getGameData() {
    console.log(`Called getGameData()`)

    const stringifiedData = sessionStorage.getItem("gamedata") //deal with this magic string?
    const parsedData = JSON.parse(stringifiedData)
    const gameDataObject = Object.assign(new LocalGameData(), parsedData)

    return gameDataObject
}


module.exports = {
    LocalGameData
}