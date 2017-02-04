const fs = require('fs')
const path = require('path')
const MD5 = require('crypto-js/md5')

// 存放api接口对象
let api = {}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file.indexOf('index.js') !== 0)
  })
  .forEach(function (file) {
    var modelName = file.split('.')[0]
    api[modelName] = require(path.join(__dirname, modelName))
  })

module.exports = function (app) {

  // 根据请求的路径调用不同的 API
  app.get('/', function (req, res) {
    return res.send({
      msg: 'Hello.'
    })
  })

  app.get('/api/weekly', function (req, res) {
    let _data = {
      errcode: 0,
      errmsg: 'ok',
      list: {}
    }
    api.personalTime.getList(req.query).then(function (data) {
      _data.list = data
      return res.send(_data)
    }).catch(function (err) {
      return res.send({
        errcode: -1,
        errmsg: err
      })
    })
  })

  app.post('/api/weekly/commit', function (req, res) {
    // commit 接口分发布和保存两种方式，本质都是修改对应的数据， 可用一个状态来区分
    let _data = {
      errcode: 0,
      errmsg: 'ok',
      list: {}
    }
    api.personalTime.commit(req.body).then(function (data) {
      _data.data = data
      return res.send(_data)
    }).catch(function (err) {
      return res.send({
        errcode: -1,
        errmsg: err
      })
    })
  })

  app.get('/api/weekly_detail', function (req, res) {
    return res.send({
      msg: 'This is weekly_detail.'
    })
  })

  app.post('/api/login', function (req, res) {
    let _data = {
      errcode: 0,
      errmsg: 'ok',
      list: {}
    }
    req.body && api.member.login(req.body).then(function (data) {
      let password = MD5(req.body.password).toString()
      if (data.password) {
        if (password === data.password) {
          _data.data = {
            id: data.id,
            nickname: data.username
          }
        } else {
          _data.errcode = 1
          _data.errmsg = '密码错误'
        }
      } else {
        _data.errcode = 2
        _data.errmsg = '没有该用户'
      }
      res.send(_data)
    })
  })


// get 测试用
  app.get('/api/login', function (req, res) {
    let _data = {
      errcode: 0,
      errmsg: 'ok',
      list: {}
    }
    api.member.login(req.query).then(function (data) {
      let password = MD5(req.query.password).toString()
      console.log(password)
      console.log(data.password)
      if (data.password) {
        if (password === data.password) {
          _data.data = data
        } else {
          _data.errcode = 1
          _data.errmsg = '密码错误'
        }
      } else {
        _data.errcode = 2
        _data.errmsg = '没有该用户'
      }
      res.send(_data)
    })
  })
}
