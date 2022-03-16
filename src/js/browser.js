"use strict";

// 事件
{
    window.addEventListener("DOMContentLoaded", (e) => {
        console.log("DOMContentLoaded");
    });
}

// new MouseEvent("click", { bubbles: false, cancelable: true });

// 宏任务和微任务
{
    let i = 0;

    let start = Date.now();

    function count1() {
        // 做繁重的任务的一部分 (*)
        do {
            i++;
        } while (i % 1e6 != 0);

        if (i == 1e9) {
            console.log("Done in " + (Date.now() - start) + "ms");
        } else {
            setTimeout(count1); // 安排（schedule）新的调用 (**)
        }
    }

    function count2() {
        // 将调度（scheduling）移动到开头
        if (i < 1e9 - 1e6) {
            setTimeout(count2); // 安排（schedule）新的调用
        }

        do {
            i++;
        } while (i % 1e6 != 0);

        if (i == 1e9) {
            console.log("Done in " + (Date.now() - start) + "ms");
        }
    }

    // count1(); // 7294
    // count2(); // 6323
}

// 进度
{
    let i = 0;

    function count() {
        // 做繁重的任务的一部分 (*)
        do {
            i++;
            document.body.innerHTML = i;
        } while (i % 1e3 != 0);

        if (i < 1e6) {
            setTimeout(count, 100);
        }
    }

    // count();
}

// 微任务，宏任务
{
    setTimeout(() => console.log("timeout"));

    Promise.resolve().then(() => console.log("promise"));

    console.log("code");

    window.onload = () => {
        console.log("loaded");
    };

    // code
    // promise
    // DOMContentLoaded
    // timeout
    // loaded
}
