## chunk
**_.chunk(array, [size=0])**


将数组拆分成多个 size 长度的块，并组成一个新数组。 如果数组无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。
### 参数

1. **array** _(Array)_需要被处理的数组

1. **[size=0]** _(number)_每个块的长度
### 返回值 _(Array)_
返回一个拆分好的新数组
### 示例
```javascript
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```
## compact
**_.compact(array)**
创建一个移除了所有假值的数组。例如：`false`、`null`、 `0`、`""`、`undefined`， 以及`NaN` 都是 “假值”.
### 参数

1. **array** _(Array)_需要被处理的数组。
### 返回值 _(Array)_
返回移除了假值的数组。
### 示例
```javascript
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```
## concat
**_.concat(array, [values])**
创建一个用任何数组 或 值连接的新数组。
### 参数

1. **array** _(Array)_需要被连接的数组

1. **[values]** _(...*)_需要被连接的值的队列

### 返回值 _(Array)_
返回连接后的新数组
### 示例
```javascript
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
console.log(other);
// => [1, 2, 3, [4]]
console.log(array);
// => [1]
```
## difference
**_.difference(array, [values])**
创建一个差异化后的数组，不包括使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 方法提供的数组。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[values]** _(...Array)_用于对比差异的数组

### 返回值 _(Array)_
返回一个差异化后的新数组
### 示例
```javascript
_.difference([3, 2, 1], [4, 2]);
// => [3, 1]
```
## differenceBy
**_.differenceBy(array, [values], [iteratee=_.identity])**
这个方法类似 `_.difference`，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[values]** _(...Array)_用于对比差异的数组

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回一个差异化后的新数组
### 示例
```javascript
_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]
// 使用了 `_.property` 的回调结果
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
## differenceWith
**_.differenceWith(array, [values], [comparator])**
这个方法类似 `_.difference`，除了它接受一个 comparator 调用每一个数组元素的值。 comparator 会传入2个参数：(arrVal, othVal)。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[values]** _(...Array)_用于对比差异的数组

1. **[comparator]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回一个差异化后的新数组
### 示例
```javascript
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]
```
## drop
**_.drop(array, [n=1])**
裁剪数组中的前 N 个数组，返回剩余的部分。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[n=1]** _(number)_裁剪的个数

### 返回值 _(Array)_
返回数组的剩余的部分。
### 示例
```javascript
_.drop([1, 2, 3]);
// => [2, 3]
_.drop([1, 2, 3], 2);
// => [3]
_.drop([1, 2, 3], 5);
// => []
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```


## dropRight
**_.dropRight(array, [n=1])**
从右边开始裁剪数组中的 N 个数组，返回剩余的部分。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[n=1]** _(number)_裁剪的个数

### 返回值 _(Array)_
返回数组的剩余的部分。
### 示例
```javascript
_.dropRight([1, 2, 3]);
// => [1, 2]
_.dropRight([1, 2, 3], 2);
// => [1]
_.dropRight([1, 2, 3], 5);
// => []
_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```
## dropRightWhile
**_.dropRightWhile(array, [predicate=_.identity])**
从右边开始裁剪数组，起点从 `predicate` 返回假值开始。`predicate` 会传入3个参数：(value, index, array)。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会在每一次迭代调用

### 返回值 _(Array)_
返回裁剪后的数组


### 示例
```javascript

var users = [
    { 'user': 'barney',  'active': true },
    { 'user': 'barney1',  'active': true },
    { 'user': 'fred',    'active': false },
    { 'user': 'pebbles', 'active': true }
  ];
  
_.dropRightWhile(users, function(o) { return !o.active; })
// => [ { user: 'barney', active: true },
  { user: 'barney1', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: true } ]

```
## dropWhile
**_.dropWhile(array, [predicate=_.identity])**
裁剪数组，起点从 `predicate` 返回假值开始。`predicate` 会传入3个参数：(value, index, array)。
### 参数

1. **array** _(Array)_array 需要处理的数组

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会在每一次迭代调用

### 返回值 _(Array)_
Returns the slice of `array`.
### 示例
```javascript
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
_.dropWhile(users, function(o) { return !o.active; });
// => 结果: ['pebbles']
// 使用了 `_.matches` 的回调处理
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => 结果: ['fred', 'pebbles']
// 使用了 `_.matchesProperty` 的回调处理
_.dropWhile(users, ['active', false]);
// => 结果: ['pebbles']
// 使用了 `_.property` 的回调处理
_.dropWhile(users, 'active');
// => 结果: ['barney', 'fred', 'pebbles']
```
## fill
**_.fill(array, value, [start=0], [end=array.length])**
指定 `值` 填充数组，从 `start` 到 `end` 的位置，但不包括 `end` 本身的位置。
**注意:** 这个方法会改变数组
### 参数

1. **array** _(Array)_需要填充的数组

1. **value** _(*)_填充的值

1. **[start=0]** _(number)_开始位置

1. **[end=array.length]** _(number)_结束位置

### 返回值 _(Array)_
返回数组
### 示例
```javascript
var array = [1, 2, 3];
_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']
_.fill(Array(3), 2);
// => [2, 2, 2]
_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```
## findIndex
**_.findIndex(array, [predicate=_.identity])**
这个方法类似 `_.find`。除了它返回最先通过 `predicate` 判断为真值的元素的 index ，而不是元素本身。
### 参数

1. **array** _(Array)_需要搜索的数组

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会在每一次迭代调用

### 返回值 _(number)_
返回符合元素的 index，否则返回 `-1`。
### 示例
```javascript
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
// 使用了 `_.matches` 的回调结果
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
// 使用了 `_.matchesProperty` 的回调结果
_.findIndex(users, ['active', false]);
// => 0
// 使用了 `_.property` 的回调结果
_.findIndex(users, 'active');
// => 2
```
## findLastIndex
_.findLastIndex(array, [predicate=_.identity])
这个方式类似 `_.findIndex` ， 不过它是从右到左的。
### 参数

1. **array** _(Array)_需要搜索的数组

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会在每一次迭代调用

### 返回值 _(number)_
返回符合元素的 index，否则返回 `-1`。
### 示例
```
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2
// 使用了 `_.matches` 的回调结果
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0
// 使用了 `_.matchesProperty` 的回调结果
_.findLastIndex(users, ['active', false]);
// => 2
// 使用了 `_.property` 的回调结果
_.findLastIndex(users, 'active');
// => 0
```
## flatten
_.flatten(array)
向上一级展平数组嵌套
### 参数

1. **array** _(Array)_需要展平的数组

### 返回值 _(Array)_
返回展平后的新数组
### 示例
```javascript
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```
## flattenDeep
_.flattenDeep(array)
递归展平 `数组`.
### 参数

1. **array** _(Array)_需要展平的数组

### 返回值 _(Array)_
返回展平后的新数组
### 示例
```javascript
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```
## flattenDepth
_.flattenDepth(array, [depth=1])
根据 `depth` 递归展平 `数组` 的层级
### 参数

1. **array** _(Array)_需要展平的数组

1. **[depth=1]** _(number)_展平的层级

### 返回值 _(Array)_
返回展平后的新数组
### 示例
```javascript
var array = [1, [2, [3, [4]], 5]];
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```
## fromPairs
_.fromPairs(pairs)
反向版 `_.toPairs`，这个方法返回一个由键值对构成的对象。
### 参数

1. **pairs** _(Array)_键值对

### 返回值 _(Object)_
返回一个新对象
### 示例
```javascript
_.fromPairs([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }
```
## head
_.head(array)
获得数组的首个元素
### 参数

1. **array** _(Array)_要检索的数组

### 返回值 _(*)_
返回数组中的首个元素
### 示例
```javascript
_.head([1, 2, 3]);
// => 1
_.head([]);
// => undefined
```
## indexOf
_.indexOf(array, value, [fromIndex=0])
根据 value 使用 SameValueZero 等值比较返回数组中首次匹配的 index， 如果 fromIndex 为负值，将从数组尾端索引进行匹配，如果将 fromIndex 设置为 true，将使用更快的二进制检索机制。
### 参数

1. **array** _(Array)_要检索的数组

1. **value** _(*)_要检索的值

1. **[fromIndex=0]** _(number)_需要检索的起始位置，如果为 true 将使用二进制检索方式。

### 返回值 _(number)_
返回匹配值的index，否则返回 -1。
### 示例
```javascript
_.indexOf([1, 2, 1, 2], 2);
// => 1
// 使用了 `fromIndex`
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```
## initial
_.initial()
获取数组中除了最后一个元素之外的所有元素
### 返回值 _(Array)_
返回没有最后一个元素的数组
### 示例
```javascript
_.initial([1, 2, 3]);
// => [1, 2]
```
## intersection
_.intersection([arrays])
创建一个包含所有使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 进行等值比较后筛选的唯一值数组。
### 参数

1. **[arrays]** _(...Array)_需要处理的数组队列

### 返回值 _(Array)_
返回数组中所有数组共享元素的新数组
### 示例
```javascript
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```
## intersectionBy
_.intersectionBy([arrays], [iteratee=_.identity])
这个方法类似 `_.intersection`，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)
### 参数

1. **[arrays]** _(...Array)_需要检索的数组

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回数组中共享元素的新数组
### 示例
```javascript
_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]
// 使用了 `_.property` 的回调结果
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
```
## intersectionWith
_.intersectionWith([arrays], [comparator])
这个方法类似 `_.intersection`，除了它接受一个 comparator 调用每一个数组和值。iteratee 会传入2个参数：((arrVal, othVal)
### 参数

1. **[arrays]** _(...Array)_需要检索的数组

1. **[comparator]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回数组中共享元素的新数组
### 示例
```javascript
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]
```
## join
_.join(array, [separator=','])
将数组中的所有元素转换为由 `separator` 分隔的字符串。
### 参数

1. **array** _(Array)_需要转换的数组

1. **[separator=',']** _(string)_分隔符

### 返回值 _(string)_
返回连接好的字符串
### 示例
```javascript
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'
```
## last
_.last(array)
获取数组中的最后一个元素
### 参数

1. **array** _(Array)_要检索的数组

### 返回值 _(*)_
返回数组中的最后一个元素
### 示例
```javascript
_.last([1, 2, 3]);
// => 3
```
## lastIndexOf
_.lastIndexOf(array, value, [fromIndex=array.length-1])
这个方法类似 `_.indexOf`，除了它是从右到左遍历元素的。 这个方法类似 `_.indexOf` except that it iterates over elements of `array` from right to left.
### 参数

1. **array** _(Array)_需要检索的数组

1. **value** _(*)_要检索的值

1. **[fromIndex=array.length-1]** _(number)_检索 index 的起点

### 返回值 _(number)_
返回匹配元素的 index，否则返回 -1
### 示例
```javascript
_.lastIndexOf([1, 2, 1, 2], 2);
// => 3
// 使用了 `fromIndex`
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1
```
## reverse
_.reverse()
反转数组，第一个元素移动到最后一位，第二个元素移动到倒数第二，类似这样。


**注意:** 这个方法会改变数组，根据 [`Array#reverse`](https://mdn.io/Array/reverse)
### 返回值 _(Array)_
返回原数组
### 示例
```javascript
var array = [1, 2, 3];
_.reverse(array);
// => [3, 2, 1]
console.log(array);
// => [3, 2, 1]
```
## pull
_.pull(array, [values])
移除所有经过 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 等值比较为 true 的元素


**注意:** 不同于 `_.without`，这个方法会改变数组。
### 参数

1. **array** _(Array)_需要调整的数组

1. **[values]** _(...*)_要移除的值

### 返回值 _(Array)_
返回数组本身
### 示例
```javascript
var array = [1, 2, 3, 1, 2, 3];
_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
```
## pullAll
_.pullAll(array, values)
这个方式类似 `_.pull`，除了它接受数组形式的一系列值。


**注意:** 不同于 `_.difference`，这个方法会改变数组。
### 参数

1. **array** _(Array)_需要调整的数组

1. **values** _(Array)_要移除的值

### 返回值 _(Array)_
返回数组本身
### 示例
```javascript
var array = [1, 2, 3, 1, 2, 3];
_.pullAll(array, [2, 3]);
console.log(array);
// => [1, 1]
```
## pullAllBy
_.pullAllBy(array, values, [iteratee=_.identity])
这个方法类似 `_.pullAll`，除了它接受一个 comparator 调用每一个数组元素的值。 comparator 会传入一个参数：(value)。


**注意:** 不同于 `_.differenceBy`，这个方法会改变数组。
### 参数

1. **array** _(Array)_需要调整的数组

1. **values** _(Array)_要移除的值

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回数组本身
### 示例
```javascript
var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
console.log(array);
// => [{ 'x': 2 }]
```
## pullAt
_.pullAt(array, [indexes])
根据给的 `indexes` 移除对应的数组元素并返回被移除的元素。


**注意:** 不同于 `_.at`，这个方法会改变数组。
### 参数

1. **array** _(Array)_需要调整的数组

1. **[indexes]** _(...(number|number[])_indexes 可以是特殊的数组队列，或者个别的单个或多个参数

### 返回值 _(Array)_
返回被移除的元素数组
### 示例
```javascript
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);
console.log(array);
// => [5, 15]
console.log(evens);
// => [10, 20]
```
## remove
_.remove(array, [predicate=_.identity])
移除经过 `predicate` 处理为真值的元素，并返回被移除的元素。predicate 会传入3个参数：(value, index, array)


**注意:** Unlike `_.filter`，这个方法会改变数组。
### 参数

1. **array** _(Array)_需要调整的数组

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回被移除的元素的数组
### 示例
```javascript
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n % 2 == 0;
});
console.log(array);
// => [1, 3]
console.log(evens);
// => [2, 4]
```
## slice[](http://lodash.think2011.net/slice)[source](https://github.com/lodash/lodash/blob/4.5.0%E6%AD%A3%E5%BC%8F%E7%89%88/lodash.src.js#L6423)[npm](https://www.npmjs.com/package/lodash.slice)
_.slice(array, [start=0], [end=array.length])
创建一个裁剪后的数组，从 start 到 end 的位置，但不包括 end 本身的位置。


**注意:** 这个方法用于代替 [`Array#slice`](https://mdn.io/Array/slice) 来确保数组正确返回
### 参数

1. **array** _(Array)_需要裁剪的数组

1. **[start=0]** _(number)_开始位置

1. **[end=array.length]** _(number)_结束位置

### 返回值 _(Array)_
返回裁剪后的数组
## sortedIndex
_.sortedIndex(array, value)
使用二进制的方式检索来决定 value 应该插入在数组中位置。它的 index 应该尽可能的小以保证数组的排序。
### 参数

1. **array** _(Array)_需要检索的已排序数组

1. **value** _(*)_要评估位置的值

### 返回值 _(number)_
返回 value 应该在数组中插入的 index。
### 示例
```javascript
_.sortedIndex([30, 50], 40);
// => 1
_.sortedIndex([4, 5], 4);
// => 0
```
## sortedIndexBy
_.sortedIndexBy(array, value, [iteratee=_.identity])
这个方法类似 `_.sortedIndex`，除了它接受一个 iteratee 调用每一个数组和值来计算排序。iteratee 会传入一个参数：(value)。
### 参数

1. **array** _(Array)_需要检索的已排序数组

1. **value** _(*)_要评估位置的值

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(number)_
返回 value 应该在数组中插入的 index。
### 示例
```javascript
var dict = { 'thirty': 30, 'forty': 40, 'fifty': 50 };
_.sortedIndexBy(['thirty', 'fifty'], 'forty', _.propertyOf(dict));
// => 1
// 使用了 `_.property` 回调结果
_.sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
// => 0
```
## sortedIndexOf
_.sortedIndexOf(array, value)
这个方法类似 `_.indexOf`，除了它是执行二进制来检索已经排序的数组的。
### 参数

1. **array** _(Array)_需要检索的数组

1. **value** _(*)_要评估位置的值

### 返回值 _(number)_
返回匹配值的 index ，否则返回 `-1`.
### 示例
```javascript
_.sortedIndexOf([1, 1, 2, 2], 2);
// => 2
```
## sortedLastIndex
_.sortedLastIndex(array, value)
这个方法类似 `_.sortedIndex`，除了它返回在 value 中尽可能大的 index 位置。
### 参数

1. **array** _(Array)_需要检索的已排序数组

1. **value** _(*)_要评估位置的值

### 返回值 _(number)_
返回 value 应该在数组中插入的 index。
### 示例
```javascript
_.sortedLastIndex([4, 5], 4);
// => 1
```
## sortedLastIndexBy
_.sortedLastIndexBy(array, value, [iteratee=_.identity])
这个方法类似 `_.sortedLastIndex`，除了它接受一个 iteratee 调用每一个数组和值来计算排序。iteratee 会传入一个参数：(value)。
### 参数

1. **array** _(Array)_需要检索的已排序数组

1. **value** _(*)_要评估位置的值

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(number)_
返回 value 应该在数组中插入的 index。
### 示例
```javascript
// 使用了 `_.property` 的回调结果
_.sortedLastIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
// => 1
```
## sortedLastIndexOf
_.sortedLastIndexOf(array, value)
这个方法类似 `_.lastIndexOf`，除了它是执行二进制来检索已经排序的数组的。
### 参数

1. **array** _(Array)_需要检索的数组

1. **value** _(*)_要评估位置的值

### 返回值 _(number)_
返回匹配值的 index ，否则返回 -1.
### 示例
```javascript
_.sortedLastIndexOf([1, 1, 2, 2], 2);
// => 3
```
## sortedUniq
_.sortedUniq(array)
这个方法类似 `_.uniq`，除了它会排序并优化数组。
### 参数

1. **array** _(Array)_要调整的数组

### 返回值 _(Array)_
返回一个不重复的数组
### 示例
```javascript
_.sortedUniq([1, 1, 2]);
// => [1, 2]
```
## sortedUniqBy
_.sortedUniqBy(array, [iteratee])
这个方法类似 `_.uniqBy`，除了它接受一个 iteratee 调用每一个数组和值来排序并优化数组。
### 参数

1. **array** _(Array)_要调整的数组

1. **[iteratee]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回一个不重复的数组
### 示例
```javascript
_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
// => [1.1, 2.3]
```
## tail
_.tail(array)
获取数组中除了第一个元素的剩余数组
### 参数

1. **array** _(Array)_要检索的数组

### 返回值 _(Array)_
返回数组中除了第一个元素的剩余数组
### 示例
```javascript
_.tail([1, 2, 3]);
// => [2, 3]
```
## take
_.take(array, [n=1])
从数组的起始元素开始提取 N 个元素。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[n=1]** _(number)_要提取的个数

### 返回值 _(Array)_
返回提取的元素数组
### 示例
```javascript
_.take([1, 2, 3]);
// => [1]
_.take([1, 2, 3], 2);
// => [1, 2]
_.take([1, 2, 3], 5);
// => [1, 2, 3]
_.take([1, 2, 3], 0);
// => []
```
## takeRight
_.takeRight(array, [n=1])
从数组的结束元素开始提取 N 个数组
### 参数

1. **array** _(Array)_需要处理的数组

1. **[n=1]** _(number)_要提取的个数

### 返回值 _(Array)_
返回提取的元素数组
### 示例
```javascript
_.takeRight([1, 2, 3]);
// => [3]
_.takeRight([1, 2, 3], 2);
// => [2, 3]
_.takeRight([1, 2, 3], 5);
// => [1, 2, 3]
_.takeRight([1, 2, 3], 0);
// => []
```
## takeRightWhile
_.takeRightWhile(array, [predicate=_.identity])
从数组的最右边开始提取数组，直到 `predicate` 返回假值。`predicate` 会传入三个参数：(value, index, array)。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回提取的元素数组
### 示例
```javascript
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
_.takeRightWhile(users, function(o) { return !o.active; });
// => 结果:  ['fred', 'pebbles']
// 使用了 `_.matches` 的回调处理
_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
// => 结果:  ['pebbles']
// 使用了 `_.matchesProperty` 的回调处理
_.takeRightWhile(users, ['active', false]);
// => 结果:  ['fred', 'pebbles']
// 使用了 `_.property` 的回调处理
_.takeRightWhile(users, 'active');
// => []
```
## takeWhile
_.takeWhile(array, [predicate=_.identity])
从数组的开始提取数组，直到 predicate 返回假值。predicate 会传入三个参数：(value, index, array)。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回提取的元素数组
### 示例
```javascript
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false},
  { 'user': 'pebbles', 'active': true }
];
_.takeWhile(users, function(o) { return !o.active; });
// => objects for ['barney', 'fred']
// 使用了 `_.matches` 的回调处理
_.takeWhile(users, { 'user': 'barney', 'active': false });
// =>结果: ['barney']
// 使用了 `_.matchesProperty` 的回调处理
_.takeWhile(users, ['active', false]);
// =>结果: ['barney', 'fred']
// 使用了 `_.property` 的回调处理
_.takeWhile(users, 'active');
// => []
```
## union
_.union([arrays])
创建顺序排列的唯一值组成的数组。所有值经过 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 等值比较。
### 参数

1. **[arrays]** _(...Array)_需要处理的数组队列

### 返回值 _(Array)_
返回处理好的数组
### 示例
```javascript
_.union([2, 1], [4, 2], [1, 2]);
// => [2, 1, 4]
```
## unionBy
_.unionBy([arrays], [iteratee=_.identity])
这个方法类似 `_.union`，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)。
### 参数

1. **[arrays]** _(...Array)_需要处理的数组队列

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回处理好的数组
### 示例
```javascript
_.unionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1, 1.2, 4.3]
// 使用了 `_.property` 的回调结果
_.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
## unionWith
_.unionWith([arrays], [comparator])
这个方法类似 `_.union`， 除了它接受一个 comparator 调用每一个数组元素的值。 comparator 会传入2个参数：(arrVal, othVal)。
### 参数

1. **[arrays]** _(...Array)_需要处理的数组队列

1. **[comparator]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回处理好的数组
### 示例
```javascript
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
_.unionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```
## uniq
_.uniq(array)
创建一个不重复的数组副本。使用了 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 等值比较。只有首次出现的元素才会被保留。
### 参数

1. **array** _(Array)_需要处理的数组

### 返回值 _(Array)_
返回不重复的数组
### 示例
```javascript
_.uniq([2, 1, 2]);
// => [2, 1]
```
## uniqBy
_.uniqBy(array, [iteratee=_.identity])
这个方法类似 `_.uniq`，除了它接受一个 iteratee 调用每一个数组和值来计算唯一性。iteratee 会传入一个参数：(value)。
### 参数

1. **array** _(Array)_需要处理的数组

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回不重复的数组
### 示例
```javascript
_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]
// 使用了 `_.property` 的回调结果
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
## uniqWith
_.uniqWith(array, [comparator])
这个方法类似 `_.uniq`，除了它接受一个 `comparator` 来比较计算唯一性。 `comparator` 会传入2个参数：(arrVal, othVal)
### 参数

1. **array** _(Array)_需要处理的数组

1. **[comparator]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回不重复的数组
### 示例
```javascript
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 },  { 'x': 1, 'y': 2 }];
_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```
## unzip
_.unzip(array)
这个方法类似 `_.zip`，除了它接收一个打包后的数组并且还原为打包前的状态。
### 参数

1. **array** _(Array)_需要解包的已打包数组

### 返回值 _(Array)_
返回一个解包后的数组
### 示例
```javascript
var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
_.unzip(zipped);
// => [['fred', 'barney'], [30, 40], [true, false]]
```
## unzipWith
_.unzipWith(array, [iteratee=_.identity])
这个方法类似 `_.unzip`，除了它接受一个 iteratee 来决定如何重组解包后的数组。iteratee 会传入4个参数：(accumulator, value, index, group)。每组的第一个元素作为初始化的值
### 参数

1. **array** _(Array)_需要解包的已打包数组

1. **[iteratee=_.identity]** _(Function)_决定如何重组解包后的元素

### 返回值 _(Array)_
返回一个解包后的数组
### 示例
```javascript
var zipped = _.zip([1, 2], [10, 20], [100, 200]);
// => [[1, 10, 100], [2, 20, 200]]
_.unzipWith(zipped, _.add);
// => [3, 30, 300]
```
## without
_.without(array, [values])
创建一个移除了所有提供的 values 的数组。使用了 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 等值比较。
### 参数

1. **array** _(Array)_要处理的数组

1. **[values]** _(...*)_要排除的值

### 返回值 _(Array)_
返回一个处理好的新数组
### 示例
```javascript
_.without([1, 2, 1, 3], 1, 2);
// => [3]
```
## xor
_.xor([arrays])
创建一个包含了所有唯一值的数组。使用了 [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) 等值比较。
### 参数

1. **[arrays]** _(...Array)_要处理的数组

### 返回值 _(Array)_
包含了所有唯一值的新数组
### 示例
```javascript
_.xor([2, 1], [4, 2]);
// => [1, 4]
```
## xorBy
_.xorBy([arrays], [iteratee=_.identity])
这个方法类似 `_.xor`，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)。
### 参数

1. **[arrays]** _(...Array)_要处理的数组

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
包含了所有唯一值的新数组
### 示例
```javascript
_.xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [1.2, 4.3]
// 使用了 `_.property` 的回调结果
_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
## xorWith
_.xorWith([arrays], [comparator])
这个方法类似 `_.xor`，除了它接受一个 comparator 调用每一个数组元素的值。 comparator 会传入2个参数：(arrVal, othVal)。
### 参数

1. **[arrays]** _(...Array)_要处理的数组

1. **[comparator]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array)_
包含了所有唯一值的新数组
### 示例
```javascript
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
_.xorWith(objects, others, _.isEqual);
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```
## zip
_.zip([arrays])
创建一个打包所有元素后的数组。第一个元素包含所有提供数组的第一个元素，第二个包含所有提供数组的第二个元素，以此类推。
### 参数

1. **[arrays]** _(...Array)_要处理的数组队列

### 返回值 _(Array)_
返回一个打包后的数组
### 示例
```javascript
_.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
```
## zipObject
_.zipObject([props=[]], [values=[]])
这个方法类似 `_.fromPairs`，除了它接受2个数组，一个作为属性名，一个作为属性值。
### 参数

1. **[props=[]]** _(Array)_属性名

1. **[values=[]]** _(Array)_属性值

### 返回值 _(Object)_
返回一个新的对象
### 示例
```javascript
_.zipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }
```
## zipObjectDeep
_.zipObjectDeep([props=[]], [values=[]])
这个方法类似 `_.zipObject`，除了它支持属性路径。 This method is like `_.zipObject` except that it supports property paths.
### 参数

1. **[props=[]]** _(Array)_属性名

1. **[values=[]]** _(Array)_属性值

### 返回值 _(Object)_
返回新的对象
### 示例
```javascript
_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```
## zipWith
_.zipWith([arrays])
这个方法类似 _.zip， 除了它接受一个 iteratee 决定如何重组值。 iteratee 会调用每一组元素。
### 参数

1. **[arrays]** _(...Array)_要处理的数组队列

### 返回值 _(Array)_
返回一个打包后的数组
### 示例
```javascript
_.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
  return a + b + c;
});
// => [111, 222]
```


