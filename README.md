# Jest Array Equal Matchers

A couple straightforward jest array equality matchers.

```js
expect([1, 2, 4]).toEqualArray([2, 4, 1]); // Pass
expect([1, 2, 4, 5]).toEqualArray([2, 4, 1]); // Fail
```

## Install

npm

```bash
npm install -D jest-array-equal
```

Yarn

```bash
npm add -D jest-array-equal
```

In any test file, or the global jest setup file:

```js
import { arrayMatchers } from "jest-array-equal";
expect.extend(arrayMatchers);
```

## Usage

The matcher will be true if the arrays have the exact same contents, regardless of order.

```js
expect([1, 2, 4]).toEqualArray([2, 4, 1]); // Pass
expect([1, 2, 4, 5]).toEqualArray([2, 4, 1]); // Fail
```

## Array of objects

If you want to match arrays of objects by a particular property value:

```js
expect([{ id: 1, id: 2 }]).toEqualArrayBy("id", [{ id: 2, id: 1 }]); // Pass
expect([{ id: 1, id: 2 }]).toEqualArrayBy("id", [{ id: 1, id: 3 }]); // Fail
```
