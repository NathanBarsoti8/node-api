const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//MODELS
const ServiceType = require('../models/ServiceType');
const PhoneType = require('../models/PhoneType');
const Phone = require('../models/Phone');
const Address = require('../models/Address');
const Client = require('../models/Client');
const Scheduling = require('../models/Scheduling');

const connection = new Sequelize(dbConfig);

ServiceType.init(connection);
PhoneType.init(connection);
Phone.init(connection);
Address.init(connection);
Client.init(connection);
Scheduling.init(connection);

Scheduling.associate(connection.models);
Client.associate(connection.models);

module.exports = connection;
