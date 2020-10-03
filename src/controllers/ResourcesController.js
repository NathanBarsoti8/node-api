const PhoneType = require('../models/PhoneType');
const ServiceType = require('../models/ServiceType');

class ResourcesController {
    getPhonesType(req, res) {
        PhoneType.findAll({
                attributes: ['id', 'name']
            })
            .then(types => {
                if (types == null || types.length == 0)
                    return res.status(204).send({ msg: 'Nenhum tipo de telefone encontrado' });

                return res.status(200).json(types);
            })
            .catch(error => res.status(500).json(error));
    }

    getServicesType(req, res) {
        ServiceType.findAll({
                attributes: ['id', 'name']
            })
            .then(types => {
                if (types == null || types.length == 0)
                    return res.status(204).send({ msg: 'Nenhum tipo de serviço encontrado' });

                return res.status(200).json(types);
            })
            .catch(error => res.status(500).json(error));
    }
}

module.exports = new ResourcesController();