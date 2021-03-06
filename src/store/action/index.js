import axios from "axios";

export * from './user.action';
export * from './item.action';
export * from './report.action.js';
export * from './page.action.js';
export * from './common.action.js';
export * from './message.action.js';

export const ROOT_URL = 'http://localhost:8080';

export const client = axios.create({
    baseURL: ROOT_URL,
    headers: {
      "Content-Type": "application/json"
    }
  })
