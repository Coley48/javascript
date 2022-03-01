import { sayHi } from "../src/index";

describe("sayHi", function () {
  test("should return 'hello'", function () {
    expect(sayHi("")).toBe("hello");
  });
});
