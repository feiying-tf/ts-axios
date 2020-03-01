import { Cancel as CancelError, CancelToken } from '../types/index'
import { rejects } from 'assert'

export class Cancel {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(thrown: CancelError): boolean {
  if (thrown && thrown instanceof Cancel) {
    return true
  } else return false
}

// 如果cancelToken已经取消过一次，那么就返回就抛出一个错误
export function throwIfRequest(cancelToken: CancelToken): void {
  if (cancelToken.promise) {
    throw new Error('该CancelToken已经请求过一次了，不能继续请求')
  }
}
