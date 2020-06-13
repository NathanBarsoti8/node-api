const Phone = require('../models/Phone');
const { v4: uuidv4 } = require('uuid');

class PhoneController {
    create(obj) {
        let phone = new Phone();

        phone.Id = uuidv4();
        phone.TypeId = obj.TypeId;
        phone.DDD = obj.DDD;
        phone.Number = obj.Number;
        phone.ClientId = obj.ClientId;

        Phone.create(phone)
            .then(result => {
                if (result)
                    return result;
                else
                    return null;
            });
    }
}

module.exports = new PhoneController();