const List = require("./List").List;
const assert = require('assert');

/*

1.should be able to instantiate a list
2.should be able to add an item to a list
3. should be able to remove an item from the list
4. should be able to add multiple items to the list
5. length should increase as list grows in size
6. length should decrease as list shrinks in size
7. should be able to find an item by index in list

*/

describe('List', function () {

    describe('List.push()', function () {
        
        const list = new List();
        const data = { prop: "value" };
        list.push(data);

        it('should push data into the list and increase list length to 1.', function () {
            assert.equal(list.length, 1);
        });

        it('List.head should be the correct data', function () {
            assert.equal(list.head.data, data);
        });

        it('List.tail should be the correct data', function () {
            assert.equal(list.tail.data, data);
        });

        it('List.prev and list.next should be undefined', function () {
            assert.equal(list.next, undefined);
            assert.equal(list.prev, undefined);            
        });

    });

});