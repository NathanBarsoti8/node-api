const { Model, DataTypes } = require('sequelize');

class Location extends Model {
    static init(sequelize) {
        super.init({
            Id: DataTypes.UUID,
            City: DataTypes.STRING,
            State: DataTypes.STRING
        }, {
            sequelize
        });
    }
}

module.exports = Location;