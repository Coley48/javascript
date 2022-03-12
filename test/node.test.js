// "use strict";

// console.warn(this);
// if (true) {
//   console.warn(this); // What is `this` here?
// }

// module.exports = {
//     func,
//     a: 1234
// };

// SyntaxError: await is only valid in async function
// let result = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.clear();
//         resolve("result");
//     }, 2000);
// });

// console.log(result);

// console.log(import.meta);
// package.json { "type": "module" }
// node.test.mjs
// [Object: null prototype] {
//   url: 'file:///E:/javascript/test/node.test.js'
// }

export function func() {
    console.log(this == globalThis);
    console.log(this);
}
