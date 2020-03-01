import axios from '../../src/index'
import { TransformFn } from '../../src/types/index'
import qs from 'qs'
// axios.defaults.headers.common['test2'] = 123

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then(res => {
//   console.log(res.data)
// })

let transformRequest = [
  function(data) {
    return qs.stringify(data)
  },
  ...(axios.defaults.transformRequest as TransformFn[])
]

let transformResponse = [
  ...(axios.defaults.transformResponse as TransformFn[]),
  function(data) {
    if (typeof data === 'object') {
      data.x = 100
    }
    return data
  }
]

const instance = axios.create({
  transformRequest,
  transformResponse
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
