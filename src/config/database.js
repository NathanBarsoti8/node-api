module.exports = {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
            encrypt: true   //use this for Azure database encryption
        }
    },
    host: 'mysqlserver-application.database.windows.net',
    username: 'azureuser',
    password: 'Senha_010203',
    database: 'NodeApplication',
    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    }
}