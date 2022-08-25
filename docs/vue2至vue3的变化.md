# vue3的过渡文档



## 一、vue3的新增特性

### Composition API 组合式API

> todo

### Teleport 传送门

> todo

### Fragments 多节点组件

> todo

### Emits事件派发

> todo

### ==[?]==` createRenderer`创建自定义渲染器

> todo

### `<script setup>` 组合式API语法糖

> todo

### `<style vars>` 状态驱动css变量

> todo

### `<style scoped>`定义全局规则或者只定义插槽内容的规则

```css
<style scoped>
/* deep selectors */
::v-deep(.foo) {}
/* shorthand */
:deep(.foo) {}
 
/* targeting slot content */
::v-slotted(.foo) {}
/* shorthand */
:slotted(.foo) {}

/* one-off global rule */
::v-global(.foo) {}
/* shorthand */
:global(.foo) {}
</style>
```



## 二、非兼容的变更

###  Global API变更

- `createApp`工厂函数构建实例

- 全局API Treeshaking优化
  - `Vue.nextTick`
  - `Vue.set` (仅兼容构建)
  - `Vue.delete(仅兼容构建)`



### 模板指令的用法变更

- `v-model`

- `template v-for`

- `v-if` `v-for`优先级变更

- ==[*]== `v-bind`属性覆盖规则改为按排序覆盖

- `v-on:event.native` 修饰符已移除

  > 简化用法，使用`emit`机制可以有效区分组件事件与原生事件

- `ref`数组使用方法的变更

  > `v-for`通过ref指定执行函数，传入子节点的el，进行处理。



### 组件变更

- ==[*]== 函数式组件的变更
  >1. `functional` attribute 在 `<template>` 中移除
  >2. `listeners` 现在作为 `$attrs` 的一部分传递，可以将其删除
- 异步组件声明`defineAsyncComponent`
- `emits`选项或者 `defineEmits`标记派发事件



### 渲染函数的变更

- 渲染函数API变更

  > setup阶段，可以返回一个render函数，render函数不接收任何参数，`h`渲染函数通过导入方式使用。

-  `this.$scopedSlots` 替换为 `this.$slots`

- `listeners` 并入 `$attrs` 

- ==[**]==自定义指令更改为与声明周期一致

  >- bind → **beforeMount**
  >- inserted → **mounted**
  >- **beforeUpdate**：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
  >- update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 `updated`。
  >- componentUpdated → **updated**
  >- **beforeUnmount**：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
  >- unbind -> **unmounted**
  
- [组件 watch 选项](https://www.javascriptc.com/vue3js/api/options-data.html#watch)和[实例方法 `$watch`](https://www.javascriptc.com/vue3js/api/instance-methods.html#watch) 不再支持点分隔字符串路径，请改用计算函数作为参数

- 在 Vue 2.x 中，应用根容器的 `outerHTML` 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。VUE3.x 现在使用应用程序容器的 `innerHTML`。



### 其它变更

- ==[**]==生命周期的更改

  > - destroy阶段更名为unmount
  >   1.`destroyed` 生命周期选项被重命名为 `unmounted`
  >
  >   2.`beforeDestroy` 生命周期选项被重命名为 `beforeUnmount`
  >
  > - 增加`setup`阶段

- mixins只能浅层合并（对象内属性会被覆盖）。

- 过渡的 class 名更改

  > 1. 将 `.v-enter` 字符串实例替换为 `.v-enter-from`
  > 2. 将 `.v-leave` 字符串实例替换为 `.v-leave-from`
  > 3. 过渡组件相关属性名也需要进行字符串实例替换，规则如上所述。

- `<template>` 没有特殊指令的标记 (`v-if/else-if/else`、`v-for` 或 `v-slot`) 现在被视为普通元素，并将生成原生的 `<template>` 元素，而不是渲染其内部内容。



## 三、废弃API

- [`keyCode` 支持作为 `v-on` 的修饰符](https://www.javascriptc.com/vue3js/guide/migration/keycode-modifiers.html)

  > 不再支持使用数字 (即键码) 作为 `v-on` 修饰符
  >
  > 不再支持 `config.keyCodes`
  >
  > 现在建议对任何要用作修饰符的键使用 kebab-cased (短横线) 大小写名称

- [移除`$on`，`$off `和 `$once` 实例方法](https://www.javascriptc.com/vue3js/guide/migration/events-api.html)

- [移除filter过滤，建议采用computed替代](https://www.javascriptc.com/vue3js/guide/migration/filters.html)

- [移除`$children` ，建议采用refs获取子节点实例](https://www.javascriptc.com/vue3js/guide/migration/children.html)

- 移除`$destroy` 实例方法。用户不应再手动管理单个 Vue 组件的生命周期。

 