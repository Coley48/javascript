"use strict";

// 需要在不同页面下触发
window.localStorage.setItem("test", "1234");
// storage 事件
window.onstorage = (e) => {
    console.warn(e);
};
window.localStorage.setItem("test", "abc");

// 影子 DOM
{
    // customElements.define(
    //     "show-hello",
    //     class extends HTMLElement {
    //         connectedCallback() {
    //             const shadow = this.attachShadow({ mode: "open" });
    //             shadow.innerHTML = `<p>
    //         Hello, ${this.getAttribute("name")}
    //       </p>`;
    //         }
    //     }
    // );

    let hello = document.createElement("show-hello");
    hello.setAttribute("name", "Coley48");
    document.body.append(hello);

    console.log(hello.shadowRoot);
    // closed: null
    // open: #shadow-root
}

{
    let shadow = document.body.attachShadow({ mode: "closed" });
    shadow.innerHTML = "<h3>Hello, shadow DOM.</h3>";
}

// 自定义 css 属性
{
    // .custom {
    //     --custom-property: lightblue;
    // }
    // .light-blue {
    //     background: var(--custom-property, lightgray);
    // }
}

// 正则表达式
{
    // let reg = /".+"/g;
    // 懒惰模式
    let reg = /".+?"/g;

    let str = 'a "witch" and her "broom" is one';

    console.log(str.match(reg)); // "witch" and her "broom"

    // /([0-9a-f]{2}:){5}([0-9a-f]{2})/i.test('01:32:54:67:89:AB')
    // "color: #3f3; background-color: #AA00ef; and: #abcd".match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/ig)
    // let numbers = "-1.5 0 2 -123.4.".match(/(-?[^\D]+?(\.\d+?\b)?)/g);
    let numbers = "-1.5 0 2 -123.4.".match(/-?\d+(\.\d+)?/g);
    console.warn(numbers);

    str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';
    let result = str.match(/"(\\.|[^"\\])*"/g); //  ['"test me"', '"Say \\"', '"!"', '"\\\\ \\"']
    console.log(result);

    // /<style(>|\s.*?>)/g;
    let tag = '<style> <styler> <style test="...">'.match(/<style(\s[^>]+)?>/g);
    console.log(tag);
}

{
    // let regexp = /^(\w+\s?)*$/;
    // let str = "An input string that takes a long time or even makes this regexp to hang!";
    // // 会耗费大量时间
    // console.log(regexp.test(str));
}

// reg.test
{
    let regexp = /javascript/g; // （新建 regexp：regexp.lastIndex=0)

    console.log(regexp.test("javascript")); // true（现在 regexp.lastIndex=10）
    console.log(regexp.test("javascript")); // false
}

{
    // console.clear();
    // requestAnimationFrame(function fn() {
    //     console.log(this);
    //     requestAnimationFrame(fn);
    // });
}

// ..., Object.assign 拷贝对象
{
    console.clear();

    let sym = Symbol("name");
    console.log(sym.toString());

    let outObj = {
        [sym]: "Coley",
        [Symbol.toPrimitive]() {
            return "abc";
        },
        inObj: { a: 1, b: 2 }
    };
    let newObj = { ...outObj };
    let newObj2 = Object.assign({}, outObj);
    outObj.inObj.a = 10;
    console.log(newObj); // {inObj: {a: 2, b: 2}}
    console.log(newObj2); // {inObj: {a: 2, b: 2}}
}

{
    console.clear();

    function fn() {
        console.dir(arguments);
        console.log([...arguments]);
    }

    fn(1, 2, 3);
}

// escape encodeURI encodeComponentURI
{
    var set1 = ";,/?:@&=+$"; // 保留字符
    var set2 = "-_.!~*'()"; // 不转义字符
    var set3 = "#"; // 数字标志
    var set4 = "ABC abc 123"; // 字母数字字符和空格

    console.warn(encodeURI(set1)); // ;,/?:@&=+$
    console.warn(encodeURI(set2)); // -_.!~*'()
    console.warn(encodeURI(set3)); // #
    console.warn(encodeURI(set4)); // ABC%20abc%20123 (空格被编码为 %20)

    console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
    console.log(encodeURIComponent(set2)); // -_.!~*'()
    console.log(encodeURIComponent(set3)); // %23
    console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)
}

// setInterval setTimeout requestAnimationFrame
{
    // let start = Date.now();
    // let time = [];
    // let timer;
    // let status = 3;
    // function fn() {
    //     let now = Date.now();
    //     time.push(now - start);
    //     start = now;
    //     if (status == 2) {
    //         timer = setTimeout(() => {
    //             fn();
    //         });
    //     } else if (status == 3) {
    //         timer = requestAnimationFrame(fn);
    //     }
    // }
    // if (status == 1) {
    //     timer = setInterval(() => {
    //         fn();
    //     }, 0);
    // }
    // fn();
    // setTimeout(() => {
    //     if (status == 1) {
    //         clearInterval(timer);
    //     } else if (status == 2) {
    //         clearTimeout(timer);
    //     } else {
    //         cancelAnimationFrame(timer);
    //     }
    //     console.log(time);
    // }, 100);
}

{
    // console.clear();
    // function f() {
    //     var some = [];
    //     while (some.length < 1e6) {
    //         some.push(some.length);
    //     }
    //     // function unused() {
    //     //     some;
    //     // } // 注释此行后内存不会增长
    //     return function used() {};
    // }
    // var a = [];
    // var interval = setInterval(function () {
    //     var len = a.push(f());
    //     if (len >= 500) {
    //         clearInterval(interval);
    //     }
    //     document.body.innerHTML = len + " / 500";
    // }, 10);
    // console.log(a);
}
