export class Node<T> {

    data: T;
    next: Node<T> | null;
    prev: Node<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    
    hasPrev(): boolean {
        return this.prev !== null;
    }
  
    hasNext(): boolean {
        return this.next !== null;
    }

}