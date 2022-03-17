"use strict";

// 打开窗口
{
    // let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;

    let win = window.open("/abc", "test", params);
    win.focus();
    win.document.write("Hello, world.");

    console.log(win.closed);
    win.onblur = () => win.focus();

    setTimeout(() => {
        win.close();
        console.log(win.closed);
    }, 100);
}

// TypedArray
{
    let arr = new Uint8Array([0, 1, 2, 3]);
    console.log(arr.length); // 4，创建了相同长度的二进制数组
    console.log(arr[2]); // 2，用给定值填充了 4 个字节（无符号 8 位整数）

    // 创建新试图，并拷贝一份原数据
    let newArr = arr.slice(1, 3);
    console.log(newArr[1]); // 2

    // 创建新视图，但操作原数据
    let newArr2 = arr.subarray(1, 3);
    console.log(newArr2[1]); // 2

    newArr[1] = 4;

    console.log(arr[2]); // 4
    console.log(newArr[1]); // 2
    console.log(newArr2[1]); // 4
}

// DataView
{
    console.clear();

    // 4 个字节的二进制数组，每个都是最大值 255
    let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

    let dataView = new DataView(buffer);

    // 在偏移量为 0 处获取 8 位数字
    console.log(dataView.getUint8(0)); // 255

    // 现在在偏移量为 0 处获取 16 位数字，它由 2 个字节组成，一起解析为 65535
    console.log(dataView.getUint16(0)); // 65535（最大的 16 位无符号整数）

    // 在偏移量为 0 处获取 32 位数字
    console.log(dataView.getUint32(0)); // 4294967295（最大的 32 位无符号整数）

    dataView.setUint32(0, 0); // 将 4 个字节的数字设为 0，即将所有字节都设为 0
}

// concat
{
    console.clear();

    let arr = new Uint8Array([255, 255, 255, 255]);

    Uint8Array.prototype.concat = function (typedArray) {
        return new Uint8Array([...this, ...typedArray]);
    };

    let result = arr.concat(new Uint8Array([0, 1, 2, 3]));
    console.log(result);
}

// textDecoder
{
    console.clear();
    let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

    console.log(new TextDecoder().decode(uint8Array)); // Hello

    let encoder = new TextEncoder();

    let arr = encoder.encode("Hello");
    console.log(arr); // 72,101,108,108,111
}

// Blob
{
    // download 特性（attribute）强制浏览器下载而不是导航
    // <a download="hello.txt" href="blob:http://localhost:8000/c2d14ed6-c271-46be-9164-06042e419312">hello.txt</a>
    let blob = new Blob(["Hello, world!"], { type: "text/plain" });
    let link = document.createElement("a");
    link.download = "hello.txt";
    link.href = URL.createObjectURL(blob);
    link.innerHTML = "hello.txt";

    // 添加到 dom
    document.body.append(link);
    // 或者模拟点击，自动下载
    // link.click();
    // URL.revokeObjectURL(link.href);
}

// base64
{
    let img = new Image();
    img.src = `data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7`;
    document.body.append(img);
}

// Blob FileReader
{
    console.clear();

    let link = document.createElement("a");
    link.download = "hello.txt";

    let blob = new Blob(["Hello, world!"], { type: "text/plain" });

    // 内建的 FileReader 对象可以将 Blob 转换为 base64；
    let reader = new FileReader();
    reader.readAsDataURL(blob);

    // 调用 onload
    reader.onload = function () {
        link.href = reader.result; // data url
        console.log(link.href);
        // link.click();
    };
}

// imgage -> blob
// 需要在 onload 里面，否则 img 还未添加到 DOM 中；
window.onload = async function () {
    // 获取任何图像
    let img = document.querySelector("img");

    // 生成同尺寸的 <canvas>
    let canvas = document.createElement("canvas");
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    let context = canvas.getContext("2d");

    // 向其中复制图像（此方法允许剪裁图像）
    context.drawImage(img, 0, 0);
    // 我们 context.rotate()，并在 canvas 上做很多其他事情

    // toBlob 是异步操作，结束后会调用 callback
    // let blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    canvas.toBlob(function (blob) {
        console.log(blob);
        // blob 创建完成，下载它
        let link = document.createElement("a");
        link.download = "example.png";

        link.href = URL.createObjectURL(blob);
        // link.click();

        // 删除内部 blob 引用，这样浏览器可以从内存中将其清除
        URL.revokeObjectURL(link.href);
    });
};

// fileReader
{
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    // fileInput.onchange = function (e) {
    //     // this == input
    //     console.log(this.files[0]);
    // };

    document.body.append(fileInput);

    fileInput.onchange = function (e) {
        let file = fileInput.files[0];

        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function () {
            console.log(reader.result);
        };

        reader.onerror = function () {
            console.log(reader.error);
        };
    };
}

// fetch
{
    console.clear();

    fetch("/index.html")
        .then((res) => {
            if (res.ok) {
                // console.log(res);
                console.warn(res.headers.get("Content-Type")); // text/html; charset=utf-8
            }
            return res;
        })
        .then((res) => {
            res.text().then((text) => {
                console.log(text);
            });
        });
}

// formData
{
    // Symbol(Symbol.iterator): ƒ entries()
    // Symbol(Symbol.toStringTag): "FormData"
    console.dir(new FormData());
}

// XMLHttpRequest
{
    // 1. 创建一个 new XMLHttpRequest 对象
    let xhr = new XMLHttpRequest();

    // 2. 配置它：从 URL /article/.../load GET-request
    xhr.open("GET", "/index.html");

    // 3. 通过网络发送请求
    xhr.send();

    // 4. 当接收到响应后，将调用此函数
    xhr.onload = function () {
        if (xhr.status != 200) {
            // 分析响应的 HTTP 状态
            console.warn(`Error ${xhr.status}: ${xhr.statusText}`); // 例如 404: Not Found
        } else {
            // 显示结果
            console.warn(`Done, got ${xhr.response.length} bytes`); // response 是服务器响应
        }
    };

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            console.warn(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
            console.warn(`Received ${event.loaded} bytes`); // 没有 Content-Length
        }
    };

    xhr.onerror = function () {
        console.warn("Request failed");
    };

    xhr.set;
}
