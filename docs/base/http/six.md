# 6 HTTP首部
## 6.1 HTTP报文首部
### 6.1.1 HTTP请求报文
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210101237537.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
### 6.1.2 HTTP响应报文
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210101258731.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
## 6.2 HTTP首部字段
### 6.2.1 首部字段结构
```js
首部字段名:字段值
```
### 6.2.2 首部字段类型(HTTP/1.1字段)
首部可以分为四种：通用首部、请求首部、响应首部、实体首部。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210101408726.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### 通用首部
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210101439540.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### 请求首部
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210101520305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### 响应首部
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210101612525.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### 实体首部
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210101641365.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
此外，随着技术发展，还出现了Cookie、Set-Cookie和Content-Disposition等在其他RFC中定义的首部字段，它们的使用频率也很高。
### 6.2.3 End-to-end首部和Hop-by-hop首部
HTTP首部字段将定义成缓存代理和非缓存代理的行为分为:
1. 端到端首部（End-to-end Header）：一定要转发到最终接收目标
2. 逐跳首部（Hop-by-hop Header）：只对单次转发有效，会因通过缓存或代理而不再转发

HTTP/1.1中的逐跳首部字段,除了8个首部字段之外,其他所有字段都属于端到端首部
- Connection
- Keep-Alive
- Proxy-Authenticate
- Proxy-Authorization
- Trailer
- TE
- Transfer-Encoding
- Upgrade
## 6.3 通用首部字段
### Cache-Control
指令的参数是可选的.多个指令之间通过","分割
#### 缓存请求指令
| 指令 | 参数 |说明|
|--|--|--|
| no-cache | 无 |强制向源服务器再次验证|
|no-store|无|不缓存请求或响应任何内容|
|max-age=[秒]|必须|知道几秒之前不去服务器请求|
|min-fresh=[秒]|必须|在指定时间内的响应有效|
|no-transform|无|代理不可更改媒体类型|
|only-if-cached|无|从缓存获取资源|
|cache-extension|-|新指令标记(token)|
#### 缓存响应指令
| 指令 | 参数 |说明|
|--|--|--|
| public | 无 |可向任意方提供响应的缓存|
|private|可省略|仅向特定用户返回响应|
|no-cache|可省略|缓存前必须先确认其有效性|
|no-store|无|不缓存请求或响应的任何内容|
|no-transform|无|代理不可更改媒体类型|
|must-revalidate|无|可缓存但必须向源服务器进行确认|
|proxy-revalidate|无|要求中间缓存服务器对缓存的响应有效性再进行确认|
|max-age=[秒]|必需|响应的最大Age值|
|s-maxage=[秒]|必需|公共缓存服务器响应的最大Age值|
|cache-extension|-|新指令标记(token)|
### Connection
- 控制不再转发给代理的首部字段
```js
Connection:不再转发的首部字段名
```
- 管理持久连接
```js
//持久连接
Connection:Keep-Alive
//短连接
Connection:close
```
### Date
创建HTTP报文的日期和时间

**RFC1123 格式**
HTTP/1.1 版本使用在RFC1123中规范的日期时间的格式，如下示例：
```js
Date: Tue, 03 Jul 2012 04:40:59 GMT
```
 **RFC850格式**
 之前的HTTP协议版本中使用在RFC850中定义的格式，如下示例：
 ```js
 Date: Tue, 03-Jul-12 04:40:59 GMT
 ```
 **与C标准库相似 格式**
 除此之外，还有一种格式。它与C标准库内的asctime()函数的输出格式一致，如下示例：
 ```js
 Date: Tue Jul 03 04:40:59 2012
 ```
### Pragma
 Pragma 是HTTP/1.1 之前版本保留的历史遗留字段，仅作为与HTTP/1.0 的向后兼容而定义
 规范定义的形式唯一，如下所示：
 ```js
 Pragma: no-cache
 ```
 该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不反回缓存的资源。
所有的中间服务器如果都能以HTTP/1.1为基准，那直接采用 Cache-Control: no-cache 指定缓存的处理方式是最理想的。但要整体掌握全部中间服务器使用的HTTP协议版本却是不现实的。因此，发送的请求会同时含有下面两个首部字段：
```js
Cache-Control: no-cache
Pragma: no-cache
```
### Trailer
Trailer 会实现说明在报文主体后记录哪些首部字段
该首部字段可以使用在 HTTP/1.1 版本分块传输编码时
```js
HTTP/1.1 200 OK
Date: Tue, 03 Jul 2012 04:40:56 GMT
Content-Type: text/html
· · ·
Transfer-Encoding: chunked
Trailer: Expiress
· · ·

· · · （报文主体） · · ·

0
Expires: Tue, 28 Sep 2004 23:59:59 GMT
```
以上用例中，指定首部字段 Trailer 的值为 Expires ，在报文主体之后（分块长度0之后）出现的首部字段 Expires。
### Transfer-Encoding
Transfer-Encoding 规定了传输报文主体时采用的编码方式
```js
HTTP/1.1 200 OK
Date: Thu, 05 Jul 2018 11:10:37 GMT
Cache-Control: public, max-age=604800
Content-Type: text/javascript; charset=utf-8
Expiress: Thu, 05 Jul 2018 11:12:13 GMT
X-Frame-Option: DENY
X-XSS-Protection: 1; mode=block
Content-Encoding: gzip
Transfer-Encoding: chunked
Connection: keep-alive
```
```js
cf0  ←16进制（10进制为3312）

· · · 3312字节分块数据 · · ·

392  ←16进制（10进制为914）

· · · 914字节分块数据 · · ·

0
```
以上用例中，正如在首部字段 Transfer-Encoding 中指定的那样，有效使用分块传输编码，且分别被分成 3312 字节和 914 字节大小的分块数据
### Upgrade
Transfer-Encoding 用于检测HTTP协议及其其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议

>客户端=>Upgrade: TLS/1.0；Connection:Upgrade=>服务端=>Upgrade: TLS/1.0, HTTP/1.1；Connection:Upgrade

上面用例中，首部字段 Upgrade 指定的值为 TLS/1.0 。请注意此处两个字段首部字段的对应关系，Connection 的值被指定为 Upgrade 。Upgrade 首部字段产生作用的 Upgrade 对象仅限于客户端和邻接服务器之间。因此，使用首部字段 Upgrade 时，还需要额外指定 Connection: Upgrade 。
对于附有首部字段 Upgrade 的请求，服务器可用 101 Swiching Protocols 状态码作为响应返回。
### Via
>客户端=>GET / HTTP/1.1=>代理服务器A=>GET / HTTP/1.1=>代理服务器B=>Via: 1.0 gw.example.com(Squid/3.1)

上图用例中，在经过代理服务器 A 时，Via 首部附加了 “1.0 gw.example.com(Squid/3.1)”这样的字符串值。行头的1.0是指接受请求的服务器上应用的HTTP版本协议。接下来经过，若果存在更多的代理服务器亦是如此，在 Via 首部附加服务器信息，也可增加 1 个新的 Via 首部写入服务器信息。
Via 首部是为了追踪传输路径，所以经常会和 TRACE 方法一起使用。比如，代理服务器接受到由 TRACE 方法发送过来的请求（其中 Max-Forwards: 0）时，代理服务器就不能再转发该请求了。这种情况下，代理服务器会将自身的信息附加到 Via 首部后，返回该请求的响应。
### Warning
HTTP/1.1 的 warning 首部是从 HTTP/1.0 的响应首部（Retry-After）演变过来。该首部通常会告知用户一些与缓存相关的的问题的警告。
```js
Warning: 113 gw.example.com:8080 "Heuriostic expiration" Tue, 03 Jul 2012 05:09:44 GMT
```
Warning 首部的格式如下。最后的日期时间部分可省略。
```js
Warning: [警告码] [警告的主机 : 端口号] "[警告内容]" ([日期时间])
```
HTTP/1.1 中定义了7种警告。警告码对应的警告内容仅推荐参考。另外，警告码具有扩展性，今后有可能追加新的警告码。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210114525920.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
## 6.4 请求首部字段
### Accept
Accept首部字段可通知服务器,用户代理能够处理的媒体类型及媒体类型的相对优先级.
```js
Accept: text/html , application/xhtml+xml , application/xml ; q=0.9 , */* ; q=0.8
```
#### 文本文件类型
- text/html
- text/plain
- text/css
- application/xhtml+xml
- appliaction/xml
......
#### 图片文件类型
- image/jpeg
- image/gif
- image/png
......
#### 视频文件类型
- video/mpeg
- video/quicktime
.....
#### 应用程序使用的二进制文件
- application/octet-strea
- application/zip

比如，游览器不支持PNG图片的显示，那 Accept 就不指定 image/png ，而指定可处理的 image/gif 和 image/jpeg 等图片类型。

若想要给显示的媒体类型增加优先级，则使用 q= 来额外表示权重值，用分号（；）进行分隔。权重值 q 的范围是 0-1（可精确到小数点后3位），且1为最大值。不指定权重 q 值时，默认权重为 q=1.0。
当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。

### Accept-Charset
accept-charset首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序.另外,可一次性指定多种字符集.与首部字段accept相同的是可用权重q值来表示相对优先级.
```js
Accept-Charset: utf-8, iso-8859-1;q=0.5
```
### Accept-Encoding
Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。
```js
Accept-Encoding: gzip, deflate
```
1.gizp

由文件压缩程序 gzip（GUN zip）生成的编码格式（RFC1952），采用 Lempel-Ziv 算法（LZ77）及32位循环冗余校验（Cyclic Redundancy Check，通称 CRC）

2.compress

由 UNIX 文件压缩程序 compress 生成的编码格式，采用 Lempel-Ziv-Welch 算法（LZW）

3.deflate

组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。

4.identity

不执行压缩或不会变化的默认编码格式。

采用权重 q 来进行表示相对优先级，与首部字段 Accept 相同，另外，也可以使用星号（*）作为通配符，指定任意的编码格式。

### Accept-Language
Accept-Language用来告知服务器用户代理能够处理的自然语言集（指中文或者英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集
```js
Accept-Language: zh-cn, zh; q=0.7, en-us,en; q=0.3
```
采用权重 q 来进行表示相对优先级，与首部字段 Accept 相同，在上述例子中，客户端在服务器有中文版资源的情况下，会请求其返回中文版对象的响应，没有中文版时，则请求返回英文版响应。

### Authorization
Authorization 是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接受到返回的401状态码响应后，把首部字段 Authorization 加入请求中。公众缓存在接受到含有 Authorization 首部字段的请求时的操作处理会略有差异。

>客户端=>GET /index.html=>服务器=>401 Unauthorized;WWW-Authenticate: Basic ...
>客户端=>GET /index.html=>Authorization: Basic dWVub3N1bjpwYXHzd29yZA==;200 OK

```js
Authorization: Basic dWVub3N1bjpwYXHzd29yZA==
```
有关HTTP访问认证及 Authorization 首部字段，稍后的章节会有详细说明。另外，也可以参阅[RFC2616](https://tools.ietf.org/html/rfc2616)。

### Expect
Expect 是客户端用来告知服务器，期望出现的某种特定行为。因服务器无法理解客户端的期望作出回应而发生错误时，会返回状态码 417 Expectation Failed。
```js
Expect: 100-continue
```
客户端可以利用该首部字段，写明所期望的扩展。虽然 HTTP/1.1 规范只定义了 100-continue（状态码 100 Continue 之意）。
等待状态码 100 响应的客户端在发生请求时，需要指定 Expect: 100-continue 。
### Form
From 是用来告知服务器使用用户代理的用户的电子邮件地址。
```js
From: info@example.com
```
通常，其使用目的就是为了显示搜索引擎等用户代理的负责人的电子邮件联系方式。使用代理时，应尽可能包含 From 首部字段（但可能会因代理不同，将电子邮件地址记录在 User-Agent 首部字段中）。
### Host
- Host 是用来告知服务器，请求的资源所处的互联网主机名和端口号。
- Host 首部字段是 HTTP/1.1 规范内是唯一一个必须被包含在请求内的首部字段。
```js
Host: www.example.com
```
首部字段 Host 和以单台服务器分配多个域名的虚拟主机的工作及制有密切的关联，这是首部字段 Host 必须存在的意义。
请求被发送至服务器时，请求中的主机名会用 IP 地址直接替换解决。但如果这时，相同的 IP 地址下部署运行着多个域名时，那么服务器就会无法理解究竟是哪个域名对应的请求。因此，就需要使用首部字段 Host 来明确指出请求的主机名。若服务器未设定主机名，那直接发送一个空值即可。
```js
Host: 
```
### If-Match
形如 If-xxx 这样的请求首部字段，都可以称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。
只有当 If-Match 的字段值跟 ETge 值匹配一致时，服务器才会处理这个请求。
```js
If-Match: "123456"
```
首部字段 If-Match ，属附带条件之一，它会告知服务器匹配资源所用的实体标记（ETge）值。这时的服务器无法使用弱 ETge 值。
服务器会对比 If-Match 的字段值和资源的 ETge 值，仅当两者一致时，才会执行请求。反之，则返回状态 412 Precondition Failed 的响应。
还可以使用星号（*）指定 If-Match 的字段值。针对这种情况，服务器将会忽略 ETge 的值，只有资源存在就处理请求
### If-Modified-Since
If-Modified-Since 字段指定的日期时间后，资源发生了更新，服务器会接受请求
```js
If-Modified-Since: Thu, 15 Apr 2018 00:00:00 GMT
```
首部字段 If-Modified-Since ，属附带条件之一，它会告知服务器若 If-Modified-Since 字段值早于资源的更新时间，则希望能处理该请求。而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified
If-Modified-Since 用于确认代理或客户端拥有本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段 Last-Modified 来确定
### If-None-Match
只有在 If-None-Match 的字段值与 ETge 值不一致时，可处理该请求。与 If-Match 首部字段的作用相反
```js
If-None-Match: *
```
首部字段 If-None-Match 属于附带条件之一。它和首部字段 If-Match 作用相反。用于指定 If-None-Match 字段值的实体标记（ETge）值与请求资源的 ETge 不一致时，它就会告知服务器处理该请求。
在 GET 和 HEAD 方法中使用首部字段 If-None-Match 可获取最新的资源。因此，这与使用首部字段 If-Modified-Since 时有些类似。
### If-Range
If-Range 字段值若是更 ETge 值或更新日期时间一致，那么就作为范围请求处理。若不一致，则忽略范围请求，返回全部资源。
首部字段 If-Range 属于附带条件之一。它告知服务器若指定 If-Range 字段值（与 ETge 值或者时间）和请求资源的 ETge 值或时间相一致时，则作为范围请求处理。反之，则返回全体资源。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210134356447.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
服务器端的资源如果更新，那客户端持有资源中的一部分也会随之无效，当然，范围请求作为前提也是无效的。这时，服务器会暂且以状态码 412 Precondition Failed 作为响应返回，其目的是催促客户端再次发送请求。这样一来，与使用首部字段 If-Range 比起来，就需要花费两倍功夫。
### If-Unmodified-Since
```js
If-Unmodified-Since: Thu, 03 Jul 2018 00:00:00 GMT
```
首部字段 If-Unmodified-Since 和首部字段 If-Modified-Since 的作用相反。它的作用就是告知服务器，指定的请求资源只有在字段值内定的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码 412 Precondition Failed 作为响应返回。
### Max-Forwards
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210134544529.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
每次转发数值减一，当数值为0时，则返回响应
```js
Max-Forwards: 2
```
1.通过 TRACE 方法或 OPTIONS 方法，发送含有首部字段 Max-Forwards 的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，会将 Max-Forwards 的值减一后重新赋值。当服务器接收到 Max-Forwards 值为 0 的请求时，则不再进行转发。而是直接返回响应。

2.使用 HTTP协议通信时，请求可能会经过代理等多台服务器。途中，如果代理服务器由于某些原因导致请求转发失败，客户端也就等不到服务器返回的响应了。对此，我们无从可知。

3.可以灵活使用首部字段 Max-Forwards 字段值为 0 ，服务器就会立即返回响应，由此我们至少可以对以那台服务器为终点的传输路径的通信状况有所把握

### Proxy-Authorization
```js
Proxy-Authorization: Basic YWRtaW4lM0FhZG1pbg==
```
接受到从代理服务器发来的认证质询时，客户端会发送包含首部字段 Proxy-Authorization 的请求，以告知服务器认证所需要的信息。
这个行为是与客户端和服务器之间的HTTP访问认证相类似的，不同之处在于，认证行为发生在客户端与代理之间。客户端与服务器之间的认证，使用首部字段 Authorization 可起到相同作用。

### Range
```js
Range: bytes=5001-10000
```
1.对于只需获资源的范围请求，包含首部字段 Range 即可告知服务器资源的指定范围。上面的示例表示请求获取从第 5001 字节到第 10000 字节的资源。

2.接收到附带 Range 首部字段请求的服务器，会在处理请求之后返回状态码为 206 Partial Content 的响应。无法处理该范围请求时，则会返回状态码 200 OK 的响应及全部资源。

### Referer
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210134903458.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
只要查看 Referer 就能知道请求的 URI 是从哪个 Web 页面发起的
```js
Referer: http://www.example.com/index.html
```
1.客户端一般都会发送 Referer 首部字段给服务器。但当直接在游览器的地址输入 URI ，或处于安全考虑时，也可以不发送该首部字段。
2.因为原始资源的 URI 中的查询字符串可能包含 ID 或密码等保密信息，要是写进 Referer 转发给其他服务器，则有可能导致保密信息的泄露。
### TE
```js
TE: gzip, deflate; q=0.5
```
首部字段 TE 会告知服务器客户端能够处理响应的传输编码方式及相对优先级。它和首部字段 Accept-Encoding 的功能很像，但是用于传输编码。
首部字段 TE 除指定传输编码之外，还可以指定伴随 trailer 字段的分块传输编码的方式。应用后者时，只需把 trailer 赋值给该字段值。
```js
TE: trailers
```
### User-Agent
```js
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36
```

1.首部字段 User-Agent 会将创建请求的游览器和用户代理名称等信息传达给服务器。

2.由网络爬虫发起请求时，有可能会在字段内添加爬虫的电子邮件地址。此外，如果经过代理，那么中间也很可能被添加上代理服务器的名称。
## 6.5 响应首部字段
### Accept-Ranges
```js
Accept-Ranges: bytes
```
当不能进行范围请求处理时
```js
Accept-Ranges: none
```
首部字段 Accept-Ranges 是用来告知客户端服务器是否能处理范围请求，以指定获取服务器某个部分资源。
可指定的字段值有两种，可处理范围请求时指定其为 bytes ，反之则指定为 none。
### Age
```js
Age: 600
```
1.首部字段 Age 能告知客户端，源服务器在多久前创建了响应。字段值单位为秒。

2.若创建该响应的服务器是缓存服务器，Age 值是指缓存后的响应再次发起认证到认证完成的时间值。代理创建响应时必须加上首部字段 Age。

### ETge
```js
ETge: "fa082-57b5144e55180"
```
1.首部字段 ETge 能够告知客户端实体标识。它是一种可将资源以字符串形式做唯一标识的方式。服务器会为每份资源分配对于的 ETge 
2.当资源更新时，ETge 值也需要更新。生成 ETge 值时，并没有统一的算法规则，而是仅仅由服务器来分配。
#### 强ETge值和弱ETge值
1.强 ETge 值
强 ETge 值，不论实体发生多少细微的变化都会改变其值
```js
ETge: "usagi-1234"
```
2.弱 ETge 值
弱 ETge 值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变 ETge 值。这时，会在字段值最开始处附加 W/ 。
```js
ETge: W/"usagi-1234"
```
### Localtion
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210135808771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
使用首部字段 Location 可以将响应接受方引导至某个与请求 URI 位置不同的资源。
基本上，该字段会配合 3xx : Redirection 的响应，提供重定向的 URI。
几乎所有的游览器在接受到包含首部字段 Location 的响应后，都会强制性地尝试对已提示的重定向资源的访问。
### Proxy-Authenticate
```js
Proxy-Authenticate: Basic realm="Usagidesign Auth"
```
首部字段 Proxy-Authenticate 会把由代理服务器所要求的认证信息发送给客户端。
它与客户端和服务器之间的 HTTP 访问认证的行为相似，不同之处在于其认证行为是在客户端与代理之间进行的。而客户端与服务器之间进行认证时，首部字段 WWW-Authorization 有着相同的作用。
### Retry-After
```js
Retry-After : 120
```
首部字段 Retry-After 告知客户端应该在多久之后再次发送请求。主要配合状态码 503 Service Unavailable 响应，或 3xx Redirect 响应一起使用。
字段值可以指定为具体时间（Wed, 04 Jul 2012 06: 34: 23 GMT 等格式），也可以是创建响应后的秒数。
### Server
```js
Server : Apache/2.2.17 (Unix)
```
首部字段 Server 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息。不单单会标出服务器上的软件应用名称，还有可能包含版本号和安装时启用的可选项。
```js
Server: Apache/2.26 (Unix) PHP/5.2.5
```
注意一点，一旦自己服务器使用的为旧版本，并且漏洞已经被放出来的，最好在隐藏此字段或者自己随意改个名称，以防有人使用已知漏洞攻击服务器
### Vary
```js
Vary: Accept-Language
```
首部字段 Vary 可对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的指令。
从代理服务器接受到源服务器返回包含 Vary 指定项的响应之后，若再要进行缓存，仅对请求中含有相同 Vary 指定首部字段的请求返回缓存。即使对相同资源发起请求，但由于 Vary 指定的首部字段不相同，因此必须要从源服务器重新获取资源。
### WWW-Authenticate
```js
WWW-Authenticate: Basic realm="Usagidesign Auth"
```
首部字段 WWW-Authenticate 用于 HTTP 访问认证。它会告知客户端适用于访问请求 URI 所指定资源的认证方案（ Basic 或是 Digest ）和带参数提示的质询（challenge）。状态码 401 Unauthorized 响应中，肯定带有首部字段 WWW-Authenticate 。
## 6.6 实体首部字段
### Allow
```js
Allow : GET,HEAD
```
首部字段 Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。 当服务器接收到不支持的 HTTP 方法时，会以状态码 405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。
### Content-Encoding
```js
Content-Encoding: gzip
```
首部字段 Content-Encoding 会告知客户端服务器对实体的主体部分选用的内容编码方式。内容编码是指在不丢失实体信息的前提下所进行的压缩。
主要采用以下4种方式：
- gzip
- compress
- deflate
- identity
### Content-Language
```js
Content-Language: zh-CN
```
首部字段 Content-Language 会告知客户端，实体主体使用的自然语言（指中文或英文等语言）。
### Content-Length
```js
Content-Length: 15000
```
首部字段 Content-Length 表明了实体主体部分的大小（单位是字节）。对实体主体进行内容编码传输时，不能再使用 Content-Length 首部字段。由于实体主体大小的计算方式略微有些复杂，所以在此不再展开。若想一探究竟，可参考 RFC2616 的 4.4 。
### Content-Location
```js
Content-Location: httpo://www.example.com/index.html
```
首部字段 Content-Location 给出与报文主题部分相对应的URI。和首部字段 Location 不同， Content-Location 表示的是报文主体返回资源对应的 URI。
比如，对于使用首部字段 Accept-Language 的服务器驱动型请求，当返回的页面内容与实际请求的对象不同时，首部字段 Content-Location 内会写明 URI。（访问 http://www.example.com/ 返回的对象却是 http://www.example.com/index.html 等类似情况）。
### Content-MD5
```js
Content-MD5: ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U=
```
1.首部字段 Content-MD5 是一串由MD5算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达。

2.对报文主体执行 MD5 算法获得218位二进制数，再通过 Base64 编码后将结果写入 Content-MD5 字段值。由于 HTTP 首部无法记录二进制值，所以要通过 Base64 编码处理。为确保报文有效性，作为接受方的客户端会对报文主体在执行一次相同的MD5算法。计算出的值与字段值作比较候鸟，即可判断出报文主体的准确性。

3.采用这种方法，对内容上的偶发生性改变是无从查证的，也无法检测出恶意篡改。其中一个原因在于，内容如果能够被篡改，那么同时意味着 Content-MD5 也可重新计算然后被篡改。所以处在接受阶段的客户端是无法意识到报文主体以及首部字段 Content-MD5 是已经被篡改过的。
### Content-Range
```js
Content-Range: bytes 5001-10000/10000
```
针对范围请求，返回响应时使用的首部字段 Content-Range ，能告知客户端作为响应返回的实体哪个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小。
### Content-Type
```js
Content-Type: text/html; charset=utf-8
```
首部字段 Content-Type 说明实体主体内对象的媒体类型。和首部字段 Accept 一样，字段值用 type/subtype 形式赋值。
### Expires
```js
Expires: Wed, 04 Jul 2012 08:26:05 GMT
```
首部字段 Expires 会将资源失效日期告知客户端。缓存服务器在接收到含有首部字段 Expires 的响应后，会以缓存来应答请求，在 Expires 字段值指定的时间之前，响应的副本会一直被保存。当超过指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求资源。
源服务器不希望缓存服务器对资源缓存时，最好在 Expires 字段内写入与首部字段 Date 相同的时间值。
但是，当首部字段 Cache-Control 有指定 max-age 指令时，比起首部字段 Expires ，会优先处理 max-age 指令
### Last-Modified
```js
Last-Modified: wed, 25 May 2018 09:11:40 GMT
```
首部字段 Last-Modified 指明资源最终修改时间。一般来说，这个值就是 Request-URI 指定资源被修改的时间。但类似使用 CGI 脚本进行动态数据处理时，该值有可能会变成数据最终修改时的时间。
## 6.7 为Cookie服务的首部字段
### Set-Cookie
```js
Set-Cookie: status-enable; expires=Tue, 05 Jul 2018 02:01:22 GMT; path=/; domain=.example.com;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210141330842.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### expires 属性
Cookie 的 expires 属性指定游览器可发送 Cookie 的有效期。
当省略 expires 属性时，其有效期仅限于维持游览器会话（Session）时间段内。这通常限于游览器应用程序被关闭之前。
另外，一旦 Cookie 从服务器端发送至客户端，服务器端就不存在可以显示删除 Cookie 的方法。但可以通过覆盖已过期的 Cookie ，实现对客户端 Cookie 的实质性删除操作。
#### path 属性
Cookie 的 path 属性可用于限制指定 Cookie 的发送范围的文件目录。不过另有办法避开这项限制，看来对其作为安全机制的效果不能报有期待。
#### domain 属性
通过 Cookie 的 domain 属性指定的域名可做到与结尾匹配一致。比如，当指定 example.com 后，除 example.com 以外，www.example.com 或 www2.example.com 等都可以发送 Cookie 。
因此，除了针对具体指定的多个域发送 Cookie 之外，不指定 domain 属性显得更安全
#### secure 属性
Cookie 的 secure 属性用于限制 web 页面仅在 HTTPS 安全连接时，才可以发送 Cookie 。
发送 Cookie 时，指定 secure 属性的方法如下所示。
```js
Set-Cokkie: name=VALUE; secure
```
#### HttpOnly 属性
Cookie 的 HttpOnly 属性是 Cookie 的扩展功能，它使 JavaScript 脚本无法获得 Cookie 。其主要目的为防止跨站脚本攻击（Cross-sitescripting，XSS）对 Cookie 的信息窃取。
发送指定 HttpOnly 属性的 Cookie 的方法如下所示。
```js
Set-Cookie: name=value; HttpOnly
```
### Cookie
```js
Cookie: status=enable
```
首部字段 Cookie 会告知服务器，当客户端想获得 HTTP 状态管理支持时，就会在请求中包含从服务器接受到的 Cookie 。接受到多个 Cookie 时，同样可以以多个 Cookie 形式发送。
## 6.8 其他首部字段
#### X-Frame-Options
```js
X-Frame-Options: DENY
```
首部字段 X-Frame-Options 属于 HTTP 响应首部，用于控制网站内容在其他 web 网站的 Frame 标签内显示问题。其主要目的是为了防止点击劫持（clickjacking）攻击。
首部字段 X-Frame-Options 有以下两个可指定的字段值。
- DENY,拒绝
- SAMEORIGIN,仅同源域名下的页面（Top-level-browsing-context）匹配时许可。

支持该首部字段的游览器有：Internet Explorer 8、Firefox 3.6.9+、Chrome 4.1.249.1042+、Safari 4+ 和 Opera 10.50+ 等。现在主流的游览器都已经支持。
能在所有的 web 服务端预先设定好 X-Frame-Options 字段值是最理想的状态。
#### X-XSS-Protection
```js
X-XSS-Protection: 1
```
首部字段 X-XSS-Protection 属于 HTTP 响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制游览器 XSS 防护机制的开关。
首部字段 X-XSS-Protection 可指定的字段值如下：
0：将 XSS 过滤设置成无效状态
1：将 XSS 过滤设置成有效状态
#### DNT
```js
DNT: 1
```
首部字段 DNT 属于HTTP 请求首部，其中 DNT 是 Do Not Track 的简称，意为拒绝个人信息被手机，是表示拒绝被精准广告追踪的一种方法。
首部字段 DNT 可指定的字段值如下。

0：同意被追踪
1：拒绝被追踪
由于首部字段 DNT 的功能具备有效性，所以 web 服务器需要对 DNT 做出对应的支持。
#### P3P
```js
P3P: CP="CAO DSP LAW CURa ADMa DEVa TAIa PSAa PSDa IVAa IVDa OUR BUS IND UNI COM NAV INT"
```
首部字段 P3P 属于HTTP响应首部，通过利用P3P ( The Platform
for Privacy Preferences,在线隐私偏好平台)技术，可以让Web网站上
的个人隐私变成种仅供程序可理解的形式， 以达到保护用户隐私的
目的。

要进行 P3P的设定，需按以下步骤进行。

步骤一：创建 P3P 隐私
步骤二：创建 P3P 隐私对照文件后，保存命名在 /w3c/p3p.xml
步骤三：从 P3P 隐私中新建 Compact policies 后，输出到 HTTP 响应中


[参考链接](https://www.kancloud.cn/spirit-ling/http-study/935040)

