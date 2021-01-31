const config = {
    user : 'sa',
    password: '1234',
    server: '127.0.0.1',
    database:'MP',
    options:{
        trustedConnection:true,
        enableArithAort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;