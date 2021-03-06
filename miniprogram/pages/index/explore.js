const db = wx.cloud.database()
const tyUtils = require('./../../utils/tyUtils.js')

// miniprogram/pages/index/explore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    templates: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    tyUtils.getMyTemplates().then(templates=>{
      this.setData({
        templates
      })
    })
  },

  openChannelTemplate(event){
    const itemIndex = +event.currentTarget.dataset.itemIndex
    const template = this.data.templates[itemIndex]

    // 缓存
    getApp().globalData.activeTemplate = template

    wx.navigateTo({
      url: '/pages/channel/template?templateId=' + template._id,
    })
  },

  openSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  openTemplates(){
    wx.navigateTo({
      url: '/pages/channel/templates',
    })
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
    return {
      title: '追你所爱',
      path: '/pages/index/index?fromUser=' + getApp().globalData.userOpenid,
      imageUrl: '/image/wx-share.png'
    }
  }
})