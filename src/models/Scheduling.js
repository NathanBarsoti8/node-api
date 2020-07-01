const { Model, DataTypes } = require('sequelize');

class Scheduling extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            clientId: DataTypes.UUID,
            date: DataTypes.DATE,
            starTime: DataTypes.TIME,
            finishTime: DataTypes.TIME,
            serviceTypeId: DataTypes.INTEGER
        }, {
            sequelize
        });
    }
}

module.exports = Scheduling;