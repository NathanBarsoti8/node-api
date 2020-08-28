const { Model, DataTypes } = require('sequelize');

class ServiceType extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: DataTypes.STRING
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasOne(models.Scheduling);
    }
}

module.exports = ServiceType;