const Client = require('../models/Client');

class Clients {
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
        Client.findOne({
                where: {
                    Id: req.params.id,
                }
            })
            .then(client => {
                if (client == null)
                    res.status(404).send();

                return res.json(client);
            })
            .catch(error => res.json(error));
    }
}

module.exports = new Clients();