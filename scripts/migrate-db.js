'use strict'

const args = process.argv.slice(2)
require('dotenv').config();

if (args.includes('--local') || args.includes('-L')) {
  const user = process.env.MYSQL_USER || process.env.USER || 'root'
  const pw = process.env.MYSQL_PASSWORD || ''
  const db = process.env.MYSQL_DATABASE || 'risingstack_bootcamp'
  process.env.MYSQL_URI = `mysql://${user}:${pw}@localhost:3306/${db}`
}

const knex = require('../models/index')

knex.migrate.latest()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database synced successfully!')
    process.exit(0)
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  })