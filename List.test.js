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

describe('List', () => {

    describe('List.push() into empty list', () => {
        
        const list = new List();
        const data = { prop: "value" };
        list.push(data);

        it('should push initial data into the list and increase list length to 1.', () => {
            assert.equal(list.length, 1);
        });

        it('List.head should be the correct data', () => {
            assert.equal(list.head.data, data);
        });

        it('List.tail should be the correct data', () => {
            assert.equal(list.tail.data, data);
        });

        it('List.prev and list.next should be undefined', () => {
            assert.equal(list.next, undefined);
            assert.equal(list.prev, undefined);            
        });

    });

    describe('List.push() into populated list, 2 items', () => {
        
        const list = new List();
        const data = { prop: "value" };
        const data2 = { prop: 222 };
        list.push(data);
        list.push(data2);        

        it('List.head should be the correct data', () => {
            assert.equal(list.head.data, data);
        });

        it('List.tail should be the correct data', () => {
            assert.equal(list.tail.data, data2);
        });

        it('head.next should equal tail, tail.prev should equal head', () => {
            assert.equal(list.head.next.data, list.tail.data);
            assert.equal(list.tail.prev.data, list.head.data);            
        });

    });

    describe('List.push() into populated list 2+ items', () => {

        const list = new List();
        const listLength = 19;
        var headData, tailData;
        for (let i = 0; i <= listLength; i++){
            let data = Math.random();
            if (i === 0) headData = data;
            if (i === listLength) tailData = data;
            list.push(data);
        }


        it('List.head should be the correct data', () => {
            assert.equal(list.head.data, headData);
        });

        it('List.tail should be the correct data', () => {
            assert.equal(list.tail.data, tailData);
        });

        it('List.length should be the specified length', () => {
            assert.equal(list.length, listLength + 1);
        });

    });

    describe('List.findIndex()', () => {

        var dataSample;        
        const list = new List();
        const listLength = 19;
        const targetIndex = listLength - 1;                
        for (let i = 0; i <= listLength; i++){
            let data = Math.random();
            if(i === targetIndex) dataSample = data;
            list.push(data);
        }

        it('should find the correct Index', () => {
            assert.equal(list.findIndex(dataSample), targetIndex);
        });

    });

});