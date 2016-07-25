/* 兼容低版本IE的document.getElementsByClassName */
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className, element) {
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}


/* 创建XMLHttpRequest对象 */
function createXHR() {
    if (typeof XMLHttpRequest != 'undefined') {
       // code for IE7+, Firefox, Chrome, Opera, Safari
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {
        if (typeof arguments.callee.active !="undefined"){
        var version = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],i,len;
        for (i = 0,len=version.length; i<len;i ++) {
            try {
                new ActiveXObject(versions[i]);
                argument.callee.activeXString=versions[i];
                break;
            } catch (ex) {
                //跳过
            }    
        }
    } 
    return new ActiveXObject(arguments.callee.activeXString);
    }else {
        throw new Error('No XHR object availabe.');
    }
};


/* 向现有的URL的末尾添加查询字符串 */
function addURLParam(url,name,value){
    url+=(url.indexOf("?")==-1?"?":"&");
    url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
    return url;
}


/*右侧“热门推荐”的实现*/
function getHotClass(){
    var xhr=createXHR();
    var URL="http://study.163.com/webDev/hotcouresByCategory.htm";
    xhr.open("get",URL,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                var date=JSON.parse(xhr.responseText);
                claInf=date;
                hot_class=document.getElementById("hot-class")
                for (var i = 0; i <20; i++) {

                    var box=document.createElement("div");
                    box.className="box clearfix";
                    hot_class.appendChild(box);

                    var img=document.createElement("div");
                    img.className="img";
                    box.appendChild(img);

                    var IMG=document.createElement("img");
                    IMG.src=claInf[i].smallPhotoUrl;
                    IMG.height=50;
                    img.appendChild(IMG);/* 插入图片 */

                    var word=document.createElement("div");
                    word.className="word";
                    word.innerText=claInf[i].name;
                    box.appendChild(word);

                    var fans=document.createElement("div");
                    fans.className="fans";
                    box.appendChild(fans);

                    var head_img=document.createElement("div");
                    head_img.className="head-img";
                    fans.appendChild(head_img);

                    var number=document.createElement("div");
                    number.className="number";
                    number.innerText=claInf[i].learnerCount;
                    fans.appendChild(number);
                };
                /*实现滚动*/
                function roll(){
                    hot_class.appendChild(hot_class.firstChild);
                }
                setInterval(roll,5000);
            }else{
                alert("获取右侧“热门推荐”失败。");
            }          
        }
    };
    xhr.send(null);
};
getHotClass();


/* 获取课程列表函数 getMainClass(pa,ps,ty)形参分别为：当前页码；每页返回的数据个数；筛选类型（10：产品设计；20：编程语言） */
function getMainClass(pa,ps,ty){
var xhr=createXHR();
var URL="http://study.163.com/webDev/couresByCategory.htm";
URL=addURLParam(URL,"pageNo",pa);
URL=addURLParam(URL,"psize",ps);
URL=addURLParam(URL,"type",ty);
xhr.open("get",URL,true);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        if(xhr.status>=200&&xhr.status<300||xhr.status==304){
            var date=JSON.parse(xhr.responseText);
            var claInf=date.list;/* 课程信息数组 */
            var main=document.getElementById("main");
            /* 清除main中的所有框 */
            main.innerText="";
            for (var i = 0; i <20; i++) {
                /* 在main后面加入一个框 */
                var container=document.createElement("div");
                container.className="container container-all";
                if (((i+1)%4)==0) {
                  container.className="container container-all container-right";
                }else{
                    container.className="container container-all";
                }/* 取消第四列的margin-right */
                main.appendChild(container);

                var img=document.createElement("div");
                img.className="img";
                container.appendChild(img);
                 var IMG=document.createElement("img");
                 IMG.src=claInf[i].middlePhotoUrl;
                img.appendChild(IMG);/* 插入图片 */

                var content=document.createElement("div");
                content.className="content content-all";
                content.innerText=claInf[i].name;
                container.appendChild(content);
                
                var fans=document.createElement("div");
                fans.className="fans";
                container.appendChild(fans);

                var voice=document.createElement("span");
                voice.className="voice";
                voice.innerText=claInf[i].provider;
                container.appendChild(voice);

                var money=document.createElement("span");
                money.className="money";
                money.innerText="￥"+claInf[i].price;
                container.appendChild(money);
               /* 以下是浮动框，防止变量名重复，在变量名后面加上_i加以区别 */
                var float_tab=document.createElement("div");
                float_tab.className="float-tab";
                container.appendChild(float_tab);

                var tab_top=document.createElement("div");
                tab_top.className="tab-top clearfix";
                float_tab.appendChild(tab_top);

                var img_i=document.createElement("img");
                img_i.className="img";
                img_i.src=claInf[i].middlePhotoUrl;
                tab_top.appendChild(img_i);  

                var tittle_i=document.createElement("div");
                tittle_i.className="tittle";
                tittle_i.innerText=claInf[i].name;
                tab_top.appendChild(tittle_i);   

                var head_img_i=document.createElement("div");
                head_img_i.className="head-img";
                tab_top.appendChild(head_img_i);

                var learn_i=document.createElement("span");
                learn_i.className="learn";
                learn_i.innerText=claInf[i].learnerCount+"人在学";
                tab_top.appendChild(learn_i);

                tab_top.appendChild(document.createElement("br"));

                var post_i=document.createElement("span");
                post_i.className="post";
                post_i.innerText="发布者："+claInf[i].provider;
                tab_top.appendChild(post_i);

                tab_top.appendChild(document.createElement("br"));

                var class_i=document.createElement("span");
                class_i.className="class";
                class_i.innerText="分类："+claInf[i].categoryName;
                tab_top.appendChild(class_i);

                var tab_bottom=document.createElement("div");
                tab_bottom.className="tab-bottom";
                tab_bottom.innerText=claInf[i].description;
                float_tab.appendChild(tab_bottom);    
            };
        }else{
            alert("获取课程列表失败。");
        }
        /* 注册鼠标悬停事件 */   
        var moveIn=function(){
                document.getElementsByClassName('content-all')[this.index].style.color="#39a030";
                document.getElementsByClassName('float-tab')[this.index].style.display="block";
            };
        var moveOut=function(){
                document.getElementsByClassName('content-all')[this.index].style.color="#484848";
                document.getElementsByClassName('float-tab')[this.index].style.display="none";
            };
        var containerAll = document.getElementsByClassName('container-all');
        for(var i = 0;i < containerAll.length;i++){
            containerAll[i].index = i;
            containerAll[i].onmouseenter = moveIn;
            containerAll[i].onmouseleave = moveOut;
        }
    }
};
xhr.send();
};



/* 打开页面的默认课程参数,分别为：
当前页码、每页返回的数据个数、筛选类型。
这三个参数使用全局变量，
以便在课程内容切换时候方便使用。 */
 pa=1;
 ps=20;
 ty=10;
getMainClass(pa,ps,ty);



/* 课程内容切换实现，包括：
1.点击页码实现换页；
2.点击课程tab实现课程切换 */
(function(){
/* 1.点击页码实现换页 */
var page = document.getElementsByClassName('page');
var pageClick=function(){
    /* 把之前那一页的页码颜色恢复 */
    page[pa-1].className="page";
    page[this.index].className="page selected";
    pa=this.index+1;
    getMainClass(pa,ps,ty);
};
for(var i = 0;i < page.length;i++){
    page[i].index = i;
    page[i].onclick = pageClick;
}
/* 2.点击课程tab实现课程切换 */
var tab_1=document.getElementById("tab-1");
var tab_2=document.getElementById("tab-2");
function clickTab_1(){
    tab_1.className="tab-1 selected";
    tab_2.className="tab-2";
     ty=10;
    getMainClass(pa,ps,ty);
    /*tab切换之后把页码变成第一页(待完成)*/
}
function clickTab_2(){
    tab_2.className="tab-2 selected";
    tab_1.className="tab-1";
     ty=20;
    getMainClass(pa,ps,ty);
    /*tab切换之后把页码变成第一页（待完成）*/
}
tab_1.onclick=clickTab_1;
tab_2.onclick=clickTab_2;
})();


/* 视频播放浮层的打开与关闭 */
(function(){
var video=document.getElementById("video");
var video_float=document.getElementById("video-float");
var video_close=document.getElementById("video-close");
var video_video=document.getElementById("video-video");
function open(){
    video_float.style.display="block";
    video_video.play();
}
function close(){
    video_float.style.display="none";
    video_video.pause();
}
video.onclick=open;
video_close.onclick=close;
})();


/* 把cookie的读取，写入和删除方法放在对象CookieUtil中 */
var CookieUtil={
   /* 读取 */
    get: function(name){
        var cookieName=encodeURIComponent(name)+"=",
            cookieStart=document.cookie.indexOf(cookieName),
            cookieValue=null;
        if(cookieStart>-1){
            var cookieEnd=document.cookie.indexOf(";",cookieStart);
            if(cookieEnd==-1){
                cookieEnd=document.cookie.length;
            }
            cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
        }
    return cookieValue;
    },
   /* 写入 */
    set: function(name,value,expires,path,domain,secure){
        var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText+=";expires="+expires.toGMTSring();
        }
        if(path){
            cookieText+=";path="+path;
        }
        if(domain){
            cookieText+=";domain="+domain;
        }
        if(secure){
            cookieText+=";secure";
        }
        document.cookie=cookieText;
    },
   /* 删除 */
    unset: function(name,path,domain,secure){
        this.set(name,"",new Date(0),path,domain,secure);
    }
};


/* 关闭顶部通知条 
【Chrome浏览器不支持本地cookie】 */
(function(){
var notice=document.getElementById("notice");
var notice_close=document.getElementById("notice-close");
/*若cookie[notice]的值为1时，设置通知条不显示*/
if(CookieUtil.get("notice")== 1){
    notice.style.display="none";
}else {
    notice.style.display = "block";
}
function noticeClose(){
    notice.style.display="none";
    CookieUtil.set("notice",1);
}
notice_close.onclick=noticeClose;
})();


/* 关注“网易教育产品部”/登陆窗口  的实现 */
var mask=document.getElementById("mask");
var closeLoginBtn=document.getElementById("closeLoginBtn");
var cancel_attention_btn=document.getElementById("cancel_attention_btn");
var attention_btn=document.getElementById("attention_btn");
var username=document.getElementById("username");
var password=document.getElementById("password");
var message=document.getElementById("message");
var button=document.getElementById("button");
CookieUtil.set("loginSuc",0);
/* 点击右上角 X 关闭登陆框事件 */
function closeMask(){
    mask.style.display="none";
}
closeLoginBtn.onclick=closeMask;
/* 关注函数:设置对应cookie，改变关注图标 */
function attention(){
    var xhr=createXHR();
    var URL="http://study.163.com/webDev/attention.htm";
    xhr.open("get",URL,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                var date=xhr.responseText;
                if(date==1){
                    CookieUtil.set("followSuc",1);
                    cancel_attention_btn.style.display="block";
                    attention_btn.style.display="none";
                }
            }else{
                alert("关注失败！");
            }          
        }
    };
    xhr.send(null);
}
/* 取消关注函数:设置对应cookie，改变关注图标 */
function cancelAttention(){
    CookieUtil.set("followSuc",0);
    cancel_attention_btn.style.display="none";
    attention_btn.style.display="blok";
}
/* 表单的验证和提交 */
function handIn(){
    if(username.value==""){
        message.innerText="用户名不能为空！";
    }
    else if(password.value==""){
        message.innerText="密码不能为空！";
    }
    else{
        var nam=username.value;
        var pas=password.value;
        nam=hex_md5(nam.toString());
        pas=hex_md5(pas.toString());
        var xhr=createXHR();
        var url="http://study.163.com/webDev/login.htm";
        url=addURLParam(url,"userName",nam);
        url=addURLParam(url,"password",pas);
        xhr.open("get",url,true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                    var date=xhr.responseText;
                    if(date==1){
                        CookieUtil.set("loginSuc",1);
                        closeMask();
                        attention();
                    }
                    else{
                        CookieUtil.set("loginSuc",0);
                        message.innerText="用户名或者密码错误，请重新输入用户名和密码！"
                    }
                }else{
                    message.innerText="登陆请求失败！";
                }          
            }
        };
        xhr.send(null);
    }
}
button.onclick=handIn;
/* 点击关注事件 */
function setAttention(){
    if(CookieUtil.get("loginSuc")==1){
       attention();
    }
    else{
        mask.style.display="block";
    }
}
attention_btn.onclick=setAttention;
/* 点击取消关注事件 */
function offAttention(){
        CookieUtil.set("followSuc",0);
        cancel_attention_btn.style.display="none";
        attention_btn.style.display="block"; 
}
cancel_attention_btn.onclick=offAttention;


/* 轮播头图的实现 */
/* 图片切换函数 */
(function(){
var curIndex = 0;
var Banner = document.getElementById('m-banner');
// 拿到需要轮播的图片
var Imgs = Banner.getElementsByTagName('img');
// 拿到轮播的小圆点
var Pointers = Banner.getElementsByTagName('i');
// 轮播定时器
var autoChange = setInterval(function(){
    if(curIndex < Imgs.length -1){ 
      curIndex++; 
    }
    else{ 
      curIndex = 0;
    }
    changeTo(curIndex); 
}, 5000);
PointerImg();
StopImg();

    function changeTo(index){
    var activeImg = document.getElementsByClassName('active_img')[0];
    fadeOut(activeImg);
    activeImg.className = "";
    Imgs[index].className = "active_img";
    fadeIn(Imgs[index]);

    var curPointer = document.getElementsByClassName('active_i')[0];
    curPointer.className = "";
    Pointers[index].className = "active_i";
}


/* 淡出函数 */
function fadeOut(element){
    var timer;
    var alpha = 100;
    timer = setInterval(function(){
        var speed = -20;
        if (alpha == 0) {
            clearInterval(timer);
        }else {
            alpha += speed;
            element.style.filter = 'alpha(opacity:'+alpha+')';
            element.style.opacity = alpha/100;
        }
    },100);
}


/* 淡入函数 */
function fadeIn(element){
    var timer;
    var alpha = 0;

    timer = setInterval(function(){
        var speed = 20;
        if (alpha == 100) {
            clearInterval(timer);
        }else {
            alpha += speed;
            element.style.filter = 'alpha(opacity:'+alpha+')';
            element.style.opacity = alpha/100;
        }
    },100);
}


/* 鼠标悬停轮播小圆点显示对应图片 */
function PointerImg(){
    for(var i = 0;i < Pointers.length;i++){
        (function(i_index){
            Pointers[i].onmouseover = function(){
                clearTimeout(autoChange);
                changeTo(i_index);
                curIndex = i_index;
            }
            Pointers[i].onmouseout = function(){
                autoChange = setInterval(function(){
                    if(curIndex < Pointers.length -1){ 
                      curIndex++; 
                    }
                    else{ 
                      curIndex = 0;
                    }
                    changeTo(curIndex); 
                }, 5000);
            }
        })(i);
    }
};


/* 鼠标悬停图片暂停轮播 */
function StopImg(){
    for(var i = 0;i < Imgs.length;i++){
        (function(i_index){
            Imgs[i].onmouseover = function(){
                clearTimeout(autoChange);
                curIndex = i_index;
            }
            Imgs[i].onmouseout = function(){
                autoChange = setInterval(function(){
                    if(curIndex < Imgs.length -1){ 
                      curIndex++; 
                    }
                    else{ 
                      curIndex = 0;
                    }
                    changeTo(curIndex); 
                }, 5000);
            }
        })(i);
    }
}
})();

