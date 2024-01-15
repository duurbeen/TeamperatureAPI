
const config = {
    user :'sa',
    password :'sa',
    server:'192.168.0.228',
    database:'MACHINEDATA',
    pool:{
        max:10, min:0, idleTimeoutMillis: 30000

    },
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        instancename: "MSSQLSERVER",
        encrypt: false,
        trustServerCertificate: false,
    },
    port : 49693
}

const configERP_MIS = {
    user :'sa',
    password :'sa',
    server:'192.168.0.229',
    database:'ERP_MIS',
    pool:{
        max:10, min:0, idleTimeoutMillis: 30000

    },
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        instancename: "MSSQLSERVER",
        encrypt: false,
        trustServerCertificate: false,
    },
    //port : 49693
}

module.exports = { config, configERP_MIS }
