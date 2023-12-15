import type { globalConfig } from './type'
import { encrypt, decrypt } from './encry';

const config: globalConfig = {
  type: 'sessionStorage', // 存储类型，localStorage | sessionStorage
  prefix: 'h5-activity', // 推荐项目名+版本号
  expires: 24 * 60, // 过期时间，默认为一天，单位为分钟
  isEncrypt: false // 支持加密、解密数据处理
}

//添加前缀，保持唯一性
const autoAddPreFix = (key: string) => {
  const prefix = config.prefix || '';
  return `${prefix}_${key}`;
};
const autoRemovePreFix = (key: string) => {
  //删除前缀，进行增删改查
  const lineIndex = config.prefix.length + 1;
  return key.substr(lineIndex);
};

const setStorage = (key: string, value: any, expires: number = config.expires) => {
  if (value === undefined || value === null) {
    return;
  }
  // 过期时间值合理性判断
  if (isNaN(expires) || expires < 0) {
    throw new Error('Expires must be number');
  }
  const data = {
    value,
    time: Date.now(),
    expires: Date.now() + expires * 60 * 1000
  }

  window?.[config.type]?.setItem(autoAddPreFix(key), config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data));

  return true;
}

const getStorage = (key: string) => {
  if (config.prefix) {
    key = autoAddPreFix(key);
  }
  // 加密后的数据
  const data = window?.[config.type]?.getItem(key);
  if (!data) {
    return null;
  }

  // 解密
  let storageVal;
  try {
    storageVal = config.isEncrypt
      ? JSON.parse(decrypt(data))
      : JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse storage data:', error);
    return null;
  }

  const now = Date.now();
  if (now >= storageVal.expires) {
    //过期销毁
    removeStorage(key);
    return null;
  } else {
    return storageVal.value;
  }
};

const removeStorage = (key: string) => {
  if (!window || !window[config.type]) {
    console.error('Storage is not available');
    return false;
  }
  window[config.type].removeItem(autoAddPreFix(key));
  return true;
}

const clearStorage = () => {
  if (!window || !window[config.type]) {
    console.error('Storage is not available');
    return false;
  }
  window[config.type].clear();
  return true;
};

const getStorageLength = () => {
  return window?.[config.type]?.length;
}

const getAllStorage = () => {
  //获取所有值
  const storageList: any = {};
  const keys = Object.keys(window[config.type]);
  keys.forEach((key) => {
    const value = getStorage(autoRemovePreFix(key));
    if (value !== null) {
      //如果值没有过期，加入到列表中
      storageList[autoRemovePreFix(key)] = value;
    }
  });
  return storageList;
};

export {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getAllStorage,
  getStorageLength,
};
