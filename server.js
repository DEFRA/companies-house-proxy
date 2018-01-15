'use strict'

const Config = require('./src/config/config')
const Hapi = require('hapi')
const server = Hapi.server({ port: Config.port })
const H2o2 = require('h2o2')
const Wreck = require('wreck')
const HttpsProxyAgent = require('https-proxy-agent')

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
    method: 'GET',
    path: '/{path*}',
    handler: {
      proxy: {
        mapUri: (request) => {
          console.log('Received request for path: ', request.url.path)
          return {
            uri: `${Config.COMPANIES_HOUSE_SERVICE_PROTOCOL}://${Config.COMPANIES_HOUSE_SERVICE_HOST}/${request.params.path}`,
            headers: {
              'Authorization': 'Basic ' +
                Buffer.from(`${Config.COMPANIES_HOUSE_API_KEY}:${Config.COMPANIES_HOUSE_API_PASSWORD}`).toString('base64')
            }
          }
        },
        agent: (Config.http_proxy) ? new HttpsProxyAgent(Config.http_proxy) : undefined,
        onResponse: async (err, res, request, reply, settings, ttl) => {
          if (err) {
            console.error('Error restrieving data: ', err)
          }
          const payload = await Wreck.read(res, { json: true })
          // Response payload manipulation can be placed here if required

          if (Config.LOG_LEVEL === 'DEBUG') {
            console.log('Returning payload: ', payload)
          }
          return payload
        }
      }
    }
  }
])
