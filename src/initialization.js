function initializeGrid(gameData) {
    console.log(`Called initializeGrid()`)
    let grid = document.createElement(`TABLE`)
    //grid.cellSpacing = 0

    createGridParent(grid)

    const gameDataWithCells = createCellsAndImages(gameData, grid)
    return gameDataWithCells
}


function createCellsAndImages(gameData, grid) {
    for (let i = gameData._gridHeight - 1; i >= 0; i--) {
        let row = grid.insertRow(-1)
        row.className = `grid-row`

        for (let j = 0; j < gameData._gridWidth; j++) {
            const cellImage = createCellImage(j, i)
            const cell = createCell(row, cellImage, j, i)

            gameData.pushNewCellElement(cell.id, cellImage.id)
        }
    }

    return gameData
}


function createCell(row, image, j, i) {
    let cell = row.insertCell(-1)
    const cellName = getCellNameFromCoords(j, i, false)
    cell.id = cellName
    cell.className = `cell-parent`
    cell.appendChild(image)

    console.log(`Appended the cell "${cellName}" to cellNames`)
    return cell
}


function createCellImage(j, i) {
    let image = document.createElement(`img`)  
    const cellImageName = getCellNameFromCoords(j, i, true)
    image.id = cellImageName
    image.className = `cell-image` //deal with these magic strings
    image.src = `../img/tokens/cell_null.png`

    console.log(`Appended the image "${cellImageName}" to cellImageNames`)
    return image
}


function createGridParent(grid) {
    let gridParent = document.getElementById(`connect-four-grid`);
    gridParent.innerHTML = ``
    gridParent.appendChild(grid)
    console.log(`Generated grid added as child to the 'connect-four-grid' element`)
}


function bindInteractionEvents(gameData) {
    console.log(`Called bindClickEvents()`)

    for (cellName of gameData.cellNames) {
        const cellNameSegments = cellName.split(`-`)
        const x = parseInt(cellNameSegments[1])
        const y = parseInt(cellNameSegments[2])

        const gridPosition = document.getElementById(cellName)
        gridPosition.addEventListener(`click`, clickGridCell.bind(null, x, y))
        gridPosition.addEventListener(`mouseover`, mouseOverGridCell.bind(null, cellName))
        gridPosition.addEventListener(`mouseout`, mouseOutGridCell.bind(null, cellName))
    
        console.log(`Added event listeners to the cell at (${x}, ${y})`)
    }
}


module.exports = {
    initializeGrid,
    createCell,
    createCellImage,
    createGridParent,
    bindInteractionEvents
}