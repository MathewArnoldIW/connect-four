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


function getWinProbability() {
    fetch('http://localhost:8080/probability/')
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data)
                    callAlertWithProbability(data)
                })
        }, error => {
            console.log("there was an error: " + error)
        })
}


function callAlertWithProbability(data) {
    const tactics = [
        "an Infinigambit",
        //"the Rapid Red Revenge",
        "a Gatsby's Gambit",
        // "the Yellow Brick Code",
        // "a Hobbit's Assault",
        // "the Eternal Knight",
        // "the Humble Gentleman's Backdoor",
        // "the Underdog's Bark",
        "the Cooper Bidirectional Attack",
        "the Woodhead Manoeuvre",
        "the Matthews Strategum",
        "the Pickering Defence",
        "the Accenture Phalanx"
    ]
    const randomTacticIndex = Math.floor(Math.random() * tactics.length)
    
    console.log(`PROBABILITY IS ${data.probability}`)
    alert(`Your probability of winning is currently ${data.probability}%. I suggest performing ${tactics[randomTacticIndex]}.`)
}


module.exports = {
    getCellNameFromCoords,
    populateColorSelects
};
