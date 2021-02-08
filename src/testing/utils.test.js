const utilsModule = require("../utils")

//Tests for: getCellNameFromCoords()
test("getCellNameFromCoords returns correct cell name", () => {
    //ARRANGE
    const xCoord = Math.floor(Math.random() * 100)
    const yCoord = Math.floor(Math.random() * 100)
    const expectedCellName = `cell-${xCoord}-${yCoord}`

    //ACT
    const actualCellName = utilsModule.getCellNameFromCoords(xCoord, yCoord, false)

    //ASSERT
    expect(expectedCellName).toStrictEqual(actualCellName)
})


test("getCellNameFromCoords returns correct cell image name", () => {
    //ARRANGE
    const xCoord = Math.floor(Math.random() * 100)
    const yCoord = Math.floor(Math.random() * 100)
    const expectedCellImageName = `cell-${xCoord}-${yCoord}-img`

    //ACT
    const actualCellImageName = utilsModule.getCellNameFromCoords(xCoord, yCoord, true)

    //ASSERT
    expect(expectedCellImageName).toStrictEqual(actualCellImageName)
})