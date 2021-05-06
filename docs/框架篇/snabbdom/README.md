## 案例
我们先从案例入手,沿着这个主流程抽丝剥茧分析,其他分支流程:
```javascript
import { init } from 'snabbdom/init'

const container = document.getElementById('container');
//初始化
const patch = init([]);
//创建虚拟都没
const vnode = h('div', {},"我是div");
//渲染
 patch(container, vnode);
```
效果:

![image.png](/images/fram/snabbdom.png)

这个流程在snabbdom是如何做到的,先分析init方法

## 初始化


`init` 方法主要是传入 `modules` ，`domApi` , 然后返回一个 `patch` 方法


代码位置 ： `./src/init.ts`
```javascript
export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number
  let j: number
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  }

  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      const hook = modules[j][hooks[i]]
      if (hook !== undefined) {
        (cbs[hooks[i]] as any[]).push(hook)
      }
    }
  }

  function emptyNodeAt (elm: Element) {
    const id = elm.id ? '#' + elm.id : ''
    const c = elm.className ? '.' + elm.className.split(' ').join('.') : ''
    return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm)
  }

  function createRmCb (childElm: Node, listeners: number) {
    return function rmCb () {
      if (--listeners === 0) {
        const parent = api.parentNode(childElm) as Node
        api.removeChild(parent, childElm)
      }
    }
  }

  function createElm (vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any
    let data = vnode.data
    if (data !== undefined) {
      const init = data.hook?.init
      if (isDef(init)) {
        init(vnode)
        data = vnode.data
      }
    }
    const children = vnode.children
    const sel = vnode.sel
    if (sel === '!') {
      if (isUndef(vnode.text)) {
        vnode.text = ''
      }
      vnode.elm = api.createComment(vnode.text!)
    } else if (sel !== undefined) {
      // Parse selector
      const hashIdx = sel.indexOf('#')
      const dotIdx = sel.indexOf('.', hashIdx)
      const hash = hashIdx > 0 ? hashIdx : sel.length
      const dot = dotIdx > 0 ? dotIdx : sel.length
      const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel
      const elm = vnode.elm = isDef(data) && isDef(i = data.ns)
        ? api.createElementNS(i, tag)
        : api.createElement(tag)
      if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot))
      if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '))
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i]
          if (ch != null) {
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue))
          }
        }
      } else if (is.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text))
      }
      const hook = vnode.data!.hook
      if (isDef(hook)) {
        hook.create?.(emptyNode, vnode)
        if (hook.insert) {
          insertedVnodeQueue.push(vnode)
        }
      }
    } else {
      vnode.elm = api.createTextNode(vnode.text!)
    }
    return vnode.elm
  }

  function addVnodes (
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
  ) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before)
      }
    }
  }

  function invokeDestroyHook (vnode: VNode) {
    const data = vnode.data
    if (data !== undefined) {
      data?.hook?.destroy?.(vnode)
      for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
      if (vnode.children !== undefined) {
        for (let j = 0; j < vnode.children.length; ++j) {
          const child = vnode.children[j]
          if (child != null && typeof child !== 'string') {
            invokeDestroyHook(child)
          }
        }
      }
    }
  }

  function removeVnodes (parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number): void {
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number
      let rm: () => void
      const ch = vnodes[startIdx]
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch)
          listeners = cbs.remove.length + 1
          rm = createRmCb(ch.elm!, listeners)
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm)
          const removeHook = ch?.data?.hook?.remove
          if (isDef(removeHook)) {
            removeHook(ch, rm)
          } else {
            rm()
          }
        } else { // Text node
          api.removeChild(parentElm, ch.elm!)
        }
      }
    }
  }

  function updateChildren (parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx: KeyToIndexMap | undefined
    let idxInOld: number
    let elmToMove: VNode
    let before: any

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx]
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string]
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
        } else {
          elmToMove = oldCh[idxInOld]
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = undefined as any
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
      }
    }
  }

  function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    const hook = vnode.data?.hook
    hook?.prepatch?.(oldVnode, vnode)
    const elm = vnode.elm = oldVnode.elm!
    const oldCh = oldVnode.children as VNode[]
    const ch = vnode.children as VNode[]
    if (oldVnode === vnode) return
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      vnode.data.hook?.update?.(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue)
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      }
      api.setTextContent(elm, vnode.text!)
    }
    hook?.postpatch?.(oldVnode, vnode)
  }

  return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node
    const insertedVnodeQueue: VNodeQueue = []
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()

    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode)
    }

    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue)
    } else {
      elm = oldVnode.elm!
      parent = api.parentNode(elm) as Node

      createElm(vnode, insertedVnodeQueue)

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
        removeVnodes(parent, [oldVnode], 0, 0)
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    return vnode
  }
}
```
### 注册钩子函数
```javascript
const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  }
```
这里主要是注册一系列的钩子，在不同的阶段触发
### domapi
```javascript
const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi
```
如果外部为未传入domapi,则采用内置htmlDomApi
### 将各个模块的钩子方法，挂到统一的钩子上
这里主要是将每个 modules 下的 hook 方法提取出来存到 cbs 里面

- 初始化的时候，将每个 modules 下的相应的钩子都追加都一个数组里面。create、update....
- 在进行 patch 的各个阶段，触发对应的钩子去处理对应的事情
- 这种方式比较方便扩展。新增钩子的时候，不需要更改到主要的流程
```javascript
for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      const hook = modules[j][hooks[i]]
      if (hook !== undefined) {
        (cbs[hooks[i]] as any[]).push(hook)
      }
    }
  }
```
### 定义一系列内部函数

- emptyNodeAt
- createRmCb
- createElm
- addVnodes
- invokeDestroyHook
- removeVnodes
- updateChildren
- patchVnode
### 返回path函数

path函数
## 创建虚拟DOM
### h函数
这里是 `typescript` 的语法，定义了一系列的重载方法。 `h` 函数主要根据传进来的参数，返回一个 `vnode` 对象


代码位置 ： `./src/h.ts`
```javascript
export function h (sel: string): VNode
export function h (sel: string, data: VNodeData | null): VNode
export function h (sel: string, children: VNodeChildren): VNode
export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h (sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}
  var children: any
  var text: any
  var i: number
  if (c !== undefined) {
    // 三个参数的情况  sel , data , children | text
    if (b !== null) {
      data = b
    }
    if (is.array(c)) {
      children = c
    } else if (is.primitive(c)) {
      text = c
    } else if (c && c.sel) {
      children = [c]
    }
  } else if (b !== undefined && b !== null) {
    // 两个参数的情况 : sel , children | text
    // 两个参数的情况 : sel , data
    if (is.array(b)) {
      children = b
    } else if (is.primitive(b)) {
      text = b
    } else if (b && b.sel) {
      children = [b]
    } else { data = b }
  }
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      // 如果children是文本或数字 ，则创建文本节点
      if (is.primitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i], undefined)
    }
  }
  // 处理svg
  if (
    sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
    (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  ) {
    addNS(data, children, sel)
  }
  // 生成 vnoe
  return vnode(sel, data, children, text, undefined)
};
```
h 函数比较简单，主要是提供一个方便的工具函数，方便创建 vnode 对象
### vnode 对象
代码位置 ：`./src/vnode.ts`
#### vnode 类型
```javascript
export interface VNode {
  // 选择器
  sel: string | undefined
  // 数据，主要包括属性、样式、数据、绑定时间等
  data: VNodeData | undefined
  // 子节点
  children: Array<VNode | string> | undefined
  // 关联的原生节点
  elm: Node | undefined
  // 文本
  text: string | undefined
  // key , 唯一值，为了优化性能
  key: Key | undefined
}
```
#### VNodeData 的类型
```javascript
export interface VNodeData {
  // 属性 能直接用 . 访问的
  props?: Props
  // 属性
  attrs?: Attrs
  // 样式类
  class?: Classes
  // 样式
  style?: VNodeStyle
  // 数据
  dataset?: Dataset
  // 绑定的事件
  on?: On
  hero?: Hero
  attachData?: AttachData
  // 钩子
  hook?: Hooks
  key?: Key
  ns?: string // for SVGs
  fn?: () => VNode // for thunks
  args?: any[] // for thunks
  [key: string]: any // for any other 3rd party module
}
```
#### 创建 VNode 对象
```javascript
// 根据传入的 属性 ，返回一个 vnode 对象
export function vnode(
    sel: string | undefined,
    data: any | undefined,
    children: Array<VNode | string> | undefined,
    text: string | undefined,
    elm: Element | Text | undefined
): VNode {
    let key = data === undefined ? undefined : data.key;
    return {
        sel: sel,
        data: data,
        children: children,
        text: text,
        elm: elm,
        key: key
    };
}
export default vnode;
```
## 渲染
### path
#### diff 策略

- 同级对比(对比的时候，只针对同级的对比，减少算法复杂度)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1615539596844-eb58afc6-24c5-476a-b968-f47141389019.png#align=left&display=inline&height=398&margin=%5Bobject%20Object%5D&name=image.png&originHeight=398&originWidth=754&size=83476&status=done&style=none&width=754)

- 就近复用 为了尽可能不发生 DOM 的移动，会就近复用相同的 DOM 节点，复用的依据是判断是否是同类型的 dom 元素
- 

#### 主要的逻辑

- 触发 `pre` 钩子
- 如果老节点非 `vnode，` 则新创建空的 `vnode`
- 新旧节点为 `sameVnode` 的话，则调用 `patchVnode` 更新 `vnode` , 否则创建新节点
- 触发收集到的新元素 `insert` 钩子
- 触发 `post` 钩子
```javascript
function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node
    // 用于收集所有插入的元素
    const insertedVnodeQueue: VNodeQueue = []
  // 先调用 pre 回调
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()
// 如果老节点非 vnode ， 则创建一个空的 vnode
    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode)
    }
// 如果是同个节点，则进行修补
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue)
    } else {
      // 不同 Vnode 节点则新建
      elm = oldVnode.elm!
      parent = api.parentNode(elm) as Node

      createElm(vnode, insertedVnodeQueue)
// 插入新节点，删除老节点
      if (parent !== null) {
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
        removeVnodes(parent, [oldVnode], 0, 0)
      }
    }
// 遍历所有收集到的插入节点，调用插入的钩子，
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
    }
  // 调用post的钩子
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    return vnode
  }
```
整体流程就是:
## 其他流程
### 钩子
文件路径 ： `./src/hooks.ts`
```javascript
export interface Hooks {
  // 在 `patch` 开始执行的时候调用
  pre?: PreHook
  // 在 `createElm`，进入的时候调用init
  // vnode转换为真实DOM节点时触发
  init?: InitHook
  // 创建真实DOM的时候，调用 create
  create?: CreateHook
  // 在`patch`方法接近完成的时候，才收集所有的插入节点，遍历调用响应的钩子
  // 可以认为插入到DOM树时触发
  insert?: InsertHook
  // 在两个节点开始对比前调用
  prepatch?: PrePatchHook
  // 更新过程中，调用update
  update?: UpdateHook
  // 两个节点对比完成时候调用
  postpatch?: PostPatchHook
  // 删除节点的时候调用，包括子节点的destroy也会被触发
  destroy?: DestroyHook
  // 删除当前节点的时候调用。元素从父节点删除时触发，和destory略有不同，remove只影响到被移除节点中最顶层的节点
  remove?: RemoveHook
  // 在`patch`方法的最后调用，也就是patch完成后触发
  post?: PostHook
}
```
### 模块
#### attributes 模块

- updateAttrs函数

主要逻辑

   - 遍历新 `vnode` 所有的属性，判断在 `oldVnode` 中是否相等，修改不相等的属性
   - 删除不存在于 `vnode` 的属性
```javascript
/**
 * 更新属性
 */
function updateAttrs(oldVnode: VNode, vnode: VNode): void {
    var key: string,
        elm: Element = vnode.elm as Element,
        oldAttrs = (oldVnode.data as VNodeData).attrs,
        attrs = (vnode.data as VNodeData).attrs;

    if (!oldAttrs && !attrs) return;
    if (oldAttrs === attrs) return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};

    // update modified attributes, add new attributes
    // 遍历新的属性，修改不相等的
    for (key in attrs) {
        const cur = attrs[key];
        const old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, '');
            } else if (cur === false) {
                elm.removeAttribute(key);
            } else {
                if (key.charCodeAt(0) !== xChar) {
                    // 如果不是 x 开头
                    elm.setAttribute(key, cur);
                } else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                } else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                } else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    // 删除多余的属性
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
```
#### class模块
文件位置 ： `./src/modules/class.ts`
与 `attribute` 类似 ， `class` 也是定义了 `create` 和 `update` 两个钩子，统一由 `updateClass` 处理
```javascript
function updateClass(oldVnode: VNode, vnode: VNode): void {
    var cur: any,
        name: string,
        elm: Element = vnode.elm as Element,
        oldClass = (oldVnode.data as VNodeData).class,
        klass = (vnode.data as VNodeData).class;

    // 新老的 className 都没有
    if (!oldClass && !klass) return;

    // 新老的 className 没变
    if (oldClass === klass) return;

    oldClass = oldClass || {};
    klass = klass || {};

    // 删除不存在与新的 classList 的 className
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }

    // 新增 或删除 class
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            (elm.classList as any)[cur ? 'add' : 'remove'](name);
        }
    }
}
```
#### dataset模块
文件位置 ： `./src/modules/dataset.ts`
与 `attribute` 类似 ， `dataset` 也是定义了 `create` 和 `update` 两个钩子，统一由 `updateDataset` 处理
```javascript
onst CAPS_REGEX = /[A-Z]/g;

/**
 * 更新或创建 dataset
 */
function updateDataset(oldVnode: VNode, vnode: VNode): void {
    let elm: HTMLElement = vnode.elm as HTMLElement,
        oldDataset = (oldVnode.data as VNodeData).dataset,
        dataset = (vnode.data as VNodeData).dataset,
        key: string;

    // 不变的情况下不处理
    if (!oldDataset && !dataset) return;
    if (oldDataset === dataset) return;

    oldDataset = oldDataset || {};
    dataset = dataset || {};
    const d = elm.dataset;

    // 删除多余的 dataset
    for (key in oldDataset) {
        if (!dataset[key]) {
            if (d) {
                if (key in d) {
                    delete d[key];
                }
            } else {
                // 将驼峰式改为中划线分割  eg: userName ----> user-name
                elm.removeAttribute(
                    'data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase()
                );
            }
        }
    }

    // 修改有变化的 dataset
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            if (d) {
                d[key] = dataset[key];
            } else {
                elm.setAttribute(
                    // 将驼峰式改为中划线分割  eg: userName ----> user-name
                    'data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase(),
                    dataset[key]
                );
            }
        }
    }
}
```
### 相同vnode对比策略
#### patchVnode 
patchVnode 方法主要的逻辑如下 ：

- 触发 `prepatch` 钩子
- 触发 `update` 钩子， 这里主要为了更新对应的 `module` 内容
- 非文本节点的情况 , 调用 updateChildren 更新所有子节点
- 文本节点的情况 ， 直接 `api.setTextContent(elm, vnode.text as string);`
```javascript
**
     * 更新节点
     */
    function patchVnode(
        oldVnode: VNode,
        vnode: VNode,
        insertedVnodeQueue: VNodeQueue
    ) {
        let i: any, hook: any;
        // 调用 prepatch 回调
        if (
            isDef((i = vnode.data)) &&
            isDef((hook = i.hook)) &&
            isDef((i = hook.prepatch))
        ) {
            i(oldVnode, vnode);
        }

        const elm = (vnode.elm = oldVnode.elm as Node);
        let oldCh = oldVnode.children;
        let ch = vnode.children;
        if (oldVnode === vnode) return;

        // 调用 cbs 中的所有模块的update回调 更新对应的实际内容。
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);

            i = vnode.data.hook;
            if (isDef(i) && isDef((i = i.update))) i(oldVnode, vnode);
        }

        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                // 新老子节点都存在的情况，更新 子节点
                if (oldCh !== ch)
                    updateChildren(
                        elm,
                        oldCh as Array<VNode>,
                        ch as Array<VNode>,
                        insertedVnodeQueue
                    );
            } else if (isDef(ch)) {
                // 老节点不存在子节点，情况下，新建元素
                if (isDef(oldVnode.text)) api.setTextContent(elm, '');
                addVnodes(
                    elm,
                    null,
                    ch as Array<VNode>,
                    0,
                    (ch as Array<VNode>).length - 1,
                    insertedVnodeQueue
                );
            } else if (isDef(oldCh)) {
                // 新节点不存在子节点，情况下，删除元素
                removeVnodes(
                    elm,
                    oldCh as Array<VNode>,
                    0,
                    (oldCh as Array<VNode>).length - 1
                );
            } else if (isDef(oldVnode.text)) {
                // 如果老节点存在文本节点，而新节点不存在，所以清空
                api.setTextContent(elm, '');
            }
        } else if (oldVnode.text !== vnode.text) {
            // 子节点文本不一样的情况下，更新文本
            api.setTextContent(elm, vnode.text as string);
        }

        // 调用 postpatch
        if (isDef(hook) && isDef((i = hook.postpatch))) {
            i(oldVnode, vnode);
        }
    }
```
#### updateChildren
updateChildren 主要的逻辑如下：
`updateChildren` 主要的逻辑如下：

1. 优先处理特殊场景，先对比两端。也就是
   - 旧 vnode 头 vs 新 vnode 头
   - 旧 vnode 尾 vs 新 vnode 尾
   - 旧 vnode 头 vs 新 vnode 尾
   - 旧 vnode 尾 vs 新 vnode 头
2. 首尾不一样的情况，寻找 key 相同的节点，找不到则新建元素
2. 如果找到 key，但是，元素选择器变化了，也新建元素
2. 如果找到 key，并且元素选择没变， 则移动元素
2. 两个列表对比完之后，清理多余的元素，新增添加的元素
```javascript
/**
     * 更新子节点
     */
    function updateChildren(
        parentElm: Node,
        oldCh: Array<VNode>,
        newCh: Array<VNode>,
        insertedVnodeQueue: VNodeQueue
    ) {
        let oldStartIdx = 0,
            newStartIdx = 0;

        let oldEndIdx = oldCh.length - 1;

        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];

        let newEndIdx = newCh.length - 1;

        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];

        let oldKeyToIdx: any;
        let idxInOld: number;
        let elmToMove: VNode;
        let before: any;
				console.time('x')
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          // 空对比
            // 对于vnode.key的比较，会把oldVnode = null
            if (oldStartVnode == null) {
                // 移动索引，因为节点处理过了会置空，所以这里向右移
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            } else if (oldEndVnode == null) {
                // 原理同上
                oldEndVnode = oldCh[--oldEndIdx];
            } else if (newStartVnode == null) {
                // 原理同上
                newStartVnode = newCh[++newStartIdx];
            } else if (newEndVnode == null) {
                // 原理同上
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                 // 首首对比
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
               // 尾尾对比
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
                // 首尾对比
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                // 移动元素到右侧指针的后面
                api.insertBefore(
                    parentElm,
                    oldStartVnode.elm as Node,
                    api.nextSibling(oldEndVnode.elm as Node)
                );
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
                // 尾首对比
                // 最右侧对比最左侧
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                // 移动元素到左侧指针的后面
                api.insertBefore(
                    parentElm,
                    oldEndVnode.elm as Node,
                    oldStartVnode.elm as Node
                );
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            } else {
                // 上述四种对比方法都没找到   只好老老实实的依次遍历对比数据(key)
                // 使用key时的比较
                // 首尾都不一样的情况，寻找相同 key 的节点，所以使用的时候加上key可以调高效率
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(
                        oldCh,
                        oldStartIdx,
                        oldEndIdx
                    );
                }
              //比较在旧的key值列表中是否有新的节点的key值
                idxInOld = oldKeyToIdx[newStartVnode.key as string];

                if (isUndef(idxInOld)) {
                    // New element
                    // 如果找不到 key 对应的元素，就新建元素
                    api.insertBefore(
                        parentElm,
                        createElm(newStartVnode, insertedVnodeQueue),
                        oldStartVnode.elm as Node
                    );
                    newStartVnode = newCh[++newStartIdx];
                } else {
                    // 如果找到 key 对应的元素，就移动元素
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                      // 对应key值相同的旧节点的标签名不一样   新增节点
                        api.insertBefore(
                            parentElm,
                            createElm(newStartVnode, insertedVnodeQueue),
                            oldStartVnode.elm as Node
                        );
                    } else {
                      // 更新以及判断是否递归updateChildren
                        patchVnode(
                            elmToMove,
                            newStartVnode,
                            insertedVnodeQueue
                        );
                        oldCh[idxInOld] = undefined as any;
                        api.insertBefore(
                            parentElm,
                            elmToMove.elm as Node,
                            oldStartVnode.elm as Node
                        );
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        console.timeEnd('x');
        // 新老数组其中一个到达末尾
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                // 如果老数组先到达末尾，说明新数组还有更多的元素，这些元素都是新增的，说以一次性插入
                before =
                    newCh[newEndIdx + 1] == null
                        ? null
                        : newCh[newEndIdx + 1].elm;
                addVnodes(
                    parentElm,
                    before,
                    newCh,
                    newStartIdx,
                    newEndIdx,
                    insertedVnodeQueue
                );
            } else {
                // 如果新数组先到达末尾，说明新数组比老数组少了一些元素，所以一次性删除
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
            }
        }
    }
```
#### addVnodes
`addVnodes` 就比较简单了，主要功能就是添加 `Vnodes` 到 真实 DOM 中
```javascript
/**
 * 添加 Vnodes 到 真实 DOM 中
 */
function addVnodes(
    parentElm: Node,
    before: Node | null,
    vnodes: Array<VNode>,
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
) {
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        if (ch != null) {
            api.insertBefore(
                parentElm,
                createElm(ch, insertedVnodeQueue),
                before
            );
        }
    }
}
```
#### removeVnodes
删除 VNodes 的主要逻辑如下：

- 循环触发 destroy 钩子，递归触发子节点的钩子
- 触发 remove 钩子,利用 `createRmCb` , 在所有监听器执行后，才调用 `api.removeChild`,删除真正的 DOM 节点
```javascript
/**
 * 创建一个删除的回调，多次调用这个回调，直到监听器都没了，就删除元素
 */
function createRmCb(childElm: Node, listeners: number) {
    return function rmCb() {
        if (--listeners === 0) {
            const parent = api.parentNode(childElm);
            api.removeChild(parent, childElm);
        }
    };
}
```
```javascript
/**
 * 删除 VNodes
 */
function removeVnodes(
    parentElm: Node,
    vnodes: Array<VNode>,
    startIdx: number,
    endIdx: number
): void {
    for (; startIdx <= endIdx; ++startIdx) {
        let i: any,
            listeners: number,
            rm: () => void,
            ch = vnodes[startIdx];
        if (ch != null) {
            if (isDef(ch.sel)) {
                invokeDestroyHook(ch);
                listeners = cbs.remove.length + 1;
                // 所有监听删除
                rm = createRmCb(ch.elm as Node, listeners);
                for (i = 0; i < cbs.remove.length; ++i)
                    cbs.remove[i](ch, rm);
                // 如果有钩子则调用钩子后再调删除回调，如果没，则直接调用回调
                if (
                    isDef((i = ch.data)) &&
                    isDef((i = i.hook)) &&
                    isDef((i = i.remove))
                ) {
                   i(ch, rm);
                } else {
                    rm();
                }
            } else {
                // Text node
                api.removeChild(parentElm, ch.elm as Node);
            }
        }
    }
}

```
#### createElm
将 vnode 转换成真正的 DOM 元素
主要逻辑如下：

- 触发 init 钩子
- 处理注释节点
- 创建元素并设置 id , class
- 触发模块 create 钩子 。
- 处理子节点
- 处理文本节点
- 触发 vnodeData 的 create 钩子
```javascript
/**
*  VNode ==> 真实DOM
*/
function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any,
        data = vnode.data;

    if (data !== undefined) {
        // 如果存在 data.hook.init ，则调用该钩子
        if (isDef((i = data.hook)) && isDef((i = i.init))) {
            i(vnode);
            data = vnode.data;
        }
    }

    let children = vnode.children,
        sel = vnode.sel;

    // ！ 来代表注释
    if (sel === '!') {
        if (isUndef(vnode.text)) {
            vnode.text = '';
        }
        vnode.elm = api.createComment(vnode.text as string);
    } else if (sel !== undefined) {
        // Parse selector
        // 解析选择器
        const hashIdx = sel.indexOf('#');
        const dotIdx = sel.indexOf('.', hashIdx);
        const hash = hashIdx > 0 ? hashIdx : sel.length;
        const dot = dotIdx > 0 ? dotIdx : sel.length;
        const tag =
            hashIdx !== -1 || dotIdx !== -1
                ? sel.slice(0, Math.min(hash, dot))
                : sel;

        // 根据 tag 创建元素
        const elm = (vnode.elm =
            isDef(data) && isDef((i = (data as VNodeData).ns))
                ? api.createElementNS(i, tag)
                : api.createElement(tag));

        // 设置 id
        if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot));

        // 设置 className
        if (dotIdx > 0)
            elm.setAttribute('class',sel.slice(dot + 1).replace(/\./g, ' '));

        // 执行所有模块的 create 钩子，创建对应的内容
        for (i = 0; i < cbs.create.length; ++i)
            cbs.create[i](emptyNode, vnode);

        // 如果存在 children ，则创建children
        if (is.array(children)) {
            for (i = 0; i < children.length; ++i) {
                const ch = children[i];
                if (ch != null) {
                    api.appendChild(
                        elm,
                        createElm(ch as VNode, insertedVnodeQueue)
                    );
                }
            }
        } else if (is.primitive(vnode.text)) {
            // 追加文本节点
            api.appendChild(elm, api.createTextNode(vnode.text));
        }

        // 执行 vnode.data.hook 中的 create 钩子
        i = (vnode.data as VNodeData).hook; // Reuse variable
        if (isDef(i)) {
            if (i.create) i.create(emptyNode, vnode);
            if (i.insert) insertedVnodeQueue.push(vnode);
        }
    } else {
        // sel 不存在的情况， 即为文本节点
        vnode.elm = api.createTextNode(vnode.text as string);
    }
    return vnode.elm;
}
```
