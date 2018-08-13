const router = require('express').Router()
const { Employee } = require('./db/models')

router.post('/employee', (req, res, next) => {
  Employee.create(req.body)
    .then(employee => res.status(201).json(employee))
    .catch(next)
})

router.get('/company', (req, res, next) => {
  Employee.aggregate('company', 'DISTINCT', { plain: false })
    .then(companies => {
      const parsedCompanies = companies.map(c => {
        return c['DISTINCT']
      })
      res.json(parsedCompanies)
    })
    .catch(next)
})

router.get('/payroll/:selectedCompany', (req, res, next) => {
  const co = req.params.selectedCompany
  Employee.sum('salary', { where: { company: co } })
    .then(total => res.json(total))
    .catch(next)
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
