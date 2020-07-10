const express = require('express');
const routes = express.Router();

//CONTROLLERS
const ResourcesController = require('./controllers/ResourcesController');
const ClientsController = require('./controllers/ClientsController');
const SchedulingController = require('./controllers/SchedulingController');


routes.get('/', (req, res) => {
    return res.json({ msg: 'Api em Node.js para se comunicar com uma aplicação Angular - Dentist Control' });
});

//ROUTES
routes.get('/resources/phonesType', ResourcesController.getPhonesType);
routes.get('/resources/servicesType', ResourcesController.getServicesType);

routes.get('/clients', ClientsController.getAll);
routes.get('/clients/:id', ClientsController.getById);
routes.post('/clients', ClientsController.create);
routes.put('/clients/:id/changeStatus', ClientsController.changeStatusById);
routes.put('/clients/:id/update', ClientsController.update);

routes.post('/schedules', SchedulingController.create);
routes.put('/schedules/:id', SchedulingController.update);
routes.delete('/schedules/:id', SchedulingController.delete);

module.exports = routes;