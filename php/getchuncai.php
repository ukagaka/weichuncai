<?php
/** @var TYPE_NAME $uid = 用户id*/
$uid = 1;
/** @var TYPE_NAME $default = 用户默认的春菜类型*/
$default = 1;
/** @var TYPE_NAME $petType = 用户已经装备的春菜类型 */
$petType = 1;
/** @var TYPE_NAME $code = 用户是否已经装备的伪春菜以及是否用户已经登录
 * 0表示未装备春菜，100表示未登录春菜，其它数字表示装备的是第几个春菜
 */
$code = 0;
/** 查看这个用户在数据库里是否已经有伪春莱的记录
 * 如果有，返回目前用户真正使用的是哪个伪春菜
 * */
$wcc = array('type'=>$petType,'uid'=>1);
$typeList = array(
    '1'=>'rakutori',
);

if($wcc['type'] != 0){
    $chuncaiName = $typeList[$wcc['type']];
    $fpath = '../skin/'.$chuncaiName.'/face1.gif';
    $size = getimagesize($fpath);
    $code = 2;
    $num = count(scandir('../skin/'.$chuncaiName))-2;
}
echo json_encode(array('code'=>$code,'msg'=>array('chuncaiName'=>$chuncaiName,'imagewidth'=>$size['0'],'imageheight'=>$size['1'],'num'=>$num)));