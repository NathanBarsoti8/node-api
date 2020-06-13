const Address = require('../models/Address');
const { v4: uuidv4 } = require('uuid');

class AddressController {
    create(obj) {
        let address = new Address();

        address.Id = uuidv4();
        address.ZipCode = obj.ZipCode;
        address.Address = obj.Address;
        address.Number = obj.Number;
        address.Neighborhood = obj.Neighborhood;
        address.Complement = obj.Complement;
        address.ClientId = obj.ClientId;

        Address.create(address)
            .then(result => {
                if (result)
                    return result;
                else
                    return null;
            });
    }
}

module.exports = new AddressController();