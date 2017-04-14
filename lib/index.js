'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// http://ramdajs.com/docs/#map

var arr = [1, 2, 3, 4, 5];
var sum = function sum(a, b) {
  return a + b;
};

console.log(arr.reduce(sum, 0));

// 变形
var plusOne = function plusOne(x) {
  return x + 1;
};

console.log(arr.map(plusOne));

// 累积
var append = function append(newArr, x) {
  newArr.push(x);
  return newArr;
};

console.log(_ramda2.default.transduce(_ramda2.default.map(plusOne), append, [], arr));

var squar = function squar(x) {
  return x * x;
};

console.log(_ramda2.default.transduce(_ramda2.default.map(_ramda2.default.pipe(plusOne, squar)), append, [], arr));

console.log(_ramda2.default.into([5, 6], _ramda2.default.pipe(_ramda2.default.take(2), _ramda2.default.map(_ramda2.default.add(1))), [2, 3, 4, 5]));

console.log('Transduce: ', _ramda2.default.transduce(_ramda2.default.map(_ramda2.default.add(1)), append, [], [1, 2, 3, 4]));
console.log('Into: ', _ramda2.default.into([], _ramda2.default.map(_ramda2.default.add(1)), [1, 2, 3, 4]));

// Pointfree

// 找出最长的字符有多少个字符
var str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
var getMaxWordLength = _ramda2.default.pipe(_ramda2.default.split(' '), _ramda2.default.map(_ramda2.default.length), _ramda2.default.reduce(_ramda2.default.max, 0));

console.log(getMaxWordLength(str));

var data = {
  result: "SUCCESS",
  interfaceVersion: "1.0.3",
  requested: "10/17/2013 15:31:20",
  lastUpdated: "10/16/2013 10:52:39",
  tasks: [{ id: 104, complete: false, priority: "high",
    dueDate: "2013-11-29", username: "Scott",
    title: "Do something", created: "9/22/2013" }, { id: 105, complete: false, priority: "medium",
    dueDate: "2013-11-22", username: "Lena",
    title: "Do something else", created: "9/22/2013" }, { id: 107, complete: true, priority: "high",
    dueDate: "2013-11-22", username: "Mike",
    title: "Fix the foo", created: "9/22/2013" }, { id: 108, complete: false, priority: "low",
    dueDate: "2013-11-15", username: "Punam",
    title: "Adjust the bar", created: "9/25/2013" }, { id: 110, complete: false, priority: "medium",
    dueDate: "2013-11-15", username: "Scott",
    title: "Rename everything", created: "10/2/2013" }, { id: 112, complete: true, priority: "high",
    dueDate: "2013-11-27", username: "Lena",
    title: "Alter all quuxes", created: "10/5/2013" }]
};

var fetchData = function fetchData() {
  return Promise.resolve().then(function () {
    return data;
  });
};

var getNotCompleteTaskByName = function getNotCompleteTaskByName(name) {
  return fetchData().then(_ramda2.default.prop('tasks')).then(_ramda2.default.filter(_ramda2.default.propEq('username', name))).then(_ramda2.default.reject(_ramda2.default.propEq('complete', true))).then(_ramda2.default.map(_ramda2.default.pick(['id', 'dueDate', 'title', 'priority']))).then(_ramda2.default.sortBy(_ramda2.default.ascend, _ramda2.default.prop('dueDate')));
};

getNotCompleteTaskByName('Scott').then(function (res) {
  console.log('Scott does not complete: ', res);
});

// 函子

var Functor = function () {
  function Functor(val) {
    _classCallCheck(this, Functor);

    this.val = val;
  }

  _createClass(Functor, [{
    key: 'map',
    value: function map(f) {
      return new Functor(f(this.val));
    }
  }]);

  return Functor;
}();

Functor.of = function (val) {
  return new Functor(val);
};

Functor.of(2).map(function (two) {
  return two + 2;
});

/*
Functor.of(null).map(function (s) {
  return s.toUpperCase();
});
*/

var Maybe = function (_Functor) {
  _inherits(Maybe, _Functor);

  function Maybe() {
    _classCallCheck(this, Maybe);

    return _possibleConstructorReturn(this, (Maybe.__proto__ || Object.getPrototypeOf(Maybe)).apply(this, arguments));
  }

  _createClass(Maybe, [{
    key: 'map',
    value: function map(f) {
      return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
    }
  }]);

  return Maybe;
}(Functor);

Maybe.of(null).map(function (s) {
  return s.toUpperCase();
});

// class Either extends Functor {
//   constructor(left, right) {
//     this.left = left;
//     this.right = right;
//   }

//   map(f) {
//     return this.right ? 
//       Either.of(this.left, f(this.right)) :
//       Either.of(f(this.left), this.right);
//   }
// }

// Either.of = function (left, right) {
//   return new Either(left, right);
// };


// var addOne = function (x) {
//   return x + 1;
// };

// Either.of(5, 6).map(addOne);
// // Either(5, 7);

// Either.of(1, null).map(addOne);
// // Either(2, null);