const { Model, DataTypes } = require('sequelize');

class Scheduling extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            customerId: DataTypes.UUID,
            date: DataTypes.DATEONLY,
            timeTable: DataTypes.STRING,
            serviceTypeId: DataTypes.INTEGER,
            statusId: DataTypes.INTEGER
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Customer);
    }
}

module.exports = Scheduling;