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