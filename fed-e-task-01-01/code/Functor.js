//函子
// console.log("*******************函子***********************")
// class Container{
//     static of(value){
//         return new Container(value)
//     }
//     constructor (value){
//         this._value = value
//     }
//     map(fn){
//         return Container.of(fn(this._value))
//     }
// }

// let r = Container.of(5)
//         .map(x=>x+2)
//         .map(x=>x*x)

// console.log(r)

//演示 null undefined 的问题
// Container.of(null)
//     .map(x=>x.toUpperCase())    //出现异常 即副作用

// //MayBe 函子
// console.log("*******************MayBe函子***********************")
// class MayBe{
//     static of(value){
//         return new MayBe(value)
//     }
//     constructor (value){
//         this._value = value
//     }
//     map(fn){
//         return this.isNothing()?MayBe.of(null):MayBe.of(fn(this._value))
//     }
//     isNothing(){
//         return this._value === null||this._value === undefined
//     }
// }

// let o  = MayBe.of("hello world")
//     .map(x=>x.toUpperCase())
// console.log(o);


// let n  = MayBe.of(null)
//     .map(x=>x.toUpperCase())
// console.log(n);


// let m  = MayBe.of(undefined)
//     .map(x=>x.toUpperCase())
// console.log(m);


// let u  = MayBe.of('hello world')
//     .map(x=>x.toUpperCase())
//     .map(x=>null)
//     .map(x=>x.split(' '))
//     //多次调用map后出现空值，哪次出现空值是不明确的
// console.log(u);


//Either 函子
//console.log("*******************Either函子***********************")
// class Left{
//     static of(value){
//         return new Left(value)
//     }
//     constructor(value){
//         this._value = value
//     }
//     map(fn){
//         return this
//     }
// }

// class Right{
//     static of(value){
//         return new Right(value)
//     }
//     constructor(value){
//         this._value = value
//     }
//     map(fn){
//         return Right.of(fn(this._value))
//     }
// }

// let r1 = Right.of(12)
//         .map(x=>x+2)
// let r2 = Left.of(12)
//         .map(x=>x+2)
// console.log(r1)
// console.log(r2)

// function parseJSON(str){
//     try{
//         return Right.of(JSON.parse(str))
//     }catch(e){
//         return Left.of({error:e.message})
//     }
// }

// let r1 = parseJSON("{name:zs}")
// console.log(r1)
// let r2 = parseJSON('{"name":"zs"}')
//         .map(x=>x.name.toUpperCase())
// console.log(r2)


const fp = require('lodash/fp');
const {Maybe,Container} = require('./support');
let maybe = Maybe.of([5,6,1])
let ex1 = maybe.map(arr=>fp.map(fp.add(1),arr))
console.log(ex1);

let xs = Container.of(['do', 'ray','me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(arr=>fp.first(arr))
console.log(ex2);


let  safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x])
});
let user = {id:2,name:'Albert'}
let ex3 = safeProp('name',user).map(x=>fp.first(x))
console.log(ex3)


let ex4 = function(n){
    if(n) {return parseInt(n)}
}

ex4 = function(n){
    return Maybe.of(n).map(x=>parseInt(x))
}

console.log(ex4(5))
console.log(ex4(null))
