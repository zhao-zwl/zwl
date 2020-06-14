// const {compose,curry} = require('folktale/core/lambda');
// const {toUpper,first} = require('lodash/fp')

// let f = curry(2,(x,y)=>{
//     return x+y
// })

// console.log(f(1,2))
// console.log(f(1)(2))

// let f = compose(toUpper,first);
// console.log(f(['one','two']))



const fs = require('fs');
const {task} = require('folktale/concurrency/task')
const {split,find} = require('lodash/fp')
function readFile(filename){
    return task(resolver =>{
        fs.readFile(filename,'utf-8',(err,data)=>{
            if(err) resolver.reject(err)
            resolver.resolve(data)
        })
    })
}

readFile('package.json')
    .map(split('\n'))
    .map(find(x=>x.includes('version')))
    .run()
    .listen({
        onRejected:err=>{
            console.log(err)
        },
        onResolved:value=>{
            console.log(value)
        }
    })
