import Axios from './core/axios'
import { AxiosInstance, AxiosRequestConfig } from './types/index'
import { extend } from './helpers/util'
import defaultsConfig from './core/defaults'

function createAxiosInstance(defaultsConfig: AxiosRequestConfig): AxiosInstance {
  // 创建一个实例，这个实例就已经拥有了axios所需要的所有扩展方法
  let context = new Axios(defaultsConfig)

  // 直接取context里面的request方法作为axios的初始方法
  let instance = Axios.prototype.request.bind(context)
  // 通过extend方法将context与instance进行组合
  extend(instance, context)
  return instance as AxiosInstance
}

let axios = createAxiosInstance(defaultsConfig)
export default axios
