import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index';
import { lineData } from '../../api/line';
// const plugin = requirePlugin("wxacommentplugin");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailVisible: false,
    lineId: 0,
    lineGroups: [],
    currentData: {},
    currentArrow: {},
    currentStation: {},
    timeList: [],
    scrollTop: 0,
    sideBarIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const lineId = options.lineId
    console.debug('lineId', lineId)
    this.setData({
      lineId,
    }, () => { 
      this.init()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  init () {
    // plugin.openComment({
    //   success: (res)=>{
    //     console.log('plugin.openComment success', res)
    //   },
    //   fail: (res) =>{
    //     console.log('plugin.openComment fail', res)
    //   }
    // })

    const { lineId} = this.data
    lineData(lineId)
      .then(res => { 
        console.log(res)
        if (res.code != 0) {
          return
        }
        if (!res.data || res.data.length === 0) {
          return
        }
        wx.setNavigationBarTitle({
          title: `${res.data[0].lineName}快车`
        })
        const lineGroups = res.data
        const currentData = lineGroups[0]
        this.setData({
          lineGroups,
        }, () => { 
          this.setCurrentData(currentData)
        })  
      }).catch(e => { 
        console.log('lineData error', e);
        wx.showToast({ title: '系统异常', icon: 'error' });
      })
  },
  setCurrentData (currentData, index) {
    const idx = index || 0
    const currentArrow = currentData.arrows[idx]
    const currentStation = currentArrow.lineStations[0]
    const timeList = currentStation.timeList
    this.setData({
      currentData,
      currentArrow,
      currentStation,
      timeList
    })  
  },
  onTabsChange(e) {
    const index = e.detail.value
    const currentData = this.data.lineGroups[index]
    console.log(`onTabsChange`, index, currentData);
    this.setCurrentData(currentData)
    this.setData({ sideBarIndex: 0, scrollTop: 0 });
  },
  onSideBarChange (e) {
    console.log('onSideBarChange', e)
    const { value } = e.detail;
    const { currentArrow } = this.data
    const currentStation = currentArrow.lineStations[value]
    console.log('currentStation', currentStation)
    const timeList = currentStation.timeList
    console.log('timeList', timeList)
    this.setData({
      currentStation,
      timeList
    })
    this.setData({ sideBarIndex: value, scrollTop: 0 });
  },
  handleSwap () {
    const { currentData } = this.data
    const items = []
    currentData.arrows.forEach(item => {
      items.push({
        label:item.lineNameArrow
      })
    });
    ActionSheet.show({
      theme: ActionSheetTheme.List,
      selector: '#t-action-sheet',
      context: this,
      description: '切换方向',
      items,
    });
  },
  handleSelected (e) {
    const { index } = e.detail
    const { currentData} = this.data
    this.setCurrentData(currentData, index)
    this.setData({ sideBarIndex: 0, scrollTop: 0 });
  }

})