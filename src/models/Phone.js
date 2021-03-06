const { Model, DataTypes } = require('sequelize');

class Phone extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            typeId: DataTypes.INTEGER,
            ddd: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            customerId: DataTypes.UUID
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Customer)
    }

}

module.exports = Phone;