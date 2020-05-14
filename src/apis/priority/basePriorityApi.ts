import axios from "axios";
import getSettings from "../../config/getSettings";

let baseApi;
function getBaseApi() {
  if (!baseApi) {
    const {
      priority: { priorityApiBase, Authorization },
    } = getSettings();

    console.log('*** priorityApiBase', priorityApiBase);
    console.log('*** Authorization', Authorization);
    const instance = axios.create({
      baseURL: priorityApiBase,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
    });

    baseApi = instance;
  }
  return baseApi;
}

export default getBaseApi;
