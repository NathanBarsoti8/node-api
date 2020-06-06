const { Model, DataTypes } = require('sequelize');

class Phone extends Model {
    static init(sequelize) {
        super.init({
            Id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            TypeId: DataTypes.INTEGER,
            DDD: DataTypes.STRING,
            Number: DataTypes.STRING,
            ClientId: DataTypes.UUID
        }, {
            sequelize
        });
    }
}

module.exports = Phone;