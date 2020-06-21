// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weight: 0
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


  }
})