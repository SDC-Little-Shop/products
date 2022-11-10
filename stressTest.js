import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    {duration: '1m', target: 500}
    // {duration: '1m', target: 10000},
    // {duration: '1m', target: 10000}
    // {duration: '1m', target: 50},
    // {duration: '1m', target: 100},
    // {duration: '1m', target: 500}
    // {duration: '1m', target: 500},
    // {duration: '1m', target: 1000},
    // {duration: '1m', target: 1000}
    // {duration: '1m', target: 25},
    // {duration: '1m', target: 100},
    // {duration: '1m', target: 100},
  ]
};

export default function () {
  const BASE_URL = 'http://localhost:3001/products'

  const responses = http.batch([
    // ['GET', `${BASE_URL}/${Math.floor(Math.random() * 1000011)}/related`]
    // ['GET', `${BASE_URL}/${Math.floor(Math.random() * 1000011)}`]
    // ['GET', `${BASE_URL}`]
    ['GET', `${BASE_URL}/${Math.floor(Math.random() * 1000011)}/styles`]
  ])

  sleep(1);
}