import R from 'ramda'

const out = input => console.log(input)

// 比较运算
out(R.gt(2)(1))
out(R.gte(2)(2))

out(R.lt(2)(1))
out(R.lte(2)(2))

out(R.equals(1)(1))
out(R.equals(1)('1'))
out(R.equals([1, 2, 3])(['1', '2', '3']))
out(R.eqBy(Math.abs, 5)(-5))

out(R.add(1)(3))
out(R.subtract(3)(2))
out(R.multiply(2)(3))
out(R.divide(4)(2))

const gt10 = x => x > 10;
const even = x => x % 2 === 0;

const eitherT = R.either(gt10, even)
out(eitherT(4))

const bothT = R.both(gt10, even)
out(bothT(4))

const allPassT = R.allPass([gt10, even])
out(allPassT(4))

//test match
out(R.split('.', 'a.b.c.d'))

// Function

// 从右往左执行
out(R.compose(Math.abs, R.add(1), R.multiply(2))(-4))

// 从左往右执行
out(R.pipe(Math.abs, R.add(1), R.multiply(2))(-4))

const sumOfArr = arr => {
  var sum = 0;
  arr.forEach(i => sum += i);
  return sum;
};
const lengthOfArr = arr => arr.length;

const average = R.converge(R.divide, [sumOfArr, lengthOfArr])
out(average([1, 2, 3, 4, 5, 6, 7]))

const sum4 = (a, b, c, d) => a + b + c + d
const currySum4 = R.curry(sum4)

out(currySum4(1)(2)(3)(4))

const multiple2 = (a, b) => a * b
const t1 = R.partial(multiple2, [2])
out(t1(3)) 

const decreaseOne = x => x - 1;
const increaseOne = x => x + 1;

out(R.useWith(Math.pow, [decreaseOne, increaseOne])(3, 4)) // 32
out(R.useWith(Math.pow, [decreaseOne, increaseOne])(3)(4)) // 32

const productOfArr = arr => {
    let product = 1;
    arr.forEach(i => product *= i)
    return product
}

let count = 0
const factorial = R.memoize(n => {
  count += 1;
  return productOfArr(R.range(1, n + 1));
});
factorial(5)
factorial(5)
factorial(5)
out('count: ', count)

// http://www.ruanyifeng.com/blog/2017/03/ramda.html
// http://ramdajs.com/docs/#range
// http://fr.umio.us/the-philosophy-of-ramda/#header