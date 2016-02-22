<?php
/**
 * 运送物资返回的数据
 * 1。运送物资如果押金不够返回数据
 * 2.运送物资已经有5个小时的时候，返回运送物资所得的钻石
 * 3.运送物资不够5个小时的时候，返回的参数
 *
 */
$consumeEgg = 10;
$risk = 4;
$uid = 1;
$dataTime = '2016-01-02 13:20:20';
$userEgg = 30;
if($userEgg < $consumeEgg){
    echo json_encode(array('code'=>3,'msg'=>"报告舰长，我军钻石不足，请补充后再运送"));
    exit;
}
$hTime = date("G");
$materialTime = time() - strtotime($dataTime);
$materialTime = floor($materialTime/3600);
if($materialTime >= 5){
    $odds = rand(5,20);
    echo json_encode(array('code'=>1,'msg'=>"经过千山万水，我军终于返回港口，带回钻石{$odds}个"));
    exit;
}
echo json_encode(array('code'=>3,'msg'=>"舰长SAMA，物资正在运送当中,预计".(5-$materialTime)."小时后抵达"));