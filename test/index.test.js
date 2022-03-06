import { Fibonacci, closureSum } from "../src/index";

describe("Fibonacci", function () {
  test("should return 1", function () {
    expect(Fibonacci(1)).toBe(1);
  });
  test("should return 1", function () {
    expect(Fibonacci(2)).toBe(1);
  });
  test("should return 2", function () {
    expect(Fibonacci(3)).toBe(2);
  });
  test("should return 3", function () {
    expect(Fibonacci(4)).toBe(3);
  });
  test("should return 5", function () {
    expect(Fibonacci(5)).toBe(5);
  });
  test("should return 21", function () {
    expect(Fibonacci(8)).toBe(21);
  });
  test("should return 5527939700884757", function () {
    expect(Fibonacci(77)).toBe(5527939700884757);
  });
});

describe("closureSum", function () {
  test("should return 3", function () {
    expect(closureSum(1)(2)).toBe(3);
  });
  test("should return 3", function () {
    expect(closureSum(5)(-2)).toBe(3);
  });
  test("should return 12", function () {
    expect(closureSum(10)(2)).toBe(12);
  });
});
