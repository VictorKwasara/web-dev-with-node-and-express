const express = require('express')
const handlers = require('./lib/handlers')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
// configure Handlebars view engine 
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'handlebars')
app.get('/', handlers.home)
app.get('/about', handlers.about)
// custom 404 page 
app.use(handlers.notFound)
//custom 500 page 
app.use(handlers.serverError)
if(require.main === module) {
  app.listen(port, () => {
    console.log(`Epress started on http://localhost:${port}; press Ctrl-C to terminate.`)
  })
}else {
  module.exports = app
}
