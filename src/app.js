const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const tempPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlers engine and views path location
app.set('view engine', 'hbs')
app.set('views', tempPath)
hbs.registerPartials(partialsPath)
// set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'prashant',
        app: 'weather',
        title: 'weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name:'praful',
        title:'about'
    })
})

app.get('/weather',(req, res) => {
    
    if(! req.query.address){
        return res.send({error:'pls provide address'})
        
    }

    geocode( req.query.address, (error, {location, longitude,latitude}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude, (error, {location, temp}={}) => {
            if(error){
                return res.send(error)
            }
            res.send({
               location,
                temp,
                address:  req.query.address

            })
        })

    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'help request not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: ' page not found'
    })

})

app.listen(port,()=>{
    console.log('server has started' + port)
})