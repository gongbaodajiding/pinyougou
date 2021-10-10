let arrow_l = document.querySelector('.arrow-l');
let arrow_r = document.querySelector('.arrow-r');
let focus = document.querySelector('.focus');

// 鼠标经过显示左右按钮
focus.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
    // 鼠标经过时停止自动播放
    clearInterval(timer);
    // 清除定时器变量
    timer = null;
});

focus.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
    // 鼠标移开开启自动播放
    timer = setInterval(clickRight, 2000);
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
        // 将索引号赋值给控制按钮的num和控制小圆圈的circle，这样才能同步变化
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

// 点击右按钮滚动图片
let num = 0;
let circle = 0;
let flag = true;

arrow_r.addEventListener('click', function () {
    // 防止点击按钮次数过多导致图片动作过快，需要节流阀，等动画播放完毕后再执行下一次点击播放动作
    if (flag) {
        // 关闭节流阀
        flag = false;
        // 当走到最后一张图片（为克隆的第一张图片），快速返回第一张图片后再向右滚动，即可实现无缝滚动
        if (num == slider.children.length - 1) {
            num = 0;
            slider.style.left = 0 + 'px';
        }
        num++;
        // 动画执行完毕后，通过回调函数开启节流阀
        animate(slider, -num * focusWidth, function () {
            flag = true;
        });
        // 点击左右按钮后小圆圈变化
        circle++;
        // 先让circle+1，发现circle的值是小圆圈的数量，即最后一个的索引+1，说明已经走到了最后一个，需要赋值0返回第一个小圆圈
        circle == indicator.children.length ? circle = 0 : circle;
        circleChange();
    }
});

// 点击左按钮滚动图片
arrow_l.addEventListener('click', function () {
    if (flag) {
        flag = false;
        // 与前面一样，当走到第一张图片时，快速返回最后一张图片
        if (num == 0) {
            num = slider.children.length - 1;
            slider.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(slider, -num * focusWidth, function () {
            flag = true;
        });
        // 点击左右按钮后小圆圈变化
        circle--;
        // 先-1，如果<0则说明走到了第一个，赋值给最后一个的索引值，即可到最后一个小圆圈
        circle < 0 ? circle = indicator.children.length - 1 : circle;
        circleChange();
    }
});

// 代码出现冗余，声明函数重复利用，优化代码
function circleChange() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].className = '';
    }
    indicator.children[circle].className = 'selected';
}

//手动调用点击事件
function clickRight() {
    arrow_r.click();
}

// 自动播放就相当于定时按右侧按钮
let timer = setInterval(clickRight, 2000);