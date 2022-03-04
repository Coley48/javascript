import { getMaxSubSum, getLastDayOfMonth } from "../src/index";

describe("getMaxSubSum", function () {
  test("should return 5", function () {
    expect(getMaxSubSum([-1, 2, 3, -9])).toBe(5);
  });
  test("should return 6", function () {
    expect(getMaxSubSum([2, -1, 2, 3, -9])).toBe(6);
  });
  test("should return 11", function () {
    expect(getMaxSubSum([-1, 2, 3, -9, 11])).toBe(11);
  });
  test("should return 3", function () {
    expect(getMaxSubSum([-2, -1, 1, 2])).toBe(3);
  });
  test("should return 100", function () {
    expect(getMaxSubSum([100, -9, 2, -3, 5])).toBe(100);
  });
  test("should return 6", function () {
    expect(getMaxSubSum([1, 2, 3])).toBe(6);
  });
  test("should return 0", function () {
    expect(getMaxSubSum([-1, -2, -3])).toBe(0);
  });
});

describe("getLastDayOfMonth", function () {
  test("should return 29", function () {
    expect(getLastDayOfMonth(2012, 1)).toBe(29);
  });
  test("should return 28", function () {
    expect(getLastDayOfMonth(2022, 1)).toBe(28);
  });
  test("should return 31", function () {
    expect(getLastDayOfMonth(2022, 0)).toBe(31);
  });
  test("should return 31", function () {
    expect(getLastDayOfMonth(2022, 11)).toBe(31);
  });
});
