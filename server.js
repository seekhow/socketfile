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