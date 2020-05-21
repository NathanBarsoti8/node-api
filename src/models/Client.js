const { Model, DataTypes } = require('sequelize');

class Client extends Model {
    static init(sequelize) {
        super.init({
            Id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Name: DataTypes.STRING,
            Cpf: DataTypes.STRING,
            BirthDate: DataTypes.DATE,
            Sex: DataTypes.STRING,
            AddressId: DataTypes.UUID,
            PhoneId: DataTypes.UUID,
            Email: DataTypes.STRING,
            Job: DataTypes.STRING,
            IsActive: DataTypes.BOOLEAN,
            CreatedOn: DataTypes.DATE,
            UpdatedOn: DataTypes.DATE
        }, {
            sequelize
        });
    }
}

module.exports = Client;