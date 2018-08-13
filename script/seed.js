const db = require('../server/db/db.js')
const { Employee } = require('../server/db/models/index.js')

const employees = [
  {
    firstName: 'Cousin Itt',
    lastName: 'Adams',
    address: '1313 Cemetery Lane',
    company: 'Adams Investments',
    salary: 66666
  },
  {
    firstName: 'Wednesday',
    lastName: 'Adams',
    address: '1313 Cemetery Lane',
    company: 'Adams Investments',
    salary: 130000
  },
  {
    firstName: 'Gomez',
    lastName: 'Adams',
    address: '1313 Cemetery Lane',
    company: 'Adams Investments',
    salary: 900000
  },
  {
    firstName: 'Homer',
    lastName: 'Simpson',
    address: '742 Evergreen Terrace',
    company: 'Springfield Nuclear Power Plant',
    salary: 60000
  },
  {
    firstName: 'Lenny',
    lastName: 'Leonard',
    address: '123 Pine St',
    company: 'Springfield Nuclear Power Plant',
    salary: 61000
  },
  {
    firstName: 'Charles Montgomery',
    lastName: 'Burns',
    address: ' 999 Mammon Avenu',
    company: 'Springfield Nuclear Power Plant',
    salary: 600000
  }
]

const seed = () => {
  return Promise.all(employees.map(emp => Employee.create(emp)))
}

const main = () => {
  console.log('syncing db')
  db
    .sync({ force: true })
    .then(() => {
      console.log('seeding')
      return seed()
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.stack)
    })
    .then(() => {
      db.close()
      return null
    })
}

main()
