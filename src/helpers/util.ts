let toString = Object.prototype.toString
export function isDate(date: any): date is Date {
  return toString.call(date) === '[object Date]'
}

export function isObject(obj: any) {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: any) {
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
export function extend<T, U>(first: T, second: U): T & U {
  for (let key in second) {
    ;(first as T & U)[key] = second[key] as any
  }
  return first as T & U
}

// 深度遍历的方式
export function deepMerge(obj1: any, obj2: any) {
  let result = Object.create(null)
  if (obj2) {
    for (let key in obj2) {
      if (isPlainObject(obj2[key])) {
        result[key] = deepMerge(obj1 && obj1[key], obj2[key])
      } else {
        result[key] = obj2[key]
      }
    }
  }
  if (obj1) {
    for (let key in obj1) {
      if (result[key] === undefined) {
        if (isPlainObject(obj1[key])) {
          result[key] = deepMerge(obj1[key], undefined)
        } else {
          result[key] = obj1[key]
        }
      }
    }
  }
  return result
}

// 判断是否同源
export function isOrigin(url: string) {
  let obj = getMsgOfUrl(url)
  let currentObj = getMsgOfUrl(location.href)
  return (
    obj.host === currentObj.host &&
    obj.port === currentObj.port &&
    obj.protocol === currentObj.protocol
  )
}

// 获取一个url的信息
export function getMsgOfUrl(url: string) {
  let a = document.createElement('a')
  a.setAttribute('href', url)
  const { host, port, protocol } = a
  return {
    host,
    port,
    protocol
  }
}

// 获取cookie中的name值
export function getCookieValue(name: string) {
  // 将cookie转为paramsString的格式
  let cookieToParams = document.cookie.replace(/; /g, '&')
  let cookieParams = new URLSearchParams(cookieToParams)
  return cookieParams.get(name)
}

// 判断是否是formdata类型
export function isFormData(data?: any): data is FormData {
  return data instanceof FormData
}

// 判断是否是 URLSearchParams 类型
export function isURLSearchParams(params: any): params is URLSearchParams {
  return params instanceof URLSearchParams
}

// 判断是否是绝对路径
export function isAbsoluteURL(url: string) {
  return /(^[a-z][a-z\d+\-\.]*:)?\/\//i.test(url)
}

// 连接url
export function combineURL(baseURL: string, relativeURL?: string) {
  if (baseURL) {
    return baseURL.replace(/\/*$/g, '') + '/' + relativeURL!.replace(/^\/*/g, '')
  }
}
