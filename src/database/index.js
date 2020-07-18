const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//MODELS
const ServiceType = require('../models/ServiceType');
const PhoneType = require('../models/PhoneType');
const Phone = require('../models/Phone');
const Address = require('../models/Address');
const Customer = require('../models/Customer');
const Scheduling = require('../models/Scheduling');
const SchedulingStatus = require('../models/SchedulingStatus');

const connection = new Sequelize(dbConfig);

ServiceType.init(connection);
PhoneType.init(connection);
Phone.init(connection);
Address.init(connection);
Customer.init(connection);
Scheduling.init(connection);
SchedulingStatus.init(connection);

Scheduling.associate(connection.models);
Customer.associate(connection.models);

module.exports = connection;
