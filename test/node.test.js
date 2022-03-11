// "use strict";

// console.warn(this);
// if (true) {
//   console.warn(this); // What is `this` here?
// }

function func() {
    console.log(this == globalThis);
    console.log(this);
}

// func();

module.exports = {
    func,
    a: 1234
};

// SyntaxError: await is only valid in async function
// let result = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.clear();
//         resolve("result");
//     }, 2000);
// });

// console.log(result);
