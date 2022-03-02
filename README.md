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

> Tips: 在控制台中要插入多行代码，按 `Shift+Enter` 来进行换行。

**script 标签**

应该尽量将较复杂的脚本存放在单独的文件中，使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的缓存中。之后，其他页面想要相同的脚本就会从缓存中获取，所以文件实际上只会下载一次，这可以节省流量，并使得页面（加载）更快。

> Note: 如果设置了 `src` 特性，`script` 标签内容将会被忽略。

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

> Tips: 两个非运算 `!!` 有时候用来将某个值转化为布尔类型：

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

> Tips: 在代码中的某一行上右键，在显示的关联菜单中点击一个非常有用的名为 `Continue to here` 的选项；

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

**普通对象**

- 对象属性

> Tips: 对象属性可以用 `delete` 操作符移除；

属性名可以是任何字符串或者 symbol，包括使用保留字；包含空格，以数字开头，或包含特殊字符（除 $ 和 _ 以外）的属性名需要加引号；

- 计算属性

在对象字面量中使用方括号定义动态属性名，括号中可以使用变量或更复杂的表达式；

```js
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
};

alert( bag.apple ); // 5 如果 fruit="apple"
```


- "in" 操作符

```js
let user = { name: "John", age: 30 };

alert( "age" in user ); // true
alert( "blabla" in user ); // false
```

遍历对象：for(let key in obj) 循环；

> Tips: 对象中，整数属性会被进行排序，其他属性则按照创建的顺序显示；整数属性指的是一个可以在不做任何更改的情况下与一个整数进行相互转换的字符串；

**对象引用和复制**

> Tips: 赋值了对象的变量存储的不是对象本身，而是该对象“在内存中的地址” —— 换句话说就是对该对象的“引用”；

> Tips: JavaScript 变量复制，原始类型可类比为“搬家”，对象类型类比为“配钥匙”；

使用 `Object.assign(dest, [src1, src2, src3...])` 方法深拷贝对象；

- 第一个参数 dest 是指目标对象；
- 一个或多个源对象 src1, ..., srcN；
- 该方法将所有源对象的属性拷贝到目标对象 dest 中；
- 调用结果返回 dest；
- 如果被拷贝的属性的属性名已经存在，则会被覆盖；

或使用 Spread 语法拷贝对象；`clone = { ...user }`

当对象中存在有其他对象的引用时，可以使用递归循环深拷贝，也可以直接使用 Lodash 定义好的方法 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep)；

```js
function cloneDeep(object) {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  const copy = {};
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      copy[key] = cloneDeep(object[key]);
    }
  }
  return copy;
}
```

**垃圾回收**

JavaScript 中主要的内存管理概念是可达性（Reachability），及存储在内存中并以某种方式可访问或可用的值，类似于引用计数；

固有的可达值的基本集合，也成为根（roots），包括：

1. 当前执行的函数，它的局部变量和参数；
2. 当前嵌套调用链上的其他函数、它们的局部变量和参数；
3. 全局变量；
4. 还有一些内部的根；

如果一个值可以通过引用或引用链从根访问任何其他值，则认为该值是可达的；

垃圾回收的基本算法被称为 “mark-and-sweep”；标记算法类似于广度优先遍历；

优化建议：

- 分代收集（Generational collection）—— 对象被分成两组：“新的”和“旧的”；许多对象出现，完成它们的工作并很快死去，它们可以很快被清理。那些长期存活的对象会变得“老旧”，而且被检查的频次也会减少；
- 增量收集（Incremental collection）—— 如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟。所以引擎试图将垃圾收集工作分成几部分来做。然后将这几部分会逐一进行处理。这需要它们之间有额外的标记来追踪变化，但是这样会有许多微小的延迟而不是一个大的延迟；
- 闲时收集（Idle-time collection）—— 垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响；

**对象方法，"this"**

JavaScript 中的 this 可以用于任何函数，即使它不是对象的方法；this 的值是在代码运行时计算出来的，它取决于代码上下文；

在全局函数中的 this，严格模式下的值为 undefined，非严格模式的情况下，this 将会是 全局对象（浏览器为 window）；

箭头函数没有自己的 this，其 this 值取决于外部“正常的”函数；

**构造器和操作符"new"**

从技术上讲，构造函数也是一个常规函数；但一般以大写字母开头并只用 new 操作符执行；

当一个函数被使用 new 操作符执行时，它按照以下步骤：

1. 一个新的空对象被创建并分配给 this；
2. 函数体执行，通常它会修改 this，为其添加新的属性；
3. 返回 this 的值；

```js
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

> Tips: 创建单个复杂对象的代码，可以将它们封装在一个立即调用的构造函数中 `new function() { … }`；

```js
// 创建一个函数并立即使用 new 调用它
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // 函数定义
  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };

  // 用于用户创建的其他代码
  // 也许是复杂的逻辑和语句、局部变量等
};
```

> 在一个函数内部，我们可以使用 new.target 属性来检查它是否被使用 new 进行调用了；对于常规调用，它为 undefined，对于使用 new 的调用，则等于该函数；

```js
function User() {
  alert(new.target);
}

User(); // undefined

new User(); // function User { ... }

// 常规模式重定向构造器模式
function User(name) {
  if (!new.target) { // 没有通过 new 运行
    return new User(name); // 添加 new
  }

  this.name = name;
}

let john = User("John"); // 将调用重定向
alert(john.name); // John
```

通常，构造器没有 return 语句；它们的任务是将所有必要的东西写入 this，并自动转换为结果；

当构造器中有 return，若返回值为一个对象，则会返回该对象并覆盖默认的 this；若返回值为原始类型或为空时，则会被忽略，仍然返回默认的 this；

> Tips: 如果没有参数，我们可以省略 `new` 后的括号；

**可选链"?."**

如果可选链 ?. 前面的值为 undefined 或者 null，它会停止运算并返回 undefined；

```js
// 可选链
let user = {};

console.log(user?.name?.first);
user.admin?.();
user?.["key"];
```

> Note: `?.` 前的变量必须已声明，且只将 `?.` 使用在一些东西可以不存在的地方，不要过度使用可选链；

可选链 ?. 不是一个运算符，而是一个特殊的语法结构；它还可以与函数和方括号一起使用；

1. ?.() 用于调用一个可能不存在的函数；
2. ?.[] 用于访问一个可能不存在的属性；

> Tips: 删除一个可能不存在的属性，`delete user?.name`；可以使用 ?. 来安全地读取或删除，但不能写入；

**Symbol类型**

规范中，对象的属性键只能是字符串类型或者 Symbol 类型，Symbol 值表示唯一的标识符；

使用 Symbol() 来创建这种类型的值，创建时可以给 Symbol 一个描述（也称为 Symbol 名），这在代码调试时非常有用；可以通过 symbol.description 属性获取 Symbol 的描述；

```js
// id 是 symbol 的一个实例化对象
let id = Symbol();

// id 是描述为 "id" 的 Symbol
let id2 = Symbol("id");

console.log(id2.description) // id
```

Symbol 保证是唯一的；即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同；描述只是一个标签，不影响任何东西；

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

console.warn(id1 == id2); // false
```

> Note: `Symbol` 不会被自动转换为字符串；只能手动调用 `toString()`；

- “隐藏”属性

Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性；

```js
let user = {};
let id = Symbol("id");
user[id] = 1;
```
> Note: 在对象字面量中使用 `Symbol`，需要使用方括号；

```js
let id = Symbol();

let user = {
  name: "Coley",
  [id]: 12  
}
```

Symbol 属性不参与 for..in 循环，Object.keys(user) 也会忽略 Symbol；这是一般“隐藏符号属性”原则的一部分；但 Object.assign 会同时复制字符串和 symbol 属性；

从技术上讲，内建方法 Object.getOwnPropertySymbols(obj) 允许我们获取所有的 Symbol；还有一个 Reflect.ownKeys(obj) 方法可以返回一个对象的所有键，包括 Symbol；

- 全局 symbol

调用 Symbol.for(key) 方法创建或查询，该方法会先检查全局注册表，如果有一个描述为 key 的 Symbol，则返回该 Symbol，否则将创建一个新 Symbol，并通过给定的 key 将其存储在全局注册表中；

或者调用 Symbol.keyFor(sym) 方法，通过全局 Symbol 返回一个名字；如果查找的 Symbol 不是全局的则会返回 undefined；

```js
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert( id === idAgain ); // true

Symbol.keyFor(id); // id
```

除此之外，JavaScript 内部还有许多系统 Symbol，可以用来微调对象的各个方面，以此改变一些内建行为，这些 Symbol 被列在了 [Symbol 表](https://tc39.github.io/ecma262/#sec-well-known-symbols) 的规范中；


**对象——原始值转换**

JavaScript 不允许自定义运算符对对象的处理方式；因此在对对象进行运算时，对象会被自动转换为原始值，并会得到一个原始值的结果；

所有的对象在布尔上下文（context）中均为 true，因此对于对象，不存在 boolean 转换；

- "string" hint

对象到字符串的转换，当我们对期望一个字符串的对象执行操作时，如 “alert”；

```js
// 输出
alert(obj); // [object Object]

// 将对象作为属性键
anotherObj[obj] = 123; // {[object Object]: 123}
```

- "number" hint

对象到数字的转换，例如当我们进行数学运算时；

```js
// 显式转换
let num = Number(obj); // NaN

// 数学运算（除了二元加法）
let n = +obj; // NaN
let delta = new Date - new Date; // 0

// 小于/大于的比较
let greater = user1 > user2; // false
```

- "default" hint

在少数情况下发生，当运算符“不确定”期望值的类型时；

```js
let total = obj + user; // [object Object][object Object]

console.log(user == 1); // false
```

> Note: 像 < 和 > 这样的小于/大于比较运算符，也可以同时用于字符串和数字。不过，它们使用 “number” hint，而不是 “default”。这是历史原因；

JavaScript 转换算法：

1. 调用 obj[Symbol.toPrimitive](hint) —— 带有 symbol 键 Symbol.toPrimitive（系统 symbol）的方法，如果这个方法存在的话；
2. 否则，如果 hint 是 "string" —— 尝试 obj.toString() 和 obj.valueOf()，对于字符串转换，优先 toString；
3. 否则，如果 hint 是 "number" 或 "default" —— 尝试 obj.valueOf() 和 obj.toString()，对于数学运算，优先 valueOf；


- Symbol.toPrimitive

```js
obj[Symbol.toPrimitive] = function(hint) {
  // 这里是将此对象转换为原始值的代码
  // 它必须返回一个原始值
  // hint = "string"、"number" 或 "default" 中的一个
}

// 在对象原型上添加
Object.prototype[Symbol.toPrimitive] = function () {
  return "string";
};

let o = {};

console.warn("" + o); // string

// 另一个例子
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 转换演示：
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

- toString 和 valueOf

还可以使用 toString 和 valueOf 方法，但必须返回一个原始值，如果 toString 或 valueOf 返回了一个对象，那么返回值会被忽略；

默认情况下，普通对象具有 toString 和 valueOf 方法：toString 方法返回一个字符串 "[object Object]"；valueOf 方法返回对象自身；

```js

// 另一个例子
let user = {
  name: "John",
  money: 1000,

  // 对于 hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // 对于 hint="number" 或 "default"
  valueOf() {
    return this.money;
  }
};
```

> Tips: 通常我们希望有一个“全能”的地方来处理所有原始转换；这时，我们可以只实现 toString；如果没有 Symbol.toPrimitive 和 valueOf，toString 将处理所有原始转换；

> Note: 三种方式转换可以返回任何原始类型；但由于历史原因，如果 toString 或 valueOf 返回一个对象，则不会出现 error，但是这种值会被忽略；

如果将对象作为参数传递，会先被转换为原始值，如果生成的原始值的类型不正确，则继续进行转换；

```js
let obj = {
  // toString 在没有其他方法的情况下处理所有转换
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4，对象被转换为原始值字符串 "2"，之后它被乘法转换为数字 2。
```

