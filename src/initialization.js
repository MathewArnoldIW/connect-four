function initializeGrid() {
    let grid = document.createElement("TABLE")

    for (let i = gridSize - 1; i >= 0; i--) {
        let row = grid.insertRow(-1)
        console.log(i)

        for (let j = 0; j < gridSize; j++) {
            let cell = row.insertCell(-1)
            cell.innerHTML = "TEST!"
            cellName = "cell-" + j + "-" + i
            cell.id = cellName
            cellNames.push(cellName)
        }
    }

    let gridParent = document.getElementById("connect-four-grid");
    gridParent.innerHTML = ""
    gridParent.appendChild(grid)
}


function bindClickEvents() {
    for (cellName of cellNames) {
        cellNameSegments = cellName.split("-")
        x = parseInt(cellNameSegments[1])
        y = parseInt(cellNameSegments[2])

        const gridPosition = document.getElementById(cellName);
        gridPosition.addEventListener("click", clickGridCell.bind(null, x, y));
    
        console.log("current bind loop: " + (x + y))
    }
}