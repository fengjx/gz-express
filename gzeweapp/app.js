import updateManager from './common/updateManager';
import { isDev, setEnv } from './config/index';

// app.js
App({
  globalData: (wx.globalData = {}),
  onLaunch() {
    console.debug('app onLaunch');
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    setEnv(envVersion);
    this.globalData.envVersion = envVersion;
    this.globalData.version = !isDev() ? version : envVersion;
    // 使用 callContainer 前一定要 init 一下，全局执行一次即可
    wx.cloud.init();
    console.debug('app onLaunch version: ', this.globalData.version);

    updateManager();
  },
});
