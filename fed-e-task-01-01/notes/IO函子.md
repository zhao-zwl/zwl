## IO函子
* IO函子中的_value是一个函数，这里是把函数作为值来处理
* IO函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作（惰性执行），包装当前的操作纯
* 把不纯的操作交给调用者来处理

```javascript
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
```
