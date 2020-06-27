const Address = require('../models/Address');
const { v4: uuidv4 } = require('uuid');

class AddressController {
    create(obj) {
        let address = new Address();

        address.id = uuidv4();
        address.zipCode = obj.zipCode;
        address.state = obj.state;
        address.city = obj.city;
        address.address = obj.address;
        address.addressNumber = obj.addressNumber;
        address.neighborhood = obj.neighborhood;
        address.complement = obj.complement;
        address.clientId = obj.id;

        Address.create(address.dataValues)
            .then(result => {
                if (result)
                    return result.dataValues;
                else
                    return null;
            });
    }

    updateByCustomerId(clientId, obj) {
        Address.findOne({
            where: {
                clientId: clientId
            }
        })
        .then(address => {
            if (address) {
                address.update(obj);

                return address;
            }
        })
    }
}

module.exports = new AddressController();