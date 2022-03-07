"use strict";

// 通过 __proto__ 属性指定原型，并进行相应操作
{
  let user = {
    name: "John",
    surname: "Smith",

    // set fullName(value) {
    //   [this.name, this.surname] = value.split(" ");
    // },

    get fullName() {
      // return `${this.name} ${this.surname}`;
      return "aaa";
    },
  };

  let admin = {
    __proto__: user,
    isAdmin: true,
  };

  console.log(admin.fullName); // John Smith (*)

  // setter triggers!
  // admin.fullName = "Alice Cooper"; // (**)
  // admin.name = "Coley48";
  delete admin.fullName;
  console.log(admin.fullName, user.fullName);

  delete admin.fullName;
  console.log(admin.fullName, user.fullName);

  // console.log(admin.fullName); // Alice Cooper，admin 的内容被修改了
  // console.log(user.fullName); // John Smith，user 的内容被保护了
  // delete user.fullName;

  console.log(user);
  console.log(admin);

  // 数据比较
  // for (const key in admin) {
  //   console.log(key); // isAdmin, surname, name, fullName
  //   if (Object.hasOwnProperty.call(admin, key)) {
  //     console.warn(key); // isAdmin, surname
  //   }
  // }

  // console.log(Object.keys(admin));

  Object.getOwnPropertyDescriptors(Object.prototype);
  console.clear();
}

// 任务删除属性案例
{
  let animal = {
    jumps: 1,
  };
  let rabbit = {
    __proto__: animal,
    jumps: "...",
  };

  // console.log(rabbit, animal);
  console.warn(rabbit.jumps, animal.jumps);

  delete rabbit.jumps;
  console.warn(rabbit.jumps, animal.jumps);

  delete rabbit.jumps;
  console.warn(rabbit.jumps, animal.jumps);

  // console.log(rabbit.jumps, animal);
  // console.log(rabbit, animal);
}

// 操作原型属性
{
  let animal = {
    jumps: 1,
    sleep: true,
  };
  let rabbit = {
    __proto__: animal,
    // prototype: animal, // 只是普通属性，无法正确指向原型链
    jumps: "...",
  };

  function Cat() {
    this.jumps = "cat jumps";
  }
  Cat.prototype = animal;

  let cat = new Cat();
  console.log(cat, cat.sleep); // true

  // 原型链更新，此后创建的对象指向新的原型
  // Cat.prototype = rabbit;
  // console.log(new Cat());
}

// 默认构造器
{
  function F() {}

  // 默认构造器指向自身
  console.warn(F.prototype);
  console.warn(F.prototype.constructor === F); // true
  console.warn(F.prototype.constructor.name); // F

  let f = new F();
  let ff = new f.constructor();

  console.log(f, ff);

  console.clear();
}

// 函数内指定原型测试
{
  let animal = {
    jumps: 1,
    sleep: true,
  };
  let rabbit = {
    __proto__: animal,
    // prototype: animal, // 只是普通属性，无法正确指向原型链
    jumps: "...",
  };

  function Cat() {
    this.jumps = "cat jumps";
    Cat.prototype = animal; // 放在函数中，只有第二次才能确定原型
  }

  let cat = new Cat();
  console.log(cat, cat.sleep); // undefined

  let cat2 = new Cat();
  console.log(cat2, cat2.sleep); // true
  console.clear();
}

// prototype
{
  let obj = {};

  console.log(obj.__proto__ === Object.prototype); // true
  console.log(obj.toString === obj.__proto__.toString); //true
  console.log(obj.toString === Object.prototype.toString); //true
}

// 原型方法 defer
{
  Function.prototype.defer = function (ms) {
    setTimeout(this, ms);
  };

  function f() {
    console.log("Hello!");
  }

  f.defer(1000); // shows "Hello!" after 1 sec
}

// defer 装饰器
{
  Function.prototype.defer = function (ms) {
    let context = this;

    function func() {
      console.log(this, arguments); // undefined [1, 2]
      // 验证 arguments 是可迭代对象
      console.log(arguments[Symbol.iterator]);
      console.warn(...arguments); // 1 2
      setTimeout(() => {
        context.apply(this, arguments);
      }, ms);
    }

    return func;

    // return (...args) => {
    //   setTimeout(this.apply(this, args), ms);
    // };
  };

  function f(a, b) {
    console.log(a + b);
  }

  f.defer(1000)(1, 2); // 1 秒后显示 3
}

// 克隆比较
{
  function getPrototype(obj) {
    if (obj.__proto__) {
      return (
        obj.__proto__?.constructor.name + " " + getPrototype(obj.__proto__)
      );
    } else {
      return "null <<<=============================================";
    }
  }

  let parent = {
    name: "parent",
    age: "48",
    get money() {
      return 0;
    },
  };
  let child = {
    name: "child",
    age: "18",
    // 影响 clone1
    // [Symbol.toPrimitive]() {
    //   return this.name + this.age;
    // },
    toString() {
      return this.name;
    },
    // get money() {
    //   return 10;
    // },
    __proto__: parent,
  };
  Object.defineProperty(child, "sex", {
    value: "male",
  });

  // 对象标志感知克隆
  let clone1 = Object.defineProperties(
    {},
    Object.getOwnPropertyDescriptors(child)
  );
  let clone2 = Object.create(
    Object.getPrototypeOf(child),
    Object.getOwnPropertyDescriptors(child)
  );

  console.log(Object.getOwnPropertyDescriptors(child));
  console.log(Object.getOwnPropertyDescriptors(clone1));
  console.log(Object.getOwnPropertyDescriptors(clone2));

  console.warn(child.__proto__);
  console.error(clone1.__proto__);
  console.info(clone2.__proto__);

  console.log(child.money); // 0
  console.log(clone1.money); // undefined
  console.log(clone2.money); // 0

  console.log(getPrototype(child)); // Object Object null
  console.log(getPrototype(clone1)); // Object null
  console.log(getPrototype(clone2)); // Object Object null
}

// prototype 忽略对象外的其他值
{
  let obj = {};
  console.warn(obj.__proto__); // Object

  obj.__proto__ = "";
  console.warn(obj.__proto__); // Object

  obj.__proto__ = null;
  console.warn(obj.__proto__); // undefined
}
