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
    let preWeight = -1
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
        weight: item.weight,
        badge: this.testBadge(preWeight, item.weight),
      })
      preWeight = item.weight
    });
    this.setData({
      days: result
    })
  },
  testBadge(preWeight, curWeight) {
    // 当前体重大于100斤，显示警告
    // 体重增幅超过1斤，提示
    // 其他情况处于安全区域
    if (curWeight > 100) {
      return "warn"
    }
    if (preWeight != -1 && curWeight - preWeight > 1) {
      return "info"
    }
    return "success"
  },
  record: function() {
    wx.navigateTo({
      url: '../record/record',
    })
  }
})
