module.exports = {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
            encrypt: true   //use this for Azure database encryption
        }
    },
    host: 'dc-application.database.windows.net',
    username: 'dc-user',
    password: 'Senha_010203',
    database: 'DCApplication',
    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    }
}