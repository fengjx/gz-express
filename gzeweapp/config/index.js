let appEnv = '';
export function isProd() {
  return appEnv === 'release';
}

export function isTrial() {
  return appEnv === 'trial';
}

export function isDev() {
  return appEnv === 'develop';
}

// todo
export const cloudConfig = {
  test: {
    env: 'demo-6ghsdp0t093b8856',
    service: 'gzesvr',
  },
  trial: {
    env: 'demo-6ghsdp0t093b8856',
    service: 'gzesvr',
  },
  prod: {
    env: 'demo-6ghsdp0t093b8856',
    service: 'gzesvr',
  },
};

export function getCloudConfig() {
  if (isProd()) {
    return cloudConfig.prod;
  }
  if (isTrial()) {
    return cloudConfig.trial;
  }
  return cloudConfig.test;
}

export function setEnv(env) {
  console.log('set env', env);
  appEnv = env;
}

export function getEnv() {
  return appEnv;
}
