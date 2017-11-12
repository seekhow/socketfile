## 简介  
用node写的一个关于socket传输文件的简单程序  

## 截图  
![](http://otjjfdfdp.bkt.clouddn.com/17-11-12/19860435.jpg)  
![](http://otjjfdfdp.bkt.clouddn.com/17-11-12/52316068.jpg)  
![](http://otjjfdfdp.bkt.clouddn.com/17-11-12/16106173.jpg)  
![](http://otjjfdfdp.bkt.clouddn.com/17-11-12/74572696.jpg)  


## 模块  
主要是用到了net模块提供的socket编程能力，以及fs模块提供的读写文件能力

## 代码  
server.js
```
var net = require("net");
var fs = require("fs");// 先导入需要的两个模块
let server = net.createServer();// 创建一个服务器实例
let file = fs.createReadStream('./test.rmvb');// 创建一个指定文件名的文件读取流
let i = 0; // 用来存储计数文件流传输的次数
server.on('connection', socket => {
    // 监听client是否连接
    file.on('data', function (data) {
        // 文件传输
        console.log('文件正在传输中,这是第', i++, '次传输,长度为：', data.length);
        socket.write(data); // 将读取到的文件流通过socket传输
    });

    file.on('end', () => {
        // 监听文件是否传输完成
        console.log('文件传输完成--server.js');
        server.close();
        process.exit(0);
    });

    socket.on("end", () => {
        file.end("wanbi");
    });
});
// 监听事件
server.on('listening', () => {
    console.log("监听开始");
});
// server错误handler
server.on('error', exception => {
    console.log('socket error:' + exception);
});
// server监听指定端口
server.listen('3021', '127.0.0.1');

``` 


client.js 
```
var net = require("net");
var fs = require("fs");

var client = new net.Socket();// 生成一个socket实例对象

client.connect(3021, '127.0.0.1');// 连接到指定ip和端口

client.on('connect', () => {
    console.log("连接成功--client.js");  // 连接成功即打印提示信息
});

let file = fs.createWriteStream('./get.rmvb'); // 创建一个指定文件名的文件写入流

client.on("data", data => {
    file.write(data); // 将接收到的数据写入文件流中
});

client.on('error', error => {
    console.log('error:' + error);
});
```