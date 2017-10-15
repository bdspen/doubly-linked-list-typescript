import { Node } from '../src/Node';
import { List } from '../src/List';

export class TestList {

    dataSample: any;        /** is returned as data from an index you specify with sampleIndex */
    list: List;             /** the List which is returned */
    asArray: Array<any>;    /** an array (in order) containing the data of the list */
    head: Node              /** The head of the list */
    tail: Node              /** The tail of the list */

    private listLength: number;     /** how long the list is */
    private sampleIndex: number;    /** should be less than listLength */

    constructor(listLength: number, sampleIndex: number){
        this.list = new List();
        this.asArray = [];
        this.listLength = listLength;
        this.sampleIndex = sampleIndex || 0;
        this.generateList();
        this.listAsArray();
        this.head = this.list.head;
        this.tail = this.list.tail;
    }

    private listAsArray(): void {
        for(let i = 0; i <= this.list.length; i++){
            this.asArray.push(this.list.getData(i));
        }
    }

    generateList(): void {
        for (let i = 0; i < this.listLength; i++) {
            let data = Math.random();
            if (i === this.sampleIndex) this.dataSample = data;
            this.list.push(data);
        }
    }
    
}