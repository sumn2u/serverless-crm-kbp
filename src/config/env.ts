export interface iSettings {
  priorityApiBase: String;
  Authorization: String;
}

const ENV: { dev: iSettings; staging: iSettings; prod: iSettings } = {
  dev: {
    priorityApiBase:
      "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    Authorization: "Basic Z3V5YToyMDEzMDYwMTY="
  },
  staging: {
    priorityApiBase:
      "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    Authorization: "Basic Z3V5YToyMDEzMDYwMTY="
  },
  prod: {
    priorityApiBase:
      "https://kbpure.macomp.co.il/odata/priority/tabula.ini/demo",
    Authorization: "Basic Z3V5YToyMDEzMDYwMTY="
  }
};

export default ENV;
