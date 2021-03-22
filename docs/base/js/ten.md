# 10 DOM
## 10.1 节点层次
### 10.1.1 Node类型
#### 节点信息
 1. nodeType属性
 	- Node.ELEMENT_NODE(1)
 	- Node.ATTRIBUTE_NODE(2)
 	- Node.TEXT_NODE(3)
 	- Node.CDATA_SECTION_NODE(4)
	- Node.ENTITY_REFERENCE_NODE(5)
	- Node.ENTITY_NODE(6)
	- Node.PROCESSING_INSTRUCTION_NODE(7)
	- Node.COMMENT_NODE(8)
	- Node.DOCUMENT_NODE(9)
	- Node.DOCUMENT_TYPE_NODE(10)
	- Node.DOCUMENT_FRAGMENT_NODE(11)
	- Node.NOTATION_NODE(12)
```js
	if(someNode.nodeType==1){
		console.log("Node is an element.")	
	}
```
 2. nodeName和nodeValue属性
	 nodeName中始终保存是元素的标签名
	 nodeValue值始终为null
#### 节点关系
 3. childNode(NodeList对象)
	- 每个节点都有一个childNode属性,其中保存着一个NodeList对象
	- NodeList是一种类数组对象,用于保存一组节点
	- 取值方式
		- 方括号取值,例,someNode.childNodes[0];
		- item()取值,例,someNode.item(0);
	- 转换成数组
		1.Array.prototype.slice.call(node.childNodes, 0)//适用于非IE浏览器
		2.适用于所有浏览器的converToArray
		```js
			//类数组转换成数组
		  function converToArray(nodes) {
		    var array = null;
		    try {
		      array = Array.prototype.slice.call(nodes, 0); //针对非IE浏览器
		    } catch(e) {
		      array = new Array();
		      for (var i = 0, len = nodes.length; i < len; i++) {
		        array.push(node[i]);
		      }
		    }
		    return array;
		  }
		```
	
 4. parentNode
	- 每个节点都有一个parentNode属性,给属性指向文档树中的父节点
	- childNode列表中的所有节点都具有相同的父节点
 5. previousSibling和nextSibling
 	- 可以访问同一列表中的其他节点
 	- 如果为第一个节点,previousSibling为null
 	- 如果为最后一个节点,nextSibling为null
 	- 列表中只有一个节点,previousSibling和nextSibling都为null
 6. lastChild和firstChild
  	 - 分别指向childNode里的第一个节点和最后一个节点
 7. hasChildNodes和ownerDocument
  	- hasChildNodes包含一个或多个子节点的情况下返回true
  	- ownerDocument,该属性指向表示整个文档的文档节点
  此图展示Node节点的关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207121040308.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
#### 操作节点
 8. appendChild
 - 向childNodes列表的末尾添加一个节点
 9. insertBefore
 - 接受两个参数:要插入的节点和作为参照的节点,插入节点后,被插入的节点会变成参照节点的前一个同胞节点
 10. replaceChild
 - 接受两个参数:要插入的节点和要替换的节点,要替换的节点将由这个方法返回并从文档树中被移除,同时由要插入的节点占据其位置 
 11. removeChild
- 接受一个参数,移除childNodes列表指定的节点
#### 其他方法
 1. cloneNode
 - 接受一个布尔参数,false是执行浅拷贝,true执行深拷贝,克隆节点
 2. normalize
- 处理文档树中的文本节点,1.可能出现文本节点不包含文本,2.接连出现两个文本节点
### 10.1.2 Document 类型
document是HTMLDocument(继承自Document类型)的一个实例,表示整个html页面
#### 节点特征
- nodetype为9
- nodeName为"#document"
- nodeValue为null
- parentNode为null
- ownerDocument为null
- 其子节点可能是一个DocumentType(最多一个),ELement(最多一个),ProcessingingInstruction,Comment
#### 文档子节点
1.DocumentType
```js
//DocumentType 接口表示了一个包含文档类型的节点 Node 
console.log(document.doctype);
```
2.ELement

Element 是一个通用性非常强的基类，所有 Document 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。

3.ProcessingingInstruction

ProcessingInstruction接口表示处理指令; 也就是说，Node嵌入了针对特定应用程序的指令，但其他无法识别该指令的应用程序可以忽略该指令。
```js
var doc = new DOMParser().parseFromString('<foo />', 'application/xml');
var pi = doc.createProcessingInstruction('xml-stylesheet', 'href="mycss.css" type="text/css"');

doc.insertBefore(pi, doc.firstChild);

console.log(new XMLSerializer().serializeToString(doc));
// Displays: <?xml-stylesheet href="mycss.css" type="text/css"?><foo/>
```
4.Comment

Comment 接口代表标签（markup）之间的文本符号（textual notations）。尽管它通常不会显示出来，但是在查看源码时可以看到它们。在 HTML 和 XML 里，注释（Comments）为 '<!--' 和 '-->' 之间的内容。在 XML 里，注释中不能出现字符序列 '--'。

5.内置访问html和body
	- document.documentElement,document.firstchild和document.childNodes[0]值相同,直接指向html标签
	- document.body直接指向body标签
#### 文档信息
1.document.title
通过这个属性可以获取当前页面的标题
2.document.URL
通过这个属性可以获取当前页面的完整的URL
3.document.domain
 - domain可以设置
 - 存在安全方面的限制
 - 不能将这个属性设置为URL中不包含的域
4.document.referrer
与document.URL类似
#### 查找元素
1.getElementById
	
 - 接收一个参数,区分大小写
 
2.getElementsByTagName
	
 - 接收一个参数,返回零或多个元素的NodeList或HTMLCollection
 - HTMLCollection中的namedItem(),可以根据便签的名称,获取指定元素
 - 参数传入"*",获取所有元素
 
3.getElementsByName

 - 接收一个参数,标签name名称,返回零或多个元素的NodeList或HTMLCollection

#### 特殊集合
 - document.anchors,包含文档中所有带name特性的a元素
 - document.applets,包含文档中所有applet元素
 - document.forms,包含文档中所有form元素
 - documen.images包含文档中所有img元素
 - document.links,包含文档中所有带href特性的a元素
#### DOM一致性检测
document.implementation的hasFeature()
 - 接收两个参数,要检测DOM功能的名称及版本号
 ```js
 console.log(document.implementation.hasFeature("HTML","5.0"));
 ```
#### 文档写入
1.document.write
2.document.writeln
3.document.open
4.document.close
### 10.1.3 Element类型
#### 节点特征
- nodeType的值为1
- nodeName的值为元素的标签名
- nodeValue的值为null
- parentNode可能是Document或Element
- 子节点可能是Element,Text,Comment,ProcessingInstruction,CDATASection,EntityReference
#### HTML元素
- id,元素在文档中的唯一标识符
- title,有关元素的附加说明
- lang,元素内容的语言代码
- dir,语言的方向
#### 特性
1.getAttribute
获取元素的特性
2.setAttribute
设置元素的特性
接收两个参数:特性名和值
3.removeAttribute
删除元素的某个特性
#### attribute属性
1.NameNodeMap
- 类数组对象
- getNamedItem(name):返回nodeName属性等于name的节点
- removeNamedItem(name):从列表中移除nodeName属性为索引
- setNamedItem(node):向列表中添加节点,以节点的nodeName属性为索引
- item(pos):返回位于数字pos位置处的节点
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app" name="ding"></div>
</body>
</html>
<script>
    var app=document.getElementById("app");
    for(var i=0;i<app.attributes.length;i++){
        var nodeValue=app.attributes[i].nodeValue;
        var nodeName=app.attributes[i].nodeName;
        console.log(`第${i}个属性`+nodeName+`---`+nodeValue);
    }
    //输出
    //第0个属性id---app
    //第1个属性name---ding
</script>
```
#### 创建元素
1.document.createElement
创建一个由标签名称 tagName 指定的 HTML 元素。如果用户代理无法识别 tagName，则会生成一个未知 HTML 元素 HTMLUnknownElement
```js

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
<script>
    var ding=document.createElement('div');
    var app=document.getElementById("app");
    ding.innerText="你好";
    app.appendChild(ding);
</script>
```
### 10.1.4 Text类型
- nodeType的值为3;
- nodeName的值为"#text";
- nodeValue的值为节点所包含的文本
- parentNode是一个Element
- 没有子节点
#### 操作文本节点
- appendData(text):将text添加到节点的末尾
- deleteData(offset,count):从offset指定的位置开始删除count个字符
- insertData(offset,text):在offset指定的位置插入text
- replaceData(offset,count,text):用text替换从offset指定的位置开始到offset+count为止处的文本
- splitText(offset):从offset指定的位置将当前文本节点分成两个文本节点
- substringData(offset,count):提取从offset指定的位置开始到offset+count为止处的字符串
#### 创建文本节点
- document.createTextNode:接收一个参数-要插入节点中的文本
#### 规范化文本节点
- normalize:相邻文本节点合并
### 10.1.5 Comment类型
- nodeType的值为8;
- nodeName的值为"#comment";
- nodeValue的值是注释的内容
- parentNode可能是Document或Element
- 没有子节点
- 与text类型相似
### 10.1.6 CDATASection类型
- nodeType的值为4;
- nodeName的值为"#cdata-section";
- nodeValue的值是CDATA区域的内容
- parentNode可能是Document或Element
- 没有子节点
- CDATA区域只会出现在XML文档中,多说浏览器都会吧CDTATA区域错误的解析成Comment或Element
```js
 <![CDATA["你好"]]>
```
### 10.1.7 DocumentType类型
- 不常用,仅Firefox,Safari和Opera支持它
- nodeType的值为10;
- nodeName的值为doctype的名称
- nodeValue的值为null
- parentNode是Document
- 没有子节点
- 不能动态创建,只能文档解析创建
```js
<!DOCTYPE html>
```
### 10.1.8 DocumentFragment类型
- nodeType的值为11;
- nodeName的值为"#document-fragment"
- nodeValue的值为null;
- parentNode的值为null;
- 子节点是Element,ProcessingingInstruction,Comment,Text,CDATASection或EntityReference

document.createDocumentfragment

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="myList"></div>
  </body>
</html>
<script>
  var fragment = document.createDocumentFragment();
  var ul = document.getElementById("myList");
  var li = null;

  for (var i = 0; i < 3; i++) {
    li = document.createElement("li");
    li.appendChild(document.createTextNode("Item" + (i + 1)));
    fragment.appendChild(li);
  }

  ul.appendChild(fragment);
</script>
```
### 10.1.9 Attr类型
- nodeType的值为2;
- nodeName的值是特性的值
- parentNode的值为null
- HTML没有子节点
- XML中子节点可以是text或entityReference
-name,value和specified是Attr对象的三个属性

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
<script>
    var app=document.getElementById("app");
    var attr=document.createAttribute("align");
    attr.value="left";
    app.setAttributeNode(attr);
</script>
```
## 10.2 DOM操作技术
### 10.2.1 动态脚本
#### 插入外部文件
```js
var script = document.createElement('script');
script.src = './demo.js';
document.body.appendChild(script);
```
#### 插入JavaScript代码
```js
function loadScript(code){
    var script = document.createElement('script');
 
    try{
        script.appendChild(document.createTextNode(code));
    }catch(err){
        script.text = code;
    }
 
    document.body.appendChild(script);
}
 
loadScript(' function sayHi(){alert(\'Hi!\')}');
```

以上两种模式加载的脚本代码会立刻执行,虽然可以，但是不推荐使用eval()来执行字符串代码；
### 10.2.2 动态样式
#### link引入外部样式
```js
function loadStyles(url){
    var head = document.getElementByTagName('head')[0];
    var link = document.createElement('link');
    link.el = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}
 
loadStyles('styles.css');
```
#### style嵌入样式
```js
function loadInlineStyle(css){
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
 
    try{
        style.appendChild(document.createTextNode(css));
    }catch(){
        style.styleSheet.cssText = css
    }
 
    head.appendChild(style);
}
 
loadInlineStyle('body{background-color: red;}');
```
IE将style视为一个特殊元素的，与script类似的节点，所以需要写入内联的样式代码，需要使用IE下的style节点的特征属性：style.styleSheet.cssText。
### 10.2.3 操作表格
#### table元素的属性和方法
1.caption：返回表格的caption元素节点，没有则返回null；
2.tHead, tBodies, tFoot: 返回表格thead, tbody, tfoot元素；
3.rows: 返回元素所有行tr元素的HTMLCollection;
4.createTHead(), createTFoot(), createCaption(): 创建thead, tfoot, caption空元素，将其放到表格中，返回5.创建的thead, tfoot, caption元素节点；
6.deleteTHead(), deleteTFoot(), deleteCaption(): 删除thead, tfoot, caption空元素，无返回值（或返回值为undefined）
7.deleteRow(pos): 删除指定位置（注意参数不是索引，而是从0开始的位置）的行，返回undefined;
8.insertRow(pos): 向rows集合中的指定位置（不是索引）插入一行；
#### tbody元素的属性和方法
1.rows: 返回tbody元素下所有行tr元素的HTMLCollection;
2.deleteRow(pos): 删除指定位置（注意参数不是索引，而是从0开始的位置）的行，返回undefined;
3.insertRow(pos):向rows集合中的指定位置（不是索引）插入一行；
#### tr元素的属性和方法
1.cells: 返回tr元素中单元格的HTMLCollection;
2.deleteCell(pos): 删除指定位置（不是索引）的单元格；
3.insertCell(pos): 向cells集合中的指定位置（不是索引）插入一个单元格，返回对新插入单元格的引用；

```js
<!DOCTYPE html>
<html>
    <body>
    </body>
    <script>
        // 创建table
        var table = document.createElement('table');
        table.border = 1;
        table.width = '100%';
 
        // 创建caption
        var caption = table.createCaption();
        caption.innerHTML = 'My Table';
 
        // 创建thead
        var thead = document.createElement('thead');
        thead.insertRow(0);
        thead.rows[0].insertCell(0);
        thead.rows[0].cells[0].appendChild(document.createTextNode('标题一'));
        thead.rows[0].insertCell(1);
        thead.rows[0].cells[1].appendChild(document.createTextNode('标题二'));
        table.appendChild(thead);
 
        // 创建tbody
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
 
        // 创建第一行
        tbody.insertRow(0);
        tbody.rows[0].insertCell(0);
        tbody.rows[0].cells[0].appendChild(document.createTextNode('Cell 1, 1'));
        tbody.rows[0].insertCell(1);
        tbody.rows[0].cells[1].appendChild(document.createTextNode('Cell 2, 1'));
 
        // 创建第二行
        var row02 = tbody.insertRow(1);
        var cell0201 = row02.insertCell(0),
            cell0202 = row02.insertCell(1);
 
        cell0201.appendChild(document.createTextNode('cell 2,1'));
        cell0202.appendChild(document.createTextNode('cell 2,2'));
 
        // 将表格添加到文档主体中
        document.body.appendChild(table);
    </script>
</html>
```
### 10.2.4 使用NodeList
NodeList NamedNodeMap HTMLCollection 这三个集合都是动态的，除了有个例。
NodeList ：getElementsByName，childNodes，querySelectorAll（静态集合）等返回的都是NodeList实例
HTMLCollection：getElementsByTagName，getElementsByClassName，getElementsByTagNameNS，document.forms，document.children等返回的都是HTMLCollection实例
NamedNodeMap：表示属性节点对象的集合，ele.attributes返回NamedNodeMap实例

访问DOM文档时实时运行的查询，所以下面代码会导致无限循环。
```js
var divs = document.getElementsByTagName('div'),i,div;
for(i = 0;i< divs.length; i++){
   div = document.createElement('div');
   document.body.appendChild(div);
}
```
浏览器不会将创建的所有集合都保存在一个列表中，而是在下次访问集合时再更新集合，i和divs.length每次都会同时递增，结果它们的值永远不会相等。正确写法如下：
```js
var divs = document.getElementsByTagName('div'),i,len,div;
for(i = 0,len = divs.length; i<len;i++){
   div = document.createElement('div');
   document.body.appendChild(div);
}
```

