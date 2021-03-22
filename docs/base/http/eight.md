# 8 确认访问用户身份的认证
## 8.1何为认证
### 定义
弄清楚是谁在访问服务器
### 认证方式
- BASIC认证(基本认证)
- DIGEST认证(摘要认证)
- SSL客户端认证
- FormBase认证(基于表单认证)
## 8.2 BASIC认证
### 认证步骤
步骤一: 
当请求的资源需要BASIC认证时,服务器会随状态码401Authorization Requires,返回带WWW-Authenticate首部字段的响应.

步骤二: 
接收到状态码401的客户端为了通过BASIC认证,需要将用户ID及密码发送给服务器.发送的字符串内容是由用户ID和密码构成,两者中间以冒号(:)连接后,在经过Base64编码处理.

步骤三:
接收到包含首部字段Authorization请求的服务器,会对认证信息的正确性进行验证.如果验证通过,则返回一条资源响应.
### 缺点
- 不安全
- 不灵活

### 代码实现
```
var http=require('http');
http.createServer(function(req,res){
    var author=req.headers['authorization'];
    
    if(author){
        var area=author.slice(6);
        var parts= new Buffer(area,'base64').toString().split(':');

        if(parts[0]==parts[1]){
            res.write("welcome");
            res.end();
        }else{
            res.setHeader('WWW-Authenticate','Basic realm="Secure Area"');
            res.writeHead(401);
            return  res.end();
        }
    }else{
        res.setHeader('WWW-Authenticate','Basic realm="Secure Area"');
        res.writeHead(401);
       return  res.end();
    }
    if(req.url!='/favicon.ico'){
        var filename=req.url.slice(1);
        res.end();
    }
}).listen(8999);
```
## 8.3 DIGEST认证
### 背景
弥补BASIC认证存在的问题
### 认证步骤
步骤一:
	请求需认证的资源时,服务器会随着状态码401Authorization Required,返回带WWW-Authenticate首部字段的响应.该字段内包含质问响应方式认证所需的临时质询码(随机数,nonce).
	首部字段WWW-Authenticate内必须包含realm和nonce这两个字段信息.客户端就是依靠向服务器回送这两个值进行认证的.
	nonce是一种每次随返回的401响应生成的任意随机字符串.该字符串通常推荐由Base64编码的十六进制的组成形式,但实际内容依赖服务器的具体实现.
步骤二:
接收到401状态码的客户端,返回的响应中包含DIGEST认证必须的首部字段Authorization信息.
首部字段Authorization内必须包含username,realm,nonce,uri和response的字段信息.其中,realm和nonce就是之前从服务器接收到的响应中的字段.
步骤三:
接收到包含首部字段Authorization请求的服务器,会确认认证信息的正确性
### 优缺点
- 高于BASIC认证的安全等级,但是与https客户端认证相比还是很弱
- 使用上不那么便捷灵活,达不到web网站高度安全等级的追求标准

## 8.4 SSL客户端认证
为达到 SSL 客户端认证的目的，需要事先将客户端证书分发给客户端，且客户端必须安装此证书。

步骤 1： 接收到需要认证资源的请求，服务器会发送 Certificate Request 报文，要求客户端提供客户端证书。

步骤 2： 用户选择将发送的客户端证书后，客户端会把客户端证书信息以 Client Certificate 报文方式发送给服务器。

步骤 3： 服务器验证客户端证书验证通过后方可领取证书内客户端的公开密钥，然后开始 HTTPS 加密通信。

## 8.5 基于表单认证
客户端会向服务 器上的 Web 应用程序发送登录信息（Credential），按登录信息的验证结果认证。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210108131115648.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
Session 管理和 Cookie 状态管理
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210108131137103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
步骤 1： 客户端把用户 ID 和密码等登录信息放入报文的实体部分， 通常是以 POST 方法把请求发送给服务器。而这时，会使用 HTTPS 通信来进行 HTML 表单画面的显示和用户输入数据的发送。

步骤 2： 服务器会发放用以识别用户的 Session ID。通过验证从客户 端发送过来的登录信息进行身份认证，然后把用户的认证状态与 Session ID 绑定后记录在服务器端。

步骤 3： 客户端接收到从服务器端发来的 Session ID 后，会将其作为 Cookie 保存在本地。下次向服务器发送请求时，浏览器会自动发送 Cookie，所以 Session ID 也随之发送到服务器。服务器端可通过验证 接收到的 Session ID 识别用户和其认证状态。


