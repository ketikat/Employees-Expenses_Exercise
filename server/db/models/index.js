const db = require('../db')

const Employee = require('./employee')
// const Company = require('./company')

// Employee.belongsTo(Company)
// Company.hasMany(Employee)

module.exports = {
  db,
  Employee
  // Company
}
