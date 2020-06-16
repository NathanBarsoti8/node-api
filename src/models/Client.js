const { Model, DataTypes } = require('sequelize');

class Client extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            name: DataTypes.STRING,
            cpf: DataTypes.STRING,
            birthDate: DataTypes.DATE,
            sex: DataTypes.STRING,
            email: DataTypes.STRING,
            job: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN,
            createdOn: DataTypes.DATE,
            updatedOn: DataTypes.DATE
        }, {
            sequelize
        });
    }
}

module.exports = Client;