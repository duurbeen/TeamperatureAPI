
const BME280 = require('bme280-sensor');
const cron = require("node-cron");
const dbcon = require('./dboperations')
const sql = require('mssql');



   
  const options = {
    i2cBusNo   : 1, 
    i2cAddress : 0x76 
  };
  
  const bme280 = new BME280(options);
  active = true;
  try{ 

    const readSendData = () => {
      bme280.readSensorData()
        .then((data) => {
          const t= data.temperature_C; const h= data.humidity; const p = data.pressure_hPa;
          const Id =  String(1); const Temp = String(t.toFixed(2)); const Humi =String(h.toFixed(2)); const Pres =String(p.toFixed(2));
          if(data.temperature_C > 25 && active === true){
            dbcon.insertTemperatureDataForSMS(Id, Temp);
            active = false;}
    
          if(data.temperature_C <= 25 && active===false){active = true; }
          setTimeout(readSendData, 5000);
        })
        .catch((err) => {
          setTimeout(readSendData, 5000);
        });
    };

  bme280.init().then(() => {readSendData();}).catch((err) => {});
 
 
  } catch{}
  
  





 
