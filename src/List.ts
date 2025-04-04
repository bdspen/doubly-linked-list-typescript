import { Node } from "./Node";

export class List<T> {

    length: number;
    head: Node<T> | null;
    tail: Node<T> | null;

    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    private _getNode(index: number): Node<T> | null {
        if (index < 0 || index >= this.length) {
            return null;
        }

        let currentNode: Node<T> | null;
        if (index < this.length / 2) {
            currentNode = this.head;
            for (let i = 0; i < index; i++) {
                currentNode = currentNode!.next;
            }
        } else {
            currentNode = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                currentNode = currentNode!.prev;
            }
        }
        return currentNode;
    }

    toArray(): Array<T> {
        const array: Array<T> = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            array.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return array;
    }

    push(data: T): void {
        const node = new Node(data);

        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail!.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
    }

    findIndex(data: T): number {
        let currentIndex = 0;
        let currentNode = this.head;

        while (currentNode !== null) {
            if (currentNode.data === data) {
                return currentIndex;
            }
            currentNode = currentNode.next;
            currentIndex++;
        }
        return -1;
    }

    removeByIndex(index: number): T | null {
        const nodeToRemove = this._getNode(index);
        if (!nodeToRemove) {
            return null;
        }
        return this._removeNode(nodeToRemove);
    }

    getData(index: number): T | null {
        const node = this._getNode(index);
        return node ? node.data : null;
    }

    removeByData(data: T): T | null {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.data === data) {
                return this._removeNode(currentNode);
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    private _removeNode(nodeToRemove: Node<T>): T {
        if (nodeToRemove === this.head) {
            this.head = nodeToRemove.next;
        }

        if (nodeToRemove === this.tail) {
            this.tail = nodeToRemove.prev;
        }

        if (nodeToRemove.prev !== null) {
            nodeToRemove.prev.next = nodeToRemove.next;
        }

        if (nodeToRemove.next !== null) {
            nodeToRemove.next.prev = nodeToRemove.prev;
        }

        nodeToRemove.prev = null;
        nodeToRemove.next = null;

        this.length--;
        return nodeToRemove.data;
    }
}