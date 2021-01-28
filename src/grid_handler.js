function initializeGrid() {
    let grid = document.createElement("TABLE")

    for (let i = 0; i < gridSize; i++) {
        let row = grid.insertRow(-1)

        for (let j = 0; j < gridSize; j++) {
            let cell = row.insertCell(-1)
            cell.innerHTML = "TEST!"
            //cell.id???
        }
    }

    let gridParent = document.getElementById("connect-four-grid");
    gridParent.innerHTML = ""
    gridParent.appendChild(grid)
}


function drawGrid() {
    return null
}