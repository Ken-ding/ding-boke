参考资料:[CSS BFC（块格式化上下文）原理详解](https://blog.csdn.net/qq_36770641/article/details/88972542)
参考资料:[块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
## 定义
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611383551624-2a541949-637d-47c8-92d9-a462e755fda7.png#align=left&display=inline&height=566&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1132&originWidth=1902&size=731119&status=done&style=none&width=951)
## 作用
### 让浮动内容和周围的内容等高
例子:
```html
<div class="box1">
   父级高度塌陷
   <div class="float1">I am a floated box!</div>
   <p>I am content inside the container.</p>
</div>

<div class="box2">
   display: flow-root形成的BFC
   <div class="float1">I am a floated box!</div>
   <p>I am content inside the container.</p>
</div>
```
```css
.box1 {
            background-color: rgb(224, 206, 247);
            border: 5px solid rebeccapurple;
        }
        
        .float1 {
            float: left;
            width: 200px;
            height: 150px;
            background-color: white;
            border:1px solid black;
            padding: 10px;
        }
        .box2 {
            background-color: rgb(224, 206, 247);
            border: 5px solid rebeccapurple;
            display: flow-root;
        }
        
        .float2 {
            float: left;
            width: 200px;
            height: 150px;
            background-color: white;
            border:1px solid black;
            padding: 10px;
        }
```
效果:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611384978017-0e67dbef-debe-4692-a942-9ba5d9228ce3.png#align=left&display=inline&height=377&margin=%5Bobject%20Object%5D&name=image.png&originHeight=754&originWidth=1416&size=259011&status=done&style=none&width=708)
### 外边距塌陷
```html
<div class="containter1">
        浮动元素,BFC
        <div class="item"></div>
        <div class="item"></div>
    </div>
```
```css
.item{
            width: 100px;
            height: 100px;
            background: lightblue;
            margin: 100px;
        }
        .containter1{
            background-color: aquamarine;
            float: left;
        }
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611385032847-7d368921-7927-4bb7-844d-3c6793048e3b.png#align=left&display=inline&height=542&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1084&originWidth=644&size=124924&status=done&style=none&width=322)
### 使用`display: flow-root`
一个新的 `display` 属性的值，它可以创建无副作用的BFC。在父级块中使用 `display: flow-root` 可以创建新的BFC。
```html
 <div class="box2">
         display: flow-root形成的BFC
        <div class="float1">I am a floated box!</div>
        <p>I am content inside the container.</p>
    </div>
```
```css
.box2 {
            background-color: rgb(224, 206, 247);
            border: 5px solid rebeccapurple;
            display: flow-root;
        }
        
        .float2 {
            float: left;
            width: 200px;
            height: 150px;
            background-color: white;
            border:1px solid black;
            padding: 10px;
        }  
```
效果:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611385153173-62d63b4d-b55b-4ff0-b713-522622e19cff.png#align=left&display=inline&height=206&margin=%5Bobject%20Object%5D&name=image.png&originHeight=412&originWidth=940&size=115861&status=done&style=none&width=470)
### 阻止元素被浮动元素覆盖
```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```
效果:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611385236592-fd3b7570-f1cd-4fc6-8ede-33efece7779f.png#align=left&display=inline&height=220&margin=%5Bobject%20Object%5D&name=image.png&originHeight=440&originWidth=432&size=37582&status=done&style=none&width=216)
这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 **overflow: hidden**，就会变成：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611385281091-ccc64ecc-e143-4dc3-894e-156f839e2c77.png#align=left&display=inline&height=223&margin=%5Bobject%20Object%5D&name=image.png&originHeight=446&originWidth=640&size=38474&status=done&style=none&width=320)


