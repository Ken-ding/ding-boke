# 与HTTP协助的web服务器
## 单台虚拟主机实现多个域名
### 通过端口访问不同的主机
>nginx.conf

```bash
server {
    listen       8080;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html/demo1;
        index  index.html index.php;
    }
}

server {
    listen       8081;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html/demo2;
        index  index.html index.php;
    }
}
```
>效果:
>
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126221945766.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
### 通过不同域名来访问
配置两个测试域名
a.demo1.com
b.demo2.com

>hosts文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126223121136.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
>nginx.conf
```bash
server {
    listen       80;
    server_name  a.demo1.com;

    location / {
        root   /usr/share/nginx/html/demo1;
        index  index.html index.php;
    }
}

server {
    listen       80;
    server_name  b.demo2.com;

    location / {
        root   /usr/share/nginx/html/demo2;
        index  index.html index.php;
    }
}
```

>效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126222931172.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
## 通信数据转发程序
- 代理
- 网关
- 隧道
### 代理
[HTTP 请求头中的 X-Forwarded-For](https://imququ.com/post/x-forwarded-for-header-in-http.html)
####  正向代理
##### 定义
正向代理是指位于客户机(A)和站点服务器(B)之间的代理服务器(C),为了从站点服务器(B)获取资源,客户机(A)向代理服务器(C)发送请求并指定站点服务器(B),然后代理服务器(C)向站点服务器(B)转交请求并将获取的资源返回给客户机(A),正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201130154234416.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### 作用
安全性:增强内部网络安全性,使得外部网络的威胁不易影响到内部网络;
监控和管理:利用代理服务器可以对内部网络访问外部网络进行必要的监控和管理,正向代理服务器不支持外部网络对内部网络的访问请求
#### 指令
- resolver指令
resolver指令用于指定DNS服务器的IP地址,DNS服务器的主要作用是对域名进行解析,将域名映射为对应的IP地址

- resolver_timeout指令
resolver_timeout指令用于设置DNS服务器域名解析超时时间。

- proxy_pass指令
proxy_pass指令用于设置代理服务器的协议和地址。
##### 实例
```bash
server{
	# 配置DNS解析IP地址，比如 Google Public DNS，以及超时时间（5秒）
    resolver 8.8.8.8;    # 必需
    resolver_timeout 5s;
	
	# 监听端口
    listen 80;
    location / {
		 # 配置正向代理参数
        proxy_pass $scheme://$host$request_uri;
	}
}
```
#### 反向代理
##### 定义
客户端对代理是无感知的,客户端不需要任何配置,我们只需要将请求发送到反向代理服务器,由反向代理服务器去选择目标服务器获取数据后,在返回给客户端,此时反向代理器和目标服务器对外就是一个服务器,暴露的是代理服务器地址,隐藏了真实服务器IP地址
我们通过这张图来对比一下正向代理和反向代理:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201130162551479.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201130162602972.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
>总结起来还是一句话：正向代理代理客户端，反向代理代理服务器
### 网关
参考资料:[使用 Node.js 搭建一个 API 网关](https://developer.aliyun.com/article/607179)
### 隧道
参考资料:[HTTP 代理原理及实现](https://blog.csdn.net/yetugeng/article/details/89512471)
## 保存资源的缓存
### http缓存请求相应头
#### Cache-Control
请求/响应头,缓存控制字段,可以说是控制http缓存的最高指令,要不要缓存也是它说了算.
常用值:
- no-store:所有内容都不缓存
- no-cache:缓存,但是浏览器使用缓存前,都会请求服务器判断缓存资源是否最新,它只用不过期的缓存.
- max-age=x(单位秒)请求缓存后的x秒不再发起请求,属于http1.1属性,优先级高于Expires
- s-maxage=x(单位秒)代理服务器请求源站缓存后x秒不再发起请求,只对CDN缓存有效
- public 客户端和代理服务器(CDN)都可缓存
- private 只有客户端可以缓存

>ps:在使用谷歌浏览器验证时,要取消Disable cache,默认是勾选的,这会导致验证失效
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201201121335263.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### Expires
响应头,代表资源过期时间,由服务器返回提供,GMT格式日期,是http1.0属性,在于max-age共存的情况下,优先级要低
#### Last-Modified与If-Modified-Since
在浏览器第一次请求某一个URL时，服务器端的返回状态会是200，内容是你请求的资源，同时有一个Last-Modified的属性标记此文件在服务期端最后被修改的时间,格式类似这样:
```bash
	Last-Modified: Fri, 12 May 2006 18:53:33 GMT 
```
过程如下:
	- 客户端向服务器请求资源
	- 服务端返回Last-Modified(文件修改时间),并把Last-Modified值设置请求头If-Modified-Since
	- 客户端再次请求时,会带着If-Modified-Since与服务端Last-Modified对比
	- 不用主动获取If-Modified-Since的值,服务端自动对比,文件日期未变返回200 ok(from disk cache),从缓存拿资源,文件日期变化返回200 ok,从服务器获取最新资源
	
>ps:客户端强制刷新(ctl+shift+R),请求会剔除Etag

node实现代码:
```js
onst http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    if (/\/(static)/.test(req.url)) {
          let content = fs.readFileSync(path.join(__dirname, req.url));
          let stat=fs.statSync(path.join(__dirname));
          console.log("access...");

          res.writeHead(200, {
            "Last-Modified": '2020-12-01T07:39:09.732Z'
          });
          console.log("access...");
          res.end(content);
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
      let str = new Date(Date.now() + 10000).toString();
      
      res.write("hello,world");
      console.log("access...");
      res.end();
    }
  })
  .listen(8889);
```
效果:
第一次访问:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201202100223172.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
后续访问:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201202100308472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### Etag与if-none-match
过程如下:
	- 客户端向服务器请求资源
	- 服务器返回状态值200,返回数据,并设置Etag(请求资源的指纹)
	- 客户端再次请求时,根据服务端返回的Etag,设置if-none-match和Etag值一样,浏览器自动设置
	- 服务端根据客户端的请求头中的if-none-match,与服务器生成的Etag值对比,相同返回304,否则返回200,并设置新的Etag
>ps:客户端强制刷新(ctl+shift+R),请求会剔除Etag

node实现代码:
```js
const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    if (/\/(static)/.test(req.url)) {
        var hashStr = "A hash string.";
        var hash = require("crypto").createHash("sha1").update(hashStr).digest("base64");
    try {
        const etag = req.headers["if-none-match"];
        console.log(etag);

        if (etag === hash) {
          res.writeHead(304);
          res.end();
        } else {
          res.writeHead(200, {
            Etag: hash,
          });

          let content = fs.readFileSync(path.join(__dirname, req.url));
          console.log("access...");

          res.end(content);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.write("hello,world");
      res.end();
    }
    })
  .listen(8889);
```
效果:
第一次访问:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201202102137853.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
后续访问:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201202102257405.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
### 使用HTTP缓存原因
- 客户端每次都要请求服务器,浪费流量(比如手机端)
- 服务器每次都得提供查找,下载,请求用户基础如果较大,服务器存在较大压力
- 客户端每次请求都要进行页面渲染,用户体验较差
基于上面几点:将请求的文件存放起来使用,比如使用http缓存

### http缓存使用方案发展历程
#### 1.让服务器与浏览器约定一个文件过期时间——Expires(GMT时间格式)
##### 流程:
- 浏览器会先对比当前时间是否已经大于Expires，也就是判断文件是否超过了约定的过期时间
- 时间没过，不发起请求，直接使用本地缓存。
- 时间过期，发起请求，继续上述的浏览器与服务器的谈话日常。

##### 问题:
- 假设Expires已过期，浏览器再次请求服务器，但文件相比上次并未做任何改变，那这次请求我们是否通过某种方式加以避免？看下面

#### 2.让服务器与浏览器在约定文件过期时间的基础上，再加一个文件最新修改时间的对比——Last-Modified与if-Modified-Since
##### 流程
- Expires未过期，浏览器机智的使用本地缓存，免得挨打。
- Expires过期，服务器带上了文件最新修改时间if-Modified-Since(也就是上次请求服务器返回的Last-Modified)，服务器将if-Modified-Since与Last-Modified做了个对比。
- if-Modified-Since 与Last-Modified不相等，服务器查找了最新的文件，同时再次返回Expires与全新的Last-Modified
- if-Modified-Since 与Last-Modified相等，服务器返回了状态码304，文件没修改过，你还是用你的本地缓存。
##### 问题
- 浏览器端可以随意修改Expires，Expires不稳定，Last-Modified只能精确到秒，假设文件是在1s内发生变动，Last-Modified无法感知到变化，这种情况下浏览器永远拿不到最新的文件(假想极端情况)。看下面
#### 3.让服务器与浏览器在过期时间Expires+Last-Modified的基础上，再增加一个文件内容唯一对比标记——Etag与If-None-Match。哦对了，我们说Expires不稳定，这里我们再加入一个max-age来加以代替(cache-control其中一个值)。
##### 流程
- 服务器在Expires+Last-Modified的基础上,添加了max-age=60(单位秒)和文件内容唯一标识符Etag
- 60S内，不发起请求，直接使用本地缓存。（max-age=60代表请求成功缓存后的60S内不再发起请求，与Expires相似，同时存在max-age优先级要比Expires高，区别后面具体说）
- 60S后，浏览器带上了if-Modified-Since 与If-None-Match(上次服务器返回来的Etag)发起请求，服务器对比If-None-Match与Etag(不对比if-Modified-Since与Last-Modified了，Etag优先级比Last-Modified高，毕竟更精准)
- If-None-Match与Etag不相等，说明文件内容被修改过，服务器返回最新文件与全新的Etag与max-age=60与Last-Modified与Expires
- If-None-Match与Etag相等，说明文件内容无任何改变，返回304，告诉浏览器继续使用之前的本地缓存。

##### 问题
- 我们已经可以精确的对比服务器文件与本地缓存文件差异，但其实上面方案的演变都存在一个较大缺陷， max-age或Expires不过期，浏览器无法主动感知服务器文件变化.看下面

#### 4.http缓存方案
##### md5/hash缓存
通过不缓存html，为静态文件添加MD5或者hash标识，解决浏览器无法跳过缓存过期时间主动感知文件变化的问题。

> 原理

我们前面说的http缓存方案，服务器与浏览器的文件修改时间对比，文件内容标识对比，前提基础都是建立在两者文件路径完全相同的情况下。
module/js/a-hash1.js与module/js/a-hash2.js是两个完全不同的文件，假想浏览器第一次加载页面，请求并缓存了module/js/a-hash1.js，第二次加载，文件指向变成了module/js/a-hash2.js，浏览器会直接重新请求a-hash2.js，因为这就是两个完全不同的文件，哪里还有什么http缓存文件对比，t通过这种做法，我们就可以从根本上解决过期时间没到浏览器无法主动请求服务器的问题。因此我们只需要在项目每次发布迭代将修改过的静态文件添加不同的MD5或hash标识就好啦。
注意，这里不推荐缓存html文件(或许有更好的做法，欢迎留言)，这样每次html加载渲染都可以感知文件变化，反正文件没变还是使用本地缓存，文件名都变了说明修改过，重新请求缓存就好了。
##### CDN缓存(作为了解)
CDN定义:
CDN是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。

CDN缓存定义:
CDN边缘节点缓存数据，当浏览器请求，CDN将代替源站判断并处理此处请求。

- 情况1：CDN节点自己缓存的文件未过期，于是返回了304给浏览器，打回了这次请求。
- 情况2：CDN节点发现自己缓存的文件过期了，为了保险起见，自己发起请求给了服务器(源站)，成功拿回了最新数据，然后再交给与了浏览器。

问题:
CDN缓存的问题也跟前面的http缓存一样，CDN缓存时间不过期，浏览器始终被拦截，无法拿到最新的文件。

解决方案:
CDN类似一个平台，是可以通过登录，手动更新CDN缓存的，变相解决了浏览器缓存无法手动控制的问题

### 浏览器地址栏回车，新开窗口，F5刷新，CTRL+F5刷新等浏览器操作对HTTP缓存的影响
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201202112054332.png)
### 强缓存与协商性缓存(弱缓存)
#### 强缓存
不发起http请求，直接使用本地缓存，比如浏览器地址栏回车，使用浏览器的刷新按钮，在Expires或max-age生效的情况下，触发的都是强缓存。
#### 协商性缓存(弱缓存)
在使用本地缓存前，先与服务器协商，核对缓存文件是否为最新。比如设置了cache-control=no-cache，不管你做任何操作，都会发起请求，这一类就是协商性缓存了。

### max-age和Expires的区别
- max-age是http1.1的属性，Expires是http1.0的属性，为了做到向下兼容，一般写两个。但如在1.1环境下，max-age优先级比Expires高。
- max-age是相对过期时间，Expires是绝对过期时间。max-age在浏览器成功缓存文件后，只需相对请求成功之后的多长时间不再发起请求就好了，而Expires总是需要服务器返回一个精准的GMT格式的日期，并以这个日期为标准来判断缓存是否过期，相对就比较麻烦，所以才有了max-age这样的存在来代替它。
- no-cache和 Pargma也是这样的存在，一个是1.1的属性，一个是1.0，向下兼容，同时写了两个

参考资料:[http缓存详解，http缓存推荐方案](https://www.cnblogs.com/echolun/p/9419517.html)

