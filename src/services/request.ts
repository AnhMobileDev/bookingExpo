import axios from 'axios';

export const request = axios.create({
  timeout: 60000, //60s
});
