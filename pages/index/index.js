//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
const util = require("../../utils/util")

Page({
  data: {
    userInfo: {},
    days: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow() {
    this.refreshData()
  },
  refreshData() {
    let that = this
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
        let day_item = {
          date: day,
          data: []
        }
        dayDict[day] = day_item.data
        result.push(day_item)
      }
      dayDict[day].push({
        time: util.formatTime(item.date),
        weight: item.weight
      })
    });
    this.setData({
      days: result
    })
    console.log("dayDict:", dayDict)
  },
  record: function() {
    wx.navigateTo({
      url: '../record/record',
    })
  }
})
