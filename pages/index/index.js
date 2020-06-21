//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    total: [
      {
        "date": "06.21",
        "morning_weight": 20,
        "evening_weight": 30
      },
      {
        "date": "06.22",
        "morning_weight": 40,
        "evening_weight": 50
      }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  sayHello() {
    wx.showModal({
      content: '王余霞好漂亮啊',
      cancelColor: 'red',
      confirmColor: 'green',
      success: function(result) {
        if(result.confirm) {
          wx.showToast({
            title: '真是个明智的选择',
          })
        } else {
          wx.showToast({
            title: '脑子有坑？',
          })
        }
      }
    })
  }
})
