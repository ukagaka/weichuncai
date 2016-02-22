<?php
$type = $_GET['type'];
$eatFoods = array(
    1=>'爱心早餐',
    2=>'幸福便当',
    3=>'烛光晚宴',
    10001=>'士力架（消耗钻石15）',
    10002=>'薯片（消耗钻石10）',
    10003=>'可乐（消耗钻石12）',
);
$eatSay = array(
    1=>'这是主人给我的爱心便当吗，kiss~',
    2=>'看到主人，我的心里就满满的',
    3=>'两，两，两个人的烛光晚宴',
    10001=>'横扫饥饿，做回自己',
    10002=>'我最爱吃薯片了',
    10003=>'可乐陪薯片才是最棒的',
);
$uid = 1;
$dataTime = date("Y-m-d");
if($type < 10000 && $type > 0){
    if(threeMeals($type)){
        echo json_encode(array('code'=>0,'msg'=>$eatSay[$type]));
        exit;
    }else{
        echo json_encode(array('code'=>1,'msg'=>'主人，你有零食么？'));
        exit;
    }
}elseif($type <= 10003 && $type > 10000){
    $eatTime = eatEgg($type);
    $eatTime>4?4:$eatTime;
    if($eatTime){
        echo json_encode(array('code'=>0,'msg'=>$eatSay[$type]));
        exit;
    }else{
        echo json_encode(array('code'=>3,'msg'=>"嗝~，好饱，好饱，让我休息".(4-$eatTime)."个小时在吃"));
        exit;
    }
}else{
    echo json_encode(array('code'=>1,'msg'=>$eatFoods));
};

//正常的时候，不消耗任何东西
function threeMeals($type){
    $hTime = date("G");
    $uid = 1;
    /** @var TYPE_NAME $dailyTasks   1=已经吃过，0表示未吃 */
    $dailyTasks = array('uid'=>$uid,'pet_breakfast'=>0,'pet_lunch'=>0,'pet_dinner'=>0);
    if($hTime >= 6 && $hTime <=9 && $type == 1){
        if($dailyTasks['pet_breakfast'] == 0){
            return true;
        }
    }
    if($hTime >= 11 && $hTime <=13 && $type == 2){
        if($dailyTasks['pet_lunch'] == 0){
            return true;
        }
    }
    if($hTime >=17 && $hTime <= 20 && $type == 3){
        if($dailyTasks['pet_dinner'] == 0){
            return true;
        }
    }
    return false;
}

//吃钻石，此为消耗钻石
function eatEgg($type){
    $uid = 1;
    $userEgg = array('egg'=>100,'uid'=>$uid);
    switch($type){
        case 10001:
            $eggNum = 15;
            break;
        case 10002:
            $eggNum = 10;
            break;
        case 10003:
            $eggNum = 12;
            break;
    }
    if($userEgg['egg'] < $eggNum){
        $this->renderJson(array('code'=>3,'msg'=>"一定是我吃太多了，主人的兜兜里没钻石了QAQ"));
    }
    /** @var TYPE_NAME $eatTime  来查询用户上次吃零食是什么时候  */
    $eatDay = array('uid'=>$uid,'time'=>'1451581261');
    $eatTime = time() - $eatDay['time'];
    $eatTime = floor($eatTime/3600);
    return $eatTime;
}