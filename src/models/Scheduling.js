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
            starTime: DataTypes.DATE,
            finishTime: DataTypes.DATE,
            serviceTypeId: DataTypes.INTEGER,
            createdOn: DataTypes.DATE,
            updatedOn: DataTypes.DATE
        }, {
            sequelize
        });
    }
}

module.exports = Scheduling;