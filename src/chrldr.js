function cheerleader(thingToShout) {    
    for (let i = 0; i < thingToShout.length; i++) {
        const anWords = ["a", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "x"]
        const shout = anWords.includes(thingToShout[i].toLowerCase()) ? `Gimme an ${thingToShout[i]}!` : `Gimme a ${thingToShout[i]}!`
        console.log(shout)
    }

    console.log(`It's ${thingToShout}!!!`)
}

//cheerleader("MARK")