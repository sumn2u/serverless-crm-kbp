// const ENV = require("./env") ? require("./env").default : {};
import {mapKeys, set} from "lodash";

import SettingsByEnv from "./configByEnv";
import { getSecrets } from "./awsSecrets";

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
  };
  auth0: {
    domain: string;
    clientId: string;
    clientSecret: string;
    scope: string;
  };
}

let configInitialized = false;
let settings = {};

export async function initSettings(env = "dev") {
  const secrets: object = await getSecrets();
  const config: iSettings = { ...SettingsByEnv.dev };
  mapKeys(secrets, (value, key) => {
    set(config, key, value);
  });

  console.log('*** config', config);
  console.log('*** secrets', secrets);
  settings = config;
  configInitialized = true;
}

const getSettings = (env = "dev"): iSettings => {
  if (!settings) throw Error('wait for initSettings');

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
