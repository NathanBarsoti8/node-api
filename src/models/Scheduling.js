const { Model, DataTypes } = require('sequelize');

class Scheduling extends Model {
    static init(sequelize) {
        super.init({
            Id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ClientId: DataTypes.UUID,
            Date: DataTypes.DATE,
            StarTime: DataTypes.DATE,
            FinishTime: DataTypes.DATE,
            ServiceTypeId: DataTypes.INTEGER,
            CreatedOn: DataTypes.DATE,
            UpdatedOn: DataTypes.DATE
        }, {
            sequelize
        });
    }
}

module.exports = Scheduling;