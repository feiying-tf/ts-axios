export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  method?: Method
  url?: string // 由于url可以作为第一个参数传入，所以url设置为可选参数
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [prop: string]: any
}

// 请求数据的返回结果类型
export interface AxiosRes<T = any> {
  data: T
  status: any
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosRes<T>> {}

// axios response的接口，用于外部ts调用
export interface AxiosErr {
  response?: AxiosRes
  request?: any
  config: AxiosRequestConfig
  code?: string | null
  isAxiosError?: boolean
  message: string
}

// 定义axios扩赞具有的方法
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 这儿通过混合类型的方式创建一个axios实例的接口
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> // 这儿是重载函数的定义
}

// 这儿是拦截器接口（request、response共用），这个只是为了供外部调用
export interface InterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectFn): number
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (arg: T): T | Promise<T>
}

export interface RejectFn {
  (arg: any): any
}
