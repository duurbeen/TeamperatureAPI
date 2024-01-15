
var createError = require('http-errors');
var express = require('express');
var app = express();
var cors = require('cors');
const BME280 = require('bme280-sensor');
const cron = require("node-cron");
const dbcon = require('./controller/dboperations')
const sql = require('mssql');


const router = express.Router();
app.use(cors());
app.use(router);



router.get('/', function(req, res){
    res.status(200).json({message: 'Temperature measure api'})
});

router.get('/sensor', async function(req, res) {

  const options = {
    i2cBusNo   : 1, 
    i2cAddress : 0x76 
  };
  
  const bme280 = new BME280(options);
  falseData = { temperature_C: -100.00, humidity: -100.00,  pressure_hPa: -1000.00};
 
  init = false;
 try{ 
    if(bme280 && (init ===  false)) await bme280.init().then( () => {init = true;}); 
    if(init === true)(bme280.readSensorData().then((data) => { res.json(data); init = false;}));
    
  } catch{ res.json(falseData);}

  });


cron.schedule("*/10 * * * *", async function() {
  const options = {
    i2cBusNo   : 1, 
    i2cAddress : 0x76 
  };
  
  const bme280 = new BME280(options);
  try{ const readSendData = () => {
       bme280.readSensorData()
      .then((data) => {
        const t= data.temperature_C; const h= data.humidity; const p = data.pressure_hPa;
        const Id = 1; const Temp = String(t.toFixed(2)); const Humi =String(h.toFixed(2)); const Pres =String(p.toFixed(2));
        dbcon.insertTemperature(Id, Temp, Humi, Pres);
       // setTimeout(readSendData, 2000);
        })
      .catch((err) => {
        setTimeout(readSendData, 5000);
      });
  };

  bme280.init().then(() => {readSendData();}).catch(e) () ;
} catch{}
  
});



 

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
 
