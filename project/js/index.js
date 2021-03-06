window.onload = function () {
    // 获取dom元素
    // 获取箭头
    let arrowEL = document.querySelector('#head .headMain > .arrow')
    // 获取顶部导航li结点
    let liNodes = document.getElementsByClassName('listLi')
    // 获取导航中up结点
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
    // 获取第一屏轮播图循环点
    let homePointNodes = document.querySelectorAll('#content > .content-ul > .home  .home-ul-points > li')
    // 获取第一屏图像结点
    let homeImgNodes = document.querySelectorAll('#content > .content-ul > .home  .home-ul-imgs > li')
    // 记录首页轮播图当前位置
    let homenow = 0
    // 第一屏轮播防抖
    let homeTimer = 0
    // 获取第四屏图片url
    let aboutImgUl = document.querySelectorAll('.about-imgs-item ul')
    // 获取页面跳转右侧圆点
    let contentDots = document.querySelectorAll('.content-ul-points > li')
    // 圆点防抖计数器
    let dotTimer = 0
    // 获取第五屏图片
    let fivePics = document.querySelectorAll('.team-member > ul > li')
    // 获取team下的section
    let team = document.querySelector('.team-member')
    // 第五屏旗袍效果canvas
    let oc = null
    // 出入场动画
    let anArr = [
        {
            outAn:function(){
                // 获取第一屏图片ul结点
                let homeImgUl = document.querySelector('.home-ul-imgs')
                // 获取第一屏轮播图点
                let homeDotUl = document.querySelector('.home-ul-points')

                homeImgUl.style.transform = 'translateY(-400px)'
                homeImgUl.style.opacity = 0
                homeDotUl.style.transform = 'translateY(200px)'
                homeDotUl.style.opacity = 0
            },
            inAn: function () {
                // 获取第一屏图片ul结点
                let homeImgUl = document.querySelector('.home-ul-imgs')
                // 获取第一屏轮播图点
                let homeDotUl = document.querySelector('.home-ul-points')

                homeImgUl.style.transform = 'translateY(0)'
                homeImgUl.style.opacity = 1
                homeDotUl.style.transform = 'translateY(0)'
                homeDotUl.style.opacity = 1
             }
        },
        {
            inAn:function(){
                let plane1 = document.querySelector(".plane1");
                let plane2 = document.querySelector(".plane2");
                let plane3 = document.querySelector(".plane3");
                
                plane1.style.transform = "translate(0px,0px)";
                plane2.style.transform = "translate(0px,0px)";
                plane3.style.transform = "translate(0px,0px)";
            },
            outAn:function(){
                let plane1 = document.querySelector(".plane1");
                let plane2 = document.querySelector(".plane2");
                let plane3 = document.querySelector(".plane3");
                
                plane1.style.transform = "translate(-200px,-200px)";
                plane2.style.transform = "translate(-200px,200px)";
                plane3.style.transform = "translate(200px,-200px)";
            }
        },
        {
            inAn:function(){
                let pencel1 = document.querySelector(".pencel1");
                let pencel2 = document.querySelector(".pencel2");
                let pencel3 = document.querySelector(".pencel3");
                
                pencel1.style.transform = "translateY(0px)";
                pencel2.style.transform = "translateY(0px)";
                pencel3.style.transform = "translateY(0px)";
            },
            outAn:function(){
                let pencel1 = document.querySelector(".pencel1");
                let pencel2 = document.querySelector(".pencel2");
                let pencel3 = document.querySelector(".pencel3");
                
                pencel1.style.transform = "translateY(-100px)";
                pencel2.style.transform = "translateY(100px)";
                pencel3.style.transform = "translateY(100px)";
            }
        },
        {
            inAn:function(){
                let Rect1 = document.querySelector(".about-imgs-item:nth-child(1)");
                let Rect2 = document.querySelector(".about-imgs-item:nth-child(2)");
                
                Rect1.style.transform = "rotate(0deg)";
                Rect2.style.transform = "rotate(0deg)";
            },
            outAn:function(){
                let Rect1 = document.querySelector(".about-imgs-item:nth-child(1)");
                let Rect2 = document.querySelector(".about-imgs-item:nth-child(2)");
                
                Rect1.style.transform = "rotate(45deg)";
                Rect2.style.transform = "rotate(-45deg)";
            }
        },
        {
            inAn:function(){
                let Rect1 = document.querySelector(".team-title");
                let Rect2 = document.querySelector(".team-abstract");
                
                Rect1.style.transform = "translateX(0px)";
                Rect2.style.transform = "translateX(0px)";
            },
            outAn:function(){
                let Rect1 = document.querySelector(".team-title");
                let Rect2 = document.querySelector(".team-abstract");
                
                Rect1.style.transform = "translateX(-200px)";
                Rect2.style.transform = "translateX(200px)";
            }
        }
    ]
    // 获取音乐播放控件
    let music = document.querySelector('.music')
    // 获取audio
    let audio = document.querySelector('audio')
    music.onclick = function(){
        if(audio.paused){
            audio.play()
            music.style.background ="url(img/musicon.gif)"
        }else{
            audio.pause()
            music.style.background ="url(img/musicoff.gif)"
        }
    }
    // 获取mask
    let mask = document.getElementById('mask')

    // 开机动画
    loadingAn()
    function loadingAn(){
        let maskLine = document.querySelector('.mask-line')
        let maskDiv = document.querySelectorAll('#mask > div')

        let maskTimer = 0
        for(; maskTimer <= 100; maskTimer++){
            maskLine.style.width = maskTimer/100 * 100 + '%'
        }

        maskLine.addEventListener("transitionend",function(){
            if(maskTimer === 101){
                maskDiv[0].style.height = 0 + 'px'
                maskDiv[1].style.top = '100%'
                maskDiv[1].style.height = 0 + 'px'
                this.style.display="none"
            }
        })

        maskDiv[0].addEventListener("transitionend",function(){
            mask.style.height = 0
            
        })
        mask.addEventListener("transitionend",function(){
            let tmpTimer = setTimeout(() => {
                mask.remove()
                audio.play();
            move(now)
            }, 1000)
            clearTimeout(tmpTimer)
            
        })
    }

    headActions()
    contentActions()
    move(now)

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
            dir = ev.detail < 0 ? 'up' : 'down'
        }
        switch (dir) {
            case 'up':
                if (now >= 0) {
                    move(now - 1)
                }
                break
            case 'down':
                if (now < 4) {
                    move(now + 1)
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

    // 页面跳转
    function move(i) {
        // 将其他的li颜色清除
        for (let item of upNodes) {
            item.style.width = ''
        }
        // 设置本li的颜色与arrow位置
        if (i >= upNodes.length) {
            i = upNodes.length - 1
        } else if (i < 0) {
            i = 0
        }

        // 右侧小点
        // 清除所有点的样式
        for (let item of contentDots) {
            item.className = ''
        }
        // 为跳转的页面所对应的小点加上样式
        contentDots[i].classList.add('active')

        // 入场动画
        for(let item of anArr){
            item.outAn()
        }
        anArr[i].inAn()

        // 显示当前页面的导航
        upNodes[i].style.width = '100%'
        // 导航箭头移动
        arrowEL.style.left = liNodes[i].offsetLeft + liNodes[i].offsetWidth / 2 - arrowEL.offsetWidth / 2 + 'px'
        // 移动内容区ul偏移
        contentUlNodes[0].style.top = -i * (document.documentElement.clientHeight - head.offsetHeight) + 'px'
        // 更新now
        now = i
    }

    // 页面右侧圆点跳转
    function contentDot() {
        for (let i = 0; i < contentDots.length; i++) {
            contentDots[i].onclick = function () {
                // 防抖
                clearTimeout(dotTimer)
                dotTimer = setTimeout(() => {
                    move(i)
                }, 400)
            }
        }
    }

    // 内容区交互
    function contentActions() {
        // 内容区的高度等于视口高度减去顶栏高度
        content.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px'

        // 让每个content中的li等于content高度，使其独占一页
        for (let item of contentLiNodes) {
            item.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px'
        }

        // 右侧小点
        contentDot()

        // 第一屏3D效果
        home3D()

        // 第四屏图片炸裂效果
        picBoom()

        // 第五屏展示效果
        picShow()
    }

    // 第一屏轮播图3D效果
    function home3D() {
        for (let i = 0; i < homePointNodes.length; i++) {
            homePointNodes[i].onclick = function () {
                // 防抖
                clearTimeout(homeTimer)
                homeTimer = setTimeout(() => {
                    // 如果点击当前页，不做任何处理
                    if (homenow != i) {
                        // 清除所有点的样式
                        for (let item of homePointNodes) {
                            item.className = ''
                        }
                        // 清除所有图片的样式
                        for (let item of homeImgNodes) {
                            item.className = ''
                        }

                        homePointNodes[homenow].classList.remove('active')
                        homePointNodes[i].classList.add('active')
                        // 判断是向那个位置的动画
                        if (homenow > i) {
                            // 从右边跳向左边的动画
                            homeImgNodes[homenow].className = 'rightHide'
                            homeImgNodes[i].className = 'leftShow'
                        } else {
                            // 从左边跳向右边的动画
                            homeImgNodes[homenow].className = 'leftHide'
                            homeImgNodes[i].className = 'rightShow'
                        }
                        homenow = i
                    }
                }, 400);

            }
        }
    }

    // 第四屏图片自动生成
    function picBoom() {
        for (let item of aboutImgUl) {
            let src = item.dataset.src
            let width = item.offsetWidth / 2
            let height = item.offsetHeight / 2
            for (let i = 0; i < 4; i++) {
                let liNode = document.createElement('li')
                let imgNode = document.createElement('img')
                liNode.style.width = width + 'px'
                liNode.style.height = height + 'px'
                imgNode.src = src
                liNode.appendChild(imgNode)
                item.appendChild(liNode)
            }
        }
    }

    // 第五屏展示效果
    function picShow() {
        for (let i = 0; i < fivePics.length; i++) {
            fivePics[i].onmouseenter = function () {
                // 使其他图片透明度降低
                for (let item of fivePics) {
                    item.style.opacity = '0.5'
                }
                fivePics[i].style.opacity = '1'
                biubiu(i)
            }

        }
    }

    // 第五屏气泡效果
    function biubiu(i) {
        let timer1 = 0
        let timer2 = 0

        // 如果没有canvas创建并添加canvas
        if (!oc) {
            oc = document.createElement('canvas')
            oc.width = fivePics[i].offsetWidth
            oc.height = fivePics[i].offsetHeight

            oc.style.left = (i * 118) + 'px'

            // 如果鼠标从canvas上移出，清除canvas
            oc.onmouseleave = function () {
                for (let i = 0; i < fivePics.length; i++) {
                    fivePics[i].style.opacity = 1;
                }

                removeCanvas();
            }

            team.appendChild(oc)
            canvasShow()
        }

        function removeCanvas() {
            oc.remove();
            oc = null;
            clearInterval(timer1);
            clearInterval(timer2);
        }

        function canvasShow() {
            let oc = document.querySelector("canvas");
            if (oc.getContext) {
                let ctx = oc.getContext("2d");

                let arr = [];

                //将数组中的圆绘制到画布上
                timer1 = setInterval(function () {
                    ctx.clearRect(0, 0, oc.width, oc.height)
                    //动画
                    for (let i = 0; i < arr.length; i++) {
                        // 透明度为0的话删除该数组
                        if (arr[i].alp <= 0) {
                            arr.splice(i, 1);
                        }
                        // 变化幅度
                        arr[i].deg += 6;
                        // 运动轨迹——sin函数
                        arr[i].x = arr[i].startX + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].step / 2
                        arr[i].y = arr[i].startY - (arr[i].deg * Math.PI / 180) * arr[i].step / 2
                        // 透明度变化
                        arr[i].alp -= 0.0015;
                    }

                    //绘制
                    for (let i = 0; i < arr.length; i++) {
                        ctx.save()
                        ctx.fillStyle = `rgba(${arr[i].red},${arr[i].green},${arr[i].blue},${arr[i].alp})`
                        ctx.beginPath()
                        // 画入的圆的信息
                        ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI)
                        ctx.fill()
                        ctx.restore()
                    }
                }, 1000 / 600)

                //往arr中注入随机圆的信息
                timer2 = setInterval(function () {
                    // 随机圆圆心与半径
                    let r = Math.random() * 6 + 2
                    let x = Math.random() * oc.width
                    let y = oc.height - r

                    // 随机圆颜色
                    let red = Math.round(Math.random() * 255)
                    let green = Math.round(Math.random() * 255)
                    let blue = Math.round(Math.random() * 255)
                    let alp = 1

                    // 圆做曲线运动的度数
                    let deg = 0
                    let startX = x
                    let startY = y
                    let step = 30
                    arr.push({
                        x,
                        y,
                        r,
                        red,
                        green,
                        blue,
                        alp,
                        deg,
                        startX,
                        startY,
                        step
                    })
                }, 20)
            }
        }
    }

}





