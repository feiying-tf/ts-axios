import { AxiosRequestConfig, AxiosPromise } from '../types/index'
import xhr from './xhr'
import { bulidURL } from '../helpers/url'
import { buildBody } from '../helpers/body'
import { buildHeader } from '../helpers/header'
import { isObject } from '../helpers/util'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 在进行请求前先处理config
  processConfig(config)
  return xhr(config)
}

// 处理请求的参数
function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config) // 必须放到transformData的前面，因为transformData会对data进行转换
  config.data = transformRequestData(config)
}

// 转换url（只处理get请求）
function transformUrl(config: AxiosRequestConfig): string {
  if (config.method && config.method.toLowerCase() !== 'get') {
    return config.url! // 使用null的类型保护，表示当前值不为null
  }
  let { url, params } = config
  return bulidURL(url!, params)
}

// 转换data
function transformRequestData(config: AxiosRequestConfig): string {
  let { data } = config
  return buildBody(data)
}

// 转换headers
function transformHeaders(config: AxiosRequestConfig): any {
  let { data, headers = {} } = config
  return buildHeader(data, headers)
}

export default dispatchRequest
