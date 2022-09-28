import axios from 'axios';

const DEFAULT_AXIOS_TIMEOUT_MILLISECONDS = 3 * 1000;

const BASE_URL = 'http://localhost:4000';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {},
  withCredentials: true,
  timeout: DEFAULT_AXIOS_TIMEOUT_MILLISECONDS,
});
