(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/typescript-collections/dist/lib/util.js
  var require_util = __commonJS({
    "node_modules/typescript-collections/dist/lib/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      exports.has = function(obj, prop) {
        return _hasOwnProperty.call(obj, prop);
      };
      function defaultCompare(a, b) {
        if (a < b) {
          return -1;
        } else if (a === b) {
          return 0;
        } else {
          return 1;
        }
      }
      exports.defaultCompare = defaultCompare;
      function defaultEquals(a, b) {
        return a === b;
      }
      exports.defaultEquals = defaultEquals;
      function defaultToString(item) {
        if (item === null) {
          return "COLLECTION_NULL";
        } else if (isUndefined(item)) {
          return "COLLECTION_UNDEFINED";
        } else if (isString(item)) {
          return "$s" + item;
        } else {
          return "$o" + item.toString();
        }
      }
      exports.defaultToString = defaultToString;
      function makeString(item, join) {
        if (join === void 0) {
          join = ",";
        }
        if (item === null) {
          return "COLLECTION_NULL";
        } else if (isUndefined(item)) {
          return "COLLECTION_UNDEFINED";
        } else if (isString(item)) {
          return item.toString();
        } else {
          var toret = "{";
          var first = true;
          for (var prop in item) {
            if (exports.has(item, prop)) {
              if (first) {
                first = false;
              } else {
                toret = toret + join;
              }
              toret = toret + prop + ":" + item[prop];
            }
          }
          return toret + "}";
        }
      }
      exports.makeString = makeString;
      function isFunction(func) {
        return typeof func === "function";
      }
      exports.isFunction = isFunction;
      function isUndefined(obj) {
        return typeof obj === "undefined";
      }
      exports.isUndefined = isUndefined;
      function isString(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
      }
      exports.isString = isString;
      function reverseCompareFunction(compareFunction) {
        if (isUndefined(compareFunction) || !isFunction(compareFunction)) {
          return function(a, b) {
            if (a < b) {
              return 1;
            } else if (a === b) {
              return 0;
            } else {
              return -1;
            }
          };
        } else {
          return function(d, v) {
            return compareFunction(d, v) * -1;
          };
        }
      }
      exports.reverseCompareFunction = reverseCompareFunction;
      function compareToEquals(compareFunction) {
        return function(a, b) {
          return compareFunction(a, b) === 0;
        };
      }
      exports.compareToEquals = compareToEquals;
    }
  });

  // node_modules/typescript-collections/dist/lib/arrays.js
  var require_arrays = __commonJS({
    "node_modules/typescript-collections/dist/lib/arrays.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      function indexOf(array, item, equalsFunction) {
        var equals2 = equalsFunction || util.defaultEquals;
        var length = array.length;
        for (var i = 0; i < length; i++) {
          if (equals2(array[i], item)) {
            return i;
          }
        }
        return -1;
      }
      exports.indexOf = indexOf;
      function lastIndexOf(array, item, equalsFunction) {
        var equals2 = equalsFunction || util.defaultEquals;
        var length = array.length;
        for (var i = length - 1; i >= 0; i--) {
          if (equals2(array[i], item)) {
            return i;
          }
        }
        return -1;
      }
      exports.lastIndexOf = lastIndexOf;
      function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
      }
      exports.contains = contains;
      function remove(array, item, equalsFunction) {
        var index = indexOf(array, item, equalsFunction);
        if (index < 0) {
          return false;
        }
        array.splice(index, 1);
        return true;
      }
      exports.remove = remove;
      function frequency(array, item, equalsFunction) {
        var equals2 = equalsFunction || util.defaultEquals;
        var length = array.length;
        var freq = 0;
        for (var i = 0; i < length; i++) {
          if (equals2(array[i], item)) {
            freq++;
          }
        }
        return freq;
      }
      exports.frequency = frequency;
      function equals(array1, array2, equalsFunction) {
        var equals2 = equalsFunction || util.defaultEquals;
        if (array1.length !== array2.length) {
          return false;
        }
        var length = array1.length;
        for (var i = 0; i < length; i++) {
          if (!equals2(array1[i], array2[i])) {
            return false;
          }
        }
        return true;
      }
      exports.equals = equals;
      function copy(array) {
        return array.concat();
      }
      exports.copy = copy;
      function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
          return false;
        }
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
      }
      exports.swap = swap;
      function toString(array) {
        return "[" + array.toString() + "]";
      }
      exports.toString = toString;
      function forEach(array, callback) {
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
          var ele = array_1[_i];
          if (callback(ele) === false) {
            return;
          }
        }
      }
      exports.forEach = forEach;
    }
  });

  // node_modules/typescript-collections/dist/lib/Dictionary.js
  var require_Dictionary = __commonJS({
    "node_modules/typescript-collections/dist/lib/Dictionary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      var Dictionary = function() {
        function Dictionary2(toStrFunction) {
          this.table = {};
          this.nElements = 0;
          this.toStr = toStrFunction || util.defaultToString;
        }
        Dictionary2.prototype.getValue = function(key) {
          var pair = this.table["$" + this.toStr(key)];
          if (util.isUndefined(pair)) {
            return void 0;
          }
          return pair.value;
        };
        Dictionary2.prototype.setValue = function(key, value) {
          if (util.isUndefined(key) || util.isUndefined(value)) {
            return void 0;
          }
          var ret;
          var k = "$" + this.toStr(key);
          var previousElement = this.table[k];
          if (util.isUndefined(previousElement)) {
            this.nElements++;
            ret = void 0;
          } else {
            ret = previousElement.value;
          }
          this.table[k] = {
            key,
            value
          };
          return ret;
        };
        Dictionary2.prototype.remove = function(key) {
          var k = "$" + this.toStr(key);
          var previousElement = this.table[k];
          if (!util.isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
          }
          return void 0;
        };
        Dictionary2.prototype.keys = function() {
          var array = [];
          for (var name_1 in this.table) {
            if (util.has(this.table, name_1)) {
              var pair = this.table[name_1];
              array.push(pair.key);
            }
          }
          return array;
        };
        Dictionary2.prototype.values = function() {
          var array = [];
          for (var name_2 in this.table) {
            if (util.has(this.table, name_2)) {
              var pair = this.table[name_2];
              array.push(pair.value);
            }
          }
          return array;
        };
        Dictionary2.prototype.forEach = function(callback) {
          for (var name_3 in this.table) {
            if (util.has(this.table, name_3)) {
              var pair = this.table[name_3];
              var ret = callback(pair.key, pair.value);
              if (ret === false) {
                return;
              }
            }
          }
        };
        Dictionary2.prototype.containsKey = function(key) {
          return !util.isUndefined(this.getValue(key));
        };
        Dictionary2.prototype.clear = function() {
          this.table = {};
          this.nElements = 0;
        };
        Dictionary2.prototype.size = function() {
          return this.nElements;
        };
        Dictionary2.prototype.isEmpty = function() {
          return this.nElements <= 0;
        };
        Dictionary2.prototype.toString = function() {
          var toret = "{";
          this.forEach(function(k, v) {
            toret += "\n	" + k + " : " + v;
          });
          return toret + "\n}";
        };
        return Dictionary2;
      }();
      exports.default = Dictionary;
    }
  });

  // node_modules/typescript-collections/dist/lib/Set.js
  var require_Set = __commonJS({
    "node_modules/typescript-collections/dist/lib/Set.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      var arrays = require_arrays();
      var Dictionary_1 = require_Dictionary();
      var Set2 = function() {
        function Set3(toStringFunction) {
          this.dictionary = new Dictionary_1.default(toStringFunction);
        }
        Set3.prototype.contains = function(element) {
          return this.dictionary.containsKey(element);
        };
        Set3.prototype.add = function(element) {
          if (this.contains(element) || util.isUndefined(element)) {
            return false;
          } else {
            this.dictionary.setValue(element, element);
            return true;
          }
        };
        Set3.prototype.intersection = function(otherSet) {
          var set = this;
          this.forEach(function(element) {
            if (!otherSet.contains(element)) {
              set.remove(element);
            }
            return true;
          });
        };
        Set3.prototype.union = function(otherSet) {
          var set = this;
          otherSet.forEach(function(element) {
            set.add(element);
            return true;
          });
        };
        Set3.prototype.difference = function(otherSet) {
          var set = this;
          otherSet.forEach(function(element) {
            set.remove(element);
            return true;
          });
        };
        Set3.prototype.isSubsetOf = function(otherSet) {
          if (this.size() > otherSet.size()) {
            return false;
          }
          var isSub = true;
          this.forEach(function(element) {
            if (!otherSet.contains(element)) {
              isSub = false;
              return false;
            }
            return true;
          });
          return isSub;
        };
        Set3.prototype.remove = function(element) {
          if (!this.contains(element)) {
            return false;
          } else {
            this.dictionary.remove(element);
            return true;
          }
        };
        Set3.prototype.forEach = function(callback) {
          this.dictionary.forEach(function(k, v) {
            return callback(v);
          });
        };
        Set3.prototype.toArray = function() {
          return this.dictionary.values();
        };
        Set3.prototype.isEmpty = function() {
          return this.dictionary.isEmpty();
        };
        Set3.prototype.size = function() {
          return this.dictionary.size();
        };
        Set3.prototype.clear = function() {
          this.dictionary.clear();
        };
        Set3.prototype.toString = function() {
          return arrays.toString(this.toArray());
        };
        return Set3;
      }();
      exports.default = Set2;
    }
  });

  // node_modules/typescript-collections/dist/lib/Bag.js
  var require_Bag = __commonJS({
    "node_modules/typescript-collections/dist/lib/Bag.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      var Dictionary_1 = require_Dictionary();
      var Set_1 = require_Set();
      var Bag = function() {
        function Bag2(toStrFunction) {
          this.toStrF = toStrFunction || util.defaultToString;
          this.dictionary = new Dictionary_1.default(this.toStrF);
          this.nElements = 0;
        }
        Bag2.prototype.add = function(element, nCopies) {
          if (nCopies === void 0) {
            nCopies = 1;
          }
          if (util.isUndefined(element) || nCopies <= 0) {
            return false;
          }
          if (!this.contains(element)) {
            var node = {
              value: element,
              copies: nCopies
            };
            this.dictionary.setValue(element, node);
          } else {
            this.dictionary.getValue(element).copies += nCopies;
          }
          this.nElements += nCopies;
          return true;
        };
        Bag2.prototype.count = function(element) {
          if (!this.contains(element)) {
            return 0;
          } else {
            return this.dictionary.getValue(element).copies;
          }
        };
        Bag2.prototype.contains = function(element) {
          return this.dictionary.containsKey(element);
        };
        Bag2.prototype.remove = function(element, nCopies) {
          if (nCopies === void 0) {
            nCopies = 1;
          }
          if (util.isUndefined(element) || nCopies <= 0) {
            return false;
          }
          if (!this.contains(element)) {
            return false;
          } else {
            var node = this.dictionary.getValue(element);
            if (nCopies > node.copies) {
              this.nElements -= node.copies;
            } else {
              this.nElements -= nCopies;
            }
            node.copies -= nCopies;
            if (node.copies <= 0) {
              this.dictionary.remove(element);
            }
            return true;
          }
        };
        Bag2.prototype.toArray = function() {
          var a = [];
          var values = this.dictionary.values();
          for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var node = values_1[_i];
            var element = node.value;
            var copies = node.copies;
            for (var j = 0; j < copies; j++) {
              a.push(element);
            }
          }
          return a;
        };
        Bag2.prototype.toSet = function() {
          var toret = new Set_1.default(this.toStrF);
          var elements = this.dictionary.values();
          for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var ele = elements_1[_i];
            var value = ele.value;
            toret.add(value);
          }
          return toret;
        };
        Bag2.prototype.forEach = function(callback) {
          this.dictionary.forEach(function(k, v) {
            var value = v.value;
            var copies = v.copies;
            for (var i = 0; i < copies; i++) {
              if (callback(value) === false) {
                return false;
              }
            }
            return true;
          });
        };
        Bag2.prototype.size = function() {
          return this.nElements;
        };
        Bag2.prototype.isEmpty = function() {
          return this.nElements === 0;
        };
        Bag2.prototype.clear = function() {
          this.nElements = 0;
          this.dictionary.clear();
        };
        return Bag2;
      }();
      exports.default = Bag;
    }
  });

  // node_modules/typescript-collections/dist/lib/LinkedList.js
  var require_LinkedList = __commonJS({
    "node_modules/typescript-collections/dist/lib/LinkedList.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      var arrays = require_arrays();
      var LinkedList = function() {
        function LinkedList2() {
          this.firstNode = null;
          this.lastNode = null;
          this.nElements = 0;
        }
        LinkedList2.prototype.add = function(item, index) {
          if (util.isUndefined(index)) {
            index = this.nElements;
          }
          if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
          }
          var newNode = this.createNode(item);
          if (this.nElements === 0 || this.lastNode === null) {
            this.firstNode = newNode;
            this.lastNode = newNode;
          } else if (index === this.nElements) {
            this.lastNode.next = newNode;
            this.lastNode = newNode;
          } else if (index === 0) {
            newNode.next = this.firstNode;
            this.firstNode = newNode;
          } else {
            var prev = this.nodeAtIndex(index - 1);
            if (prev === null) {
              return false;
            }
            newNode.next = prev.next;
            prev.next = newNode;
          }
          this.nElements++;
          return true;
        };
        LinkedList2.prototype.first = function() {
          if (this.firstNode !== null) {
            return this.firstNode.element;
          }
          return void 0;
        };
        LinkedList2.prototype.last = function() {
          if (this.lastNode !== null) {
            return this.lastNode.element;
          }
          return void 0;
        };
        LinkedList2.prototype.elementAtIndex = function(index) {
          var node = this.nodeAtIndex(index);
          if (node === null) {
            return void 0;
          }
          return node.element;
        };
        LinkedList2.prototype.indexOf = function(item, equalsFunction) {
          var equalsF = equalsFunction || util.defaultEquals;
          if (util.isUndefined(item)) {
            return -1;
          }
          var currentNode = this.firstNode;
          var index = 0;
          while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
              return index;
            }
            index++;
            currentNode = currentNode.next;
          }
          return -1;
        };
        LinkedList2.prototype.contains = function(item, equalsFunction) {
          return this.indexOf(item, equalsFunction) >= 0;
        };
        LinkedList2.prototype.remove = function(item, equalsFunction) {
          var equalsF = equalsFunction || util.defaultEquals;
          if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
          }
          var previous = null;
          var currentNode = this.firstNode;
          while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
              if (previous === null) {
                this.firstNode = currentNode.next;
                if (currentNode === this.lastNode) {
                  this.lastNode = null;
                }
              } else if (currentNode === this.lastNode) {
                this.lastNode = previous;
                previous.next = currentNode.next;
                currentNode.next = null;
              } else {
                previous.next = currentNode.next;
                currentNode.next = null;
              }
              this.nElements--;
              return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
          }
          return false;
        };
        LinkedList2.prototype.clear = function() {
          this.firstNode = null;
          this.lastNode = null;
          this.nElements = 0;
        };
        LinkedList2.prototype.equals = function(other, equalsFunction) {
          var eqF = equalsFunction || util.defaultEquals;
          if (!(other instanceof LinkedList2)) {
            return false;
          }
          if (this.size() !== other.size()) {
            return false;
          }
          return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };
        LinkedList2.prototype.equalsAux = function(n1, n2, eqF) {
          while (n1 !== null && n2 !== null) {
            if (!eqF(n1.element, n2.element)) {
              return false;
            }
            n1 = n1.next;
            n2 = n2.next;
          }
          return true;
        };
        LinkedList2.prototype.removeElementAtIndex = function(index) {
          if (index < 0 || index >= this.nElements || this.firstNode === null || this.lastNode === null) {
            return void 0;
          }
          var element;
          if (this.nElements === 1) {
            element = this.firstNode.element;
            this.firstNode = null;
            this.lastNode = null;
          } else {
            var previous = this.nodeAtIndex(index - 1);
            if (previous === null) {
              element = this.firstNode.element;
              this.firstNode = this.firstNode.next;
            } else if (previous.next === this.lastNode) {
              element = this.lastNode.element;
              this.lastNode = previous;
            }
            if (previous !== null && previous.next !== null) {
              element = previous.next.element;
              previous.next = previous.next.next;
            }
          }
          this.nElements--;
          return element;
        };
        LinkedList2.prototype.forEach = function(callback) {
          var currentNode = this.firstNode;
          while (currentNode !== null) {
            if (callback(currentNode.element) === false) {
              break;
            }
            currentNode = currentNode.next;
          }
        };
        LinkedList2.prototype.reverse = function() {
          var previous = null;
          var current = this.firstNode;
          var temp = null;
          while (current !== null) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
          }
          temp = this.firstNode;
          this.firstNode = this.lastNode;
          this.lastNode = temp;
        };
        LinkedList2.prototype.toArray = function() {
          var array = [];
          var currentNode = this.firstNode;
          while (currentNode !== null) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
          }
          return array;
        };
        LinkedList2.prototype.size = function() {
          return this.nElements;
        };
        LinkedList2.prototype.isEmpty = function() {
          return this.nElements <= 0;
        };
        LinkedList2.prototype.toString = function() {
          return arrays.toString(this.toArray());
        };
        LinkedList2.prototype.nodeAtIndex = function(index) {
          if (index < 0 || index >= this.nElements) {
            return null;
          }
          if (index === this.nElements - 1) {
            return this.lastNode;
          }
          var node = this.firstNode;
          for (var i = 0; i < index && node !== null; i++) {
            node = node.next;
          }
          return node;
        };
        LinkedList2.prototype.createNode = function(item) {
          return {
            element: item,
            next: null
          };
        };
        return LinkedList2;
      }();
      exports.default = LinkedList;
    }
  });

  // node_modules/typescript-collections/dist/lib/Queue.js
  var require_Queue = __commonJS({
    "node_modules/typescript-collections/dist/lib/Queue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var LinkedList_1 = require_LinkedList();
      var Queue = function() {
        function Queue2() {
          this.list = new LinkedList_1.default();
        }
        Queue2.prototype.enqueue = function(elem) {
          return this.list.add(elem);
        };
        Queue2.prototype.add = function(elem) {
          return this.list.add(elem);
        };
        Queue2.prototype.dequeue = function() {
          if (this.list.size() !== 0) {
            var el = this.list.first();
            this.list.removeElementAtIndex(0);
            return el;
          }
          return void 0;
        };
        Queue2.prototype.peek = function() {
          if (this.list.size() !== 0) {
            return this.list.first();
          }
          return void 0;
        };
        Queue2.prototype.size = function() {
          return this.list.size();
        };
        Queue2.prototype.contains = function(elem, equalsFunction) {
          return this.list.contains(elem, equalsFunction);
        };
        Queue2.prototype.isEmpty = function() {
          return this.list.size() <= 0;
        };
        Queue2.prototype.clear = function() {
          this.list.clear();
        };
        Queue2.prototype.forEach = function(callback) {
          this.list.forEach(callback);
        };
        return Queue2;
      }();
      exports.default = Queue;
    }
  });

  // node_modules/typescript-collections/dist/lib/BSTreeKV.js
  var require_BSTreeKV = __commonJS({
    "node_modules/typescript-collections/dist/lib/BSTreeKV.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      var Queue_1 = require_Queue();
      var BSTreeKV = function() {
        function BSTreeKV2(compareFunction) {
          this.root = null;
          this.compare = compareFunction || util.defaultCompare;
          this.nElements = 0;
        }
        BSTreeKV2.prototype.add = function(element) {
          if (util.isUndefined(element)) {
            return false;
          }
          if (this.insertNode(this.createNode(element)) !== null) {
            this.nElements++;
            return true;
          }
          return false;
        };
        BSTreeKV2.prototype.clear = function() {
          this.root = null;
          this.nElements = 0;
        };
        BSTreeKV2.prototype.isEmpty = function() {
          return this.nElements === 0;
        };
        BSTreeKV2.prototype.size = function() {
          return this.nElements;
        };
        BSTreeKV2.prototype.contains = function(element) {
          if (util.isUndefined(element)) {
            return false;
          }
          return this.searchNode(this.root, element) !== null;
        };
        BSTreeKV2.prototype.search = function(element) {
          var ret = this.searchNode(this.root, element);
          if (ret === null) {
            return void 0;
          }
          return ret.element;
        };
        BSTreeKV2.prototype.remove = function(element) {
          var node = this.searchNode(this.root, element);
          if (node === null) {
            return false;
          }
          this.removeNode(node);
          this.nElements--;
          return true;
        };
        BSTreeKV2.prototype.inorderTraversal = function(callback) {
          this.inorderTraversalAux(this.root, callback, {
            stop: false
          });
        };
        BSTreeKV2.prototype.preorderTraversal = function(callback) {
          this.preorderTraversalAux(this.root, callback, {
            stop: false
          });
        };
        BSTreeKV2.prototype.postorderTraversal = function(callback) {
          this.postorderTraversalAux(this.root, callback, {
            stop: false
          });
        };
        BSTreeKV2.prototype.levelTraversal = function(callback) {
          this.levelTraversalAux(this.root, callback);
        };
        BSTreeKV2.prototype.minimum = function() {
          if (this.isEmpty() || this.root === null) {
            return void 0;
          }
          return this.minimumAux(this.root).element;
        };
        BSTreeKV2.prototype.maximum = function() {
          if (this.isEmpty() || this.root === null) {
            return void 0;
          }
          return this.maximumAux(this.root).element;
        };
        BSTreeKV2.prototype.forEach = function(callback) {
          this.inorderTraversal(callback);
        };
        BSTreeKV2.prototype.toArray = function() {
          var array = [];
          this.inorderTraversal(function(element) {
            array.push(element);
            return true;
          });
          return array;
        };
        BSTreeKV2.prototype.height = function() {
          return this.heightAux(this.root);
        };
        BSTreeKV2.prototype.searchNode = function(node, element) {
          var cmp = 1;
          while (node !== null && cmp !== 0) {
            cmp = this.compare(element, node.element);
            if (cmp < 0) {
              node = node.leftCh;
            } else if (cmp > 0) {
              node = node.rightCh;
            }
          }
          return node;
        };
        BSTreeKV2.prototype.transplant = function(n1, n2) {
          if (n1.parent === null) {
            this.root = n2;
          } else if (n1 === n1.parent.leftCh) {
            n1.parent.leftCh = n2;
          } else {
            n1.parent.rightCh = n2;
          }
          if (n2 !== null) {
            n2.parent = n1.parent;
          }
        };
        BSTreeKV2.prototype.removeNode = function(node) {
          if (node.leftCh === null) {
            this.transplant(node, node.rightCh);
          } else if (node.rightCh === null) {
            this.transplant(node, node.leftCh);
          } else {
            var y = this.minimumAux(node.rightCh);
            if (y.parent !== node) {
              this.transplant(y, y.rightCh);
              y.rightCh = node.rightCh;
              y.rightCh.parent = y;
            }
            this.transplant(node, y);
            y.leftCh = node.leftCh;
            y.leftCh.parent = y;
          }
        };
        BSTreeKV2.prototype.inorderTraversalAux = function(node, callback, signal) {
          if (node === null || signal.stop) {
            return;
          }
          this.inorderTraversalAux(node.leftCh, callback, signal);
          if (signal.stop) {
            return;
          }
          signal.stop = callback(node.element) === false;
          if (signal.stop) {
            return;
          }
          this.inorderTraversalAux(node.rightCh, callback, signal);
        };
        BSTreeKV2.prototype.levelTraversalAux = function(node, callback) {
          var queue = new Queue_1.default();
          if (node !== null) {
            queue.enqueue(node);
          }
          node = queue.dequeue() || null;
          while (node != null) {
            if (callback(node.element) === false) {
              return;
            }
            if (node.leftCh !== null) {
              queue.enqueue(node.leftCh);
            }
            if (node.rightCh !== null) {
              queue.enqueue(node.rightCh);
            }
            node = queue.dequeue() || null;
          }
        };
        BSTreeKV2.prototype.preorderTraversalAux = function(node, callback, signal) {
          if (node === null || signal.stop) {
            return;
          }
          signal.stop = callback(node.element) === false;
          if (signal.stop) {
            return;
          }
          this.preorderTraversalAux(node.leftCh, callback, signal);
          if (signal.stop) {
            return;
          }
          this.preorderTraversalAux(node.rightCh, callback, signal);
        };
        BSTreeKV2.prototype.postorderTraversalAux = function(node, callback, signal) {
          if (node === null || signal.stop) {
            return;
          }
          this.postorderTraversalAux(node.leftCh, callback, signal);
          if (signal.stop) {
            return;
          }
          this.postorderTraversalAux(node.rightCh, callback, signal);
          if (signal.stop) {
            return;
          }
          signal.stop = callback(node.element) === false;
        };
        BSTreeKV2.prototype.minimumAux = function(node) {
          while (node != null && node.leftCh !== null) {
            node = node.leftCh;
          }
          return node;
        };
        BSTreeKV2.prototype.maximumAux = function(node) {
          while (node != null && node.rightCh !== null) {
            node = node.rightCh;
          }
          return node;
        };
        BSTreeKV2.prototype.heightAux = function(node) {
          if (node === null) {
            return -1;
          }
          return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        };
        BSTreeKV2.prototype.insertNode = function(node) {
          var parent = null;
          var position = this.root;
          while (position !== null) {
            var cmp = this.compare(node.element, position.element);
            if (cmp === 0) {
              return null;
            } else if (cmp < 0) {
              parent = position;
              position = position.leftCh;
            } else {
              parent = position;
              position = position.rightCh;
            }
          }
          node.parent = parent;
          if (parent === null) {
            this.root = node;
          } else if (this.compare(node.element, parent.element) < 0) {
            parent.leftCh = node;
          } else {
            parent.rightCh = node;
          }
          return node;
        };
        BSTreeKV2.prototype.createNode = function(element) {
          return {
            element,
            leftCh: null,
            rightCh: null,
            parent: null
          };
        };
        return BSTreeKV2;
      }();
      exports.default = BSTreeKV;
    }
  });

  // node_modules/typescript-collections/dist/lib/BSTree.js
  var require_BSTree = __commonJS({
    "node_modules/typescript-collections/dist/lib/BSTree.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var BSTreeKV_1 = require_BSTreeKV();
      var BSTree = function(_super) {
        __extends(BSTree2, _super);
        function BSTree2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        return BSTree2;
      }(BSTreeKV_1.default);
      exports.default = BSTree;
    }
  });

  // node_modules/typescript-collections/dist/lib/Heap.js
  var require_Heap = __commonJS({
    "node_modules/typescript-collections/dist/lib/Heap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var collections = require_util();
      var arrays = require_arrays();
      var Heap = function() {
        function Heap2(compareFunction) {
          this.data = [];
          this.compare = compareFunction || collections.defaultCompare;
        }
        Heap2.prototype.leftChildIndex = function(nodeIndex) {
          return 2 * nodeIndex + 1;
        };
        Heap2.prototype.rightChildIndex = function(nodeIndex) {
          return 2 * nodeIndex + 2;
        };
        Heap2.prototype.parentIndex = function(nodeIndex) {
          return Math.floor((nodeIndex - 1) / 2);
        };
        Heap2.prototype.minIndex = function(leftChild, rightChild) {
          if (rightChild >= this.data.length) {
            if (leftChild >= this.data.length) {
              return -1;
            } else {
              return leftChild;
            }
          } else {
            if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
              return leftChild;
            } else {
              return rightChild;
            }
          }
        };
        Heap2.prototype.siftUp = function(index) {
          var parent = this.parentIndex(index);
          while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
            arrays.swap(this.data, parent, index);
            index = parent;
            parent = this.parentIndex(index);
          }
        };
        Heap2.prototype.siftDown = function(nodeIndex) {
          var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
          while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
            arrays.swap(this.data, min, nodeIndex);
            nodeIndex = min;
            min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
          }
        };
        Heap2.prototype.peek = function() {
          if (this.data.length > 0) {
            return this.data[0];
          } else {
            return void 0;
          }
        };
        Heap2.prototype.add = function(element) {
          if (collections.isUndefined(element)) {
            return false;
          }
          this.data.push(element);
          this.siftUp(this.data.length - 1);
          return true;
        };
        Heap2.prototype.removeRoot = function() {
          if (this.data.length > 0) {
            var obj = this.data[0];
            this.data[0] = this.data[this.data.length - 1];
            this.data.splice(this.data.length - 1, 1);
            if (this.data.length > 0) {
              this.siftDown(0);
            }
            return obj;
          }
          return void 0;
        };
        Heap2.prototype.contains = function(element) {
          var equF = collections.compareToEquals(this.compare);
          return arrays.contains(this.data, element, equF);
        };
        Heap2.prototype.size = function() {
          return this.data.length;
        };
        Heap2.prototype.isEmpty = function() {
          return this.data.length <= 0;
        };
        Heap2.prototype.clear = function() {
          this.data.length = 0;
        };
        Heap2.prototype.forEach = function(callback) {
          arrays.forEach(this.data, callback);
        };
        return Heap2;
      }();
      exports.default = Heap;
    }
  });

  // node_modules/typescript-collections/dist/lib/LinkedDictionary.js
  var require_LinkedDictionary = __commonJS({
    "node_modules/typescript-collections/dist/lib/LinkedDictionary.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Dictionary_1 = require_Dictionary();
      var util = require_util();
      var LinkedDictionaryPair = function() {
        function LinkedDictionaryPair2(key, value) {
          this.key = key;
          this.value = value;
        }
        LinkedDictionaryPair2.prototype.unlink = function() {
          this.prev.next = this.next;
          this.next.prev = this.prev;
        };
        return LinkedDictionaryPair2;
      }();
      var HeadOrTailLinkedDictionaryPair = function() {
        function HeadOrTailLinkedDictionaryPair2() {
          this.key = null;
          this.value = null;
        }
        HeadOrTailLinkedDictionaryPair2.prototype.unlink = function() {
          this.prev.next = this.next;
          this.next.prev = this.prev;
        };
        return HeadOrTailLinkedDictionaryPair2;
      }();
      function isHeadOrTailLinkedDictionaryPair(p) {
        return !p.next;
      }
      var LinkedDictionary = function(_super) {
        __extends(LinkedDictionary2, _super);
        function LinkedDictionary2(toStrFunction) {
          var _this = _super.call(this, toStrFunction) || this;
          _this.head = new HeadOrTailLinkedDictionaryPair();
          _this.tail = new HeadOrTailLinkedDictionaryPair();
          _this.head.next = _this.tail;
          _this.tail.prev = _this.head;
          return _this;
        }
        LinkedDictionary2.prototype.appendToTail = function(entry) {
          var lastNode = this.tail.prev;
          lastNode.next = entry;
          entry.prev = lastNode;
          entry.next = this.tail;
          this.tail.prev = entry;
        };
        LinkedDictionary2.prototype.getLinkedDictionaryPair = function(key) {
          if (util.isUndefined(key)) {
            return void 0;
          }
          var k = "$" + this.toStr(key);
          var pair = this.table[k];
          return pair;
        };
        LinkedDictionary2.prototype.getValue = function(key) {
          var pair = this.getLinkedDictionaryPair(key);
          if (!util.isUndefined(pair)) {
            return pair.value;
          }
          return void 0;
        };
        LinkedDictionary2.prototype.remove = function(key) {
          var pair = this.getLinkedDictionaryPair(key);
          if (!util.isUndefined(pair)) {
            _super.prototype.remove.call(this, key);
            pair.unlink();
            return pair.value;
          }
          return void 0;
        };
        LinkedDictionary2.prototype.clear = function() {
          _super.prototype.clear.call(this);
          this.head.next = this.tail;
          this.tail.prev = this.head;
        };
        LinkedDictionary2.prototype.replace = function(oldPair, newPair) {
          var k = "$" + this.toStr(newPair.key);
          newPair.next = oldPair.next;
          newPair.prev = oldPair.prev;
          this.remove(oldPair.key);
          newPair.prev.next = newPair;
          newPair.next.prev = newPair;
          this.table[k] = newPair;
          ++this.nElements;
        };
        LinkedDictionary2.prototype.setValue = function(key, value) {
          if (util.isUndefined(key) || util.isUndefined(value)) {
            return void 0;
          }
          var existingPair = this.getLinkedDictionaryPair(key);
          var newPair = new LinkedDictionaryPair(key, value);
          var k = "$" + this.toStr(key);
          if (!util.isUndefined(existingPair)) {
            this.replace(existingPair, newPair);
            return existingPair.value;
          } else {
            this.appendToTail(newPair);
            this.table[k] = newPair;
            ++this.nElements;
            return void 0;
          }
        };
        LinkedDictionary2.prototype.keys = function() {
          var array = [];
          this.forEach(function(key, value) {
            array.push(key);
          });
          return array;
        };
        LinkedDictionary2.prototype.values = function() {
          var array = [];
          this.forEach(function(key, value) {
            array.push(value);
          });
          return array;
        };
        LinkedDictionary2.prototype.forEach = function(callback) {
          var crawlNode = this.head.next;
          while (!isHeadOrTailLinkedDictionaryPair(crawlNode)) {
            var ret = callback(crawlNode.key, crawlNode.value);
            if (ret === false) {
              return;
            }
            crawlNode = crawlNode.next;
          }
        };
        return LinkedDictionary2;
      }(Dictionary_1.default);
      exports.default = LinkedDictionary;
    }
  });

  // node_modules/typescript-collections/dist/lib/MultiDictionary.js
  var require_MultiDictionary = __commonJS({
    "node_modules/typescript-collections/dist/lib/MultiDictionary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      var Dictionary_1 = require_Dictionary();
      var arrays = require_arrays();
      var MultiDictionary = function() {
        function MultiDictionary2(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
          if (allowDuplicateValues === void 0) {
            allowDuplicateValues = false;
          }
          this.dict = new Dictionary_1.default(toStrFunction);
          this.equalsF = valuesEqualsFunction || util.defaultEquals;
          this.allowDuplicate = allowDuplicateValues;
        }
        MultiDictionary2.prototype.getValue = function(key) {
          var values = this.dict.getValue(key);
          if (util.isUndefined(values)) {
            return [];
          }
          return arrays.copy(values);
        };
        MultiDictionary2.prototype.setValue = function(key, value) {
          if (util.isUndefined(key) || util.isUndefined(value)) {
            return false;
          }
          var array = this.dict.getValue(key);
          if (util.isUndefined(array)) {
            this.dict.setValue(key, [value]);
            return true;
          }
          if (!this.allowDuplicate) {
            if (arrays.contains(array, value, this.equalsF)) {
              return false;
            }
          }
          array.push(value);
          return true;
        };
        MultiDictionary2.prototype.remove = function(key, value) {
          if (util.isUndefined(value)) {
            var v = this.dict.remove(key);
            return !util.isUndefined(v);
          }
          var array = this.dict.getValue(key);
          if (!util.isUndefined(array) && arrays.remove(array, value, this.equalsF)) {
            if (array.length === 0) {
              this.dict.remove(key);
            }
            return true;
          }
          return false;
        };
        MultiDictionary2.prototype.keys = function() {
          return this.dict.keys();
        };
        MultiDictionary2.prototype.values = function() {
          var values = this.dict.values();
          var array = [];
          for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
              var w = v_1[_a];
              array.push(w);
            }
          }
          return array;
        };
        MultiDictionary2.prototype.containsKey = function(key) {
          return this.dict.containsKey(key);
        };
        MultiDictionary2.prototype.clear = function() {
          this.dict.clear();
        };
        MultiDictionary2.prototype.size = function() {
          return this.dict.size();
        };
        MultiDictionary2.prototype.isEmpty = function() {
          return this.dict.isEmpty();
        };
        return MultiDictionary2;
      }();
      exports.default = MultiDictionary;
    }
  });

  // node_modules/typescript-collections/dist/lib/FactoryDictionary.js
  var require_FactoryDictionary = __commonJS({
    "node_modules/typescript-collections/dist/lib/FactoryDictionary.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Dictionary_1 = require_Dictionary();
      var util = require_util();
      var FactoryDictionary = function(_super) {
        __extends(FactoryDictionary2, _super);
        function FactoryDictionary2(defaultFactoryFunction, toStrFunction) {
          var _this = _super.call(this, toStrFunction) || this;
          _this.defaultFactoryFunction = defaultFactoryFunction;
          return _this;
        }
        FactoryDictionary2.prototype.setDefault = function(key, defaultValue) {
          var currentValue = _super.prototype.getValue.call(this, key);
          if (util.isUndefined(currentValue)) {
            this.setValue(key, defaultValue);
            return defaultValue;
          }
          return currentValue;
        };
        FactoryDictionary2.prototype.getValue = function(key) {
          return this.setDefault(key, this.defaultFactoryFunction());
        };
        return FactoryDictionary2;
      }(Dictionary_1.default);
      exports.default = FactoryDictionary;
    }
  });

  // node_modules/typescript-collections/dist/lib/PriorityQueue.js
  var require_PriorityQueue = __commonJS({
    "node_modules/typescript-collections/dist/lib/PriorityQueue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util = require_util();
      var Heap_1 = require_Heap();
      var PriorityQueue2 = function() {
        function PriorityQueue3(compareFunction) {
          this.heap = new Heap_1.default(util.reverseCompareFunction(compareFunction));
        }
        PriorityQueue3.prototype.enqueue = function(element) {
          return this.heap.add(element);
        };
        PriorityQueue3.prototype.add = function(element) {
          return this.heap.add(element);
        };
        PriorityQueue3.prototype.dequeue = function() {
          if (this.heap.size() !== 0) {
            var el = this.heap.peek();
            this.heap.removeRoot();
            return el;
          }
          return void 0;
        };
        PriorityQueue3.prototype.peek = function() {
          return this.heap.peek();
        };
        PriorityQueue3.prototype.contains = function(element) {
          return this.heap.contains(element);
        };
        PriorityQueue3.prototype.isEmpty = function() {
          return this.heap.isEmpty();
        };
        PriorityQueue3.prototype.size = function() {
          return this.heap.size();
        };
        PriorityQueue3.prototype.clear = function() {
          this.heap.clear();
        };
        PriorityQueue3.prototype.forEach = function(callback) {
          this.heap.forEach(callback);
        };
        return PriorityQueue3;
      }();
      exports.default = PriorityQueue2;
    }
  });

  // node_modules/typescript-collections/dist/lib/Stack.js
  var require_Stack = __commonJS({
    "node_modules/typescript-collections/dist/lib/Stack.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var LinkedList_1 = require_LinkedList();
      var Stack = function() {
        function Stack2() {
          this.list = new LinkedList_1.default();
        }
        Stack2.prototype.push = function(elem) {
          return this.list.add(elem, 0);
        };
        Stack2.prototype.add = function(elem) {
          return this.list.add(elem, 0);
        };
        Stack2.prototype.pop = function() {
          return this.list.removeElementAtIndex(0);
        };
        Stack2.prototype.peek = function() {
          return this.list.first();
        };
        Stack2.prototype.size = function() {
          return this.list.size();
        };
        Stack2.prototype.contains = function(elem, equalsFunction) {
          return this.list.contains(elem, equalsFunction);
        };
        Stack2.prototype.isEmpty = function() {
          return this.list.isEmpty();
        };
        Stack2.prototype.clear = function() {
          this.list.clear();
        };
        Stack2.prototype.forEach = function(callback) {
          this.list.forEach(callback);
        };
        return Stack2;
      }();
      exports.default = Stack;
    }
  });

  // node_modules/typescript-collections/dist/lib/MultiRootTree.js
  var require_MultiRootTree = __commonJS({
    "node_modules/typescript-collections/dist/lib/MultiRootTree.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Direction;
      (function(Direction2) {
        Direction2[Direction2["BEFORE"] = 0] = "BEFORE";
        Direction2[Direction2["AFTER"] = 1] = "AFTER";
        Direction2[Direction2["INSIDE_AT_END"] = 2] = "INSIDE_AT_END";
        Direction2[Direction2["INSIDE_AT_START"] = 3] = "INSIDE_AT_START";
      })(Direction || (Direction = {}));
      var MultiRootTree = function() {
        function MultiRootTree2(rootIds, nodes) {
          if (rootIds === void 0) {
            rootIds = [];
          }
          if (nodes === void 0) {
            nodes = {};
          }
          this.rootIds = rootIds;
          this.nodes = nodes;
          this.initRootIds();
          this.initNodes();
        }
        MultiRootTree2.prototype.initRootIds = function() {
          for (var _i = 0, _a = this.rootIds; _i < _a.length; _i++) {
            var rootId = _a[_i];
            this.createEmptyNodeIfNotExist(rootId);
          }
        };
        MultiRootTree2.prototype.initNodes = function() {
          for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
              for (var _i = 0, _a = this.nodes[nodeKey]; _i < _a.length; _i++) {
                var nodeListItem = _a[_i];
                this.createEmptyNodeIfNotExist(nodeListItem);
              }
            }
          }
        };
        MultiRootTree2.prototype.createEmptyNodeIfNotExist = function(nodeKey) {
          if (!this.nodes[nodeKey]) {
            this.nodes[nodeKey] = [];
          }
        };
        MultiRootTree2.prototype.getRootIds = function() {
          var clone = this.rootIds.slice();
          return clone;
        };
        MultiRootTree2.prototype.getNodes = function() {
          var clone = {};
          for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
              clone[nodeKey] = this.nodes[nodeKey].slice();
            }
          }
          return clone;
        };
        MultiRootTree2.prototype.getObject = function() {
          return {
            rootIds: this.getRootIds(),
            nodes: this.getNodes()
          };
        };
        MultiRootTree2.prototype.toObject = function() {
          return this.getObject();
        };
        MultiRootTree2.prototype.flatten = function() {
          var _this = this;
          var extraPropsObject = [];
          for (var i = 0; i < this.rootIds.length; i++) {
            var rootId = this.rootIds[i];
            extraPropsObject.push({
              id: rootId,
              level: 0,
              hasParent: false,
              childrenCount: 0
            });
            traverse(rootId, this.nodes, extraPropsObject, 0);
          }
          for (var _i = 0, extraPropsObject_1 = extraPropsObject; _i < extraPropsObject_1.length; _i++) {
            var o = extraPropsObject_1[_i];
            o.childrenCount = countChildren(o.id);
          }
          return extraPropsObject;
          function countChildren(id) {
            if (!_this.nodes[id]) {
              return 0;
            } else {
              var childrenCount = _this.nodes[id].length;
              return childrenCount;
            }
          }
          function traverse(startId, nodes, returnArray, level) {
            if (level === void 0) {
              level = 0;
            }
            if (!startId || !nodes || !returnArray || !nodes[startId]) {
              return;
            }
            level++;
            var idsList = nodes[startId];
            for (var i2 = 0; i2 < idsList.length; i2++) {
              var id = idsList[i2];
              returnArray.push({ id, level, hasParent: true });
              traverse(id, nodes, returnArray, level);
            }
            level--;
          }
        };
        MultiRootTree2.prototype.moveIdBeforeId = function(moveId, beforeId) {
          return this.moveId(moveId, beforeId, Direction.BEFORE);
        };
        MultiRootTree2.prototype.moveIdAfterId = function(moveId, afterId) {
          return this.moveId(moveId, afterId, Direction.AFTER);
        };
        MultiRootTree2.prototype.moveIdIntoId = function(moveId, insideId, atStart) {
          if (atStart === void 0) {
            atStart = true;
          }
          if (atStart) {
            return this.moveId(moveId, insideId, Direction.INSIDE_AT_START);
          } else {
            return this.moveId(moveId, insideId, Direction.INSIDE_AT_END);
          }
        };
        MultiRootTree2.prototype.swapRootIdWithRootId = function(rootId, withRootId) {
          var leftIndex = this.findRootId(rootId);
          var rightIndex = this.findRootId(withRootId);
          this.swapRootPositionWithRootPosition(leftIndex, rightIndex);
        };
        MultiRootTree2.prototype.swapRootPositionWithRootPosition = function(swapRootPosition, withRootPosition) {
          var temp = this.rootIds[withRootPosition];
          this.rootIds[withRootPosition] = this.rootIds[swapRootPosition];
          this.rootIds[swapRootPosition] = temp;
        };
        MultiRootTree2.prototype.deleteId = function(id) {
          this.rootDeleteId(id);
          this.nodeAndSubNodesDelete(id);
          this.nodeRefrencesDelete(id);
        };
        MultiRootTree2.prototype.insertIdBeforeId = function(beforeId, insertId) {
          var foundRootIdIndex = this.findRootId(beforeId);
          if (foundRootIdIndex > -1) {
            this.insertIdIntoRoot(insertId, foundRootIdIndex);
          }
          for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
              var foundNodeIdIndex = this.findNodeId(nodeKey, beforeId);
              if (foundNodeIdIndex > -1) {
                this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex);
              }
            }
          }
        };
        MultiRootTree2.prototype.insertIdAfterId = function(belowId, insertId) {
          var foundRootIdIndex = this.findRootId(belowId);
          if (foundRootIdIndex > -1) {
            this.insertIdIntoRoot(insertId, foundRootIdIndex + 1);
          }
          for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
              var foundNodeIdIndex = this.findNodeId(nodeKey, belowId);
              if (foundNodeIdIndex > -1) {
                this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex + 1);
              }
            }
          }
        };
        MultiRootTree2.prototype.insertIdIntoId = function(insideId, insertId) {
          this.nodeInsertAtEnd(insideId, insertId);
          this.nodes[insertId] = [];
        };
        MultiRootTree2.prototype.insertIdIntoRoot = function(id, position) {
          if (position === void 0) {
            this.rootInsertAtEnd(id);
          } else {
            if (position < 0) {
              var length_1 = this.rootIds.length;
              this.rootIds.splice(position + length_1 + 1, 0, id);
            } else {
              this.rootIds.splice(position, 0, id);
            }
          }
          this.nodes[id] = this.nodes[id] || [];
        };
        MultiRootTree2.prototype.insertIdIntoNode = function(nodeKey, id, position) {
          this.nodes[nodeKey] = this.nodes[nodeKey] || [];
          this.nodes[id] = this.nodes[id] || [];
          if (position === void 0) {
            this.nodeInsertAtEnd(nodeKey, id);
          } else {
            if (position < 0) {
              var length_2 = this.nodes[nodeKey].length;
              this.nodes[nodeKey].splice(position + length_2 + 1, 0, id);
            } else {
              this.nodes[nodeKey].splice(position, 0, id);
            }
          }
        };
        MultiRootTree2.prototype.moveId = function(moveId, beforeId, direction) {
          var sourceId = moveId;
          var sourceRootIndex = this.findRootId(sourceId);
          var sourceNodeKey;
          var sourceNodeIdIndex;
          if (this.nodes[beforeId]) {
            sourceNodeKey = beforeId;
          }
          for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
              sourceNodeIdIndex = this.findNodeId(nodeKey, beforeId);
              break;
            }
          }
          var targetId = beforeId;
          var targetRootIndex = this.findRootId(targetId);
          var targetNodeKey;
          var targetNodeIdIndex;
          if (this.nodes[beforeId]) {
            targetNodeKey = beforeId;
          }
          for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
              targetNodeIdIndex = this.findNodeId(nodeKey, beforeId);
              break;
            }
          }
          if (sourceRootIndex > -1) {
            if (targetRootIndex > -1) {
              this.rootDelete(sourceRootIndex);
              if (targetRootIndex > sourceRootIndex) {
                targetRootIndex--;
              } else {
              }
              switch (direction) {
                case Direction.BEFORE:
                  this.insertIdIntoRoot(sourceId, targetRootIndex);
                  break;
                case Direction.AFTER:
                  this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                  break;
                case Direction.INSIDE_AT_START:
                  this.nodeInsertAtStart(targetId, sourceId);
                  break;
                case Direction.INSIDE_AT_END:
                  this.nodeInsertAtEnd(targetId, sourceId);
                  break;
              }
            } else {
              this.rootDelete(sourceRootIndex);
              for (var nodeKey in this.nodes) {
                if (this.nodes.hasOwnProperty(nodeKey)) {
                  var index = this.findNodeId(nodeKey, targetId);
                  if (index > -1) {
                    switch (direction) {
                      case Direction.BEFORE:
                        this.insertIdIntoNode(nodeKey, sourceId, index);
                        break;
                      case Direction.AFTER:
                        this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                        break;
                      case Direction.INSIDE_AT_START:
                        this.nodeInsertAtStart(targetId, sourceId);
                        break;
                      case Direction.INSIDE_AT_END:
                        this.nodeInsertAtEnd(targetId, sourceId);
                        break;
                    }
                    break;
                  }
                }
              }
            }
          } else {
            if (targetRootIndex > -1) {
              for (var nodeKey in this.nodes) {
                if (this.nodes.hasOwnProperty(nodeKey)) {
                  var index = this.findNodeId(nodeKey, sourceId);
                  if (index > -1) {
                    this.nodeDeleteAtIndex(nodeKey, index);
                    break;
                  }
                }
              }
              switch (direction) {
                case Direction.BEFORE:
                  this.insertIdIntoRoot(sourceId, targetRootIndex);
                  break;
                case Direction.AFTER:
                  this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                  break;
                case Direction.INSIDE_AT_START:
                  this.nodeInsertAtStart(targetId, sourceId);
                  break;
                case Direction.INSIDE_AT_END:
                  this.nodeInsertAtEnd(targetId, sourceId);
                  break;
              }
            } else {
              for (var nodeKey in this.nodes) {
                if (this.nodes.hasOwnProperty(nodeKey)) {
                  var index = this.findNodeId(nodeKey, sourceId);
                  if (index > -1) {
                    this.nodeDeleteAtIndex(nodeKey, index);
                    break;
                  }
                }
              }
              for (var nodeKey in this.nodes) {
                if (this.nodes.hasOwnProperty(nodeKey)) {
                  var index = this.findNodeId(nodeKey, targetId);
                  if (index > -1) {
                    switch (direction) {
                      case Direction.BEFORE:
                        this.insertIdIntoNode(nodeKey, sourceId, index);
                        break;
                      case Direction.AFTER:
                        this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                        break;
                      case Direction.INSIDE_AT_START:
                        this.nodeInsertAtStart(targetId, sourceId);
                        break;
                      case Direction.INSIDE_AT_END:
                        this.nodeInsertAtEnd(targetId, sourceId);
                        break;
                    }
                    break;
                  }
                }
              }
            }
          }
        };
        MultiRootTree2.prototype.swapArrayElements = function(arr, indexA, indexB) {
          var temp = arr[indexA];
          arr[indexA] = arr[indexB];
          arr[indexB] = temp;
          return arr;
        };
        MultiRootTree2.prototype.rootDeleteId = function(id) {
          var index = this.findRootId(id);
          if (index > -1) {
            this.rootDelete(index);
          }
        };
        MultiRootTree2.prototype.nodeAndSubNodesDelete = function(nodeKey) {
          var toDeleteLater = [];
          for (var i = 0; i < this.nodes[nodeKey].length; i++) {
            var id = this.nodes[nodeKey][i];
            this.nodeAndSubNodesDelete(id);
            toDeleteLater.push(nodeKey);
          }
          this.nodeDelete(nodeKey);
          for (var i = 0; i < toDeleteLater.length; i++) {
            this.nodeDelete(toDeleteLater[i]);
          }
        };
        MultiRootTree2.prototype.nodeRefrencesDelete = function(id) {
          for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
              for (var i = 0; i < this.nodes[nodeKey].length; i++) {
                var targetId = this.nodes[nodeKey][i];
                if (targetId === id) {
                  this.nodeDeleteAtIndex(nodeKey, i);
                }
              }
            }
          }
        };
        MultiRootTree2.prototype.nodeDelete = function(nodeKey) {
          delete this.nodes[nodeKey];
        };
        MultiRootTree2.prototype.findRootId = function(id) {
          return this.rootIds.indexOf(id);
        };
        MultiRootTree2.prototype.findNodeId = function(nodeKey, id) {
          return this.nodes[nodeKey].indexOf(id);
        };
        MultiRootTree2.prototype.findNode = function(nodeKey) {
          return this.nodes[nodeKey];
        };
        MultiRootTree2.prototype.nodeInsertAtStart = function(nodeKey, id) {
          this.nodes[nodeKey].unshift(id);
        };
        MultiRootTree2.prototype.nodeInsertAtEnd = function(nodeKey, id) {
          this.nodes[nodeKey].push(id);
        };
        MultiRootTree2.prototype.rootDelete = function(index) {
          this.rootIds.splice(index, 1);
        };
        MultiRootTree2.prototype.nodeDeleteAtIndex = function(nodeKey, index) {
          this.nodes[nodeKey].splice(index, 1);
        };
        MultiRootTree2.prototype.rootInsertAtStart = function(id) {
          this.rootIds.unshift(id);
        };
        MultiRootTree2.prototype.rootInsertAtEnd = function(id) {
          this.rootIds.push(id);
        };
        return MultiRootTree2;
      }();
      exports.default = MultiRootTree;
    }
  });

  // node_modules/typescript-collections/dist/lib/index.js
  var require_lib = __commonJS({
    "node_modules/typescript-collections/dist/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _arrays = require_arrays();
      exports.arrays = _arrays;
      var Bag_1 = require_Bag();
      exports.Bag = Bag_1.default;
      var BSTree_1 = require_BSTree();
      exports.BSTree = BSTree_1.default;
      var BSTreeKV_1 = require_BSTreeKV();
      exports.BSTreeKV = BSTreeKV_1.default;
      var Dictionary_1 = require_Dictionary();
      exports.Dictionary = Dictionary_1.default;
      var Heap_1 = require_Heap();
      exports.Heap = Heap_1.default;
      var LinkedDictionary_1 = require_LinkedDictionary();
      exports.LinkedDictionary = LinkedDictionary_1.default;
      var LinkedList_1 = require_LinkedList();
      exports.LinkedList = LinkedList_1.default;
      var MultiDictionary_1 = require_MultiDictionary();
      exports.MultiDictionary = MultiDictionary_1.default;
      var FactoryDictionary_1 = require_FactoryDictionary();
      exports.FactoryDictionary = FactoryDictionary_1.default;
      var FactoryDictionary_2 = require_FactoryDictionary();
      exports.DefaultDictionary = FactoryDictionary_2.default;
      var Queue_1 = require_Queue();
      exports.Queue = Queue_1.default;
      var PriorityQueue_1 = require_PriorityQueue();
      exports.PriorityQueue = PriorityQueue_1.default;
      var Set_1 = require_Set();
      exports.Set = Set_1.default;
      var Stack_1 = require_Stack();
      exports.Stack = Stack_1.default;
      var MultiRootTree_1 = require_MultiRootTree();
      exports.MultiRootTree = MultiRootTree_1.default;
      var _util = require_util();
      exports.util = _util;
    }
  });

  // src/models/Solver.ts
  var Solver = class {
    start;
    end;
    stop;
    constructor(start, end) {
      this.start = start;
      this.end = end;
      this.stop = false;
    }
    printPath(end) {
      let count = 0;
      this.getPath(end).forEach((node) => {
        console.log(JSON.stringify(node.board));
        count++;
      });
      console.log(`Length of path is ${count - 1}`);
    }
    getPath(end) {
      const path = [];
      while (end.parent !== null) {
        path.push(end);
        end = end.parent;
      }
      path.push(end);
      return path.reverse();
    }
    exit() {
      this.stop = true;
    }
  };

  // src/models/BFSSolver.ts
  var BFSSolver = class extends Solver {
    constructor(start, end) {
      super(start, end);
    }
    solve() {
      console.log("Solving with BFS");
      const queue = [];
      queue.push(this.start);
      const visited = /* @__PURE__ */ new Set();
      while (queue.length !== 0) {
        const node = queue.shift();
        if (this.stop) {
          return [null, -1];
        }
        if (!node) {
          continue;
        }
        visited.add(node.toString());
        if (node.isSame(this.end)) {
          return [node, visited.size];
        }
        const [x, y] = node.find(0);
        node.getChildren(x, y).forEach(([ox, oy, direction]) => {
          const newNode = node.createChild(direction);
          newNode.setValue(x, y, node.getValue(ox, oy));
          newNode.setValue(ox, oy, 0);
          if (visited.has(newNode.toString())) {
            return;
          }
          queue.push(newNode);
        });
      }
      return [null, -1];
    }
  };

  // src/models/AStarSolver.ts
  var import_typescript_collections = __toESM(require_lib());
  var AStarSolver = class extends Solver {
    constructor(start, end) {
      super(start, end);
    }
    solve() {
      console.log("Solving with A*");
      const q = new import_typescript_collections.PriorityQueue((a, b) => {
        if (a.getCost(this.end) < b.getCost(this.end)) {
          return 1;
        }
        if (a.getCost(this.end) > b.getCost(this.end)) {
          return -1;
        }
        return 0;
      });
      const closed = /* @__PURE__ */ new Set();
      q.add(this.start);
      while (q.size() !== 0) {
        const node = q.dequeue();
        if (this.stop) {
          return [null, -1];
        }
        if (!node) {
          continue;
        }
        if (node.isSame(this.end)) {
          console.log("Found goal, exiting");
          return [node, closed.size];
        }
        const [x, y] = node.find(0);
        node.getChildren(x, y).forEach(([ox, oy, direction]) => {
          const newNode = node.createChild(direction);
          newNode.setValue(x, y, node.getValue(ox, oy));
          newNode.setValue(ox, oy, 0);
          if (closed.has(newNode.toString())) {
            return;
          }
          q.add(newNode);
        });
        closed.add(node.toString());
      }
      return [null, -1];
    }
  };

  // src/models/Node.ts
  var Node = class {
    board;
    parent;
    depth;
    direction;
    constructor(board, parent, depth, direction) {
      this.board = board;
      this.parent = parent;
      this.depth = depth;
      this.direction = direction;
    }
    getChildren(x, y) {
      const offsets = [[1, 0, "right"], [-1, 0, "left"], [0, 1, "down"], [0, -1, "up"]];
      const res = [];
      offsets.forEach(([ox, oy, direction]) => {
        const newX = ox + x;
        const newY = oy + y;
        if (newX < 0 || newY < 0 || newX >= this.board[0].length || newY >= this.board.length) {
          return;
        }
        res.push([newX, newY, direction]);
      });
      return res;
    }
    find(target) {
      let res = null;
      this.board.forEach((row, y) => {
        row.forEach((val, x) => {
          if (val === target) {
            res = [x, y];
          }
        });
      });
      if (res) {
        return res;
      }
      throw new Error("Empty cell not found.");
    }
    getValue(x, y) {
      const num = this.board[y][x];
      if (num !== null) {
        return num;
      }
      throw new Error("Invalid coordinates");
    }
    setValue(x, y, val) {
      this.board[y][x] = val;
    }
    isSame(other) {
      return this.board.toString() === other.board.toString();
    }
    toString() {
      return this.board.flat().join("");
    }
    createChild(direction) {
      const newBoard = this.copyBoard();
      return new Node(newBoard, this, this.depth + 1, direction);
    }
    copyBoard() {
      return this.board.map((arr) => {
        return arr.slice();
      });
    }
    isSolvable(goal) {
      let inversions = 0;
      const flatten = this.board.flat();
      const values = new Array(9).fill(0);
      goal.board.flat().forEach((el, idx) => {
        if (el === null) {
          return;
        }
        values[el] = idx;
      });
      flatten.forEach((el, idx) => {
        for (let j = idx + 1; j < 9; j++) {
          if (!el || !flatten || !flatten[j]) {
            continue;
          }
          if (el !== 0 && flatten[j] !== 0 && values[el] > values[flatten[j]]) {
            inversions++;
          }
        }
      });
      return inversions % 2 === 0;
    }
    getManhattanDistance(goal) {
      let score = 0;
      this.board.forEach((row, y) => {
        row.forEach((val, x) => {
          if (!val) {
            return;
          }
          const [targetX, targetY] = goal.find(val);
          score += Math.abs(targetX - x) + Math.abs(targetY - y);
        });
      });
      return score;
    }
    static fromString(input, depth, parent = null) {
      if (input.length !== 9) {
        throw new Error("Input length has to be 9 characters");
      }
      const arr = [];
      let temp = [];
      [...input].forEach((ch, idx) => {
        if (idx !== 0 && idx % 3 === 0) {
          arr.push(temp);
          temp = [];
        }
        temp.push(Number(ch));
      });
      arr.push(temp);
      return new Node(arr, parent, depth, "");
    }
    static fromObject(payload) {
      if (payload.parent === null) {
        return new Node(payload.board, payload.parent, payload.depth, payload.direction);
      }
      return new Node(payload.board, Node.fromObject(payload.parent), payload.depth, payload.direction);
    }
    getCost(goal) {
      const h = this.getManhattanDistance(goal);
      const g = this.depth;
      return g + h;
    }
    display() {
      this.board.forEach((row) => {
        let temp = "";
        row.forEach((val) => {
          temp += `${val} `;
        });
        console.log(temp);
      });
    }
  };

  // src/worker.ts
  self.onmessage = (message) => {
    let { data: { start, end, algorithm } } = message;
    const solverClass = algorithm === "astar" ? AStarSolver : BFSSolver;
    start = Node.fromObject(start);
    end = Node.fromObject(end);
    const startTime = Date.now();
    const solver = new solverClass(start, end);
    const [node, explored] = solver.solve();
    const elapsedTime = (Date.now() - startTime) / 1e3;
    postMessage({ node, explored, elapsedTime });
  };
})();
