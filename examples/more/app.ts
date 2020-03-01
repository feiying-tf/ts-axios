import axios from '../../src/index'
import qs from 'qs'

// document.cookie = 'a=b'
// axios
//   .get('/more/get', {
//     auth: {
//       username: 'tangfeng',
//       password: 'hahaha'
//     }
//   })
//   .then(res => {
//     console.log('这儿是get请求的res', res)
//   })

// axios.post('http://127.0.0.1:8088/more/server2', {}, { withCredentials: false }).then(res => {
//   console.log('这儿是post请求的res', res)
// })

// const instance = axios.create({
//   xsrfCookieName: 'XSRF_TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })
// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   onDownloadProgress(event) {
//     console.log('event', event)
//   }
// })
// instance.get('https://img2.mukewang.com/szimg/5e26a9f909ef95b512000676-360-202.png')
// axios
//   .get('/more/304')
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e.message)
//   })

// axios
//   .get('/more/304', {
//     validateStatus(status) {
//       return status >= 200 && status < 400
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e.message)
//   })

// axios
//   .get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
//   })
//   .then(res => {
//     console.log(res)
//   })

// axios
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, {
//       arrayFormat: 'brackets'
//     })
//   }
// })

// instance
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

const instance1 = axios.create({
  baseURL: 'http://img.mukewang.com'
})
instance1.get('5cc01a7b0001a33718720632.jpg')

// instance1.get('https://img2.mukewang.com/szimg/5e26a9f909ef95b512000676-360-202.png')

// function getB() {
//   return axios.get('/more/B')
// }
// function getA() {
//   return axios.get('/more/A')
// }

// axios.call([getA(), getB()]).then(
//   axios.spread(function(resA, resB) {
//     console.log(resA.data)
//     console.log(resB.data)
//   })
// )

// axios.call([getA(), getB()]).then(([resA, resB]) => {
//   console.log(resA.data)
//   console.log(resB.data)
// })

// const fakeConfig = {
//   baseURL: 'https://www.baidu.com',
//   url: '/user/12345',
//   params: {
//     idClient: 1,
//     idTest: 2,
//     testString: 'thisIsTest'
//   }
// }
// console.log(axios.getUri(fakeConfig))
