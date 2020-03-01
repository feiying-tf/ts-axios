import { AxiosRequestConfig } from '../types/index'
import { buildBody } from '../helpers/body'
import { parseResData } from '../helpers/util'

// 定义一个默认值
const defaults: AxiosRequestConfig = {
  transformRequest: [
    function(data: any, headers?: any) {
      return buildBody(data)
    }
  ],
  transformResponse: [
    function(data: any, headers?: any) {
      return parseResData(data)
    }
  ],
  method: 'get',
  timeout: 0,
  withCredentials: false,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
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
