const Client = require('../models/Client');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const AddressController = require('./AddressController');

class ClientsController {
    getAll(req, res) {
        Client.findAll({
                where: {
                    IsActive: 1
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
        C.Id AS ClientId, C.Name, C.Cpf, C.BirthDate,
        C.Sex, C.Email, C.Job, C.IsActive,
    
        P.Id as PhoneId, P.Number as PhoneNumber,
	    PT.Name as PhoneType, P.DDD,
    
        A.Id as AddressId, A.ZipCode, A.Address,
        A.Number as AddressNumber, A.Neighborhood, 
        A.Complement, LOC.City, LOC.State
    
        FROM Client C
        LEFT JOIN Phone P
        ON C.Id = P.ClientId
        LEFT JOIN PhoneType PT
        ON P.TypeId = PT.Id
        LEFT JOIN Address A
        ON C.Id = A.ClientId
        LEFT JOIN Location LOC
        ON A.LocationId = LOC.Id
    
        WHERE C.Id = '${req.params.id}'`)
            .then(client => {

                if (client[0] == null || client[0].length == 0)
                    return res.status(404).send();

                return res.json(client[0]);
            })
            .catch(error => res.json(error));
    }

    create(req, res) {
        let client = new Client();

        client = req.body
        client.Id = uuidv4(),
            client.IsActive = true,
            client.CreatedOn = new Date(),
            client.UpdatedOn = new Date()

        Client.create(client)
            .then(client => {
                if (client) {
                    AddressController.create(client);
                    return res.status(200).send()
                }




            })
            .catch(error => res.json(error));
    }
}


module.exports = new ClientsController();