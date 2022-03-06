// "use strict";

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
// Object.defineProperty(user, "important", {
//   writable: true,
//   configurable: false,
// });

// 获取全部属性的标志对象
let descriptors = Object.getOwnPropertyDescriptors(user);

console.log(descriptors);

// let obj = {};

// Object.defineProperty(console, "log", {
//   get() {
//     window.location.href = "about:blank";
//   },
// });

// console.log(obj);
