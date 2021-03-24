## countBy
_.countBy(collection, [iteratee=_.identity])
创建一个组成对象，key是经过 `iteratee` 处理的集合的结果，value 是处理结果的次数。 `iteratee` 会传入一个参数：(value)。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Object)_
返回一个组成汇总的对象
### 示例
```javascript
_.countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }
_.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```
## every
_.every(collection, [predicate=_.identity])
通过 `predicate` 检查集合中的元素是否都返回 真值，只要 `predicate` 返回一次假值，遍历就停止，并返回 false。 `predicate` 会传入3个参数：(value, index|key, collection)
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(boolean)_
返回 true，如果所有元素经 predicate 检查都为真值，否则返回 false。
### 示例
```javascript
_.every([true, 1, null, 'yes'], Boolean);
// => false
var users = [
  { 'user': 'barney', 'active': false },
  { 'user': 'fred',   'active': false }
];
// 使用了 `_.matches` 的回调结果
_.every(users, { 'user': 'barney', 'active': false });
// => false
// 使用了 `_.matchesProperty` 的回调结果
_.every(users, ['active', false]);
// => true
// 使用了 `_.property` 的回调结果
_.every(users, 'active');
// => false
```
## filter
_.filter(collection, [predicate=_.identity])
遍历集合中的元素，筛选出一个经过 `predicate` 检查结果为真值的数组，predicate 会传入3个参数：(value, index|key, collection)。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回筛选结果的新数组
### 示例
```javascript
var resolve = _.partial(_.map, _, 'user');
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
resolve( _.filter(users, function(o) { return !o.active; }) );
// => ['fred']
// 使用了 `_.matches` 的回调结果
resolve( _.filter(users, { 'age': 36, 'active': true }) );
// => ['barney']
// 使用了 `_.matchesProperty` 的回调结果
resolve( _.filter(users, ['active', false]) );
// => ['fred']
// 使用了 `_.property` 的回调结果
resolve( _.filter(users, 'active') );
// => ['barney']
```
## find
_.find(collection, [predicate=_.identity])
遍历集合中的元素，返回最先经 `predicate` 检查为真值的元素。 predicate 会传入3个元素：(value, index|key, collection)。
### 参数

1. **collection** _(Array|Object)_要检索的集合

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(*)_
返回匹配元素，否则返回 `undefined`
### 示例
```javascript
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
_.find(users, function(o) { return o.age < 40; });
// => 结果: 'barney'
// 使用了 `_.matches` 的回调结果
_.find(users, { 'age': 1, 'active': true });
// => 结果: 'pebbles'
// 使用了 `_.matchesProperty` 的回调结果
_.find(users, ['active', false]);
// => 结果: 'fred'
// 使用了 `_.property` 的回调结果
_.find(users, 'active');
// => 结果: 'barney'
```
## findLast
_.findLast(collection, [predicate=_.identity])
这个方法类似 `_.find`，除了它是从右至左遍历集合的。
### 参数

1. **collection** _(Array|Object)_要检索的集合

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(*)_
返回匹配元素，否则返回 `undefined`
### 示例
```javascript
_.findLast([1, 2, 3, 4], function(n) {
  return n % 2 == 1;
});
// => 3
```
## flatMap
_.flatMap(collection, [iteratee=_.identity])
创建一个扁平化的数组，每一个值会传入 iteratee 处理，处理结果会与值合并。 iteratee 会传入3个参数：(value, index|key, array)。
### 参数

1. **collection** _(Array|Object)_需要遍历的数组

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会在每一次迭代调用

### 返回值 _(Array)_
返回新数组
### 示例
```javascript
function duplicate(n) {
  return [n, n];
}
_.flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]
```
## forEach
_.forEach(collection, [iteratee=_.identity])
调用 iteratee 遍历集合中的元素， iteratee 会传入3个参数：(value, index|key, collection)。 如果显式的返回 false ，iteratee 会提前退出。


**注意:** 与其他集合方法一样，对象的 length 属性也会被遍历，避免这种情况，可以用 _.forIn 或者 _.forOwn 代替。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array|Object)_
返回集合
### 示例
```javascript
_([1, 2]).forEach(function(value) {
  console.log(value);
});
// => 输出 `1` 和 `2`
_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => 输出 'a' 和 'b' (不保证遍历的顺序)
```
## forEachRight
_.forEachRight(collection, [iteratee=_.identity])
这个方法类似 `_.forEach`，除了它是从右到左遍历的集合中的元素的。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function)_这个函数会处理每一个元素

### 返回值 _(Array|Object)_
返回集合
### 示例
```javascript
_.forEachRight([1, 2], function(value) {
  console.log(value);
});
// => 输出 `2` 和 `1`
```
## groupBy
_.groupBy(collection, [iteratee=_.identity])
创建一个对象组成，key 是经 iteratee 处理的结果， value 是产生 key 的元素数组。 iteratee 会传入1个参数：(value)。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Object)_
返回一个组成汇总的对象
### 示例
```javascript
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
// 使用了 `_.property` 的回调结果
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```
## includes
_.includes(collection, value, [fromIndex=0])
检查 值 是否在 集合中，如果集合是字符串，那么检查 值 是否在字符串中。 其他情况用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 等值比较。 如果指定 `fromIndex` 是负数，从结尾开始检索。
### 参数

1. **collection** _(Array|Object|string)_要检索的集合

1. **value** _(*)_要检索的值

1. **[fromIndex=0]** _(number)_要检索的 index 位置

### 返回值 _(boolean)_
如果找到 value 返回 ture， 否则返回 false。
### 示例
```javascript
_.includes([1, 2, 3], 1);
// => true
_.includes([1, 2, 3], 1, 2);
// => false
_.includes({ 'user': 'fred', 'age': 40 }, 'fred');
// => true
_.includes('pebbles', 'eb');
// => true
```
## invokeMap
_.invokeMap(collection, path, [args])
调用 `path` 的方法处理集合中的每一个元素，返回处理的数组。 如何附加的参数会传入到调用方法中。如果方法名是个函数，集合中的每个元素都会被调用到。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **path** _(Array|Function|string)_要调用的方法名 或者 这个函数会处理每一个元素

1. **[args]** _(...*)_The arguments to invoke each method with.

### 返回值 _(Array)_
返回数组结果
### 示例
```javascript
_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]
_.invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```
## keyBy
_.keyBy(collection, [iteratee=_.identity])
创建一个对象组成。key 是经 `iteratee` 处理的结果，value 是产生key的元素。 iteratee 会传入1个参数：(value)。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Object)_
返回一个组成汇总的对象
### 示例
```javascript
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];
_.keyBy(array, function(o) {
  return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
```
## map
_.map(collection, [iteratee=_.identity])
创建一个经过 `iteratee` 处理的集合中每一个元素的结果数组。 iteratee 会传入3个参数：(value, index|key, collection)。


有许多 lodash 的方法以 iteratees 的身份守护其工作，例如： `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, 以及 `_.some`


被守护的有:
`ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`, `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`, 以及 `words`
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回映射后的新数组
### 示例
```javascript
function square(n) {
  return n * n;
}
_.map([4, 8], square);
// => [16, 64]
_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (无法保证遍历的顺序)
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
// 使用了 `_.property` 的回调结果
_.map(users, 'user');
// => ['barney', 'fred']
```
## orderBy
_.orderBy(collection, [iteratees=[_.identity]], [orders])
这个方法类似 `_.sortBy`，除了它允许指定 iteratees 结果如何排序。 如果没指定 `orders`，所有值以升序排序。 其他情况，指定 "desc" 降序，指定 "asc" 升序其对应值。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratees=[_.identity]]** _(Function[]|Object[]|string[])_通过 iteratees 决定排序

1. **[orders]** _(string[])_决定 iteratees 的排序方法

### 返回值 _(Array)_
排序排序后的新数组
### 示例
```
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 42 },
  { 'user': 'barney', 'age': 36 }
];
// 以 `user` 升序排序 再 以 `age` 降序排序。
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => 结果: [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
```
## partition
_.partition(collection, [predicate=_.identity])
创建一个拆分为两部分的数组。 第一部分是 `predicate` 检查为真值的，第二部分是 `predicate` 检查为假值的。 predicate 会传入3个参数：(value, index|key, collection)。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回分组元素的数组
### 示例
```javascript
var users = [
  { 'user': 'barney',  'age': 36, 'active': false },
  { 'user': 'fred',    'age': 40, 'active': true },
  { 'user': 'pebbles', 'age': 1,  'active': false }
];
_.partition(users, function(o) { return o.active; });
// => 结果: [['fred'], ['barney', 'pebbles']]
// 使用了 `_.matches` 的回调结果
_.partition(users, { 'age': 1, 'active': false });
// => 结果: [['pebbles'], ['barney', 'fred']]
// 使用了 `_.matchesProperty` 的回调结果
_.partition(users, ['active', false]);
// => 结果: [['barney', 'pebbles'], ['fred']]
// 使用了 `_.property` 的回调结果
_.partition(users, 'active');
// => 结果: [['fred'], ['barney', 'pebbles']]
```
## reduce
_.reduce(collection, [iteratee=_.identity], [accumulator])
通过 `iteratee` 遍历集合中的每个元素。 每次返回的值会作为下一次 `iteratee` 使用。 如果没有提供 `accumulator`，则集合中的第一个元素作为 `accumulator`。 iteratee 会传入4个参数：(accumulator, value, index|key, collection)。


有许多 lodash 的方法以 iteratees 的身份守护其工作，例如： `_.reduce`, `_.reduceRight`, 以及 `_.transform`.


被守护的有:
`assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`, 以及 `sortBy`
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function)_这个函数会处理每一个元素

1. **[accumulator]** _(*)_初始化的值

### 返回值 _(*)_
返回累加后的值
### 示例
```javascript
_.reduce([1, 2], function(sum, n) {
  return sum + n;
}, 0);
// => 3
_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
  return result;
}, {});
// => { '1': ['a', 'c'], '2': ['b'] } (无法保证遍历的顺序)
```
## reduceRight
_.reduceRight(collection, [iteratee=_.identity], [accumulator])
这个方法类似 `_.reduce` ，除了它是从右到左遍历的。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratee=_.identity]** _(Function)_这个函数会处理每一个元素

1. **[accumulator]** _(*)_初始化的值

### 返回值 _(*)_
返回累加后的值
### 示例
```javascript
var array = [[0, 1], [2, 3], [4, 5]];
_.reduceRight(array, function(flattened, other) {
  return flattened.concat(other);
}, []);
// => [4, 5, 2, 3, 0, 1]
```
## reject
_.reject(collection, [predicate=_.identity])
反向版 `_.filter`，这个方法返回 `predicate` 检查为非真值的元素。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(Array)_
返回过滤后的新数组
### 示例
```javascript
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];
_.reject(users, function(o) { return !o.active; });
// => 结果: ['fred']
// 使用了 `_.matches` 的回调结果
_.reject(users, { 'age': 40, 'active': true });
// => 结果: ['barney']
// 使用了 `_.matchesProperty` 的回调结果
_.reject(users, ['active', false]);
// => 结果: ['fred']
// 使用了 `_.property` 的回调结果
_.reject(users, 'active');
// => 结果: ['barney']
```
## sample
_.sample(collection)
从集合中随机获得元素
### 参数

1. **collection** _(Array|Object)_要取样的集合

### 返回值 _(*)_
返回随机元素
### 示例
```javascript
_.sample([1, 2, 3, 4]);
// => 2
```
## sampleSize
_.sampleSize(collection, [n=0])
获得从集合中随机获得 `N` 个元素 Gets `n` random elements from `collection`.
### 参数

1. **collection** _(Array|Object)_要取样的集合

1. **[n=0]** _(number)_要取得的元素个数

### 返回值 _(Array)_
返回随机元素
### 示例
```javascript
_.sampleSize([1, 2, 3], 2);
// => [3, 1]
_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```
## shuffle
_.shuffle(collection)
创建一个被打乱元素的集合。 使用了 [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle) 版本。
### 参数

1. **collection** _(Array|Object)_要打乱的集合

### 返回值 _(Array)_
返回一个被打乱元素的新集合
### 示例
```javascript
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```
## size
_.size(collection)
返回集合的长度或对象中可枚举属性的个数。
### 参数

1. **collection** _(Array|Object)_待处理的集合

### 返回值 _(number)_
返回集合的大小
### 示例
```javascript
_.size([1, 2, 3]);
// => 3
_.size({ 'a': 1, 'b': 2 });
// => 2
_.size('pebbles');
// => 7
```
## some
_.some(collection, [predicate=_.identity])
通过 predicate 检查集合中的元素是否存在任意真值的元素，只要 predicate 返回一次真值，遍历就停止，并返回 true。 predicate 会传入3个参数：(value, index|key, collection)。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[predicate=_.identity]** _(Function|Object|string)_这个函数会处理每一个元素

### 返回值 _(boolean)_
返回 true，如果任意元素经 predicate 检查都为真值，否则返回 false。
### 示例
```javascript
_.some([null, 0, 'yes', false], Boolean);
// => true
var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];
// 使用了 `_.matches` 的回调结果
_.some(users, { 'user': 'barney', 'active': false });
// => false
// 使用了 `_.matchesProperty` 的回调结果
_.some(users, ['active', false]);
// => true
// 使用了 `_.property` 的回调结果
_.some(users, 'active');
// => true
```
## sortBy
_.sortBy(collection, [iteratees=[_.identity]])
创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 会传入1个参数：(value)。
### 参数

1. **collection** _(Array|Object)_需要遍历的集合

1. **[iteratees=[_.identity]]** _(...(Function|Function[]|Object|Object[]|string|string[])_这个函数决定排序

### 返回值 _(Array)_
返回排序后的数组
### 示例
```javascript
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 42 },
  { 'user': 'barney', 'age': 34 }
];
_.sortBy(users, function(o) { return o.user; });
// => 排序结果 [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
_.sortBy(users, ['user', 'age']);
// => 排序结果 [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
_.sortBy(users, 'user', function(o) {
  return Math.floor(o.age / 10);
});
// => 排序结果 [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
```
## now
_.now()
获得 Unix 纪元(1970 1月1日 00:00:00 UTC) 直到现在的毫秒数。
### 返回值 _(number)_
返回时间戳
### 示例
```javascript
_.defer(function(stamp) {
  console.log(_.now() - stamp);
}, _.now());
// => 记录延迟函数调用的毫秒数
```
