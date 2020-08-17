const Scheduling = require('../models/Scheduling');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 
const paginate = require('jw-paginate');
const Customer = require('../models/Customer');
const { Op } = require('sequelize');

const schedulingStatus = {
    SCHEDULED: 1,
    DONE: 2
}

/* 

NEED TO FIX WARNING ABOUT DATE

possible solution

let date = moment(new Date(req.query.updated_at)).format()

works in another repository

--> just a note to remember

*/

class SchedulingController {
    getAll(req, res) {
        const page = parseInt(req.query.page);
        const pageSize = 10;

        let params = [];
        if (req.query.customer != undefined && req.query.customer != null && req.query.customer !== 'null' && req.query.customer !== 'undefined') {
            params.push({
                customerId: {
                    [Op.eq]: `${req.query.customer}`
                }
            });
        }
        
        Scheduling.findAll({
            include: [{
                model: Customer,
                attributes: ["name"]
            }],
            order: [
                ['date', 'ASC']
            ],
            where: {
                date: {
                    [Op.lte]: `${req.query.finishDate}`,
                    [Op.gte]: `${req.query.startDate}`
                },
                [Op.and]: params
            }
        })
        .then(schedules => {
            if (schedules == null || schedules.length == 0)
                return res.status(204).send({ msg: 'Nenhum dado encontrado' });

            const pager = paginate(schedules.length, page, pageSize);
            const data = schedules.slice(pager.startIndex, pager.endIndex + 1);

            return res.json({ pager, data });
        })
        .catch(error => {
            return res.status(500).send({ msg: error })
        });
    }

    getById(req, res) {
        sequelize.query(`SELECT
        S.Id as schedulingId, S.date, S.timeTable,
        ST.Id as serviceTypeId, ST.name as serviceType,
        SS.Id as statusId, SS.name as status,
        
		C.Id AS customerId, C.name as customerName
    
        FROM Scheduling S
		INNER JOIN ServiceType ST
        ON S.ServiceTypeId = ST.Id
        INNER JOIN SchedulingStatus SS
		ON S.StatusId = SS.Id
        INNER JOIN Customer C
        ON S.CustomerId = C.Id
    
        WHERE S.Id = '${req.params.id}'`)
            .then(schedule => {

                if (schedule[0] == null || schedule[0].length == 0)
                    return res.status(404).send({ msg: 'Consulta não encontrada'});

                return res.json(schedule[0]);
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    async create(req, res) {
        let scheduling = new Scheduling();
        let invalidTime;

        scheduling = req.body
        scheduling.id = uuidv4();
        scheduling.statusId = schedulingStatus.SCHEDULED;

        const today = moment(new Date(), "DD-MM-YYYY");
        const date = moment(new Date(scheduling.date), "DD-MM-YYYY");

        if (date < today)
            return res.status(400).send({ msg: 'Data da consulta menor que a data atual' })

        await Scheduling.findAll({
            where: {
                date: scheduling.date
            }
        })
        .then(schedule => {
            if (!schedule || schedule.length == 0) {
                Scheduling.create(scheduling)
                    .then(result => {
                        if (result)
                            return res.status(200).send({ msg: 'Consulta marcada com sucesso' })
                    })
                    .catch(error => {
                        return res.status(500).send({ msg: error })
                    })
            }
            else {
                schedule.forEach(x => {
                    if (x.dataValues.timeTable == scheduling.timeTable)
                        invalidTime = true;
                })
    
                if (invalidTime)
                    return res.status(400).send({ msg: 'Nesse horário já existe uma consulta' });
    
                else if (!invalidTime) {
                    Scheduling.create(scheduling)
                        .then(result => {
                            if (result)
                                return res.status(200).send({ msg: 'Consulta marcada com sucesso' });
                        })
                        .catch(error => {
                            return res.status(500).send({ msg: error })
                        });
                }
            }    
            
        });
    }

    update(req, res) {
        const today = moment().format('YYYY-MM-DD');
        const date = moment(req.body.date).format('YYYY-MM-DD');

        console.log('today', today)
        console.log('date', date)

        if (date < today)
            return res.status(400).send({ msg: 'Data da consulta menor que a data atual' })

        Scheduling.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(schedule => {
            if (schedule == null)
                return res.status(404).send({ msg: 'Consulta não encontrada' })

            if (req.body.timeTable) {
                Scheduling.findAll({
                    where: {
                        date: date
                    }
                })
                .then(schedules => {
                    if (!schedules || schedules.length == 0) {
                        schedule.update(req.body)
                            .then(result => {
                                if (result)
                                    return res.status(200).send({ msg: 'Consulta alterada com sucesso' })
                            })
                            .catch(error => {
                                return res.status(500).send({ msg: error })
                            });
                    }

                    let invalidTime;
                    
                    schedules.forEach(x => {
                        if (x.dataValues.timeTable == req.body.timeTable)
                            invalidTime = true;
                    })

                    if (invalidTime)
                        return res.status(400).send({ msg: 'Nesse horário já existe uma consulta' });

                    else if (!invalidTime) {
                        schedule.update(req.body)
                        .then(result => {
                            if (result)
                                return res.status(200).send({ msg: 'Consulta alterada com sucesso' });
                        })
                        .catch(error => {
                            return res.status(500).send({ msg: error })
                        });
                    }
                });
            }

            else {
                schedule.update(req.body)
                    .then(result => {
                        if (result)
                            return res.status(200).send({ msg: 'Consulta alterada com sucesso' })
                    })
                    .catch(error => {
                        return res.status(500).send({ msg: error })
                    });      
            }
        })
        .catch(error => {
            return res.status(500).send({ msg: error })
        });
    }

    delete(req, res) {
        Scheduling.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(scheduling => {
            if (scheduling)
                return res.status(200).send({ msg: 'Consulta deletada com sucesso' });
        })
        .catch(error => res.status(500).send({ msg: error }));
    }
}

module.exports = new SchedulingController();