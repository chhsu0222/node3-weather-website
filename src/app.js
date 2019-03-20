const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('<h3>Hello express!</h3>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'ch',
        age: 32
    }, {
        name: 'john',
        age: 42
    }])
})

app.get('/about', (req, res) => {
    res.send('<h3>About</h3>')
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'Taipei',
        forecast: '24 degree'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
