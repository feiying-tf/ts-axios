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
   transformRequest: 在处理 headers 之后
8. 在使用 config[key]时，对其类型添加索引签名
   设置默认值

9. transform 函数进行转换
10. axios.create
