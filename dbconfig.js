
const config = {
    user :'sa',
    password :'Asdf#1234',
    server:'10.38.27.228',
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
    user :'Arif',
    password :'Illusion@Arif',
    server:'10.38.17.16',
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