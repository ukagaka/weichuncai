<?php
$url = 'http://v.juhe.cn/dream/query';
$key = 'fb14a14ffc9510609e43ddd061dc4cca';

$consName = $_GET['keyword'];
$answer = request($url,$key,$consName);
echo $answer;

function request($url,$key,$consName)
{
    $problem = 'key='.$key.'&q='.$consName;
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