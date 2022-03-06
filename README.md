# javascript

该项目主要用于在学习 JavaScript 时编写测试代码；并做好相应笔记，同时该项目也是一个 JavaScript 模板库；

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

> `Babel` 是一个 JavaScript 编译器，主要用于将采用 `ECMAScript 2015+` 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中；

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

> JavaScript 最初被创建的目的是“使网页更生动”；这种编程语言写出来的程序被称为脚本，它们可以被直接写在网页的 `HTML` 中，在页面加载的时候自动执行；脚本被以纯文本的形式提供和执行，它们不需要特殊的准备或编译即可运行；

JavaScript 引擎工作基本原理：引擎解析脚本，然后将脚本编译转化为机器语言，最后执行机器语言；

**浏览器中的 JavaScript 限制**

为了用户的（信息）安全，在浏览器中的 JavaScript 的能力是受限的，目的是防止恶意网页获取用户私人信息或损害用户数据；网页中的 JavaScript 不能读、写、复制和执行硬盘上的任意文件，不同的标签页/窗口之间通常互不了解；

**JavaScript 手册**

- [JavaScript MDN 中文参考手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)
- [JavaScript 兼容性表](https://caniuse.com/)
<!-- 
#### script 标签

应该尽量将较复杂的脚本存放在单独的文件中，使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的缓存中；之后，其他页面想要相同的脚本就会从缓存中获取，所以文件实际上只会下载一次，这可以节省流量，并使得页面（加载）更快；

> Note: 如果设置了 `src` 特性，`script` 标签内容将会被忽略；

JavaScript 代码以分号结尾，注意添加完整分号，以下代码会报错；

```js
alert("Hello")

// Uncaught TypeError: Cannot read properties of undefined (reading '2')
[1, 2].forEach(alert);
``` -->

#### 变量

1. 必须仅包含字母，数字，符号 $ 和 _；
2. 首字符必须非数字；
3. 通常使用驼峰命名规则；
4. 对大小写敏感；
5. 不能使用[保留字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%85%B3%E9%94%AE%E5%AD%97)命名；
6. 允许非英文字母，但不推荐；

#### 数据类型

在 JavaScript 中有 8 种基本的数据类型（译注：7 种原始类型和 1 种引用类型）；JavaScript，被称为“动态类型”（dynamically typed）的编程语言，意思是虽然编程语言中有不同的数据类型，但是你定义的变量并不会在定义后，被限制为某一数据类型；

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

双引号和单引号都是“简单”引用，在 JavaScript 中两者几乎没有什么差别；反引号是功能扩展引号，它们允许我们通过将变量和表达式包装在 ${…} 中，来将它们嵌入到字符串中；

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`; // 模板字符串
```

- Boolean 用于 true 和 false；表示逻辑类型；
- null 用于未知的值，只有一个 null 值的独立类型；
- undefined 用于未定义的值，只有一个 undefined 值的独立类型，代表未被赋值；

```js
// 不建议显示地将 undefined 赋值给变量，通常，使用 null 将一个“空”或者“未知”的值写入变量中，而 undefined 则保留作为未进行初始化的事物的默认初始值；
let age = undefined;
```

- Symbol 用于唯一的标识符；
- Object 用于更复杂的数据结构；

当我们想要分别处理不同类型值的时候，或者想快速进行数据类型检验时，可以使用 typeof 运算符返回参数的类型；

```js
// 这是官方承认的 typeof 的错误，这个问题来自于 JavaScript 语言的早期阶段，并为了兼容性而保留了下来；
typeof null // "object"

// 在 JavaScript 语言中没有一个特别的 “function” 类型，函数隶属于 object 类型，但是 typeof 会对函数区分对待，并返回 "function"；
typeof alert // "function"
```
   
#### 类型转换

- 字符串转换：转换发生在输出内容的时候，也可以通过 String(value) 进行显式转换；
- 数字型转换：转换发生在进行算术操作时，也可以通过 Number(value) 进行显式转换；

| 值 | 转换 |
|:----|:----|
| undefined | NaN |
| null | 0 |
| true / false | 1 / 0 |
| string | 忽略字符串两端的空白，按原样读取，空字符串变成 0，转换出错则输出 NaN |

- 布尔型转换：转换发生在进行逻辑操作时，也可以通过 Boolean(value) 进行显式转换；

| 值 | 转换 |
|:----|:----|
| 0, null, undefined, NaN, "" | false |
| 其他值 | true |

#### 基础运算符，数学

**赋值运算符**

赋值语句 x = value 将值 value 写入 x 然后返回 x；

```js
let a = 1;
let b = 2;

let c = 3 - (a = b + 1); // a: 3, c: 0 慎用！
```

链式赋值从右到左进行计算，但可读性不高；

**自增 / 自减**

++, --，又分为前置形式和后置形式，前置形式返回一个新的值，但后置返回原来的值（做加法/减法之前的值）；

[JavaScript 运算符优先级表](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

#### 值的比较

在比较字符串的大小时，JavaScript 会使用“字典（dictionary）”或“词典（lexicographical）”顺序进行判定，换言之，字符串是按字符（母）逐个进行比较的；

字符串的比较算法：
1. 首先比较两个字符串的首位字符大小；
2. 如果一方字符较大（或较小），则该字符串大于（或小于）另一个字符串，算法结束；
3. 否则，如果两个字符串的首位字符相等，则继续取出两个字符串各自的后一位字符进行比较；
4. 重复上述步骤进行比较，直到比较完成某字符串的所有字符为止；
5. 如果两个字符串的字符同时用完，那么则判定它们相等，否则未结束（还有未比较的字符）的字符串更大；

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

#### 逻辑运算符 if 和 ?:

- 或运算符 || 返回的值是操作数的初始形式，不会做布尔转换；

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

#### 空值合并运算符 ??

`a ?? b` 表示如果第一个参数不是 null/undefined，则 ?? 返回第一个参数，否则，返回第二个参数；


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
  
      // 如果是空字符串或被取消，则中断并跳出这两个循环
      if (!input) break outer; // (*)
  
      // 用得到的值做些事……
    }
}
```

> Tips: `break` 指令必须在代码块内，从技术上讲，任何被标记的代码块都有效；

#### 函数

在 JavaScript 中，函数是一种特殊的值，函数定义有函数声明和函数表达式两种；二者差别主要在，函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用；而函数声明则不同，在函数声明被定义之前，它就可以被调用；

函数就是行为（action），所以它们的名字通常是动词，它应该简短且尽可能准确地描述函数的作用，这样读代码的人就能清楚地知道这个函数的功能；一种普遍的做法是用动词前缀来开始一个函数，这个前缀模糊地描述了这个行为；

空值的 return 或没有 return 的函数返回值为 undefined；

一个函数应该只包含函数名所指定的功能，而不是做更多与函数名无关的功能；两个独立的行为通常需要两个函数，即使它们通常被一起调用；在这种情况下，我们可以创建第三个函数来调用这两个函数；

#### 在浏览器中调试

> Tips: 在控制台中要插入多行代码，按 `Shift+Enter` 来进行换行；

- “下一步（Step）”：运行下一条指令，快捷键 F9；
- “跨步（Step over）”：运行下一条指令，但 不会进入到一个函数中，快捷键 F10；
- “步入（Step into）”，快捷键 F11；
- “步出（Step out）”：继续执行到当前函数的末尾，快捷键 Shift+F11；

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


当通过手动重新运行来测试代码时，很容易漏掉一些东西；自动化测试意味着测试是独立于代码的；它们以各种方式运行我们的函数，并将结果与预期结果进行比较；

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

- 分代收集（Generational collection）：对象被分成两组：“新的”和“旧的”；许多对象出现，完成它们的工作并很快死去，它们可以很快被清理；那些长期存活的对象会变得“老旧”，而且被检查的频次也会减少；
- 增量收集（Incremental collection）：如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟，所以引擎试图将垃圾收集工作分成几部分来做；然后将这几部分会逐一进行处理，这需要它们之间有额外的标记来追踪变化，但是这样会有许多微小的延迟而不是一个大的延迟；
- 闲时收集（Idle-time collection）：垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响；

#### 对象方法，this

JavaScript 中的 this 可以用于任何函数，即使它不是对象的方法；this 的值是在代码运行时计算出来的，它取决于代码上下文；

在全局函数中的 this，严格模式下的值为 undefined，非严格模式的情况下，this 将会是 全局对象（浏览器为 window）；

箭头函数没有自己的 this，其 this 值取决于外部“正常的”函数；

#### 构造器和操作符 new

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

> 在一个函数内部，我们可以使用 `new.target` 属性来检查它是否被使用 `new` 进行调用了；对于常规调用，它为 `undefined`，对于使用 `new` 的调用，则等于该函数；

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

#### 可选链 ?.

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

#### Symbol 类型

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

> Note: 像 `<` 和 `>` 这样的小于/大于比较运算符，也可以同时用于字符串和数字；不过，它们使用 `number hint`，而不是 `default`，这是历史原因；

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

> Tips: 通常我们希望有一个“全能”的地方来处理所有原始转换；这时，我们可以只实现 `toString`；如果没有 `Symbol.toPrimitive` 和 `valueOf`，`toString` 将处理所有原始转换；

> Note: 三种方式转换可以返回任何原始类型；但由于历史原因，如果 `toString` 或 `valueOf` 返回一个对象，则不会出现 `error`，但是这种值会被忽略；

如果将对象作为参数传递，会先被转换为原始值，如果生成的原始值的类型不正确，则继续进行转换；

```js
let obj = {
  // toString 在没有其他方法的情况下处理所有转换
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4，对象被转换为原始值字符串 "2"，之后它被乘法转换为数字 2
```

#### 原始类型的方法

JavaScript 允许我们像使用对象一样使用原始类型，如在字符串字面值上调用方法；

```js
// 首先创建一个包含字符串字面值的特殊对象，
// 然后调用 toUpperCase 方法，之后特殊对象被销毁，只留下原始值；
console.log("string".toUpperCase()); // STRING
```

对象包装器：String、Number、Boolean、Symbol 和 BigInt；

> Note: 不要使用 `new` 操作符调用包装器，因为包装器会返回一个对象，可能会导致判断失效；

> Note: 特殊的原始类型 `null` 和 `undefined` 是例外，它们没有对应的“对象包装器”，也没有提供任何方法；从某种意义上说，它们是“最原始的”；

原始类型不是对象，不能存储额外的数据

```js
let str = "string";

str.test = 1;

console.warn(str.test); // 非严格模式 undefined
console.warn(str.test); // 严格模式 Uncaught TypeError: Cannot create property 'test' on string 'string'
```

#### 数字类型

JavaScript 中的常规数字以 64 位的格式 IEEE-754 存储，也被称为“双精度浮点数”；在内部，所以有 64 位可以存储一个数字：其中 52 位被用于存储这些数字，其中 11 位用于存储小数点的位置（对于整数，它们为零），而 1 位用于符号；因此所表示的范围介于 ±(2^53-1) 之间；

> Tips: 定义数字时，可以使用下划线间隔数字以增强可读性：`let billion = 1_000_000_000;`，JavaScript 引擎会直接忽略数字之间的 `_`；

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

> Note: 数字内部表示的另一个有趣结果是存在两个零：`0` 和 `-0`；因为在存储时，使用一位来存储符号，不过运算符将它们视为相同的值；

**isFinite 和 isNaN**

isNaN(value) 将其参数转换为数字，然后测试它是否为 NaN；值 “NaN” 是独一无二的，它不等于任何东西，包括它自身；

isFinite(value) 将其参数转换为数字，如果是常规数字，则返回 true，而不是 NaN/Infinity/-Infinity；因此该方法可以用于验证字符串值是否为常规数字；

> Note: 在所有数字函数中，包括 `isFinite`，空字符串或仅有空格的字符串均被视为 `0`；

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

> Tips: `parseInt(str, radix)` 函数具有可选的第二个参数，它指定了数字系统的基数，因此 `parseInt` 还可以解析十六进制数字、二进制数字等的字符串：

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

> Tips: 可以使用按位取反 `~`，将数字转换为 `32-bit` 整数（如果存在小数部分，则删除小数部分），然后对其二进制表示形式中的所有位均取反；对于 `32-bit` 整数，`~n` 等于 `-(n+1)`；

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

> Note: `for..in` 循环会遍历所有属性，不仅仅是这些数字属性；`for..in` 循环适用于普通对象，并且做了对应的优化，但是不适用于数组，因此速度要慢 `10-100` 倍；

**数组 length**

当我们修改数组的时候，length 属性会自动更新，准确来说，它实际上不是数组里元素的个数，而是最大的数字索引值加一；

> Tips: `length` 属性是可写的，清空数组最简单的方法就是：`arr.length = 0`，但该过程是不可逆的；


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

arr.slice([start], [end]) 返回一个新数组，将所有从索引 start 到 end（不包括 end）的数组项复制到一个新的数组；start 和 end 都可以是负数，在这种情况下，从末尾计算索；

> Tips: 可以不带参数地调用：`arr.slice()` 会创建一个 `arr` 的副本；进行不影响原始数组的进一步转换；

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

arr.some(fn)/arr.every(fn) 用于检查数组，对数组的每个元素调用函数 fn；如果任何/所有结果为 true，则返回 true，否则返回 false；且存在短路效应；

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

> Tips: 调用带有空字符串参数的 `split('')`，会将字符串拆分为字母数组；

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

Iterable 如上所述，是实现了 Symbol.iterator 方法的对象；Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组；但是一个可迭代对象也许不是类数组对象，反之亦然，类数组对象可能不可迭代

> Note: 字符串即是可迭代的（`for..of` 对它们有效），又是类数组的（它们有数值索引和 `length` 属性）；

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

> Note: 虽然 `map[key]` 也有效，例如我们可以设置 `map[key] = 2`，这样会将 `map` 视为 JavaScript 的普通对象 `plain object`，因此它暗含了所有相应的限制（仅支持 `string`/`symbol` 键等）

> Note: `Map` 使用 `SameValueZero` 算法来比较键是否相等，它和严格等于 `===` 差不多，但区别是 `NaN` 被看成是等于 `NaN`，所以 `NaN` 也可以被用作键；

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

> Tips: 在 `Map` 和 `Set` 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素；

#### WeakMap and WeakSet

**WeakMap**

WeakMap 和 Map 的第一个不同点就是，WeakMap 的键必须是对象，不能是原始值；

WeakMap 不支持迭代以及 keys()，values() 和 entries() 方法，所以没有办法获取 WeakMap 的所有键或值；只有 get(key)、set(key, value)、delete(key)、has(key) 方法；

> Note: `WeakMap` 不会阻止垃圾回收机制对作为键的对象（key object）的回收，在从技术的角度并不能准确知道 何时会被回收，这些都是由 JavaScript 引擎决定的；因此，暂不支持访问 `WeakMap` 的所有键/值的方法；

> Tips: `WeakMap` 的主要应用场景是额外数据的存储；这些数据放到 `WeakMap` 中，并使用第三方对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除；

> Tips: `WeakMap` 也可以用于缓存函数的结果，以便将来对同一个对象的调用可以重用这个结果；

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

> Note: 不使用 `let` 时可能存在 JavaScript 引擎把 `{...}` 当作代码块处理；因此需要用括号将解构赋值语句包裹起来；

```js
let title, width, height;

// Uncaught SyntaxError: Unexpected token '='
{title, width, height} = {title: "Menu", width: 200, height: 100};

// 添加括号后，正常运行
({title, width, height} = {title: "Menu", width: 200, height: 100});
```

> Tips: 如果一个对象或数组嵌套了其他的对象和数组，可以在等号左侧使用更复杂的模式来提取更深层的数据，也称嵌套结构；

> Tips: 可以把所有参数当作一个对象来传递，然后函数马上把这个对象解构成多个变量；然后通过指定空对象 `{}` 为整个参数对象的默认值，实现让所有的参数都使用默认值；

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

> Tips: 自动校准 是 `Date` 对象的一个非常方便的特性，当设置超范围的数值，会被自动校准；

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

> 1972 年诞生了：协调世界时（Universal Time Coordinated，缩写为UTC）；UTC 是当前的世界标准时间；UTC 与 GMT 基本上等同，误差不超过 0.9 秒；UTC 的标准格式为 2019-11-11T00:00:00.000Z，T 代表使用 UTC 时间，Z 是 UTC 偏移量，表示 UTC 时间与本地时的差别、即时差，可用以下形式表示: ±[hh]:[mm]、±[hh][mm]、±[hh]，例如北京时间比 GMT 要早 8 小时，写作 2019-11-11T08:00:00.000+0800

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

> Note: `JSON.strinify` 支持嵌套对象转换，并且可以自动对其进行转换，但有重要的限制：不得有循环引用；

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

#### 递归和堆栈

递归是一种编程模式，在一个任务可以自然地拆分成多个相同类型但更简单的任务的情况下非常有用；简单来说，函数会调用自身就是所谓的递归；

```js
// 这是一个递归例子
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
```

最大的嵌套调用次数（包括首次）被称为递归深度，最大递归深度受限于 JavaScript 引擎；通常，引擎在最大迭代深度为 10000 及以下时是可靠的；

在底层，有关正在运行的函数的执行过程的相关信息被存储在其执行上下文中；执行上下文是一个内部数据结构，它包含有关函数执行时的详细细节：当前控制流所在的位置（代码位置），当前的变量，this 的值，以及其它的一些内部细节；

当一个函数进行嵌套调用时，当前函数被暂停，关联的执行上下文被一个叫做执行上下文堆栈的特殊数据结构保存；然后开始执行嵌套调用，嵌套调用结束后，从堆栈中恢复之前的执行上下文，并从停止的位置恢复外部函数；因此，递归深度等于堆栈中上下文的最大数量；

> Note: 任何递归都可以用循环来重写，通常循环变体更有效，且更节省内存；

> Tips: 一些引擎支持“尾调用（tail call）”优化：如果递归调用是函数中的最后一个调用，那么外部的函数就不再需要恢复执行，因此引擎也就不再需要记住他的执行上下文；

```js
// 数组转单链表
function arrayToList(arr, index = 0) {
  if (index < arr.length) {
    return {
      value: arr[index],
      next: arrayToList(arr, index + 1),
    };
  } else {
    return {
      value: arr[index],
      next: null,
    };
  }
}

let arr = [1, 2, 3, 4];
let list = arrayToList(arr);

/*{
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
}*/

// 斐波那契
// 递归版本，受限于递归深度，n 较大时，计算时间很长；
function Fibonacci(n) {
  return n > 1 ? Fibonacci(n - 1) + Fibonacci(n - 2) : n;
}

// 改进版本 1，使用数组存储中间计算值，避免重复计算；
let record = [0, 1, 1];

function Fibonacci(n) {
  if (n < record.length) {
    return record[n];
  } else {
    return (record[n] = Fibonacci(n - 1) + Fibonacci(n - 2));
  }
}

// 改进版本 2，使用对象存储中间计算值，并用闭包封装；
export function Fibonacci(n) {
  let caches = {};

  function _fib(n) {
    if (n < 3) return 1;
    return n in caches ? caches[n] : (caches[n] = _fib(n - 1) + _fib(n - 2));
  }

  return _fib(n);
}

// 改进版本 3，使用变量存储前两个值，循环计算，速度最快；
export function Fibonacci(n) {
  if (n < 3) {
    return 1;
  }
  let lastOne = 1;
  let lastTwo = 1;

  for (let i = 3; i < n; i++) {
    [lastTwo, lastOne] = [lastOne, lastOne + lastTwo];
  }

  return lastOne + lastTwo;
}
```

#### Rest 参数与 Spread 语法

在 JavaScript 中，无论函数是如何定义的，你都可以使用任意数量的参数调用函数，未使用的参数会被函数忽略掉；

**Rest 参数**

Rest 参数可以通过使用三个点 ... 并在后面跟着包含剩余参数的数组名称，来将它们包含在函数定义中，这些点的字面意思是“将剩余参数收集到一个数组中”；

```js
// 一个任意个数参数的累加函数
function sumAll(...args) { // 数组名为 args
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}
```

> Note: `Rest` 参数必须放到参数列表的末尾，因为放在其他参数前面或中间就失去了其意义；

**“arguments” 变量**

函数中还有一个名为 arguments 的特殊的类数组对象，该对象按参数索引包含所有参数；arguments 也是可迭代对象；

> Note: 箭头函数没有 `arguments` 对象；

**Spread 语法**

当在函数调用中使用 spread 语法 ...arr 时，它会把可迭代对象 arr “展开”到参数列表中；spread 语法也可以与常规值结合使用；

```js
let arr = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
let obj = { a: 1, b: 2, c: 3 };

// 基本用法
Math.max(1, ...arr, 2, ...arr2, 25);
let merged = [0, ...arr, 2, ...arr2];

// 字符串转数组
[..."hello"]; // ['h', 'e', 'l', 'l', 'o']

// 创建新对象或数组
let objCopy = { ...obj };
let arrCopy = [...arr];
```

> Tips: `Spread` 语法只适用于可迭代对象；而 `Array.from` 既可以用于类数组对象也可用于可迭代对象，因此，对于转换为数组的任务，`Array.from` 往往更通用；

> Tips: `Spread` 语法可以实现 `Object.assign()` 一样的浅拷贝效果，且更简介；

<!-- Object.assign会调用[[Setter]]，Spread语法不会，待验证 -->

#### 变量作用域，闭包

**变量**

如果在代码块 {...} 内声明（使用 let 或 const）了一个变量，那么这个变量只在该代码块内可见；该规则也适用于 if，for 和 while 等，以及函数体中；ES6 之前没有块级作用域；

在 JavaScript 中，每个运行的函数，代码块 {...} 以及整个脚本，都有一个被称为词法环境（Lexical Environment） 的内部（隐藏）的关联对象；

其中，词法环境对象由两部分组成：一个存储所有局部变量作为其属性（包括一些其他信息，如 this 的值）的对象，也称为环境记录（Environment Record）；另一个是对外部词法环境的引用，与外部代码相关联；全局词法环境没有外部引用；

> Note: “词法环境”是一个规范对象（specification object）：它仅仅是存在于编程语言规范中的“理论上”存在的，用于描述事物如何运作的对象，我们无法在代码中获取该对象并直接对其进行操作；

> Note: 一个“变量”只是环境记录这个特殊的内部对象的一个属性；“获取或修改变量”意味着“获取或修改词法环境的一个属性”；

**函数声明**

函数其实也是一个值，就像变量一样，不同之处在于函数声明的初始化会被立即完成（函数声明提升），当创建了一个词法环境时，函数声明会立即变为即用型函数，因此可以在（函数声明）的定义之前调用函数声明；

正常来说，这种行为仅适用于函数声明，而不适用于将函数分配给变量的函数表达式；

**内部和外部词法环境**

当代码要访问一个变量时首先会搜索内部词法环境，然后搜索外部环境，然后搜索更外部的环境，以此类推，直到全局词法环境；这也是内部变量覆盖外部同名变量的原因；

如果在任何地方都找不到这个变量，那么在严格模式下就会报错，在非严格模式下，为了向下兼容，给未定义的变量赋值会创建一个全局变量；

函数将从内到外依次在对应的词法环境中寻找目标变量，它使用最新的值；旧变量值不会保存在任何地方；当一个函数想要一个变量时，它会从自己的词法环境或外部词法环境中获取当前值；

**返回函数**

所有的函数在“诞生”时都会记住创建它们的词法环境，从技术上讲，所有函数都有名为 [[Environment]] 的隐藏属性，该属性保存了对创建该函数的词法环境的引用；

> Tips: 函数记住它创建于何处的方式，与函数被在哪儿调用无关；`[[Environment]]` 引用在函数创建时被设置并永久保存，并且不会改变；只有遇到调用函数时，函数词法环境才会被创建，这也是函数中 this 是动态绑定的原因；

```js
// 解释阶段
// 1. 脚本开始执行，创建全局词法环境；
// 2. 全局词法环境填充所有声明的变量（未初始化），同时完成函数的声明；

// 执行阶段
// 3. 此时，先定义 counter，值为 undefined；
// 4. 然后执行 makeCounter 后，为 counter 赋值；
let counter = makeCounter();


// 5. 进入函数，创建新的函数词法环境，并存储这个调用的局部变量和参数；
// 6. 同时将外部词法环境的引用指向全局词法环境；
function makeCounter() {
  let count = 0;

  // 7. 返回时，创建一个嵌套函数，并将嵌套函数的外部词法环境指向 makeCounter；
  return function() {
    // 9. 执行 count++ 时，从自身词法环境中查找 count，然后查找 makeCounter 词法环境中的变量，完成修改后返回；
    return count++;
  }
}

// 8. 执行 counter 函数，创建一个新的词法环境，并从 [[Environment]] 中获取其外部词法环境引用；
counter();
```

闭包是指内部函数总是可以访问其所在的外部函数中声明的变量和参数，即使在其外部函数被返回（寿命终结）了之后；

> Note: 在 JavaScript 中，所有函数都是天生闭包的（除 "new Function" 语法）；也就是说：JavaScript 中的函数会自动通过隐藏的 `[[Environment]]` 属性记住创建它们的位置，所以它们都可以访问外部变量；

通常，函数调用完成后，会将词法环境和其中的所有变量从内存中删除，但当有一个嵌套函数在外部函数结束后仍可达，则它将具有引用词法环境的 [[Environment]] 属性；因此词法环境仍会被保留在内存；

**实践**

> Note: 理论上当函数可达时，它外部的所有变量也都将存在；但在实际中，JavaScript 引擎会试图优化它，它们会分析变量的使用情况，如果从代码中可以明显看出有未使用的外部变量，那么就会将其删除；

> Note: 在 `V8`（Chrome，Edge，Opera）中的一个重要的副作用是，此类变量在调试中将不可用（未定义），或者得到一个同名的外部变量；

```js
// “不存在”的变量和“未初始化”的变量之间的特殊差异
let x = 1;

function func() {
  // 一个变量从技术的角度来讲是存在的，但是在 let 之前还不能使用，该区域也称死区
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 2;
}

func();
```

> Tips: 可以将词法环境/执行上下文理解为一个特殊内部对象 `{ VO / AO, this, [scope] }`；而环境记录则表示 `VO / AO` 和 `this`；`[scope]` 用于记录作用域；

> Note: `AO` 类似于是函数被调用时创建的一个特殊 `VO`，它在 `VO` 的基础上添加了实际调用函数时传入的参数和 `arguments` 对象，还有添加 `this` 对象；`VO` 和 `AO` 被创建时会先后执行著名的函数声明提升和变量声明提升，提升上来的变量和函数挂载到 `VO / AO` 对象的上，其实是作为它的属性存在的；

> Tips: 在调试函数时，`Scope` 的最上层是 `Local`，也就是当前执行上下文的变量对象，下面就是函数的`[[Scopes]]` 属性里保存的父级层级链；点击 `Call Stack` 栏中的函数，还可以切换当前执行上下文，观察下面 `Scope` 的变化；

> Tips: 使用 `console.dir` 可以打印出函数的 `length`、`name`，甚至作用域链 [[Scopes]] 等隐藏属性；严格模式下无法获取 `caller`，`callee`，`arguments` 等属性；

- [变量作用域，闭包文档传送门](https://zh.javascript.info/closure)
- [深入 js——作用域链](https://juejin.cn/post/6844904050824052744)
- [JS 编译过程，VO，AO](https://www.jianshu.com/p/edb2be5866eb)
- [JS 规范中的 Execution Context 和 Scope 概念有什么区别？](https://www.zhihu.com/question/51336888)
- [了解 JS 中的ECStack、EC、VO 和 AO](https://zhuanlan.zhihu.com/p/311196297)

#### 旧时的 var

在 JavaScript 中，有三种声明变量的方式：let，const（现代方式），var（过去留下来的方式）；

**var 没有块级作用域**

用 var 声明的变量，不是函数作用域就是全局作用域；它们在代码块外也是可见的也就是说，var 声明的变量只有函数作用域和全局作用域，没有块级作用域；

这就导致 if 语句或循环语句外可以访问在 {...} 中使用 var 定义的变量；var 穿透了 if，for 和其它代码块，这是因为在早期的 JavaScript 中，块没有词法环境，而 var 就是这个时期的代表之一；

**var 允许重新声明**

使用 var，可以重复声明一个变量，不管多少次都行；如果对一个已经声明的变量使用 var，这条新的声明语句会被忽略：

**var 提升变量声明**

var 声明的变量会在函数开头被定义，与它在代码中定义的位置无关；声明被提升，但是赋值不会；

```js
function sayHi() {
  // phrase 实际声明处

  alert(phrase); // undefined

  // phrase 赋值
  phrase = "Hello";

  // 代码块会被忽略，phrase 仍然会被声明
  if (false) {
    var phrase;
  }
}
sayHi();
```

**立即执行函数**

在之前，JavaScript 中只有 var 这一种声明变量的方式，并且这种方式声明的变量没有块级作用域，于是就有了一种模仿块级作用域的方法，这种方法被称为“立即调用函数表达式”（immediately-invoked function expressions，IIFE）；

通常需要使用圆括号把该函数表达式包起来，以告诉 JavaScript，这个函数是在另一个表达式的上下文中创建的，因此它是一个函数表达式：它不需要函数名，可以立即调用；

```js
// 创建 IIFE 的方法
(function() {
  alert("Parentheses around the function");
})();

(function() {
  alert("Parentheses around the whole thing");
}());

!function() {
  alert("Bitwise NOT operator starts the expression");
}();

+function() {
  alert("Unary plus starts the expression");
}();

~(function () {
  alert("Unary plus starts the expression");
})();
```

#### 全局对象

全局对象提供可在任何地方使用的变量和函数，且其所有属性都可以被直接访问；默认情况下，这些全局变量内建于语言或环境中；在浏览器中，它的名字是 “window”，对 Node.js 而言，它的名字是 “global”，其它环境可能用的是别的名字；

> Tips: 最近，`globalThis` 被作为全局对象的标准名称加入到了 JavaScript 中，所有环境都应该支持该名称，所有主流浏览器都支持它；

> Note: 在浏览器中，使用 `var` 声明的全局函数和变量会成为全局对象的属性；

如果一个值非常重要，且需要在全局范围内可用，可以直接将其作为属性写入；但一般不建议使用全局变量，全局变量应尽可能的少；与使用外部变量或全局变量相比，函数获取“输入”变量并产生特定“输出”的代码设计更加清晰，不易出错且更易于测试；

另外，一般还使用全局对象来测试对现代语言功能的支持；对于没有某些现代功能的旧版浏览器，可以创建 “polyfills”：添加环境不支持但在现代标准中存在的功能；

#### 函数对象，NFE

在 JavaScript 中，函数就是对象，可以把函数理解成可被调用的“行为对象（action object）”；我们不仅可以调用它们，还能把它们当作对象来处理：增/删属性，按引用传递等；

**name 属性**

一个函数的名字可以通过属性 “name” 来访问；名称赋值的逻辑很智能，即使是函数表达式，被创建时没有名字，名称赋值的逻辑也能给它赋予一个正确的名字，然后进行赋值；

> Note: 规范中把这种特性叫做上下文命名，如果函数自己没有提供，那么在赋值中，会根据上下文来推测一个；但当 JavaScript 引擎无法推测名字时，属性 name 就会是空；

```js
let sayHi = function() {
  alert("Hi");
};
alert(sayHi.name); // sayHi

// 对象中的方法也有 name 属性
let user = {

  sayHi() {
    // ...
  },
}
alert(user.sayHi.name); // sayHi

// 在数组中创建的匿名函数没有名称
let funcArr = [function () {}, function func() {}];

// 引擎无法设置正确的名字，所以没有值
console.warn(funcArr[0].name); // <空字符串>
console.warn(funcArr[1].name); // func
```

**length 属性**

length 是函数的另一个内建属性，它返回函数入参的个数；

> Tips: rest 参数不参与计数，属性 length 有时在操作其它函数的函数中用于做 内省/运行时检查（introspection）；

```js
// 根据函数参数个数的不同做不同处理，也属于多态的一种
function func(...handlers) {
  for (const handler of handlers) {
    console.log(handler.length); // 1 0

    if (handler.length == 0) {
      // do something
      continue;
    }

    handler(1);
  }
}

func((param) => param, (...rest) => rest);
```

**自定义属性**

在函数内可以使用函数名为函数添加自定义的属性；可以函数当作对象，在函数里存储属性，这对函数的执行没有任何影响；但变量不是函数属性，反之亦然；

> Tips: 函数属性有时会用来替代闭包；区别在于，闭包的属性外部无法访问；

```js
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;
  counter.set = value => count = value;
  counter.decrease = () => count--;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

**命名函数表达式**

命名函数表达式（NFE，Named Function Expression），指带有名字的函数表达式的术语；但它仍是一个函数表达式，不会成为一个函数声明；NFE 在函数内部可以应用自己，且该函数名在函数外部不可见；

```js
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // 使用 func 再次调用函数自身
  }
};

sayHi(); // Hello, Guest
func(); // Error, func is not defined（在函数外不可见）
```

> jQuery，lodash 等很多 JavaScript 库都充分利用了这个功能，实际上，这么做是为了减少对全局空间的污染，这样一个库就只会有一个全局变量，也降低了命名冲突的可能性；

```js
// 任意数量的括号求和
function sum(param) {
  sum.count = 0;

  _add.toString = function () {
    return sum.count;
  };

  function _add(p) {
    sum.count += p;
    return _add;
  }

  return _add(param);
}

console.log(sum(3)(4)(5)); // 12

// 升级版
function sum2(a) {
  const next = (b) => sum(a + b);
  next.valueOf = () => a;
  return next;
}
```

#### new Function 语法

还有一种很少见的函数创建方法；使用 Function 创建函数：`new Function ([arg1, arg2, ...argN], functionBody);`，由于历史原因，参数也可以按逗号分隔符的形式给出，这种方法实际上是通过运行时通过参数传递过来的字符串创建的；

另外，如果使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境；

#### 调度：setTimeout 和 setInterval

> Note: 这两个方法并不在 JavaScript 的规范中，但是大多数运行环境都有内建的调度程序，并且提供了这些方法；目前来讲，所有浏览器以及 Node.js 都支持这两个方法；

**setTimeout**

setTimeout 允许我们将函数推迟到一段时间间隔之后再执行；`let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)`，setTimeout 在调用时会返回一个“定时器标识符（timer identifier）”，可以将它传入 clearTimeout 方法来取消执行；

| 参数 | 说明 |
| :----- | :----- |
| func\|code | 要执行的函数或代码字符串，一般传入的都是函数；由于历史原因，支持传入代码字符串 |
| delay | 执行前的延时，以毫秒为单位，默认值是 0 |
| arg1，arg2… | 要传入被执行函数（或代码字符串）的参数列表（IE9 以下不支持） |

```js
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

let timerId = setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John

// 如果第一个参数位传入的是字符串，JavaScript 会自动为其创建一个函数
setTimeout("alert('Hello')", 1000); // 不建议使用，可用箭头函数代替

// 取消定时器
clearTimeout(timerId);
```

> Note: 在浏览器中，定时器标识符是一个数字；在 `Node.js` 中返回的是一个定时器对象，这个对象包含一系列方法；

> Tips: `setTimeout` 有一个特殊用法：`setTimeout(func, 0)`，或者仅仅是 `setTimeout(func)`；这样调度可以让 `func` 尽快执行，该函数被调度在当前脚本执行完成“之后”立即执行；

> Note: 浏览器环境下，零延时实际上不为零，嵌套定时器的运行频率是受限制的；根据 HTML5 标准 所讲：“经过 `5` 重嵌套定时器之后，时间间隔被强制设定为至少 `4` 毫秒”；

**setInterval**

setInterval 允许我们重复运行一个函数，从一段时间间隔之后开始运行，之后以该时间间隔连续重复运行该函数；该方法与 setTimeout 用法相同，所有参数的意义也相同；使用 clearInterval(timerId) 方法清除；

> Note: 在大多数浏览器中，包括 Chrome 和 Firefox，在显示 `alert/confirm/prompt` 弹窗时，内部的定时器仍旧会继续“嘀嗒”；因此如果未及时关闭弹窗，可能会出现关闭弹窗后立即弹出新的弹窗；

使用 setInterval 时，函数的实际调用间隔要比代码中设定的时间间隔要短；极端情况下，如果函数执行时间远大于预设时间间隔段时，JavaScript 引擎会等待函数执行完成，然后检查调度程序之后，立即再次执行函数；

> Tips: 相较而言，嵌套的 `setTimeout` 能够精确地设置两次执行之间的延时，而 `setInterval` 却不能；并且嵌套的 `setTimeout` 要比 `setInterval` 灵活得多；采用这种方式可以根据当前执行结果来调度下一次调用，因此下一次调用可以与当前这一次不同；

> Tips: 当一个函数传入 `setInterval/setTimeout` 时，将为其创建一个内部引用，并保存在调度程序中；这样，即使这个函数没有其他引用，也能防止垃圾回收器（GC）将其回收；同时该函数引用的外部变量也会被保留，因此，当我们不再需要调度函数时，最好取消它，即使这是个（占用内存）很小的函数；

```js
// 任何 setTimeout 都只会在当前代码执行完毕之后才会执行
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// 假设这段代码的运行时间 >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}
```

#### 装饰器模式和转发，call/apply

**装饰器**

装饰器（decorator）：一个特殊的函数，可以被看作是可以添加到函数的 “features” 或 “aspects”，可以添加一个或添加多个装饰器；装饰器是可重用的，逻辑独立的；

```js
function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // 如果缓存中有对应的结果
      return cache.get(x); // 从缓存中读取结果
    }

    // let result = func(x);
    let result = func.call(this, x);  // 否则就调用 func

    cache.set(x, result);  // 然后将结果缓存（记住）下来
    return result;
  };
}

slow = cachingDecorator(slow);
```

特殊的内建函数方法 func.call(context, arg1, arg2, ...)，它允许调用一个显式设置 this 的函数；另一个内建方法 func.apply(context, args)，它与 func.call 区别在第二个参数使用类数组对象 args 作为参数列表（arguments）；

> Note: `Spread` 语法 `...` 允许将可迭代对象 `args` 作为列表传递给 `func.call`，而 `func.apply` 只接受类数组 `args`；

> Tips: 即可迭代又是类数组的对象，使用 call 或 apply 均可，但是 apply 可能会更快，因为大多数 JavaScript 引擎在内部对其进行了优化；

**呼叫转移**

将所有参数连同上下文一起传递给另一个函数被称为“呼叫转移（call forwarding）”；

```js
// 一个呼叫转移的最简单形式
let wrapper = function() {
  return func.apply(this, arguments);
};
```

**方法借用**

方法借用（method borrowing）：从一个对象中获取一个方法，并在另一个对象的上下文中“调用”它；

```js
function hash() {
  alert( [].join.call(arguments) ); // 1,2
}

hash(1, 2);
```

> Tips: 采用数组方法并将它们应用于参数 `arguments` 是很常见的，另一种方法是使用 Rest 参数对象，该对象是一个真正的数组；


**防抖和节流**

debounce 会在“冷却（cooldown）”期后运行函数一次，适用于处理最终结果；throttle 运行函数的频率不会大于所给定的时间 ms 毫秒，适用于不应该经常进行的定期更新；

```js
// 防抖装饰器
function debounce(func, ms) {
  let timer = null;

  return function () {
    clearTimeout(timer); // 刷新计时器
    timer = setTimeout(() => func.apply(this, arguments), ms);
  };
}

// 节流装饰器
function throttle(func, ms) {
  let timer = null;
  return function () {
    if (timer) return; // 忽略执行
    timer = setTimeout(() => {
      func.apply(this, arguments);
      timer = null;
    }, ms);
  };
}
```

#### 函数绑定

浏览器中的 setTimeout 方法有些特殊：它为函数调用设定了 this=window（对于 Node.js，this 则会变为计时器（timer）对象；在其他类似的情况下，通常 this 会变为 undefined；

函数提供了一个内建方法 bind，它可以绑定 this；func.bind(context) 的结果是一个特殊的类似于函数的“外来对象（exotic object）”，它可以像函数一样被调用，并且透明地（transparently）将调用传递给 func 并设定 this=context；

```js
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

// 可以在没有对象（译注：与对象分离）的情况下运行它
sayHi(); // Hello, John!

// 还是会使用预先绑定（pre-bound）的值，该值是对旧的 user 对象的引用
setTimeout(user.sayHi.bind(user), 1000); // Hello, John!

// 调用了最新的 sayHi 方法；
setTimeout(() => user.sayHi(), 1000); // Another user in setTimeout!

// user 的值在不到 1 秒内发生了改变
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

> Tips: 如果一个对象有很多方法，并且我们都打算将它们都传递出去，那么我们可以在一个循环中完成所有方法的绑定；或者也可以使用 lodash 中的 `_.bindAll(object, methodNames)` 方法；

此外，func.bind(context, [arg1], [arg2], ...) 不仅可以绑定 this，还可以绑定参数（arguments）；可以通过绑定先有函数的一些参数来创建一个新函数，被称为偏函数应用程序（partial function application）；

使用偏函数可以创建一个具有可读性高的名字（double，triple）的独立函数；另一方面，当我们有一个非常通用的函数，并希望有一个通用型更低的该函数的变体时，偏函数会非常有用；lodash 库有现成的 _.partial 实现；

> Note: 绑定函数的上下文是硬绑定（hard-fixed）的，无法再修改它；因此被绑定函数内部的 this 指向，或者对象的属性值会被固定，即会使用预先绑定（pre-bound）的值；

> Note: 一个函数不能被重绑定（re-bound），二次绑定的值无效；在非严格模式下，ES5 标准会将值为 `null` 的 `this` 绑定到全局对象，也就是 `this=window`；

```js
// 一个偏函数的例子
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2); // 第一个参数必填
double(3); // 6

// 偏函数装饰器
function partial(func, ...argsBound) {
  return function(...args) {
    // 调用时，获取当前 this，即不关心绑定对象；
    return func.call(this, ...argsBound, ...args);
  }
}

// 二次绑定
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

#### 深入理解箭头函数

箭头函数是针对那些没有自己的“上下文”，但在当前上下文中起作用的短代码的；箭头函数具有以下特点：

- 没有 this；
- 没有 arguments；
- 不能使用 new 进行调用；
- 也没有 super；

> Note: 箭头函数不具有 `this` 自然也就意味着另一个限制：箭头函数不能用作构造器（constructor），因此不能用 `new` 调用它们；

> Note: 相较与 `func.bind(this)`，前者创建了一个该函数的“绑定版本”；而箭头函数 `=>` 没有创建任何绑定，箭头函数只是没有 `this`；`this` 的查找与常规变量的搜索方式完全相同：在外部词法环境中查找；

#### 属性标志和属性描述符

对象属性（properties），除 value 外，还有三个特殊的特性（attributes），也就是所谓的“标志”；默认都为 true；

- writable 表示是否值可以被修改；
- enumerable 表示是否会被在循环中列出；
- configurable 表示是否此特性可以被删除，这些属性也可以被修改；

**writable**

通过更改 writable 标志来把对象属性设置为只读，不能被重新赋值；

> Note: 在非严格模式下，在对不可写的属性等进行写入操作时，不会出现错误，但是操作仍然不会成功；因为在非严格模式下，违反标志的行为（flag-violating action）只会被默默地忽略掉；

**enumerable**

通过更改 enumerable 标志来把对象属性设置为不可枚举，不会显示在 for..in 中；也会被 Object.keys 排除；

**configurable**

通过设置 configurable 标志把对象属性标志设置为不能被删除（delete），它的特性（attribute）不能被修改；

configurable: false 防止更改和删除属性标志，但是允许更改对象的值，不可配置标志（configurable:false）有时会预设在内建对象和属性中；

> Note: 对于不可配置的属性，我们可以将 `writable: true` 更改为  `false`，从而防止其值被修改（以添加另一层保护），但无法反向行之；

**Object.getOwnPropertyDescriptor / Object.getOwnPropertyDescriptors**

可以通过 Object.getOwnPropertyDescriptor(obj, propertyName) 方法获取，返回一个“属性描述符”对象：包含值和所有的标志；

或者可以使用 Object.getOwnPropertyDescriptors(obj) 方法一次获取对象所有包含 symbol 类型的和不可枚举的属性在内的属性描述符；

**Object.defineProperty / Object.defineProperties**

可以使用 Object.defineProperty(obj, propertyName, descriptor) 方法修改标志；如果该属性存在，defineProperty 会更新其标志，否则它会使用给定的值和标志创建属性；在这种情况下，如果没有提供标志，则会假定它是 false；

或者使用 Object.defineProperties(obj, descriptors) 方法同时定义多个属性；

> Tips: 克隆对象的“标志感知”方式：`let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))`，

```js
let user = {
  name: "Coley48",
  toString() {
    return this.name;
  },
};

// 常规方式定义的属性，标志默认全为 true
Object.getOwnPropertyDescriptor(user, "name");
// {value: 'Coley48', writable: true, enumerable: true, configurable: true}

// 更改旧属性
Object.defineProperty(user, "toString", {
  // 只更新 enumerable 标志
  enumerable: false,
});

// 跳过不可枚举的属性
for (let key in user) console.warn(key); // name
Object.keys(user); // ['name']

// 定义新属性
Object.defineProperty(user, "important", {
  // value 默认 undefined
  // enumerable 未显式给出，默认为 false
  writable: false,
  configurable: false,
});

// 更改不可配置属性 Cannot redefine property: important
Object.defineProperty(user, "important", {
  writable: true,
  configurable: false,
});

// 获取全部属性的标志对象
let descriptors = Object.getOwnPropertyDescriptors(user);

console.log(descriptors);
```

**全局封闭对象**

属性描述符在单个属性的级别上工作，以下方法可以限制整个对象访问，但在实际开发中较少用到；

- Object.preventExtensions(obj) 禁止向对象添加新属性
- Object.seal(obj) 禁止添加/删除属性；为所有现有的属性设置 configurable: false；
- Object.freeze(obj) 禁止添加/删除/更改属性；为所有现有的属性设置 configurable: false, writable: false；
- Object.isExtensible(obj) 如果添加属性被禁止，则返回 false，否则返回 true；
- Object.isSealed(obj) 如果添加/删除属性被禁止，并且所有现有的属性都具有 configurable: false则返回 true；
- Object.isFrozen(obj) 如果添加/删除/更改属性被禁止，并且所有当前属性都是 configurable: false, writable: false，则返回 true；

#### 属性的 getter 和 setter

对象属性分为两种，一种是数据属性，另一种是访问器属性（accessor properties）；本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性；

**getter 和 setter**

访问器属性由 “getter” 和 “setter” 方法表示，在对象字面量中，它们用 get 和 set 表示；

从外表看，访问器属性看起来就像一个普通属性，这就是访问器属性的设计思想；不以函数的方式调用 getter / setter 属性，当读取 / 设置属性时，getter / setter 会在幕后运行；

**访问器描述符**

访问器属性的描述符与数据属性的不同，没有 value 和 writable，但是有 get 和 set 函数；

- get 一个没有参数的函数，在读取属性时工作；
- set 带有一个参数的函数，当属性被设置时调用；
- enumerable 与数据属性的相同；
- configurable 与数据属性的相同；

> Note: 一个属性要么是访问器（具有 `get/set` 方法），要么是数据属性（具有 `value`），但不能两者都是；如果试图在同一个描述符中同时提供 `get` 和 `value`，则会出现错误；

访问器的一大用途是，它们允许随时通过使用 getter 和 setter 替换“正常的”数据属性，来控制和调整这些属性的行为；例如为旧代码添加一个 getter 以实现兼容；

```js
let user = {
  _name: "John",
};

Object.defineProperty(user, 'name', {
  get() {
    return this._name;
  },

  set(value) {
    set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
  }
});

for(let key in user) alert(key); // _name

alert(user.name); // John
user.name = ""; // alert ...
```