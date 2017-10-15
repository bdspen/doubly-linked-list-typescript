# doubly-linked-list-typescript

>A [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) written in [typescript](https://www.typescriptlang.org/)

## Usage

To install the package run:

```bash
npm install doubly-linked-list-typescript
```
Then, to instantiate a new list in your project:
```js
const List = require('doubly-linked-list-typescript').List;
const list = new List();
```

### Push
Add an item to the end of the list.
```js
list.push({ property: "value" });
```

### Find Index
Returns the index in the list where the input data resides.
```js
list.findIndex({ property: "value" });
//returns 0
```

### Get Data at an Index
Returns data from the node at the specified index.
```js
list.getData(0);
// returns { property: "value" }
```

### Remove Item By Index
Removes the item in the list when given an index.
```js
list.removeByIndex(0);
```

### Remove Item by Data
Removes the item in the list when given data.
```js
list.removeByData({ property: "value" });
```

### To Array
```js
list.toArray();
// transforms list to array type: [ { property: "value" } ]
```

### Is Empty
Returns true if the list is empty, false if not
```js
const list = new List();
list.isEmpty(); // true

list.push({ property: "value" });

list.isEmpty(); // false
```

## To Do
* benchmark and optimize performance
