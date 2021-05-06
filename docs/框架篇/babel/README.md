## 简单案例
简单的案例开到道进入神秘的bable
分析ast源码的工具 [AST Explorer](https://astexplorer.net/)
```javascript
//用来解析源代码为ast
const parser = require('@babel/parser')
//用来操作ast
const t = require('@babel/types')
//用来遍历ast
const traverse = require('@babel/traverse').default
//用来生产处理后的代码
const generate = require("@babel/generator").default


let code = 'var ab = 123;'

const ast = parser.parse(code);


traverse(ast, {
 Identifier(path) {
        path.node.name = path.node.name.split('').reverse().join('');
      },
      VariableDeclaration(path){
      	path.node.kind="let";
      },
      NumericLiteral(path){
        path.replaceWith(t.arrayExpression([t.stringLiteral("1"),t.booleanLiteral(false),t.nullLiteral(),t.objectExpression([t.objectProperty(t.stringLiteral("name"), t.stringLiteral("123"))])]))
      }
})

const output = generate(ast, {}, code)
```
## 命令处理
```javascript
"scripts": {
        "build": "babel src --copy-files --out-dir lib"
 },
```


流程如下:

- npm根据node_modules的.bin目录找到babel命令,npm根据babel-cli中package.json文件的bin规定的入口提取

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203702409-232fbcb8-fc2d-4f36-aa4a-2bc492d9fa43.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1295097&status=done&style=none&width=1458)

- 执行babel-cli下面的lib/babel/index.js

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203681533-a42804c7-1fd4-41b0-8834-5450db35091c.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1286406&status=done&style=none&width=1458)

- 处理输入命令

这一阶段主要规范化用户的参数命令
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203658092-95233995-9e62-4ea7-9263-65179386e204.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1283461&status=done&style=none&width=1458)
## 编译前

- 确定编译目标

编译目标:文件或文件夹
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611200415523-d6d6a2e8-1d96-4a18-a7ea-b38c3061eaef.png#align=left&display=inline&height=233&margin=%5Bobject%20Object%5D&name=image.png&originHeight=466&originWidth=1142&size=120937&status=done&style=none&width=571)


- 确定编译文件相对路径

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203639804-46d18bb1-5064-4495-a381-34592cb5cf13.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1537103&status=done&style=none&width=1458)


- 加载bable文件配置

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203571314-9afc3b26-8054-4ba2-a94d-164656ffe2b4.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1506492&status=done&style=none&width=1458)

- 获取编译源码

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203553936-495da06b-8ac9-4987-a392-b18087b92959.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1505822&status=done&style=none&width=1458)
## 编译中

- 规范文件对象file,使用bable-paser编译为ast,规范配置对象并合并

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203524182-72525273-8007-4ead-9f11-9385cf91198d.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1466748&status=done&style=none&width=1458)

- 使用bable-travers遍历文件ast对象,并使用bable-type根据配置项处理源代码



![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203383973-0ba4023e-fd74-46e6-ab8a-a0ffeae1b7d8.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1444000&status=done&style=none&width=1458)

- 使用bable-generate生成处理后代码

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1611203492045-efe1545c-93c4-4e80-b980-199de2b290a2.png#align=left&display=inline&height=918&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1397490&status=done&style=none&width=1458)
