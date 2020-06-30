const Client = require('../models/Client');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const AddressController = require('./AddressController');
const PhoneController = require('./PhoneController');
const paginate = require('jw-paginate');
const { Op } = require('sequelize');

class ClientsController {
    getAll(req, res) {
        const page = parseInt(req.query.page);
        const pageSize = 10;
        let status;

        if (req.query.status === 'false')
            status = 0;
        else
            status = 1;
        
        Client.findAll({
                where: {
                    isActive: status,
                    name: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(clients => {
                if (clients == null || clients.length == 0)
                    return res.status(204).send({ msg: 'Nenhum dado encontrado'});

                const pager = paginate(clients.length, page, pageSize);
                const data = clients.slice(pager.startIndex, pager.endIndex + 1)

                return res.json({ pager, data });
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    getById(req, res) {
        sequelize.query(`SELECT
        C.Id AS clientId, C.name, C.cpf, C.birthDate,
        C.sex, C.email, C.job, C.isActive,
    
        P.Id as phoneId, P.phoneNumber, P.DDD,
	    PT.Name as phoneType, PT.Id as phoneTypeId,
    
        A.Id as addressId, A.zipCode, A.address,
        A.addressNumber, A.neighborhood, 
        A.complement, A.city, A.state
    
        FROM Client C
        LEFT JOIN Phone P
        ON C.Id = P.ClientId
        LEFT JOIN PhoneType PT
        ON P.TypeId = PT.Id
        LEFT JOIN Address A
        ON C.Id = A.ClientId
    
        WHERE C.Id = '${req.params.id}'`)
            .then(client => {

                if (client[0] == null || client[0].length == 0)
                    return res.status(404).send({ msg: 'Cliente não encontrado'});

                return res.json(client[0]);
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    create(req, res) {
        let client = new Client();

        client = req.body
        client.id = uuidv4();
        client.isActive = true;

        Client.create(client)
            .then(result => {
                if (result) {
                    AddressController.create(client);
                    PhoneController.create(client);

                    return res.status(200).send({ msg: 'Cliente salvo com sucesso' });
                } else
                    return res.status(400).send({ msg: 'Ocorreu um erro ao salvar novo cliente'});
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    changeStatusById(req, res) {
        Client.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(client => {

            if (client.dataValues.isActive == false)
                client.dataValues.isActive = 1
            else
                client.dataValues.isActive = 0

            client.update({
                isActive: client.dataValues.isActive
            })
            
            return res.status(200).send({ msg: 'Status atualizado com sucesso'});
        })
        .catch(error => res.status(500).send({ msg: error }));
    }

    update(req, res) {
        Client.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(client => {
            if (client) {

                client.update(req.body);

                AddressController.updateByCustomerId(req.params.id, req.body)
                PhoneController.updateByCustomerId(req.params.id, req.body)

                return res.status(200).send({ msg: 'Cliente atualizado com sucesso'})
            }
            else
                return res.status(404).send({ msg: 'Cliente não encontrado'})
        })
        .catch(error => res.status(500).send({ msg: error }));
    }

}

module.exports = new ClientsController();