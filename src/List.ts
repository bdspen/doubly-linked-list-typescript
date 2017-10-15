import { Node } from "./Node";

export class List {

    length: number;
    head: Node;
    tail: Node;

    constructor() {
        this.length = 0;
        this.head = new Node(null);
        this.tail = new Node(null);
    }

    isEmpty() {
        return this.length === 0;
    }

    toArray(): Array<any> {
        var array: Array<any> = [];
        for(let i = 0, l = this.length; i < l; i++) {
            array.push(this.getData(i));
        }
        return array;
    }

    push(data: any): void {

        const node = new Node(data);

        if (this.isEmpty()) {
            this.head = this.tail = node;
            this.length++;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
            this.length++;
        }

    }

    findIndex(data: any): number {

        if (data !== null) {
            var tempIndex: number = 0;
            var tempNode: Node = this.head;

            while (tempIndex < this.length) {
                if (tempNode.data === data) {
                    return tempIndex;
                }
                else {
                    tempNode = tempNode.next;
                    tempIndex++;
                }
            }
        }
        return -1;

    }

    removeByIndex(i: number): void {
        this.removeByData(this.getData(i));
    }

    getData(i: number): any {

        if (typeof i === "number" && i < this.length) {
            var tempNode, temp;
            if (i > (this.length / 2)) {
                temp = this.length;
                tempNode = this.tail;
                while (temp-- > i) {
                    tempNode = tempNode.prev
                }
                return tempNode.data;
            }
            else {
                temp = 0;
                tempNode = this.head;
                while (temp++ < i) {
                    tempNode = tempNode.next;
                }
                return tempNode.data;
            }
        }

    }

    removeByData(data: any): void {

        var tempNode: Node;
        if (!data) return;
        if (data === this.head.data) {
            this.head = this.head.next;
        }
        if (data === this.tail.data) {
            tempNode = this.tail.prev;
            this.tail = tempNode;
        }
        else {
            tempNode = this.head;
            while (tempNode && tempNode.data !== data) {
                tempNode = tempNode.next;
            }
            if (tempNode.hasPrev())
                tempNode.prev.next = tempNode.next;
            if(tempNode.hasNext())
                tempNode.next.prev = tempNode.prev;
        }
        this.length--;

    }
}