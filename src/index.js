import R from 'ramda'
// http://ramdajs.com/docs/#map

const arr = [1, 2, 3, 4, 5]
const sum = (a, b) => a + b

console.log(arr.reduce(sum, 0))

// 变形
const plusOne = x => x + 1

console.log(arr.map(plusOne))

// 累积
const append = (newArr, x) => {
    newArr.push(x)
    return newArr
}

console.log(R.transduce(R.map(plusOne), append, [], arr))

const squar = x => x * x

console.log(R.transduce(R.map(R.pipe(plusOne, squar)), append, [], arr))

console.log(R.into(
    [5, 6],
    R.pipe(R.take(2), R.map(R.add(1))),
    [2, 3, 4, 5]
))

console.log('Transduce: ', R.transduce(R.map(R.add(1)), append, [], [1, 2, 3, 4]))
console.log('Into: ', R.into([], R.map(R.add(1)), [1, 2, 3, 4]))


// Pointfree

// 找出最长的字符有多少个字符
const str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
const getMaxWordLength = R.pipe(
    R.split(' '),
    R.map(R.length),
    R.reduce(R.max, 0)
)

console.log(getMaxWordLength(str))

var data = {
    result: "SUCCESS",
    interfaceVersion: "1.0.3",
    requested: "10/17/2013 15:31:20",
    lastUpdated: "10/16/2013 10:52:39",
    tasks: [
        {id: 104, complete: false,            priority: "high",
                  dueDate: "2013-11-29",      username: "Scott",
                  title: "Do something",      created: "9/22/2013"},
        {id: 105, complete: false,            priority: "medium",
                  dueDate: "2013-11-22",      username: "Lena",
                  title: "Do something else", created: "9/22/2013"},
        {id: 107, complete: true,             priority: "high",
                  dueDate: "2013-11-22",      username: "Mike",
                  title: "Fix the foo",       created: "9/22/2013"},
        {id: 108, complete: false,            priority: "low",
                  dueDate: "2013-11-15",      username: "Punam",
                  title: "Adjust the bar",    created: "9/25/2013"},
        {id: 110, complete: false,            priority: "medium",
                  dueDate: "2013-11-15",      username: "Scott",
                  title: "Rename everything", created: "10/2/2013"},
        {id: 112, complete: true,             priority: "high",
                  dueDate: "2013-11-27",      username: "Lena",
                  title: "Alter all quuxes",  created: "10/5/2013"}
    ]
};

const fetchData = () => {
    return Promise.resolve().then(() => {
        return data
    })
}

const getNotCompleteTaskByName = (name) => {
    return fetchData()
        .then(R.prop('tasks'))
        .then(R.filter(R.propEq('username', name)))
        .then(R.reject(R.propEq('complete', true)))
        .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
        .then(R.sortBy(R.ascend, R.prop('dueDate')))
}

getNotCompleteTaskByName('Scott').then(res => { console.log('Scott does not complete: ', res) })


// 函子
class Functor {
  constructor(val) { 
    this.val = val; 
  }

  map(f) {
    return new Functor(f(this.val));
  }
}

Functor.of = function(val) {
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

class Maybe extends Functor {
  map(f) {
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
  }
}

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