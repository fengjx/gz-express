import { getCloudConfig, getEnv } from '../config/index';

/**
 * 调用云托管服务
 *
 * @param {*} request
 * @param {*} service
 * @returns
 */
export function cloudCall(request) {
  const config = getCloudConfig();
  const data = Object.assign(
    {
      config: {
        env: config.env,
      },
      header: {
        'X-WX-SERVICE': config.service,
      },
    },
    request,
  );
  return new Promise((resolve, reject) => {
    wx.showLoading();
    wx.cloud
      .callContainer(data)
      .then((res) => {
        if (res.statusCode === 403) {
          // 403
          wx.navigateTo({
            url: '/pages/forbidden/index',
          });
        }
        resolve(res.data);
      })
      .catch((err) => {
        console.log('cloud call error', err);
        reject(err);
      }).finally(() => {
        wx.hideLoading();
      });
  });
}

/**
 * 上传文件
 *
 * @param {*} cloudPath
 * @param {*} filePath
 * @returns
 */
export function cloudUpload(cloudPath, filePath) {
  const config = getCloudConfig();
  return wx.cloud.uploadFile({
    // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
    cloudPath: `${getEnv()}/${cloudPath}`,
    // 微信本地文件，通过选择图片，聊天文件等接口获取
    filePath: filePath,
    config: {
      env: config.env,
    },
  });
}

export function cloudBuffer(request, service) {
  const config = getCloudConfig();
  const data = Object.assign(
    {
      config: {
        env: config.env,
      },
      header: {
        'X-WX-SERVICE': service || config.service,
      },
      responseType: 'arraybuffer',
      dataType: 'arraybuffer',
    },
    request,
  );
  return new Promise((resolve, reject) => {
    wx.cloud
      .callContainer(data)
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((err) => {
        console.log('cloud cloudRequest error', err);
        reject(err);
      });
  });
}

/**
 * 获取文件临时链接
 *
 * @param {*} fileList
 * @returns
 */
export function getTempFileURL(fileList) {
  return wx.cloud.getTempFileURL({
    fileList,
  });
}

export function request ({url, data, method, header}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: method || 'GET',
      header,
      success: (res) => {
        console.debug('resp', res)
        resolve(res)
      },
      fail: (err) => { 
        reject(err)
      }
    })
  })
}

export async function retry (fetchFun, retry = 10) {
  let data = null;
  for (let i = 0; i <= retry; i++) {
    try {
      const res = await fetchFun();
      if (res.code == 0) {
        data = res.data;
      }
    } catch (e) {
      console.log('retry error', e);
    }
    if (data !== null) {
      return data;
    }
    await delay(1000);
  }
  return data;
}

export function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}