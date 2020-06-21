//gulp 入口文件
const {series,parallel} = require('gulp')
const fs = require('fs')


// exports.default = done =>{
//     console.log("default task working~")
//     done()
// }

// const gulp = require('gulp')
// gulp.task('bar',done=>{
//     console.log('bar  working~')
//     done()
// })

const task1 = done=>{
    setTimeout(() => {
        console.log('task1 working~')
        done();
    }, 1000);
}

const task2 = done=>{
    setTimeout(() => {
        console.log('task2 working~')
        done();
    }, 1000);
}
const task3 = done=>{
    setTimeout(() => {
        console.log('task3 working~')
        done();
    }, 1000);
}


exports.foo = series(task1,task2,task3);//串行任务
exports.bar = parallel(task1,task2,task3);//并行任务


exports.callback = done=>{
    console.log('callback task~')
    done()
}

exports.callback_error = done=>{
    console.log('callback task~')
    done(new Error('task failed!'))
}

exports.promise=()=>{
    console.log('promise task~')
    //return Promise.resolve();
    return Promise.reject(new Error('task failed~'))
}

const timeout = time=>{
    return new Promise(resolve=>{
        setTimeout(resolve,time)
    })
}
exports.async = async()=>{
    await timeout(1000)
}

exports.stream = done=>{
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    readStream.on('end',()=>{
        done();
    })
}


const {Transform} =  require('stream')

//原理
// exports.default = done =>{
//     const read = fs.createReadStream('normalize.css')
//     const write = fs.createWriteStream('normalize.min.css')
//     const transform = new Transform({
//         transform:(chunk,encoding,callback)=>{
//             //核心转换过程
//             //chunk =>读取流中读取到的内容 （Buffer）
//             const input = chunk.toString()
//             const output =input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'')
//             callback(null,output)
//         }
//     })
//     //把读取出来的文件流导入写入文件流
//     read
//         .pipe(transform)
//         .pipe(write)
//     return read
// }


const {src,dest} = require('gulp');
const cleanCss= require('gulp-clean-css');
const rename = require('gulp-rename')
exports.default =()=>{
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({extname:'.min.css'}))
        .pipe(dest('dist'))
}
