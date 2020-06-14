# 函数组合
管道
```javascript
fn = compose(f1,f2,f3)
b= fn(a)
```

//函数组合演示
```javascript
function compose(f,g){
    return function(value){
        return f(g(value))
    }
}

function reverse(array){
    return array.reverse()
}
function first(array){
    return array[0]
}

const last = compose(first,reverse)
console.log(last([1,2,3,4]));
```


## lodash 中的组合函数
```JavaScript
const _=require('lodash');
const reverse = arr=> arr.reverse();
const first = arr=>arr[0];
const toUpper = s =>s.toUpperCase();

const f=_.flowRight(toUpper,first,reverse);
console.log(f(['one','two','three']));



function compose(...args){
    return function(value){
        return args.reverse().reduce(function(acc,fn){return fn(acc)},value)
    }
}

const compose = (...args)=>value=>args.reverse().reduce((acc,fn)=>fn(acc),value)
```

函数组合要满足结合率
