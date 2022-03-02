// "use strict";

// // 检查空对象

// function isEmpty(obj) {
//   for (let key in obj) {
//     // 如果进到循环里面，说明有属性。
//     return false;
//   }
//   return true;
// }

// let srcObj = {
//   name: "srcObj",
//   isEmpty,
// };

// let anotherSrcObj = {
//   test: true,
// };

// let result = Object.assign({}, srcObj, anotherSrcObj);

// console.warn(result);

// function deepCopy(object) {
//   if (typeof object !== "object" || object === null) {
//     return object;
//   }
//   let copy = {};
//   for (const key in object) {
//     if (Object.hasOwnProperty.call(object, key)) {
//       copy[key] = deepCopy(object[key]);
//     }
//   }
//   return copy;
// }

// let newSrcObj = {
//   id: 0,
//   src: srcObj,
// };

// let copySrcObj = deepCopy(newSrcObj);

// console.log(copySrcObj);
// console.log(newSrcObj == copySrcObj); // false

// console.log(deepCopy(document));
// console.log(document == deepCopy(document)); // false

// function sayHi() {
//   console.error(this);
// }

// sayHi(); // window
// sayHi.bind(null)(); // window
// sayHi.bind(srcObj)(); // srcObj

// // "use strict";

// sayHi(); // undefined
// sayHi.bind(null)(); // null
// sayHi.bind(srcObj)(); // srcObj

// function teacher(name) {
//   // this.name = name;
//   // this.isAdmin = false;
//   console.log(new.target);
// }

// teacher(""); // undefined
// let t = new teacher("zhang"); // function teacher

// console.log(t);

// function BigUser() {
//   this.name = "John";

//   return { newName: "Godzilla" }; // <-- 返回这个对象
// }

// let bigUser = new BigUser();
// console.log(bigUser.name, bigUser.newName); // undefined 'Godzilla'

// console.log("====================================>");

// function A() {
//   return srcObj;
// }
// function B() {
//   return srcObj;
// }

// console.warn(new A() == new B(), new A() === new B()); // true true

// // 可选链
// let user = {};

// console.log(user?.name?.first);
// user.admin?.();
// console.log(user?.["key"]);

// // Symbol

// let id1 = Symbol("id");
// let id2 = Symbol("id");

// console.log(id1, id2);
// console.warn(id1 == id2); // false

// // alert(id1); // Uncaught TypeError: Cannot convert a Symbol value to a string

// let id = Symbol("key");

// let user2 = {
//   name: "Coley",
//   [id]: 12,
// };

// console.log(user2);

// for (const key in user2) {
//   if (Object.hasOwnProperty.call(user2, key)) {
//     const element = user2[key];
//     console.log(element);
//   }
// }

// console.log(Object.getOwnPropertySymbols(user2)); // [Symbol(key)]
// console.log(Reflect.ownKeys(user2)); // ['name', Symbol(key)]

let obj = {
  id: 1,
};

// string
// alert(obj); [object Object]
let user = {};

user[obj] = 2;
console.log(user); // {[object Object]: 2}

// number
let num = Number(obj);
console.log(num); // NaN

let n = +obj;
let delta = new Date() - new Date();
console.log(n, delta); // NaN 0

let greater = obj > user;
console.log(greater); // false

// default
let total = obj + user;

console.log(user == 1); // false
console.log(total); // [object Object][object Object]

// Object.prototype[Symbol.toPrimitive] = function () {
//   return new URLSearchParams(this).toString();
// };

let o = {
  name: "obj",
  age: 18,
  bool: true,
  number: 1,

  toString() {
    return 3; // 同时返回空对象时报错：Uncaught TypeError: Cannot convert object to primitive value
  },

  valueOf() {
    return this.number++; // default hint 和 number hint 输出 4，该方法不存在时，调用 toString 输出 3
  },
};

console.warn(o == 1 && o == 2 && o == 3); // true
console.warn(o); // o
console.warn("" + o); // name=obj&age=18&bool=true
console.warn(+o);
// console.warn(o[Symbol.toPrimitive]()); // name=obj&age=18&bool=true
