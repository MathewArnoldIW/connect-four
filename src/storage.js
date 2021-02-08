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
        //(x, y) values are counted from lower-left; i values are counted from upper-left
        const yInverted = this._gridHeight - y
        const yHorizontalValue = yInverted * this._gridWidth
        const horizontalCoordinate = x + yConvertedInverted

        return this.boardState[horizontalCoordinate]
    }
}


function updateStorageObject(localGameData) {
    console.log(`Called localGameData()`)
    
    for (let member in localGameData) {
        //definitely needs testing, probably won't work
        //sessionStorage.member = localGameData.member
        //alternatively:
        sessionStorage[member] = localGameData[member]
    }
}


function getGameData() {
    console.log(`Called getGameData()`)
    let localGameData = new LocalGameData()

    localGameData.gridSize = parseInt(sessionStorage.gridSize)
    localGameData.currentTurn = parseInt(sessionStorage.currentTurn)

    localGameData.cellNames = parseListFromStorage(sessionStorage.cellNames)
    localGameData.cellImageNames = parseListFromStorage(sessionStorage.cellImageNames)
    localGameData.teams = parseListFromStorage(sessionStorage.teams)

    localGameData.playerOneName = sessionStorage.playerOneName
    localGameData.playerTwoName = sessionStorage.playerTwoName
    localGameData.generateTeamOrderArrays()

    return localGameData
}


function parseListFromStorage(listString) {
    console.log(`Called parseListFromStorage()`)
    return listString.split(",")
}