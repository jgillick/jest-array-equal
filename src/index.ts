import 'jest';
import { printDiffOrStringify } from 'jest-matcher-utils';

/**
 * Jest array equality matchers.
 *
 * To install:
 * ```
 *  import 'jest';
 *  import { arrayMatchers } from 'jest-array-equal';
 *  expect.extend(arrayMatchers);
 * ```
 */
declare global {
  namespace jest {
    interface Matchers<R, T> {
      /**
       * Test if two arrays have the same values, regardless of array order.
       * @example
       * expect([1,2,4]).toEqualArray([2,4,1]); // Pass
       * expect([1,2,4]).toEqualArray([567]);   // Fail
       */
      toEqualArray(expected: any[]): R;

      /**
       * Test the equality of two arrays of objects by a particular property.
       *
       * This is useful if the object references might be different, but there's an ID property.
       *
       * @example
       * expect([{id:1, id:2}]).toEqualArrayBy('id', [{id:2, id:1}]); // Pass
       * expect([{id:1, id:2}]).toEqualArrayBy('id', [{id:3, id:1}]); // Fail
       */
      toEqualArrayBy(key: string, expected: Record<any, any>[]): R;
    }
  }
}

const printDiff = (expected: any, received: any) =>
  printDiffOrStringify(
    JSON.stringify(expected, null, ' '),
    JSON.stringify(received, null, ' '),
    'Expected',
    'Received',
    true
  );

const arrayTypeCheck = (received: any[], expected: any[]): { pass: boolean; error: string } => {
  let pass = true;
  let error = '';
  if (!Array.isArray(received)) {
    pass = false;
    error = `Received value is not an array: ${typeof received}`;
  } else if (!Array.isArray(expected)) {
    pass = false;
    error = `Expected value is not an array: ${typeof expected}`;
  }
  return { pass, error };
};

export const arrayMatchers = {
  toEqualArray(received: any[], expected: any[]): jest.CustomMatcherResult {
    let { pass, error } = arrayTypeCheck(received, expected);
    if (!pass) {
      return { pass, message: () => error };
    }

    // Same reference
    if (received === expected) {
      return { pass: true, message: () => error };
    }

    const receivedSorted = [...received].sort();
    const expectedSorted = [...expected].sort();
    const sameLength = received.length == expected.length;
    const areEqual = sameLength && receivedSorted.every((item, i) => expectedSorted[i] == item);

    if (!areEqual) {
      pass = false;
      error = printDiff(expectedSorted, receivedSorted);
    }

    return { pass, message: () => error };
  },

  toEqualArrayBy(received: any[], key: string, expected: any[]): jest.CustomMatcherResult {
    let { pass, error } = arrayTypeCheck(received, expected);
    if (!pass) {
      return { pass, message: () => error };
    }

    const getValue = (item: any) => {
      if (typeof item !== 'object') {
        return undefined;
      }
      return item[key];
    };

    // Same reference
    if (received === expected) {
      return { pass: true, message: () => error };
    }

    const receivedValues = received.map(getValue).sort();
    const expectedValues = expected.map(getValue).sort();
    const receivedFormatted = receivedValues.map((value) => `${key}: ${value}`);
    const expectedFormatted = expectedValues.map((value) => `${key}: ${value}`);

    const sameLength = received.length == expected.length;
    const areEqual = sameLength && receivedValues.every((item, i) => expectedValues[i] == item);

    if (!areEqual) {
      pass = false;
      error = printDiff(expectedFormatted, receivedFormatted);
    }

    return { pass, message: () => error };
  },
};
