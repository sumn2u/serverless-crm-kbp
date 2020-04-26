import axios from 'axios';
import getSettings from "../../config/get-settings";

const {priorityApiBase, Authorization} = getSettings("dev");

const instance = axios.create({
  baseURL: priorityApiBase,
  headers: {
    Authorization,
    'Content-Type': 'application/json'
  }
});

export default instance;