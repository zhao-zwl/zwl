//1.兼容web标准APIS

//默认采用沙箱模式运行代码
// const res = await fetch('https://api.github.com')
// const data = await res.json()
// console.log(data)
//运行    deno run --allow-net  02-runtime-apis.ts   允许网络   参数必须放文件名前     文件名后面是文件的参数


//2.全局的Deno对象（命名空间）
//Deno.args
//Deno 中的运行时API默认全部使用Promise
const decoder = new  TextDecoder('utf-8');
const buffer = await Deno.readFile('./temp.text');
const contents  = decoder.decode(buffer);
console.log(contents);
//运行  deno run --allow-read  02-runtime-apis.ts
