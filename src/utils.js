function getCellNameFromCoords(x, y, isImageName) {
    console.log(`Called getCellNameFromCoords()`)
    
    const cellName =  `cell-${x}-${y}`
    const elementName = isImageName ? `${cellName}-img` : cellName
    return elementName
}

module.exports = {
    getCellNameFromCoords
};