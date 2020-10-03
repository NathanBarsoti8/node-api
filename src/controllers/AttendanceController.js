const ServiceType = require('../models/ServiceType');
const sequelize = require('../config/sequelize');
const { Op } = require('sequelize');

class AttendanceController {
    
    async create(req, res) {
        await ServiceType.findAll({
            attributes: ['id', 'name'],
            where: {
                name: {
                    [Op.like]: `%${req.body.name}%`
                }
            }
        })
        .then(types => {
            if (types.length > 0) 
                return res.status(400).send({ msg: 'Já existe um tipo de serviço com esse nome' });
            else {
                sequelize.query(` INSERT INTO [ServiceType] ([name]) VALUES ('${req.body.name}') `)
                    .then(serviceType => {
                        if (serviceType) 
                            return res.status(200).send({ msg: 'Tipo de serviço salvo com sucesso' });
                        else 
                            return res.status(400).send({ msg: 'Ocorreu um erro ao salvar novo tipo de serviço' });
                    })
                    .catch(error => res.status(500).send({ msg: error }));
            }
        })
        .catch(error => res.status(500).send({ msg: error }));
    }

    update(req, res) {
        ServiceType.findByPk(req.params.id)
            .then(serviceType => {
                if (serviceType) {
                    serviceType.update(req.body)
                        .then(update => {
                            if (update)
                                return res.status(200).send({ msg: 'Tipo de serviço atualizado com sucesso'})
                            else
                                return res.status(400).send({ msg: 'Ocorreu um erro ao editar tipo de serviço'});
                        })
                }
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    delete(req, res) {
        ServiceType.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(serviceType => {
            if (serviceType)
                return res.status(200).send({ msg: 'Consulta deletada com sucesso' });
            else 
                return res.status(400).send({ msg: 'Ocorreu um erro ao deletar tipo de serviço'});
        })
        .catch(error => res.status(500).send({ msg: error }));
    }

}

module.exports = new AttendanceController();
