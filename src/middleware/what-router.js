module.exports = async function (expressApp) {
  expressApp.use((req, res, next) => {

    if (typeof req.headers['content-type'] !== 'undefined' && req.headers['content-type'].match(/application\/json/i)) {
      req.routeType = 'api'
    } else if (typeof req.headers['upgrade'] !== 'undefined' && req.headers['upgrade'].match(/websocket/i)) {
      req.routeType = 'wss'
    } else {
      req.routeType = 'web'
    }
    req.url = '/' + req.routeType + req.url

    if (req.url.match(/^\/(web|api|wss)\/(web|api|wss)/)) {
      req.url = req.url.slice(4)
      req.routeType = req.url.slice(1, 4)
    }

    next('route')
  })
}
