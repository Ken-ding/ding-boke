# dc-cli
## 介绍


dc-cli是记忆vue-cli和create-react-app的基础上拓展便于dc组织项目使用的的脚手架工具


## 安装


可以使用下列任一命令安装这个新的包：


```javascript
npm install -g @dcorg/cli
```


安装之后，你就可以在命令行中访问 dc 命令。你可以通过简单运行 dc --help，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。


```javascript
dc --help
```


你还可以用这个命令来检查其版本是否正确：


```javascript
dc --version
```


## 基础


### 功能点


- vue模板创建
- react模板创建
- vue-cli功能使用
- react-cli功能使用



### 快速原型开发


默认创建vue模板创建:


```sh

dc my-app 

# OR

dc my-app --template

# OR

dc my-app --template vue
```


创建react模板创建:


```sh

dc my-app --template react
```


创建express模板创建:


```sh

dc my-app --template express
```


使用react-cli创建模板:


```sh

dc my-app --use-react-cli ["--use-npm","--option"] # --use-react-cli后面是react-cl自身的命令参数
```


使用vue-cli创建模板:


```sh

dc my-app --use-vue-cli ["init"] # --use-vue-cli后面是vue-cl自身的命令参数
```
