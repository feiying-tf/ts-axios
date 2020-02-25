import { ResolvedFn, RejectFn } from '../types/index'

// 单个拦截器接口
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectFn
}

// 实现拦截器类
export class InterceptorManager<T> {
  private InterceptorArr: Array<Interceptor<T> | null>

  constructor() {
    // 通过一个数组缓存拦截器
    this.InterceptorArr = []
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    // 遍历拦截器数组，并执行回调fn
    this.InterceptorArr.forEach(item => {
      if (item) {
        fn(item)
      }
    })
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectFn): number {
    this.InterceptorArr.push({
      resolved,
      rejected
    })
    // 返回对应的索引
    return this.InterceptorArr.length - 1
  }
  eject(id: number): void {
    // 防止id对应不上，所以将值设置成null
    this.InterceptorArr[id] = null
  }
}
