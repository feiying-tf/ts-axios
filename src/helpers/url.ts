import { isDate, isPlaintObject } from './util'

// 对请求参数进行编码，并且处理特殊字符

// %40 => @
//    %3A => :
//    %24 => \$
//    %2C => ,
//    %20 => +
//    %5B => [
//    %5D => ]
function encode(val: any): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 处理url
export function bulidURL(url: string, params: any = {}): string {
  // 通过一个数组储存所有的键值对
  let queue: string[] = []
  let keys = Object.keys(params)
  keys.forEach(key => {
    let val = params[key]
    // undefiend、null
    if (val === undefined || val === null) {
      return
    }

    // 如果值是数组的时候，需要遍历每个值，所以就把值统一处理成数组的形式
    let valArr = []

    // arr
    if (Array.isArray(val)) {
      key = key + '[]'
      valArr = val
    } else {
      valArr = [val]
    }
    valArr.forEach(item => {
      // date
      if (isDate(item)) {
        item = item.toISOString()
      }
      // object 通过JSON.stringify()进行处理
      if (isPlaintObject(item)) {
        item = JSON.stringify(item)
      }
      queue.push(`${key} = ${encode(item)}`)
    })
  })
  // 丢弃url中的hash值
  let index = url.indexOf('#')
  if (index > -1) {
    url = url.slice(0, index)
  }

  // 如果url后面已经有了参数，那么就通过&拼接url参数,否则就通过?进行拼接
  return url.indexOf('?') > -1 ? url + '&' + queue.join('&') : url + '?' + queue.join('&')
}
