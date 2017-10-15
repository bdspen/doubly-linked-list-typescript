"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
        this.next = this.next;
        this.prev = this.prev;
    }
    Node.prototype.hasPrev = function () {
        return this.prev !== null;
    };
    Node.prototype.hasNext = function () {
        return this.next !== null;
    };
    return Node;
}());
exports.Node = Node;
