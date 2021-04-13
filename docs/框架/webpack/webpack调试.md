ps:采用vscode调试webapck
# 创建webpack调试项目
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1617199533224-f4c1fa05-ccc4-4429-b3fe-6e04c2e757b7.png#align=left&display=inline&height=378&margin=%5Bobject%20Object%5D&name=image.png&originHeight=378&originWidth=450&size=65729&status=done&style=none&width=450)
# 安装依赖
```javascript
npm i webpack-cli webpack --save-dev
```
# 创建launch.json
```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "debug",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run",
                "debug"
            ],
            "port": 5858
        }
    ]
}
```

- runtimeExecutable:程序的执行器，默认是node，我们将其改成npm
- runtimeArgs:传入执行器的参数。也就是run和debug
- port:监听的端口号。因为debug指令中起的端口是5858，所以监听端口5858。
# 配置package.json
```json
 "scripts": {
        "debug": "node --inspect=5858 ./node_modules/webpack/bin/webpack.js --config webpack.config.js"
    },
```
在scripts选项中添加debug
# 创建webpack.config.js
```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/simpleCase/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```
我这边用的我的目录结构入口,可以换成你们自己的入口文件
# 打点
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1617199913408-b45ec3d0-f163-4349-b703-a89421efe8fc.png#align=left&display=inline&height=1836&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1836&originWidth=2916&size=1306468&status=done&style=none&width=2916)
