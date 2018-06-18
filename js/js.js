/**
 * 全局变量
 * IMG_SRC:图片路径
 *
 *
 * **/
var IMG_SRC = "http://test.static.chainbba.com"; //测试环境 图片路径
//var IMG_SRC = "http://static.xball.io"; //正式生产环境 图片路径

//var PORT_CONNECT = "http://47.104.141.141";
var PORT_CONNECT = "http://testprod.api.chainbba.com";
//var PORT_CONNECT = "http://test.api.chainbba.com";
//var PORT_CONNECT = "http://api.xball.io";

//var INVITE_CONNECT = "http://xball.io/"; //正式邀请链接
var INVITE_CONNECT = "html.zai0312.com/bizhan/H5/index.html";  //测试邀请链接


var uid = localStorage.getItem("uid");
var userToken = localStorage.getItem("userToken");

console.log("uid="+uid);
console.log("token="+userToken);


/**
 *
 * 进入页面立刻判断是否已经登录，已登录，则进入到相应页面，未登录则回到登录或者注册页面
 *
 * */

isLogin();
function isLogin(){
    /**
     * 每次进入页面，判断登录状态，判断session 里uid是否存在，
     * 如果uid存在，判断当前页面是不是需要登录页面，如果是，则直接显示本页，如果不是，跳转login.html；
     * 如果uid不存在，判断当前页面是不是需要登录页面，如果是，则直接跳转login.html，如果不是，则正常显示本页；
     *
     * */

    //var newHref = "http://xball.io/?sd=f715fc3fde943bc9a8909130856e83bf&cd=";

    /**
     * 把分享链接里面的sd和cd进行处理，取出sd和cd
     * 如果不存在则赋值1
     * */
    var regSd = GetHrefVal("sd");
    var regCd = GetHrefVal("cd");
    if(regSd || regCd){
        if(!regCd){
            regCd = "1";
        }
        if(!regSd){
            regCd = "1";
        }
        //如果是邀请链接访问,直接跳转到邀请注册页面
        location.href="reg_invite.html?regSd="+regSd+"&regCd="+regCd;
    }else{
        var regSd1 = GetHrefVal("regSd");
        var regCd1 = GetHrefVal("regCd");
        if(regSd1 || regCd1){
            //如果在邀请注册页面,刷新的话就在当前页面刷新
            $("body").css("display","block");
        }else{
            //var uid = localStorage.getItem("uid");
            //console.log("判断登录状态：uid="+uid);
            var pageState = localStorage.getItem("pageState");
            //console.log("pageState="+pageState);
            //console.log("用户token="+userToken);
            if(pageState == 0){
                //这是在注册、登录页面
                $("body").css("display","block");
            }else{
                if(!uid){
                    //location.href="login.html";
                    location.href="register.html";
                }else{
                    $("body").css("display","block");
                }
            }
        }
    }


    // 离开不需要登录的页面时（比如，登录，注册）页面时清除当前页面储存的页面状态【前提是进入这些页面时，要设置此数据】
    if(pageState == 0){
        removePageState();
    }
}



/**
 * 离开不需要登录的页面时（比如，登录，注册）页面时清除当前页面储存的页面状态
 * pageState 用于判断当前页面需不需要登陆才能访问的参数
 * 0：不需要登录即可访问
 * 1：需要登录才能访问
 *
 * */

function removePageState(){
    //    离开login页面时执行
    window.onbeforeunload = function(){
        localStorage.removeItem('pageState');
    }
}

/**
 * 错误提示
 * info：要提示的信息，
 * */
function wrongTs(info){
    $(".wrong_ts").remove();
    var str ='';
    str +='<div class="wrong_ts">'+info+'</div>';
    $("body").append(str);
    $(".wrong_ts").fadeIn();
    setTimeout(function(){
        $(".wrong_ts").hide();
    },1000);
}

/**
 * 正则验证手机号
 * phone:要测试的手机号
 *
 * */
function isPoneAvailable(phone) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

/**
 * loading 数据请求loading【区别于页面加载loading】
 * state: 0 关闭loading, 1 打开loading
 * txt: 要提示的文字
 * */

function loading(state,txt){
    if(state == 1){
        var str = '';
        str +='<div class="mint-indicator">';
        str +='<div class="mint-indicator-wrapper" style="padding: 15px;">';
        str +='<span class="mint-indicator-spin">';
        str +='<div class="mint-spinner-snake"></div>';
        str +='</span>';
        if(txt){
            str +='<span class="mint-indicator-text">'+txt+'</span>';
        }
        str +='</div>';
        str +='<div class="mint-indicator-mask"></div>';
        str +='</div>';

        $("body").append(str);
    }else{
        $(".mint-indicator").css("display","none");
    }
}


//js 把时间转换为 几月前，几周前，几天前
function getDateDiff(dateTimeStamp){
    dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi,"/"));

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){return;}
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
        result="" + parseInt(monthC) + "月前";
    }
    else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
        result="刚刚";
    return result;
}

/**
 * 获取href的参数值
 * name：所要获取的参数的名字
 * **/

function GetHrefVal(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


/**
 * sendBarrage(data,num,id):自制弹幕发射功能【发射原有的数据】
 * data ：弹幕数据 array
 * num: 设定每次从数据中拿出的用来滚动的条数【因为如果数据量太大，一次滚动问题太大，而且要循环滚动的】，int
 * count：统计次数，统计总共从数据中拿了多少次了，第一次是0； int
 * id:弹幕相对滚动的父级的id;也就是存放每个弹幕span的父级id,必须是position:relative定位的
 * speed:弹幕的速度，其实是弹幕从出现到消失的运动时间,单位毫秒
 *
 *
 * ps:我这个是按照两排弹幕制作的，只使用于两排弹幕的，如果要制作更多排的需要再去修改方法，我这个新发的弹幕是显示在中间的;
 * 父级必须超出隐藏：overflow:hidden;
 *
 *
 * **/


function sendBarrage(data,num,id,speed){
    var data = data; //总数据
    var num = num; //设定一次滚动的条数20条
    var count = 0; //计次//默认0
    var id = id;
    var speed = parseInt(speed);
    danmu(data,num,count,id,speed);
    function danmu(data,num,count,id,speed){
        var start = count*num; //每次要取的值的开始位置
        var end = start+num; //每次要取的值的结束位置
        //console.log(start);
        //console.log(end);
        //console.log(data);
        var dataNew = data.slice(start,end);
        //console.log(dataNew);
        if(dataNew.length == 0){
            //console.log("新一轮开始了!");
            count = 0;
            danmu(data,num,count,id,speed);
        }
        $.each(dataNew,function(i,v){
            var str = "<span>"+v+"</span>";
            $(id).append(str);
        });


        var k = 1;
        var $top = 100;
        var ww = $(id).width();
        //上一个span的最右边的位置
        var $left1 = ww;
        var $left2 = ww;
        var aSpan = $(id).find(" span:not('.nspan')");
        var len = aSpan.length;
        var m = 0;
        aSpan.each(function(){
            var This = $(this);
            //定义一个变量用来存储top值。最小值是20，最大值是80.

            //设置的弹幕速度,
            var $speed = speed;
            //获取span的宽度
            var $wid = This.width()+100;
            //设置样式


            //给每个span设定left位置
            var lw = "";
            if(k == 1){
                $top = 40;
                //给每个span设定left为屏幕宽度，也就是让每个span都跑到屏幕右边隐藏起来
                This.css({"top":$top,"left":($left1+30)});
                $left1 = $left1 + $wid;
                lw = $left1;
                k = 2;
            }else{
                $top = 70;
                //给每个span设定left为屏幕宽度，也就是让每个span都跑到屏幕右边隐藏起来
                This.css({"top":$top,"left":$left2});
                $left2 = $left2 + $wid;
                lw = $left2;
                k = 1;
            }

            //每个span要走过的距离
            var gow = lw+ww;
            //每个span要走的时间[为了保证匀速所以必须计算要走的时间]
            var got = gow/$speed;

            //设置目的地、速度、运动方式、回调函数。
            //console.log("我的宽度="+$wid);
            This.animate({"left":-$wid+50},Math.ceil(got*50000),function(){
                $(this).remove();
                m++;
                if(m == len){
                    //也就是这一批走完的时候
                    //console.log("一批走完了!");
                    count++;
                    danmu(data,num,count,id,speed);
                }
            });
        });
    }
}

/**
 * 弹幕发射，发送新的发的弹幕
 * txt:发送的内容
 * id:要显示位置的父级id
 * $top:要显示的相对父级的top值
 * **/
function newSendBarrage(txt,id,$top,$speed){
    var nspan = "<span class='nspan'>"+txt+"</span>";
    $(id).append(nspan);
    var This = $(id).find("span.nspan:nth-last-of-type(1)");
    var ww = $(id).width();
    var $wid = This.width()+100;
    This.css({"top":parseInt($top),"left":ww});
    //每个span要走过的距离
    var gow = ww+$wid;
    //每个span要走的时间[为了保证匀速所以必须计算要走的时间]
    var got = gow/$speed;
    //设置目的地、速度、运动方式、回调函数。
    //console.log("我的宽度="+$wid);
    This.animate({"left":-$wid+50},Math.ceil(got*50000),function(){
        $(this).remove();
        //console.log("新弹幕走完了")
    });
}

