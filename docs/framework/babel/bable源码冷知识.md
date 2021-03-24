## (0 , function)(param) 的作用
### 作用
`(0, function)(param)` 会将 this 指向全局对象，也就是 window 或者 global。
### 实践
```javascript
const obj = {
    run() {
        console.log(this);
        console.log('I\'m running');
    }
};

obj.run();

(0, obj.run)();

```
node环境
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611132517871-f254886c-8dfb-4c44-83bd-59edb444dbe3.png#align=left&display=inline&height=235&margin=%5Bobject%20Object%5D&name=image.png&originHeight=470&originWidth=1242&size=204995&status=done&style=none&width=621)
window环境
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611132578312-e80e8c5d-2e57-48e0-9da0-988c46b525b1.png#align=left&display=inline&height=224&margin=%5Bobject%20Object%5D&name=image.png&originHeight=448&originWidth=2572&size=178693&status=done&style=none&width=1286)
### 本质
其本质是 `js` 的 逗号操作符
**逗号操作符** 对它的每个操作对象求值（从左至右），然后返回最后一个操作对象的值。
如:
```javascript
let x = 1;

x = (x++, x);

console.log(x);
// expected output: 2

x = (2, 3);

console.log(x);
// expected output: 3

```
当执行(0, obj.run)();等价于
```javascript
const obj = {
    run() {
        console.log(this);
        console.log('I\'m running');
    }
};

obj.run();

(0, obj.run)();

等价于
var fn = (0, obj.run);//此时fn,this指向全局
fn();


```
