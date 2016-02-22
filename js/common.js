var pet_talkobj;
var pet_imageWidth;
var pet_imageheight;
var pet_name = '';
var pet_num = 3;
var pet_talktime = 100000;    //自言自语时间
var pet_typei = 0;      //动态显示文字是记录该显示第几个字符
var pet_missionState = 0; //剧情状态  0为关闭剧情，1为开启剧情。可以在特定的条件下，通过更改pet_missionState来开启剧情
var pet_missionData;    //存放剧情对话数据
var pet_timeNum;
var pet_tol=0;
var pet_goal = 10*60;   //多长时间没操作的话停止活动，10分钟后页面没有响应就停止活动
$(document).ready(pet_init());   //通过调用pet_init()来进行初始化伪春菜。
function pet_init(){
    $.getJSON('../php/getchuncai.php',function(data){
        if(data.code != 0){
            pet_name=data.msg.chuncaiName;
            pet_imageWidth = data.msg.imagewidth;
            pet_imageheight = data.msg.imageheight;
            pet_getWeichuncai(data);
        }
    });
}

//初始化执行，显示公告等,显示人物后再执行显示对话框
function pet_getWeichuncai(data){
        var getwidth = pet_getCookie("chuncaiwidth");
        var getheight = pet_getCookie("chuncaiheight");//获取COOKIE的宽和高
        if(getwidth != null && getheight != null){
            var width = getwidth;
            var height = getheight;
        }else{
            var width = $(window).width() - 200 - data.msg.imagewidth;
            var height = $(window).height() - 180 - data.msg.imageheight;
        }

        var cwidth = $(window).width() -100;
        var cheight = $(window).height()-20;
        var moveX = 0;
        var moveY = 0;
        var moveTop = 0;
        var moveLeft = 0;
        var moveable = false;
        var docMouseMoveEvent = document.onmousemove;
        var docMouseUpEvent = document.onmouseup;

        var pet_menuchuncai = '<div id="pet_smchuncai" style="color:#626262;z-index:999;"><div id="pet_chuncaiface"></div><div id="pet_dialog_chat"><div id="pet_chat_top"></div><div id="pet_dialog_chat_contents"><div id="pet_dialog_chat_loading"></div><div id="pet_tempsaying"></div><ul id="pet_showchuncaimenu"><li class="pet_wcc_mlist" id="pet_shownotice">显示公告</li><li class="pet_wcc_mlist" id="pet_chatTochuncai">陪我聊天</li><li class="pet_wcc_mlist" id="pet_foods">喂食食物</li><li class="pet_wcc_mlist" id="pet_blogmanage">进入后台</li><li class="pet_wcc_mlist" id="pet_measurements">显示三围</li><li class="pet_wcc_mlist" id="pet_package">查看包裹</li><li class="pet_wcc_mlist" id="pet_material">运送物资</li><li class="pet_wcc_mlist" id="pet_constellation">星座运势</li><li class="pet_wcc_mlist" id="pet_oneiromancy">周公解梦</li><li class="pet_wcc_mlist" id="pet_calendar">老黄历</li><li class="pet_wcc_mlist" id="pet_closechuncai">关闭春菜</li></ul><div><ul id="pet_chuncaisaying"></ul></div><div id="pet_close">|关闭|</div><div id="pet_getmenu">|菜单|</div></div><div id="pet_chat_bottom"></div></div></div><div id="pet_callchuncai">召唤春菜</div>';
        $("body").append(pet_menuchuncai);
        var pet_panelchuncai = '<div id="pet_addinput"><div id="pet_inp_l"><input id="pet_talk" type="text" name="mastersay" value="" /> <input id="pet_talkto" type="button" value=" " /><input id="pet_dream" type="button" value=" " /></div><div id="pet_inp_r"> X </div></div>';
        $("#pet_smchuncai").append(pet_panelchuncai);
        //判断春菜是否处于隐藏状态
        var is_closechuncai = pet_getCookie("chuncaiclose");
        if(is_closechuncai == 'close'){
            pet_closeInit();    //如果是隐藏，显示隐藏
        }
        var pet_notice = pet_getCookie("chuncainotice");
        if(pet_missionState == 1){
            pet_mission();
        }else if(pet_notice == null){
            pet_getNotice();
        }else{
            pet_sayHello();
        }
        $("#pet_smchuncai").css('left', width+'px');
        $("#pet_smchuncai").css('top', height+'px');
        $("#pet_smchuncai").css('width', pet_imageWidth+'px');
        $("#pet_smchuncai").css('height', pet_imageheight+'px');
        $("#pet_callchuncai").attr("style", "top:"+cheight+"px; left:"+cwidth+"px; text-align:center;");

        //给春菜增加拖动功能，并且记录拖动的位置
        smcc = document.getElementById("pet_smchuncai");
        smcc.onmousedown = function(){
            var ent = pet_getEvent();
            moveable = true;
            moveX = ent.clientX;
            moveY = ent.clientY;
            var obj = document.getElementById("pet_smchuncai");
            moveTop = parseInt(obj.style.top);
            moveLeft = parseInt(obj.style.left);
            if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
                window.getSelection().removeAllRanges();
            }
            document.onmousemove = function(){
                if(moveable){
                    var ent = pet_getEvent();
                    var x = moveLeft + ent.clientX - moveX;
                    var y = moveTop + ent.clientY - moveY;
                    var w = 200;
                    var h = 200;    //w,h为浮层宽高
                    obj.style.left = x + "px";
                    obj.style.top = y + "px";
                }
            };
            document.onmouseup = function(){
                if(moveable){
                    var historywidth = obj.style.left;
                    var historyheight = obj.style.top;
                    historywidth = historywidth.replace('px', '');
                    historyheight = historyheight.replace('px', '');
                    pet_setCookie("chuncaiwidth", historywidth, 60*60*24*30*1000);
                    pet_setCookie("chuncaiheight", historyheight, 60*60*24*30*1000);
                    document.onmousemove = docMouseMoveEvent;
                    document.onmouseup = docMouseUpEvent;
                    moveable = false; 
                    moveX = 0;
                    moveY = 0;
                    moveTop = 0;
                    moveLeft = 0;
                }
            };
        };
        $("#pet_getmenu").click(function(){     //显示菜单页
                pet_chuncaiMenu();
                });
        $("#pet_shownotice").click(function(){      //显示公告内容
                pet_getNotice();
                pet_closeMenu();     //隐藏菜单
        });
        $("#pet_closechuncai").click(function(){    //隐藏伪春菜
                pet_closeChuncai();
                });
        $("#pet_callchuncai").click(function(){         //显示伪春菜
                pet_callchuncai();
                pet_setCookie("chuncaiclose", '', 60*60*24*30*1000);
                });
        $("#pet_measurements").click(function(){        //显示三围
                pet_closeMenu();
                pet_closeNotice();
                pet_getMeasurements();
                });
        $("#pet_package").click(function(){     //显示包裹
                pet_closeMenu();
                pet_closeNotice();
                pet_getPackage(0,4);
        });
        $("#pet_material").click(function(){        //运送物资
                pet_closeMenu();
                pet_closeNotice();
                pet_material();
        });
        $("#pet_oneiromancy").click(function(){   //周公解梦
            pet_showInput();
            pet_clearChat();
        });
        $("#pet_constellation").click(function(){        //星座运势
            pet_closeMenu();
            pet_closeNotice();
            pet_constellation();
        });
        $("#pet_calendar").click(function(){           //老黄历
            pet_closeMenu();
            pet_closeNotice();
            pet_calendar();
        });
        $("#pet_chatTochuncai").click(function(){       //聊 天
                pet_showInput();
                });
        $("#pet_inp_r").click(function(){               //关闭聊天框
                pet_closeInput();
                pet_chuncaiSay('不聊天了吗？(→_→)',3);
                });
        $("#pet_talkto").click(function(){          //聊天确认
                pet_inArray();
                });
        $("#pet_dream").click(function(){
            pet_oneiromancy();
        });
        $("#pet_close").click(function(){           //关闭对话框
            pet_clearChuncaiSay();
            pet_closeInput();
            $("#pet_dialog_chat").css("display", "none");
        });
        $("#pet_blogmanage").click(function(){      //进入后台
                pet_closeMenu();
                pet_closeNotice();
                $("#pet_getmenu").css("display", "none");
                pet_chuncaiSay("马上就跳转到后台管理页面去了哦～～～",2);
                setTimeout(function(){
                    window.location.href = '/';
                    }, 2000);
                });
        $("#pet_foods").click(function(){       //吃 零 食
                pet_closeMenu();
                pet_closeNotice();
                pet_getFood();
                });
        document.onmousemove = function(){
            pet_stopTime();
            pet_tol = 0;
            pet_setTime();
        }
};

/*
 |--------------------------------------------------------------------------
 | 获取公告内容
 |--------------------------------------------------------------------------
 |
 | 通过后台返回参数，用来获取最新的公告内容。
 | 通过后台返回的状态，判断显示的是什么公告
 | 登录以后直接显示公告，如果未登录显示的是让注册的公告
 | 不可删除
 */
function pet_getNotice(){
    $.getJSON('../php/getnotice.php',function(data) {
        $("#pet_dialog_chat_loading").css('display', "none");
        $("#pet_tempsaying").css('display', "");
        pet_chuncaiSay(data.msg,1);             //公告
        if(data.code == 1){
            pet_setCookie('chuncainotice',1);
            pet_executionTime();
        }else{
            $("#pet_close").css('display','none');
            $("#pet_getmenu").css('display','none');
            $("#pet_close").remove("#pet_close");
            $("#pet_getmenu").remove("#pet_getmenu");
            return false;
        }
    })
}

/*
 |--------------------------------------------------------------------------
 | 获取三围
 |--------------------------------------------------------------------------
 |
 | 通过后台返回参数，用来获取春菜的三围状态。
 | 主要是春菜的等级，活力，魅力之类的状态
 | 不需要的话可以删除
 |
 */
function pet_getMeasurements(){
    $.getJSON('../php/measurements.php',function(data){
        $("#pet_dialog_chat_loading").css('display', "none");
        $("#pet_tempsaying").css('display', "");
        pet_chuncaiSay(data.msg);   //伪春菜的三围
    });
}

/*
 |--------------------------------------------------------------------------
 | 获取包裹
 |--------------------------------------------------------------------------
 |
 | page为第几页，limit为取几条
 | 主要是春菜的等级，活力，魅力之类的状态
 | 不需要的话可以删除
 |
 */
function pet_getPackage(page,limit){
    $.getJSON("../php/package.php",{page:page,limit:limit},function(data){
            if(data.code == 0){
                pet_chuncaiSay("连吴克都没有呢┑(￣Д ￣)┍",2);
            }else{
                var item = data.msg.item;
                var packagehtml = '<ul class="pet_package">';
                for(var i in item){
                    packagehtml += "<li data-type = '"+item[i]['id']+"' title="+item[i]['intro']+">"+item[i]['name']+"("+item[i]['cont']+")</li>";
                }
                packagehtml +='</ul>';
                var countPaging = parseInt(data.msg.total/limit);
                packagehtml += '<ul class="pet_paging">';
                for(var i = 0; i<=countPaging; i++){
                    packagehtml +="<li onclick=pet_getPackage("+i+","+limit+")>"+(i+1)+"</li>";
                }
                packagehtml += '</ul>';
                pet_chuncaiSay(packagehtml,1);
            }
    });
}

/*
 |--------------------------------------------------------------------------
 | 获取菜单
 |--------------------------------------------------------------------------
 |
 | 显示列表菜单
 |
 */
function pet_chuncaiMenu(){
    pet_clearChuncaiSay();
    pet_closeInput();
    pet_chuncaiSay("准备做什么呢？",1);
    $("#pet_showchuncaimenu").css("display", "block");
    $("#pet_getmenu").css("display", "none");
    $("#pet_close").css('display','none');
    $("#pet_chuncaisaying").css("display", "none");
}

/*
 |--------------------------------------------------------------------------
 | 显示聊天框，进行聊天
 |--------------------------------------------------------------------------
 |
 | 聊天框，聊天是通过调取后台进行找到答案，可以自己设置数据库
 | 本列子是通过图灵的API进行POST请求的数据。
 | 具体各种code状态，可以查看图灵机器人API文档
 | 不需要聊天功能的话，可以删掉
 |
 */
//显示聊天框
function pet_showInput(){
    pet_closeMenu();
    pet_closeNotice();
    pet_chuncaiSay("............?",2);
    $("#pet_dream").css('display','none');
    $("#pet_talkto").css('display','block');
    $("#pet_addinput").css("display", "block");
}

//找到符合的答案
function pet_inArray(){
    var talkcon = $("#pet_talk").val();
    $.getJSON("../php/talkcon.php",{talkcon:talkcon},function(data) {
        var txt ;
        if(data.code == 100000 || data.code == 40002){
            txt = data.text;
        }
        if(data.code == 200000){
            txt = data.text+'<br /><a href="'+data.url+'">这是链接地址</a>';
        }
        if(data.code == 302000){
            txt = data.text+'<br />';
            var txtList = data.list;
            var textLeng = txtList.length;
            if(txtList.length > 5){
                for(var i = 0;i<textLeng;i++) {
                    txt += '<li><a href="' + txtList[i].detailurl + '">' + txtList[i].article + '</a></li>';
                }
            }
        }
        if(data.code == 308000){
            txt = data.text+'<br />';
            var txtList = data.list;
            var textLeng = txtList.length;
            if(txtList.length > 3){
                textLeng = 3;
            }
            for(var i = 0;i<textLeng;i++){
                txt += '<a href="'+txtList[i].detailurl+'"><img src=""></a><br />';
                txt += '<a href="'+txtList[i].detailurl+'">'+txtList[i].info+'</a>';
            }
        }
        pet_chuncaiSay(txt,2);
        pet_clearInput();   //清空问答框
    });
}

/*
 |--------------------------------------------------------------------------
 | 显示食物列表，吃食物
 |--------------------------------------------------------------------------
 |
 | type为0的时候表示为获取食物的列表，其它情况为食物对应的回答
 | 后台设置的1~10000，表示为普通的食物，目前设置了三餐。
 | 10001~20000 ，表示为特殊食物，目前设置为的需要消耗钻石之类的
 | 只有吃三餐一直点的时候才会提示，吃饱了，撑死了之类的说话
 | 如果吃特殊食物的话，会吃的次数清空
 |
 */
//获取食物
function pet_getFood(){
    $.getJSON("../php/eat.php",{type:0},function(data){
        var str='';
        var arr = data.msg;
        var preg = /function/;
        for(var i in arr){
            if(arr[i] != '' && !preg.test(arr[i]) ){
                str +='<ul class="eatfood" onclick="pet_eatFood('+i+')">'+arr[i]+'</ul>';
            }
        }
        pet_chuncaiSay(str);
    });
}

//吃饭
function pet_eatFood(obj){
    $.getJSON("../php/eat.php",{type:obj},function(data) {
        if(data.code == 0){
            pet_chuncaiSay(data.msg,1);
            pet_setCookie("chuncaieattimes",1,0);
        }
        if(data.code == 3){
            pet_chuncaiSay(data.msg,3);
            pet_setCookie("chuncaieattimes",1,0);
        }
        if(data.code == 1){
            pet_chuncaiSay(data.msg,3);
        }
    });
    var gettimes = parseInt(pet_getCookie("chuncaieattimes"));
    gettimes++;
    if(gettimes > parseInt(9)){
        pet_chuncaiSay("八嘎八嘎八嘎！人家不理你了！╭(╯^╰)╮ ",2);
        pet_closeEvil();
    }else if(parseInt(gettimes) > parseInt(7)){
        pet_chuncaiSay(".....................肚子要炸了，死也不要再吃了～～！！！TAT",2);
    }else if(parseInt(gettimes) > parseInt(5)){
        pet_chuncaiSay("我已经吃饱了，不要再吃啦......",3);
    }else if(parseInt(gettimes) > parseInt(2)){
        pet_chuncaiSay("多谢款待，我吃饱啦～～～ ╰（￣▽￣）╭",3);
    }
    pet_setCookie("chuncaieattimes",gettimes,0);
}

function pet_closeEvil(){
    pet_stopTalkSelf();
    $("#pet_showchuncaimenu").css("display", "none");
    setTimeout(function(){
        $("#pet_smchuncai").fadeOut(1200);
        $("#pet_callchuncai").css("display", "block");}, 2000);
}

/*
 |--------------------------------------------------------------------------
 | 运送物资功能
 |--------------------------------------------------------------------------
 |
 | pet_material()表示为给一个提示，就是二次确认
 | 运送物资在PHP文件内写的是需要有押金，然后奖励的钻石是随机的
 | 物资运送需要5个小时的冷却时间，防止用户恶意的刷
 |
 */
function pet_material(){
    pet_chuncaiSay('运送物资为每日1次，必须完成每日的军火申领任务才可出航，出航时间为5小时，随机奖励钻石，每次出航需要消耗10钻石<br/><div id="pet_carryingGoods" onclick="pet_carryingGoods()">~~出航</div>',1);
}

//运送物资
function pet_carryingGoods(){
    $.getJSON("../php/carrying.php",function(data){
        pet_chuncaiSay(data.msg,3);
    });
}

/*
 |--------------------------------------------------------------------------
 | 查看今天星座运势
 |--------------------------------------------------------------------------
 |
 | 先选择星座，然后查看今天的运势
 |
 */
function pet_constellation(){
    var ulHtml = '<ul><li class="pet_wcc_mlist" title="3.21-4.19" data-type="1" onclick="pet_horoscope(this)">白羊座</li><li class="pet_wcc_mlist" title="4.20-5.20" data-type="2" onclick="pet_horoscope(this)">金牛座</li><li class="pet_wcc_mlist" title="5.21-6.21" data-type="3" onclick="pet_horoscope(this)">双子座</li><li class="pet_wcc_mlist" title="6.22-7.22" data-type="4" onclick="pet_horoscope(this)">巨蟹座</li><li class="pet_wcc_mlist" title="7.23-8.22" data-type="5" onclick="pet_horoscope(this)">狮子座</li><li class="pet_wcc_mlist" title="8.23-9.22" data-type="6" onclick="pet_horoscope(this)">处女座</li><li class="pet_wcc_mlist" title="9.23-10.23" data-type="7" onclick="pet_horoscope(this)">天秤座</li><li class="pet_wcc_mlist" title="10.24-11.22" data-type="8" onclick="pet_horoscope(this)">天蝎座</li><li class="pet_wcc_mlist" title="11.23-12.21" data-type="9" onclick="pet_horoscope(this)">射手座</li><li class="pet_wcc_mlist" title="12.22-1.19" data-type="10" onclick="pet_horoscope(this)">摩羯座</li><li class="pet_wcc_mlist" title="1.20-2.18" data-type="11" onclick="pet_horoscope(this)">水瓶座</li><li class="pet_wcc_mlist" title="2.19-3.20" data-type="12" onclick="pet_horoscope(this)">双鱼座</li></ul>';
    $("#pet_tempsaying").html(ulHtml);
}

function pet_horoscope(horoscope){
    var constellation_type = $(horoscope).text();
    $.getJSON("../php/constellation.php",{type:constellation_type},function(data){
        var ulHtml = '<ul>';
        ulHtml+='<li>星座名称：'+data.name+'</li>';
        ulHtml+='<li>日期：'+data.datetime+'</li>';
        ulHtml+='<li>总和指数：'+data.all+'</li>';
        ulHtml+='<li>幸运色：'+data.color+'</li>';
        ulHtml+='<li>幸运数字：'+data.number+'</li>';
        ulHtml+='<li>健康指数：'+data.health+'</li>';
        ulHtml+='<li>爱情指数：'+data.love+'</li>';
        ulHtml+='<li>财运指数：'+data.money+'</li>';
        ulHtml+='<li>速配星座：'+data.QFriend+'</li>';
        ulHtml+='<li>工作指数：'+data.work+'</li>';
        ulHtml+='</ul>';
        ulHtml +='<p style="text-indent:2em;">'+data.summary+'</p>';
        $("#pet_tempsaying").html(ulHtml);
    });
}

/*
 |--------------------------------------------------------------------------
 | 查看今天黄历
 |--------------------------------------------------------------------------
 |
 | 查看今天的黄历运势
 |
 */
function pet_calendar(){
    $.getJSON("../php/calendar.php",function(data){
        if(data.error_code == 0){
            var ulHtml = '<ul>';
            var dataResult = data.result;
            ulHtml+='<li>阳历：'+dataResult.yangli+'</li>';
            ulHtml+='<li>阴历：'+dataResult.yinli+'</li>';
            ulHtml+='<li>五行：'+dataResult.wuxing+'</li>';
            ulHtml+='<li>冲煞：'+dataResult.chongsha+'</li>';
            ulHtml+='<li>彭祖百忌：'+dataResult.baiji+'</li>';
            ulHtml+='<li>吉神宜趋：'+dataResult.jishen+'</li>';
            ulHtml+='<li>凶神宜忌：'+dataResult.xiongshen+'</li>';
            ulHtml+='<li>宜：'+dataResult.yi+'</li>';
            ulHtml+='<li>忌：'+dataResult.ji+'</li>';
            ulHtml+='</ul>';
            $("#pet_tempsaying").html(ulHtml);
        }
    })
}

/*
 |--------------------------------------------------------------------------
 | 周公解梦
 |--------------------------------------------------------------------------
 |
 | 周公解梦，输入关键字，进行查询
 |
 */
function pet_oneiromancy(){
    var keyword = $("#pet_talk").val();
    $.getJSON("../php/oneiromancy.php",{keyword:keyword},function(data){
        if(data.error_code == 0 && data.result != null){
            var ulHtml = '<ul>';
            keyword = data.result;
            var textLeng = 5;
            if(data.result.length > 5){
                textLeng = 5;
            }
            for(var i =0;i< textLeng;i++){
                ulHtml += '<p>'+keyword[i].des+'</p>';
            };
            ulHtml +='<ul>';
            $('#pet_addinput').css('display','none');
            $("#pet_tempsaying").html(ulHtml);
            pet_clearInput();   //清空问答框
        }else{
            pet_chuncaiSay("笨蛋，笨蛋，说关键字啊，这么啰嗦~",2);
        }
    })
}
/*
 |--------------------------------------------------------------------------
 | 执行剧情
 |--------------------------------------------------------------------------
 |
 | 剧情为对话形式，并且是打开页面自动执行。
 | 剧情任务为触发事件，通过更改pet_missionState用来开始执行剧情
 | 并且在PHP文件内可以设置，是否已经执行过这个剧情，执行过以后为显示获取的东西
 |
 */
function pet_mission(){
    $("#pet_dialog_chat_loading").css('display', "none");
    $("#pet_tempsaying").css('display', "");
    $.getJSON('../php/mission.php',function(data){
        if(data.code == 0){
            pet_implementMission(data.msg);
        }else{
            pet_chuncaiSay(data.msg,2);
        }
    });
}

function pet_implementMission(data){
    pet_missionData = data;
    pet_getMission('sys1');
}

function pet_getMission(key){
    for(var i =0;i < pet_missionData.message.length;i++){
        if(key == 'end'){
            $("#pet_dialog_chat").css("display", "none");
            $("#pet_chuncaiface").css("display", "block");
        }else if(key == pet_missionData.message[i]['key']){
            mission = pet_missionData.message[i];
        }
    }
    $("#pet_dialog_chat_contents").html('<div id="pet_tempsaying" style="display: block;">'+mission.talk+'</div>');
    pet_getAnswer(mission.answer);
    pet_typeWords(mission.talk);
    if(mission.expression == 0){
        $("#pet_chuncaiface").css("display", "none");
    }else{
        pet_setFace(mission.expression);
    }
}

function pet_getAnswer(data){
    var answer = '';
    var figure = '';
    for(var i = 0;i < data.length;i++){
        figure = data[i]['name'];
        answer += "<div id='pet_answer' onclick=pet_getMission('"+data[i]['key']+"')>"+figure+"："+data[i]['content']+"</div>";
    }
    $("#pet_dialog_chat_contents").append(answer);
}

/*
 |--------------------------------------------------------------------------
 | 执行自言自语
 |--------------------------------------------------------------------------
 |
 | 自言自语为过一段时间自动调用接口，返回随机的一句话
 | 此自言自语为调用一言的API接口。
 | pet_talktime表示为多长时间执行一次一言
 |
 */
function pet_talkSelf(){
    //以下是调用一言的API
    var hjs=document.createElement('script');
    hjs.setAttribute('src','http://api.hitokoto.us/rand?encode=jsc&cat=a&fun=pet_yiyan');
    hjs.setAttribute('id','yiyan');
    document.body.appendChild(hjs);
    $("#yiyan").remove();

}

//返回一言数据
function pet_yiyan(data){
    var num = parseInt(10*Math.random());
    if(num >= pet_num){
        num = num%2;
    }
    pet_chuncaiSay(data.hitokoto,(num+1));
}


//停止自言自语
function pet_stopTalkSelf(){
    if(pet_talkobj){
        clearTimeout(pet_talkobj);  //停止自言自语
    }
}

/*
 |--------------------------------------------------------------------------
 | 显示和隐藏伪春菜
 |--------------------------------------------------------------------------
 |
 | 隐藏会记录隐藏的状态，方便再次打开页面的时候也是隐藏的状态
 |
 */

//显示伪春菜
function pet_callchuncai(){
    pet_talkobj = window.setTimeout(function(){
        pet_sayHello();
    }, 2000);
    $("#pet_smchuncai").fadeIn('normal');
    $("#pet_callchuncai").css("display", "none");
    pet_closeMenu();
    pet_closeNotice();
    pet_chuncaiSay("召唤——伪春菜~，碰！！！",3);
    pet_setCookie("chuncaiclose", '', 60*60*24*30*1000);
}

//隐藏伪春菜
function pet_closeChuncai(){
    pet_stopTalkSelf();
    pet_chuncaiSay("有空再约哟~",2);
    $("#pet_showchuncaimenu").css("display", "none");
    setTimeout(function(){
        $("#pet_smchuncai").fadeOut(1200);
        $("#pet_callchuncai").css("display", "block");}, 2000);
    //保存关闭状态的春菜
    pet_setCookie("chuncaiclose", 'close', 60*60*24*30*1000);
}

/*
 |--------------------------------------------------------------------------
 | 整点问候
 |--------------------------------------------------------------------------
 |
 | 到一定时间会替换公告内容，主要是提醒吃饭，睡觉
 | 如果不想使用问候，可以删除pet_sayHello里面的内容，只留pet_executionTime()就行
 |
 */
function pet_sayHello(){
    var myDate = new Date();
    theHours = myDate.getHours();
    theMinutes = myDate.getMinutes();
    if(theHours == 11 || theHours == 17 && theMinutes >= 30){
        pet_chuncaiSay('好饿啊~都已经'+theHours+'：'+theMinutes+'了呢~吃好再来战斗吧！',2);
    }else if(theHours < 9 && theHours > 6){
        pet_chuncaiSay('主~主人，你希望我明天用哪种方式叫你起床呢≥﹏≤',3);
    }else if(theHours > 23){
        pet_chuncaiSay('-主人的床好大！夜幕降临了，让我来照顾你入睡吧~',3);
    }else{
        pet_talkSelf();
    }
    pet_executionTime();
}

/*
 |--------------------------------------------------------------------------
 | 一定时间不操作的话，停止活动
 |--------------------------------------------------------------------------
 |
 | 如果一定时间内不活动的时候，停止一切活动
 |
 |
 */
function pet_setTime(){
    pet_tol++;
    pet_timeNum = window.setTimeout(function(){
        pet_setTime('"+pet_tol+"');
    }, 1000);
    if(parseInt(pet_tol) == parseInt(pet_goal)){
        pet_stopTalkSelf();
        pet_closeMenu();
        pet_closeNotice();
        pet_closeInput();
        pet_chuncaiSay("主人跑到哪里去了呢....",2);
        pet_stopTime();
    }
}

/*
 |--------------------------------------------------------------------------
 | 动态显示公告内容
 |--------------------------------------------------------------------------
 |
 |  此方法是为了让公告的文字一个一个显示
 |
 */
function pet_typeWords(pet_text) {
    var p = 1;
    var str = pet_text.substr(0,pet_typei);
    var w = pet_text.substr(pet_typei,1);
    if(w=="<"){
        str += pet_text.substr(pet_typei,pet_text.substr(pet_typei).indexOf(">")+1);
        p= pet_text.substr(pet_typei).indexOf(">")+1;
    }
    pet_typei+=p;
    $("#pet_tempsaying").html(str);
    txtst = setTimeout(function(){
        pet_typeWords(pet_text);
    },20);
    if (pet_typei> pet_text.length){
        clearTimeout(txtst);
        pet_typei = 0;
    }
}

/*
 |--------------------------------------------------------------------------
 | 通用功能，不能删除
 |--------------------------------------------------------------------------
 |
 | 一下为通用的功能组件，如果删除其中一个的话会出现报错
 |
 */
//问答框隐藏
function pet_closeInput(){
    $("#pet_addinput").css("display", "none");
}

//更改图片的地址
function pet_setFace(num){
    obj = '../skin/'+pet_name+'/face'+num+'.gif';
    $("#pet_chuncaiface").attr("style", "background:url("+obj+") no-repeat scroll 50% 0% transparent; width:"+pet_imageWidth+"px;height:"+pet_imageheight+"px;");
}

/*
 |--------------------------------------------------------------------------
 | 更改公告内容
 |--------------------------------------------------------------------------
 |
 | 用来外部调用，type为显示的是第几个图片，data表示为公告要显示的内容
 | 例子：pet_getPlot(1,'鼠标放上去更改公告内容，并显示第一张图片');
 |
 */
function pet_chuncaiSay(s,img){
    pet_clearChuncaiSay();
    pet_closeMenu();
    pet_closeNotice();
    if(!img){
        img = 1;
    }
    pet_setFace(img);
    $("#pet_dialog_chat").css("display", "block");
    $("#pet_tempsaying").css("display", "block");
    pet_typeWords(s);
}

//清空公告
function pet_clearChuncaiSay(){
    $("#pet_tempsaying").text('');
}

//更换聊天按钮
function pet_clearChat(){
    $("#pet_dream").css('display','block');
    $("#pet_talkto").css('display','none');
    pet_chuncaiSay("~乌卡拉卡，魔力解禁，输入梦境关键字进行解梦",2);
}

//清空问答框
function pet_clearInput(){
    $("#pet_talk").val('');
}


//隐藏通知对话框
function pet_closeNotice(){
    $("#pet_chuncaisaying").css("display", "none");
}


//显示隐藏伪春菜按钮
function pet_closeInit(){
    pet_stopTalkSelf();//停止自言自语
    $("#pet_showchuncaimenu").css("display", "none");
    setTimeout(function(){
            $("#pet_smchuncai").css("display", "none");
            $("#pet_callchuncai").css("display", "block");}, 30);
}

//隐藏伪春菜菜单
function pet_closeMenu(){
    pet_clearChuncaiSay();
    $("#pet_showchuncaimenu").css("display", "none");
    $("#pet_chuncaisaying").css("display", "block");
    $("#pet_getmenu").css("display", "block");
    $("#pet_close").css('display','block');
}

//定时更新公告内容
function pet_executionTime(){
    pet_talkobj = window.setTimeout(function(){
        pet_sayHello();
    }, pet_talktime);
}

function pet_stopTime(){
    if(pet_timeNum){
        clearTimeout(pet_timeNum);
    }
}

function pet_getEvent() {
    return window.event || arguments.callee.caller.arguments[0];
}

function pet_setCookie(name, val, ex){
    var times = new Date();
    times.setTime(times.getTime() + ex);
    if(ex == 0){
        document.cookie = name+"="+val+";";
    }else{
        document.cookie = name+"="+val+"; expires="+times.toGMTString()+";path=/";
    }
}

function pet_getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}



