const express = require('express');
const routes = express.Router();

//CONTROLLERS
const ResourcesController = require('./controllers/ResourcesController');
const ClientsController = require('./controllers/ClientsController');


routes.get('/', (req, res) => {
    return res.json({ hello: 'World' });
});

//ROUTES
routes.get('/resources/phonesType', ResourcesController.getPhonesType);
routes.get('/resources/servicesType', ResourcesController.getServicesType);

routes.get('/clients', ClientsController.getAll);
routes.get('/clients/:id', ClientsController.getById);


module.exports = routes;