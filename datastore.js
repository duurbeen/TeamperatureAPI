const BME280 = require('bme280-sensor');
const cron = require("node-cron");
const dbcon = require('./dboperations')
const sql = require('mssql');


exports.logService = () => {

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

}
