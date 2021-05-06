# 添加属性
```javascript
var vm = new Vue({
        functional: true,
        el: "#app",
        data: {
            a: {
                b: 1
            }
        },
        mounted() {
           this.a.c=1;
        }
    });
```
我们这么操作时没有任何效果,所以vue提供了Vue.set和vm.$set来把新属性变成响应式,这个 set 方法的定义在 src/core/observer/index.js 中：
```javascript
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
set 方法接收 3个参数，target 可能是数组或者是普通对象，key 代表的是数组的下标或者是对象的键值，val 代表添加的值。首先判断如果 target 是数组且 key 是一个合法的下标，则之前通过 splice 去添加进数组然后返回，这里的 splice 其实已经不仅仅是原生数组的 splice 了，稍后我会详细介绍数组的逻辑。接着又判断 key 已经存在于 target 中，则直接赋值返回，因为这样的变化是可以观测到了。接着再获取到 target.__ob__ 并赋值给 ob，之前分析过它是在 Observer 的构造函数执行的时候初始化的，表示 Observer 的一个实例，如果它不存在，则说明 target 不是一个响应式的对象，则直接赋值并返回。最后通过 defineReactive(ob.value, key, val) 把新添加的属性变成响应式对象，然后再通过 ob.dep.notify() 手动的触发依赖通知.
# 删除属性
```javascript
/**
     * Delete a property and trigger change if necessary.
     */
    function del(target, key) {
        if (isUndef(target) || isPrimitive(target)
        ) {
            warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
        }
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.splice(key, 1);
            return
        }
        var ob = (target).__ob__;
        if (target._isVue || (ob && ob.vmCount)) {
            warn(
                'Avoid deleting properties on a Vue instance or its root $data ' +
                '- just set it to null.'
            );
            return
        }
        if (!hasOwn(target, key)) {
            return
        }
        delete target[key];
        if (!ob) {
            return
        }
        ob.dep.notify();
    }
```
类似于set,delete 删除对象属性,解除响应式,并通知更新
