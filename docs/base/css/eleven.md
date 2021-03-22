# 11 定位
## 11.1 基本概念
### 11.1.1 定位的类型
<table>
	<tr>
		<td>属性值</td>
		<td>取值</td>
		<td>初始值</td>
		<td>适用于</td>
		<td>计算值</td>
		<td>继承性</td>
		<td>动画性</td>
	</tr>
	<tr>
		<td>position</td>
		<td>static | relative | sticky | absolute | fixed </td>
		<td>static</td>
		<td>所有元素</td>
		<td>指定的值</td>
		<td>否</td>
		<td>否</td>
	</tr>
</table>
1.static

正常生成元素框.块级元素生成矩形框,位于文档流中;行内元素生成一个或多个行框,随父元素流动.

2.relative
元素框便宜一定距离.元素的形状与未定位时一样,而且元素所占的空间也与正常情况下相同

3.absolute
元素框完全从文档流中移除,相对于容纳块定位.正常情况下元素在文档中占据的空间不复存在,好似元素没有出现过一样,不管元素在常规的文档流中生成什么类型的框体,定位后生成的都是块级框

4.fixed
类似于absolut,不过容纳块是视区自身

5.sticky
元素一开始留在常规的文档流中,达到触发粘滞条件时,从常规的文档流中移除,不过在常规的文档流中占据空间,此时,相当于相对容纳块绝对定位.触发粘滞条件失效后,元素回到常规文档流中最初的位置.

### 11.1.2 容纳块
- 容纳块指包含另一个元素的框体
- 对于非根元素,如果position的值是relative或static,其容纳块由最近的块级,单元格或行内块级祖辈元素框体的内容边界划定
- 对于非根元素,如果position的值是absolute,其容纳块是position属性的值不是static的最近的祖辈元素,规则如下:
	1.如果祖辈元素是块级元素,容纳块是那个元素的内边距边界,即由边框限定的区域
	2.如果祖辈元素是行内元素,容纳块是祖辈元素的内容边界.
	3.如果没有祖辈元素,元素的容纳块是初始容纳块
## 11.2 偏移属性
<table>
	<tr>
		<td>属性值</td>
		<td>初始值</td>
		<td>适用于</td>
		<td>百分数</td>
		<td>计算值</td>
		<td>继承性</td>
		<td>动画性</td>
	</tr>
	<tr>
		<td>top,right,bottom,left</td>
		<td>auto</td>
		<td>定位元素</td>
		<td>上下偏移相对容纳块的高度计算,左右偏移相对于容纳块的宽度计算</td>
		<td>_</td>
		<td>否</td>
		<td>length,percentage</td>
	</tr>
</table>

- 正值是内向偏移,把边界内容向容纳块的中心移动,负值则是外向偏移
- 在使用top，left，right与bottom属性时一般只设置两个属性进行定位，比如常见的top与left为一对，设置了top一般不会再设置bottom
- 四个同时设置时，我们常见就是值为0，那么四个值设置0有哪些使用场景，一般有两种：
	1.让明确宽高的盒子垂直水平居中
```css
	.parent {
    width: 200px;
    height: 200px;
    background: #ffb6b9;
    position: relative;
}
.child {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #8ac6d1;
    margin: auto;
}
```
	
2.让无宽高的盒子填满父容器

```css
.child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
}
```

[绝对定位元素水平居中和垂直居中的原理](https://www.cnblogs.com/f6056/p/11202550.html)

## 11.3 宽度和高度
### 11.3.1 设定宽度和高度
- width和height默认值是auto
### 限制跨度和高度
<table>
	<tr>
		<td>属性值</td>
		<td>取值</td>
		<td>初始值</td>
		<td>适用于</td>
		<td>计算值</td>
		<td>继承性</td>
		<td>动画性</td>
	</tr>
	<tr>
		<td>min-width,min-height</td>
		<td>length,percentage</td>
		<td>0</td>
		<td>除非置换行内元素和表格元素之外的所有元素</td>
		<td>设置为百分数是,计算结果为指定的值,设置长度值时,计算结果为绝对长度,其它情况为none</td>
		<td>否</td>
		<td>lenght,percentage</td>
	</tr>
</table>
<table>
	<tr>
		<td>属性值</td>
		<td>取值</td>
		<td>初始值</td>
		<td>适用于</td>
		<td>计算值</td>
		<td>继承性</td>
		<td>动画性</td>
	</tr>
	<tr>
		<td>max-width,max-height</td>
		<td>length,percentage</td>
		<td>0</td>
		<td>除非置换行内元素和表格元素之外的所有元素</td>
		<td>设置为百分数是,计算结果为指定的值,设置长度值时,计算结果为绝对长度,其它情况为none</td>
		<td>否</td>
		<td>lenght,percentage</td>
	</tr>
</table>

- 这些属性值都不能为负

## 11.4 内容溢出和裁剪
### 11.4.1 溢出
<table>
	<tr>
		<td>属性值</td>
		<td>取值</td>
		<td>初始值</td>
		<td>适用于</td>
		<td>计算值</td>
		<td>继承性</td>
		<td>动画性</td>
	</tr>
	<tr>
		<td>overflow</td>
		<td>visible | hidden | scroll | auto</td>
		<td>visible</td>
		<td>块级元素和置换元素</td>
		<td>指定的值</td>
		<td>否</td>
		<td>否</td>
	</tr>
</table>

## 11.5 元素的可见性
<table>
	<tr>
		<td>属性值</td>
		<td>取值</td>
		<td>初始值</td>
		<td>适用于</td>
		<td>计算值</td>
		<td>继承性</td>
		<td>动画性</td>
	</tr>
	<tr>
		<td>visibility</td>
		<td>visiblility | hidden | collapse</td>
		<td>visible</td>
		<td>所有元素</td>
		<td>指定的值</td>
		<td>是</td>
		<td>否</td>
	</tr>
</table>

- 不可见状态下,元素依然像可见时那样影响文档布局
## 11.6 绝对定位
### 11.6.1 绝对定位元素的容纳块
通常,创作人员选定用作绝对定位元素的容纳块的元素后,会把position的值设置为relative,而且不设置偏移.
### 11.6.2 绝对定位元素的位置和尺寸
(css权威指南:水了一节)
### 11.6.3 自动确定边界的位置
如果定位元素的偏移属性设为auto或默认值时,定位元素的顶边将与没有定位的顶边位置对齐;
### 11.6.4 非置换元素的位置和尺寸
定位元素的宽度和横向位置为例:
```js
//等式右侧都是定位元素的尺寸,高度也是类似规则
容纳块的宽度=width+left+magrin-left+right+margin-right+border-left-width+border-right-width+padding-left+padding-right+left+right
```
#### 绝对定位元素的"自动缩放"功能
```css
<div style="position: relative; width: 25em; border: 1px dotted">
      An absolute positioed element can have its content
      <span
        style="
          position: absolute;
          top: 0;
          left: 0;
          right: auto;
          width: auto;
          background-color: silver;
        "
        >shrink-wrapped</span
      >
      thanks to the way positioning rules work.
    </div>
```
效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216173215820.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216173235774.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
这里元素的顶边和左边与容纳块顶边界,左边界重合,元素的宽度由内容计算出宽度,所以right自动计算出数值

#### 把外边距设为auto,横向居中显示绝对定位元素
```css
<div style="position: relative; width: 25em; border: 1px dotted">
      An absolute positioed element can have its content
      <span
        style="
          position: absolute;
          top: 0;
          left: 1em;
          right: 1em;
          width: 10em;
          margin: 0 auto;
          background-color: silver;
        "
        >shrink-wrapped</span
      >
      thanks to the way positioning rules work.
    </div>
```
效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020121617373972.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216173801921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
这里left,right都是16px,margin-right,margin-left都是104px,width是内容自动计算出来,所以元素水平居中

#### 过约束时忽略right属性的值
```css
<div style="position: relative; width: 25em; border: 1px dotted">
      An absolute positioed element can have its content
      <span
        style="
          position: absolute;
          top: 0;
          left: 1em;
          right: 1em;
          width: 10em;
          margin-left: 1em;
          margin-right: 1em;
          background-color: silver;
        "
        >shrink-wrapped</span
      >
      thanks to the way positioning rules work.
    </div>
```
效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216174355857.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216174409634.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
好像定位元素计算规则被打破了

在这种情况下,会忽略right属性(从左至右写的语言),反之.忽略的是left属性
效果与下面一样
```css
<div style="position: relative; width: 25em; border: 1px dotted">
      An absolute positioed element can have its content
      <span
        style="
          position: absolute;
          top: 0;
          left: 1em;
          right: 12em;
          width: 10em;
          margin-left: 1em;
          margin-right: 1em;
          background-color: silver;
        "
        >shrink-wrapped</span
      >
      thanks to the way positioning rules work.
    </div>
```
效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216174812280.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216174826698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
如果其中的外边距是auto,会由auto值属性,自动计算
```css
<div style="position: relative; width: 25em; border: 1px dotted">
      An absolute positioed element can have its content
      <span
        style="
          position: absolute;
          top: 0;
          left: 1em;
          right: 1em;
          width: 10em;
          margin-left: 1em;
          margin-right: auto;
          background-color: silver;
        "
        >shrink-wrapped</span
      >
      thanks to the way positioning rules work.
    </div>
```
效果一样:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216175228935.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216175244438.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70)
一般来说,如果只有一个属性的值为auto,将通过那个属性补足前面给出的等式
上面都是横轴上的而行为,纵轴所用的规则类似.
### 11.6.5 置换元素的位置和尺寸
1.如果把width设为auto,width的具体值由元素内容的内在宽度确定.
2.在从左至右书写的语言中,如果left的值为auto,auto将替换成静态位置.
3.如果left或right的值是auto,把margin-left或margin-right的auto值换成0
4.如果margin-left或margin-right的值为auto,把二者设置为相等的值,让元素居中
5.如果还有一个属性值为auto,修改成满足等式所需的值
上面是横轴规则,纵轴上规则类似
### 11.6.6 Z轴上的位置
<table>
	<tr>
		<td>属性值</td>
		<td>取值</td>
		<td>适用于</td>
		<td>计算值</td>
		<td>继承性</td>
		<td>动画性</td>
	</tr>
	<tr>
		<td>z-index</td>
		<td>integer | auto</td>
		<td>定位元素</td>
		<td>指定的值</td>
		<td>否</td>
		<td>是</td>
	</tr>
</table>

- 在坐标系中z-index值越大,元素离读者的距离越近.值大的元素会遮盖住其他元素
- 只可以是整数包括负数
- 元素设定z-index后,所有后代元素的堆叠次序都是相对祖辈元素而言
- 不管子元素z-index的只是什么都显示在父元素前面
- 生成的框体在当前堆叠上下文中的堆叠次序是0.z-index:auto可以视作z-index:0

## 11.7 固定定位
固定定位与绝对定位类似,只不过固定定位元素的容纳块是视区.
## 11.8 相对定位
(css权威指南:又水了一节)
## 11.9 粘滞定位
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>粘滞定位</title>
		<style>
			body{
				height: 3000px;
			}
			/*
				粘滞定位
					-当元素的position属性值设置为sticky时开启元素的粘滞定位
					-粘滞定位和相对定位的特点基本一致，不同的是粘滞定位可以在元素达到某个位置时将其固定
					
			 */
			.box1{
				height: 100px;
				margin-top: 200px;
				background-color: aquamarine;
				position: sticky;
				top: 10px;
			}
		</style>
		
	</head>
	<body>
		<div class="box1"></div>
	</body>
</html>
```
- 截止2017年末,只有IE和Edge,以及Opera Mini不支持position:sticky;在Safari中,要在值前加上-webkit-,即position:-webkit-sticky;
