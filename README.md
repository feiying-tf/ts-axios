# ts-axios

使用 typescript 重构 ts

### 处理请求

将处理请求的方法放在 src 下面的 shr.ts 中

### 处理类型

将所有的共用类型放在 src 下面的 types 中

### 处理参数

- 基本参数
- 参数是数组
- 参数值为对象
- 参数是 Date 类型
- 特殊字符支持
- 空值忽略

### 处理 url

1. src 下面的 helps（url.ts）
2. encode 特殊字符对应，编码里面有字母的，全局正则匹配时需要使用 /ig
   %40 => @
   %3A => :
   %24 => \$
   %2C => ,
   %20 => +
   %5B => [
   %5D => ]

### 处理 body（post 请求）

1. 需要将请求的对象转换为 JSON 字符串，满足 XMLHttpRequest.send(body) 的 USVString 这种类型

2. 创建普通对象 isPlainObject，因为 FormData 这种类型也会被识别为 object

### 处理 headers（Content-type）

1. 避免 post 请求时，send 的的参数被自动设置为 palin(普通字符串)，而我们需要的是 json 字符串。

2. data 为普通对象的时候才处理

### 获取返回数据

1. Promise<>
2. 设置 responseType

```
responseType = responseType
```

3. 将相应的 headers 转换为 json
4. 将 data 处理成 json（如果是字符串，默认转换）
   使用 try...catch...

### 异常处理

1. 网络异常错误 （将控制台中的 Online 设置为 offline）
2. timeout => code：ECONNABORTED
3. 返回状态非 200
4. 获取额外的错误信息

```
{
   message,
   request,
   code,
   response,
   isAxiosError
}
```

5. 踩坑（继承内置对象时）

```
Object.setPrototypeOf(this, AxiosError.prototype)
```

### 扩展接口

```
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

### 函数重载

不仅可以传入一个参数，也可以传入两个参数

```
axios(config)
axios(url[, config])
```

### 响应数据支持泛型

1. 通过泛型的方式返回指定的数据结构 **暂时没有效果**

### 拦截器

1. request 拦截器，response 拦截器
   axios.interceptors.request.user()

2. 可以添加多个拦截器，链式依次执行

- request，后添加的先执行
- response，先添加的先执行

3. 删除某个拦截器

```
// 返回一个拦截器id
const myInterceptor = axios...
// 通过id删除拦截器
axios.interceptors.request.eject(myInterceptor)
```

4. 每个拦截器都支持同步和异步处理->Promise
   request 拦截器：config
   response 拦截器：response

### 配置默认值

```
axios.defaults.baseURL
instance.defaults.timeout = 0
// 给所有请求的headers加上 Accept 这个属性
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'
// 只给post请求加上 'Content-Type' 属性
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```

1. withoutData
   `get、delete、head、options`
2. withData => 设置 Content-Type
   `post、put、patch`

### 配置合并及策略

1. method、timeout => defaultStart 取自定义配置 2 中没有的话，使用配置 1 中的
2. [url、params、data] 取 config2 中的设置、
3. 上面两种合并引入策略模式
4. headers => 采用 merge 的方式
5. ['headers']深度拷贝，当配置为 obj 时才进行
6. headers 合并后再进行解析，将里面的内容放到指定的请求里面
7. config 中：transformRequest/transformResponse：函数或者数组

- transformRequest: 在处理 headers 之后，如果用户设置了该属性，那么将替换默认的 data 转换

* transformResponse: 在拦截器之前，如果用户设置了该属性，那么将替换默认的 data 转换

8. 在使用 config[key]时，对其类型添加索引签名
   设置默认值

9. transform 函数进行转换
10. axios.create

### 取消功能

1. 两种使用方式

- 方式 1

```
// 这儿 axios.CancelToken.source() 返回一个对象{cancel: XXX, token: }
axios.CancelToken.source().cancel('the reason of cancel')
axios.isCancel(e)
```

类类型

- 方式 2

```
const CancelToken = axios.CancelToken
let cancel
axios.get('', {
   cancelToken: new CancelToken(function executor (c) {
      cancel = c;
   })
})
// 取消请求
cancel()
```

实质，当执行 cancel 方法的时候，执行 xhr.abort()
巧妙的运用 promise
实例类型

2. axios.isCancel(thrown)  
   thrown 作为一个类的实例，然后通过 instanceof 进行判断

3. 实现

- 定义

```
interface CancelToken {
   promise: Promise<string>
   reason?: string
}
// 取消方法，可以传递参数
interface Canceler {
   (message?:string):void
}
// 传入 CancelToken 构造器的参数
interface CancelExecutor {
   (cancel: Canceler): void
}
```

- 给 config 添加 cancelToken 属性

4. 请求携带的 cancelToken 如果被取消过一次，那么就不能再请求了

```
throwIfRequest() // 通过cancelToken.reason进行判断
```

### 锦上添花

1. withCredentials 是否需要凭证
2. XSRF（CSRF） 防御  
    原理将服务端发送的 token 放到 headers 中
   xsrfCookieName
   xsrfHeaderName
   前提条件是：withCredentials: true，或者是同源
   通过一个 a 标签判断同源策略
   通过正则表达式读取 cookie
3. 上传和下载进度监控
   onDownloadProgress / onUploadProgress
   xhr.onprogress
   xhr.upload.onprogress
   如果上传的数据类型是 fowmData（FormData 实例），那么就要 delete 其中的 Content-type 字段
4. 对 xhr 的代码进行封装
5. Http 授权
   Authorization
   通过
   ```
   auth: {
      username: '',
      password: ''
   }
   ```
   进行转换（Basic 加密）username:password 加密后的结果
   `'Basic ' + btoa(auth.username+':'+auth.password)`
6. 自定义合法状态码
   ```
   // 默认值
   validateStatus(status){
      retrun status >= 200 && status < 300
   }
   ```
7. 自定义参数序列化

```
// 返回值作为解析后的规则
paramsSerializer(params)
```

判断是否是 URLSearchParams 的类型（调用 toString()）

8. baseUrl

```
// 判断是否是绝对地址
function isAbsoluteURL(url):booleal {
   return /(^[a-z][a-z\d+\-\.]*:)?\/\//i.test(url)
}
// 拼接
function combineURL(baseURL: string, relativeURL?:string){
   // 去掉baseURL后面的//，去掉relativeURL前面的/，用/连接
}
```

9. 静态方法扩展
   axios.all 返回一个 Promise 数组
   axios.spread 接收一个函数，返回一个新的函数
   axios.Axios 返回一个 axios
   axios.getUri 返回组合后的 url

### jest 简介

```
"jest": {
   "transform": {
      ".(ts|tsx)": "ts-jest" // 把.ts和.tsx文件内容转换成javascript
   },
   "testEnvironment": "jsdom", // 表示设计一个类浏览器的测试环境
   "testRegex": "(/test/.*\\.(test|spec))\\.(ts)$", // 表示test目录下所有以.test.ts 和 spec.ts的文件都需要跑测试
   "moduleFileExtensions": [ // 模块文件扩展名，优先级从前到后
      "ts",
      "tsx",
      "js"
   ],
   "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/test/"
   ],
   "coverageThreshold": { // 测试覆盖率阈值设定，当我们测试覆盖率打不倒阈值的时候，测试就会失败
      "global": {
         "branches": 90, // 全局代码分支覆盖率要达到 90%
         "functions": 95, // 方法覆盖率要达到 95%
         "lines": 95, // 代码函数覆盖率要达到 95%
         "statements": 95 // 声明覆盖率达到 95%
      }
   },
   "collectCoverageFrom": [ // 表示收集src目录以及它的所有子目录中的js和ts文件的测试覆盖率
      "src/*.{js,ts}",
      "src/**/*.{js,ts}"
   ],
   "setupFilesAfterEnv": [ // 测试框架安装后立即执行的代码文件列表
      "<rootDir>/test/boot.ts"
   ]
}
```

### 编写测试

1. 先给辅助方法编写测试

### 编译和打包

1.
