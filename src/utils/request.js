import fetch from 'dva/fetch';
import { API } from './config'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  return fetch(API+url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function get(url,options){
  let query = '';
  for (let i in options) {
      query += `${i}=${options[i]}&`;
  }
  return request(`${url}?${query.slice(0, -1)}`)
} 

export function post(url,options){
  let query = '';
  for (let i in options) {
      query += `${i}=${options[i]}&`;
  }
  return request(url,{
    method: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: query.slice(0, -1)
  })
} 