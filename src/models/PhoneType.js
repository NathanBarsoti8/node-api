const { Model, DataTypes } = require('sequelize');

class PhoneType extends Model {
    static init(sequelize) {
        super.init({
            Id: DataTypes.INTEGER,
            Nome: DataTypes.STRING
        }, {
            sequelize
        });
    }
}

module.exports = PhoneType;