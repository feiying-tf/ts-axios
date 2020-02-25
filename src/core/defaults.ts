import { AxiosRequestConfig } from '../types/index'
// 定义一个默认值
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

let withoutDataMethods = ['get', 'delete', 'head', 'options']
let withDataMethods = ['post', 'put', 'patch']

withoutDataMethods.forEach(key => {
  defaults.headers[key] = {}
})
withDataMethods.forEach(key => {
  defaults.headers[key] = {
    ['Content-Type']: 'application/x-www-form-urlencoded'
  }
})

export default defaults
