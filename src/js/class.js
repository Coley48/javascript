"use strict";
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
    }

    class Rabbit extends Animal {
        constructor(name, earLength) {
            super();
            this.speed = 0;
            this.name = name;
            this.earLength = earLength;
        }
    }

    // 不工作！
    let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
}
{
    let animal = {
        name: "Animal",
        eat() {
            // animal.eat.[[HomeObject]] == animal
            console.warn(`${this.name} eats.`);
        },
        jump: function () {
            console.log(`${this.name} jump.`);
        }
    };

    let rabbit = {
        __proto__: animal,
        name: "Rabbit",
        eat() {
            // rabbit.eat.[[HomeObject]] == rabbit
            super.eat();
        },
        jump: function () {
            // super.jump(); // 'super' is only allowed in object methods and classes.
        }
    };

    let longEar = {
        __proto__: rabbit,
        name: "Long Ear",
        eat() {
            // longEar.eat.[[HomeObject]] == longEar
            super.eat();
        }
    };

    // 正确执行
    longEar.eat(); // Long Ear eats.
    // rabbit.jump();
}

// 类静态方法和属性的继承
{
    console.clear();

    class User {
        static #secret = 10;
        static staticProperty = 10;

        #whisper() {
            console.log(111);
        }

        static staticMethod() {
            console.log(this === User);
        }

        static get secret() {
            return this.#secret;
        }
    }
    User.staticMethod(); // true
    console.log(User.secret);
    // Property '#secret' is not accessible outside class 'User' because it has a private identifier
    // console.log(User.#secret);

    class VipUser extends User {}

    console.warn(VipUser.__proto__ === User); // true
    console.warn(VipUser.prototype.__proto__ === User.prototype); // true

    // Property '#whisper' is not accessible outside class 'User' because it has a private identifier.
    // new User().#whisper
}

// instanceof
{
    console.clear();
    class Rabbit {}
    let rabbit = new Rabbit();
    console.log(rabbit instanceof Rabbit); // true

    // 这里是构造函数，而不是 class
    function Rabbit1() {}
    console.log(new Rabbit1() instanceof Rabbit1); // true

    class Animal {
        static [Symbol.hasInstance](obj) {
            return true;
        }
    }

    console.log({} instanceof Animal); // true

    let user = {
        [Symbol.toStringTag]: "User"
    };

    console.log({}.toString.call(user)); // [object User]
}

// mixin
{
    console.clear();
    let sayHiBase = {
        say() {
            console.log(1);
        }
    };

    let sayHiMixin = {
        // 设置原型
        __proto__: sayHiBase,

        say() {
            super.say();
        },
        sayHi() {
            console.log(`Hello ${this.name}`);
        },
        sayBye() {
            alert(`Bye ${this.name}`);
        }
    };
    class Person {}
    class User extends Person {
        constructor(name) {
            super();
            this.name = name;
        }
    }

    // mixin
    Object.assign(User.prototype, sayHiMixin);
    new User("Coley").sayHi(); // coley
    new User("Hush").say(); // 1
}
