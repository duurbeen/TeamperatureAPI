const BME280 = require('bme280-sensor');

exports.readService = async (req, res) => {

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
}