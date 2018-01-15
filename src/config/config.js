// Load application configuration using Dotenv
// (see https://www.npmjs.com/package/dotenv)
require('dotenv').config()

const config = module.exports = {}

config.port = process.env.PORT || 5000

config.LOG_LEVEL = process.env.LOG_LEVEL

// Get the address of a proxy server if one is being used in the environment.
// Typically this will used in our environments, but not locally. The app is
// setup to tell if the env var has been set and amend calls made using `https`
// accordingly
config.http_proxy = process.env.http_proxy
config.https_proxy = process.env.https_proxy

config.COMPANIES_HOUSE_SERVICE_PROTOCOL = process.env.COMPANIES_HOUSE_SERVICE_PROTOCOL
config.COMPANIES_HOUSE_SERVICE_HOST = process.env.COMPANIES_HOUSE_SERVICE_HOST
config.COMPANIES_HOUSE_API_KEY = process.env.COMPANIES_HOUSE_API_KEY
config.COMPANIES_HOUSE_API_PASSWORD = process.env.COMPANIES_HOUSE_API_PASSWORD
