const List = require("../src/List").List;
const assert = require('assert');
const TestList = require('./testList').TestList;

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

        const listLength = 2;
        const testList = new TestList(listLength, listLength - 1);

        it('List.head should be the correct data', () => {
            assert.equal(testList.list.head.data, testList.head.data);
        });

        it('List.tail should be the correct data', () => {
            assert.equal(testList.list.tail.data, testList.tail.data);
        });

        it('List.length should be the specified length', () => {
            assert.equal(testList.list.length, listLength);
        });

    });

    describe('List.findIndex()', () => {

        const listLength = 19;
        const testList = new TestList(listLength, listLength - 1);
        
        it('should return -1 from a null input', () => {
            assert.equal(testList.list.findIndex(null), -1);
        });

        it('should find the head as index 0', () => {
            const dataIndex = testList.list.findIndex(testList.list.head.data);
            assert.equal(dataIndex, 0);
        });

        it(`should find the tail as index list.length - 1 (${listLength - 1})`, () => {
            const dataIndex = testList.list.findIndex(testList.list.tail.data);
            assert.equal(dataIndex, listLength - 1);
        });

        it('should find the correct Index', () => {
            const dataIndex = testList.list.findIndex(testList.dataSample);
            assert.equal(dataIndex, listLength - 1);
        });

    });

    describe('List.removeByData()', () => {
        const listLength = 19;
        const testList = new TestList(listLength, listLength - 1);

        it('should return from a null input', () => {
            assert.equal(testList.list.removeByData(null), null);
            assert.equal(testList.list.length, listLength);
        });

        it('should remove the correct data', () => {
            testList.list.removeByData(testList.dataSample);
            const foundIndex = testList.list.findIndex(testList.dataSample);
            assert.equal(foundIndex, -1);
        });

        it('should retain all data but the data removed', () => {
            const retainedData = testList.asArray.filter((node, i) => testList.list.getData(i) === node);
            assert.equal(retainedData[testList.list.length], undefined);
        });

        it('should decrease the list length', () => {
            assert.equal(testList.list.length, listLength - 1);
        });

    });

    describe('List.isEmpty(): true', () => {
        var listLength = 0;
        var testList = new TestList(listLength, listLength - 1);

        it('should return true from an empty list', () => {
            assert.equal(testList.list.isEmpty(), true);
        });
    });

    describe('List.isEmpty(): false', () => {
        listLength = 5;
        testList = new TestList(listLength);
    
        it('should return false from a populated list', () => {
            assert.equal(testList.list.isEmpty(), false);
        });
    });

    describe('List.toArray()', () => {
        listLength = 5;
        testList = new TestList(listLength);
    
        it('should return an array', () => {
            const array = testList.list.toArray();
            assert.equal(Array.isArray(array), true);
        });

        it('should retain the data from the linked list in the correct positions', () => {
            const array = testList.list.toArray();
            const dataRetained = array.filter((data, i) => {
                return data === testList.list.getData(i);
            }).length === listLength;
                
            assert.equal(dataRetained, true);
        });
    });

});