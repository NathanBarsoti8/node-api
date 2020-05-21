const PhoneType = require('../models/PhoneType');
const ServiceType = require('../models/ServiceType');

class Resources {
    getPhonesType(req, res) {
        PhoneType.findAll()
            .then(types => {
                if (types == null || types.length == 0)
                    return res.status(204).send();

                return res.json(types);
            })
            .catch(error => res.json(error));
    }

    getServicesType(req, res) {
        ServiceType.findAll()
            .then(types => {
                if (types == null || types.length == 0)
                    return res.status(204).send();

                return res.json(types);
            })
            .catch(error => res.json(error));
    }
}

module.exports = new Resources();