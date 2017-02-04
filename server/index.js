const express = require('express')
const http = require('http')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const flash = require('express-flash')
const passport = require('passport')
const db = require('./models')

const bodyParser = require('body-parser')

const config = require('config')
const port = config.get('serverPort')

let app = express()

// app.use(cookieParser())
// app.use(session())
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())

app.use(bodyParser.json({ limit: '1mb' }))  // 这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}))
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
require('./api')(app)
let server = http.createServer(app)

db.sequelize.sync().then(function () {
  server.listen(port, function () {
    console.log('host: ' + server.address().address + ', port: ' + server.address().port)
  })
})

// api.personalTime.getList({pageNum: 20, startId: 510})
