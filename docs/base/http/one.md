# 图解HTTP
- [http协议访问web](#http协议访问web)
- [http历史](#http历史)
-  [TCP/IP协议族](#TCP/IP协议族)
-  [IP协议,TCP协议](#IP协议,TCP协议)
- [DNS服务](#DNS服务)
- [各种协议与HTTP协议关系](#各种协议与HTTP协议关系)
- [URI和URL](#URI和URL)

## http协议访问web
>你知道当我们在网页浏览器的地址栏中输入URL时,web页面是如何呈现的吗?

简化版:
 1. 浏览器输入URL并按下回车
 2. 浏览器查找当前URL是否存在缓存
 [弄懂HTTP缓存机制及原理](https://www.cnblogs.com/chenqf/p/6386163.html)
 3. 本地host文件查找,解析ip
 4. DNS域名解析
 [弄懂理解DNS原理及其解析过程](https://www.cnblogs.com/gopark/p/8430916.html)
 5. TCP连接
  [弄懂理解TCP连接](https://www.cnblogs.com/xpfeia/p/10885726.html)
 6. 发送HTTP请求
 7. 服务器接收并处理请求
 8. 浏览器接收响应
 9. TCP/IP关闭（四次挥手)
 10. 页面渲染 
   [弄懂浏览器渲染页面的原理及流程](https://www.cnblogs.com/chenyoumei/p/9156849.html)
  
## http历史
   
 1. 1989年3月,HTTP诞生
 2. HTTP/0.9与1990年问世,并没有作为的正式标准被建立
 3. 1996年5月HTTP/1.0标准被公布,记载于标准RFC1945
 [RFC1945](https://www.ietf.org/rfc/rfc1945.txt)
 4. 1997年1月公布HTTP/1.1,记载于标准RFC2616
 [RFC2616](https://www.ietf.org/rfc/rfc2616.txt)
5. HTTP 2.0在2013年8月进行首次合作共事性测试。在开放互联网上HTTP 2.0将只用于https://网址，而 http://网址将继续使用HTTP/1，目的是在开放互联网上增加使用加密技术，以提供强有力的保护去遏制主动攻击 
  [RFC7540](https://www.rfc-editor.org/rfc/rfc7540.txt)
 [RFC7541](https://www.rfc-editor.org/rfc/rfc7541.txt)
## TCP/IP协议族
### TCP/IP协议族和分层结构
<table>
	<tr>
	    <th>OSI七层模型</th>
	    <th>TCP/IP概念层模型</th>
	    <th>功能</th> 
	    <th>TCP/IP协议族</th>   
	</tr >
	<tr>
		<td>应用层</td>
		<td rowspan="3">应用层</td>
		<td>文件传输,电子邮件,文件服务,虚拟终端</td>
		<td>TFTP,HTTP,SNMP,FTP,SMTP,DNS,Telnet</td>
	</tr>
	<tr>
		<td>表现层</td>
		<td>数据格式化,代码转换,数据加密</td>
		<td>没有协议</td>
	</tr>
	<tr>
		<td>会话层</td>
		<td>解除或建立与别的接点的联系</td>
		<td>没有协议</td>
	</tr>
	<tr>
		<td>传输层</td>
		<td>传输层</td>
		<td>提供端对端的接口</td>
		<td>TCP,UDP</td>
	</tr>
	<tr>
		<td>网络层</td>
		<td>网络层</td>
		<td>为数据包选择路由</td>
		<td>IP,ICMP,RIP,OSPF,BGP,IGMP</td>
	</tr>
	<tr>
		<td>数据链路层</td>
		<td rowspan="2">物理层</td>
		<td>传输有地址的帧以及错误检测功能</td>
		<td>SLIP,CSLIP,PPP,ARP,RARP,MTU</td>
	</tr>
	<tr>
		<td>物理层</td>
		<td>以二进制数据形式在物理媒体上传输数据</td>
		<td>ISO2110,IEEE802,IEEE802.2</td>
	</tr>
</table>
像这样把与互联网相关联的协议集合起来总成为TCP/IP

### TCP/IP通信传输流
图一:
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020110410044873.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
图二:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201104103419856.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
流程:
 1. 在应用层,客户端创建HTTP请求
 2. 在传输层,把HTTP请求报文进行分割,打上标记序号及端口号
 3. 在网络层,添加通信目的地的MAC地址
 4. 服务端在链路层接受数据,按序往上层发送,一直到应用层.
### IP协议,TCP协议
#### 负责传输的IP协议
- 位于网络层,主要作用把各种数据包传送给对方
- 两个重要的的条件:IP地址和MAC地址
- IP间的通信依赖MAC地址,需要通过ARP协议解析MAC
[ARP协议分析](https://www.cnblogs.com/kylinos/p/8336245.html)
#### 确保可靠性的TCP协议
[Wireshark调试TCP三次握手流程](https://blog.csdn.net/ken_ding/article/details/109488343)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201104143133212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)

### DNS服务
DNS服务是和HTTP协议一样位于应用层的协议.它提供域名到IP地址之间的解析服务
[深入理解DNS](https://www.cnblogs.com/willLin/p/11887289.html)
### 各种协议与HTTP协议关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201104144135846.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
首先发给DNS服务器，进行域名解析，得到IP地址后生成针对目标Web服务器的HTTP请求报文，然后报文由TCP协议负责传输，为了方便通信，HTTP请求报文被分为报文段，然后每个报文段可靠的传输给对方，然后报文段由IP层负责一边中转一遍传送，服务器收到报文段后重组报文段，然后由应用层的HTTP协议处理请求的内容，请求的结果以 同样的方式进行回传。
### URI和URL
#### 统一资源标识符
URI是由某个协议方案表示的资源的定位标识符,当采用HTTP协议时,协议方案就是http,除此之外还有ftp,mailto,Telnet,file等,标准的uri协议方案有30种左右.

RFC3986列举了集中urI例子
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201104151154673.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
#### URI格式
```
格式：
	http://user:pass@www.example.com:80/home/index.html?age=11#mask
		http：协议方案名
	 user:pass：登录信息（认证）
	www.example.com：服务器地址
	80：端口号
	/home/index.html：文件路径
	age=11：查询字符串
	mask：片段标识符
协议方案名：
	http:、https:、ftp:等，在获取资源时要指定协议类型。
登录信息(认证)：
	指定用户名和密码作为从服务器端获取资源时必要的登录信息，此项是可选的。
服务器地址：
	使用绝对URI必须指定待访问的服务器地址。
服务器端口号：
	指定服务器连接的网络端口号，此项是可选的。
路径：
	指定服务器上的文件路径来定位特定资源。格式为: /home/index.html
参数：
	为应用程序提供访问资源所需的附加信息。
	例如：ftp://127.27.27.27/pub/pic;type=d
查询字符串：
	针对已指定的文件路径内的资源，可以使用查询字符串传入任意参数，此项是可选的。
片段标识符：
	通常可标记出以获取资源中的子资源(文档内的某一个位置)，此项是可选的。
```

