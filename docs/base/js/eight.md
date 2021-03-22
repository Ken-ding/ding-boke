# BOM
## window对象
- Window 对象是 JavaScript 层级中的顶层对象。
- Window 对象代表一个浏览器窗口或一个框架。
### 框架
#### window框架集合
| 集合 | 描述 |
|--|--|
| iframes | 存放Window 对象在窗口中框架或 iframe的集合, |
#### window对象属性
| 属性 | 描述 |
|--|--|
| closed | 返回窗口是否已被关闭 |
| defaultstatus | 设置或返回窗口状态栏中的默认文本|
| document | 对 Document 对象的只读引用,[参阅Document](https://www.w3school.com.cn/jsref/dom_obj_document.asp)|
| history | 对 History 对象的只读引用,[参阅History 对象](https://www.w3school.com.cn/jsref/dom_obj_history.asp)|
| innerheight | 返回窗口的文档显示区的高度|
| innerwidth | 返回窗口的文档显示区的宽度|
| length | 设置或返回窗口中的框架数量|
| location | 设置或返回窗口中的框架数量,[参阅 Location 对象](https://www.w3school.com.cn/jsref/dom_obj_location.asp)|
| name | 设置或返回窗口的名称|
| Navigator | 对 Navigator 对象的只读引用。[请参阅 Navigator 对象](https://www.w3school.com.cn/jsref/dom_obj_navigator.asp)|
| name | 设置或返回窗口的名称|
| opener | 返回对创建此窗口的窗口的引用|
| outerHeight | 返回窗口的外部高度|
| outerWidth | 返回窗口的外部宽度|
| pageXOffset |设置或返回当前页面相对于窗口显示区左上角的 X 位置。|
| pageYOffset | 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。|
| parent | 	返回父窗口|
| Screen | 对 Screen 对象的只读引用。[请参阅 Screen 对象](https://www.w3school.com.cn/jsref/dom_obj_screen.asp)|
| self | 返回对当前窗口的引用。等价于 Window 属性|
| status | 设置窗口状态栏的文本|
| top |返回最顶层的先辈窗口|
| window |window 属性等价于 self 属性，它包含了对窗口自身的引用|
| screenLeft screenTop screenX screenY |只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。IE、Safari 和 Opera 支持screenLeft 和 screenTop，而 Firefox 和 Safari 支持 screenX 和 screenY。|
#### Window 窗口位置
| 属性 | 浏览器 |兼容性|
|--|--|--|
| screeLeft | IE,Safari,Opera,Chrome |支持|
| screeTop | IE,Safari,Opera,Chrome |支持|
| screeX | Firefox,,safari,Chorome |支持|
| screeY | Firefox,,safari,Chorome |支持|

使用下列方法可以跨浏览器取得窗口左边和上变得位置
```js

var leftPos=(typeof window.screenLeft=="number")?window.screenLeft:screenX;

var topPos=(typeof window.screenTop=="number")?window.screenTop:screenY;

console.log(leftPos);
console.log(topPos);

```
#### 窗口大小
网页可见区域宽：document.body.clientWidth
网页可见区域高：document.body.clientHeight
网页可见区域宽：document.body.offsetWidth (包括边线的宽)
网页可见区域高：document.body.offsetHeight (包括边线的宽)
网页正文全文宽：document.body.scrollWidth
网页正文全文高：document.body.scrollHeight
网页被卷去的高：document.body.scrollTop
网页被卷去的左：document.body.scrollLeft
网页正文部分上：window.screenTop
网页正文部分左：window.screenLeft
屏幕分辨率的高：window.screen.height
屏幕分辨率的宽：window.screen.width
屏幕可用工作区高度：window.screen.availHeight
屏幕可用工作区宽度：window.screen.availWidth
#### 打开窗口
##### window.open
```js
oNewWindow = window.open( sURL , sName , sFeatures, bReplace)
```
oNewWindow：被打开的窗口的对象 

sUrl：被打开窗口的url 

- sName：在哪个窗口打开新的url链接，例如可以为_blank（新窗口）、_top（最外层窗口）,_self,_parent

- sFeatures：对窗口的一些控制属性  

	- fullscreen：是否为全屏模式（相当于F11的效果），可取值：yes/1、no/0 

	- directories：是否带有目录按钮（例如收藏夹中的'链接'目录），可取值同上 

	- location：是否带有地址栏，可取值同上 

	- channelmode：是否为影院模式，可取值同上 

	- menubar：是否带有菜单条，可取值同上 

	- resizable：是否可以改变窗口的尺寸，可取值同上 

	- scrollbars：是否带有滚动条，可取值同上 

	- status：是否带有状态栏，可取值同上 

	- titlebar：是否带有标题栏，可取值同上 

	- toolbar：是否带有快捷工具栏，可取值同上 

	- height：窗口高度 

	- width：窗口宽度 

	- top：距屏幕上边缘的距离 

	- left：距屏幕左边缘的距离 
	
- bReplace：如果在同一窗口打开新窗口，该值用于指定是否在history中替换原窗口的url链接，可取值：true/false 

#### location对象
##### 属性
| 属性 | 例子 |说明|
|--|--|--|
| hash | "#contents" |返回URL中的hash(#号后跟零或多个字符,如果URL中不包含散列,则返回空字符串|
|host|"www.test.com:80800"|返回服务器名称和端口号(如果有)|
|hostname|"www.test.com"|返回不带端口号的服务器|
|href|"http://www.test.com:8080/test"|返回当前加载页面的完整URL,toString()方法也返回这个值|
|pathname|"/test"|返回URL中的目录和文件名|
|port|"8080"|,返回URL中指定的端口号|
|protocol|"http:"|返回页面使用的协议|
|search|"?q=param&a=123"|返回URL的查询字符串|
|orign|"www.test.com:8080"|返回URL的协议，主机名和端口号|
##### 查询字符串参数
实现思路:

```js
var str="?a=123&b=456&c=789";

    function getQueryStringArgs(params) {
        //取得查询字符串并去掉开头的问号
        var qs=(params.length>0?params.substring(1):""),
        //保存数据的对象
        args={};
        //取得每一项
        items=qs.length?qs.split("&"):[],
        item=null,
        name=null,
        value=null,
        //在for循环中使用
        i=0,
        len=items.length;
        //逐个将每一项添加到args对象中
        for(i=0;i<len;i++){
            item=items[i].split("=");
            name=decodeURIComponent(item[0]);
            value=decodeURIComponent(item[1]);

            if(name.length){
                args[name]=value;
            }
        }
        return args;
    }
    
    console.log(getQueryStringArgs(str))
```
##### 加载新页面
- location.assign
打开新URL并在浏览器的历史记录中生成一条记录,不是生成新窗口

```js
 location.assign("./a.html")
```
- location.herf
设置一个值的时候,底层也会调用 location.assignd方法

- 当修改这些属性的时候,会以新URL重新加载
	- search
	- hostname
	- pathname
	- port
- 但是修改hash不会重新加载
- location.replace
采用上面方式修改location
,都会在浏览器的历史记录中生成一个新记录,所以用户可以通过后退回到上一个页面,要禁止这种行为可以采用replace()方法,这个方法会导致浏览器重新加载,但是不会在浏览器历史记录中生成新的记录
- location.reload
- 页面上一次请求以来并没有改变过,页面会从浏览器缓存中重新加载
- 如果要强制从服务器重新加载,则需要在参数中传入一个true
#### navigator对象
|属性  | 说明 |IE|Firefox|Safari/Chrome|Opera|
|--|--|--|--|--|--|
|appCodeName  | 浏览器的名称.通常是Mozilla | 3.0+|1.0+ | 1.0+|7.0+|
|appMinorVersion  | 次版本信息 | 4.0+|- | -|9.5+|
|appName  | 完整的浏览器名称 | 3.0+|1.0+ | 1.0+|7.0+|
|appVersion  | 浏览器的版本,一般不与实际的浏览器版本对应 | 3.0+|1.0+ | 1.0+|7.0+|
|buildID  | 浏览器编译版本 | -|2.0+ | -|-|
|cookieEnabled  | 表示cookie是否启用 | 4.0+|1.0+ | 1.0+|7.0+|
|cpuClass  |计算机使用的CPU类型 | 4.0+|- | -|-|
|javaEnabled  |当前浏览器中是否启用了java | 4.0+|1.0+ | 1.0+|7.0+|
|language  |浏览器的主语言 | -|1.0+ | 1.0+|7.0+|
|mineTye  |在浏览器中注册的MIME类型数组 | 4.0+|1.0+ | 1.0+|7.0+|
|onLine  |表示浏览器是否连接到因特网 | 4.0+|1.0+ | -|9.5+|
|opsProfile  |似乎不用了 | 4.0+|- | -|-|
|oscpu  |客户端计算机的操作系统 | -|1.0+ | -|-|
|platform  |浏览器所在的系统平台 | 4.0+|1.0+ | 1.0+|7.0+|
|plugins  |浏览器中安装的插件信息的数组 | 4.0+|1.0+ | 1.0+|7.0+|
|preference()  |设置用户的首选项 | -|1.5+ | -|-|
|product  |产品名称(如Gecko) | -|1.0+ | 1.0+|-|
|productSub  |关于产品的次要信息 | -|1.0+ | 1.0+|-|
|registerContentHandler  |针对特定的MIME类型将一个站点注册为处理程序 | -|2.0+ | -|-|
|registerProtocoIHandler  |针对特定的协议将一个站点注册为处理程序 | -|2.0+ | -|-|
|securityPolicy  |安全策略,已废弃 | -|1.0+ | -|-|
|systemLanguage  |操作系统的语言 | 4.0+|- | -|-|
|tainEnabled()  |已废弃,表示是否容许变量被修改 | 4.0+|- | -|-|
|userAgent  |浏览器的用户代理字符串| 3.0+|1.0+ | 1.0+|7.0+|
|userLanguage |操作系统的默认语言| 4.0+|- | -|7.0+|
|userProfile |借以访问用户个人信息的对象| 4.0+|- | -|-|
|vendor |浏览器的品牌| -|1.0+| 1.0+|-|
|vendorSub |有关供应商的次要信息| -|1.0+| 1.0+|-|
##### 检测插件
- 非IE浏览器
采用plugins数组检测
```js
function hasPlugin(name){
        name=name.toLowerCase();
        for(var i=0;i<navigator.plugins.length;i++){
            if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
                return true;
            }
        }
        return false;
    }
```
- IE浏览器
IE是以COM对象的方式实现的,而COM对象使用唯一的标识符
```js
function hasIEPlugin(name){
        try {
            new ActiveXObject(name);
            return true;
        } catch (ex) {
            return false
        }
    }
```
> 拓展
> 
**ActiveX控件**
- 该对象是微软的私有拓展名, 只在微软的IE浏览器上支持, 在win8的应用商店下载的其他浏览器应用也不被支持
- ActiveXObject 启用会返回一个自动化对象的引用
- 这个对象只能用于实例化自动化对象，它没有任何成员对象.
- 使用方式
```js
	let newObj = new ActiveXObject(servername, typename[, location])  
```
- 参数
	- servername
	 提供对象的应用程序的名称。
	- typename
	 要创建的对象的类型或类。
	- location 可选
	 要创建对象的网络服务器的名称
-您可以在HKEY_CLASSES_ROOT注册注册表项中识别主机PC上的servername.typename的值。下面是您可以找到的一些示例，它们要取决于你的电脑安装了哪些程序:
		- Excel.Application
	
		- Excel.Chart
	
		- Scripting.FileSystemObject
	
		- WScript.Shell
	
		- Word.Document
- 示例

不同IE版本中使用的XMLHTTP对象也不完全相同，为了兼容所有浏览器，我们创建一个getHTTPObject()函数：
```js
//该函数创建一个通用的XMLHTTP对象
function getHTTPObject() {
    if (typeof XMLHttpRequest == 'undefined') {
        XMLHttpRequest = function () {
            try { return new ActiveXObject('Msxml2.XMLHTTP.6.0');}
                catch (e) {}
            try { return new ActiveXObject('Msxml2.XMLHTTP.3.0');}
                catch (e) {}
            try { return new ActiveXObject('Msxml2.XMLHTTP');}
                catch (e) {}
            return false;
        }
    }
    return new XMLHttpRequest();
}


//如下代码，就可以创建一个通用的XMLHTTP对象了，简单易用
 var request = getHTTPObject();
```
##### 注册处理程序
主要是Firefox2增加的registerContentHandler和registerProtocoIHandler,了解即可
随着RSS阅读器和在线电子邮件程序的兴起,注册处理程序就像为使用桌面应用程序一样默认使用这些在线应用程序
例:
```js
 navigator.registerContentHandler("application/rss+xml","http://www.somereader.com?feed=%s","Some Reader")
```
第一个参数是RSS源的MIME类型,第二个参数应该接收RSS源URL的URL,其中的%s表示RSS源URL,由浏览器自动插入.当下一次请求RSS源时,浏览器就会打开指定的URL,而相应的Web应用程序将以适当方式来处理该请求
registerProtocoIHandler也是类似
#### screen对象
| 属性 | 说明 |IE|Firefox|Safari/Chrome|Opera|
|--|--|--|--|--|--|
| availHeight | 屏幕的像素高度减系统部件高度之后的值 |+|+|+|+|
| availLeft | 未被系统部件占用的最左侧的像素值| -|+|+|-|
| availTop | 未被系统部件占用的最上方的像素值| -|+|+|-|
| availWidth | 未被系统部件占用的最上方的像素值| +|+|+|+|
| bufferDepth | 读,写用于呈现屏外位图的位数| +|-|-|-|
| colorDepth | 用于表现颜色的位数;多数系统都是32| +|+|+|+|
| deviceXDPI | 屏幕实际的水平DPI| +|-|-|-|
| deviceYDPI | 屏幕实际的垂直DPI| +|-|-|-|
| fontSmoothingEnabled | 表示是否启用了字体平滑| +|-|-|-|
| height | 回显示屏幕的高度| +|+|+|+|
| logicalXDPI | 返回显示屏幕每英寸的水平方向的常规点数| +|-|-|-|
| logicalYDPI | 返回显示屏幕每英寸的垂直方向的常规点数| +|-|-|-|
| pixelDepth | 返回显示屏幕的颜色分辨率比特每像素| -|+|+|+|
| top | 当前屏幕距上边的像素距离| -|+|-|-|
| updateInterval | 设置或返回屏幕的刷新率| +|-|-|-|
| width | 返回显示器屏幕的宽度| +|+|+|+|
#### history对象
[参阅History对象](https://ruphi.cn/archives/195/)


