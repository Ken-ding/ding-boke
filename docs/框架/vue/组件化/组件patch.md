# vnode结构


# ![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1617093663158-a1e67f5c-25d5-4dca-bec3-1148a499e7e5.png#align=left&display=inline&height=996&margin=%5Bobject%20Object%5D&name=image.png&originHeight=996&originWidth=1802&size=399736&status=done&style=none&width=1802)
其中vue-component-2-Mycomponent就是我们目标组件
# patch
在src/platforms/web/runtime/patch.js:
```javascript
 return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }
     ......
          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          )
     .....  
  }
```
# createElm
在
```javascript
 function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
 	.... 
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }
	....
  }
```
只保留核心代码,当父组件的createElm执行完会递归执行子元素的vnode,当执行到目标组件时会调用createComponent;
# createComponent
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
会获取上节我们定义在组件中的钩子函数,并初始化组件实例
```javascript
 const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */)
      }
```
```javascript
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
```
# createComponentInstanceForVnode
```javascript
    function createComponentInstanceForVnode(
        vnode, // we know it's MountedComponentVNode but flow doesn't
        parent // activeInstance in lifecycle state
    ) {
        var options = {
            _isComponent: true,
            _parentVnode: vnode,
            parent: parent
        };
        // check inline-template render functions
        var inlineTemplate = vnode.data.inlineTemplate;
        if (isDef(inlineTemplate)) {
            options.render = inlineTemplate.render;
            options.staticRenderFns = inlineTemplate.staticRenderFns;
        }
        return new vnode.componentOptions.Ctor(options)
    }
```
主要是调用组件选项中的构造函数,进行初始化:
```javascript
const Sub = function VueComponent (options) {
      this._init(options)
    }
```
组件初始化与主流程初始化有点区别:
```javascript
ue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  // ...
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  } 
}
```
这里首先是合并 options 的过程有变化，_isComponent 为 true，所以走到了 initInternalComponent 过程，这个函数的实现也简单看一下：
```javascript
export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
```
这个过程我们重点记住以下几个点即可：opts.parent = options.parent、opts._parentVnode = parentVnode，它们是把之前我们通过 createComponentInstanceForVnode 函数传入的几个参数合并到内部的选项 $options 里了。
再来看一下 _init 函数最后执行的代码：
```javascript
if (vm.$options.el) {
   vm.$mount(vm.$options.el)
}
```
由于组件初始化的时候是不传 el 的，因此组件是自己接管了 $mount 的过程:
```javascript
 child.$mount(hydrating ? vnode.elm : undefined, hydrating)
```
组件渲染流程与vue根实例渲染类似,就多废述了;
# 总结

- 子组件初始化是在父组件patch阶段,也就是生成dom时
- 子组件比父组件先生成真实dom
- 如果子组件里面又含有组件,会深度优先遍历到最深的组件先生成dom







