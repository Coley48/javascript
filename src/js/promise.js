"use strict";

// try...catch
{
    function func() {
        try {
            console.log("try.");
            return;
        } catch (error) {
            console.error("catch");
        } finally {
            console.warn("finally.");
        }
    }

    func();
}

// promise
{
    console.clear();

    new Promise(function (resolve, reject) {
        // executor
        setTimeout(() => {
            resolve("Done.");
            reject(new Error("Whoops!"));
        }, 0);
    })
        .then(
            (result) => {
                console.log(result); // Done.
                throw new Error("Unexpected error.");
            },
            (error) => {
                console.warn(error); // Whoops!
            }
        )
        .catch((err) => {
            // 可以接收之前 .then 中的错误
            console.warn(err);
        })
        .finally(() => {
            console.log("Finished.");
        });

    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(1), 0);
    })
        .then(function (result) {
            // console.warn(this); // undefined
            console.log(result); // 1
            return new Promise((resolve, reject) => {
                // (*)
                setTimeout(() => resolve(result * 2), 0);
            });
        })
        .then(function (result) {
            // (**)
            console.log(result); // 2
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(result * 2), 0);
            });
        })
        .then(function (result) {
            console.log(result); // 4
        });
}

// unhandledrejection 事件
{
    window.addEventListener("unhandledrejection", function (event) {
        // 这个事件对象有两个特殊的属性：
        console.warn(event.promise); // [object Promise] - 生成该全局 error 的 promise
        console.warn(event.reason); // Error: Whoops! - 未处理的 error 对象
    });

    // new Promise(function () {
    //     throw new Error("Whoops!");
    //     console.log(0);
    // }); // 没有用来处理 error 的 catch

    // try {
    //     throw new Error(1);
    // } finally {
    //     console.log(2);
    // }

    console.log(3);

    new Promise(function (resolve, reject) {
        setTimeout(() => {
            // reject(new Error("No"));
            // throw new Error("Whoops!");
        }, 2000);
    }).catch(console.warn);
}

// Promise api
{
    Promise.all([
        new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
        new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
        new Promise((resolve) => setTimeout(() => resolve(3), 1000)) // 3
    ]).then((value) => {
        console.log(value);
    }); // 1,2,3 当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
}

// async
{
    async function f() {
        return 1;
    }

    f().then(console.warn); // 1
}

// Module parse failed: The top-level-await experiment is not enabled
// (set experiments.topLevelAwait: true to enabled it)
// let result = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.clear();
//         resolve("result");
//     }, 2000);
// });

// console.log(result);

{
    class Thenable {
        constructor(num) {
            this.num = num;
        }
        then(resolve, reject) {
            console.warn(resolve);
            // 1000ms 后使用 this.num*2 进行 resolve
            setTimeout(() => resolve(this.num * 2), 1000); // (*)
        }
    }

    async function f() {
        // 等待 1 秒，之后 result 变为 2
        let result = await new Thenable(1);
        console.warn(result);
    }

    f();
}
