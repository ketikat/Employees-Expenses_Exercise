const app = require('./server/server.js')
const PORT = process.env.PORT || 8080
const { db } = require('./server/db/models/index.js')
const chalk = require('chalk')

db
  .sync({force: false})
  .then(() => {
    console.log('The postgres server is up and running')
    app.listen(PORT, err => {
      if (err) {
        console.error(err)
        return
      }
      console.log(chalk.magenta(`Running on http://localhost:${PORT}`))
    })
  })
  .catch(console.error)
