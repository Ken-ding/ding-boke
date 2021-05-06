# _update
_update方法在src/core/instance/lifecycle
```javascript
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
        const vm: Component = this
        const prevEl = vm.$el
        const prevVnode = vm._vnode
        const restoreActiveInstance = setActiveInstance(vm)
        vm._vnode = vnode
        //调用patch方法
        if (!prevVnode) {
            vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
        } else {
            // updates
            vm.$el = vm.__patch__(prevVnode, vnode)
        }
        restoreActiveInstance()
    
        if (prevEl) {
            prevEl.__vue__ = null
        }
        if (vm.$el) {
            vm.$el.__vue__ = vm
        }

        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
            vm.$parent.$el = vm.$el
        }
    }
```
主要作用

- 调用__patch__函数
# __patch__
在src/platforms/web/runtime/index.js定义:
```javascript
import { patch } from './patch'
.....
// 在vue原型中添加__patch__属性,指向patch函数
Vue.prototype.__patch__ = inBrowser ? patch : noop
```
# patch
```javascript
/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)
//创建patch函数
export const patch: Function = createPatchFunction({ nodeOps, modules })

```
主要返回一个PatchFunctio
# createPatchFunction
定义在src/core/vdom/patch,我们只对返回的patch函数作分析:
```javascript
export function createPatchFunction (backend) {
  ....
  
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    //判断vnode是否存在
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []
//此时我们定义的oldVnode是#app
    if (isUndef(oldVnode)) {
      ......
    } else {
      
      const isRealElement = isDef(oldVnode.nodeType)
      
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        .....
      } else {
        if (isRealElement) {
          .....
         //创建空的oldVnode
          oldVnode = emptyNodeAt(oldVnode)
        }

      
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)

        // 创建vnode的真实elm属性
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )

        ......
        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode)
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}
```
由于我们传入的 oldVnode 实际上是一个 DOM container，所以 isRealElement 为 true，接下来又通过 emptyNodeAt 方法把 oldVnode 转换成 VNode 对象，然后再调用 createElm 方法
# createElm
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
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    vnode.isRootInsert = !nested
      
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++
        }
        if (isUnknownElement(vnode, creatingElmInVPre)) {
          ......
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
      setScope(vnode)

      /* istanbul ignore if */
      if (__WEEX__) {
        ......
      } else {
        createChildren(vnode, children, insertedVnodeQueue)
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        insert(parentElm, vnode.elm, refElm)
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    }
  }
```
createElm 的作用是通过虚拟节点创建真实的 DOM 并插入到它的父节点中。 我们来看一下它的一些关键逻辑，createComponent 方法目的是尝试创建子组件，在当前这个 case 下它的返回值为 false；接下来判断 vnode 是否包含 tag，如果包含，先简单对 tag 的合法性在非生产环境下做校验，看是否是一个合法标签；然后再去调用平台 DOM 的操作去创建一个占位符元素。
```javascript
vnode.elm = vnode.ns
  ? nodeOps.createElementNS(vnode.ns, tag)
  : nodeOps.createElement(tag, vnode)
```
接下来调用 createChildren 方法去创建子元素：
```javascript
reateChildren(vnode, children, insertedVnodeQueue)

function createChildren (vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(children)
    }
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
    }
  } else if (isPrimitive(vnode.text)) {
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
  }
}
```
createChildren 的逻辑很简单，实际上是遍历子虚拟节点，递归调用 createElm，这是一种常用的深度优先的遍历算法，这里要注意的一点是在遍历过程中会把 vnode.elm 作为父容器的 DOM 节点占位符传入。
接着再调用 invokeCreateHooks 方法执行所有的 create 的钩子并把 vnode push 到 insertedVnodeQueue 中。
```javascript
 if (isDef(data)) {
  invokeCreateHooks(vnode, insertedVnodeQueue)
}

function invokeCreateHooks (vnode, insertedVnodeQueue) {
  for (let i = 0; i < cbs.create.length; ++i) {
    cbs.create[i](emptyNode, vnode)
  }
  i = vnode.data.hook // Reuse variable
  if (isDef(i)) {
    if (isDef(i.create)) i.create(emptyNode, vnode)
    if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
  }
}
```
最后调用 insert 方法把 DOM 插入到父节点中，因为是递归调用，子元素会优先调用 insert，所以整个 vnode 树节点的插入顺序是先子后父。来看一下 insert 方法，它的定义在 src/core/vdom/patch.js 上。
```javascript
insert(parentElm, vnode.elm, refElm)

function insert (parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (ref.parentNode === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}
```
insert 逻辑很简单，调用一些 nodeOps 把子节点插入到父节点中，这些辅助方法定义在 src/platforms/web/runtime/node-ops.js 中
```javascript
export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}

export function appendChild (node: Node, child: Node) {
  node.appendChild(child)
}
```
其实就是调用原生 DOM 的 API 进行 DOM 操作,整个渲染过程就是这样;
