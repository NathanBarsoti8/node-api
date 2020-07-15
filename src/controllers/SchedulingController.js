const Scheduling = require('../models/Scheduling');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 

class SchedulingController {

    getById(req, res) {
        sequelize.query(`SELECT
        S.Id as schedulingId, S.date, S.timeTable,
        ST.Id as serviceTypeId, ST.name as serviceType,
        
		C.Id AS clientId, C.name as clientName
    
        FROM Scheduling S
		INNER JOIN ServiceType ST
		ON S.ServiceTypeId = ST.Id
        INNER JOIN Client C
        ON S.ClientId = C.Id
    
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
        });
    }

    update(req, res) {
        if (req.body.date) {
            const today = moment(new Date(), "DD-MM-YYYY");
            const date = moment(new Date(req.body.date), "DD-MM-YYYY");

            if (date < today)
                return res.status(400).send({ msg: 'Data da consulta menor que a data atual' })
        }

        Scheduling.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(async schedule => {
            if (req.body.timeTable) {

                let dateFilter;
                let invalidTime;
            
                if (req.body.date)
                    dateFilter = req.body.date
                else
                    dateFilter = schedule.dataValues.date

                await Scheduling.findAll({
                    where: dateFilter
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

                    schedules.forEach(x => {
                        if (x.dataValues.timeTable == req.body.timeTable)
                            invalidTime = true;
                    })

                    if (invalidTime)
                        return res.status(400).send({ msg: 'Nesse horário já existe uma consulta' });

                    else if (!invalidTime) {
                        Scheduling.update(req.body)
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
        .catch(error => res.status(500).send({ msg: error }));
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