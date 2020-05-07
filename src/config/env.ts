export interface iSettings {
  priorityApiBase: string;
  Authorization: string;
  wooCommerce: object;
}

const shared = {
  wooCommerce: {
    url: "https://example.com",
    consumerKey: "consumer_key",
    consumerSecret: "consumer_secret",
    version: "wc/v3",
    queryStringAuth: true, // Force Basic Authentication as query string true and using under HTTPS
  },
};

const ENV: { dev: iSettings; staging: iSettings; prod: iSettings } = {
  dev: {
    priorityApiBase:
      "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    Authorization: "Basic Z3V5YToyMDEzMDYwMTY=",
    ...shared
  },
  staging: {
    priorityApiBase:
      "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    Authorization: "Basic Z3V5YToyMDEzMDYwMTY=",
    ...shared
  },
  prod: {
    priorityApiBase:
      "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    Authorization: "Basic Z3V5YToyMDEzMDYwMTY=",
    ...shared
  },
};

export default ENV;
