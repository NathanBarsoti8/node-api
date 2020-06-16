const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            zipCode: DataTypes.STRING,
            state: DataTypes.STRING,
            city: DataTypes.STRING,
            address: DataTypes.STRING,
            number: DataTypes.INTEGER,
            neighborhood: DataTypes.STRING,
            complement: DataTypes.STRING,
            clientId: DataTypes.UUID
        }, {
            sequelize
        });
    }
}

module.exports = Address;