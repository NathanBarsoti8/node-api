const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            name: DataTypes.STRING,
            cpf: DataTypes.STRING,
            birthDate: DataTypes.DATEONLY,
            sex: DataTypes.STRING,
            email: DataTypes.STRING,
            job: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasOne(models.Scheduling);
        this.hasMany(models.Phone, {
            foreignKey: 'customerId',
            as: 'phones'
        });
        this.hasOne(models.Address, {
            foreignKey: 'customerId',
            as: 'address'
        });
    }
}

module.exports = Customer;