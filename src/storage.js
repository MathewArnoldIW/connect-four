class LocalGameData {
    _gridWidth = 7
    _gridHeight = 6
    boardState
    cellNames = []
    cellImageNames = []
    imageFileNameTemplate = [`../img/tokens/cell_`, `.png`]

    teamColors = [
        "blue",
        "brown",
        "green",
        "orange",
        "purple",
        "red",
        "yellow"
    ]

    playerOneName = "playerOne"
    playerTwoName = "playerTwo"
    playerOneScore = 0
    playerTwoScore = 0
    currentTurn = 0
    teams
    teamTokenFileNames = [null, null]
    isGameInSession = true
    
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

        const teamOneColor = this.pickRandomColor()
        const teamTwoColor = this.pickRandomColor(teamOneColor)

        this.addTokenFileNameToTeam(0, teamOneColor)
        this.addTokenFileNameToTeam(1, teamTwoColor) //TODO: constructor has not been tested
    }

    getBoardIndex(x, y) {
        if (Math.min(x, y) < 0) {
            return -1
        }

        if (x >= this._gridWidth || y >= this._gridHeight) {
            return -1
        }

        const yHorizontalValue = y * this._gridWidth
        const horizontalCoordinate = x + yHorizontalValue

        return horizontalCoordinate
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

        const boardIndex = this.getBoardIndex(x, y)

        if (boardIndex == -1) {
            return -1
        }

        return this.boardState[boardIndex]
    }

    getCurrentTeam() {
        const teamIndex = this.currentTurn % this.teams.length
        return this.teams[teamIndex]
    }

    pickRandomColor(blacklistedColor = null) {
        const availableColors = this.teamColors.filter(color => color != blacklistedColor)
        const randomIndex = Math.floor(Math.random() * availableColors.length)

        return availableColors[randomIndex]
    }

    getTokenFileName(color) {
        const colorFileNameSegment = color == null ? `null` : color
        return this.imageFileNameTemplate.join(colorFileNameSegment)
    }

    addTokenFileNameToTeam(teamIndex, colorToAdd) {
        const fileNameToAdd = this.getTokenFileName(colorToAdd)
        this.teamTokenFileNames[teamIndex] = fileNameToAdd
    }

    getLineOfValues(xOrigin, yOrigin, xDirection, yDirection) {
        if (xDirection == 0 && yDirection && 0) {
            return
        }
        
        let returnLine = []
        let currentXCoord = xOrigin
        let currentYCoord = yOrigin
        
        while (true)
        {
            let valueAtCoords = this.getCellValue(currentXCoord, currentYCoord)

            if (valueAtCoords == -1) {
                break
            }

            returnLine.push(valueAtCoords)
            currentXCoord += xDirection
            currentYCoord += yDirection
        }

        return returnLine
    }

    takeTurn(columnPlayed) {
        console.log(`Called takeTurn()`)

        const columnValues = this.getLineOfValues(columnPlayed, 0, 0, 1)
        const firstEmptyIndex = columnValues.findIndex(value => value == null)
        const firstEmptyAsBoardIndex = this.getBoardIndex(columnPlayed, firstEmptyIndex)

        this.boardState[firstEmptyAsBoardIndex] = this.getCurrentTeam()
        this.checkWinner(firstEmptyAsBoardIndex)

        this.currentTurn++ //should probably move into checkWinner once written
        this.drawGrid()
    }

    checkWinner(boardIndexPlayed) {

    }

    drawGrid() {
        console.log(`Called drawGrid()`)
        console.log(this.boardState)
        
        for (const imageName of this.cellImageNames) {
            const imageElement = document.getElementById(imageName)
            const imageNameSegments = imageName.split(`-`)
            const x = parseInt(imageNameSegments[1])
            const y = parseInt(imageNameSegments[2])

            const boardIndex = this.getBoardIndex(x, y)
            const cellValue = this.boardState[boardIndex]

            const teamIndex = this.teams.findIndex(teamName => teamName == cellValue)
            imageElement.src = teamIndex == -1 ? `../img/tokens/cell_null.png` : this.teamTokenFileNames[teamIndex]
        }
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
    LocalGameData,
    updateStorageObject,
    getGameData
}