## 基本思想
- 利用webpack多入口机制,设置多个入口文件和多个html模板
## 流程图
## 目录规范
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1612188963458-9f8f9912-8bcf-4511-b8a8-04d6bab1d5bb.png#align=left&display=inline&height=328&margin=%5Bobject%20Object%5D&name=image.png&originHeight=656&originWidth=710&size=127866&status=done&style=none&width=355)
config:webpack配置
node_modules:npm依赖
src:源码
src/api:网路请求工具
src/assets:资源相关
src/component:公共组件
src/pages:页面
src/pages/home:主页
src/pages/page-1:子页面1
src/pages/page-2:子页面2
utils:工具包
package-lock.json:npm版本锁定文件
packeage.json:npm依赖配置文件
## 代码实现
```javascript
const path = require("path");
const glob = require("glob");

/**
 *获取项目根目录
 */

const projectRoot = process.cwd();

exports.projectRoot = projectRoot;

exports.setEntryAndHtmlPlugin = function (entryFile) {
    //处理入口
    let custom = handleCustom(entryFile);

    //整合入口
    const entry = {};
    const htmlWebpackPlugins = [];
    custom.forEach((v) => {
        Object.assign(entry, v.entry)
        htmlWebpackPlugins.push(v.htmlWebpackPlugins)
    })
    return {
        entry,
        htmlWebpackPlugins,
    };
};

//处理自定义入口和模板
function handleCustom(entryFile) {
    let arr = [];

    let paths = entryFile;
    if (!paths.length) return arr;

    for (let i = 0, l = paths.length; i < l; i++) {
        // 处理自定义目录下的index
        let index_dir = resloveDirs(paths[i], 2);
        if (index_dir[0]) {
            arr.push(setEntryHtml('index', paths[i], index_dir[0], paths[i] === 'home' ? 0 : 2))
        }
        // 处理自定义目录下的子目录
        let dir = resloveDirs(paths[i], 1);
        if (!dir.length) continue;
        let reg = new RegExp(`src\/pages\/${paths[i]}\/(.*)\/index\.js`);

        for (let j = 0; j < dir.length; j++) {
            let match = dir[j].match(reg);
            arr.push(setEntryHtml(match[1], paths[i], dir[j], 1))
        }
    }
    return arr;
}

//设置入口和模板
// type 0 首页 1 自定义目录 2 自定义目录下index
function setEntryHtml(match, dirName, fullpath, type) {
    let templatePath = type !== 1
        ? `src/pages/${dirName}/${match}.html`
        : `src/pages/${dirName}/${match}/index.html`;
    let outputPath = type === 0
        ? `${match}`
        : type === 2
            ? `${dirName}/${match}`
            : `${dirName}/${match}/index`;
    let html = {
        template: path.join(projectRoot, templatePath),
        filename: `${outputPath}.html`,
        chunks: ["vendors", outputPath],
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
        },
    };
    let entry = {}
    entry[outputPath] = fullpath;
    return {
        entry: entry,
        htmlWebpackPlugins: html,
    }
}

function resloveDirs(dir, type) {
    if (type === 0) {
        // 处理首页
        return glob.sync(path.join(projectRoot, "index.js"));
    } else if (type === 1) {
        // 处理自定义目录下的子目录
        return glob.sync(path.join(projectRoot, `src/pages/${dir}/*/index.js`));
    } else if (type === 2) {
        // 处理自定义目录下的index
        return glob.sync(path.join(projectRoot, `src/pages/${dir}/index.js`));
    } else {
        return [];
    }
}

```
## 其他
### 页面骨架
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>newPage</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layui-src@2.4.5/dist/css/layui.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.cookie@1.4.1/jquery.cookie.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/layui-src@2.4.5/dist/layui.js"></script>
  </head>
  <body>
    <div class="g-container">
      <header>
        <!-- 标签栏 -->
        <%= require('raw-loader!@/components_/common/topBar/index.html')%>
        <!-- 头部 -->
        <%= require('raw-loader!@/components_/common/head/index.html')%>
      </header>
      <!-- 内容区 -->
      <div class="g-content"></div>
      <footer class="g-footer">
        <!-- 尾部 -->
        <%= require('raw-loader!@/components_/common/foot/index.html')%>
      </footer>
    </div>
  </body>
</html>


```
公共的依赖和组件可以在这里设置
### class组件
统一开发风格
```javascript
class basePage {
  constructor(props) {}
  init(){}
  render(){}
}
```
### 组件通信

- 采用构造函数props父子通信
- 封装eventBus类进行兄弟通信(订阅发布模式)
```javascript
/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-06-17 13:53:40
 * @LastEditTime: 2020-06-17 15:29:20
 * @LastEditors: dingxuejin
 */
/**
 * 消息通信工具
 */
function EventBus() {
  this.listeners = {};
}
/**
 * 订阅者集合
 */
EventBus.prototype.listeners = null;

/**
 *
 * @param {*} type
 * @param {*} callback
 * 添加订阅者
 */
EventBus.prototype.addEventListener = function (type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};
/**
 *
 * @param {*} type
 * @param {*} callback
 * 去除订阅者
 */
EventBus.prototype.removeEventListener = function (type, callback) {
  if (!(type in this.listeners)) {
    return;
  }
  var stack = this.listeners[type];
  for (var i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback) {
      stack.splice(i, 1);
      return this.removeEventListener(type, callback);
    }
  }
};
/**
 *
 * @param {*} event
 * 发布消息
 */
EventBus.prototype.dispatchEvent = function (event) {
  if (!(event.type in this.listeners)) {
    return;
  }
  var stack = this.listeners[event.type];
  event.target = this;
  for (var i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event);
  }
};

let eventBus=new EventBus();

export default eventBus;

```
### 页面权限
利用骨架组件,可以对不同的页面增加权限配置






