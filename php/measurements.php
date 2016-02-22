<?php
$uid = 1;
$petInfo = array('uid'=>$uid,'grade'=>10,'exp'=>10,'eat'=>10,'hungry'=>10,'charm'=>10,'static'=>10,'name'=>'伪春菜','type'=>1,'time'=>'2016-01-01 04:17:57');
$uname = '你的称呼';
$expSum = floor((pow(1.8,$petInfo['grade'])*100+20)/100)*100;
$hungry = get_wcc_hungry($uid);
$lifetime = get_wcc_lifetime(strtotime($petInfo['time']));
$measurements = '等级：'.$petInfo['grade'].'<br/>经验：'.$petInfo['exp'].'/'.$expSum.'<br/>饥饿：'.$hungry.'/100<br/>活力：100/100<br/>魅力：0<br/>';
echo json_encode(array('code'=>0,'msg'=>$measurements));

function get_wcc_lifetime($starttime){
    $endtime = time();
    $lifetime = $endtime-$starttime;
    $day = intval($lifetime / 86400);
    $lifetime = $lifetime % 86400;
    $hours = intval($lifetime / 3600);
    $lifetime = $lifetime % 3600;
    $minutes = intval($lifetime / 60);
    $lifetime = $lifetime % 60;
    return array('day'=>$day, 'hours'=>$hours, 'minutes'=>$minutes, 'seconds'=>$lifetime);
}

function get_wcc_hungry($uid){
    $userEggTask = array('breakfast'=>1,'lunch'=>1,'breakfast'=>1,'dinner'=>1,'uid'=>$uid);
    $hungry = 0;
    $hTime = date("G");
    if($hTime >= 6 && $hTime <=9 ){
        if($userEggTask['breakfast'] != 0){
            $hungry += 30;
        }
    }else if($hTime <=13){
        if($userEggTask['breakfast'] != 0){
            $hungry += 30;
        }
        if($userEggTask['lunch'] != 0){
            $hungry += 35;
        }
    }else if($hTime <= 23){
        if($userEggTask['breakfast'] != 0){
            $hungry += 30;
        }
        if($userEggTask['lunch'] != 0){
            $hungry += 35;
        }
        if($userEggTask['dinner'] != 0){
            $hungry += 35;
        }
    }
    return $hungry;
}