class LocalGameData {
    _gridWidth = 7
    _gridHeight = 6
    boardState
    cellNames = []
    cellImageNames = []
    imageFileNameTemplate = [`../img/tokens/cell_`, `.png`]

    allTeamColors = [
        "blue",
        "brown",
        "green",
        "orange",
        "purple",
        "red",
        "yellow",
        "pink",
        "madness",
        "mayhem"
    ]

    playerOneName = "playerOne"
    playerTwoName = "playerTwo"
    playerOneScore = 0
    playerTwoScore = 0
    currentTurn = 0
    teams
    teamColors = [null, null]
    teamTokenFileNames = [null, null]
    isGameInSession
    
    playerOneFirst
    playerTwoFirst

    ordinalVectors = [
        [1, 1],
        [1, 0],
        [0, 1],
        [1, -1]
    ]

    constructor() {
        console.log(`New instance of LocalGameData created`)
        this.generateTeamOrderArrays()
    }

    initializeNewGameData() {
        console.log(`Called initializeGameData()`)
        this.generateEmptyBoardArray()
        this.chooseTeamOrder()

        this.teamColors[0] = this.pickRandomColor(this.teamColors)
        this.teamColors[1] = this.pickRandomColor(this.teamColors)

        this.addTokenFileNameToTeam(0, this.teamColors[0])
        this.addTokenFileNameToTeam(1, this.teamColors[1]) //TODO: constructor has not been tested

        populateColorSelects(this.allTeamColors, this.teamColors)

        this.isGameInSession = true
    }

    newRound(winningTeamIndex) {
        if (winningTeamIndex == 0) {
            this.playerOneScore++
        } else if (winningTeamIndex == 1) {
            this.playerTwoScore++
        }
        
        this.currentTurn = 0
        this.generateEmptyBoardArray()
        this.chooseTeamOrder()
        this.isGameInSession = true
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

    get2DCoordinates(boardIndex) {
        const x = boardIndex % this._gridWidth
        const y = Math.floor(boardIndex / this._gridWidth)

        return [x, y]
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
        //console.log(`Called pushNewCellElement()`)
        this.cellNames.push(cellName)
        this.cellImageNames.push(cellImageName)
    }

    getCellValue(x, y) {
        //console.log(`Called getCellValue()`)

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

    pickRandomColor(blacklistedColors = []) {
        const availableColors = this.allTeamColors.filter(color => !blacklistedColors.includes(color))
        const randomIndex = Math.floor(Math.random() * availableColors.length)

        return availableColors[randomIndex]
    }

    updateTeamColor(teamIndex, newColor) {
        console.log(`Called updateTeamColor()`)
        console.log(`teamColors before update are: ${this.teamColors}`)
        console.log(`newColor is: ${newColor}`)

        this.teamColors[teamIndex] = newColor
        this.addTokenFileNameToTeam(teamIndex, newColor)

        console.log(`teamColors after update are: ${this.teamColors}`)
        
        populateColorSelects(this.allTeamColors, this.teamColors)
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

        const firstEmptyIndex = this.getFirstEmptyColumnIndex(columnPlayed)
        const firstEmptyAsBoardIndex = this.getBoardIndex(columnPlayed, firstEmptyIndex)

        this.boardState[firstEmptyAsBoardIndex] = this.getCurrentTeam()
        const isWin = this.checkWinner(columnPlayed, firstEmptyIndex)

        if (isWin) {
            console.log("A WINNER IS YOU!")
            this.winActions(this.currentTurn % this.teams.length)
        } else {
            this.gameContinueActions()
        }
    }

    getFirstEmptyColumnIndex(column) {
        const columnValues = this.getLineOfValues(column, 0, 0, 1)
        return columnValues.findIndex(value => value == null)
    }

    drawGrid() {
        console.log(`Called drawGrid()`)
        console.log(this.boardState)
        console.log(`turn: ${this.currentTurn}`)
        
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

    checkWinner(xCoordPlayed, yCoordPlayed) {
        for (let vector of this.ordinalVectors) {
            if (this.findMatchingLineLength(xCoordPlayed, yCoordPlayed, vector) >= 3) {
                return true
            }
        }

        return false
    }

    checkStalemate() {
        const cellCount = this._gridHeight * this._gridWidth
        return this.currentTurn >= cellCount
    }

    findMatchingLineLength(rootXCoord, rootYCoord, vector) {
        const invertedVector = [vector[0] * -1, vector[1] * -1]

        const lineLengthVectorDirection = this.countValuesSingleDirection(rootXCoord, rootYCoord, vector)
        const lineLengthInvertedVectorDirection = this.countValuesSingleDirection(rootXCoord, rootYCoord, invertedVector)

        return lineLengthVectorDirection + lineLengthInvertedVectorDirection
    }

    countValuesSingleDirection(rootXCoord, rootYCoord, vector) {
        let currentXCoord = rootXCoord
        let currentYCoord = rootYCoord
        let lineLength = 0

        const valueOfRoot = this.boardState[this.getBoardIndex(rootXCoord, rootYCoord)]
        
        while (true) {
            currentXCoord += vector[0]
            currentYCoord += vector[1]

            const currentValue = this.getCellValue(currentXCoord, currentYCoord)

            if (currentValue == valueOfRoot) {
                lineLength++
            } else {
                break
            }
        }

        return lineLength
    }

    gameContinueActions() {
        this.currentTurn++
        this.drawGrid()
        const isDraw = this.checkStalemate()

        if (isDraw) {
            this.drawActions()
        }
    }

    winActions(winningIndex) {
        this.isGameInSession = false
        this.drawGrid()
        resetWonGame(this.getCheckerColors(), this.cellImageNames, winningIndex)
    }

    drawActions() {
        this.isGameInSession = false
        resetDrawnGame(this.getCheckerColors(), this.cellImageNames)
    }

    
    getCheckerColors() {
    const evenCheckerColor = this.pickRandomColor(this.teamColors)
    const oddCheckerColor = this.pickRandomColor(this.teamColors.concat([evenCheckerColor]))

    const evenCheckerTokenFile = this.getTokenFileName(evenCheckerColor)
    const oddCheckerTokenFile = this.getTokenFileName(oddCheckerColor)
    const nullTokenFile = this.getTokenFileName("null")

    return [evenCheckerTokenFile, oddCheckerTokenFile, nullTokenFile, nullTokenFile]
    }
}


function updateStorageObject(localGameData) {
    console.log(`Called updateStorageObject()`)

    const stringifiedData = JSON.stringify(localGameData)
    sessionStorage.setItem("gamedata", stringifiedData)

    console.log(`state of isGameInSession at point of update: ${localGameData.isGameInSession}`)
}


function getGameData() {
    console.log(`Called getGameData()`)

    const stringifiedData = sessionStorage.getItem("gamedata")
    const parsedData = JSON.parse(stringifiedData)
    const gameDataObject = Object.assign(new LocalGameData(), parsedData)

    console.log(`isGameInSession at the point of grabbing: ${gameDataObject.isGameInSession}`)

    return gameDataObject
}


module.exports = {
    LocalGameData,
    updateStorageObject,
    getGameData
}
