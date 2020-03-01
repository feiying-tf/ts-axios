import { Canceler, CancelExecutor, CancelTokenSource } from '../types/index'
import { Cancel } from './cancel'

interface PromiseResolved {
  (reason?: Cancel): void
}

export default class CancelToken {
  static source(): CancelTokenSource {
    let cancel!: Canceler
    let promise = new CancelToken(function executor(c: Canceler) {
      cancel = c
    })
    return {
      cancel: cancel,
      token: promise
    }
  }
  throwIfRequest() {
    // 如果this.reason不为空，则说明该sourceToken已经被取消过了
    if (this.reason) {
      throw this.reason
    }
  }
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(fn: CancelExecutor) {
    let promiseResolved: any
    // 此时promise处于pending状态
    this.promise = new Promise(resolve => {
      promiseResolved = resolve
    })
    // fn 的参数传入一个 function
    fn(reason => {
      // 为了避免多次调用取消请求，直接return
      if (this.reason) {
        return
      }
      this.reason = new Cancel(reason)
      promiseResolved(this.reason)
    })
  }
}
