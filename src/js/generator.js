"use strict";

// generator
{
    function* generateSequence() {
        yield 1;
        yield 2;
        return 3;
    }

    console.log(generateSequence());
    let generator = generateSequence();

    let one = generator.next();
    let two = generator.next();
    let three = generator.next();

    console.log(one, two, three);
}

// 迭代 generator
{
    function* generateSequence() {
        yield 1;
        yield 2;
        yield 3;
    }

    let generator = generateSequence();

    for (let value of generator) {
        console.warn(value); // 1，然后是 2，然后是 3
    }

    let sequence = [0, ...generateSequence()];
    console.warn(sequence); // 0, 1, 2, 3
}

// yeild*
{
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }

    function* generatePasswordCodes() {
        // 0..9
        yield* generateSequence(48, 57);

        // A..Z
        yield* generateSequence(65, 90);

        // a..z
        yield* generateSequence(97, 122);
    }

    let str = "";

    for (let code of generatePasswordCodes()) {
        str += String.fromCharCode(code);
    }

    // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
    console.warn(str);
}

// yeild 传参
{
    function* gen() {
        // 向外部代码传递一个问题并等待答案
        let result = yield "2 + 2 = ?"; // (*)

        console.warn(result);
    }

    let generator = gen();

    let question = generator.next().value; // <-- yield 返回的 value

    // generator.next(4); // --> 将结果传递到 generator 中
    // generator.throw(new Error("The answer is not found in my database"));
    let result = generator.return("foo");
    console.log(result); // { value: "foo", done: true }
}

// 异步 generator
{
    async function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) {
            // 哇，可以使用 await 了！
            await new Promise((resolve) => setTimeout(resolve, 100));

            yield i;
        }
    }

    (async () => {
        let generator = generateSequence(1, 5);
        for await (let value of generator) {
            console.warn(value); // 1，然后 2，然后 3，然后 4，然后 5（在每个 console.warn 之间有延迟）
        }
    })();
}
