import { AxiosRequestConfig, AxiosPromise, AxiosRes, AxiosErr } from '../types/index'
import { parseResData, parseHeaders } from '../helpers/util'
import { createAxiosError } from '../helpers/error'
import { resolve } from 'dns'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    let { method = 'get', url, data = null, params, headers, responseType, timeout } = config
    const xhr = new XMLHttpRequest()
    // 设置responseType
    if (responseType) {
      xhr.responseType = responseType
    }
    // 设置timeout
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.open(method, url!, true)
    // 设置请求的参数
    Object.keys(headers).forEach((key: string) => {
      xhr.setRequestHeader(key, headers[key])
    })

    // 当网络不通的时候，会触发下面的错误
    xhr.onerror = function() {
      let error: AxiosErr = {
        request: xhr,
        config: config,
        message: 'Network Error'
      }
      reject(createAxiosError(error))
    }
    xhr.ontimeout = function() {
      let error: AxiosErr = {
        request: xhr,
        config: config,
        message: `Timeout of ${timeout} ms exceeded`
      }
      reject(createAxiosError(error))
    }

    // 将处理response的函数单独抽取出来
    function handleResponse(response: AxiosRes) {
      // 此时数据已经接受成功
      if (response.status >= 200 && response.status <= 200) {
        resolve(response)
      } else {
        let error: AxiosErr = {
          request: xhr,
          config: config,
          message: `Request failed with status code ${response.status}`,
          code: null,
          isAxiosError: false,
          response: response
        }
        // 返回状态错误的时候
        reject(createAxiosError(error))
      }
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return
      }
      // 这儿是timeout的情况
      if (xhr.status === 0) {
        return
      }
      let resData: any
      if (responseType === 'text') {
        resData = xhr.responseText
      } else {
        resData = xhr.response
      }
      let res = {
        data: parseResData(resData),
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders()),
        request: xhr,
        config: config
      }
      handleResponse(res)
    }
    xhr.send(data)
  })
}
