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
            a: 1,
            b: 2
        },
        computed: {
            res() {
                return this.a + this.b
            }
        }
    });
```
# 流程
## 初始化initComputed
位置在src/core/instance/state.js
```javascript
const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
```
主要接受两个参数vue实例,此时是vue的根实例,实例选项的computed属性,定义一个watcher空对象,遍历computed获取属性,computed有两种写法:
```javascript
//第一种
computed: {
     res() {
        return this.a + this.b
     }
}

//第二种
computed: {
     res:{
       get(){
       	 return this.a + this.b
       }
     }
}

```
获取getter函数如果res是函数则直接复制,如果不是则获取对详细的get函数,创建计算属性观察者,并以属性key,添加到_computedWatchers集合中,我们看一下watcher:
```javascript
export default class Watcher {

....
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }
.....
```
由于this.lazy是true所以此时初始化计算属性并没有立刻求值this.get是用于求值的,只是此时把this.dirty设置为true,什么时候求值我们后面再讲.
如果res没有被定义在实例中则调用defineComputed函数:
## defineComputed
```javascript
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
这个函数作用主要是给res创建get函数并定义到实例上,可以vm.res访问,当访问时会触发get函数,由于我们是非服务器渲染所以shouldCache为true,所以get函数为createComputedGetter
## createComputedGetter
```javascript
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```
此函数返回一个闭包函数,当我们渲染函数执行到res时,会获取一下res,此刻会访问到res的get函数也就是computedGetter,由于执行环境vm中所以可以发访问到_computedWatchers,根据此时的拿到观察者,由于初始化时dirty为true所以会执行 watcher.evaluate()去求值,我们看一下evaluate函数:
## evaluate
```javascript
 evaluate () {
    this.value = this.get()
    this.dirty = false
  }
```
也就是调用this.get()求值,并收集this.a和this.b的计算属性观察者,后面就是Dep.target是渲染函数,所以调用watcher.depend()去收集依赖:
```javascript
 Watcher.prototype.depend = function depend() {
        var i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    };
```
遍历执行把渲染函数观察者添加到this.a和this.b中;
当this.a或this.b数据变化后,会先触发计算属性观察者,然后触发渲染函数观察者,把dirty设置为true,后面调用渲染函数会触发res的get函数,由于此刻dirty为ture所以会立刻求值;
