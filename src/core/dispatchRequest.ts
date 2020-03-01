import { AxiosRequestConfig, AxiosPromise } from '../types/index'
import xhr from './xhr'
import { bulidURL } from '../helpers/url'
import { buildBody } from '../helpers/body'
import { buildHeader } from '../helpers/header'
import { deepMerge, isPlainObject } from '../helpers/util'
import { transform } from './transform'
import defaults from './defaults'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  checkIfCancel(config)
  // 在进行请求前先处理config
  processConfig(config)
  return xhr(config)
}

// 处理请求的参数
function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  // 在这儿将合并后headers进行打平
  config.headers = platHeaders(config.method!, config.headers)
  // 设置Content-type
  config.headers = transformHeaders(config)
  // 设置请求的data
  config.data = transform(config.data, config.headers, config && config.transformRequest)
}

// 转换url（只处理get请求）
function transformUrl(config: AxiosRequestConfig): string {
  if (config.method && config.method.toLowerCase() !== 'get') {
    return config.url! // 使用null的类型保护，表示当前值不为null
  }
  let { url, params, paramsSerializer } = config
  return bulidURL(url!, params, paramsSerializer)
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

// 铺平headers
function platHeaders(method: string, headers: any): any {
  let result = { ...headers }
  let temp = deepMerge(headers.common, headers[method])
  result = {
    ...temp,
    ...result
  }
  // 将post、get、put对应的对象给删除掉
  for (let key in result) {
    if (isPlainObject(result[key])) {
      delete result[key]
    }
  }
  return result
}

// 检测是否已经取消CancelToken，抛出异常
function checkIfCancel(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}
export default dispatchRequest
