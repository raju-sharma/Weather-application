const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express();


const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')


const port = process.env.PORT || 3000
//set of handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

// use static page
app.use(express.static(publicDir))

//Routing 
app.get('',(req,res)=>{
    res.render('index', {
        title: "Weather",
        name: "Raju Sharma"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: "It is weather web application which gives temperature and descriptions of the location",
        title: "Help",
        name: "Raju Sharma"
    })   
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Me",
        name: "Raju Sharma" 
    })  
})
//End point
app.get('/weather',(req,res)=>{
    if(!req.query.address) 
    return res.send("<h1>Error: You must provide an address<h1/>")

    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error)
        return res.send({error})

    forecast(latitude,longitude,(error,forecastdata)=>{
    if(error)
    return res.send({error})
    res.send({
     forecast: forecastdata,
     place,
     address: req.query.address
    })
 })   
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404 Error",
        name: "Raju Sharma",
        message: "Help Articule not found"
    }) 
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: "404 Error",
        name: "Raju Sharma",
        message: "Page not found"
    }) 
})

app.listen(port,()=>
{
    console.log("Up and Running")
})