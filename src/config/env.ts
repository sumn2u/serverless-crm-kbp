export interface iSettings {
  priorityApiBase: string;
  Authorization: string;
  wooCommerce: object;
}

const shared = {
  wooCommerce: {
    url: "https://kb-pure.eagleray.co/",
    consumerKey: "ck_ef61c88123f81771fa1b5c775751112c7d59fb21",
    consumerSecret: "cs_5d02334ca3ecd1d8bd2fce21b201f78ba614c697",
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
