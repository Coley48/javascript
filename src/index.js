"use strict";

// console.log("string".toUpperCase()); // STRING

// let str = "string";

// // str.test = 1;

// // console.warn(str.test); // undefined
// // console.warn(str.test); // Uncaught TypeError: Cannot create property 'test' on string 'string'

// let billion = 1_000_000_000;

// console.log(billion);

// let number = 200;

// console.log("number.toString(16):", number.toString(16)); // "c8"

// console.log("parseInt('200', 16):", parseInt("c8", 16)); // 200

// console.log((123456).toString(36)); // 2n9c

// // Hello！我是一个会自我增加的数字！
// console.log(9999999999999999); // 显示 10000000000000000

// console.warn(Math.max(-1, " ")); // 0

// console.log(str[1000]); // undefined
// console.log(str.charAt(1000)); // ''

// // str[0] = "h"; // Uncaught TypeError: Cannot assign to read only property '0' of string 'string'

// // substr substring slice

// // string
// console.warn(str.substring(1, 3)); // tr
// console.warn(str.substring(3, -1)); // str

// let text = "abcdefghijklmnopqrstuvwxyz1234567890";

// console.log(text.slice(0, 20));

// 数组

// Array.prototype[Symbol.toPrimitive] = function (hint) {
//   console.error(hint);

//   return "This is an array";
// };

// alert(1 + [1, 2, 3]);

export function getMaxSubSum(arr) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    let total = 0;
    for (let j = i; j < arr.length; j++) {
      total += arr[j];
      result = Math.max(total, result);
    }
  }

  return result;
}

export function getMaxSubSum2(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    // arr 中的每个 item
    partialSum += item; // 将其加到 partialSum
    maxSum = Math.max(maxSum, partialSum); // 记住最大值
    if (partialSum < 0) partialSum = 0; // 如果是负数就置为 0
  }

  return maxSum;
}

// getMaxSubSum([-1, 2, 3, -9]) == 5
// getMaxSubSum([2, -1, 2, 3, -9]) == 6
// getMaxSubSum([-1, 2, 3, -9, 11]) == 11
// getMaxSubSum([-2, -1, 1, 2]) == 3
// getMaxSubSum([100, -9, 2, -3, 5]) == 100
// getMaxSubSum([1, 2, 3]) == 6

// 数组方法

let arr = [1, 2, 3, 4, 5];

// 从索引 1 开始删除 1 个元素
console.log(arr.splice(1, 1), arr); // [2] [1, 3, 4, 5]
// 删除最后一个元素
console.log(arr.splice(-1, 1), arr); // [5] [1, 3, 4]

// 插入元素
console.log(arr.splice(2, 0, 100), arr); // [] [1, 3, 100, 4]

let arrayLike = {
  0: "something",
  length: 1,
};

let arrayLike2 = {
  0: "something",
  [Symbol.isConcatSpreadable]: true,
  length: 1,
};

// alert(arr.concat([3, 4], 5)); // 1,2,3,4,5
// alert(arr.concat(arrayLike, arrayLike2)); // 1,2,3,4,5,[object Object],something

// let arr2 = [1, 2, NaN, null, undefined];

// console.warn(arr2.indexOf(NaN)); // -1
// console.warn(arr2.indexOf(null)); // 3
// console.warn(arr2.lastIndexOf(undefined)); // 4

// console.warn(arr2.includes(NaN)); // true
// console.warn(arr2.includes(null)); // true
// console.warn(arr2.includes(undefined)); // true

// let arr3 = [1, -2, 15, 2, 0, 8];
// arr3.sort((a, b) => a - b);
// console.log(arr3);

// let army = {
//   minAge: 18,
//   maxAge: 27,
//   canJoin(user) {
//     return user.age > 20;
//   },
// };

// let users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// let soldiers = users.filter(army.canJoin, army);

// console.log(soldiers); // [{age: 23}, {age: 30}]

// 可迭代对象

let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        return this.current < this.last
          ? { done: false, value: this.current++ }
          : { done: true, value: -1 };
      },
    };
  },
};

let rangeEntries = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        return this.current < this.last
          ? { done: false, value: [this.current++, 1] }
          : { done: true, value: -1 };
      },
    };
  },
};

// for (const it of range) {
//   console.warn(it); // 1, 2, 3, 4
// }

// let map = new Map(rangeEntries);

// map.set("1", "str1").set(1, "num1").set(true, "bool1");

// console.log(map);

// for (const value of map) {
//   console.log(value);
// }

// let set = new Set([1, 2, 3]);
// console.warn(set.keys());

// console.log(Object.fromEntries(rangeEntries)); // {1: 1, 2: 1, 3: 1, 4: 1}

// let title, width, height;

// 这一行发生了错误
// {title, width, height} = {title: "Menu", width: 200, height: 100};

// 获取某月的最后一天
export function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

let user = {
  sayHi() {
    // 被忽略
    alert("Hello");
  },
  [Symbol("id")]: 123, // 被忽略
  something: undefined, // 被忽略
};

console.log(JSON.stringify(user)); // {}（空对象）

let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  participants: [{ name: "John" }, { name: "Alice" }],
  place: room, // meetup 引用了 room
};

room.occupiedBy = meetup; // room 引用了 meetup

Object.prototype.toString = function () {
  return "[" + Object.keys(this).join(", ") + "]";
};

// 映射函数
console.log(
  "result:",
  JSON.stringify(
    meetup,
    function replacer(key, value) {
      console.log(`${key}: ${value}`);
      return key == "occupiedBy" ? undefined : value;
    },
    "****"
  )
);
