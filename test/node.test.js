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
  a: 1234,
};
