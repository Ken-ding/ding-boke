# **LRU策略**
在使用keep-alive时，可以添加prop属性include、exclude、max允许组件有条件的缓存。既然有限制条件，旧的组件需要删除缓存，新的组件就需要加入到最新缓存，那么要如何制定对应的策略？
LRU（Least recently used，最近最少使用）策略根据数据的历史访问记录来进行淘汰数据。LRU 策略的设计原则是，如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小。也就是说，当限定的空间已存满数据时，应当把最久没有被访问到的数据淘汰。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1617859869525-4a0ca5ee-0e3c-4a35-852b-c5bf2779e187.png#align=left&display=inline&height=577&margin=%5Bobject%20Object%5D&name=image.png&originHeight=577&originWidth=759&size=233300&status=done&style=none&width=759)

1. 现在缓存最大只允许存3个组件，ABC三个组件依次进入缓存，没有任何问题
1. 当D组件被访问时，内存空间不足，A是最早进入也是最旧的组件，所以A组件从缓存中删除，D组件加入到最新的位置
1. 当B组件被再次访问时，由于B还在缓存中，B移动到最新的位置，其他组件相应的往后一位
1. 当E组件被访问时，内存空间不足，C变成最久未使用的组件，C组件从缓存中删除，E组件加入到最新的位置



keep-alive缓存机制便是根据LRU策略来设置缓存组件新鲜度，将很久未访问的组件从缓存中删除。
# 案例
```html
<body>
    <div id="app">
        <keep-alive>
            <component :is="currentComp"></component>
        </keep-alive>

        <br>
        <button @click="ch">变更显示</button>
    </div>
</body>

<script type="text/x-template" id="demo1">
    <div>
        我是组件{{name}}
        <div>{{count}}</div>
        <button @click="change">增加</button>
    </div>
</script>

<script type="text/x-template" id="demo2">
    <div>
        我是组件{{name}}
        <div>{{count}}</div>
        <button @click="change">增加</button>
    </div>
</script>

<script>
    var Demo1 = {
        template: '#demo1',
        data() {
            return {
                name: "demo1",
                count: 0
            }
        },
        methods: {
            change() {
                this.count = ++this.count
            }
        }
    }
    var Demo2 = {
        template: '#demo2',
        data() {
            return {
                name: "demo2",
                count: 0
            }
        },
        methods: {
            change() {
                this.count = ++this.count
            }
        }
    }
    var vm = new Vue({
        el: "#app",
        data: {
            currentComp: "Demo1"
        },
        methods: {
            ch() {
                this.currentComp = this.currentComp === 'Demo1' ? 'Demo2' : 'Demo1'
            }
        },
        components: {
            Demo1,
            Demo2
        }
    });
</script>
```
# 组件实现
源码位置：src/core/components/keep-alive.js
```javascript
export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created () {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```
kepp-alive实际是一个抽象组件，只对包裹的子组件做处理，并不会和子组件建立父子关系，也不会作为节点渲染到页面上。在组件开头就设置abstract为true，代表该组件是一个抽象组件。
源码位置：src/core/instance/lifecycle.js
```javascript
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  // ...
}
```
那么抽象组件是如何忽略这层关系的呢？在初始化阶段会调用initLifecycle，里面判断父级是否为抽象组件，如果是抽象组件，就选取抽象组件的上一级作为父级，忽略与抽象组件和子组件之间的层级关系。
回到keep-alive组件，组件是没有编写template模板，而是由render函数决定渲染结果。
```javascript
const slot = this.$slots.default
const vnode: VNode = getFirstComponentChild(slot)
```
如果keep-alive存在多个子元素，keep-alive要求同时只有一个子元素被渲染。所以在开头会获取插槽内的子元素，调用getFirstComponentChild获取到第一个子元素的VNode。
```javascript
// check pattern
const name: ?string = getComponentName(componentOptions)
const { include, exclude } = this
if (
  // not included
  (include && (!name || !matches(include, name))) ||
  // excluded
  (exclude && name && matches(exclude, name))
) {
  return vnode
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  return false
}
```
接着判断当前组件是否符合缓存条件，组件名与include不匹配或与exclude匹配都会直接退出并返回VNode，不走缓存机制。
```javascript
const { cache, keys } = this
const key: ?string = vnode.key == null
  // same constructor may get registered as different local components
  // so cid alone is not enough (#3269)
  ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
  : vnode.key
if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance
  // make current key freshest
  remove(keys, key)
  keys.push(key)
} else {
  cache[key] = vnode
  keys.push(key)
  // prune oldest entry
  if (this.max && keys.length > parseInt(this.max)) {
    pruneCacheEntry(cache, keys[0], keys, this._vnode)
  }
}
vnode.data.keepAlive = true
```
匹配条件通过会进入缓存机制的逻辑，如果命中缓存，从cache中获取缓存的实例设置到当前的组件上，并调整key的位置将其放到最后。如果没命中缓存，将当前VNode缓存起来，并加入当前组件的key。如果缓存组件的数量超出max的值，即缓存空间不足，则调用pruneCacheEntry将最旧的组件从缓存中删除，即keys[0]的组件。之后将组件的keepAlive标记为true，表示它是被缓存的组件。
```javascript
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```
pruneCacheEntry负责将组件从缓存中删除，它会调用组件$destroy方法销毁组件实例，缓存组件置空，并移除对应的key。
```javascript
mounted () {
  this.$watch('include', val => {
    pruneCache(this, name => matches(val, name))
  })
  this.$watch('exclude', val => {
    pruneCache(this, name => !matches(val, name))
  })
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
```
keep-alive在mounted会监听include和exclude的变化，属性发生改变时调整缓存和keys的顺序，最终调用的也是pruneCacheEntry。
小结：cache用于缓存组件，keys存储组件的key，根据LRU策略来调整缓存组件。keep-alive的render中最后会返回组件的VNode，因此我们也可以得出一个结论，keep-alive并非真的不会渲染，而是渲染的对象是包裹的子组件。
# 组件渲染流程
渲染过程最主要的两个过程就是render和patch，在render之前还会有模板编译，render函数就是模板编译后的产物，它负责构建VNode树，构建好的VNode会传递给patch，patch根据VNode的关系生成真实dom节点树。
VNode构建完成后，最终会被转换成真实dom，而patch是必经的过程。为了更好的理解组件渲染的过程，假设keep-alive包括的组件有A和B两个组件，默认展示A组件。
### 初始化渲染
组件在patch过程是会执行createComponent来挂载组件的，A组件也不例外。
源码位置：src/core/vdom/patch.js
```javascript

function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```
isReactivated标识组件是否重新激活。在初始化渲染时，A组件还没有初始化构造完成，componentInstance还是undefined。而A组件的keepAlive是true，因为keep-alive作为父级包裹组件，会先于A组件挂载，也就是kepp-alive会先执行render的过程，A组件被缓存起来，之后对插槽内第一个组件（A组件）的keepAlive赋值为true，不记得这个过程请看上面组件实现的代码。所以此时的isReactivated是false。
接着会调用init函数进行组件初始化，它是组件的一个钩子函数：
```javascript
// 源码位置：src/core/vdom/create-component.js
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },
  // ...
}
```
createComponentInstanceForVnode内会new Vue构造组件实例并赋值到componentInstance，随后调用$mount挂载组件。
回createComponent，继续走下面的逻辑：
```javascript
if (isDef(vnode.componentInstance)) {
  initComponent(vnode, insertedVnodeQueue)
  insert(parentElm, vnode.elm, refElm)
  if (isTrue(isReactivated)) {
    reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
  }
  return true
}
```
调用initComponent将vnode.elm赋值为真实dom，然后调用insert将组件的真实dom插入到父元素中。
所以在初始化渲染中，keep-alive将A组件缓存起来，然后正常的渲染A组件。
### 缓存渲染
当切换到B组件，再切换回A组件时，A组件命中缓存被重新激活。
再次经历patch过程，keep-alive是根据插槽获取当前的组件，那么插槽的内容又是如何更新实现缓存?
```javascript
const isRealElement = isDef(oldVnode.nodeType)
if (!isRealElement && sameVnode(oldVnode, vnode)) {
  // patch existing root node
  patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
}
```
非初始化渲染时，patch会调用patchVnode对比新旧节点。
```javascript
// 源码位置：src/core/vdom/patch.js
function patchVnode (
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  // ...
  let i
  const data = vnode.data
  if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
    i(oldVnode, vnode)
  }
  // ...
}
```
patchVnode内会调用钩子函数prepatch。
```javascript
/ 源码位置：src/core/vdom/create-component.js
prepatch (oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
  const options = vnode.componentOptions
  const child = vnode.componentInstance = oldVnode.componentInstance
  updateChildComponent(
    child,
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  )
},
```
updateChildComponent就是更新的关键方法，它里面主要是更新实例的一些属性：
```javascript
// 源码位置：src/core/instance/lifecycle.js
export function updateChildComponent (
  vm: Component,
  propsData: ?Object,
  listeners: ?Object,
  parentVnode: MountedComponentVNode,
  renderChildren: ?Array<VNode>
) {
  // ...

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  const needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  )
  
  // ...
  
  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context)
    vm.$forceUpdate()
  }
}

Vue.prototype.$forceUpdate = function () {
  const vm: Component = this
  if (vm._watcher) {
    // 这里最终会执行 vm._update(vm._render)
    vm._watcher.update()
  }
}
```
从注释中可以看到needsForceUpdate是有插槽才会为true，keep-alive符合条件。首先调用resolveSlots更新keep-alive的插槽，然后调用$forceUpdate让keep-alive重新渲染，再走一遍render。因为A组件在初始化已经缓存了，keep-alive直接返回缓存好的A组件VNode。VNode准备好后，又来到了patch阶段。
```javascript
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```
A组件再次经历createComponent的过程，调用init。
```javascript
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },
}
```
这时将不再走$mount的逻辑，只调用prepatch更新实例属性。所以在缓存组件被激活时，不会执行created和mounted的生命周期函数。
回到createComponent，此时的isReactivated为true，调用reactivateComponent:
```javascript
function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i
  // hack for #4339: a reactivated component with inner transition
  // does not trigger because the inner node's created hooks are not called
  // again. It's not ideal to involve module-specific logic in here but
  // there doesn't seem to be a better way to do it.
  let innerNode = vnode
  while (innerNode.componentInstance) {
    innerNode = innerNode.componentInstance._vnode
    if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
      for (i = 0; i < cbs.activate.length; ++i) {
        cbs.activate[i](emptyNode, innerNode)
      }
      insertedVnodeQueue.push(innerNode)
      break
    }
  }
  // unlike a newly created component,
  // a reactivated keep-alive component doesn't insert itself
  insert(parentElm, vnode.elm, refElm)
}
```
最后调用insert插入组件的dom节点，至此缓存渲染流程完成。
小结：组件首次渲染时，keep-alive会将组件缓存起来。等到缓存渲染时，keep-alive会更新插槽内容，之后$forceUpdate重新渲染。这样在render时就获取到最新的组件，如果命中缓存则从缓存中返回VNode。
# 总结
keep-alive组件是抽象组件，在对应父子关系时会跳过抽象组件，它只对包裹的子组件做处理，主要是根据LRU策略缓存组件VNode，最后在render时返回子组件的VNode。缓存渲染过程会更新keep-alive插槽，重新再render一次，从缓存中读取之前的组件VNode实现状态缓存。
