const Customer = require('../models/Customer');
const Scheduling = require('../models/Scheduling');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment'); 
const literal = Sequelize.literal;

class DashboardController {
    getMonthBirthdays(req, res) {  
        let month = literal(`MONTH(Customer.BirthDate) = ${new Date().getMonth() + 1}`)

        Customer.findAll({
                attributes: ['id', 'name', 'birthDate'],
                where: {
                    isActive: 1,
                    month
                },
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(customers => {
                if (customers == null || customers.length == 0)
                    return res.status(204).send({ msg: 'Nenhum dado encontrado'});

                return res.status(200).json({ customers });
            })
            .catch(error => {
                return res.status(500).send({ msg: error })
            });
    }

    getSchedulesByDay(req, res) {
        Scheduling.findAll({
            attributes: ['date', 'timeTable'],
            include: [{
                model: Customer,
                attributes: ['name'],
                required: true
            }],
            order: [
                ['timeTable', 'ASC']
            ],
            where: {
                date: {
                    [Op.eq]: req.query.day
                }
            }
        })
        .then(schedules => {
            if (schedules == null || schedules.length == 0)
                return res.status(204).send({ msg: 'Nenhum dado encontrado' });

            return res.status(200).json(schedules);
        })
        .catch(error => {
            return res.status(500).send({ msg: error })
        });
    }

}

module.exports = new DashboardController();