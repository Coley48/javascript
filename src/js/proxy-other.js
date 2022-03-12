"use strict";

// proxy
{
    let target = {};
    let proxy = new Proxy(target, {}); // 空的 handler 对象

    proxy.test = 5; // 写入 proxy 对象 (1)
    console.log(target.test); // 5，test 属性出现在了 target 中！

    console.log(proxy.test); // 5，我们也可以从 proxy 对象读取它 (2)
    target.name = "target";

    console.warn(Object.keys(target));
}

// get handler
{
    console.clear();

    let numbers = [0, 1, 2];

    numbers = new Proxy(numbers, {
        get(target, prop) {
            // target.hasOwnProperty(prop)
            if (prop in target) {
                return target[prop];
            } else {
                return 0; // 默认值
            }
        }
    });

    console.log(numbers[1]); // 1
    console.log(numbers[123]); // 0（没有这个数组项）
    console.log(numbers.length);

    let obj = { n: 1234 };
    let objProxy = new Proxy(obj, {});
    console.log(objProxy);
    // 'delete' cannot be called on an identifier in strict mode
    // delete obj;
    delete obj.n;
    // setTimeout(() => {
    //     console.log(objProxy); // Proxy {}
    // }, 1000);
}

// set handler
{
    console.clear();

    let onlyNumbers = [];

    onlyNumbers = new Proxy(onlyNumbers, {
        set(target, prop, val) {
            // 拦截写入属性操作
            if (typeof val == "number") {
                target[prop] = val;
                return true;
            } else {
                return false;
            }
        }
    });

    onlyNumbers.push(1); // 添加成功
    onlyNumbers.push(2); // 添加成功
    console.log("Length is: " + onlyNumbers.length); // 2

    // TypeError: 'set' on proxy: trap returned falsish for property '2
    // onlyNumbers.push("test");

    let newArr = onlyNumbers.concat([3, 4, 5]);
    onlyNumbers.splice(0, 1);
    console.log(onlyNumbers, newArr); // Proxy {0: 2} [1, 2, 3, 4, 5]
}

// ownKeys getOwnPropertyDescriptor

{
    console.clear();
    let user = { name: "Coley", age: 18 };

    user = new Proxy(user, {
        ownKeys(target) {
            // 一旦要获取属性列表就会被调用
            return ["a", "b", "c"]; // 需要可枚举标志设为 true
        },

        getOwnPropertyDescriptor(target, prop) {
            // 被每个属性调用
            return {
                enumerable: true, // false 屏蔽，使属性不可迭代
                configurable: true
                /* ...其他标志，可能是 "value:..." */
            };
        }
    });

    console.log(Object.keys(user)); // a, b, c
}

// deleteProperty
{
    console.clear();

    let user = {
        name: "John",
        _password: "***",
        checkPassword(value) {
            //对象方法必须能读取 _password
            return value === this._password;
        }
    };

    user = new Proxy(user, {
        get(target, prop) {
            if (prop.startsWith("_")) {
                throw new Error("Access denied");
            }
            let value = target[prop];
            // 内部方法可以读取内部属性
            return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop, val) {
            // 拦截属性写入
            if (prop.startsWith("_")) {
                throw new Error("Access denied");
            } else {
                target[prop] = val;
                return true;
            }
        },
        deleteProperty(target, prop) {
            // 拦截属性删除
            if (prop.startsWith("_")) {
                throw new Error("Access denied");
            } else {
                delete target[prop];
                return true;
            }
        },
        ownKeys(target) {
            // 拦截读取属性列表
            return Object.keys(target).filter((key) => !key.startsWith("_"));
        }
    });

    // "get" 不允许读取 _password
    try {
        console.log(user._password); // Error: Access denied
    } catch (e) {
        console.log(e.message);
    }

    // "set" 不允许写入 _password
    try {
        user._password = "test"; // Error: Access denied
    } catch (e) {
        console.log(e.message);
    }

    // "deleteProperty" 不允许删除 _password
    try {
        delete user._password; // Error: Access denied
    } catch (e) {
        console.log(e.message);
    }

    // "ownKeys" 将 _password 过滤出去
    for (let key in user) console.log(key); // name
}

// has handler
{
    console.clear();

    let range = {
        start: 1,
        end: 10
    };

    range = new Proxy(range, {
        has(target, prop) {
            return prop >= target.start && prop <= target.end;
        }
    });

    console.log(5 in range); // true
    console.log(50 in range); // false
}

// apply handler
{
    console.clear();

    function delay(f, ms) {
        return new Proxy(f, {
            apply(target, thisArg, args) {
                setTimeout(() => target.apply(thisArg, args), ms);
            }
        });
    }

    function sayHi(user) {
        console.log(`Hello, ${user}!`);
    }

    sayHi = delay(sayHi, 3000);

    console.log(sayHi.length); // 1 (*) proxy 将“获取 length”的操作转发给目标对象

    sayHi("John"); // Hello, John!（3 秒后）
}

// reflect
{
    console.clear();

    let user = { age: 0 };

    Reflect.set(user, "name", "John");

    console.log(user.name); // John

    Reflect.deleteProperty(user, "no-such-prop");
    Reflect.deleteProperty(user, "name");

    console.log(user); // {}

    user = new Proxy(user, {
        get(target, prop, receiver) {
            console.warn(`GET ${prop}`);
            return Reflect.get(target, prop, receiver); // (1)
        },
        set(target, prop, val, receiver) {
            console.warn(`SET ${prop}=${val}`);
            return Reflect.set(target, prop, val, receiver); // (2)
        }
    });

    let name = user.name; // 显示 "GET name"
    user.name = "Pete"; // 显示 "SET name=Pete"
}

// receiver
{
    let user = {
        _name: "Guest",
        get name() {
            return this._name;
        },
        set name(value) {
            // RangeError: Maximum call stack size exceeded
            // this.name = value;
            this._name = value;
        },
        sayHi() {
            return this._name;
        }
    };

    let userProxy = new Proxy(user, {
        get(target, prop, receiver) {
            // receiver = admin
            if (prop == "__proto__") {
                return null;
            }

            // 无线循环
            // console.log(receiver);
            // console.log(this);
            console.log(target, prop);
            return target[prop];
            // return Reflect.get(target, prop, receiver); // (*)
            // 或者 return Reflect.get(...arguments);
        },
        set(target, prop, val, receiver) {
            console.log("set", target, prop);
            target[prop] = val;
            return true;
        }
    });

    // 代理无法作为原型对象？透明指向了 Object
    // 因为访问 __proto__ 属性也被代理了；
    let admin = {
        __proto__: userProxy,
        // __proto__: user,
        _name: "Admin"
    };

    // getter 和函数存在差异
    console.log(admin.name); // Guest
    // console.log(admin.sayHi()); // Admin

    // __proto__: userProxy,
    // console.log(admin.__proto__); // Object
    // __proto__: user,
    // console.log(admin.__proto__); // user

    // console.log(userProxy.__proto__); // Object / null

    // admin.name = "no-name";
    // console.log(admin);
    // console.log(user);
}

// 内建对象代理
{
    console.clear();

    let map = new Map();

    let proxy = new Proxy(map, {
        get(target, prop, receiver) {
            let value = Reflect.get(...arguments);
            return typeof value == "function" ? value.bind(target) : value;
        }
    });

    // TypeError: Method Map.prototype.set called on incompatible receiver
    proxy.set("test", 1); // Error
}

// 数组负索引
{
    console.clear();

    let arr = [..."abcde"];

    arr = new Proxy(arr, {
        get(target, prop, receiver) {
            // if (isFinite(prop)) {
            //     let index = Number(prop);
            //     return index < 0 ? target[target.length + index] : target[index];
            // }
            if (prop < 0) {
                prop = +prop + target.length;
            }
            return Reflect.get(target, prop, receiver);
        }
    });

    console.log(arr);
    console.log(arr[1]);
    console.log(arr[-1]);
}

// eval
{
    console.clear();

    console.log(eval("this"));
    eval("console.log(this); let x = 10;");
    // console.log(x); // ReferenceError: x is not defined
}

// currying
{
    // 高级柯里化实现
    function curry(func) {
        return function curried(...args) {
            // console.log(args.length, func.length); // 1-3 2-3 3-3
            if (args.length >= func.length) {
                return func.apply(this, args);
            } else {
                return function (...args2) {
                    return curried.apply(this, args.concat(args2));
                };
            }
        };
    }

    function sum(a, b, c) {
        return a + b + c;
    }
    let curriedSum = curry(sum);

    // console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
    // console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
    console.log(curriedSum(1)(2)(3)); // 6，全柯里化
}
