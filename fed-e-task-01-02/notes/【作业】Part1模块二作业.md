1.描述引用计数的工作原理和优缺点
* 核心思想：设置引用数，判断当前引用数是否为0
* 引用计数器
* 引用关系改变时修改引用数字
* 引用数字为0时立即回收

优点：
* 发现垃圾时立即回收
* 最大限度的减少程序暂停

缺点：
* 无法回收循环引用的对象
* 时间开销大

2.标记整理算法的工作流程
* 遍历所有对象找标记活动对象（找到所有可达对象，进行标记）
* 执行整理，移动活动对象位置
* 遍历所有对象清除没有标记对象，回收相应的空间


3.描述V8中新生代存储区垃圾回收流程。
* 回收过程采用复制算法+标记整理
* 新生代内存区分为两个等大小空间
* 使用空间为From，空闲空间为To
* 活动对象存储于From空间
* 标记整理后将活动对象拷贝至To  （触发GC时）
* From与To交换后完成释放   （From空间完全释放，From 变成To，To变成From）
* 拷贝过程中可能出现晋升
* 晋升就是将新生代对象移动至老生代
  * 一轮GC还存活的新生代需要晋升
  * To空间的使用率超过25%

4.描述增量标记算法在何时使用，及工作原理
* 程序执行的空档期，垃圾回收会阻塞程序执行
* 一整段垃圾回收操作拆分成多个小步组合完成当前整个回收过程
* 遍历对象进行标记  （并不一次性执行完）
* 垃圾回收与程序交替执行


代码题1
练习1
```javascript
// let isLastInStock = function(cars){
//     //获取最后一条数据
//     let last_car = fp.last(cars);
//     //获取最后一条数据的in_stock属性值
//     return fp.prop('in_stock',last_car)
// }

const fp = require('lodash/fp');
const cars = [{
        name: "Ferrari FF",
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    }, {
        name: "Spyker C12 zagato",
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    }, {
        name: "Jaguar XKR-S",
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    }, {
        name: "Audi R8",
        horsepower: 525,
        dollar_value: 114200,
        in__stock: false
    }, {
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: "Pagani Huayra",
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    }
];

const fp = require('lodash/fp');
const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars))
```

练习2
```javascript
const isFirstName = fp.flowRight(fp.prop('name'),fp.first);
console.log(isFirstName(cars));
```
练习3
```javascript
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}

let dollar_values = function (cars) {
    return fp.map(
        (car) => car.dollar_value,
        cars)
}
let averageDollarValue = fp.flowRight(_average, dollar_values);
console.log(averageDollarValue(cars))
```

练习4
```javascript
let _underscore = fp.replace(/\W+/g,'_') //<-- 无须改动，并在sanitizeNames
let log = v=>{
    console.log(v);
    return v;
}
let sanitizeNames = fp.map(fp.flowRight(_underscore,fp.toLower,fp.prop('name')));
console.log(sanitizeNames(cars))
```

代码题2
练习1
```javascript
const fp = require('lodash/fp');
const {Maybe,Container} = require('./support');
let maybe = Maybe.of([5,6,1])
let ex1 = maybe.map(arr=>fp.map(fp.add(1),arr))
console.log(ex1);
```


练习2
```javascript
const fp = require( 'lodash/fp')
const { Maybe, Container } = require('./support')

let xs = Container.of(['do', 'ray','me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(arr=>fp.first(arr))
console.log(ex2);
```


练习3
```javascript
const fp = require( 'lodash/fp')
const { Maybe, Container } = require('./support')

let  safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x])
});
let user = {id:2,name:'Albert'}
let ex3 = safeProp('name',user).map(x=>fp.first(x))
console.log(ex3)
```

练习4
```javascript
const fp = require( 'lodash/fp')
const { Maybe, Container } = require('./support')

let ex4 = function(n){
    if(n) {return parseInt(n)}
}

ex4 = function(n){
    return Maybe.of(n).map(x=>parseInt(x))._value
}

console.log(ex4(5))
console.log(ex4(null))
```
