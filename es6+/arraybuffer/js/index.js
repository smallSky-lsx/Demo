const wrap = document.querySelector('.wrap'),
    img = document.querySelector('.wrap img'),
    btn = document.querySelector('.wrap button');
btn.onclick = async function () {
    const url = await toBlackAndWhitePhoto(img);
    const newImg = new Image();
    newImg.src = url;
    wrap.appendChild(newImg);
}
async function toBlackAndWhitePhoto(img) {
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    // 设置canvas画布大小
    canvas.width = img.width;
    canvas.height = img.height;
    // 创建canvas画布2d环境
    const cxt = canvas.getContext('2d');
    // 将图片写入canvas中
    cxt.drawImage(img, 0, 0); // 写入的是图片元素
    // 获取canvas画布指定区域的像素数据
    const imageData = cxt.getImageData(0, 0, img.width, img.height);
    // 将像素数据中的每个像素的红绿蓝设置为红绿蓝的平均数，转换为黑白照
    const pixelData = imageData.data;
    for (let i = 0, count = pixelData.length; i < count; i += 4) {
        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];
        const avg = (r + g + b) / 3;
        pixelData[i] = pixelData[i + 1] = pixelData[i + 2] = avg;
    }
    // 将修改后的图片数据导入canvas画布
    cxt.putImageData(imageData, 0, 0);
    // 再将canvas作为图片地址输出
    return canvas.toDataURL();
}