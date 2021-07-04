const path = require('path')
const express = require('express')
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.port || 3002

const hbs = require('hbs')

const publicFolder = path.join(__dirname,'../public');
const partialFolder = path.join(__dirname,'../view/partials')

app.use(express.static(publicFolder))
app.set('view engine','hbs')
app.set('views','view/views')
hbs.registerPartials(partialFolder)

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Pradipta"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:"Pradipta"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:'please help me please',
        name:"Pradipta"
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({error:'address must be provided'})
    }

    let address = req.query.address

    geocode(address,(error,{latitude,longitude,location} = {})=>{
        if(error)
        {
            return res.send({error:error})
        }
        //console.log(geoData);
        forecast(latitude,longitude,(error,forcastData)=>{
            if(error)
            {
                return res.send({error:error})
            }

            res.send({
                forcast: forcastData,
                location: location,
                address: address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search)
    {
        return res.send({Error:'provide search'})
    }
    let query = req.query.search
    console.log(query);
    res.send({products:[]})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help',
        errorMessage:'Help Artical Not Found',
        name:"Pradipta"
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page Not Found',
        name:"Pradipta"
    })
})


app.listen(port,()=>{
    console.log('server start in localhost:'+port);
})
