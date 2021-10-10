function animate(obj, target, callback) {

    clearInterval(obj.timer); // 先清除之前的定时器，只保留一个，否则会叠加
    obj.timer = setInterval(easeOut, 15);

    function easeOut() {
        let step = (target - obj.offsetLeft) / 10; // 缓动动画算法
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 正数向上取整，负数向下取整
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer);
            // 如果有回调函数，则在定时器结束时执行
            // if (callback) {
            //     callback();
            // }
            // 等价短路运算符
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }
}