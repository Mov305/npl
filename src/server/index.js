var path = require('path')
const express = require('express')
const dotenv =require('dotenv')
const cors = require('cors')
const bodyParser= require('body-parser')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

dotenv.config()

console.log(`your API key is ${process.env.API_KEY}`)


const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/test', async function (req, res) {

    const api = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${req.body.text}&lang=en`
    
    const data = await fetch(api)


    const newData = await data.json()

    console.log(newData)
    const Data= JSON.stringify(newData)
    res.send(Data)
})

