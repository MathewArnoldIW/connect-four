const express = require('express')

const appExpress = express()

app.get('/hello', (req, res) => {
    res.send('world')
})

app.listen(8080)
