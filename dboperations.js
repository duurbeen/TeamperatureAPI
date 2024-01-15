
var dbc = require('../connString/dbconfig');
const sql = require('mssql');

        async function getconnection() {
            try {
                let pool = await sql.connect(dbc.config);

            } catch (error){console.log(error);}}

        async function insertTemperature(Id, Temp, Humi, Pres) {
            try {
                
                let pool = await sql.connect(dbc.config);
                let insertProduct = await pool.request()
                    .input('inID', sql.Int, Id)
                    .input('varTEMPVALUE', sql.NVarChar(50), Temp)
                    .input('varHUMIVALUE', sql.NVarChar(50), Humi)
                    .input('varPRESVALUE', sql.NVarChar(50), Pres)
                    .execute('MACHINEDATA.dbo.spINSERTTEMPERATUREDATA');
                //return insertProduct.recordsets;
            }
            catch (err) {
                console.log(err);
            }

        }


        async function insertTemperatureDataForSMS(Id, Temp) {
            try {
                
                let pool = await sql.connect(dbc.configERP_MIS);
                let insertProduct = await pool.request()
                    .input('vcDeviceID', sql.NVarChar(10), Id)
                    .input('vcTemp', sql.NVarChar(10), Temp)
                    
                    .execute('ERP_MIS.dbo.sprAFBLFactoryTemperatureDataInsert');
                //return insertProduct.recordsets;
            }
            catch (err) {
                console.log(err);
            }

        }


module.exports = {
    getconnection: getconnection,
    
    insertTemperature : insertTemperature,
    insertTemperatureDataForSMS : insertTemperatureDataForSMS
}