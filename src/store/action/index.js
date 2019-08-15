import axios from "axios";

export * from './user.action';
export * from './item.action';
export * from './leads.action';
export * from './report.action.js';

export const ROOT_URL = 'http://localhost:8080';

export const client = axios.create({
    baseURL: ROOT_URL,
    headers: {
      "Content-Type": "application/json"
    }
  })
