let member = require('../models').member

exports.login = function (p) {
  let username = p ? p.username : ''

  return member.findOne({
    where: {
      login_name: username
    }
  })
}
