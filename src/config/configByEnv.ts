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
  botsify: {
    sendMessageUrl: 'https://botsify.com/api/v1/send-message-to-user/json',
    apiKey: "SECRET",
    guideHelperFBID: "SECRET"
  }
};

const configByEnv: { dev: any; qa: any; prod: any } = {
  dev: {
    ...shared,
    priority: {
      ...shared.priority,
      priorityApiBase: "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    },
    wooCommerce: {
      ...shared.wooCommerce,
      url: 'https://kb-pure.eagleray.co/',
      orderIdForTest: 662,
    }
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
    wooCommerce: {
      ...shared.wooCommerce,
      url: 'https://secure.kb-pure.co.il/',
      orderIdForTest: "dont run tests on production",
    }
  },
};

export default configByEnv;
