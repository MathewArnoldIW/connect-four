function initializeGrid(gameData) {
    console.log(`Called initializeGrid()`)
    let grid = document.createElement(`TABLE`)

    for (let i = gameData._gridHeight - 1; i >= 0; i--) {
        let row = grid.insertRow(-1)

        for (let j = 0; j < gameData._gridWidth; j++) {
            let cellName = getCellNameFromCoords(j, i, false)
            let cellImageName = getCellNameFromCoords(j, i, true)
            
            let cell = row.insertCell(-1)
            let image = document.createElement(`img`)

            cell.id = cellName
            image.id = cellImageName
            image.class = `cell-image`
            image.src = `../img/tokens/cell_null.png`

            cell.appendChild(image)
            gameData.pushNewCellElement(cellName, cellImageName)
        
            console.log(`Appended the cell "${cellName}" to cellNames`)
            console.log(`Appended the image "${cellImageName}" to cellImageNames`)
        }
    }

    let gridParent = document.getElementById(`connect-four-grid`);
    gridParent.innerHTML = ``
    gridParent.appendChild(grid)
    console.log(`Generated grid added as child to the 'connect-four-grid' element`)

    return gameData
}


function bindClickEvents(gameData) {
    console.log(`Called bindClickEvents()`)

    for (cellName of gameData.cellNames) {
        const cellNameSegments = cellName.split(`-`)
        const x = parseInt(cellNameSegments[1])
        const y = parseInt(cellNameSegments[2])

        const gridPosition = document.getElementById(cellName);
        gridPosition.addEventListener(`click`, clickGridCell.bind(null, x, y));
    
        console.log(`Added event listener to the cell at (${x}, ${y})`)
    }
}