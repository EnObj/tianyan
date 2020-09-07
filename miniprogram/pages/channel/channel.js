const db = wx.cloud.database()

// miniprogram/pages/channel/channel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel: null,
    userChannel: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载channel
    db.collection('ty_channel').doc(options.channelId).get().then(res => {
      this.setData({
        channel: res.data
      })
    })
    // 加载用户channel
    db.collection('ty_user_channel').where({
      'channel._id': options.channelId
    }).get().then(res => {
      this.setData({
        userChannel: res.data[0] || null
      })
    })
  },

  addUserChannel() {
    db.collection('ty_user_channel').add({
      data: {
        "channel": this.data.channel,
        "channelData": {},
        "notify": false
      }
    }).then(res => {
      db.collection('ty_user_channel').doc(res._id).get().then(res => {
        this.setData({
          userChannel: res.data
        })
      })
    })
  },

  removeUserChannel() {
    db.collection('ty_user_channel').doc(this.data.userChannel._id).remove().then(res => {
      this.setData({
        userChannel: null
      })
    })
  },

  switchNotify(event) {
    const value = event.detail.value
    // 请求订阅
    if (value) {
      var tmplId = 'PeNNc-AQ5M2ZLE6BniC5YJwCcVAd1UVlsq7dZEz1n0w'
      wx.requestSubscribeMessage({
        tmplIds: [tmplId],
        success: function (res) {
          console.log(res)
          switch (res[tmplId]) {
            case 'accept':
              this.updateNotify(true)
              break
            case 'reject': // 'reject' or 'ban'
              wx.showModal({
                title: '温馨提示',
                content: '此操作需要您的授权',
                success: function(res){
                  if(res.confirm){
                    wx.openSetting({
                      withSubscriptions: true,
                      success: function(res){
                        if(res.subscriptionsSetting.mainSwitch && res.subscriptionsSetting.itemSettings[tmplId] == 'accept'){
                          this.updateNotify(true)
                        }else{}
                      }
                    })
                  }else{
                    this.setData({
                      notify: false
                    })
                  }
                }
              })
          }
        }.bind(this),
        fail(res) {
          console.log(res)
          resolve({
            needNotify: false
          })
        }
      })
    } else {
      this.updateNotify(false)
    }
  },

  updateNotify(value) {
    db.collection('ty_user_channel').doc(this.data.userChannel._id).update({
      data: {
        notify: value
      }
    }).then(res => {
      this.setData({
        'userChannel.notify': value
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})