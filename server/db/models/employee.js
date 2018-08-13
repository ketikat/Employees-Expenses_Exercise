const Sequelize = require('sequelize')
const db = require('../db.js')

const Employee = db.define('employee', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Employee
