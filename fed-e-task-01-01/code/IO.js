const fp = require('lodash/fp');
const fs = require('fs')
class IO {
    static of(x){
        return new IO(function(){
            return x
        })
    }
    constructor(fn){
        this._value = fn
    }
    map(fn){
        //把当前的value和传入的fn组合成一个新的函数
        return new IO(fp.flowRight(fn,this._value))
    }
    join(){
        return this._value()
    }
    flatMap(fn){
        return this.map(fn).join()
    }
}

//调用
// console.log(process);
// let r = IO.of(process).map(p=>p.execPath)
// console.log(r);
// console.log(r._value());


let readFile = function(filename){
    return new IO(function(){
        return fs.readFileSync(filename,'utf-8')
    })
}
let print = function(x){
    return new IO(function(){
        console.log(x)
        return x
    })
}

// let cat = fp.flowRight(print,readFile)
// //IO(IO(x))
// let r = cat('package.json')._value()._value()

// console.log(r)


let r = readFile('package.json')
        .flatMap(print)
        .join()
console.log(r)
