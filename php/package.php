<?php
/**
 *包裹返回的数据
 */
$uid = 1;
$package = array(array('id'=>1,'name'=>'勺子','intro'=>'我是勺子的介绍','cont'=>3),array('id'=>2,'name'=>'锤子','intro'=>'我是锤子的介绍','cont'=>1));
echo json_encode(array('code'=>1,'msg'=>array('item'=>$package,'total'=>count($package))));