"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("../src/List");
var TestList = /** @class */ (function () {
    function TestList(listLength, sampleIndex) {
        this.list = new List_1.List();
        this.asArray = [];
        this.listLength = listLength;
        this.sampleIndex = sampleIndex || 0;
        this.generateList();
        this.listAsArray();
        this.head = this.list.head;
        this.tail = this.list.tail;
    }
    TestList.prototype.listAsArray = function () {
        for (var i = 0; i <= this.list.length; i++) {
            this.asArray.push(this.list.getData(i));
        }
    };
    TestList.prototype.generateList = function () {
        for (var i = 0; i < this.listLength; i++) {
            var data = Math.random();
            if (i === this.sampleIndex)
                this.dataSample = data;
            this.list.push(data);
        }
    };
    return TestList;
}());
exports.TestList = TestList;
