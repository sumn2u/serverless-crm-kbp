// const ENV = require("./env") ? require("./env").default : {};
import SettingsByEnv from './env'

console.log('*** ENV', SettingsByEnv);

export interface iSettings {
  priority: {
    priorityApiBase: string;
    Authorization: string;
  };
  wooCommerce: {
    url: string;
    consumerKey: string;
    consumerSecret: string;
    version: string;
    queryStringAuth: boolean;
  },
  auth0: {
    domain: string;
    clientId: string;
    clientSecret: string;
    scope: string;
  },
}

const getSettings = (env = "dev"): iSettings => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (env === "dev") {
    return SettingsByEnv.dev;
  } else if (env === "staging") {
    return SettingsByEnv.staging;
  } else if (env === "prod") {
    return SettingsByEnv.prod;
  }
  return SettingsByEnv.dev;
};

export default getSettings;
