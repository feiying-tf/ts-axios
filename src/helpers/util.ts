let toString = Object.prototype.toString
export function isDate(date: any): date is Date {
  return toString.call(date) === '[object Date]'
}

export function isObject(obj: any) {
  return obj !== null && typeof obj === 'object'
}

export function isPlaintObject(obj: any) {
  return toString.call(obj) === '[object Object]'
}

// 对obj的参数进行替换处理
export function normalizeKey(obj: any, name: string) {
  Object.keys(obj).forEach(key => {
    if (key !== name && key.toLowerCase() === name.toLowerCase()) {
      obj[name] = obj[key]
      delete obj[key]
    }
  })
}

// 处理返回的data，如果返回的是字符串类型，就尝试将其转换为对象类型
export function parseResData(data: any): any {
  // 类型保护
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  }
  return data
}

// 处理返回的headers，由于默认返回的是一个字符串，需要转换成一个对象
export function parseHeaders(headers: string): any {
  let arr: string[] = headers.split('\n')
  let headersObj = Object.create(null)
  arr.forEach(item => {
    // 当item的内容为空的时候，结束本次循环
    if (!item || !item.trim()) {
      return
    }
    let index = item.indexOf(':')
    let key = item.slice(0, index)
    let value = item.slice(index + 1)
    headersObj[key] = value.trim()
  })
  return headersObj
}

// 采用交叉类型的方式，将两个
1
export function extend<T, U>(first: T, second: U): T & U {
  for (let key in second) {
    ;(first as T & U)[key] = second[key] as any
  }
  return first as T & U
}
