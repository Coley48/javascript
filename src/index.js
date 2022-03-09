// "use strict";

{
  function F() {}

  let f = new F();
  console.log(f);

  class User {
    // 类字段中允许添加任何属性
    age = 18;

    constructor(name) {
      this.name = name;
    }

    // getter
    get name() {
      return this._name;
    }

    // setter
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }

    // 计算属性
    ["say" + "No"]() {
      console.log("Hello", this.name);
    }

    sayHi() {
      console.log(this.name);
    }
  }

  // 用法：
  let user = new User("John");
  user.sayHi(); // John

  // 类其实是一个 constructor 方法
  console.log(typeof User); // function
  console.log(User.prototype.constructor.name); // User
  console.log(Object.getOwnPropertyNames(User.prototype)); // ['constructor', 'name', 'sayNo', 'sayHi']

  // 和 function 定义差别
  // User(); // Cannot call a class as a function

  // 理解为定义了一个特殊的函数，然后该类作为该函数的原型
  console.warn(Object.getOwnPropertyDescriptors(User)); // {name, length, prototype}
  console.warn(Object.getOwnPropertyDescriptors(User.prototype)); // {constructor, sayHi, sayNo}
}

// 时钟案例
{
  class Clock {
    constructor({ template }) {
      this.template = template;
    }

    render() {
      let date = new Date();

      let hours = date.getHours();
      if (hours < 10) hours = "0" + hours;

      let mins = date.getMinutes();
      if (mins < 10) mins = "0" + mins;

      let secs = date.getSeconds();
      if (secs < 10) secs = "0" + secs;

      let output = this.template
        .replace("h", hours)
        .replace("m", mins)
        .replace("s", secs);

      console.log(output);
    }

    stop() {
      clearInterval(this.timer);
    }

    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    }

    click = () => {
      console.dir(this);
    };

    dblClick() {
      console.dir(this);
    }
  }

  let clock = new Clock({ template: "h:m:s" });
  // clock.start();
  clock.click(); // Clock
  clock.dblClick(); // Clock

  // setTimeout(clock.click, 1000); // Clock
  // setTimeout(clock.dblClick, 1000); // Window
  // setTimeout(function () {
  //   console.dir(this); // Window
  // }, 1000);
  // setTimeout(() => {
  //   console.dir(this); // {}
  // }, 1000);
}

// setTimeout(() => {
//   console.dir(this); // {}
// }, 1000);

console.clear();

window.name = "window";

let user = {
  name: "user",
};

const fn = {
  name: "fn",
  say: function () {
    console.log("say:", this.name);
  },
  sayArrow: () => {
    console.log("sayArrow:", this.name);
  },
  say1: function () {
    setTimeout(function () {
      console.log("say1:", this.name);
    }, 1000);
  },
  say2: function () {
    let that = this;
    setTimeout(function () {
      console.log("say2:", that.name);
    }, 1000);
  },
  say3: function () {
    setTimeout(() => {
      console.log("say3:", this.name);
    }, 1000);
  },
  say4: () => {
    setTimeout(() => {
      console.log("say4:", this.name);
    }, 1000);
  },
  say5: () => {
    setTimeout(function () {
      console.log("say5:", this.name);
    }, 1000);
  },
};

// fn.say(); // fn
// fn.sayArrow(); // window / undefined
// setTimeout(fn.say, 1000); // window
// setTimeout(fn.sayArrow, 1000); // window / undefined
// setTimeout(() => fn.say(), 1000); // fn
// setTimeout(() => fn.sayArrow(), 1000); // window / undefined
// fn.say1(); // window
// fn.say2(); // fn
// fn.say3(); // fn
// fn.say4(); // window / undefined
// fn.say5(); // window

// If this arg is passed to call, bind, or apply on invocation of an arrow function it will be ignored.
// You can still prepend arguments to the call, but the first argument (thisArg) should be set to null.
console.warn("func.bind...");
// fn.say.bind()(); // window / Cannot read properties of undefined (reading 'name')
// fn.say.bind(null)(); // window / Cannot read properties of null (reading 'name')
fn.say.bind(user)(); // user
fn.sayArrow.bind()(); // window / undefined
fn.sayArrow.bind(null)(); // window / undefined
fn.sayArrow.bind(user)(); // window / undefined

console.warn("func.call...");
// fn.say.call(); // window / Cannot read properties of undefined (reading 'name')
// fn.say.call(null); // window / Cannot read properties of null (reading 'name')
fn.say.call(user); // user
fn.sayArrow.call(); // window / undefined
fn.sayArrow.call(null); // window / undefined
fn.sayArrow.call(user); // window / undefined

console.warn("copySayArrow...");
let copySayArrow = fn.sayArrow;
copySayArrow(); // window / undefined
copySayArrow.bind(user)(); // window / undefined
copySayArrow.call(user); // window / undefined

console.warn("newSayArrow...");
{
  let name = "global";
  let newSayArrow = () => {
    console.log(this);
    console.log("newSayArrow", this.name);
  };
  newSayArrow(); // window / undefined
  newSayArrow.bind(user)(); // window / undefined
  newSayArrow.call(user); // window / undefined
}

console.warn("...");
eval("console.log(this)");

{
  // eval 中 this 绑定
  //
  let obj = {
    say() {
      console.warn(this); // obj
      eval("console.log(this)"); // obj
      window.eval("console.log(this)"); // window
    },
  };
  eval("console.log(this)"); // window / undefined
  window.eval("console.log(this)"); // window

  obj.say();
}

console.clear();
// 引用丢失
// let refObj = {
//   func() {
//     console.log(this);
//   },
// };

// const g = (f) => f(); // No base ref.
// const h = refObj.func;
// const j = () => refObj.func;

// g(refObj.func);
// h(); // No base ref.
// j()(); // No base ref.
// (0, refObj.func)(); // Another common pattern to remove the base ref.

function f() {
  console.log(this);
}

const myString = "s",
  g = f.bind(myString);

g(); // Logs `String { "s" }`.
f.call(myString); // Logs `String { "s" }`.

const mod = require("../test/node.test");

const a = 1;

console.log(mod);
mod.func();
console.log(this);

console.warn(this);
if (true) {
  console.warn(this); // What is `this` here?
}

module.exports = {
  a,
};

// node 环境下或在 module 中 this 为 {}
// 严格模式

let obj = {};

function func(n) {
  console.log(n, this);
  setTimeout(() => console.log(n, this), 1000);
}

window.func = func;
window.func(1); // undefined / window

obj.f = func;
obj.f(2); // { f }

// 快速排序
function QuickSort(arr, start, end) {
  if (start > end) {
    return;
  }

  let i = start;
  let j = end;
  let key = arr[i];

  while (i < j) {
    // 往前找小于的数
    while (i < j && arr[j] > key) {
      j--;
    }
    if (i < j) {
      arr[i++] = arr[j];
    }
    // 往后找大于的数
    while (i < j && arr[i] < key) {
      i++;
    }
    if (i < j) {
      arr[j--] = arr[i];
    }
  }

  arr[i] = key;
  QuickSort(arr, start, i - 1);
  QuickSort(arr, i + 1, end);
}

let arr = [72, 6, 57, 88, 60, 42, 83, 73, 48, 85];
QuickSort(arr, 0, arr.length - 1);
console.log(arr); // [6, 42, 48, 57, 60, 72, 73, 83, 85, 88]
