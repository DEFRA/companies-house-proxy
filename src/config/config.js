// Load application configuration using Dotenv
// (see https://www.npmjs.com/package/dotenv)
require('dotenv').config()

const config = module.exports = {}

config.port = process.env.PORT || 5000

config.COMPANIES_HOUSE_SERVICE_PROTOCOL = process.env.COMPANIES_HOUSE_SERVICE_PROTOCOL
config.COMPANIES_HOUSE_SERVICE_HOST = process.env.COMPANIES_HOUSE_SERVICE_HOST
config.COMPANIES_HOUSE_API_KEY = process.env.COMPANIES_HOUSE_API_KEY
config.COMPANIES_HOUSE_API_PASSWORD = process.env.COMPANIES_HOUSE_API_PASSWORD
