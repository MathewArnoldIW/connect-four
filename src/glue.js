function clickGridCell(x, y, event) {
    console.log("clicked " + x + ", " + y)
    console.log("event:")
    console.log(event)
}

//RUNS AT LAUNCH
// for (let i = 0; i < gridSize; i++) {
//     for (let j = 0; j < gridSize; j++) {
//         const cellName = "cell-" + i + "-" + j
//         const gridPosition = document.getElementById(cellName);
//         gridPosition.addEventListener("click", clickGridCell.bind(null, i, j));

//         console.log("current bind loop: " + (i + j))
//     }
// }

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