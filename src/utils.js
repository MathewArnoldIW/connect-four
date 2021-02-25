function getCellNameFromCoords(x, y, isImageName) {
    //console.log(`Called getCellNameFromCoords()`)
    
    const cellName =  `cell-${x}-${y}`
    const elementName = isImageName ? `${cellName}-img` : cellName
    return elementName
}


function emptyColorSelects(selects) {
    for (let sel of selects) {
        for (i = sel.length - 1; i >= 0; i--) {
            sel.remove(i)
        }
    }
}


function addTitleOptions(selects) {
    for (let sel of selects) {
        let titleOption = document.createElement("option")
        titleOption.text = "Choose a new colour..."
        titleOption.selected = true
        titleOption.diabled = true
        sel.add(titleOption)
    }
}


function addColorOptions(selects, allColors, blacklistedColors) {
    const availableColors = allColors.filter(color => !blacklistedColors.includes(color))

    for (let sel of selects) {
        availableColors.map((color) => {
            let newOption = document.createElement("option")
            newOption.text = color.charAt(0).toUpperCase() + color.slice(1)
            sel.add(newOption)
        })
    }
}


function populateColorSelects(allColors, blacklistedColors) {
    console.log(`Called populateColorSelects()`)
    console.log(`allColors = ${allColors}`)
    console.log(`blacklistedColors = ${blacklistedColors}`)

    const playerOneSelect = document.getElementById("player-one-color-select")
    const playerTwoSelect = document.getElementById("player-two-color-select")
    const selects = [playerOneSelect, playerTwoSelect]
    
    emptyColorSelects(selects)
    addTitleOptions(selects)
    addColorOptions(selects, allColors, blacklistedColors)
}
    


module.exports = {
    getCellNameFromCoords,
    populateColorSelects
};
