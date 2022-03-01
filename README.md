# javascript

该项目主要用于在学习 JavaScript 时编写测试代码；并做好相应笔记。同时该项目也是一个 JavaScript 模板库；

### 项目搭建

1. 安装 webpack

```sh
npm i -D webpack webpack-dev-server webpack-cli
```

2. 配置 webpack

在根目录下添加`webpack.dev.js`和`webpack.prod.js`

`webpack.dev.js`用于开发环境，`webpack.prod.js`用于生产环境；

```sh
# 生产环境中使用 babel-loader；
npm i -D @babel/core @babel/preset-env babel-loader

# 根据需要安装其他 loader 和 plugin；
npm i -D style-loader css-loader html-webpack-plugin
```

- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)

3. 配置 babel

> Babel 是一个 JavaScript 编译器，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

- [babel配置教程](https://www.babeljs.cn/setup#installation)

4. 最后在 `package.json` 中添加运行脚本

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "webpack server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
},
```

### JavaScript 基础

**什么是 JavaScript ？**

> JavaScript 最初被创建的目的是“使网页更生动”。这种编程语言写出来的程序被称为 脚本。它们可以被直接写在网页的 HTML 中，在页面加载的时候自动执行。脚本被以纯文本的形式提供和执行。它们不需要特殊的准备或编译即可运行。

JavaScript 引擎工作基本原理：引擎解析脚本，然后将脚本编译转化为机器语言，最后执行机器语言。

**浏览器中的 JavaScript 限制**

为了用户的（信息）安全，在浏览器中的 JavaScript 的能力是受限的。目的是防止恶意网页获取用户私人信息或损害用户数据。网页中的 JavaScript 不能读、写、复制和执行硬盘上的任意文件。不同的标签页/窗口之间通常互不了解。

**JavaScript 手册**

- [JavaScript MDN 中文参考手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)
- [JavaScript 兼容性表](https://caniuse.com/)

**浏览器开发者控制台**

> Tips: 在控制台中要插入多行代码，按 Shift+Enter 来进行换行。

**script 标签**

应该尽量将较复杂的脚本存放在单独的文件中，使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的缓存中。之后，其他页面想要相同的脚本就会从缓存中获取，所以文件实际上只会下载一次，这可以节省流量，并使得页面（加载）更快。

> ❗ : 如果设置了 src 特性，script 标签内容将会被忽略。

JavaScript 代码以分号结尾，注意添加完整分号，以下代码会报错；

```js
alert("Hello")

// Uncaught TypeError: Cannot read properties of undefined (reading '2')
[1, 2].forEach(alert);
```

**JavaScript 变量命名**

1. 必须仅包含字母，数字，符号 $ 和 _；
2. 首字符必须非数字；
3. 通常使用驼峰命名规则；
4. 对大小写敏感；
5. 不能使用[保留字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%85%B3%E9%94%AE%E5%AD%97)命名；
6. 允许非英文字母，但不推荐；

**JavaScript 数据类型**

在 JavaScript 中有 8 种基本的数据类型（译注：7 种原始类型和 1 种引用类型）。JavaScript，被称为“动态类型”（dynamically typed）的编程语言，意思是虽然编程语言中有不同的数据类型，但是你定义的变量并不会在定义后，被限制为某一数据类型。

- Number 用于任何类型的数字：整数或浮点数，在 ±(2^53-1) 范围内的整数；

```js
// Infinity 代表数学概念中的 无穷大 ∞；是一个比任何数字都大的特殊值；
console.log(1 / 0 === Infinity); // true

// NaN 代表一个计算错误；它是一个不正确的或者一个未定义的数学操作所得到的结果；
// 任何对 NaN 的进一步数学运算都会返回 NaN，且 NaN 不等于任何值，包括自己；
console.log('a' / 2 === NaN); // false
```

- BigInt 用于任意长度的整数；

Number 类型无法表示大于 (253-1)（即 9007199254740991），或小于 -(253-1) 的整数；目前 IE 还未支持该类型；

```js
// 尾部的 "n" 表示这是一个 BigInt 类型
const bigInt = 1234567890123456789012345678901234567890n;
```

- String 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型；

双引号和单引号都是“简单”引用，在 JavaScript 中两者几乎没有什么差别。反引号是 功能扩展 引号。它们允许我们通过将变量和表达式包装在 ${…} 中，来将它们嵌入到字符串中。

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`; // 模板字符串
```

- Boolean 用于 true 和 false；表示逻辑类型；
- null 用于未知的值 —— 只有一个 null 值的独立类型；
- undefined 用于未定义的值 —— 只有一个 undefined 值的独立类型，代表未被赋值；

```js
// 不建议显示地将 undefined 赋值给变量，通常，使用 null 将一个“空”或者“未知”的值写入变量中，而 undefined 则保留作为未进行初始化的事物的默认初始值。
let age = undefined;
```

- Symbol 用于唯一的标识符；
- Object 用于更复杂的数据结构；

当我们想要分别处理不同类型值的时候，或者想快速进行数据类型检验时，可以使用 typeof 运算符返回参数的类型。

```js
// 这是官方承认的 typeof 的错误，这个问题来自于 JavaScript 语言的早期阶段，并为了兼容性而保留了下来；
typeof null // "object"

// 在 JavaScript 语言中没有一个特别的 “function” 类型。函数隶属于 object 类型。但是 typeof 会对函数区分对待，并返回 "function"；
typeof alert // "function"
```
   
**JavaScript 类型转换**

- 字符串转换：转换发生在输出内容的时候，也可以通过 String(value) 进行显式转换；
- 数字型转换：转换发生在进行算术操作时，也可以通过 Number(value) 进行显式转换；

| 值 | 转换 |
|:----|:----|
| undefined | NaN |
| null | 0 |
| true / false | 1 / 0 |
| string | 忽略字符串两端的空白，按原样读取，空字符串变成 0。转换出错则输出 NaN |

- 布尔型转换：转换发生在进行逻辑操作时，也可以通过 Boolean(value) 进行显式转换；

| 值 | 转换 |
|:----|:----|
| 0, null, undefined, NaN, "" | false |
| 其他值 | true |

**JavaScript 运算符**

- 赋值运算符

赋值语句 x = value 将值 value 写入 x 然后返回 x；

```js
let a = 1;
let b = 2;

let c = 3 - (a = b + 1); // a: 3, c: 0 慎用！
```

链式赋值从右到左进行计算，但可读性不高；

- 自增 / 自减

++, --，又分为前置形式和后置形式，前置形式返回一个新的值，但后置返回原来的值（做加法/减法之前的值）。

[JavaScript 运算符优先级表](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

**JavaScript 值的比较**

在比较字符串的大小时，JavaScript 会使用“字典（dictionary）”或“词典（lexicographical）”顺序进行判定。换言之，字符串是按字符（母）逐个进行比较的。

字符串的比较算法：
1. 首先比较两个字符串的首位字符大小。
2. 如果一方字符较大（或较小），则该字符串大于（或小于）另一个字符串。算法结束。
3. 否则，如果两个字符串的首位字符相等，则继续取出两个字符串各自的后一位字符进行比较。
4. 重复上述步骤进行比较，直到比较完成某字符串的所有字符为止。
5. 如果两个字符串的字符同时用完，那么则判定它们相等，否则未结束（还有未比较的字符）的字符串更大。

```js
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

当对不同类型的值进行比较时，JavaScript 会首先将其转化为数字（number）再判定大小；

```js
// 当使用严格等于 === 时，不相等，因为它们属于不同的类型；
alert( null === undefined ); // false

// 当使用非严格等于 == 时，相等，仅仅等于对方而不等于其他任何的值；
alert( null == undefined ); // true

// 当使用数学式或其他比较方法 < > <= >= 时，null/undefined 会被转化为数字：null 被转化为 0，undefined 被转化为 NaN；
alert( null > undefined ); // false

// 相等性检查 == 和普通比较符 > < >= <= 的代码逻辑是相互独立的
alert( null > 0 );  // false
alert( null == 0 ); // false
alert( null >= 0 ); // true

// undefined 和 null 在相等性检查 == 中不会进行任何的类型转换；
// 它们有自己独立的比较规则，所以除了它们之间互等外，不会等于任何其他的值
alert( undefined > 0 ); // false
alert( undefined < 0 ); // false
alert( undefined == 0 ); // false
```

**逻辑运算符**

- 或运算符 || 返回的值是操作数的初始形式，不会做布尔转换。

执行过程：

1. 从左到右依次计算操作数；
2. 将每一个操作数转化为布尔值；若结果为 true，则返回该操作数的初始值；
3. 如果所有的操作数都被计算过（转换结果都是 false），则返回最后一个操作数；

常见用法：
1. 获取变量列表或者表达式中的第一个真值；
2. 短路求值（Short-circuit evaluation）；

- 与运算符 && 返回的值是第一个假值的初始形式；
- 非运算符 ! 返回操作数的取反布尔值；

> Tips: 两个非运算 !! 有时候用来将某个值转化为布尔类型：

**空值合并运算符**

`a ?? b` 表示如果第一个参数不是 null/undefined，则 ?? 返回第一个参数。否则，返回第二个参数。


等价写法：
```js
result = (a !== null && a !== undefined) ? a : b;
```

与 || 比较：
- || 返回第一个真值；
- ?? 返回第一个已定义的值；
- 优先级相同；

出于安全原因，JavaScript 禁止将 ?? 运算符与 && 和 || 运算符一起使用，除非使用括号明确指定了优先级；

**循环**

跳出多层循环

```js
outer: for (let i = 0; i < 3; i++) {

    for (let j = 0; j < 3; j++) {

      let input = prompt(`Value at coords (${i},${j})`, '');
  
      // 如果是空字符串或被取消，则中断并跳出这两个循环。
      if (!input) break outer; // (*)
  
      // 用得到的值做些事……
    }
}
```

> Tips: `break` 指令必须在代码块内，从技术上讲，任何被标记的代码块都有效；

**函数**

在 JavaScript 中，函数是一种特殊的值，函数定义有函数声明和函数表达式两种；二者差别主要在，函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用；而函数声明则不同，在函数声明被定义之前，它就可以被调用。

函数就是行为（action），所以它们的名字通常是动词，它应该简短且尽可能准确地描述函数的作用，这样读代码的人就能清楚地知道这个函数的功能；一种普遍的做法是用动词前缀来开始一个函数，这个前缀模糊地描述了这个行为；

空值的 return 或没有 return 的函数返回值为 undefined；

一个函数应该只包含函数名所指定的功能，而不是做更多与函数名无关的功能；两个独立的行为通常需要两个函数，即使它们通常被一起调用；在这种情况下，我们可以创建第三个函数来调用这两个函数；

**调试**

1. “下一步（Step）”：运行下一条指令，快捷键 F9；
2. “跨步（Step over）”：运行下一条指令，但 不会进入到一个函数中，快捷键 F10；
3. “步入（Step into）”，快捷键 F11；
4. “步出（Step out）”：继续执行到当前函数的末尾，快捷键 Shift+F11；

> Tips: 在代码中的某一行上右键，在显示的关联菜单（context menu）中点击一个非常有用的名为 “Continue to here” 的选项；

**注释**

- 需要注释：

1. 整体架构，高层次的观点；
2. 函数的用法；
3. 重要又不是很明显的解决方案；
  
- 避免注释：

1. 描述“代码如何工作”和“代码做了什么”；
2. 已经足够简单或有很好自描述性的代码；

**忍者代码**

- 不要为了简洁而降低代码可读性；
- 不用一个字母的变量和单词缩写；
- 不用无意义的变量名；
- 避免同义词命名变量或函数；
- 不在函数或循环中替换变量值；
- 不在变量名前添加下划线；
- 避免使用和外部变量同名的变量名；
- 除了主要任务之外，避免给函数添加一个其他行为；
- 避免返回非标准结果的函数；
- 避免将多个功能合并在一个函数中；

**测试**

前端测试主要分为 3 种：单元测试（Unit Test）、集成测试（Integration Test）、UI 测试（UI Test）；

- 单元测试是最容易实现的：代码中多个组件共用的工具类库、多个组件共用的子组件等；
- 集成测试通常被应用在：耦合度较高的函数/组件、经过二次封装的函数/组件、多个函数/组件组合而成的函数/组件等；
- UI 测试只是对于前端的测试，是脱离真实后端环境的，仅仅只是将前端放在真实环境中运行，而后端和数据都应该使用 Mock 的；

适合引入自动化测试的场景：

- 公共库类的开发维护；
- 中长期项目的迭代/重构；
- 引用了不可控的第三方依赖；


当通过手动重新运行来测试代码时，很容易漏掉一些东西；自动化测试意味着测试是独立于代码的。它们以各种方式运行我们的函数，并将结果与预期结果进行比较；

BDD（行为驱动开发）规范先行，实现在后，包含了三部分内容：测试、文档和示例；

安装单元测试库 Jest：
```sh
npm i -D jest
```

- [试试前端自动化测试！（基础篇）](https://juejin.cn/post/6844904194600599560)
- [Jest 测试框架中文文档](https://jestjs.io/zh-Hans/)
- [Vue.js Jest 单元测试](https://alexjover.com/blog/write-the-first-vue-js-component-unit-test-in-jest/)