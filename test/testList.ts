import { Node } from '../src/Node';
import { List } from '../src/List';

export class TestList<T> {

    dataSample: T | undefined;        /** is returned as data from an index you specify with sampleIndex */
    list: List<T>;             /** the List which is returned */
    asArray: Array<T>;    /** an array (in order) containing the data of the list */
    head: Node<T> | null;              /** The head of the list */
    tail: Node<T> | null;              /** The tail of the list */

    private listLength: number;     /** how long the list is */
    private sampleIndex: number;    /** should be less than listLength */
    private dataGenerator: () => T;  /** Function to generate data of type T */

    constructor(listLength: number, sampleIndex: number, dataGenerator: () => T){
        this.list = new List<T>();
        this.asArray = [];
        this.listLength = listLength;
        this.sampleIndex = sampleIndex;
        this.dataGenerator = dataGenerator;
        this.generateList();
        this.asArray = this.list.toArray();
        this.head = this.list.head;
        this.tail = this.list.tail;
    }

    generateList(): void {
        for (let i = 0; i < this.listLength; i++) {
            const data = this.dataGenerator();
            if (i === this.sampleIndex) this.dataSample = data;
            this.list.push(data);
        }
    }
    
}