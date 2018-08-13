// const Sequelize = require('sequelize')
// const db = require('../db.js')

// const Company = db.define('company', {
//   company_name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   address: {
//     type: Sequelize.STRING,
//     allowNull: true
//   }
// })

// Company.prototype.getEmployees = function () {
//   return db.model('employee').findAll({
//     where: { companyId: this.id }
//   })
// }

// Company.prototype.getPayroll = function () {
//   let payroll = 0

//   db.Employee.findAll({
//     where: {
//       company: this.name
//     },
//     attributes: ['salary']
//   }).then(salaries => {
//     const sum = salaries.reduce((x, y) => x + y, 0)
//     payroll = sum
//   })

//   return payroll
// }
// module.exports = Company
