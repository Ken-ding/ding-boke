代码位置:src/compiler/index.js
```javascript
/**
 * Convert HTML string to AST.
 * 转化HTML字符模板为抽象语法是
 */
export function parse (
  template: string,
  options: CompilerOptions
): ASTElement | void {
  //从 options 中获取方法和配置
  getFnsAndConfigFromOptions(options)
  
//解析html
  parseHTML(template, {
    warn,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start (tag, attrs, unary, start, end) {.....},
    end (tag, start, end) {.....},
    chars (text: string, start: number, end: number) {.....},
    comment (text: string, start, end) {.....})
  return root
}
```
我们只展示核心代码,其他的都有用省略符代替,parse函数主要作用:

- 从 options 中获取方法和配置
- 解析 HTML 模板
# options 中获取方法和配置
伪代码:
```javascript
getFnsAndConfigFromOptions(options)
```
parse 函数的输入是 template 和 options，输出是 AST 的根节点。template 就是我们的模板字符串，而 options 实际上是和平台相关的一些配置，它的定义在 src/platforms/web/compiler/options 中：
```javascript
import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace
} from '../util/index'

import modules from './modules/index'
import directives from './directives/index'
import { genStaticKeys } from 'shared/util'
import { isUnaryTag, canBeLeftOpenTag } from './util'

export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}
```
这些属性和方法之所以放到 platforms 目录下是因为它们在不同的平台（web 和 weex）的实现是不同的。
我们用伪代码 getFnsAndConfigFromOptions 表示了这一过程，它的实际代码如下：
```javascript
warn = options.warn || baseWarn

platformIsPreTag = options.isPreTag || no
platformMustUseProp = options.mustUseProp || no
platformGetTagNamespace = options.getTagNamespace || no

transforms = pluckModuleFunction(options.modules, 'transformNode')
preTransforms = pluckModuleFunction(options.modules, 'preTransformNode')
postTransforms = pluckModuleFunction(options.modules, 'postTransformNode')

delimiters = options.delimiters
```
# 解析 HTML 模板
它的定义在 src/compiler/parser/html-parser 中：
```javascript
export function parseHTML (html, options) {
  let lastTag
  while (html) {
    if (!lastTag || !isPlainTextElement(lastTag)){
      let textEnd = html.indexOf('<')
      if (textEnd === 0) {
         if(matchComment) {
           advance(commentLength)
           continue
         }
         if(matchDoctype) {
           advance(doctypeLength)
           continue
         }
         if(matchEndTag) {
           advance(endTagLength)
           parseEndTag()
           continue
         }
         if(matchStartTag) {
           parseStartTag()
           handleStartTag()
           continue
         }
      }
      handleText()
      advance(textLength)
    } else {
       handlePlainTextElement()
       parseEndTag()
    }
  }
}
```
由于 parseHTML 的逻辑也非常复杂，因此我也用了伪代码的方式表达，整体来说它的逻辑就是循环解析 template ，用正则做各种匹配，对于不同情况分别进行不同的处理，直到整个 template 被解析完毕。 在匹配的过程中会利用 advance 函数不断前进整个模板字符串，直到字符串末尾。
```javascript
function advance (n) {
  index += n
  html = html.substring(n)
}
```
为了更加直观地说明 advance 的作用，可以通过一副图表示：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616655358423-5300aa90-c2af-4dd3-873b-25106be4bd4d.png#align=left&display=inline&height=292&margin=%5Bobject%20Object%5D&name=image.png&originHeight=292&originWidth=1058&size=97323&status=done&style=none&width=1058)
调用 advance 函数：
得到结果：
```javascript
advance(4)
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616655405275-1fdc272b-3cb6-4cfd-8b5c-37f39a36a280.png#align=left&display=inline&height=278&margin=%5Bobject%20Object%5D&name=image.png&originHeight=278&originWidth=1080&size=102163&status=done&style=none&width=1080)
匹配的过程中主要利用了正则表达式，如下：
```javascript
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!\--/
const conditionalComment = /^<!\[/

```
#### 
通过这些正则表达式，我们可以匹配注释节点、文档类型节点、开始闭合标签
## 匹配注释节点、文档类型节点
对于注释节点和文档类型节点的匹配，如果匹配到我们仅仅做的是做前进即可。
```javascript
 								// Comment:
                if (comment.test(html)) {
                    const commentEnd = html.indexOf('-->')

                    if (commentEnd >= 0) {
                        if (options.shouldKeepComment) {
                            options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
                        }
                        advance(commentEnd + 3)
                        continue
                    }
                }

                // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
                if (conditionalComment.test(html)) {
                    const conditionalEnd = html.indexOf(']>')

                    if (conditionalEnd >= 0) {
                        advance(conditionalEnd + 2)
                        continue
                    }
                }

                // Doctype:
                const doctypeMatch = html.match(doctype)
                if (doctypeMatch) {
                    advance(doctypeMatch[0].length)
                    continue
                }
```
对于注释和条件注释节点，前进至它们的末尾位置；对于文档类型节点，则前进它自身长度的距离。
## 匹配开始标签
```javascript
const startTagMatch = parseStartTag()
if (startTagMatch) {
  handleStartTag(startTagMatch)
  if (shouldIgnoreFirstNewline(lastTag, html)) {
    advance(1)
  }
  continue
}
```
首先通过 parseStartTag 解析开始标签：
```javascript
function parseStartTag() {
        const start = html.match(startTagOpen)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
                start: index
            }
            advance(start[0].length)
            let end, attr
            while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
                attr.start = index
                advance(attr[0].length)
                attr.end = index
                match.attrs.push(attr)
            }
            if (end) {
                match.unarySlash = end[1]
                advance(end[0].length)
                match.end = index
                return match
            }
        }
    }
```
对于开始标签，除了标签名之外，还有一些标签相关的属性。函数先通过正则表达式 startTagOpen 匹配到开始标签，然后定义了 match 对象，接着循环去匹配开始标签中的属性并添加到 match.attrs 中，直到匹配的开始标签的闭合符结束。如果匹配到闭合符，则获取一元斜线符，前进到闭合符尾，并把当前索引赋值给 match.end。


parseStartTag 对开始标签解析拿到 match 后，紧接着会执行 handleStartTag 对 match 做处理：
```javascript
function handleStartTag(match) {
        const tagName = match.tagName
        const unarySlash = match.unarySlash

        if (expectHTML) {
            if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
                parseEndTag(lastTag)
            }
            if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
                parseEndTag(tagName)
            }
        }

        const unary = isUnaryTag(tagName) || !!unarySlash

        const l = match.attrs.length
        const attrs = new Array(l)
        for (let i = 0; i < l; i++) {
            const args = match.attrs[i]
            const value = args[3] || args[4] || args[5] || ''
            const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
                ? options.shouldDecodeNewlinesForHref
                : options.shouldDecodeNewlines
            attrs[i] = {
                name: args[1],
                value: decodeAttr(value, shouldDecodeNewlines)
            }
            if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
                attrs[i].start = args.start + args[0].match(/^\s*/).length
                attrs[i].end = args.end
            }
        }

        if (!unary) {
            stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
            lastTag = tagName
        }

        if (options.start) {
            options.start(tagName, attrs, unary, match.start, match.end)
        }
    }
```
handleStartTag 的核心逻辑很简单，先判断开始标签是否是一元标签，类似 <img>、<br/> 这样，接着对 match.attrs 遍历并做了一些处理，最后判断如果非一元标签，则往 stack 里 push 一个对象，并且把 tagName 赋值给 lastTag。stack是为了维护层级关系而创建的栈结构.
## 处理开始标签
最后调用了 options.start 回调函数，并传入一些参数.
```javascript
start (tag, attrs, unary) {
  let element = createASTElement(tag, attrs)
  processElement(element)
  treeManagement()
}
```
当解析到开始标签的时候，最后会执行 `start` 回调函数，函数主要就做 3 件事情，创建 AST 元素，处理 AST 元素，AST 树管理。下面我们来分别来看这几个过程。

- 创建 AST 元素
```javascript
/ check namespace.
// inherit parent ns if there is one
const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

// handle IE svg bug
/* istanbul ignore if */
if (isIE && ns === 'svg') {
  attrs = guardIESVGBug(attrs)
}

let element: ASTElement = createASTElement(tag, attrs, currentParent)
if (ns) {
  element.ns = ns
}

export function createASTElement (
  tag: string,
  attrs: Array<Attr>,
  parent: ASTElement | void
): ASTElement {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent,
    children: []
  }
}
```
通过 createASTElement 方法去创建一个 AST 元素，并添加了 namespace。可以看到，每一个 AST 元素就是一个普通的 JavaScript 对象，其中，type 表示 AST 元素类型，tag 表示标签名，attrsList 表示属性列表，attrsMap 表示属性映射表，parent 表示父的 AST 元素，children 表示子 AST 元素集合。

- 处理 AST 元素
```javascript
      if (process.env.NODE_ENV !== 'production') {
        if (options.outputSourceRange) {
          element.start = start
          element.end = end
          element.rawAttrsMap = element.attrsList.reduce((cumulated, attr) => {
            cumulated[attr.name] = attr
            return cumulated
          }, {})
        }
        attrs.forEach(attr => {
          if (invalidAttributeRE.test(attr.name)) {
            warn(
              `Invalid dynamic argument expression: attribute names cannot contain ` +
              `spaces, quotes, <, >, / or =.`,
              {
                start: attr.start + attr.name.indexOf(`[`),
                end: attr.start + attr.name.length
              }
            )
          }
        })
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true
        process.env.NODE_ENV !== 'production' && warn(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          `<${tag}>` + ', as they will not be parsed.',
          { start: element.start }
        )
      }

      // apply pre-transforms
      for (let i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element
      }

      if (!inVPre) {
        processPre(element)
        if (element.pre) {
          inVPre = true
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true
      }
      if (inVPre) {
        processRawAttrs(element)
      } else if (!element.processed) {
        // structural directives
        processFor(element)
        processIf(element)
        processOnce(element)
      }
```
首先是对模块 preTransforms 的调用，其实所有模块的 preTransforms、 transforms 和 postTransforms 的定义都在 src/platforms/web/compiler/modules 目录中，这部分我们暂时不会介绍，之后会结合具体的例子说。接着判断 element 是否包含各种指令通过 processXXX 做相应的处理，处理的结果就是扩展 AST 元素的属性。这里我并不会一一介绍所有的指令处理，而是结合我们当前的例子，我们来看一下 processFor 和 processIf：
```javascript
export function processFor (el: ASTElement) {
  let exp
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    const res = parseFor(exp)
    if (res) {
      extend(el, res)
    } else if (process.env.NODE_ENV !== 'production') {
      warn(
        `Invalid v-for expression: ${exp}`,
        el.rawAttrsMap['v-for']
      )
    }
  }
}

export function parseFor (exp: string): ?ForParseResult {
  const inMatch = exp.match(forAliasRE)
  if (!inMatch) return
  const res = {}
  res.for = inMatch[2].trim()
  const alias = inMatch[1].trim().replace(stripParensRE, '')
  const iteratorMatch = alias.match(forIteratorRE)
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim()
    res.iterator1 = iteratorMatch[1].trim()
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim()
    }
  } else {
    res.alias = alias
  }
  return res
}
```
processFor 就是从元素中拿到 v-for 指令的内容，然后分别解析出 for、alias、iterator1、iterator2 等属性的值添加到 AST 的元素上。就我们的示例 v-for="(item,index) in data" 而言，解析出的的 for 是 data，alias 是 item，iterator1 是 index，没有 iterator2。
```javascript
function processIf (el) {
  const exp = getAndRemoveAttr(el, 'v-if')
  if (exp) {
    el.if = exp
    addIfCondition(el, {
      exp: exp,
      block: el
    })
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true
    }
    const elseif = getAndRemoveAttr(el, 'v-else-if')
    if (elseif) {
      el.elseif = elseif
    }
  }
}
export function addIfCondition (el: ASTElement, condition: ASTIfCondition) {
  if (!el.ifConditions) {
    el.ifConditions = []
  }
  el.ifConditions.push(condition)
}
```
processIf 就是从元素中拿 v-if 指令的内容，如果拿到则给 AST 元素添加 if 属性和 ifConditions 属性；否则尝试拿 v-else 指令及 v-else-if 指令的内容，如果拿到则给 AST 元素分别添加 else 和 elseif 属性。

- AST树管理
```javascript
if (!root) {
        root = element
        if (process.env.NODE_ENV !== 'production') {
          checkRootConstraints(root)
        }
      }

      if (!unary) {
        currentParent = element
        stack.push(element)
      } else {
        closeElement(element)
      }
```
AST 树管理的目标是构建一颗 AST 树，本质上它要维护 root 根节点和当前父节点 currentParent。为了保证元素可以正确闭合，这里也利用了 stack 栈的数据结构
## 匹配闭合标签
```javascript
const endTagMatch = html.match(endTag)
if (endTagMatch) {
  const curIndex = index
  advance(endTagMatch[0].length)
  parseEndTag(endTagMatch[1], curIndex, index)
  continue
}
```
先通过正则 endTag 匹配到闭合标签，然后前进到闭合标签末尾，然后执行 parseEndTag 方法对闭合标签做解析。
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
对于闭合标签的解析，就是倒序 stack，找到第一个和当前 endTag 匹配的元素。如果是正常的标签匹配，那么 stack 的最后一个元素应该和当前的 endTag 匹配,最后调用了 options.end 回调函数，并传入一些参数
## 处理闭合标签
对应伪代码：
```javascript
end () {
  treeManagement()
  closeElement()
}
```
当解析到闭合标签的时候，最后会执行 end 回调函数：
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
首先处理了尾部空格的情况，然后把 stack 的元素弹一个出栈，并把 stack 最后一个元素赋值给 currentParent，这样就保证了当遇到闭合标签的时候，可以正确地更新 stack 的长度以及 currentParent 的值，这样就维护了整个 AST 树。
最后执行了 closeElement(element)：
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
把当前元素维护到root(AST树)上
## 匹配文本
```javascript
et text, rest, next
if (textEnd >= 0) {
  rest = html.slice(textEnd)
  while (
    !endTag.test(rest) &&
    !startTagOpen.test(rest) &&
    !comment.test(rest) &&
    !conditionalComment.test(rest)
  ) {
    next = rest.indexOf('<', 1)
    if (next < 0) break
    textEnd += next
    rest = html.slice(textEnd)
  }
  text = html.substring(0, textEnd)
  advance(textEnd)
}

if (textEnd < 0) {
  text = html
  html = ''
}

if (options.chars && text) {
  options.chars(text)
}
```
接下来判断 textEnd 是否大于等于 0 的，满足则说明到从当前位置到 textEnd 位置都是文本，并且如果 < 是纯文本中的字符，就继续找到真正的文本结束的位置，然后前进到结束的位置。
再继续判断 textEnd 小于 0 的情况，则说明整个 template 解析完毕了，把剩余的 html 都赋值给了 text。
最后调用了 options.chars 回调函数，并传 text 参数
## 处理文本内容
对应伪代码：
```javascript
chars (text: string) {
  handleText()
  createChildrenASTOfText()
}
```
```javascript
const children = currentParent.children
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text)
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = ''
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' '
        } else {
          text = ' '
        }
      } else {
        text = preserveWhitespace ? ' ' : ''
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE, ' ')
        }
        let res
        let child: ?ASTNode
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text
          }
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text
          }
        }
        if (child) {
          if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
            child.start = start
            child.end = end
          }
          children.push(child)
        }
      }
```
文本构造的 AST 元素有 2 种类型，一种是有表达式的，type 为 2，一种是纯文本，type 为 3。在我们的例子中，文本就是 :，是个表达式，通过执行 parseText(text, delimiters) 对文本解析，它的定义在 src/compiler/parser/text-parser.js 中：
```javascript
import { cached } from 'shared/util'
import { parseFilters } from './filter-parser'

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&')
  const close = delimiters[1].replace(regexEscapeRE, '\\$&')
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})

export function parseText (
  text: string,
  delimiters?: [string, string]
): TextParseResult | void {
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // tag token
    const exp = parseFilters(match[1].trim())
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
```
parseText 首先根据分隔符（默认是 {{}}）构造了文本匹配的正则表达式，然后再循环匹配文本，遇到普通文本就 push 到 rawTokens 和 tokens 中，如果是表达式就转换成 _s(${exp}) push 到 tokens 中，以及转换成 {@binding:exp} push 到 rawTokens 中。
## 流程图
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1616658563176-35080aeb-dbcf-4ee7-bbb2-a017634b0668.png#align=left&display=inline&height=1218&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1218&originWidth=1382&size=589606&status=done&style=none&width=1382)
