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

#### 什么是 JavaScript ？

> JavaScript 最初被创建的目的是“使网页更生动”。这种编程语言写出来的程序被称为 脚本。它们可以被直接写在网页的 HTML 中，在页面加载的时候自动执行。脚本被以纯文本的形式提供和执行。它们不需要特殊的准备或编译即可运行。

JavaScript 引擎工作基本原理：引擎解析脚本，然后将脚本编译转化为机器语言，最后执行机器语言。

#### 浏览器中的 JavaScript 限制

为了用户的（信息）安全，在浏览器中的 JavaScript 的能力是受限的。目的是防止恶意网页获取用户私人信息或损害用户数据。网页中的 JavaScript 不能读、写、复制和执行硬盘上的任意文件。不同的标签页/窗口之间通常互不了解。

#### JavaScript 手册

- [JavaScript MDN 中文参考手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)
- [JavaScript 兼容性表](https://caniuse.com/)

#### 浏览器开发者控制台

> Tips: 在控制台中要插入多行代码，按 `Shift+Enter` 来进行换行。

#### script 标签

应该尽量将较复杂的脚本存放在单独的文件中，使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的缓存中。之后，其他页面想要相同的脚本就会从缓存中获取，所以文件实际上只会下载一次，这可以节省流量，并使得页面（加载）更快。

> Note: 如果设置了 `src` 特性，`script` 标签内容将会被忽略。

JavaScript 代码以分号结尾，注意添加完整分号，以下代码会报错；

```js
alert("Hello")

// Uncaught TypeError: Cannot read properties of undefined (reading '2')
[1, 2].forEach(alert);
```

#### JavaScript 变量命名

1. 必须仅包含字母，数字，符号 $ 和 _；
2. 首字符必须非数字；
3. 通常使用驼峰命名规则；
4. 对大小写敏感；
5. 不能使用[保留字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%85%B3%E9%94%AE%E5%AD%97)命名；
6. 允许非英文字母，但不推荐；

#### JavaScript 数据类型

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
- null 用于未知的值，只有一个 null 值的独立类型；
- undefined 用于未定义的值，只有一个 undefined 值的独立类型，代表未被赋值；

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
   
#### JavaScript 类型转换

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

#### JavaScript 运算符

**赋值运算符**

赋值语句 x = value 将值 value 写入 x 然后返回 x；

```js
let a = 1;
let b = 2;

let c = 3 - (a = b + 1); // a: 3, c: 0 慎用！
```

链式赋值从右到左进行计算，但可读性不高；

**自增 / 自减**

++, --，又分为前置形式和后置形式，前置形式返回一个新的值，但后置返回原来的值（做加法/减法之前的值）。

[JavaScript 运算符优先级表](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

#### JavaScript 值的比较

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

#### 逻辑运算符

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

#### 空值合并运算符

`a ?? b` 表示如果第一个参数不是 null/undefined，则 ?? 返回第一个参数。否则，返回第二个参数。


```js
// ?? 等价写法：
result = (a !== null && a !== undefined) ? a : b;
```

与 || 比较：

- || 返回第一个真值；
- ?? 返回第一个已定义的值；
- 优先级相同；

出于安全原因，JavaScript 禁止将 ?? 运算符与 && 和 || 运算符一起使用，除非使用括号明确指定了优先级；

#### 循环

跳出多层循环：

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

#### 函数

在 JavaScript 中，函数是一种特殊的值，函数定义有函数声明和函数表达式两种；二者差别主要在，函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用；而函数声明则不同，在函数声明被定义之前，它就可以被调用。

函数就是行为（action），所以它们的名字通常是动词，它应该简短且尽可能准确地描述函数的作用，这样读代码的人就能清楚地知道这个函数的功能；一种普遍的做法是用动词前缀来开始一个函数，这个前缀模糊地描述了这个行为；

空值的 return 或没有 return 的函数返回值为 undefined；

一个函数应该只包含函数名所指定的功能，而不是做更多与函数名无关的功能；两个独立的行为通常需要两个函数，即使它们通常被一起调用；在这种情况下，我们可以创建第三个函数来调用这两个函数；

#### 调试

1. “下一步（Step）”：运行下一条指令，快捷键 F9；
2. “跨步（Step over）”：运行下一条指令，但 不会进入到一个函数中，快捷键 F10；
3. “步入（Step into）”，快捷键 F11；
4. “步出（Step out）”：继续执行到当前函数的末尾，快捷键 Shift+F11；

> Tips: 在代码中的某一行上右键，在显示的关联菜单中点击一个非常有用的名为 `Continue to here` 的选项；

#### 注释

- 需要注释：

1. 整体架构，高层次的观点；
2. 函数的用法；
3. 重要又不是很明显的解决方案；
  
- 避免注释：

1. 描述“代码如何工作”和“代码做了什么”；
2. 已经足够简单或有很好自描述性的代码；

#### 忍者代码

1. 不要为了简洁而降低代码可读性；
1. 不用一个字母的变量和单词缩写；
2. 不用无意义的变量名；
3. 避免同义词命名变量或函数；
4. 不在函数或循环中替换变量值；
5. 不在变量名前添加下划线；
6. 避免使用和外部变量同名的变量名；
7. 除了主要任务之外，避免给函数添加一个其他行为；
8. 避免返回非标准结果的函数；
9. 避免将多个功能合并在一个函数中；

#### 测试

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

#### 普通对象

**对象属性**

> Tips: 对象属性可以用 `delete` 操作符移除；

属性名可以是任何字符串或者 symbol，包括使用保留字；包含空格，以数字开头，或包含特殊字符（除 $ 和 _ 以外）的属性名需要加引号；

**计算属性**

在对象字面量中使用方括号定义动态属性名，括号中可以使用变量或更复杂的表达式；

```js
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
};

alert( bag.apple ); // 5 如果 fruit="apple"
```


**in 操作符**

```js
let user = { name: "John", age: 30 };

alert( "age" in user ); // true
alert( "blabla" in user ); // false
```

遍历对象：for(let key in obj) 循环；

> Tips: 对象中，整数属性会被进行排序，其他属性则按照创建的顺序显示；整数属性指的是一个可以在不做任何更改的情况下与一个整数进行相互转换的字符串；

#### 对象引用和复制

> Tips: 赋值了对象的变量存储的不是对象本身，而是该对象“在内存中的地址”；换句话说就是对该对象的“引用”；

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

#### 垃圾回收

JavaScript 中主要的内存管理概念是可达性（Reachability），及存储在内存中并以某种方式可访问或可用的值，类似于引用计数；

固有的可达值的基本集合，也成为根（roots），包括：

1. 当前执行的函数，它的局部变量和参数；
2. 当前嵌套调用链上的其他函数、它们的局部变量和参数；
3. 全局变量；
4. 还有一些内部的根；

如果一个值可以通过引用或引用链从根访问任何其他值，则认为该值是可达的；

垃圾回收的基本算法被称为 “mark-and-sweep”；标记算法类似于广度优先遍历；

优化建议：

- 分代收集（Generational collection）：对象被分成两组：“新的”和“旧的”；许多对象出现，完成它们的工作并很快死去，它们可以很快被清理。那些长期存活的对象会变得“老旧”，而且被检查的频次也会减少；
- 增量收集（Incremental collection）：如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟。所以引擎试图将垃圾收集工作分成几部分来做。然后将这几部分会逐一进行处理。这需要它们之间有额外的标记来追踪变化，但是这样会有许多微小的延迟而不是一个大的延迟；
- 闲时收集（Idle-time collection）：垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响；

#### 对象方法，"this"

JavaScript 中的 this 可以用于任何函数，即使它不是对象的方法；this 的值是在代码运行时计算出来的，它取决于代码上下文；

在全局函数中的 this，严格模式下的值为 undefined，非严格模式的情况下，this 将会是 全局对象（浏览器为 window）；

箭头函数没有自己的 this，其 this 值取决于外部“正常的”函数；

#### 构造器和操作符"new"

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

#### 可选链"?."

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

#### Symbol类型

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

**全局 symbol**

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


#### 对象——原始值转换

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

1. 调用 obj[Symbol.toPrimitive](hint)，带有 symbol 键 Symbol.toPrimitive（系统 symbol）的方法，如果这个方法存在的话；
2. 否则，如果 hint 是 "string"，尝试 obj.toString() 和 obj.valueOf()，对于字符串转换，优先 toString；
3. 否则，如果 hint 是 "number" 或 "default"，尝试 obj.valueOf() 和 obj.toString()，对于数学运算，优先 valueOf；


**Symbol.toPrimitive**

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

**toString 和 valueOf**

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

#### 原始类型的方法

JavaScript 允许我们像使用对象一样使用原始类型，如在字符串字面值上调用方法；

```js
// 首先创建一个包含字符串字面值的特殊对象，
// 然后调用 toUpperCase 方法，之后特殊对象被销毁，只留下原始值；
console.log("string".toUpperCase()); // STRING
```

对象包装器：String、Number、Boolean、Symbol 和 BigInt；

> Note: 不要使用 new 操作符调用包装器，因为包装器会返回一个对象，可能会导致判断失效；

> Note: 特殊的原始类型 null 和 undefined 是例外，它们没有对应的“对象包装器”，也没有提供任何方法；从某种意义上说，它们是“最原始的”；

原始类型不是对象，不能存储额外的数据

```js
let str = "string";

str.test = 1;

console.warn(str.test); // 非严格模式 undefined
console.warn(str.test); // 严格模式 Uncaught TypeError: Cannot create property 'test' on string 'string'
```

#### 数字类型

JavaScript 中的常规数字以 64 位的格式 IEEE-754 存储，也被称为“双精度浮点数”；在内部，所以有 64 位可以存储一个数字：其中 52 位被用于存储这些数字，其中 11 位用于存储小数点的位置（对于整数，它们为零），而 1 位用于符号；因此所表示的范围介于 ±(2^53-1) 之间；

> Tips: 定义数字时，可以使用下划线间隔数字以增强可读性：`let billion = 1_000_000_000;`，JavaScript 引擎会直接忽略数字之间的 _；

科学计数法，在 JavaScript 中，可以通过在数字后面附加字母 "e" 并指定零的个数来缩短数字；

十六进制数字在 JavaScript 中被广泛用于表示颜色，编码字符以及其他许多东西；前缀为 0x，然后是数字；二进制和八进制数字系统很少使用，但也支持使用 0b 和 0o 前缀；

使用 parseInt 和 toString(base) 两个方法可以对进制进行转换；

toString 参数 base 的范围可以从 2 到 36，默认情况下是 10；parseInt 方法将源数按指定进制解析为十进制数；

```js
let number = 200;

console.log(number.toString(16)); // "c8"

console.log(parseInt("c8", 16)); // 200
```

> Tips: 将一个较长的数字标识符转换成较短的时候，可以使用 toString(36)；

> Tips: 使用两个点来调用一个方法，JavaScript 语法隐含了第一个点之后的部分为小数部分；若数字后有两个点，那么 JavaScript 就知道小数部分为空，现在使用该方法 `123456..toString(36)`，或直接为数字添加一对括号 `(123456).toString(36)`；


**舍入**

1. Math.floor 向下取整；
2. Math.ceil 向上取整；
3. Math.round 四舍五入；
4. Math.trunc 截断小数点部分（IE 不支持）；
5. Math.prototype.toFixed(n) 保留 n 位小数，返回字符串；

**精度丢失**

```js
alert( 0.1 + 0.2 == 0.3 ); // false

// Hello！我是一个会自我增加的数字！
alert( 9999999999999999 ); // 显示 10000000000000000
// 超过 2^53 次方

// 精度损失可能会导致数字的增加和减小，在这种特殊的情况下，数字变小了一点，就会向下舍入；
alert( 6.35.toFixed(1) ); // 6.3

// 偶发的无限循环
let i = 0;
while (i != 10) {
  i += 0.2;
}
```

[JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)

> Note: 数字内部表示的另一个有趣结果是存在两个零：0 和 -0；因为在存储时，使用一位来存储符号，不过运算符将它们视为相同的值；

**isFinite 和 isNaN**

isNaN(value) 将其参数转换为数字，然后测试它是否为 NaN；值 “NaN” 是独一无二的，它不等于任何东西，包括它自身；

isFinite(value) 将其参数转换为数字，如果是常规数字，则返回 true，而不是 NaN/Infinity/-Infinity；因此该方法可以用于验证字符串值是否为常规数字；

> Note: 在所有数字函数中，包括 isFinite，空字符串或仅有空格的字符串均被视为 0；

**Object.is**

当内部算法需要比较两个值是否完全相同时，它使用 Object.is（内部称为 SameValue），这种比较方式经常被用在 JavaScript 规范中；

```js
// 适用于 NaN
Object.is(NaN，NaN) // true
NaN === NaN // false

// 比较 0 和 -0，内部符号位不同
Object.is(0，-0) // false
0 === -0 // true
```

除了以上两种特殊情况，其他情况等价于 ===；

**parseInt 和 parseFloat**

使用加号 + 或 Number() 的数字转换是严格的，如果一个值不完全是一个数字，就会失败并返回一个 NaN；

parseInt 和 parseFloat 可以从字符串中“读取”数字，直到无法读取为止；如果发生 error，则返回收集到的数字；函数 parseInt 返回一个整数，而 parseFloat 返回一个浮点数；当没有数字可读时会返回 NaN；

> Tips: parseInt(str, radix) 函数具有可选的第二个参数，它指定了数字系统的基数，因此 parseInt 还可以解析十六进制数字、二进制数字等的字符串：

#### 字符串

字符串的内部格式始终是 UTF-16，它不依赖于页面编码；

**转义字符**

| 字符 | 描述 |
|:-----|:-----|
| \n | 换行 |
| \r | 在 Windows 中，两个字符 \r\n 的组合代表一个换行 |
| \', \" | 引号 |
| \\ | 反斜线 |
| \t | 制表符 |
| \b, \f, \v | 退格，换页，垂直标签 |
| \xXX | 具有给定十六进制 Unicode XX 的 Unicode 字符 |
| \uXXXX | 以 UTF-16 编码的十六进制代码 XXXX 的 Unicode 字符 |
| \u{X…XXXXXX} |（1 到 6 个十六进制字符）	具有给定 UTF-32 编码的 Unicode 符号 |

> Note: 反斜杠 `\` 在 JavaScript 中用于正确读取字符串，然后消失，内存中的字符串没有 `\`；

**访问字符**

要获取在 pos 位置的一个字符，可以使用方括号 [pos] 或者调用 str.charAt(pos) 方法；区别是如果没有找到字符，[] 返回 undefined，而 charAt 返回一个空字符串；

> Tips: 通过字符串的 `length` 属性可以获取字符串的长度；

```js
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // ''（空字符串）

// 使用 for ... of 遍历字符串
for (let char of "Hello") {
  alert(char); // H,e,l,l,o（char 变为 "H"，然后是 "e"，然后是 "l" 等）
}

str[0] = 'h'; // Uncaught TypeError: Cannot assign to read only property '0' of string 'string'
```

**查找子字符串**

使用 str.indexOf(substr, pos) 或 str.lastIndexOf(substr, pos) 方法，从给定位置 pos 开始，在 str 中查找 substr，如果没有找到，则返回 -1，否则返回匹配成功的位置；区别是从字符串的首尾两端开始；

> Tips: 可以使用按位取反 `~`，将数字转换为 32-bit 整数（如果存在小数部分，则删除小数部分），然后对其二进制表示形式中的所有位均取反；对于 32-bit 整数，`~n` 等于 `-(n+1)`；

```js
let str = "Widget";

// 未查到是 indexOf 返回 -1，取反后值为 0；
if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // 正常运行
}
```

str.includes(substr, pos) 根据 str 中是否包含 substr 来返回 true/false，也可以使用第二个可选参数指定开始搜索的起始位置；

方法 str.startsWith 和 str.endsWith 判断字符串是否以某子字符串开头或结尾；

**获取子字符串**

str.slice(start [, end]) 返回字符串从 start 到（但不包括）end 的部分；如果没有第二个参数，slice 会一直运行到字符串末尾；start/end 也可以为负值，表示起始位置从字符串结尾计算；

```js
let str = "stringify";
alert( str.slice(0, 5) ); // 'strin'
alert( str.slice(0, 1) ); // 's'
alert( str.slice(2) ); // 'ringify'
alert( str.slice(-4, -1) ); // 'gif'
```

str.substring(start [, end]) 返回字符串在 start 和 end 之间 的部分，与 slice 几乎相同，但允许 start 大于 end（两个值会被交换）；当遇到负数时，会被视为 0；

```js
let str = "stringify";
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"
alert( str.substring(6, 0) ); // "string"
alert( str.substring(6, -1) ); // "string"
```

str.substr(start [, length]) 返回字符串从 start 开始的给定 length 的部分；若第一个参数为负数，则从结尾算起；

```js
let str = "stringify";
alert( str.substr(2, 4) ); // 'ring'
alert( str.substr(-4, 2) ); // 'gi'
```

> Note: `str.substr` 不在 JavaScript 核心规范中的描述，因此，非浏览器环境可能无法支持它；

**比较字符串**

> Note: 小写字母总是大于大写字母，带变音符号的字母存在“乱序”的情况；

所有的字符串都使用 UTF-16 编码，即每个字符都有对应的数字代码；

str.codePointAt(pos) 返回在 pos 位置的字符代码；
String.fromCodePoint(code) 通过数字 code 创建字符；

```js
alert( "z".codePointAt(0) ); // 122
alert( "Z".codePointAt(0) ); // 90

alert( String.fromCodePoint(90) ); // Z

// 输出 65..220 的字符
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

一种特殊的方法来比较不同语言的字符串，调用 str.localeCompare(str2) 会根据语言规则返回一个整数，这个整数能指示字符串 str 在排序顺序中排在字符串 str2 前面 `-`、相同 `0`、后面 `+`；

```js
// 首字母大写
function initialFirst(str) {
  if (typeof str !== "string") return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

#### 数组

数组是一种特殊的对象，它们扩展了对象，提供了特殊的方法来处理有序的数据集合以及 length 属性；JavaScript 引擎尝试把这些元素一个接一个地存储在连续的内存区域；

```js
// 创建空数组：
let arr = new Array();
let arr = [];

// 会创建一个给定长度的数组，但不含有任何项
let arr = new Array(2); // [empty x 2] 
let arr = new Array(item1, item2, ...);
```

**pop/push, shift/unshift 方法**

pop 取出并返回数组的最后一个元素；push 在数组末端添加元素；shift 取出数组的第一个元素并返回它；unshift 在数组的首端添加元素；其中，push 和 unshift 方法都可以一次添加多个元素；

> Note: `push`/`pop` 方法运行的比较快，而 `shift`/`unshift` 比较慢，是因为后二者会移动数组里所有元素；数组里的元素越多，移动它们就要花越多的时间，也就意味着越多的内存操作；

**遍历数组**

可以使用普通 for 循环或者 for..of，但 for..of 遍历数组只能获取元素值，不能获取当前元素的索引；

> Note: `for..in` 循环会遍历所有属性，不仅仅是这些数字属性；`for..in` 循环适用于普通对象，并且做了对应的优化，但是不适用于数组，因此速度要慢 10-100 倍；

**数组 length**

当我们修改数组的时候，length 属性会自动更新，准确来说，它实际上不是数组里元素的个数，而是最大的数字索引值加一；

> Tips: length 属性是可写的，清空数组最简单的方法就是：`arr.length = 0`，但该过程是不可逆的；


> Note: 如果使用 `==` 来比较数组，除非比较的是两个引用同一数组的变量，否则它们永远不相等；

```js
// 最大子数组之和
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    partialSum += item; // 将其加到 partialSum
    maxSum = Math.max(maxSum, partialSum); // 记住最大值
    if (partialSum < 0) partialSum = 0; // 如果是负数就置为 0
  }

  return maxSum;
}
```

#### 数组方法

**splice**

arr.splice(start[, deleteCount, elem1, ..., elemN])，从索引 start 开始修改 arr，start 可以为负数：删除 deleteCount 个元素并在当前位置插入 elem1, ..., elemN，最后返回已被删除元素的数组；

```js
let arr = [1, 2, 3, 4, 5];

// 删除第一个元素
console.log(arr.splice(0, 1), arr); // [1] [2, 3, 4, 5]
// 删除最后一个元素
console.log(arr.splice(-1, 1), arr); // [5] [2, 3, 4]
// 插入元素
console.log(arr.splice(2, 0, 100), arr); // [] [2, 3, 100, 4] 
```

> Tips: 将 `deleteCount` 设置为 `0`，`splice` 方法就能够插入元素而不用删除任何元素；

**slice**

arr.slice([start], [end]) 返回一个新数组，将所有从索引 start 到 end（不包括 end）的数组项复制到一个新的数组。start 和 end 都可以是负数，在这种情况下，从末尾计算索；

> Tips: 可以不带参数地调用：`arr.slice()` 会创建一个 arr 的副本；进行不影响原始数组的进一步转换；

```js
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s（复制从位置 1 到位置 3 的元素）
alert( arr.slice(-2) ); // s,t（复制从位置 -2 到尾端的元素）
```

**concat**

arr.concat(arg1, arg2...) 创建一个新数组，其中包含来自于其他数组和其他项的值；

> Note: `concat` 只复制数组中的元素，即使是一个类数组的对象，也会被当作一个整体；除非类数组的对象具有 `Symbol.isConcatSpreadable` 属性，那么它就会被 `concat` 当作一个数组来处理；

```js
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

let arrayLike2 = {
  0: "something",
  [Symbol.isConcatSpreadable]: true,
  length: 1
};

alert( arr.concat([3, 4], 5) ); // 1,2,3,4,5
alert( arr.concat(arrayLike, arrayLike2) ); // 1,2,3,4,5,[object Object],something
```

**forEach**

arr.forEach 方法允许为数组的每个元素都运行一个函数；且该函数的结果（如果有返回）会被抛弃和忽略；

**indexOf/lastIndexOf 和 includes**

arr.indexOf(item, from)/arr.lastIndexOf(item, from) 都从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1；后者从右向左搜索；arr.includes(item, from) 从索引 from 开始搜索 item，如果找到返回 true，否则返回 false；

> Tips: 这些方法使用的是严格相等 `===` 比较，`includes` 的一个非常小的差别是它能正确处理NaN，而 `indexOf/lastIndexOf` 则不能；

```js
let arr2 = [1, 2, NaN, null, undefined];

console.warn(arr2.indexOf(NaN)); // -1
console.warn(arr2.indexOf(null)); // 3
console.warn(arr2.lastIndexOf(undefined)); // 4

console.warn(arr2.includes(NaN)); // true
console.warn(arr2.includes(null)); // true
console.warn(arr2.includes(undefined)); // true
```

**find/findIndex 和 filter**

在对象数组中查找具有特定条件的对象，可以使用 find/findIndex 和 filter 方法；

arr.find((item, index, array) => {...}) 依次对数组中的每个元素调用一个回调函数，其中 item 是元素，index 是它的索引，array 是数组本身；如果回调函数返回 true，则返回 item 并停止迭代，如果返回假值（falsy），则返回 undefined；

arr.findIndex 与 arr.find 的区别只有返回值，前者返回元素索引，后者返回元素本身；

arr.filter 方法返回所有匹配（使回调函数返回 true）元素组成的数组；


**map 和 some/every**

arr.map((item, index, array) => { ... }) 对数组的每个元素都调用函数，并返回一个新的结果数组；

arr.some(fn)/arr.every(fn) 用于检查数组，对数组的每个元素调用函数 fn。如果任何/所有结果为 true，则返回 true，否则返回 false；且存在短路效应；

**sort**

arr.sort 方法对数组进行原位（in-place） 排序，并更改元素的顺序，原位是指在此数组内，而非生成一个新数组；

> Note: 元素默认情况下被按字符串进行排序；所有元素都被转换为字符串，然后进行比较，对于字符串，按照词典顺序进行排序；

arr.sort(fn) 方法实现了通用的排序算法，在内部大多数情况下都是经过快速排序或 Timsort 算法优化的；比较函数 fn 可以返回任何数字，实际上，比较函数只需要返回一个正数表示“大于”，一个负数表示“小于”；

```js
let arr = [1, -2, 15, 2, 0, 8];

arr.sort((a, b) => a - b); // [-2, 0, 1, 2, 8, 15]
```

**reverse**

arr.reverse 方法用于颠倒 arr 中元素的顺序，同时也会返回颠倒后的数组 arr；

**split 和 join**

str.split(delim[, limit]) 方法通过给定的分隔符 delim 将字符串分割成一个数组；split 还有一个可选的第二个数字参数，可以限制数组长度，忽略额外的元素；

> Tips: 调用带有空字符串参数的 split('')，会将字符串拆分为字母数组；

arr.join(glue) 与 split 相反，该方法会创建并返回一个由连接符连接的数组元素的字符串；

**reduce/reduceRight**

arr.reduce((accumulator, item, index, array) => { ... }, [initial]) 函数一个接一个地应用于所有数组元素，并将其结果“搬运”到下一个调用，其中 accumulator 是上一个函数调用的结果，第一次等于 initial（若存在）；arr.reduceRight 和 arr.reduce 方法的功能一样，只是遍历为从右到左；

**fill 和 copyWithin**

arr.fill(value, start, end) 从索引 start 到 end，用重复的 value 填充数组；

arr.copyWithin(target, start, end) 将从位置 start 到 end 的所有元素复制到自身的 target 位置（覆盖现有元素）；

```js
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

如果没有初始值，那么 reduce 会将数组的第一个元素作为初始值，并从第二个元素开始迭代；但如果数组为空，那么在没有初始值的情况下调用 reduce 会导致错误；所以建议始终指定初始值；

**Array.isArray**

因为数组是基于对象的，不构成单独的语言类型，所以 typeof 不能帮助从数组中区分出普通对象；但可以使用 Array.isArray() 方法判断；

```js
alert(typeof {}); // object
alert(typeof []); // object

alert(Array.isArray({})); // false
alert(Array.isArray([])); // true
```

**thisArg**

几乎所有调用函数的数组方法，都接受一个可选的附加参数 thisArg；当数组方法的回调函数为普通函数时，该参数值为 this；当使用对象方法作为数组方法的回调函数时，通过该参数将对象上下文语境传入；（不常用）

```js
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age > 20;
  },
};
let users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

let soldiers = users.filter(army.canJoin, army);
console.log(soldiers); // [{age: 23}, {age: 30}]
```

**其他方法**

arr.flat(depth)/arr.flatMap(fn) 可以从多维数组创建一个新的扁平数组；

Array.of(element0[, element1[, …[, elementN]]]) 基于可变数量的参数创建一个新的 Array 实例，而不需要考虑参数的数量或类型；

```js
// Fisher-Yates shuffle 随机排列数组
// 思路：逆向遍历数组，并将每个元素与其前面的随机的一个元素互换位置
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 从 0 到 i 的随机索引
    let j = Math.floor(Math.random() * (i + 1)); 

    // 解构交换元素 array[i] 和 array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

#### 可迭代对象

可迭代（Iterable）对象是数组的泛化，这个概念是说任何对象都可以被定制为可在 for..of 循环中使用的对象；数组和字符串是使用最广泛的内建可迭代对象；

为了让对象可迭代，需要为对象添加一个名为 Symbol.iterator 的方法，该方法是一个专门用于使对象可迭代的内建 symbol；

for..of 循环：

1. 首先会调用 Symbol.iterator 方法（没有就报错）；
2. 这个方法必须返回一个迭代器（iterator）即一个有 next 方法的对象；
3. 此后，for..of 仅适用于这个被返回的对象；
4. 然后通过调用返回对象的 next() 方法 for..of 循环取得下一个数值；
5. next() 方法返回的结果的格式必须是 {done: Boolean, value: any}；
6. 当 done = true 时，表示循环结束，否则 value 是下一个值；

```js
// 自定义可迭代对象 range
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    // 返回一个带有 next 方法的对象
    return {
      current: this.from,
      last: this.to,

      // 在每轮 for..of 循环中调用
      next() {
        // 固定返回一个 { done, value } 对象
        return this.current < this.last
          ? { done: false, value: this.current++ }
          : { done: true }; // 当 done 为 true 时，结束迭代
      },
    };
  },
};

for (const it of range) {
  console.warn(it); // 1, 2, 3, 4
}
```

> Note: 注意可迭代对象的核心功能：关注点分离；`range` 自身没有 `next()` 方法，相反，是通过调用 `range[Symbol.iterator]()` 创建了另一个对象，即所谓的“迭代器”对象，并且它的 `next` 会为迭代生成值；

从技术上说，我们可以将它们合并，并使用 range 自身作为迭代器来简化代码，但现在不可能同时在对象上运行两个 for..of 循环：它们共享迭代状态，因为只有一个迭代器，即对象本身；

```js
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    return this.current < this.to
      ? { done: false, value: this.current++ }
      : { done: true };
  }
};
```

> Tips: 无穷迭代器，`next` 没有什么限制，它可以返回越来越多的值，这是正常的，可以通过 `break` 跳出 `for..of` 循环；

**可迭代和类数组**

Iterable 如上所述，是实现了 Symbol.iterator 方法的对象；Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组；但是一个可迭代对象也许不是类数组对象。反之亦然，类数组对象可能不可迭代

> Note: 字符串即是可迭代的（for..of 对它们有效），又是类数组的（它们有数值索引和 length 属性）；

**Array.from**

全局方法 Array.from 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组；Array.from(obj[, mapFn, thisArg]) 完整语法还允许我们提供一个可选的“映射（mapping）”函数；可选的第二个参数 mapFn 可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外 thisArg 允许我们为该函数设置 this；

```js
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 （数组的 toString 转化方法生效）

// 求每个数的平方
let arr = Array.from(range, num => num * num);
alert(arr); // 1,4,9,16,25
```

> Tips: 基于 `Array.from` 创建代理感知（surrogate-aware）的 `slice` 方法，即能够处理 `UTF-16` 扩展字符的 `slice` 方法；

```js
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';
alert( slice(str, 1, 3) ); // 😂𩷶

// 原生方法不支持识别代理对（译注：UTF-16 扩展字符）
alert( str.slice(1, 3) ); // 乱码（两个不同 UTF-16 扩展字符碎片拼接的结果）
```

> Tips: 在规范中，大多数内建方法都假设它们需要处理的是可迭代对象或者类数组对象，而不是“真正的”数组，因为这样抽象度更高；

#### Map and Set（映射和集合）

**Map**

Map 是一个带键的数据项的集合，就像一个 Object 一样；但 Map 允许任何类型的键（key），包括对象；

| 方法 | 描述 |
|:-----|:-----|
| new Map() | 创建 map |
| map.set(key, value) | 根据键存储值，并返回 map 本身，因此可以链式调用 |
| map.get(key) | 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined |
| map.has(key) | 如果 key 存在则返回 true，否则返回 false |
| map.delete(key) | 删除指定键的值 |
| map.clear() | 清空 map |
| map.size | 返回当前元素个数 |

> Note: 虽然 `map[key]` 也有效，例如我们可以设置 `map[key] = 2`，这样会将 map 视为 JavaScript 的 plain object，因此它暗含了所有相应的限制（仅支持 `string`/`symbol` 键等）

> Note: Map 使用 SameValueZero 算法来比较键是否相等，它和严格等于 === 差不多，但区别是 NaN 被看成是等于 NaN，所以 NaN 也可以被用作键；

**Map 迭代**

| 方法 | 描述 |
|:-----|:-----|
| map.keys() | 返回所有键的迭代器 |
| map.values() | 返回所有值的迭代器 |
| map.entries() | 返回所有实体 [key, value] 的迭代器 |
| map.forEach((value, key, map) => {}) | 与 Array 的类似 |

for..of 在遍历 map 时，默认情况下使用的是 map.entries 方法；

```js
// 初始化空 Map
let map = new Map();

map.set("1", "str1").set(1, "num1").set(true, "bool1");

for (const value of map) {
  console.log(value); // ['1', 'str1'] [1, 'num1'] [true, 'bool1']
}

// 带键值对的二维数组初始化 Map
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

// 可迭代对象初始化 Map，iter 返回键值对的数组
let map = new Map(iter);
```

**Map 与对象的转换**

Object.entries(obj) 该方法返回对象的键/值对数组，该数组格式完全按照 Map 所需的格式；因此可以根据一个已有的普通对象（plain object）来创建一个 Map；

```js
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));
```

而 Object.fromEntries 作用是给定一个具有 [key, value] 键值对的数组，它会根据给定数组创建一个对象；

```js
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

// 创建一个普通对象
let obj = Object.fromEntries(map.entries()); 
let obj = Object.fromEntries(map); // 效果同上，解释如下
```

> Tips: `Object.fromEntries` 期望得到一个可迭代对象作为参数，而不一定是数组，并且 `map` 的标准迭代会返回跟 `map.entries()` 一样的键/值对；

**Set**

Set 是一个特殊的类型集合，没有键，只有值的集合，且它的每一个值只能出现一次；

| 方法 | 描述 |
|:-----|:-----|
| new Set(iterable) | 创建一个 set，参数是一个 iterable 对象 |
| set.add(value) | 添加一个值，返回 set 本身 |
| set.delete(value) | 删除值，如果 value 存在则返回 true ，否则返回 false |
| set.has(value) | 如果 value 在 set 中，返回 true，否则返回 false |
| set.clear() | 清空 set |
| set.size | 返回元素个数 |

Set 的主要特点是，重复使用同一个值调用 set.add(value) 并不会发生什么改变，这就是 Set 里面的每一个值只出现一次的原因；

```js
// 数组去重
Array.from(new Set([1, 2, 3, 3, 5])); // [1, 2, 3, 5]
```

**Set 迭代**

| 方法 | 描述 |
|:-----|:-----|
| set.keys() | 返回包含所有值的迭代器 |
| set.values() | 同 keys，为了兼容 Map |
| set.entries() | 返回所有实体 [value, value] 的迭代器，为了兼容 Map |
| set.forEach((value, valueAgain, set) => {}) | 与 Array 的类似，也为了兼容 Map |

> Tips: 在 Map 和 Set 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素；

#### WeakMap and WeakSet

**WeakMap**

WeakMap 和 Map 的第一个不同点就是，WeakMap 的键必须是对象，不能是原始值；

WeakMap 不支持迭代以及 keys()，values() 和 entries() 方法，所以没有办法获取 WeakMap 的所有键或值；只有 get(key)、set(key, value)、delete(key)、has(key) 方法；

> Note: `WeakMap` 不会阻止垃圾回收机制对作为键的对象（key object）的回收，在从技术的角度并不能准确知道 何时会被回收，这些都是由 JavaScript 引擎决定的；因此，暂不支持访问 `WeakMap` 的所有键/值的方法；

> Tips: WeakMap 的主要应用场景是额外数据的存储；这些数据放到 WeakMap 中，并使用第三方对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除；

> Tips: WeakMap 也可以用于缓存函数的结果，以便将来对同一个对象的调用可以重用这个结果；

```js
// cache.js
let cache = new WeakMap();

// 计算并记结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// 不需要这个对象时：
obj = null;
```
**WeakSet**

与 Set 类似，但是我们只能向 WeakSet 添加对象（而不能是原始值）；且对象只有在其它某个（些）地方能被访问的时候，才能留在 set 中；WeakSet 支持 add，has 和 delete 方法，但不支持 size 和 keys()，并且不可迭代；

> Tips: `WeakSet` 同 `WeakMap` 的主要优点是对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除；

#### Object.keys，values，entries

对于普通对象：

Object.keys(obj) 返回一个包含该对象所有的键的数组；
Object.values(obj) 返回一个包含该对象所有的值的数组；
Object.entries(obj) 返回一个包含该对象所有 [key, value] 键值对的数组；

> Note: `Object.*` 方法返回的是“真正的”数组对象，而不只是一个可迭代项，这与 `Map` 有区别，这主要是历史原因；`Object.*` 还会忽略 `symbol` 属性；

```js
// 转换对象
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 将价格转换为数组，将每个键/值对映射为另一对
  // 然后通过 fromEntries 再将结果转换为对象
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
alert(doublePrices.meat); // 8

// 也可以是一个类似于 map.entries() 的迭代器
Object.fromEntries(rangeEntries); // {1: 1, 2: 1, 3: 1, 4: 1}
```

```js
// 计算属性之和
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0);
}
```

#### 解构赋值

JavaScript 中最常用的两种数据结构是 Object 和 Array；对象是通过键来存储数据项的单个实体，数组将数据收集到一个有序的集合；

解构赋值是通过将结构中的各元素复制到变量中来达到“解构”的目的，但结构本身是没有被修改的；本质上，解构赋值其实是一种用于对在 = 右侧的值上调用 for..of 并进行赋值的操作的语法糖；

**数组解构**

1. 数组中不想要的元素也可以通过添加额外的逗号来把它丢弃；
2. 等号右侧可以是任何可迭代对象，因为在内部，结构赋值是通过迭代右侧的值来完成工作的；
3. 赋值给等号左侧的任何内容，也可以是一个对象属性；
4. 可以与 .entries() 方法进行循环操作；
5. 可以用于交换变量；
6. 等号左侧可以收集剩余数组项；
7. 如果数组比左边的变量列表短，缺少的值被认为是 undefined；
8. 可在等号左侧指定默认值，默认值可以是更加复杂的表达式甚至可以是函数调用；
9. 

```js
// 基本用法
let arr = ["John", "Smith"];
let [firstName, surname] = arr;

// 配合 split 使用
let [firstName, surname] = "John Smith".split(' ');

// 忽略使用逗号的元素，不需要第二个元素，后面剩余值被忽略
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// 等号右侧可以是任何可迭代对象
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

// 循环遍历键—值对
let user = {
  name: "John",
  age: 30
};

for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, then age:30
}

// 交换变量
[guest, admin] = [admin, guest];

// 收集剩余项，rest 的值就是数组中剩下的元素组成的数组
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "Republic"];

// 这里也不会出现报错，缺省值为 undefined
let [firstName, surname] = [];

// 指定未赋值的变量默认值
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
// 表达式或函数只会在这个变量未被赋值的时候才会被计算
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];
```

**对象解构**

1. 可以使用 : 指定属性和变量之间的映射关系；
2. 可以使用 = 设置默认值；
3. 默认值可以是任意表达式或函数调用，且只会在未提供对应的值时才会被计算/调用；
4. 可以只提取所需的内容；
5. 可以提取剩余属性的，并存为对象；

```js
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// 基本使用，且变量的顺序并不重要
let { title, width, height } = options;

// 指定属性和变量之间的映射关系
let { width: w, height: h, title } = options;

// 使用 "=" 设置默认值
let { width = 100, height = 200, title } = options;

// 默认值可以是任意表达式甚至可以是函数调用
let { width = prompt("width?"), title = prompt("title?") } = options;

// 同时指定映射关系和默认值
let { width: w = 100, height: h = 200, title } = options;

// 只提取所需的内容
let { title } = options;

// rest 存有剩余属性的对象
let { title, ...rest } = options;
```

> Note: 不使用 let 时可能存在 JavaScript 引擎把 {...} 当作代码块处理；因此需要用括号将解构赋值语句包裹起来；

```js
let title, width, height;

// Uncaught SyntaxError: Unexpected token '='
{title, width, height} = {title: "Menu", width: 200, height: 100};

// 添加括号后，正常运行
({title, width, height} = {title: "Menu", width: 200, height: 100});
```

> Tips: 如果一个对象或数组嵌套了其他的对象和数组，可以在等号左侧使用更复杂的模式来提取更深层的数据，也称嵌套结构；

> Tips: 可以把所有参数当作一个对象来传递，然后函数马上把这个对象解构成多个变量；然后通过指定空对象 {} 为整个参数对象的默认值，实现让所有的参数都使用默认值；

```js
function myFunc({ title = "Untitled", width: w = 100, height: h = 200 } = {}) {
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
}

// 另一种默认 options 参数
let defaultOptions = { width: 100, height: 100 };

function myFunc(options) {
  let computedOptions = { ...defaultOptions, ...options };
  console.log(computedOptions);
}
```

#### 日期和时间

内建对象：日期（Date）用于存储日期和时间，并提供了日期/时间的管理方法；

**创建方法**：

1. new Date() 不带参数，创建当前日期和时间的 Date 对象；
2. new Date(milliseconds) 传入的整数参数代表自 1970-01-01 00:00:00 以来经过的毫秒数，该整数被称为时间戳，时间戳也可以为负；
3. new Date(datestring) 若只有一个字符串参数，则会被自动解析；该算法与 Date.parse 所使用的算法相同；
4. new Date(year, month, date, hours, minutes, seconds, ms) 使用当前时区中的给定组件创建日期，只有前两个参数是必须的；year 必须是四位数，month 是 0 到 11 的整数，date 是当月的具体某一天，缺失则默认 1，hours/minutes/seconds/ms 缺失则均为默认值 0；

```js
// new Date()
new Date(); // Fri Mar 04 2022 08:57:13 GMT+0800 (中国标准时间)

// new Date(milliseconds)
let Jan01_1970 = new Date(0); // 0 表示 01.01.1970 UTC+0
let Dec31_1969 = new Date(-24 * 3600 * 1000); // 负时间戳

// new Date(datestring)
new Date("2017-01-26");
// 该时间未被设定，因此被假定为格林尼治标准时间（GMT）的午夜
// 并会根据代码运行时的时区进行调整，因此可能得到以下结果
// Thu Jan 26 2017 08:00:00 GMT+0800 (中国标准时间)
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

// new Date(year, month, date, hours, minutes, seconds, ms)
new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1, 2, 3, 4, 567); // 1.01.2011, 02:03:04.567
```

**访问日期**

1. getFullYear() 获取年份（4 位数）；
2. getMonth() 获取月份，从 0 到 11；
3. getDate() 获取当月的具体日期，从 1 到 31；
4. getHours()，getMinutes()，getSeconds()，getMilliseconds() 获取相应的时间组件；
5. getDay() 获取一周中的第几天，从 0（星期日）到 6（星期六），第一天始终是星期日；
6. getTime() 返回日期的时间戳，从 1970-1-1 00:00:00 UTC+0 到现在所经过的毫秒数；
7. getTimezoneOffset() 返回 UTC 与本地时区之间的时差，以分钟为单位；

getTimezoneOffset()
返回 UTC 与本地时区之间的时差，以分钟为单位

> Note: 很多 JavaScript 引擎都实现了一个非标准化的方法 `getYear()`，不推荐使用这个方法，直接使用 `getFullYear()`；

> Tips: `get*` （除上述最后两个） 这类方法都是基于当地时区的；可以在 "get" 之后插入 "UTC"，使用 `getUTC*` 以获取与当地时区的 UTC 对应项；

> Tips: `new Date().getUTCHours() - new Date().getHours()` 可得到当地时区相对于 UTC 的偏移；UTC 也即非夏令时的伦敦时间；

**设置日期**

1. setFullYear(year, [month], [date])
2. setMonth(month, [date])
3. setDate(date)
4. setHours(hour, [min], [sec], [ms])
5. setMinutes(min, [sec], [ms])
6. setSeconds(sec, [ms])
7. setMilliseconds(ms)
8. setTime(milliseconds)

以上方法除了 setTime() 都有 UTC 变体；

> Tips: 自动校准 是 Date 对象的一个非常方便的特性，当设置超范围的数值，会被自动校准；

```js
// 自动考虑闰年情况
let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2); // 2016.03.01

let date = new Date(2016, 0, 2); // 2016.01.02
// 设置为当月的第一天
date.setDate(1); // 2016.01.01
// 天数最小可以设置为 1，所以这里设置的是上一月的最后一天
date.setDate(0); // 2015.12.31
```

> Tips: 利用 Date 对象转数字可快速获取时间戳；`+new Date()` 即当前时间戳；此外日期可以相减，相减的结果是以毫秒为单位时间差；

```js
console.log(+new Date()); // 1646360860388

let date = new Date(2022, 1, 28);
console.log(new Date() - date); // 31919237496
```

> Tips: 当只需要时间戳而不需要创建日期对象时，可以使用 Date.now() 获取当前时间戳；

```js
// 测量时间间隔
let start = Date.now(); // 从 1 Jan 1970 至今的时间戳

for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = Date.now(); // 完成

alert( `The loop took ${end - start} ms` ); // 相减的是时间戳，而不是日期
```

> Tips: 直接使用日期对象相减得到时间差比使用 `getTime()` 方法慢，因为 JavaScript 引擎还要做类型转换的额外工作；

为了得到更加可靠的度量，整个度量测试包应该重新运行多次，现代的 JavaScript 引擎的先进优化策略只对执行很多次的 “hot code” 有效，即对于执行很少次数的代码没有必要优化；

```js
// 这是一个测试用例
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

// 在主循环中增加“升温”环节
bench(diffSubtract);
bench(diffGetTime);

// 开始度量，交替运行 10 次
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

**Date.parse**

Date.parse(str) 方法可以从一个字符串中读取日期；字符串的格式应该为：YYYY-MM-DDTHH:mm:ss.sssZ，其中：

1. YYYY-MM-DD 日期：年-月-日；
2. 字符 "T" 是一个分隔符；
3. HH:mm:ss.sss 时间：小时，分钟，秒，毫秒；
4. 可选字符 'Z' 为 +-hh:mm 格式的时区，单个字符 Z 代表 UTC+0 时区；

Date.parse(str) 调用会解析给定格式的字符串，并返回时间戳，如果给定字符串的格式不正确，则返回 NaN；

```js
let ms = Date.parse('2012-01-26T13:51:50.417-07:00'); // 1327611110417
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
```

**其他例子**

```js
// 获取某月的最后一天
function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// 计算今天过去了多少秒
function getSecondsToday() {
  return Math.floor(Date.now() % (24 * 3600 * 1000) / 1000);
}
```

**相关拓展**

> 1884 年，华盛顿的国际经度会议规定，将全球按经线从东到西划分为 24 个时区，其中东、西各 12 个时区，同时规定英国（格林尼治天文台旧址）为零时区，这就诞生了第一个世界时：格林尼治标准时间（Greenwich Mean Time，缩写为GMT，又称格林尼治平时）；中国跨 5 个时区，实际上只用东八时区的标准时即北京时间为准；

> 1972 年诞生了：协调世界时（Universal Time Coordinated，缩写为UTC）；UTC 是当前的世界标准时间；UTC 与 GMT 基本上等同，误差不超过 0.9 秒；UTC的标准格式为 2019-11-11T00:00:00.000Z，T代表使用UTC时间，Z是UTC偏移量，表示UTC时间与本地时的差别、即时差，可用以下形式表示: ±[hh]:[mm]、±[hh][mm]、±[hh]，例如北京时间比 GMT 要早 8 小时，写作 2019-11-11T08:00:00.000+0800

> Unix 时间(Unix Time)，也叫做 POSIX 时间或纪元时间(Epoch Time)，是用来记录时间的流逝，所以也常被叫做时间戳，定义为从 1970-01-01T00:00:00 开始流逝的秒数，不考虑闰秒；之后的时间是正数，之前的是负数；

[时区是怎么划分的？世界各时区的时间如何统一表达？GMT、UTC、UNIX有什么区别？](https://blog.csdn.net/zgdwxp/article/details/102728563)

#### JSON 方法，toJSON

JSON（JavaScript Object Notation）是表示值和对象的通用格式；

**JSON.stringify**

该方法将对象转换为 JSON；得到的 json 字符串是一个被称为 JSON 编码（JSON-encoded） 或 序列化（serialized） 或 字符串化（stringified） 或 编组化（marshalled） 的对象；

JSON 中没有单引号或反引号，JSON 格式字符串都使用双引号，包括对象属性名称也强制使用双引号；

JSON 支持以下数据类型：
- Objects { ... }
- Arrays [ ... ]
- strings
- numbers
- boolean true/false
- null

JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过；
- 函数属性（方法）
- Symbol 类型的键和值
- 存储 undefined 的属性

```js
let user = {
  sayHi() { // 被忽略
    alert("Hello");
  },
  [Symbol("id")]: 123, // 被忽略
  something: undefined // 被忽略
};

alert( JSON.stringify(user) ); // {}（空对象）
```

> Note: JSON.strinify 支持嵌套对象转换，并且可以自动对其进行转换，但有重要的限制：不得有循环引用；

JSON.stringify 完整语法是 JSON.stringify(value[, replacer, space])；其中 value 是要编码的值，replacer 是要编码的属性数组或映射函数 function(key, value)，space 是用于格式化的空格数量，或者字符串占位符；

```js
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup 引用了 room
};

room.occupiedBy = meetup; // room 引用了 meetup

// 属性数组
console.log( JSON.stringify(meetup, ['title', 'participants']) );
// {"title":"Conference","participants":[{},{}]}

// 改造 Object.prototype.toString 方法方便查看 replacer 调用过程
Object.prototype.toString = function () {
  return "[" + Object.keys(this).join(", ") + "]";
};

// 映射函数
console.log("result:", JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
);
// 根据输出结果可以看出 stringify 是递归调用的；
// 第一个调用是使用特殊的“包装对象”制作的：{"": meetup}，
// 该键为空，值是整个目标对象；
/*
: [title, participants, place]
title: Conference
participants: [name],[name]
0: [name]
name: John
1: [name]
name: Alice
place: [number, occupiedBy]
number: 23
occupiedBy: [title, participants, place]
result: {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}
*/
```

**自定义 “toJSON”**

像 toString 进行字符串转换，对象也可以提供 toJSON 方法来进行 JSON 转换，如果可用，JSON.stringify 会自动调用它；

> Tips: 所有日期都有一个内建的 `toJSON` 方法来返回 UTC 格式类型的字符串；

```js
JSON.stringify({date: new Date}) 
// '{"date":"2022-03-04T04:05:05.467Z"}'
```

> Tips: `toJSON` 既可以用于直接调用 `JSON.stringify` 也可以用于当对象嵌套在另一个编码对象中时；

**JSON.parse**

该方法用于解码 JSON 字符串，完整语法：JSON.parse(str, [reviver])；其中 str 是要解析的 JSON reviver 是可选的函数 function(key,value) 该函数将为每个 (key, value) 对调用，并可以对值进行转换；

> Note: JSON 不支持注释，向 JSON 添加注释无效；

```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( meetup.date.getDate() ); // 正常运行
```

排除反向引用

```js
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

// 循环引用
room.occupiedBy = meetup;
meetup.self = meetup;

// 排除第一个调用时 value 是 meetup 的情况
alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));

/*
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```