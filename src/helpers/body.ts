import { isPlainObject } from './util'

// 处理post、put请求的body
export function buildBody(data: any): any {
  if (!data) {
    return
  }
  // 当传入的data是plaintObj的时候，将其转换为JSON字符串
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
