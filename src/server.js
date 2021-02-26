const express = require('express')

const appExpress = express()

appExpress.use(function(request, response, next) {
    if (request.headers.origin) {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        response.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (request.method === 'OPTIONS') return response.send(200)
    }
    next()
})

appExpress.get('/hello', (req, res) => {
    res.send({world: 'world'})
})

appExpress.get('/probability', (req, res) => {
    res.send({probability: Math.floor(Math.random() * 100)})
})

appExpress.listen(8080)
