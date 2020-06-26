// 实现这个项目的构建任务
//Grunt 的入口文件
//用于定义一些需要Grunt自执行的任务
//需要导出一个函数
//此函数接收一个grunt的形参，内部提供一些创建任务时可以用到的API

const sass=require('sass');
const loadGruntTasks = require('load-grunt-tasks')

const destSrc ="dist/";
const temp = "temp/";

module.exports= grunt=>{
    grunt.initConfig({
        clean:{
            temp:[`${destSrc}**`]
        },
        sass:{
            options:{
                sourceMap:true,
                implementation:sass
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['src/assets/styles/*.scss'],
                    dest: `${destSrc}assets/styles/`,
                    ext: '.css'
                }]
            }
        },
        babel:{
            options:{
                sourceMap:true,
                presets:['@babel/preset-env']
            },
            dist: {
                files: [{
                    expand: true,
                    src: ['src/assets/scripts/*.js'], //所有js文件
                    dest: `${destSrc}assets/scripts/`,  //输出到此目录下
                }]
            }
        },
        watch: {
            js:{
                files:['src/js/*.js'],
                task:['sass']
            },
            css:{
                files:['src/scss/*.scss'],
                task:['sass']
            }
        },
        build:{
            options:{
                foo:'bar'
            },
            css:{
                options:{
                    foo:'bz'
                },
            },
            js:'2'
        }
    })

    // grunt.registerTask('foo',()=>{
    //     console.log(grunt.config('foo'))
    //     console.log('hello grunt~')
    // })
    // grunt.registerTask('bar','任务描述',()=>{
    //     console.log('other task~')
    // })



    // grunt.registerTask('async-task',function () {
    //     const done = this.async()
    //     setTimeout(() => {
    //         console.log('async task working')
    //         done();
    //     }, 1000);
    // })
    // grunt.registerTask('bad-async',function () {
    //     const done = this.async()
    //     setTimeout(() => {
    //         console.log('async task working')
    //         done(false);
    //     }, 1000);
    // })
    // grunt.registerTask('bad',()=>{
    //     console.log('bad task~')
    //     return false
    // })


    // grunt.registerMultiTask('build',function(){
    //     console.log(`target:${this.target},data:${this.data}`)
    // })



    // grunt.loadNpmTasks('grunt-contrib-clean')

    // grunt.loadNpmTasks('grunt-sass')

    loadGruntTasks(grunt) //自动加载所有的grunt 插件中的任务
    grunt.registerTask('default',['sass','babel','watch'])

}
