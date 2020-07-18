const { Model, DataTypes } = require('sequelize');

class SchedulingStatus extends Model {
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
}

module.exports = SchedulingStatus;