const fp = require('lodash/fp');
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
}

//调用
console.log(process);
let r = IO.of(process).map(p=>p.execPath)
console.log(r);
console.log(r._value());
