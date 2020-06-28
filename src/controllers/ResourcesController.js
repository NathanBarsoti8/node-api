const PhoneType = require('../models/PhoneType');
const ServiceType = require('../models/ServiceType');

class ResourcesController {
    getPhonesType(req, res) {
        PhoneType.findAll({
                attributes: ['id', 'name']
            })
            .then(types => {
                if (types == null || types.length == 0)
                    return res.status(204).send();

                return res.json(types);
            })
            .catch(error => res.json(error));
    }

    getServicesType(req, res) {
        ServiceType.findAll({
                attributes: ['id', 'name']
            })
            .then(types => {
                if (types == null || types.length == 0)
                    return res.status(204).send();

                return res.json(types);
            })
            .catch(error => res.json(error));
    }
}

module.exports = new ResourcesController();