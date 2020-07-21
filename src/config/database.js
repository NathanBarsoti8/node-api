module.exports = {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            trustServerCertificate: true,
            useUTC: false,
            dateFirst: 1,
            encrypt: true   //use this for Azure database encryption
        },
    },
    host: 'localhost',
    port: 6455,
    username: 'sa',
    password: 'Senha_010203',
    database: 'DCApplication',
    define: {
        freezeTableName: true,
        timestamps: true,
        underscored: false
    }
}