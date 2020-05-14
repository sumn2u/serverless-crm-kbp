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
let settings: iSettings;

function getByStage() {
  const stage = process.env.STAGE || 'dev';
  console.log('*** stage', stage);

  if (stage === "dev") {
    return SettingsByEnv.dev;
  } else if (stage === "staging") {
    return SettingsByEnv.staging;
  } else if (stage === "prod") {
    return SettingsByEnv.prod;
  }

  return SettingsByEnv.dev;
}

export async function initSettings(env = "dev") {
  const secrets: object = await getSecrets();
  const config: iSettings = { ...getByStage() };
  mapKeys(secrets, (value, key) => {
    set(config, key, value);
  });

  // console.log('*** config', config);
  // console.log('*** secrets', secrets);
  settings = config;
  configInitialized = true;
}

const getSettings = (): iSettings => {
  if (!settings) throw Error('wait for initSettings');
  return settings;
};

export default getSettings;
