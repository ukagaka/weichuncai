<?php
$uid = 1;
if($uid > 0){
    echo json_encode(array('code'=>1,'msg'=>'我是系统公告，我是系统公告，我是系统公告'));
}else{
    echo json_encode(array('code'=>0,'msg'=>"伪春菜：前方高能，请出示您的通行证~<div class='pet_login'><a href='/'>出示通行证</a></div>"));
}
