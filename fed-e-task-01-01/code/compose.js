//函数组合演示
// function compose(f,g){
//     return function(vlaue){
//         return f(g(vlaue))
//     }
// }
// function reverse(array){
//     return array.reverse();
// }
// function first(array){
//     return array[0]
// }

// const last = compose(first,reverse);
// console.log(last([1,2,3,4]));


// const _=require('lodash');
// const reverse = arr=>arr.reverse();
// const first = arr=>arr[0];
// const toUpper = s =>s.toUpperCase();
// const f = _.flowRight(toUpper,first,reverse);
// console.log(f(['one','two','three']))



//lodash 的fp模块
// NEVER SAY DIE --->never-say-die
// const _ = require('lodash');
// const split = _.curry((sep,str)=>_.split(str,sep))
// const join = _.curry((sep,array)=>_.join(array,sep));
// const map = _.curry((fn,array)=>_.map(array,fn))
// const f = _.flowRight(join('-'),map(_.toLower),split(' '))
// console.log(f('NEVER SAY DIE'));

// const fp = require('lodash/fp');
// const f = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '))
// console.log(f('NEVER SAY DIE'));


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
        in_stock: false
    }, {
        name:"Aston Martin One-77",
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


// const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
// console.log(isLastInStock(cars))

// const isFirstName = fp.flowRight(fp.prop('name'), fp.first);
// console.log(isFirstName(cars));



// let _average = function (xs) {
//     return fp.reduce(fp.add, 0, xs) / xs.length
// } // <-无须改动

// let averageDollarValue = function (cars) {
//     let dollar_values = fp.map(
//         function (car) {
//             return car.dollar_value
//         },
//         cars)
//     return _average(dollar_values)
// }

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


let _underscore = fp.replace(/\W+/g,'_') //<-- 无须改动，并在sanitizeNames
let log = v=>{
    console.log(v);
    return v;
}
let sanitizeNames = fp.map(fp.flowRight(_underscore,fp.toLower,fp.prop('name')));
console.log(sanitizeNames(cars))
