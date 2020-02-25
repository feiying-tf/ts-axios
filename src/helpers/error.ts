import { AxiosRequestConfig, AxiosErr, AxiosRes } from '../types/index'

// 通过一个类，创建Axios产生的错误类型
class AxiosErrClass extends Error {
  response?: AxiosRes
  request?: any
  config: AxiosRequestConfig
  code?: string | null
  isAxiosError: boolean
  constructor(prop: AxiosErr) {
    let { code, response, request, config, message } = prop
    super(message)
    this.code = code
    this.isAxiosError = true
    this.config = config
    this.request = request
    this.response = response
    // 处理 typescript 继承内置对象的坑
    Object.setPrototypeOf(this, AxiosErrClass.prototype)
  }
}

// 通过一个工程函数创建Axios的Error
export function createAxiosError(prop: AxiosErr) {
  return new AxiosErrClass(prop)
}
