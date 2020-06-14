# Deno 真的能够取代Node么？

明确Node.js是什么？
* 是一个JavaScript运行平台/运行时
  软件架构
            应用               MyWeb
            框架               React、vue
            运行平台/运行时      node.js
            OS                 os
* 定义：平台一般就是指一个运行环境
* 作用：开发者可以使用指定语言，基于这个环境开发应用
* 换个角度：平台就是为编程语言「赋能」，让变成语言具备实际「能力」

node.js可以做什么
* 平台的租用就是提供舞台，所以理论上平台没有绝对只能干什么的说法
* 不同的平台提供的APIs不同，所以我们能够做的事情也不通
  * 浏览器作为一个运行环境，我们能够使用js操作界面上的DOM元素
  * dd
* 每个平台都有各自的特点，这些特点决定了他更适合做什么事情
  * 技术角度：node.js平台的特点就是非阻塞IO，所以适合处理高并发请求
  * 人员角度：node.js平台采用的语言是JavaScript，适合前端开发者使用
* 结论：
  * node.js适合开发服务器端的应用层（BFF）
  * node.js适合用于前端方向的各种工具


## Deno是什么？
* A secure runtime for javascript and typescript
* 一个更靠谱的JavaScript和typescript的运行时

Deno的设计动机？
* 同一个作者，在不同时间点，做出两个类似而不同的东西
  * node.js设计上诸多不合理的地方，随着时间的推移，慢慢被暴露
    * 参考：Ryan Dahl《Design Mistakes in Node》
  * 侧面证明：独立的JavaScript运行时是有必要的

Deno快速上手
* 官网
  * https://deno.land/
* 安装
  * Homebrew (Mac):brew install deno
  * Chocolatey (Windows):choco install deno
* 编码
* 运行

Live Coding 运行时APIs
* 尽可能

Live Coding 标准库
* 运行时APIs过于底层，使用上不够便捷
* Deno提供了一组标准模块/标准库
* 这些模块由核心团队审核，并保证可以与Deno一起使用
* https://


Live Coding 第三方模块
* Deno同样允许第三方模块机制，建设模块生态
* 但不同于npm 这种中心化模块/包机制
* 单纯通过URL的方式，任何服务器都可以
