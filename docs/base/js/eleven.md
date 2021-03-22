# 11 DOM拓展
## 11.1 选择符API
Selectors APILevel 1核心方法:querySelector和querySelectorAll;
兼容性:IE8+,Firefox3.5+,Safari3.1+,Chrome和Opera 10+;
### 11.1.1 querySelector方法
- 接收一个css选择符,返回与该模式匹配的第一个元素,如果没有这个元素,返回null;
- Document类型调用此方法,会在文档元素的范围内查找匹配的元素
- Element类型调用此方法,会在该元素后代元素的范围内查找匹配元素
### 11.1.2 querySelectorAll方法
- 接收一个css选择符,返回所有匹配的元素,返回的是NodeList的实例;
- Document类型调用此方法,会在文档元素的范围内查找匹配的元素
- Element类型调用此方法,会在该元素后代元素的范围内查找匹配元素
### 11.1.3 matchesSelector方法
- Selectors API Level 2规范新增方法
- 接收一个css选择符,如果能匹配到,则返回true,否则false
## 11.2 元素遍历
Element Traversal API 为DOM元素添加了5个属性:
- childElementCount:返回子元素的个数;
- firstElementChild:返回第一个子元素;
- lastElementChild:返回最后一个元素:
- previousElementSibling:指向前一个同辈元素;
- nextElementSibling:指向后一个同辈元素;
遍历方法:
```js
var i,len,child=element.firstElementChild;
while(child!=element.lastElementChild){
	child=child.nextElementSibling
}
```
兼容性:IE9+,Firefox3.5+,Safari4+,Chrome和Opera 10+

## 11.3 HTML5
### 11.3.1 与类相关的扩充
#### getElementByClassName方法
- 接受一个参数,即一个包含一或多个类名的字符串,返回带有指定类的所有元素的nodeList;
- Document类型调用此方法,会在文档元素的范围内查找匹配的元素
- Element类型调用此方法,会在该元素后代元素的范围内查找匹配元素
- 兼容性:IE 9+,Firefox 3+,Safair 3.1+,Chrome和Opera9.5+
#### classList属性
1.操作类名时,需要通过classaName属性添加,删除和替换类名.因为className中是一个字符串,所以即使只修改字符串一部分,也必须每次都设置整个字符串的值.

2.HTML5添加了一个classList属性:
- add():将给定的字符串值添加到列表中
- contains():表示列表中是否存在给定的值
- remove():从列表中删除给定的字符串
- toggle():如果列表中已经存在给定的值,删除它;如果列表中没有给定的值,添加它.
- 兼容性:Firefox 3.6+和Chrome
### 11.3.2 焦点管理
- document.activeElement始终引用DOM中当前获得了焦点的元素
- 元素获得焦点的方式有:页面加载,用户输入(通常是通过按Tab键)和代码中调用focus()方法
默认情况下,文档刚刚加载完成时,document.activeElement中保存的是document.body元素的引用.文档家在期间document.activeElement的值是null;
- document.hasFocus方法确定文档是否获得了焦点
- 兼容性:IE 4+,Firefox 3+,Safari 4+,Chrome和Opera 8+
### 11.3.3 HTMLDocument的变化
1.readyState属性

作用:可以用来实现一个指示文档已经加载完成的指示器

- loading,正在加载文档
- complete,已经加载完文档
兼容性:IE 4+,Firfox 3.6+,Safari,Chorme和Opera 9+

2.兼容模式
compatMode属性告诉开发人员浏览器采用了哪种渲染模式

- 标准模式:document.compatMode等于"CSS1Compat";
- 混杂模式:document.compatMode等于"BackCompat";
- 兼容性:Firefox,Safari 3.1+,Opera和Chrome

3.head属性

引用文档的head元素

### 11.3.4 字符集属性
1.charset属性和defaultCharset
- 表示文档中实际使用的字符集
- 默认是UTF-16
- 兼容性:IE,Safari,Chrome,Opera,Firefox
### 11.3.5 自定义数据属性
- 添加data-,目的是为了元素提供与渲染无关的信息
- 可以通过元素的dataset属性来访问自定义属性的值;
- dataset属性的值是DOMStringMap的一个实例,也就是一个名值对儿的映射.
- 兼容性:Firefox 6+和Chrome
```js
 <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>

<script>
  var div = document.getElementById("myDiv");

  //取值
  var appId = div.dataset.appId;
  var myName = div.dataset.myname;

  //设置值
  div.dataset.appId = 23456;
  div.dataset.myname = "Michael";
</script>
```
### 11.3.6 插入标记
#### innerHTML
1.读模式
返回调用元素的所有子节点(包括元素,注释和文本节点)
2.写模式
根据指定的值创建新的DOM树,然后用这个DOM树完全替换调用元素的所有子节点
3.限制
大多数浏览器中,通过innerHTML插入script元素并不会执行其中的脚本.IE8及其更早版本可以执行(了解即可)
#### outerHTML
1.读模式
返回调用元素和其所有子节点(包括元素,注释和文本节点)
2.写模式
根据指定的值创建新的DOM树,完全替换调用元素
3.兼容性
IE 4+,Safari 4+,Chrome和Opera 8+

#### insertAdjacentHTML()
- "beforebegin",在当前元素之前插入一个紧邻的同辈元素;
- "afterbegin",在当前元素之下插入一个新的子元素或在第一个子元素之前插入新的子元素
- "beforeend",在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素
- "afterend",在当前元素之后插入一个紧邻的同辈元素
-兼容性:IE,Firefox 8+,Safari Opera和Chrome
```js
 <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>

  var div = document.getElementById("myDiv");
  div.insertAdjacentHTML("beforebegin", "<p>beforebegin</p>");
  div.insertAdjacentHTML("beforeend", "<p>beforeend</p>");

  div.insertAdjacentHTML("afterbegin", "<p>afterbegin</p>");
  div.insertAdjacentHTML("afterend", "<p>afterend</p>");
```
#### 内存与性能问题
- 在删除带有事件处理程序或引用了其他javascript对象子树时,可能导致内存占用问题
- 一般使用插入标记时,会创建一个HTML解析器(使用C++写的,速度比js块)
- 一般插入操作最好的做法就是单独构建好html片段,在一次性插入进去
### 11.3.7 scrollIntoView()方法
- 在所有HTML元素上调用,通过滚动浏览器窗口或某个容器元素,调用元素就可以出现在视口中.
- 如果传入参数true,或不传,那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能齐平.
- 传入false,调用元素会尽可能出现在视口中(可能的话,调用元素的底部会与视口底部平齐,顶部不一定齐平)
## 11.4 专有扩展
### 11.4.1 文档模式(IE,了解即可)
[参考资料](https://www.cnblogs.com/venoral/p/5317824.html)

### 11.4.2 children属性
- HTMLCollection的实例
- 只包含元素中同样还是元素的子节点.
- 与childNodes没什么区别
- 兼容性:IE5,Firefox 3.5,Safari2,Safari3,Opera8和Chrome
### 11.4.3 contains()方法和compareDocumentPosition()方法
1.contains()方

- 查找某个节点是否是不是另一个节点的后代,返回true或false
- 兼容性:IE 9+,Firefox,Safari.Opera 9.5+和Chrome

2.compareDocumentPosition()
这个方法用于确定两个节点间的关系,返回一个表示该关系的位掩码;
| 掩码 |节点关系  |
|--|--|
| 1 | 无关(给定的节点不在当前文档中) |
|2|居前(给定的节点在DOM树中位于参考节点之前)|
|4|居后(给定的节点在DOM树中位于参考点之后)|
|8|包含(给定的节点是参考节点的祖先)|
|16|被包含(给定的节点是参考节点的后代)

兼容性:IE 9+,Firefox,Safari.Opera和Chrome

### 11.4.4 插入文本
1.innerText
- 读取值时,他会按照由浅入深的顺序,将子文档中的所有文本拼接起来
- 写入值时,会使你出元素的所有子节点,插入包含相应文本值的文本节点
2.outerText
除了作用域范围扩大到了包含调用它的节点之外,与innerText基本没有多大区别
### 11.4.5 滚动
其他对HTMLElment类型的拓展:
- scrollIntoViewIfNeeded(alignCenter)只在当前元素不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。设置alignCenter为true 尽量将元素现在在视口中部。

- scrollByLines(lineCount) 将元素的内容滚动指定行高

- scrollByPages(pageCount) 将元素的内容滚动指定页面高度
