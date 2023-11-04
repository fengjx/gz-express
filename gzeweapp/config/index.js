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
    env: '',
    service: 'gzesvr-test',
  },
  trial: {
    env: '',
    service: 'gzesvr-test',
  },
  prod: {
    env: '',
    service: 'gzesvr-prod',
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
