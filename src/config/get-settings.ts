const ENV = require("./env") ? require("./env").default : {};

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
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getSettings;
