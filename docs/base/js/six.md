# 面向对象的程序设计
- 理解对象属性
- 理解并创建对象
- 理解继承
## 理解对象
### 属性类型
ECMA-262定义了只有内部才用的特性(attribute)时,描述了属性(property)的各种特征.
为了表示特性的内部值,该规范把它们放在了两对儿方括号中,例如[[Enumerable]]
#### 数据属性
- [[Configurable]]:是否可以通过delete删除属性重新定义属性,能否修改属性的特性,能否把属性修改为访问器属性.默认false
- [[Enumerable]]:能否通过for-in循环返回属性.默认false
- [[Writable]]:能否修改属性的值.默认false
- [[Value]]:这个属性的数据值.默认undefined

Object.defineProperty(属性所在对象,属性名称,一个描述对象)

```
var Person={};
Object.defineProperty(Person,"name",{
	writable:false,
	value:"tom"
})
console.log(Person.name);//tom
Person.name="bob";//因为设置了writable:false,所以修改不了
console.log(Person.name);//tom
```
#### 访问器属性
-  [[Configurable]]:是否可以通过delete删除属性重新定义属性,能否修改属性的特性,能否把属性修改为访问器属性.默认false
- [[Enumerable]]:能否通过for-in循环返回属性.默认false
- [[Get]]:读取属性时调用的函数.默认值undefined
- [[Set]]:写入属性时调用的函数.默认值undefined

访问器属性不能直接定义,必须使用Object.defineProperty来定义

```
var book={
	_year:2004,
}

Object.defineProperty(book,"year",{
	get:function () {
        return this._year;
    },
	set:function (newValue) {
        if(newValue!==this._year){
            this._year=newValue;
        }
    }
})

console.log(book.year);//2004
book.year=2005;
console.log(book.year);//2005
```
### 定义多个属性
>可以一次定义一个或多个属性

Object.defineProperties与Object.defineProperty,一个以ies结尾,一个以y结尾,别记错了
```
var book1={};

Object.defineProperties(book1,{
    _year:{
        writable:true,
        value:2004
    },
    year:{
        get:function () {
            return this._year;
        },
        set:function (newValue) {
            if(newValue!==this._year){
                this._year=newValue;
            }
        }
    },
    edit:{
        writable:true,
        value:1 
    }
})

console.log(book1.year);//2004
book1.year=2005;
console.log(book1.year);//2005
console.log(book1.edit);//1
```
### 读取属性的特性
Object.getOwnPropertyDescription()方法,可以取得给定属性的描述符.这个方法接收两个参数:属性所在的对象和要读取其描述符的属性名称.
```
var book1={};

Object.defineProperties(book1,{
    _year:{
        writable:true,
        value:2004
    },
    year:{
        get:function () {
            return this._year;
        },
        set:function (newValue) {
            if(newValue!==this._year){
                this._year=newValue;
            }
        }
    },
    edit:{
        writable:true,
        value:1 
    }
})

var descriptor1=Object.getOwnPropertyDescriptor(book1,"_year");
var descriptor2=Object.getOwnPropertyDescriptor(book1,"year");
console.log(descriptor1);//{ value: 2005, writable: true, enumerable: false, configurable: false }
console.log(descriptor2);//{get: [Function: get],set: [Function: set],enumerable: false,configurable: false}
```

## 创建对象
### 工厂模式
抽象了创建具体对象的过程

**示例**
```
function createPerson(name,age,job){
    var o=new Object();
    o.name=name;
    o.age=age;
    o.job=job;
    o.sayName=function (params) {
        console.log(this.name);
    };
    return o;
}

var person1=createPerson("Nicholas",29,"Software,Engineer");
var person2=createPerson("Nicholas",29,"Doctor");
console.log(person1);
console.log(person2);
```
### 构造函数模式
按照惯例,构造函数始终都应该以一个大写字母开头,借鉴OO语言.

#### 自定义构造函数
```
function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.sayName=function(){
        console.log(this.name);
    }
}

var person3=createPerson("Nicholas",29,"Software,Engineer");
var person4=createPerson("Nicholas",29,"Doctor");
console.log(person3);
console.log(person4);
```
#### new操作符的原理实现

- 创建一个新对象;
- 将这个对象的_proto_成员指向构造函数的prototype成员对象
- 把构造函数的this指针替换成这个新对象,并调用
```
//构造函数
function Foo(){
    this.msg="测试";
};

Foo.prototype.test=function(){
    console.log(this.msg);
}

//仿写的new操作符
function New1(fn){
    var o={};
    o.__proto__=fn.prototype;
    fn.call(o);
    return o;
}

//测试
var obj= New1(Foo);
obj.test();//测试
```
其实new操作符就是一个把新对象关联到构造函数的语法糖,与Object.create()行为类似

```
//构造函数
function Foo(){
    this.msg="测试";
};

Foo.prototype.test=function(){
    console.log(this.msg);
}

function New2(fn){
    var o=Object.create(fn.prototype);
    fn.call(o);
    return o;
}

//测试New2
var obj= New2(Foo);
obj.test();//测试
```
下面这幅图看明白,,就会懂原型和原型链的概念
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201028212458690.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
#### 把构造函数当作函数
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
<script>
    function Person(name,age) {
        this.name=name;
        this.age=age;
        this.sayName=function(){
            console.log(this.name);
        }
    };


    //当作构造函数使用
    var person=new Person("Bob",23);
    person.sayName();//Bob

    //当作普通函数使用,函数的作用域是window
    Person("Tom",30);
    window.sayName();//Tom

    //在另一个对象中调用
    var o=new Object();
    Person.call(o,"Alice",40);
    o.sayName();//Alice

</script>
```
#### 构造函数的问题
```
function Foo1(){
    this.msg="测试";
    this.demo=function(){
        console.log(123);
    }
};

var p1=new Foo1();
var p2=new Foo1();
console.log(p1.demo===p2.demo);//false
```
构造函数Foo1,每次创建实例的时候,都活重新创建一次this.demo,导致每个实例方法都不一样,这种问题,可以通过使用原型模式来解决.
### 原型模式
- 每个函数都有一个prototype属性,这个属性是一个指针,指向一个对象,而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法.
```
function Person(){};

Person.prototype.name="Tom";
Person.prototype.sayName=function(){
    console.log(this.name);
}

var p1=new Person();
var p2=new Person();

console.log(p1.sayName===p2.sayName);//true

p1.sayName();//Tom
p2.sayName();//Tom
```
这个示例,就是每个实例都共享构造函数Person的prototype
#### 理解原型对象
只要创建一个函数,就会根据一组特定的规则为该函数创建一个ptorotype属性,这个属性指向函数的原型对象.在默认情况下,所有原型对象都会自定获得一个constructor属性,这个是一个指向prototype属性所在函数的指针.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201028235045482.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlbl9kaW5n,size_16,color_FFFFFF,t_70#pic_center)
上图展示了Person构造函数,Person的原型对象和Person的实例之间的关系
#### isPrototypeOf
本质上讲,[[Prototype]],指向调用isPrototypeOf()方法的对象(Person.prototype)
```
Person.prototype.name="Tom";
Person.prototype.sayName=function(){
    console.log(this.name);
}
var p1=new Person();
console.log(Person.prototype.isPrototypeOf(p1));//true
```
#### getprototypeOf
这个方法其实是返回对象的原型
```
Person.prototype.name="Tom";
Person.prototype.sayName=function(){
    console.log(this.name);
}
var p1=new Person();
console.log(Object.getPrototypeOf(p1)==Person.prototype);
```
#### hasOwnProperty
可以用来区分实例对象上属性是否是实例属性
```
function Person(){};

Person.prototype.age="Bob";

var p=new Person();

p.name="Bob";

console.log(p.hasOwnProperty("name"));//true
console.log(p.hasOwnProperty("age"));//false
```
#### 原型与in操作符
##### 单独使用in
in操作符会在通过对象能够访问给定属性时返回ture,无论该属性存在实例中还是原型中
```
function Person(){};

Person.prototype.age="Bob";

var p=new Person();

p.name="Bob";

//利用in判断属性是否是原型属性
function hasPrototypeProperty(o,pro){
    return !Object.hasOwnProperty(pro)&&(pro in o)
}

console.log(hasPrototypeProperty(p,"name"));//false
console.log(hasPrototypeProperty(p,"age"));//true
```
##### 在for-in中使用in
###### for...in
返回的是所有能够通过对象访问的,可枚举的属性,其中既包括存在于实例中的属性,也包括存在于原型中的属性,屏蔽了原型中不可枚举的属性(即[[Enumerable]]标记为fasle的属性)
```
function Person(){};

Person.prototype.age="Bob";

var p=new Person();

p.name="Bob";

for(var prop in p){
    console.log(prop)//name,age
}
```
###### Object.key
取得对象上所有可枚举的实例属性
```
unction Person(){};

Person.prototype.age="Bob";

var p=new Person();

p.name="Bob";

console.log(Object.keys(p));//[ 'name' ]
```

#### 更简单的原型语法
每添加一个属性都要用Person.prototype敲一遍,比较麻烦,采用下面简单写法
```
function Person(){}

    Person.prototype={
        constructor:Person,
        name:"Bob",
        age:29
    }

    console.log(Person.prototype);
```
这种写法会有两个问题:

- prototype被重写,__proto__被指向Object.prototype
- constructor,不在指向Person
#### 原型的动态性
- 对原型对象所做的任何修改都能立即从实例上反应出来
```
 function Person(){}

   
    var p= new Person();
    
    Person.prototype.name="Bob";

    console.log(p.name);
```
- 重写原型对象切断了现有原型与任何之间已经存在的对象实例之间的联系
#### 原生对象的原型
所有原生引用类型(Object,Array,String等)都在其构造函数的原型上定义了方法
#### 原型对象的问题
原型中所有属性是被很多实例共享的
### 组合使用构造函数模式和原型模式 
- 构造函数模式用于定义实例属性
- 原型模式用于定义方法和共享属性
```
function Person(name,age){
    this.name=name;
    this.age=age;
}

Person.prototype={
    constructor:Person,
    sayName:function(){
        console.log(this.name);
    }
}
```
 这种构造函数与原型混成的模式,是目前在ECMAScript中使用最广泛,认同度最高的一种创建自定义类型的方法
### 动态原型模式
 通过检查某个应该存在的方法是否有效,来决定是否需要初始化原型
```
 function Person(name,age){
    this.name=name;
    this.age=age;
    if(typeof this.sayName!="function"){
        //只会被初始化一次
        Person.prototype.sayName=function(){
            console.log(this.name);
        }
    }
}

var p=new Person("Bob",29);
console.log(p);
var p1=new Person("Bob",29);
p.sayName();
```
### 寄生构造函数模式
创建一个函数,该函数的作用仅仅是封装创建对象的代码,然后返回新创建的对象

```
function Foo(name,age) {
    var o=new Object();
    o.name=name;
    o.age=age;
    return o;
}

function NEW_OBJECT(Foo) {
  arguments=Array.prototype.slice.call(arguments,1)

  var obj = {};
  obj.__proto__ = Foo.prototype;
  let o=Foo.apply(obj, arguments);
  if(typeof o=="object"){
    obj=o
  }
  return obj;
}

var f=NEW_OBJECT(Foo,"Bob",29);
console.log(Object.getPrototypeOf(f));
console.log(f.__proto__===Foo.prototype);//返回的对象与构造函数和构造函数的原型属性之间没有关系

var f1= new Foo("Tom",23);
console.log(Object.getPrototypeOf(f1));
console.log(f1.__proto__===Foo.prototype);//返回的对象与构造函数和构造函数的原型属性之间没有关系


function Foo1(name,age) {}
var aa=NEW_OBJECT(Foo1);
console.log(aa.__proto__===Foo1.prototype);
```
其实这种方式就是在构造函数中初始化一个对象,并返回出去,和正常创建对象方式没有区别,主要是把创建对象过程封装起来
### 稳妥构造函数
- 稳妥对象:没有公共属性,而且其方法也不引用this的对象
- 适用于安全的环境中或者在防止数据被其他应用程序改动时使用
```
function Person(name,age){
    console.log(this);
    //创建要返回的对象
    var o =new Object();
    //可以在这里创建私有变量
    o.getName=function(){
        return name;
    }
    return o;
}

var o =Person("Timi");

console.log(o.getName());//Timi
```
