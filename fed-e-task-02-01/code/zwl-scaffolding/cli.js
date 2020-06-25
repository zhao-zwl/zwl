#!/usr/bin/env node

//Node CLI 应用入口文件必须要要有这样的文件头
//Linux 或macOS系统需要修改该文件的读写权限为755  chmod 755 cli.js

//脚手架的给工作过程
//1.通过命令行交互询问用户问题
//2.根据回答的结果生成文件

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer');
const ejs = require('ejs')
inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Project name?"
    }, {
        type: 'input',
        name: 'desc',
        message: 'Project description?'
    }])
    .then(anwsers => {
        //console.log(anwsers)
        //根据用户回答的结果生成文件

        //模板目录
        const tmpDir = path.join(__dirname, 'templates')
        //目标目录
        const destDir = process.cwd()

        //将模板下的文件全部拷贝的目标目录
        fs.readdir(tmpDir, (err, files) => {
            if (err) throw console.error();
            files.forEach(file => {
                //console.log(file)
                //通过模板引擎渲染对应的文件
                ejs.renderFile(path.join(tmpDir, file), anwsers, (err, result) => {
                    if (err) throw err
                    //console.log(result)
                    fs.writeFileSync(path.join(destDir, file), result);
                })
            });
        })
    })
