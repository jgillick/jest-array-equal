import "jest";
import { arrayMatchers } from "./";

expect.extend(arrayMatchers);

describe("arrayMatchers", () => {
  describe("toEqualArray", () => {
    test("array equals array", () => {
      const { pass } = arrayMatchers.toEqualArray([1, 2, 3], [1, 2, 3]);
      expect(pass).toBe(true);
    });

    test("arrays in different order", () => {
      const { pass } = arrayMatchers.toEqualArray([1, 2, 3], [2, 3, 1]);
      expect(pass).toBe(true);
    });

    test("same reference", () => {
      const arr = [1, 2, 3];
      const { pass } = arrayMatchers.toEqualArray(arr, arr);
      expect(pass).toBe(true);
    });

    test("expected has additional item", () => {
      const { pass } = arrayMatchers.toEqualArray([1, 2, 3], [2, 3, 1, 4]);
      expect(pass).toBe(false);
    });

    test("received has additional item", () => {
      const { pass } = arrayMatchers.toEqualArray([1, 2, 3, 4], [2, 3, 1]);
      expect(pass).toBe(false);
    });

    test("entirely different values", () => {
      const { pass } = arrayMatchers.toEqualArray([1, 2, 3], [4, 5, 6]);
      expect(pass).toBe(false);
    });

    test("received is not an array", () => {
      const { pass } = arrayMatchers.toEqualArray({} as Array<any>, [2, 3, 1]);
      expect(pass).toBe(false);
    });

    test("expected is not an array", () => {
      const { pass } = arrayMatchers.toEqualArray([2, 3, 1], {} as Array<any>);
      expect(pass).toBe(false);
    });
  });

  describe("toEqualArrayBy", () => {
    test("array equals array", () => {
      const { pass } = arrayMatchers.toEqualArrayBy(
        [{ id: 1 }, { id: 2 }],
        "id",
        [{ id: 1 }, { id: 2 }]
      );
      expect(pass).toBe(true);
    });

    test("arrays in different order", () => {
      const { pass } = arrayMatchers.toEqualArrayBy(
        [{ id: 1 }, { id: 2 }],
        "id",
        [{ id: 2 }, { id: 1 }]
      );
      expect(pass).toBe(true);
    });

    test("same reference", () => {
      const arr = [{ id: 1 }, { id: 2 }];
      const { pass } = arrayMatchers.toEqualArrayBy(arr, "id", arr);
      expect(pass).toBe(true);
    });

    test("expected has additional item", () => {
      const { pass } = arrayMatchers.toEqualArrayBy(
        [{ id: 1 }, { id: 2 }],
        "id",
        [{ id: 1 }, { id: 2 }, { id: 3 }]
      );
      expect(pass).toBe(false);
    });

    test("received has additional item", () => {
      const { pass } = arrayMatchers.toEqualArrayBy(
        [{ id: 1 }, { id: 2 }, { id: 3 }],
        "id",
        [{ id: 1 }, { id: 2 }]
      );
      expect(pass).toBe(false);
    });

    test("entirely different values", () => {
      const { pass } = arrayMatchers.toEqualArrayBy(
        [{ id: 1 }, { id: 2 }],
        "id",
        [{ id: 3 }, { id: 4 }]
      );
      expect(pass).toBe(false);
    });

    test("received is not an array", () => {
      const { pass } = arrayMatchers.toEqualArrayBy({} as Array<any>, "id", [
        { id: 3 },
        { id: 4 },
      ]);
      expect(pass).toBe(false);
    });

    test("expected is not an array", () => {
      const { pass } = arrayMatchers.toEqualArrayBy(
        [{ id: 3 }, { id: 4 }],
        "id",
        {} as Array<any>
      );
      expect(pass).toBe(false);
    });
  });
});
