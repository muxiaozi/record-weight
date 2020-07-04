// pages/record/record.js

const db = wx.cloud.database()
const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weight: 0,
    now: util.formatDateTime(new Date())
  },

  inputComplete: function(e) {
    this.setData({
      weight: e.detail.value
    })
  },

  confirmWeight: function() {
    if(!this.data.weight) {
      wx.showToast({
        title: '需要输入体重 = = !',
        icon: 'none'
      })
      return;
    }

    db.collection("weights").add({
      data: {
        weight: Number(this.data.weight),
        date: new Date()
      },
      success(res) {
        console.log("添加数据成功", res)
        wx.navigateBack()
        wx.showToast({
          title: '添加数据成功',
        })
      },
      fail(err) {
        console.error("添加数据失败", err)
      }
    })

  }
})