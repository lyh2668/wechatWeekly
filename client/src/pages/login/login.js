const apiUrl = require('../../utils/api')

Page({
  data: {
    username: '',
    password: ''
  },
  usernameBlur: function (e) {
    this.setData({
      username: e.detail.value
    })
    console.log('usernameBlur: ', e.detail.value)
  },
  passwordBlur: function (e) {
    this.setData({
      password: e.detail.value
    })
    console.log('passwordBlur: ', e.detail.value)
  },
  login: function () {
    // 发送登录请求
    var data = {
      username: this.data.username,
      password: this.data.password
    }
    this._postLogin(data)
  },
  _postLogin: function (data) {
    wx.showToast({
      title: '登录中...'
    })

    console.log('login data: ', data)

    wx.request({
      url: apiUrl.login,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.errcode === 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            complete: function () {
              wx.navigateTo({
                url: '/pages/weekly/index?uid=' + res.data.data.id
              })
            }
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'fail',
            duration: 2000,
            complete: function () {

            }
          })
        }
      }
    })
  }
})
