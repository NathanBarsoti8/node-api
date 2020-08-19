const express = require('express');
const routes = express.Router();

//CONTROLLERS
const ResourcesController = require('./controllers/ResourcesController');
const CustomersController = require('./controllers/CustomersController');
const SchedulingController = require('./controllers/SchedulingController');


routes.get('/', (req, res) => {
    return res.json({ msg: 'Dentist Control API - construída em Node.js para se comunicar com uma aplicação Angular' });
});

//ROUTES
routes.get('/resources/phonesType', ResourcesController.getPhonesType);
routes.get('/resources/servicesType', ResourcesController.getServicesType);

routes.get('/customers', CustomersController.getAll);
routes.get('/customers/:id', CustomersController.getById);
routes.post('/customers', CustomersController.create);
routes.put('/customers/:id/changeStatus', CustomersController.changeStatusById);
routes.put('/customers/:id/update', CustomersController.update);

routes.get('/schedules', SchedulingController.getAll);
routes.get('/schedules/:id', SchedulingController.getById);
routes.get('/schedules/internal/byPeriod', SchedulingController.getByPeriod);
routes.post('/schedules', SchedulingController.create);
routes.put('/schedules/:id', SchedulingController.update);
routes.delete('/schedules/:id', SchedulingController.delete);

module.exports = routes;