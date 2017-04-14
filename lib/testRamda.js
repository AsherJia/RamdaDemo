'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var out = function out(input) {
  return console.log(input);
};

// 比较运算
out(_ramda2.default.gt(2)(1));
out(_ramda2.default.gte(2)(2));

out(_ramda2.default.lt(2)(1));
out(_ramda2.default.lte(2)(2));

out(_ramda2.default.equals(1)(1));
out(_ramda2.default.equals(1)('1'));
out(_ramda2.default.equals([1, 2, 3])(['1', '2', '3']));
out(_ramda2.default.eqBy(Math.abs, 5)(-5));

out(_ramda2.default.add(1)(3));
out(_ramda2.default.subtract(3)(2));
out(_ramda2.default.multiply(2)(3));
out(_ramda2.default.divide(4)(2));

var gt10 = function gt10(x) {
  return x > 10;
};
var even = function even(x) {
  return x % 2 === 0;
};

var eitherT = _ramda2.default.either(gt10, even);
out(eitherT(4));

var bothT = _ramda2.default.both(gt10, even);
out(bothT(4));

var allPassT = _ramda2.default.allPass([gt10, even]);
out(allPassT(4));

//test match
out(_ramda2.default.split('.', 'a.b.c.d'));

// Function

// 从右往左执行
out(_ramda2.default.compose(Math.abs, _ramda2.default.add(1), _ramda2.default.multiply(2))(-4));

// 从左往右执行
out(_ramda2.default.pipe(Math.abs, _ramda2.default.add(1), _ramda2.default.multiply(2))(-4));

var sumOfArr = function sumOfArr(arr) {
  var sum = 0;
  arr.forEach(function (i) {
    return sum += i;
  });
  return sum;
};
var lengthOfArr = function lengthOfArr(arr) {
  return arr.length;
};

var average = _ramda2.default.converge(_ramda2.default.divide, [sumOfArr, lengthOfArr]);
out(average([1, 2, 3, 4, 5, 6, 7]));

var sum4 = function sum4(a, b, c, d) {
  return a + b + c + d;
};
var currySum4 = _ramda2.default.curry(sum4);

out(currySum4(1)(2)(3)(4));

var multiple2 = function multiple2(a, b) {
  return a * b;
};
var t1 = _ramda2.default.partial(multiple2, [2]);
out(t1(3));

var decreaseOne = function decreaseOne(x) {
  return x - 1;
};
var increaseOne = function increaseOne(x) {
  return x + 1;
};

out(_ramda2.default.useWith(Math.pow, [decreaseOne, increaseOne])(3, 4)); // 32
out(_ramda2.default.useWith(Math.pow, [decreaseOne, increaseOne])(3)(4)); // 32

var productOfArr = function productOfArr(arr) {
  var product = 1;
  arr.forEach(function (i) {
    return product *= i;
  });
  return product;
};

var count = 0;
var factorial = _ramda2.default.memoize(function (n) {
  count += 1;
  return productOfArr(_ramda2.default.range(1, n + 1));
});
factorial(5);
factorial(5);
factorial(5);
out('count: ', count);

// http://www.ruanyifeng.com/blog/2017/03/ramda.html
// http://ramdajs.com/docs/#range