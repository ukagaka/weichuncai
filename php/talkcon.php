<?php
//图灵机器人API，POST请求，用来做聊天使用
$url = 'http://www.tuling123.com/openapi/api';
$key = '41027ee4b024a89d55c0f425b591dced';

$problem = $_GET['talkcon'];
$answer = request($url,$key,$problem);
echo $answer;

function request($url,$key,$problem)
{
    $problem = 'key='.$key.'&info='.$problem.'&userid=12';
    $ch=curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $problem);
    curl_setopt($ch,CURLOPT_TIMEOUT,5);
    curl_setopt($ch,CURLOPT_HEADER,0);
    curl_setopt($ch,CURLOPT_USERAGENT,$_SERVER['HTTP_USER_AGENT']);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
    $respones=curl_exec($ch);
    curl_close($ch);
    return $respones;
}