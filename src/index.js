"use strict";

// 单个导入
// import { COUNT } from "./js/export";
// console.log(COUNT); // 10

// 导入为对象
// import * as mode from "./js/export";
// console.log(mode); // Module {__esModule: true, Symbol(Symbol.toStringTag): 'Module', COUNT, func, default}
// mode.func(); // mode

// 混合导入
// import User, { COUNT } from "./js/export";
// import { default as User2, COUNT } from "./js/export";
// console.log(User2); // User
// console.log(COUNT); // 10

// 导入重新导出的方法
// import { fn } from "./js/import";
// fn();

// 导入重新导出的默认导出
// import User from "./js/import";
import { default as U } from "./js/import";
console.log(U); // User
let u = new U();
console.warn(u.__proto__.constructor.name); // User

// export * from "./export.js";
// console.log(User); // undefined
// export 'default' (imported as 'User') was not found in './js/import' (possible exports: COUNT, func)

// export * from "./export.js";
// export { default } from "./export";
// console.log(User); // User
