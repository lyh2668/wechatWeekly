const apiUri = require('../../utils/api')
const storageKey = require('../../utils/util').storageKey

Page({
  data: {
    weeklyDatas: []
  },
  onLoad (e) {
    this.setData({
      uid: e.uid
    })
    console.log(e)
  },
  onShow () {
    this.getNextList()
  },
  onPullDownRefresh: function () {
    console.log('开始下拉刷新')
    this.getNextList(null, function () {
      console.log('下拉刷新完成')
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom: function () {
    this.getNextList(this.getStartId())
  },
  toDetail: function (event) {
    console.log(event, event.currentTarget.dataset.item)

    let item = event.currentTarget.dataset.item
    wx.setStorage({ key: storageKey.weeklyCurrent, data: item })
    wx.navigateTo({ url: '/pages/weekly/detail?id=' + item.id })
  },
  getStartId: function () {
    let data = this.data.weeklyDatas
    return (data && data.length > 0) ? data[data.length - 1].id : 0
  },
  getNextList: function (id, cb) {
    let startId = id || 0
    let params = { 'startId': startId, 'member_id': this.data.uid }
    let that = this
    wx.showNavigationBarLoading()

    console.log(apiUri)
    wx.request({
      url: apiUri.getWeeklyList,
      data: params,
      success: function (res) {
        let data = res.data.list

        if (startId === 0) {
          that.setData({
            weeklyDatas: data
          })
        } else {
          that.setData({
            weeklyDatas: that.data.weeklyDatas.concat(data)
          })
        }

        wx.hideNavigationBarLoading()
        typeof cb === 'function' && cb()
      }
    })
  }
})
