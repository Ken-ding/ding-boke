# 2 let和const命令
## 2.1 let命令
### 2.1.1 基本用法
用法类似于var,但所声明的变量只在let命令所在的代码块内有效
### 2.1.2 不存在变量提升
- var命令会发生变量提升的现象,即可以在声明之前使用,值为undefined.
- 按照一般逻辑,变量应该在声明语句之后才可以使用,
- let命令改变了语法行为,它所声明的变量一定要在声明后使用,否则便会报错.
```js
//var的情况
console.log(foo);//输出undefined
var foo=2;

//let的情况
console.log(bar);//报错Reference
let bar=2;
```
### 2.1.3暂时性死区
- ES6规定,如果区域中存在let和const命令,则这个区域对这些命令声明的变量从一开始就形成封闭的作用域,只要在声明之前就使用这些变量,就会报错;
```js
var tmp=123;

if(true){
	tmp='abc';//Reference
	let temp;
}
```
### 2.1.4 不允许重复声明
- let不允许在相同的作用域内重复生命同一个变量
```js
//报错
function(){
	let a=10;
	var a=1;
}
```
## 2.2 块级作用域
### 2.2.1 为什么需要块级作用域
- 第一种场景,内层变量可能会覆盖外层变量
```js
var tmp=new Date();

function f(){
	console.log(tmp);
	if(false){
		var tmp='hello world';
	}
}

f();//undefined
```
内层的tmp变量提升,导致覆盖外层的tmp

- 第二种场景,用来计数的循环变量泄露为全局变量
```js
var s='heelo';
for(var i=0;i<s.lenght;i++){
	console.log(s[i]);
}
console.log(i);//5
```
变量i只是用来控制循环,但是循环结束后,它并没有消失,而是泄露成了全局变量
### 2.2.2 ES6的块级作用域
- let新增了块级作用域
- 允许块级作用域任意嵌套
- 外层作用域无法读取内层作用域的变量
- 内层作用域可以定义外层作用域同名变量
- 可以替代立即执行函数的作用
### 2.2.3 块级作用域与函数声明
#### es5规定
函数只能在顶层作用域和函数作用域之中声明,不能在块级作用域声明,但是浏览器没有遵守这个规则

```js
//es5环境
function f(){console.log('I am outside!');}
(function(){
	if(false){
		function f(){console.log('I am inside!');}
	}
	f();//'I am inside!'
})()
```
因为if内的生声明的函数f会被提升到函数头部
#### es6规定
- 允许在块级作用域内声明函数
- 函数声明类似于var,即会提升到全局作用域或函数作用域的头部
- 同时函数声明还会提升到所在块级作用域的头部

```js
//es6环境
function f(){console.log('I am outside!');}
(function(){
	if(false){
		function f(){console.log('I am inside!');}
	}
	f();//f is not a function
})()
```
因为函数声明类似于var,所以吧f变量提升到函数头部
### 2.2.4 do表达式
- 提案:把块级作用域可以变为表达式,即可以返回值
```js
let x=do{
	let t=f();
	t*t+1;
};
```
## 2.3 const命令
### 2.3.1 基本用法
声明一个只读的常量,常量的值不能改变
### 2.3.2 本质
- const保证的并不是变量的值不得改动,而是变量指向的那个内存地址不得改动.
- const只能保证这个指针是固定的,至于它指向的数据结构改变,它无法保证
### 2.3.3 声明变量的6中方法
- var命令
- function命令
- let命令
- const命令
- import命令
- class命令 

## 2.4顶层对象属性
es5的顶层:
- 浏览器是window
- 在浏览器和web worke中,self只想顶层对象
- node环境是global
## 2.5 global对象
### 获取顶层对象
方法一:
```js
(typeof window!=='undefined'?window:(typeof process==='object'&&typeof require==='function'&&typeof global==='object')?global:this)
```
方法二:
```js
var getGlobal=function(){
	if(typeof self!==='undefined'){return self;}
	if(typeof window!=='undefined'){return window;}
	if(typeodf global!=='undefined'){return globsl;}
	throw new Errow('unable to locate global object')
}
```
#### 提案
global在语言层面被引入
垫片库模拟了这个提案
```js
//commonjs写法
require('system.global/shim')();

//es6模块
import shim from 'system.global/shim';shim();
```
