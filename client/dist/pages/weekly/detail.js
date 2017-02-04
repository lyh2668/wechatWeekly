const apiUrl = require('../../utils/api');
const storageKey = require('../../utils/util').storageKey;

Page({
  data: {
    id: 0,
    isEdited: false,
    datas: {
      id: 0,
      content: [{
        title: '本周工作总结',
        text: '',
        placeholder: '总结一下这周做了哪些工作'
      }, {
        title: '下周工作计划',
        text: '',
        placeholder: '计划一下下周的工作任务'
      }, {
        title: '感想',
        text: '',
        placeholder: '谈谈这周工作的感想与心得'
      }]
    }
  },
  onLoad(e) {
    var that = this;

    wx.getStorage({
      key: storageKey.weeklyDetail,
      success: function (res) {
        if (res.data) {
          var tmp = res.data;
          that.setData({
            datas: tmp,
            isEdited: true
          });
          wx.removeStorage({ key: storageKey.weeklyDetail });
        }
      },
      fail: function (res) {
        that._getWeeklyCurrent(e.id, that);
      }
    });
  },
  onShow() {},
  onUnload() {
    var that = this;
    var tmpDatas = this.data.datas;

    console.log('Weekly detail on unload.');

    if (this.data.isEdited) {
      wx.showModal({
        title: '友情提醒',
        content: '之前的周报尚未保存，是否返回继续编辑',
        success: function (res) {
          if (res.confirm) {
            console.log('confirm.' + that.data.datas);

            wx.navigateTo({
              url: '/pages/weekly/detail?id=' + that.data.id
            });

            wx.setStorage({
              key: storageKey.weeklyDetail,
              data: tmpDatas
            });
          }
        },
        complete: function () {}
      });
    }
  },
  textConfirm: function (e) {
    console.log('confirm.');
  },
  textBlur: function (e) {
    var tmp = this.data.datas;

    tmp.content[e.target.dataset.index].text = e.detail.value;

    this.setData({
      datas: tmp,
      isEdited: true
    });
  },
  confirm: function () {
    let that = this;

    wx.showModal({
      title: '提交',
      content: '将周报提交到资源库',
      cancelText: '取消',
      confirmText: '提交',
      // cancelColor: 'red',
      // confirmColor: '#3CC51F', 默认即为#3CC51F
      success: function (res) {
        if (res.confirm) {
          console.log('提交.');
          that._postWeekly(that);
          // 提交一个表单
        } else {
            // console.log('存稿.')
            // 同样提交一个表单，只不过存储位置不同
          }
      },
      fail: function (res) {}
    });
  },
  _getWeeklyCurrent: function (id, that) {
    wx.getStorage({
      key: storageKey.weeklyCurrent,
      success: function (res) {
        if (parseInt(id) === parseInt(res.data.id)) {
          let datas = that.data.datas;
          let content = datas.content;
          content[0].text = res.data.summary_this_week;
          content[1].text = res.data.plan_next_week;
          content[2].text = res.data.problem;
          datas.content = content;

          that.setData({
            datas: datas,
            weeklyCurrent: res.data
          });
        }
      }
    });
  },
  _postWeekly: function (that, cb) {
    let weeklyCurrent = that.data.weeklyCurrent;

    if (weeklyCurrent) {
      weeklyCurrent.summary_this_week = that.data.datas.content[0].text;
      weeklyCurrent.plan_next_week = that.data.datas.content[1].text;
      weeklyCurrent.problem = that.data.datas.content[2].text;

      that._post(that, weeklyCurrent, cb);
    } else {
      wx.getStorage({
        key: storageKey.weeklyCurrent,
        success: function (res) {
          weeklyCurrent = res.data;

          weeklyCurrent.summary_this_week = that.data.datas.content[0].text;
          weeklyCurrent.plan_next_week = that.data.datas.content[1].text;
          weeklyCurrent.problem = that.data.datas.content[2].text;

          that._post(that, weeklyCurrent, cb);
        }
      });
    }
  },
  _post: function (that, data, cb) {
    console.log('POST data: ', data);
    wx.showToast({ title: '提交中...' });
    wx.request({
      url: apiUrl.postWeeklyDetail,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('success res: ', res);
        if (res.statusCode === 200) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000,
            complete: function () {
              console.log('123');
              that.data.isEdited = false;
              wx.navigateBack();
            }
          });
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'fail',
            duration: 2000,
            complete: function () {
              console.log('123');
            }
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '上传失败',
          icon: 'fail',
          duration: 2000,
          complete: function () {
            console.log('123');
          }
        });
        console.log('fail res: ', res);
      },
      complete: function (res) {
        typeof cb === 'function' && cb();
      }
    });
  }
});
//# sourceMappingURL=detail.js.map
