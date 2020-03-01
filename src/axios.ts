import Axios from './core/axios'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types/index'
import { extend } from './helpers/util'
import defaultsConfig from './core/defaults'
import { mergeConfig } from './core/mergeConfig'
import CancelToken from './cancel/cancelToken'
import { isCancel } from './cancel/cancel'

function createAxiosInstance(defaultsConfig: AxiosRequestConfig): AxiosStatic {
  // 创建一个实例，这个实例就已经拥有了axios所需要的所有扩展方法
  let context = new Axios(defaultsConfig)

  // 直接取context里面的request方法作为axios的初始方法
  let instance = Axios.prototype.request.bind(context)
  // 通过extend方法将context与instance进行组合
  extend(instance, context)
  return instance as AxiosStatic
}

let axios = createAxiosInstance(defaultsConfig)
axios.create = function create(config) {
  let merge = mergeConfig(defaultsConfig, config)
  // 必须将配置进行合并，从而形成新的默认配置
  return createAxiosInstance(merge)
}
axios.CancelToken = CancelToken
axios.isCancel = isCancel
export default axios
