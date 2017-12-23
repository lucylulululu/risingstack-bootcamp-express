'use strict'

const path = require('path')
const joi = require('joi')
const { parse } = require('pg-connection-string')

const envVarsSchema = joi.object({
  MYSQL_URI: joi.string().uri({ scheme: 'mysql' }).required(),
  MYSQL_SSL_CA: joi.string(),
  MYSQL_SSL_KEY: joi.string(),
  MYSQL_SSL_CERT: joi.string(),
  MYSQL_SSL_ALLOW_UNAUTHORIZED: joi.boolean().truthy('true').falsy('false').default(true),
  MYSQL_POOL_MIN: joi.number().default(1),
  MYSQL_POOL_MAX: joi.number().default(20)
}).unknown()
  .required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
  client: 'mysql',
  connection: Object.assign(
    parse(envVars.MYSQL_URI),
    envVars.MYSQL_SSL_CA || envVars.MYSQL_SSL_KEY || envVars.MYSQL_SSL_CERT
      ? {
        ssl: {
          ca: envVars.MYSQL_SSL_CA,
          key: envVars.MYSQL_SSL_KEY,
          cert: envVars.MYSQL_SSL_CERT,
          rejectUnauthorized: !envVars.MYSQL_SSL_ALLOW_UNAUTHORIZED
        }
      }
      : {}
  ),
  pool: {
    min: envVars.MYSQL_POOL_MIN,
    max: envVars.MYSQL_POOL_MAX
  },
  migrations: {
    directory: path.join(__dirname, './migrations')
  }
}

module.exports = config