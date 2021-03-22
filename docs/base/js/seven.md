# 函数表达式
- 函数表达式的特征
- 使用函数实现递归
- 使用闭包定义私有变量
## 函数声明提升
执行代码之前会先读取函数声明,函数表达式不会被函数提升
```
var functionName=function(arg0,arg1,arg2){
	//函数体
}
```
## 深入理解递归
>定义:函数自己调用自己

### 示例1:阶乘函数
一个正整数的阶乘（英语：factorial）是所有小于及等于该数的正整数的积，并且有0的阶乘为1。自然数n的阶乘写作n!
```
0!=1;
1!=1
2!=1x2
3!=1x2x3
...
n!=1x2x3...xn
```
#### 非递归方式实现
采用乘/赋值(*=)实现
```
function factorial(n){
    var count=1;
    for(var i=0;i<n;i++){
        count*=(i+1);
    }
    return count
}

console.log(factorial(1));
```
#### 递归思想实现
```
0!=1;
1!=1x0!
2!=1!x2
3!=2!x3
...
n!=nx(n-1)!
```
```
function factorial(n){
    if(n<=1)return 1;
    return factorial(n-1)*n;
}
console.log(factorial(5));
```
通过不停的调用自身,n*(n-1)*(n-2)*(n-3)....*2*1就得到结果了
### 斐波那契数列
经典的斐波那契数列：1，1，2，3，5，8，13……即从第三项起，每一项的值是前两项值的和。现在求第n项的值。
```
function fibonacci(n){
    //如果第一项或第二项,则直接返回1
    if(n===1||n===2)return 1;
    //否则,返回前两项的和
    return fibonacci(n-1) + fibonacci(n-2)
}

console.log(fibonacci(5));

fibonacci(5)= fibonacci(4)+fibonacci(3)

fibonacci(4)=fibonacci(3)+fibonacci(2)

fibonacci(3)=fibonacci(2)+fibonacci(1)

fibonacci(2)=1;

fibonacci(1)=1;
```
有缓存的斐波那契数列
```
var fibonacci=(function(){
    var cache={};
    return function(n){
        if(cache[n])return cache[n];
        if (n === 1 || n === 2) return 1;
        return cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    }
})();
console.log(fibonacci(5));
```
利用闭包的思想，我们在闭包中定义一个缓存对象cache，将计算过的值存进该对象中。
### 递归实现深拷贝
#### json的解析和序列化
```
var obj={
    name:"Bob",
    age:123,
    sayname:function(){},
    arr:[1,2,3],
}

var newObj=JSON.parse(JSON.stringify(obj));//克隆obj,但是函数不会被克隆

console.log(obj);//{ name: 'Bob', age: 123, sayname: [Function: sayname], arr: [] }
console.log(newObj);//{ name: 'Bob', age: 123, arr: [ 1, 2, 3 ] }
```
但是类似函数这种属性不会克隆
#### 递归实现
```
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}
```
### 递归遍历元素的所有子节点
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <div class="root1">
            <div class="root1-1"></div>
            <div class="root1-2"></div>
            <div class="root1-3"></div>
        </div>
        <div class="root2">
            <div class="root2-1"></div>
            <div class="root2-2"></div>
            <div class="root2-3"></div>
        </div>
        <div class="root3">
            <div class="root3-1"></div>
            <div class="root3-2"></div>
            <div class="root3-3"></div>
        </div>
    </div>
</body>
</html>
<script>
function getChildNodes(root,callback){
    if(root&&root.children&&root.children.length){
        Array.from(root.children).forEach((node)=>{
                callback && typeof callback === 'function' && callback(node);
                getChildNodes(node,callback);
        })
    }
}
var root=document.getElementById('app');
getChildNodes(root,function(node){
    console.log(node);
});
</script>
```
### 二分法快排
 1. 在数据集之中，选择一个元素作为"基准"（pivot）
 2. 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边
 3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止
```
var a = [12, 1, 2, 7, 9, 11, 4, 5, 10, 0];

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

console.log(quickSort(a));//[0, 1,  2,  4,  5,7, 9, 10, 11, 12]
```
### 树结构中可以使用递归
```
//数据
const data = [
    {
        name: 'a',
        children: [
            { name: 'b', children: [{ name: 'e' }] },
            { name: 'c', children: [{ name: 'f' }] },
            { name: 'd', children: [{ name: 'g' }] },
        ],
    },
    {
        name: 'a2',
        children: [
            { name: 'b2', children: [{ name: 'e2' }] },
            { name: 'c2', children: [{ name: 'f2' }] },
            { name: 'd2', children: [{ name: 'g2' }] },
        ],
    }
]
```

#### 深度优先遍历
深度优先就是自上而下的遍历搜索

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201101165256614.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)

- 深度优先不需要记住所有的节点, 所以占用空间小
- 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点
- 深度优先采用的是堆栈的形式, 即先进后出
```
// 深度遍历, 使用递归
function getName(data) {
    const result = [];
    data.forEach(item => {
        const map = data => {
            result.push(data.name);
            data.children && data.children.forEach(child => map(child));
        }
        map(item);
    })
    return result.join(',');
}
```

#### 广度优先遍历
广度优先则是逐层遍历
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201102093856422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
- 广度优先需要先记录所有的节点占用空间大
- 广度优先则采用的是队列的形式, 即先进先出
```
// 广度遍历, 创建一个执行队列, 当队列为空的时候则结束
function getName2(data) {
    let result = [];
    let queue = data;
    while (queue.length > 0) {
        [...queue].forEach(child => {
            queue.shift();
            result.push(child.name);
            child.children && (queue.push(...child.children));
        });
    }
    return result.join(',');
}
```
## 深入理解闭包
>定义:有权访问另一个函数作用域中的变量的函数

```
		<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
<script>
  function fn1() {
    var a = 1;
    function fn2() {
      console.log(a);
    }
    debugger
    fn2
  }
  fn1();
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201102182552844.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
上面的示例,函数fn2包含了两个闭包,fn1和window
### 如何产生闭包
当一个嵌套的内部函数引用了外部函数的的变量时,就产生了闭包.
### 创建方式
#### 将函数作为一个函数的返回值
```
function fn3(){
    var a = 1;
    return function fn4() {
      console.log(a);
    }
  }
  fn3()();//1
```
由于fn4引用了fn3的变量,所以形成了闭包
#### 将一个匿名函数当作实参传入
```
function fn6(fn) {
      fn()
  }
  function fn5(){
    var a=1;
    fn6(function(){
        console.log(a);
    })
  }
debugger
  fn5()
```
#### 闭包与变量
作用域链的副作用,即闭包只能取得包含函数中任何变量的最后一个值,闭包所保存的是整个变量对象,而不是某个特殊的变量.
```
 function demo(){
    var result=new Array();
    for(var i=0;i<10;i++){
        result[i]=function(num){
            return i;
        }
    }
    return result;
  }
 debugger
 demo();
```
这个函数,表面上看,似乎每个函数都应该返回自己的索引值.即位置0的函数返回0,位置1的函数返回1,以此类推.但实际上,每个函数返回10.因为每个函数的作用域链中都保存着demo函数的活动对象,所以他们引用的都是同一个变量.

解决方式:再用一个匿名函数保存,每一个索引值
```
function demo(){
    var result=new Array();
    for(var i=0;i<10;i++){
        result[i]=function(num){
            return function(){
                return num;
            };
        }(i)
    }
    return result;
  }
 debugger
 demo();
```
#### 关于this对象
- this对象是在运行时基于函数的执行环境绑定的
- 匿名函数的执行环境具有全局性,因此其this指向全局对象
```
var name="The Window";

    var obj={
        name:"my obj",

        getName:function(){
            return function(){
                console.log(this.name);
            }
        }
    }
    obj.getName()();//The Window
```
#### 模仿块级作用域
```
 (function(){
        //使用函数作用域,来创建块级作用域
        var i=3;
        function test(){
            console.log(i);
        }

        test();
    })()
    
    function test(){
        console.log(i);////Uncaught ReferenceError: i is not defined
    }
```
使用自执行函数创建一个函数作用域,变量test和属于匿名函数的成员变量,无法被外界访问,test函数构成了闭包条件,所以外部的test与内部的test构不成冲突,采用这种方式可以创造块级作用域
#### 静态私有变量
```
 (function(){
        //私有变量和私有函数
        var privateVariable=10;

        function privateFunction(){
            return false;
        }

        //构造函数
        MYObject=function(){};

        //公有/特权方法
        MYObject.prototype.publicMethod=function(){
            privateVariable++;
            console.log(privateVariable);
            return privateFunction();
        }

    })()
    var o=new MYObject();
    o.publicMethod();//11
```
这个模式创建了一个私有作用域,并在其中封装了一个构造函数及相应的方法
#### 模块模式
```
ar singleton=function(){
        //私有变量和函数
        var privateVariable=10;

        function privateFunction(){
            return false;
        }

        return {
            publicProperty:true,
            publicMethod:function(){
                privateVariable++;
                console.log(privateVariable);
                return privateFunction();
            }
        }

    }()
```
这个模块模式使用了一个返回对象的匿名函数,在这个匿名函数内部,首先定义了私有变量和函数,然后,将一个对象字面量作为函数的值返回.返回的对象字面量中值只包含可以公开的属性和方法,由于这个对象是在匿名函数内部定义的,因此它的公有方法有权访问私有变量和函数.
#### 增强的模块模式
模块模式
```
 var application=function(){
        //私有变量和函数
        var components=new Array();

        //初始化
        components.push(new BaseComponent());

        //公共
        return{
            getComponentCount:function(){
                return components.length;
            },
            registerComponent:function(component){
                if(typeof component=="object"){
                    components.push(component);
                }
            }
        }
    }()
```
增强后
```
 var application=function(){
        //私有变量和函数
        var components=new Array();

        //初始化
        components.push(new BaseComponent());

        //创建application的一个局部副本
        var app=new BaseComponent();

        //公共接口
        app.getComponentCount=function(){
            return components.length;
        }

        app.registerComponent=function(component){
            if(typeof component=="object"){
                components.push(component)
            }
        }

        return app;
    }()
```

