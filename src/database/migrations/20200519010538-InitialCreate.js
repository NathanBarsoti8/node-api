'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable(
        'ServiceType', {
          Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
          },
          Name: {
            type: Sequelize.STRING(30),
            allowNull: false
          }
        }
      ),

      queryInterface.createTable(
        'PhoneType', {
          Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
          },
          Name: {
            type: Sequelize.STRING(20),
            allowNull: false
          }
        }
      ),

      queryInterface.createTable(
        'Client', {
          Id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
          },
          Name: {
            type: Sequelize.STRING(30),
            allowNull: false
          },
          Cpf: {
            type: Sequelize.STRING(11),
            allowNull: false
          },
          BirthDate: {
            type: Sequelize.DATE,
            allowNull: false
          },
          Sex: {
            type: Sequelize.STRING(1),
            allowNull: false
          },
          Email: {
            type: Sequelize.STRING(100),
            allowNull: true
          },
          Job: {
            type: Sequelize.STRING(30),
            allowNull: false
          },
          IsActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }
      ),

      queryInterface.createTable(
        'Phone', {
          Id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
          },
          TypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'PhoneType',
              key: 'Id'
            }
          },
          DDD: {
            type: Sequelize.STRING(3),
            allowNull: false
          },
          PhoneNumber: {
            type: Sequelize.STRING(9),
            allowNull: false
          },
          ClientId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Client',
              key: 'Id'
            }
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }
      ),

      queryInterface.createTable(
        'Address', {
          Id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
          },
          ZipCode: {
            type: Sequelize.BIGINT(10),
            allowNull: false,
          },
          State: {
            type: Sequelize.STRING(30),
            allowNull: false,
          },
          City: {
            type: Sequelize.STRING(40),
            allowNull: false
          },
          Address: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          AddressNumber: {
            type: Sequelize.INTEGER(4),
            allowNull: true
          },
          Neighborhood: {
            type: Sequelize.STRING(20),
            allowNull: false
          },
          Complement: {
            type: Sequelize.STRING(30),
            allowNull: true
          },
          ClientId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Client',
              key: 'Id'
            }
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }
      ),

      queryInterface.createTable(
        'Scheduling', {
          Id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
          },
          ClientId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Client',
              key: 'Id'
            }
          },
          Date: {
            type: Sequelize.DATE,
            allowNull: false
          },
          StartTime: {
            type: Sequelize.DATE,
            allowNull: false
          },
          FinishTime: {
            type: Sequelize.DATE,
            allowNull: false
          },
          ServiceTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'ServiceType',
              key: 'Id'
            }
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }
      )

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Scheduling'),
      queryInterface.dropTable('Address'),
      queryInterface.dropTable('Phone'),
      queryInterface.dropTable('Client'),
      queryInterface.dropTable('PhoneType'),
      queryInterface.dropTable('ServiceType')
    ])
  }

};