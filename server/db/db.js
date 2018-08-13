const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const connectionString =
  process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`

const db = new Sequelize(connectionString, { logging: false })

module.exports = db
