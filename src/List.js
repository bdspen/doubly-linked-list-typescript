"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = require("./Node");
var List = /** @class */ (function () {
    function List() {
        this.length = 0;
        this.head = new Node_1.Node(null);
        this.tail = new Node_1.Node(null);
    }
    List.prototype.isEmpty = function () {
        return this.length === 0;
    };
    List.prototype.push = function (data) {
        var node = new Node_1.Node(data);
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
    };
    List.prototype.findIndex = function (data) {
        if (data !== null) {
            var tempIndex = 0;
            var tempNode = this.head;
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
    };
    List.prototype.removeByIndex = function (i) {
        this.removeByData(this.getData(i));
    };
    List.prototype.getData = function (i) {
        if (typeof i === "number" && i < this.length) {
            var tempNode, temp;
            if (i > (this.length / 2)) {
                temp = this.length;
                tempNode = this.tail;
                while (temp-- > i) {
                    tempNode = tempNode.prev;
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
    };
    List.prototype.removeByData = function (data) {
        var tempNode;
        if (!data)
            return;
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
            if (tempNode.hasNext())
                tempNode.next.prev = tempNode.prev;
        }
        this.length--;
    };
    return List;
}());
exports.List = List;
