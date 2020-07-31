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
          id: 1,
          name: 'Clínica geral'
        },
        {
          id: 2,
          name: 'Clareamento'
        },
        {
          id: 3,
          name: 'Prótese dentária'
        },
        {
          id: 4,
          name: 'Tratamento de cárie'
        },
        {
          id: 5,
          name: 'Ortodontia'
        },
        {
          id: 6,
          name: 'Periodontia'
        },
        {
          id: 7,
          name: 'Endodontia'
        },
        {
          id: 8,
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