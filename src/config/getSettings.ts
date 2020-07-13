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
    orderIdForTest: string;
  };
  auth0: {
    domain: string;
    clientId: string;
    clientSecret: string;
    scope: string;
  };
  botsify: {
    sendMessageUrl: string;
    apiKey: string;
    guideHelperFBID: string;
  };
}

let configInitialized = false;
let settings: iSettings;

function getByStage() {
  const stage = process.env.STAGE || 'dev';
  console.log('*** stage', stage);
  return SettingsByEnv[stage] || SettingsByEnv.dev;
}

export async function initSettings(env = "dev") {
  const secrets: object = await getSecrets();
  const config: iSettings = { ...getByStage() };
  mapKeys(secrets, (value, key) => {
    set(config, key, value);
  });

  console.log('*** config', config);
  // console.log('*** process.env.ENV_VARIABLE', process.env);
  // console.log('*** secrets', secrets);
  settings = config;
  configInitialized = true;
}

const getSettings = (): iSettings => {
  if (!settings) throw Error('wait for initSettings');
  return settings;
};

export default getSettings;
