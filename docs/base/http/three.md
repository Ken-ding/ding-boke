# HTTP报文内的HTTP信息
## HTTP报文
### 类型
- 请求报文
- 响应报文
### 请求报文
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115165715410.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
#### 请求行

方法字段,URL字段和HTTP协议版本字段,其中方法字段严格区分大小写,都采用大写方式

##### 方法字段
①GET:请求获取Request-URI(URI:通用资源标识符,URL是其子集，URI注重的是标识，而URL强调的是位置，可以将URL看成原始的URI),所标识的资源

②POST：在Request-URI所标识的资源后附加新的数据；支持HTML表单提交，表单中有用户添入的数据，这些数据会发送到服务器端，由服务器存储至某位置（例如发送处理程序）

③HEAD:请求Request-URI所标识的资源响应消息报头，HEAD方法可以在响应时不返回消息体。

④PUT：与GET相反，请求服务器存储一个资源，并用Request-URI做为其标识；例如发布系统。

⑤DELETE：请求删除URL指向的资源

⑥OPTIONS：请求查询服务器的性能，或者查询与资源相关的选项
⑦TRACE：跟踪请求要经过的防火墙、代理或网关等，主要用于测试或诊断

⑧CONNECT保留将来使用

##### URL
一个完整的包括类型、主机名和可选路径名的统一资源引用名，如：http://www.example.com/path/to/file.html
#### 请求头部
请求头部为请求报文添加了一些附加信息，由“名/值”对组成，每行一对，名和值之间使用冒号分隔
常见请求头部:
| 请求头 |  说明|
|--|--|
| Host | 接受请求的服务器地址，可以是IP:端口号，也可以是域名 |
| User-Agent | 发送请求的应用程序名称 |
| Connection:Keep | 指定与连接相关的属性，如Connection:Keep-Alive |
|Accept-Charset | 通知服务端可以发送的编码格式 |
|Accept-Encoding | 通知服务端可以发送的数据压缩格式 |
|Accept-Language | 通知服务端可以发送的语言 |

请求头部的最后会有一个空行，表示请求头部结束，接下来为请求正文，这一行非常重要，必不可少
#### 请求正文
可选部分，比如GET请求就没有请求正文
GET请求示例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118130947482.png#pic_center)
POST请求示例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118131013728.png#pic_center)
### 响应报文
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115165837257.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
#### 状态行
由3部分组成，分别为：协议版本，状态码，状态码描述，之间由空格分隔
状态码为3位数字：
 - 100~199的状态码是HTTP/1.1向协议中引入了信息性状态码,服务端出错
 - 200~299的状态码表示成功；
 - 300~399的状态码指资源重定向；
 - 400~499的状态码指客户端请求出错；
 - 500~599的状态码指服务端出错

 常遇到的状态码说明：
 
| 状态码 | 状态码描述 |简要说明|
|--|--|--|
| 200 | OK | 客服端请求成功,信息在返回的响应报文|
|201|created|请求已经被实现,而且有一个新的资源已经依据请求的需要而创建,且URI已经随Location头信息返回|
|301|	Moved Permanently|被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个URI之一|
|302|Found|在响应报文中使用首部“Location: URL”指定临时资源位置|
|304|Not Modified|条件式请求中使用|
|403|Forbidden|请求被服务器拒绝|
|400|Bad Reques|一个通用差错代码，指示该请求不能被服务器理解|
|404|Not Found|服务器无法找到请求的URL|
|405|Method Not Allowed|不允许使用此方法请求相应的URL|
|500|Internal Server Erro|服务器内部错误|
|502|Bad Gateway|代理服务器从上游收到了一条伪响应|
|503|Service Unavailable|服务器此时无法提供服务，但将来可能可用|
|505|HTTP Version Not Supported|服务器不支持，或者拒绝支持在请求中使用的HTTP版本。这暗示着服务器不能或不愿使用与客户端相同的版本。响应中应当包含一个描述了为何版本不被支持以及服务器支持哪些协议的实体。|

#### 首部行
与请求头部类似，为响应报文添加了一些附加信息
常见响应头部如下：
| 响应头 | 说明 |
|--|--|
| server | 服务器应用程序软件的名称和版本 |
|Content-Type|响应正文的类型（是图片还是二进制字符串）|
|Content-Length|响应正文长度|
|Content-Charset|响应正文使用的编码|
|Content-Encoding|响应正文使用的数据压缩格式|
|Content-Language|响应正文使用的语言|
响应示例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118132827142.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
### 特别介绍一下请求首部
一般有4种首部,分别是:通用首部,请求首部,响应首部和实体首部
#### 通用首部
请求和响应都可以使用的

Connection：定义C/S之间关于请求/响应的有关选项
对于http/1.0, Connection: keep-alive
Via: 显示了报文经过的中间节点
Cache-Control: 缓存指示
#### 请求首部
Host: 请求的主机名和端口号，虚拟主机环境下用于不同的虚拟主机
Referer：指明了请求当前资源的原始资源的URL
User-Agent: 用户代理，使用什么工具发出的请求

1、Accept首部：用户标明客户自己更倾向于支持的能力
Accept: 指明服务器能发送的媒体类型
Accept-Charset: 支持使用的字符集
Accept-Encoding: 支持使用的编码方式
Accept-Language: 支持使用语言

2、条件请求首部：
Expect: 告诉服务器能够发送来哪些媒体类型
If-Modified-Since: 是否在指定时间以来修改过此资源
If-None-Match:如果提供的实体标记与当前文档的实体标记不符，就获取此文档
跟安全相关的请求首部：
Authorization: 客户端提交给服务端的认证数据，如帐号和密码
Cookie: 客户端发送给服务器端身份标识
#### 响应首部
ate标头：消息产生的时间

Age标头:（从最初创建开始）响应持续时间

Server标头: 向客户端标明服务器程序名称和版本

ETage标头：不透明验证者

Location标头：URL备用的位置

Content-Length标头：实体的长度

Content-Tyep标头：实体的媒体类型

协商首部：
Accept-Ranges: 对当前资源来讲，服务器所能够接受的范围类型
Vary: 首部列表，服务器会根据列表中的内容挑选出最适合的版本发送给客户端
跟安全相关的响应首部：
Set-Cookie: 服务器端在某客户端第一次请求时发给令牌
WWW-Authentication: 质询，即要求客户提供帐号和密码
#### 实体首部
实体主体用于POST方法中。用户向Web服务器提交表单数据的时候，需要使用POST方法，此时主体中包含用户添写在表单的各个属性字段的值，当Web服务器收到POST方法的HTTP请求报文后，可以从实体中取出需要的属性字段的值。

也就是说，当用户通过Web浏览器向Web服务器发送请求时,Web浏览器会根据用户的具体请求来选择不同的HTTP请求方法，再将相应的URL和HTTP协议版本及相关的标头填入头部行中，若是POST方法，还会将相关的表单数据填入实体主体中，产生一个HTTP请求报文，然后将这个报文发送给Web服务器。
Location: 资源的新位置
Allow: 允许对此资源使用的请求方法
1、内容首部：
Content-Encoding：支持的编码
Content-Language：支持的自然语言
Content-Length：文本长度
Content-Location：资源所在位置
Content-Range：在整个资源中此实体表示的字节范围
Content-Type：主体的对象类型

## 编码提升传输速率
### 报文主体和实体主体
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118192101524.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)

如果把HTTP报文想像成因特网货运系统的箱子,那么HTTP实体就是报文中实际的货物
- 报文:是网络中交换和传输的数据单元,即站点一次性要发送的数据块.
- 实体:作为请求或响应的有效载荷数据(补充项)被传输,其内容由实体首部和实体主体组成
- 通常,报文主体等于实体主体.只有当传输中进行编码操作时,实体主体的内容发生变化,才导致它和报文主体产生差异
### 内容编码
- 内容编码是对报文的主体进行的可逆变换，是和内容的具体格式细节紧密相关的。
- http应用程序有时在发送之前需要对内容进行编码.例如,在把很大的html文档发送给通过慢速连接上来的客户端之前,服务器可能会对其进行压缩,这样有助于减少传输实体的时间.服务器还可以把内容搅乱或加密,以此来防止未授权的第三方看到文档的内容
- 这种类型的编码是发送方应用到内容之上的.当内容经过内容编码后,编好码的数据就是放在实体中,像往常一样发送给接收方

内容编码类型:
| 编码方式 | 描述 |
|--|--|
| gizp | 表明实体采用GNU zip编码|
|compress|表明实体采用Unix的文件压缩程序|
|deflate|表明实体采用zlib的格式压缩的|
|identity|表明没有对实体进行编码,当没有Content-Encoding首部字段时,默认采用此编码方式|

这是未启用压缩的请求大小为1.6KB,请求时间19ms
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118232158560.png#pic_center)
这是启用gizp压缩后的请求大小为991B,请求时间为14ms
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118232318575.png#pic_center)
上面的效果其实压缩的效果还是很大的将近一半的压缩量
常用的内容编码有以下几种:
- gzip
- compress
- deflate
- identity
- br

我测试的文件压缩效果:

原始数据1.6kb
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118233456197.png#pic_center)
br压缩700b
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118233604705.png#pic_center)
gizp压缩911b
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118233719130.png#pic_center)
deflate压缩904b
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118233913934.png#pic_center)
通过上面的数据可以清晰的知道每个压缩方式的情况

### 传输编码
[深入理解传输编码](https://blog.csdn.net/liuxiao723846/article/details/107433395)
### 发送多种数据的多部分对象集合
HTTP协议中也采纳了多部分对象集合，发送的一份报文主体可含有多类型实体。通常是在图片或者文本文件等上传时使用。

multipart/form-data:在web表单上传时使用

multipart/byteranges:状态码206响应报文包含了多个范围的内容时使用

在HTTP报文中使用多部分对象集合时，需要再首部字段加上Content-type。
### 获取部分内容的范围请求
以前用户不能使用现在这种高速带宽访问互联网，访问一个过大的图片时就很吃力了。如果下载中遇到网络中断，那就必须重头再来了。为了解决这个问题，需要一种可恢复的机制（断点续传）。

要实现该功能需要指定下载的实体范围。像这样，指定范围发送的请求叫做范围请求。
### 内容协商返回最合适的内容
同一个Web页面可能存在着多分相同内容的页面。比如英文和中文版的web页面，内容虽然相同，但使用的语言却不同。当浏览器默认为中文是，访问URI时，则对应中文web页面。这样的机制叫做内容协商。

内容协商机制：客户端和服务端就响应的资源内容进行交涉，然后提供给客户端最为适合的资源。内容协商会以响应资源的语言、字符集、编码方式等作为判断的基准。

内容协商技术有以下3种类型，

服务器驱动协商：由服务端进行内容协商。以请求的首部字段为参考，服务端自动处理。

客户端驱动协商：由客户端进行内容协商的方式。用户从浏览器显示的可选项列表中手动选择。

透明协商：是服务器驱动和客户端驱动的结合体，是由服务端和客户端各自进行内容协商的一种方法。
