// !(function (a) {
//     console.log(typeof a); // function
//     function a() {}
//     var a = "";
// })(500);

console.log("start");

setTimeout(() => {
    console.log("setTimeout");
}, 0);

new Promise((resolve, reject) => {
    console.log("promise.");
    resolve();
}).then((res) => {
    console.log("promise.then", res);
});

Promise.resolve().then(() => {
    console.log("Promise.resolve");
});

async function A1() {
    console.log("a1...1");
    await A2();
    console.log("a1...2");
}

async function A2() {
    console.log("a2");
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
            console.log("a2.setTimeout");
        }, 0);
    }).then((res) => {
        console.log("a2.then", res);
    });
    console.log("a2...2");
}

A1();

console.log("end");
