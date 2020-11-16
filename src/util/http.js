import Vue from 'vue';
// import axios from "axios";

/**
 * 封装 get()
 * @param url
 * @param data
 * @returns {Promise}
 */
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    this.axios.get(url, {
    // axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    this.axios.post(url, data)
    // axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

// export { get, post };
Vue.prototype.$post = post
Vue.prototype.$get = get