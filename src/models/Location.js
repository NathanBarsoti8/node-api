const { Model, DataTypes } = require('sequelize');

class Location extends Model {
    static init(sequelize) {
        super.init({
            Id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            City: DataTypes.STRING,
            State: DataTypes.STRING
        }, {
            sequelize
        });
    }
}

module.exports = Location;