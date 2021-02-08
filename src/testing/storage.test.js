const storageModule = require("../storage")


function getExampleLocalGameData() {
    const newData = new storageModule.LocalGameData()
    return newData
}

//Tests for: LocalGameData class methods
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