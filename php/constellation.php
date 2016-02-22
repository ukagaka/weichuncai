<?php
$url = 'http://web.juhe.cn:8080/constellation/getAll';
$key = '64fb8d8cff679d07c5cfc004d13c0026';

$consName = $_GET['type'];
$answer = request($url,$key,$consName);
echo $answer;

function request($url,$key,$consName)
{
    $problem = 'key='.$key.'&consName='.$consName.'&type=today';
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