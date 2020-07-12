const Scheduling = require('../models/Scheduling');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 

class SchedulingController {

    async create(req, res) {
        let scheduling = new Scheduling();

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

            if (!schedule || schedule.length == 0) 
                this.save(scheduling)
            
            schedule.forEach(x => {
                if (x.dataValues.time == scheduling.time)
                    return res.status(400).send({ msg: 'Nesse horário já existe uma consulta' })
            })

            this.save(scheduling);
        });
    }

    save(obj) {
        Scheduling.create(obj)
            .then(result => {
                if (result)
                    return res.status(200).send({ msg: 'Consulta marcada com sucesso' });
            })
            .catch(error => {
                return res.status(500).send({ msg: error })
            });
    }

    update(req, res) {
        Scheduling.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(scheduling => {
            if (scheduling) {
                scheduling.update(req.body);
                
                return res.status(200).send({ msg: 'Consulta atualizada com sucesso' });
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