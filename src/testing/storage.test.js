const storageModule = require("../storage")


function getExampleLocalGameData() {
    const newData = new storageModule.LocalGameData()
    return newData
}


//TESTS FOR: LocalGameData class methods
test("generateEmptyBoardArray() creates a 1D array of nulls based on width and height", () => {
    const widthHeightExpectedArrangements = [
        [2, 3, [null, null, null, null, null, null]], 
        [4, 1, [null, null, null, null]],
        [9, 0, []],
    ]
    
    for (let i = 0; i < widthHeightExpectedArrangements.length; i++) {
        const testCase = widthHeightExpectedArrangements[i]
        
        //ARRANGE
        const exampleGridWidth = testCase[0]
        const exampleGridHeight = testCase[1]
        const expectedArray = testCase[2]

        const exampleData = getExampleLocalGameData()
        exampleData._gridWidth = exampleGridWidth
        exampleData._gridHeight = exampleGridHeight

        //ACT
        exampleData.generateEmptyBoardArray()
        const actualArray = exampleData.boardState

        //ASSERT
        expect(expectedArray).toStrictEqual(actualArray)
    }
})


test("When given new player names, generateTeamOrderArrays() produces two correct arrays", () => {
    //ARRANGE
    const exampleData = getExampleLocalGameData()

    exampleData.playerOneName = "Mike"
    exampleData.playerTwoName = "Ike"
    const expectedPlayerOneFirst = ["Mike", "Ike"]
    const expectedPlayerTwoFirst = ["Ike", "Mike"]

    //ACT
    exampleData.generateTeamOrderArrays()
    const actualPlayerOneFirst = exampleData.playerOneFirst
    const actualPlayerTwoFirst = exampleData.playerTwoFirst

    //ASSERT
    expect(expectedPlayerOneFirst).toStrictEqual(actualPlayerOneFirst)
    expect(expectedPlayerTwoFirst).toStrictEqual(actualPlayerTwoFirst)
})


test("chooseTeamOrder selects losing team first when scores are not equal", () => {
    //ARRANGE
    const exampleData = getExampleLocalGameData()
    const p1Name = exampleData.playerOneName
    const p2Name = exampleData.playerTwoName

    exampleData.playerOneScore = Math.floor(Math.random() * 100)
    exampleData.playerTwoScore = exampleData.playerOneScore + 1
    const expectedTeamOrder = [p1Name, p2Name]

    //ACT
    exampleData.chooseTeamOrder()
    const actualTeamOrder = exampleData.teams

    //ASSERT
    expect(expectedTeamOrder).toStrictEqual(actualTeamOrder)
})


test("chooseTeamOrder selects both teams evenly when scores are equal, over 10000 iterations within 2% intolerance", () => {
    //ARRANGE
    const exampleData = getExampleLocalGameData()
    exampleData.playerOneScore = 0
    exampleData.playerTwoScore = 0

    const iterations = 10000
    const tolerance = 0.02

    const expectedTeamCount = iterations * 0.5
    const boundDifference = iterations * tolerance
    const upperBound = expectedTeamCount + boundDifference
    const lowerBound = expectedTeamCount - boundDifference

    let teamOneCount = 0
    let teamTwoCount = 0
    const teamOneOrder = [exampleData.playerOneName, exampleData.playerTwoName].toString()
    const teamTwoOrder = [exampleData.playerTwoName, exampleData.playerOneName]

    //ACT
    for (let i = 0; i < iterations; i++) {
        exampleData.chooseTeamOrder()
        
        if (exampleData.teams.toString() == teamOneOrder.toString()) {
            teamOneCount++
        } else if (exampleData.teams.toString() == teamTwoOrder.toString()) {
            teamTwoCount++
        }
    }

    const isTeamOneWithinTolerance = (lowerBound < teamOneCount) && (teamOneCount < upperBound)
    const isTeamTwoWithinTolerance = (lowerBound < teamTwoCount) && (teamTwoCount < upperBound)

    //ASSERT
    expect(iterations).toStrictEqual(teamOneCount + teamTwoCount)
    expect(isTeamOneWithinTolerance).toBeTruthy()
    expect(isTeamTwoWithinTolerance).toBeTruthy()
})


test("pushNewCellElement() should add a cell name and image name to the ends of stored arrays", () => {
    //ARRANGE
    const exampleData = getExampleLocalGameData()
    exampleData.cellNames = ["cell1", "cell2"]
    exampleData.cellImageNames = ["image1"]
    
    const newCell = "newCell"
    const newImage = "newimage"
    const expectedCellNames = ["cell1", "cell2", newCell]
    const expectedImageNames = ["image1", newImage]

    //ACT
    exampleData.pushNewCellElement(newCell, newImage)

    //ASSERT
    expect(expectedCellNames.toString()).toStrictEqual(exampleData.cellNames.toString())
    expect(expectedImageNames.toString()).toStrictEqual(exampleData.cellImageNames.toString())
})


test("getCellValue() can find values in a grid by converting x and y to a 1D array index", () => {
    const markerToFind = "marco"
    const coordinateDimensionBoardArrangements = [
        [1, 2, 3, 4, [null, null, null, null, null, null, null, markerToFind, null, null, null, null]],
        [0, 0, 2, 2, [markerToFind, null, null, null]],
        [3, 0, 4, 2, [null, null, null, markerToFind, null, null, null, null]]
    ]
    
    for (let i = 0; i < coordinateDimensionBoardArrangements.length; i++) {
        const testParameters = coordinateDimensionBoardArrangements[i]

        //ARRANGE
        const markerX = testParameters[0]
        const markerY = testParameters[1]

        const exampleData = getExampleLocalGameData()
        exampleData._gridWidth = testParameters[2]
        exampleData._gridHeight = testParameters[3]
        exampleData.boardState = testParameters[4]

        //ACT
        const actualCellValueFound = exampleData.getCellValue(markerX, markerY)

        //ASSERT
        expect(markerToFind).toStrictEqual(actualCellValueFound)
    }
})


test("getCurrentTeam finds correct team based on turn number", () => {
    const iterations = 10
    
    //EVEN NUMBERED TURN TEST
    for (let i = 0; i < iterations; i++) {
        //ARRANGE
        const exampleData = getExampleLocalGameData()
        exampleData.teams = [true, false]
        exampleData.currentTurn = Math.floor(Math.random() * 100) * 2

        //ACT
        const actualCurrentTeam = exampleData.getCurrentTeam()

        //ASSERT
        expect(actualCurrentTeam).toBeTruthy()
    }

    //EVEN NUMBERED TURN TEST
    for (let i = 0; i < iterations; i++) {
        //ARRANGE
        const exampleData = getExampleLocalGameData()
        exampleData.teams = [false, true]
        exampleData.currentTurn = (Math.floor(Math.random() * 100) * 2) + 1

        //ACT
        const actualCurrentTeam = exampleData.getCurrentTeam()

        //ASSERT
        expect(actualCurrentTeam).toBeTruthy()
    }
})


test("pickRandomColor() will always avoid the blacklisted color", () => {
    const exampleData = getExampleLocalGameData()
    exampleData.allTeamColors = ["black", "white"]
    
    const blacklistedColors = [["black"], ["white"]]
    const expectedRandomColors = ["white", "black"]
    const iterations = 10
    
    for (let i = 0; i < blacklistedColors.length; i++) {
        for (let j = 0; j < iterations; j++) {    
            //ARRANGE
            const blacklistedColor = blacklistedColors[i]
            const expectedRandomColor = expectedRandomColors[i]

            //ACT
            const actualRandomColor = exampleData.pickRandomColor(blacklistedColor)

            //ASSERT
            expect(expectedRandomColor).toStrictEqual(actualRandomColor)
        }
    }
})


test("addTokenFileNameToTeam() correctly formats the image file name and adds to teamTokenFileNames", () => {
    //ARRANGE
    const exampleData = getExampleLocalGameData()
    const firstColor = "mauve"
    const secondColor = "lilac"
    const expectedFileNames = [`../img/tokens/cell_mauve.png`, `../img/tokens/cell_lilac.png`]
 
    //ACT
    exampleData.addTokenFileNameToTeam(0, firstColor)
    exampleData.addTokenFileNameToTeam(1, secondColor)

    //ASSERT
    expect(expectedFileNames).toStrictEqual(exampleData.teamTokenFileNames)
})


//TESTS FOR: getting and setting with sessionStorage
class SessionStorageStub {
    loadedString
    stringifiedData
    
    constructor() {

    }

    getItem(key) {
        if (key !== "gamedata") {
            return null
        } else {
            return this.stringifiedData
        }
    }

    setItem(key, value) {
        if (key !== "gamedata") {
            this.loadedString = null
        } else {
            this.loadedString = value
        }
    }

    getLastPlay() {
        return [1, 2]
    }

    setStringifiedJSON(stringifiedData) {
        this.stringifiedData = stringifiedData
    }
}


const sessionStorageStub = new SessionStorageStub()
Object.defineProperty(window, 'sessionStorage', {value: sessionStorageStub})


test("updateStorageObject puts stringified game data into sessionStorage", () => {
    //ARRANGE
    const exampleData = getExampleLocalGameData()
    
    const propertiesToTest = {
        "_gridHeight": 1,
        "_gridWidth": 2,
        "playerOneScore": 3,
        "playerTwoScore": 4,
        "currentTurn": 5,
        "boardState": ["RED", "YELLOW"],
        "cellNames": ["CELL"],
        "cellImageNames": ["IMAGE"],
        "teams": ["YELLOW", "RED"]
    }
    
    for (const [key, value] of Object.entries(propertiesToTest)) {
        exampleData[key] = value    
    }

    //ACT
    storageModule.updateStorageObject(exampleData)
    const loadedString = sessionStorageStub.loadedString
    const actualObject = JSON.parse(loadedString)
    
    //ASSERT
    for (const [key, value] of Object.entries(propertiesToTest)) {
        expect(value).toStrictEqual(actualObject[key])
    }
})


test("getGameData() returns correct object type", () => {
    //ARRANGE
    const propertiesToTest = {
        "_gridHeight": 6,
        "_gridWidth": 7,
        "playerOneScore": 8,
        "playerTwoScore": 9,
        "currentTurn": 10,
        "boardState": ["BLUE", "GREEN"],
        "cellNames": ["CELLNAME"],
        "cellImageNames": ["IMAGENAME"],
        "teams": ["GREEN", "BLUE"]
    }

    const propertiesToTestStringified = JSON.stringify(propertiesToTest)
    sessionStorageStub.setStringifiedJSON(propertiesToTestStringified)

    //ACT
    const actualClassInstance = storageModule.getGameData()

    //ASSERT
    expect(actualClassInstance instanceof storageModule.LocalGameData).toBeTruthy()
    
    for (const [key, value] of Object.entries(propertiesToTest)) {
        expect(value).toStrictEqual(actualClassInstance[key])
    }
})
