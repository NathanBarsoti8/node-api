module.exports = {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
        }
    },
    host: 'localhost',
    username: 'sa',
    password: 'Senha_080798',
    database: 'Application',
    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    }
}