/*
    1.Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
    2.Promise 中有三种状态 分别为 成功fulfilled  失败 rejected  等待 pending
        pending->fulfilled
        pending->rejected
        一旦状态确定就不可更改
    3.resolve和rejected函数就是用来更改状态的
        resolve：fulfilled
        rejected：rejected
    4.then 方法内部做的事情就是判断状态 如果状态是成功  调用成功回调函数  如果状态是失败调用失败回调函数   then方法是被定义在原型对象中的方法
    5.then 成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败的原因
    6.同一个promise对象下面的then 方法是可以被调用多次的
    7.then 方法是可以被链式调用的，后面then方法的回调函数拿到的值是上一个then方法返回值
*/

const MyPromise = require('./myPromise')

// let promise = new MyPromise((resolve,rejected)=>{
//     setTimeout(() => {
//         resolve('成功')
//     }, 2000);
//     //throw new Error('executor  error')
//     //resolve('成功')
//     //rejected('失败')
// })


// promise.then(value=>{
//     console.log(value);
//     return 'aaa'
//     //throw new Error('then error')
// },reason=>{
//     console.log(reason)
//     return 1000
// }).then(value=>{
//     console.log(value)
// },reason=>{
//     console.log(reason.message)
// })
// promise.then().then().then(value=>{
//     console.log(value)
// },reason=>{
//     console.log(reason.message)
// })


function p1(){
    return new MyPromise((resolve,reject)=>{
        setTimeout(() => {
            resolve('p1')
        }, 2000);
    })
}

function p2(){
    return new MyPromise((resolve,reject)=>{
        //resolve('p2')
        reject('&&&&p2')
    })
}

MyPromise.all(['a','b',p1(),p2(),'c']).then(result=>{
    console.log(result)
})

MyPromise.resolve(100).then(value=>console.log(value))


MyPromise.resolve(p1()).then(value=>console.log(value))

p2().finally(()=>{
    console.log('finally')
    return p1();
}).then(value=>{
    console.log('***',value)
},reason=>{
    console.log(reason)
})

p2().then(value=>{console.log(value)})
    .catch(reason=>console.log("dddd",reason))
