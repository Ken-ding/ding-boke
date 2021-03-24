## 概念
一个 JavaScript 的实用工具库, 表现一致性, [模块化](https://www.npmjs.com/browse/keyword/lodash-modularized), 高性能, 以及 [可扩展](http://lodash.think2011.net/#features)
### 案例
```javascript
_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });
// → { 'a': 1, 'b': 2, 'c': 3 }

_.map([1, 2, 3], function(n) { return n * 3; });
// → [3, 6, 9]
```

### 特性

- ~100% [代码覆盖率](https://coveralls.io/github/lodash)
- 遵循 [语义化版本控制规范](http://semver.org/)
- [延迟计算链](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/)
- [_(…)](http://lodash.think2011.net/_) 支持隐式链
- [_.ary](http://lodash.think2011.net/ary)改变函数的实参个数
- [_.rearg](http://lodash.think2011.net/rearg) 改变函数的实参顺序
- [_.at](http://lodash.think2011.net/at) 更方便的获取数组或对象的值
- [_.attempt](http://lodash.think2011.net/attempt) 无需 try-catch 来处理可能会出错的执行函数
- [_.chunk](http://lodash.think2011.net/chunk) 按给定个数来拆分数组
- [_.clone](http://lodash.think2011.net/clone) 支持对 `Date` & `RegExp` 对象的浅拷贝
- [_.cloneDeep](http://lodash.think2011.net/cloneDeep) 深拷贝数组或对象
- [_.defaultsDeep](http://lodash.think2011.net/defaultsDeep) 深分配对象的可枚举属性
- [.fill](http://lodash.think2011.net/fill) 指定值填充数组
- [.findKey](http://lodash.think2011.net/findKey) 按 keys 查找对象
- [_.forEach](http://lodash.think2011.net/forEach) 支持提前中断
- [_.forIn](http://lodash.think2011.net/forIn) 遍历对象所有的可枚举属性
- [_.forOwn](http://lodash.think2011.net/forOwn) 遍历对象的所有属性
- [_.lte](http://lodash.think2011.net/lte) 关系比较方法
- [_.inRange](http://lodash.think2011.net/inRange) 检测给定的数值是否在指定范围内
- [_.isNative](http://lodash.think2011.net/isNative) 检测是否是原生函数
- [_.isTypedArray](http://lodash.think2011.net/isTypedArray) 检测是否是类型数组
- [_.mapKeys](http://lodash.think2011.net/mapKeys) 按对象的 key 迭代，并返回新 key 的对象
- [_.matches](http://lodash.think2011.net/matches) 支持深匹配对象
- [_.modArgs](http://lodash.think2011.net/modArgs) 更高级的功能组合
- [_.parseInt](http://lodash.think2011.net/parseInt) 兼容各环境
- [_.random](http://lodash.think2011.net/random) 支持返回浮点数
- [_.runInContext](http://lodash.think2011.net/runInContext) 无影响的 mixins 且更方便模拟
- [_.slice](http://lodash.think2011.net/slice) 支持裁剪类数组
- [_.valuesIn](http://lodash.think2011.net/valuesIn) 获取所有可枚举属性的值
- [_#thru](http://lodash.think2011.net/thru) 传递链式队列的值




