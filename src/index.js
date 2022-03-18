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
