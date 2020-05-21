const { Model, DataTypes } = require('sequelize');

class PhoneType extends Model {
    static init(sequelize) {
        super.init({
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            Name: DataTypes.STRING
        }, {
            sequelize
        });
    }
}

module.exports = PhoneType;