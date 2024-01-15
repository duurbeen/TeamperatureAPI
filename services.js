
var createError = require('http-errors');
var express = require('express');
var app = express();
var cors = require('cors');
const cron = require("node-cron");
const read = require('./readSensor')
const log = require('./datastore')
const sms = require('./sms')


const router = express.Router();
app.use(cors());
app.use(router);



router.get('/', function(req, res){
    res.status(200).json({message: 'Temperature measure api'})
});

router.get('/sensor', read.readService );


cron.schedule("*/10 * * * *", async function() {
log.logService();
});


sms.smsService();



 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});




app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.status(err.status || 500);
    res.render('error');
});


const port = process.env.PORT || '8080';

app.listen(port, () => console.log(`Server Port: ${port}`));
 
