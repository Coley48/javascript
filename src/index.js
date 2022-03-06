"use strict";

// let record = [0, 1, 1];

// // 斐波那契
// export function Fibonacci1(n) {
//   if (n < 3) {
//     return 1;
//   }
//   let lastOne = 1;
//   let lastTwo = 1;

//   for (let i = 3; i < n; i++) {
//     [lastTwo, lastOne] = [lastOne, lastOne + lastTwo];
//   }

//   return lastOne + lastTwo;
//   // if (n < record.length) {
//   //   return record[n];
//   // } else {
//   //   return (record[n] = Fibonacci(n - 1) + Fibonacci(n - 2));
//   // }
//   // return n > 1 ? Fibonacci(n - 1) + Fibonacci(n - 2) : n;
// }

// export function Fibonacci(n) {
//   let caches = {};

//   function _fib(n) {
//     if (n < 3) return 1;
//     return n in caches ? caches[n] : (caches[n] = _fib(n - 1) + _fib(n - 2));
//   }

//   return _fib(n);
// }

// // 数组转单链表
// function arrayToList(arr, index = 0) {
//   console.log(1);
//   if (index < arr.length) {
//     return {
//       value: arr[index],
//       next: arrayToList(arr, index + 1),
//     };
//   } else {
//     return {
//       value: arr[index],
//       next: null,
//     };
//   }
// }

// let arr = [1, 2, 3, 4];
// let list = arrayToList(arr);

// console.log(list);
// console.log(arrayToList);

// // 闭包

// let counter = makeCounter();

// function makeCounter() {
//   // let value = "abc";
//   let count = 0;

//   return function () {
//     // debugger;
//     return count++;
//   };
// }

// counter();

// // 闭包 sum

// export function closureSum(a) {
//   return function (b) {
//     return a + b;
//   };
// }

// // (function () {
// //   alert("Parentheses around the function");
// // })();

// // (function () {
// //   alert("Parentheses around the whole thing");
// // })();

// // !(function () {
// //   alert("Bitwise NOT operator starts the expression");
// // })();

// // ~(function () {
// //   alert("Unary plus starts the expression");
// // })();

// // 全局对象

// globalThis.user = {
//   name: "Coley48",
//   age: 18,
// };

// console.warn(globalThis.user);

// // 在数组中创建的函数
// let funcArr = [function () {}, function func() {}];

// // 引擎无法设置正确的名字，所以没有值
// console.warn(funcArr[0].name); // <空字符串>
// console.warn(funcArr[1].name); // func

// function func(...handlers) {
//   for (const handler of handlers) {
//     console.log(handler.length); // 1 0

//     if (handler.length == 0) {
//       // do something
//       continue;
//     }

//     handler(1);
//   }
// }

// // func(
// //   (param) => param,
// //   (...rest) => rest
// // );

// // function func2() {
// //   // debugger;
// //   console.log(func2.name);

// //   // 没有函数声明提升
// //   let _f = function (param) {
// //     console.log(param);
// //   };
// //   // debugger;

// //   _f("1234");
// //   console.dir(_f);
// // }

// // func2();

// // console.dir(func2);

// function sum(param) {
//   sum.count = 0;

//   _add.toString = function () {
//     return sum.count;
//   };

//   function _add(p) {
//     sum.count += p;
//     return _add;
//   }

//   return _add(param);
// }

// console.log(+sum(3)(4)(5)); // 12

// function sum2(a) {
//   const next = (b) => sum(a + b);
//   next.valueOf = () => a;
//   return next;
// }

// console.log(+sum2(1)(2)(3));

// console.clear();

// let start = Date.now();
// let times = [];

// setTimeout(function run() {
//   times.push(Date.now() - start); // 保存前一个调用的延时

//   if (start + 100 < Date.now()) console.log(times);
//   // 100 毫秒之后，显示延时信息
//   else setTimeout(run); // 否则重新调度
// });

// // 间谍装饰器

// function work(a, b) {
//   console.warn(a + b); // work 是一个任意的函数或方法
// }

// function spy(func) {
//   _f.calls = [];

//   function _f(...rest) {
//     _f.calls.push(rest);
//     func.apply(this, rest);
//   }

//   return _f;
// }

// work = spy(work);

// work(1, 2); // 3
// work(4, 5); // 9

// for (let args of work.calls) {
//   console.log("call:" + args.join()); // "call:1,2", "call:4,5"
// }

// // 延时装饰器
// console.clear();

// function ff(...rest) {
//   console.log(...rest);
// }

// function delay(func, ms) {
//   return function () {
//     // setTimeout(() => {
//     //   console.error("...", this); // undefined
//     //   func.apply(this, arguments);
//     // }, ms);
//     let arg = arguments;
//     setTimeout(function (x = 1) {
//       console.log("---", this, arg); // Window
//       func.apply(this, arg);
//     }, ms);
//   };
// }

// // create wrappers
// let f1000 = delay(ff, 1000);
// let f1500 = delay(ff, 2500);

// f1000("test"); // 在 1000ms 后显示 "test"
// f1500("test", 111); // 在 1500ms 后显示 "test"

// // 防抖装饰器

// function debounce(func, ms) {
//   let timer = null;

//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(() => func.apply(this, arguments), ms);
//   };
// }

// let f = debounce(console.log, 1000);
// f("a");
// setTimeout(() => f("b"), 200);
// setTimeout(() => f("c"), 500);

// // 节流装饰器

// function throttle(func, ms) {
//   let timer = null;
//   return function () {
//     if (!timer) {
//       timer = setTimeout(() => {
//         func.apply(this, arguments);
//         timer = null;
//       }, ms);
//     }
//   };
// }

// let f2 = throttle(console.log, 1000);
// f2(1); // 显示 1
// f2(2); // (节流，尚未到 1000ms)
// f2(3); // (节流，尚未到 1000ms)

// function throttle2(func, ms) {
//   let isThrottled = false,
//     savedArgs,
//     savedThis;

//   function wrapper() {
//     if (isThrottled) {
//       // (2)
//       savedArgs = arguments;
//       savedThis = this;
//       return;
//     }
//     isThrottled = true;

//     func.apply(this, arguments); // (1)

//     setTimeout(function () {
//       isThrottled = false; // (3)
//       if (savedArgs) {
//         wrapper.apply(savedThis, savedArgs);
//         savedArgs = savedThis = null;
//       }
//     }, ms);
//   }

//   return wrapper;
// }

// // 函数绑定

// let user = {
//   firstName: "John",
//   sayHi() {
//     console.warn(`Hello, ${this.firstName}!`);
//   },
// };

// let sayHi = user.sayHi.bind(user); // (*)

// // 可以在没有对象（译注：与对象分离）的情况下运行它
// sayHi(); // Hello, John!

// setTimeout(sayHi, 1000); // Hello, John!

// // 即使 user 的值在不到 1 秒内发生了改变
// // sayHi 还是会使用预先绑定（pre-bound）的值，该值是对旧的 user 对象的引用
// user = {
//   sayHi() {
//     console.warn("Another user in setTimeout!");
//   },
// };

// function mul(a, b) {
//   console.log(a, b);
//   return a * b;
// }

// let double = mul.bind(null, 2);

// console.log(double(3)); // = mul(2, 3) = 6
// console.log(double(4)); // = mul(2, 4) = 8
// console.log(double(5)); // = mul(2, 5) = 10

// // 在非严格模式下，ES5 标准会将值为 null 的 this 绑定到全局对象，也就是 this=window
// function f0() {
//   console.error(this); // null
// }

// let user0 = {
//   g: f0.bind(null),
// };

// user0.g();

// // bind 函数属性

// function sayHi2() {
//   alert(this.name);
// }
// sayHi2.test = 5;

// let bound = sayHi2.bind({
//   name: "John",
// });

// // alert(bound.test); // undefined

// 浏览器 script 中

window.ff = ff;

function ff() {
  console.log(this);
}

let user = {
  firstName: "John",
  sayHi() {
    console.log(`Hello, `, this);
  },
};

setTimeout(user.sayHi, 1000); // Hello, Window

setTimeout(() => {
  user.sayHi(); // Hello, user
}, 1000);

setTimeout(ff, 1000); // Window

setTimeout(() => {
  ff(); // undefined
}, 1000);

setTimeout(function () {
  // console.log(this); // Window
  window.ff(); // Window
}, 1000);
