const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
const options = {
    extensions: ['htm', 'html']
}
app.use(express.static(publicDirectoryPath, options))
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Rafael Ortiz'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Rafael Ortiz'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Need help?',
        helpText: 'All of your questions can be answered on Google. Why would you ask for help here?',
        name: 'Rafael Ortiz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        }) 
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })                

            }
            res.send({
                location,
                forecast: forecastData,
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
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "You won't find any help here",
        errorMessage:'Help article not found.',
        name: 'Rafael Ortiz'
    })  
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage:'404. Your page was not found.',
        name: 'Rafael Ortiz'
    })  
})

// app.com
// /help
// /about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})