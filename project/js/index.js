window.onload = function () {
    // 获取dom元素
    // 获取箭头
    let arrowEL = document.querySelector('#head .headMain > .arrow')
    // 获取顶部导航li结点
    let liNodes = document.getElementsByClassName('listLi')
    // 获取up结点
    let upNodes = document.getElementsByClassName('up')
    // 获取头部元素
    let head = document.getElementById('head')
    // 获取内容区元素
    let content = document.getElementById('content')
    // 获取内容区ul元素
    let contentUlNodes = document.getElementsByClassName('content-ul')
    // 获取内容区ul中的li元素
    let contentLiNodes = document.getElementsByClassName('contentLi')
    // 同步当前页面第几屏
    let now = 0
    // 鼠标滚轮防抖
    let timer = 0

    headActions()
    contentActions()

    // 页面发生缩放的时候自动刷新页面参数
    window.onresize = function () {
        headActions()
        contentActions()
    }

    // 滚轮事件
    if (content.addEventListener) {
        content.addEventListener('DOMMouseScroll', (ev) => {
            ev = ev || event;
            //让fn的逻辑在DOMMouseScroll事件被频繁触发的时候只执行一次
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn(ev)
            }, 150)
        })
    }
    content.onmousewheel = (ev) => {
        ev = ev || event;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn(ev)
        }, 150)
    }

    function fn(ev) {
        let dir = ''
        if (ev.wheelDelta) {
            dir = ev.wheelDelta > 0 ? 'up' : 'down'
        } else if (ev.detail) {
            dir = ev.wheelDelta < 0 ? 'up' : 'down'
        }
        switch (dir) {
            case 'up':
                if (now >= 0) {
                    now--;
                    move(now)
                }
                break
            case 'down':
                if (now < 4) {
                    now++;
                    move(now)
                }
                break
        }
    }

    // 头部交互
    function headActions() {
        // 绑定顶部导航li结点点击事件
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].onclick = function () {
                move(i)
                now = i
            }
        }

        // 起始状态箭头与li颜色的情况
        upNodes[0].style.width = '100%'
        arrowEL.style.left = liNodes[0].offsetLeft + liNodes[0].offsetWidth / 2 - arrowEL.offsetWidth / 2 + 'px'

    }

    function move(i) {
        // 将其他的li颜色清除
        for (let item of upNodes) {
            item.style.width = ''
        }
        // 设置本li的颜色与arrow位置
        if(i >= upNodes.length){
            i = upNodes.length - 1
        }else if(i < 0){
            i = 0
        }
        upNodes[i].style.width = '100%'
        arrowEL.style.left = liNodes[i].offsetLeft + liNodes[i].offsetWidth / 2 - arrowEL.offsetWidth / 2 + 'px'
        // 移动内容区ul偏移
        contentUlNodes[0].style.top = -i * (document.documentElement.clientHeight - head.offsetHeight) + 'px'
    }

    // 内容区交互
    function contentActions() {
        // 内容区的高度等于视口高度减去顶栏高度
        content.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px'

        // 让每个content中的li等于content高度，使其独占一页
        for (let item of contentLiNodes) {
            item.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px'
        }


    }
}



