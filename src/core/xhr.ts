import { AxiosRequestConfig, AxiosPromise, AxiosRes, AxiosErr } from '../types/index'
import {
  parseHeaders,
  isOrigin,
  getCookieValue,
  isFormData,
  isAbsoluteURL,
  combineURL
} from '../helpers/util'
import { createAxiosError } from '../helpers/error'
import { transform } from './transform'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    let {
      method = 'get',
      url,
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus,
      baseURL
    } = config
    const xhr = new XMLHttpRequest()
    process()
    xhr.open(method, url!, true)
    setHeader()
    handler()
    xhr.send(data)
    // 处理过程
    function process() {
      // 设置responseType
      if (responseType) {
        xhr.responseType = responseType
      }
      // 设置timeout
      if (timeout) {
        xhr.timeout = timeout
      }
      // 取消请求
      if (cancelToken) {
        cancelToken.promise
          .then(thrown => {
            xhr.abort()
            // 这儿是throw是一个Cancel类的实例
            reject(thrown)
          })
          .catch(
            /* istanbul ignore next */
            () => {
              // do nothing
            }
          )
      }
      if (withCredentials) {
        xhr.withCredentials = true
      }
      if (onDownloadProgress) {
        xhr.onprogress = function(event) {
          onDownloadProgress!(event)
        }
      }
      if (onUploadProgress) {
        // 如果data是formdata的类型
        if (data && isFormData(data)) {
          delete config['Content-type']
        }
        xhr.upload.onprogress = function(event) {
          onUploadProgress!(event)
        }
      }
      if (auth) {
        if (auth.username && auth.password) {
          headers.Authorization = 'Basic ' + btoa(auth.username + ':' + auth.password)
        }
      }
      if (!isAbsoluteURL(url!) && baseURL) {
        url = combineURL(baseURL, url)
      }
      // 如果withCredentials为true，或者是同源状态
      if ((withCredentials || isOrigin(url!)) && xsrfCookieName) {
        // 将 xsrfCookieName 对应的cookie值放到xsrfHeaderName对应的header
        let xsrfValue = getCookieValue(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }
    }
    // 处理事件
    function handler() {
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
          data: transform(resData, xhr.getAllResponseHeaders(), config && config.transformResponse),
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders()),
          request: xhr,
          config: config
        }
        handleResponse(res)
      }
    }
    // 当网络不通的时候，会触发下面的错误
    // 将处理response的函数单独抽取出来
    function handleResponse(response: AxiosRes) {
      if (validateStatus && validateStatus(response.status)) {
        resolve(response)
      } else if (response.status >= 200 && response.status <= 300) {
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
    function setHeader() {
      // 设置请求的参数
      Object.keys(headers).forEach((key: string) => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
  })
}
