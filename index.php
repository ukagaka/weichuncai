<!doctype html>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="stylesheet" type="text/css" href="/css/style.css" media="all" />
<title>demo</title>
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="viewport" content="width=device-width">
<body>
    <div id="demo">
        <p>伪春菜功能列表</p>
        <P>改自其它插件，然后添加一些自己的想法，新手自己用。<br />
            各个PHP文件其实是返回的一些数据数组，其实可以直接使用数组进行返回，返回的是JSON数据
        </P>
        <br>1.用户未登录，显示让用户登录（已实现）<br/>
        功能：在用户未登录的情况下，一直显示让用户登录，不会显示公告菜单等</p>


        <p>2.显示公告（已实现）<br/>
        功能：用户登录后，公告在在浏览器打开期间只显示一次。</p>


        <p>3.显示三围（已实现）<br/>
        功能：显示伪春菜的<br/>
        等级	附等级计算公式<br/>
        经验	溢出的经验，继续会留给下个等级（也可升级后经验为0）<br/>
        饥饿值	吃东西后所加的饥饿值（目前无用，后期，触发试剧情，可通过饥饿值触发。后期活动比如：打怪，给对方春菜使用魔法（类似QQ秀的整蛊技能））<br/>
        活力	目前无用，一直为满，后期，触发试剧情，可通过饥饿值触发。后期活动比如：打怪，给对方春菜使用魔法（类似QQ秀的整蛊技能）<br/>
        魅力	目前无用，一直为满后期，触发试剧情，可通过饥饿值触发。后期活动比如：打怪，给对方春菜使用魔法（类似QQ秀的整蛊技能）<br/>
        等级计算公式</p>


        <p>4.显示包裹（已实现）<br/>
        显示一些道具。后期活动可通过一些活动获取一些道具，使用道具可以集齐东西进行兑换一些其它东西，或者后期如中秋活动送月饼，吃月饼，等</p>


        <p>5.运送物资（已实现）<br/>
        激励用户完成每日任务，每天送一些钻石。目前的要求是：包裹必须有10个钻石才可以获取。每天一次，一次随机1~10不等。获取的钻石5小时候才能查看（其实钻石已经获取）<br/>
        后期可实现，用户遇到海浪海贼，损失钻石。</p>


        <p>6.吃零食（已实现）<br/>
        一日三餐，过期不候。<br/>
        早餐：6~10点<br/>
        中餐：11~14点<br/>
        晚餐：17~21点<br/>
        特殊食物消耗钻石，增加经验。每4小时一次，从凌晨4点开始计算</p>


        <p>7.问好（已实现）<br/>
        指定的时间向用户问好。提醒用户吃饭，提醒用户睡觉。贴心提醒用户。</p>


        <p>8.触发试剧情（已实现）<br/>
        对话试剧情。后期可增加一些条件进行触发。对于一些特殊的视频或者活动，为提高评论，，弹幕，可增加触发剧情后所获取到的道具，或者获取道具。<br/>
        缺点是，对话试剧情的剧本对话，需要想好。</p>


        <p>9.获取任务道具（已实现）<br/>
        对于一些特殊的活动可以触发获取道具。获取到的道具会放在春菜的包裹里。<br/>
        后期对于可以集齐一些道具进行兑换钻石，徽章等，以激励用户多参加活动。<br/>
        也可对于一些活动进行一些要求，比如打怪需要有兵器道具，吃牛排需要叉子等</p>


        <p>10.星座运程（已实现）<br/>
            查看星座今天的运程</p>


        <p>11.整蛊咒语（未实现）<br/>
        增加对UP主的互动，类似QQ秀的整蛊，可以对UP的菜娘进行释放魔法，给对方一个状态。这种状态可能影响参加一些活动。后台，UP主会收到他的菜娘被攻击了。咒语可以参加一些活动获取。</p>


        <p>12.打怪（未实现）<br/>
        增加经验类活动。可以触发遇到怪物，需要用到刀，剑，弓等，一般自己打不死，需要用积分或者钻石进行购买武器，或者有小伙伴进行参加帮忙打怪。</p>


        <p>13.装备（未实现）<br/>
        可以给菜娘穿装备，用来向用户展示我的春菜是什么样子的，有了什么装备等。</p>


        <p>14.显示和春菜多长时间（已完成）<br/>
        无用，已放弃</p>


        <p>15.聊天（已完成）<br/>
        增加用户对春菜的互动。调用的是图灵机器人接口。</p>

        <p>16.触摸（未完成）<br/>
        触摸春菜的不同部位，显示不同的话语。无用功能，增加网页加载速度</p>


        <p>17.自言自语（已完成）<br/>
        不定时的说一些话语，调用的一言API接口</p>


        <p>18.周公解梦（已完成）<br/>
            输入关键字，进行解梦</p>


        <p>19.做游戏（未完成）<br/>
        类似QQ宠物，可以陪她玩一些游戏，增加对春菜的互动，增加经验等。会牵扯到gif动画。消耗时间。</p>


        <p>20.升级自动解锁新的春菜（未完成）<br/>
        到一定等级后，会解锁新春菜。一图难求</p>


        <p>21.春菜的关闭和现实（已实现）<br/>
        隐藏和关闭</p>


        <p>后期可以给装备附件一些魅力，攻击力，等<br/>
        目前增加经验的是<br/>
        每日三餐	5点<br/>
        特殊食物	消耗多少钻石，有多少经验</p>
    </div>
</body>
<script src="http://libs.baidu.com/jquery/1.8.3/jquery.min.js"></script>
<script src="/js/common.js"></script>