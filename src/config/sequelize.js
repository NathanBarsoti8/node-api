const Sequelize = require('sequelize')

const sequelize = new Sequelize('NodeApplication', 'azureuser', 'Senha_010203', {
    host: 'mysqlserver-application.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
            encrypt: true   //use this for Azure database encryption
        }
    },
    logging: true
})

module.exports = sequelize;