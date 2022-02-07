var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const port = process.env.PORT || 3000;
const app = express() 
const publicDirectoryPath = path.join(__dirname, 'public')
app.use(bodyParser.json())
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect(process.env.Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to Database"))
db.once('open', () => console.log("Connected to Database"))
app.post("/fetch", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var data = {
        "name": name,
        "email": email,
        "Message": message
    }
    db.collection('test').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Message submitted successfully !")
    })
    return res.redirect(__dirname + 'done.html')
})
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.sendFile(__dirname + "/index.html");
}).listen(port, () => {
    console.log(`Server is running at ${port}`)
})
