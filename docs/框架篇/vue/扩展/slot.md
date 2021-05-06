# 案例代码
```javascript
var layout = {
        template: '<div class="container">' +
            '<slot name="header"></slot>' +
            '<slot></slot>' +
            '</div>'
    }

    var vm = new Vue({
        el: '#app',
        template: '<div>' +
            '<layout>' +
            '<div>{{msg}}</div>' +
            '<div>{{desc}}</div>' +
            '<h1 slot="header">{{title}}</h1>' +
            '<div>{{desc}}</div>' +
            '</layout>' +
            '</div>',
        data() {
            return {
                title: '我是标题',
                msg: '我是内容',
                desc: '其它信息'
            }
        },
        components: {
            layout
        }
    })
```
# 编译
## 编译父组件
我们知道编译阶段是在生成ast阶段的,先编译父组件,在编译子组件;
我们父组件模板是:
```javascript
<div>
   <layout>
   		<h1 slot="header">{{title}}</h1>
	 </layout>
</div>
```
最后生成的ast结构是:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616728425219-869cc232-8fc9-4879-a2ad-c690260de1b5.png#align=left&display=inline&height=938&margin=%5Bobject%20Object%5D&name=image.png&originHeight=938&originWidth=1436&size=255696&status=done&style=none&width=1436)
我们基于h1为切入点,分析h1渲染的整个流程,排除其他流程的干扰,下面是生成h1的最终ast
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616725265996-6b57d83f-5e27-4ac4-afb2-6ad1ffbe66cc.png#align=left&display=inline&height=512&margin=%5Bobject%20Object%5D&name=image.png&originHeight=512&originWidth=1434&size=159093&status=done&style=none&width=1434)
由于h1是具名插槽,多出来两个关于slot属性slotTarget,slotTargetDynamic,我们只关心slotTarget是怎么生成的;
## 匹配父级开始标签
在paresHTML函数阶段:
```javascript
// Start tag:
                const startTagMatch = parseStartTag()
                if (startTagMatch) {
                    handleStartTag(startTagMatch)
                    if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
                        advance(1)
                    }
                    continue
                }
```
主要是在h1的标签中增加了slot相关属性
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616726576645-2a7bc660-b632-45a7-a9fd-9a243e7cdf6f.png#align=left&display=inline&height=332&margin=%5Bobject%20Object%5D&name=image.png&originHeight=332&originWidth=944&size=79594&status=done&style=none&width=944)
## 匹配父级结束标签
```javascript
// End tag:
                const endTagMatch = html.match(endTag)
                if (endTagMatch) {
                    const curIndex = index
                    advance(endTagMatch[0].length)
                    parseEndTag(endTagMatch[1], curIndex, index)
                    continue
                }
```
### parseEndTag
```javascript
function parseEndTag(tagName, start, end) {
        let pos, lowerCasedTagName
        if (start == null) start = index
        if (end == null) end = index

        // Find the closest opened tag of the same type
        if (tagName) {
            lowerCasedTagName = tagName.toLowerCase()
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                    break
                }
            }
        } else {
            // If no tag name is provided, clean shop
            pos = 0
        }

        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (let i = stack.length - 1; i >= pos; i--) {
                if (process.env.NODE_ENV !== 'production' &&
                    (i > pos || !tagName) &&
                    options.warn
                ) {
                    options.warn(
                        `tag <${stack[i].tag}> has no matching end tag.`,
                        { start: stack[i].start, end: stack[i].end }
                    )
                }
                if (options.end) {
                    options.end(stack[i].tag, start, end)
                }
            }

            // Remove the open elements from the stack
            stack.length = pos
            lastTag = pos && stack[pos - 1].tag
        } else if (lowerCasedTagName === 'br') {
            if (options.start) {
                options.start(tagName, [], true, start, end)
            }
        } else if (lowerCasedTagName === 'p') {
            if (options.start) {
                options.start(tagName, [], false, start, end)
            }
            if (options.end) {
                options.end(tagName, start, end)
            }
        }
    }
```
主要调用end函数
### end
```javascript
 end (tag, start, end) {
      const element = stack[stack.length - 1]
      // pop stack
      stack.length -= 1
      currentParent = stack[stack.length - 1]
      if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        element.end = end
      }
      closeElement(element)
    }
```
主要调用closeElement
### closeElement
```javascript
function closeElement (element) {
    trimEndingWhitespace(element)
    if (!inVPre && !element.processed) {
      element = processElement(element, options)
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        if (process.env.NODE_ENV !== 'production') {
          checkRootConstraints(element)
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        })
      } else if (process.env.NODE_ENV !== 'production') {
        warnOnce(
          `Component template should contain exactly one root element. ` +
          `If you are using v-if on multiple elements, ` +
          `use v-else-if to chain them instead.`,
          { start: element.start }
        )
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent)
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          const name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
        }
        currentParent.children.push(element)
        element.parent = currentParent
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(c => !(c: any).slotScope)
    // remove trailing whitespace node again
    trimEndingWhitespace(element)

    // check pre state
    if (element.pre) {
      inVPre = false
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false
    }
    // apply post-transforms
    for (let i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options)
    }
  }
```
主要调用processElement
### processElement
```javascript
export function processElement (
  element: ASTElement,
  options: CompilerOptions
) {
  processKey(element)

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  )

  processRef(element)
  processSlotContent(element)
  processSlotOutlet(element)
  processComponent(element)
  for (let i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element
  }
  processAttrs(element)
  return element
}
```
其中有关于slot相关的两个方法, processSlotContent和processSlotOutlet:
我们先分析一下:processSlotOutlet
### processSlotContent
```javascript
// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  let slotScope
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope')
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && slotScope) {
      warn(
        `the "scope" attribute for scoped slots have been deprecated and ` +
        `replaced by "slot-scope" since 2.5. The new "slot-scope" attribute ` +
        `can also be used on plain elements in addition to <template> to ` +
        `denote scoped slots.`,
        el.rawAttrsMap['scope'],
        true
      )
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope')
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
      warn(
        `Ambiguous combined usage of slot-scope and v-for on <${el.tag}> ` +
        `(v-for takes higher priority). Use a wrapper <template> for the ` +
        `scoped slot to make it clearer.`,
        el.rawAttrsMap['slot-scope'],
        true
      )
    }
    el.slotScope = slotScope
  }

  // slot="xxx"
  const slotTarget = getBindingAttr(el, 'slot')
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot'])
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'))
    }
  }

  // 2.6 v-slot syntax
  if (process.env.NEW_SLOT_SYNTAX) {
    if (el.tag === 'template') {
      // v-slot on <template>
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
      if (slotBinding) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.slotTarget || el.slotScope) {
            warn(
              `Unexpected mixed usage of different slot syntaxes.`,
              el
            )
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn(
              `<template v-slot> can only appear at the root level inside ` +
              `the receiving component`,
              el
            )
          }
        }
        const { name, dynamic } = getSlotName(slotBinding)
        el.slotTarget = name
        el.slotTargetDynamic = dynamic
        el.slotScope = slotBinding.value || emptySlotScopeToken // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
      if (slotBinding) {
        if (process.env.NODE_ENV !== 'production') {
          if (!maybeComponent(el)) {
            warn(
              `v-slot can only be used on components or <template>.`,
              slotBinding
            )
          }
          if (el.slotScope || el.slotTarget) {
            warn(
              `Unexpected mixed usage of different slot syntaxes.`,
              el
            )
          }
          if (el.scopedSlots) {
            warn(
              `To avoid scope ambiguity, the default slot should also use ` +
              `<template> syntax when there are other named slots.`,
              slotBinding
            )
          }
        }
        // add the component's children to its default slot
        const slots = el.scopedSlots || (el.scopedSlots = {})
        const { name, dynamic } = getSlotName(slotBinding)
        const slotContainer = slots[name] = createASTElement('template', [], el)
        slotContainer.slotTarget = name
        slotContainer.slotTargetDynamic = dynamic
        slotContainer.children = el.children.filter((c: any) => {
          if (!c.slotScope) {
            c.parent = slotContainer
            return true
          }
        })
        slotContainer.slotScope = slotBinding.value || emptySlotScopeToken
        // remove children as they are returned from scopedSlots now
        el.children = []
        // mark el non-plain so data gets generated
        el.plain = false
      }
    }
  }
}
```
上面逻辑主要有:

- 作用域插槽类似流程
```javascript
<template slot="xxx">, <div slot-scope="xxx">
```

- 具名插槽添加slotTarget属性和slotTargetDynamic
- 在rawAttrsMap中添加slot属性
### 小结
这个阶段主要是在h1的ast上面添加slotTarget属性和slotTargetDynamic属性
父组件的render函数是:
```javascript
with(this){
  return _c('div',[_c('layout',[_c('h1',{attrs:{"slot":"header"},slot:"header"},[_v(_s(title))])])],1)
}
```
## 编译子组件
生成组件的过程我们知道是在调用父组件redenr函数式,用到了layout,出发了createComponet函数,创建组件过程,我们直接到子组件编译阶段,看一下他对slot这部分的处理,上面的流程与父级类似我们直接看自己处理slot相关属性:
主要是对:
```javascript
<slot name="header"></slot>
```
slot标签主要是processSlotOutlet处理的,我们直接看;
### processSlotOutlet
```javascript
// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name')
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn(
        `\`key\` does not work on <slot> because slots are abstract outlets ` +
        `and can possibly expand into multiple elements. ` +
        `Use the key on a wrapping element instead.`,
        getRawBindingAttr(el, 'key')
      )
    }
  }
}
```
主要在slot标签的ast对象上添加slotName:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616729501052-fbe23574-3558-4a39-a480-70ad36a6c0c3.png#align=left&display=inline&height=490&margin=%5Bobject%20Object%5D&name=image.png&originHeight=490&originWidth=1438&size=160542&status=done&style=none&width=1438)
我们看一下在代码生成阶段的过程:
### 代码生成
#### generate
```javascript
export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {
  const state = new CodegenState(options)
  const code = ast ? genElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  }
}
```
主要调用genElemen
```javascript
xport function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    let code
    if (el.component) {
      code = genComponent(el.component, el, state)
    } else {
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state)
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}
```
由于有父组件会调用genchilred函数来处理slot标签,最会调用genSlot来处理slot标签
#### genSlot
```javascript
function genSlot (el: ASTElement, state: CodegenState): string {
  const slotName = el.slotName || '"default"'
  const children = genChildren(el, state)
  let res = `_t(${slotName}${children ? `,${children}` : ''}`
  const attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(attr => ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      })))
    : null
  const bind = el.attrsMap['v-bind']
  if ((attrs || bind) && !children) {
    res += `,null`
  }
  if (attrs) {
    res += `,${attrs}`
  }
  if (bind) {
    res += `${attrs ? '' : ',null'},${bind}`
  }
  return res + ')'
}
```
先获取slotName,在获取有没有子标签,处理slot上面的attr属性,最后用_t("slotName")拼接返回:
```javascript
"_t("header")"
```
最后整个子组件渲染函数为:
```javascript
with(this){return _c('div',{staticClass:"container"},[_t("header")],2)}
```
在编译章节我们了解到，_t 函数对应的就是 renderSlot 方法，它的定义在 src/core/instance/render-heplpers/render-slot.js 中
# 创建vnode
## initRender
子组件初始化的时候,是在父组件patch阶段,当子组件initRender时:
```javascript
export function initRender (vm: Component) {
  .....
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
.....
}
```
当初始化组件的时候,会在组件实例上第一vm.$slots,并调用resolveSlots赋值,接下来我们看一下它的逻辑:
## resolveSlots
```javascript
/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
export function resolveSlots (
  children: ?Array<VNode>,
  context: ?Component
): { [key: string]: Array<VNode> } {
  if (!children || !children.length) {
    return {}
  }
  const slots = {}
  for (let i = 0, l = children.length; i < l; i++) {
    const child = children[i]
    const data = child.data
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      const name = data.slot
      const slot = (slots[name] || (slots[name] = []))
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || [])
      } else {
        slot.push(child)
      }
    } else {
      (slots.default || (slots.default = [])).push(child)
    }
  }
  // ignore slots that contains only whitespace
  for (const name in slots) {
    if (slots[name].every(isWhitespace)) {
      delete slots[name]
    }
  }
  return slots
}
```
resolveSlots 函数的逻辑就是遍历 chilren，拿到每一个 child 的 data，然后通过 data.slot 获取到插槽名称，这个 slot 就是我们之前编译父组件在 codegen 阶段设置的 data.slot。接着以插槽名称为 key 把 child 添加到 slots 中，如果 data.slot 不存在，则是默认插槽的内容，则把对应的 child 添加到 slots.defaults 中。这样就获取到整个 slots，它是一个对象，key 是插槽名称，value 是一个 vnode 类型的数组，因为它可以有多个同名插槽。
## renderSlot
```javascript
/**
 * Runtime helper for rendering <slot>
 */
export function renderSlot (
  name: string,
  fallback: ?Array<VNode>,
  props: ?Object,
  bindObject: ?Object
): ?Array<VNode> {
  const scopedSlotFn = this.$scopedSlots[name]
  let nodes
  if (scopedSlotFn) { // scoped slot
    props = props || {}
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        )
      }
      props = extend(extend({}, bindObject), props)
    }
    nodes = scopedSlotFn(props) || fallback
  } else {
    const slotNodes = this.$slots[name]
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          `Duplicate presence of slot "${name}" found in the same render tree ` +
          `- this will likely cause render errors.`,
          this
        )
      }
      slotNodes._rendered = true
    }
    nodes = slotNodes || fallback
  }

  const target = props && props.slot
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}
```
这样我们就拿到了 vm.$slots 了，回到 renderSlot 函数，const slotNodes = this.$slots[name]，我们也就能根据插槽名称获取到对应的 vnode 数组了，这个数组里的 vnode 都是在父组件创建的，这样就实现了在父组件替换子组件插槽的内容了。
后面就是渲染过程了,之前讲过就不再讲了
默认插槽和具名插槽流程区别:
默认插槽render函数为:
```javascript
_t("default")
```
在resolveSlots处理的的是:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616736704080-33ba8f76-46c6-431d-a5e2-0c640313e20a.png#align=left&display=inline&height=150&margin=%5Bobject%20Object%5D&name=image.png&originHeight=150&originWidth=622&size=36661&status=done&style=none&width=622)
加了一个default数组;所以能正常渲染默认插槽:
# 作用域插槽
## 案例
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../../vue/dist/vue.js"></script>
</head>

<body>
    <div id="app"></div>
</body>

</html>
<script>
    let Child = {
        template: '<div class="child">' +
            '<slot text="Hello " :msg="msg"></slot>' +
            '</div>',
        data() {
            return {
                msg: 'Vue'
            }
        }
    }

    let vm = new Vue({
        el: '#app',
        template: '<div>' +
            '<child>' +
            '<template slot-scope="props">' +
            '<p>Hello from parent</p>' +
            '<p>{{ props.text + props.msg}}</p>' +
            '</template>' +
            '</child>' +
            '</div>',
        components: {
            Child
        }
    })
</script>
```
## 父级编译
在编译阶段，仍然是先编译父组件，同样是通过 processSlot 函数去处理 scoped-slot，它的定义在在 src/compiler/parser/index.js 中：
```javascript
function processSlot (el) {
  // ...
  let slotScope
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope')
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && slotScope) {
      warn(
        `the "scope" attribute for scoped slots have been deprecated and ` +
        `replaced by "slot-scope" since 2.5. The new "slot-scope" attribute ` +
        `can also be used on plain elements in addition to <template> to ` +
        `denote scoped slots.`,
        true
      )
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope')
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
      warn(
        `Ambiguous combined usage of slot-scope and v-for on <${el.tag}> ` +
        `(v-for takes higher priority). Use a wrapper <template> for the ` +
        `scoped slot to make it clearer.`,
        true
      )
    }
    el.slotScope = slotScope
  }
  // ...
} 
```
这块逻辑很简单，读取 scoped-slot 属性并赋值给当前 AST 元素节点的 slotScope 属性，接下来在构造 AST 树的时候，会执行以下逻辑：
```javascript
if (element.elseif || element.else) {
  processIfConditions(element, currentParent)
} else if (element.slotScope) { 
  currentParent.plain = false
  const name = element.slotTarget || '"default"'
  ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
} else {
  currentParent.children.push(element)
  element.parent = currentParent
}
```
可以看到对于拥有 scopedSlot 属性的 AST 元素节点而言，是不会作为 children 添加到当前 AST 树中，而是存到父 AST 元素节点的 scopedSlots 属性上，它是一个对象，以插槽名称 name 为 key。
父级生成的ast:
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616745681697-0f76a22c-3874-49c4-83e1-37c0288c5642.png#align=left&display=inline&height=1096&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1096&originWidth=1486&size=323289&status=done&style=none&width=1486)
## genData
然后在 genData 的过程，会对 scopedSlots 做处理：
```javascript
export function genData (el: ASTElement, state: CodegenState): string {
......
  // scoped slots
  if (el.scopedSlots) {
    data += `${genScopedSlots(el, el.scopedSlots, state)},`
  }

....
}
```
## genScopedSlots
```javascript
function genScopedSlots (
  el: ASTElement,
  slots: { [key: string]: ASTElement },
  state: CodegenState
): string {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  let needsForceUpdate = el.for || Object.keys(slots).some(key => {
    const slot = slots[key]
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  })

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  let needsKey = !!el.if

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    let parent = el.parent
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true
        break
      }
      if (parent.if) {
        needsKey = true
      }
      parent = parent.parent
    }
  }

  const generatedSlots = Object.keys(slots)
    .map(key => genScopedSlot(slots[key], state))
    .join(',')

  return `scopedSlots:_u([${generatedSlots}]${
    needsForceUpdate ? `,null,true` : ``
  }${
    !needsForceUpdate && needsKey ? `,null,false,${hash(generatedSlots)}` : ``
  })`
}
```
主要生成:
```javascript
{scopedSlots:_u([{key:"default",fn:function(props){return [_c('p',[_v("Hello from parent")]),_c('p',[_v(_s(props.text + props.msg))])]}}])}
```
最后整个父组件生成:
```javascript
with(this){return _c('div',[_c('child',{scopedSlots:_u([{key:"default",fn:function(props){return [_c('p',[_v("Hello from parent")]),_c('p',[_v(_s(props.text + props.msg))])]}}])}),_c('div',[_v("123")])],1)}
```
可以看到它和普通插槽父组件编译结果的一个很明显的区别就是没有 children 了，data 部分多了一个对象，并且执行了 _u 方法，在编译章节我们了解到，_u 函数对的就是 resolveScopedSlots 方法，它的定义在 src/core/instance/render-heplpers/resolve-slots.js 中
## resolveScopedSlots
```javascript
export function resolveScopedSlots (
  fns: ScopedSlotsData, // see flow/vnode
  res?: Object
): { [key: string]: Function } {
  res = res || {}
  for (let i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res)
    } else {
      res[fns[i].key] = fns[i].fn
    }
  }
  return res
}
```
接着我们再来看一下子组件的编译，和普通插槽的过程基本相同，唯一一点区别是在 genSlot 的时候：
```javascript
unction genSlot (el: ASTElement, state: CodegenState): string {
  const slotName = el.slotName || '"default"'
  const children = genChildren(el, state)
  let res = `_t(${slotName}${children ? `,${children}` : ''}`
  const attrs = el.attrs && `{${el.attrs.map(a => `${camelize(a.name)}:${a.value}`).join(',')}}`
  const bind = el.attrsMap['v-bind']
  if ((attrs || bind) && !children) {
    res += `,null`
  }
  if (attrs) {
    res += `,${attrs}`
  }
  if (bind) {
    res += `${attrs ? '' : ',null'},${bind}`
  }
  return res + ')'
}
```
它会对 attrs 和 v-bind 做处理，对应到我们的例子，最终生成的代码如下：
```javascript
with(this){
  return _c('div',
    {staticClass:"child"},
    [_t("default",null,
      {text:"Hello ",msg:msg}
    )],
  2)}
```
_t,我们知道对应的是
```javascript
function renderSlot(
        name,
        fallback,
        props,
        bindObject
    ) {
        var scopedSlotFn = this.$scopedSlots[name];
        var nodes;
        if (scopedSlotFn) { // scoped slot
            props = props || {};
            if (bindObject) {
                if (!isObject(bindObject)) {
                    warn(
                        'slot v-bind without argument expects an Object',
                        this
                    );
                }
                props = extend(extend({}, bindObject), props);
            }
            nodes = scopedSlotFn(props) || fallback;
        } else {
            nodes = this.$slots[name] || fallback;
        }

        var target = props && props.slot;
        if (target) {
            return this.$createElement('template', { slot: target }, nodes)
        } else {
            return nodes
        }
    }
```
我们只要关注this.$scopedSlots[name]即可,那么这个 this.$scopedSlots 又是在什么地方定义的呢，原来在子组件的渲染函数执行前，在 vm._render 方法内，有这么一段逻辑，定义在 src/core/instance/render.js 中：
```javascript
 if (_parentVnode) {
  vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject
}
```
这个 _parentVNode.data.scopedSlots 对应的就是我们在父组件通过执行 resolveScopedSlots 返回的对象。所以回到 genSlot 函数，我们就可以通过插槽的名称拿到对应的 scopedSlotFn，然后把相关的数据扩展到 props 上，作为函数的参数传入，原来之前我们提到的函数这个时候执行，然后返回生成的 vnodes，为后续渲染节点用。
## 总结
通过这一章的分析，我们了解了普通插槽和作用域插槽的实现。它们有一个很大的差别是数据作用域，普通插槽是在父组件编译和渲染阶段生成 vnodes，所以数据的作用域是父组件实例，子组件渲染的时候直接拿到这些渲染好的 vnodes。而对于作用域插槽，父组件在编译和渲染阶段并不会直接生成 vnodes，而是在父节点 vnode 的 data 中保留一个 scopedSlots 对象，存储着不同名称的插槽以及它们对应的渲染函数，只有在编译和渲染子组件阶段才会执行这个渲染函数生成 vnodes，由于是在子组件环境执行的，所以对应的数据作用域是子组件实例。
