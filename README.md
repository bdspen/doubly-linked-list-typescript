# Doubly Linked List (TypeScript)

[![npm version](https://badge.fury.io/js/doubly-linked-list-typescript.svg)](https://badge.fury.io/js/doubly-linked-list-typescript) <!-- Add build status badge if you set up CI -->

A generic, type-safe Doubly Linked List data structure implementation in TypeScript.

## Features

*   **Type-Safe:** Uses TypeScript generics (`List<T>`) for strong type checking.
*   **Standard Operations:** Provides common list operations (`push`, `getData`, `removeByData`, `removeByIndex`, `findIndex`, `toArray`, `isEmpty`).
*   **Efficient:** Implements optimizations like searching from head or tail in `getData` and `removeByIndex`.
*   **Well-Tested:** Includes a comprehensive test suite.

## Installation

```bash
npm install doubly-linked-list-typescript
# or
yarn add doubly-linked-list-typescript
```

## Usage

```typescript
import { List } from 'doubly-linked-list-typescript';

// Create a list to store numbers
const numberList = new List<number>();

numberList.push(10);
numberList.push(20);
numberList.push(30);

console.log(numberList.toArray()); // Output: [10, 20, 30]
console.log(numberList.length); // Output: 3

// Create a list to store custom objects
interface User {
  id: number;
  name: string;
}

const userList = new List<User>();
userList.push({ id: 1, name: 'Alice' });
userList.push({ id: 2, name: 'Bob' });

console.log(userList.getData(0)); // Output: { id: 1, name: 'Alice' }

const removedUser = userList.removeByIndex(1); // Remove Bob
console.log(removedUser); // Output: { id: 2, name: 'Bob' }
console.log(userList.length); // Output: 1
```

## API

### `new List<T>()`

Creates a new empty list that can hold elements of type `T`.

### `list.length: number`

Returns the number of elements in the list. (Read-only)

### `list.head: Node<T> | null`

Returns the first node in the list, or `null` if the list is empty. (Read-only)

### `list.tail: Node<T> | null`

Returns the last node in the list, or `null` if the list is empty. (Read-only)

### `list.push(data: T): void`

Adds an element to the end (tail) of the list.

### `list.getData(index: number): T | null`

Returns the data of the element at the specified `index`. Returns `null` if the index is out of bounds. Optimized to search from the head or tail, whichever is closer (O(n)).

### `list.findIndex(data: T): number`

Searches for the first occurrence of the given `data` in the list and returns its index. Returns `-1` if the data is not found (O(n)). Uses strict equality (`===`) for comparison.

### `list.removeByIndex(index: number): T | null`

Removes the element at the specified `index` and returns its data. Returns `null` if the index is out of bounds. Optimized to search from the head or tail (O(n)).

### `list.removeByData(data: T): T | null`

Removes the first occurrence of the given `data` from the list and returns the removed data. Returns `null` if the data is not found (O(n)). Uses strict equality (`===`) for comparison.

### `list.toArray(): T[]`

Returns an array containing all the data elements in the list, in order from head to tail (O(n)).

### `list.isEmpty(): boolean`

Returns `true` if the list contains no elements, `false` otherwise (O(1)).

## Development

1.  **Clone the repository:**
    ```bash
    git clone <https://github.com/bdspen/doubly-linked-list-typescript>
    cd doubly-linked-list-typescript
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Build:** Compile TypeScript to JavaScript:
    ```bash
    npm run build
    ```
4.  **Lint:** Check for code style issues:
    ```bash
    npm run lint
    ```
5.  **Test:** Run the test suite:
    ```bash
    npm test
    ```
    (This runs tests on the compiled code in `dist/`)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[ISC](./LICENSE)
