//问题1
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[6]();
//10
//i是全局变量   循环结束后i的值为10 当执行方法时i的值为10
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = (function (j) {
        return function(){
            console.log(j);
        }
    })(i)
}
a[6]();
//利用立即执行函数的函数作用域

//者使用let声明i  利用块作用域
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
a[6]();


//问题2
var temp = 123;
if (true) {
    console.log(temp)
    let temp;
}
//报错   let声明temp 存在暂时性死区


//问题3
var arr = [12, 34, 32, 89, 4];
let min = Math.min(...arr);
console.log(min);


//问题4
//var 存在变量提升
//let const 不存在变量提升  存在暂时性死区 必须先定义 后使用
//let 定义变量可以重新赋值 const定义的变量不能重新赋值
//const 定义变量是引用类型时是指指向的地址不能修改


//问题5
var a = 10;
var obj = {
    a: 20,
    fn() {
        setTimeout(() => {
            console.log(this.a)
        })
    }
}
obj.fn();
20
//obj.fn()  fn方法执行时this指向obj
//fn函数体内是一个setTimeout函数 但是回调函数是一个箭头函数，箭头函数的this是包裹箭头函数的普通函数的this


//问题6
//没用过说不好

//问题7
//深拷贝是指完全复制一份
//浅拷贝是指指复制第一层
//当对象的属性值均为原始类型时 深拷贝跟浅拷贝效果一样
//当对象的属性值为引用类型是，浅拷贝只拷贝引用地址
//常用的深拷贝实现递归调用，lodash的cloneDeep 或者使用JSON.parse(JSON.stringify(obj))

//问题8
//异步编程，是需要时间处理的或者需要别人处理，然后处理完成给结果继续处理
//Event Loop


//问题9
//
const a =()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("hello");
        }, 10);
    })
}
const b =(temp)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(temp + " lagou");
        }, 10);
    })
}
const c =(temp)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(temp + " I love u");
        }, 10);
    })
}
a().then((res)=>{
    return b(res);
}).then((res)=>{
    return c(res);
}).then((res)=>{
    console.log(res);
})


//问题10
//TypeScript是 JavaScript 的超集，包含了 JavaScript 的所有元素，在TypeScript中可以运行JavaScript代码。


//问题11
//1. 静态输入   静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。
//2. 大型的开发项目   有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用TypeScript工具来进行重构更变的容易、快捷。
//3. 更好的协作   当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。
//4. 更强的生产力   干净的 ECMAScript 6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。
