//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
const util = require("../../utils/util")

Page({
  data: {
    userInfo: {},
    total: [
      {
        date: "2020-06-25",
        first: {
          weight: 80,
          date: new Date()
        },
        last: {
          weight: 90,
          date: new Date()
        }
      }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady: function()  {
    let that = this
    return
    db.collection("weights").get({
      success(res) {
        that.fillList(res.data)
      },
      fail(err) {
        wx.showModal({
          title: "获取数据失败",
          content: err.message
        })
      }
    })
  },
  fillList(list) {
    let dayDict = {}
    let result = []
    list.forEach(item => {
      let day = util.formatDate(item.date)
      if (!dayDict[day]) {
        dayDict[day] = []
        result.push({
          date: day,
          morning_weight: item.weight,
          evening_weight: item.weight
        })
      }
      result.push({
        date: day,
        morning_weight: item.weight,
        evening_weight: item.weight
      })
      // dayDict[day].push(item)
    });
    this.setData({
      total: result
    })
    console.log("dayDict:", dayDict)
  },
  record: function() {
    wx.navigateTo({
      url: '../record/record',
    })
  }
})
