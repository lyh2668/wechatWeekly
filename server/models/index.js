const fs = require('fs')
const path = require('path')
const config = require('config')
const Sequelize = require('sequelize')

const mysqlConf = config.get('mysql')

let sequelize = new Sequelize(mysqlConf.database, mysqlConf.user, mysqlConf.password, {
  'dialect': mysqlConf.name,
  'host': mysqlConf.host,
  'port': mysqlConf.port,
  'define': {
    // 字段以下划线（_）来分割（默认是驼峰命名风格）
    'underscored': true
  }
})

let db = {}

// 遍历models目录下的文件，并将model取出放入db对象中
fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file.indexOf('index.js') !== 0)
  })
  .forEach(function (file) {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
