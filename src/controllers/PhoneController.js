const Phone = require('../models/Phone');
const { v4: uuidv4 } = require('uuid');

class PhoneController {
    create(obj) {
        let phone = new Phone();

        phone.id = uuidv4();
        phone.typeId = obj.phoneType;
        phone.ddd = obj.ddd;
        phone.phoneNumber = obj.phoneNumber;
        phone.customerId = obj.id;

        Phone.create(phone.dataValues)
            .then(result => {
                if (result)
                    return result.dataValues;
                else
                    return null;
            });
    }

    updateByCustomerId(customerId, obj) {
        Phone.findOne({
            where: {
                customerId: customerId
            }
        })
        .then(phone => {
            if (phone) {
                phone.update(obj);

                return phone;
            }
        })
    }
}

module.exports = new PhoneController();