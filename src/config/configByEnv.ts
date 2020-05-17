const shared = {
  priority: {
    Authorization: "SECRET",
  },
  wooCommerce: {
    url: "SECRET",
    consumerKey: "SECRET",
    consumerSecret: "SECRET",
    version: "wc/v3",
    queryStringAuth: true, // Force Basic Authentication as query string true and using under HTTPS
  },
  auth0: {
    // management app keys
    domain: "SECRET",
    clientId: "SECRET",
    clientSecret: "SECRET",
    scope: "read:users update:users",
  },
};

const configByEnv: { dev: any; qa: any; prod: any } = {
  dev: {
    ...shared,
    priority: {
      ...shared.priority,
      priorityApiBase: "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    },
  },
  qa: {
    ...shared,
    priority: {
      ...shared.priority,
      priorityApiBase: "https://kbpure.macomp.co.il/odata/priority/tabula.ini/kbpure",
    },
  },
  prod: {
    ...shared,
    priority: {
      ...shared.priority,
      priorityApiBase: "https://kbpure.macomp.co.il/odata/priority/tabula.ini/kbpure",
    },
  },
};

export default configByEnv;
