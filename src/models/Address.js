const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(sequelize) {
        super.init({
            Id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ZipCode: DataTypes.STRING,
            LocationId: DataTypes.UUID,
            Address: DataTypes.STRING,
            Number: DataTypes.INTEGER,
            Neighborhood: DataTypes.STRING,
            Complement: DataTypes.STRING
        }, {
            sequelize
        });
    }
}

module.exports = Address;