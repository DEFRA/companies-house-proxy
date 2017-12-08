'use strict'

const config = require('./src/config/config')
const Hapi = require('hapi')
const server = Hapi.server({ port: config.port })
const H2o2 = require('h2o2')
const Wreck = require('wreck')

const startServer = async () => {
  try {
    await server.register({ plugin: H2o2 })
    await server.start()

    console.log('Server started at:', server.info.uri)
  } catch (err) {
    console.error('Failed to start server: ', err)
  }
}

startServer()

server.route([
  {
    method: 'GET',
    path: '/health',
    handler: (request, h) => {
      return 'Companies House proxy component is running'
    }
  },
  {
    method: '*',
    path: '/{path*}',
    handler: {
      proxy: {
        mapUri: (request) => {
          return {
            uri: `${config.COMPANIES_HOUSE_SERVICE_PROTOCOL}://${config.COMPANIES_HOUSE_SERVICE_HOST}/${request.params.path}`,
            headers: {
              'Authorization': 'Basic ' +
                Buffer.from(`${config.COMPANIES_HOUSE_API_KEY}:${config.COMPANIES_HOUSE_API_PASSWORD}`).toString('base64')
            }
          }
        },
        onResponse: async (err, res, request, reply, settings, ttl) => {
          if (err) {
            console.error(err)
          }
          const payload = await Wreck.read(res, { json: true })
          // Response payload manipulation can be placed here if required
          return payload
        }
      }
    }
  }
])
