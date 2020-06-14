# 函子 Functor
* 容器：包含值和值的变形关系（这个变形关系就是函数）
* 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）



```javascript
class Container{
    constructor (value){
        this._value = value
    }
    map(fn){
        return new Container(fn(this._value))
    }
}

let r = new Container(5)
        .map(x=>x+1)
        .map(x=>x*x)
console.log(r)


//改造
class Container{
    static of(value){
        return new Container(value)
    }
    constructor (value){
        this._value = value
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}

let r = container.of(5)
        .map(x=>x+2)
        .map(x=>x*x)

console.log(r)

//演示 null undefined 的问题
Container.of(null)
    .map(x=>x.toUpperCase())    //出现异常 即副作用


```
总结：
* 函数式编程的运算不直接操作值，而是由函子完成
* 函子就是一个实现map契约的对象
* 我们可以把函子想象成一个盒子，这个盒子里面封装了一个值
* 想要处理盒子中的值，我们需要给盒子的map方法传递一个处理值的函数（纯函数），由这个函数来对值进行处理
* 最终map防范返回一个包含新值的盒子（函子）   进行链式调用


## MayBe函子
* 我们在编程的过程中可能会遇到很多错误，需要对这些错误做相应的处理
* MayBe函子的作用就是可以对外部的控制情况做处理（控制副作用在允许的范围）

```javascript
class MayBe{
    static of(value){
        return new MayBe(value)
    }
    constructor (value){
        this._value = value
    }
    map(fn){
        return this.isNothing()?MayBe.of(null):MayBe.of(fn(this._value))
    }
    isNothing(){
        return this._value === null||this._value === undefined
    }
}

let r  = MayBe.of("hello world")
    .map(x=>x.toUpperCase())
console.log(r);
```


## Either函子
* Either两者中的任何一个，类似于if...else...的处理
* 异常会让函数变的不纯，Either函子可以用来做异常处理

```javascript
class Left{
    static of(value){
        return new Left(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return this
    }
}

class Right{
    static of(value){
        return new Right(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return Right.of(fn(this._value))
    }
}

// let r1 = Right.of(12)
//         .map(x=>x+2)
// let r2 = Left.of(12)
//         .map(x=>x+2)
// console.log(r1)
// console.log(r2)

function parseJSON(str){
    try{
        return Right.of(JSON.parse(str))
    }catch(e){
        return Left.of({error:e.message})
    }
}

let r1 = parseJSON("{name:zs}")
console.log(r1)
let r2 = parseJSON('{"name":"zs"}')
        .map(x=>x.name.toUpperCase())
console.log(r2)
```
