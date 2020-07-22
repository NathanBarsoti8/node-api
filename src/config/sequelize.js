const Sequelize = require('sequelize')

const sequelize = new Sequelize('DCApplication', 'sa', 'Senha_010203', {
    host: 'localhost',
    port: 6455,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            trustServerCertificate: true,
            useUTC: false,
            dateFirst: 1,
            encrypt: true   //use this for Azure database encryption
        }
    },
    logging: true
})

module.exports = sequelize;