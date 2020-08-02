const Customer = require('../models/Customer');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const AddressController = require('./AddressController');
const PhoneController = require('./PhoneController');
const paginate = require('jw-paginate');
const { Op } = require('sequelize');

class CustomersController {
    getAll(req, res) {
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        let status;

        if (req.query.status === 'false')
            status = 0;
        else
            status = 1;
        
        Customer.findAll({
                where: {
                    isActive: status,
                    name: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(customers => {
                if (customers == null || customers.length == 0)
                    return res.status(204).send({ msg: 'Nenhum dado encontrado'});

                const pager = paginate(customers.length, page, pageSize);
                const data = customers.slice(pager.startIndex, pager.endIndex + 1);

                return res.json({ pager, data });
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    getById(req, res) {
        sequelize.query(`SELECT
        C.Id as customerId, C.name, C.cpf, C.birthDate,
        C.sex, C.email, C.job, C.isActive,
    
        P.Id as phoneId, P.phoneNumber, P.DDD,
	    PT.Name as phoneType, PT.Id as phoneTypeId,
    
        A.Id as addressId, A.zipCode, A.address,
        A.addressNumber, A.neighborhood, 
        A.complement, A.city, A.state
    
        FROM Customer C
        LEFT JOIN Phone P
        ON C.Id = P.CustomerId
        LEFT JOIN PhoneType PT
        ON P.TypeId = PT.Id
        LEFT JOIN Address A
        ON C.Id = A.CustomerId
    
        WHERE C.Id = '${req.params.id}'`)
            .then(customer => {

                if (customer[0] == null || customer[0].length == 0)
                    return res.status(404).send({ msg: 'Cliente não encontrado'});

                return res.json(customer[0]);
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    create(req, res) {
        let customer = new Customer();

        customer = req.body
        customer.id = uuidv4();
        customer.isActive = true;

        Customer.create(customer)
            .then(result => {
                if (result) {
                    AddressController.create(customer);
                    PhoneController.create(customer);

                    return res.status(200).send({ msg: 'Cliente salvo com sucesso' });
                } else
                    return res.status(400).send({ msg: 'Ocorreu um erro ao salvar novo cliente'});
            })
            .catch(error => res.status(500).send({ msg: error }));
    }

    changeStatusById(req, res) {
        Customer.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(customer => {

            if (customer.dataValues.isActive == false)
                customer.dataValues.isActive = 1
            else
                customer.dataValues.isActive = 0

            customer.update({
                isActive: customer.dataValues.isActive
            })
            
            return res.status(200).send({ msg: 'Status atualizado com sucesso'});
        })
        .catch(error => res.status(500).send({ msg: error }));
    }

    update(req, res) {
        Customer.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(customer => {
            if (customer) {

                customer.update(req.body);

                AddressController.updateByCustomerId(req.params.id, req.body)
                PhoneController.updateByCustomerId(req.params.id, req.body)

                return res.status(200).send({ msg: 'Cliente atualizado com sucesso'})
            }
        })
        .catch(error => res.status(500).send({ msg: error }));
    }

}

module.exports = new CustomersController();