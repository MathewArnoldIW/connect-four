function clickGridCell(x, y, event) {
    console.log("clicked " + x + ", " + y)
    console.log("event:")
    console.log(event)
}

//RUNS AT LAUNCH
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        //const gridPosition = document.getElementById("row-"+i+"-column-"+j);
        //gridPosition.addEventListener("click", clickGridCell.bind(null, i, j));

        console.log("current bind loop: " + (i + j))
    }
}