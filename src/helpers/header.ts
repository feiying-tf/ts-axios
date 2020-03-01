import { normalizeKey, isPlainObject } from './util'

// 生成header
export function buildHeader(data: any, header: any): any {
  buildContentType(data, header)
  return header
}

// 处理contentType
function buildContentType(data: any, header: any) {
  // 如果data为null，或者请求的data不是普通对象，那么就不需要设置了
  if (!data || !isPlainObject(data)) {
    return
  }
  // 对header的 Content-type 进行大小写兼容
  normalizeKey(header, 'Content-type')

  // 设置header的默认值
  if (header && !header['Content-type']) {
    header['Content-type'] = 'application/json; charset=UTF-8'
  }
}
