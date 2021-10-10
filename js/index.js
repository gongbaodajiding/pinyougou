let arrow_l = document.querySelector('.arrow-l');
let arrow_r = document.querySelector('.arrow-r');
let focus = document.querySelector('.focus');
// 鼠标经过显示左右按钮
focus.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
});

focus.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
});

let slider = document.querySelector('.slider');
let indicator = document.querySelector('.indicator');
let focusWidth = focus.offsetWidth;
// 根据图片数量动态生成指示小圆圈
for (let i = 0; i < slider.children.length; i++) {
    let li = document.createElement('li');
    // 因为li本身没有索引号，需要自定义属性做索引号
    li.setAttribute('index', i);
    // 生成li时绑定事件
    li.addEventListener('mouseenter', function () {
        // 排他思想，鼠标经过时的小圆圈变化
        for (let i = 0; i < indicator.children.length; i++) {
            indicator.children[i].className = '';
        }
        this.className = 'selected';
        let index = this.getAttribute('index');
        // 将索引号赋值给
        num = index;
        circle = index;
        // 鼠标经过小圆圈，便让slider滚动，滚动的距离为索引号乘图片宽度，注意为负数
        animate(slider, -index * focusWidth);
    });
    indicator.appendChild(li);
}
indicator.children[0].className = 'selected';

// 克隆第一张图片放在最后，实现无缝滚动
// 此处代码不能放在前面，否则小圆圈会多一个
let first = slider.children[0].cloneNode(true);// 此处为深克隆，连同子节点一起克隆
slider.appendChild(first);// append自动添加到末尾

// 点击左右按钮滚动图片
let num = 0;
let circle = 0;
arrow_r.addEventListener('click', function () {
    if (num == slider.children.length - 1) {
        slider.style.left = 0;
        num = 0;
    }
    num++;
    animate(slider, -num * focusWidth);
    // 点击左右按钮后小圆圈变化
    circle++;
    circle == indicator.children.length ? circle = 0 : circle;
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].className = '';
    }
    indicator.children[circle].className = 'selected';
});
