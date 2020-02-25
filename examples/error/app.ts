// import axios from '../../src/index'
import axios, { AxiosErr } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    // console.log(e)
    console.log('e.message', e.message)
    console.log('e.config', e.config)
    console.log('e.code', e.code)
    console.log('e.request', e.request)
    console.log('e.isAxiosError', e.isAxiosError)
    console.log('e.response', e.response)
  })

// axios({
//   method: 'get',
//   url: '/error/get'
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })

// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   })
//     .then(res => {
//       console.log(res)
//     })
//     .catch(e => {
//       console.log(e)
//       // console.log('e.message', e.message)
//       // console.log('e.config', e.config)
//       // console.log('e.code', e.code)
//       // console.log('e.request', e.request)
//       // console.log('e.isAxiosError', e.isAxiosError)
//     })
// }, 5000)

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosErr) => {
//     console.log(e.message)
//     console.log(e.config)
//     console.log(e.code)
//     console.log(e.request)
//     console.log(e.isAxiosError)
//   })
