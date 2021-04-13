# 案例
```html
 <div id="app">
        {{res}}
    </div>
```
```javascript
var vm = new Vue({
        functional: true,
        el: "#app",
        data: {
            res: 123
        },
        watch: {
            res() {
                console.log("监听res");
            }
        }
    });
```
# 流程
## 初始化initWatch
```javascript
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```
监听可以定义多个回调例如:
```javascript
watch: {
            res: [
                () => {
                    console.log("监听1");
                },
                () => {
                    console.log("监听2");
                }
            ]
        }
```
调用createWatcher
## createWatcher
```javascript
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```
这边可以看到watch的写法有好几种例如:
```javascript
//第一种
res: function (){}
//第二种
res: {
        handler: ()=>{},
        deep: true,
        // immediate: true
}
//第三种
  res: {
        handler:"vm实例上的方法,例如method1",
        deep: true,
        // immediate: true
}      
```
我们继续看一下,他最终调用是vm.$watch(expOrFn, handler, options):
```javascript
 Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
```
首先定义一下是用户自定义watcher,然后创建watcher对象,如果掺入immediate属性则立即会触发一次回调,最后返回一个移除watcher的方法.
我们具体看一下:
```javascript
const watcher = new Watcher(vm, expOrFn, cb, options)
```
此时expOrFn为字符串res,之前我们分析watcher是由对expOrFn判断
```javascript
 // parse expression for getter
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = parsePath(expOrFn);
            if (!this.getter) {
                this.getter = noop;
                warn(
                    "Failed watching path: \"" + expOrFn + "\" " +
                    'Watcher only accepts simple dot-delimited paths. ' +
                    'For full control, use a function instead.',
                    vm
                );
            }
        }
```
所以他会走parsePath流程:
```javascript
/**
     * Parse simple path.
     */
    var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
    function parsePath(path) {
        if (bailRE.test(path)) {
            return
        }
        var segments = path.split('.');
        return function (obj) {
            for (var i = 0; i < segments.length; i++) {
                if (!obj) { return }
                obj = obj[segments[i]];
            }
            return obj
        }
    }
```
这个函数就是对类似a.b.c和a.b层级匹配,所以你在监听a.b可以监听到,返回一个回调函数,去获取监听对象的值,由于是响应式对象,所以此时会收集依赖.
所以上面的this.getter函数就是这个回到,当我们调用this.get()便把依赖收集上来了,如果有其中一个层级发生变化,都会派发更细给自定义观察者.
