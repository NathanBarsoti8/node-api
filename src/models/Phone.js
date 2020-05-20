const { Model, DataTypes } = require('sequelize');

class Phone extends Model {
    static init(sequelize) {
        super.init({
            Id: DataTypes.UUID,
            TypeId: DataTypes.INTEGER,
            DDD: DataTypes.STRING,
            Number: DataTypes.STRING
        }, {
            sequelize
        });
    }
}

module.exports = Phone;