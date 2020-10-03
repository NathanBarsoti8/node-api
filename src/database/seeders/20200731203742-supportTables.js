'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('PhoneType', [{
          id: 1,
          name: 'Celular'
        },
        {
          id: 2,
          name: 'Casa'
        },
        {
          id: 3,
          name: 'Outro'
        }
      ]),

      queryInterface.bulkInsert('ServiceType', [{
          name: 'Clínica geral'
        },
        {
          name: 'Clareamento'
        },
        {
          name: 'Prótese dentária'
        },
        {
          name: 'Tratamento de cárie'
        },
        {
          name: 'Ortodontia'
        },
        {
          name: 'Periodontia'
        },
        {
          name: 'Endodontia'
        },
        {
          name: 'Estomatologia'
        }
      ]),

      queryInterface.bulkInsert('SchedulingStatus', [{
          id: 1,
          name: 'Agendada'
        },
        {
          id: 2,
          name: 'Concluída'
        }
      ])

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('PhoneType', null, {}),
      queryInterface.bulkDelete('ServiceType', null, {}),
      queryInterface.bulkDelete('SchedulingStatus', null, {})
    ])
  }
};