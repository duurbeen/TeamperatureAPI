const BME280 = require('bme280-sensor');
 

    
    

        // The BME280 constructor options are optional.
        // 
        const options = {
          i2cBusNo   : 1, // defaults to 1
          i2cAddress : 0x76 //BME280.BME280_DEFAULT_I2C_ADDRESS() // defaults to 0x77
        };
        
        const bme280 = new BME280(options);
        active = true;
        // Read BME280 sensor data, repeat
        //
        const readSensorData = () => {
          bme280.readSensorData()
            .then((data) => {
              // temperature_C, pressure_hPa, and humidity are returned by default.
              // I'll also calculate some unit conversions for display purposes.
             
              data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
              data.pressure_inHg = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);
              
              if(data.temperature_C > 24 && active === true){
              console.log(`data exceed limit= ${JSON.stringify(data, null, 2)}`);
              
              active = false;
            }

            if(data.temperature_C <= 24 && active===false){
              console.log(`data in limit = ${JSON.stringify(data, null, 2)}`);
              
              active = true;
              
            }

            else {

              console.log(`data raw = ${JSON.stringify(data, null, 2)}`);
            }


            setTimeout(readSensorData, 2000);

            })
            .catch((err) => {
              console.log(`BME280 read error: ${err}`);
              setTimeout(readSensorData, 2000);
            });
        };
        
        // Initialize the BME280 sensor
        //
        bme280.init()
          .then(() => {
            console.log('BME280 initialization succeeded');
            readSensorData();
          })
          .catch((err) => console.error(`BME280 initialization failed: ${err} `));