const Scheduling = require('../models/Scheduling');
const { v4: uuidv4 } = require('uuid');

class SchedulingController {

    create(req, res) {
        if (req.body.startTime >= req.body.endTime)
            return res.stauts(400).send({ msg: 'Não é possível inserir um horário de término maior que o inicial' });

        let scheduling = new Scheduling();

        scheduling = req.body
        scheduling.id = uuidv4();

        Scheduling.create(scheduling)
            .then(result => {
                if (result)
                    return res.status(200).send({ msg: 'Consulta marcada com sucesso' });
                else
                    return res.status(400).send({ msg: 'Ocorreu um erro ao criar nova consulta' });
            })
            .catch(error => res.status(500).send({ msg: error }));
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