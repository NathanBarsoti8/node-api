const Customer = require('../models/Customer');
const Scheduling = require('../models/Scheduling');
const ServiceType = require('../models/ServiceType');
const Phone = require('../models/Phone');
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
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
                attributes: ['name', 'id'],
                required: true
            }, {
                model: ServiceType,
                attributes: ['name'],
                required: false
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

    async sendWppMessage(req, res) {
        let customerId = req.query.option.toLowerCase() == 'schedule' ? req.body.Customer.id : req.body.id;
        let customerName = req.query.option.toLowerCase() == 'schedule' ? req.body.Customer.name : req.body.name;

        let phone = await Phone.findOne({
            attributes: ['id', 'ddd', 'phoneNumber'],
            where: {
                customerId: customerId,
                typeId: 1
            }
        });

        const baseUrl = "https://web.whatsapp.com/send?phone=";
        const contact = `55${phone.ddd}${phone.phoneNumber}`;
        const lineBreak = "%0A";
        const asterisk = "%2A";
        const tagText = "&text=";
        let text = '';

        if (req.query.option.toLowerCase() == 'schedule') {
            text = `Olá, ${customerName}! Tudo bem? ${lineBreak}Você tem uma consulta às ${asterisk}${req.body.timeTable}${asterisk} no dia ${asterisk}${req.query.date}${asterisk} ${lineBreak}Podemos confirmar?`;
 
        }
        else if (req.query.option.toLowerCase() == 'birthday') {
            text = `Parabéns, ${customerName}! ${lineBreak}Desejamos a você muitas felicidades ${lineBreak}Aproveite o seu dia!` 
        }

        const link = `${baseUrl}${contact}${tagText}${text}`

        return res.status(200).send({ wppLink: link });
    }

}

module.exports = new DashboardController();