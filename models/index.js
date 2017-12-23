'use strict'

const config = require('./db/config')
const knex = require('knex')

const db = knex(config)

module.exports = db