import { List } from '../src/List'; // Import generic List
import { Node } from '../src/Node'; // Import generic Node
import * as assert from 'assert'; // Use import * as assert
import { TestList } from './testList'; // Import generic TestList

// Example data types for testing
type TestData = { prop: string | number };
const createTestData = (val: string | number): TestData => ({ prop: val });
const createRandomNumber = (): number => Math.random();

describe('List<T>', () => {

    describe('List.push() into empty list', () => {
        const list = new List<TestData>(); // Specify type
        const data = createTestData("value");
        list.push(data);

        it('should increase list length to 1.', () => {
            assert.strictEqual(list.length, 1);
        });

        it('List.head should contain the correct data', () => {
            // Head/Tail can be null, check first
            assert.ok(list.head, 'Head should not be null');
            assert.strictEqual(list.head.data, data);
        });

        it('List.tail should contain the correct data', () => {
            assert.ok(list.tail, 'Tail should not be null');
            assert.strictEqual(list.tail.data, data);
        });

        it('Head and Tail should be the same node', () => {
            assert.strictEqual(list.head, list.tail);
        });

        it('Head.prev and Head.next should be null', () => {
            assert.ok(list.head, 'Head should not be null');
            assert.strictEqual(list.head.prev, null);
            assert.strictEqual(list.head.next, null);
        });
    });

    describe('List.push() into populated list, 2 items', () => {
        const list = new List<TestData>();
        const data1 = createTestData("value1");
        const data2 = createTestData(222);
        list.push(data1);
        list.push(data2);

        it('List.head should contain the first data item', () => {
            assert.ok(list.head, 'Head should not be null');
            assert.strictEqual(list.head.data, data1);
        });

        it('List.tail should contain the second data item', () => {
            assert.ok(list.tail, 'Tail should not be null');
            assert.strictEqual(list.tail.data, data2);
        });

        it('head.next should be tail, tail.prev should be head', () => {
            assert.ok(list.head, 'Head should not be null');
            assert.ok(list.tail, 'Tail should not be null');
            assert.strictEqual(list.head.next, list.tail);
            assert.strictEqual(list.tail.prev, list.head);
        });

         it('Head.prev should be null, Tail.next should be null', () => {
            assert.ok(list.head, 'Head should not be null');
            assert.ok(list.tail, 'Tail should not be null');
            assert.strictEqual(list.head.prev, null);
            assert.strictEqual(list.tail.next, null);
        });
    });

    describe('List.push() into populated list 2+ items (using TestList)', () => {
        const listLength = 5;
        // Use number type and the number generator
        const testList = new TestList<number>(listLength, listLength - 1, createRandomNumber);

        it('List.head should contain the correct data', () => {
            assert.ok(testList.head, 'Head should not be null');
            assert.strictEqual(testList.list.head, testList.head);
            assert.strictEqual(testList.list.head?.data, testList.asArray[0]);
        });

        it('List.tail should contain the correct data', () => {
            assert.ok(testList.tail, 'Tail should not be null');
            assert.strictEqual(testList.list.tail, testList.tail);
             assert.strictEqual(testList.list.tail?.data, testList.asArray[listLength - 1]);
        });

        it('List.length should be the specified length', () => {
            assert.strictEqual(testList.list.length, listLength);
        });
    });

    describe('List.findIndex()', () => {
        const listLength = 19;
        const testList = new TestList<number>(listLength, listLength - 1, createRandomNumber);
        const headData = testList.asArray[0];
        const tailData = testList.asArray[listLength - 1];
        const sampleData = testList.dataSample;

        // findIndex doesn't accept null according to its type T
        // it('should return -1 from a null input', () => {
        //     assert.strictEqual(testList.list.findIndex(null), -1); // This would be a type error now
        // });

        it('should find the head as index 0', () => {
            const dataIndex = testList.list.findIndex(headData);
            assert.strictEqual(dataIndex, 0);
        });

        it(`should find the tail as index list.length - 1 (${listLength - 1})`, () => {
            const dataIndex = testList.list.findIndex(tailData);
            assert.strictEqual(dataIndex, listLength - 1);
        });

        it('should find the correct index for the sample data', () => {
            assert.ok(sampleData !== undefined, 'Sample data should exist');
            const dataIndex = testList.list.findIndex(sampleData!);
            assert.strictEqual(dataIndex, listLength - 1);
        });

        it('should return -1 for data not in the list', () => {
             const nonExistentData = createRandomNumber() + 1000; // Ensure it's different
             const dataIndex = testList.list.findIndex(nonExistentData);
             assert.strictEqual(dataIndex, -1);
        });
    });

    describe('List.removeByData()', () => {
        const listLength = 19;
        let testList: TestList<number>; // Use let for reassignment
        let dataToRemove: number;

        // Setup before each test in this block
        beforeEach(() => {
            testList = new TestList<number>(listLength, listLength - 2, createRandomNumber); // sample index 17
            dataToRemove = testList.dataSample!;
            assert.ok(dataToRemove !== undefined, 'Test setup failed: dataToRemove is undefined');
        });

        it('should return null if data not found', () => {
            const nonExistentData = createRandomNumber() + 1000;
            const removed = testList.list.removeByData(nonExistentData);
            assert.strictEqual(removed, null);
            assert.strictEqual(testList.list.length, listLength); // Length should not change
        });

        it('should remove the correct data and return it', () => {
            const originalArray = [...testList.asArray]; // Copy before removal
            const removedData = testList.list.removeByData(dataToRemove);

            assert.strictEqual(removedData, dataToRemove);
            const foundIndex = testList.list.findIndex(dataToRemove);
            assert.strictEqual(foundIndex, -1, 'Data should no longer be found');

            // Verify remaining elements are correct
            const expectedArray = originalArray.filter(d => d !== dataToRemove);
            assert.deepStrictEqual(testList.list.toArray(), expectedArray);
        });

        it('should decrease the list length by 1', () => {
            testList.list.removeByData(dataToRemove);
            assert.strictEqual(testList.list.length, listLength - 1);
        });

        it('should correctly update pointers when removing middle node', () => {
             // Find the node-to-remove's data first
             const indexToRemove = listLength - 2; // Original index 17
             const dataToRemove = testList.asArray[indexToRemove];

             // Find node before and node after MANUALLY
             let nodeBefore: Node<number> | null = testList.list.head;
             for (let i = 0; i < indexToRemove - 1; i++) {
                nodeBefore = nodeBefore?.next ?? null;
             }
             const nodeAfter = nodeBefore?.next?.next ?? null; // Node after the one to be removed

             testList.list.removeByData(dataToRemove); // Remove node at index 17

             // NodeBefore should still be the same object, its 'next' pointer should have changed.
             assert.ok(nodeBefore, 'Node before should exist');
             assert.ok(nodeAfter, 'Node after should exist');
             assert.strictEqual(nodeBefore.next, nodeAfter, 'Node before should now point to node after');
             assert.strictEqual(nodeAfter.prev, nodeBefore, 'Node after should now point back to node before');
        });

        it('should correctly update head when removing head node', () => {
            const headData = testList.list.head!.data;
            const secondNode = testList.list.head!.next;
            const removed = testList.list.removeByData(headData);

            assert.strictEqual(removed, headData);
            assert.strictEqual(testList.list.head, secondNode);
            assert.ok(testList.list.head, 'New head should exist');
            assert.strictEqual(testList.list.head!.prev, null, 'New head.prev should be null');
            assert.strictEqual(testList.list.length, listLength - 1);
        });

        it('should correctly update tail when removing tail node', () => {
            const tailData = testList.list.tail!.data;
            const secondLastNode = testList.list.tail!.prev;
            const removed = testList.list.removeByData(tailData);

            assert.strictEqual(removed, tailData);
            assert.strictEqual(testList.list.tail, secondLastNode);
            assert.ok(testList.list.tail, 'New tail should exist');
            assert.strictEqual(testList.list.tail!.next, null, 'New tail.next should be null');
             assert.strictEqual(testList.list.length, listLength - 1);
        });

        it('should correctly remove the only node', () => {
            const singleList = new List<string>();
            singleList.push('only');
            const removed = singleList.removeByData('only');

            assert.strictEqual(removed, 'only');
            assert.strictEqual(singleList.length, 0);
            assert.strictEqual(singleList.head, null);
            assert.strictEqual(singleList.tail, null);
            assert.ok(singleList.isEmpty());
        });
    });

     describe('List.removeByIndex()', () => {
        const listLength = 10;
        let testList: TestList<number>;

        beforeEach(() => {
             testList = new TestList<number>(listLength, 5, createRandomNumber);
        });

        it('should return null for out-of-bounds index', () => {
            assert.strictEqual(testList.list.removeByIndex(-1), null);
            assert.strictEqual(testList.list.removeByIndex(listLength), null);
            assert.strictEqual(testList.list.length, listLength);
        });

        it('should remove the element at the specified index and return it', () => {
            const indexToRemove = 3;
            const dataAtIndex = testList.asArray[indexToRemove];
            const removedData = testList.list.removeByIndex(indexToRemove);
            const expectedArray = testList.asArray.filter((_, i) => i !== indexToRemove);

            assert.strictEqual(removedData, dataAtIndex);
            assert.strictEqual(testList.list.length, listLength - 1);
            assert.deepStrictEqual(testList.list.toArray(), expectedArray);
        });

        // Add tests for removing head (index 0) and tail (index length - 1) similar to removeByData
        it('should correctly remove head using index 0', () => {
            const headData = testList.asArray[0];
            const secondData = testList.asArray[1];
            const removed = testList.list.removeByIndex(0);

            assert.strictEqual(removed, headData);
            assert.strictEqual(testList.list.length, listLength - 1);
            assert.ok(testList.list.head, 'New head should exist');
            assert.strictEqual(testList.list.head!.data, secondData);
            assert.strictEqual(testList.list.head!.prev, null);
        });

        it('should correctly remove tail using index length - 1', () => {
            const tailIndex = listLength - 1;
            const tailData = testList.asArray[tailIndex];
            const secondLastData = testList.asArray[tailIndex - 1];
            const removed = testList.list.removeByIndex(tailIndex);

            assert.strictEqual(removed, tailData);
            assert.strictEqual(testList.list.length, listLength - 1);
            assert.ok(testList.list.tail, 'New tail should exist');
            assert.strictEqual(testList.list.tail!.data, secondLastData);
            assert.strictEqual(testList.list.tail!.next, null);
        });
     });

    describe('List.isEmpty()', () => {
        it('should return true from an empty list', () => {
            const list = new List<string>();
            assert.strictEqual(list.isEmpty(), true);
        });

        it('should return false from a populated list', () => {
            const list = new List<number>();
            list.push(1);
            assert.strictEqual(list.isEmpty(), false);
        });
    });

    describe('List.toArray()', () => {
        it('should return an empty array for an empty list', () => {
             const list = new List<any>();
             assert.deepStrictEqual(list.toArray(), []);
        });

        it('should return an array with elements in the correct order', () => {
            const listLength = 5;
            const testList = new TestList<number>(listLength, 0, createRandomNumber);
            const array = testList.list.toArray();

            assert.strictEqual(Array.isArray(array), true);
            assert.strictEqual(array.length, listLength);
            assert.deepStrictEqual(array, testList.asArray, 'Array content should match original data order');
        });
    });

    describe('List.getData()', () => {
        const listLength = 7;
        const testList = new TestList<string>(listLength, 0, () => Math.random().toString(36).substring(7));

        it('should return null for out-of-bounds index', () => {
            assert.strictEqual(testList.list.getData(-1), null);
            assert.strictEqual(testList.list.getData(listLength), null);
        });

        it('should return the correct data for a valid index', () => {
             const index = 4;
             const expectedData = testList.asArray[index];
             assert.strictEqual(testList.list.getData(index), expectedData);
        });

        it('should return head data for index 0', () => {
            const expectedData = testList.asArray[0];
            assert.strictEqual(testList.list.getData(0), expectedData);
        });

         it('should return tail data for index length - 1', () => {
            const index = listLength - 1;
            const expectedData = testList.asArray[index];
            assert.strictEqual(testList.list.getData(index), expectedData);
        });
    });
}); 