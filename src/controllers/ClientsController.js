const Client = require('../models/Client');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const AddressController = require('./AddressController');
const PhoneController = require('./PhoneController');

class ClientsController {
    getAll(req, res) {
        Client.findAll({
                where: {
                    isActive: 1
                }
            })
            .then(clients => {
                if (clients == null || clients.length == 0)
                    return res.status(204).send();

                return res.json(clients);
            })
            .catch(error => res.json(error));
    }

    getById(req, res) {
        sequelize.query(`SELECT
        C.Id AS clientId, C.name, C.cpf, C.birthDate,
        C.sex, C.email, C.job, C.isActive,
    
        P.Id as phoneId, P.Number as phoneNumber,
	    PT.Name as phoneType, P.DDD,
    
        A.Id as addressId, A.zipCode, A.address,
        A.Number as addressNumber, A.neighborhood, 
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

                console.log(client[0]);

                if (client[0] == null || client[0].length == 0)
                    return res.status(404).send();

                return res.json(client[0]);
            })
            .catch(error => res.json(error));
    }

    create(req, res) {
        let client = new Client();

        client = req.body
        client.id = uuidv4(),
        client.isActive = true,
        client.createdOn = new Date(),
        client.updatedOn = new Date()

        Client.create(client)
            .then(result => {
                if (result) {
                    AddressController.create(client);
                    PhoneController.create(client);

                    return res.status(200).send(client.id);
                }
                else
                    return res.status(400).send();
            })
            .catch(error => res.json(error));
    }
}


module.exports = new ClientsController();