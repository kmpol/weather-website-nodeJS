const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Tell Express what template engine we'll be using.
app.set('view engine', 'hbs')
// Tell Express where template views lives.
app.set('views', viewsPath)
// Tell HBS where partials lives.
hbs.registerPartials(partialsPath)

// Tell Express what is the path for static files (html files).
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Karol Malicki'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: 'Karol Malicki',
        helpMessage: 'this is help message in about page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        helpMessage: "some help text in p tag",
        name: 'Karol Malicki'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {

        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error   
                })
            }
            
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help page not found",
        name: "Karol Malicki"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        name: "Karol Malicki"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})