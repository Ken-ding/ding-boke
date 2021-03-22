## 语法的改变
## 解析器

- html4基于SGML,需要声明dtd
- html5基自己的分析器
### 标记方法

- 内容类型

文件拓展符与内容类型保持不变

- doctype声明
```html
//html4
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

//html5
<!DOCTYPE html>
```

- 指定字符编码
```html
//html4
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

//html5
<meta charset="UTF-8">
```
### 兼容性
#### 可省略标记元素

- 不允许写结束标记的元素area、base、br、col、command、embed、hr、img、iput、keygen、link、meta、param、source、track、wbr。
- 可省略结束标记的元素:li、dt、dd、p、rt、rp、optgroup、option、colgroup、thead、tbody、tfoot、tr、td、th。
- 可以省略全部标记的元素:html、head、body、colgroup、tbody。
#### 具有boolean值的属性
对于具有boolean值的属性,例如disabled与readonly等,当只写属性而不指定属性值时,表示属性值为true,如果想要将属性值设为false,则可以不设置
#### 省略引号
当属性值不包括空字符串、“<”、“>”、“=”、单引号、双引号等字符时，属性值的两边引号可以省略。
## 新增元素和废除元素
### section元素
表示页面中的一个内容区块
### article元素
表示页面中的一块与上下文不相关的独立内容
### aside元素
辅助信息内容
### header元素
标题
### footer元素
脚注
### nav元素
导航链接部分
### figure元素
独立的流内容,独立单元
### main元素
网页主要内容
### video元素
表示视频
### audio元素
定义音频
### embed元素
插入各种媒体
### mark元素
呈现那些需要突出显示或高亮显示的文字
### progress元素
表示js函数耗费时间进程
### meter元素
定义度量范围
### time元素
表示日期或时间
### rudy元素
表示rudy注释
### rt元素
表示字符的解释或发音
### rp元素
rudy注释中使用
### wbr元素
表示软换行
### canvas元素
表示图形
### details元素
表示用户可以得到的细节点
### datalist元素
可选数据列表
### datagrid元素
可选数据列表,以树形列表形式显示
### output元素
表示不同输出类型
### source元素
元素的媒介元素定义媒介资源
### dialog元素
表示对话框
### 新增input元素类型

- email
- url
- number
- range
- Date Pickers
### 废除元素

- 能使用css替代元素:basefont,big,center,font,s,strike,tt,u等元素
- 不再使用frame框架,使用iframe替代
- 只有部分浏览器支持的元素:applet,bgsound,blink,marquee等元素
- 其他:rb,acronym,dir,isindex,listing,xmp,nextid,plaintext等元素
## 新增属性和废除属性
### 表单相关

- 可以对input(text,select,textarea,button)指定autofocus属性.
- 可以对input(text,textarea)元素指定placeolder属性
- 可以对input(select,textarea,button,fieldset)指定form属性,不固定在哪个表单内
- 可以对input(text,textarea)指定required属性
- input元素增加属性:autocomplete,min,max,multiple,pattern,step.
- input和button增加formaction,formenctype,formmethod,formnovalidate与formtarget,novlidate
- 增加checkbox元素的indeterminate属性,说明尚未明确是否选取
- 对类型image的input增加height和width
- 对teatarea元素新增用于限定可输入文字个数的maxlenght属性与与用于指定表单提交时是否文字换行处添加换行符wrap属性
### 链接相关的属性

- a与area元素属性增加了media属性,download属性以及ping属性
- link元素增加了sizes.
- base元素增加了target属性
### 其他属性

- ol元素增加了star属性与reversed属性
- meta元素增加charset属性
- menu元素增加type与label
- style增加scoped属性,规定样式的作用范围
- script增加async属性,定义脚本是否异步执行
- html元素增加manifest
- iframe增加sandbox,seamless和srcdox
## 全局属性
### contentEditable
提示用户该元素内容允许编辑
### designMode
用来指定整个页面是否可编辑
### hidden
通知浏览器不渲染该元素
### spellcheck
针对input(text,textarea),对用户输入的文本内容进行拼写和语法检查
### tabindex
不断敲击Tab键让窗口或页面中的控件获得焦点
## 新增事件
### beforeprint
即将开始打印之前触发
### afterprint
打印完毕时触发
### resize
浏览器窗口大小变化
### error
页面加载出现错误
### offline
页面变成离线状态触发
### online
页面变成在线状态触发
### pageshow
页面加载时触发类似于load事件,区别是网页缓存读取页面是触发次事件
### beforeunload
当页面关闭时触发
### haschange
当页面URL地址字符串中的哈希部分改变触发
### mousewheel
当鼠标指针悬停在元素上并滚动鼠标滚轮触发
### scroll
当元素滚动条被滚动触发
### input
等用户修改文本框中的内容触发
### reset
重置事件
## 监听一次事件
增加addEventListener,允许开发者第三个参数定义为配置对象
```javascript
el.addEventListener('click',function(){},{once:true})
```

