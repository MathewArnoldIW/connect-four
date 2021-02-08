const utilsModule = require("../utils")

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