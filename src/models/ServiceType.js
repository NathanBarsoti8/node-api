const { Model, DataTypes } = require('sequelize');

class ServiceType extends Model {
    static init(sequelize) {
        super.init({
            Id: DataTypes.INTEGER,
            Nome: DataTypes.STRING
        }, {
            sequelize
        });
    }
}

module.exports = ServiceType;