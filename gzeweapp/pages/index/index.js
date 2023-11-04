import { lineList } from '../../api/line';
import { retry } from '../../api/request';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    footerContent: 'Copyright © 2022-2023 xd-fjx@qq.com All Rights Reserved.',
    list: [],
    showReport: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  async init() {
    retry(lineList, 5)
      .then((data) => {
        console.log(data);
        this.setData({
          list: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  },
  handleClick(e) {
    const { lineId } = e.currentTarget.dataset;
    console.info('lineId', lineId);
    wx.navigateTo({
      url: `/pages/line/index?lineId=${lineId}`,
    });
  },
});
