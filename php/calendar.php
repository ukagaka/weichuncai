<?php
$url = 'http://v.juhe.cn/laohuangli/d';
$key = 'c4d61632cd9feadb1033ba8e6d458580';

$consName = date("Y-m-d");
$answer = request($url,$key,$consName);
echo $answer;

function request($url,$key,$consName)
{
    $problem = 'key='.$key.'&date='.$consName;
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