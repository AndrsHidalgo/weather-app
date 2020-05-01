const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode   = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, '../resource/views')
const partialsPath  = path.join(__dirname, '../resource/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath, (err) => {})

//Setup static directory to server 
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        createdBy: 'Coores Inc.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        createdBy: 'Coores Inc.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Can help you, Sr?!',
        message: 'Contact us for any problem.',
        createdBy: 'Coores Inc.'
    })
})

app.get('/weather', (req, res) => {
    let { address } = req.query
    if (!address)
        return res.send({
            error: 'You must provide an address.'
        })
    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) 
            return res.send({ error }) 
            
        forecast(latitude, longitude, (error, { info } = {}) => {
            if (error)
                return res.send({ error }) 
            
            res.send({ location, info })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        createdBy: 'Coores Inc.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        createdBy: 'Coores Inc.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})