export function transform(data: any, headers: any, fn?: any): any {
  if (!fn) {
    return data
  }
  if (typeof fn === 'function') {
    fn = [fn]
  }
  if (Array.isArray(fn)) {
    fn.forEach(item => {
      data = item(data)
    })
  }
  return data
}
