<?php
$file="data.txt";
$data=date("d.m.Y H:i");
$ip=trim($_SERVER['REMOTE_ADDR']);
$sysinfo=trim($_SERVER['HTTP_USER_AGENT']);
if(is_file($file)){
    $fo=fopen($file,"a+");
    $res2 = print_r($_POST, true);
    $res3 = print_r($_GET, true);
    $res4 = $_SERVER['HTTP_REFERER'];
    $res="\n$data  |  $ip  |  $sysinfo |  $res4 |\nPOST: $res2 \nGET: $res3";
    $fw=fwrite($fo,$res);
    fclose($fo);
}
