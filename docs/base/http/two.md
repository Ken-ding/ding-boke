# 简单的HTTP协议
- [HTTP协议用于客户端和服务器端之间通信](#1)
- [通过请求和响应的交换达成通信](#2)
- [HTTP是不保存状态的协议](#3)
- [请求URI定位资源](#4)
- [告知服务器意图的http方法](#5)
- [持久连接节省通信量](#7)
- [使用Cookie的状态管理](#8)
## HTTP协议用于客户端和服务器端之间通信
客户端:请求访问文本或图像等资源的一端
服务端:提供资源相应的一端
## 通过请求和响应的交换达成通信
### 请求报文
- 请求方法
- 请求url
- 协议版本
- 可选的请求首部字段
- 内容实体
```
GET / HTTP/1.1
Host:www.baidu.com
User-Agent:curl/7.54.0
Accept:*/*
```
### 响应报文
- 协议版本号
- 状态码
- 解释状态码短语
- 可选响应首部字段
- 内容实体
```
HTTP/1.1 200 OK
Accept-Ranges:bytes
Cache-Control:private,no-cache,no-store,proxy-revalidate,no-transform
Connection:keep-alive
Content-Length:2381
Content-Type:text/html
Date:Mon,09 Nov 2020 07:32:26 GMT
Etag:"588604f8-94d"
Last-Modified:Mon,23 Jan 2017 13:28:24 GMT
Pragma:no-cache
Server:bfe/1.0.8.18
Set-Cookie: BDORZ=27315; max-age=86400; domain=.baidu.com; path=/\r\n
........
```
## HTTP是不保存状态的协议
- http对于发送过的请求或响应都不做持久化处理
- http本身不保留之前一切的请求或响应报文信息
## 请求URI定位资源
- URI为完整的请求URI
```
GET http://hackr.jp/index.html HTTP/1.1
```
-  在首部字段Host中写明网路域名或IP地址
```
GET /index.html HTTP/1.1
Host: hackr.jp
```
- 对服务器本身发起请求
```
OPTIONS * HTTP/1.1
```
## 告知服务器意图的HTTP方法
我们使用curl来测试这几种方法,[curl命令入门](http://www.ruanyifeng.com/blog/2019/09/curl-reference.html)
用我自己搭建的服务器测试,192.168.1.101是我自己电脑的ip,你们可以换成自己的,抓包用的Wireshark
### GET:获取资源
客户端:
```
curl 192.168.1.101:3000;
```
http请求报文:
```
    GET / HTTP/1.1
    Host: 192.168.1.101:3000
    User-Agent: curl/7.54.0
    Accept: */*
```
http响应报文:
```
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Length: 218
    Date: Mon, 09 Nov 2020 14:46:10 GMT
    Connection: keep-alive
    File Data: 218 bytes
    <!DOCTYPE html>\n
    <html lang="en">\n
    <head>\n
        <meta charset="UTF-8">\n
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n
        <title>Document</title>\n
    </head>\n
    <body>\n
        <h1>test</h1>\n
    </body>\n
    </html>
```
### POST:传输实体主体
客户端:
```
curl -d 192.168.1.101:3000;
```
http请求报文:
```
    POST / HTTP/1.1\r\n
    Host: 192.168.1.101:3000\r\n
    User-Agent: curl/7.54.0\r\n
    Accept: */*\r\n
    Content-Length: 8\r\n
    Content-Type: application/x-www-form-urlencoded\r\n
    \r\n
    [Full request URI: http://192.168.1.101:3000/]
    [HTTP request 1/1]
    [Response in frame: 6528]
    File Data: 8 bytes
HTML Form URL Encoded: application/x-www-form-urlencoded
    Form item: "name" = "aaa"
        Key: name
        Value: aaa
```
http响应报文:
```
    HTTP/1.1 200 OK\r\n
    Content-Type: text/html; charset=utf-8\r\n
    Content-Length: 218\r\n
    Date: Mon, 09 Nov 2020 14:59:34 GMT\r\n
    Connection: keep-alive\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.011640000 seconds]
    [Request in frame: 6521]
    [Request URI: http://192.168.1.101:3000/]
    File Data: 218 bytes
Line-based text data: text/html (11 lines)
    <!DOCTYPE html>\n
    <html lang="en">\n
    <head>\n
        <meta charset="UTF-8">\n
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n
        <title>Document</title>\n
    </head>\n
    <body>\n
        <h1>test</h1>\n
    </body>\n
    </html>
```
### PUT:传输文件
客户端:
```
curl -X PUT 172.19.101.70:3000
```
请求报文:
```
    PUT / HTTP/1.1\r\n
    Host: 172.19.101.70:3000\r\n
    User-Agent: curl/7.54.0\r\n
    Accept: */*\r\n
    \r\n
    [Full request URI: http://172.19.101.70:3000/]
    [HTTP request 1/1]
    [Response in frame: 45]
```
响应报文:
```
    HTTP/1.1 200 OK\r\n
    Content-Type: text/html; charset=utf-8\r\n
    Content-Length: 218\r\n
    Date: Tue, 10 Nov 2020 04:12:23 GMT\r\n
    Connection: keep-alive\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.000698000 seconds]
    [Request in frame: 43]
    [Request URI: http://172.19.101.70:3000/]
    File Data: 218 bytes
Line-based text data: text/html (11 lines)
    <!DOCTYPE html>\n
    <html lang="en">\n
    <head>\n
        <meta charset="UTF-8">\n
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n
        <title>Document</title>\n
    </head>\n
    <body>\n
        <h1>test</h1>\n
    </body>\n
    </html>
```
### HEAD:获得报文首部
- HEAD方法与GET方法一样,只是不返回报文主体部分
- 用于确认URI的有效性及资源更新的日期时间

客户端:
```
curl -X HEAD 172.19.101.70:3000
```
请求报文:
```
    HEAD / HTTP/1.1\r\n
    Host: 172.19.101.70:3000\r\n
    User-Agent: curl/7.54.0\r\n
    Accept: */*\r\n
    \r\n
    [Full request URI: http://172.19.101.70:3000/]
    [HTTP request 1/1]
    [Response in frame: 58]
```
响应报文:
```
    HTTP/1.1 200 OK\r\n
    Content-Type: text/html; charset=utf-8\r\n
    Content-Length: 218\r\n
    Date: Tue, 10 Nov 2020 04:16:50 GMT\r\n
    Connection: keep-alive\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.001120000 seconds]
    [Request in frame: 56]
    [Request URI: http://172.19.101.70:3000/]
```

### DELETE:删除文件
- 用来删除文件,与PUT相反的方法

客户端:
```
curl -X DELETE 172.19.101.70:3000
```
请求报文:
```
    DELETE / HTTP/1.1\r\n
    Host: 172.19.101.70:3000\r\n
    User-Agent: curl/7.54.0\r\n
    Accept: */*\r\n
    \r\n
    [Full request URI: http://172.19.101.70:3000/]
    [HTTP request 1/1]
    [Response in frame: 88]
```
响应报文:
```
    HTTP/1.1 200 OK\r\n
    Content-Type: text/html; charset=utf-8\r\n
    Content-Length: 218\r\n
    Date: Tue, 10 Nov 2020 04:22:29 GMT\r\n
    Connection: keep-alive\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.000569000 seconds]
    [Request in frame: 86]
    [Request URI: http://172.19.101.70:3000/]
    File Data: 218 bytes
Line-based text data: text/html (11 lines)
    <!DOCTYPE html>\n
    <html lang="en">\n
    <head>\n
        <meta charset="UTF-8">\n
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n
        <title>Document</title>\n
    </head>\n
    <body>\n
        <h1>test</h1>\n
    </body>\n
    </html>
```
### OPTIONS:询问支持方式
- 返回服务器支持的请求方式

客户端:
```
curl -X OPTIONS 172.19.101.70:3000
```
请求报文:
```
    OPTIONS / HTTP/1.1\r\n
    Host: 172.19.101.70:3000\r\n
    User-Agent: curl/7.54.0\r\n
    Accept: */*\r\n
    \r\n
    [Full request URI: http://172.19.101.70:3000/]
    [HTTP request 1/1]
    [Response in frame: 100]
```
响应报文:
```
    HTTP/1.1 200 OK\r\n
    Allow: GET,POST\r\n
    Content-Type: text/html; charset=utf-8\r\n
    Content-Length: 218\r\n
    Date: Tue, 10 Nov 2020 04:52:07 GMT\r\n
    Connection: keep-alive\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.007168000 seconds]
    [Request in frame: 296]
    [Request URI: http://172.19.101.70:3000/]
    File Data: 218 bytes
Line-based text data: text/html (11 lines)
    <!DOCTYPE html>\n
    <html lang="en">\n
    <head>\n
        <meta charset="UTF-8">\n
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n
        <title>Document</title>\n
    </head>\n
    <body>\n
        <h1>test</h1>\n
    </body>\n
    </html>
```
### TRACE:追踪路径
- 查询发送出去的请求是怎么被加工修改/篡改的;请求想要连接到源目标服务器可能会通过的代理中转
### CONNECT:要求用隧道协议连接代理
- 要求与代理服务器通信时建立隧道,实现用隧道协议进行TCP通信.只要使用SSL和TLS协议把通信内容加密后经过网络隧道传输
## 持久连接节省通信量
### 持久连接(长连接)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201110191702353.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
看上图,建立TCP连接需要三次握手,断开TCP连接需要四次挥手.
利用wireshake抓包,可以看到具体过程
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111092138224.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
为了让自己更好理解持久连接,我们先对短连接做一实现
#### 短连接
http1.1默认采用的是持久连接,除非客服端和服务端主动要求关闭,主要设置首部字段Connection:close;但是我在测试的过程发现客户端无法设置,通过CDN找到客户端Connection是禁止字段[Forbidden header name](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)所以只能依靠服务端设置Connection:close,上代码
客户端
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button onclick="get()">发送请求</button>
    <script>
        var xhr=new XMLHttpRequest();
        function get(){
            xhr.open("GET","/test",false);
            xhr.setRequestHeader("Connection", "Close");//被禁止设置
            xhr.send();
        }
    </script>
</body>
</html>
```
服务端
```
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const httpProxy = require('http-proxy')

httpProxy.createProxyServer({target:'http://localhost:3000'}).listen(8000);

app.use(async ctx => {
  if(ctx.url==="/"){
    try{
      var data=fs.readFileSync('./static/index.html', 'utf8');
      ctx.set('Allow', "GET,POST");
      ctx.body = data;
    }catch(error){
      console.log(error);
    }
  }
  if(ctx.url==="/test"){
    ctx.set("Connection","Close")
    ctx.body="Hello,World"
  }
});

app.listen(3000);
```

效果:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111093811310.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
可以看到每次都要有四次挥手步骤,这种方式对于之前很小的文本传输还行,但是随着HTTP的普及,文档中包含大量的图片就出现性能问题
#### 长连接
为了解决上面的问题,http1.1出现了持久连接,也是利用上面的的代码,只是服务端去掉 ctx.set("Connection","Close")

效果:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111095312482.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
可以看到每次多次请求是复用之前的TCP连接
### 管线化
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111095312482.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
管线化机制须通过永久连接（persistent connection）完成，仅HTTP/1.1支持此技术（HTTP/1.0不支持）

在使用持久连接的情况下，某个连接消息的传递类似于

请求1 -> 响应1 -> 请求2 -> 响应2

管线化：某个连接上的消息变成了类似这样 

请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 -> 响应3

ps:
- 持久连接的一个缺点是请求和响应式是顺序执行的，只有在请求1的响应收到之后，才会发送请求2，而管线化不需要等待上一次请求得到响应就可以进行下一次请求。实现并行发送请求。
- 只有GET和HEAD要求可以进行管线化，而POST则有所限制
- 初次创建连接时也不应启动管线机制，因为对方（服务器）不一定支持HTTP/1.1版本的协议
- HTTP1.1要求服务器端支持管线化，但并不要求服务器端也对响应进行管线化处理，只是要求对于管线化的请求不失败，而且现在很多服务器端和代理程序对管线化的支持并不好，现代浏览器Chrome和Firefox默认并未开启管线化支持
## 使用Cookie的状态管理
### domain
-决定cookie在哪个域是有效的,也就是决定在向该域发送请求时是否携带此Cookei,domain设计是对子域名生效的,如domain设置为.a.com,则b.a.com和c.a.com均可以使用该cookie,但如果设置为b.a.com,则c.a.com不可使用该cookie,默认是当前域

测试一下:
1.本地自定义测试域名
在hosts文件中做个dns解析
27.0.0.1 a.test.com
127.0.0.1 b.test.com

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111113530255.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
2.设置cookie的父域名为.test.com
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111113732416.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
3.访问a.test.com:3000,点击发送请求是设置cookie的操作
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111113955233.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)


设置成功

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111114145119.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
4.访问b.test.com

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111111432776.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
可以看到b.test.com也可以获得a.test.com的cookie

### path
Path是Cookie的有效路径，和Domain类似，也对子路径生效，如Cookie1和Cookie2的Domain均为a.com，但Path不同，Cookie1的Path为 /b/,而Cookie的Path为 /b/c/,则在a.com/b页面时只可以访问Cookie1，在a.com/b/c页面时，可访问Cookie1和Cookie2。Path属性需要使用符号“/”结尾。

测试:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111132113457.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111132140597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
设置了cookei的path为/getCookies
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111132249590.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)

可以看到在/的下面没有cookie
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111132427615.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
可以看到/getCookies下面包含cookie
其他的属性我就不一一实现了

### Expires/Max-age
Expires和Max-age均为Cookie的有效期，Expires是该Cookie被删除时的时间戳，格式为GMT,若设置为以前的时间，则该Cookie立刻被删除，并且该时间戳是服务器时间，不是本地时间！若不设置则默认页面关闭时删除Cookie。
Max-age也是Cookie的有效期，但它的单位为秒，即多少秒之后失效，若Max-age设置为0，则立刻失效，设置为负数，则在页面关闭时失效。Max-age默认为 -1。

### Size
Szie是此Cookie的大小。在所有浏览器中，任何cookie大小超过限制都被忽略，且永远不会被设置。各个浏览器对Cookie的最大值和最大数目有不同的限制，整理为下表(数据来源网络，未测试)：
| 浏览器 | Cookie最大条数 |Cookie最大长度/单位:字节|
|--|--|--|
| IE | 50 |4095|
| Chrome | 150 |4096|
| FireFox | 50 |4097|
| Opera | 30 |4096|
| Safari | 无限 |4097|

### HttpOnly
HttpOnly值为 true 或 false,若设置为true，则不允许通过脚本document.cookie去更改这个值，同样这个值在document.cookie中也不可见，但在发送请求时依旧会携带此Cookie。

### Secure
Secure为Cookie的安全属性，若设置为true，则浏览器只会在HTTPS和SSL等安全协议中传输此Cookie，不会在不安全的HTTP协议中传输此Cookie。

 ### SameSite
SameSite用来限制第三方 Cookie，从而减少安全风险。它有3个属性，分别是：

- Strict
 >Scrict最为严格，完全禁止第三方Cookie，跨站点时，任何情况下都不会发送Cookie

- Lax
>Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

- None
>网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

关闭SameSite的方法

- 操作方法谷歌浏览器地址栏输入：chrome://flags/
- 找到：SameSite by default cookies、Cookies without SameSite must be secure设置上面这两项设置成 Disable

### Priority
优先级，chrome的提案，定义了三种优先级，Low/Medium/High，当cookie数量超出时，低优先级的cookie会被优先清除。
在360极速浏览器和FireFox中，不存在Priority属性，不清楚在此类浏览器中设置该属性后是否生效。


