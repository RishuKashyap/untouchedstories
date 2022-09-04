var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


const app = express()
const path = require('path')

app.use(bodyParser.json())
// app.use(express.static('static'))
// app.use('/static', express.static('static'))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/undb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db = mongoose.connection;

db.on('error',()=>{
    console.log("error in connecting to db");
})

db.once('open',()=>{
    console.log("connected to db");
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })

    return res.redirect('../static/html/index.html');
}).listen(5000);

// app.get('/', (req, res)=> {
//     res.send('Hello World!')
//   })

console.log("listening on port 5000");
