const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//MODELS
const ServiceType = require('../models/ServiceType');
const PhoneType = require('../models/PhoneType');
const Phone = require('../models/Phone');
const Location = require('../models/Location');
const Address = require('../models/Address');
const Client = require('../models/Client');
const Scheduling = require('../models/Scheduling');

const connection = new Sequelize(dbConfig);

ServiceType.init(connection);
PhoneType.init(connection);
Phone.init(connection);
Location.init(connection);
Address.init(connection);
Client.init(connection);
Scheduling.init(connection);

module.exports = connection;
