import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosRes,
  ResolvedFn,
  RejectFn
} from '../types/index'
import dispatchAxios from './dispatchRequest'
import { InterceptorManager } from './interceptorManager'
import { mergeConfig } from './mergeConfig'
const withoutDataMethods = ['get', 'delete', 'head', 'options']
const withDataMethods = ['post', 'put', 'patch']

// 定义request里面要用到的拦截器接口
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise) // 这儿主要是为了兼容dispatchAxios请求
  rejected?: RejectFn
}

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosRes>
}
// 创建一个axios类
export default class Axios {
  // 定义interceptors属性
  interceptors: Interceptors
  defaults: AxiosRequestConfig
  constructor(defaultsConfig: AxiosRequestConfig) {
    // 初始化默认值
    this.defaults = defaultsConfig
    // 初始化 interceptors
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosRes>()
    }
  }
  request(url: any, config?: AxiosRequestConfig): AxiosPromise {
    if (typeof url === 'string') {
      config = Object.assign(config || {}, {
        url
      })
    } else {
      config = url
    }
    // 在拦截器之前实行合并策略
    config = mergeConfig(this.defaults, config)
    // 这儿放any的原因是泛型可能是AxiosRequestConfig、AxiosRes
    let chain: PromiseChain<any>[] = [
      {
        resolved: dispatchAxios,
        rejected: undefined
      }
    ]

    // 将请求拦截器和接收拦截器依次加入到chain里面，请求拦截器，先请求的后执行；接收拦截器，先请求的先执行
    this.interceptors.request.forEach(function(interceptor) {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(function(interceptor) {
      chain.push(interceptor)
    })
    // 实现链式调用
    let promise = Promise.resolve(config)
    while (chain.length) {
      let { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved as any, rejected)
    }
    // return dispatchAxios(config!)
    return promise as AxiosPromise
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'GET', config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'delete', config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'head', config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'options', config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'options', config, data)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'put', config, data)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'patch', config, data)
  }

  // 处理没有data的情况
  _requestWithoutData(
    url: string,
    method: Method,
    config: AxiosRequestConfig | undefined
  ): AxiosPromise {
    config = Object.assign(config || {}, {
      url,
      method
    })
    return this.request(config)
  }

  // 处理有data的情况
  _requestWithData(
    url: string,
    method: Method,
    config: AxiosRequestConfig | undefined,
    data?: any
  ): AxiosPromise {
    config = Object.assign(config || {}, {
      url,
      method,
      data
    })
    return this.request(config)
  }
}
