const Phone = require('../models/Phone');
const { v4: uuidv4 } = require('uuid');

class PhoneController {
    create(obj) {
        let phone = new Phone();

        phone.id = uuidv4();
        phone.typeId = obj.phoneType;
        phone.DDD = obj.ddd;
        phone.number = obj.phoneNumber;
        phone.clientId = obj.id;

        Phone.create(phone.dataValues)
            .then(result => {
                if (result)
                    return result.dataValues;
                else
                    return null;
            });
    }
}

module.exports = new PhoneController();